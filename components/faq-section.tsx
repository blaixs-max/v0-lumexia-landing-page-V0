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
      "$LMX tokens are available on Raydium. Connect your wallet, ensure you have SOL for gas fees, and swap for $LMX using our official contract address. Always verify the contract address on our official channels to avoid scams.",
  },
  {
    question: "How do I earn tokens?",
    answer:
      "Finish in the top 100 on the daily leaderboard to earn automatic $SOL airdrops. Payouts are executed via secure smart contracts at the end of each day (00:00 UTC). The higher your rank, the more you earn.",
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
      {/* PC Connection Section */}
      <div className="glass rounded-2xl p-5 h-full border border-cyan-500/20">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Monitor className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-cyan-400 font-bold text-lg uppercase">For PC Connection</h3>
            <p className="text-gray-400 text-sm">MetaMask Extension must be installed</p>
          </div>
        </div>

        <div className="space-y-3">
          {pcConnectionSteps.map((item) => (
            <div key={item.step} className="flex items-start gap-3">
              <div className="w-6 h-6 bg-cyan-500/20 border border-cyan-500/50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-cyan-400 font-bold text-xs">{item.step}</span>
              </div>
              <p className="text-gray-300 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Connection Section */}
      <div className="glass rounded-2xl p-5 h-full border border-purple-500/20">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
            <Smartphone className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-purple-400 font-bold text-lg uppercase">For Mobile Connection</h3>
            <p className="text-gray-400 text-sm">MetaMask App must be installed</p>
          </div>
        </div>

        <div className="space-y-3">
          {mobileConnectionSteps.map((item) => (
            <div key={item.step} className="flex items-start gap-3">
              <div className="w-6 h-6 bg-purple-500/20 border border-purple-500/50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
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
          <span className="inline-block bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-full px-4 py-1 text-cyan-400 font-bold text-sm uppercase tracking-wider">
            Game Controls
          </span>
        </div>

        <div className="rounded-2xl overflow-hidden border-2 border-cyan-500/30 shadow-lg shadow-cyan-500/10">
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
            <div key={index} className="glass rounded-xl p-4 border border-purple-500/20">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{index + 1}</span>
                </div>
                <span className="text-cyan-400 font-bold text-sm uppercase">Step {index + 1}</span>
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
    <section id="faq" className="py-24 relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 
            className="font-serif text-4xl sm:text-5xl font-bold mb-4"
            style={{ 
              background: "linear-gradient(135deg, #06b6d4 0%, #a78bfa 50%, #ec4899 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {"PILOT'S HANDBOOK "}
            <span className="text-gray-500 text-2xl">(FAQ)</span>
          </h2>
          <p className="text-gray-400">Everything you need to know before hitting the track</p>
        </div>

        <button id="how-to-play-trigger" className="hidden" aria-hidden="true" />

        <Accordion type="single" collapsible className="space-y-4" value={openItem} onValueChange={setOpenItem}>
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="rounded-xl px-6 data-[state=open]:border-cyan-500/50 transition-colors"
              style={{
                background: "linear-gradient(135deg, rgba(13, 13, 32, 0.95) 0%, rgba(20, 15, 50, 0.9) 100%)",
                border: "1px solid rgba(139, 92, 246, 0.3)"
              }}
            >
              <AccordionTrigger className="text-left text-white hover:text-cyan-400 hover:no-underline py-5 font-medium">
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
