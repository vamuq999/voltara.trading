"use client";

import { useEffect, useMemo, useState } from "react";
import { useTradeCore } from "@/context/TradeCoreContext";

export default function HomePage() {
  const { vault, bots, deployBot, toggleBot } = useTradeCore();

  const [feed, setFeed] = useState<string[]>([
    "TradeCore kernel online.",
    "ETH REAPER confidence: HIGH.",
    "Scanning multi-agent market grid...",
    "BTC TITAN trend lock confirmed.",
  ]);

  const [consoleFeed, setConsoleFeed] = useState<string[]>([
    "> ETH REAPER confidence: HIGH.",
    "> TradeCore kernel online.",
    "> BTC TITAN trend lock confirmed.",
    "> Scanning multi-agent market grid...",
  ]);

  const liveEvents = [
    "SOL RUNNER detected breakout",
    "BTC TITAN bought BTC",
    "ETH REAPER exited ETH",
    "LINK WATCHER detected momentum spike",
    "XRP SENTINEL confirmed support",
    "TradeCore boosted ETH REAPER",
    "DOGE CHAOS paused trading",
    "Treasury engine reallocating liquidity",
    "ADA ORACLE entered swing position",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const random =
        liveEvents[Math.floor(Math.random() * liveEvents.length)];

      setFeed((prev) => [random, ...prev.slice(0, 5)]);

      setConsoleFeed((prev) => [
        `> ${random}.`,
        ...prev.slice(0, 4),
      ]);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const activeBots = useMemo(
    () => bots.filter((bot) => bot.active).length,
    [bots]
  );

  const totalTrades = useMemo(() => {
    return bots.reduce((acc, bot) => acc + bot.trades, 0);
  }, [bots]);

  const dailyPL = useMemo(() => {
    return bots.reduce((acc, bot) => acc + bot.pl, 0);
  }, [bots]);

  const topBot = useMemo(() => {
    return [...bots].sort((a, b) => b.pl - a.pl)[0];
  }, [bots]);

  return (
    <main className="min-h-screen bg-black text-white pb-32">
      <div className="fixed top-0 left-0 w-full z-50 border-b border-[#1c274c] bg-black/90 backdrop-blur-xl overflow-hidden">
        <div className="flex animate-marquee gap-12 py-3 px-6 text-sm text-zinc-300 whitespace-nowrap">
          <span>BTC +2.4%</span>
          <span>ETH +5.1%</span>
          <span>SOL +8.8%</span>
          <span>DOGE -1.2%</span>
          <span>XRP +3.4%</span>
          <span>ADA +2.1%</span>
          <span>LINK +4.9%</span>
        </div>
      </div>

      <div className="px-6 pt-24">
        <div className="mb-10">
          <p className="tracking-[0.5em] text-blue-300 text-sm mb-3">
            TRADECORE ONLINE
          </p>

          <h1 className="text-6xl font-black leading-none mb-6">
            VOLTARA
            <br />
            TRADING
          </h1>

          <p className="text-zinc-400 text-xl leading-relaxed">
            Autonomous Multi-Agent Crypto Trading Infrastructure
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-[#070b17] border border-[#13203f] rounded-[30px] p-6 shadow-[0_0_40px_rgba(0,100,255,0.12)]">
            <p className="text-zinc-400 mb-3">Founder Vault</p>

            <h2 className="text-5xl font-black">
              $
              {vault.toLocaleString()}
            </h2>
          </div>

          <div className="bg-[#070b17] border border-[#13203f] rounded-[30px] p-6 shadow-[0_0_40px_rgba(0,255,140,0.12)]">
            <p className="text-zinc-400 mb-3">Daily P/L</p>

            <h2 className="text-5xl font-black text-green-400">
              +{dailyPL.toFixed(1)}%
            </h2>
          </div>

          <div className="bg-[#070b17] border border-[#13203f] rounded-[30px] p-6">
            <p className="text-zinc-400 mb-3">Trades Today</p>

            <h2 className="text-5xl font-black">
              {totalTrades.toLocaleString()}
            </h2>
          </div>

          <div className="bg-[#070b17] border border-[#13203f] rounded-[30px] p-6">
            <p className="text-zinc-400 mb-3">Active Bots</p>

            <h2 className="text-5xl font-black">
              {activeBots}/10
            </h2>
          </div>
        </div>

        <section className="bg-[#070b17] border border-[#13203f] rounded-[35px] p-8 mb-8 shadow-[0_0_60px_rgba(0,80,255,0.1)]">
          <h2 className="text-5xl font-black leading-tight mb-6">
            Trade Smarter
            <br />
            With Autonomous
            <br />
            Agents
          </h2>

          <p className="text-zinc-400 text-xl leading-relaxed mb-8">
            Deploy intelligent crypto trading bots, monitor live market activity,
            manage treasury systems and evolve your AI trading infrastructure in real time.
          </p>

          <div className="space-y-4">
            <button
              onClick={deployBot}
              className="w-full bg-blue-600 active:scale-[0.98] transition-all rounded-2xl py-5 text-2xl font-bold"
            >
              Launch TradeCore
            </button>

            <button
              onClick={deployBot}
              className="w-full bg-[#1a1f33] active:scale-[0.98] transition-all rounded-2xl py-5 text-2xl font-bold"
            >
              Deploy Agent
            </button>

            <button
              onClick={() =>
                alert("Vault synchronization initialized.")
              }
              className="w-full bg-[#1a1f33] active:scale-[0.98] transition-all rounded-2xl py-5 text-2xl font-bold"
            >
              Vault Control
            </button>
          </div>
        </section>

        <section className="bg-[#070b17] border border-[#13203f] rounded-[35px] p-8 mb-8">
          <h2 className="text-4xl font-black mb-6">
            AI System Status
          </h2>

          <div className="space-y-4">
            <StatusRow label="Market Sentiment" value="BULLISH" />
            <StatusRow label="AI Network" value="STABLE" />
            <StatusRow label="Volatility Index" value="MEDIUM" />
            <StatusRow label="Treasury Engine" value="ACTIVE" />
          </div>
        </section>

        <section className="bg-[#070b17] border border-[#13203f] rounded-[35px] p-8 mb-8">
          <h2 className="text-4xl font-black mb-6">
            AI Command Console
          </h2>

          <div className="bg-black rounded-[28px] p-6 border border-[#13203f]">
            <div className="space-y-4 font-mono text-green-300 text-lg">
              {consoleFeed.map((line, index) => (
                <div key={index}>{line}</div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#070b17] border border-[#13203f] rounded-[35px] p-8 mb-8">
          <h2 className="text-4xl font-black mb-6">
            Live Trade Feed
          </h2>

          <div className="space-y-4">
            {feed.map((item, index) => (
              <div
                key={index}
                className="bg-[#161b2d] rounded-2xl px-6 py-5 text-xl text-zinc-200"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        {topBot && (
          <section className="bg-[#070b17] border border-[#13203f] rounded-[35px] p-8 mb-8">
            <h2 className="text-4xl font-black mb-6">
              Top Performing Bot
            </h2>

            <div className="bg-[#0f1c4d] rounded-[30px] p-8 border border-[#2447a5]">
              <h3 className="text-5xl font-black mb-4">
                {topBot.name}
              </h3>

              <div className="text-green-400 text-7xl font-black mb-8">
                +{topBot.pl}%
              </div>

              <div className="space-y-3 text-2xl text-zinc-300">
                <p>Trades: {topBot.trades}</p>
                <p>Boost Level: {topBot.boost}</p>
                <p>Confidence: HIGH</p>
              </div>
            </div>
          </section>
        )}

        <section className="space-y-6">
          {bots.map((bot) => (
            <div
              key={bot.name}
              className="bg-[#070b17] border border-[#13203f] rounded-[35px] p-8 relative"
            >
              <div
                className={`absolute right-8 top-8 w-6 h-6 rounded-full ${
                  bot.active ? "bg-green-400" : "bg-red-400"
                }`}
              />

              <h2 className="text-5xl font-black mb-2">
                {bot.name}
              </h2>

              <p className="text-zinc-500 text-xl mb-8">
                Autonomous Agent
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-[#161b2d] rounded-2xl p-5">
                  <p className="text-zinc-400 mb-2">P/L</p>

                  <p
                    className={`text-4xl font-black ${
                      bot.pl >= 0
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {bot.pl >= 0 ? "+" : ""}
                    {bot.pl}%
                  </p>
                </div>

                <div className="bg-[#161b2d] rounded-2xl p-5">
                  <p className="text-zinc-400 mb-2">Trades</p>

                  <p className="text-4xl font-black">
                    {bot.trades}
                  </p>
                </div>

                <div className="bg-[#161b2d] rounded-2xl p-5">
                  <p className="text-zinc-400 mb-2">Boost</p>

                  <p className="text-4xl font-black">
                    {bot.boost}
                  </p>
                </div>

                <div className="bg-[#161b2d] rounded-2xl p-5">
                  <p className="text-zinc-400 mb-2">Capital</p>

                  <p className="text-4xl font-black">
                    ${bot.capital}
                  </p>
                </div>
              </div>

              <button
                onClick={() => toggleBot(bot.name)}
                className={`w-full rounded-2xl py-5 text-2xl font-bold transition-all active:scale-[0.98]
                ${
                  bot.active
                    ? "bg-blue-600"
                    : "bg-zinc-700"
                }`}
              >
                {bot.active
                  ? "ACTIVE TRADING"
                  : "PAUSED TRADING"}
              </button>
            </div>
          ))}
        </section>
      </div>

      <div className="fixed bottom-0 left-0 w-full border-t border-[#13203f] bg-black/95 backdrop-blur-xl">
        <div className="grid grid-cols-4 py-4">
          <NavItem label="Dashboard" active />
          <NavItem label="Bots" />
          <NavItem label="Vault" />
          <NavItem label="Analytics" />
        </div>
      </div>
    </main>
  );
}

function StatusRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="bg-[#161b2d] rounded-2xl px-6 py-5 flex items-center justify-between">
      <span className="text-zinc-400 text-xl">
        {label}
      </span>

      <span className="text-green-400 font-black text-2xl">
        {value}
      </span>
    </div>
  );
}

function NavItem({
  label,
  active,
}: {
  label: string;
  active?: boolean;
}) {
  return (
    <div
      className={`text-center text-lg ${
        active ? "text-white" : "text-zinc-500"
      }`}
    >
      {label}
    </div>
  );
}