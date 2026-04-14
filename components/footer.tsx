export function Footer() {
  return (
    <footer className="bg-black border-t border-[#D4AF37]/10">
      {/* Top gradient separator */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="font-serif text-xl font-black text-white tracking-orbitron">LUMEXIA</span>
            <span className="text-[10px] font-semibold tracking-widest text-[#D4AF37]/60 uppercase">$LMX · BSC</span>
          </div>

          {/* Copyright */}
          <p className="text-gray-600 text-xs tracking-wide">© 2025 Lumexia. All rights reserved.</p>

          {/* Links */}
          <div className="flex items-center gap-6">
            {["Terms", "Privacy", "Docs"].map((label) => (
              <a
                key={label}
                href="#"
                className="text-xs text-gray-600 hover:text-[#D4AF37] transition-colors duration-200 tracking-wide"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
