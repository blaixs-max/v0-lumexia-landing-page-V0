import type { MetadataRoute } from "next"
import { TOKEN_CONFIG } from "@/lib/token-config"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `Lumexia | Blockchain Racing Game on ${TOKEN_CONFIG.chain}`,
    short_name: "Lumexia",
    description: `Race for glory in Lumexia — the high-fidelity blockchain racing game on ${TOKEN_CONFIG.chain}. Top the 48-hour cycle leaderboard and earn $${TOKEN_CONFIG.symbol} airdrops.`,
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#080414",
    theme_color: "#080414",
    categories: ["games", "entertainment", "finance"],
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icon-dark-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
  }
}
