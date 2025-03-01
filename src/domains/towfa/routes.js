const express = require("express")
const {createQRcode, verifyQR} = require("./controller")
const router = express.Router()

router.post('/', async (req, res) => {
    try {
        console.log(req.body)
        const qrCode = await createQRcode( req.body)
        res.status(200).send(qrCode)
    } catch (error) {
        res.status(400).send(error)
    }
})


router.post('/verifyTwoFA', async(req, res)=>{
    try {
        const verifyCode = verifyQR(req.body)
        res.status(200).send(verifyCode)
    } catch (error) {
        res.status(400).send("Wrong Code")
    }
})

module.exports = router