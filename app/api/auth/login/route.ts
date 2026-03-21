import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { User } from "@/models/User"

export async function POST(req: Request) {
  try {
    await connectDB()

    const { username, password } = await req.json()

    if (!username || !password) {
      return NextResponse.json(
        { message: "Thiếu thông tin" },
        { status: 400 }
      )
    }

    const user = await User.findOne({ username })

    if (!user || user.password !== password) {
      return NextResponse.json(
        { message: "Sai tài khoản hoặc mật khẩu" },
        { status: 401 }
      )
    }

    return NextResponse.json({
      message: "Login thành công",
      user: {
        username: user.username,
        role: user.role,
      },
    })
  } catch (error) {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    )
  }
}