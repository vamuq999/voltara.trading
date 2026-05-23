export default function BotsPage() {
  return (
    <main className="mx-auto max-w-md p-6">
      <div className="rounded-3xl border border-white/10 bg-[#07111f] p-6">
        <h1 className="text-4xl font-black">
          AI Bots
        </h1>

        <div className="mt-6 space-y-4">
          {[
            "ETH REAPER",
            "BTC TITAN",
            "SOL SNIPER",
            "OMEGA SCALPER",
          ].map((bot) => (
            <div
              key={bot}
              className="rounded-2xl border border-white/10 bg-black/20 p-5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold">
                    {bot}
                  </div>

                  <div className="text-sm text-zinc-500">
                    Active
                  </div>
                </div>

                <div className="h-3 w-3 rounded-full bg-green-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}