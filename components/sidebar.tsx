"use client"

import { useState } from "react"
import { Home, Gamepad2, TrendingUp, Wallet, Clock, Settings, Menu, X } from "lucide-react"
import Image from "next/image"

const navLinks = [
  { name: "Dashboard", href: "#", icon: Home, active: true },
  { name: "Games", href: "https://game.lumexia.net", icon: Gamepad2, external: true },
  { name: "Staking", href: "#strategy", icon: TrendingUp },
  { name: "Assets", href: "#leaderboard", icon: Wallet },
  { name: "Transactions", href: "#community", icon: Clock },
]

export function Sidebar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg glass-panel border border-[#00f0ff]/30"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
      >
        {mobileMenuOpen ? (
          <X className="w-6 h-6 text-[#00f0ff]" />
        ) : (
          <Menu className="w-6 h-6 text-[#00f0ff]" />
        )}
      </button>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/80 z-30"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:relative z-40
          w-[280px] h-[calc(100vh-48px)] 
          rounded-2xl flex flex-col neon-border-box
          transition-transform duration-300
          ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Logo Section */}
        <div className="px-8 py-10 flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#00f0ff] to-[#9d00ff] rounded-lg flex items-center justify-center p-1">
            <svg className="w-full h-full text-white" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 11H20M4 15H14M10 7H20" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-xl leading-tight tracking-wider text-white">LUMEXIA</span>
            <span className="font-serif font-bold text-lg leading-tight tracking-wider text-[#a19bb8]">RACING HUB</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 flex flex-col gap-2 px-0 py-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              onClick={() => setMobileMenuOpen(false)}
              className={`
                flex items-center gap-4 px-8 py-4 transition-all duration-300 group
                ${link.active 
                  ? "nav-item-active" 
                  : "hover:bg-white/5"
                }
              `}
            >
              <link.icon
                className={`h-6 w-6 transition-colors ${
                  link.active 
                    ? "text-[#00f0ff]" 
                    : "text-[#9d00ff] group-hover:text-[#00f0ff]"
                }`}
              />
              <span
                className={`font-medium transition-colors ${
                  link.active 
                    ? "text-[#00f0ff]" 
                    : "text-[#a19bb8] group-hover:text-white"
                }`}
              >
                {link.name}
              </span>
            </a>
          ))}

          {/* Settings at bottom */}
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-4 px-8 py-4 transition-all duration-300 group hover:bg-white/5 mt-auto mb-4"
          >
            <Settings className="h-6 w-6 text-[#9d00ff] group-hover:text-[#00f0ff] transition-colors" />
            <span className="font-medium text-[#a19bb8] group-hover:text-white transition-colors">
              Settings
            </span>
          </a>
        </nav>
      </aside>
    </>
  )
}
