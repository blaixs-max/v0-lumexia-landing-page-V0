"use client"

import { Button } from "@/components/ui/button"
import { LeaderboardSection } from "@/components/leaderboard-section"
import Image from "next/image"

export function HeroSection() {
  const handleStartGame = () => {
    window.open("https://game.lumexia.net", "_blank")
  }

  return (
    <section id="game" className="relative min-h-screen pt-32 pb-20">
      {/* Canyon Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url('/images/canyon-track-bg.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a18]/30 via-transparent to-[#0a0a18]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Hero Content */}
        <div className="max-w-4xl mx-auto mb-12 pt-8">
          {/* LUMEXIA RACING Logo Image */}
          <div className="flex justify-center mb-6">
            <div className="relative w-[280px] h-[140px] sm:w-[380px] sm:h-[190px] md:w-[480px] md:h-[240px]">
              <Image
                src="/images/lumexia-racing-logo.png"
                alt="Lumexia Racing"
                fill
                className="object-contain drop-shadow-[0_0_40px_rgba(6,182,212,0.7)]"
                priority
              />
            </div>
          </div>

          {/* Tagline */}
          <p className="text-center text-base sm:text-lg md:text-xl text-gray-300 italic mb-8 font-light">
            A simple, fun, but addictive car racing game.
          </p>

          {/* Play to Earn Button */}
          <div className="flex justify-center mb-16">
            <Button
              onClick={handleStartGame}
              className="px-12 py-6 text-lg font-bold tracking-wide rounded-full transition-all duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(180deg, #22d3ee 0%, #06b6d4 50%, #0891b2 100%)",
                boxShadow: "0 0 30px rgba(6, 182, 212, 0.5), inset 0 2px 0 rgba(255,255,255,0.3)",
                border: "none",
                color: "#0a0a18"
              }}
            >
              Play to Earn
            </Button>
          </div>
        </div>

        {/* Full Leaderboard Section */}
        <LeaderboardSection />
      </div>
    </section>
  )
}
