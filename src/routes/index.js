const express = require("express")
const router = express.Router()

const userRoutes = require("./../domains/user")
const toDoRoutes = require("./../domains/to_do")

router.use("/user", userRoutes)
router.use("/todo", toDoRoutes)

module.exports = router