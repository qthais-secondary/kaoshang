
import {connectDB} from "@/lib/mongodb"
import { Question } from "@/models/Question"
import { Exam } from "@/models/Exam"
import { Result } from "@/models/Result"
import data from "@/models/models.json"

import { NextResponse } from "next/server"

export async function GET() {

  await connectDB()

  await Question.deleteMany({})
  await Exam.deleteMany({})
  await Result.deleteMany({})

  await Question.insertMany(data.questions)
  await Exam.insertMany(data.exams)
  await Result.insertMany(data.results)

  return NextResponse.json({ message: "seed success" })

}

