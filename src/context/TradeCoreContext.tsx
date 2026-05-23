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

export type PaperTrade = {
  id: string;
  bot: string;
  symbol: string;
  side: "BUY" | "SELL" | "HOLD";
  price: number;
  confidence: number;
  thesis: string;
  time: string;
};

type TradeCoreContextType = {
  vault: number;
  bots: Bot[];
  trades: PaperTrade[];
  deployBot: () => void;
  toggleBot: (name: string) => void;
  addPaperTrade: (trade: PaperTrade) => void;
};

const TradeCoreContext = createContext<TradeCoreContextType | null>(null);

export function TradeCoreProvider({ children }: { children: ReactNode }) {
  const [vault, setVault] = useState(48221);

  const [trades, setTrades] = useState<PaperTrade[]>([]);

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

  function addPaperTrade(trade: PaperTrade) {
    setTrades((prev) => [trade, ...prev].slice(0, 20));

    setBots((prev) =>
      prev.map((bot) =>
        bot.symbol === trade.symbol
          ? {
              ...bot,
              trades: bot.trades + 1,
              boost: trade.confidence > 80 ? bot.boost + 1 : bot.boost,
              pl:
                trade.side === "BUY"
                  ? Number((bot.pl + Math.random() * 0.4).toFixed(2))
                  : trade.side === "SELL"
                  ? Number((bot.pl + Math.random() * 0.25).toFixed(2))
                  : bot.pl,
            }
          : bot
      )
    );
  }

  return (
    <TradeCoreContext.Provider
      value={{
        vault,
        bots,
        trades,
        deployBot,
        toggleBot,
        addPaperTrade,
      }}
    >
      {children}
    </TradeCoreContext.Provider>
  );
}

export function useTradeCore() {
  const context = useContext(TradeCoreContext);
  if (!context) throw new Error("useTradeCore must be used inside TradeCoreProvider");
  return context;
}