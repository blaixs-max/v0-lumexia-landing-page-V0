"use client"

import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturesGrid } from "@/components/features-grid"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen cyberpunk-bg text-white">
      <Header />
      <main>
        <HeroSection />
        <FeaturesGrid />
      </main>
      <Footer />
    </div>
  )
}
