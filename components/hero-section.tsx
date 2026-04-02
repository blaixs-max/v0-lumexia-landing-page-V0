"use client"

import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { getSupabase, type DailyLeaderboardEntry } from "@/lib/supabase"

// Mini leaderboard data
interface MiniLeaderboardEntry extends DailyLeaderboardEntry {
  username: string
  team: string
  points: number
}

const defaultLeaderboard: MiniLeaderboardEntry[] = [
  { id: "1", wallet_address: "Speed...", full_wallet: "", best_score: 3540, created_at: "", updated_at: "", username: "SpeedDemon", team: "Tealball Racing", points: 3540 },
  { id: "2", wallet_address: "Track...", full_wallet: "", best_score: 3340, created_at: "", updated_at: "", username: "TrackMaster", team: "Red Bull Racing", points: 3340 },
  { id: "3", wallet_address: "Nitro...", full_wallet: "", best_score: 3310, created_at: "", updated_at: "", username: "NitrousFly", team: "Red Bull Racing", points: 3310 },
]



export function HeroSection() {
  const [leaderboard, setLeaderboard] = useState<MiniLeaderboardEntry[]>(defaultLeaderboard)

  useEffect(() => {
    async function fetchTopPlayers() {
      try {
        const supabase = getSupabase()
        const { data } = await supabase
          .from("daily_leaderboard")
          .select("*")
          .order("best_score", { ascending: false })
          .limit(3)

        if (data && data.length > 0) {
          setLeaderboard(data.map((entry, i) => ({
            ...entry,
            username: `Player_${entry.wallet_address?.slice(0, 4) || i + 1}`,
            team: i === 0 ? "Tealball Racing" : "Red Bull Racing",
            points: entry.best_score,
          })))
        }
      } catch (err) {
        // Use default data
      }
    }
    fetchTopPlayers()
  }, [])

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
                className="block font-serif text-4xl sm:text-5xl md:text-6xl font-black tracking-wide uppercase"
                style={{ 
                  background: "linear-gradient(135deg, #06b6d4 0%, #a78bfa 50%, #ec4899 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "0 0 40px rgba(6, 182, 212, 0.5)"
                }}
              >
                RACE FOR LUMEXIA
              </span>
            </h1>

            <p className="text-center text-gray-300 text-sm md:text-base max-w-xl mx-auto mb-4 leading-relaxed">
              Dominate the tracks in Solana&apos;s reliable and transparent racing game. Claim your spot in the top 100 on the daily leaderboard and earn automatic <span className="text-cyan-400 font-semibold">$SOL</span> airdrops. This signals a new era for the Lumexia platform, on a more exciting games and updates offering higher profit potential on the horizon.
            </p>
            
            <p 
              className="text-center text-lg font-bold mb-8"
              style={{ 
                background: "linear-gradient(90deg, #06b6d4, #a78bfa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              LET&apos;S RISE TOGETHER.
            </p>

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

        {/* Mini Leaderboard Section */}
        <div className="max-w-md mx-auto">
          <div
            className="rounded-xl p-4 h-full"
            style={{
              background: "linear-gradient(135deg, rgba(13, 13, 32, 0.95) 0%, rgba(20, 15, 50, 0.9) 100%)",
              border: "2px solid rgba(139, 92, 246, 0.3)",
              boxShadow: "0 0 20px rgba(139, 92, 246, 0.15)"
            }}
          >
            <h3 className="text-lg font-bold text-white mb-4 tracking-wider">GLOBAL LEADERBOARD</h3>
            
            <div className="space-y-3">
              {leaderboard.map((player, index) => (
                <div key={player.id} className="flex items-center gap-3">
                  <span className={`text-sm font-bold ${index === 0 ? "text-yellow-400" : index === 1 ? "text-gray-300" : "text-amber-600"}`}>
                    {index + 1}.
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                    index === 0 ? "bg-gradient-to-br from-cyan-500 to-purple-600" :
                    index === 1 ? "bg-gradient-to-br from-purple-500 to-pink-600" :
                    "bg-gradient-to-br from-orange-500 to-red-600"
                  }`}>
                    {player.username.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-semibold truncate">{player.username}</p>
                    <p className="text-gray-500 text-xs truncate">{player.team}</p>
                  </div>
                  <span className="text-cyan-400 font-bold text-sm whitespace-nowrap">{player.points} PTS</span>
                </div>
              ))}
            </div>

            <a 
              href="#leaderboard"
              className="block mt-4 text-center text-cyan-400 text-xs font-semibold hover:text-cyan-300 transition-colors"
            >
              View Full Leaderboard →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
