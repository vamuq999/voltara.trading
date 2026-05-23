export default function NeuralBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {/* Blue Orb */}
      <div className="absolute left-[-10%] top-[10%] h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[140px]" />

      {/* Cyan Orb */}
      <div className="absolute right-[-10%] top-[40%] h-[450px] w-[450px] rounded-full bg-cyan-400/10 blur-[140px]" />

      {/* Indigo Orb */}
      <div className="absolute bottom-[-10%] left-[20%] h-[400px] w-[400px] rounded-full bg-indigo-500/10 blur-[140px]" />

      {/* Grid */}
      <div className="neural-grid" />

      {/* Animated Scan */}
      <div className="scan-line" />
    </div>
  );
}