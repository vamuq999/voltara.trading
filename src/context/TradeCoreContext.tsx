"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

type Bot = {
  name: string;
  active: boolean;
  pl: number;
  capital: number;
};

type TradeCoreContextType = {
  vault: number;
  setVault: (value: number) => void;

  bots: Bot[];

  toggleBot: (name: string) => void;

  deployBot: () => void;
};

const TradeCoreContext =
  createContext<TradeCoreContextType | null>(null);

export function TradeCoreProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [vault, setVault] = useState(48221);

  const [bots, setBots] = useState<Bot[]>([
    {
      name: "BTC TITAN",
      active: true,
      pl: 18.4,
      capital: 120,
    },
    {
      name: "ETH REAPER",
      active: true,
      pl: 24.2,
      capital: 240,
    },
    {
      name: "SOL RUNNER",
      active: true,
      pl: 12.1,
      capital: 75,
    },
    {
      name: "DOGE CHAOS",
      active: false,
      pl: -2.4,
      capital: 25,
    },
  ]);

  function toggleBot(name: string) {
    setBots((prev) =>
      prev.map((bot) =>
        bot.name === name
          ? {
              ...bot,
              active: !bot.active,
            }
          : bot
      )
    );
  }

  function deployBot() {
    const randomNames = [
      "LINK WATCHER",
      "ADA ORACLE",
      "ATOM GHOST",
      "AVAX HUNTER",
      "ARB SHADOW",
    ];

    const newBot = {
      name:
        randomNames[
          Math.floor(Math.random() * randomNames.length)
        ],

      active: true,

      pl: Number(
        (Math.random() * 18).toFixed(1)
      ),

      capital: Math.floor(Math.random() * 300),
    };

    setBots((prev) => [newBot, ...prev]);

    setVault((prev) => prev - 250);
  }

  return (
    <TradeCoreContext.Provider
      value={{
        vault,
        setVault,
        bots,
        toggleBot,
        deployBot,
      }}
    >
      {children}
    </TradeCoreContext.Provider>
  );
}

export function useTradeCore() {
  const context = useContext(TradeCoreContext);

  if (!context) {
    throw new Error(
      "useTradeCore must be used inside provider"
    );
  }

  return context;
}