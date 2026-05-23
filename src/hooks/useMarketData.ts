"use client";

import { useEffect, useState } from "react";

export type MarketAsset = {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  marketCap: number;
  volume: number;
  high24h: number;
  low24h: number;
};

type MarketResponse = {
  updatedAt: string;
  markets: MarketAsset[];
};

export function useMarketData() {
  const [markets, setMarkets] = useState<MarketAsset[]>([]);
  const [updatedAt, setUpdatedAt] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadMarketData() {
    try {
      const response = await fetch("/api/market", {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Market data unavailable");
      }

      const data: MarketResponse = await response.json();

      setMarkets(data.markets);
      setUpdatedAt(data.updatedAt);
      setError("");
    } catch {
      setError("Live market feed offline");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMarketData();

    const interval = setInterval(() => {
      loadMarketData();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return {
    markets,
    updatedAt,
    loading,
    error,
  };
}