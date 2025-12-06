"use client"

import { useEffect, useState, useRef } from "react"
import { Activity, Users, Coins, BarChart3, Clock, Zap, TrendingUp, TrendingDown } from "lucide-react"

const stats = [
  { label: "Market Cap", value: "$2.4M", icon: BarChart3, suffix: "" },
  { label: "24h Volume", value: "$847K", icon: Activity, suffix: "" },
  { label: "Holders", value: "12,847", icon: Users, suffix: "" },
  { label: "Circulating Supply", value: "847M", icon: Coins, suffix: " LMX" },
  { label: "Daily Prize Pool", value: "$4,200", icon: Zap, suffix: "" },
  { label: "Next Distribution", value: "04:32:18", icon: Clock, suffix: "", isTimer: true },
]

interface TickerData {
  symbol: string
  price: string
  change: number
}

const mockTickerData: TickerData[] = [
  { symbol: "LMX/USDT", price: "0.0847", change: 12.45 },
  { symbol: "BNB/USDT", price: "612.34", change: 2.18 },
  { symbol: "BTC/USDT", price: "104,521", change: 1.24 },
  { symbol: "ETH/USDT", price: "3,892", change: -0.87 },
]

export function TokenStats() {
  const [time, setTime] = useState("04:32:18")
  const [tickerData, setTickerData] = useState(mockTickerData)
  const [chartData, setChartData] = useState<number[]>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Timer countdown
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

  // Ticker data update
  useEffect(() => {
    const interval = setInterval(() => {
      setTickerData((prev) =>
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

  // Chart data initialization
  useEffect(() => {
    const initial = Array.from({ length: 50 }, () => 0.08 + Math.random() * 0.01)
    setChartData(initial)
  }, [])

  // Chart data update
  useEffect(() => {
    const interval = setInterval(() => {
      setChartData((prev) => {
        if (prev.length === 0) return prev
        const newData = [...prev.slice(1), prev[prev.length - 1] + (Math.random() - 0.48) * 0.002]
        return newData
      })
    }, 500)
    return () => clearInterval(interval)
  }, [])

  // Draw chart
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || chartData.length === 0) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height
    const min = Math.min(...chartData) * 0.99
    const max = Math.max(...chartData) * 1.01
    const range = max - min

    ctx.clearRect(0, 0, width, height)

    const gradient = ctx.createLinearGradient(0, 0, 0, height)
    gradient.addColorStop(0, "rgba(212, 175, 55, 0.3)")
    gradient.addColorStop(1, "rgba(212, 175, 55, 0)")

    ctx.beginPath()
    ctx.moveTo(0, height)

    chartData.forEach((value, index) => {
      const x = (index / (chartData.length - 1)) * width
      const y = height - ((value - min) / range) * height
      ctx.lineTo(x, y)
    })

    ctx.lineTo(width, height)
    ctx.closePath()
    ctx.fillStyle = gradient
    ctx.fill()

    ctx.beginPath()
    chartData.forEach((value, index) => {
      const x = (index / (chartData.length - 1)) * width
      const y = height - ((value - min) / range) * height
      if (index === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    })
    ctx.strokeStyle = "#D4AF37"
    ctx.lineWidth = 2
    ctx.stroke()

    const lastX = width
    const lastY = height - ((chartData[chartData.length - 1] - min) / range) * height
    ctx.beginPath()
    ctx.arc(lastX - 2, lastY, 4, 0, Math.PI * 2)
    ctx.fillStyle = "#D4AF37"
    ctx.fill()
  }, [chartData])

  return (
    <section className="py-12 bg-black border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 text-center">
          <h2
            className="font-cinzel text-3xl md:text-4xl font-black text-[#D4AF37] tracking-wider uppercase"
            style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
          >
            FINANCIAL FIGURES
          </h2>
          <div className="mt-2 w-24 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto" />
        </div>

        <div className="p-6 rounded-xl border-2 border-gray-800 bg-gray-950/50 backdrop-blur-sm">
          <div className="mb-6 overflow-hidden rounded-lg border border-gray-700 bg-gray-900/80">
            <div className="animate-marquee whitespace-nowrap py-3 flex">
              {[...tickerData, ...tickerData, ...tickerData].map((item, index) => (
                <div key={index} className="inline-flex items-center mx-8 text-sm">
                  <span className="text-gray-400 font-medium mr-2">{item.symbol}</span>
                  <span className="text-white font-mono mr-2">${item.price}</span>
                  <span
                    className={`flex items-center font-mono text-xs ${item.change >= 0 ? "text-green-500" : "text-red-500"}`}
                  >
                    {item.change >= 0 ? (
                      <TrendingUp className="w-3 h-3 mr-1" />
                    ) : (
                      <TrendingDown className="w-3 h-3 mr-1" />
                    )}
                    {item.change >= 0 ? "+" : ""}
                    {item.change.toFixed(2)}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Stats Grid */}
            <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="relative group p-4 rounded-lg bg-gray-900/80 border border-gray-700 hover:border-[#D4AF37]/50 transition-all"
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

            <div className="bg-gray-900/80 border border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm text-gray-400">LMX/USDT</h3>
                  <p className="text-2xl font-mono font-bold text-white">
                    ${chartData.length > 0 ? chartData[chartData.length - 1].toFixed(4) : "0.0847"}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-green-500 text-sm font-mono">+12.45%</span>
                  <p className="text-xs text-gray-500">24h Change</p>
                </div>
              </div>
              <canvas ref={canvasRef} width={400} height={120} className="w-full h-[120px]" />
              <div className="flex justify-between mt-2 text-xs text-gray-600">
                <span>24h ago</span>
                <span>12h ago</span>
                <span>Now</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
