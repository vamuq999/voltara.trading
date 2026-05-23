import BotCard from "@/components/cards/BotCard";

const bots = [
  {
    name: "BTC TITAN",
    pnl: "+18.4%",
    trades: 1284,
    boost: 6,
    active: true,
  },
  {
    name: "ETH REAPER",
    pnl: "+24.2%",
    trades: 2241,
    boost: 9,
    active: true,
  },
  {
    name: "SOL RUNNER",
    pnl: "+12.1%",
    trades: 842,
    boost: 4,
    active: true,
  },
  {
    name: "DOGE CHAOS",
    pnl: "-2.4%",
    trades: 381,
    boost: 1,
    active: false,
  },
];

const trades = [
  "BTC TITAN bought BTC",
  "ETH REAPER exited ETH",
  "SOL RUNNER detected breakout",
  "DOGE CHAOS paused trading",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <div className="flex">

        {/* SIDEBAR */}

        <aside className="hidden lg:flex w-72 min-h-screen border-r border-white/10 bg-black/20 backdrop-blur-xl flex-col p-6">

          <h1 className="text-3xl font-black tracking-tight mb-10">
            VOLTARA
            <br />
            TRADING
          </h1>

          <nav className="space-y-3">

            <button className="w-full rounded-2xl bg-blue-600 px-4 py-4 text-left font-semibold">
              Dashboard
            </button>

            <button className="w-full rounded-2xl bg-white/5 px-4 py-4 text-left hover:bg-white/10 transition">
              Founder Vault
            </button>

            <button className="w-full rounded-2xl bg-white/5 px-4 py-4 text-left hover:bg-white/10 transition">
              Trading Bots
            </button>

            <button className="w-full rounded-2xl bg-white/5 px-4 py-4 text-left hover:bg-white/10 transition">
              Analytics
            </button>

            <button className="w-full rounded-2xl bg-white/5 px-4 py-4 text-left hover:bg-white/10 transition">
              Trade History
            </button>

            <button className="w-full rounded-2xl bg-white/5 px-4 py-4 text-left hover:bg-white/10 transition">
              Settings
            </button>

          </nav>

          <div className="mt-auto text-zinc-500 text-sm">
            <p className="font-semibold text-zinc-300">
              Voltara Trading
            </p>

            <p className="mt-1">
              Powered by TradeCore
            </p>
          </div>

        </aside>

        {/* MAIN */}

        <div className="flex-1">

          {/* TOP TICKER */}

          <div className="border-b border-white/10 overflow-hidden">
            <div className="flex gap-8 whitespace-nowrap px-6 py-4 text-sm text-zinc-300 overflow-x-auto">

              <span>BTC +2.4%</span>
              <span>ETH +5.1%</span>
              <span>SOL +8.8%</span>
              <span>DOGE -1.2%</span>
              <span>XRP +3.4%</span>
              <span>ADA +2.1%</span>

            </div>
          </div>

          <div className="p-6 max-w-7xl mx-auto">

            {/* HERO */}

            <div className="mb-10">

              <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none">
                VOLTARA
                <br />
                TRADING
              </h1>

              <p className="text-zinc-400 mt-5 text-lg max-w-2xl">
                Autonomous Multi-Agent Crypto Trading Infrastructure
              </p>

            </div>

            {/* STATS */}

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">

              <div className="glass glow rounded-3xl p-6">
                <p className="text-zinc-400 text-sm">
                  Founder Vault
                </p>

                <h2 className="text-4xl font-black mt-3">
                  $48,221
                </h2>
              </div>

              <div className="glass glow rounded-3xl p-6">
                <p className="text-zinc-400 text-sm">
                  Daily P/L
                </p>

                <h2 className="text-4xl font-black text-green-400 mt-3">
                  +$4,281
                </h2>
              </div>

              <div className="glass glow rounded-3xl p-6">
                <p className="text-zinc-400 text-sm">
                  Trades Today
                </p>

                <h2 className="text-4xl font-black mt-3">
                  8,421
                </h2>
              </div>

              <div className="glass glow rounded-3xl p-6">
                <p className="text-zinc-400 text-sm">
                  Active Bots
                </p>

                <h2 className="text-4xl font-black mt-3">
                  7/10
                </h2>
              </div>

            </div>

            {/* GRID */}

            <div className="grid xl:grid-cols-3 gap-6">

              {/* LEFT */}

              <div className="xl:col-span-2 space-y-6">

                {/* HERO CARD */}

                <div className="glass rounded-3xl p-8 glow">

                  <h2 className="text-4xl font-black leading-tight max-w-2xl">
                    Trade Smarter With Autonomous Agents
                  </h2>

                  <p className="text-zinc-400 mt-6 text-lg max-w-2xl leading-relaxed">
                    Deploy intelligent crypto trading bots, monitor live market
                    activity, manage treasury systems and evolve your AI trading
                    infrastructure in real time.
                  </p>

                  <button className="mt-8 rounded-2xl bg-blue-600 px-8 py-4 font-bold hover:bg-blue-500 transition">
                    Launch TradeCore
                  </button>

                </div>

                {/* BOTS */}

                <div className="grid md:grid-cols-2 gap-6">
                  {bots.map((bot) => (
                    <BotCard key={bot.name} {...bot} />
                  ))}
                </div>

              </div>

              {/* RIGHT */}

              <div className="space-y-6">

                {/* TRADE FEED */}

                <div className="glass rounded-3xl p-6 glow">

                  <h2 className="text-2xl font-bold mb-6">
                    Live Trade Feed
                  </h2>

                  <div className="space-y-4">

                    {trades.map((trade, index) => (
                      <div
                        key={index}
                        className="rounded-2xl bg-white/5 p-4 text-sm text-zinc-300"
                      >
                        {trade}
                      </div>
                    ))}

                  </div>

                </div>

                {/* TOP BOT */}

                <div className="glass rounded-3xl p-6 glow">

                  <h2 className="text-2xl font-bold mb-6">
                    Top Performing Bot
                  </h2>

                  <div className="rounded-3xl bg-gradient-to-br from-blue-600/20 to-cyan-400/10 border border-blue-500/20 p-6">

                    <h3 className="text-3xl font-black">
                      ETH REAPER
                    </h3>

                    <p className="text-green-400 text-5xl font-black mt-4">
                      +24.2%
                    </p>

                    <div className="mt-6 space-y-2 text-zinc-300">
                      <p>Trades: 2,241</p>
                      <p>Boost Level: 9</p>
                      <p>Confidence: HIGH</p>
                    </div>

                  </div>

                </div>

              </div>

            </div>

            {/* FOOTER */}

            <footer className="mt-20 pb-10 text-center text-zinc-500">

              <p className="text-lg font-semibold">
                Voltara Trading
              </p>

              <p className="mt-1 text-sm">
                Powered by TradeCore
              </p>

            </footer>

          </div>

        </div>

      </div>
    </main>
  );
}