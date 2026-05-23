"use client";

import { useTradeCore } from "@/context/TradeCoreContext";
import BottomNav from "@/components/layout/BottomNav";
import Ticker from "@/components/layout/Ticker";

export default function AnalyticsPage() {
  const { bots } = useTradeCore();

  return (
    <main className="min-h-screen bg-black pb-32 text-white">
      <Ticker />

      <div className="px-6 pt-24">
        <p className="mb-3 text-sm tracking-[0.5em] text-blue-300">INTELLIGENCE LAYER</p>
        <h1 className="mb-8 text-6xl font-black leading-none">ANALYTICS</h1>

        <section className="mb-8 rounded-[35px] border border-[#13203f] bg-[#070b17] p-8">
          <h2 className="mb-6 text-4xl font-black">Treasury Growth Curve</h2>
          <div className="relative h-[260px] overflow-hidden rounded-[28px] bg-[#050816]">
            <div className="absolute bottom-12 left-8 h-4 w-4 rounded-full bg-green-400" />
            <div className="absolute bottom-20 left-[28%] h-4 w-4 rounded-full bg-green-400" />
            <div className="absolute bottom-32 left-[50%] h-4 w-4 rounded-full bg-green-400" />
            <div className="absolute bottom-44 left-[75%] h-4 w-4 rounded-full bg-green-400" />
            <div className="absolute left-8 right-8 top-1/2 h-1 -rotate-12 rounded-full bg-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.8)]" />
          </div>
        </section>

        <section className="space-y-6">
          {bots.map((bot) => (
            <div key={bot.name} className="rounded-[30px] border border-[#13203f] bg-[#070b17] p-6">
              <div className="mb-3 flex justify-between">
                <span className="text-xl font-bold">{bot.name}</span>
                <span className="text-green-400">{bot.pl >= 0 ? "+" : ""}{bot.pl}%</span>
              </div>

              <div className="h-4 rounded-full bg-[#161b2d]">
                <div className="h-4 rounded-full bg-blue-500" style={{ width: `${Math.min(100, bot.boost * 11)}%` }} />
              </div>
            </div>
          ))}
        </section>
      </div>

      <BottomNav />
    </main>
  );
}