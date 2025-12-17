"use client"

import { useEffect, useState, useCallback } from "react"
import { Activity, Users, Coins, BarChart3, Clock, Zap, TrendingUp, TrendingDown, RefreshCw } from "lucide-react"
import { useTimer } from "@/lib/timer-context"
import { usePool } from "@/lib/pool-context"

const TOKEN_ADDRESS = "0xe5dbde6fc6771beafae21ae45ae9d6952c314444"
const CHAIN_ID = "bsc"

interface DexData {
  priceUsd: string
  marketCap: number
  volume24h: number
  fdv: number
  priceChange24h: number
  liquidity: number
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

function formatSupply(num: number): string {
  if (num >= 1_000_000_000) {
    return `${(num / 1_000_000_000).toFixed(0)}B`
  } else if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(0)}M`
  } else if (num >= 1_000) {
    return `${(num / 1_000).toFixed(0)}K`
  }
  return num.toFixed(0)
}

export function TokenStats() {
  const timer = useTimer()
  const { netPool, loading: poolLoading } = usePool()
  const [tickerData, setTickerData] = useState<TickerItem[]>([])
  const [pairAddress, setPairAddress] = useState<string | null>(null)

  const [dexData, setDexData] = useState<DexData | null>(null)
  const [dexLoading, setDexLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)

  const fetchAllTickerData = useCallback(async () => {
    try {
      setDexLoading(true)
      const dexResponse = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${TOKEN_ADDRESS}`)
      const dexData = await dexResponse.json()

      let lmxData: TickerItem = { symbol: "LMX/USDT", price: "0.0000", change: 0 }

      if (dexData.pairs && dexData.pairs.length > 0) {
        const mainPair = dexData.pairs.sort((a: any, b: any) => (b.liquidity?.usd || 0) - (a.liquidity?.usd || 0))[0]

        lmxData = {
          symbol: "LMX/USDT",
          price: Number.parseFloat(mainPair.priceUsd || "0").toFixed(6),
          change: mainPair.priceChange?.h24 || 0,
        }

        setPairAddress(mainPair.pairAddress)

        setDexData({
          priceUsd: mainPair.priceUsd || "0",
          marketCap: mainPair.marketCap || mainPair.fdv || 0,
          volume24h: mainPair.volume?.h24 || 0,
          fdv: mainPair.fdv || 0,
          priceChange24h: mainPair.priceChange?.h24 || 0,
          liquidity: mainPair.liquidity?.usd || 0,
        })
      }

      const cgResponse = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=binancecoin,bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true",
      )
      const cgData = await cgResponse.json()

      const newTickerData: TickerItem[] = [
        lmxData,
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
      console.error("Error fetching ticker data:", error)
    } finally {
      setDexLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchAllTickerData()
    const interval = setInterval(fetchAllTickerData, 30000) // 30 saniyede bir güncelle
    return () => clearInterval(interval)
  }, [fetchAllTickerData])

  const stats = [
    {
      label: "Market Cap",
      value: dexLoading ? "Loading..." : dexData ? formatNumber(dexData.marketCap) : "$2.4M",
      icon: BarChart3,
      suffix: "",
    },
    {
      label: "24h Volume",
      value: dexLoading ? "Loading..." : dexData ? formatNumber(dexData.volume24h) : "$847K",
      icon: Activity,
      suffix: "",
      change: dexData?.priceChange24h,
    },
    {
      label: "Liquidity",
      value: dexLoading ? "Loading..." : dexData ? formatNumber(dexData.liquidity) : "$1.2M",
      icon: Users,
      suffix: "",
    },
    {
      label: "FDV",
      value: dexLoading ? "Loading..." : dexData ? formatNumber(dexData.fdv) : "$847M",
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
          <h2
            className="font-cinzel text-3xl md:text-4xl font-black text-[#D4AF37] tracking-wider uppercase"
            style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
          >
            FINANCIAL FIGURES
          </h2>
          <div className="mt-2 w-24 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto" />
          {lastUpdate && (
            <p className="mt-2 text-xs text-gray-500 flex items-center justify-center gap-1">
              <RefreshCw className="w-3 h-3" />
              Last updated: {lastUpdate.toLocaleTimeString()}
            </p>
          )}
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
                  {stat.label === "24h Volume" && stat.change !== undefined && (
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
                {pairAddress ? (
                  <iframe
                    src={`https://dexscreener.com/bsc/${pairAddress}?embed=1&theme=dark&trades=0&info=0`}
                    className="w-full h-full rounded-lg"
                    style={{ border: "none" }}
                    title="LMX Price Chart"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
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
