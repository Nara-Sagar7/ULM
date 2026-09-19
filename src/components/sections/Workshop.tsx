"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";

const gallery = [
  {
    id: 1,
    title: "Ultimate Mechanics — Workshop Bay (Real Photo)",
    cat: "WORKSHOP",
    desc: "Gopal Nagar, Hafeezpet • 5.0★ 68 reviews • Real GBP photo 1/10",
    img: "/gallery/photo-1.jpg",
  },
  {
    id: 2,
    title: "Diagnostic Station — Live Data",
    cat: "DIAGNOSTICS",
    desc: "OBD • system health • photo documented • GBP photo 2/10",
    img: "/gallery/photo-2.jpg",
  },
  {
    id: 3,
    title: "Brake & Wheel — Detail Check",
    cat: "BRAKES",
    desc: "Pads • discs • caliper • fluid • GBP photo 3/10",
    img: "/gallery/photo-3.jpg",
  },
  {
    id: 4,
    title: "Engine Bay — Precision Service",
    cat: "ENGINE",
    desc: "Thermal • oil • timing • care • GBP photo 4/10",
    img: "/gallery/photo-4.jpg",
  },
  {
    id: 5,
    title: "Suspension & Alignment Bay",
    cat: "SUSPENSION",
    desc: "Geometry • damping • stability • GBP photo 5/10",
    img: "/gallery/photo-5.jpg",
  },
  {
    id: 6,
    title: "Workshop Environment — Hafeezpet Real",
    cat: "LIFT",
    desc: "Polished concrete • overhead diagnostics • GBP photo 6/10",
    img: "/gallery/photo-6.jpg",
  },
  {
    id: 7,
    title: "Customer Reception — Transparency",
    cat: "WORKSHOP",
    desc: "Clear communication • Genuine parts • GBP photo 7/10",
    img: "/gallery/photo-7.jpg",
  },
  {
    id: 8,
    title: "Vehicle Service — Completed",
    cat: "ENGINE",
    desc: "Documented • Verified • Ready for road • GBP photo 8/10",
    img: "/gallery/photo-8.jpg",
  },
  {
    id: 9,
    title: "Workshop Detail — Tools & Care",
    cat: "DIAGNOSTICS",
    desc: "Professional tools • trained technician • GBP photo 9/10",
    img: "/gallery/photo-9.jpg",
  },
  {
    id: 10,
    title: "Ultimate Mechanics — Exterior View",
    cat: "WORKSHOP",
    desc: "No.605 Rd 3A • F9JF+XX • Hafeezpet • GBP photo 10/10",
    img: "/gallery/photo-10.jpg",
  },
];

const cats = ["ALL", "LIFT", "DIAGNOSTICS", "BRAKES", "ENGINE", "WORKSHOP"] as const;

export function Workshop() {
  const [activeCat, setActiveCat] = useState<(typeof cats)[number]>("ALL");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = activeCat === "ALL" ? gallery : gallery.filter((g) => g.cat === activeCat);

  return (
    <section id="workshop" className="bg-[#0A0A0B] py-16 lg:py-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-[1px] w-8 bg-[#D4A853]" />
              <span className="text-[11px] tracking-[0.2em] text-white/50 font-mono">WORKSHOP EXPERIENCE • HAFEEZPET • REAL PHOTOS</span>
            </div>
            <h2 className="text-[32px] sm:text-[42px] font-black leading-none tracking-[-0.02em] mt-3" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              BUILT LIKE A <span className="metallic">LABORATORY.</span>
            </h2>
            <p className="text-sm text-white/50 mt-3 max-w-[560px] leading-relaxed">
              Real Google Maps photos from Ultimate Mechanics (10 GBP images via Places API New, 2026-09-19). No stock placeholders - authentic Hafeezpet workshop.
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCat(c)}
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-[11px] tracking-[0.12em] font-medium border transition-colors",
                  activeCat === c ? "bg-white text-black border-white" : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white"
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {filtered.map((item) => (
            <button
              key={item.id}
              onClick={() => setLightbox(item.id)}
              className="group relative rounded-2xl overflow-hidden bg-[#0F1012] border border-white/5 hover:border-white/15 transition-all text-left h-[300px] shadow-lg hover:shadow-2xl hover:-translate-y-1 duration-500"
            >
              <Image src={item.img} alt={item.title} fill className="object-cover group-hover:scale-[1.06] transition-transform duration-[900ms]" sizes="(max-width: 768px) 100vw, 33vw" unoptimized />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#D4A853]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 flex flex-col justify-between p-5">
                <div className="flex items-start justify-between">
                  <span className="text-[10px] tracking-[0.14em] font-mono px-2.5 py-1 rounded-full bg-black/55 border border-white/15 backdrop-blur text-white/90">
                    {item.cat} • 0{item.id}
                  </span>
                  <span className="w-8 h-8 rounded-full bg-white text-black grid place-items-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg scale-90 group-hover:scale-100">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </span>
                </div>
                <div>
                  <div className="h-[1px] w-10 bg-[#D4A853] mb-3 shadow-[0_0_8px_rgba(200,169,110,0.6)]" />
                  <h3 className="text-[13px] font-bold leading-tight text-white drop-shadow-lg">{item.title}</h3>
                  <p className="text-xs text-white/70 mt-1 drop-shadow">{item.desc}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <p className="text-[11px] leading-relaxed text-white/30 text-center mt-6 max-w-3xl mx-auto">
          Real photos from Google Business Profile (Places API, CID 2508124598477730393). All images are actual Ultimate Mechanics workshop - Hafeezpet. Source: <code className="text-white/50">BUSINESS_COLLECTED.json</code> • 10 photos • WebP conversion recommended for production.
        </p>
      </div>

      {lightbox !== null && (
        <div className="fixed inset-0 z-50 bg-black/88 backdrop-blur-xl grid place-items-center p-4 sm:p-6" onClick={() => setLightbox(null)}>
          <div className="relative w-full max-w-5xl rounded-2xl overflow-hidden bg-[#0c0d10] border border-white/10 max-h-[90vh] flex flex-col shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="h-11 bg-white/[0.06] border-b border-white/5 flex items-center justify-between px-4 shrink-0">
              <span className="text-xs tracking-wide text-white/80 truncate pr-4">{gallery.find((g) => g.id === lightbox)?.title}</span>
              <button onClick={() => setLightbox(null)} className="w-8 h-8 rounded-full bg-white text-black grid place-items-center hover:bg-[#D4A853] transition-colors shrink-0">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="relative flex-1 min-h-[420px] bg-black">
              <Image src={gallery.find((g) => g.id === lightbox)!.img} alt={gallery.find((g) => g.id === lightbox)!.title} fill className="object-contain" sizes="100vw" unoptimized />
            </div>
            <div className="p-4 bg-[#0F1012] border-t border-white/5 flex items-center justify-between">
              <span className="text-xs text-white/50">{gallery.find((g) => g.id === lightbox)?.desc}</span>
              <span className="text-[11px] tracking-wide px-2.5 py-1 rounded-full bg-[#D4A853] text-black font-bold">Hafeezpet • 5.0★</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
