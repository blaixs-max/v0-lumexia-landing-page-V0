"use client"

import { Gamepad2, Coins, ShoppingBag } from "lucide-react"

const features = [
  {
    icon: Gamepad2,
    title: "ARCADE & COMPETITION",
    description:
      "Play skill-based games, enter tournaments, and earn SOL rewards. Prove your dominance.",
    color: "from-pink-500 to-purple-600",
  },
  {
    icon: Coins,
    title: "DEFI & STAKING",
    description:
      "Stake your SOL and Lumexia tokens for passive income. Access exclusive yield farming.",
    color: "from-purple-500 to-indigo-600",
  },
  {
    icon: ShoppingBag,
    title: "NFT MARKETPLACE",
    description:
      "Discover unique in-game assets, trade rare NFTs, and build your collection.",
    color: "from-indigo-500 to-cyan-500",
  },
]

export function FeaturesGrid() {
  return (
    <section id="ecosystem" className="py-20 cyberpunk-bg relative">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 uppercase tracking-wide">
            OUR ECOSYSTEM
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl bg-[#1a1a3a]/60 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 backdrop-blur-sm"
            >
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} p-0.5 mb-6`}>
                <div className="w-full h-full rounded-xl bg-[#1a1a3a] flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-purple-400" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-wide">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
