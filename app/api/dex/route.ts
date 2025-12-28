import { NextResponse } from "next/server"

const TOKEN_ADDRESS = "0xb92cc959c2434c06489d3f941391a5f1d8334444"

export async function GET() {
  try {
    // First try tokens endpoint
    let response = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${TOKEN_ADDRESS}`, {
      headers: {
        Accept: "application/json",
      },
      next: { revalidate: 30 },
    })

    let data = await response.json()
    console.log("[v0] DexScreener tokens endpoint response:", JSON.stringify(data))

    // If no pairs found, try search endpoint
    if (!data.pairs || data.pairs.length === 0) {
      console.log("[v0] No pairs from tokens endpoint, trying search...")
      response = await fetch(`https://api.dexscreener.com/latest/dex/search?q=${TOKEN_ADDRESS}`, {
        headers: {
          Accept: "application/json",
        },
        next: { revalidate: 30 },
      })
      data = await response.json()
      console.log("[v0] DexScreener search endpoint response:", JSON.stringify(data))
    }

    // If still no pairs, try BSC specific endpoint
    if (!data.pairs || data.pairs.length === 0) {
      console.log("[v0] No pairs from search, trying BSC pairs endpoint...")
      response = await fetch(`https://api.dexscreener.com/latest/dex/pairs/bsc/${TOKEN_ADDRESS}`, {
        headers: {
          Accept: "application/json",
        },
        next: { revalidate: 30 },
      })
      data = await response.json()
      console.log("[v0] DexScreener BSC pairs endpoint response:", JSON.stringify(data))
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] DexScreener API error:", error)
    return NextResponse.json({ error: "Failed to fetch data", pairs: null }, { status: 500 })
  }
}
