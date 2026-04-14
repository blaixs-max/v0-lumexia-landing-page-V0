"use client"

import { Users, MessageCircle, Star, ArrowRight } from "lucide-react"

const stats = [
  { label: "Community Members", value: "50K+", icon: Users },
  { label: "Daily Active", value: "12K+", icon: Star },
  { label: "Discord Members", value: "8K+", icon: MessageCircle },
]

export function CommunitySection() {
  return (
    <section id="community" className="py-24 cyberpunk-bg relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-purple-600/8 rounded-full blur-[120px]" />
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-cyan-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section label */}
        <p className="text-purple-400/70 text-xs tracking-[0.3em] uppercase font-medium mb-3">
          Join Us
        </p>

        <h2 className="font-serif text-4xl sm:text-5xl font-black mb-4 tracking-orbitron">
          <span className="text-white">JOIN THE </span>
          <span className="gradient-text">COLLECTIVE</span>
        </h2>

        <p className="text-gray-400 max-w-xl mx-auto mb-12 text-sm leading-relaxed">
          Connect with fellow players, stay ahead of the latest updates, and shape the future of the Lumexia ecosystem together.
        </p>

        {/* Stats row */}
        <div className="flex flex-wrap items-center justify-center gap-8 mb-12">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <stat.icon className="w-5 h-5 text-purple-400 mb-1" />
              <span className="font-serif text-2xl font-black gradient-text">{stat.value}</span>
              <span className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://x.com/lumexia_project"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-neon inline-flex items-center gap-2.5 px-7 py-3.5 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 text-white text-sm font-semibold shadow-[0_0_20px_rgba(147,51,234,0.3)]"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            Follow on X
          </a>

          <a
            href="#"
            className="btn-outline-neon inline-flex items-center gap-2.5 px-7 py-3.5 rounded-lg border border-purple-500/40 text-gray-300 text-sm font-semibold hover:text-white"
          >
            Join Discord
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Decorative divider */}
        <div className="mt-16 flex items-center gap-4 max-w-xs mx-auto">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-purple-500/30" />
          <div className="w-2 h-2 rounded-full bg-purple-500/50" />
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-purple-500/30" />
        </div>
      </div>
    </section>
  )
}
