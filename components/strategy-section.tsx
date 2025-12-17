"use client"

import { useState } from "react"
import {
  Gamepad2,
  Bot,
  ImageIcon,
  ShieldCheck,
  Layers,
  PiggyBank,
  Gift,
  Rocket,
  Coins,
  Users,
  Globe,
} from "lucide-react"

const phases = [
  {
    id: 1,
    color: "#E85D4C", // Coral/Orange
    steps: [
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
        icon: Gift,
        title: "Implement Reward Platform",
        description:
          "Complete daily tasks and challenges to earn free coins and unlock exclusive race entries. Stack your rewards and compete in premium tournaments without spending a dime.",
      },
    ],
  },
  {
    id: 2,
    color: "#F5C542", // Yellow/Gold
    steps: [
      {
        icon: ImageIcon,
        title: "NFT Integration",
        description:
          "Unique vehicle skins, track designs, and achievements as tradeable NFTs on the Binance Smart Chain.",
      },
      {
        icon: ShieldCheck,
        title: "Anti-Cheat Sentinel",
        description:
          "State-of-the-art anti-cheat technology ensuring fair competition and protecting reward integrity.",
      },
      {
        icon: Coins,
        title: "Token Launch",
        description: "Official $LMX token launch with liquidity pools and exchange listings for seamless trading.",
      },
    ],
  },
  {
    id: 3,
    color: "#4A90A4", // Blue
    steps: [
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
      {
        icon: Users,
        title: "Community Governance",
        description:
          "Decentralized voting system allowing token holders to influence game development and ecosystem decisions.",
      },
    ],
  },
  {
    id: 4,
    color: "#2DD4BF", // Cyan/Teal
    steps: [
      {
        icon: Globe,
        title: "Global Expansion",
        description: "Multi-language support and regional servers for worldwide competitive racing tournaments.",
      },
      {
        icon: Rocket,
        title: "Metaverse Integration",
        description: "Virtual racing arenas and immersive experiences connecting players across blockchain ecosystems.",
      },
      {
        icon: ShieldCheck,
        title: "Enterprise Partnerships",
        description: "Strategic collaborations with gaming studios and blockchain platforms for ecosystem growth.",
      },
    ],
  },
]

export function StrategySection() {
  const [activePhase, setActivePhase] = useState(1)

  return (
    <section id="strategy" className="py-24 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className="font-serif text-4xl sm:text-5xl font-black text-[#FFD700] mb-4"
            style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
          >
            PROJECT STRATEGY
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            This is our roadmap for creating the ultimate blockchain racing ecosystem. Click on a phase to see the
            planned activities for it in detail.
          </p>
        </div>

        <div className="border border-gray-700 rounded-2xl p-6 sm:p-8 bg-gray-900/30">
          {/* Phase Selector */}
          <div className="relative flex items-center justify-center mb-12">
            <div className="relative z-10 flex items-center justify-center">
              {phases.map((phase, index) => (
                <div key={phase.id} className="flex items-center">
                  <button onClick={() => setActivePhase(phase.id)} className="flex flex-col items-center gap-2 group">
                    <span
                      className={`text-sm font-semibold transition-colors ${
                        activePhase === phase.id ? "text-white" : "text-gray-500"
                      }`}
                    >
                      Phase
                    </span>
                    <div
                      className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-2xl font-bold transition-all duration-300 bg-gray-950 ${
                        activePhase === phase.id ? "scale-110 shadow-lg" : "opacity-70 hover:opacity-100"
                      }`}
                      style={{
                        border: `4px solid ${phase.color}`,
                        boxShadow: activePhase === phase.id ? `0 0 25px ${phase.color}80` : "none",
                      }}
                    >
                      {/* Inner circle */}
                      <div
                        className={`absolute inset-2 rounded-full border-2 border-dashed transition-all ${
                          activePhase === phase.id ? "opacity-100" : "opacity-50"
                        }`}
                        style={{ borderColor: phase.color }}
                      />
                      <span style={{ color: phase.color }}>{phase.id}</span>
                    </div>
                  </button>

                  {index < phases.length - 1 && (
                    <div
                      className="w-12 sm:w-20 h-1 mx-1 mt-6"
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
                  className="group relative p-6 rounded-xl bg-black border border-gray-800 hover:border-[#FFD700]/40 transition-all duration-300 overflow-hidden"
                >
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="relative z-10">
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
                    <p className="text-gray-400 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}
