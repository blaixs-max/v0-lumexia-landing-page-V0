import { createBrowserClient } from "@supabase/ssr"

// Singleton pattern to prevent multiple client instances
let supabaseInstance: ReturnType<typeof createBrowserClient> | null = null

export function getSupabase() {
  if (!supabaseInstance) {
    const supabaseUrl = process.env.NEXT_PUBLIC_LEADERBOARD_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey =
      process.env.NEXT_PUBLIC_LEADERBOARD_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    // Return null if Supabase is not configured
    if (!supabaseUrl || !supabaseKey) {
      console.warn("[Supabase] Missing environment variables. Leaderboard functionality will be disabled.")
      return null
    }

    supabaseInstance = createBrowserClient(supabaseUrl, supabaseKey)
  }
  return supabaseInstance
}

// TypeScript type for daily_leaderboard table
export type DailyLeaderboardEntry = {
  id: string
  wallet_address: string
  full_wallet: string
  best_score: number
  best_distance: number
  games_played_today: number
  play_date: string
  created_at: string
}
