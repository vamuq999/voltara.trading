"use client";

import { useParams } from "next/navigation";

import BottomNav from "@/components/layout/BottomNav";
import Ticker from "@/components/layout/Ticker";

export default function BotDetailPage() {
  const params = useParams();

  const slug = String(params.slug)
    .replace(/-/g, " ")
    .toUpperCase();

  return (
    <main className="min-h-screen pb-32">
      <Ticker />

      <div className="mx-auto max-w-5xl px-5 pt-24">
        <p className="mb-4 text-xs tracking-[0.4em] text-blue-300">
          AUTONOMOUS AGENT
        </p>

        <h1 className="text-5xl font-black md:text-7xl">
          {slug}
        </h1>

        <p className="muted mt-5 text-lg">
          Advanced autonomous market intelligence agent.
        </p>

        {/* STATS */}

        <section className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <Card
            title="P/L"
            value="+24.2%"
            green
          />

          <Card
            title="Trades"
            value="2,241"
          />

          <Card
            title="Boost"
            value="9"
          />

          <Card
            title="Confidence"
            value="HIGH"
          />
        </section>

        {/* CHART */}

        <section className="panel mt-8 p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              Performance Curve
            </h2>

            <span className="muted text-sm">
              30d
            </span>
          </div>

          <div className="grid-chart relative h-[280px] overflow-hidden rounded-3xl bg-black/20">
            <div className="absolute bottom-10 left-5 right-5 h-[2px] -rotate-6 rounded-full bg-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.7)]" />

            <div className="absolute bottom-[20%] left-[10%] h-4 w-4 rounded-full bg-green-400" />

            <div className="absolute bottom-[35%] left-[30%] h-4 w-4 rounded-full bg-green-400" />

            <div className="absolute bottom-[50%] left-[55%] h-4 w-4 rounded-full bg-green-400" />

            <div className="absolute bottom-[70%] left-[82%] h-4 w-4 rounded-full bg-green-400" />
          </div>
        </section>

        {/* AI ANALYSIS */}

        <section className="panel mt-8 p-6">
          <h2 className="mb-5 text-2xl font-bold">
            AI Analysis
          </h2>

          <div className="space-y-4">
            <div className="sub-panel p-4 text-sm text-zinc-300">
              Momentum conditions remain strongly bullish.
            </div>

            <div className="sub-panel p-4 text-sm text-zinc-300">
              Liquidity zones successfully defended.
            </div>

            <div className="sub-panel p-4 text-sm text-zinc-300">
              Confidence engine detecting continuation structure.
            </div>
          </div>
        </section>

        {/* RECENT ACTIVITY */}

        <section className="panel mt-8 p-6">
          <h2 className="mb-5 text-2xl font-bold">
            Recent Activity
          </h2>

          <div className="space-y-3">
            <div className="sub-panel p-4 text-sm">
              Bought ETH @ 2,914
            </div>

            <div className="sub-panel p-4 text-sm">
              Partial take profit executed
            </div>

            <div className="sub-panel p-4 text-sm">
              AI confidence increased to HIGH
            </div>
          </div>
        </section>
      </div>

      <BottomNav />
    </main>
  );
}

function Card({
  title,
  value,
  green,
}: {
  title: string;
  value: string;
  green?: boolean;
}) {
  return (
    <div className="panel p-5">
      <p className="muted text-sm">
        {title}
      </p>

      <h2
        className={`mt-3 text-4xl font-black ${
          green
            ? "text-green-400"
            : "text-white"
        }`}
      >
        {value}
      </h2>
    </div>
  );
}