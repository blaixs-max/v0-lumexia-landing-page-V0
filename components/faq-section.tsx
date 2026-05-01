"use client"

import { useState, useEffect } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Wallet, Gamepad2, Users, Coins, Monitor, Smartphone } from "lucide-react"
import { TOKEN_CONFIG } from "@/lib/token-config"

const faqs = [
  {
    question: "How do I connect my wallet?",
    answer: "detailed_wallet_guide",
  },
  {
    question: "How do I play the game?",
    answer: "detailed_guide",
  },
  {
    question: `Where can I buy $${TOKEN_CONFIG.symbol} tokens?`,
    answer: `$${TOKEN_CONFIG.symbol} tokens are available on Jupiter (Solana DEX aggregator) and pump.fun. Connect your Solana wallet, ensure you have SOL for transaction fees, and swap for $${TOKEN_CONFIG.symbol}. Always verify the contract address on our official channels to avoid scams.`,
  },
  {
    question: "How do I earn tokens?",
    answer: `Finish in the top 100 on the 48-hour cycle leaderboard to earn automatic $${TOKEN_CONFIG.symbol} rewards. Payouts are executed at the end of each 48-hour cycle (00:00 UTC every other day). The higher your rank, the more you earn.`,
  },
  {
    question: "I have a problem, how can I contact you?",
    answer:
      "Join our X community for immediate support. You can reach us on Twitter for updates, announcements, and support. Our support team typically responds within 24 hours.",
  },
]

const gameSteps = [
  {
    icon: Wallet,
    title: "Connect Your Wallet",
    description: "Connect your Solana-compatible wallet (Phantom, Solflare, Coinbase, Trust)",
  },
  {
    icon: Gamepad2,
    title: "Select Game Mode",
    description: "Choose between Classic or Double or Nothing mode",
  },
  {
    icon: Users,
    title: "Select Cycle Team",
    description: "Join a team - the team with the most points each 48-hour cycle wins an extra prize!",
  },
  {
    icon: Coins,
    title: "Get Credits",
    description: "Purchase credits or enter the game with your existing credits",
  },
]

const pcConnectionSteps = [
  {
    step: 1,
    description: "Press the Connect Wallet button.",
  },
  {
    step: 2,
    description: "Your wallet application will open automatically.",
  },
  {
    step: 3,
    description: "Wait until the Lumexia connection menu appears in your wallet application.",
  },
  {
    step: 4,
    description: "Press the Connect or Approve button.",
  },
]

const mobileConnectionSteps = [
  {
    step: 1,
    description: "Press the Connect Wallet button.",
  },
  {
    step: 2,
    description: "Your wallet app will open automatically.",
  },
  {
    step: 3,
    description: "Wait until the Lumexia connection menu appears in your wallet app.",
  },
  {
    step: 4,
    description: "Press the Connect or Approve button.",
  },
  {
    step: 5,
    description:
      'If you still receive a message saying "Open Phantom app" when you return to the app (game), press the Open button and wait until you see the message "Permissions granted, you can now return to the app."',
  },
]

function DetailedWalletGuide() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* PC Connection Section - Left Side */}
      <div className="bg-[#080414]/60 border border-[#00f0ff]/30 rounded-xl p-5 h-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-[#00f0ff] to-[#9d00ff] rounded-full flex items-center justify-center">
            <Monitor className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-[#00f0ff] font-bold text-lg uppercase">For PC Connection</h3>
            <p className="text-[#a19bb8] text-sm">Phantom or Solflare extension must be installed</p>
          </div>
        </div>

        <div className="space-y-3">
          {pcConnectionSteps.map((item) => (
            <div key={item.step} className="flex items-start gap-3">
              <div className="w-6 h-6 bg-[#00f0ff]/20 border border-[#00f0ff]/50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-[#00f0ff] font-bold text-xs">{item.step}</span>
              </div>
              <p className="text-white text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Connection Section - Right Side */}
      <div className="bg-[#080414]/60 border border-[#9d00ff]/30 rounded-xl p-5 h-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-[#9d00ff] to-[#00f0ff] rounded-full flex items-center justify-center">
            <Smartphone className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-[#9d00ff] font-bold text-lg uppercase">For Mobile Connection</h3>
            <p className="text-[#a19bb8] text-sm">Phantom app must be installed</p>
          </div>
        </div>

        <div className="space-y-3">
          {mobileConnectionSteps.map((item) => (
            <div key={item.step} className="flex items-start gap-3">
              <div className="w-6 h-6 bg-[#9d00ff]/20 border border-[#9d00ff]/50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-[#9d00ff] font-bold text-xs">{item.step}</span>
              </div>
              <p className="text-white text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function DetailedGameGuide() {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <div className="text-center mb-4">
          <span className="inline-block bg-[#00f0ff]/10 border border-[#00f0ff]/30 rounded-full px-4 py-1 text-[#00f0ff] font-bold text-sm uppercase tracking-wider">
            Game Controls
          </span>
        </div>

        {/* Game Controls Image */}
        <div className="rounded-xl overflow-hidden border-2 border-[#00f0ff]/50 shadow-lg shadow-[#00f0ff]/10">
          <img
            src="/images/gemini-generated-image-kavfunkavfunkavf.jpeg"
            alt="Lumexia Game Controls - Mobile: Tap screen to steer, NITRO button for speed. PC: Arrow keys to move, SPACE for nitro"
            className="w-full h-auto"
          />
        </div>
      </div>

      <div className="border-t border-[#00f0ff]/30 pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {gameSteps.map((step, index) => (
            <div key={index} className="bg-[#080414]/60 border border-[#9d00ff]/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-gradient-to-br from-[#00f0ff] to-[#9d00ff] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{index + 1}</span>
                </div>
                <span className="text-[#00f0ff] font-bold text-sm uppercase">Step {index + 1}</span>
              </div>
              <h4 className="text-white font-semibold mb-1">{step.title}</h4>
              <p className="text-[#a19bb8] text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function FaqSection() {
  const [openItem, setOpenItem] = useState<string | undefined>(undefined)

  useEffect(() => {
    const handleTriggerClick = () => {
      setOpenItem("item-1") // "How do I play the game?" is now at index 1
    }

    const trigger = document.getElementById("how-to-play-trigger")
    if (trigger) {
      trigger.addEventListener("click", handleTriggerClick)
    }

    return () => {
      if (trigger) {
        trigger.removeEventListener("click", handleTriggerClick)
      }
    }
  }, [])

  return (
    <section id="faq" className="py-10 bg-transparent">
      <div className="neon-border-box p-6 md:p-8 max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl sm:text-4xl font-black text-white mb-2 tracking-orbitron">
            PILOT&apos;S <span className="text-[#00f0ff] neon-text-cyan">HANDBOOK</span>
          </h2>
          <p className="text-xs text-[#a19bb8] tracking-widest uppercase mt-1 mb-4">FAQ</p>
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#00f0ff]/50 to-transparent mx-auto mb-4" />
          <p className="text-[#a19bb8] text-sm">Everything you need to know before hitting the track</p>
        </div>

        <button id="how-to-play-trigger" className="hidden" aria-hidden="true" />

        <Accordion type="single" collapsible className="space-y-4" value={openItem} onValueChange={setOpenItem}>
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-[#080414]/60 border border-white/10 rounded-lg px-6 data-[state=open]:border-[#00f0ff]/30 transition-colors duration-200"
            >
              <AccordionTrigger className="text-left text-gray-200 hover:text-[#00f0ff] hover:no-underline py-5 text-sm font-medium">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-[#a19bb8] pb-5 leading-relaxed text-sm">
                {faq.answer === "detailed_guide" ? (
                  <DetailedGameGuide />
                ) : faq.answer === "detailed_wallet_guide" ? (
                  <DetailedWalletGuide />
                ) : (
                  faq.answer
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
