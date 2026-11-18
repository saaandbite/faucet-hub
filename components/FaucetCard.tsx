"use client";

import { useEffect, useRef, useState } from "react";
import type { Faucet } from "@/lib/faucets";

type Props = {
  faucet: Faucet;
  address?: string;
  isConnected: boolean;
};

export function FaucetCard({ faucet, address, isConnected }: Props) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  async function copyAddress() {
    if (!address) return;
    try {
      await navigator.clipboard.writeText(address);
    } catch {
      // Fallback untuk browser tanpa izin clipboard.
      const el = document.createElement("textarea");
      el.value = address;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  }

  return (
    <article className="flex flex-col rounded-lg border border-neutral-200 bg-white p-4">
      <div className="flex flex-wrap gap-1.5">
        {faucet.networks.map((n) => (
          <span
            key={n}
            className="rounded-full border border-neutral-300 px-2 py-0.5 text-xs font-medium text-neutral-700"
          >
            {n}
          </span>
        ))}
      </div>

      <h3 className="mt-3 text-base font-semibold">{faucet.name}</h3>
      <p className="mt-1 text-sm text-neutral-800">{faucet.gives}</p>
      {faucet.note && (
        <p className="mt-1 text-sm text-neutral-500">{faucet.note}</p>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        <a
          href={faucet.url}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md bg-neutral-900 px-3 py-2 text-sm font-medium text-white hover:bg-neutral-700"
        >
          Buka Faucet
        </a>
        <button
          type="button"
          disabled={!isConnected}
          onClick={copyAddress}
          title={
            isConnected
              ? "Salin alamat wallet yang terhubung"
              : "Hubungkan wallet dulu"
          }
          className="rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm font-medium hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {copied ? "Disalin" : "Salin alamat"}
        </button>
      </div>
      {!isConnected && (
        <p className="mt-2 text-xs text-neutral-500">
          Hubungkan wallet dulu untuk menyalin alamat.
        </p>
      )}
    </article>
  );
}
