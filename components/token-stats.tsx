"use client"

import { useEffect, useState } from "react"
import { Activity, Users, Coins, BarChart3, Clock, Zap } from "lucide-react"

const stats = [
  { label: "Market Cap", value: "$2.4M", icon: BarChart3, suffix: "" },
  { label: "24h Volume", value: "$847K", icon: Activity, suffix: "" },
  { label: "Holders", value: "12,847", icon: Users, suffix: "" },
  { label: "Circulating Supply", value: "847M", icon: Coins, suffix: " LMX" },
  { label: "Daily Prize Pool", value: "$4,200", icon: Zap, suffix: "" },
  { label: "Next Distribution", value: "04:32:18", icon: Clock, suffix: "", isTimer: true },
]

export function TokenStats() {
  const [time, setTime] = useState("04:32:18")

  useEffect(() => {
    const interval = setInterval(() => {
      const [h, m, s] = time.split(":").map(Number)
      let totalSeconds = h * 3600 + m * 60 + s - 1
      if (totalSeconds < 0) totalSeconds = 4 * 3600 + 32 * 60 + 18
      const newH = Math.floor(totalSeconds / 3600)
      const newM = Math.floor((totalSeconds % 3600) / 60)
      const newS = totalSeconds % 60
      setTime(`${String(newH).padStart(2, "0")}:${String(newM).padStart(2, "0")}:${String(newS).padStart(2, "0")}`)
    }, 1000)
    return () => clearInterval(interval)
  }, [time])

  return (
    <section className="py-12 bg-black border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative group p-4 rounded-lg bg-gray-950 border border-gray-800 hover:border-[#D4AF37]/50 transition-all"
            >
              <div className="flex items-center gap-2 mb-2">
                <stat.icon className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</span>
              </div>
              <p className="text-xl font-mono font-bold text-white">
                {stat.isTimer ? time : stat.value}
                <span className="text-gray-500 text-sm">{stat.suffix}</span>
              </p>
              {stat.label === "24h Volume" && (
                <div className="absolute bottom-1 right-2">
                  <span className="text-xs text-green-500 font-mono">+24.5%</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
