"use client"

import { useState, useEffect } from "react"
import { Play, ArrowLeftRight, Trophy, Coins } from "lucide-react"
import { getSupabase } from "@/lib/supabase"
import { usePool } from "@/lib/pool-context"
import { useTimer } from "@/lib/timer-context"

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

// Sample transactions for display when no data
const sampleTransactions: Transaction[] = [
  {
    id: "1",
    type: "reward",
    title: "Game Reward",
    description: "Race completion bonus",
    detail: "Received 0.015 BNB from Lumexia",
    time: "2 mins ago",
    amount: 0.015,
    isPositive: true,
  },
  {
    id: "2",
    type: "transfer",
    title: "BNB Transfer",
    description: "Sent transfer to wallet",
    detail: "Sent 0.025 BNB to PancakeSwap",
    time: "15 mins ago",
    amount: 0.025,
    isPositive: false,
  },
  {
    id: "3",
    type: "reward",
    title: "Game Reward",
    description: "Daily leaderboard prize",
    detail: "Received 0.015 BNB from Lumexia",
    time: "15 mins ago",
    amount: 0.015,
    isPositive: true,
  },
  {
    id: "4",
    type: "transfer",
    title: "BNB Transfer",
    description: "Sent transfer to wallet",
    detail: "Received 0.015 BNB from Lumexia",
    time: "15 mins ago",
    amount: 0.015,
    isPositive: true,
  },
]

export function TransactionsPanel() {
  const [transactions, setTransactions] = useState<Transaction[]>(sampleTransactions)
  const { poolValue, netPool } = usePool()
  const timer = useTimer()

  return (
    <section className="flex-1 min-h-[300px] rounded-2xl neon-border-box flex flex-col overflow-hidden">
      {/* Panel Header */}
      <div className="px-8 py-6 border-b border-white/5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="font-serif font-bold text-xl text-[#00f0ff] tracking-wider neon-text-cyan uppercase">
          Recent Transactions
        </h2>
        
        <div className="flex flex-col md:flex-row items-stretch gap-3">
          <div className="flex items-center gap-2 glass-panel border border-[#00f0ff]/30 rounded-lg px-4 py-2">
            <Coins className="w-4 h-4 text-[#00f0ff]" />
            <span className="text-[#00f0ff] text-sm font-medium">Daily Pool:</span>
            <span className="text-white font-mono font-bold text-sm">{netPool.toFixed(4)} BNB</span>
          </div>

          <div className="flex items-center gap-2 glass-panel border border-[#ff3366]/30 rounded-lg px-4 py-2">
            <div className="w-2 h-2 bg-[#ff3366] rounded-full animate-pulse" />
            <span className="text-[#ff3366] text-sm font-medium">Reset:</span>
            <span className="text-white font-mono font-bold text-sm">
              {timer.hours}h {timer.minutes}m {timer.seconds}s
            </span>
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="flex-1 overflow-y-auto px-8 py-4 flex flex-col gap-2">
        {transactions.map((tx) => (
          <div
            key={tx.id}
            className="flex items-center justify-between py-4 border-b border-white/5 hover:bg-white/5 transition-colors rounded-lg px-4 -mx-4 group cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors ${
                  tx.type === "reward"
                    ? "border-[#00f0ff]/50 bg-[#00f0ff]/10 group-hover:bg-[#00f0ff]/20"
                    : "border-[#9d00ff]/50 bg-[#9d00ff]/10 group-hover:bg-[#9d00ff]/20"
                }`}
              >
                {tx.type === "reward" ? (
                  <Play className={`h-5 w-5 ${tx.type === "reward" ? "text-[#00f0ff]" : "text-[#9d00ff]"}`} />
                ) : (
                  <ArrowLeftRight className="h-5 w-5 text-[#9d00ff]" />
                )}
              </div>
              <div>
                <div className="font-semibold text-white">{tx.title}</div>
                <div className="text-sm text-[#a19bb8]">{tx.description}</div>
              </div>
            </div>

            <div className="text-sm text-[#a19bb8] flex-1 text-center hidden md:block">
              {tx.detail}
            </div>

            <div className="text-sm text-[#a19bb8] w-24 text-right">
              {tx.time}
            </div>

            <div
              className={`font-bold w-28 text-right ${
                tx.isPositive ? "text-[#00ff66]" : "text-[#ff3366]"
              }`}
            >
              {tx.isPositive ? "" : "-"}{tx.amount.toFixed(2)} BNB
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
