"use client";

import { useEffect, useMemo, useState } from "react";
import BotCard from "@/components/cards/BotCard";

type BotStatus = "active" | "paused" | "boosted";

type Bot = {
  name: string;
  symbol: string;
  pnl: number;
  trades: number;
  boost: number;
  status: BotStatus;
  allocation: number;
};

const initialBots: Bot[] = [
  { name: "BTC TITAN", symbol: "BTC", pnl: 18.4, trades: 1284, boost: 6, status: "active", allocation: 100 },
  { name: "ETH REAPER", symbol: "ETH", pnl: 24.2, trades: 2241, boost: 9, status: "boosted", allocation: 150 },
  { name: "SOL RUNNER", symbol: "SOL", pnl: 12.1, trades: 842, boost: 4, status: "active", allocation: 75 },
  { name: "DOGE CHAOS", symbol: "DOGE", pnl: -2.4, trades: 381, boost: 1, status: "paused", allocation: 25 },
  { name: "XRP SENTINEL", symbol: "XRP", pnl: 7.8, trades: 654, boost: 3, status: "active", allocation: 50 },
  { name: "ADA ORACLE", symbol: "ADA", pnl: 4.3, trades: 489, boost: 2, status: "paused", allocation: 40 },
];

const ticker = ["BTC +2.4%", "ETH +5.1%", "SOL +8.8%", "DOGE -1.2%", "XRP +3.4%", "ADA +2.1%"];

const tradeMessages = [
  "BTC TITAN bought BTC",
  "ETH REAPER exited ETH",
  "SOL RUNNER detected breakout",
  "DOGE CHAOS paused trading",
  "XRP SENTINEL confirmed support",
  "ADA ORACLE scanned market state",
];

export default function Home() {
  const [bots, setBots] = useState(initialBots);
  const [selectedBot, setSelectedBot] = useState<Bot | null>(null);
  const [feed, setFeed] = useState(tradeMessages.slice(0, 4));

  useEffect(() => {
    const timer = setInterval(() => {
      const msg = tradeMessages[Math.floor(Math.random() * tradeMessages.length)];
      setFeed((prev) => [msg, ...prev].slice(0, 5));
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  const activeBots = bots.filter((bot) => bot.status !== "paused").length;

  const topBot = useMemo(() => {
    return [...bots].sort((a, b) => b.pnl - a.pnl)[0];
  }, [bots]);

  function activateBot(botName: string) {
    setBots((current) =>
      current.map((bot) =>
        bot.name === botName
          ? {
              ...bot,
              status: bot.status === "boosted" ? "active" : "boosted",
              boost: bot.status === "boosted" ? bot.boost : bot.boost + 1,
              trades: bot.trades + 37,
            }
          : bot
      )
    );
    setSelectedBot(null);
  }

  function pauseBot(botName: string) {
    setBots((current) =>
      current.map((bot) =>
        bot.name === botName
          ? {
              ...bot,
              status: "paused",
            }
          : bot
      )
    );
    setSelectedBot(null);
  }

  return (
    <main className="min-h-screen bg-[#050816] text-white overflow-x-hidden pb-28">
      <div className="border-b border-white/10 overflow-x-auto">
        <div className="flex min-w-max gap-8 px-6 py-4 text-sm text-zinc-300">
          {ticker.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-5 py-8">
        <section className="mb-10">
          <p className="mb-3 text-sm uppercase tracking-[0.35em] text-blue-300">TradeCore Online</p>

          <h1 className="text-5xl font-black leading-none tracking-tight md:text-7xl">
            VOLTARA
            <br />
            TRADING
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-zinc-400">
            Autonomous Multi-Agent Crypto Trading Infrastructure
          </p>
        </section>

        <section className="mb-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <div className="glass glow rounded-3xl p-5">
            <p className="text-sm text-zinc-400">Founder Vault</p>
            <h2 className="mt-3 text-3xl font-black">$48,221</h2>
          </div>

          <div className="glass glow rounded-3xl p-5">
            <p className="text-sm text-zinc-400">Daily P/L</p>
            <h2 className="mt-3 text-3xl font-black text-green-400">+$4,281</h2>
          </div>

          <div className="glass glow rounded-3xl p-5">
            <p className="text-sm text-zinc-400">Trades Today</p>
            <h2 className="mt-3 text-3xl font-black">8,421</h2>
          </div>

          <div className="glass glow rounded-3xl p-5">
            <p className="text-sm text-zinc-400">Active Bots</p>
            <h2 className="mt-3 text-3xl font-black">{activeBots}/10</h2>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-3">
          <div className="space-y-6 xl:col-span-2">
            <div className="glass glow rounded-3xl p-7">
              <h2 className="max-w-2xl text-4xl font-black leading-tight">
                Trade Smarter With Autonomous Agents
              </h2>

              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
                Deploy intelligent crypto trading bots, monitor live market activity,
                manage treasury systems and evolve your AI trading infrastructure in real time.
              </p>

              <button className="mt-8 rounded-2xl bg-blue-600 px-7 py-4 font-bold transition hover:bg-blue-500">
                Launch TradeCore
              </button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {bots.map((bot) => (
                <BotCard key={bot.name} bot={bot} onOpen={() => setSelectedBot(bot)} />
              ))}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="glass glow rounded-3xl p-6">
              <h2 className="mb-6 text-2xl font-bold">Founder Vault</h2>

              <div className="space-y-4">
                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="text-sm text-zinc-400">Available Balance</p>
                  <p className="mt-2 text-3xl font-black">$31,884</p>
                </div>

                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="text-sm text-zinc-400">Allocated To Bots</p>
                  <p className="mt-2 text-3xl font-black">$16,337</p>
                </div>

                <button className="w-full rounded-2xl bg-white/10 py-4 font-bold">
                  Connect Coinbase Wallet
                </button>
              </div>
            </div>

            <div className="glass glow rounded-3xl p-6">
              <h2 className="mb-6 text-2xl font-bold">Live Trade Feed</h2>

              <div className="space-y-3">
                {feed.map((trade, index) => (
                  <div key={`${trade}-${index}`} className="rounded-2xl bg-white/5 p-4 text-sm text-zinc-300">
                    {trade}
                  </div>
                ))}
              </div>
            </div>

            <div className="glass glow rounded-3xl p-6">
              <h2 className="mb-6 text-2xl font-bold">Top Performing Bot</h2>

              <div className="rounded-3xl border border-blue-500/20 bg-blue-600/10 p-6">
                <h3 className="text-3xl font-black">{topBot.name}</h3>
                <p className="mt-4 text-5xl font-black text-green-400">+{topBot.pnl}%</p>

                <div className="mt-6 space-y-2 text-zinc-300">
                  <p>Trades: {topBot.trades.toLocaleString()}</p>
                  <p>Boost Level: {topBot.boost}</p>
                  <p>Confidence: HIGH</p>
                </div>
              </div>
            </div>
          </aside>
        </section>

        <footer className="mt-20 pb-10 text-center text-zinc-500">
          <p className="text-lg font-semibold">Voltara Trading</p>
          <p className="mt-1 text-sm">Powered by TradeCore</p>
        </footer>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-black/70 backdrop-blur-xl">
        <div className="mx-auto grid max-w-xl grid-cols-4 text-center text-xs text-zinc-400">
          <button className="py-4 text-blue-300">Dashboard</button>
          <button className="py-4">Bots</button>
          <button className="py-4">Vault</button>
          <button className="py-4">Analytics</button>
        </div>
      </nav>

      {selectedBot && (
        <div className="fixed inset-0 z-50 flex items-end bg-black/70 p-4 backdrop-blur-sm md:items-center md:justify-center">
          <div className="glass glow w-full max-w-lg rounded-3xl p-6">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-blue-300">Bot Control</p>
                <h2 className="mt-2 text-3xl font-black">{selectedBot.name}</h2>
              </div>

              <button onClick={() => setSelectedBot(null)} className="rounded-full bg-white/10 px-4 py-2">
                Close
              </button>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl bg-white/5 p-4">
                <p className="text-sm text-zinc-400">Allocated Capital</p>
                <p className="mt-2 text-3xl font-black">${selectedBot.allocation}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="text-sm text-zinc-400">P/L</p>
                  <p className={selectedBot.pnl >= 0 ? "mt-2 text-2xl font-black text-green-400" : "mt-2 text-2xl font-black text-red-400"}>
                    {selectedBot.pnl > 0 ? "+" : ""}
                    {selectedBot.pnl}%
                  </p>
                </div>

                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="text-sm text-zinc-400">Boost</p>
                  <p className="mt-2 text-2xl font-black">{selectedBot.boost}</p>
                </div>
              </div>

              <div className="rounded-2xl bg-white/5 p-4">
                <p className="text-sm text-zinc-400">Strategy Mode</p>
                <div className="mt-3 grid grid-cols-3 gap-2 text-sm">
                  <button className="rounded-xl bg-white/10 py-3">Safe</button>
                  <button className="rounded-xl bg-blue-600 py-3 font-bold">Balanced</button>
                  <button className="rounded-xl bg-white/10 py-3">Aggro</button>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                onClick={() => activateBot(selectedBot.name)}
                className="rounded-2xl bg-blue-600 py-4 font-bold"
              >
                Boost / Activate
              </button>

              <button
                onClick={() => pauseBot(selectedBot.name)}
                className="rounded-2xl bg-red-500/80 py-4 font-bold"
              >
                Pause Bot
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}