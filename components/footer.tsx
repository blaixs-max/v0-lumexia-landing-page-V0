export function Footer() {
  return (
    <footer className="mt-10 neon-border-box p-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="font-serif text-xl font-black text-white tracking-orbitron">LUMEXIA</span>
          <span className="text-[10px] font-semibold tracking-widest text-[#00f0ff]/60 uppercase">$LMX · BSC</span>
        </div>

        {/* Copyright */}
        <p className="text-[#a19bb8] text-xs tracking-wide">© 2025 Lumexia. All rights reserved.</p>

        {/* Links */}
        <div className="flex items-center gap-6">
          {["Terms", "Privacy", "Docs"].map((label) => (
            <a
              key={label}
              href="#"
              className="text-xs text-[#a19bb8] hover:text-[#00f0ff] transition-colors duration-200 tracking-wide"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
