export function CommunitySection() {
  return (
    <section id="community" className="py-10 bg-transparent">
      <div className="neon-border-box p-6 md:p-8 text-center">
        <h2 className="font-serif text-3xl sm:text-4xl font-black text-white mb-2 tracking-orbitron">
          JOIN THE{" "}
          <span className="text-[#00f0ff] neon-text-cyan">COLLECTIVE</span>
        </h2>

        <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#00f0ff]/60 to-transparent mx-auto mt-4 mb-6" />

        <p className="text-[#a19bb8] max-w-lg mx-auto mb-10 text-sm leading-relaxed">
          Connect with fellow racers, get the latest updates, and become part of the Lumexia community.
        </p>

        <div className="flex items-center justify-center">
          <a
            href="https://x.com/lumexia_project"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-neon-hover inline-flex items-center gap-3 px-8 py-4 rounded-full border-2 border-[#00f0ff] bg-transparent text-[#00f0ff] font-bold text-sm tracking-wider uppercase hover:bg-[#00f0ff] hover:text-white shadow-neon-cyan transition-all duration-300"
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
