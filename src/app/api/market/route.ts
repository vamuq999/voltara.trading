import { NextResponse } from "next/server";

const COINS =
  "bitcoin,ethereum,solana,dogecoin,ripple,cardano,avalanche-2,chainlink,arbitrum,cosmos";

const SYMBOLS: Record<string, string> = {
  bitcoin: "BTC",
  ethereum: "ETH",
  solana: "SOL",
  dogecoin: "DOGE",
  ripple: "XRP",
  cardano: "ADA",
  "avalanche-2": "AVAX",
  chainlink: "LINK",
  arbitrum: "ARB",
  cosmos: "ATOM",
};

export async function GET() {
  try {
    const url =
      `https://api.coingecko.com/api/v3/coins/markets` +
      `?vs_currency=usd` +
      `&ids=${COINS}` +
      `&order=market_cap_desc` +
      `&per_page=10` +
      `&page=1` +
      `&sparkline=false` +
      `&price_change_percentage=24h`;

    const response = await fetch(url, {
      next: {
        revalidate: 60,
      },
      headers: {
        accept: "application/json",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          error: "Failed to fetch market data",
        },
        {
          status: 500,
        }
      );
    }

    const data = await response.json();

    const markets = data.map((coin: any) => ({
      id: coin.id,
      name: coin.name,
      symbol: SYMBOLS[coin.id] ?? coin.symbol.toUpperCase(),
      price: coin.current_price,
      change24h: coin.price_change_percentage_24h ?? 0,
      marketCap: coin.market_cap,
      volume: coin.total_volume,
      high24h: coin.high_24h,
      low24h: coin.low_24h,
    }));

    return NextResponse.json({
      updatedAt: new Date().toISOString(),
      markets,
    });
  } catch {
    return NextResponse.json(
      {
        error: "Market engine offline",
      },
      {
        status: 500,
      }
    );
  }
}