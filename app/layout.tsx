import "./globals.css"
import ClientShell from "@/components/ClientShell"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body>
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  )
}