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
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main>
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
