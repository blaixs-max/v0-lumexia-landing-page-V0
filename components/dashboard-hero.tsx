"use client"

import { useState, useEffect } from "react"
import { Gamepad2, Flag } from "lucide-react"

export function DashboardHero() {
  const [price, setPrice] = useState<number | null>(null)
  const [priceChange, setPriceChange] = useState<number | null>(null)

  useEffect(() => {
    async function fetchPrice() {
      try {
        const res = await fetch("/api/ticker")
        const data = await res.json()
        if (data.price) {
          setPrice(data.price)
          setPriceChange(data.priceChangePercent || 5.2)
        }
      } catch (err) {
        // Use fallback values
        setPrice(110.45)
        setPriceChange(5.2)
      }
    }
    fetchPrice()
    const interval = setInterval(fetchPrice, 30000)
    return () => clearInterval(interval)
  }, [])

  const handleStartGame = () => {
    window.open("https://game.lumexia.net", "_blank")
  }

  const handleExploreGames = () => {
    const leaderboard = document.getElementById("leaderboard")
    if (leaderboard) leaderboard.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative h-[380px] rounded-2xl overflow-hidden neon-border-box group flex-shrink-0">
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
        {/* Racing flag pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 20px,
            rgba(255,255,255,0.03) 20px,
            rgba(255,255,255,0.03) 40px
          )`
        }} />
      </div>

      {/* Decorative Gaming Icons - Bottom Right */}
      <div className="absolute bottom-6 right-6 z-20 flex items-center gap-3">
        {/* Racing Flag Icon */}
        <div className="glass-panel p-2.5 rounded-lg border border-[#9d00ff]/30 shadow-neon-purple">
          <Flag className="w-5 h-5 text-[#9d00ff]" />
        </div>
        {/* Gamepad Icon - PlayStation style */}
        <div className="glass-panel p-2.5 rounded-lg border border-[#00f0ff]/30 shadow-neon-cyan">
          <Gamepad2 className="w-5 h-5 text-[#00f0ff]" />
        </div>
        {/* Checkered Flag SVG */}
        <div className="glass-panel p-2.5 rounded-lg border border-[#FFD700]/30" style={{ boxShadow: '0 0 10px rgba(255, 215, 0, 0.3)' }}>
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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

      {/* Price Tag */}
      <div className="absolute top-6 right-6 z-20 glass-panel px-4 py-2 rounded-full flex items-center gap-2 border border-[#00f0ff]/30 shadow-neon-cyan">
        <svg className="w-5 h-5 text-[#00f0ff]" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 11H20M4 15H14M10 7H20" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
        </svg>
        <span className="text-sm font-medium text-[#a19bb8]">
          BNB Price: <span className="text-white">${price?.toFixed(2) || "---"}</span>
        </span>
        {priceChange !== null && (
          <span className={`text-sm font-bold ${priceChange >= 0 ? "text-[#00ff66]" : "text-[#ff3366]"}`}>
            ({priceChange >= 0 ? "+" : ""}{priceChange.toFixed(1)}%)
          </span>
        )}
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col justify-center h-full px-12 max-w-2xl">
        <h1 className="font-serif font-bold text-4xl md:text-5xl leading-tight mb-2 tracking-wide uppercase text-white drop-shadow-lg">
          RACE FOR
          <br />
          <span className="text-[#00f0ff] neon-text-cyan">LUMEXIA GLORY.</span>
        </h1>

        <div className="flex gap-4 mt-8">
          <button
            onClick={handleStartGame}
            className="bg-gradient-to-r from-[#9d00ff] to-[#00f0ff] text-white font-bold py-3 px-8 rounded-full shadow-[0_0_15px_rgba(176,38,255,0.6)] hover:shadow-[0_0_25px_rgba(176,38,255,0.8)] transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
          >
            CONNECT WALLET
          </button>
          <button
            onClick={handleExploreGames}
            className="bg-transparent text-[#00f0ff] font-bold py-3 px-8 rounded-full border-2 border-[#00f0ff] shadow-neon-cyan hover:bg-[#00f0ff] hover:text-white transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
          >
            EXPLORE GAMES
          </button>
        </div>
      </div>
    </section>
  )
}
