"use client";

import { useTradeCore } from "@/context/TradeCoreContext";
import BottomNav from "@/components/layout/BottomNav";
import Ticker from "@/components/layout/Ticker";

export default function BotsPage() {
  const { bots, toggleBot, deployBot } = useTradeCore();

  return (
    <main className="min-h-screen bg-black pb-32 text-white">
      <Ticker />

      <div className="px-6 pt-24">
        <p className="mb-3 text-sm tracking-[0.5em] text-blue-300">AGENT SWARM</p>
        <h1 className="mb-8 text-6xl font-black leading-none">TRADING BOTS</h1>

        <button onClick={deployBot} className="mb-8 w-full rounded-2xl bg-blue-600 py-5 text-2xl font-bold">
          Deploy New Agent
        </button>

        <section className="space-y-6">
          {bots.map((bot) => (
            <div key={bot.name} className="rounded-[35px] border border-[#13203f] bg-[#070b17] p-8">
              <div className="mb-8 flex items-start justify-between">
                <div>
                  <h2 className="text-5xl font-black">{bot.name}</h2>
                  <p className="mt-2 text-xl text-zinc-500">{bot.symbol} Agent</p>
                </div>
                <div className={`h-6 w-6 rounded-full ${bot.active ? "bg-green-400" : "bg-red-400"}`} />
              </div>

              <div className="mb-8 grid grid-cols-2 gap-4">
                <Mini title="P/L" value={`${bot.pl >= 0 ? "+" : ""}${bot.pl}%`} green={bot.pl >= 0} />
                <Mini title="Trades" value={bot.trades.toLocaleString()} />
                <Mini title="Boost" value={String(bot.boost)} />
                <Mini title="Capital" value={`$${bot.capital}`} />
              </div>

              <button onClick={() => toggleBot(bot.name)} className={`w-full rounded-2xl py-5 text-2xl font-bold ${bot.active ? "bg-blue-600" : "bg-zinc-700"}`}>
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

function Mini({ title, value, green }: { title: string; value: string; green?: boolean }) {
  return (
    <div className="rounded-2xl bg-[#161b2d] p-5">
      <p className="mb-2 text-zinc-400">{title}</p>
      <p className={`text-4xl font-black ${green ? "text-green-400" : ""}`}>{value}</p>
    </div>
  );
}