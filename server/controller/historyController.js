const HistoryData = require("../models/HistoryData")
const CurrentData = require("../models/CurrentData")

const saveHistory = async (req, res) => {
  try {
    // Get current data
    const currentCoins = await CurrentData.find()

    // Save to history
    const historyPromises = currentCoins.map((coin) => {
      const historyData = new HistoryData({
        coinId: coin.coinId,
        name: coin.name,
        symbol: coin.symbol,
        price: coin.price,
        marketCap: coin.marketCap,
        change24h: coin.change24h,
      })
      return historyData.save()
    })

    await Promise.all(historyPromises)

    res.json({
      message: "History data saved successfully",
      count: currentCoins.length,
    })
  } catch (error) {
    console.error("Error saving history:", error)
    res.status(500).json({ message: "Error saving history data" })
  }
}

const getHistory = async (req, res) => {
  try {
    const { coinId } = req.params

    // Get last 7 days of data
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const historyData = await HistoryData.find({
      coinId: coinId,
      timestamp: { $gte: sevenDaysAgo },
    }).sort({ timestamp: 1 })

    res.json(historyData)
  } catch (error) {
    console.error("Error fetching history:", error)
    res.status(500).json({ message: "Error fetching historical data" })
  }
}

module.exports = {
  saveHistory,
  getHistory,
}
