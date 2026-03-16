import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { Question } from "@/models/Question"  
import { Exam } from "@/models/Exam"
export async function GET() {

  await connectDB()

  const exams = await Exam.find({})
    .populate("questions")
    .sort({ createdAt: -1 })

  return NextResponse.json(exams)

}