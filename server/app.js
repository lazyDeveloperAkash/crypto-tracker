const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const cron = require("node-cron")
require("dotenv").config()

const authRoutes = require("./routes/auth")
const coinRoutes = require("./routes/coin")
const historyRoutes = require("./routes/history")
const { fetchAndSaveCoins } = require("./cron/coinFetcher")

const app = express()

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
)
app.use(express.json())
app.use(cookieParser())

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/coins", coinRoutes)
app.use("/api/history", historyRoutes)

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() })
})

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/crypto-tracker", {
  })
  .then(() => {
    console.log("Connected to MongoDB")

    // Initial data fetch
    fetchAndSaveCoins()
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error)
  })

// Cron job - runs every hour
cron.schedule("0 * * * *", () => {
  console.log("Running scheduled coin data fetch...")
  fetchAndSaveCoins()
})

// Error handling middleware
app.use((error, req, res, next) => {
  console.error(error)
  res.status(500).json({
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? error.message : undefined,
  })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = app
