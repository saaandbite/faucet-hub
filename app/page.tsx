"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { ConnectButton } from "@/components/ConnectButton";
import { NetworkPanel } from "@/components/NetworkPanel";
import { FaucetCard } from "@/components/FaucetCard";
import { DeepLinkModal } from "@/components/DeepLinkModal";
import { FAUCETS, truncateAddress } from "@/lib/faucets";

function isMobileDevice(): boolean {
  if (typeof navigator === "undefined") return false;
  return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

export default function Home() {
  const { address, isConnected } = useAccount();
  const [modalOpen, setModalOpen] = useState(false);

  // Tampilkan modal deep link otomatis hanya bila: perangkat mobile dan
  // tidak ada injected provider. Modal bisa ditutup; daftar faucet tetap
  // bisa dijelajahi.
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      !window.ethereum &&
      isMobileDevice()
    ) {
      setModalOpen(true);
    }
  }, []);

  return (
    <div className="min-h-screen">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-4">
          <div>
            <p className="text-lg font-bold leading-tight">Faucet Hub</p>
            <p className="text-sm text-neutral-600">
              Satu halaman untuk faucet testnet tepercaya — klaim tetap
              dilakukan di situs faucet masing-masing, sesuai aturan anti-bot
              mereka.
            </p>
          </div>
          <ConnectButton onNeedWalletApp={() => setModalOpen(true)} />
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6">
        {isConnected && address && (
          <p className="mb-4 rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm">
            Wallet terhubung:{" "}
            <span className="font-mono font-medium">
              {truncateAddress(address)}
            </span>
          </p>
        )}

        <NetworkPanel />

        <section className="mt-8">
          <h2 className="text-base font-semibold">Cara pakai</h2>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-neutral-700">
            <li>Hubungkan wallet (tanpa refresh halaman).</li>
            <li>Pindah ke jaringan yang sesuai dengan faucet yang kamu mau.</li>
            <li>
              Buka faucet, lalu klaim di situsnya — Faucet Hub tidak
              menyimpan token dan tidak memungut apa pun.
            </li>
          </ol>
        </section>

        <section className="mt-8">
          <h2 className="text-base font-semibold">Daftar faucet</h2>
          <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {FAUCETS.map((faucet) => (
              <FaucetCard
                key={faucet.name}
                faucet={faucet}
                address={address}
                isConnected={isConnected}
              />
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-neutral-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-6">
          <p className="text-sm text-neutral-500">
            Token testnet tidak memiliki nilai uang dan hanya dipakai untuk
            pengujian. Jumlah dan syarat klaim dapat berubah — halaman faucet
            masing-masing adalah sumber kebenaran terakhir.
          </p>
        </div>
      </footer>

      <DeepLinkModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
