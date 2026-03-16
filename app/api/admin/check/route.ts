import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET() {

  const cookieStore = cookies()

  const admin = (await cookieStore).get("admin")

  return NextResponse.json({
    logged: !!admin
  })

}