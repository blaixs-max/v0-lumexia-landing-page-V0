"use client"

import { useState, useEffect } from "react"
import { Menu, X, Home, Gamepad2, Trophy, Layers, Users, Target, HelpCircle } from "lucide-react"

const navLinks = [
  { name: "HOME", href: "#", icon: Home, external: false },
  { name: "START GAME", href: "https://game.lumexia.net", icon: Gamepad2, external: true },
  { name: "LEADERBOARD", href: "#leaderboard", icon: Trophy, external: false },
  { name: "PLATFORM FEATURES", href: "#features", icon: Layers, external: false },
  { name: "COMMUNITY", href: "#community", icon: Users, external: false },
  { name: "STRATEGY", href: "#strategy", icon: Target, external: false },
  { name: "HELP", href: "#faq", icon: HelpCircle, external: false },
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
    <header className="fixed top-0 left-0 right-0 z-40 pt-4 px-4">
      {/* Navigation Bar */}
      <div className="max-w-5xl mx-auto">
        <nav 
          className={`relative rounded-xl transition-all duration-300 ${
            scrolled ? "bg-[#0d0d20]/95 backdrop-blur-xl" : "bg-[#0d0d20]/80 backdrop-blur-md"
          }`}
          style={{
            border: "2px solid transparent",
            borderImage: "linear-gradient(90deg, #06b6d4, #8b5cf6, #06b6d4) 1",
            boxShadow: "0 0 20px rgba(6, 182, 212, 0.3), inset 0 0 20px rgba(139, 92, 246, 0.1)"
          }}
        >
          {/* Neon corner accents */}
          <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-cyan-400 rounded-tl-lg" />
          <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-cyan-400 rounded-tr-lg" />
          <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-purple-500 rounded-bl-lg" />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-purple-500 rounded-br-lg" />

          <div className="flex items-center justify-center px-4 py-3">
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link, index) => (
                <a
                  key={link.name}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className={`flex items-center gap-2 px-6 py-2 text-sm font-bold tracking-wider transition-all duration-300 rounded-lg ${
                    index === 0 
                      ? "text-cyan-400 bg-cyan-500/10" 
                      : "text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/5"
                  }`}
                >
                  {link.icon && <link.icon className="w-4 h-4" />}
                  {link.name}
                </a>
              ))}
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
            <div className="md:hidden py-4 px-4 border-t border-purple-500/20">
              {navLinks.map((link, index) => (
                <a
                  key={link.name}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className={`flex items-center gap-2 py-3 px-4 text-sm font-bold tracking-wider transition-colors rounded-lg ${
                    index === 0 
                      ? "text-cyan-400 bg-cyan-500/10" 
                      : "text-gray-300 hover:text-cyan-400"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.icon && <link.icon className="w-4 h-4" />}
                  {link.name}
                </a>
              ))}
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}
