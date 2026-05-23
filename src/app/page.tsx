"use client";

import MarketChart from "@/components/dashboard/MarketChart";
import { useMarketData } from "@/hooks/useMarketData";

export default function DashboardPage() {
  const { markets, loading } = useMarketData();

  const btc = markets.find((m) => m.symbol === "BTC");
  const eth = markets.find((m) => m.symbol === "ETH");
  const sol = markets.find((m) => m.symbol === "SOL");
  const xrp = markets.find((m) => m.symbol === "XRP");

  return (
    <main className="min-h-screen bg-black px-5 pb-28 pt-6 text-white">
      <div className="mx-auto max-w-md space-y-6">
        {/* TOP MARKET BAR */}
        <div className="flex gap-5 overflow-x-auto border-b border-white/10 pb-4 text-sm">
          {loading && (
            <span className="text-zinc-400">
              Loading market data...
            </span>
          )}

          {markets.map((m) => (
            <span
              key={m.symbol}
              className="whitespace-nowrap"
            >
              <b>{m.symbol}</b>{" "}
              $
              {m.price.toLocaleString(undefined, {
                maximumFractionDigits:
                  m.price > 10 ? 2 : 4,
              })}{" "}
              <span
                className={
                  m.change >= 0
                    ? "text-green-400"
                    : "text-red-400"
                }
              >
                {m.change >= 0 ? "+" : ""}
                {m.change.toFixed(2)}%
              </span>
            </span>
          ))}
        </div>

        {/* HERO */}
        <section className="rounded-[32px] border border-white/10 bg-[#07111f] p-6">
          <p className="mb-4 text-xs tracking-[0.4em] text-blue-300">
            TRADECORE ONLINE
          </p>

          <h1 className="text-5xl font-black leading-none">
            VOLTARA
            <br />
            TRADING
          </h1>

          <p className="mt-5 text-zinc-400">
            Autonomous Multi-Agent Crypto
            Trading Infrastructure powered by
            AI reasoning, live market feeds
            and wallet intelligence.
          </p>

          {/* STATS */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            <Card
              label="BTC"
              value={
                btc
                  ? `$${btc.price.toLocaleString()}`
                  : "--"
              }
            />

            <Card
              label="ETH"
              value={
                eth
                  ? `$${eth.price.toLocaleString()}`
                  : "--"
              }
            />

            <Card
              label="SOL"
              value={
                sol
                  ? `$${sol.price.toLocaleString()}`
                  : "--"
              }
              green
            />

            <Card
              label="XRP"
              value={
                xrp
                  ? `$${xrp.price.toLocaleString()}`
                  : "--"
              }
              blue
            />
          </div>
        </section>

        {/* CHART */}
        <section className="rounded-[32px] border border-white/10 bg-[#07111f] p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-3xl font-bold">
              Trend Engine
            </h2>

            <div className="rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs text-green-400">
              LIVE
            </div>
          </div>

          <MarketChart />
        </section>

        {/* AI CONSOLE */}
        <section className="rounded-[32px] border border-white/10 bg-[#07111f] p-6">
          <h2 className="text-3xl font-bold">
            AI Command Console
          </h2>

          <div className="mt-5 space-y-4 rounded-2xl bg-black p-5 font-mono text-sm text-green-400">
            <div>
              {">"} BTC TITAN trend lock confirmed.
            </div>

            <div>
              {">"} ETH REAPER momentum engine online.
            </div>

            <div>
              {">"} SOL SNIPER volatility sweep active.
            </div>

            <div>
              {">"} XRP SENTINEL liquidity scan active.
            </div>

            <div>
              {">"} Treasury synchronization complete.
            </div>

            <div>
              {">"} Wallet intelligence armed.
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function Card({
  label,
  value,
  green,
  blue,
}: {
  label: string;
  value: string;
  green?: boolean;
  blue?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
      <p className="text-sm text-zinc-500">
        {label}
      </p>

      <p
        className={`mt-3 text-3xl font-bold ${
          green ? "text-green-400" : ""
        } ${blue ? "text-blue-400" : ""}`}
      >
        {value}
      </p>
    </div>
  );
}