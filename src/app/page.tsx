export default function HomePage() {
  return (
    <main className="mx-auto max-w-md p-6 space-y-6">
      <div className="rounded-3xl border border-white/10 bg-[#07111f] p-6">
        <div className="mb-3 text-xs tracking-[0.4em] text-blue-300">
          TRADECORE ONLINE
        </div>

        <h1 className="text-5xl font-black leading-none">
          VOLTARA
          <br />
          TRADING
        </h1>

        <p className="mt-5 text-zinc-400 leading-relaxed">
          Autonomous Multi-Agent Crypto Trading
          Infrastructure powered by AI reasoning,
          live market feeds and wallet intelligence.
        </p>

        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
            <div className="text-sm text-zinc-500">
              Founder Vault
            </div>

            <div className="mt-3 text-4xl font-bold">
              $48,221
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
            <div className="text-sm text-zinc-500">
              Daily P/L
            </div>

            <div className="mt-3 text-4xl font-bold text-green-400">
              +$4,281
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
            <div className="text-sm text-zinc-500">
              Trades Today
            </div>

            <div className="mt-3 text-4xl font-bold">
              8,421
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
            <div className="text-sm text-zinc-500">
              Active Bots
            </div>

            <div className="mt-3 text-4xl font-bold">
              6/10
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-[#07111f] p-6">
        <h2 className="text-3xl font-bold">
          AI Command Console
        </h2>

        <div className="mt-5 rounded-2xl bg-black p-5 font-mono text-green-400 space-y-4 text-sm">
          <div>
            {">"} ETH REAPER confidence: HIGH
          </div>

          <div>
            {">"} BTC TITAN trend lock confirmed.
          </div>

          <div>
            {">"} Scanning multi-agent market grid...
          </div>

          <div>
            {">"} Treasury engine synchronized.
          </div>

          <div>
            {">"} TradeCore kernel online.
          </div>
        </div>
      </div>
    </main>
  )
}