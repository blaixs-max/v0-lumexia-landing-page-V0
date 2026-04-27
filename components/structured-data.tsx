const SITE_URL = "https://lumexia.net"
const SITE_NAME = "Lumexia"
const SITE_DESCRIPTION =
  "Race for glory in Lumexia — the high-fidelity blockchain racing game on Binance Smart Chain. Climb the daily leaderboard, top the top 100, and earn automatic $LMX airdrops."

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/images/lumexia-logo.png`,
    width: 512,
    height: 512,
  },
  sameAs: ["https://x.com/lumexia_project", "https://game.lumexia.net"],
}

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  publisher: {
    "@id": `${SITE_URL}/#organization`,
  },
  inLanguage: "en-US",
}

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "@id": `${SITE_URL}/#videogame`,
  name: "Lumexia",
  alternateName: "Lumexia Racing",
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  image: `${SITE_URL}/images/lumexia-logo.png`,
  genre: ["Racing", "Blockchain", "Play to Earn"],
  gamePlatform: ["Web Browser", "Mobile Web", "PC"],
  operatingSystem: ["Web", "iOS", "Android", "Windows", "macOS"],
  applicationCategory: "Game",
  playMode: "SinglePlayer",
  inLanguage: "en-US",
  publisher: {
    "@id": `${SITE_URL}/#organization`,
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    url: "https://game.lumexia.net",
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I connect my wallet?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "On PC, install the MetaMask browser extension, press the Connect Wallet button on Lumexia, and approve the connection in your wallet. On mobile, install the MetaMask app, press Connect Wallet — your wallet app will open automatically. Approve the request and return to the game when you see the confirmation that permissions are granted and the network has switched to BNB Smart Chain.",
      },
    },
    {
      "@type": "Question",
      name: "How do I play the game?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Connect a BSC-compatible wallet (MetaMask, Trust Wallet, etc.), choose a game mode (Classic or Double or Nothing), join a daily team, get credits, and start racing. On mobile, tap the screen to steer and press the NITRO button for speed. On PC, use arrow keys to move and SPACE for nitro.",
      },
    },
    {
      "@type": "Question",
      name: "Where can I buy $LMX tokens?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "$LMX tokens are available on PancakeSwap. Connect your wallet, ensure you have BNB for gas fees, and swap for $LMX using our official contract address. Always verify the contract address on our official channels to avoid scams.",
      },
    },
    {
      "@type": "Question",
      name: "How do I earn tokens?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Finish in the top 100 on the daily leaderboard to earn automatic $LMX airdrops. Payouts are executed via secure smart contracts at the end of each day (00:00 UTC). The higher your rank, the more you earn.",
      },
    },
    {
      "@type": "Question",
      name: "I have a problem, how can I contact you?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Join our X community for immediate support. You can reach us on Twitter for updates, announcements, and support. Our support team typically responds within 24 hours.",
      },
    },
  ],
}

export function StructuredData() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  )
}
