import { cookies } from "next/headers"
import jwt from "jsonwebtoken"

type TokenPayload = {
  userId: string
  username: string
  role: string
}

export async function getUserFromToken(): Promise<TokenPayload | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value
  if (!token) return null

  try {
    return jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as TokenPayload
  } catch {
    return null
  }
}

// 🔒 require login
export async function requireUser() {
  const user = await getUserFromToken()
  if (!user) throw new Error("UNAUTHORIZED")
  return user
}

// 🔒 require admin
export async function requireAdmin() {
  const user = await getUserFromToken()
  if (!user || user.role !== "admin") {
    throw new Error("FORBIDDEN")
  }
  return user
}