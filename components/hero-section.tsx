"use client"

import { Button } from "@/components/ui/button"
import { LeaderboardSection } from "@/components/leaderboard-section"

// Checkered Flag Component
function CheckeredFlag({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="80" height="100" viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Flag pole */}
      <rect x="2" y="0" width="3" height="100" fill="#666" />
      <rect x="2" y="0" width="3" height="100" fill="url(#poleGradient)" />
      {/* Flag */}
      <g transform="translate(5, 5)">
        {[...Array(5)].map((_, row) =>
          [...Array(5)].map((_, col) => (
            <rect
              key={`${row}-${col}`}
              x={col * 14}
              y={row * 10}
              width="14"
              height="10"
              fill={(row + col) % 2 === 0 ? "#ffffff" : "#1a1a2e"}
            />
          ))
        )}
      </g>
      {/* Flag border */}
      <rect x="5" y="5" width="70" height="50" stroke="#333" strokeWidth="1" fill="none" />
      <defs>
        <linearGradient id="poleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#888" />
          <stop offset="50%" stopColor="#ccc" />
          <stop offset="100%" stopColor="#888" />
        </linearGradient>
      </defs>
    </svg>
  )
}

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
        {/* Checkered Flags at Top */}
        <div className="absolute top-0 left-4 md:left-20 opacity-80">
          <CheckeredFlag className="transform -rotate-12" />
        </div>
        <div className="absolute top-0 right-4 md:right-20 opacity-80">
          <CheckeredFlag className="transform rotate-12 scale-x-[-1]" />
        </div>

        {/* Main Hero Content */}
        <div className="max-w-4xl mx-auto mb-12 pt-8">
          {/* LUMEXIA RACING Logo */}
          <div className="text-center mb-8">
            <div className="relative inline-block">
              {/* LUMEXIA text */}
              <h1 
                className="text-4xl sm:text-5xl md:text-6xl font-black tracking-wider"
                style={{
                  fontFamily: "'Cinzel', serif",
                  background: "linear-gradient(180deg, #d4a574 0%, #8b6914 30%, #d4a574 50%, #8b6914 70%, #d4a574 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                  filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))"
                }}
              >
                LUMEXIA
              </h1>
              
              {/* RACING text with checkered flag */}
              <div className="flex items-center justify-center gap-2 -mt-2">
                <span 
                  className="text-5xl sm:text-6xl md:text-7xl font-black tracking-wide"
                  style={{
                    fontFamily: "'Cinzel', serif",
                    background: "linear-gradient(180deg, #d4a574 0%, #8b6914 30%, #d4a574 50%, #8b6914 70%, #d4a574 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.6))"
                  }}
                >
                  RACING
                </span>
                
                {/* Small checkered flag next to RACING */}
                <svg width="50" height="60" viewBox="0 0 50 60" className="ml-1">
                  <rect x="2" y="0" width="2" height="60" fill="#666" />
                  <g transform="translate(4, 5)">
                    {[...Array(4)].map((_, row) =>
                      [...Array(4)].map((_, col) => (
                        <rect
                          key={`mini-${row}-${col}`}
                          x={col * 10}
                          y={row * 8}
                          width="10"
                          height="8"
                          fill={(row + col) % 2 === 0 ? "#ffffff" : "#222"}
                        />
                      ))
                    )}
                  </g>
                </svg>
              </div>
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
