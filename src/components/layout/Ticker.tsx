export default function Ticker() {
  return (
    <div className="fixed left-0 top-0 z-50 w-full overflow-hidden border-b border-[#1c274c] bg-black/90 backdrop-blur-xl">
      <div className="flex animate-marquee gap-12 whitespace-nowrap px-6 py-3 text-sm text-zinc-300">
        <span>BTC +2.4%</span>
        <span>ETH +5.1%</span>
        <span>SOL +8.8%</span>
        <span>DOGE -1.2%</span>
        <span>XRP +3.4%</span>
        <span>ADA +2.1%</span>
        <span>LINK +4.9%</span>
      </div>
    </div>
  );
}