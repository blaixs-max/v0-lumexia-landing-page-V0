import { Gamepad2, Bot, ImageIcon, ShieldCheck, Layers, PiggyBank } from "lucide-react"

const strategies = [
  {
    icon: Gamepad2,
    title: "Game Expansion",
    description:
      "A brand-new car racing game featuring multiplayer, 3D, realistic graphics, and the ability to purchase vehicles and parts.",
  },
  {
    icon: Bot,
    title: "AI Integration",
    description:
      "Advanced AI opponents and adaptive difficulty systems that learn from player behavior for optimal challenge.",
  },
  {
    icon: ImageIcon,
    title: "NFT Integration",
    description: "Unique vehicle skins, track designs, and achievements as tradeable NFTs on the Binance Smart Chain.",
  },
  {
    icon: ShieldCheck,
    title: "Anti-Cheat Sentinel",
    description: "State-of-the-art anti-cheat technology ensuring fair competition and protecting reward integrity.",
  },
  {
    icon: Layers,
    title: "Batch Processing & Single-Sig",
    description: "Efficient transaction batching and streamlined signature processes for seamless gameplay.",
  },
  {
    icon: PiggyBank,
    title: "Treasury & Value Protection",
    description: "Strategic treasury management and buyback mechanisms to protect and enhance token value.",
  },
]

export function StrategySection() {
  return (
    <section id="strategy" className="py-24 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#FFD700] mb-4">PROJECT STRATEGY</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our roadmap to building the ultimate blockchain racing ecosystem
          </p>
        </div>

        {/* Strategy Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {strategies.map((strategy, index) => (
            <div
              key={index}
              className="group relative p-6 rounded-xl bg-black border border-gray-800 hover:border-[#FFD700]/40 transition-all duration-300 overflow-hidden"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-[#FFD700]/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <strategy.icon className="w-7 h-7 text-[#FFD700]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{strategy.title}</h3>
                <p className="text-gray-400 leading-relaxed">{strategy.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
