"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { PriceTicker } from "@/components/price-ticker"
import { HeroSection } from "@/components/hero-section"
import { TokenStats } from "@/components/token-stats"
import { FeaturesGrid } from "@/components/features-grid"
import { StrategySection } from "@/components/strategy-section"
import { FaqSection } from "@/components/faq-section"
import { CommunitySection } from "@/components/community-section"
import { GameModal } from "@/components/game-modal"
import { Footer } from "@/components/footer"

export default function Home() {
  const [isGameOpen, setIsGameOpen] = useState(false)

  return (
    <div className="min-h-screen bg-black text-white">
      <PriceTicker />
      <Header />
      <main>
        <HeroSection onStartEngine={() => setIsGameOpen(true)} />
        <TokenStats />
        <FeaturesGrid />
        <StrategySection />
        <FaqSection />
        <CommunitySection />
      </main>
      <Footer />
      <GameModal isOpen={isGameOpen} onClose={() => setIsGameOpen(false)} />
    </div>
  )
}
