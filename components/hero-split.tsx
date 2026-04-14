"use client"

import { useEffect, useState, useCallback } from "react"
import { useTimer } from "@/lib/timer-context"
import { usePool } from "@/lib/pool-context"
import { Copy, Check } from "lucide-react"

interface DexData {
  priceUsd: string
  marketCap: number
  volume24h: number
  fdv: number
  priceChange24h: number
  liquidity: number
  pairAddress: string | null
}

interface TickerItem {
  symbol: string
  price: string
  change: number
  bgColor: string
  letter: string
  highlight?: boolean
}

function formatNumber(num: number): string {
  if (num >= 1_000_000_000) return `$${(num / 1_000_000_000).toFixed(2)}B`
  if (num >= 1_000_000) return `$${(num / 1_000_000).toFixed(2)}M`
  if (num >= 1_000) return `$${(num / 1_000).toFixed(0)}K`
  return `$${num.toFixed(2)}`
}

const FULL_CA = "0xb92cc959c2434c06489d3f941391a5f1d8334444"
const SHORT_CA = "8b583c...4f44"

const navLinks = ["Game", "Leaderboard", "Project Strategy", "Community", "Help"]

const rightFeatures = [
  {
    title: "EARN EVERY RACE.\nEVERY DAY.",
    description:
      "The top 100 players with the highest scores each day earn the prize pool accumulated by entry fees from matchmaking. Compete and earn.",
    color: "cyan" as const,
    iconPath:
      "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
  },
  {
    title: "PURE SKILL.\nZERO PAY-TO-WIN.",
    description: "No pay to win mechanics exist here—pure reflex and strategy.",
    color: "cyan" as const,
    iconPath:
      "M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3",
  },
  {
    title: "AUTO-BURN\nMECHANISM.",
    description: "Intelligent deflationary mechanism burns tokens based on network activity.",
    color: "purple" as const,
    iconPath:
      "M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z",
  },
  {
    title: "SECURE TREASURY.",
    description: "Treasury over-collateralized in select top-tier assets to ensure consistent rewards.",
    color: "gray" as const,
    iconPath:
      "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    title: "CHEAT PROTECTION.",
    description:
      "Server-side validation ensures fair play. All races are monitored by anti-cheat systems.",
    color: "cyan" as const,
    iconPath:
      "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  },
  {
    title: "REVENUE SHARE.",
    description: "Profits are distributed back to NFT holders and active players.",
    color: "gray" as const,
    iconPath:
      "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
]

const iconColorClass = {
  cyan: "text-neon-cyan",
  purple: "text-neon-purple",
  gray: "text-gray-400",
}
const borderColorClass = {
  cyan: "border-neon-cyan shadow-[0_0_15px_rgba(0,243,255,0.4)]",
  purple: "border-neon-purple shadow-[0_0_15px_rgba(188,19,254,0.4)]",
  gray: "border-gray-600",
}

export function HeroSplit() {
  const timer = useTimer()
  const { netPool, loading: poolLoading } = usePool()
  const [tickerData, setTickerData] = useState<TickerItem[]>([])
  const [dexData, setDexData] = useState<DexData | null>(null)
  const [dexLoading, setDexLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)
  const [apiError, setApiError] = useState<string | null>(null)
  const [copiedCA, setCopiedCA] = useState(false)

  const fetchData = useCallback(async () => {
    try {
      setDexLoading(true)
      setApiError(null)

      const dexResponse = await fetch("/api/dex")
      if (!dexResponse.ok) throw new Error(`API error: ${dexResponse.status}`)
      const dexResult = await dexResponse.json()

      let lmxItem: TickerItem = {
        symbol: "LMX/USDT",
        price: "0.0000",
        change: 0,
        bgColor: "bg-gray-600",
        letter: "L",
      }

      if (dexResult.pairs && dexResult.pairs.length > 0) {
        const mainPair = dexResult.pairs.sort(
          (a: any, b: any) => (b.liquidity?.usd || 0) - (a.liquidity?.usd || 0),
        )[0]
        const price = parseFloat(mainPair.priceUsd || "0")
        lmxItem = {
          symbol: "LMX/USDT",
          price: price < 0.01 ? price.toFixed(6) : price.toFixed(4),
          change: mainPair.priceChange?.h24 || 0,
          bgColor: "bg-gray-600",
          letter: "L",
        }
        setDexData({
          priceUsd: mainPair.priceUsd || "0",
          marketCap: mainPair.marketCap || mainPair.fdv || 0,
          volume24h: mainPair.volume?.h24 || 0,
          fdv: mainPair.fdv || 0,
          priceChange24h: mainPair.priceChange?.h24 || 0,
          liquidity: mainPair.liquidity?.usd || 0,
          pairAddress: mainPair.pairAddress,
        })
      } else {
        setApiError("Token not found on DexScreener")
        setDexData({
          priceUsd: "0",
          marketCap: 0,
          volume24h: 0,
          fdv: 0,
          priceChange24h: 0,
          liquidity: 0,
          pairAddress: null,
        })
      }

      const cgResponse = await fetch("/api/ticker")
      const cgData = await cgResponse.json()

      setTickerData([
        {
          symbol: "BNB/USDT",
          price: cgData.binancecoin?.usd?.toFixed(2) || "0.00",
          change: cgData.binancecoin?.usd_24h_change || 0,
          bgColor: "bg-yellow-500",
          letter: "B",
        },
        {
          symbol: "BTC/USDT",
          price: cgData.bitcoin?.usd?.toLocaleString() || "0",
          change: cgData.bitcoin?.usd_24h_change || 0,
          bgColor: "bg-orange-500",
          letter: "₿",
        },
        {
          symbol: "ETH/USDT",
          price: cgData.ethereum?.usd?.toLocaleString() || "0",
          change: cgData.ethereum?.usd_24h_change || 0,
          bgColor: "bg-blue-500",
          letter: "E",
          highlight: true,
        },
        lmxItem,
      ])

      setLastUpdate(new Date())
    } catch (error) {
      setApiError(error instanceof Error ? error.message : "API Error")
    } finally {
      setDexLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [fetchData])

  const handleCopyCA = async () => {
    try {
      await navigator.clipboard.writeText(FULL_CA)
      setCopiedCA(true)
      setTimeout(() => setCopiedCA(false), 2000)
    } catch {}
  }

  return (
    <div className="min-h-screen split-layout relative">
      {/* Background blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-screen filter blur-[150px] opacity-20" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-[150px] opacity-20" />
      </div>

      {/* ── LEFT PANEL ── */}
      <div className="left-panel p-6 lg:p-10 flex flex-col relative h-full z-10">
        <div className="border border-neon-cyan rounded-2xl p-6 h-full flex flex-col relative overflow-hidden">
          {/* Diagonal stripe texture */}
          <div
            className="absolute inset-0 z-0 pointer-events-none opacity-20"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.05) 10px, rgba(255,255,255,0.05) 20px)",
            }}
          />

          {/* HEADER */}
          <header className="flex justify-between items-center mb-16 z-10 relative">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <svg className="w-8 h-8 text-neon-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                />
              </svg>
              <span className="font-bold text-xl tracking-wider uppercase text-white">
                <span className="text-neon-cyan">LUMEXIA</span>
                <br />
                <span className="text-xs text-gray-400 block -mt-1">GAME</span>
              </span>
            </div>

            {/* Nav */}
            <nav className="hidden md:flex gap-6 items-center text-xs uppercase tracking-widest font-semibold text-gray-300">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                  className="hover:text-neon-cyan transition-colors border-b border-transparent hover:border-neon-cyan pb-1"
                >
                  {link}
                </a>
              ))}
            </nav>

            {/* CA display */}
            <div className="flex items-center">
              <div className="glass-card px-4 py-2 flex items-center gap-2 rounded-full border border-gray-600 text-xs">
                <span className="text-gray-400">Official CA:</span>
                <span className="font-mono text-neon-cyan truncate w-24">{SHORT_CA}</span>
                <button
                  onClick={handleCopyCA}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Copy contract address"
                >
                  {copiedCA ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </header>

          {/* HERO CONTENT */}
          <main className="flex-grow flex flex-col items-center justify-start text-center z-10 relative mt-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 tracking-wide uppercase">
              <span className="text-neon-cyan">LUMEXIA:</span>{" "}
              <span className="text-neon-purple">SOLANA EDITION</span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl font-medium">
              Dominate the tracks in the fastest Web3 racing game on Solana.
            </p>

            <div className="flex flex-wrap gap-6 justify-center mb-16">
              <button className="btn-neon-cyan px-8 py-3 rounded-full uppercase tracking-widest font-bold text-sm">
                Start Game Engine
              </button>
              <button className="btn-neon-purple px-8 py-3 rounded-full uppercase tracking-widest font-bold text-sm">
                View Leaderboard
              </button>
            </div>

            {/* Car image + feature labels */}
            <div className="relative w-full max-w-4xl mt-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDseZ1aZT75wNte-rJXYy5QKm8pGdUP6wnhBbOkpDpIUEyUjv849C-uxGN0TnMtoqB2D7tGOYb5sGT48vM-V3-2ZZhsBZ06-9ncVgZsDN68PUn6J1WUpibb0_31eD5L0bnvHJ9gBJzdG6XxvCVZAUWEsDmrqLqIt2N9eIJ-1743TeK_SeU0nJ_EzRQG1VdAdcKY_7cfVD8EgN47iRaSxXi-6JSkau00AJrFBsfMStMipAuZX3EVySCea0yY7cKEp9mpUgVICLrKX_k"
                alt="Neon Racing Car"
                className="w-full h-auto object-contain z-20 relative mix-blend-screen"
              />

              {/* SVG connecting lines */}
              <div className="absolute inset-0 pointer-events-none z-10 hidden md:block">
                <svg
                  className="absolute top-[20%] left-[10%] w-[30%] h-[30%]"
                  preserveAspectRatio="none"
                  viewBox="0 0 100 100"
                >
                  <path
                    d="M 0,0 L 50,50 L 100,50"
                    fill="none"
                    stroke="#00f3ff"
                    strokeWidth="2"
                    style={{ filter: "drop-shadow(0 0 5px rgba(0,243,255,0.8))" }}
                  />
                </svg>
                <svg
                  className="absolute bottom-[20%] left-[10%] w-[30%] h-[30%]"
                  preserveAspectRatio="none"
                  viewBox="0 0 100 100"
                >
                  <path
                    d="M 0,100 L 50,50 L 100,50"
                    fill="none"
                    stroke="#00f3ff"
                    strokeWidth="2"
                    style={{ filter: "drop-shadow(0 0 5px rgba(0,243,255,0.8))" }}
                  />
                </svg>
                <svg
                  className="absolute top-[20%] right-[10%] w-[30%] h-[30%]"
                  preserveAspectRatio="none"
                  viewBox="0 0 100 100"
                >
                  <path
                    d="M 100,0 L 50,50 L 0,50"
                    fill="none"
                    stroke="#bc13fe"
                    strokeWidth="2"
                    style={{ filter: "drop-shadow(0 0 5px rgba(188,19,254,0.8))" }}
                  />
                </svg>
                <svg
                  className="absolute bottom-[20%] right-[10%] w-[30%] h-[30%]"
                  preserveAspectRatio="none"
                  viewBox="0 0 100 100"
                >
                  <path
                    d="M 100,100 L 50,50 L 0,50"
                    fill="none"
                    stroke="#bc13fe"
                    strokeWidth="2"
                    style={{ filter: "drop-shadow(0 0 5px rgba(188,19,254,0.8))" }}
                  />
                </svg>
              </div>

              {/* Feature label — top left */}
              <div className="absolute top-[15%] left-[5%] text-left w-48 z-30 hidden md:block">
                <div className="w-8 h-8 rounded-full border border-neon-cyan flex items-center justify-center mb-2 shadow-[0_0_10px_rgba(0,243,255,0.5)]">
                  <svg className="w-4 h-4 text-neon-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                </div>
                <h3 className="text-white font-bold text-sm uppercase mb-1">
                  EARN EVERY RACE.
                  <br />
                  EVERY DAY.
                </h3>
                <p className="text-gray-400 text-[10px] leading-tight">
                  Dominate the tracks in the fastest Web3 racing game on Solana.
                </p>
              </div>

              {/* Feature label — top right */}
              <div className="absolute top-[15%] right-[5%] text-right w-48 z-30 hidden md:block">
                <div className="w-8 h-8 rounded-full border border-neon-purple flex items-center justify-center mb-2 ml-auto shadow-[0_0_10px_rgba(188,19,254,0.5)]">
                  <svg className="w-4 h-4 text-neon-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                    />
                  </svg>
                </div>
                <h3 className="text-white font-bold text-sm uppercase mb-1">
                  PURE SKILL.
                  <br />
                  ZERO PAY-TO-WIN.
                </h3>
                <p className="text-gray-400 text-[10px] leading-tight">
                  No pay to win mechanics exist here—pure reflex and strategy.
                </p>
              </div>

              {/* Feature label — bottom left */}
              <div className="absolute bottom-[10%] left-[10%] text-left w-48 z-30 hidden md:block">
                <div className="w-8 h-8 rounded-full border border-neon-cyan flex items-center justify-center mb-2 shadow-[0_0_10px_rgba(0,243,255,0.5)]">
                  <svg className="w-4 h-4 text-neon-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h3 className="text-white font-bold text-sm uppercase mb-1">AUTO-BURN MECHANISM.</h3>
                <p className="text-gray-400 text-[10px] leading-tight">
                  Intelligent deflationary mechanism burns tokens based on network activity.
                </p>
              </div>

              {/* Feature label — bottom right */}
              <div className="absolute bottom-[10%] right-[10%] text-right w-48 z-30 hidden md:block">
                <div className="w-8 h-8 rounded-full border border-neon-purple flex items-center justify-center mb-2 ml-auto shadow-[0_0_10px_rgba(188,19,254,0.5)]">
                  <svg className="w-4 h-4 text-neon-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
                    />
                  </svg>
                </div>
                <h3 className="text-white font-bold text-sm uppercase mb-1">
                  AI-DRIVEN BURN MECHANISM.
                </h3>
                <p className="text-gray-400 text-[10px] leading-tight">
                  Intelligent deflationary mechanism burns tokens based on network activity.
                </p>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="right-panel p-6 lg:p-10 flex flex-col justify-between h-full bg-[#0d0a18] z-10 relative">
        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {rightFeatures.map((feature, i) => (
            <div key={i} className="text-center">
              <div
                className={`w-12 h-12 rounded-full border flex items-center justify-center mx-auto mb-4 ${borderColorClass[feature.color]}`}
              >
                <svg
                  className={`w-6 h-6 ${iconColorClass[feature.color]}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={feature.iconPath}
                  />
                </svg>
              </div>
              <h3 className="text-white font-bold text-lg uppercase mb-2 whitespace-pre-line">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-xs px-4">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* ── FINANCIAL FIGURES ── */}
        <div className="mt-auto">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold uppercase text-neon-cyan tracking-widest mb-1">
              FINANCIAL FIGURES
            </h2>
            {lastUpdate && (
              <p className="text-gray-500 text-xs">
                Last updated: {lastUpdate.toLocaleTimeString()}
                {apiError && `, Note: ${apiError}`}
              </p>
            )}
          </div>

          {/* Ticker cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
            {tickerData.length > 0
              ? tickerData.map((item, i) => (
                  <div
                    key={i}
                    className={`glass-card p-3 flex items-center gap-2 ${
                      item.highlight ? "border-neon-cyan shadow-[0_0_10px_rgba(0,243,255,0.2)]" : ""
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full ${item.bgColor} flex items-center justify-center text-xs font-bold ${
                        item.bgColor === "bg-yellow-500" ? "text-black" : "text-white"
                      } flex-shrink-0`}
                    >
                      {item.letter}
                    </div>
                    <div>
                      <div
                        className={`text-xs font-bold ${item.highlight ? "text-neon-cyan" : "text-gray-400"}`}
                      >
                        {item.symbol}
                      </div>
                      <div className="text-sm font-bold text-white">
                        ${item.price}
                        {item.change !== 0 && (
                          <span
                            className={`text-[10px] ml-1 ${item.change >= 0 ? "text-green-500" : "text-red-500"}`}
                          >
                            {item.change >= 0 ? "+" : ""}
                            {item.change.toFixed(2)}%
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              : Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="glass-card p-3 h-14 animate-pulse" />
                ))}
          </div>

          {/* Stats + chart */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Left stats */}
            <div className="flex flex-col gap-4">
              <div className="glass-card p-4 text-center">
                <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">MARKET CAP</div>
                <div className="text-2xl font-bold text-white">
                  {dexLoading
                    ? "..."
                    : dexData && dexData.marketCap > 0
                      ? formatNumber(dexData.marketCap)
                      : "N/A"}
                </div>
              </div>
              <div className="glass-card p-4 text-center">
                <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">DAILY PRIZE POOL</div>
                <div className="text-2xl font-bold text-white">
                  {poolLoading ? "..." : `${netPool.toFixed(4)} BNB`}
                </div>
              </div>
            </div>

            {/* Middle stats */}
            <div className="flex flex-col gap-4">
              <div className="glass-card p-4 text-center">
                <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">24H VOLUME</div>
                <div className="text-2xl font-bold text-white">
                  {dexLoading
                    ? "..."
                    : dexData && dexData.volume24h > 0
                      ? formatNumber(dexData.volume24h)
                      : "N/A"}
                </div>
              </div>
              <div className="glass-card p-4 text-center">
                <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">NEXT DISTRIBUTION</div>
                <div className="text-2xl font-bold text-neon-cyan font-mono">{timer.formatted}</div>
              </div>
            </div>

            {/* Chart */}
            <div className="glass-card p-4 flex flex-col relative overflow-hidden" style={{ border: "1px solid rgba(188,19,254,0.5)" }}>
              <div className="text-xs text-gray-400 uppercase tracking-wider mb-2 z-10 relative">
                24H PRICE CHART
              </div>
              <div className="absolute inset-0 top-8 bg-gradient-to-t from-purple-900/40 to-transparent z-0" />
              <svg
                className="absolute inset-0 w-full h-full top-8 z-0 opacity-50"
                preserveAspectRatio="none"
                viewBox="0 0 100 100"
              >
                <path d="M0,80 Q25,30 50,70 T100,50 L100,100 L0,100 Z" fill="url(#chart-grad)" />
                <path d="M0,80 Q25,30 50,70 T100,50" fill="none" stroke="#bc13fe" strokeWidth="2" />
                <defs>
                  <linearGradient id="chart-grad" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#bc13fe" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#bc13fe" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
              {dexData?.pairAddress ? (
                <iframe
                  src={`https://dexscreener.com/bsc/${dexData.pairAddress}?embed=1&theme=dark&trades=0&info=0`}
                  className="absolute inset-0 w-full h-full"
                  style={{ border: "none" }}
                  title="LMX Price Chart"
                />
              ) : (
                <div className="text-center z-10 mt-8 relative flex-1 flex flex-col items-center justify-center">
                  <p className="text-gray-400 text-sm">Chart unavailable.</p>
                  <p className="text-gray-500 text-xs">Token not listed on DexScreener yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
