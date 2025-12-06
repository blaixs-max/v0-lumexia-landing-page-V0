import Image from "next/image"

export function Footer() {
  return (
    <footer className="py-12 bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              <Image src="/images/lumexia-logo.png" alt="Lumexia Logo" fill className="object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-white">LUMEXIA</span>
              <span className="text-xs text-[#FFD700]">$LMX</span>
            </div>
          </div>

          {/* Copyright */}
          <p className="text-gray-500 text-sm">© 2025 Lumexia. All rights reserved.</p>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-gray-400 hover:text-[#FFD700] transition-colors">
              Terms
            </a>
            <a href="#" className="text-sm text-gray-400 hover:text-[#FFD700] transition-colors">
              Privacy
            </a>
            <a href="#" className="text-sm text-gray-400 hover:text-[#FFD700] transition-colors">
              Docs
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
