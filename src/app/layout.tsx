import type { Metadata } from "next"
import "./globals.css"

import BottomNav from "@/components/layout/BottomNav"

export const metadata: Metadata = {
  title: "Voltara Trading",
  description: "AI Multi-Agent Trading Infrastructure",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <main className="min-h-screen pb-24">
          {children}
        </main>

        <BottomNav />
      </body>
    </html>
  )
}