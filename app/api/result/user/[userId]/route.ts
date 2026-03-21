import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Result } from "@/models/Result";

export async function GET(
  req: Request,
  context: { params: Promise<{ userId: string }> }
) {
  try {
    await connectDB();

    const { userId } = await context.params; // ✅ FIX

    if (!userId) {
      return NextResponse.json(
        { message: "Thiếu userId" },
        { status: 400 }
      );
    }

    const results = await Result.find({ user: userId })
      .sort({ createdAt: -1 });

    return NextResponse.json({
      results: results.map((r) => ({
        _id: r._id,
        examTitle: r.examTitle,
        score: r.score,
        total: r.totalQuestions,
        correctCount: r.correctCount,
        percentage: Math.round((r.score / r.totalQuestions) * 100),
        duration: r.duration,
        createdAt: r.createdAt,
      })),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}