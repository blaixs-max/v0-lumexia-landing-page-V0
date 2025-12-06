import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

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
    answer:
      "Once connected, select a track and race against other players. Use your keyboard or controller to navigate the track. Complete races to improve your ranking on the daily leaderboard.",
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

export function FaqSection() {
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

        {/* Accordion */}
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-gray-950 border border-gray-800 rounded-xl px-6 data-[state=open]:border-[#FFD700]/50"
            >
              <AccordionTrigger className="text-left text-white hover:text-[#FFD700] hover:no-underline py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-400 pb-5 leading-relaxed">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
