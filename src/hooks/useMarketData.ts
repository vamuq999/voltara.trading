"use client";

import { useEffect, useState } from "react";

export type MarketAsset = {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  high: number;
  low: number;
  volume: number;
};

export function useMarketData() {
  const [markets, setMarkets] = useState<MarketAsset[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    try {
      const res = await fetch("/api/market", { cache: "no-store" });
      const data = await res.json();
      setMarkets(data.markets || []);
    } catch {
      setMarkets([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    const interval = setInterval(load, 60000);
    return () => clearInterval(interval);
  }, []);

  return { markets, loading };
}