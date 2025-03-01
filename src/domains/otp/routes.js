const express = require("express")
const { sendOtp, verifyOTP, sendOTPAgain } = require("./controller")
const OTP = require("./model")
const router = express.Router()

router.post('/check', async (req, res) => {
    try {
        const { email, userOTP } = req.body
        const OTPVerified = await verifyOTP({ email, userOTP })
        res.status(200).send(OTPVerified)
    } catch (error) {
        res.status(400).send(error.message)
    }
})
router.post('/', async (req, res) => {
    try {
        const { email, subject, message, duration } = req.body
        const createdOTP = await sendOtp({
            email,
            subject,
            message,
            duration
        })
        res.status(200).json(createdOTP);
    } catch (error) {
        res.status(400).send(error.message)
    }
})


module.exports = router