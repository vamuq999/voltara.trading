"use client";

import { useMemo, useState } from "react";
import { useMarketData } from "@/hooks/useMarketData";

export default function TradingBot() {
  const { markets, loading } = useMarketData();
  const [selected, setSelected] = useState("BTC");

  const asset = markets.find((m) => m.symbol === selected);

  const signal = useMemo(() => {
    if (!asset) {
      return {
        action: "SCANNING",
        confidence: 0,
        reason: "Waiting for live market data.",
        entry: "--",
        takeProfit: "--",
        stopLoss: "--",
      };
    }

    const change = asset.change;
    const price = asset.price;

    if (change > 1.5) {
      return {
        action: "BUY",
        confidence: Math.min(94, Math.round(72 + change * 4)),
        reason: `${asset.symbol} has positive 24h momentum. Bot detects continuation pressure.`,
        entry: `$${price.toLocaleString()}`,
        takeProfit: `$${(price * 1.025).toLocaleString(undefined, {
          maximumFractionDigits: 2,
        })}`,
        stopLoss: `$${(price * 0.985).toLocaleString(undefined, {
          maximumFractionDigits: 2,
        })}`,
      };
    }

    if (change < -2.5) {
      return {
        action: "SELL",
        confidence: Math.min(92, Math.round(70 + Math.abs(change) * 3)),
        reason: `${asset.symbol} is under downside pressure. Bot enters defensive mode.`,
        entry: `$${price.toLocaleString()}`,
        takeProfit: `$${(price * 0.975).toLocaleString(undefined, {
          maximumFractionDigits: 2,
        })}`,
        stopLoss: `$${(price * 1.015).toLocaleString(undefined, {
          maximumFractionDigits: 2,
        })}`,
      };
    }

    return {
      action: "HOLD",
      confidence: 61,
      reason: `${asset.symbol} is not showing enough momentum for a strong trade.`,
      entry: `$${price.toLocaleString()}`,
      takeProfit: "--",
      stopLoss: "--",
    };
  }, [asset]);

  return (
    <section className="rounded-[32px] border border-white/10 bg-[#07111f] p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs tracking-[0.4em] text-blue-300">
            AI TRADING BOT
          </p>

          <h2 className="mt-3 text-4xl font-black">
            TradeCore Agent
          </h2>
        </div>

        <div className="h-3 w-3 rounded-full bg-green-400" />
      </div>

      <div className="mb-5 grid grid-cols-4 gap-2">
        {["BTC", "ETH", "SOL", "XRP"].map((symbol) => (
          <button
            key={symbol}
            onClick={() => setSelected(symbol)}
            className={`rounded-xl border px-3 py-3 text-sm font-bold ${
              selected === symbol
                ? "border-blue-400 bg-blue-500/20 text-white"
                : "border-white/10 bg-black/20 text-zinc-500"
            }`}
          >
            {symbol}
          </button>
        ))}
      </div>

      <div className="rounded-3xl border border-white/10 bg-black/30 p-5">
        <p className="text-sm text-zinc-500">Current Asset</p>

        <h3 className="mt-2 text-4xl font-black">
          {selected}
        </h3>

        <p className="mt-2 text-zinc-400">
          {loading
            ? "Loading live data..."
            : asset
            ? `$${asset.price.toLocaleString()} · ${asset.change.toFixed(2)}%`
            : "No data"}
        </p>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4">
        <Box
          label="Bot Action"
          value={signal.action}
          color={
            signal.action === "BUY"
              ? "text-green-400"
              : signal.action === "SELL"
              ? "text-red-400"
              : "text-blue-400"
          }
        />

        <Box
          label="Confidence"
          value={`${signal.confidence}%`}
          color="text-green-400"
        />

        <Box label="Entry" value={signal.entry} />
        <Box label="Take Profit" value={signal.takeProfit} />
        <Box label="Stop Loss" value={signal.stopLoss} />
        <Box label="Mode" value="SPOT ONLY" color="text-blue-400" />
      </div>

      <div className="mt-5 rounded-2xl border border-white/10 bg-black/30 p-5">
        <p className="text-sm text-zinc-500">AI Reasoning</p>

        <p className="mt-3 leading-relaxed text-zinc-300">
          {signal.reason}
        </p>
      </div>

      <button className="mt-6 w-full rounded-2xl border border-green-500/30 bg-green-500/10 px-5 py-4 font-bold text-green-400">
        Paper Trade Signal Generated
      </button>
    </section>
  );
}

function Box({
  label,
  value,
  color = "text-white",
}: {
  label: string;
  value: string;
  color?: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <p className="text-xs text-zinc-500">{label}</p>
      <p className={`mt-2 text-xl font-black ${color}`}>{value}</p>
    </div>
  );
}