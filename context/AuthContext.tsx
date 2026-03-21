"use client"

import { createContext, useContext, useEffect, useState } from "react"

type User = {
  username: string
  role: string
}

type AuthContextType = {
  user: User | null
  login: (user: User) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  // load từ localStorage khi mount
  useEffect(() => {
    const username = localStorage.getItem("username")
    const role = localStorage.getItem("role")

    if (username && role) {
      setUser({ username, role })
    }
  }, [])

  const login = (user: User) => {
    localStorage.setItem("username", user.username)
    localStorage.setItem("role", user.role)
    setUser(user)
  }

  const logout = () => {
    localStorage.removeItem("username")
    localStorage.removeItem("role")
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// custom hook
export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}