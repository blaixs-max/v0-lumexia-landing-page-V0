"use client"

import { useState, useEffect } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Wallet, Gamepad2, Users, Coins } from "lucide-react"

const faqs = [
  {
    question: "Where can I buy $LMX tokens?",
    answer:
      "$LMX tokens are available on PancakeSwap. Connect your wallet, ensure you have BNB for gas fees, and swap for $LMX using our official contract address. Always verify the contract address on our official channels to avoid scams.",
  },
  {
    question: "How do I connect my wallet?",
    answer:
      "Click the 'START ENGINE' button to launch the game. You'll be prompted to connect a BSC-compatible wallet like MetaMask, Trust Wallet, or WalletConnect. Ensure your wallet is set to the Binance Smart Chain network.",
  },
  {
    question: "How do I play the game?",
    answer: "detailed_guide", // Special marker for detailed guide
  },
  {
    question: "How do I earn tokens?",
    answer:
      "Finish in the top 100 on the daily leaderboard to earn automatic $LMX airdrops. Payouts are executed via secure smart contracts at the end of each day (00:00 UTC). The higher your rank, the more you earn.",
  },
  {
    question: "I have a problem, how can I contact you?",
    answer:
      "Join our Discord community for immediate support from our team and fellow racers. You can also reach us on Twitter/X for updates and announcements. Our support team typically responds within 24 hours.",
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

function DetailedGameGuide() {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <div className="text-center mb-4">
          <span className="inline-block bg-[#FFD700]/10 border border-[#FFD700]/30 rounded-full px-4 py-1 text-[#FFD700] font-bold text-sm uppercase tracking-wider">
            Game Controls
          </span>
        </div>

        {/* Game Controls Image */}
        <div className="rounded-xl overflow-hidden border-2 border-[#FFD700]/50 shadow-lg shadow-[#FFD700]/10">
          <img
            src="/images/gemini-generated-image-kavfunkavfunkavf.jpeg"
            alt="Lumexia Game Controls - Mobile: Tap screen to steer, NITRO button for speed. PC: Arrow keys to move, SPACE for nitro"
            className="w-full h-auto"
          />
        </div>
      </div>

      <div className="border-t border-[#FFD700]/30 pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {gameSteps.map((step, index) => (
            <div key={index} className="bg-black/50 border border-[#FFD700]/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-[#FFD700] rounded-full flex items-center justify-center">
                  <span className="text-black font-bold text-sm">{index + 1}</span>
                </div>
                <span className="text-[#FFD700] font-bold text-sm uppercase">Step {index + 1}</span>
              </div>
              <h4 className="text-white font-semibold mb-1">{step.title}</h4>
              <p className="text-gray-400 text-sm">{step.description}</p>
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
      setOpenItem("item-2") // "How do I play the game?" is index 2
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
    <section id="faq" className="py-24 bg-black">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4">
            PILOT'S <span className="text-[#FFD700]">HANDBOOK</span>
            <span className="text-gray-500 text-2xl ml-3">(FAQ)</span>
          </h2>
          <p className="text-gray-400">Everything you need to know before hitting the track</p>
        </div>

        <button id="how-to-play-trigger" className="hidden" aria-hidden="true" />

        <Accordion type="single" collapsible className="space-y-4" value={openItem} onValueChange={setOpenItem}>
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-gray-950 border border-gray-800 rounded-xl px-6 data-[state=open]:border-[#FFD700]/50"
            >
              <AccordionTrigger className="text-left text-white hover:text-[#FFD700] hover:no-underline py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-400 pb-5 leading-relaxed">
                {faq.answer === "detailed_guide" ? <DetailedGameGuide /> : faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
