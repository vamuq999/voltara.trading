import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}