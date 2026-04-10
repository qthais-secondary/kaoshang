"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/context/AuthContext"

export default function Header({
  onOpenAuth,
}: {
  onOpenAuth: (mode: "login" | "register") => void
}) {
  const { user, logout } = useAuth()
  const pathname = usePathname()

  const navClass = (path: string) =>
    `text-sm font-semibold ${
      pathname === path
        ? "text-primary border-b-2 border-primary pb-1"
        : "text-gray-700 hover:text-primary"
    }`

  return (
    <header className="sticky top-0 z-50 border-b border-primary/10 bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* LOGO */}
        <div className="flex items-center py-2">
  <Link href="/" className="block">
    <img 
      src="/Logo.png" 
      alt="KAOSHANG Logo" 
      className="h-14 w-auto object-contain hover:opacity-90 transition-opacity" 
    />
  </Link>
</div>

        {/* NAV */}
        <nav className="hidden lg:flex gap-8 flex-1 justify-center">
          <Link href="/" className={navClass("/")}>Trang chủ</Link>
          <Link href="/exams" className={navClass("/exams")}>Đề thi</Link>
          <Link href="/results" className={navClass("/results")}>Lịch sử</Link>

          {/* 🔥 ADMIN NAV */}
          {user?.role === "admin" && (
            <>
              <Link
                href="/admin/dashboard"
                className={navClass("/admin/dashboard")}
              >
                Dashboard
              </Link>

              <Link
                href="/admin/manage"
                className={navClass("/admin/manage")}
              >
                Quản lý đề
              </Link>
            </>
          )}
        </nav>

        {/* AUTH */}
        <div className="flex gap-4 items-center">
          {!user ? (
            <>
              <button
                onClick={() => onOpenAuth("login")}
                className="hidden sm:flex px-6 py-2 font-bold hover:bg-gray-100 rounded-lg"
              >
                Đăng nhập
              </button>

              <button
                onClick={() => onOpenAuth("register")}
                className="bg-primary text-white px-6 py-2 rounded-lg shadow-lg"
              >
                Đăng ký ngay
              </button>
            </>
          ) : (
            <>
              {/* 🔥 ROLE BADGE */}
              <span className="text-sm font-semibold">
                👋 {user.username}
                {user.role === "admin" && (
                  <span className="ml-2 text-xs bg-red-500 text-white px-2 py-0.5 rounded">
                    ADMIN
                  </span>
                )}
              </span>

              <button
                onClick={logout}
                className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Đăng xuất
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}