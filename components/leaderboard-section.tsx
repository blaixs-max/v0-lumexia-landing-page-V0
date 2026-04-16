"use client"

import { useState, useEffect } from "react"
import { Trophy, Coins, Copy, Check, Gamepad2 } from "lucide-react"
import { getSupabase, type DailyLeaderboardEntry } from "@/lib/supabase"
import { useTimer } from "@/lib/timer-context"
import { usePool } from "@/lib/pool-context"

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
  return `${reward.toLocaleString()} $BNB`
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
    rewards.push(reward)
  }

  return { rewards, netPool, totalShares, unitValue }
}

interface LeaderboardWithGames extends DailyLeaderboardEntry {
  games_played: number
  boosted_score: number
}

export function LeaderboardSection() {
  const timer = useTimer()
  const { poolValue, netPool } = usePool()
  const [leaderboard, setLeaderboard] = useState<LeaderboardWithGames[]>([])
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

        // If Supabase is not configured, show empty state
        if (!supabase) {
          setLoading(false)
          return
        }

        const { data, error } = await supabase
          .from("daily_leaderboard")
          .select("*")
          .order("best_score", { ascending: false })
          .limit(100)

        if (error) {
          return
        }

        const today = new Date().toISOString().split("T")[0]

        const leaderboardWithGames: LeaderboardWithGames[] = await Promise.all(
          (data || []).map(async (player) => {
            const { count } = await supabase
              .from("scores")
              .select("*", { count: "exact", head: true })
              .eq("wallet_address", player.wallet_address)
              .gte("created_at", `${today}T00:00:00`)
              .lt("created_at", `${today}T23:59:59`)

            const gamesPlayed = count || 0
            const boostPercentage = gamesPlayed / 100 // 1 game = 1%
            const boostedScore = Math.round(player.best_score * (1 + boostPercentage))

            return {
              ...player,
              games_played: gamesPlayed,
              boosted_score: boostedScore,
            }
          }),
        )

        leaderboardWithGames.sort((a, b) => b.boosted_score - a.boosted_score)

        setLeaderboard(leaderboardWithGames)
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
                const updatedWithGames: LeaderboardWithGames[] = await Promise.all(
                  updatedData.map(async (player) => {
                    const { count } = await supabase
                      .from("scores")
                      .select("*", { count: "exact", head: true })
                      .eq("wallet_address", player.wallet_address)
                      .gte("created_at", `${today}T00:00:00`)
                      .lt("created_at", `${today}T23:59:59`)

                    const gamesPlayed = count || 0
                    const boostPercentage = gamesPlayed / 100
                    const boostedScore = Math.round(player.best_score * (1 + boostPercentage))

                    return {
                      ...player,
                      games_played: gamesPlayed,
                      boosted_score: boostedScore,
                    }
                  }),
                )

                updatedWithGames.sort((a, b) => b.boosted_score - a.boosted_score)
                setLeaderboard(updatedWithGames)
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
            <h2 className="font-serif font-black text-3xl md:text-4xl mb-2 tracking-orbitron">
              <span className="text-white">DAILY </span>
              <span className="text-[#D4AF37] neon-text">RANKING</span>
            </h2>
            <p className="text-gray-400 text-sm md:text-base">
              Top 100 Racers receive automated <span className="text-[#D4AF37]">$BNB</span> airdrops every{" "}
              <span className="text-white font-semibold">24h</span>. Showing Top 100 contenders.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-stretch gap-4 mt-4 md:mt-0">
            <div className="flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/50 rounded-lg px-4 py-3 min-w-[280px]">
              <Coins className="w-5 h-5 text-[#D4AF37]" />
              <span className="text-[#D4AF37] text-sm font-medium">Daily Reward Pool:</span>
              <span className="text-white font-mono font-bold">{netPool.toFixed(4)} BNB</span>
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
          <div className="hidden md:grid grid-cols-14 gap-4 px-4 py-3 bg-gray-900/50 border-b border-gray-800 text-xs uppercase tracking-wider text-gray-500 font-semibold">
            <div className="col-span-1 text-center">Rank</div>
            <div className="col-span-1">Racer</div>
            <div className="col-span-4">Wallet ID</div>
            <div className="col-span-2 text-center">Games</div>
            <div className="col-span-3 text-center">Score</div>
            <div className="col-span-3 text-right">Reward Pool</div>
          </div>

          <div className="grid md:hidden grid-cols-12 gap-2 px-3 py-3 bg-gray-900/50 border-b border-gray-800 text-[10px] uppercase tracking-wider text-gray-500 font-semibold">
            <div className="col-span-1 text-center">#</div>
            <div className="col-span-3 text-center">Wallet</div>
            <div className="col-span-2 text-center">Games</div>
            <div className="col-span-3 text-center">Score</div>
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
                      className={`hidden md:grid grid-cols-14 gap-4 px-4 py-4 items-center transition-colors hover:bg-gray-900/30 ${getRowStyle(rank)}`}
                    >
                      <div className="col-span-1 flex justify-center">{getRankDisplay(rank)}</div>

                      <div className="col-span-1 flex justify-center">
                        <div
                          className={`w-10 h-10 rounded-lg ${avatarColors[index % avatarColors.length]} flex items-center justify-center text-white font-bold text-sm`}
                        >
                          {username.charAt(0).toUpperCase()}
                        </div>
                      </div>

                      <div className="col-span-4 flex items-center gap-3">
                        <CopyableWallet wallet={racer.full_wallet} />
                      </div>

                      <div className="col-span-2 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Gamepad2 className="w-4 h-4 text-gray-400" />
                          <span className="text-white font-bold">{racer.games_played}</span>
                          {racer.games_played > 0 && (
                            <span className="text-green-400 text-xs font-medium">+{racer.games_played}%</span>
                          )}
                        </div>
                      </div>

                      <div className="col-span-3 text-center">
                        <div className="flex flex-col">
                          <span className="text-[#D4AF37] font-bold text-base">{formatScore(racer.boosted_score)}</span>
                          {racer.games_played > 0 && racer.boosted_score !== racer.best_score && (
                            <span className="text-gray-500 text-xs line-through">{formatScore(racer.best_score)}</span>
                          )}
                        </div>
                      </div>

                      <div className="col-span-3 text-right">
                        <span className="text-[#D4AF37] font-semibold text-base">{reward.toFixed(4)} BNB</span>
                      </div>
                    </div>

                    <div
                      className={`grid md:hidden grid-cols-12 gap-2 px-3 py-3 items-center transition-colors hover:bg-gray-900/30 ${getRowStyle(rank)}`}
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

                      <div className="col-span-3 flex justify-center">
                        <CopyableWallet wallet={racer.full_wallet} />
                      </div>

                      <div className="col-span-2 text-center">
                        <div className="flex flex-col items-center">
                          <span className="text-white font-bold text-xs">{racer.games_played}</span>
                          {racer.games_played > 0 && (
                            <span className="text-green-400 text-[10px]">+{racer.games_played}%</span>
                          )}
                        </div>
                      </div>

                      <div className="col-span-3 text-center">
                        <span className="text-[#D4AF37] font-bold text-xs">{formatScore(racer.boosted_score)}</span>
                      </div>

                      <div className="col-span-3 text-right">
                        <span className="text-[#D4AF37] font-semibold text-xs">{reward.toFixed(4)} BNB</span>
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
