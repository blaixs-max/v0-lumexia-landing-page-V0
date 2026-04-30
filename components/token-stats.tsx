"use client"

import { useEffect, useState, useCallback } from "react"
import { Activity, Users, Coins, BarChart3, Clock, Zap, TrendingUp, TrendingDown, RefreshCw } from "lucide-react"
import { useTimer } from "@/lib/timer-context"
import { usePool } from "@/lib/pool-context"
import { TOKEN_CONFIG } from "@/lib/token-config"

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
      console.log("[v0] DexScreener API response:", dexResult)

      let tokenData: TickerItem = { symbol: `${TOKEN_CONFIG.symbol}/USD`, price: "0.0000", change: 0 }
      let pairAddress: string | null = null

      if (dexResult.pairs && dexResult.pairs.length > 0) {
        const mainPair = dexResult.pairs.sort((a: any, b: any) => (b.liquidity?.usd || 0) - (a.liquidity?.usd || 0))[0]

        console.log("[v0] Main pair found:", mainPair)

        const price = Number.parseFloat(mainPair.priceUsd || "0")

        tokenData = {
          symbol: `${TOKEN_CONFIG.symbol}/USD`,
          price: price < 0.01 ? price.toFixed(6) : price.toFixed(4),
          change: mainPair.priceChange?.h24 || 0,
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
        console.log("[v0] No pairs found for token")
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
        tokenData,
        {
          symbol: "BNB/USDT",
          price: cgData.binancecoin?.usd?.toFixed(2) || "0.00",
          change: cgData.binancecoin?.usd_24h_change || 0,
        },
        {
          symbol: "BTC/USDT",
          price: cgData.bitcoin?.usd?.toLocaleString() || "0",
          change: cgData.bitcoin?.usd_24h_change || 0,
        },
        {
          symbol: "ETH/USDT",
          price: cgData.ethereum?.usd?.toLocaleString() || "0",
          change: cgData.ethereum?.usd_24h_change || 0,
        },
      ]

      setTickerData(newTickerData)
      setLastUpdate(new Date())
    } catch (error) {
      console.error("[v0] Error fetching ticker data:", error)
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
      label: "Liquidity",
      value: dexLoading ? "Loading..." : dexData && dexData.liquidity > 0 ? formatNumber(dexData.liquidity) : "N/A",
      icon: Users,
      suffix: "",
    },
    {
      label: "FDV",
      value: dexLoading ? "Loading..." : dexData && dexData.fdv > 0 ? formatNumber(dexData.fdv) : "N/A",
      icon: Coins,
      suffix: "",
    },
    {
      label: "Daily Prize Pool",
      value: poolLoading ? "..." : netPool.toFixed(4),
      icon: Zap,
      suffix: " BNB",
    },
    { label: "Next Distribution", value: "04:32:18", icon: Clock, suffix: "", isTimer: true },
  ]

  return (
    <section className="py-12 bg-black border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-black text-[#D4AF37] tracking-orbitron uppercase neon-text">
            FINANCIAL FIGURES
          </h2>
          <div className="mt-3 w-16 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto" />
          {lastUpdate && (
            <p className="mt-2 text-xs text-gray-500 flex items-center justify-center gap-1">
              <RefreshCw className="w-3 h-3" />
              Last updated: {lastUpdate.toLocaleTimeString()}
            </p>
          )}
          {apiError && <p className="mt-1 text-xs text-yellow-500">Note: {apiError}</p>}
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
                    {stat.isTimer ? timer.formatted : stat.value}
                    <span className="text-gray-500 text-sm">{stat.suffix}</span>
                  </p>
                  {stat.label === "24h Volume" && stat.change !== undefined && stat.change !== 0 && (
                    <div className="absolute bottom-1 right-2">
                      <span className={`text-xs font-mono ${stat.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                        {stat.change >= 0 ? "+" : ""}
                        {stat.change.toFixed(2)}%
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="bg-gray-900/80 border border-gray-700 rounded-lg p-4 overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#D4AF37]" />
                  <span className="text-xs text-gray-500 uppercase tracking-wider">24H Price Chart</span>
                </div>
                <span className="text-xs text-gray-600">Live</span>
              </div>
              <div className="h-[200px] w-full">
                {dexData?.pairAddress ? (
                  <iframe
                    src={`https://dexscreener.com/${TOKEN_CONFIG.chain.toLowerCase()}/${dexData.pairAddress}?embed=1&theme=dark&trades=0&info=0`}
                    className="w-full h-full rounded-lg"
                    style={{ border: "none" }}
                    title={`${TOKEN_CONFIG.symbol} Price Chart`}
                  />
                ) : !dexLoading ? (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 text-sm">
                    <Activity className="w-8 h-8 mb-2 text-gray-600" />
                    <p>Chart unavailable</p>
                    <p className="text-xs text-gray-600 mt-1">Token not listed on DexScreener yet</p>
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
                    <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
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
