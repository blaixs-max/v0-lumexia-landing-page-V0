import { Shield, Scale, Flame, Vault, ShieldCheck, PiggyBank } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Daily Reward Distribution",
    description:
      "The top 100 players with the highest scores each day share the prize pool accumulated by the end of the day among themselves through an automated system managed by a secure and smart contract. (Our process is absolutely cheat-proof.)",
    color: "cyan",
  },
  {
    icon: Scale,
    title: "Skill Based & Fair",
    description: "No pay-to-win mechanics exist here—pure reflex and strategy.",
    color: "purple",
  },
  {
    icon: Flame,
    title: "AI-Driven Burn Mechanism",
    description: "Intelligent deflationary mechanism burns tokens based on network activity.",
    color: "pink",
  },
  {
    icon: Vault,
    title: "Treasury Funding",
    description: "Dedicated Treasury ensures price stability and mitigates volatility.",
    color: "cyan",
  },
  {
    icon: ShieldCheck,
    title: "Multiple Cheat Protection",
    description: "State-of-the-art anti-cheat technology ensuring fair competition and protecting reward integrity.",
    color: "purple",
  },
  {
    icon: PiggyBank,
    title: "Revenue Model",
    description:
      "92.5% of the total daily reward pool will be distributed along with fair share method on each game day. Remaining 7.5% of the reward pool kept in treasury for Marketing & Weekly Burns.",
    color: "teal",
  },
]

const colorClasses = {
  cyan: {
    icon: "text-cyan-400",
    iconBg: "bg-cyan-500/10 border-cyan-500/30",
    border: "border-cyan-500/20 hover:border-cyan-500/50",
    glow: "group-hover:shadow-[0_0_30px_rgba(0,212,255,0.15)]",
  },
  purple: {
    icon: "text-purple-400",
    iconBg: "bg-purple-500/10 border-purple-500/30",
    border: "border-purple-500/20 hover:border-purple-500/50",
    glow: "group-hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]",
  },
  pink: {
    icon: "text-pink-400",
    iconBg: "bg-pink-500/10 border-pink-500/30",
    border: "border-pink-500/20 hover:border-pink-500/50",
    glow: "group-hover:shadow-[0_0_30px_rgba(236,72,153,0.15)]",
  },
  teal: {
    icon: "text-teal-400",
    iconBg: "bg-teal-500/10 border-teal-500/30",
    border: "border-teal-500/20 hover:border-teal-500/50",
    glow: "group-hover:shadow-[0_0_30px_rgba(20,184,166,0.15)]",
  },
}

export function FeaturesGrid() {
  return (
    <section id="features" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 
            className="font-serif text-4xl sm:text-5xl font-black mb-4"
            style={{ 
              background: "linear-gradient(135deg, #06b6d4 0%, #a78bfa 50%, #ec4899 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 40px rgba(139, 92, 246, 0.5)"
            }}
          >
            PLATFORM FEATURES
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Discover what makes Lumexia the ultimate blockchain racing experience.
          </p>
        </div>

        <div 
          className="rounded-2xl p-6 sm:p-10"
          style={{
            background: "linear-gradient(135deg, rgba(13, 13, 32, 0.9) 0%, rgba(20, 15, 50, 0.85) 100%)",
            border: "2px solid rgba(139, 92, 246, 0.3)",
            boxShadow: "0 0 40px rgba(139, 92, 246, 0.1)"
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const colors = colorClasses[feature.color as keyof typeof colorClasses]
              return (
                <div
                  key={index}
                  className={`group relative p-6 rounded-xl transition-all duration-500`}
                  style={{
                    background: "rgba(15, 15, 35, 0.6)",
                    border: "1px solid rgba(139, 92, 246, 0.2)"
                  }}
                >
                  {/* Icon container */}
                  <div className={`w-14 h-14 rounded-xl ${colors.iconBg} border flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`w-7 h-7 ${colors.icon}`} />
                  </div>
                  
                  <h3 className="text-base font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
