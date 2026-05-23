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

export default function Home() {
  return (
    <main className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-5xl font-black tracking-tight">
            VOLTARA TRADING
          </h1>

          <p className="text-zinc-400 mt-3 text-lg">
            Autonomous Multi-Agent Crypto Trading Infrastructure
          </p>
        </div>

        <div className="glass rounded-3xl p-8 mb-8 glow">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-zinc-400">Founder Vault</p>
              <h2 className="text-3xl font-bold">$48,221</h2>
            </div>

            <div>
              <p className="text-zinc-400">Daily P/L</p>
              <h2 className="text-3xl font-bold text-green-400">
                +$4,281
              </h2>
            </div>

            <div>
              <p className="text-zinc-400">Trades Today</p>
              <h2 className="text-3xl font-bold">8,421</h2>
            </div>

            <div>
              <p className="text-zinc-400">Active Bots</p>
              <h2 className="text-3xl font-bold">7/10</h2>
            </div>
          </div>
        </div>

        <div className="mb-8 glass rounded-3xl p-8">
          <h2 className="text-2xl font-bold mb-6">
            Hero Section
          </h2>

          <div className="rounded-3xl border border-blue-500/20 bg-black/30 p-10">
            <h2 className="text-4xl font-black mb-4">
              Trade Smarter With Autonomous Agents
            </h2>

            <p className="text-zinc-400 max-w-2xl text-lg">
              Deploy intelligent crypto trading bots, monitor live market
              activity, manage treasury systems and evolve your AI trading
              infrastructure in real time.
            </p>

            <button className="mt-8 rounded-2xl bg-blue-600 px-8 py-4 font-bold hover:bg-blue-500 transition-all">
              Launch TradeCore
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {bots.map((bot) => (
            <BotCard key={bot.name} {...bot} />
          ))}
        </div>

        <footer className="mt-20 text-center text-zinc-500 pb-10">
          <p className="text-lg font-semibold">
            Voltara Trading
          </p>

          <p className="text-sm mt-1">
            Powered by TradeCore
          </p>
        </footer>
      </div>
    </main>
  );
}