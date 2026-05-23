"use client";

export default function MarketChart() {
  return (
    <div className="relative h-72 overflow-hidden rounded-3xl border border-white/10 bg-black">
      {/* GRID */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />

      {/* CHART */}
      <svg
        viewBox="0 0 400 220"
        className="absolute inset-0 h-full w-full"
      >
        {/* BLUE TREND */}
        <polyline
          points="0,180 40,170 80,150 120,160 160,120 200,130 240,90 280,100 320,60 360,80 400,30"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* GREEN TREND */}
        <polyline
          points="0,200 40,190 80,175 120,180 160,145 200,150 240,125 280,130 320,95 360,105 400,70"
          fill="none"
          stroke="#22c55e"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.8"
        />

        {/* GLOW */}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* LABELS */}
      <div className="absolute left-4 top-4 text-xs text-zinc-400">
        BTC / ETH TREND ENGINE
      </div>

      <div className="absolute bottom-4 right-4 text-xs text-green-400">
        LIVE
      </div>
    </div>
  );
}