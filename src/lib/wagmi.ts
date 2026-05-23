import { http, createConfig } from "wagmi";
import { base, mainnet } from "wagmi/chains";
import { coinbaseWallet, injected, walletConnect } from "wagmi/connectors";

export const wagmiConfig = createConfig({
  chains: [mainnet, base],
  connectors: [
    coinbaseWallet({
      appName: "Voltara Trading",
    }),
    injected(),
    walletConnect({
      projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "demo",
      metadata: {
        name: "Voltara Trading",
        description: "Autonomous Multi-Agent Crypto Trading Infrastructure",
        url: "https://voltaratrading.vercel.app",
        icons: ["https://voltaratrading.vercel.app/favicon.ico"],
      },
    }),
  ],
  transports: {
    [mainnet.id]: http(process.env.NEXT_PUBLIC_ETH_RPC_URL),
    [base.id]: http(process.env.NEXT_PUBLIC_BASE_RPC_URL),
  },
});