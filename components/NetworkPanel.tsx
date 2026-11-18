"use client";

import { useState } from "react";
import { useAccount, useSwitchChain } from "wagmi";
import { baseSepolia, sepolia } from "wagmi/chains";

type ChainParams = {
  chainId: string;
  chainName: string;
  nativeCurrency: { name: string; symbol: string; decimals: number };
  rpcUrls: string[];
  blockExplorerUrls: string[];
};

const CHAIN_PARAMS: Record<number, ChainParams> = {
  [sepolia.id]: {
    chainId: "0xaa36a7",
    chainName: "Sepolia",
    nativeCurrency: { name: "Sepolia Ether", symbol: "ETH", decimals: 18 },
    rpcUrls: ["https://ethereum-sepolia-rpc.publicnode.com"],
    blockExplorerUrls: ["https://sepolia.etherscan.io"],
  },
  [baseSepolia.id]: {
    chainId: "0x14a34",
    chainName: "Base Sepolia",
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    rpcUrls: ["https://sepolia.base.org"],
    blockExplorerUrls: ["https://sepolia.basescan.org"],
  },
};

const CHAINS = [
  { id: sepolia.id, label: "Sepolia", chainIdDecimal: 11155111 },
  { id: baseSepolia.id, label: "Base Sepolia", chainIdDecimal: 84532 },
];

export function NetworkPanel() {
  const { chain, isConnected } = useAccount();
  const { switchChainAsync, isPending } = useSwitchChain();
  const [switchingId, setSwitchingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function switchTo(chainId: number) {
    setError(null);
    setSwitchingId(chainId);
    try {
      await switchChainAsync({ chainId });
    } catch {
      // Wallet belum punya jaringan ini (error 4902): tambahkan dulu,
      // lalu coba pindah lagi. Semua tanpa reload halaman.
      try {
        const params = CHAIN_PARAMS[chainId];
        await window.ethereum?.request({
          method: "wallet_addEthereumChain",
          params: [params],
        });
        await switchChainAsync({ chainId });
      } catch {
        setError("Gagal pindah jaringan. Coba lagi atau tambah manual di wallet.");
      }
    } finally {
      setSwitchingId(null);
    }
  }

  const badge = !isConnected
    ? "Belum terhubung"
    : chain?.id === sepolia.id
      ? "Sepolia — chain 11155111"
      : chain?.id === baseSepolia.id
        ? "Base Sepolia — chain 84532"
        : `Jaringan lain: ${chain?.name ?? "tidak dikenal"} (chain ${chain?.id})`;

  return (
    <section className="rounded-lg border border-neutral-200 bg-white p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold">Jaringan aktif</h2>
          <p className="mt-1 text-sm text-neutral-600">{badge}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {CHAINS.map((c) => (
            <button
              key={c.id}
              type="button"
              disabled={!isConnected || isPending}
              onClick={() => switchTo(c.id)}
              className="rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm font-medium hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-50"
              title={
                !isConnected ? "Hubungkan wallet dulu" : `Pindah ke ${c.label}`
              }
            >
              {switchingId === c.id
                ? "Memindahkan…"
                : `Pindah ke ${c.label}`}
            </button>
          ))}
        </div>
      </div>
      {!isConnected && (
        <p className="mt-3 text-sm text-neutral-500">
          Hubungkan wallet dulu untuk pindah jaringan.
        </p>
      )}
      {error && <p className="mt-3 text-sm text-red-700">{error}</p>}
    </section>
  );
}
