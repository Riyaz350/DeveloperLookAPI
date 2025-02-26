const express = require('express')
const { createUser, authenticateUser } = require('./controller')
const User = require('./model')
const router = express.Router()

// get all user data
router.get("/", async (req, res) => {
    res.status(200).send('This is the Developer look')
})

// sign in 
router.post('/', async (req, res) => {
    try {
        let { email, password } =await req.body
        email = email.trim()
        password = password.trim()
        
        if(!(email && password)){
            throw Error ("Empty credentials")
        }

        const authenticatedUser = await authenticateUser({email, password})
        res.status(200).send(authenticatedUser)
    } catch (error) {
        throw error
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

// signup unique user data
router.post("/signup", async (req, res) => {
    try {
        let { email, password } = req.body
        email = email.trim()
        password = password.trim()
        const newUser = await createUser({
            email, password
        })
        res.status(200).json(newUser)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router