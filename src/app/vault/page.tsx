"use client"

import { useAccount } from "wagmi"

export default function VaultPage() {
  const { address, isConnected } = useAccount()

  return (
    <main className="mx-auto max-w-md p-6">
      <div className="rounded-3xl border border-white/10 bg-[#07111f] p-6">
        <h1 className="text-4xl font-black">
          Vault
        </h1>

        <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5">
          <div className="text-sm text-zinc-500">
            Wallet Status
          </div>

          <div className="mt-2 text-2xl font-bold">
            {isConnected
              ? "Connected"
              : "Disconnected"}
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-5">
          <div className="text-sm text-zinc-500">
            Address
          </div>

          <div className="mt-2 break-all text-sm">
            {address || "No wallet connected"}
          </div>
        </div>
      </div>
    </main>
  )
}