import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { Exam, Question } from "@/models"
export async function DELETE(req: Request) {
  try {
    await connectDB()

    const { id } = await req.json()

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