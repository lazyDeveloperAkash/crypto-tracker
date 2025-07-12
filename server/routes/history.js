const express = require("express")
const { saveHistory, getHistory } = require("../controller/historyController")
const auth = require("../middleware/auth")

const router = express.Router()

router.post("/", auth, saveHistory)
router.get("/:coinId", auth, getHistory)

module.exports = router
