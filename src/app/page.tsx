"use client";

import { useEffect, useState } from "react";
import NeuralBackground from "@/components/effects/NeuralBackground";

const feedMessages = [
  "ETH REAPER exited ETH",
  "XRP SENTINEL confirmed support",
  "BTC TITAN bought BTC",
  "SOL RUNNER detected breakout",
  "TradeCore boosted ETH REAPER",
  "LINK WATCHER detected momentum spike",
  "DOGE CHAOS paused trading",
  "ADA ORACLE detected reversal",
];

const consoleMessages = [
  "TradeCore kernel online.",
  "Scanning multi-agent market grid...",
  "ETH REAPER confidence: HIGH.",
  "BTC TITAN trend lock confirmed.",
  "Treasury engine synchronized.",
  "Volatility layer adapting...",
  "Quantum signal processing active.",
];

const bots = [
  {
    name: "BTC TITAN",
    pair: "BTC Agent",
    pl: "+18.4%",
    trades: 1284,
    boost: 6,
    capital: "$120",
    active: true,
  },
  {
    name: "ETH REAPER",
    pair: "ETH Agent",
    pl: "+24.2%",
    trades: 2241,
    boost: 9,
    capital: "$240",
    active: true,
  },
  {
    name: "SOL RUNNER",
    pair: "SOL Agent",
    pl: "+12.1%",
    trades: 842,
    boost: 4,
    capital: "$75",
    active: true,
  },
  {
    name: "DOGE CHAOS",
    pair: "DOGE Agent",
    pl: "-2.4%",
    trades: 381,
    boost: 1,
    capital: "$25",
    active: false,
  },
  {
    name: "XRP SENTINEL",
    pair: "XRP Agent",
    pl: "+7.8%",
    trades: 654,
    boost: 3,
    capital: "$50",
    active: true,
  },
];

export default function HomePage() {
  const [feed, setFeed] = useState(feedMessages);
  const [consoleFeed, setConsoleFeed] = useState(consoleMessages);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomFeed =
        feedMessages[Math.floor(Math.random() * feedMessages.length)];

      setFeed((prev) => [randomFeed, ...prev.slice(0, 5)]);
    }, 3200);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomConsole =
        consoleMessages[
          Math.floor(Math.random() * consoleMessages.length)
        ];

      setConsoleFeed((prev) => [randomConsole, ...prev.slice(0, 4)]);
    }, 2600);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020617] text-white">
      <NeuralBackground />

      {/* Ticker */}
      <div className="sticky top-0 z-50 border-b border-white/5 bg-black/40 backdrop-blur-xl">
        <div className="ticker-track flex gap-12 whitespace-nowrap px-6 py-4 text-sm text-zinc-300">
          <span>BTC +2.4%</span>
          <span>ETH +5.1%</span>
          <span>SOL +8.8%</span>
          <span>DOGE -1.2%</span>
          <span>XRP +3.4%</span>
          <span>ADA +2.1%</span>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 pb-32 pt-8">
        {/* HERO */}
        <section className="mb-8">
          <p className="mb-4 text-xs tracking-[0.5em] text-blue-300">
            TRADECORE ONLINE
          </p>

          <h1 className="max-w-2xl text-5xl font-black leading-[0.95] tracking-tight">
            VOLTARA
            <br />
            TRADING
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">
            Autonomous Multi-Agent Crypto Trading Infrastructure
          </p>
        </section>

        {/* STATS */}
        <section className="mb-8 grid grid-cols-2 gap-4">
          <StatCard title="Founder Vault" value="$48,221" />
          <StatCard
            title="Daily P/L"
            value="+$4,281"
            green
          />
          <StatCard title="Trades Today" value="8,421" />
          <StatCard title="Active Bots" value="6/10" />
        </section>

        {/* HERO PANEL */}
        <section className="glass glow mb-8 rounded-[32px] p-8">
          <h2 className="max-w-md text-5xl font-black leading-tight">
            Trade Smarter With Autonomous Agents
          </h2>

          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-zinc-400">
            Deploy intelligent crypto trading bots, monitor live market
            activity, manage treasury systems and evolve your AI trading
            infrastructure in real time.
          </p>

          <div className="mt-10 space-y-4">
            <button className="w-full rounded-2xl bg-blue-600 px-6 py-5 text-lg font-bold">
              Launch TradeCore
            </button>

            <button className="glass w-full rounded-2xl px-6 py-5 text-lg font-semibold">
              Deploy Agent
            </button>

            <button className="glass w-full rounded-2xl px-6 py-5 text-lg font-semibold">
              Vault Control
            </button>
          </div>
        </section>

        {/* AI STATUS */}
        <section className="glass glow mb-8 rounded-[32px] p-8">
          <h2 className="mb-6 text-4xl font-black">
            AI System Status
          </h2>

          <div className="space-y-4">
            <StatusRow label="Market Sentiment" value="BULLISH" />
            <StatusRow label="AI Network" value="STABLE" />
            <StatusRow label="Volatility Index" value="MEDIUM" />
            <StatusRow label="Treasury Engine" value="ACTIVE" />
          </div>
        </section>

        {/* TREASURY GRAPH */}
        <section className="glass glow mb-8 rounded-[32px] p-8">
          <h2 className="mb-8 text-4xl font-black">
            Treasury Growth Curve
          </h2>

          <div className="relative h-[300px] overflow-hidden rounded-[24px] bg-black/40">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:60px_60px]" />

            <svg
              viewBox="0 0 500 250"
              className="absolute inset-0 h-full w-full"
            >
              <path
                d="M20 220 C120 200, 180 170, 260 150 S380 120, 480 40"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="8"
                strokeLinecap="round"
              />
            </svg>

            <div className="absolute left-[12%] top-[60%] h-6 w-6 animate-pulse rounded-full bg-green-400 shadow-[0_0_30px_rgba(74,222,128,0.8)]" />

            <div className="absolute left-[30%] top-[48%] h-6 w-6 animate-pulse rounded-full bg-green-400 shadow-[0_0_30px_rgba(74,222,128,0.8)]" />

            <div className="absolute left-[48%] top-[36%] h-6 w-6 animate-pulse rounded-full bg-green-400 shadow-[0_0_30px_rgba(74,222,128,0.8)]" />

            <div className="absolute left-[68%] top-[26%] h-6 w-6 animate-pulse rounded-full bg-green-400 shadow-[0_0_30px_rgba(74,222,128,0.8)]" />

            <div className="absolute left-[85%] top-[16%] h-6 w-6 animate-pulse rounded-full bg-green-400 shadow-[0_0_30px_rgba(74,222,128,0.8)]" />
          </div>
        </section>

        {/* BOTS */}
        <section className="mb-8">
          <h2 className="mb-6 text-4xl font-black">
            Autonomous Agents
          </h2>

          <div className="space-y-6">
            {bots.map((bot) => (
              <BotCard key={bot.name} bot={bot} />
            ))}
          </div>
        </section>

        {/* VAULT */}
        <section className="glass glow mb-8 rounded-[32px] p-8">
          <h2 className="mb-8 text-4xl font-black">
            Founder Vault
          </h2>

          <div className="space-y-4">
            <VaultRow
              title="Available Balance"
              value="$31,884"
            />

            <VaultRow
              title="Allocated To Bots"
              value="$16,337"
            />

            <button className="glass w-full rounded-2xl px-6 py-5 text-lg font-bold">
              Connect Coinbase Wallet
            </button>
          </div>
        </section>

        {/* CONSOLE */}
        <section className="glass glow mb-8 rounded-[32px] p-8">
          <h2 className="mb-6 text-4xl font-black">
            AI Command Console
          </h2>

          <div className="overflow-hidden rounded-[24px] bg-black px-6 py-6 font-mono text-green-300">
            <div className="space-y-4">
              {consoleFeed.map((line, index) => (
                <p
                  key={index}
                  className="animate-fade"
                >
                  {">"} {line}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* FEED */}
        <section className="glass glow mb-8 rounded-[32px] p-8">
          <h2 className="mb-6 text-4xl font-black">
            Live Trade Feed
          </h2>

          <div className="space-y-4">
            {feed.map((item, index) => (
              <div
                key={index}
                className="rounded-2xl bg-white/[0.04] px-6 py-5 text-lg text-zinc-300"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        {/* TOP BOT */}
        <section className="glass glow rounded-[32px] p-8">
          <h2 className="mb-8 text-4xl font-black">
            Top Performing Bot
          </h2>

          <div className="rounded-[28px] border border-blue-400/20 bg-blue-950/40 p-8">
            <h3 className="text-5xl font-black">
              ETH REAPER
            </h3>

            <div className="mt-6 text-7xl font-black text-green-400">
              +24.2%
            </div>

            <div className="mt-8 space-y-4 text-2xl text-zinc-300">
              <p>Trades: 2,241</p>
              <p>Boost Level: 9</p>
              <p>Confidence: HIGH</p>
            </div>
          </div>
        </section>
      </div>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/5 bg-black/40 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-2xl items-center justify-around py-5 text-zinc-400">
          <button className="text-blue-400">Dashboard</button>
          <button>Bots</button>
          <button>Vault</button>
          <button>Analytics</button>
        </div>
      </nav>
    </main>
  );
}

function StatCard({
  title,
  value,
  green,
}: {
  title: string;
  value: string;
  green?: boolean;
}) {
  return (
    <div className="glass glow rounded-[28px] p-6">
      <p className="text-zinc-400">{title}</p>

      <h3
        className={`mt-4 text-5xl font-black ${
          green ? "text-green-400" : "text-white"
        }`}
      >
        {value}
      </h3>
    </div>
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
    <div className="glass flex items-center justify-between rounded-2xl px-6 py-5">
      <span className="text-xl text-zinc-400">
        {label}
      </span>

      <span className="text-2xl font-bold text-green-400">
        {value}
      </span>
    </div>
  );
}

function VaultRow({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="glass rounded-2xl px-6 py-5">
      <p className="text-lg text-zinc-400">{title}</p>

      <h3 className="mt-3 text-5xl font-black">
        {value}
      </h3>
    </div>
  );
}

function BotCard({
  bot,
}: {
  bot: {
    name: string;
    pair: string;
    pl: string;
    trades: number;
    boost: number;
    capital: string;
    active: boolean;
  };
}) {
  const positive = bot.pl.includes("+");

  return (
    <div className="glass glow rounded-[32px] p-8">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h3 className="text-5xl font-black">
            {bot.name}
          </h3>

          <p className="mt-2 text-xl text-zinc-500">
            {bot.pair}
          </p>
        </div>

        <div
          className={`h-5 w-5 rounded-full ${
            bot.active
              ? "animate-profit bg-green-400"
              : "bg-red-400"
          }`}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <BotStat
          title="P/L"
          value={bot.pl}
          green={positive}
          red={!positive}
        />

        <BotStat
          title="Trades"
          value={String(bot.trades)}
        />

        <BotStat
          title="Boost"
          value={String(bot.boost)}
        />

        <BotStat
          title="Capital"
          value={bot.capital}
        />
      </div>

      <button
        className={`mt-8 w-full rounded-2xl px-6 py-5 text-lg font-black ${
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
  );
}

function BotStat({
  title,
  value,
  green,
  red,
}: {
  title: string;
  value: string;
  green?: boolean;
  red?: boolean;
}) {
  return (
    <div className="glass rounded-2xl p-5">
      <p className="text-zinc-500">{title}</p>

      <h4
        className={`mt-3 text-4xl font-black ${
          green
            ? "text-green-400"
            : red
            ? "text-red-400"
            : "text-white"
        }`}
      >
        {value}
      </h4>
    </div>
  );
}