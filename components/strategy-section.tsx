"use client"

import { useState } from "react"
import { Gamepad2, Bot, ImageIcon, Gift, Coins, Users, Globe, Layers, ShieldCheck } from "lucide-react"

const phases = [
  {
    id: 1,
    color: "#FEF08A",
    steps: [
      {
        icon: Coins,
        title: "Token Launch",
        description: "Official $LMX token launch with liquidity pools and exchange listings for seamless trading.",
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
    color: "#FACC15",
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
    color: "#F59E0B",
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
    color: "#EA580C",
    steps: [
      {
        icon: Globe,
        title: "Global Expansion",
        description: "Multi-language support and regional servers for worldwide competitive racing tournaments.",
      },
      {
        icon: ImageIcon,
        title: "NFT Integration",
        description:
          "Unique vehicle skins, track designs, and achievements as tradeable NFTs on the Binance Smart Chain.",
      },
    ],
  },
]

export function StrategySection() {
  const [activePhase, setActivePhase] = useState(1)

  return (
    <section id="strategy" className="py-24 bg-gray-950">
      <style jsx>{`
        @keyframes flickerPhase1 {
          0%, 100% { 
            box-shadow: 0 0 20px #FEF08A, 0 0 40px #FEF08A80, 0 0 60px #FACC1540;
            transform: scale(1.1);
          }
          25% { 
            box-shadow: 0 0 25px #FACC15, 0 0 50px #FEF08A80, 0 0 70px #FACC1560;
            transform: scale(1.12);
          }
          50% { 
            box-shadow: 0 0 30px #FACC15, 0 0 55px #FEF08A80, 0 0 80px #FACC1540;
            transform: scale(1.08);
          }
          75% { 
            box-shadow: 0 0 22px #FACC15, 0 0 45px #FEF08A80, 0 0 65px #FACC1550;
            transform: scale(1.11);
          }
        }
        @keyframes flickerPhase2 {
          0%, 100% { 
            box-shadow: 0 0 20px #FACC15, 0 0 40px #FACC1580, 0 0 60px #F59E0B40;
            transform: scale(1.1);
          }
          25% { 
            box-shadow: 0 0 25px #F59E0B, 0 0 50px #FACC1580, 0 0 70px #F59E0B60;
            transform: scale(1.12);
          }
          50% { 
            box-shadow: 0 0 30px #FACC15, 0 0 55px #F59E0B80, 0 0 80px #F59E0B40;
            transform: scale(1.08);
          }
          75% { 
            box-shadow: 0 0 22px #F59E0B, 0 0 45px #FACC1580, 0 0 65px #F59E0B50;
            transform: scale(1.11);
          }
        }
        @keyframes flickerPhase3 {
          0%, 100% { 
            box-shadow: 0 0 20px #F59E0B, 0 0 40px #F59E0B80, 0 0 60px #EA580C40;
            transform: scale(1.1);
          }
          25% { 
            box-shadow: 0 0 25px #EA580C, 0 0 50px #F59E0B80, 0 0 70px #EA580C60;
            transform: scale(1.12);
          }
          50% { 
            box-shadow: 0 0 30px #F59E0B, 0 0 55px #EA580C80, 0 0 80px #EA580C40;
            transform: scale(1.08);
          }
          75% { 
            box-shadow: 0 0 22px #EA580C, 0 0 45px #F59E0B80, 0 0 65px #EA580C50;
            transform: scale(1.11);
          }
        }
        @keyframes flickerPhase4 {
          0%, 100% { 
            box-shadow: 0 0 20px #EA580C, 0 0 40px #EA580C80, 0 0 60px #F9731640;
            transform: scale(1.1);
          }
          25% { 
            box-shadow: 0 0 25px #F97316, 0 0 50px #EA580C80, 0 0 70px #F9731660;
            transform: scale(1.12);
          }
          50% { 
            box-shadow: 0 0 30px #EA580C, 0 0 55px #F9731680, 0 0 80px #F9731640;
            transform: scale(1.08);
          }
          75% { 
            box-shadow: 0 0 22px #F97316, 0 0 45px #EA580C80, 0 0 65px #F9731650;
            transform: scale(1.11);
          }
        }
        @keyframes innerFlicker {
          0%, 100% { opacity: 1; }
          33% { opacity: 0.7; }
          66% { opacity: 0.85; }
        }
        @keyframes cardFireGlow {
          0%, 100% { 
            box-shadow: 0 0 10px #F59E0B, 0 0 20px #F59E0B80, 0 0 30px #EA580C40, inset 0 0 10px #F59E0B20;
            border-color: #F59E0B;
          }
          25% { 
            box-shadow: 0 0 15px #EA580C, 0 0 25px #F59E0B80, 0 0 35px #EA580C60, inset 0 0 15px #EA580C20;
            border-color: #EA580C;
          }
          50% { 
            box-shadow: 0 0 20px #F97316, 0 0 30px #EA580C80, 0 0 40px #F9731640, inset 0 0 20px #F9731620;
            border-color: #F97316;
          }
          75% { 
            box-shadow: 0 0 12px #F59E0B, 0 0 22px #F9731680, 0 0 32px #F59E0B50, inset 0 0 12px #F59E0B20;
            border-color: #FACC15;
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl sm:text-5xl font-black text-[#D4AF37] mb-4 tracking-orbitron neon-text gold-underline">
            PROJECT STRATEGY
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto mt-6 text-sm">
            This is our roadmap for creating the ultimate blockchain racing ecosystem. Click on a phase to see the
            planned activities for it in detail.
          </p>
        </div>

        <div className="border border-gray-700 rounded-2xl p-6 sm:p-8 bg-gray-900/30 overflow-hidden">
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
                      className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-lg sm:text-2xl font-bold transition-all duration-300 bg-gray-950 ${
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
                  className={`group relative p-6 rounded-xl bg-black border transition-all duration-300 overflow-hidden ${
                    step.hasFire ? "card-fire" : "border-gray-800 hover:border-[#FFD700]/40"
                  }`}
                >
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-14 h-14 rounded-xl bg-[#FFD700]/10 flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                        <step.icon className="w-7 h-7 text-[#FFD700]" />
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
                    <p className="text-gray-400 leading-relaxed flex-grow">{step.description}</p>

                    {step.status === "done" && (
                      <div className="flex justify-center mt-4 pt-4 border-t border-gray-800">
                        <span className="px-4 py-1.5 rounded-full text-sm font-bold bg-green-500/20 text-green-400 border border-green-500/40">
                          Done
                        </span>
                      </div>
                    )}
                    {step.status === "in-progress" && (
                      <div className="flex justify-center mt-4 pt-4 border-t border-gray-800">
                        <span className="px-4 py-1.5 rounded-full text-sm font-bold bg-yellow-500/20 text-yellow-400 border border-yellow-500/40">
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
