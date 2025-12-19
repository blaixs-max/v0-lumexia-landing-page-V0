import { NextResponse } from "next/server"

export async function GET() {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=binancecoin,bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true",
      {
        headers: {
          Accept: "application/json",
        },
        next: { revalidate: 30 },
      },
    )

    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`)
    }

    const data = await response.json()
    console.log("[v0] CoinGecko API response:", data)

    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] CoinGecko API error:", error)
    // Return fallback data on error
    return NextResponse.json({
      binancecoin: { usd: 0, usd_24h_change: 0 },
      bitcoin: { usd: 0, usd_24h_change: 0 },
      ethereum: { usd: 0, usd_24h_change: 0 },
    })
  }
}
