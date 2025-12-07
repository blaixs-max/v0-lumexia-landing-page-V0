"use client"

import { useState, useEffect } from "react"
import { Trophy } from "lucide-react"
import { getSupabase, type DailyLeaderboardEntry } from "@/lib/supabase"

function generateMockData() {
  const data = [
    {
      id: 1,
      username: "SpeedDemon_99",
      walletId: "0x98B6a4c8D7e2F1b3A9C5d6E8f0a1B2c3D4e5F6a4",
      score: 99640,
      reward: 2000,
    },
    {
      id: 2,
      username: "CryptoRacerX",
      walletId: "0xabc71f8e9D2c4B5a6E7f8A9b0C1d2E3f4A5b3627",
      score: 98779,
      reward: 1950,
    },
    {
      id: 3,
      username: "Racer_4377",
      walletId: "0xe42bd9f1A3c5D7e8B0a2C4d6E8f0A2b4C6d872ae",
      score: 97813,
      reward: 1900,
    },
  ]

  // Generate remaining 97 racers
  for (let i = 4; i <= 100; i++) {
    const randomNum = Math.floor(Math.random() * 9000) + 1000
    const walletChars = "0123456789abcdefABCDEF"
    let walletId = "0x"
    for (let j = 0; j < 40; j++) {
      walletId += walletChars.charAt(Math.floor(Math.random() * walletChars.length))
    }
    data.push({
      id: i,
      username: `Racer_${randomNum}`,
      walletId: walletId,
      score: Math.max(99640 - i * 100 + Math.floor(Math.random() * 50), 50000),
      reward: Math.max(2000 - i * 15, 100),
    })
  }
  return data
}

// Avatar placeholder colors
const avatarColors = [
  "bg-gradient-to-br from-yellow-500 to-orange-600",
  "bg-gradient-to-br from-blue-500 to-purple-600",
  "bg-gradient-to-br from-green-500 to-teal-600",
  "bg-gradient-to-br from-pink-500 to-red-600",
  "bg-gradient-to-br from-indigo-500 to-blue-600",
]

function truncateWallet(wallet: string) {
  return `${wallet.slice(0, 6)}...${wallet.slice(-4)}`
}

function formatScore(score: number) {
  return score.toLocaleString()
}

function calculateReward(rank: number): number {
  if (rank === 1) return 2000
  if (rank === 2) return 1950
  if (rank === 3) return 1900
  return Math.max(2000 - rank * 15, 100)
}

function formatReward(reward: number) {
  return `${reward.toLocaleString()} $LMX`
}

export function LeaderboardSection() {
  const [timeLeft, setTimeLeft] = useState({ hours: 7, minutes: 43, seconds: 7 })
  const [leaderboard, setLeaderboard] = useState<DailyLeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const supabase = getSupabase()

        // Query daily_leaderboard table from the blaixs-max project
        const { data, error } = await supabase
          .from("daily_leaderboard")
          .select("*")
          .order("best_score", { ascending: false })
          .limit(100)

        if (error) {
          console.error("[v0] Error fetching leaderboard:", error)
          return
        }

        console.log("[v0] Fetched leaderboard data:", data?.length, "entries")
        setLeaderboard(data || [])
        setLoading(false)

        // Subscribe to realtime changes
        const channel = supabase
          .channel("daily_leaderboard_changes")
          .on(
            "postgres_changes",
            {
              event: "*", // Listen to all events (INSERT, UPDATE, DELETE)
              schema: "public",
              table: "daily_leaderboard",
            },
            async (payload) => {
              console.log("[v0] Realtime update received:", payload)

              // Re-fetch the entire leaderboard to maintain proper sorting
              const { data: updatedData, error: refetchError } = await supabase
                .from("daily_leaderboard")
                .select("*")
                .order("best_score", { ascending: false })
                .limit(100)

              if (!refetchError && updatedData) {
                setLeaderboard(updatedData)
              }
            },
          )
          .subscribe()

        // Cleanup subscription on unmount
        return () => {
          supabase.removeChannel(channel)
        }
      } catch (err) {
        console.error("[v0] Exception fetching leaderboard:", err)
        setLoading(false)
      }
    }

    fetchLeaderboard()
  }, [])

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return { hours: 23, minutes: 59, seconds: 59 } // Reset daily
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const getRankDisplay = (rank: number) => {
    if (rank === 1) {
      return <Trophy className="w-5 h-5 text-yellow-400" />
    } else if (rank === 2) {
      return <Trophy className="w-5 h-5 text-gray-300" />
    } else if (rank === 3) {
      return <Trophy className="w-5 h-5 text-amber-600" />
    }
    return <span className="text-gray-400 font-medium">#{rank}</span>
  }

  const getRowStyle = (rank: number) => {
    if (rank <= 3) {
      return "bg-black/40 border-l-4 border-l-[#D4AF37]"
    }
    return "bg-black/20 border-l-4 border-l-transparent"
  }

  return (
    <section id="leaderboard" className="py-20 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h2
              className="font-serif font-black text-3xl md:text-4xl mb-2"
              style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
            >
              <span className="text-white">DAILY </span>
              <span className="text-[#D4AF37]">RANKING</span>
            </h2>
            <p className="text-gray-400 text-sm md:text-base">
              Top 100 Racers receive automated <span className="text-[#D4AF37]">$LMX</span> airdrops every{" "}
              <span className="text-white font-semibold">24h</span>. Showing Top 100 contenders.
            </p>
          </div>

          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <div className="flex items-center gap-2 bg-red-900/30 border border-red-700/50 rounded-lg px-4 py-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-red-400 text-sm font-medium">Reset:</span>
              <span className="text-white font-mono font-bold">
                {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
              </span>
            </div>
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="border border-gray-800 rounded-xl overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-gray-900/50 border-b border-gray-800 text-xs uppercase tracking-wider text-gray-500 font-semibold">
            <div className="col-span-1 text-center">Rank</div>
            <div className="col-span-5 md:col-span-6">Racer</div>
            <div className="col-span-3 md:col-span-2 text-center">Score</div>
            <div className="col-span-3 text-right">Reward Pool</div>
          </div>

          <div
            className="divide-y divide-gray-800/50 max-h-[1100px] overflow-y-auto leaderboard-scroll"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#D4AF37 #1a1a1a",
            }}
          >
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-[#D4AF37] text-lg">Loading leaderboard...</div>
              </div>
            ) : leaderboard.length === 0 ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-gray-400 text-lg">No racers yet. Be the first!</div>
              </div>
            ) : (
              leaderboard.map((racer, index) => {
                const rank = index + 1
                const reward = calculateReward(rank)
                const username = racer.wallet_address || `Racer_${rank}`

                return (
                  <div
                    key={racer.id}
                    className={`grid grid-cols-12 gap-4 px-4 py-4 items-center transition-colors hover:bg-gray-900/30 ${getRowStyle(rank)}`}
                  >
                    <div className="col-span-1 flex justify-center">{getRankDisplay(rank)}</div>

                    <div className="col-span-5 md:col-span-6 flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg ${avatarColors[index % avatarColors.length]} flex items-center justify-center text-white font-bold text-sm`}
                      >
                        {username.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-white font-semibold text-sm md:text-base">{username}</span>
                        <span className="text-gray-500 text-xs font-mono">{truncateWallet(racer.full_wallet)}</span>
                      </div>
                    </div>

                    <div className="col-span-3 md:col-span-2 text-center">
                      <span className="text-[#D4AF37] font-bold text-sm md:text-base">
                        {formatScore(racer.best_score)}
                      </span>
                    </div>

                    <div className="col-span-3 text-right">
                      <span className="text-[#D4AF37] font-semibold text-sm md:text-base">{formatReward(reward)}</span>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
