"use client"

import { useState, useEffect } from "react"
import { Trophy, Coins, Copy, Check, Gamepad2 } from "lucide-react"
import { getSupabase, type DailyLeaderboardEntry } from "@/lib/supabase"
import { useTimer } from "@/lib/timer-context"
import { usePool } from "@/lib/pool-context"

// 48-hour cycle window — mirrors supabase/functions/calculate-daily-rewards/index.ts.
// The anchor MUST stay in sync with migration 20260501160000_cycle_48h.sql; do not
// change unless the trigger function and Edge Function change in the same release.
const CYCLE_ANCHOR_DATE = "2026-05-01"
const MS_PER_DAY = 86_400_000

function getCycleWindow() {
  const now = new Date()
  const anchor = new Date(`${CYCLE_ANCHOR_DATE}T00:00:00Z`)
  const daysSinceAnchor = Math.floor((now.getTime() - anchor.getTime()) / MS_PER_DAY)
  const cycleStartDay = daysSinceAnchor - (daysSinceAnchor % 2)
  const cycleStart = new Date(anchor.getTime() + cycleStartDay * MS_PER_DAY).toISOString()
  const cycleEnd = new Date(anchor.getTime() + (cycleStartDay + 2) * MS_PER_DAY).toISOString()
  return { cycleStart, cycleEnd }
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

  if (!wallet) return <span className="text-[#a19bb8] text-xs">N/A</span>

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 px-2 py-1 rounded border border-[#00f0ff]/50 bg-[#00f0ff]/10 hover:bg-[#00f0ff]/20 transition-colors"
    >
      <span className="text-white text-xs font-mono">{truncateWallet(wallet)}</span>
      {copied ? <Check className="w-3 h-3 text-[#00ff66]" /> : <Copy className="w-3 h-3 text-[#00f0ff]" />}
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
  const [solPriceUsd, setSolPriceUsd] = useState<number | null>(null)

  // Fetch SOL/USD price (CoinGecko via /api/ticker). The reward column shows
  // an LMX figure (USD-equivalent) plus a live SOL conversion underneath.
  useEffect(() => {
    let aborted = false
    async function fetchSolPrice() {
      try {
        const res = await fetch("/api/ticker")
        if (!res.ok) return
        const data = await res.json()
        const sol = data?.solana?.usd
        if (sol && !aborted) {
          const p = Number.parseFloat(String(sol))
          if (Number.isFinite(p) && p > 0) setSolPriceUsd(p)
        }
      } catch {
        /* ignore — reward row falls back to LMX-only render */
      }
    }
    fetchSolPrice()
    const interval = setInterval(fetchSolPrice, 60_000)
    return () => {
      aborted = true
      clearInterval(interval)
    }
  }, [])

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

        const { cycleStart, cycleEnd } = getCycleWindow()

        const leaderboardWithGames: LeaderboardWithGames[] = await Promise.all(
          (data || []).map(async (player) => {
            const { count } = await supabase
              .from("scores")
              .select("*", { count: "exact", head: true })
              .eq("wallet_address", player.wallet_address)
              .gte("created_at", cycleStart)
              .lt("created_at", cycleEnd)

            const gamesPlayed = count || 0
            // Mirrors calculate-daily-rewards Edge Function: extra games beyond
            // the first add a percent each. 1 game = +0%, 2 games = +2%,
            // 3 games = +3%, ... (no bonus for a single play).
            const bonusPercent = gamesPlayed >= 2 ? gamesPlayed : 0
            const boostedScore = Math.round(player.best_score * (1 + bonusPercent / 100))

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
                // Recompute the cycle window each time — a long-lived browser
                // session can outlast a cycle boundary, and we want fresh data.
                const { cycleStart: rtCycleStart, cycleEnd: rtCycleEnd } = getCycleWindow()
                const updatedWithGames: LeaderboardWithGames[] = await Promise.all(
                  updatedData.map(async (player) => {
                    const { count } = await supabase
                      .from("scores")
                      .select("*", { count: "exact", head: true })
                      .eq("wallet_address", player.wallet_address)
                      .gte("created_at", rtCycleStart)
                      .lt("created_at", rtCycleEnd)

                    const gamesPlayed = count || 0
                    const bonusPercent = gamesPlayed >= 2 ? gamesPlayed : 0
                    const boostedScore = Math.round(player.best_score * (1 + bonusPercent / 100))

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
      return "bg-[#00f0ff]/5 border-l-4 border-l-[#00f0ff]"
    }
    return "bg-transparent border-l-4 border-l-transparent hover:bg-white/5"
  }

  return (
    <section id="leaderboard" className="py-10 px-0 bg-transparent">
      <div className="neon-border-box p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h2 className="font-serif font-black text-2xl md:text-3xl mb-2 tracking-orbitron">
              <span className="text-white">CYCLE </span>
              <span className="text-[#00f0ff] neon-text-cyan">RANKING</span>
            </h2>
            <p className="text-[#a19bb8] text-sm md:text-base">
              Top 100 Racers receive automated <span className="text-[#00f0ff]">$TOKABU</span> airdrops every{" "}
              <span className="text-white font-semibold">48h</span>. Showing Top 100 contenders.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-stretch gap-4 mt-4 md:mt-0">
            <div className="flex items-center gap-2 glass-panel border border-[#00f0ff]/30 rounded-lg px-4 py-3 min-w-[200px]">
              <Coins className="w-5 h-5 text-[#00f0ff]" />
              <span className="text-[#00f0ff] text-sm font-medium">Pool:</span>
              <span className="text-white font-mono font-bold">${netPool.toFixed(2)}</span>
            </div>

            <div className="flex items-center gap-2 glass-panel border border-[#ff3366]/30 rounded-lg px-4 py-3 min-w-[200px]">
              <div className="w-2 h-2 bg-[#ff3366] rounded-full animate-pulse" />
              <span className="text-[#ff3366] text-sm font-medium">Reset:</span>
              <span className="text-white font-mono font-bold">
                {timer.hours}h {timer.minutes}m {timer.seconds}s
              </span>
            </div>
          </div>
        </div>

        <div className="border border-white/10 rounded-xl overflow-hidden bg-[#080414]/50">
          <div className="hidden md:grid grid-cols-14 gap-4 px-4 py-3 bg-[#9d00ff]/10 border-b border-white/10 text-xs uppercase tracking-wider text-[#a19bb8] font-semibold">
            <div className="col-span-1 text-center">Rank</div>
            <div className="col-span-1">Racer</div>
            <div className="col-span-4">Wallet ID</div>
            <div className="col-span-2 text-center">Games</div>
            <div className="col-span-3 text-center">Score</div>
            <div className="col-span-3 text-right">Reward Pool</div>
          </div>

          <div className="grid md:hidden grid-cols-12 gap-2 px-3 py-3 bg-[#9d00ff]/10 border-b border-white/10 text-[10px] uppercase tracking-wider text-[#a19bb8] font-semibold">
            <div className="col-span-1 text-center">#</div>
            <div className="col-span-3 text-center">Wallet</div>
            <div className="col-span-2 text-center">Games</div>
            <div className="col-span-3 text-center">Score</div>
            <div className="col-span-3 text-right">Reward</div>
          </div>

          <div
            className="divide-y divide-white/5 max-h-[600px] overflow-y-auto leaderboard-scroll"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#00f0ff #1a1a1a",
            }}
          >
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-[#00f0ff] text-lg">Loading leaderboard...</div>
              </div>
            ) : leaderboard.length === 0 ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-[#a19bb8] text-lg">No racers yet. Be the first!</div>
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
                          {racer.games_played >= 2 && (
                            <span className="text-green-400 text-xs font-medium">+{racer.games_played}%</span>
                          )}
                        </div>
                      </div>

                      <div className="col-span-3 text-center">
                        <div className="flex flex-col">
                          <span className="text-[#00f0ff] font-bold text-base">{formatScore(racer.boosted_score)}</span>
                          {racer.games_played >= 2 && racer.boosted_score !== racer.best_score && (
                            <span className="text-[#a19bb8] text-xs line-through">{formatScore(racer.best_score)}</span>
                          )}
                        </div>
                      </div>

                      <div className="col-span-3 text-right">
                        <div className="flex flex-col items-end">
                          <span className="text-[#00ff66] font-semibold text-base">{reward.toFixed(2)} LMX</span>
                          {solPriceUsd !== null && solPriceUsd > 0 && (
                            <span className="text-[#a19bb8] text-[10px] font-mono">
                              ≈ {(reward / solPriceUsd).toFixed(4)} SOL
                            </span>
                          )}
                        </div>
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
                          {racer.games_played >= 2 && (
                            <span className="text-green-400 text-[10px]">+{racer.games_played}%</span>
                          )}
                        </div>
                      </div>

                      <div className="col-span-3 text-center">
                        <span className="text-[#00f0ff] font-bold text-xs">{formatScore(racer.boosted_score)}</span>
                      </div>

                      <div className="col-span-3 text-right">
                        <div className="flex flex-col items-end">
                          <span className="text-[#00ff66] font-semibold text-xs">{reward.toFixed(2)} LMX</span>
                          {solPriceUsd !== null && solPriceUsd > 0 && (
                            <span className="text-[#a19bb8] text-[9px] font-mono">
                              ≈ {(reward / solPriceUsd).toFixed(4)} SOL
                            </span>
                          )}
                        </div>
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
