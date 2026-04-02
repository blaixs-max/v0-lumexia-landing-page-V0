"use client"

import { useEffect, useState, useCallback } from "react"
import { Activity, Users, Coins, BarChart3, Clock, Zap, TrendingUp, TrendingDown, RefreshCw } from "lucide-react"
import { useTimer } from "@/lib/timer-context"
import { usePool } from "@/lib/pool-context"

const TOKEN_ADDRESS = "0xb92cc959c2434c06489d3f941391a5f1d8334444"

interface DexData {
  priceUsd: string
  marketCap: number
  volume24h: number
  fdv: number
  priceChange24h: number
  liquidity: number
  pairAddress: string | null
}

interface TickerItem {
  symbol: string
  price: string
  change: number
  icon: string
}

function formatNumber(num: number): string {
  if (num >= 1_000_000_000) {
    return `$${(num / 1_000_000_000).toFixed(2)}B`
  } else if (num >= 1_000_000) {
    return `$${(num / 1_000_000).toFixed(2)}M`
  } else if (num >= 1_000) {
    return `$${(num / 1_000).toFixed(0)}K`
  }
  return `$${num.toFixed(2)}`
}

export function TokenStats() {
  const timer = useTimer()
  const { netPool, loading: poolLoading } = usePool()
  const [tickerData, setTickerData] = useState<TickerItem[]>([])
  const [dexData, setDexData] = useState<DexData | null>(null)
  const [dexLoading, setDexLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)
  const [apiError, setApiError] = useState<string | null>(null)

  const fetchAllTickerData = useCallback(async () => {
    try {
      setDexLoading(true)
      setApiError(null)

      const dexResponse = await fetch("/api/dex")

      if (!dexResponse.ok) {
        throw new Error(`API error: ${dexResponse.status}`)
      }

      const dexResult = await dexResponse.json()

      let lmxData: TickerItem = { symbol: "LMX/USDT", price: "0.0000", change: 0, icon: "LMX" }
      let pairAddress: string | null = null

      if (dexResult.pairs && dexResult.pairs.length > 0) {
        const mainPair = dexResult.pairs.sort((a: any, b: any) => (b.liquidity?.usd || 0) - (a.liquidity?.usd || 0))[0]

        const price = Number.parseFloat(mainPair.priceUsd || "0")

        lmxData = {
          symbol: "LMX/USDT",
          price: price < 0.01 ? price.toFixed(6) : price.toFixed(4),
          change: mainPair.priceChange?.h24 || 0,
          icon: "LMX",
        }

        pairAddress = mainPair.pairAddress

        setDexData({
          priceUsd: mainPair.priceUsd || "0",
          marketCap: mainPair.marketCap || mainPair.fdv || 0,
          volume24h: mainPair.volume?.h24 || 0,
          fdv: mainPair.fdv || 0,
          priceChange24h: mainPair.priceChange?.h24 || 0,
          liquidity: mainPair.liquidity?.usd || 0,
          pairAddress: pairAddress,
        })
      } else {
        setApiError("Token not found on DexScreener")
        setDexData({
          priceUsd: "0",
          marketCap: 0,
          volume24h: 0,
          fdv: 0,
          priceChange24h: 0,
          liquidity: 0,
          pairAddress: null,
        })
      }

      const cgResponse = await fetch("/api/ticker")
      const cgData = await cgResponse.json()

      const newTickerData: TickerItem[] = [
        {
          symbol: "BNB/USDT",
          price: cgData.binancecoin?.usd?.toFixed(2) || "0.00",
          change: cgData.binancecoin?.usd_24h_change || 0,
          icon: "BNB",
        },
        {
          symbol: "BTC/USDT",
          price: cgData.bitcoin?.usd?.toLocaleString() || "0",
          change: cgData.bitcoin?.usd_24h_change || 0,
          icon: "BTC",
        },
        {
          symbol: "ETH/USDT",
          price: cgData.ethereum?.usd?.toLocaleString() || "0",
          change: cgData.ethereum?.usd_24h_change || 0,
          icon: "ETH",
        },
        lmxData,
      ]

      setTickerData(newTickerData)
      setLastUpdate(new Date())
    } catch (error) {
      console.error("Error fetching ticker data:", error)
      setApiError(error instanceof Error ? error.message : "API Error")
    } finally {
      setDexLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchAllTickerData()
    const interval = setInterval(fetchAllTickerData, 30000)
    return () => clearInterval(interval)
  }, [fetchAllTickerData])

  const stats = [
    {
      label: "Market Cap",
      value: dexLoading ? "Loading..." : dexData && dexData.marketCap > 0 ? formatNumber(dexData.marketCap) : "N/A",
      icon: BarChart3,
      suffix: "",
    },
    {
      label: "24h Volume",
      value: dexLoading ? "Loading..." : dexData && dexData.volume24h > 0 ? formatNumber(dexData.volume24h) : "N/A",
      icon: Activity,
      suffix: "",
      change: dexData?.priceChange24h,
    },
    {
      label: "Daily Prize Pool",
      value: poolLoading ? "..." : netPool.toFixed(4),
      icon: Zap,
      suffix: " BNB",
    },
    { label: "Next Distribution", value: "04:32:18", icon: Clock, suffix: "", isTimer: true },
  ]

  const getIconColor = (symbol: string) => {
    switch (symbol) {
      case "BNB": return "text-yellow-400"
      case "BTC": return "text-orange-400"
      case "ETH": return "text-purple-400"
      case "LMX": return "text-cyan-400"
      default: return "text-gray-400"
    }
  }

  return (
    <section className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-black tracking-wider uppercase gradient-text neon-text-purple">
            FINANCIAL FIGURES
          </h2>
          <div className="mt-3 w-32 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto" />
          {lastUpdate && (
            <p className="mt-3 text-xs text-gray-500 flex items-center justify-center gap-1">
              <RefreshCw className="w-3 h-3" />
              Last updated: {lastUpdate.toLocaleTimeString()}
            </p>
          )}
          {apiError && <p className="mt-1 text-xs text-yellow-500">Note: {apiError}</p>}
        </div>

        <div className="glass-card rounded-3xl p-6 sm:p-8">
          {/* Price Ticker */}
          <div className="mb-8 overflow-hidden rounded-2xl glass">
            <div className="animate-marquee whitespace-nowrap py-4 flex">
              {[...tickerData, ...tickerData, ...tickerData].map((item, index) => (
                <div key={index} className="inline-flex items-center mx-8 text-sm">
                  <div className={`w-8 h-8 rounded-full bg-gray-800/80 flex items-center justify-center mr-3 ${getIconColor(item.icon)}`}>
                    <span className="text-xs font-bold">{item.icon.charAt(0)}</span>
                  </div>
                  <span className="text-gray-400 font-medium mr-2">{item.symbol}</span>
                  <span className="text-white font-mono font-semibold mr-2">${item.price}</span>
                  <span
                    className={`flex items-center font-mono text-xs px-2 py-0.5 rounded-full ${
                      item.change >= 0 
                        ? "text-green-400 bg-green-500/10" 
                        : "text-red-400 bg-red-500/10"
                    }`}
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
            <div className="lg:col-span-2 grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="relative group p-5 rounded-2xl glass border border-purple-500/20 hover:border-cyan-500/40 transition-all duration-300"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                      <stat.icon className="w-4 h-4 text-cyan-400" />
                    </div>
                    <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">{stat.label}</span>
                  </div>
                  <p className="text-2xl font-mono font-bold text-white">
                    {stat.isTimer ? timer.formatted : stat.value}
                    <span className="text-cyan-400 text-sm ml-1">{stat.suffix}</span>
                  </p>
                  {stat.label === "24h Volume" && stat.change !== undefined && stat.change !== 0 && (
                    <div className="absolute bottom-2 right-3">
                      <span className={`text-xs font-mono ${stat.change >= 0 ? "text-green-400" : "text-red-400"}`}>
                        {stat.change >= 0 ? "+" : ""}
                        {stat.change.toFixed(2)}%
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Chart Section */}
            <div className="glass border border-purple-500/20 rounded-2xl p-5 overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center">
                    <Activity className="w-4 h-4 text-purple-400" />
                  </div>
                  <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">24H Price Chart</span>
                </div>
                <span className="text-xs text-cyan-400 flex items-center gap-1">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                  Live
                </span>
              </div>
              <div className="h-[200px] w-full rounded-xl overflow-hidden">
                {dexData?.pairAddress ? (
                  <iframe
                    src={`https://dexscreener.com/bsc/${dexData.pairAddress}?embed=1&theme=dark&trades=0&info=0`}
                    className="w-full h-full"
                    style={{ border: "none" }}
                    title="LMX Price Chart"
                  />
                ) : !dexLoading ? (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 text-sm glass rounded-xl">
                    <Activity className="w-10 h-10 mb-3 text-purple-500/50" />
                    <p className="text-gray-400">Chart unavailable</p>
                    <p className="text-xs text-gray-600 mt-1">Token not listed on DexScreener yet</p>
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
                    <RefreshCw className="w-5 h-5 mr-2 animate-spin text-cyan-400" />
                    Loading chart...
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
