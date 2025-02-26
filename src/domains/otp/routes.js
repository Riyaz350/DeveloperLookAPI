const express = require("express")
const {sendOtp} = require("./controller")
const router = express.Router()


router.post('/', async(req, res)=>{
    try {
        const {email, subject, message, duration} = req.body
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