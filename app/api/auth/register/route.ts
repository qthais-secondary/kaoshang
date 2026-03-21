import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { User } from "@/models/User"

export async function POST(req: Request) {
  try {
    await connectDB()

    const { username, password, role } = await req.json()

    if (!username || !password) {
      return NextResponse.json(
        { message: "Thiếu thông tin" },
        { status: 400 }
      )
    }

    const existing = await User.findOne({ username })

    if (existing) {
      return NextResponse.json(
        { message: "Username đã tồn tại" },
        { status: 400 }
      )
    }

    const user = await User.create({
      username,
      password,
      role: role === "admin" ? "admin" : "student",
    })

    return NextResponse.json({
      message: "Đăng ký thành công",
      user,
    })
  } catch (error) {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    )
  }
}