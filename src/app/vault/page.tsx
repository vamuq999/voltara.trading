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

  const { data: balance, isLoading } = useBalance({
    address,
    query: {
      enabled: Boolean(address),
      refetchInterval: 15000,
    },
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
          Secure read-only wallet authentication and treasury monitoring.
        </p>

        <section className="mt-10 grid grid-cols-1 gap-4">
          <VaultCard title="Demo Vault Balance" value={`$${vault.toLocaleString()}`} />
          <VaultCard title="Allocated To Bots" value={`$${allocated.toLocaleString()}`} />
          <VaultCard title="Available Reserve" value={`$${(vault - allocated).toLocaleString()}`} />
        </section>

        <section className="panel mt-8 p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Wallet Access</h2>
              <p className="muted mt-2 text-sm">
                No trading permissions. No token approvals. No seed phrases.
              </p>
            </div>

            <div
              className={`h-3 w-3 rounded-full ${
                isConnected ? "animate-pulse-soft bg-green-400" : "bg-red-400"
              }`}
            />
          </div>

          <div className="mb-4 grid gap-3">
            <Info title="Status" value={isConnected ? "Connected" : "Disconnected"} />
            <Info title="Address" value={shortAddress} />
            <Info title="Network" value={chain?.name ?? "No network detected"} />
            <Info
              title="Native Balance"
              value={
                isConnected
                  ? isLoading
                    ? "Loading..."
                    : balance
                    ? `${Number(balance.formatted).toFixed(6)} ${balance.symbol}`
                    : "Unavailable"
                  : "Connect wallet to view"
              }
            />
          </div>

          <button
            onClick={openWallet}
            className="primary-button w-full rounded-2xl px-6 py-4 text-base font-semibold"
          >
            {isConnected ? "Manage Wallet" : "Connect Wallet"}
          </button>
        </section>

        <section className="panel mt-8 p-6">
          <h2 className="mb-5 text-2xl font-bold">Security Rules</h2>

          <div className="space-y-3">
            <Rule text="Never enter a seed phrase into this app." />
            <Rule text="Wallet connection is read-only at this stage." />
            <Rule text="No token approvals are requested." />
            <Rule text="No automatic withdrawals are enabled." />
            <Rule text="Real trading must use a separate small test wallet first." />
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

function Info({ title, value }: { title: string; value: string }) {
  return (
    <div className="sub-panel p-4">
      <p className="muted text-xs">{title}</p>
      <p className="mt-2 break-all font-bold">{value}</p>
    </div>
  );
}

function Rule({ text }: { text: string }) {
  return (
    <div className="sub-panel p-4 text-sm text-zinc-300">
      {text}
    </div>
  );
}