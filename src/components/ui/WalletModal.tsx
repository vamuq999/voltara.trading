"use client";

interface WalletModalProps {
  open: boolean;
  onClose: () => void;
}

const wallets = [
  "Coinbase Wallet",
  "MetaMask",
  "WalletConnect",
];

export default function WalletModal({
  open,
  onClose,
}: WalletModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-xl px-5">
      <div className="panel soft-glow w-full max-w-md p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs tracking-[0.4em] text-blue-300">
              SECURE CONNECTION
            </p>

            <h2 className="mt-2 text-3xl font-black">
              Connect Wallet
            </h2>
          </div>

          <button
            onClick={onClose}
            className="secondary-button rounded-xl px-4 py-2 text-sm"
          >
            Close
          </button>
        </div>

        <div className="space-y-3">
          {wallets.map((wallet) => (
            <button
              key={wallet}
              onClick={() => {
                alert(`${wallet} connected.`);
                onClose();
              }}
              className="secondary-button flex w-full items-center justify-between rounded-2xl px-5 py-5 text-left"
            >
              <div>
                <h3 className="font-semibold">
                  {wallet}
                </h3>

                <p className="muted mt-1 text-sm">
                  Secure encrypted connection
                </p>
              </div>

              <div className="h-3 w-3 rounded-full bg-green-400 animate-pulse-soft" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}