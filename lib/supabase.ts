import { createBrowserClient } from "@supabase/ssr"
import type { Database } from "@/lib/database.types"

// Singleton pattern to prevent multiple client instances
let supabaseInstance: ReturnType<typeof createBrowserClient<Database>> | null = null

export function getSupabase() {
  if (!supabaseInstance) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    // Sprint 3a: dropped legacy NEXT_PUBLIC_LEADERBOARD_SUPABASE_* fallback.
    // Vercel/Netlify env panels should expose only the canonical names.
    if (!supabaseUrl || !supabaseKey) {
      console.warn(
        "[Supabase] Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. Leaderboard, transactions panel, and pool indicator will be disabled.",
      )
      return null
    }

    supabaseInstance = createBrowserClient<Database>(supabaseUrl, supabaseKey)
  }
  return supabaseInstance
}

// Convenience row-type aliases. Add more here as components consume new tables.
export type DailyLeaderboardEntry = Database["public"]["Tables"]["daily_leaderboard"]["Row"]
export type Transaction = Database["public"]["Tables"]["transactions"]["Row"]
export type Score = Database["public"]["Tables"]["scores"]["Row"]
export type User = Database["public"]["Tables"]["users"]["Row"]
export type RewardPoolDistribution = Database["public"]["Tables"]["reward_pool_distribution"]["Row"]
