"use client"

import { useState } from "react"
import { Gamepad2, Clock, Trophy, LayoutGrid, Map, HelpCircle, Menu, X } from "lucide-react"
import Image from "next/image"

const navLinks = [
  { name: "Start Game", href: "https://game.lumexia.net", icon: Gamepad2, external: true, active: true },
  { name: "Recent Transactions", href: "#transactions", icon: Clock },
  { name: "Daily Ranking", href: "#leaderboard", icon: Trophy },
  { name: "Platform Features", href: "#features", icon: LayoutGrid },
  { name: "Project Strategy", href: "#strategy", icon: Map },
  { name: "FAQ", href: "#faq", icon: HelpCircle },
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
        <div className="px-6 py-8 flex items-center justify-center">
          <Image
            src="/images/lumexia-logo.png"
            alt="Lumexia Racing Game"
            width={220}
            height={80}
            className="object-contain"
            priority
          />
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


        </nav>
      </aside>
    </>
  )
}
