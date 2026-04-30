"use client"

import { useState } from "react"
import { Gamepad2, Bot, ImageIcon, Gift, Coins, Users, Globe, Layers, ShieldCheck } from "lucide-react"
import { TOKEN_CONFIG } from "@/lib/token-config"

const phases = [
  {
    id: 1,
    color: "#FFD700",
    steps: [
      {
        icon: Coins,
        title: "Token Launch",
        description: `Official $${TOKEN_CONFIG.symbol} token launch on ${TOKEN_CONFIG.chain} with Jupiter / pump.fun listings for seamless trading.`,
        status: "done",
      },
      {
        icon: Layers,
        title: "Batch Processing & Single-Sig",
        description: "Efficient transaction batching and streamlined signature processes for seamless gameplay.",
        status: "done",
      },
      {
        icon: Gift,
        title: "Implement Reward Platform",
        description:
          "Complete daily tasks and challenges to earn free coins and unlock exclusive race entries. Stack your rewards and compete in premium tournaments without spending a dime.",
        status: "in-progress",
      },
    ],
  },
  {
    id: 2,
    color: "#9d00ff",
    steps: [
      {
        icon: Users,
        title: "Community Events",
        description: "Regular tournaments, competitions, and community-driven events with exclusive rewards.",
      },
      {
        icon: ShieldCheck,
        title: "Enterprise Partnerships",
        description: "Strategic collaborations with gaming studios and blockchain platforms for ecosystem growth.",
      },
    ],
  },
  {
    id: 3,
    color: "#00f0ff",
    steps: [
      {
        icon: Gamepad2,
        title: "Game Expansion",
        description:
          "A brand-new car racing game featuring multiplayer, 3D, realistic graphics, and the ability to purchase vehicles and parts.",
        hasFire: true,
      },
      {
        icon: Bot,
        title: "AI Integration",
        description:
          "Advanced AI opponents and adaptive difficulty systems that learn from player behavior for optimal challenge.",
      },
    ],
  },
  {
    id: 4,
    color: "#ff6b00",
    steps: [
      {
        icon: Globe,
        title: "Global Expansion",
        description: "Multi-language support and regional servers for worldwide competitive racing tournaments.",
      },
      {
        icon: ImageIcon,
        title: "NFT Integration",
        description: `Unique vehicle skins, track designs, and achievements as tradeable NFTs on ${TOKEN_CONFIG.chain}.`,
      },
    ],
  },
]

export function StrategySection() {
  const [activePhase, setActivePhase] = useState(1)

  return (
    <section id="strategy" className="py-10 bg-transparent">
      <style jsx>{`
        @keyframes flickerPhase1 {
          0%, 100% { 
            box-shadow: 0 0 20px #FFD700, 0 0 40px #FFD70080, 0 0 60px #FFD70040;
            transform: scale(1.1);
          }
          50% { 
            box-shadow: 0 0 30px #FFD700, 0 0 55px #FFD70080, 0 0 80px #FFD70040;
            transform: scale(1.08);
          }
        }
        @keyframes flickerPhase2 {
          0%, 100% { 
            box-shadow: 0 0 20px #9d00ff, 0 0 40px #9d00ff80, 0 0 60px #9d00ff40;
            transform: scale(1.1);
          }
          50% { 
            box-shadow: 0 0 30px #9d00ff, 0 0 55px #9d00ff80, 0 0 80px #9d00ff40;
            transform: scale(1.08);
          }
        }
        @keyframes flickerPhase3 {
          0%, 100% { 
            box-shadow: 0 0 20px #00f0ff, 0 0 40px #00f0ff80, 0 0 60px #00f0ff40;
            transform: scale(1.1);
          }
          50% { 
            box-shadow: 0 0 30px #00f0ff, 0 0 55px #00f0ff80, 0 0 80px #00f0ff40;
            transform: scale(1.08);
          }
        }
        @keyframes flickerPhase4 {
          0%, 100% { 
            box-shadow: 0 0 20px #ff6b00, 0 0 40px #ff6b0080, 0 0 60px #ff6b0040;
            transform: scale(1.1);
          }
          50% { 
            box-shadow: 0 0 30px #ff6b00, 0 0 55px #ff6b0080, 0 0 80px #ff6b0040;
            transform: scale(1.08);
          }
        }
        @keyframes innerFlicker {
          0%, 100% { opacity: 1; }
          33% { opacity: 0.7; }
          66% { opacity: 0.85; }
        }
        @keyframes cardFireGlow {
          0%, 100% { 
            box-shadow: 0 0 10px #00f0ff, 0 0 20px #00f0ff80, 0 0 30px #9d00ff40, inset 0 0 10px #00f0ff20;
            border-color: #00f0ff;
          }
          50% { 
            box-shadow: 0 0 20px #9d00ff, 0 0 30px #9d00ff80, 0 0 40px #00f0ff40, inset 0 0 20px #9d00ff20;
            border-color: #9d00ff;
          }
        }
        .fire-phase-1 {
          animation: flickerPhase1 0.8s ease-in-out infinite;
        }
        .fire-phase-2 {
          animation: flickerPhase2 0.8s ease-in-out infinite;
        }
        .fire-phase-3 {
          animation: flickerPhase3 0.8s ease-in-out infinite;
        }
        .fire-phase-4 {
          animation: flickerPhase4 0.8s ease-in-out infinite;
        }
        .fire-inner {
          animation: innerFlicker 0.5s ease-in-out infinite;
        }
        .card-fire {
          animation: cardFireGlow 1s ease-in-out infinite;
        }
      `}</style>

      <div className="neon-border-box p-6 md:p-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#00f0ff] mb-4 tracking-orbitron neon-text-cyan">
            PROJECT STRATEGY
          </h2>
          <p className="text-[#a19bb8] max-w-2xl mx-auto mt-4 text-sm">
            This is our roadmap for creating the ultimate blockchain racing ecosystem. Click on a phase to see the
            planned activities for it in detail.
          </p>
        </div>

        <div className="overflow-hidden">
          {/* Phase Selector */}
          <div className="relative flex items-center justify-center mb-12 px-4">
            <div className="relative z-10 flex items-center w-full max-w-2xl">
              {phases.map((phase, index) => (
                <div key={phase.id} className="flex items-center flex-1 last:flex-none">
                  <button onClick={() => setActivePhase(phase.id)} className="flex flex-col items-center gap-2 group">
                    <span
                      className={`text-xs sm:text-sm font-semibold transition-colors ${
                        activePhase === phase.id ? "text-white" : "text-gray-500"
                      }`}
                    >
                      Phase
                    </span>
                    <div
                      className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-lg sm:text-2xl font-bold transition-all duration-300 bg-[#080414] ${
                        activePhase === phase.id ? `fire-phase-${phase.id}` : "opacity-70 hover:opacity-100"
                      }`}
                      style={{
                        border: `3px solid ${phase.color}`,
                      }}
                    >
                      {/* Inner circle */}
                      <div
                        className={`absolute inset-1.5 sm:inset-2 rounded-full border-2 border-dashed transition-all ${
                          activePhase === phase.id ? "fire-inner" : "opacity-50"
                        }`}
                        style={{ borderColor: phase.color }}
                      />
                      <span style={{ color: phase.color }}>{phase.id}</span>
                    </div>
                  </button>

                  {index < phases.length - 1 && (
                    <div
                      className="flex-1 h-1 mt-6 min-w-4"
                      style={{
                        background: `linear-gradient(to right, ${phase.color}, ${phases[index + 1].color})`,
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {phases
              .find((p) => p.id === activePhase)
              ?.steps.map((step, index) => (
                <div
                  key={index}
                  className={`group relative p-6 rounded-xl bg-[#080414] border transition-all duration-300 overflow-hidden ${
                    step.hasFire ? "card-fire" : "border-white/10 hover:border-[#00f0ff]/40"
                  }`}
                >
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#9d00ff]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-5">
                      <div 
                        className="w-14 h-14 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0"
                        style={{
                          backgroundColor: `${phases[activePhase - 1].color}15`,
                        }}
                      >
                        <step.icon className="w-7 h-7" style={{ color: phases[activePhase - 1].color }} />
                      </div>
                      <div
                        className="px-4 py-2 rounded-full text-sm font-bold"
                        style={{
                          backgroundColor: `${phases[activePhase - 1].color}20`,
                          color: phases[activePhase - 1].color,
                          border: `1px solid ${phases[activePhase - 1].color}40`,
                        }}
                      >
                        Step-{index + 1}
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                    <p className="text-[#a19bb8] leading-relaxed flex-grow">{step.description}</p>

                    {step.status === "done" && (
                      <div className="flex justify-center mt-4 pt-4 border-t border-white/10">
                        <span className="px-4 py-1.5 rounded-full text-sm font-bold bg-[#00ff66]/20 text-[#00ff66] border border-[#00ff66]/40">
                          Done
                        </span>
                      </div>
                    )}
                    {step.status === "in-progress" && (
                      <div className="flex justify-center mt-4 pt-4 border-t border-white/10">
                        <span className="px-4 py-1.5 rounded-full text-sm font-bold bg-[#FFD700]/20 text-[#FFD700] border border-[#FFD700]/40">
                          In-Progress
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}
