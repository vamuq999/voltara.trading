"use client";

import { useMarketData } from "@/hooks/useMarketData";

export default function Ticker() {
  const { markets, loading } = useMarketData();

  const display =
    markets.length > 0
      ? markets
      : [
          { symbol: "BTC", price: 0, change24h: 0 },
          { symbol: "ETH", price: 0, change24h: 0 },
          { symbol: "SOL", price: 0, change24h: 0 },
        ];

  return (
    <div className="ticker fixed left-0 top-0 z-50 w-full overflow-hidden">
      <div className="flex animate-marquee gap-12 whitespace-nowrap px-6 py-3 text-sm text-zinc-300">
        {loading && <span>Loading live market feed...</span>}

        {display.map((asset: any) => (
          <span key={asset.symbol}>
            {asset.symbol}{" "}
            {asset.price
              ? `$${asset.price.toLocaleString(undefined, {
                  maximumFractionDigits: asset.price > 100 ? 0 : 3,
                })}`
              : ""}
            {" "}
            <span
              className={
                asset.change24h >= 0
                  ? "text-green-400"
                  : "text-red-400"
              }
            >
              {asset.change24h >= 0 ? "+" : ""}
              {asset.change24h.toFixed(2)}%
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}