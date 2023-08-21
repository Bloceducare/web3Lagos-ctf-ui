import ParticleWrapper from "@/components/Particle";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { createPublicClient, http } from "viem";
import { WagmiConfig, createConfig, mainnet } from "wagmi";

export default function App({ Component, pageProps }: AppProps) {
  const config = createConfig({
    autoConnect: true,
    publicClient: createPublicClient({
      chain: mainnet,
      transport: http(),
    }),
  });

  return (
    <WagmiConfig config={config}>
      <div className="background-container">
        <ParticleWrapper />
      </div>
      <Component {...pageProps} />
    </WagmiConfig>
  );
}
