const express = require("express")
const { createToDo, deleteToDo } = require("./controller")
const router = express.Router()
const auth = require("./../../middleware/auth")

router.get("/secure_todo", auth, (req, res) => {
    res.status(200).send("Todos are here")
})

router.post("/", async (req, res) => {
    const newToDo = await createToDo(req.body)
    res.status(200).send(newToDo)
})

router.post("/removeToDo", async (req, res) => {
    const deletedToDo = await deleteToDo(req.body)
    res.status(200).send(deletedToDo)
})

module.exports = router
