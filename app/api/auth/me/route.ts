import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"

export async function GET() {
  try {
    // 🔥 Next.js 16 → cookies() phải await
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value

    if (!token) {
      return NextResponse.json(
        { message: "Chưa đăng nhập", user: null },
        { status: 401 }
      )
    }

    // 🔐 verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as {
      userId: string
      username: string
      role: string
    }

    return NextResponse.json({
      user: {
        _id: decoded.userId,
        username: decoded.username,
        role: decoded.role,
      },
    })
  } catch (error) {
    return NextResponse.json(
      { message: "Token không hợp lệ", user: null },
      { status: 401 }
    )
  }
}