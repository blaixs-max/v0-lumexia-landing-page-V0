"use client"

import { useState, useEffect } from "react"
import { Menu, X, Copy, Check } from "lucide-react"
import Image from "next/image"

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
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(CONTRACT_ADDRESS)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      console.error("Failed to copy address")
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-black/90 backdrop-blur-xl border-b border-[#D4AF37]/20 shadow-[0_1px_20px_rgba(0,0,0,0.8)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <a href="https://lumexia.net" className="relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0">
            <Image src="/images/lumexia-logo.png" alt="Lumexia Logo" fill className="object-contain" priority />
          </a>

          {/* Contract Address — Desktop */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#D4AF37]/25 bg-[#D4AF37]/5 backdrop-blur-sm">
            <span className="text-[10px] text-[#D4AF37]/80 font-semibold tracking-widest uppercase whitespace-nowrap">
              CA:
            </span>
            <code className="text-[11px] text-gray-300/80 font-mono whitespace-nowrap tracking-wider">
              {CONTRACT_ADDRESS.slice(0, 6)}…{CONTRACT_ADDRESS.slice(-4)}
            </code>
            <button
              onClick={copyAddress}
              className="p-1 rounded border border-[#D4AF37]/20 bg-transparent hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/40 transition-all duration-200"
              title="Copy contract address"
              aria-label="Copy contract address"
            >
              {copied ? (
                <Check className="w-3 h-3 text-green-400" />
              ) : (
                <Copy className="w-3 h-3 text-[#D4AF37]/70 hover:text-[#D4AF37]" />
              )}
            </button>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="relative text-sm font-medium text-gray-400 hover:text-[#D4AF37] transition-colors duration-200 group"
              >
                {link.name}
                <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-[#D4AF37] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-400 hover:text-[#D4AF37] transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-[#D4AF37]/15 bg-black/95 backdrop-blur-xl">
            {/* Contract address on mobile */}
            <div className="flex items-center justify-between gap-2 px-3 py-3 mb-3 rounded-lg border border-[#D4AF37]/20 bg-[#D4AF37]/5">
              <div className="flex flex-col gap-0.5">
                <span className="text-[9px] text-[#D4AF37]/70 font-semibold tracking-widest uppercase">Contract Address</span>
                <code className="text-[11px] text-gray-300 font-mono">
                  {CONTRACT_ADDRESS.slice(0, 10)}…{CONTRACT_ADDRESS.slice(-6)}
                </code>
              </div>
              <button
                onClick={copyAddress}
                className="p-2 rounded border border-[#D4AF37]/25 bg-transparent hover:bg-[#D4AF37]/10 transition-all"
                aria-label="Copy contract address"
              >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-[#D4AF37]/70" />}
              </button>
            </div>

            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="flex items-center py-3 px-1 text-sm font-medium text-gray-400 hover:text-[#D4AF37] border-b border-white/5 last:border-0 transition-colors"
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
