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
          <div className="flex justify-center mb-8">
            <div className="relative w-[300px] h-[150px] sm:w-[400px] sm:h-[200px] md:w-[500px] md:h-[250px]">
              <Image
                src="/images/lumexia-racing-logo.png"
                alt="Lumexia Racing"
                fill
                className="object-contain drop-shadow-[0_0_30px_rgba(6,182,212,0.6)]"
                priority
              />
            </div>
          </div>

          {/* Tagline */}
          <p 
            className="text-center text-lg sm:text-xl md:text-2xl font-bold tracking-wide mb-10"
            style={{
              background: "linear-gradient(90deg, #d4a574, #f5d89a, #d4a574)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 2px 4px rgba(0,0,0,0.3)"
            }}
          >
            THE ULTIMATE ONLINE RACING EXPERIENCE. EARN COIN NOW.
          </p>

          {/* Play Now Button */}
          <div className="flex justify-center mb-16">
            <Button
              onClick={handleStartGame}
              className="px-16 py-7 text-xl font-black tracking-widest uppercase rounded-lg transition-all duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(180deg, #0e7490 0%, #06b6d4 50%, #0e7490 100%)",
                boxShadow: "0 0 30px rgba(6, 182, 212, 0.5), inset 0 2px 0 rgba(255,255,255,0.2)",
                border: "2px solid #22d3ee",
                color: "#0a0a18"
              }}
            >
              PLAY NOW
            </Button>
          </div>
        </div>

        {/* Full Leaderboard Section */}
        <LeaderboardSection />
      </div>
    </section>
  )
}
