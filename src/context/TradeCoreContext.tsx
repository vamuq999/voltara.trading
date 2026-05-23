"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export type Bot = {
  name: string;
  symbol: string;
  active: boolean;
  pl: number;
  trades: number;
  boost: number;
  capital: number;
};

type TradeCoreContextType = {
  vault: number;
  bots: Bot[];
  deployBot: () => void;
  toggleBot: (name: string) => void;
};

const TradeCoreContext = createContext<TradeCoreContextType | null>(null);

export function TradeCoreProvider({ children }: { children: ReactNode }) {
  const [vault, setVault] = useState(48221);

  const [bots, setBots] = useState<Bot[]>([
    { name: "BTC TITAN", symbol: "BTC", active: true, pl: 18.4, trades: 1284, boost: 6, capital: 120 },
    { name: "ETH REAPER", symbol: "ETH", active: true, pl: 24.2, trades: 2241, boost: 9, capital: 240 },
    { name: "SOL RUNNER", symbol: "SOL", active: true, pl: 12.1, trades: 842, boost: 4, capital: 75 },
    { name: "DOGE CHAOS", symbol: "DOGE", active: false, pl: -2.4, trades: 381, boost: 1, capital: 25 },
    { name: "XRP SENTINEL", symbol: "XRP", active: true, pl: 7.8, trades: 654, boost: 3, capital: 50 },
  ]);

  function toggleBot(name: string) {
    setBots((prev) =>
      prev.map((bot) =>
        bot.name === name ? { ...bot, active: !bot.active } : bot
      )
    );
  }

  function deployBot() {
    const pool = [
      ["LINK WATCHER", "LINK"],
      ["ADA ORACLE", "ADA"],
      ["AVAX HUNTER", "AVAX"],
      ["ARB SHADOW", "ARB"],
      ["ATOM GHOST", "ATOM"],
    ];

    const pick = pool[Math.floor(Math.random() * pool.length)];

    setBots((prev) => [
      {
        name: pick[0],
        symbol: pick[1],
        active: true,
        pl: Number((Math.random() * 18).toFixed(1)),
        trades: Math.floor(Math.random() * 800) + 100,
        boost: Math.floor(Math.random() * 5) + 1,
        capital: 250,
      },
      ...prev,
    ]);

    setVault((prev) => prev - 250);
  }

  return (
    <TradeCoreContext.Provider value={{ vault, bots, deployBot, toggleBot }}>
      {children}
    </TradeCoreContext.Provider>
  );
}

export function useTradeCore() {
  const context = useContext(TradeCoreContext);
  if (!context) throw new Error("useTradeCore must be used inside TradeCoreProvider");
  return context;
}