import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { TimerProvider } from "@/lib/timer-context"
import { PoolProvider } from "@/lib/pool-context"
import "./globals.css"

const _inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"] })

export const metadata: Metadata = {
  title: "Solana Lumexia | Experience the Future of Solana Gaming",
  description:
    "Join Lumexia: Play, Earn, and Thrive in the Ultimate Web3 Ecosystem. Experience the future of Solana gaming.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased">
        <TimerProvider>
          <PoolProvider>{children}</PoolProvider>
        </TimerProvider>
        <Analytics />
      </body>
    </html>
  )
}
