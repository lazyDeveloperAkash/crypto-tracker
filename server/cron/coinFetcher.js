const axios = require("axios")
const CurrentData = require("../models/CurrentData")
const HistoryData = require("../models/HistoryData")

const COINGECKO_API = "https://api.coingecko.com/api/v3"

const fetchAndSaveCoins = async () => {
  try {
    console.log("Fetching cryptocurrency data from CoinGecko...")

    const response = await axios.get(`${COINGECKO_API}/coins/markets`, {
      params: {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: 10,
        page: 1,
        sparkline: false,
      },
    })

    const coins = response.data
    console.log(`Fetched ${coins.length} coins from CoinGecko`)

    // Save to history first
    const historyPromises = coins.map((coin) => {
      const historyData = new HistoryData({
        coinId: coin.id,
        name: coin.name,
        symbol: coin.symbol,
        price: coin.current_price,
        marketCap: coin.market_cap,
        change24h: coin.price_change_percentage_24h || 0,
      })
      return historyData.save()
    })

    await Promise.all(historyPromises)
    console.log("Saved to history collection")

    // Update current data (upsert)
    const currentPromises = coins.map((coin) => {
      return CurrentData.findOneAndUpdate(
        { coinId: coin.id },
        {
          coinId: coin.id,
          name: coin.name,
          symbol: coin.symbol,
          price: coin.current_price,
          marketCap: coin.market_cap,
          change24h: coin.price_change_percentage_24h || 0,
          image: coin.image,
          lastUpdated: new Date(),
        },
        { upsert: true, new: true },
      )
    })

    await Promise.all(currentPromises)
    console.log("Updated current data collection")
  } catch (error) {
    console.error("Error fetching and saving coin data:", error.message)

    // If API fails, log the error but don't crash
    if (error.response) {
      console.error("API Response Error:", error.response.status, error.response.data)
    }
  }
}

module.exports = {
  fetchAndSaveCoins,
}
