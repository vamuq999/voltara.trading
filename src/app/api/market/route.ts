import { NextResponse } from "next/server"
import { fetchAllMarkets } from "@/lib/marketData"

export async function GET() {
  try {
    const data = await fetchAllMarkets()

    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json(
      {
        error: "Failed to fetch market data",
      },
      {
        status: 500,
      }
    )
  }
}