"use client"

import { useState, useEffect } from "react"
import { Trophy, Coins, Copy, Check, Gamepad2 } from "lucide-react"
import { getSupabase, type DailyLeaderboardEntry } from "@/lib/supabase"
import { useTimer } from "@/lib/timer-context"
import { usePool } from "@/lib/pool-context"

const avatarColors = [
  "bg-gradient-to-br from-cyan-500 to-purple-600",
  "bg-gradient-to-br from-purple-500 to-pink-600",
  "bg-gradient-to-br from-pink-500 to-orange-600",
  "bg-gradient-to-br from-teal-500 to-cyan-600",
  "bg-gradient-to-br from-indigo-500 to-purple-600",
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
      className="flex items-center gap-1.5 px-2 py-1 rounded-lg border border-cyan-500/30 bg-cyan-500/10 hover:bg-cyan-500/20 transition-colors"
    >
      <span className="text-gray-300 text-xs font-mono">{truncateWallet(wallet)}</span>
      {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3 text-cyan-400" />}
    </button>
  )
}

function formatScore(score: number) {
  return score.toLocaleString()
}

function getSharePoints(rank: number): number {
  if (rank === 1) return 125
  if (rank === 2) return 100
  if (rank === 3) return 75
  if (rank === 4) return 50
  if (rank === 5) return 25
  if (rank >= 6 && rank <= 50) return 8
  if (rank >= 51 && rank <= 100) return 4
  return 0
}

function calculateAllRewards(
  leaderboardLength: number,
  totalPool: number,
): { rewards: number[]; netPool: number; totalShares: number; unitValue: number } {
  const netPool = totalPool * 0.925
  let totalShares = 0
  for (let i = 1; i <= leaderboardLength && i <= 100; i++) {
    totalShares += getSharePoints(i)
  }
  const unitValue = totalShares > 0 ? netPool / totalShares : 0
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

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const supabase = getSupabase()
        const { data, error } = await supabase
          .from("daily_leaderboard")
          .select("*")
          .order("best_score", { ascending: false })
          .limit(100)

        if (error) return

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
            const boostPercentage = gamesPlayed / 100
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
            { event: "*", schema: "public", table: "daily_leaderboard" },
            async () => {
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

                    return { ...player, games_played: gamesPlayed, boosted_score: boostedScore }
                  }),
                )
                updatedWithGames.sort((a, b) => b.boosted_score - a.boosted_score)
                setLeaderboard(updatedWithGames)
              }
            },
          )
          .subscribe()

        return () => { supabase.removeChannel(channel) }
      } catch (err) {
        setLoading(false)
      }
    }

    fetchLeaderboard()
  }, [])

  useEffect(() => {
    if (leaderboard.length > 0 && poolValue > 0) {
      const { rewards } = calculateAllRewards(leaderboard.length, poolValue)
      setCalculatedRewards(rewards)
    }
  }, [leaderboard, poolValue])

  const getRankDisplay = (rank: number) => {
    if (rank === 1) return <Trophy className="w-5 h-5 text-yellow-400" />
    if (rank === 2) return <Trophy className="w-5 h-5 text-gray-300" />
    if (rank === 3) return <Trophy className="w-5 h-5 text-amber-600" />
    return <span className="text-gray-400 font-medium">#{rank}</span>
  }

  const getRowStyle = (rank: number) => {
    if (rank <= 3) return "bg-gradient-to-r from-purple-500/10 to-transparent border-l-4 border-l-cyan-400"
    return "bg-transparent border-l-4 border-l-transparent hover:bg-purple-500/5"
  }

  return (
    <section id="leaderboard" className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h2 className="font-serif font-black text-3xl md:text-4xl mb-2">
              <span className="text-white">DAILY </span>
              <span className="gradient-text">RANKING</span>
            </h2>
            <p className="text-gray-400 text-sm md:text-base">
              Top 100 Racers receive automated <span className="text-cyan-400">$SOL</span> airdrops every{" "}
              <span className="text-white font-semibold">24h</span>. Showing Top 100 contenders.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-stretch gap-4 mt-4 md:mt-0">
            <div className="flex items-center gap-3 glass-card rounded-xl px-5 py-3">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                <Coins className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <span className="text-xs text-gray-500 uppercase tracking-wider">Daily Reward Pool</span>
                <p className="text-white font-mono font-bold">{netPool.toFixed(4)} SOL</p>
              </div>
            </div>

            <div className="flex items-center gap-3 glass border border-red-500/30 rounded-xl px-5 py-3">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              <div>
                <span className="text-xs text-gray-500 uppercase tracking-wider">Reset In</span>
                <p className="text-white font-mono font-bold">
                  {timer.hours}h {timer.minutes}m {timer.seconds}s
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-2xl overflow-hidden">
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-14 gap-4 px-6 py-4 border-b border-purple-500/20 text-xs uppercase tracking-wider text-gray-500 font-semibold">
            <div className="col-span-1 text-center">Rank</div>
            <div className="col-span-1">Racer</div>
            <div className="col-span-4">Wallet ID</div>
            <div className="col-span-2 text-center">Games</div>
            <div className="col-span-3 text-center">Score</div>
            <div className="col-span-3 text-right">Reward Pool</div>
          </div>

          <div className="grid md:hidden grid-cols-12 gap-2 px-3 py-3 border-b border-purple-500/20 text-[10px] uppercase tracking-wider text-gray-500 font-semibold">
            <div className="col-span-1 text-center">#</div>
            <div className="col-span-3 text-center">Wallet</div>
            <div className="col-span-2 text-center">Games</div>
            <div className="col-span-3 text-center">Score</div>
            <div className="col-span-3 text-right">Reward</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-purple-500/10 max-h-[1100px] overflow-y-auto leaderboard-scroll">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-cyan-400 text-lg">Loading leaderboard...</div>
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
                    {/* Desktop Row */}
                    <div className={`hidden md:grid grid-cols-14 gap-4 px-6 py-4 items-center transition-colors ${getRowStyle(rank)}`}>
                      <div className="col-span-1 flex justify-center">{getRankDisplay(rank)}</div>
                      <div className="col-span-1 flex justify-center">
                        <div className={`w-10 h-10 rounded-xl ${avatarColors[index % avatarColors.length]} flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                          {username.charAt(0).toUpperCase()}
                        </div>
                      </div>
                      <div className="col-span-4 flex items-center gap-3">
                        <CopyableWallet wallet={racer.full_wallet} />
                      </div>
                      <div className="col-span-2 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Gamepad2 className="w-4 h-4 text-purple-400" />
                          <span className="text-white font-bold">{racer.games_played}</span>
                          {racer.games_played > 0 && (
                            <span className="text-green-400 text-xs font-medium bg-green-500/10 px-1.5 py-0.5 rounded">+{racer.games_played}%</span>
                          )}
                        </div>
                      </div>
                      <div className="col-span-3 text-center">
                        <div className="flex flex-col">
                          <span className="text-cyan-400 font-bold text-base">{formatScore(racer.boosted_score)}</span>
                          {racer.games_played > 0 && racer.boosted_score !== racer.best_score && (
                            <span className="text-gray-500 text-xs line-through">{formatScore(racer.best_score)}</span>
                          )}
                        </div>
                      </div>
                      <div className="col-span-3 text-right">
                        <span className="text-cyan-400 font-semibold text-base">{reward.toFixed(4)} SOL</span>
                      </div>
                    </div>

                    {/* Mobile Row */}
                    <div className={`grid md:hidden grid-cols-12 gap-2 px-3 py-3 items-center transition-colors ${getRowStyle(rank)}`}>
                      <div className="col-span-1 flex justify-center">
                        {rank <= 3 ? (
                          <Trophy className={`w-4 h-4 ${rank === 1 ? "text-yellow-400" : rank === 2 ? "text-gray-300" : "text-amber-600"}`} />
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
                        <span className="text-cyan-400 font-bold text-xs">{formatScore(racer.boosted_score)}</span>
                      </div>
                      <div className="col-span-3 text-right">
                        <span className="text-cyan-400 font-semibold text-xs">{reward.toFixed(4)} SOL</span>
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
