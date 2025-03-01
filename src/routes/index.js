const express = require("express")
const router = express.Router()

const userRoutes = require("./../domains/user")
const toDoRoutes = require("./../domains/to_do")
const otpRoutes = require("./../domains/otp")
const twoFARoutes = require("../domains/towfa")

router.use("/user", userRoutes)
router.use("/todo", toDoRoutes)
router.use("/otp", otpRoutes)
router.use("/twofa", twoFARoutes)

module.exports = router