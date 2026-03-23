"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js"

import { Pie } from "react-chartjs-2"
import { useAuth } from "@/context/AuthContext"

ChartJS.register(ArcElement, Tooltip, Legend)

type QuestionStat = {
  question: string
  wrong: number
  total: number
  wrongRate: number
}

type ExamStat = {
  title: string
  correct: number
  wrong: number
  correctRate: number
  wrongRate: number
  questions: QuestionStat[]
}

export default function DashboardPage() {

  const [stats, setStats] = useState<ExamStat[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const {logout}=useAuth()

  const router = useRouter()

  useEffect(() => {

    const fetchStats = async () => {

      try {

        const res = await axios.get("/api/admin/stats", {
          withCredentials: true
        })

        setStats(res.data)

      } catch (err) {

        console.error(err)
        setError("Failed to load statistics")

      } finally {

        setLoading(false)

      }

    }

    fetchStats()

  }, [])

  // 🔥 Loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading statistics...
      </div>
    )
  }

  // 🔥 Error
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    )
  }

  return (

    <div className="min-h-screen bg-gray-50 p-10">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">

          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard Analytics
          </h1>

          <div className="flex gap-3">

            <button
              onClick={() => router.push("/admin")}
              className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-100 transition"
            >
              Back
            </button>

            <button
              onClick={logout}
              className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
            >
              Logout
            </button>

          </div>

        </div>

        {/* EMPTY */}
        {stats.length === 0 && (
          <p className="text-gray-500">
            No statistics yet.
          </p>
        )}

        <div className="space-y-10">

          {stats.map((exam, i) => {

            const data = {
              labels: [
                `Correct (${exam.correctRate}%)`,
                `Wrong (${exam.wrongRate}%)`
              ],
              datasets: [
                {
                  data: [exam.correct, exam.wrong],
                  backgroundColor: ["#2563eb", "#ef4444"]
                }
              ]
            }

            return (

              <div
                key={i}
                className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
              >

                {/* TITLE */}
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                  {exam.title}
                </h2>

                <div className="flex flex-col md:flex-row gap-10">

                  {/* PIE */}
                  <div className="w-60 flex flex-col items-center">

                    <Pie data={data} />

                    <div className="mt-4 text-sm text-gray-600 text-center">
                      <p>
                        <span className="text-blue-600 font-medium">
                          {exam.correct}
                        </span>{" "}
                        correct
                      </p>
                      <p>
                        <span className="text-red-500 font-medium">
                          {exam.wrong}
                        </span>{" "}
                        wrong
                      </p>
                    </div>

                  </div>

                  {/* TABLE */}
                  <div className="flex-1">

                    <h3 className="font-semibold text-gray-700 mb-3">
                      Most Wrong Questions
                    </h3>

                    <table className="w-full text-sm">

                      <thead>
                        <tr className="bg-gray-100 text-gray-600">
                          <th className="p-2 text-left">Question</th>
                          <th className="p-2 text-center">Wrong %</th>
                          <th className="p-2 text-center">Wrong</th>
                          <th className="p-2 text-center">Participants</th>
                        </tr>
                      </thead>

                      <tbody>

                        {[...exam.questions]
                          .sort((a, b) => b.wrongRate - a.wrongRate)
                          .slice(0, 5)
                          .map((q, idx) => (

                            <tr
                              key={idx}
                              className="border-t hover:bg-gray-50 transition"
                            >

                              <td className="p-2 text-gray-800">
                                {q.question}
                              </td>

                              <td className="text-center font-medium text-red-500">
                                {q.wrongRate}%
                              </td>

                              <td className="text-center">
                                {q.wrong}
                              </td>

                              <td className="text-center text-gray-500">
                                {q.total}
                              </td>

                            </tr>

                          ))}

                      </tbody>

                    </table>

                  </div>

                </div>

              </div>

            )

          })}

        </div>

      </div>

    </div>

  )

}