import { NextResponse } from "next/server";

const ids =
  "bitcoin,ethereum,solana,dogecoin,ripple,cardano,chainlink,avalanche-2";

const symbols: Record<string, string> = {
  bitcoin: "BTC",
  ethereum: "ETH",
  solana: "SOL",
  dogecoin: "DOGE",
  ripple: "XRP",
  cardano: "ADA",
  chainlink: "LINK",
  "avalanche-2": "AVAX",
};

export async function GET() {
  const url =
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}` +
    `&order=market_cap_desc&per_page=8&page=1&sparkline=false&price_change_percentage=24h`;

  const res = await fetch(url, { next: { revalidate: 60 } });

  if (!res.ok) {
    return NextResponse.json({ markets: [] }, { status: 200 });
  }

  const data = await res.json();

  return NextResponse.json({
    markets: data.map((coin: any) => ({
      id: coin.id,
      symbol: symbols[coin.id],
      name: coin.name,
      price: coin.current_price,
      change: coin.price_change_percentage_24h ?? 0,
      high: coin.high_24h,
      low: coin.low_24h,
      volume: coin.total_volume,
    })),
  });
}