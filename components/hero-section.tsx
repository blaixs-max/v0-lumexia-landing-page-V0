"use client"

import { TrendingUp } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden cyberpunk-bg">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Tech Grid Lines */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(138, 43, 226, 0.3)" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        {/* Glowing Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/15 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-left">
            {/* SOL Price Indicator */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1a1a3a]/60 border border-purple-500/20 mb-8">
              <span className="text-gray-300 text-sm">SOL Price:</span>
              <span className="text-white font-semibold">$110.45</span>
              <span className="text-green-400 text-sm flex items-center gap-1">
                (+5.2%)
                <TrendingUp className="w-3 h-3" />
              </span>
            </div>

            <h1 className="mb-6">
              <span className="block text-5xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight uppercase leading-tight">
                EXPERIENCE THE
              </span>
              <span className="block text-5xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight uppercase leading-tight">
                FUTURE OF <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">SOLANA</span>
              </span>
              <span className="block text-5xl sm:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-500 to-cyan-400 tracking-tight uppercase leading-tight">
                GAMING.
              </span>
            </h1>

            <p className="text-lg text-gray-300 max-w-xl mb-10 leading-relaxed">
              Join Lumexia: Play, Earn, and Thrive in the Ultimate Web3 Ecosystem.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4">
              <button className="px-8 py-4 text-sm font-bold tracking-wider bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-500 hover:to-purple-600 transition-all duration-200 uppercase shadow-lg shadow-purple-500/25">
                CONNECT WALLET
              </button>
              <button className="px-8 py-4 text-sm font-bold tracking-wider bg-transparent border border-gray-600 text-white rounded-lg hover:border-purple-500 hover:bg-purple-500/10 transition-all duration-200 uppercase">
                EXPLORE GAMES
              </button>
            </div>
          </div>

          {/* Right Content - Controller Image */}
          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-lg">
              {/* Glow effect behind controller */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 to-cyan-500/20 rounded-full blur-[60px] scale-110" />
              
              {/* Controller SVG */}
              <svg viewBox="0 0 400 300" className="w-full h-auto relative z-10" xmlns="http://www.w3.org/2000/svg">
                {/* Controller Body */}
                <defs>
                  <linearGradient id="controllerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1a1a3a" />
                    <stop offset="50%" stopColor="#2a2a4a" />
                    <stop offset="100%" stopColor="#1a1a3a" />
                  </linearGradient>
                  <linearGradient id="purpleGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#9333ea" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
                
                {/* Main Controller Shape */}
                <ellipse cx="200" cy="150" rx="150" ry="80" fill="url(#controllerGrad)" stroke="#6b21a8" strokeWidth="2" />
                
                {/* Left Handle */}
                <path d="M80 150 Q40 180 50 230 Q60 270 90 260 Q120 250 110 200 Q100 160 80 150" fill="url(#controllerGrad)" stroke="#6b21a8" strokeWidth="2" />
                
                {/* Right Handle */}
                <path d="M320 150 Q360 180 350 230 Q340 270 310 260 Q280 250 290 200 Q300 160 320 150" fill="url(#controllerGrad)" stroke="#6b21a8" strokeWidth="2" />
                
                {/* D-Pad */}
                <rect x="100" y="130" width="40" height="12" rx="2" fill="#3a3a5a" />
                <rect x="115" y="115" width="12" height="40" rx="2" fill="#3a3a5a" />
                
                {/* Buttons XYAB */}
                <circle cx="280" cy="120" r="10" fill="#22c55e" />
                <circle cx="300" cy="140" r="10" fill="#ef4444" />
                <circle cx="260" cy="140" r="10" fill="#3b82f6" />
                <circle cx="280" cy="160" r="10" fill="#eab308" />
                
                {/* Analog Sticks */}
                <circle cx="150" cy="180" r="20" fill="#2a2a4a" stroke="#4a4a6a" strokeWidth="2" />
                <circle cx="150" cy="180" r="12" fill="#3a3a5a" />
                <circle cx="250" cy="180" r="20" fill="#2a2a4a" stroke="#4a4a6a" strokeWidth="2" />
                <circle cx="250" cy="180" r="12" fill="#3a3a5a" />
                
                {/* Center Logo Area */}
                <circle cx="200" cy="130" r="25" fill="#1a1a2a" stroke="url(#purpleGlow)" strokeWidth="2" />
                
                {/* Solana Logo in Center */}
                <g transform="translate(185, 115)">
                  <path d="M5 20L15 10H25L15 20H5Z" fill="url(#purpleGlow)" />
                  <path d="M5 25L15 15H25L15 25H5Z" fill="url(#purpleGlow)" opacity="0.7" />
                  <path d="M5 30L15 20H25L15 30H5Z" fill="url(#purpleGlow)" opacity="0.5" />
                </g>
                
                {/* Menu Buttons */}
                <rect x="175" y="165" width="20" height="6" rx="3" fill="#4a4a6a" />
                <rect x="205" y="165" width="20" height="6" rx="3" fill="#4a4a6a" />
                
                {/* Shoulder Buttons Glow */}
                <rect x="90" y="75" width="60" height="15" rx="7" fill="#2a2a4a" stroke="#9333ea" strokeWidth="1" />
                <rect x="250" y="75" width="60" height="15" rx="7" fill="#2a2a4a" stroke="#9333ea" strokeWidth="1" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
