export function CommunitySection() {
  return (
    <section id="community" className="py-24 bg-black relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(212,175,55,0.05)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 cyber-grid-overlay opacity-40 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-serif text-4xl sm:text-5xl font-black text-white mb-2 tracking-orbitron">
          JOIN THE{" "}
          <span className="text-[#D4AF37] neon-text">COLLECTIVE</span>
        </h2>

        <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent mx-auto mt-4 mb-6" />

        <p className="text-gray-400 max-w-lg mx-auto mb-10 text-sm leading-relaxed">
          Connect with fellow racers, get the latest updates, and become part of the Lumexia community.
        </p>

        <div className="flex items-center justify-center">
          <a
            href="https://x.com/lumexia_project"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-neon-hover inline-flex items-center gap-3 px-8 py-4 rounded-sm border border-[#D4AF37]/30 bg-[#D4AF37]/5 text-[#D4AF37] font-semibold text-sm tracking-wider uppercase hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/60 transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            Follow on X
          </a>
        </div>
      </div>
    </section>
  )
}
