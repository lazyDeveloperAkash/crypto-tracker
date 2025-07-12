import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const ProtectedRoute = ({ children }) => {
  const { user, loading, authChecked } = useAuth()
  const location = useLocation()

  // Show loading spinner while checking authentication
  if (loading || !authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  // If auth check is complete and user is not authenticated, redirect to login
  if (authChecked && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // If user is authenticated, render the protected component
  return children
}

export default ProtectedRoute
