"use client";

import { useTradeCore } from "@/context/TradeCoreContext";
import BottomNav from "@/components/layout/BottomNav";
import Ticker from "@/components/layout/Ticker";

export default function VaultPage() {
  const { vault, bots } = useTradeCore();
  const allocated = bots.reduce((acc, bot) => acc + bot.capital, 0);

  return (
    <main className="min-h-screen bg-black pb-32 text-white">
      <Ticker />

      <div className="px-6 pt-24">
        <p className="mb-3 text-sm tracking-[0.5em] text-blue-300">FOUNDER TREASURY</p>
        <h1 className="mb-8 text-6xl font-black leading-none">FOUNDER VAULT</h1>

        <section className="mb-8 space-y-6">
          <VaultBox title="Founder Vault Balance" value={`$${vault.toLocaleString()}`} />
          <VaultBox title="Allocated To Bots" value={`$${allocated.toLocaleString()}`} />
          <VaultBox title="Available Reserve" value={`$${(vault - allocated).toLocaleString()}`} />
        </section>

        <button onClick={() => alert("Coinbase Wallet connection placeholder active.")} className="mb-8 w-full rounded-2xl bg-blue-600 py-5 text-2xl font-bold">
          Connect Coinbase Wallet
        </button>

        <section className="rounded-[35px] border border-[#13203f] bg-[#070b17] p-8">
          <h2 className="mb-6 text-4xl font-black">Treasury Activity</h2>

          <div className="space-y-4 text-xl text-zinc-300">
            <p className="rounded-2xl bg-[#161b2d] p-5">ETH REAPER allocation stable.</p>
            <p className="rounded-2xl bg-[#161b2d] p-5">BTC TITAN vault link active.</p>
            <p className="rounded-2xl bg-[#161b2d] p-5">Profit withdrawal route prepared.</p>
          </div>
        </section>
      </div>

      <BottomNav />
    </main>
  );
}

function VaultBox({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-[35px] border border-[#13203f] bg-[#070b17] p-8">
      <p className="mb-3 text-xl text-zinc-400">{title}</p>
      <h2 className="text-6xl font-black">{value}</h2>
    </div>
  );
}