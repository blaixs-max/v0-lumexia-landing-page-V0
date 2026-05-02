"use client"

import { Sidebar } from "@/components/sidebar"
import { DashboardHero } from "@/components/dashboard-hero"
import { TransactionsPanel } from "@/components/transactions-panel"
import { LeaderboardSection } from "@/components/leaderboard-section"
import { FeaturesGrid } from "@/components/features-grid"
import { StrategySection } from "@/components/strategy-section"
import { FaqSection } from "@/components/faq-section"
import { CommunitySection } from "@/components/community-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#080414] text-white flex p-3 md:p-6 gap-4 md:gap-6 antialiased selection:bg-[#9d00ff] selection:text-white overflow-x-hidden">
      {/* Sidebar Navigation - Hidden on mobile, shown on md+ */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col gap-4 md:gap-6 z-10 overflow-y-auto pb-6 w-full">
        {/* Dashboard Hero Section */}
        <DashboardHero />

        {/* Cycle Ranking — moved above Recent Transactions per user request */}
        <LeaderboardSection />

        {/* Transactions Panel */}
        <TransactionsPanel />

        {/* Additional Sections */}
        <div className="space-y-0">
          <FeaturesGrid />
          <StrategySection />
          <FaqSection />
          <CommunitySection />
          <Footer />
        </div>
      </main>
    </div>
  )
}
