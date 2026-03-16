"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"

export default function AdminPage() {

  const [code, setCode] = useState("")
  const [logged, setLogged] = useState(false)

  const router = useRouter()

  useEffect(() => {

    const checkLogin = async () => {

      try {

        const res = await axios.get("/api/admin/check")

        setLogged(res.data.logged)

      } catch (err) {
        console.error(err)
      }

    }

    checkLogin()

  }, [])


  const login = async () => {

    const res = await axios.post("/api/admin/login", { code })

    if (res.data.success) {

      setLogged(true)

    } else {

      alert("Wrong admin code")

    }

  }

  const logout = async () => {

    await axios.post("/api/admin/logout")

    setLogged(false)

  }

  if (logged) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-gray-50">

        <div className="bg-white p-10 rounded-lg shadow w-96 text-center">

          <h1 className="text-2xl font-bold mb-6">
            Admin Panel
          </h1>

          <p className="mb-6 text-green-600 font-semibold">
            You are logged in
          </p>

          <button
            onClick={() => router.push("/admin/create")}
            className="w-full mb-4 bg-blue-600 text-white py-3 rounded"
          >
            Create Exam
          </button>

          <button
            onClick={() => router.push("/admin/dashboard")}
            className="w-full mb-4 bg-purple-600 text-white py-3 rounded"
          >
            Dashboard
          </button>

          <button
            onClick={logout}
            className="w-full mb-4 bg-red-500 text-white py-3 rounded"
          >
            Logout
          </button>

          <button
            onClick={() => router.push("/")}
            className="w-full bg-gray-300 py-3 rounded"
          >
            Back to Home
          </button>

        </div>

      </div>

    )

  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-50">

      <div className="bg-white p-8 rounded-lg shadow w-96">

        <h1 className="text-2xl font-bold mb-6 text-center">
          Admin Login
        </h1>

        <input
          type="password"
          placeholder="Enter admin code"
          className="w-full border rounded p-3 mb-4"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <button
          onClick={login}
          className="w-full bg-blue-600 text-white py-3 rounded mb-4"
        >
          Login
        </button>

        <button
          onClick={() => router.push("/")}
          className="w-full bg-gray-300 py-3 rounded"
        >
          Back to Home
        </button>

      </div>

    </div>

  )

}