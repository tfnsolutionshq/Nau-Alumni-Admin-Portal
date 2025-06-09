"use client"

import { createContext, useContext, useState, useEffect } from "react"
import axios from "axios"

const AuthContext = createContext(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing token on initial load
    const storedToken = localStorage.getItem("authToken")
    if (storedToken) {
      setAuthToken(storedToken)
      // You might want to add token validation here
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      // Using GET with params for login
      const response = await axios.get("https://unizikalumni-api.tfnsolutions.us/api/login", {
        params: { email, password },
        headers: {
          Accept: "application/json",
        },
      })

      const { token, user: userData } = response.data

      if (token) {
        localStorage.setItem("authToken", token)
        setAuthToken(token)
        setUser(userData || null)
        return true
      }
      throw new Error("No token received")
    } catch (error) {
      console.error("Login error:", error)
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "Login failed. Please check your credentials.")
      }
      throw error
    }
  }

  const logout = async () => {
    try {
      if (authToken) {
        await axios.post(
          "https://unizikalumni-api.tfnsolutions.us/api/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          },
        )
      }
    } catch (error) {
      console.error("Logout error:", error)
      // Continue with client-side logout even if server logout fails
    } finally {
      localStorage.removeItem("authToken")
      setAuthToken(null)
      setUser(null)
    }
  }

  const authContextValue = {
    token: authToken, // Expose as 'token' for consistency
    authToken, // Keep authToken for backward compatibility
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!authToken,
  }

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>
}
