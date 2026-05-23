"use client";

import {
  useAccount,
  useBalance,
  useConnect,
  useDisconnect,
} from "wagmi";

interface WalletModalProps {
  open: boolean;
  onClose: () => void;
}

export default function WalletModal({ open, onClose }: WalletModalProps) {
  const { address, isConnected, chain } = useAccount();
  const { connectors, connect, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  const { data: balance } = useBalance({
    address,
  });

  if (!open) return null;

  const shortAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : "";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-5 backdrop-blur-xl">
      <div className="panel soft-glow w-full max-w-md p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs tracking-[0.4em] text-blue-300">
              SECURE CONNECTION
            </p>

            <h2 className="mt-2 text-3xl font-black">
              {isConnected ? "Wallet Connected" : "Connect Wallet"}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="secondary-button rounded-xl px-4 py-2 text-sm"
          >
            Close
          </button>
        </div>

        {isConnected ? (
          <div className="space-y-4">
            <div className="sub-panel p-4">
              <p className="muted text-xs">Address</p>
              <p className="mt-2 font-bold">{shortAddress}</p>
            </div>

            <div className="sub-panel p-4">
              <p className="muted text-xs">Network</p>
              <p className="mt-2 font-bold">{chain?.name ?? "Unknown"}</p>
            </div>

            <div className="sub-panel p-4">
              <p className="muted text-xs">Native Balance</p>
              <p className="mt-2 font-bold">
                {balance
                  ? `${Number(balance.formatted).toFixed(5)} ${balance.symbol}`
                  : "Loading..."}
              </p>
            </div>

            <button
              onClick={() => disconnect()}
              className="secondary-button w-full rounded-2xl px-5 py-4 font-semibold"
            >
              Disconnect
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
                    Real wallet connection
                  </p>
                </div>

                <div className="h-3 w-3 animate-pulse-soft rounded-full bg-green-400" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}