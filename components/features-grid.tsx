import { Shield, Scale, Flame, Vault, ShieldCheck, PiggyBank } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Cycle Reward Distribution",
    description:
      "The top 100 players with the highest scores in each 48-hour cycle share the prize pool accumulated during that cycle through an automated system managed by a secure and smart contract. (Our process is absolutely cheat-proof.)",
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
      "92.5% of each cycle's reward pool is distributed via a fair-share method at the end of every 48-hour cycle. The remaining 7.5% is kept in treasury for Marketing & Weekly Burns.",
  },
]

export function FeaturesGrid() {
  return (
    <section id="features" className="py-10 bg-transparent relative">
      <div className="neon-border-box p-6 md:p-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#00f0ff] mb-4 tracking-orbitron neon-text-cyan">
            PLATFORM FEATURES
          </h2>
          <p className="text-[#a19bb8] max-w-xl mx-auto mt-4 text-sm leading-relaxed">
            Discover what makes Lumexia the ultimate blockchain racing experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-lg bg-[#080414]/60 border border-white/10 hover:border-[#00f0ff]/35 card-glow-hover"
            >
              {/* Icon container */}
              <div className="w-11 h-11 rounded-lg bg-[#9d00ff]/10 border border-[#9d00ff]/30 flex items-center justify-center mb-4 group-hover:bg-[#00f0ff]/15 group-hover:border-[#00f0ff]/40 transition-colors duration-200">
                <feature.icon className="w-5 h-5 text-[#9d00ff] group-hover:text-[#00f0ff] transition-colors" />
              </div>

              {/* Number badge */}
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-[15px] font-semibold text-white leading-snug pr-2">{feature.title}</h3>
                <span className="text-[10px] font-bold text-[#00f0ff]/30 font-mono mt-0.5 flex-shrink-0">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <p className="text-[#a19bb8] text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
