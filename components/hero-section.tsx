"use client"

import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

export function HeroSection() {
  const handleStartGame = () => {
    window.open("https://game.lumexia.net", "_blank")
  }

  return (
    <section id="game" className="relative min-h-screen flex items-center justify-center">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url('/images/lighthouse-bg.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 text-center">
        <h1 className="mb-6">
          <span
            className="block font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-wide uppercase"
            style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.8)" }}
          >
            RACE FOR
          </span>
          <span
            className="block font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#D4AF37] tracking-wide uppercase mt-1"
            style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.8)" }}
          >
            LUMEXIA
          </span>
        </h1>

        <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
          Dominate the tracks in Binance Smart Chain's reliable and fun racing game. Reach the top of the daily
          leaderboard to earn automatic <span className="text-[#D4AF37] font-semibold">$LMX</span> airdrops
          transparently and witness our rise together.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            onClick={handleStartGame}
            className="w-full sm:w-auto px-10 py-6 text-sm font-bold tracking-wider bg-[#D4AF37] text-black hover:bg-[#D4AF37]/90 transition-all duration-200 uppercase"
          >
            Start Game Engine
          </Button>
          <Button
            variant="outline"
            className="w-full sm:w-auto px-10 py-6 text-sm font-bold tracking-wider bg-transparent border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all duration-200 uppercase"
          >
            View Leaderboard
          </Button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <ChevronDown className="w-8 h-8 text-gray-400 animate-bounce" />
      </div>
    </section>
  )
}
