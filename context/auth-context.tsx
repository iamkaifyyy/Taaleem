"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

interface User {
  name: string
  email: string
  role: string
  classGroup: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check local storage for existing session
    const storedUser = localStorage.getItem("dlp_user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (e) {
        localStorage.removeItem("dlp_user")
      }
    }
    setLoading(false)
  }, [])

  const login = async (email: string): Promise<boolean> => {
    setLoading(true)
    // Simulated API call latency
    await new Promise((resolve) => setTimeout(resolve, 800))
    
    // Accept any login for demo simplicity, but default to Rajesh Kumar
    const defaultUser: User = {
      name: email.toLowerCase().startsWith("priya") ? "Mrs. Priya Sharma" : "Rajesh Kumar",
      email: email || "rajesh.kumar@student.nabha.edu",
      role: email.toLowerCase().startsWith("priya") ? "Teacher" : "Student",
      classGroup: "Class 10-A",
      avatar: email.toLowerCase().startsWith("priya") ? "" : "RK",
    }
    
    setUser(defaultUser)
    localStorage.setItem("dlp_user", JSON.stringify(defaultUser))
    setLoading(false)
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("dlp_user")
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
