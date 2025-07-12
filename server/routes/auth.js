const express = require("express")
const { register, login, logout, me } = require("../controller/authController")
const auth = require("../middleware/auth")

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)
router.get("/me", auth, me)

module.exports = router
