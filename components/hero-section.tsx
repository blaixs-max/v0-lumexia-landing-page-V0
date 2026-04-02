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
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url('/images/race-track-bg.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a18]/60 via-[#0a0a18]/40 to-[#0a0a18]" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-cyan-900/20" />
        
        {/* Checkered Racing Flag - Left */}
        <div className="absolute top-20 left-4 md:left-16 opacity-20 pointer-events-none">
          <svg width="120" height="150" viewBox="0 0 120 150" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Flag pole */}
            <rect x="5" y="0" width="4" height="150" fill="#888" />
            {/* Flag */}
            <g transform="translate(9, 10)">
              {[...Array(5)].map((_, row) =>
                [...Array(6)].map((_, col) => (
                  <rect
                    key={`${row}-${col}`}
                    x={col * 15}
                    y={row * 12}
                    width="15"
                    height="12"
                    fill={(row + col) % 2 === 0 ? "#ffffff" : "#1a1a2e"}
                  />
                ))
              )}
            </g>
            {/* Wave effect overlay */}
            <path d="M9,10 Q50,5 90,15 Q100,70 95,70 L9,70 Z" fill="url(#flagWave)" opacity="0.3" />
            <defs>
              <linearGradient id="flagWave" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Checkered Racing Flag - Right */}
        <div className="absolute top-20 right-4 md:right-16 opacity-20 pointer-events-none transform scale-x-[-1]">
          <svg width="120" height="150" viewBox="0 0 120 150" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Flag pole */}
            <rect x="5" y="0" width="4" height="150" fill="#888" />
            {/* Flag */}
            <g transform="translate(9, 10)">
              {[...Array(5)].map((_, row) =>
                [...Array(6)].map((_, col) => (
                  <rect
                    key={`${row}-${col}`}
                    x={col * 15}
                    y={row * 12}
                    width="15"
                    height="12"
                    fill={(row + col) % 2 === 0 ? "#ffffff" : "#1a1a2e"}
                  />
                ))
              )}
            </g>
          </svg>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Hero Box */}
        <div className="max-w-3xl mx-auto mb-12">
          <div 
            className="relative rounded-2xl p-8 md:p-12"
            style={{
              background: "linear-gradient(135deg, rgba(13, 13, 32, 0.9) 0%, rgba(20, 15, 50, 0.85) 100%)",
              border: "2px solid",
              borderImage: "linear-gradient(135deg, #06b6d4, #8b5cf6, #06b6d4) 1",
              boxShadow: "0 0 40px rgba(139, 92, 246, 0.2), inset 0 0 60px rgba(6, 182, 212, 0.05)"
            }}
          >
            {/* Corner accents */}
            <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-cyan-400" />
            <div className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-cyan-400" />
            <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-purple-500" />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-purple-500" />

            <h1 className="text-center mb-6">
              <span
                className="block font-serif text-3xl sm:text-4xl md:text-5xl font-black tracking-wide"
                style={{ 
                  background: "linear-gradient(135deg, #06b6d4 0%, #a78bfa 50%, #ec4899 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "0 0 40px rgba(6, 182, 212, 0.5)"
                }}
              >
                Play Online Racing Game , Earn Coin
</span>
            </h1>

            <div className="mb-8" />

            {/* Play Now Button */}
            <div className="flex justify-center">
              <Button
                onClick={handleStartGame}
                className="px-16 py-7 text-xl font-black tracking-widest uppercase rounded-xl transition-all duration-300"
                style={{
                  background: "linear-gradient(90deg, #06b6d4, #0891b2)",
                  boxShadow: "0 0 30px rgba(6, 182, 212, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.1)",
                  border: "2px solid rgba(6, 182, 212, 0.5)"
                }}
              >
                PLAY NOW
              </Button>
            </div>
          </div>
        </div>

        {/* F1 Racing Car */}
        <div className="relative flex justify-center mb-8">
          <div className="relative w-full max-w-2xl h-32 md:h-48">
            <Image
              src="/images/f1-car.png"
              alt="Formula 1 Racing Car"
              fill
              className="object-contain drop-shadow-[0_0_30px_rgba(6,182,212,0.5)]"
              priority
            />
            {/* Speed lines effect */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-0 w-1/3 h-[2px] bg-gradient-to-r from-cyan-400/60 to-transparent transform -translate-y-4" />
              <div className="absolute top-1/2 left-0 w-1/4 h-[2px] bg-gradient-to-r from-purple-500/60 to-transparent transform translate-y-2" />
              <div className="absolute top-1/2 left-0 w-1/5 h-[1px] bg-gradient-to-r from-cyan-300/40 to-transparent transform translate-y-6" />
            </div>
          </div>
        </div>

        {/* Full Leaderboard Section */}
        <LeaderboardSection />
      </div>
    </section>
  )
}
