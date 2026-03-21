"use client"

type Props = {
  open: boolean
  mode: "login" | "register"
  setMode: (mode: "login" | "register") => void
  onClose: () => void
  onSubmit: () => void
  username: string
  password: string
  setUsername: (v: string) => void
  setPassword: (v: string) => void
  loading: boolean
}

export default function AuthModal({
  open,
  mode,
  setMode,
  onClose,
  onSubmit,
  username,
  password,
  setUsername,
  setPassword,
  loading,
}: Props) {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/40 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white w-[420px] p-8 rounded-xl shadow-xl animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          {mode === "login" ? "Đăng nhập" : "Đăng ký"}
        </h2>

        <input
          disabled={loading}
          className="w-full border p-3 mb-4 rounded-lg disabled:opacity-50"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          disabled={loading}
          className="w-full border p-3 mb-4 rounded-lg disabled:opacity-50"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <p className="text-sm text-center mb-4">
          {mode === "login" ? "Chưa có tài khoản?" : "Đã có tài khoản?"}{" "}
          <span
            onClick={() =>
              !loading && setMode(mode === "login" ? "register" : "login")
            }
            className="text-primary font-semibold cursor-pointer"
          >
            {mode === "login" ? "Đăng ký" : "Đăng nhập"}
          </span>
        </p>

        <button
          onClick={onSubmit}
          disabled={loading}
          className="w-full bg-primary text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {loading ? (
            <>
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Đang xử lý...
            </>
          ) : mode === "login" ? (
            "Đăng nhập"
          ) : (
            "Tạo tài khoản"
          )}
        </button>
      </div>
    </div>
  )
}