import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Orbitron, Exo_2, Cinzel, Inter, Syncopate } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { TimerProvider } from "@/lib/timer-context"
import { PoolProvider } from "@/lib/pool-context"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const _orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"] })
const _exo2 = Exo_2({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] })
const _cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700", "900"] })
const _inter = Inter({ subsets: ["latin"] })
const _syncopate = Syncopate({ subsets: ["latin"], weight: ["400", "700"] })

export const metadata: Metadata = {
  title: "Lumexia | Blockchain Racing Game on BSC",
  description:
    "Race for glory in Lumexia - the first high-fidelity racing simulator on the Binance Smart Chain. Top the leaderboards and earn $LMX airdrops.",
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
    <html lang="en" className="dark bg-[#080414]">
      <body className="font-sans antialiased bg-[#080414]">
        <TimerProvider>
          <PoolProvider>{children}</PoolProvider>
        </TimerProvider>
        <Analytics />
      </body>
    </html>
  )
}
