"use client"

import { useState, useEffect } from "react"
import { Gamepad2, Flag, Copy, Check, FlaskConical, Timer, ArrowRight, ArrowUp } from "lucide-react"
import { TOKEN_CONFIG, shortMint } from "@/lib/token-config"
import { usePool } from "@/lib/pool-context"
import { useTimer } from "@/lib/timer-context"

const formatSegment = (n: number) => String(n).padStart(2, "0")

function DigitBox({ digit }: { digit: string }) {
  return (
    <div className="relative w-9 h-12 md:w-12 md:h-16 rounded-md flex items-center justify-center font-mono font-black text-white text-2xl md:text-4xl glass-panel border border-[#00f0ff]/40 shadow-neon-cyan">
      <span className="absolute inset-x-0 top-1/2 h-px bg-[#00f0ff]/20" />
      {digit}
    </div>
  )
}

function CountdownSegments({ value }: { value: string }) {
  return (
    <div className="flex items-center gap-1">
      {value.split("").map((d, i) => (
        <DigitBox key={i} digit={d} />
      ))}
    </div>
  )
}

export function DashboardHero() {
  const [copied, setCopied] = useState(false)
  const [tokabuPriceUsd, setTokabuPriceUsd] = useState<number | null>(null)
  const { poolValue, netPool } = usePool()
  const timer = useTimer()

  // Fetch TOKABU price (DexScreener via /api/dex) once + every 60s
  useEffect(() => {
    let aborted = false
    async function fetchPrice() {
      try {
        const res = await fetch("/api/dex")
        if (!res.ok) return
        const data = await res.json()
        const priceStr = data?.pair?.priceUsd ?? data?.pairs?.[0]?.priceUsd
        if (priceStr && !aborted) {
          const p = Number.parseFloat(priceStr)
          if (Number.isFinite(p) && p > 0) setTokabuPriceUsd(p)
        }
      } catch {
        /* ignore */
      }
    }
    fetchPrice()
    const interval = setInterval(fetchPrice, 60_000)
    return () => {
      aborted = true
      clearInterval(interval)
    }
  }, [])

  const grossPoolTokabu = tokabuPriceUsd && poolValue > 0 ? poolValue / tokabuPriceUsd : null
  const netPoolTokabu = tokabuPriceUsd && netPool > 0 ? netPool / tokabuPriceUsd : null

  const handleCopyCA = async () => {
    try {
      await navigator.clipboard.writeText(TOKEN_CONFIG.mint)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const handleStartGame = () => {
    window.open("https://game.lumexia.net", "_blank")
  }

  const handleExploreGames = () => {
    const leaderboard = document.getElementById("leaderboard")
    if (leaderboard) leaderboard.scrollIntoView({ behavior: "smooth" })
  }

  const hoursStr = formatSegment(timer.hours)
  const minutesStr = formatSegment(timer.minutes)
  const secondsStr = formatSegment(timer.seconds)

  return (
    <section className="relative min-h-[760px] md:min-h-[600px] rounded-2xl neon-border-box group flex-shrink-0 overflow-hidden mt-14 md:mt-0">
      {/* Hero Background Image - F1 Racing in Neon City */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-700 group-hover:scale-105"
        style={{
          backgroundImage: `url('/images/hero-racing-bg.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center right",
        }}
      >
        {/* Overlay Gradient for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#080414] via-[#080414]/70 to-transparent" />
        {/* Stronger overlay at bottom so dashboard panels read clearly */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#080414] via-[#080414]/80 to-transparent" />
        {/* Racing flag pattern overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 20px,
            rgba(255,255,255,0.03) 20px,
            rgba(255,255,255,0.03) 40px
          )`,
          }}
        />
      </div>

      {/* Contract Address Badge */}
      <button
        onClick={handleCopyCA}
        className="absolute top-4 right-4 md:top-6 md:right-6 z-20 glass-panel px-3 md:px-4 py-2 rounded-full flex items-center gap-2 border border-[#00f0ff]/30 shadow-neon-cyan hover:bg-[#00f0ff]/10 transition-colors cursor-pointer"
      >
        <svg
          className="w-4 h-4 md:w-5 md:h-5 text-[#00f0ff]"
          fill="none"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M4 11H20M4 15H14M10 7H20" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
        </svg>
        <span className="text-xs md:text-sm font-medium text-[#a19bb8]">
          C.A: <span className="text-white font-mono text-[10px] md:text-xs">{shortMint()}</span>
        </span>
        {copied ? (
          <Check className="w-3 h-3 md:w-4 md:h-4 text-[#00ff66]" />
        ) : (
          <Copy className="w-3 h-3 md:w-4 md:h-4 text-[#00f0ff]" />
        )}
      </button>

      {/* Gaming Icons (top-left of hero) */}
      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-20 flex items-center gap-2 md:gap-3">
        <div className="glass-panel p-2 md:p-2.5 rounded-lg border border-[#9d00ff]/30 shadow-neon-purple">
          <Flag className="w-4 h-4 md:w-5 md:h-5 text-[#9d00ff]" />
        </div>
        <div className="glass-panel p-2 md:p-2.5 rounded-lg border border-[#00f0ff]/30 shadow-neon-cyan">
          <Gamepad2 className="w-4 h-4 md:w-5 md:h-5 text-[#00f0ff]" />
        </div>
        <div
          className="glass-panel p-2 md:p-2.5 rounded-lg border border-[#FFD700]/30"
          style={{ boxShadow: "0 0 10px rgba(255, 215, 0, 0.3)" }}
        >
          <svg
            className="w-4 h-4 md:w-5 md:h-5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="3" y="3" width="4" height="4" fill="#FFD700" />
            <rect x="11" y="3" width="4" height="4" fill="#FFD700" />
            <rect x="7" y="7" width="4" height="4" fill="#FFD700" />
            <rect x="15" y="7" width="4" height="4" fill="#FFD700" />
            <rect x="3" y="11" width="4" height="4" fill="#FFD700" />
            <rect x="11" y="11" width="4" height="4" fill="#FFD700" />
            <rect x="7" y="15" width="4" height="4" fill="#FFD700" />
            <rect x="15" y="15" width="4" height="4" fill="#FFD700" />
          </svg>
        </div>
      </div>

      {/* Hero Content (title + buttons + dashboard panels) */}
      <div className="relative z-10 flex flex-col h-full px-4 md:px-12 pt-20 md:pt-16 pb-6 md:pb-8 gap-6 md:gap-8">
        {/* Title + Buttons */}
        <div className="flex flex-col gap-4 max-w-2xl">
          <h1 className="font-serif font-bold text-3xl md:text-5xl leading-tight tracking-wide uppercase text-white drop-shadow-lg">
            PLAY RACING GAME
            <br />
            <span className="text-[#00f0ff] neon-text-cyan">EARN COIN.</span>
          </h1>

          <div className="flex flex-row gap-3 md:gap-4 mt-2 md:mt-4">
            <button
              onClick={handleStartGame}
              className="bg-gradient-to-r from-[#9d00ff] to-[#00f0ff] text-white font-bold py-2.5 md:py-3 px-5 md:px-8 rounded-full shadow-[0_0_15px_rgba(176,38,255,0.6)] hover:shadow-[0_0_25px_rgba(176,38,255,0.8)] transition-all duration-300 transform hover:-translate-y-1 cursor-pointer text-sm md:text-base"
            >
              START GAME
            </button>
            <button
              onClick={handleExploreGames}
              className="bg-transparent text-[#00f0ff] font-bold py-2.5 md:py-3 px-5 md:px-8 rounded-full border-2 border-[#00f0ff] shadow-neon-cyan hover:bg-[#00f0ff] hover:text-white transition-all duration-300 transform hover:-translate-y-1 cursor-pointer text-sm md:text-base"
            >
              CYCLE RANKING
            </button>
          </div>
        </div>

        {/* Pool Dashboard Panels */}
        <div className="mt-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Pool Value Panel */}
          <div className="glass-panel rounded-2xl border border-[#00f0ff]/30 shadow-neon-cyan p-4 md:p-6 flex items-center gap-4 md:gap-6">
            {/* Glowing test-tube icon */}
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 rounded-full bg-[#9d00ff]/20 blur-2xl" />
              <div className="relative w-14 h-14 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-[#9d00ff]/20 to-[#00f0ff]/10 border border-[#9d00ff]/40 flex items-center justify-center shadow-[0_0_25px_rgba(157,0,255,0.5)]">
                <FlaskConical className="w-7 h-7 md:w-10 md:h-10 text-[#00f0ff]" strokeWidth={1.6} />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="text-white font-serif font-bold text-lg md:text-2xl tracking-wide">
                Pool Value
              </div>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-mono font-black text-3xl md:text-5xl text-white drop-shadow-[0_0_15px_rgba(0,240,255,0.5)]">
                  ${netPool.toFixed(2)}
                </span>
                <span className="text-[#00f0ff] font-bold text-base md:text-xl tracking-widest">USD</span>
              </div>

              {/* TOKABU equivalents */}
              <div className="mt-2 md:mt-3 inline-flex items-center gap-2 glass-panel border border-[#00f0ff]/20 rounded-full px-3 py-1 text-xs md:text-sm">
                <span className="text-[#a19bb8] font-mono">
                  ${poolValue.toFixed(2)} {TOKEN_CONFIG.symbol}
                </span>
                <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-[#00f0ff]" />
                <span className="text-white font-mono font-semibold">
                  {grossPoolTokabu !== null ? grossPoolTokabu.toFixed(2) : "—"} {TOKEN_CONFIG.symbol}
                </span>
                {netPoolTokabu !== null && (
                  <ArrowUp className="w-3 h-3 md:w-4 md:h-4 text-[#00ff66]" />
                )}
              </div>
            </div>
          </div>

          {/* Pool Reset Panel */}
          <div className="glass-panel rounded-2xl border border-[#00f0ff]/30 shadow-neon-cyan p-4 md:p-6 flex flex-col gap-3">
            {/* Top: Label + decorative icons */}
            <div className="flex items-center justify-between">
              <div className="text-white font-serif font-bold text-lg md:text-2xl tracking-wide">
                Pool Reset
              </div>
              <div className="flex items-center gap-2">
                <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[#00f0ff]/20 to-[#9d00ff]/10 border border-[#00f0ff]/40 flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.4)]">
                  <div className="absolute inset-1 rounded-full border border-[#00f0ff]/30" />
                  <div className="absolute w-1 h-1 bg-[#00f0ff] rounded-full top-1.5" />
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[#9d00ff]/20 to-[#00f0ff]/10 border border-[#9d00ff]/40 flex items-center justify-center shadow-[0_0_15px_rgba(157,0,255,0.4)]">
                  <Timer className="w-5 h-5 md:w-6 md:h-6 text-[#9d00ff]" strokeWidth={1.8} />
                </div>
              </div>
            </div>

            {/* Countdown segments */}
            <div className="flex items-center justify-center gap-1 md:gap-2 py-1">
              <CountdownSegments value={hoursStr} />
              <span className="font-mono font-black text-2xl md:text-4xl text-[#00f0ff]">:</span>
              <CountdownSegments value={minutesStr} />
              <span className="font-mono font-black text-2xl md:text-4xl text-[#00f0ff]">:</span>
              <CountdownSegments value={secondsStr} />
            </div>

            {/* Gradient progress line */}
            <div className="h-1 w-full rounded-full bg-gradient-to-r from-[#00f0ff] via-[#9d00ff] to-[#ff3366] opacity-80 shadow-[0_0_10px_rgba(0,240,255,0.5)]" />

            {/* Subtitle */}
            <div className="text-center text-xs md:text-sm text-[#a19bb8] tracking-wide">
              Time until next distribution
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
