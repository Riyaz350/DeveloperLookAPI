const express = require("express")
const router = express.Router()

const userRoutes = require("./../domains/user")
const toDoRoutes = require("./../domains/to_do")
const otpRoutes = require("./../domains/otp")

router.use("/user", userRoutes)
router.use("/todo", toDoRoutes)
router.use("/otp", otpRoutes)

module.exports = router