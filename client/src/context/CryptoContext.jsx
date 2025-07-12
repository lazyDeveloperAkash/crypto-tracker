import { createContext, useContext, useState, useEffect } from "react"
import { cryptoAPI } from "../services/api"
import { useAuth } from "./AuthContext"

const CryptoContext = createContext()

export const useCrypto = () => {
  const context = useContext(CryptoContext)
  if (!context) {
    throw new Error("useCrypto must be used within a CryptoProvider")
  }
  return context
}

export const CryptoProvider = ({ children }) => {
  const {user} = useAuth();
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("market_cap")
  const [sortOrder, setSortOrder] = useState("desc")

  useEffect(() => {
    fetchCoins()

    // Auto-refresh every 30 minutes
    const interval = setInterval(fetchCoins, 30 * 60 * 1000)
    return () => clearInterval(interval)
  }, [user])

  const fetchCoins = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await cryptoAPI.getCoins()
      setCoins(response.data)
    } catch (error) {
      setError("Failed to fetch cryptocurrency data")
      console.error("Error fetching coins:", error)
    } finally {
      setLoading(false)
    }
  }

  const getHistoricalData = async (coinId) => {
    try {
      const response = await cryptoAPI.getHistory(coinId)
      return response.data
    } catch (error) {
      console.error("Error fetching historical data:", error)
      return []
    }
  }

  const filteredAndSortedCoins = coins
    .filter(
      (coin) =>
        coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      const aValue = a[sortBy]
      const bValue = b[sortBy]

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

  const value = {
    coins: filteredAndSortedCoins,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    fetchCoins,
    getHistoricalData,
  }

  return <CryptoContext.Provider value={value}>{children}</CryptoContext.Provider>
}
