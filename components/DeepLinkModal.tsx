"use client";

import { useEffect, useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

/**
 * Modal deep link: tampil hanya bila tidak ada injected provider.
 * Tidak memblokir daftar faucet — bisa ditutup kapan saja dan
 * daftar tetap bisa dijelajahi di balik modal.
 */
export function DeepLinkModal({ open, onClose }: Props) {
  const [deepLink, setDeepLink] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Tanpa protokol, sesuai format deep link MetaMask:
      // metamask.app.link/dapp/<host + path>
      setDeepLink(
        `https://metamask.app.link/dapp/${window.location.host}${window.location.pathname}`,
      );
    }
  }, []);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-label="Buka di aplikasi wallet"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-lg bg-white p-5 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-base font-semibold">Buka di aplikasi wallet</h2>
        <p className="mt-2 text-sm text-neutral-600">
          Browser ini tidak punya wallet crypto. Buka Faucet Hub di dalam
          aplikasi MetaMask supaya kamu bisa menghubungkan wallet dan klaim
          tanpa pindah-pindah.
        </p>

        <a
          href={deepLink}
          className="mt-4 block rounded-md bg-neutral-900 px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-neutral-700"
        >
          Buka di MetaMask
        </a>

        <a
          href="https://metamask.io/download/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 block rounded-md border border-neutral-300 px-4 py-2.5 text-center text-sm font-medium hover:bg-neutral-100"
        >
          Instal MetaMask (desktop)
        </a>

        <button
          type="button"
          onClick={onClose}
          className="mt-3 w-full rounded-md px-4 py-2 text-center text-sm text-neutral-500 underline underline-offset-2 hover:text-neutral-800"
        >
          Tutup — lihat daftar faucet dulu
        </button>
      </div>
    </div>
  );
}
