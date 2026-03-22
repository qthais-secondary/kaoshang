import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { Exam, Question } from "@/models"
export async function PUT(req: Request) {
  try {
    await connectDB()

    const { id, title, description, questions } = await req.json()

    const exam = await Exam.findById(id)

    if (!exam) {
      return NextResponse.json(
        { message: "Exam not found" },
        { status: 404 }
      )
    }

    // ❗ Xóa question cũ (optional nhưng nên có)
    await Question.deleteMany({
      _id: { $in: exam.questions }
    })

    // Tạo lại questions mới
    const newQuestions = await Promise.all(
      questions.map((q: any) => Question.create(q))
    )

    exam.title = title
    exam.description = description
    exam.questions = newQuestions.map(q => q._id)

    await exam.save()

    return NextResponse.json(exam)

  } catch (err) {
    return NextResponse.json(
      { message: "Update failed", err },
      { status: 500 }
    )
  }
}