import { NextResponse } from "next/server"

let cachedData: any = null
let lastFetchTime = 0
const CACHE_DURATION = 60000 // 60 seconds cache

export async function GET() {
  const now = Date.now()

  // Return cached data if available and not expired
  if (cachedData && now - lastFetchTime < CACHE_DURATION) {
    return NextResponse.json(cachedData)
  }

  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=binancecoin,bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true",
      {
        headers: {
          Accept: "application/json",
        },
      },
    )

    if (!response.ok) {
      // If rate limited, return cached data or fallback
      if (response.status === 429 && cachedData) {
        return NextResponse.json(cachedData)
      }
      throw new Error(`CoinGecko API error: ${response.status}`)
    }

    const data = await response.json()

    // Update cache
    cachedData = data
    lastFetchTime = now

    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] CoinGecko API error:", error)

    // Return cached data if available
    if (cachedData) {
      return NextResponse.json(cachedData)
    }

    // Return fallback data on error
    return NextResponse.json({
      binancecoin: { usd: 0, usd_24h_change: 0 },
      bitcoin: { usd: 0, usd_24h_change: 0 },
      ethereum: { usd: 0, usd_24h_change: 0 },
    })
  }
}
