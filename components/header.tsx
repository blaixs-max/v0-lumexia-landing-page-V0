"use client"

import { useState, useEffect } from "react"
import { Menu, X, Wallet } from "lucide-react"

const navLinks = [
  { name: "Games", href: "#games" },
  { name: "Marketplace", href: "#marketplace" },
  { name: "Staking", href: "#staking" },
  { name: "About", href: "#about" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#080812]/92 backdrop-blur-xl border-b border-purple-500/20 shadow-[0_1px_24px_rgba(147,51,234,0.1)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group">
            <div className="relative flex-shrink-0">
              <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 4L34 11.5V28.5L20 36L6 28.5V11.5L20 4Z" fill="url(#hlogoG)" />
                <path d="M13 18.5L20 15L27 18.5L20 22L13 18.5Z" fill="white" fillOpacity="0.9" />
                <path d="M13 23L20 26.5L27 23" stroke="white" strokeWidth="1.4" strokeOpacity="0.65" strokeLinecap="round" />
                <path d="M13 26.5L20 30L27 26.5" stroke="white" strokeWidth="1.4" strokeOpacity="0.4" strokeLinecap="round" />
                <defs>
                  <linearGradient id="hlogoG" x1="6" y1="4" x2="34" y2="36" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#9333ea" />
                    <stop offset="1" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute -inset-1 rounded-full bg-purple-500/10 blur-sm group-hover:bg-purple-500/20 transition-colors duration-200" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[9px] tracking-widest text-purple-400/70 uppercase font-medium">Solana</span>
              <span className="font-serif text-lg font-black text-white tracking-orbitron leading-tight">LUMEXIA</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative text-sm font-medium text-gray-400 hover:text-white transition-colors duration-200 group py-1"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-purple-500 to-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
              </a>
            ))}
          </nav>

          {/* Connect Wallet */}
          <button className="btn-neon hidden md:flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 text-white text-sm font-semibold hover:from-purple-500 hover:to-purple-600 shadow-[0_0_20px_rgba(147,51,234,0.25)]">
            <Wallet className="w-4 h-4" />
            Connect Wallet
          </button>

          {/* Mobile Button */}
          <button
            className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-5 border-t border-purple-500/15 bg-[#080812]/96 backdrop-blur-xl">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="flex py-3 px-1 text-sm font-medium text-gray-400 hover:text-purple-300 border-b border-white/5 last:border-0 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <button className="mt-5 w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 text-white text-sm font-semibold">
              <Wallet className="w-4 h-4" />
              Connect Wallet
            </button>
          </nav>
        )}
      </div>
    </header>
  )
}
