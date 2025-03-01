const express = require("express")
const { createToDo, deleteToDo } = require("./controller")
const router = express.Router()
const auth = require("./../../middleware/auth")
const { fetchToDosByEmail, updateToDoStatusById } = require('./controller');

router.get("/secure_todo", auth, (req, res) => {
    res.status(200).send("Todos are here")
})



router.get("/:email", async (req, res) => {
    try {
        const email = req.params.email;
        const filteredToDos = await fetchToDosByEmail(email);
        res.status(200).send(filteredToDos);
    } catch (error) {
        res.status(400).send(error);
    }
});
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updatedToDo = await updateToDoStatusById(id, status);
        res.status(200).send(updatedToDo);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post("/", async (req, res) => {
    const newToDo = await createToDo(req.body)
    res.status(200).send(newToDo)
})

router.delete("/removeToDo", async (req, res) => {
    try {
        const { id } = req.body;
        const deletedToDo = await deleteToDo({ id });
        res.status(200).send(deletedToDo);
    } catch (error) {
        res.status(400).send(error);
    }
});
module.exports = router
