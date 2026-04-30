import { TOKEN_CONFIG } from "@/lib/token-config"

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-10 neon-border-box p-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="font-serif text-xl font-black text-white tracking-orbitron">LUMEXIA</span>
          <span className="text-[10px] font-semibold tracking-widest text-[#00f0ff]/60 uppercase">${TOKEN_CONFIG.symbol} · {TOKEN_CONFIG.chain}</span>
        </div>

        {/* Copyright */}
        <p className="text-[#a19bb8] text-xs tracking-wide">© {year} Lumexia. All rights reserved.</p>
      </div>
    </footer>
  )
}
