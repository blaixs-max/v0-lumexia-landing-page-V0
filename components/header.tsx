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
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? "bg-[#0a0a1a]/95 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3">
            <div className="relative">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 5L35 12.5V27.5L20 35L5 27.5V12.5L20 5Z" fill="url(#logoGradient)" />
                <path d="M12 18L20 14L28 18L20 22L12 18Z" fill="white" fillOpacity="0.9" />
                <path d="M12 22L20 26L28 22" stroke="white" strokeWidth="1.5" strokeOpacity="0.7" />
                <path d="M12 25L20 29L28 25" stroke="white" strokeWidth="1.5" strokeOpacity="0.5" />
                <defs>
                  <linearGradient id="logoGradient" x1="5" y1="5" x2="35" y2="35" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#9333ea" />
                    <stop offset="1" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-400 tracking-wider">Solana</span>
              <span className="text-xl font-bold text-white tracking-wide">Lumexia</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Connect Wallet Button */}
          <button className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1a1a3a]/80 border border-purple-500/30 text-white text-sm font-medium hover:bg-[#2a2a4a] transition-all duration-200">
            <Wallet className="w-4 h-4" />
            Connect Wallet
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-300 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-purple-500/20 bg-[#0a0a1a]/95 backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block py-3 text-gray-300 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <button className="mt-4 w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#1a1a3a]/80 border border-purple-500/30 text-white text-sm font-medium">
              <Wallet className="w-4 h-4" />
              Connect Wallet
            </button>
          </nav>
        )}
      </div>
    </header>
  )
}
