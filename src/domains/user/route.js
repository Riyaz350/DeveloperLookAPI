const express = require('express')
const { createUser, authenticateUser, sendOTPAgain } = require('./controller')
const User = require('./model')
const { decodeToken } = require('../../utils/createToken')
const router = express.Router()

// get all user data
router.get("/", async (req, res) => {
    res.status(200).send('This is the Developer look')
})


router.post("/decodeToken", async (req, res) => {
    try {
        const decodedData = await decodeToken(req.body)
        res.status(200).send(decodedData)
    } catch (error) {
        res.status(400).send(error)
    }
})




// sign in 
router.post('/signin', async (req, res) => {
    try {
        let { email, password, subject, message, duration } = await req.body
        email = email.trim()
        password = password.trim()
        if (!(email && password)) {
            throw Error("Empty credentials")
        }
        const authenticatedUser = await authenticateUser({ email, password, subject, message, duration })
        res.status(200).send(authenticatedUser)
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: error.message || "An unknown error occurred",
        });
    }
})


// get single user data
router.get(`/:email`, async (req, res) => {
    try {
        const { email } = req.params;
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            res.status(200).send(existingUser)
        } else {
            res.status(200).send("no user found")
        }
    } catch (error) {
        throw error
    }
})


// sending otp again

router.post('/otpAgain', async (req, res) => {
    try {
        const sentOTP = sendOTPAgain(req.body)
        res.status(200).send(sentOTP)
    } catch (error) {
        res.status(401).send(error)
    }
})

// signup unique user data
router.post("/signup", async (req, res) => {
    try {
        let { email, password, subject, message, duration } = req.body
        email = email.trim()
        password = password.trim()
        const newUser = await createUser({
            email, password, subject, message, duration
        })
        res.status(200).json(newUser)
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || "An unknown error occurred",
        });
    }
})

module.exports = router
