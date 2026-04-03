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
      {/* Top LUMEXIA Logo */}
      <div className="text-center mb-3">
        <a href="https://lumexia.net" className="inline-block">
          <span 
            className="text-2xl md:text-3xl font-bold tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-cyan-400 to-cyan-300"
            style={{ textShadow: "0 0 30px rgba(0, 212, 255, 0.5)" }}
          >
            LUMEXIA
          </span>
        </a>
      </div>

      {/* Checkered Flags */}
      <div className="absolute top-2 left-4 md:left-16 opacity-70">
        <svg width="50" height="60" viewBox="0 0 50 60" fill="none">
          <rect x="2" y="0" width="2" height="60" fill="#666" />
          <g transform="translate(4, 5)">
            {[0,1,2,3].map((row) =>
              [0,1,2,3].map((col) => (
                <rect
                  key={`left-${row}-${col}`}
                  x={col * 10}
                  y={row * 8}
                  width="10"
                  height="8"
                  fill={(row + col) % 2 === 0 ? "#ffffff" : "#222"}
                />
              ))
            )}
          </g>
        </svg>
      </div>
      <div className="absolute top-2 right-4 md:right-16 opacity-70 transform scale-x-[-1]">
        <svg width="50" height="60" viewBox="0 0 50 60" fill="none">
          <rect x="2" y="0" width="2" height="60" fill="#666" />
          <g transform="translate(4, 5)">
            {[0,1,2,3].map((row) =>
              [0,1,2,3].map((col) => (
                <rect
                  key={`right-${row}-${col}`}
                  x={col * 10}
                  y={row * 8}
                  width="10"
                  height="8"
                  fill={(row + col) % 2 === 0 ? "#ffffff" : "#222"}
                />
              ))
            )}
          </g>
        </svg>
      </div>

      {/* Navigation Bar */}
      <div className="max-w-5xl mx-auto">
        <nav 
          className={`relative rounded-2xl transition-all duration-300 ${
            scrolled ? "bg-[#0d0d20]/95 backdrop-blur-xl" : "bg-[#0d0d20]/90 backdrop-blur-md"
          }`}
          style={{
            background: "linear-gradient(135deg, rgba(13, 13, 32, 0.95) 0%, rgba(20, 15, 50, 0.9) 100%)",
            border: "2px solid rgba(6, 182, 212, 0.5)",
            boxShadow: "0 0 30px rgba(6, 182, 212, 0.3), 0 0 60px rgba(6, 182, 212, 0.1)"
          }}
        >

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
