import axios from "axios"

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Only redirect to login if we're not already on login/register pages
    // and if it's a 401 error from a protected route
    if (error.response?.status === 401) {
      const currentPath = window.location.pathname
      const isAuthPage = currentPath === "/login" || currentPath === "/register"

      // Only redirect if we're not already on an auth page
      if (!isAuthPage) {
        // Clear any existing auth state
        localStorage.removeItem("auth-checked")
        window.location.href = "/login"
      }
    }
    return Promise.reject(error)
  },
)

export const authAPI = {
  register: (email, password, name) => api.post("/api/auth/register", { email, password, name }),
  login: (email, password) => api.post("/api/auth/login", { email, password }),
  logout: () => api.post("/api/auth/logout"),
  me: () => api.get("/api/auth/me"),
}

export const cryptoAPI = {
  getCoins: () => api.get("/api/coins"),
  getHistory: (coinId) => api.get(`/api/history/${coinId}`),
  saveHistory: () => api.post("/api/history"),
}

export default api
