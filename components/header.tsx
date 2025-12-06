"use client"

import { useState, useEffect } from "react"
import { Menu, X, Copy, Check } from "lucide-react"
import Image from "next/image"

const navLinks = [
  { name: "Game", href: "#game" },
  { name: "Leaderboard", href: "#leaderboard" },
  { name: "Project Strategy", href: "#strategy" },
  { name: "Community", href: "#community" },
  { name: "Help", href: "#faq" },
]

const CONTRACT_ADDRESS = "0x7a8B3C9dE2fA1b5c6D8e9F0a1B2c3D4e5F6a7B8C"

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
        scrolled ? "bg-black/95 backdrop-blur-md shadow-lg shadow-black/50" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24 md:h-32">
          {/* Logo */}
          <div className="relative w-24 h-24 md:w-28 md:h-28 flex-shrink-0">
            <Image src="/images/lumexia-logo.png" alt="Lumexia Logo" fill className="object-contain" priority />
          </div>

          <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg border border-[#FFD700]/30 bg-black/60 backdrop-blur-sm absolute left-[32%] transform -translate-x-1/2">
            <span className="text-xs text-[#FFD700] font-semibold tracking-wide whitespace-nowrap">Official CA:</span>
            <code className="text-xs text-gray-300 font-mono whitespace-nowrap">
              {CONTRACT_ADDRESS.slice(0, 6)}...{CONTRACT_ADDRESS.slice(-4)}
            </code>
            <button
              onClick={copyAddress}
              className="p-1.5 rounded-md bg-[#FFD700]/10 hover:bg-[#FFD700]/20 border border-[#FFD700]/30 transition-all duration-200 group"
              title="Copy address"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-green-400" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-[#FFD700] group-hover:scale-110 transition-transform" />
              )}
            </button>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm text-gray-300 hover:text-[#FFD700] transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-300 hover:text-[#FFD700]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-[#FFD700]/20 bg-black/90 backdrop-blur-md">
            <div className="flex items-center justify-between gap-2 px-2 py-3 mb-2 rounded-lg border border-[#FFD700]/30 bg-black/40">
              <div className="flex flex-col">
                <span className="text-xs text-[#FFD700] font-semibold">Official CA:</span>
                <code className="text-xs text-gray-300 font-mono">
                  {CONTRACT_ADDRESS.slice(0, 10)}...{CONTRACT_ADDRESS.slice(-6)}
                </code>
              </div>
              <button
                onClick={copyAddress}
                className="p-2 rounded-md bg-[#FFD700]/10 hover:bg-[#FFD700]/20 border border-[#FFD700]/30 transition-all"
              >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-[#FFD700]" />}
              </button>
            </div>

            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block py-3 text-gray-300 hover:text-[#FFD700] transition-colors"
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
