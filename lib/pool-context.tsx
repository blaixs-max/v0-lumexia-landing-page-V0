"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { getSupabase } from "@/lib/supabase"

// 1 game = $1 USD (matches verify-payment package pricing and
// calculate-daily-rewards Edge Function. USD is the canonical unit;
// the UI may convert to TOKABU using the live token price elsewhere.)
const CREDIT_TO_USD = 1.0

// 48h cycle anchor — keep in sync with lib/timer-context.tsx and the
// racing repo. Sprint 8 token launch reset moved the anchor to 2026-05-09;
// see racing repo migration 20260509200000_cycle_reset_token_launch.sql.
const CYCLE_ANCHOR_DATE = "2026-05-09"
const MS_PER_DAY = 86_400_000
const MS_PER_CYCLE = 2 * MS_PER_DAY

function currentCycleStart(now: Date): Date {
  const anchor = new Date(`${CYCLE_ANCHOR_DATE}T00:00:00Z`)
  const elapsed = now.getTime() - anchor.getTime()
  const cyclesPassed = Math.floor(elapsed / MS_PER_CYCLE)
  return new Date(anchor.getTime() + cyclesPassed * MS_PER_CYCLE)
}

interface PoolContextType {
  poolValue: number
  netPool: number
  totalGames: number
  loading: boolean
}

const PoolContext = createContext<PoolContextType>({
  poolValue: 0,
  netPool: 0,
  totalGames: 0,
  loading: true,
})

export function PoolProvider({ children }: { children: ReactNode }) {
  const [poolValue, setPoolValue] = useState<number>(0)
  const [totalGames, setTotalGames] = useState<number>(0)
  const [loading, setLoading] = useState(true)

  // Net pool = 92.5% of total pool (7.5% fee)
  const netPool = poolValue * 0.925

  async function fetchPoolValue() {
    try {
      const supabase = getSupabase()

      // If Supabase is not configured, use default values
      if (!supabase) {
        setLoading(false)
        return
      }

      const cycleStartIso = currentCycleStart(new Date()).toISOString()

      // Count games played within the current 48h cycle (each row = 1 game).
      const { count, error } = await supabase
        .from("scores")
        .select("*", { count: "exact", head: true })
        .gte("created_at", cycleStartIso)

      if (error) {
        setLoading(false)
        return
      }

      const gamesPlayed = count || 0
      const totalUSD = gamesPlayed * CREDIT_TO_USD
      setTotalGames(gamesPlayed)
      setPoolValue(totalUSD)
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPoolValue()

    const supabase = getSupabase()

    // Skip realtime subscription if Supabase is not configured
    if (!supabase) return

    // Debounce burst inserts (anti-cheat reject + retry storms, batch
    // submissions, etc.) — collapse multiple INSERTs within 1s into a
    // single fetchPoolValue call.
    let debounceTimer: ReturnType<typeof setTimeout> | null = null
    const onScoreInsert = () => {
      if (debounceTimer) clearTimeout(debounceTimer)
      debounceTimer = setTimeout(() => {
        fetchPoolValue()
        debounceTimer = null
      }, 1000)
    }

    const channel = supabase
      .channel("pool_scores_changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "scores",
        },
        onScoreInsert,
      )
      .subscribe()

    return () => {
      if (debounceTimer) clearTimeout(debounceTimer)
      supabase.removeChannel(channel)
    }
  }, [])

  return <PoolContext.Provider value={{ poolValue, netPool, totalGames, loading }}>{children}</PoolContext.Provider>
}

export function usePool() {
  return useContext(PoolContext)
}
