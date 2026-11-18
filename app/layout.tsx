import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Faucet Hub — Faucet Testnet Sepolia & Base Sepolia",
  description:
    "Satu halaman yang mengumpulkan faucet testnet tepercaya. Klaim dilakukan di situs faucet masing-masing.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="bg-neutral-50 text-neutral-900 antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
