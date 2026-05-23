"use client"

import { useEffect, useState } from "react"
import AISignalPanel from "@/components/dashboard/AISignalPanel"

export default function HomePage() {
  const [markets, setMarkets] = useState<any[]>([])

  async function loadMarkets() {
    try {
      const res = await fetch("/api/market")

      const data = await res.json()

      setMarkets(data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    loadMarkets()

    const interval = setInterval(loadMarkets, 10000)

    return () => clearInterval(interval)
  }, [])

  return (
    <main className="min-h-screen bg-black text-white">
      {/* TOP MARKET BAR */}

      <div className="border-b border-blue-500/10 bg-[#050816]">
        <div className="flex gap-8 overflow-x-auto whitespace-nowrap px-6 py-4 text-sm">
          {markets.map((coin, i) => (
            <div
              key={i}
              className="flex items-center gap-2"
            >
              <span className="font-semibold">
                {coin.symbol}
              </span>

              <span>
                $
                {coin.price?.toLocaleString()}
              </span>

              <span
                className={
                  coin.change >= 0
                    ? "text-green-400"
                    : "text-red-400"
                }
              >
                {coin.change?.toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* HERO */}

      <section className="px-6 pt-10">
        <div className="rounded-[32px] border border-blue-500/10 bg-[#071120] p-8 shadow-[0_0_80px_rgba(0,100,255,0.12)]">
          <p className="mb-4 text-sm tracking-[0.4em] text-blue-300">
            TRADECORE ONLINE
          </p>

          <h1 className="max-w-xl text-6xl font-black leading-none">
            VOLTARA
            <br />
            TRADING
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-gray-400">
            Autonomous Multi-Agent Crypto Trading
            Infrastructure powered by AI reasoning,
            live market feeds and wallet intelligence.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4">
            <div className="rounded-3xl border border-blue-500/10 bg-[#101827] p-6">
              <p className="text-sm text-gray-400">
                Founder Vault
              </p>

              <p className="mt-3 text-4xl font-bold">
                $48,221
              </p>
            </div>

            <div className="rounded-3xl border border-blue-500/10 bg-[#101827] p-6">
              <p className="text-sm text-gray-400">
                Daily P/L
              </p>

              <p className="mt-3 text-4xl font-bold text-green-400">
                +$4,281
              </p>
            </div>

            <div className="rounded-3xl border border-blue-500/10 bg-[#101827] p-6">
              <p className="text-sm text-gray-400">
                Trades Today
              </p>

              <p className="mt-3 text-4xl font-bold">
                8,421
              </p>
            </div>

            <div className="rounded-3xl border border-blue-500/10 bg-[#101827] p-6">
              <p className="text-sm text-gray-400">
                Active Bots
              </p>

              <p className="mt-3 text-4xl font-bold">
                6/10
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI SECTION */}

      <section className="space-y-8 px-6 py-10">
        <div className="rounded-[32px] border border-blue-500/10 bg-[#071120] p-8">
          <h2 className="mb-6 text-4xl font-bold">
            AI System Status
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-2xl bg-[#121a2b] p-5">
              <span className="text-gray-400">
                Market Sentiment
              </span>

              <span className="font-bold text-green-400">
                BULLISH
              </span>
            </div>

            <div className="flex items-center justify-between rounded-2xl bg-[#121a2b] p-5">
              <span className="text-gray-400">
                AI Network
              </span>

              <span className="font-bold text-green-400">
                STABLE
              </span>
            </div>

            <div className="flex items-center justify-between rounded-2xl bg-[#121a2b] p-5">
              <span className="text-gray-400">
                Treasury Engine
              </span>

              <span className="font-bold text-green-400">
                ACTIVE
              </span>
            </div>
          </div>
        </div>

        {/* AI SIGNALS */}

        <AISignalPanel />

        {/* CONSOLE */}

        <div className="rounded-[32px] border border-blue-500/10 bg-[#071120] p-8">
          <h2 className="mb-6 text-4xl font-bold">
            AI Command Console
          </h2>

          <div className="rounded-3xl bg-black p-6 font-mono text-green-400">
            <div className="space-y-4">
              <p>
                &gt; ETH REAPER confidence:
                HIGH
              </p>

              <p>
                &gt; BTC TITAN trend lock
                confirmed.
              </p>

              <p>
                &gt; Scanning multi-agent
                market grid...
              </p>

              <p>
                &gt; Treasury engine
                synchronized.
              </p>

              <p>
                &gt; TradeCore kernel online.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}

      <footer className="px-6 pb-32 pt-10 text-center">
        <p className="text-2xl font-bold">
          Voltara Trading
        </p>

        <p className="mt-2 text-gray-500">
          Powered by TradeCore
        </p>
      </footer>

      {/* BOTTOM NAV */}

      <div className="fixed bottom-0 left-0 right-0 border-t border-blue-500/10 bg-black/90 backdrop-blur-xl">
        <div className="flex items-center justify-around py-5">
          <button className="text-white">
            Dashboard
          </button>

          <button className="text-gray-500">
            Bots
          </button>

          <button className="text-gray-500">
            Vault
          </button>

          <button className="text-gray-500">
            Analytics
          </button>
        </div>
      </div>
    </main>
  )
}