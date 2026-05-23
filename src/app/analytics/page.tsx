export default function AnalyticsPage() {
  return (
    <main className="mx-auto max-w-md p-6">
      <div className="rounded-3xl border border-white/10 bg-[#07111f] p-6">
        <h1 className="text-4xl font-black">
          Analytics
        </h1>

        <div className="mt-6 space-y-4">
          <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
            <div className="text-sm text-zinc-500">
              Win Rate
            </div>

            <div className="mt-2 text-4xl font-bold text-green-400">
              91%
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
            <div className="text-sm text-zinc-500">
              Active Signals
            </div>

            <div className="mt-2 text-4xl font-bold">
              42
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
            <div className="text-sm text-zinc-500">
              Market Bias
            </div>

            <div className="mt-2 text-4xl font-bold text-blue-400">
              BULLISH
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}