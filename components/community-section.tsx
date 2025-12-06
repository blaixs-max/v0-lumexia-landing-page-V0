import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"

export function CommunitySection() {
  return (
    <section id="community" className="py-24 bg-gray-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Background glow */}
        <div className="relative">
          <div className="absolute inset-0 -top-20 bg-gradient-to-b from-[#FFD700]/5 via-transparent to-transparent blur-3xl" />

          <div className="relative z-10">
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4">
              JOIN THE <span className="text-[#FFD700]">COLLECTIVE</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto mb-10">
              Connect with fellow racers, get the latest updates, and become part of the Lumexia community.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button className="w-full sm:w-auto px-8 py-6 text-lg font-semibold bg-[#5865F2] text-white hover:bg-[#5865F2]/90 transition-all">
                <MessageCircle className="w-5 h-5 mr-2" />
                Join Discord
              </Button>
              <Button className="w-full sm:w-auto px-8 py-6 text-lg font-semibold bg-black text-white border border-gray-700 hover:bg-gray-900 transition-all">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                Follow X
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
