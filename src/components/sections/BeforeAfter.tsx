"use client";

import { useState, useRef } from "react";
import Image from "next/image";

export function BeforeAfter() {
  const [pos, setPos] = useState(52);
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (clientX: number) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(92, Math.max(8, x)));
  };

  return (
    <section className="bg-[#0A0A0B] border-y border-white/5 py-16 lg:py-20">
      <div className="max-w-[1100px] mx-auto px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] text-white/40 font-mono">
            <span className="h-[1px] w-6 bg-[#D4A853]" /> BEFORE / AFTER <span className="h-[1px] w-6 bg-[#D4A853]" />
          </div>
          <h2 className="text-[28px] sm:text-[36px] font-black tracking-[-0.02em] mt-3 leading-none" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            THE DIFFERENCE IS IN THE <span className="metallic">DETAIL.</span>
          </h2>
          <p className="text-sm text-white/50 mt-3 leading-relaxed">
            Drag the slider — real component photography. Left: before inspection. Right: after precision care.
          </p>
        </div>

        <div
          ref={ref}
          className="relative mt-10 rounded-2xl overflow-hidden bg-[#0c0d10] border border-white/10 h-[380px] sm:h-[480px] select-none touch-none cursor-ew-resize shadow-2xl"
          onMouseMove={(e) => e.buttons === 1 && onMove(e.clientX)}
          onTouchMove={(e) => onMove(e.touches[0].clientX)}
          onClick={(e) => onMove(e.clientX)}
        >
          {/* after - FIX: primary local, remote fallback */}
          <div className="absolute inset-0">
            <Image src="/gallery/photo-5.jpg" alt="After service - clean engine" fill className="object-cover" unoptimized />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute top-4 left-4 inline-flex items-center gap-2 text-[11px] tracking-[0.16em] bg-emerald-500 text-white rounded-full px-3 py-1 shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> AFTER • INSPECTED & SERVICED
            </div>
            <div className="absolute bottom-6 left-6 right-6">
              <div className="text-lg font-black text-white drop-shadow-lg">Detailed • Calibrated • Ready</div>
              <div className="text-sm text-white/70 drop-shadow">Clean component • verified torque • documented with photos</div>
            </div>
          </div>

          {/* before - clipped - FIX: primary local */}
          <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
            <Image src="/gallery/photo-3.jpg" alt="Before inspection - as received" fill className="object-cover" unoptimized />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
            <div className="absolute inset-0 bg-[#ff6b6b]/10 mix-blend-overlay" />
            <div className="absolute top-4 left-4 inline-flex items-center gap-2 text-[11px] tracking-[0.16em] bg-white/90 text-black rounded-full px-3 py-1 shadow-lg">BEFORE • PRE-INSPECTION</div>
            <div className="absolute bottom-6 left-6 right-6">
              <div className="text-lg font-black text-white/90 drop-shadow-lg">As Received • To Be Inspected</div>
              <div className="text-sm text-white/60 drop-shadow">Dust • wear • pending check — awaiting precision</div>
            </div>
          </div>

          <div className="absolute top-0 bottom-0 w-[3px] bg-white shadow-[0_0_16px_rgba(255,255,255,0.8)]" style={{ left: `${pos}%` }}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white text-black grid place-items-center shadow-xl border-2 border-white">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M8 12 H16 M12 8 L16 12 L12 16 M12 16 L8 12 L12 8" />
              </svg>
            </div>
          </div>

          <div className="absolute bottom-3 left-3 text-[10px] tracking-[0.14em] font-mono px-2.5 py-1 rounded-full bg-black/60 border border-white/15 backdrop-blur text-white/80">DRAG TO COMPARE</div>
          <div className="absolute bottom-3 right-3 text-[10px] tracking-wide px-2.5 py-1 rounded-full bg-[#D4A853] text-black font-bold hidden sm:block shadow-lg">REAL WORKSHOP PHOTOS</div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-5">
          <span className="text-xs text-white/30 hidden sm:block">BEFORE</span>
          <input type="range" min={8} max={92} value={pos} onChange={(e) => setPos(Number(e.target.value))} className="w-full sm:w-80 accent-[#D4A853] h-1.5" />
          <span className="text-xs text-white/30 hidden sm:block">AFTER</span>
          <span className="text-xs font-mono bg-white/5 border border-white/10 rounded-full px-3 py-1 text-white/60">{pos.toFixed(0)}% — {(100 - pos).toFixed(0)}%</span>
        </div>
      </div>
    </section>
  );
}
