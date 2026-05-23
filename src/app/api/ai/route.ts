import { NextResponse } from "next/server"
import { fetchAllMarkets } from "@/lib/marketData"
import { generateAISignal } from "@/lib/aiAnalysis"

export async function GET() {
  try {
    const markets = await fetchAllMarkets()

    const analysis = await generateAISignal(markets)

    return NextResponse.json({
      markets,
      analysis,
    })
  } catch (err) {
    console.error(err)

    return NextResponse.json(
      {
        error: "AI analysis failed",
      },
      {
        status: 500,
      }
    )
  }
}