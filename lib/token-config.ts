// Single source of truth for the payment token (TOKABU on Solana).
//
// Mirrors the racing game's src/solana.config.js TOKEN_CONFIG so both
// projects stay in sync. When the active token changes, update both
// repos AND the Supabase Edge Function secrets:
//   - PAYMENT_TOKEN_MINT
//   - TOKEN_SYMBOL
//   - TOKEN_DECIMALS
//   - PAYMENT_RECEIVER (or PAYMENT_RECEIVER_ADDRESS)

export const TOKEN_CONFIG = {
  symbol: "TOKABU",
  mint: "H8xQ6poBjB9DTPMDTKWzWPrnxu4bDEhybxiouF8Ppump",
  decimals: 6,
  chain: "Solana",
  explorerUrl:
    "https://solscan.io/token/H8xQ6poBjB9DTPMDTKWzWPrnxu4bDEhybxiouF8Ppump",
  pumpFunUrl:
    "https://pump.fun/coin/H8xQ6poBjB9DTPMDTKWzWPrnxu4bDEhybxiouF8Ppump",
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
