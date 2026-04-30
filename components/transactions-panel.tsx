"use client"

import { useState, useEffect } from "react"
import { Play, ArrowLeftRight, Coins } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { getSupabase } from "@/lib/supabase"
import { usePool } from "@/lib/pool-context"
import { useTimer } from "@/lib/timer-context"
import { TOKEN_CONFIG } from "@/lib/token-config"

interface Transaction {
  id: string
  type: "reward" | "transfer"
  title: string
  description: string
  detail: string
  time: string
  amount: number
  isPositive: boolean
}

// Shape of a row read from public.transactions
interface TransactionRow {
  id: string
  amount: number | null
  credits_added: number | null
  status: string | null
  created_at: string | null
  token_amount: number | null
  token_symbol: string | null
}

function rowToTransaction(row: TransactionRow): Transaction {
  const credits = row.credits_added ?? 0
  const tokenAmount = row.token_amount ?? 0
  const tokenSymbol = row.token_symbol ?? TOKEN_CONFIG.symbol
  const usdAmount = row.amount ?? 0
  const created = row.created_at ? new Date(row.created_at) : new Date()

  return {
    id: row.id,
    type: "transfer",
    title: "Credit Purchase",
    description: `${credits} credit${credits === 1 ? "" : "s"} purchased`,
    detail: `${tokenAmount.toFixed(2)} ${tokenSymbol}`,
    time: formatDistanceToNow(created, { addSuffix: true }),
    amount: usdAmount,
    isPositive: true,
  }
}

export function TransactionsPanel() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const { netPool } = usePool()
  const timer = useTimer()

  useEffect(() => {
    const supabase = getSupabase()
    if (!supabase) {
      setLoading(false)
      return
    }

    let cancelled = false

    async function fetchRecent() {
      const { data, error } = await supabase
        .from("transactions")
        .select("id,amount,credits_added,status,created_at,token_amount,token_symbol")
        .eq("status", "success")
        .order("created_at", { ascending: false })
        .limit(10)

      if (cancelled) return
      if (error) {
        setLoading(false)
        return
      }

      setTransactions(((data ?? []) as TransactionRow[]).map(rowToTransaction))
      setLoading(false)
    }

    fetchRecent()

    // Debounce burst inserts (verify-payment retries, simultaneous
    // confirmations) — collapse multiple INSERTs within 1s into a
    // single fetchRecent call.
    let debounceTimer: ReturnType<typeof setTimeout> | null = null
    const onTxInsert = () => {
      if (debounceTimer) clearTimeout(debounceTimer)
      debounceTimer = setTimeout(() => {
        fetchRecent()
        debounceTimer = null
      }, 1000)
    }

    const channel = supabase
      .channel("recent_transactions_changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "transactions",
        },
        onTxInsert,
      )
      .subscribe()

    return () => {
      cancelled = true
      if (debounceTimer) clearTimeout(debounceTimer)
      supabase.removeChannel(channel)
    }
  }, [])

  return (
    <section id="transactions" className="flex-1 min-h-[300px] rounded-2xl neon-border-box flex flex-col overflow-hidden">
      {/* Panel Header */}
      <div className="px-4 md:px-8 py-4 md:py-6 border-b border-white/5 flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4">
        <h2 className="font-serif font-bold text-lg md:text-xl text-[#00f0ff] tracking-wider neon-text-cyan uppercase">
          Recent Transactions
        </h2>

        <div className="flex flex-row items-stretch gap-2 md:gap-3">
          <div className="flex items-center gap-1.5 md:gap-2 glass-panel border border-[#00f0ff]/30 rounded-lg px-2.5 md:px-4 py-1.5 md:py-2">
            <Coins className="w-3 h-3 md:w-4 md:h-4 text-[#00f0ff]" />
            <span className="text-[#00f0ff] text-xs md:text-sm font-medium">Pool:</span>
            <span className="text-white font-mono font-bold text-xs md:text-sm">${netPool.toFixed(2)}</span>
          </div>

          <div className="flex items-center gap-1.5 md:gap-2 glass-panel border border-[#ff3366]/30 rounded-lg px-2.5 md:px-4 py-1.5 md:py-2">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#ff3366] rounded-full animate-pulse" />
            <span className="text-[#ff3366] text-xs md:text-sm font-medium">Reset:</span>
            <span className="text-white font-mono font-bold text-xs md:text-sm">
              {timer.hours}h {timer.minutes}m {timer.seconds}s
            </span>
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="flex-1 overflow-y-auto px-3 md:px-8 py-3 md:py-4 flex flex-col gap-2">
        {loading ? (
          <div className="flex-1 flex items-center justify-center text-[#a19bb8] text-sm py-8">
            Loading transactions...
          </div>
        ) : transactions.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-[#a19bb8] text-sm py-8">
            No transactions yet
          </div>
        ) : (
          transactions.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between py-3 md:py-4 border-b border-white/5 hover:bg-white/5 transition-colors rounded-lg px-2 md:px-4 -mx-2 md:-mx-4 group cursor-pointer gap-2 md:gap-4"
            >
              <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
                <div
                  className={`w-8 h-8 md:w-10 md:h-10 rounded-full border flex items-center justify-center transition-colors ${
                    tx.type === "reward"
                      ? "border-[#00f0ff]/50 bg-[#00f0ff]/10 group-hover:bg-[#00f0ff]/20"
                      : "border-[#9d00ff]/50 bg-[#9d00ff]/10 group-hover:bg-[#9d00ff]/20"
                  }`}
                >
                  {tx.type === "reward" ? (
                    <Play className="h-4 w-4 md:h-5 md:w-5 text-[#00f0ff]" />
                  ) : (
                    <ArrowLeftRight className="h-4 w-4 md:h-5 md:w-5 text-[#9d00ff]" />
                  )}
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-white text-sm md:text-base truncate">{tx.title}</div>
                  <div className="text-xs md:text-sm text-[#a19bb8] truncate">{tx.description}</div>
                </div>
              </div>

              <div className="text-sm text-[#a19bb8] flex-1 text-center hidden lg:block">
                {tx.detail}
              </div>

              <div className="text-xs md:text-sm text-[#a19bb8] hidden sm:block flex-shrink-0">
                {tx.time}
              </div>

              <div
                className={`font-bold text-right text-sm md:text-base flex-shrink-0 ${
                  tx.isPositive ? "text-[#00ff66]" : "text-[#ff3366]"
                }`}
              >
                {tx.isPositive ? "+" : "-"}${tx.amount.toFixed(2)}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  )
}
