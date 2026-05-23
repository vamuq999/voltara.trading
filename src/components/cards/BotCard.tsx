interface BotCardProps {
  name: string;
  pnl: string;
  trades: number;
  boost: number;
  active: boolean;
}

export default function BotCard({
  name,
  pnl,
  trades,
  boost,
  active,
}: BotCardProps) {
  return (
    <div className="glass glow rounded-3xl p-6 border border-white/5">

      <div className="flex items-center justify-between">

        <h2 className="text-2xl font-black">
          {name}
        </h2>

        <div
          className={`w-4 h-4 rounded-full ${
            active ? "bg-green-400" : "bg-red-400"
          }`}
        />

      </div>

      <div className="mt-6 space-y-3 text-zinc-300">

        <p className="text-lg">
          P/L: {pnl}
        </p>

        <p>
          Trades: {trades}
        </p>

        <p>
          Boost Level: {boost}
        </p>

      </div>

      <button className="mt-8 w-full rounded-2xl bg-blue-600 py-4 text-lg font-bold hover:bg-blue-500 transition">
        ACTIVE TRADING
      </button>

    </div>
  );
}