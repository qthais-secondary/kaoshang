import { connectDB } from "@/lib/mongodb"
import { Result } from "@/models/Result"
import { NextResponse } from "next/server"

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB()

  try {
    const { id } = await context.params // ✅ FIX

    const result = await Result.findById(id)

    if (!result) {
      return NextResponse.json(
        { message: "Result not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(result)

  } catch (err) {
    console.error(err)

    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    )
  }
}