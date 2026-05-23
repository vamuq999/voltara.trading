type BotStatus = "active" | "paused" | "boosted";

type Bot = {
  name: string;
  symbol: string;
  pnl: number;
  trades: number;
  boost: number;
  status: BotStatus;
  allocation: number;
};

interface BotCardProps {
  bot: Bot;
  onOpen: () => void;
}

export default function BotCard({ bot, onOpen }: BotCardProps) {
  const positive = bot.pnl >= 0;

  const statusClass =
    bot.status === "boosted"
      ? "bg-yellow-300"
      : bot.status === "active"
      ? "bg-green-400"
      : "bg-red-400";

  const label =
    bot.status === "boosted"
      ? "BOOSTED"
      : bot.status === "active"
      ? "ACTIVE"
      : "PAUSED";

  return (
    <div className="glass glow rounded-3xl border border-white/5 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black">{bot.name}</h2>
          <p className="mt-1 text-sm text-zinc-500">{bot.symbol} Agent</p>
        </div>

        <div className={`h-4 w-4 rounded-full ${statusClass}`} />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-white/5 p-4">
          <p className="text-xs text-zinc-400">P/L</p>
          <p className={positive ? "mt-2 text-xl font-black text-green-400" : "mt-2 text-xl font-black text-red-400"}>
            {positive ? "+" : ""}
            {bot.pnl}%
          </p>
        </div>

        <div className="rounded-2xl bg-white/5 p-4">
          <p className="text-xs text-zinc-400">Trades</p>
          <p className="mt-2 text-xl font-black">{bot.trades.toLocaleString()}</p>
        </div>

        <div className="rounded-2xl bg-white/5 p-4">
          <p className="text-xs text-zinc-400">Boost</p>
          <p className="mt-2 text-xl font-black">{bot.boost}</p>
        </div>

        <div className="rounded-2xl bg-white/5 p-4">
          <p className="text-xs text-zinc-400">Capital</p>
          <p className="mt-2 text-xl font-black">${bot.allocation}</p>
        </div>
      </div>

      <button
        onClick={onOpen}
        className="mt-6 w-full rounded-2xl bg-blue-600 py-4 text-base font-bold transition hover:bg-blue-500"
      >
        {label} TRADING
      </button>
    </div>
  );
}