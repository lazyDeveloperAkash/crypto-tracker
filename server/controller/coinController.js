const CurrentData = require("../models/CurrentData")

const getCoins = async (req, res) => {
  try {
    const coins = await CurrentData.find().sort({ marketCap: -1 }).limit(10)

    // Transform data to match frontend expectations
    const transformedCoins = coins.map((coin) => ({
      id: coin.coinId,
      name: coin.name,
      symbol: coin.symbol,
      current_price: coin.price,
      market_cap: coin.marketCap,
      price_change_percentage_24h: coin.change24h,
      image: coin.image,
      last_updated: coin.lastUpdated,
    }))

    res.json(transformedCoins)
  } catch (error) {
    console.error("Error fetching coins:", error)
    res.status(500).json({ message: "Error fetching cryptocurrency data" })
  }
}

module.exports = {
  getCoins,
}
