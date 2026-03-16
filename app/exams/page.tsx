"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import Link from "next/link"
import { ExamType } from "@/models/types"

export default function ExamsPage() {

  const [exams, setExams] = useState<ExamType[]>([])

 useEffect(() => {
  const fetchExams = async () => {
    try {
      const res = await axios.get("/api/exam/list")
      setExams(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  fetchExams()
}, [])


  return (

    <div className="min-h-screen bg-gray-50 flex justify-center">

      <div className="w-full max-w-4xl p-8">

        <h1 className="text-3xl font-bold mb-8">
          Available Exams
        </h1>

        <div className="grid gap-6">

          {exams.map((exam) => (

            <Link
              key={exam._id?.toString()}
              href={`/exams/${exam._id}`}
            >

              <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition cursor-pointer border">

                <h2 className="text-xl font-semibold">
                  {exam.title}
                </h2>

                <p className="text-gray-500 mt-2">
                  {exam.description}
                </p>

                <div className="text-sm text-gray-400 mt-3">
                  {exam.questions.length} questions
                </div>

              </div>

            </Link>

          ))}

        </div>

      </div>

    </div>

  )
}