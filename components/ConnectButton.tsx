"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import { truncateAddress } from "@/lib/faucets";

type Props = {
  onNeedWalletApp: () => void;
};

export function ConnectButton({ onNeedWalletApp }: Props) {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected && address) {
    return (
      <span className="flex items-center gap-2">
        <span
          className="rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm font-medium"
          title={address}
        >
          {truncateAddress(address)}
        </span>
        <button
          type="button"
          onClick={() => disconnect()}
          className="rounded-md px-2 py-2 text-sm text-neutral-500 underline underline-offset-2 hover:text-neutral-800"
        >
          Putuskan
        </button>
      </span>
    );
  }

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => {
        // Tanpa injected provider (misalnya dibuka di Chrome biasa di HP),
        // jangan panggil connect — tampilkan modal deep link ke aplikasi wallet.
        if (typeof window !== "undefined" && !window.ethereum) {
          onNeedWalletApp();
          return;
        }
        const injected = connectors[0];
        if (injected) {
          // wagmi connect tidak pernah me-reload halaman.
          connect({ connector: injected });
        }
      }}
      className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isPending ? "Menghubungkan…" : "Hubungkan Wallet"}
    </button>
  );
}
