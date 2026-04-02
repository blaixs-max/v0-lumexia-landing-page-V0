"use client"

import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { TokenStats } from "@/components/token-stats"
import { FeaturesGrid } from "@/components/features-grid"
import { StrategySection } from "@/components/strategy-section"
import { LeaderboardSection } from "@/components/leaderboard-section"
import { FaqSection } from "@/components/faq-section"
import { CommunitySection } from "@/components/community-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a12] text-white relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px]" />
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-pink-500/5 rounded-full blur-[150px]" />
      </div>
      {/* Grid pattern overlay */}
      <div className="fixed inset-0 grid-pattern pointer-events-none" />
      
      <Header />
      <main className="relative z-10">
        <HeroSection />
        <TokenStats />
        <LeaderboardSection />
        <FeaturesGrid />
        <StrategySection />
        <FaqSection />
        <CommunitySection />
      </main>
      <Footer />
    </div>
  )
}
