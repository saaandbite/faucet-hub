export type Faucet = {
  name: string;
  networks: string[];
  gives: string;
  note?: string;
  url: string;
};

// Semua URL sudah dicek langsung (HTTP 200) pada 18 Nov 2026.
// Jumlah dan syarat dikutip dari halaman masing-masing faucet; halaman
// faucet itu sendiri yang menjadi sumber kebenaran terakhir.
export const FAUCETS: Faucet[] = [
  {
    name: "Chainlink Faucets",
    networks: ["Sepolia"],
    gives: "0,5 ETH Sepolia + 25 LINK testnet",
    note: "Perlu hubungkan wallet dan login GitHub di situs faucet.",
    url: "https://faucets.chain.link/sepolia",
  },
  {
    name: "Circle Faucet",
    networks: ["Sepolia", "Base Sepolia"],
    gives: "20 USDC testnet per klaim",
    note: "Satu klaim per 2 jam untuk tiap alamat dan jaringan.",
    url: "https://faucet.circle.com",
  },
  {
    name: "Alchemy Sepolia Faucet",
    networks: ["Sepolia"],
    gives: "0,1 ETH per 24 jam",
    note: "Butuh saldo mainnet minimal 0,001 ETH di alamat yang sama.",
    url: "https://sepoliafaucet.com",
  },
  {
    name: "Coinbase Base Sepolia Faucet",
    networks: ["Base Sepolia"],
    gives: "ETH testnet Base Sepolia",
    note: "Klaim langsung di situs Coinbase.",
    url: "https://coinbase.com/faucets/base-sepolia-faucet",
  },
  {
    name: "QuickNode Faucet",
    networks: ["Sepolia", "Base Sepolia"],
    gives: "0,05 ETH per 12 jam per jaringan",
    note: "Butuh saldo mainnet minimal 0,001 ETH di alamat yang sama.",
    url: "https://faucet.quicknode.com",
  },
];

export function truncateAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
