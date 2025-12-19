"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { getSupabase } from "@/lib/supabase"

const CREDIT_TO_BNB = 0.0015

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

      const today = new Date()
      today.setUTCHours(0, 0, 0, 0)
      const todayISO = today.toISOString()

      // Count total games played today (each row = 1 game)
      const { count, error } = await supabase
        .from("scores")
        .select("*", { count: "exact", head: true })
        .gte("created_at", todayISO)

      if (error) {
        setLoading(false)
        return
      }

      const gamesPlayed = count || 0
      const totalBNB = gamesPlayed * CREDIT_TO_BNB
      setTotalGames(gamesPlayed)
      setPoolValue(totalBNB)
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPoolValue()

    const supabase = getSupabase()
    const channel = supabase
      .channel("pool_scores_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "scores",
        },
        () => {
          fetchPoolValue()
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return <PoolContext.Provider value={{ poolValue, netPool, totalGames, loading }}>{children}</PoolContext.Provider>
}

export function usePool() {
  return useContext(PoolContext)
}
