import { ImageResponse } from "next/og"
import { TOKEN_CONFIG } from "@/lib/token-config"

export const runtime = "edge"

export const alt = `Lumexia — Blockchain Racing Game on ${TOKEN_CONFIG.chain}`
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "radial-gradient(ellipse at top right, rgba(157, 0, 255, 0.35) 0%, transparent 60%), radial-gradient(ellipse at bottom left, rgba(0, 240, 255, 0.25) 0%, transparent 60%), #080414",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "72px",
              height: "72px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, #9d00ff 0%, #00f0ff 100%)",
              fontSize: "44px",
              fontWeight: 900,
              color: "#080414",
              boxShadow: "0 0 40px rgba(157, 0, 255, 0.6)",
            }}
          >
            L
          </div>
          <span
            style={{
              fontSize: "32px",
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "0.08em",
            }}
          >
            LUMEXIA
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: "108px",
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            <span style={{ color: "#ffffff" }}>RACE FOR</span>
            <span
              style={{
                background: "linear-gradient(90deg, #D4AF37 0%, #FFD700 50%, #D4AF37 100%)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              GLORY
            </span>
          </div>
          <div
            style={{
              fontSize: "32px",
              fontWeight: 500,
              color: "#a19bb8",
              maxWidth: "900px",
              lineHeight: 1.3,
            }}
          >
            High-fidelity blockchain racing game on {TOKEN_CONFIG.chain}. Top the 48-hour cycle leaderboard, earn ${TOKEN_CONFIG.symbol} airdrops.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
            fontSize: "20px",
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          <span
            style={{
              padding: "10px 20px",
              borderRadius: "999px",
              border: "2px solid rgba(0, 240, 255, 0.5)",
              color: "#00f0ff",
              background: "rgba(0, 240, 255, 0.08)",
            }}
          >
            ${TOKEN_CONFIG.symbol} Token
          </span>
          <span
            style={{
              padding: "10px 20px",
              borderRadius: "999px",
              border: "2px solid rgba(157, 0, 255, 0.5)",
              color: "#9d00ff",
              background: "rgba(157, 0, 255, 0.08)",
            }}
          >
            {TOKEN_CONFIG.chain}
          </span>
          <span
            style={{
              padding: "10px 20px",
              borderRadius: "999px",
              border: "2px solid rgba(212, 175, 55, 0.5)",
              color: "#D4AF37",
              background: "rgba(212, 175, 55, 0.08)",
            }}
          >
            Play to Earn
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    },
  )
}
