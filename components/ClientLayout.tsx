"use client"

import { useState } from "react"
import Header from "@/components/Header"
import AuthModal from "@/components/AuthModal"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState<"login" | "register">("login")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async () => {
    const endpoint =
      mode === "login"
        ? "/api/auth/login"
        : "/api/auth/register"

    const res = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify({ username, password }),
    })

    const data = await res.json()

    if (!res.ok) return alert(data.message)

    localStorage.setItem("username", data.user.username)
    localStorage.setItem("role", data.user.role)

    setOpen(false)

    // trigger update UI header
    window.location.reload()
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
      />
    </>
  )
}