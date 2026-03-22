import { connectDB } from "@/lib/mongodb"
import { Exam } from "@/models/Exam"
import { NextResponse } from "next/server"

export async function GET(req: Request) {

  await connectDB()

  const { searchParams } = new URL(req.url)

  const id = searchParams.get("id")

  const exam = await Exam
    .findById(id)
    .populate("questions")

  return NextResponse.json(exam)

}