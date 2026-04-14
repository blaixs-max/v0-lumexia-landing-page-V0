"use client"

import { HeroSplit } from "@/components/hero-split"
import { LeaderboardSection } from "@/components/leaderboard-section"
import { StrategySection } from "@/components/strategy-section"
import { FaqSection } from "@/components/faq-section"
import { CommunitySection } from "@/components/community-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: "#0b0914" }}>
      <HeroSplit />
      <main>
        <LeaderboardSection />
        <StrategySection />
        <FaqSection />
        <CommunitySection />
      </main>
      <Footer />
    </div>
  )
}
