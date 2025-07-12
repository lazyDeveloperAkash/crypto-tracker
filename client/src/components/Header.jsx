import { useAuth } from "../context/AuthContext"
import { useTheme } from "../context/ThemeContext"

const Header = () => {
  const { user, logout } = useAuth()
  const { isDark, toggleTheme } = useTheme()

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Crypto Tracker</h1>
          </div>

          <div className="flex items-center space-x-4">
            {/* <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-pointer"
            >
              {isDark ? "☀️" : "🌙"}
            </button> */}

            <span className="text-sm text-gray-600 dark:text-gray-300">Welcome, {user?.name}</span>

            <button onClick={logout} className="btn-secondary cursor-pointer">
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
