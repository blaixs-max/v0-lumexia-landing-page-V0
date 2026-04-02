"use client"

import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { TokenStats } from "@/components/token-stats"
import { FeaturesGrid } from "@/components/features-grid"
import { StrategySection } from "@/components/strategy-section"
import { FaqSection } from "@/components/faq-section"
import { CommunitySection } from "@/components/community-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a18] text-white relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-purple-600/8 rounded-full blur-[200px]" />
        <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-cyan-500/8 rounded-full blur-[200px]" />
        <div className="absolute bottom-0 left-1/2 w-[600px] h-[400px] bg-blue-900/10 rounded-full blur-[150px]" />
      </div>
      
      <Header />
      <main className="relative z-10">
        <HeroSection />
        <TokenStats />
        <FeaturesGrid />
        <StrategySection />
        <FaqSection />
        <CommunitySection />
      </main>
      <Footer />
    </div>
  )
}
