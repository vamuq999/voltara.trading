"use client";

import { useMarketData } from "@/hooks/useMarketData";
import MarketChart from "@/components/dashboard/MarketChart";

export default function AnalyticsPage() {
  const { markets } = useMarketData();

  const strongest = [...markets].sort((a, b) => b.change - a.change)[0];
  const weakest = [...markets].sort((a, b) => a.change - b.change)[0];

  return (
    <main className="min-h-screen bg-black px-5 pb-28 pt-6 text-white">
      <div className="mx-auto max-w-md space-y-6">
        <section className="rounded-[32px] border border-white/10 bg-[#07111f] p-6">
          <h1 className="text-5xl font-black">Analytics</h1>

          <div className="mt-8 space-y-4">
            <Box label="Strongest Asset" value={strongest ? `${strongest.symbol} ${strongest.change.toFixed(2)}%` : "--"} green />
            <Box label="Weakest Asset" value={weakest ? `${weakest.symbol} ${weakest.change.toFixed(2)}%` : "--"} />
            <Box label="Signal Engine" value="ONLINE" blue />
          </div>
        </section>

        <section className="rounded-[32px] border border-white/10 bg-[#07111f] p-6">
          <h2 className="mb-5 text-3xl font-bold">Market Trend</h2>
          <MarketChart />
        </section>
      </div>
    </main>
  );
}

function Box({ label, value, green, blue }: { label: string; value: string; green?: boolean; blue?: boolean }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
      <p className="text-sm text-zinc-500">{label}</p>
      <p className={`mt-2 text-3xl font-bold ${green ? "text-green-400" : ""} ${blue ? "text-blue-400" : ""}`}>
        {value}
      </p>
    </div>
  );
}