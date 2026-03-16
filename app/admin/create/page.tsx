"use client"

import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"

export default function CreateExamPage() {

  const router = useRouter()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const [questions, setQuestions] = useState([
    {
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0
    }
  ])

  const addQuestion = () => {

    setQuestions([
      ...questions,
      {
        question: "",
        options: ["", "", "", ""],
        correctAnswer: 0
      }
    ])

  }

  const updateQuestion = (index: number, value: string) => {

    const copy = [...questions]

    copy[index].question = value

    setQuestions(copy)

  }

  const updateOption = (
    qi: number,
    oi: number,
    value: string
  ) => {

    const copy = [...questions]

    copy[qi].options[oi] = value

    setQuestions(copy)

  }

  const submitExam = async () => {

    await axios.post("/api/exam/create", {
      title,
      description,
      questions
    })

    router.push("/exams")

  }

  return (

    <div className="min-h-screen bg-gray-50 flex justify-center">

      <div className="w-full max-w-3xl bg-white p-8 shadow rounded-lg mt-10">
        <div className="flex justify-between mb-6">

          <button
            onClick={() => router.push("/admin")}
            className="bg-gray-200 px-4 py-2 rounded"
          >
            Back
          </button>

          <button
            onClick={async () => {
              await axios.post("/api/admin/logout")
              router.push("/admin")
            }}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>

        </div>
        <h1 className="text-3xl font-bold mb-6">
          Create Exam
        </h1>

        <input
          className="w-full border rounded p-3 mb-4"
          placeholder="Exam title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full border rounded p-3 mb-6"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {questions.map((q, qi) => (

          <div
            key={qi}
            className="border p-6 rounded-lg mb-6 bg-gray-50"
          >

            <h2 className="font-semibold mb-3">
              Question {qi + 1}
            </h2>

            <input
              className="w-full border rounded p-2 mb-4"
              placeholder="Question"
              value={q.question}
              onChange={(e) =>
                updateQuestion(qi, e.target.value)
              }
            />

            {q.options.map((op, oi) => (

              <div
                key={oi}
                className="flex gap-2 mb-2"
              >

                <input
                  type="radio"
                  checked={q.correctAnswer === oi}
                  onChange={() => {

                    const copy = [...questions]

                    copy[qi].correctAnswer = oi

                    setQuestions(copy)

                  }}
                />

                <input
                  className="flex-1 border rounded p-2"
                  placeholder={`Option ${oi + 1}`}
                  value={op}
                  onChange={(e) =>
                    updateOption(
                      qi,
                      oi,
                      e.target.value
                    )
                  }
                />

              </div>

            ))}

          </div>

        ))}

        <button
          onClick={addQuestion}
          className="bg-gray-200 px-4 py-2 rounded mr-4"
        >
          Add Question
        </button>

        <button
          onClick={submitExam}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Create Exam
        </button>

      </div>

    </div>

  )
}