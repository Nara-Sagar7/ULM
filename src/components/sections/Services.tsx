"use client";

import { business } from "@/data/business";
import { Search, Wrench, Activity, Disc3, Cog, MoveVertical, Zap, ShieldCheck, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

function ServiceImage({ id, title }: { id: string; title: string }) {
  const [err, setErr] = useState(false);
  const src = err ? serviceRemoteFallback[id] : serviceImages[id];
  return (
    <Image
      src={src}
      alt={title}
      fill
      className="object-cover group-hover:scale-[1.08] transition-transform duration-[800ms]"
      unoptimized
      sizes="400px"
      onError={() => setErr(true)}
    />
  );
}

const iconMap: Record<string, any> = {
  Search,
  Wrench,
  Activity,
  Disc3,
  Cog,
  MoveVertical,
  Zap,
  ShieldCheck,
};

// FIX: Use local gallery images as primary to guarantee loading (offline-friendly)
// Previous remote Unsplash 07 returned 404 (photo-1487754180451 broken in screenshot 3)
// All 8 now map to real GBP local photos under /gallery (also duplicated under /images/workshop)
const serviceImages: Record<string, string> = {
  "01": "/gallery/photo-1.jpg",
  "02": "/gallery/photo-2.jpg",
  "03": "/gallery/photo-3.jpg",
  "04": "/gallery/photo-4.jpg",
  "05": "/gallery/photo-5.jpg",
  "06": "/gallery/photo-6.jpg",
  "07": "/gallery/photo-7.jpg",
  "08": "/gallery/photo-8.jpg",
};

// Remote fallbacks retained for reference (kept valid) - will be tried if local fails via onError logic in card
const serviceRemoteFallback: Record<string, string> = {
  "01": "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=600&q=80",
  "02": "https://images.unsplash.com/photo-1613214149922-f1809c99b414?auto=format&fit=crop&w=600&q=80",
  "03": "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=600&q=80",
  "04": "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=600&q=80",
  "05": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80",
  "06": "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=600&q=80",
  "07": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80", // FIXED valid Unsplash (electrical)
  "08": "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=600&q=80",
};

export function Services() {
  return (
    <section id="services" className="bg-[#0A0A0B] py-16 lg:py-24 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-[1px] w-8 bg-[#D4A853]" />
              <span className="text-[11px] tracking-[0.2em] text-white/50 font-mono">SERVICE CATEGORIES • REAL IMAGERY</span>
            </div>
            <h2 className="text-[32px] sm:text-[44px] font-black leading-[0.9] tracking-[-0.02em] mt-3" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              PRECISION SERVICE.<br />
              <span className="metallic">WITHOUT COMPROMISE.</span>
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-white/50 max-w-[420px]">
            Premium imagery for every category — hover to see detail. Replace Unsplash with your workshop shoot when ready.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {business.services.map((s, i) => {
            const Icon = iconMap[s.icon] ?? Wrench;
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                className="group relative rounded-2xl overflow-hidden bg-[#0F1012] border border-white/5 hover:border-white/15 transition-all flex flex-col min-h-[320px] hover:-translate-y-1 hover:shadow-2xl duration-500"
              >
                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="p-5 pb-3 flex items-start justify-between relative z-10">
                  <span className="text-[11px] tracking-[0.16em] font-mono text-white/30">{s.id}</span>
                  <span className="w-9 h-9 rounded-full bg-white text-black grid place-items-center group-hover:bg-[#D4A853] transition-colors shadow-lg">
                    <Icon className="w-4 h-4" />
                  </span>
                </div>
                <div className="mx-3 h-36 rounded-xl overflow-hidden relative border border-white/5 bg-[#0c0d10]">
                  <ServiceImage id={s.id} title={s.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute inset-0 bg-[#D4A853]/0 group-hover:bg-[#D4A853]/10 transition-colors" />
                  <div className="absolute bottom-2 left-2 text-[10px] tracking-[0.14em] font-mono px-2 py-1 rounded-full bg-black/60 border border-white/20 backdrop-blur text-white/80">
                    {s.title.split(" ")[0]}
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col relative z-10">
                  <h3 className="text-xs font-bold tracking-[0.14em] leading-tight">{s.title}</h3>
                  <p className="text-[13px] leading-relaxed text-white/50 mt-2 flex-1">{s.desc}</p>
                  <a
                    href="#contact"
                    className="mt-4 inline-flex items-center gap-1.5 text-[11px] tracking-[0.14em] font-semibold text-white/70 group-hover:text-[#D4A853] transition-colors"
                  >
                    LEARN MORE <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[900ms]" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
