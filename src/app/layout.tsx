import type { Metadata } from "next";
import "./globals.css";
import { TradeCoreProvider } from "@/context/TradeCoreContext";
import Web3Provider from "@/components/providers/Web3Provider";

export const metadata: Metadata = {
  title: "Voltara Trading",
  description: "Autonomous Multi-Agent Crypto Trading Infrastructure",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Web3Provider>
          <TradeCoreProvider>{children}</TradeCoreProvider>
        </Web3Provider>
      </body>
    </html>
  );
}