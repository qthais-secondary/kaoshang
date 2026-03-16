import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { Exam } from "@/models/Exam"
import { Question } from "@/models/Question"

export async function POST(req: Request) {

  await connectDB()

  const { title, description, questions } =
    await req.json()

  const createdQuestions = []

  for (const q of questions) {

    const question = await Question.create(q)

    createdQuestions.push(question._id)

  }

  const exam = await Exam.create({

    title,
    description,
    questions: createdQuestions

  })

  return NextResponse.json(exam)

}