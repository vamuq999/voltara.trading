import type { Metadata } from "next";
import "./globals.css";
import { TradeCoreProvider } from "@/context/TradeCoreContext";

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
        <TradeCoreProvider>{children}</TradeCoreProvider>
      </body>
    </html>
  );
}