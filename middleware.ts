import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

type TokenPayload = {
  userId: string;
  username: string;
  role: string;
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value;
  // 🟡 public
  if (
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/api/auth")
  ) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  let user: TokenPayload;

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    user = payload as TokenPayload;
  } catch (err) {
    console.log({ err });
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 🔴 admin check'
  if (pathname.startsWith("/admin") && user.role.trim() !== "admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 🔥 attach user vào header
  const requestHeaders = new Headers(req.headers);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/result/:path*", "/exam/:path*", "/admin/:path*"],
};
