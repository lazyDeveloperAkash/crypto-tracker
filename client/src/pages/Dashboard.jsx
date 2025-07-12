import Header from "../components/Header"
import CoinTable from "../components/CoinTable"

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Cryptocurrency Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Track the top 10 cryptocurrencies in real-time</p>
        </div>
        <CoinTable />
      </main>
    </div>
  )
}

export default Dashboard
