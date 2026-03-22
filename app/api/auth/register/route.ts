import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { User } from "@/models/User"
import jwt from "jsonwebtoken"

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

    const newUser = await User.create({
      username,
      password,
      role: role === "admin" ? "admin" : "student",
    })

    // 🔐 Tạo token luôn sau khi đăng ký
    const token = jwt.sign(
      {
        userId: newUser._id,
        username: newUser.username,
        role: newUser.role,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    )

    const res = NextResponse.json({
      message: "Đăng ký thành công",
      user: {
        _id: newUser._id.toString(),
        username: newUser.username,
        role: newUser.role,
      },
    })

    // 🍪 set cookie giống login
    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    })

    return res
  } catch (error) {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    )
  }
}