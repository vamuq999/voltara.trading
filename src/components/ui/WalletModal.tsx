"use client";

import {
  useAccount,
  useBalance,
  useConnect,
  useDisconnect,
  useSwitchChain,
} from "wagmi";
import { base, mainnet } from "wagmi/chains";

interface WalletModalProps {
  open: boolean;
  onClose: () => void;
}

export default function WalletModal({ open, onClose }: WalletModalProps) {
  const { address, isConnected, chain } = useAccount();
  const { connectors, connect, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain, isPending: switching } = useSwitchChain();

  const { data: balance, isLoading: balanceLoading } = useBalance({
    address,
    query: {
      enabled: Boolean(address),
      refetchInterval: 15000,
    },
  });

  if (!open) return null;

  const shortAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : "";

  const supported = chain?.id === mainnet.id || chain?.id === base.id;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-5 backdrop-blur-xl">
      <div className="panel soft-glow w-full max-w-md p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs tracking-[0.4em] text-blue-300">
              SECURE WALLET
            </p>
            <h2 className="mt-2 text-3xl font-black">
              {isConnected ? "Wallet Connected" : "Connect Wallet"}
            </h2>
          </div>

          <button onClick={onClose} className="secondary-button rounded-xl px-4 py-2 text-sm">
            Close
          </button>
        </div>

        {isConnected ? (
          <div className="space-y-4">
            <SecureBox title="Address" value={shortAddress} />
            <SecureBox title="Network" value={chain?.name ?? "Unknown"} />
            <SecureBox
              title="Native Balance"
              value={
                balanceLoading
                  ? "Loading..."
                  : balance
                  ? `${Number(balance.formatted).toFixed(6)} ${balance.symbol}`
                  : "Unavailable"
              }
            />

            {!supported && (
              <div className="rounded-2xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-300">
                Unsupported network. Switch to Ethereum or Base.
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => switchChain({ chainId: mainnet.id })}
                disabled={switching}
                className="secondary-button rounded-2xl px-4 py-4 text-sm font-semibold"
              >
                Ethereum
              </button>

              <button
                onClick={() => switchChain({ chainId: base.id })}
                disabled={switching}
                className="secondary-button rounded-2xl px-4 py-4 text-sm font-semibold"
              >
                Base
              </button>
            </div>

            <button
              onClick={() => disconnect()}
              className="secondary-button w-full rounded-2xl px-5 py-4 font-semibold"
            >
              Disconnect Wallet
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {connectors.map((connector) => (
              <button
                key={connector.uid}
                onClick={() => connect({ connector })}
                disabled={isPending}
                className="secondary-button flex w-full items-center justify-between rounded-2xl px-5 py-5 text-left disabled:opacity-50"
              >
                <div>
                  <h3 className="font-semibold">{connector.name}</h3>
                  <p className="muted mt-1 text-sm">
                    Read-only wallet authentication
                  </p>
                </div>

                <div className="h-3 w-3 animate-pulse-soft rounded-full bg-green-400" />
              </button>
            ))}

            <div className="rounded-2xl bg-yellow-400/10 p-4 text-xs text-yellow-200">
              Voltara Trading will never ask for seed phrases. This connection only reads wallet address, network and balance.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SecureBox({ title, value }: { title: string; value: string }) {
  return (
    <div className="sub-panel p-4">
      <p className="muted text-xs">{title}</p>
      <p className="mt-2 break-all font-bold">{value}</p>
    </div>
  );
}