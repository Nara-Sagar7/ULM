export default function Loading() {
  return (
    <div className="min-h-screen grid place-items-center bg-[#0A0A0B]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-full border border-white/10 border-t-[#D4A853] animate-spin" />
        <span className="text-[10px] tracking-[0.3em] text-white/40 font-mono">LOADING EXPERIENCE</span>
      </div>
    </div>
  );
}
