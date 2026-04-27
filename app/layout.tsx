import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Orbitron, Exo_2, Cinzel, Inter, Syncopate } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { TimerProvider } from "@/lib/timer-context"
import { PoolProvider } from "@/lib/pool-context"
import { StructuredData } from "@/components/structured-data"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"], display: "swap" })
const _geistMono = Geist_Mono({ subsets: ["latin"], display: "swap" })
const _orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"], display: "swap" })
const _exo2 = Exo_2({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], display: "swap" })
const _cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700", "900"], display: "swap" })
const _inter = Inter({ subsets: ["latin"], display: "swap" })
const _syncopate = Syncopate({ subsets: ["latin"], weight: ["400", "700"], display: "swap" })

const SITE_URL = "https://lumexia.net"
const SITE_NAME = "Lumexia"
const SITE_TITLE = "Lumexia | Blockchain Racing Game on BSC"
const SITE_DESCRIPTION =
  "Race for glory in Lumexia — the high-fidelity blockchain racing game on Binance Smart Chain. Climb the daily leaderboard, top the top 100, and earn automatic $LMX airdrops."

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | Lumexia",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  generator: "Next.js",
  keywords: [
    "Lumexia",
    "$LMX",
    "LMX token",
    "blockchain racing game",
    "BSC racing game",
    "Binance Smart Chain game",
    "play to earn",
    "P2E racing",
    "crypto racing game",
    "GameFi",
    "Web3 game",
    "BNB airdrop",
    "racing leaderboard",
    "skill based crypto game",
  ],
  authors: [{ name: "Lumexia", url: SITE_URL }],
  creator: "Lumexia",
  publisher: "Lumexia",
  category: "GameFi",
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: "@lumexia_project",
    creator: "@lumexia_project",
  },
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
  manifest: "/manifest.webmanifest",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#080414" },
    { media: "(prefers-color-scheme: dark)", color: "#080414" },
  ],
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark bg-[#080414]">
      <body className="font-sans antialiased bg-[#080414]">
        <StructuredData />
        <TimerProvider>
          <PoolProvider>{children}</PoolProvider>
        </TimerProvider>
        <Analytics />
      </body>
    </html>
  )
}
