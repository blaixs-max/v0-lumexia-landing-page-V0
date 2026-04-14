"use client"

import { TrendingUp, ChevronDown } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden cyberpunk-bg">
      {/* Cyber grid overlay */}
      <div className="absolute inset-0 cyber-grid opacity-70" />

      {/* Atmospheric orbs */}
      <div className="absolute top-1/4 left-[10%] w-[500px] h-[500px] bg-purple-600/12 rounded-full blur-[140px] orb-float" />
      <div
        className="absolute bottom-1/3 right-[8%] w-[380px] h-[380px] bg-cyan-500/10 rounded-full blur-[110px] orb-float"
        style={{ animationDelay: "3s" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Content */}
          <div className="text-left">
            {/* SOL Price badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#1a1a3a]/70 border border-purple-500/25 mb-8 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-gray-400 text-xs font-medium tracking-wide">SOL Price:</span>
              <span className="text-white text-xs font-bold font-mono">$110.45</span>
              <span className="text-green-400 text-xs flex items-center gap-0.5 font-medium">
                +5.2%
                <TrendingUp className="w-3 h-3" />
              </span>
            </div>

            {/* Headline — Orbitron via font-serif */}
            <h1 className="mb-7">
              <span className="block font-serif text-5xl sm:text-6xl lg:text-[4.25rem] font-black text-white uppercase tracking-orbitron leading-[0.95] mb-1">
                EXPERIENCE
              </span>
              <span className="block font-serif text-5xl sm:text-6xl lg:text-[4.25rem] font-black text-white uppercase tracking-orbitron leading-[0.95] mb-1">
                THE FUTURE OF
              </span>
              <span className="block font-serif text-5xl sm:text-6xl lg:text-[4.25rem] font-black uppercase tracking-orbitron leading-[0.95] gradient-text">
                SOLANA GAMING.
              </span>
            </h1>

            <p className="text-base text-gray-400 max-w-md mb-10 leading-relaxed font-light">
              Join Lumexia: Play, Earn, and Thrive in the Ultimate Web3 Ecosystem built on Solana&apos;s lightning-fast blockchain.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4">
              <button className="btn-neon w-full sm:w-auto px-8 py-4 text-sm font-bold tracking-widest uppercase bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-500 hover:to-purple-600 shadow-[0_0_28px_rgba(147,51,234,0.3)]">
                Connect Wallet
              </button>
              <button className="btn-outline-neon w-full sm:w-auto px-8 py-4 text-sm font-bold tracking-widest uppercase border border-white/15 text-gray-300 rounded-lg hover:text-white">
                Explore Games
              </button>
            </div>

            {/* Stats row */}
            <div className="flex items-center gap-8 mt-12 pt-8 border-t border-white/5">
              {[
                { value: "50K+", label: "Players" },
                { value: "$2.4M", label: "Rewards Paid" },
                { value: "99.9%", label: "Uptime" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-serif text-xl font-black gradient-text tracking-orbitron">{s.value}</div>
                  <div className="text-xs text-gray-500 mt-0.5 tracking-wide">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Enhanced Controller SVG */}
          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[480px]">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/25 to-cyan-500/15 rounded-full blur-[80px] scale-110" />
              <svg
                viewBox="0 0 400 300"
                className="w-full h-auto relative z-10 drop-shadow-[0_0_40px_rgba(147,51,234,0.3)]"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="ctrlBody" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#14142a" />
                    <stop offset="50%" stopColor="#1e1e40" />
                    <stop offset="100%" stopColor="#14142a" />
                  </linearGradient>
                  <linearGradient id="ctrlAccent" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#9333ea" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
                <ellipse cx="200" cy="155" rx="148" ry="78" fill="url(#ctrlBody)" stroke="url(#ctrlAccent)" strokeWidth="1.5" />
                <path d="M82 155 Q42 185 52 232 Q62 268 92 258 Q122 248 112 200 Q102 162 82 155" fill="url(#ctrlBody)" stroke="url(#ctrlAccent)" strokeWidth="1.5" />
                <path d="M318 155 Q358 185 348 232 Q338 268 308 258 Q278 248 288 200 Q298 162 318 155" fill="url(#ctrlBody)" stroke="url(#ctrlAccent)" strokeWidth="1.5" />
                <rect x="100" y="135" width="38" height="10" rx="2" fill="#2a2a50" />
                <rect x="114" y="121" width="10" height="38" rx="2" fill="#2a2a50" />
                <circle cx="278" cy="122" r="9" fill="#1f2a1f" stroke="#22c55e" strokeWidth="1.5" />
                <circle cx="298" cy="142" r="9" fill="#2a1f1f" stroke="#ef4444" strokeWidth="1.5" />
                <circle cx="258" cy="142" r="9" fill="#1f1f2a" stroke="#6366f1" strokeWidth="1.5" />
                <circle cx="278" cy="162" r="9" fill="#2a2a1a" stroke="#eab308" strokeWidth="1.5" />
                <circle cx="150" cy="182" r="18" fill="#1a1a38" stroke="#3a3a6a" strokeWidth="1.5" />
                <circle cx="150" cy="182" r="10" fill="#22224a" />
                <circle cx="250" cy="182" r="18" fill="#1a1a38" stroke="#3a3a6a" strokeWidth="1.5" />
                <circle cx="250" cy="182" r="10" fill="#22224a" />
                <circle cx="200" cy="132" r="22" fill="#10102a" stroke="url(#ctrlAccent)" strokeWidth="2" />
                <g transform="translate(188, 118)">
                  <path d="M4 18L13 9H23L14 18H4Z" fill="url(#ctrlAccent)" />
                  <path d="M4 23L13 14H23L14 23H4Z" fill="url(#ctrlAccent)" fillOpacity="0.7" />
                  <path d="M4 28L13 19H23L14 28H4Z" fill="url(#ctrlAccent)" fillOpacity="0.45" />
                </g>
                <rect x="175" y="167" width="18" height="5" rx="2.5" fill="#3a3a5a" />
                <rect x="207" y="167" width="18" height="5" rx="2.5" fill="#3a3a5a" />
                <rect x="88" y="78" width="58" height="13" rx="6" fill="#1a1a38" stroke="#9333ea" strokeWidth="1" />
                <rect x="254" y="78" width="58" height="13" rx="6" fill="#1a1a38" stroke="#9333ea" strokeWidth="1" />
                <ellipse cx="200" cy="155" rx="100" ry="50" fill="none" stroke="url(#ctrlAccent)" strokeWidth="0.5" strokeOpacity="0.3" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40">
        <span className="text-[9px] tracking-widest uppercase text-gray-500">Scroll</span>
        <ChevronDown className="w-4 h-4 text-purple-400 animate-bounce" />
      </div>
    </section>
  )
}
