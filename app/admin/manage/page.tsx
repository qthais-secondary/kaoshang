"use client"

import { useEffect, useState } from "react"
import axios from "axios"

type QuestionForm = {
  question: string
  options: string[]
  correctAnswer: number
  explanation?: string
  difficulty: string
}

type Exam = {
  _id: string
  title: string
  description?: string
}

type FormType = {
  title: string
  description: string
  questions: QuestionForm[]
}

export default function AdminExamsPage() {

  const [exams, setExams] = useState<Exam[]>([])
  const [loading, setLoading] = useState(true)

  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Exam | null>(null)

  const [form, setForm] = useState<FormType>({
    title: "",
    description: "",
    questions: []
  })

  // 🔥 fetch exams
  const fetchExams = async () => {
    try {
      const res = await axios.get("/api/exam/list")
      setExams(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchExams()
  }, [])

  // 🔥 CREATE
  const handleCreate = () => {
    setEditing(null)
    setForm({
      title: "",
      description: "",
      questions: []
    })
    setOpen(true)
  }

  // 🔥 EDIT (load full exam)
  const handleEdit = async (exam: Exam) => {
    try {
      const res = await axios.get(`/api/exam/${exam._id}`)
      console.log({res})

      setEditing(exam)

      setForm({
        title: res.data.title,
        description: res.data.description || "",
        questions: res.data.questions || []
      })

      setOpen(true)
    } catch (err) {
      console.error(err)
    }
  }

  // 🔥 SUBMIT
  const handleSubmit = async () => {
    try {

      if (editing) {
        await axios.put(`/api/exam/${editing._id}`, form)
      } else {
        await axios.post("/api/exam/create", form)
      }

      setOpen(false)
      fetchExams()

    } catch (err) {
      console.error(err)
    }
  }

  // 🔥 DELETE
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this exam?")) return

    try {
      await axios.delete(`/api/exam/${id}`)
      fetchExams()
    } catch (err) {
      console.error(err)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    )
  }

  return (

    <div className="min-h-screen bg-background-light p-10">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">

          <h1 className="text-3xl font-bold text-gray-900">
            Quản lý đề thi
          </h1>

          <button
            onClick={handleCreate}
            className="bg-primary hover:opacity-90 text-white px-4 py-2 rounded-xl transition"
          >
            + Tạo đề
          </button>

        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

          {exams.map((exam) => (

            <div
              key={exam._id}
              className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition hover:-translate-y-1"
            >

              <h2 className="font-semibold text-gray-800 mb-2">
                {exam.title}
              </h2>

              <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                {exam.description || "No description"}
              </p>

              <div className="flex gap-2">

                <button
                  onClick={() => handleEdit(exam)}
                  className="flex-1 border rounded-lg py-1 hover:bg-gray-100"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(exam._id)}
                  className="flex-1 bg-red-500 text-white rounded-lg py-1 hover:bg-red-600"
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* 🔥 MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 overflow-auto">

          <div className="bg-white rounded-2xl p-6 w-full max-w-3xl shadow-xl animate-fadeIn">

            <h2 className="text-xl font-semibold mb-4">
              {editing ? "Edit Exam" : "Create Exam"}
            </h2>

            {/* TITLE */}
            <input
              placeholder="Title"
              value={form.title}
              onChange={(e) =>
                setForm(prev => ({ ...prev, title: e.target.value }))
              }
              className="w-full border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition"
            />

            {/* DESCRIPTION */}
            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm(prev => ({ ...prev, description: e.target.value }))
              }
              className="w-full border rounded-lg p-2 mb-4"
            />

            {/* QUESTIONS */}
            <div className="space-y-4 max-h-[400px] overflow-auto">

              {form.questions.map((q, index) => (

                <div key={index} className="border border-gray-200 rounded-2xl p-4 bg-white shadow-sm">

                  <div className="flex justify-between mb-2">
                    <h4>Question {index + 1}</h4>

                    <button
                      onClick={() => {
                        const newQs = [...form.questions]
                        newQs.splice(index, 1)
                        setForm(prev => ({ ...prev, questions: newQs }))
                      }}
                      className="text-red-500 text-sm"
                    >
                      Delete
                    </button>
                  </div>

                  {/* QUESTION */}
                  <textarea
                    value={q.question}
                    onChange={(e) => {
                      const newQs = [...form.questions]
                      newQs[index].question = e.target.value
                      setForm(prev => ({ ...prev, questions: newQs }))
                    }}
                    className="w-full border rounded p-2 mb-2"
                  />

                  {/* OPTIONS */}
                  {q.options.map((opt, i) => (

                    <div key={i} className="flex gap-2 mb-2 items-center">

                      <input
                        type="radio"
                        className="accent-primary"
                        checked={q.correctAnswer === i}
                        onChange={() => {
                          const newQs = [...form.questions]
                          newQs[index].correctAnswer = i
                          setForm(prev => ({ ...prev, questions: newQs }))
                        }}
                      />

                      <input
                        value={opt}
                        onChange={(e) => {
                          const newQs = [...form.questions]
                          newQs[index].options[i] = e.target.value
                          setForm(prev => ({ ...prev, questions: newQs }))
                        }}
                        className="flex-1 border rounded p-1"
                      />

                    </div>

                  ))}

                  {/* EXPLANATION */}
                  <input
                    value={q.explanation || ""}
                    onChange={(e) => {
                      const newQs = [...form.questions]
                      newQs[index].explanation = e.target.value
                      setForm(prev => ({ ...prev, questions: newQs }))
                    }}
                    className="w-full border rounded p-2 mt-2"
                    placeholder="Explanation"
                  />

                  {/* DIFFICULTY */}
                  <select
                    value={q.difficulty}
                    onChange={(e) => {
                      const newQs = [...form.questions]
                      newQs[index].difficulty = e.target.value
                      setForm(prev => ({ ...prev, questions: newQs }))
                    }}
                     className="mt-2 border border-gray-200 rounded-lg px-2 py-1 focus:ring-2 focus:ring-primary"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>

                </div>

              ))}

            </div>

            {/* ADD QUESTION */}
            <button
              onClick={() => {
                setForm(prev => ({
                  ...prev,
                  questions: [
                    ...prev.questions,
                    {
                      question: "",
                      options: ["", "", "", ""],
                      correctAnswer: 0,
                      explanation: "",
                      difficulty: "medium"
                    }
                  ]
                }))
              }}
              className="mt-4 text-primary font-medium hover:underline"
            >
              + Add Question
            </button>

            {/* ACTION */}
            <div className="flex justify-end gap-2 mt-6">

              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-primary text-white rounded-xl hover:opacity-90 transition"
              >
                Save
              </button>

            </div>

          </div>

        </div>
      )}

    </div>

  )
}