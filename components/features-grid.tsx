import { Shield, Scale, Flame, Vault, ShieldCheck, PiggyBank } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Daily Reward Distribution",
    description:
      "The top 100 players with the highest scores each day share the prize pool accumulated by the end of the day among themselves through an automated system managed by a secure and smart contract. (Our process is absolutely cheat-proof.)",
  },
  {
    icon: Scale,
    title: "Skill Based & Fair",
    description: "No pay-to-win mechanics exist here—pure reflex and strategy.",
  },
  {
    icon: Flame,
    title: "AI-Driven Burn Mechanism",
    description: "Intelligent deflationary mechanism burns tokens based on network activity.",
  },
  {
    icon: Vault,
    title: "Treasury Funding",
    description: "Dedicated Treasury ensures price stability and mitigates volatility.",
  },
  {
    icon: ShieldCheck,
    title: "Multiple Cheat Protection",
    description: "State-of-the-art anti-cheat technology ensuring fair competition and protecting reward integrity.",
  },
  {
    icon: PiggyBank,
    title: "Revenue Model",
    description:
      "92.5% of the total daily reward pool will be distributed along with fair share method on each game day. Remaining 7.5% of the reward pool kept in treasury for Marketing & Weekly Burns.",
  },
]

export function FeaturesGrid() {
  return (
    <section className="py-20 bg-black relative">
      {/* Subtle top gradient */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/0 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl sm:text-5xl font-black text-[#D4AF37] mb-4 tracking-orbitron neon-text gold-underline">
            PLATFORM FEATURES
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto mt-6 text-sm leading-relaxed">
            Discover what makes Lumexia the ultimate blockchain racing experience.
          </p>
        </div>

        <div className="border border-[#D4AF37]/10 rounded-xl p-6 sm:p-8 bg-[#0a0a0a]/80 cyber-grid-overlay">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-6 rounded-lg bg-black border border-white/5 hover:border-[#D4AF37]/35 card-glow-hover"
              >
                {/* Icon container */}
                <div className="w-11 h-11 rounded-lg bg-[#D4AF37]/8 border border-[#D4AF37]/15 flex items-center justify-center mb-4 group-hover:bg-[#D4AF37]/15 group-hover:border-[#D4AF37]/30 transition-colors duration-200">
                  <feature.icon className="w-5 h-5 text-[#D4AF37]" />
                </div>

                {/* Number badge */}
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-[15px] font-semibold text-white leading-snug pr-2">{feature.title}</h3>
                  <span className="text-[10px] font-bold text-[#D4AF37]/30 font-mono mt-0.5 flex-shrink-0">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
