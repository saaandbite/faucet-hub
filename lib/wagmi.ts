import { http, createConfig } from "wagmi";
import { sepolia, baseSepolia } from "wagmi/chains";
// injected tinggal di @wagmi/core; impor dari sana supaya bundler tidak
// menarik barrel wagmi/connectors (baseAccount -> @coinbase/cdp-sdk).
import { injected } from "@wagmi/core";

// Hanya injected connector (MetaMask dan wallet berbasis browser lainnya).
// Tidak ada WalletConnect, tidak ada project ID, tidak ada API key.
export const config = createConfig({
  chains: [sepolia, baseSepolia],
  connectors: [injected()],
  transports: {
    [sepolia.id]: http(),
    [baseSepolia.id]: http(),
  },
  ssr: true,
});

export type EthereumProvider = {
  request: (args: {
    method: string;
    params?: unknown[];
  }) => Promise<unknown>;
};

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}
