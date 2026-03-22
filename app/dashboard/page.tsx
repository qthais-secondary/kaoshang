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

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
)

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

  const router = useRouter()

  useEffect(() => {

    const fetchStats = async () => {

      try {

        const res = await axios.get("/api/admin/stats")

        setStats(res.data)

      } catch (err) {

        console.error(err)

      } finally {

        setLoading(false)

      }

    }

    fetchStats()

  }, [])

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        Loading statistics...

      </div>

    )

  }

  return (

    <div className="min-h-screen bg-gray-50 p-10">

      <div className="max-w-6xl mx-auto bg-white p-8 rounded-xl shadow">

        <div className="flex justify-between mb-8">

          <button
            onClick={() => router.push("/admin")}
            className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
          >
            Back
          </button>

          <button
            onClick={async () => {

              await axios.post("/api/admin/logout")

              router.push("/admin")

            }}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>

        </div>

        <h1 className="text-3xl font-bold mb-10">

          Exam Analytics

        </h1>

        {stats.length === 0 && (

          <p className="text-gray-500">

            No statistics yet.

          </p>

        )}

        <div className="space-y-12">

          {stats.map((exam, i) => {

            const data = {

              labels: [
                `Correct (${exam.correctRate}%)`,
                `Wrong (${exam.wrongRate}%)`
              ],

              datasets: [
                {
                  data: [
                    exam.correct,
                    exam.wrong
                  ],

                  backgroundColor: [
                    "#22c55e",
                    "#ef4444"
                  ]
                }
              ]

            }

            return (

              <div
                key={i}
                className="border rounded-lg p-6"
              >

                <h2 className="text-xl font-semibold mb-6">

                  {exam.title}

                </h2>

                <div className="flex flex-col md:flex-row gap-10">

                  <div className="w-60">

                    <Pie data={data} />

                    <div className="mt-4 text-sm text-gray-600">

                      <p>Correct answers: {exam.correct}</p>

                      <p>Wrong answers: {exam.wrong}</p>

                    </div>

                  </div>

                  <div className="flex-1">

                    <h3 className="font-semibold mb-3">

                      Most Wrong Questions

                    </h3>

                    <table className="w-full text-sm border">

                      <thead className="bg-gray-100">

                        <tr>

                          <th className="p-2 text-left">
                            Question
                          </th>

                          <th className="p-2 text-center">
                            Wrong %
                          </th>

                          <th className="p-2 text-center">
                            Wrong
                          </th>

                          <th className="p-2 text-center">
                            Attempts
                          </th>

                        </tr>

                      </thead>

                      <tbody>

                        {exam.questions
                          .sort(
                            (a, b) =>
                              b.wrongRate - a.wrongRate
                          )
                          .slice(0, 5)
                          .map((q, idx) => (

                            <tr
                              key={idx}
                              className="border-t"
                            >

                              <td className="p-2">

                                {q.question}

                              </td>

                              <td className="text-center">

                                {q.wrongRate}%

                              </td>

                              <td className="text-center">

                                {q.wrong}

                              </td>

                              <td className="text-center">

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