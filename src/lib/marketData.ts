export async function fetchCoinPrice(symbol: string) {
  try {
    const map: Record<string, string> = {
      BTC: "bitcoin",
      ETH: "ethereum",
      SOL: "solana",
      XRP: "ripple",
      DOGE: "dogecoin",
      ADA: "cardano",
    }

    const id = map[symbol]

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_COINGECKO_API}/simple/price?ids=${id}&vs_currencies=usd&include_24hr_change=true`,
      {
        cache: "no-store",
      }
    )

    const data = await res.json()

    return {
      symbol,
      price: data[id].usd,
      change: data[id].usd_24h_change,
    }
  } catch (err) {
    console.error(err)

    return {
      symbol,
      price: 0,
      change: 0,
    }
  }
}

export async function fetchAllMarkets() {
  const markets = await Promise.all([
    fetchCoinPrice("BTC"),
    fetchCoinPrice("ETH"),
    fetchCoinPrice("SOL"),
    fetchCoinPrice("XRP"),
    fetchCoinPrice("DOGE"),
    fetchCoinPrice("ADA"),
  ])

  return markets
}