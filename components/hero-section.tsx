"use client"

import { Button } from "@/components/ui/button"
import { ChevronDown, Gamepad2 } from "lucide-react"

export function HeroSection() {
  const handleStartGame = () => {
    window.open("https://game.lumexia.net", "_blank")
  }

  const handleViewLeaderboard = () => {
    const leaderboard = document.getElementById("leaderboard")
    if (leaderboard) {
      leaderboard.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleHowToPlay = () => {
    const faqSection = document.getElementById("faq")
    if (faqSection) {
      faqSection.scrollIntoView({ behavior: "smooth" })
      setTimeout(() => {
        const howToPlayTrigger = document.getElementById("how-to-play-trigger")
        if (howToPlayTrigger) {
          howToPlayTrigger.click()
        }
      }, 800)
    }
  }

  return (
    <section id="game" className="relative min-h-screen flex items-center justify-center">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url('/images/lighthouse-bg.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
          }}
        />
        {/* Dark overlay with purple/cyan gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a12]/80 via-[#0a0a12]/60 to-[#0a0a12]" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-cyan-900/20" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 text-center">
        <h1 className="mb-8 mt-20">
          <span
            className="block font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-wide uppercase text-white"
            style={{ textShadow: "0 0 30px rgba(139, 92, 246, 0.5)" }}
          >
            RACE FOR
          </span>
          <span
            className="block font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-wide uppercase mt-2 gradient-text"
            style={{ 
              textShadow: "0 0 40px rgba(0, 212, 255, 0.6)",
              filter: "drop-shadow(0 0 30px rgba(139, 92, 246, 0.4))"
            }}
          >
            LUMEXIA
          </span>
        </h1>

        <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto mb-4 leading-relaxed">
          Dominate the tracks in Binance Smart Chain&apos;s reliable and transparent racing game. Claim your spot in the top
          100 on the daily leaderboard and earn automatic <span className="text-cyan-400 font-semibold">$BNB</span>{" "}
          airdrops.
        </p>

        <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto mb-4 leading-relaxed">
          This signals a new era for the Lumexia platform, with more exciting games and updates offering higher profit
          potential on the horizon.
        </p>
        
        <p className="text-lg sm:text-xl font-bold gradient-text mb-10">
          LET&apos;S RISE TOGETHER.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            onClick={handleStartGame}
            className="w-full sm:w-auto px-10 py-6 text-sm font-bold tracking-wider bg-gradient-to-r from-cyan-500 to-cyan-600 text-white hover:from-cyan-400 hover:to-cyan-500 transition-all duration-300 uppercase rounded-full neon-glow-cyan border-0"
          >
            Start Game Engine
          </Button>
          <Button
            onClick={handleViewLeaderboard}
            variant="outline"
            className="w-full sm:w-auto px-10 py-6 text-sm font-bold tracking-wider bg-transparent border-2 border-purple-500/50 text-purple-400 hover:bg-purple-500/10 hover:border-purple-400 transition-all duration-300 uppercase rounded-full"
          >
            View Leaderboard
          </Button>
        </div>

        <div className="mt-6">
          <Button
            onClick={handleHowToPlay}
            variant="ghost"
            className="px-8 py-5 text-sm font-bold tracking-wider text-gray-400 hover:text-cyan-400 hover:bg-transparent transition-all duration-300 uppercase border border-gray-700/50 rounded-full hover:border-cyan-500/30"
          >
            <Gamepad2 className="w-4 h-4 mr-2" />
            How to Play
          </Button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <ChevronDown className="w-8 h-8 text-cyan-400/60 animate-bounce" />
      </div>
    </section>
  )
}
