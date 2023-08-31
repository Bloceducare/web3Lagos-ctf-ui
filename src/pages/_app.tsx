import ParticleWrapper from "@/components/Particle";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { createPublicClient, http } from "viem";
import { WagmiConfig, configureChains, createConfig, mainnet } from "wagmi";
import localFont from "next/font/local";
import { NotificationProvider } from "../../context/notification";
const myfont = localFont({
  src: "../../public/fonts/stalker1.ttf",
  variable: "--font-ocra",
});
export default function App({ Component, pageProps }: AppProps) {
  const config = createConfig({
    autoConnect: true,
    publicClient: createPublicClient({
      chain: mainnet,
      transport: http(
        "https://rpc.tenderly.co/fork/f099bdfc-045d-4ca3-bb9d-8d59985ad6cf"
      ),
    }),
  });

  return (
    <WagmiConfig config={config}>
      <div className={`background-container`}>
        <ParticleWrapper />
      </div>
      <NotificationProvider>
        <main className={`${myfont.variable}`}>
          <Component {...pageProps} />
        </main>
      </NotificationProvider>
    </WagmiConfig>
  );
}
