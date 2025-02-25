const express = require('express')
const { createUser } = require('./controller')
const User = require('./model')
const router = express.Router()

router.get("/", async(req, res)=>{
    res.status(200).send('This is the Developer look')
})

router.get(`/:email`, async(req, res)=>{
    try {
        const {email} = req.params;
        const existingUser = await User.findOne({email})
        if(existingUser){
            res.status(200).send(existingUser)
        }else{
            res.status(200).send("no user found")
        }
    } catch (error) {
        throw(error)
    }
})

router.post("/signup", async(req, res)=>{
    try {
        let{email, password} = req.body
        email= email.trim()
        password= password.trim()
        const newUser = await createUser({
            email, password
        })
        res.status(200).json(newUser)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router