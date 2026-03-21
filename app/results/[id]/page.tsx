"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import { ResultType } from "@/models/types"

export default function ResultPage() {

  const { id } = useParams()
  const router = useRouter()

  const [result, setResult] = useState<ResultType | null>(null)

  useEffect(() => {
    if (!id) return

    const fetchResult = async () => {
      const res = await axios.get<ResultType>(`/api/result/${id}`)
      console.log(res.data)
      setResult(res.data)
    }

    fetchResult()
  }, [id])

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="text-gray-500 text-lg">Loading...</div>
      </div>
    )
  }

  const percent = Math.round(
    (result.correctCount / result.totalQuestions) * 100
  )

  return (
    <div className="min-h-screen bg-[#f8fafc] flex justify-center p-6">

      <div className="w-full max-w-3xl">

        {/* HEADER */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 mb-6">

          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {result.examTitle}
          </h1>

          <div className="text-gray-600 mb-4">
            Score: {result.score} / {result.totalQuestions} ({percent}%)
          </div>

          {/* PROGRESS BAR */}
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--primary)]"
              style={{ width: `${percent}%` }}
            />
          </div>

        </div>

        {/* QUESTIONS */}
        <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100">

          {result.answers.map((q, qi) => (

            <div
              key={qi}
              className="mt-6 p-6 rounded-xl border border-gray-200 bg-gray-50"
            >

              <h2 className="font-semibold text-base mb-4 text-gray-800">
                {qi + 1}. {q.questionText}
              </h2>

              <div className="flex flex-col gap-3">

                {q.options.map((op, oi) => {

                  let style = "border-gray-200"

                  if (oi === q.correctAnswer) {
                    style = "bg-green-100 border-green-400"
                  }

                  if (oi === q.selected && oi !== q.correctAnswer) {
                    style = "bg-red-100 border-red-400"
                  }

                  return (
                    <div
                      key={oi}
                      className={`
                        flex items-center gap-3 p-3 rounded-xl border
                        ${style}
                      `}
                    >
                      <div className="w-5 h-5 flex items-center justify-center text-sm font-bold">
                        {String.fromCharCode(65 + oi)}
                      </div>

                      <span className="text-gray-700">{op}</span>
                    </div>
                  )
                })}

              </div>

              {/* RESULT TEXT */}
              <div className="mt-4 text-sm font-medium">
                {q.isCorrect ? (
                  <span className="text-green-600">✔ Correct</span>
                ) : (
                  <span className="text-red-600">
                    ✘ Sai (Đáp án đúng: {String.fromCharCode(65 + q.correctAnswer)})
                  </span>
                )}
              </div>

            </div>
          ))}

          {/* ACTIONS */}
          <div className="mt-8 flex gap-3">

            <button
              onClick={() => router.push("/history")}
              className="
                px-4 py-2 rounded-xl font-medium text-white
                bg-gray-500 hover:bg-gray-600 transition
              "
            >
              History
            </button>

            <button
              onClick={() => router.push("/exams")}
              className="
                px-4 py-2 rounded-xl font-medium text-white
                bg-[var(--primary)] hover:opacity-90 transition
              "
            >
              Do another exam
            </button>

          </div>

        </div>

      </div>

    </div>
  )
}