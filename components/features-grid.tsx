"use client"

import { Gamepad2, Coins, ShoppingBag, Zap, Shield, Globe } from "lucide-react"

const features = [
  {
    icon: Gamepad2,
    title: "ARCADE & COMPETITION",
    description:
      "Play skill-based games, enter tournaments, and earn SOL rewards. Prove your dominance on-chain.",
    gradient: "from-purple-500 to-pink-600",
    number: "01",
  },
  {
    icon: Coins,
    title: "DEFI & STAKING",
    description:
      "Stake your SOL and Lumexia tokens for passive income. Access exclusive yield farming strategies.",
    gradient: "from-purple-600 to-indigo-600",
    number: "02",
  },
  {
    icon: ShoppingBag,
    title: "NFT MARKETPLACE",
    description:
      "Discover unique in-game assets, trade rare NFTs, and build your collection on Solana.",
    gradient: "from-indigo-500 to-cyan-500",
    number: "03",
  },
  {
    icon: Zap,
    title: "INSTANT REWARDS",
    description:
      "Smart contract-powered payouts delivered in milliseconds. No middlemen, no delays.",
    gradient: "from-cyan-500 to-teal-500",
    number: "04",
  },
  {
    icon: Shield,
    title: "SECURE & TRANSPARENT",
    description:
      "Every transaction audited on-chain. Your assets, your keys — always verifiable.",
    gradient: "from-violet-500 to-purple-600",
    number: "05",
  },
  {
    icon: Globe,
    title: "GLOBAL COMMUNITY",
    description:
      "Compete with players worldwide in real-time. Rankings reset daily — every session counts.",
    gradient: "from-purple-500 to-cyan-400",
    number: "06",
  },
]

export function FeaturesGrid() {
  return (
    <section id="ecosystem" className="py-24 cyberpunk-bg relative overflow-hidden">
      {/* Ambient background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/8 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-cyan-500/6 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-purple-400/70 text-xs tracking-[0.3em] uppercase font-medium mb-3">
            What We Offer
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-black gradient-text uppercase tracking-orbitron purple-underline">
            OUR ECOSYSTEM
          </h2>
          <p className="mt-6 text-gray-400 max-w-xl mx-auto text-sm leading-relaxed">
            A fully integrated Web3 gaming platform built on Solana — fast, transparent, and rewarding.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="gradient-border card-hover-purple group relative p-6 rounded-xl bg-[#0f0f1f]/80 border border-purple-500/15 backdrop-blur-sm overflow-hidden"
            >
              {/* Number badge */}
              <span className="absolute top-4 right-4 font-serif text-4xl font-black text-purple-500/10 select-none">
                {feature.number}
              </span>

              {/* Icon */}
              <div className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} p-px mb-5`}>
                <div className="w-full h-full rounded-xl bg-[#0f0f1f] flex items-center justify-center">
                  <feature.icon className="w-7 h-7 text-purple-300 group-hover:text-white transition-colors duration-200" />
                </div>
              </div>

              <h3 className="font-serif text-base font-bold text-white mb-2 tracking-orbitron">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>

              {/* Bottom accent line */}
              <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-40 transition-opacity duration-300`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
