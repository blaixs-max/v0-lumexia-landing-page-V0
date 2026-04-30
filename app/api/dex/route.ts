import { NextResponse } from "next/server"
import { TOKEN_CONFIG } from "@/lib/token-config"

export async function GET() {
  try {
    // First try tokens endpoint (chain-agnostic; returns pairs across all chains)
    let response = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${TOKEN_CONFIG.mint}`, {
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
      response = await fetch(`https://api.dexscreener.com/latest/dex/search?q=${TOKEN_CONFIG.mint}`, {
        headers: {
          Accept: "application/json",
        },
        next: { revalidate: 30 },
      })
      data = await response.json()
      console.log("[v0] DexScreener search endpoint response:", JSON.stringify(data))
    }

    // If still no pairs, try Solana chain-specific endpoint
    if (!data.pairs || data.pairs.length === 0) {
      console.log("[v0] No pairs from search, trying Solana pairs endpoint...")
      response = await fetch(
        `https://api.dexscreener.com/latest/dex/pairs/${TOKEN_CONFIG.chain.toLowerCase()}/${TOKEN_CONFIG.mint}`,
        {
          headers: {
            Accept: "application/json",
          },
          next: { revalidate: 30 },
        },
      )
      data = await response.json()
      console.log("[v0] DexScreener Solana pairs endpoint response:", JSON.stringify(data))
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] DexScreener API error:", error)
    return NextResponse.json({ error: "Failed to fetch data", pairs: null }, { status: 500 })
  }
}
