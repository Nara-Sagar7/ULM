"use client";

import { useState } from "react";
import { CarScene } from "@/components/3d/CarScene";
import { cn } from "@/lib/utils";
import { Activity, Cog, Disc3, Droplets, Zap, Wrench, Car, MoveVertical } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const zones = [
  { id: "ENGINE", label: "ENGINE", icon: Cog, desc: "Compression, oil, timing and thermal health. We document what we see, no speculation.", color: "#D4A853" },
  { id: "BRAKES", label: "BRAKES", icon: Disc3, desc: "Pads, discs, calipers and fluid — measured, not guessed.", color: "#e8a0a0" },
  { id: "SUSPENSION", label: "SUSPENSION", icon: MoveVertical, desc: "Dampers, springs, bushings and geometry for stability.", color: "#8bb8d8" },
  { id: "TYRES", label: "TYRES", icon: Car, desc: "Tread, wear pattern, pressure and alignment indicators.", color: "#a0d8a0" },
  { id: "ELECTRICAL", label: "ELECTRICAL", icon: Zap, desc: "Battery, charging, wiring and module communication.", color: "#d8c08b" },
  { id: "COOLING", label: "COOLING", icon: Droplets, desc: "Coolant, radiator, thermostat and flow integrity.", color: "#8bd8d0" },
  { id: "TRANSMISSION", label: "TRANSMISSION", icon: Wrench, desc: "Shift quality, fluid condition and drivetrain play.", color: "#b8a0d8" },
  { id: "BODY", label: "BODY", icon: Activity, desc: "Panels, underbody and corrosion — documented with photos.", color: "#c8cdd4" },
] as const;

export function Inspection() {
  const [active, setActive] = useState<string>("ENGINE");
  const current = zones.find((z) => z.id === active)!;

  return (
    <section id="inspection" className="bg-[#0A0A0B] border-y border-white/[0.06] py-16 lg:py-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-[1px] w-8 bg-[#D4A853]" />
              <span className="text-[11px] tracking-[0.2em] text-white/50 font-mono">INTERACTIVE • 8 ZONES</span>
            </div>
            <h2 className="text-[32px] sm:text-[42px] font-black leading-none tracking-[-0.02em] mt-3" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              SEE WHAT <span className="metallic">WE SEE.</span>
            </h2>
            <p className="text-sm text-white/50 mt-3 max-w-[520px]">
              Tap a zone. Camera moves, component highlights, technical panel appears. Educational — no invented claims.
            </p>
          </div>
          <div className="hidden lg:flex items-center gap-2 text-[11px] tracking-[0.14em] text-white/30 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> LIVE INSPECTION MODE
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* zones list */}
          <div className="lg:col-span-4 xl:col-span-3 order-2 lg:order-1">
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 lg:gap-1.5">
              {zones.map((z) => {
                const Icon = z.icon;
                const isActive = active === z.id;
                return (
                  <button
                    key={z.id}
                    onClick={() => setActive(z.id)}
                    className={cn(
                      "group relative flex items-center gap-3 p-3 lg:p-3.5 rounded-xl border text-left transition-all",
                      isActive ? "bg-white text-black border-white" : "bg-white/[0.03] border-white/10 hover:bg-white/[0.06] hover:border-white/15 text-white"
                    )}
                  >
                    <span
                      className={cn(
                        "w-9 h-9 rounded-lg grid place-items-center shrink-0 border",
                        isActive ? "bg-black text-white border-black" : "bg-white/5 border-white/10 group-hover:bg-white/10"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block text-xs font-bold tracking-[0.14em]">{z.label}</span>
                      <span className={cn("block text-[11px] leading-tight truncate", isActive ? "text-black/60" : "text-white/40")}>Tap to inspect</span>
                    </span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#D4A853] animate-pulse" />}
                  </button>
                );
              })}
            </div>

            {/* active panel */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="mt-4 glass-strong rounded-2xl p-5"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-1 h-4 bg-[#D4A853] rounded-full" />
                  <span className="text-xs tracking-[0.16em] font-bold">{current.label}</span>
                  <span className="ml-auto text-[10px] tracking-wide px-2 py-1 rounded-full bg-white/10 border border-white/10">ZONE 0{String(zones.findIndex((z) => z.id === active) + 1).padStart(2, "0")}</span>
                </div>
                <p className="text-sm leading-relaxed text-white/70">{current.desc}</p>
                <div className="mt-4 flex gap-2">
                  <a href="#contact" className="flex-1 text-center bg-white text-black rounded-full py-2.5 text-xs font-bold tracking-[0.12em] hover:bg-[#D4A853] transition-colors">
                    BOOK INSPECTION
                  </a>
                  <span className="px-3 py-2.5 rounded-full bg-white/5 border border-white/10 text-[11px] tracking-wide text-white/50">PHOTO DOCS</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* 3D view */}
          <div className="lg:col-span-8 xl:col-span-9 order-1 lg:order-2">
            <div className="relative rounded-[20px] overflow-hidden bg-[#0c0d10] border border-white/10 h-[420px] sm:h-[480px] lg:h-[560px]">
              {/* technical header */}
              <div className="absolute top-0 inset-x-0 h-9 bg-white/[0.04] border-b border-white/5 flex items-center justify-between px-4 z-10">
                <span className="text-[10px] tracking-[0.16em] text-white/40 font-mono">INSPECTION VIEW • {current.label} • FOCUS MODE</span>
                <span className="hidden sm:flex items-center gap-2 text-[10px] font-mono text-white/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> CAMERA TRACKING
                </span>
              </div>
              <div className="absolute inset-0 top-9">
                <CarScene progress={0.35} interactive className="w-full h-full" />
                {/* highlight ring */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[46%] h-[38%] border border-[#D4A853]/30 rounded-[18px] shadow-[0_0_30px_rgba(200,169,110,0.15)]" />
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[2px] h-[54%] bg-gradient-to-b from-transparent via-[#D4A853]/40 to-transparent" />
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[2px] w-[64%] bg-gradient-to-r from-transparent via-[#D4A853]/30 to-transparent" />
                </div>
                {/* bottom blueprint */}
                <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="text-[10px] tracking-[0.14em] text-white/40 font-mono glass rounded-full px-3 py-1.5 hidden sm:inline-flex">HOLD TO ORBIT • SCROLL TO ZOOM</span>
                  <span className="text-[10px] tracking-[0.14em] text-white/60 font-mono glass rounded-full px-3 py-1.5">ZONE: {current.label}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
