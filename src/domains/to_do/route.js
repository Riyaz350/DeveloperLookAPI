const express = require("express")
const {createToDo} = require("./controller")
const router = express.Router()
const auth = require("./../../middleware/auth")

router.get("/secure_todo",auth, (req,res)=>{
    res.status(200).send("Todos are here")
})
router.post("/", async(req,res)=>{
    const newToDo = await createToDo(req.body)
    res.status(200).send(newToDo)
})

module.exports = router