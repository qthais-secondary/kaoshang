import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { User } from "@/models/User"
import jwt from "jsonwebtoken"
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

    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET!, // nhớ set env
      { expiresIn: "7d" }
    )

    // 🍪 Set cookie (QUAN TRỌNG cho SSR)
    const response = NextResponse.json({
      message: "Login thành công",
      user: {
        _id: user._id.toString(),
        username: user.username,
        role: user.role,
      },
    })

    response.cookies.set("token", token, {
      httpOnly: true, // 🔐 chống XSS
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 ngày
    })

    return response
  } catch (error) {
    console.log("err login:",error)
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    )
  }
}