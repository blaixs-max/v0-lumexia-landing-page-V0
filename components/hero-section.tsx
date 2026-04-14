"use client"

import { Button } from "@/components/ui/button"
import { ChevronDown, Gamepad2 } from "lucide-react"

export function HeroSection() {
  const handleStartGame = () => {
    window.open("https://game.lumexia.net", "_blank")
  }

  const handleViewLeaderboard = () => {
    const leaderboard = document.getElementById("leaderboard")
    if (leaderboard) leaderboard.scrollIntoView({ behavior: "smooth" })
  }

  const handleHowToPlay = () => {
    const faqSection = document.getElementById("faq")
    if (faqSection) {
      faqSection.scrollIntoView({ behavior: "smooth" })
      setTimeout(() => {
        const howToPlayTrigger = document.getElementById("how-to-play-trigger")
        if (howToPlayTrigger) howToPlayTrigger.click()
      }, 800)
    }
  }

  return (
    <section id="game" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url('/images/lighthouse-bg.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
          }}
        />
        {/* Dark base overlay */}
        <div className="absolute inset-0 bg-black/50" />
        {/* Gradient: dark top → transparent mid → full black bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black" />
        {/* Subtle vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,transparent_40%,black_100%)]" />
      </div>

      {/* Cyberpunk grid overlay */}
      <div className="absolute inset-0 cyber-grid-overlay opacity-60" />

      {/* Scan-line effect */}
      <div className="absolute inset-0 scan-line pointer-events-none" />

      {/* Radial glow behind headline */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[radial-gradient(ellipse,rgba(212,175,55,0.08)_0%,transparent_70%)] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 text-center">
        <h1 className="mb-6 mt-20">
          <span
            className="block font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-orbitron"
            style={{ textShadow: "0 2px 20px rgba(0,0,0,0.9)" }}
          >
            RACE FOR
          </span>
          <span
            className="block font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-orbitron neon-text mt-1"
            style={{ color: "#D4AF37" }}
          >
            LUMEXIA
          </span>
        </h1>

        <p className="text-base sm:text-lg text-gray-300/90 max-w-2xl mx-auto mb-4 leading-relaxed font-light">
          Dominate the tracks in Binance Smart Chain's reliable and transparent racing game. Claim your spot in the top
          100 on the daily leaderboard and earn automatic{" "}
          <span className="text-[#D4AF37] font-semibold">$BNB</span> airdrops.
        </p>

        <p className="text-base sm:text-lg text-gray-300/90 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          This signals a new era for the Lumexia platform, with more exciting games and updates offering higher profit
          potential on the horizon.{" "}
          <span className="text-[#D4AF37] font-bold uppercase tracking-wide">LET'S RISE TOGETHER.</span>
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Primary CTA — solid gold */}
          <button
            onClick={handleStartGame}
            className="btn-neon-hover w-full sm:w-auto px-10 py-4 text-sm font-bold tracking-widest uppercase bg-[#D4AF37] text-black rounded-sm cursor-pointer transition-all duration-200 hover:bg-[#FFD700]"
          >
            Start Game Engine
          </button>

          {/* Secondary CTA */}
          <button
            onClick={handleHowToPlay}
            className="btn-neon-hover w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-4 text-sm font-bold tracking-widest uppercase text-[#D4AF37] border border-[#D4AF37]/50 bg-transparent rounded-sm cursor-pointer hover:bg-[#D4AF37]/8 hover:border-[#D4AF37] transition-all duration-200"
          >
            <Gamepad2 className="w-4 h-4" />
            How to Play
          </button>

          {/* Tertiary CTA */}
          <button
            onClick={handleViewLeaderboard}
            className="btn-neon-hover w-full sm:w-auto px-10 py-4 text-sm font-bold tracking-widest uppercase text-gray-300 border border-white/15 bg-transparent rounded-sm cursor-pointer hover:text-[#D4AF37] hover:border-[#D4AF37]/40 transition-all duration-200"
          >
            View Leaderboard
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-50">
        <span className="text-[10px] tracking-widest uppercase text-gray-500 font-medium">Scroll</span>
        <ChevronDown className="w-5 h-5 text-[#D4AF37] animate-bounce" />
      </div>
    </section>
  )
}
