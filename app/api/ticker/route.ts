import { NextResponse } from "next/server"

const FALLBACK_DATA = {
  binancecoin: { usd: 710, usd_24h_change: -1.5 },
  bitcoin: { usd: 98500, usd_24h_change: -0.8 },
  ethereum: { usd: 3450, usd_24h_change: -2.1 },
}

let cachedData: any = FALLBACK_DATA
let lastFetchTime = 0
const CACHE_DURATION = 300000 // 5 minutes cache

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
        next: { revalidate: 300 },
      },
    )

    if (!response.ok) {
      // If rate limited, return cached/fallback data
      console.log("[v0] CoinGecko rate limited, using cached data")
      return NextResponse.json(cachedData)
    }

    const data = await response.json()

    // Update cache
    cachedData = data
    lastFetchTime = now

    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] CoinGecko API error:", error)
    // Return cached/fallback data on error
    return NextResponse.json(cachedData)
  }
}
