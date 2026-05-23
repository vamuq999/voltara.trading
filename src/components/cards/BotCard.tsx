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
    <div className="glass glow rounded-3xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">{name}</h2>

        <div
          className={`w-3 h-3 rounded-full ${
            active ? "bg-green-400" : "bg-red-400"
          }`}
        />
      </div>

      <div className="space-y-2 text-sm text-zinc-300">
        <p>P/L: {pnl}</p>
        <p>Trades: {trades}</p>
        <p>Boost Level: {boost}</p>
      </div>

      <button className="mt-5 w-full rounded-2xl bg-blue-600 py-3 font-semibold hover:bg-blue-500 transition-all">
        ACTIVE TRADING
      </button>
    </div>
  );
}