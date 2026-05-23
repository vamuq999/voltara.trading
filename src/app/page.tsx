"use client";

import { useEffect, useMemo, useState } from "react";
import { useTradeCore } from "@/context/TradeCoreContext";
import { useMarketData } from "@/hooks/useMarketData";

import BottomNav from "@/components/layout/BottomNav";
import Ticker from "@/components/layout/Ticker";

export default function HomePage() {
  const { vault, bots, deployBot, toggleBot } = useTradeCore();
  const { markets, updatedAt, loading, error } = useMarketData();

  const [feed, setFeed] = useState([
    "TradeCore live market engine initialized.",
    "Awaiting real-time asset velocity.",
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (markets.length === 0) return;

      const asset =
        markets[Math.floor(Math.random() * markets.length)];

      const direction =
        asset.change24h >= 0
          ? "bullish continuation"
          : "bearish pressure";

      setFeed((prev) => [
        `${asset.symbol} detected ${direction} at $${asset.price.toLocaleString()}`,
        ...prev.slice(0, 5),
      ]);
    }, 3500);

    return () => clearInterval(interval);
  }, [markets]);

  const activeBots = useMemo(
    () => bots.filter((bot) => bot.active).length,
    [bots]
  );

  const totalTrades = useMemo(() => {
    return bots.reduce((acc, bot) => acc + bot.trades, 0);
  }, [bots]);

  const topBot = useMemo(() => {
    return [...bots].sort((a, b) => b.pl - a.pl)[0];
  }, [bots]);

  const strongestMarket = useMemo(() => {
    if (markets.length === 0) return null;
    return [...markets].sort((a, b) => b.change24h - a.change24h)[0];
  }, [markets]);

  const weakestMarket = useMemo(() => {
    if (markets.length === 0) return null;
    return [...markets].sort((a, b) => a.change24h - b.change24h)[0];
  }, [markets]);

  const marketBias = useMemo(() => {
    if (markets.length === 0) return "SCANNING";

    const average =
      markets.reduce((acc, asset) => acc + asset.change24h, 0) /
      markets.length;

    if (average > 2) return "BULLISH";
    if (average < -2) return "BEARISH";
    return "NEUTRAL";
  }, [markets]);

  return (
    <main className="min-h-screen pb-32">
      <Ticker />

      <div className="mx-auto max-w-7xl px-5 pt-24">
        <section className="mb-8">
          <p className="mb-4 text-xs tracking-[0.45em] text-blue-300">
            LIVE MARKET CORE ONLINE
          </p>

          <h1 className="text-5xl font-black leading-[0.9] tracking-tight md:text-7xl">
            Voltara
            <br />
            Trading
          </h1>

          <p className="muted mt-6 max-w-xl text-lg leading-relaxed">
            Autonomous Multi-Agent Crypto Trading Infrastructure
          </p>

          <p className="muted mt-3 text-xs">
            {loading
              ? "Loading real market data..."
              : error || `Live feed synced: ${updatedAt ? new Date(updatedAt).toLocaleTimeString() : "online"}`}
          </p>
        </section>

        <section className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard title="Founder Vault" value={`$${vault.toLocaleString()}`} />
          <StatCard title="Trades Today" value={totalTrades.toLocaleString()} />
          <StatCard title="Active Bots" value={`${activeBots}/10`} />
          <StatCard title="Market Bias" value={marketBias} small />
        </section>

        <section className="panel soft-glow mb-8 overflow-hidden p-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-black leading-tight md:text-5xl">
                Live Market Intelligence
                <br />
                Connected
              </h2>

              <p className="muted mt-6 text-lg leading-relaxed">
                TradeCore is now reading live crypto prices, 24h movement,
                highs, lows, volume and market momentum.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 lg:w-[320px]">
              <button
                onClick={deployBot}
                className="primary-button rounded-2xl px-6 py-4 text-base font-semibold"
              >
                Deploy Agent
              </button>

              <button className="secondary-button rounded-2xl px-6 py-4 text-base font-semibold">
                Refresh Market Scan
              </button>
            </div>
          </div>
        </section>

        <section className="mb-8 grid gap-4 md:grid-cols-2">
          <div className="panel p-6">
            <p className="muted text-sm">Strongest 24h Asset</p>
            <h3 className="mt-3 text-4xl font-black">
              {strongestMarket ? strongestMarket.symbol : "SCANNING"}
            </h3>
            <p className="mt-3 text-3xl font-black text-green-400">
              {strongestMarket
                ? `${strongestMarket.change24h >= 0 ? "+" : ""}${strongestMarket.change24h.toFixed(2)}%`
                : "--"}
            </p>
          </div>

          <div className="panel p-6">
            <p className="muted text-sm">Weakest 24h Asset</p>
            <h3 className="mt-3 text-4xl font-black">
              {weakestMarket ? weakestMarket.symbol : "SCANNING"}
            </h3>
            <p className="mt-3 text-3xl font-black text-red-400">
              {weakestMarket
                ? `${weakestMarket.change24h >= 0 ? "+" : ""}${weakestMarket.change24h.toFixed(2)}%`
                : "--"}
            </p>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-3">
          <div className="space-y-6 xl:col-span-2">
            <div className="panel p-6">
              <h3 className="mb-5 text-xl font-bold">
                Live Market Board
              </h3>

              <div className="space-y-3">
                {markets.map((asset) => (
                  <div
                    key={asset.symbol}
                    className="sub-panel flex items-center justify-between p-4"
                  >
                    <div>
                      <p className="font-bold">{asset.symbol}</p>
                      <p className="muted text-xs">{asset.name}</p>
                    </div>

                    <div className="text-right">
                      <p className="font-bold">
                        ${asset.price.toLocaleString(undefined, {
                          maximumFractionDigits:
                            asset.price > 100 ? 0 : 4,
                        })}
                      </p>

                      <p
                        className={
                          asset.change24h >= 0
                            ? "text-sm text-green-400"
                            : "text-sm text-red-400"
                        }
                      >
                        {asset.change24h >= 0 ? "+" : ""}
                        {asset.change24h.toFixed(2)}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {bots.map((bot) => {
              const linkedMarket = markets.find(
                (asset) => asset.symbol === bot.symbol
              );

              return (
                <div key={bot.name} className="panel p-6">
                  <div className="mb-6 flex items-start justify-between">
                    <div>
                      <h3 className="text-3xl font-black">{bot.name}</h3>
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
                      title="Live Price"
                      value={
                        linkedMarket
                          ? `$${linkedMarket.price.toLocaleString(undefined, {
                              maximumFractionDigits:
                                linkedMarket.price > 100 ? 0 : 4,
                            })}`
                          : "--"
                      }
                    />

                    <MiniCard
                      title="24h"
                      value={
                        linkedMarket
                          ? `${linkedMarket.change24h >= 0 ? "+" : ""}${linkedMarket.change24h.toFixed(2)}%`
                          : "--"
                      }
                      green={linkedMarket ? linkedMarket.change24h >= 0 : false}
                    />

                    <MiniCard title="Trades" value={bot.trades.toLocaleString()} />
                    <MiniCard title="Capital" value={`$${bot.capital}`} />
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => toggleBot(bot.name)}
                      className={`rounded-2xl px-5 py-3 text-sm font-semibold ${
                        bot.active ? "primary-button" : "secondary-button"
                      }`}
                    >
                      {bot.active ? "Active" : "Paused"}
                    </button>

                    <button className="secondary-button rounded-2xl px-5 py-3 text-sm font-semibold">
                      Live Analytics
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="space-y-6">
            <div className="panel soft-glow p-6">
              <h3 className="text-xl font-bold">Top Performing Bot</h3>
              <h2 className="mt-5 text-4xl font-black">{topBot.name}</h2>
              <div className="green mt-5 text-5xl font-black">
                +{topBot.pl}%
              </div>
              <div className="muted mt-5 space-y-2 text-sm">
                <p>Trades: {topBot.trades.toLocaleString()}</p>
                <p>Boost Level: {topBot.boost}</p>
                <p>Confidence: HIGH</p>
              </div>
            </div>

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
      <p className="muted text-sm">{title}</p>
      <h2 className={`mt-3 font-black ${small ? "text-2xl" : "text-4xl"}`}>
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
      <p className="muted text-xs">{title}</p>
      <h4 className={`mt-2 text-2xl font-black ${green ? "text-green-400" : ""}`}>
        {value}
      </h4>
    </div>
  );
}