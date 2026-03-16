import { connectDB } from "@/lib/mongodb"
import { Exam } from "@/models/Exam"
import { Result } from "@/models/Result"
import { QuestionType } from "@/models/types"
import { NextResponse } from "next/server"

export async function POST(req: Request) {

  await connectDB()

  const { examId, answers } = await req.json()

  const exam = await Exam
    .findById(examId)
    .populate("questions")

  let score = 0

  const answerDetails = exam.questions.map(
    (q: QuestionType, i: number) => {

      const correct = answers[i] === q.correctAnswer

      if (correct) score++

      return {
        question: q._id,
        selected: answers[i],
        correct
      }
    }
  )

  const result = await Result.create({
    exam: examId,
    answers: answerDetails,
    score,
    totalQuestions: exam.questions.length,
    correctCount: score
  })

  return NextResponse.json({
    score,
    total: exam.questions.length,
    answers: answerDetails,
    correctAnswers: exam.questions.map(
      (q: QuestionType) => q.correctAnswer
    )
  })

}