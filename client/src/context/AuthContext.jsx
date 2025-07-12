import { createContext, useContext, useState, useEffect } from "react"
import { authAPI } from "../services/api"

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [authChecked, setAuthChecked] = useState(false)

  useEffect(() => {
    // Only check auth once when the app loads
    if (!authChecked) {
      checkAuth()
    }
  }, [authChecked])

  const checkAuth = async () => {
    try {
      setLoading(true)
      const response = await authAPI.me()
      setUser(response.data.user)
      setAuthChecked(true)
    } catch (error) {
      // If auth check fails, user is not authenticated
      setUser(null)
      setAuthChecked(true)

      // Only log error if it's not a 401 (which is expected for unauthenticated users)
      if (error.response?.status !== 401) {
        console.error("Auth check error:", error)
      }
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    try {
      const response = await authAPI.login(email, password)
      setUser(response.data.user)
      setAuthChecked(true)
      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Login failed",
      }
    }
  }

  const register = async (email, password, name) => {
    try {
      const response = await authAPI.register(email, password, name)
      setUser(response.data.user)
      setAuthChecked(true)
      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Registration failed",
      }
    }
  }

  const logout = async () => {
    try {
      await authAPI.logout()
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      setUser(null)
      setAuthChecked(true)
    }
  }

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    authChecked,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
