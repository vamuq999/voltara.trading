"use client";

import { useState } from "react";
import { useAccount, useBalance } from "wagmi";

import { useTradeCore } from "@/context/TradeCoreContext";
import BottomNav from "@/components/layout/BottomNav";
import Ticker from "@/components/layout/Ticker";
import WalletModal from "@/components/ui/WalletModal";
import Toast from "@/components/ui/Toast";

export default function VaultPage() {
  const { vault, bots } = useTradeCore();
  const { address, isConnected, chain } = useAccount();

  const { data: balance } = useBalance({
    address,
  });

  const [walletOpen, setWalletOpen] = useState(false);
  const [toast, setToast] = useState("");

  const allocated = bots.reduce((acc, bot) => acc + bot.capital, 0);

  function openWallet() {
    setWalletOpen(true);
    setToast("Opening secure wallet connector.");
    setTimeout(() => setToast(""), 2400);
  }

  const shortAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : "Not connected";

  return (
    <main className="min-h-screen pb-32">
      <Ticker />

      {toast && <Toast message={toast} />}

      <WalletModal open={walletOpen} onClose={() => setWalletOpen(false)} />

      <div className="mx-auto max-w-5xl px-5 pt-24">
        <p className="mb-4 text-xs tracking-[0.45em] text-blue-300">
          FOUNDER TREASURY
        </p>

        <h1 className="text-5xl font-black md:text-7xl">Founder Vault</h1>

        <p className="muted mt-5 text-lg">
          Treasury management and capital allocation layer.
        </p>

        <section className="mt-10 grid grid-cols-1 gap-4">
          <VaultCard title="Founder Vault Balance" value={`$${vault.toLocaleString()}`} />
          <VaultCard title="Allocated To Bots" value={`$${allocated.toLocaleString()}`} />
          <VaultCard title="Available Reserve" value={`$${(vault - allocated).toLocaleString()}`} />
        </section>

        <section className="panel mt-8 p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Wallet Access</h2>
              <p className="muted mt-2 text-sm">
                Real wallet authentication via wagmi.
              </p>
            </div>

            <div
              className={`h-3 w-3 rounded-full ${
                isConnected ? "animate-pulse-soft bg-green-400" : "bg-red-400"
              }`}
            />
          </div>

          <div className="mb-4 grid gap-3">
            <div className="sub-panel p-4">
              <p className="muted text-xs">Status</p>
              <p className="mt-2 font-bold">
                {isConnected ? "Connected" : "Disconnected"}
              </p>
            </div>

            <div className="sub-panel p-4">
              <p className="muted text-xs">Address</p>
              <p className="mt-2 font-bold">{shortAddress}</p>
            </div>

            <div className="sub-panel p-4">
              <p className="muted text-xs">Network</p>
              <p className="mt-2 font-bold">
                {chain?.name ?? "No network detected"}
              </p>
            </div>

            <div className="sub-panel p-4">
              <p className="muted text-xs">Native Balance</p>
              <p className="mt-2 font-bold">
                {balance
                  ? `${Number(balance.formatted).toFixed(5)} ${balance.symbol}`
                  : isConnected
                  ? "Loading..."
                  : "Connect wallet to view"}
              </p>
            </div>
          </div>

          <button
            onClick={openWallet}
            className="primary-button w-full rounded-2xl px-6 py-4 text-base font-semibold"
          >
            {isConnected ? "Manage Wallet" : "Connect Wallet"}
          </button>
        </section>

        <section className="panel mt-8 p-6">
          <h2 className="mb-5 text-2xl font-bold">Treasury Activity</h2>

          <div className="space-y-3">
            <div className="sub-panel p-4 text-sm">
              Wallet authentication layer active.
            </div>

            <div className="sub-panel p-4 text-sm">
              Founder Vault awaiting real treasury sync.
            </div>

            <div className="sub-panel p-4 text-sm">
              Profit withdrawal route prepared for future exchange layer.
            </div>
          </div>
        </section>
      </div>

      <BottomNav />
    </main>
  );
}

function VaultCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="panel p-6">
      <p className="muted text-sm">{title}</p>
      <h2 className="mt-3 text-5xl font-black">{value}</h2>
    </div>
  );
}