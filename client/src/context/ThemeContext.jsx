import { createContext, useContext, useState, useEffect } from "react"

const ThemeContext = createContext(undefined)

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    try {
      const saved = localStorage.getItem("theme")
      return saved ? saved === "dark" : false
    } catch {
      return false
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light")
      if (isDark) {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
    } catch (error) {
      console.warn("Failed to save theme preference:", error)
    }
  }, [isDark])

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}