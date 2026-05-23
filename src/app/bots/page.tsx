"use client";

import { useMarketData } from "@/hooks/useMarketData";

const bots = [
  { name: "BTC TITAN", symbol: "BTC" },
  { name: "ETH REAPER", symbol: "ETH" },
  { name: "SOL SNIPER", symbol: "SOL" },
  { name: "XRP SENTINEL", symbol: "XRP" },
];

export default function BotsPage() {
  const { markets } = useMarketData();

  return (
    <main className="min-h-screen bg-black px-5 pb-28 pt-6 text-white">
      <div className="mx-auto max-w-md">
        <section className="rounded-[32px] border border-white/10 bg-[#07111f] p-6">
          <h1 className="text-5xl font-black">AI Bots</h1>

          <div className="mt-8 space-y-4">
            {bots.map((bot) => {
              const market = markets.find((m) => m.symbol === bot.symbol);

              return (
                <div key={bot.name} className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xl font-bold">{bot.name}</p>
                      <p className="mt-1 text-sm text-zinc-500">
                        {market
                          ? `$${market.price.toLocaleString()} · ${market.change.toFixed(2)}%`
                          : "Loading live market..."}
                      </p>
                    </div>

                    <div className="h-3 w-3 rounded-full bg-green-400" />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}