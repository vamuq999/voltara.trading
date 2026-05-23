"use client";

import { useAccount, useBalance, useConnect, useDisconnect } from "wagmi";

export default function VaultPage() {
  const { address, isConnected, chain } = useAccount();
  const { connectors, connect, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  const { data: balance } = useBalance({
    address,
    query: { enabled: Boolean(address), refetchInterval: 15000 },
  });

  const shortAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "No wallet connected";

  return (
    <main className="min-h-screen bg-black px-5 pb-28 pt-6 text-white">
      <div className="mx-auto max-w-md space-y-6">
        <section className="rounded-[32px] border border-white/10 bg-[#07111f] p-6">
          <h1 className="text-5xl font-black">Vault</h1>

          <div className="mt-8 space-y-4">
            <Info label="Wallet Status" value={isConnected ? "Connected" : "Disconnected"} />
            <Info label="Address" value={shortAddress} />
            <Info label="Network" value={chain?.name ?? "No network"} />
            <Info
              label="Native Balance"
              value={balance ? `${Number(balance.formatted).toFixed(6)} ${balance.symbol}` : isConnected ? "Loading..." : "Connect wallet"}
            />
          </div>

          {!isConnected ? (
            <div className="mt-6 space-y-3">
              {connectors.map((connector) => (
                <button
                  key={connector.uid}
                  onClick={() => connect({ connector })}
                  disabled={isPending}
                  className="w-full rounded-2xl border border-blue-500/30 bg-blue-500/15 px-5 py-4 font-bold text-white"
                >
                  Connect {connector.name}
                </button>
              ))}
            </div>
          ) : (
            <button
              onClick={() => disconnect()}
              className="mt-6 w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 font-bold"
            >
              Disconnect Wallet
            </button>
          )}
        </section>

        <section className="rounded-[32px] border border-white/10 bg-[#07111f] p-6">
          <h2 className="text-3xl font-bold">Security</h2>
          <div className="mt-5 space-y-3 text-sm text-zinc-400">
            <p>No seed phrases.</p>
            <p>No token approvals.</p>
            <p>No automatic withdrawals.</p>
            <p>Read-only wallet status at this stage.</p>
          </div>
        </section>
      </div>
    </main>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
      <p className="text-sm text-zinc-500">{label}</p>
      <p className="mt-2 break-all text-xl font-bold">{value}</p>
    </div>
  );
}