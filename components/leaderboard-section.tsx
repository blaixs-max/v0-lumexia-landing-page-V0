"use client"

import { useState, useEffect } from "react"
import { Trophy, Coins, Copy, Check } from "lucide-react"
import { getSupabase, type DailyLeaderboardEntry } from "@/lib/supabase"
import { useTimer } from "@/lib/timer-context"
import { usePool } from "@/lib/pool-context"

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
  if (!wallet) return "N/A"
  return `${wallet.slice(0, 6)} ... ${wallet.slice(-4)}`
}

function CopyableWallet({ wallet }: { wallet: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (!wallet) return
    try {
      await navigator.clipboard.writeText(wallet)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  if (!wallet) return <span className="text-gray-500 text-xs">N/A</span>

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 px-2 py-1 rounded border border-[#D4AF37]/50 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 transition-colors"
    >
      <span className="text-gray-300 text-xs font-mono">{truncateWallet(wallet)}</span>
      {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3 text-[#D4AF37]" />}
    </button>
  )
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

function getSharePoints(rank: number): number {
  if (rank === 1) return 125
  if (rank === 2) return 100
  if (rank === 3) return 75
  if (rank === 4) return 50
  if (rank === 5) return 25
  if (rank >= 6 && rank <= 50) return 8
  if (rank >= 51 && rank <= 100) return 4
  return 0 // No reward for ranks > 100
}

function calculateAllRewards(
  leaderboardLength: number,
  totalPool: number,
): { rewards: number[]; netPool: number; totalShares: number; unitValue: number } {
  // Net pool = 92.5% of total pool (7.5% fee)
  const netPool = totalPool * 0.925

  // Calculate total share points for all players
  let totalShares = 0
  for (let i = 1; i <= leaderboardLength && i <= 100; i++) {
    totalShares += getSharePoints(i)
  }

  // Calculate unit value (value per 1 share point)
  const unitValue = totalShares > 0 ? netPool / totalShares : 0

  // Calculate reward for each rank
  const rewards: number[] = []
  for (let i = 1; i <= leaderboardLength && i <= 100; i++) {
    const sharePoints = getSharePoints(i)
    const reward = sharePoints * unitValue
    rewards.push(Math.floor(reward))
  }

  return { rewards, netPool, totalShares, unitValue }
}

export function LeaderboardSection() {
  const timer = useTimer()
  const { poolValue, netPool } = usePool()
  const [leaderboard, setLeaderboard] = useState<DailyLeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [calculatedRewards, setCalculatedRewards] = useState<number[]>([])
  const [rewardStats, setRewardStats] = useState<{
    netPool: number
    totalShares: number
    unitValue: number
  }>({ netPool: 0, totalShares: 0, unitValue: 0 })

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const supabase = getSupabase()

        const { data, error } = await supabase
          .from("daily_leaderboard")
          .select("*")
          .order("best_score", { ascending: false })
          .limit(100)

        if (error) {
          return
        }

        setLeaderboard(data || [])
        setLoading(false)

        const channel = supabase
          .channel("daily_leaderboard_changes")
          .on(
            "postgres_changes",
            {
              event: "*",
              schema: "public",
              table: "daily_leaderboard",
            },
            async (payload) => {
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

        return () => {
          supabase.removeChannel(channel)
        }
      } catch (err) {
        setLoading(false)
      }
    }

    fetchLeaderboard()
  }, [])

  useEffect(() => {
    if (leaderboard.length > 0 && poolValue > 0) {
      const { rewards, netPool, totalShares, unitValue } = calculateAllRewards(leaderboard.length, poolValue)
      setCalculatedRewards(rewards)
      setRewardStats({ netPool, totalShares, unitValue })
    }
  }, [leaderboard, poolValue])

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

          <div className="flex flex-col md:flex-row items-stretch gap-4 mt-4 md:mt-0">
            <div className="flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/50 rounded-lg px-4 py-3 min-w-[280px]">
              <Coins className="w-5 h-5 text-[#D4AF37]" />
              <span className="text-[#D4AF37] text-sm font-medium">Daily Reward Pool:</span>
              <span className="text-white font-mono font-bold">{Math.floor(netPool).toLocaleString()} TBNB</span>
            </div>

            <div className="flex items-center gap-2 bg-red-900/30 border border-red-700/50 rounded-lg px-4 py-3 min-w-[280px]">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-red-400 text-sm font-medium">Remaining Time for Daily Reset:</span>
              <span className="text-white font-mono font-bold">
                {timer.hours}h {timer.minutes}m {timer.seconds}s
              </span>
            </div>
          </div>
        </div>

        <div className="border border-gray-800 rounded-xl overflow-hidden">
          <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-3 bg-gray-900/50 border-b border-gray-800 text-xs uppercase tracking-wider text-gray-500 font-semibold">
            <div className="col-span-1 text-center">Rank</div>
            <div className="col-span-1">Racer</div>
            <div className="col-span-5">Wallet ID</div>
            <div className="col-span-2 text-center">Score</div>
            <div className="col-span-3 text-right">Reward Pool</div>
          </div>

          <div className="grid md:hidden grid-cols-10 gap-2 px-3 py-3 bg-gray-900/50 border-b border-gray-800 text-[10px] uppercase tracking-wider text-gray-500 font-semibold">
            <div className="col-span-1 text-center">#</div>
            <div className="col-span-4 text-center">Wallet</div>
            <div className="col-span-2 text-center">Score</div>
            <div className="col-span-3 text-right">Reward</div>
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
                const reward = calculatedRewards[index] || 0
                const username = racer.wallet_address || `Racer_${rank}`

                return (
                  <div key={racer.id}>
                    <div
                      className={`hidden md:grid grid-cols-12 gap-4 px-4 py-4 items-center transition-colors hover:bg-gray-900/30 ${getRowStyle(rank)}`}
                    >
                      <div className="col-span-1 flex justify-center">{getRankDisplay(rank)}</div>

                      <div className="col-span-1 flex justify-center">
                        <div
                          className={`w-10 h-10 rounded-lg ${avatarColors[index % avatarColors.length]} flex items-center justify-center text-white font-bold text-sm`}
                        >
                          {username.charAt(0).toUpperCase()}
                        </div>
                      </div>

                      <div className="col-span-5 flex items-center gap-3">
                        <CopyableWallet wallet={racer.full_wallet} />
                      </div>

                      <div className="col-span-2 text-center">
                        <span className="text-[#D4AF37] font-bold text-base">{formatScore(racer.best_score)}</span>
                      </div>

                      <div className="col-span-3 text-right">
                        <span className="text-[#D4AF37] font-semibold text-base">{reward.toLocaleString()} TBNB</span>
                      </div>
                    </div>

                    <div
                      className={`grid md:hidden grid-cols-10 gap-2 px-3 py-3 items-center transition-colors hover:bg-gray-900/30 ${getRowStyle(rank)}`}
                    >
                      <div className="col-span-1 flex justify-center">
                        {rank <= 3 ? (
                          <Trophy
                            className={`w-4 h-4 ${rank === 1 ? "text-yellow-400" : rank === 2 ? "text-gray-300" : "text-amber-600"}`}
                          />
                        ) : (
                          <span className="text-gray-400 font-medium text-xs">#{rank}</span>
                        )}
                      </div>

                      <div className="col-span-4 flex justify-center">
                        <CopyableWallet wallet={racer.full_wallet} />
                      </div>

                      <div className="col-span-2 text-center">
                        <span className="text-[#D4AF37] font-bold text-xs">{formatScore(racer.best_score)}</span>
                      </div>

                      <div className="col-span-3 text-right">
                        <span className="text-[#D4AF37] font-semibold text-xs">{reward.toLocaleString()}</span>
                      </div>
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
