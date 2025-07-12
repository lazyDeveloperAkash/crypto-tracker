const express = require("express")
const { getCoins } = require("../controller/coinController")
const auth = require("../middleware/auth")

const router = express.Router()

router.get("/", auth, getCoins)

module.exports = router
