"use client";

import { business } from "@/data/business";
import dynamic from "next/dynamic";
import { ArrowUpRight, Mouse, ShieldCheck, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const CarScene = dynamic(() => import("@/components/3d/CarScene").then((m) => m.CarScene), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-[#0c0d10] animate-pulse" />,
});

export function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section id="home" className="relative min-h-[100svh] flex flex-col overflow-hidden bg-[#0A0A0B]">
      {/* blueprint grid + vignette */}
      <div className="absolute inset-0 bg-grid opacity-[0.04]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0A0A0B]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_800px_500px_at_50%_0%,rgba(200,169,110,0.08),transparent_60%)]" />
      {/* top workshop ambient image fallback gradient */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f1114] via-[#101114] to-[#0A0A0B]" />
        {/* subtle metallic floor reflection */}
        <div className="absolute bottom-0 inset-x-0 h-[42%] bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* header spacer */}
      <div className="h-[72px] shrink-0" />

      <div className="relative flex-1 max-w-[1400px] mx-auto w-full px-6 lg:px-8 flex flex-col lg:grid lg:grid-cols-12 lg:items-center gap-8 lg:gap-0 py-8 lg:py-0">
        {/* copy */}
        <div className="lg:col-span-6 xl:col-span-5 flex flex-col gap-6 lg:pr-6 order-1">
          {/* eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-3"
          >
            <span className="h-[1px] w-8 bg-[#D4A853]" />
            <span className="text-[11px] tracking-[0.22em] text-white/60 font-mono">
              HAFEEZPET • HYDERABAD • {business.reputation.rating.toFixed(1)} ★ {business.reputation.reviewCount} REVIEWS
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] tracking-wide bg-white/5 border border-white/10 rounded-full px-2.5 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Women-owned
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="text-[42px] sm:text-[56px] lg:text-[62px] xl:text-[72px] font-black leading-[0.88] tracking-[-0.03em] whitespace-pre-line"
            style={{ fontFamily: "var(--font-space-grotesk), var(--font-geist-sans), sans-serif" }}
          >
            <span className="block text-white">ENGINEERED FOR</span>
            <span className="block text-white/90">THE ROAD</span>
            <span className="block metallic">AHEAD.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.16 }}
            className="text-[15px] leading-7 text-white/60 max-w-[420px] whitespace-pre-line"
          >
            {business.heroSub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.22 }}
            className="flex flex-wrap gap-3 pt-2"
          >
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-white text-black px-7 py-3.5 rounded-full text-[12px] tracking-[0.16em] font-bold hover:bg-[#D4A853] transition-colors"
            >
              BOOK A SERVICE <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href="#workshop"
              className="inline-flex items-center gap-2 bg-white/5 backdrop-blur border border-white/10 text-white px-7 py-3.5 rounded-full text-[12px] tracking-[0.14em] font-medium hover:bg-white/10 transition-colors"
            >
              EXPLORE OUR WORK
            </a>
          </motion.div>

          {/* micro trust */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex items-center gap-6 pt-4 border-t border-white/5 mt-2"
          >
            <div className="flex items-center gap-2 text-xs text-white/50">
              <span className="w-7 h-7 rounded-full bg-white/5 border border-white/10 grid place-items-center">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4A853]" />
              </span>
              Precision inspection
            </div>
            <div className="flex items-center gap-2 text-xs text-white/50">
              <span className="w-7 h-7 rounded-full bg-white/5 border border-white/10 grid place-items-center">
                <Star className="w-3.5 h-3.5 text-[#D4A853]" />
              </span>
              {business.reputation.rating.toFixed(1)} on Google
            </div>
          </motion.div>
        </div>

        {/* 3D scene */}
        <div className="lg:col-span-6 xl:col-span-7 relative order-2 lg:h-[620px] h-[420px] sm:h-[480px]">
          {/* glass workshop card */}
          <div className="absolute inset-0 lg:inset-y-6 lg:left-6 rounded-[24px] overflow-hidden bg-[#0c0d10] border border-white/[0.07] backdrop-blur shadow-2xl">
            {/* FIX: Use local gallery image for guaranteed load - previous remote required internet and showed broken icon in screenshot 6 */}
            <Image
              src="/gallery/photo-4.jpg"
              alt="Premium workshop bay with vehicle - fallback"
              fill
              className="object-cover opacity-[0.28]"
              priority
              unoptimized
            />
            {/* Remote backup hidden - preloaded but not displayed */}
            <Image
              src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80"
              alt=""
              fill
              className="object-cover opacity-0"
              unoptimized
              aria-hidden
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0c0d10]/40 via-transparent to-[#0A0A0B]/80" />
            {/* interior workshop lighting header */}
            <div className="absolute top-0 inset-x-0 h-10 bg-gradient-to-b from-white/[0.06] to-transparent border-b border-white/[0.04] flex items-center justify-between px-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500/80" />
                <span className="w-2 h-2 rounded-full bg-amber-400/80" />
                <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-[10px] tracking-[0.18em] text-white/40 font-mono">WORKSHOP BAY • 01 • DIAGNOSTIC MODE</span>
              <span className="text-[10px] tracking-wide text-white/30 font-mono hidden sm:block">17.4824°N 78.3749°E</span>
            </div>

            {/* 3D canvas */}
            <div className="absolute inset-0 top-10">
              {mounted ? (
                <CarScene className="w-full h-full" progress={0} interactive />
              ) : (
                <div className="w-full h-full bg-[#0c0d10] animate-pulse" />
              )}
              {/* dramatic overhead lighting sweep */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/[0.06] via-transparent to-transparent" />
              {/* bottom specs */}
              <div className="absolute bottom-0 inset-x-0 p-4 flex items-end justify-between">
                <div className="glass rounded-xl px-4 py-3 flex items-center gap-4">
                  <div className="text-[10px] tracking-[0.16em] text-white/40 font-mono">VEHICLE STATUS</div>
                  <div className="h-6 w-[1px] bg-white/10" />
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-medium tracking-wide">INSPECTION READY</span>
                  </div>
                </div>
                <div className="hidden sm:flex glass rounded-xl px-3 py-2 items-center gap-2">
                  <span className="text-[10px] tracking-[0.14em] text-white/50">F9JF+XX</span>
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  <span className="text-[10px] text-white/70">Hafeezpet</span>
                </div>
              </div>
            </div>
          </div>

          {/* floating specs - desktop only */}
          <div className="hidden xl:flex absolute -right-2 top-20 flex-col gap-2">
            <div className="glass rounded-lg px-3 py-2 min-w-[140px]">
              <div className="text-[9px] tracking-[0.16em] text-white/40">CLEARCOAT</div>
              <div className="text-xs font-medium">Metallic • 1.0</div>
            </div>
            <div className="glass rounded-lg px-3 py-2 min-w-[140px]">
              <div className="text-[9px] tracking-[0.16em] text-white/40">DIAGNOSTICS</div>
              <div className="text-xs font-medium">OBD • Active</div>
            </div>
          </div>
        </div>
      </div>

      {/* scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="relative hidden lg:flex flex-col items-center gap-3 pb-6"
      >
        <span className="text-[10px] tracking-[0.22em] text-white/30 font-mono">SCROLL TO EXPLORE</span>
        <span className="w-[1px] h-10 bg-gradient-to-b from-white/30 to-transparent relative overflow-hidden">
          <motion.span
            animate={{ y: [0, 40, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-x-0 top-0 h-6 bg-white"
          />
        </span>
        <Mouse className="w-3.5 h-3.5 text-white/20" />
      </motion.div>
    </section>
  );
}
