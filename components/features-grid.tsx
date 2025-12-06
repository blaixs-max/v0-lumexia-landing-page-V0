import { Shield, Scale, Flame, Vault } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Secure Payouts",
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
    title: "AI-Driven Burn",
    description: "Intelligent deflationary mechanism burns tokens based on network activity.",
  },
  {
    icon: Vault,
    title: "Treasury Funding",
    description: "Dedicated Treasury ensures price stability and mitigates volatility.",
  },
]

export function FeaturesGrid() {
  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-xl bg-gray-950 border border-gray-800 hover:border-[#FFD700]/50 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-[#FFD700]/10 flex items-center justify-center mb-4 group-hover:bg-[#FFD700]/20 transition-colors">
                <feature.icon className="w-6 h-6 text-[#FFD700]" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
