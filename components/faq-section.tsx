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
      'If you still receive a message saying "Open MetaMask app" when you return to the app (game), press the Open button and wait until you see the message "Permissions granted, network changed, you can now return to the app."',
  },
]

function DetailedWalletGuide() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* PC Connection Section - Left Side */}
      <div className="bg-black/50 border border-[#FFD700]/30 rounded-xl p-5 h-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-[#FFD700] rounded-full flex items-center justify-center">
            <Monitor className="w-5 h-5 text-black" />
          </div>
          <div>
            <h3 className="text-[#FFD700] font-bold text-lg uppercase">For PC Connection</h3>
            <p className="text-gray-400 text-sm">MetaMask Extension must be installed</p>
          </div>
        </div>

        <div className="space-y-3">
          {pcConnectionSteps.map((item) => (
            <div key={item.step} className="flex items-start gap-3">
              <div className="w-6 h-6 bg-[#FFD700]/20 border border-[#FFD700]/50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-[#FFD700] font-bold text-xs">{item.step}</span>
              </div>
              <p className="text-gray-300 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Connection Section - Right Side */}
      <div className="bg-black/50 border border-[#FFD700]/30 rounded-xl p-5 h-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-[#FFD700] rounded-full flex items-center justify-center">
            <Smartphone className="w-5 h-5 text-black" />
          </div>
          <div>
            <h3 className="text-[#FFD700] font-bold text-lg uppercase">For Mobile Connection</h3>
            <p className="text-gray-400 text-sm">MetaMask App must be installed</p>
          </div>
        </div>

        <div className="space-y-3">
          {mobileConnectionSteps.map((item) => (
            <div key={item.step} className="flex items-start gap-3">
              <div className="w-6 h-6 bg-[#FFD700]/20 border border-[#FFD700]/50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-[#FFD700] font-bold text-xs">{item.step}</span>
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
