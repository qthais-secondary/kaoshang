"use client"

import { createContext, useContext, useEffect, useState } from "react"

type User = {
  _id: string
  username: string
  role: string
}

type AuthContextType = {
  user: User | null
  setUser: (user: User | null) => void
  logout: () => Promise<void>
  loading: boolean // 🔥 thêm
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true) // 🔥 mặc định true

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          credentials: "include",
        })

        if (!res.ok) {
          setUser(null)
          return
        }

        const data = await res.json()
        setUser(data.user)
      } catch {
        setUser(null)
      } finally {
        setLoading(false) // 🔥 luôn tắt loading
      }
    }

    fetchMe()
  }, [])

  const logout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    })
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}