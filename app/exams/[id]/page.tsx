"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import { ExamType, SubmitResponse } from "@/models/types"
import { useAuth } from "@/context/AuthContext"

export default function ExamPage() {
    const { user } = useAuth()
    const { id } = useParams()
    const router = useRouter()

    const [exam, setExam] = useState<ExamType | null>(null)
    const [answers, setAnswers] = useState<number[]>([])
    const [result, setResult] = useState<SubmitResponse | null>(null)
    const [isSubmit, setIsSubmit] = useState(false)
    const [time, setTime] = useState(600)

    // FETCH EXAM
    useEffect(() => {
        if (!id) return

        const fetchExam = async () => {
            const res = await axios.get<ExamType>(`/api/exam/get?id=${id}`)

            setExam(res.data)
            setAnswers(new Array(res.data.questions.length).fill(-1))
        }

        fetchExam()
    }, [id])

    // SUBMIT
    async function submitExam() {
        if (result) return

        setIsSubmit(true)

        try {

            const examId = Array.isArray(id) ? id[0] : id

            // 🔥 clean answers
            const cleanedAnswers = answers.map(a => a === -1 ? null : a)

            const res = await axios.post("/api/exam/submit", {
                userId: user?._id,
                examId,
                answers: cleanedAnswers,
                duration: 600 - time
            })
            console.log({res})

            setResult(res.data)

        } catch (err) {
            console.error(err)
        }

        setIsSubmit(false)
    }

    // TIMER
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

    if (!exam) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
                <div className="text-gray-500 text-lg">Loading...</div>
            </div>
        )
    }

    const minutes = Math.floor(time / 60)
    const seconds = time % 60

    const answeredCount = answers.filter(a => a !== -1).length

    return (
        <div className="min-h-screen bg-[#f8fafc] flex justify-center gap-6 p-6">

            {/* LEFT PANEL */}
            <div className="w-72">

                <div className="sticky top-6 bg-white rounded-2xl p-6 shadow-md border border-gray-100">

                    {/* TIMER */}
                    <div className="text-center text-3xl font-bold text-[var(--primary)] mb-6">
                        {minutes}:{seconds.toString().padStart(2, "0")}
                    </div>

                    {/* PROGRESS */}
                    <div className="mb-6">
                        <div className="text-sm text-gray-500 mb-2 text-center">
                            {answeredCount} / {answers.length} câu
                        </div>

                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-[var(--primary)] transition-all"
                                style={{
                                    width: `${(answeredCount / answers.length) * 100}%`
                                }}
                            />
                        </div>
                    </div>

                    {/* QUESTION NAV */}
                    <div className="flex flex-wrap gap-2 justify-center mb-6">
                        {answers.map((a, i) => (
                            <button
                                key={i}
                                onClick={() => {
                                    document
                                        .getElementById(`question-${i}`)
                                        ?.scrollIntoView({ behavior: "smooth" })
                                }}
                                className={`
                  w-9 h-9 rounded-lg text-sm font-semibold transition
                  ${a !== -1
                                        ? "bg-[var(--primary)] text-white"
                                        : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                                    }
                `}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>

                    {/* SUBMIT */}
                    <button
                        onClick={submitExam}
                        disabled={isSubmit || !!result}
                        className="
              w-full py-3 rounded-xl font-semibold text-white
              bg-[var(--primary)] hover:opacity-90 transition
              disabled:opacity-50
            "
                    >
                        {isSubmit ? "Đang nộp..." : result ? "Đã nộp" : "Nộp bài"}
                    </button>

                </div>
            </div>

            {/* QUESTIONS */}
            <div className="w-full max-w-3xl">

                <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100">

                    <h1 className="text-2xl font-bold mb-6 text-gray-800">
                        {exam.title}
                    </h1>

                    {exam.questions.map((q, qi) => (

                        <div
                            id={`question-${qi}`}
                            key={qi}
                            className="mt-6 p-6 rounded-xl border border-gray-200 bg-gray-50"
                        >

                            <h2 className="font-semibold text-base mb-4 text-gray-800">
                                {qi + 1}. {q.question}
                            </h2>

                            <div className="flex flex-col gap-3">

                                {q.options.map((op, oi) => (
                                    <label
                                        key={oi}
                                        className={`
                      flex items-center gap-3 p-3 rounded-xl border transition cursor-pointer
                      border-gray-200 hover:border-[var(--primary)]
                      ${result ? "opacity-70 cursor-not-allowed" : ""}
                    `}
                                    >
                                        <input
                                            type="radio"
                                            disabled={!!result}
                                            name={`q-${qi}`}
                                            checked={answers[qi] === oi}
                                            className="accent-[var(--primary)]"
                                            onChange={() => {
                                                const copy = [...answers]
                                                copy[qi] = oi
                                                setAnswers(copy)
                                            }}
                                        />

                                        <span className="text-gray-700">{op}</span>
                                    </label>
                                ))}

                            </div>
                        </div>
                    ))}

                    {/* RESULT */}
                    {result && (
                        <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-2xl">

                            <div className="text-xl font-bold text-[var(--primary)] mb-2">
                                Score: {result.score} / {result.total}
                            </div>

                            <div className="text-sm text-gray-600 mb-4">
                                Correct: {result.correctCount}
                            </div>

                            <div className="flex gap-3">

                                <button
                                    onClick={() => router.push("/exams")}
                                    className="
                    px-4 py-2 rounded-xl font-medium text-white
                    bg-gray-500 hover:bg-gray-600 transition
                  "
                                >
                                    Back
                                </button>

                                <button
                                    onClick={() => router.push(`/result/${result.resultId}`)}
                                    className="
                    px-4 py-2 rounded-xl font-medium text-white
                    bg-green-500 hover:bg-green-600 transition
                  "
                                >
                                    Review
                                </button>

                                <button
                                    onClick={() => {
                                        setResult(null)
                                        setAnswers(new Array(exam.questions.length).fill(-1))
                                        setTime(600)
                                    }}
                                    className="
                    px-4 py-2 rounded-xl font-medium text-white
                    bg-[var(--primary)] hover:opacity-90 transition
                  "
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