"use client";

import { useEffect, useMemo, useState } from "react";
import { useTradeCore } from "@/context/TradeCoreContext";

import BottomNav from "@/components/layout/BottomNav";
import Ticker from "@/components/layout/Ticker";

export default function HomePage() {
  const {
    vault,
    bots,
    deployBot,
    toggleBot,
  } = useTradeCore();

  const [feed, setFeed] = useState([
    "TradeCore kernel online.",
    "ETH REAPER confidence: HIGH.",
  ]);

  const events = [
    "SOL RUNNER detected breakout",
    "BTC TITAN bought BTC",
    "ETH REAPER exited ETH",
    "XRP SENTINEL confirmed support",
    "Treasury engine reallocating liquidity",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const random =
        events[Math.floor(Math.random() * events.length)];

      setFeed((prev) => [
        random,
        ...prev.slice(0, 5),
      ]);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const activeBots = useMemo(
    () => bots.filter((bot) => bot.active).length,
    [bots]
  );

  const totalTrades = useMemo(() => {
    return bots.reduce(
      (acc, bot) => acc + bot.trades,
      0
    );
  }, [bots]);

  const topBot = useMemo(() => {
    return [...bots].sort(
      (a, b) => b.pl - a.pl
    )[0];
  }, [bots]);

  return (
    <main className="min-h-screen pb-32">
      <Ticker />

      <div className="mx-auto max-w-7xl px-5 pt-24">
        {/* HERO */}

        <section className="mb-8">
          <p className="mb-4 text-xs tracking-[0.45em] text-blue-300">
            TRADECORE ONLINE
          </p>

          <div className="flex items-end justify-between gap-4">
            <div>
              <h1 className="text-5xl font-black leading-[0.9] tracking-tight md:text-7xl">
                Voltara
                <br />
                Trading
              </h1>

              <p className="muted mt-6 max-w-xl text-lg leading-relaxed">
                Autonomous Multi-Agent Crypto
                Trading Infrastructure
              </p>
            </div>

            <div className="hidden md:flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]">
              <div className="animate-pulse-soft h-3 w-3 rounded-full bg-green-400" />
            </div>
          </div>
        </section>

        {/* STATS */}

        <section className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard
            title="Founder Vault"
            value={`$${vault.toLocaleString()}`}
          />

          <StatCard
            title="Trades Today"
            value={totalTrades.toLocaleString()}
          />

          <StatCard
            title="Active Bots"
            value={`${activeBots}/10`}
          />

          <StatCard
            title="Top Bot"
            value={topBot.name}
            small
          />
        </section>

        {/* HERO PANEL */}

        <section className="panel soft-glow mb-8 overflow-hidden p-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-black leading-tight md:text-5xl">
                Institutional AI Trading
                <br />
                Infrastructure
              </h2>

              <p className="muted mt-6 text-lg leading-relaxed">
                Deploy autonomous agents,
                manage treasury systems and
                monitor real-time AI-driven
                market intelligence.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 lg:w-[320px]">
              <button
                onClick={deployBot}
                className="primary-button rounded-2xl px-6 py-4 text-base font-semibold"
              >
                Deploy Agent
              </button>

              <button
                className="secondary-button rounded-2xl px-6 py-4 text-base font-semibold"
              >
                Treasury Controls
              </button>
            </div>
          </div>
        </section>

        {/* GRID */}

        <section className="grid gap-6 xl:grid-cols-3">
          {/* LEFT */}

          <div className="space-y-6 xl:col-span-2">
            {/* BOTS */}

            {bots.map((bot) => (
              <div
                key={bot.name}
                className="panel p-6"
              >
                <div className="mb-6 flex items-start justify-between">
                  <div>
                    <h3 className="text-3xl font-black">
                      {bot.name}
                    </h3>

                    <p className="muted mt-2 text-sm">
                      {bot.symbol} Autonomous Agent
                    </p>
                  </div>

                  <div
                    className={`h-3 w-3 rounded-full ${
                      bot.active
                        ? "animate-pulse-soft bg-green-400"
                        : "bg-red-400"
                    }`}
                  />
                </div>

                <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
                  <MiniCard
                    title="P/L"
                    value={`${bot.pl >= 0 ? "+" : ""}${bot.pl}%`}
                    green={bot.pl >= 0}
                  />

                  <MiniCard
                    title="Trades"
                    value={bot.trades.toLocaleString()}
                  />

                  <MiniCard
                    title="Boost"
                    value={String(bot.boost)}
                  />

                  <MiniCard
                    title="Capital"
                    value={`$${bot.capital}`}
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() =>
                      toggleBot(bot.name)
                    }
                    className={`rounded-2xl px-5 py-3 text-sm font-semibold ${
                      bot.active
                        ? "primary-button"
                        : "secondary-button"
                    }`}
                  >
                    {bot.active
                      ? "Active"
                      : "Paused"}
                  </button>

                  <button className="secondary-button rounded-2xl px-5 py-3 text-sm font-semibold">
                    Analytics
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT */}

          <div className="space-y-6">
            {/* TOP BOT */}

            <div className="panel soft-glow p-6">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-xl font-bold">
                  Top Performing Bot
                </h3>

                <div className="h-2 w-2 rounded-full bg-green-400" />
              </div>

              <h2 className="text-4xl font-black">
                {topBot.name}
              </h2>

              <div className="green mt-5 text-5xl font-black">
                +{topBot.pl}%
              </div>

              <div className="muted mt-5 space-y-2 text-sm">
                <p>
                  Trades:{" "}
                  {topBot.trades.toLocaleString()}
                </p>

                <p>
                  Boost Level: {topBot.boost}
                </p>

                <p>Confidence: HIGH</p>
              </div>
            </div>

            {/* FEED */}

            <div className="panel p-6">
              <h3 className="mb-5 text-xl font-bold">
                Live Trade Feed
              </h3>

              <div className="space-y-3">
                {feed.map((item, index) => (
                  <div
                    key={index}
                    className="sub-panel px-4 py-4 text-sm text-zinc-300"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* GRAPH */}

            <div className="panel p-6">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-xl font-bold">
                  Treasury Curve
                </h3>

                <span className="muted text-sm">
                  30d
                </span>
              </div>

              <div className="grid-chart relative h-[220px] overflow-hidden rounded-3xl bg-black/20">
                <div className="absolute bottom-12 left-5 right-5 h-[2px] -rotate-6 rounded-full bg-blue-500 shadow-[0_0_25px_rgba(59,130,246,0.7)]" />

                <div className="absolute bottom-[22%] left-[12%] h-3 w-3 rounded-full bg-green-400" />

                <div className="absolute bottom-[30%] left-[32%] h-3 w-3 rounded-full bg-green-400" />

                <div className="absolute bottom-[44%] left-[58%] h-3 w-3 rounded-full bg-green-400" />

                <div className="absolute bottom-[62%] left-[82%] h-3 w-3 rounded-full bg-green-400" />
              </div>
            </div>
          </div>
        </section>
      </div>

      <BottomNav />
    </main>
  );
}

function StatCard({
  title,
  value,
  small,
}: {
  title: string;
  value: string;
  small?: boolean;
}) {
  return (
    <div className="panel p-5">
      <p className="muted text-sm">
        {title}
      </p>

      <h2
        className={`mt-3 font-black ${
          small
            ? "text-2xl"
            : "text-4xl"
        }`}
      >
        {value}
      </h2>
    </div>
  );
}

function MiniCard({
  title,
  value,
  green,
}: {
  title: string;
  value: string;
  green?: boolean;
}) {
  return (
    <div className="sub-panel p-4">
      <p className="muted text-xs">
        {title}
      </p>

      <h4
        className={`mt-2 text-2xl font-black ${
          green
            ? "text-green-400"
            : "text-white"
        }`}
      >
        {value}
      </h4>
    </div>
  );
}