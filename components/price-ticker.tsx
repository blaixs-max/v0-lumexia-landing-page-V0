"use client"

import { useEffect, useState } from "react"
import { TrendingUp, TrendingDown } from "lucide-react"

interface TickerData {
  symbol: string
  price: string
  change: number
}

const mockData: TickerData[] = [
  { symbol: "LMX/USDT", price: "0.0847", change: 12.45 },
  { symbol: "BNB/USDT", price: "612.34", change: 2.18 },
  { symbol: "BTC/USDT", price: "104,521", change: 1.24 },
  { symbol: "ETH/USDT", price: "3,892", change: -0.87 },
]

export function PriceTicker() {
  const [data, setData] = useState(mockData)

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) =>
        prev.map((item) => ({
          ...item,
          price: (Number.parseFloat(item.price.replace(",", "")) * (1 + (Math.random() - 0.5) * 0.001))
            .toFixed(item.price.includes(",") ? 2 : 4)
            .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          change: item.change + (Math.random() - 0.5) * 0.1,
        })),
      )
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-gray-950 border-b border-gray-800 overflow-hidden">
      <div className="animate-marquee whitespace-nowrap py-2 flex">
        {[...data, ...data, ...data].map((item, index) => (
          <div key={index} className="inline-flex items-center mx-8 text-sm">
            <span className="text-gray-400 font-medium mr-2">{item.symbol}</span>
            <span className="text-white font-mono mr-2">${item.price}</span>
            <span
              className={`flex items-center font-mono text-xs ${item.change >= 0 ? "text-green-500" : "text-red-500"}`}
            >
              {item.change >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
              {item.change >= 0 ? "+" : ""}
              {item.change.toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
