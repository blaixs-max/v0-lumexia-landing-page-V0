"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { getSupabase } from "@/lib/supabase"

const CREDIT_TO_BNB = 0.0015

interface PoolContextType {
  poolValue: number
  netPool: number
  loading: boolean
}

const PoolContext = createContext<PoolContextType>({
  poolValue: 0,
  netPool: 0,
  loading: true,
})

export function PoolProvider({ children }: { children: ReactNode }) {
  const [poolValue, setPoolValue] = useState<number>(0)
  const [loading, setLoading] = useState(true)

  // Net pool = 92.5% of total pool (7.5% fee)
  const netPool = poolValue * 0.925

  async function fetchPoolValue() {
    try {
      const supabase = getSupabase()

      const today = new Date()
      today.setUTCHours(0, 0, 0, 0)
      const todayISO = today.toISOString()

      const { data, error } = await supabase
        .from("transactions")
        .select("amount")
        .eq("status", "success")
        .gte("created_at", todayISO)

      if (error) {
        setLoading(false)
        return
      }

      const totalCredits = data?.reduce((sum, tx) => sum + (Number(tx.amount) || 0), 0) || 0
      const totalBNB = totalCredits * CREDIT_TO_BNB
      setPoolValue(totalBNB)
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPoolValue()

    // Realtime subscription
    const supabase = getSupabase()
    const channel = supabase
      .channel("pool_transactions_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "transactions",
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

  return <PoolContext.Provider value={{ poolValue, netPool, loading }}>{children}</PoolContext.Provider>
}

export function usePool() {
  return useContext(PoolContext)
}
