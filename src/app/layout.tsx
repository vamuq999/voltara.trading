import type { Metadata } from "next";
import "./globals.css";

import Providers from "@/components/providers/WagmiProvider";
import BottomNav from "@/components/layout/BottomNav";

export const metadata: Metadata = {
  title: "Voltara Trading",
  description: "Real wallet + live market trading dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
          <BottomNav />
        </Providers>
      </body>
    </html>
  );
}