"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Disassembly, DisassemblyMobileFallback } from "@/components/sections/Disassembly";
import { Inspection } from "@/components/sections/Inspection";
import { Services } from "@/components/sections/Services";
import { WhyUs } from "@/components/sections/WhyUs";
import { Workshop } from "@/components/sections/Workshop";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { Trust } from "@/components/sections/Trust";
import { Location } from "@/components/sections/Location";
import { Booking } from "@/components/sections/Booking";
import { LogoIcon } from "@/components/ui/Logo";
import { motion, AnimatePresence } from "framer-motion";

function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setProgress((p) => (p >= 100 ? 100 : p + Math.random() * 18)), 120);
    const t = setTimeout(() => onDone(), 1600);
    return () => {
      clearInterval(id);
      clearTimeout(t);
    };
  }, [onDone]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[100] bg-[#0A0A0B] grid place-items-center"
    >
      <div className="flex flex-col items-center gap-8">
        <div className="relative">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="w-20 h-20 rounded-full border border-white/10 grid place-items-center"
          >
            <LogoIcon size={36} className="text-white" />
          </motion.div>
          {/* rotating ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border border-transparent border-t-[#D4A853] border-r-[#D4A853]/50"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-1 rounded-full border border-white/5"
          />
        </div>
        <div className="flex flex-col items-center gap-3">
          <div className="text-[13px] tracking-[0.24em] font-black">ULTIMATE MECHANICS</div>
          <div className="text-[10px] tracking-[0.2em] text-white/40 font-mono">PRECISION • TECHNOLOGY • CARE</div>
          <div className="w-40 h-[2px] rounded-full bg-white/10 overflow-hidden mt-2">
            <motion.div className="h-full bg-[#D4A853]" initial={{ width: 0 }} animate={{ width: `${Math.min(100, progress)}%` }} transition={{ ease: "easeOut", duration: 0.3 }} />
          </div>
          <div className="text-[10px] tracking-wide text-white/25 font-mono">{Math.round(Math.min(100, progress))}% • INITIALIZING WORKSHOP</div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(m.matches);
    const onChange = () => setReduced(m.matches);
    m.addEventListener("change", onChange);
    return () => m.removeEventListener("change", onChange);
  }, []);

  // lenis smooth scroll - DISABLED: was breaking framer-motion useScroll in Disassembly (assemble/disassemble not working) + causing white flash on WebGL
  // Re-enable only after verifying scrollYProgress sync. For now use native smooth scroll via CSS (scroll-behavior: smooth)
  useEffect(() => {
    // Intentionally disabled - see Disassembly data-lenis-prevent fix
    // If reduced motion is ON, we also skip.
    // To re-enable, uncomment below and add lenis <> framer-motion sync: lenis.on('scroll', ScrollTrigger.update) etc.
    // if (reduced) return;
    // let lenis: any;
    // (async () => {
    //   const Lenis = (await import("lenis")).default;
    //   lenis = new Lenis({ duration: 1.1, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    //   const raf = (time: number) => {
    //     lenis.raf(time);
    //     requestAnimationFrame(raf);
    //   };
    //   requestAnimationFrame(raf);
    // })();
    // return () => lenis?.destroy?.();
  }, [reduced]);

  return (
    <>
      <AnimatePresence>{loading && <LoadingScreen onDone={() => setLoading(false)} />}</AnimatePresence>

      <Header />
      <main className="flex-1 flex flex-col">
        <Hero />

        {/* trust strip */}
        <div className="bg-[#0A0A0B] border-y border-white/5 py-3">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-8 flex flex-wrap items-center justify-between gap-3 text-[11px] tracking-[0.12em] text-white/40 font-mono">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> SYSTEM CHECK • ALL ZONES NOMINAL
            </span>
            <span className="hidden sm:inline">No. 605, Road 3A • Gopal Nagar • F9JF+XX • Women-owned</span>
            <span className="hidden lg:inline">Porsche-level presentation • BMW-grade engineering confidence</span>
          </div>
        </div>

        {/* only show sticky desktop disassembly on large screens */}
        <div className="hidden lg:block">
          <Disassembly />
        </div>
        <DisassemblyMobileFallback />

        <Inspection />
        <Services />
        <WhyUs />
        <Workshop />
        <BeforeAfter />
        <Trust />
        <Location />
        <Booking />
      </main>
      <Footer />

      {/* reduced motion toggle */}
      <button
        onClick={() => setReduced((v) => !v)}
        className="fixed bottom-4 left-4 z-30 hidden lg:inline-flex items-center gap-2 text-[11px] tracking-wide px-3 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur hover:bg-white/10 transition-colors text-white/50"
        aria-label="Toggle reduced motion"
      >
        <span className={`w-2 h-2 rounded-full ${reduced ? "bg-amber-400" : "bg-emerald-400"}`} /> {reduced ? "Reduced motion ON" : "Motion: Enhanced"}
      </button>

      <style jsx global>{`
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </>
  );
}
