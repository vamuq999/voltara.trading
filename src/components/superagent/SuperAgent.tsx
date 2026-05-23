"use client";

import { useEffect, useMemo, useState } from "react";
import { useMarketData } from "@/hooks/useMarketData";
import { useTradeCore } from "@/context/TradeCoreContext";

export default function SuperAgent() {
  const { markets } = useMarketData();
  const { bots, trades, addPaperTrade } = useTradeCore();

  const [status, setStatus] = useState("SCANNING");
  const [thesis, setThesis] = useState("Super Agent is scanning live market structure.");
  const [confidence, setConfidence] = useState(72);

  const strongest = useMemo(() => {
    if (!markets.length) return null;
    return [...markets].sort((a, b) => b.change24h - a.change24h)[0];
  }, [markets]);

  const weakest = useMemo(() => {
    if (!markets.length) return null;
    return [...markets].sort((a, b) => a.change24h - b.change24h)[0];
  }, [markets]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!markets.length) return;

      const activeBots = bots.filter((bot) => bot.active);
      if (!activeBots.length) return;

      const bot = activeBots[Math.floor(Math.random() * activeBots.length)];
      const market = markets.find((asset) => asset.symbol === bot.symbol);

      if (!market) return;

      const absMove = Math.abs(market.change24h);
      const nextConfidence = Math.min(96, Math.max(54, Math.round(62 + absMove * 5 + bot.boost)));

      let side: "BUY" | "SELL" | "HOLD" = "HOLD";
      let nextStatus = "OBSERVING";
      let nextThesis = `${bot.name} is holding while market structure stabilizes.`;

      if (market.change24h > 2.2) {
        side = "BUY";
        nextStatus = "ACCUMULATING";
        nextThesis = `${bot.name} detected bullish momentum on ${market.symbol}. Simulated entry prepared.`;
      } else if (market.change24h < -2.2) {
        side = "SELL";
        nextStatus = "DEFENSIVE";
        nextThesis = `${bot.name} detected downside pressure on ${market.symbol}. Simulated defensive exit prepared.`;
      }

      setStatus(nextStatus);
      setThesis(nextThesis);
      setConfidence(nextConfidence);

      addPaperTrade({
        id: crypto.randomUUID(),
        bot: bot.name,
        symbol: market.symbol,
        side,
        price: market.price,
        confidence: nextConfidence,
        thesis: nextThesis,
        time: new Date().toLocaleTimeString(),
      });
    }, 7000);

    return () => clearInterval(timer);
  }, [markets, bots, addPaperTrade]);

  return (
    <section className="panel soft-glow p-6">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="mb-3 text-xs tracking-[0.4em] text-blue-300">
            SUPER AGENT
          </p>

          <h2 className="text-3xl font-black">
            Omega Market Intelligence
          </h2>

          <p className="muted mt-3 text-sm">
            Paper-trading analysis engine using live market data.
          </p>
        </div>

        <div className="rounded-full border border-green-400/20 bg-green-400/10 px-4 py-2 text-xs font-bold text-green-400">
          {status}
        </div>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3">
        <div className="sub-panel p-4">
          <p className="muted text-xs">Confidence</p>
          <h3 className="mt-2 text-3xl font-black text-green-400">
            {confidence}%
          </h3>
        </div>

        <div className="sub-panel p-4">
          <p className="muted text-xs">Mode</p>
          <h3 className="mt-2 text-3xl font-black">
            DEMO
          </h3>
        </div>

        <div className="sub-panel p-4">
          <p className="muted text-xs">Strongest</p>
          <h3 className="mt-2 text-2xl font-black">
            {strongest ? strongest.symbol : "--"}
          </h3>
        </div>

        <div className="sub-panel p-4">
          <p className="muted text-xs">Weakest</p>
          <h3 className="mt-2 text-2xl font-black">
            {weakest ? weakest.symbol : "--"}
          </h3>
        </div>
      </div>

      <div className="sub-panel mb-6 p-4">
        <p className="muted mb-2 text-xs">Current Thesis</p>
        <p className="text-sm leading-relaxed text-zinc-200">
          {thesis}
        </p>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-bold">
          Paper Trade Log
        </h3>

        <div className="space-y-3">
          {trades.length === 0 ? (
            <div className="sub-panel p-4 text-sm text-zinc-400">
              Waiting for Super Agent decision cycle...
            </div>
          ) : (
            trades.slice(0, 6).map((trade) => (
              <div key={trade.id} className="sub-panel p-4">
                <div className="mb-2 flex items-center justify-between gap-4">
                  <span className="font-bold">
                    {trade.bot}
                  </span>

                  <span
                    className={
                      trade.side === "BUY"
                        ? "text-green-400"
                        : trade.side === "SELL"
                        ? "text-red-400"
                        : "text-zinc-400"
                    }
                  >
                    {trade.side}
                  </span>
                </div>

                <p className="text-sm text-zinc-300">
                  {trade.symbol} @ $
                  {trade.price.toLocaleString(undefined, {
                    maximumFractionDigits: trade.price > 100 ? 0 : 4,
                  })}
                </p>

                <p className="muted mt-1 text-xs">
                  Confidence {trade.confidence}% · {trade.time}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}