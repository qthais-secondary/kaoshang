import { connectDB } from "@/lib/mongodb"
import { Question } from "@/models"
import { Exam } from "@/models/Exam"
import { NextResponse } from "next/server"

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB()
  const { id } = await context.params
  const exam = await Exam
    .findById(id)
    .populate("questions")

  if (!exam) {
    return NextResponse.json(
      { message: "Exam not found" },
      { status: 404 }
    )
  }

  return NextResponse.json(exam)
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()

    const { id } = await context.params
    const { title, description, questions } = await req.json()

    const exam = await Exam.findById(id)

    if (!exam) {
      return NextResponse.json(
        { message: "Exam not found" },
        { status: 404 }
      )
    }

    // ❗ Xóa question cũ
    await Question.deleteMany({
      _id: { $in: exam.questions }
    })

    // ✅ tạo question mới
    const newQuestions = await Promise.all(
      questions.map((q: any) => Question.create(q))
    )

    // ✅ update exam
    exam.title = title
    exam.description = description
    exam.questions = newQuestions.map(q => q._id)

    await exam.save()

    return NextResponse.json(exam)

  } catch (err) {
    console.error(err)

    return NextResponse.json(
      { message: "Update failed" },
      { status: 500 }
    )
  }
}

export async function DELETE(req: Request, context: { params: Promise<{ id: string }>}) {
  try {
    await connectDB()

    const { id } = await context.params

    const exam = await Exam.findById(id)

    if (!exam) {
      return NextResponse.json(
        { message: "Exam not found" },
        { status: 404 }
      )
    }

    // Xóa questions liên quan
    await Question.deleteMany({
      _id: { $in: exam.questions }
    })

    // Xóa exam
    await Exam.findByIdAndDelete(id)

    return NextResponse.json({
      message: "Deleted successfully"
    })

  } catch (err) {
    return NextResponse.json(
      { message: "Delete failed", err },
      { status: 500 }
    )
  }
}