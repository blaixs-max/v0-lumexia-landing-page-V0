"use client"

import { useState, useEffect } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Wallet, Gamepad2, Users, Coins, Monitor, Smartphone } from "lucide-react"

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
    question: "Where can I buy $LMX tokens?",
    answer:
      "$LMX tokens are available on PancakeSwap. Connect your wallet, ensure you have BNB for gas fees, and swap for $LMX using our official contract address. Always verify the contract address on our official channels to avoid scams.",
  },
  {
    question: "How do I earn tokens?",
    answer:
      "Finish in the top 100 on the daily leaderboard to earn automatic $BNB airdrops. Payouts are executed via secure smart contracts at the end of each day (00:00 UTC). The higher your rank, the more you earn.",
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
    description: "Connect your BSC-compatible wallet (MetaMask, Trust Wallet, etc.)",
  },
  {
    icon: Gamepad2,
    title: "Select Game Mode",
    description: "Choose between Classic or Double or Nothing mode",
  },
  {
    icon: Users,
    title: "Select Daily Team",
    description: "Join a team - the team with the most points each day wins an extra prize!",
  },
  {
    icon: Coins,
    title: "Get Credits",
    description: "Purchase credits or enter the game with your existing credits",
  },
]

const pcConnectionSteps = [
  { step: 1, description: "Press the Connect Wallet button." },
  { step: 2, description: "Your wallet application will open automatically." },
  { step: 3, description: "Wait until the Lumexia connection menu appears in your wallet application." },
  { step: 4, description: "Press the Connect or Approve button." },
]

const mobileConnectionSteps = [
  { step: 1, description: "Press the Connect Wallet button." },
  { step: 2, description: "Your wallet app will open automatically." },
  { step: 3, description: "Wait until the Lumexia connection menu appears in your wallet app." },
  { step: 4, description: "Press the Connect or Approve button." },
  {
    step: 5,
    description:
      'If you still receive a message saying "Open MetaMask app" when you return to the app (game), press the Open button and wait until you see the message "Permissions granted, network changed, you can now return to the app."',
  },
]

function DetailedWalletGuide() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* PC Connection */}
      <div className="bg-[#0f0f1f]/80 border border-purple-500/30 rounded-xl p-5 h-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center">
            <Monitor className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-purple-300 font-bold text-base uppercase tracking-wide">For PC Connection</h3>
            <p className="text-gray-500 text-xs">MetaMask Extension must be installed</p>
          </div>
        </div>
        <div className="space-y-3">
          {pcConnectionSteps.map((item) => (
            <div key={item.step} className="flex items-start gap-3">
              <div className="w-6 h-6 bg-purple-500/15 border border-purple-500/40 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-purple-400 font-bold text-xs">{item.step}</span>
              </div>
              <p className="text-gray-300 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Connection */}
      <div className="bg-[#0f0f1f]/80 border border-purple-500/30 rounded-xl p-5 h-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-cyan-600 rounded-full flex items-center justify-center">
            <Smartphone className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-purple-300 font-bold text-base uppercase tracking-wide">For Mobile Connection</h3>
            <p className="text-gray-500 text-xs">MetaMask App must be installed</p>
          </div>
        </div>
        <div className="space-y-3">
          {mobileConnectionSteps.map((item) => (
            <div key={item.step} className="flex items-start gap-3">
              <div className="w-6 h-6 bg-purple-500/15 border border-purple-500/40 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-purple-400 font-bold text-xs">{item.step}</span>
              </div>
              <p className="text-gray-300 text-sm">{item.description}</p>
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
          <span className="inline-block bg-purple-500/10 border border-purple-500/30 rounded-full px-4 py-1 text-purple-300 font-bold text-sm uppercase tracking-wider">
            Game Controls
          </span>
        </div>
        <div className="rounded-xl overflow-hidden border-2 border-purple-500/40 shadow-lg shadow-purple-500/10">
          <img
            src="/images/gemini-generated-image-kavfunkavfunkavf.jpeg"
            alt="Lumexia Game Controls - Mobile: Tap screen to steer, NITRO button for speed. PC: Arrow keys to move, SPACE for nitro"
            className="w-full h-auto"
          />
        </div>
      </div>

      <div className="border-t border-purple-500/20 pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {gameSteps.map((step, index) => (
            <div key={index} className="bg-[#0f0f1f]/80 border border-purple-500/25 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{index + 1}</span>
                </div>
                <span className="text-purple-400 font-bold text-xs uppercase tracking-wide">Step {index + 1}</span>
              </div>
              <h4 className="text-white font-semibold mb-1 text-sm">{step.title}</h4>
              <p className="text-gray-400 text-xs">{step.description}</p>
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
      setOpenItem("item-1")
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
    <section id="faq" className="py-24 cyberpunk-bg relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-600/6 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-purple-400/70 text-xs tracking-[0.3em] uppercase font-medium mb-3">Support</p>
          <h2 className="font-serif text-4xl sm:text-5xl font-black mb-4 tracking-orbitron">
            <span className="text-white">PILOT&apos;S </span>
            <span className="gradient-text">HANDBOOK</span>
            <span className="text-gray-500 text-2xl ml-3">(FAQ)</span>
          </h2>
          <p className="text-gray-400 text-sm">Everything you need to know before hitting the track</p>
        </div>

        <button id="how-to-play-trigger" className="hidden" aria-hidden="true" />

        <Accordion type="single" collapsible className="space-y-3" value={openItem} onValueChange={setOpenItem}>
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-[#0f0f1f]/80 border border-purple-500/20 rounded-xl px-6 data-[state=open]:border-purple-500/50 data-[state=open]:shadow-[0_0_20px_rgba(147,51,234,0.1)] transition-all duration-200"
            >
              <AccordionTrigger className="text-left text-white hover:text-purple-300 hover:no-underline py-5 text-sm font-medium">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-400 pb-5 leading-relaxed text-sm">
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
