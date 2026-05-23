"use client"

import { useEffect, useState } from "react"

export default function AISignalPanel() {
  const [data, setData] = useState<any>(null)

  async function loadSignals() {
    try {
      const res = await fetch("/api/ai")

      const json = await res.json()

      setData(json)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    loadSignals()

    const interval = setInterval(loadSignals, 15000)

    return () => clearInterval(interval)
  }, [])

  if (!data) {
    return (
      <div className="rounded-3xl border border-blue-500/10 bg-[#0b1120] p-6">
        Loading AI signals...
      </div>
    )
  }

  const analysis = data.analysis

  return (
    <div className="rounded-3xl border border-blue-500/10 bg-[#0b1120] p-6 shadow-2xl shadow-blue-500/10">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">
          AI Signal Engine
        </h2>

        <div className="h-3 w-3 rounded-full bg-green-400 animate-pulse" />
      </div>

      <div className="space-y-4">
        <div className="rounded-2xl bg-[#121a2b] p-4">
          <p className="text-sm text-gray-400">Market Sentiment</p>

          <p className="mt-2 text-2xl font-bold text-green-400">
            {analysis.sentiment}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl bg-[#121a2b] p-4">
            <p className="text-sm text-gray-400">Strongest</p>

            <p className="mt-2 text-xl font-bold text-white">
              {analysis.strongest}
            </p>
          </div>

          <div className="rounded-2xl bg-[#121a2b] p-4">
            <p className="text-sm text-gray-400">Weakest</p>

            <p className="mt-2 text-xl font-bold text-white">
              {analysis.weakest}
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-[#121a2b] p-4">
          <p className="text-sm text-gray-400">AI Outlook</p>

          <p className="mt-2 text-white">
            {analysis.outlook}
          </p>
        </div>

        <div className="rounded-2xl bg-[#121a2b] p-4">
          <p className="text-sm text-gray-400">Confidence</p>

          <p className="mt-2 text-3xl font-bold text-blue-400">
            {analysis.confidence}%
          </p>
        </div>

        <div className="rounded-2xl bg-[#121a2b] p-4">
          <p className="mb-3 text-sm text-gray-400">
            Autonomous Actions
          </p>

          <div className="space-y-2">
            {analysis.actions?.map((action: string, i: number) => (
              <div
                key={i}
                className="rounded-xl bg-[#0b1120] p-3 text-green-400"
              >
                {action}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}