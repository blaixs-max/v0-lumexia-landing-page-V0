"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { Activity, Users, Coins, BarChart3, Clock, Zap, TrendingUp, TrendingDown, RefreshCw } from "lucide-react"
import { useTimer } from "@/lib/timer-context"
import { usePool } from "@/lib/pool-context"

// Şimdilik CAKE (PancakeSwap) kullanıyoruz: BSC'deki popüler token
const TOKEN_ADDRESS = "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82"
const CHAIN_ID = "bsc"

interface DexData {
  priceUsd: string
  marketCap: number
  volume24h: number
  fdv: number
  priceChange24h: number
  liquidity: number
}

const mockTickerData = [
  { symbol: "LMX/USDT", price: "0.0847", change: 12.45 },
  { symbol: "BNB/USDT", price: "612.34", change: 2.18 },
  { symbol: "BTC/USDT", price: "104,521", change: 1.24 },
  { symbol: "ETH/USDT", price: "3,892", change: -0.87 },
]

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
  const [tickerData, setTickerData] = useState(mockTickerData)
  const tradingViewRef = useRef<HTMLDivElement>(null)

  const [dexData, setDexData] = useState<DexData | null>(null)
  const [dexLoading, setDexLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)

  const fetchDexData = useCallback(async () => {
    try {
      setDexLoading(true)
      const response = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${TOKEN_ADDRESS}`)
      const data = await response.json()

      if (data.pairs && data.pairs.length > 0) {
        // En yüksek likiditeye sahip pair'ı seç
        const mainPair = data.pairs.sort((a: any, b: any) => (b.liquidity?.usd || 0) - (a.liquidity?.usd || 0))[0]

        setDexData({
          priceUsd: mainPair.priceUsd || "0",
          marketCap: mainPair.marketCap || mainPair.fdv || 0,
          volume24h: mainPair.volume?.h24 || 0,
          fdv: mainPair.fdv || 0,
          priceChange24h: mainPair.priceChange?.h24 || 0,
          liquidity: mainPair.liquidity?.usd || 0,
        })
        setLastUpdate(new Date())

        setTickerData((prev) =>
          prev.map((item) =>
            item.symbol === "LMX/USDT"
              ? {
                  ...item,
                  price: Number.parseFloat(mainPair.priceUsd).toFixed(4),
                  change: mainPair.priceChange?.h24 || 0,
                }
              : item,
          ),
        )
      }
    } catch (error) {
      // Hata durumunda sessizce devam et, mock data kullanılacak
    } finally {
      setDexLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchDexData()
    const interval = setInterval(fetchDexData, 30000) // 30 saniyede bir güncelle
    return () => clearInterval(interval)
  }, [fetchDexData])

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

  useEffect(() => {
    if (!tradingViewRef.current) return

    // Clear previous widget
    tradingViewRef.current.innerHTML = ""

    const script = document.createElement("script")
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js"
    script.async = true
    script.innerHTML = JSON.stringify({
      symbol: "BINANCE:CAKEUSDT", // CAKE token - LMX için değiştirin
      width: "100%",
      height: "220",
      locale: "en",
      dateRange: "1D",
      colorTheme: "dark",
      isTransparent: true,
      autosize: true,
      largeChartUrl: "",
      noTimeScale: false,
      chartOnly: false,
    })

    tradingViewRef.current.appendChild(script)

    return () => {
      if (tradingViewRef.current) {
        tradingViewRef.current.innerHTML = ""
      }
    }
  }, [])

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

            {/* TradingView widget */}
            <div className="bg-gray-900/80 border border-gray-700 rounded-lg p-4 overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#D4AF37]" />
                  <span className="text-xs text-gray-500 uppercase tracking-wider">24H Price Chart</span>
                </div>
                <span className="text-xs text-gray-600">Live</span>
              </div>
              <div className="tradingview-widget-container" ref={tradingViewRef}>
                <div className="tradingview-widget-container__widget"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
