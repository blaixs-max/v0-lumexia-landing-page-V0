// Single source of truth for the payment token (LMX on Solana).
//
// Mirrors the racing game's src/solana.config.js TOKEN_CONFIG so both
// projects stay in sync. When the active token changes, update both
// repos AND the Supabase Edge Function secrets:
//   - PAYMENT_TOKEN_MINT
//   - TOKEN_SYMBOL
//   - TOKEN_DECIMALS
//   - PAYMENT_RECEIVER (or PAYMENT_RECEIVER_ADDRESS)
//
// Sprint 8 token launch (2026-05-09): TOKABU → LMX. Re-launch on the
// same day moved the mint from 4U24...pump to ELaSG...pump.

export const TOKEN_CONFIG = {
  symbol: "LMX",
  mint: "ELaSGbXf6KMcw9wzyLgG78Tef6BLrHwkGpH5euLSpump",
  decimals: 6,
  chain: "Solana",
  explorerUrl:
    "https://solscan.io/token/ELaSGbXf6KMcw9wzyLgG78Tef6BLrHwkGpH5euLSpump",
  pumpFunUrl:
    "https://pump.fun/coin/ELaSGbXf6KMcw9wzyLgG78Tef6BLrHwkGpH5euLSpump",
  // Solana SPL Token program ID (same for all standard SPL tokens)
  programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
} as const;

export const PAYMENT_RECEIVER =
  "T6EkvAVdHPRr6Ngub1vk7VTzqtgw2KoGJwA8RCJmmGg";

// Wallets supported by the racing game (Solana wallet adapters).
// Used by FAQ, footer, and any wallet-recommendation UI.
export const SUPPORTED_WALLETS = [
  "Phantom",
  "Solflare",
  "Coinbase Wallet",
  "Trust Wallet",
] as const;

export type SupportedWallet = (typeof SUPPORTED_WALLETS)[number];

// Convenience helpers used by display components (Sprint 1.2-1.6).
export function shortMint(mint: string = TOKEN_CONFIG.mint): string {
  return `${mint.slice(0, 4)}...${mint.slice(-4)}`;
}

export function shortReceiver(addr: string = PAYMENT_RECEIVER): string {
  return `${addr.slice(0, 4)}...${addr.slice(-4)}`;
}
