"use client";

import { useEffect, useMemo, useState } from "react";
import { useTradeCore } from "@/context/TradeCoreContext";
import BottomNav from "@/components/layout/BottomNav";
import Ticker from "@/components/layout/Ticker";

export default function HomePage() {
  const { vault, bots, deployBot, toggleBot } = useTradeCore();
  const [feed, setFeed] = useState(["TradeCore kernel online.", "ETH REAPER confidence: HIGH."]);

  const events = [
    "SOL RUNNER detected breakout",
    "BTC TITAN bought BTC",
    "ETH REAPER exited ETH",
    "XRP SENTINEL confirmed support",
    "Treasury engine reallocating liquidity",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const random = events[Math.floor(Math.random() * events.length)];
      setFeed((prev) => [random, ...prev.slice(0, 5)]);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const activeBots = bots.filter((bot) => bot.active).length;
  const totalTrades = bots.reduce((acc, bot) => acc + bot.trades, 0);
  const dailyPL = bots.reduce((acc, bot) => acc + bot.pl, 0);
  const topBot = useMemo(() => [...bots].sort((a, b) => b.pl - a.pl)[0], [bots]);

  return (
    <main className="min-h-screen bg-black pb-32 text-white">
      <Ticker />

      <div className="px-6 pt-24">
        <p className="mb-3 text-sm tracking-[0.5em] text-blue-300">TRADECORE ONLINE</p>

        <h1 className="mb-6 text-6xl font-black leading-none">
          VOLTARA
          <br />
          TRADING
        </h1>

        <p className="mb-8 text-xl leading-relaxed text-zinc-400">
          Autonomous Multi-Agent Crypto Trading Infrastructure
        </p>

        <section className="mb-8 grid grid-cols-2 gap-4">
          <Stat title="Founder Vault" value={`$${vault.toLocaleString()}`} />
          <Stat title="Daily P/L" value={`+${dailyPL.toFixed(1)}%`} green />
          <Stat title="Trades Today" value={totalTrades.toLocaleString()} />
          <Stat title="Active Bots" value={`${activeBots}/10`} />
        </section>

        <section className="mb-8 rounded-[35px] border border-[#13203f] bg-[#070b17] p-8">
          <h2 className="mb-6 text-5xl font-black leading-tight">
            Trade Smarter With Autonomous Agents
          </h2>

          <p className="mb-8 text-xl leading-relaxed text-zinc-400">
            Deploy intelligent crypto trading bots, monitor live market activity, manage treasury systems and evolve your AI trading infrastructure in real time.
          </p>

          <button onClick={deployBot} className="mb-4 w-full rounded-2xl bg-blue-600 py-5 text-2xl font-bold">
            Deploy Agent
          </button>

          <button onClick={() => alert("Vault synchronization initialized.")} className="w-full rounded-2xl bg-[#1a1f33] py-5 text-2xl font-bold">
            Vault Control
          </button>
        </section>

        <section className="mb-8 rounded-[35px] border border-[#13203f] bg-[#070b17] p-8">
          <h2 className="mb-6 text-4xl font-black">Live Trade Feed</h2>

          <div className="space-y-4">
            {feed.map((item, index) => (
              <div key={index} className="rounded-2xl bg-[#161b2d] px-6 py-5 text-xl text-zinc-200">
                {item}
              </div>
            ))}
          </div>
        </section>

        {topBot && (
          <section className="mb-8 rounded-[35px] border border-[#13203f] bg-[#070b17] p-8">
            <h2 className="mb-6 text-4xl font-black">Top Performing Bot</h2>
            <div className="rounded-[30px] border border-[#2447a5] bg-[#0f1c4d] p-8">
              <h3 className="mb-4 text-5xl font-black">{topBot.name}</h3>
              <div className="mb-8 text-7xl font-black text-green-400">+{topBot.pl}%</div>
              <p className="text-2xl text-zinc-300">Trades: {topBot.trades}</p>
              <p className="text-2xl text-zinc-300">Boost Level: {topBot.boost}</p>
            </div>
          </section>
        )}

        <section className="space-y-6">
          {bots.slice(0, 3).map((bot) => (
            <div key={bot.name} className="rounded-[35px] border border-[#13203f] bg-[#070b17] p-8">
              <h2 className="mb-2 text-5xl font-black">{bot.name}</h2>
              <p className="mb-8 text-xl text-zinc-500">{bot.symbol} Autonomous Agent</p>

              <button
                onClick={() => toggleBot(bot.name)}
                className={`w-full rounded-2xl py-5 text-2xl font-bold ${bot.active ? "bg-blue-600" : "bg-zinc-700"}`}
              >
                {bot.active ? "ACTIVE TRADING" : "PAUSED TRADING"}
              </button>
            </div>
          ))}
        </section>
      </div>

      <BottomNav />
    </main>
  );
}

function Stat({ title, value, green }: { title: string; value: string; green?: boolean }) {
  return (
    <div className="rounded-[30px] border border-[#13203f] bg-[#070b17] p-6">
      <p className="mb-3 text-zinc-400">{title}</p>
      <h2 className={`text-5xl font-black ${green ? "text-green-400" : ""}`}>{value}</h2>
    </div>
  );
}