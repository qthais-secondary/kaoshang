"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import { ExamType, ResultType } from "@/models/types"

export default function ExamPage() {

  const { id } = useParams()
  const router = useRouter()

  const [exam, setExam] = useState<ExamType | null>(null)
  const [answers, setAnswers] = useState<number[]>([])
  const [result, setResult] = useState<ResultType | null>(null)

  const [time, setTime] = useState(600)

  useEffect(() => {

    if (!id) return

    const fetchExam = async () => {

      const res = await axios.get<ExamType>(
        `/api/exam/get?id=${id}`
      )

      setExam(res.data)

      setAnswers(
        new Array(res.data.questions.length).fill(-1)
      )

    }

    fetchExam()

  }, [id])

  async function submitExam() {

    if (result) return

    const res = await axios.post(
      "/api/exam/submit",
      {
        examId: id,
        answers
      }
    )

    setResult(res.data)

  }

  useEffect(() => {

    const timer = setInterval(() => {

      setTime((t) => {

        if (t <= 0) {

          clearInterval(timer)
          submitExam()
          return 0

        }

        return t - 1

      })

    }, 1000)

    return () => clearInterval(timer)

  }, [])

  if (!exam) return <div className="p-10">Loading...</div>

  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  return (

    <div className="min-h-screen bg-[#1b2a4a] flex justify-center gap-10 p-10">

      {/* LEFT PANEL */}

      <div className="w-64">

        <div className="sticky top-10 bg-white rounded-3xl p-6 shadow-lg">

          <div className="text-center text-4xl font-bold mb-6">
            {minutes}:{seconds.toString().padStart(2, "0")}
          </div>

          <div className="flex flex-wrap gap-3 justify-center mb-6">

            {answers.map((a, i) => (

              <button
                key={i}
                onClick={() => {

                  document
                    .getElementById(`question-${i}`)
                    ?.scrollIntoView({
                      behavior: "smooth"
                    })

                }}
                className={`w-10 h-10 rounded-full text-white font-bold
                ${a !== -1
                    ? "bg-green-500"
                    : "bg-red-500"
                  }`}
              >
                {i + 1}
              </button>

            ))}

          </div>

          <button
            onClick={submitExam}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 rounded-xl text-lg"
          >
            Nộp bài
          </button>

        </div>

      </div>


      {/* QUESTIONS */}

      <div className="w-full max-w-3xl">

        <div className="bg-white p-8 rounded-xl shadow">

          <h1 className="text-3xl font-bold mb-4">
            {exam.title}
          </h1>

          {exam.questions.map((q, qi) => (

            <div
              id={`question-${qi}`}
              key={qi}
              className="mt-8 p-6 border rounded-lg bg-gray-50"
            >

              <h2 className="font-semibold text-lg mb-3">

                {qi + 1}. {q.question}

              </h2>

              {q.options.map((op, oi) => {

                let color = ""

                if (result) {

                  if (oi === result.correctAnswers[qi]) {
                    color = "bg-green-200 border-green-500"
                  }

                  else if (answers[qi] === oi) {
                    color = "bg-red-200 border-red-500"
                  }

                }

                return (

                  <label
                    key={oi}
                    className={`flex items-center gap-3 p-2 rounded border cursor-pointer ${color}`}
                  >

                    <input
                      type="radio"
                      disabled={!!result}
                      name={`q-${qi}`}
                      checked={answers[qi] === oi}
                      className="accent-blue-500"
                      onChange={() => {

                        const copy = [...answers]
                        copy[qi] = oi

                        setAnswers(copy)

                      }}
                    />

                    {op}

                  </label>

                )

              })}

            </div>

          ))}


          {result && (

            <div className="mt-8 p-6 bg-green-100 border border-green-300 rounded-lg">

              <div className="text-xl font-bold text-green-800 mb-4">
                Score: {result.score} / {result.total}
              </div>

              <div className="flex gap-4">

                <button
                  onClick={() => router.push("/exams")}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                >
                  Back
                </button>

                <button
                  onClick={() => {

                    setResult(null)

                    setAnswers(
                      new Array(exam.questions.length).fill(-1)
                    )

                    setTime(600)

                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Redo
                </button>

              </div>

            </div>

          )}

        </div>

      </div>

    </div>

  )

}