import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { Result } from "@/models/Result"
import { requireUser } from "@/lib/auth"

export async function GET() {
  try {
    await connectDB()

    const user = await requireUser()
    const userId = user.userId

    const results = await Result.find({ user: userId }).sort({
      createdAt: -1,
    })

    return NextResponse.json({
      results: results.map((r) => ({
        _id: r._id.toString(),
        examTitle: r.examTitle,
        score: r.score,
        total: r.totalQuestions,
        correctCount: r.correctCount,
        percentage: r.totalQuestions
          ? Math.round((r.score / r.totalQuestions) * 100)
          : 0,
        duration: r.duration,
        createdAt: r.createdAt,
      })),
    })
  } catch (err: any) {
    if (err.message === "UNAUTHORIZED") {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      )
    }

    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    )
  }
}