"use client"

import { useState } from "react"
import Header from "@/components/Header"
import AuthModal from "@/components/AuthModal"
import Footer from "./Footer"
import { useAuth } from "@/context/AuthContext"

function InnerShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState<"login" | "register">("login")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const { setUser, loading: authLoading } = useAuth() // 🔥 thêm

  const handleSubmit = async () => {
    if (!username || !password) return alert("Nhập đầy đủ")

    const endpoint =
      mode === "login"
        ? "/api/auth/login"
        : "/api/auth/register"

    setLoading(true)

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })

    const data = await res.json()

    if (!res.ok) {
      alert(data.message)
      setLoading(false)
      return
    }

    setUser(data.user) // 🔥 sync UI
    setLoading(false)
    setUsername("")
    setPassword("")
    setOpen(false)
  }

  // 🔥 AUTH LOADING GATE
  if (authLoading) {
    return (
      <div className="min-h-screen p-10">
        {/* Header */}
        <div className="h-10 w-48 rounded mb-6 shimmer-blue"></div>

        {/* Hero title */}
        <div className="space-y-4 mb-8">
          <div className="h-12 w-2/3 rounded shimmer-blue"></div>
          <div className="h-12 w-1/2 rounded shimmer-blue"></div>
          <div className="h-12 w-1/3 rounded shimmer-blue"></div>
        </div>

        {/* Subtitle */}
        <div className="space-y-3 mb-6">
          <div className="h-4 w-1/2 rounded shimmer-blue"></div>
          <div className="h-4 w-1/3 rounded shimmer-blue"></div>
        </div>

        {/* Button */}
        <div className="h-10 w-40 rounded-lg shimmer-blue"></div>
      </div>
    )
  }

  return (
    <>
      <Header
        onOpenAuth={(m) => {
          setMode(m)
          setOpen(true)
        }}
      />

      {children}

      <Footer />

      <AuthModal
        open={open}
        mode={mode}
        setMode={setMode}
        onClose={() => setOpen(false)}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        onSubmit={handleSubmit}
        loading={loading}
      />
    </>
  )
}

export default function ClientShell({
  children,
}: {
  children: React.ReactNode
}) {
  return <InnerShell>{children}</InnerShell>
}