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
      ? "bg-yellow-300 shadow-yellow-300/50"
      : bot.status === "active"
      ? "bg-green-400 shadow-green-400/50"
      : "bg-red-400 shadow-red-400/50";

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

        <div className={`h-4 w-4 rounded-full shadow-lg ${statusClass}`} />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <Mini title="P/L" value={`${positive ? "+" : ""}${bot.pnl}%`} positive={positive} />
        <Mini title="Trades" value={bot.trades.toLocaleString()} />
        <Mini title="Boost" value={`${bot.boost}`} />
        <Mini title="Capital" value={`$${bot.allocation}`} />
      </div>

      <div className="mt-6 rounded-2xl bg-black/30 p-4">
        <div className="mb-2 flex justify-between text-xs text-zinc-400">
          <span>Signal Strength</span>
          <span>{Math.min(99, bot.boost * 10 + 29)}%</span>
        </div>

        <div className="h-2 rounded-full bg-white/10">
          <div
            className="h-2 rounded-full bg-blue-500"
            style={{ width: `${Math.min(99, bot.boost * 10 + 29)}%` }}
          />
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

function Mini({
  title,
  value,
  positive,
}: {
  title: string;
  value: string;
  positive?: boolean;
}) {
  return (
    <div className="rounded-2xl bg-white/5 p-4">
      <p className="text-xs text-zinc-400">{title}</p>
      <p
        className={`mt-2 text-xl font-black ${
          positive === true ? "text-green-400" : positive === false ? "text-red-400" : ""
        }`}
      >
        {value}
      </p>
    </div>
  );
}