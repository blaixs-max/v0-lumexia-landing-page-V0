"use client"

import { useState, useEffect } from "react"
import { Menu, X, Copy, Check } from "lucide-react"

const navLinks = [
  { name: "Game", href: "https://game.lumexia.net", external: true },
  { name: "Leaderboard", href: "#leaderboard", external: false },
  { name: "Project Strategy", href: "#strategy", external: false },
  { name: "Community", href: "#community", external: false },
  { name: "Help", href: "#faq", external: false },
]

const CONTRACT_ADDRESS = "0xb92cc959c2434c06489d3f941391a5f1d8334444"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(CONTRACT_ADDRESS)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy address")
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled 
          ? "bg-[#0a0a12]/95 backdrop-blur-xl border-b border-purple-500/20 shadow-lg shadow-purple-500/5" 
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo - Text Only */}
          <a href="https://lumexia.net" className="relative flex items-center gap-3 flex-shrink-0">
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-bold tracking-wider text-white">LUMEXIA</span>
              <span className="text-xs text-cyan-400 font-medium tracking-widest">$LMX</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="text-sm text-gray-300 hover:text-cyan-400 transition-colors duration-200 font-medium"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Contract Address Badge */}
          <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full glass-card">
            <span className="text-xs text-cyan-400 font-semibold tracking-wide whitespace-nowrap">Official CA:</span>
            <code className="text-xs text-gray-300 font-mono whitespace-nowrap">
              {CONTRACT_ADDRESS.slice(0, 6)}...{CONTRACT_ADDRESS.slice(-4)}
            </code>
            <button
              onClick={copyAddress}
              className="p-1.5 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 transition-all duration-200 group"
              title="Copy address"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-green-400" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-300 hover:text-cyan-400 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-purple-500/20 bg-[#0a0a12]/95 backdrop-blur-xl">
            <div className="flex items-center justify-between gap-2 px-2 py-3 mb-2 rounded-xl glass-card">
              <div className="flex flex-col">
                <span className="text-xs text-cyan-400 font-semibold">Official CA:</span>
                <code className="text-xs text-gray-300 font-mono">
                  {CONTRACT_ADDRESS.slice(0, 10)}...{CONTRACT_ADDRESS.slice(-6)}
                </code>
              </div>
              <button
                onClick={copyAddress}
                className="p-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 transition-all"
              >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-cyan-400" />}
              </button>
            </div>

            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="block py-3 text-gray-300 hover:text-cyan-400 transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}
