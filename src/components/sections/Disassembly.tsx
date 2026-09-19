"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { CarScene } from "@/components/3d/CarScene";

const LABELS = ["ENGINE", "BRAKES", "SUSPENSION", "TRANSMISSION", "COOLING", "ELECTRICAL", "BODY", "INTERIOR"];

export function Disassembly() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useTransform(scrollYProgress, [0, 0.5, 0.85, 1], [0, 0.85, 1, 1]);

  const [p, setP] = useState(0);
  const [manual, setManual] = useState(false);
  const [manualP, setManualP] = useState(0);
  // Sync scroll -> p only when not in manual mode
  useMotionValueEvent(progress, "change", (v) => {
    if (!manual) setP(v);
  });

  // effective progress: manual slider overrides scroll
  const effectiveP = manual ? manualP : p;

  const text1Opacity = useTransform(scrollYProgress, [0, 0.1, 0.18], [1, 1, 0]);

  return (
    <section ref={ref} data-lenis-prevent className="relative bg-[#0A0A0B] border-t border-white/[0.04]">
      <div className="sticky top-0 h-[100svh] overflow-hidden flex flex-col">
        <div className="absolute top-0 inset-x-0 z-10 pointer-events-none">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-8 pt-10 lg:pt-14 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="h-[1px] w-8 bg-[#D4A853]" />
              <span className="text-[10px] tracking-[0.2em] text-white/50 font-mono">ENGINEERING EXPLODED VIEW • 01—09</span>
            </div>
            <motion.div style={{ opacity: text1Opacity }} className="pointer-events-auto">
              <h2 className="text-[34px] sm:text-[44px] lg:text-[54px] font-black leading-[0.9] tracking-[-0.02em]" style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}>
                EVERY COMPONENT.<br />
                <span className="metallic">EVERY DETAIL.</span>
              </h2>
              <p className="text-sm text-white/50 mt-3 max-w-[520px]">Precision begins beneath the surface. Scroll to disassemble — wheels, brakes, suspension and engine separate in engineered sequence.</p>
            </motion.div>
          </div>
        </div>

        <div className="flex-1 relative">
          <CarScene progress={effectiveP} interactive className="absolute inset-0" />

          <div className="absolute inset-0 pointer-events-none hidden lg:block">
            <div className="max-w-[1400px] mx-auto w-full h-full relative px-8">
              {LABELS.map((label, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: effectiveP > 0.35 ? 1 : 0, x: effectiveP > 0.35 ? 0 : -8 }}
                  transition={{ delay: 0.03 * i, duration: 0.4 }}
                  className="absolute flex items-center gap-2"
                  style={{
                    left: i % 2 === 0 ? "4%" : "auto",
                    right: i % 2 === 1 ? "4%" : "auto",
                    top: `${22 + i * 8.5}%`,
                  }}
                >
                  <span className="h-[1px] bg-[#D4A853]/60 hidden sm:block" style={{ width: `${32 + (i % 3) * 10}px` }} />
                  <span className="text-[10px] tracking-[0.16em] font-bold bg-[#0F1012]/90 border border-white/10 rounded-full px-3 py-1.5 backdrop-blur shadow-lg">
                    {label}
                    <span className="ml-2 w-1.5 h-1.5 rounded-full bg-[#D4A853] inline-block animate-pulse" />
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* FIX: Interactive controls for assemble/disassemble - fixes "not working" complaint */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <div className="flex items-center gap-2 glass rounded-full px-3 py-2 shadow-xl">
              <button
                onClick={() => {
                  setManual(true);
                  setManualP(0);
                }}
                className={`text-[10px] tracking-[0.14em] font-bold px-3 py-1.5 rounded-full transition-colors ${effectiveP < 0.05 ? "bg-white text-black" : "bg-white/10 text-white hover:bg-white/15"}`}
              >
                ASSEMBLE
              </button>
              <span className="hidden sm:inline text-[10px] tracking-[0.14em] text-white/40 font-mono">EXPLODE</span>
              <input
                type="range"
                min={0}
                max={100}
                value={Math.round(effectiveP * 100)}
                onChange={(e) => {
                  setManual(true);
                  setManualP(Number(e.target.value) / 100);
                }}
                className="w-24 sm:w-32 accent-[#D4A853] h-1 cursor-pointer"
                aria-label="Explode progress"
              />
              <button
                onClick={() => {
                  setManual(true);
                  setManualP(1);
                }}
                className={`text-[10px] tracking-[0.14em] font-bold px-3 py-1.5 rounded-full transition-colors ${effectiveP > 0.95 ? "bg-[#D4A853] text-black" : "bg-white/10 text-white hover:bg-white/15"}`}
              >
                DISASSEMBLE
              </button>
              <span className="text-xs font-mono text-white/80 min-w-[42px] text-right">{Math.round(effectiveP * 100)}%</span>
            </div>
            {manual && (
              <button
                onClick={() => setManual(false)}
                className="text-[10px] tracking-wide text-white/50 hover:text-white bg-black/50 border border-white/10 rounded-full px-2.5 py-1 backdrop-blur"
              >
                RESUME SCROLL
              </button>
            )}
            {/* Hidden progress bar synced to scroll for visual */}
            <div className="hidden">
              <motion.span style={{ scaleX: progress }} />
            </div>
          </div>

          <div style={{ opacity: effectiveP > 0.5 && effectiveP < 0.75 ? 1 : 0 }} className="absolute inset-0 grid place-items-center pointer-events-none transition-opacity duration-300">
            <div className="glass-strong rounded-2xl px-8 py-6 text-center shadow-2xl border-[#D4A853]/20">
              <div className="text-[11px] tracking-[0.2em] text-[#D4A853] font-mono">REASSEMBLY PHASE</div>
              <div className="text-xl font-black tracking-tight mt-1">PRECISION PUT BACK TOGETHER.</div>
              <div className="text-xs text-white/50 mt-1">Components return to engineered position</div>
            </div>
          </div>

          <div style={{ opacity: effectiveP > 0.9 ? 1 : 0 }} className="absolute inset-0 grid place-items-center pointer-events-none transition-opacity duration-300">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.22em] text-[#D4A853] border border-[#D4A853]/30 rounded-full px-3 py-1 bg-[#D4A853]/10">FINAL STATE • TORQUED • VERIFIED</div>
              <div className="text-3xl font-black tracking-tight mt-3">READY FOR THE ROAD.</div>
              <div className="h-[1px] w-24 mx-auto bg-gradient-to-r from-transparent via-[#D4A853] to-transparent mt-3" />
            </div>
          </div>
        </div>
      </div>

      <div className="h-[220vh] pointer-events-none" aria-hidden />
    </section>
  );
}

export function DisassemblyMobileFallback() {
  const [p, setP] = useState(0.45);
  const [isLarge, setIsLarge] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(min-width: 1024px)");
    setIsLarge(m.matches);
    const h = () => setIsLarge(m.matches);
    m.addEventListener("change", h);
    return () => m.removeEventListener("change", h);
  }, []);
  // Don't mount 3D on desktop where section is hidden (display:none) - prevents zero-size canvas WebGL errors
  const show3D = !isLarge;
  return (
    <section className="bg-[#0A0A0B] border-t border-white/5 py-12 lg:hidden">
      <div className="px-6">
        <div className="text-[10px] tracking-[0.2em] text-white/50 font-mono flex items-center gap-2">
          <span className="h-[1px] w-6 bg-[#D4A853]" /> EXPLODED VIEW • DRAG TO EXPLORE
        </div>
        <h2 className="text-[30px] font-black leading-none mt-3" style={{ fontFamily: "var(--font-space-grotesk)" }}>
          EVERY COMPONENT.<br />
          <span className="metallic">EVERY DETAIL.</span>
        </h2>
        <p className="text-sm text-white/50 mt-2">Drag slider — body, wheels, brakes, engine separate with technical labels. Tap buttons to assemble/disassemble.</p>
        <div className="mt-6 rounded-2xl overflow-hidden bg-[#0c0d10] border border-white/10 h-[420px] relative shadow-xl">
          {show3D ? <CarScene progress={p} className="absolute inset-0" /> : <div className="absolute inset-0 bg-[#0c0d10] grid place-items-center text-white/30 text-xs">3D view available on mobile</div>}
          {/* floating labels mobile */}
          <div className="absolute top-3 left-3 right-3 flex flex-wrap gap-1.5 pointer-events-none">
            {LABELS.slice(0, 4).map((l) => (
              <span key={l} className="text-[9px] tracking-wide px-2 py-1 rounded-full bg-black/60 border border-white/15 backdrop-blur text-white/70">
                {l}
              </span>
            ))}
          </div>
          <div className="absolute bottom-3 inset-x-3 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <button onClick={() => setP(0)} className={`flex-1 text-[10px] font-bold tracking-wide py-2 rounded-full border transition-colors ${p < 0.05 ? "bg-white text-black border-white" : "bg-black/60 text-white border-white/20 backdrop-blur"}`}>
                ASSEMBLE
              </button>
              <button onClick={() => setP(1)} className={`flex-1 text-[10px] font-bold tracking-wide py-2 rounded-full border transition-colors ${p > 0.95 ? "bg-[#D4A853] text-black border-[#D4A853]" : "bg-black/60 text-white border-white/20 backdrop-blur"}`}>
                DISASSEMBLE
              </button>
            </div>
            <div className="flex items-center gap-3 glass rounded-full px-3 py-2.5 shadow-lg">
              <span className="text-[10px] font-mono text-white/40">ASSEMBLED</span>
              <input type="range" min={0} max={100} value={p * 100} onChange={(e) => setP(Number(e.target.value) / 100)} className="flex-1 accent-[#D4A853] h-1" />
              <span className="text-[10px] font-mono text-white/40">EXPLODED</span>
              <span className="text-xs font-mono bg-white text-black rounded-full px-2 py-0.5">{Math.round(p * 100)}%</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2 mt-4">
          {LABELS.map((l) => (
            <span key={l} className="text-[9px] tracking-wide text-center py-2 rounded-full bg-white/[0.04] border border-white/10 text-white/60">
              {l}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
