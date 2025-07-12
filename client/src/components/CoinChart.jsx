import { useState, useEffect } from "react"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { useCrypto } from "../context/CryptoContext"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const CoinChart = ({ coin, onClose }) => {
  const { getHistoricalData } = useCrypto()
  const [chartData, setChartData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchHistoricalData()
  }, [coin.id])

  const fetchHistoricalData = async () => {
    try {
      setLoading(true)
      const data = await getHistoricalData(coin.id)

      if (data.length > 0) {
        const labels = data.map((item) => new Date(item.timestamp).toLocaleDateString())
        const prices = data.map((item) => item.price)

        setChartData({
          labels,
          datasets: [
            {
              label: `${coin.name} Price (USD)`,
              data: prices,
              borderColor: "rgb(59, 130, 246)",
              backgroundColor: "rgba(59, 130, 246, 0.1)",
              tension: 0.1,
            },
          ],
        })
      }
    } catch (error) {
      console.error("Error fetching chart data:", error)
    } finally {
      setLoading(false)
    }
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `${coin.name} (${coin.symbol.toUpperCase()}) Price History`,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: (value) => "$" + value.toLocaleString(),
        },
      },
    },
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-4xl w-full max-h-[90vh]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{coin.name} Chart</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : chartData ? (
          <div className="h-96">
            <Line data={chartData} options={options} />
          </div>
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-400 h-64 flex items-center justify-center">
            No historical data available for {coin.name}
          </div>
        )}
      </div>
    </div>
  )
}

export default CoinChart
