"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Home() {

  const [name, setName] = useState<string>("")
  const router = useRouter()

  const login = () => {

    if (!name.trim()) {
      alert("Please enter your name")
      return
    }

    localStorage.setItem("studentName", name)
    router.push("/exams")
  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100">

      <div className="bg-white p-10 rounded-2xl shadow-xl w-[420px] text-center border">

        <h1 className="text-4xl font-bold mb-2 text-blue-600">
          KAOSHANG
        </h1>

        <p className="text-gray-500 mb-8">
          Online Examination System
        </p>

        <input
          placeholder="Enter your name"
          className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button
          onClick={login}
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-lg font-semibold shadow mb-4"
        >
          Start Exam
        </button>

        <button
          onClick={() => router.push("/admin")}
          className="w-full text-black bg-gray-200 hover:bg-gray-300 transition py-3 rounded-lg font-semibold"
        >
          Admin Panel
        </button>

      </div>

    </div>

  )
}