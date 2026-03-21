"use client"

import { useState } from "react"
import Header from "@/components/Header"
import AuthModal from "@/components/AuthModal"
import { AuthProvider, useAuth } from "@/context/AuthContext"

function InnerShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState<"login" | "register">("login")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const { login } = useAuth()
  const [loading, setLoading] = useState(false)


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
      return;
    } 
    setLoading(false)

    // 🔥 dùng context thay vì localStorage trực tiếp
    login(data.user)
    console.log("user data", )

    setUsername("")
    setPassword("")
    setOpen(false)
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
  return (
      <InnerShell>{children}</InnerShell>
  )
}