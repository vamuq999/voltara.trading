"use client";

import Link from "next/link";

import { useTradeCore } from "@/context/TradeCoreContext";

import BottomNav from "@/components/layout/BottomNav";
import Ticker from "@/components/layout/Ticker";

export default function BotsPage() {
  const {
    bots,
    toggleBot,
    deployBot,
  } = useTradeCore();

  return (
    <main className="min-h-screen pb-32">
      <Ticker />

      <div className="mx-auto max-w-6xl px-5 pt-24">
        <p className="mb-4 text-xs tracking-[0.45em] text-blue-300">
          AGENT SWARM
        </p>

        <h1 className="text-5xl font-black md:text-7xl">
          Trading Bots
        </h1>

        <p className="muted mt-5 text-lg">
          Autonomous AI-driven trading agents.
        </p>

        <button
          onClick={deployBot}
          className="primary-button mt-8 rounded-2xl px-6 py-4 text-base font-semibold"
        >
          Deploy New Agent
        </button>

        <section className="mt-8 space-y-6">
          {bots.map((bot) => (
            <div
              key={bot.name}
              className="panel p-6"
            >
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <h2 className="text-3xl font-black">
                    {bot.name}
                  </h2>

                  <p className="muted mt-2 text-sm">
                    {bot.symbol} Agent
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
                <Mini
                  title="P/L"
                  value={`${bot.pl >= 0 ? "+" : ""}${bot.pl}%`}
                  green={bot.pl >= 0}
                />

                <Mini
                  title="Trades"
                  value={bot.trades.toLocaleString()}
                />

                <Mini
                  title="Boost"
                  value={String(bot.boost)}
                />

                <Mini
                  title="Capital"
                  value={`$${bot.capital}`}
                />
              </div>

              <div className="flex flex-wrap gap-3">
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

                <Link
                  href={`/bots/${bot.name
                    .toLowerCase()
                    .replace(/\s/g, "-")}`}
                  className="secondary-button rounded-2xl px-5 py-3 text-sm font-semibold"
                >
                  Analytics
                </Link>
              </div>
            </div>
          ))}
        </section>
      </div>

      <BottomNav />
    </main>
  );
}

function Mini({
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