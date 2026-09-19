"use client";

import { useState, useEffect } from "react";
import { business } from "@/data/business";
import { LogoWordmark } from "@/components/ui/Logo";
import { Menu, X, Phone, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock scroll when mobile menu open
  useEffect(() => {
    if (open) document.documentElement.style.overflow = "hidden";
    else document.documentElement.style.overflow = "";
    return () => { document.documentElement.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-500",
          scrolled ? "bg-[#0A0A0B]/80 backdrop-blur-xl border-b border-white/[0.06] py-3" : "bg-transparent border-b border-transparent py-5"
        )}
      >
        {/* top precision line */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 flex items-center justify-between">
          <a href="#home" className="shrink-0">
            <LogoWordmark />
          </a>

          <nav className="hidden lg:flex items-center gap-7">
            {business.nav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-[11px] tracking-[0.18em] font-medium text-white/70 hover:text-white transition-colors relative group py-2"
              >
                {item.label}
                <span className="absolute left-0 right-0 -bottom-[14px] h-[1px] bg-[#D4A853] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href={business.contact.phoneHref}
              className="inline-flex items-center gap-2 text-xs tracking-[0.14em] text-white/70 hover:text-white transition-colors"
            >
              <span className="w-7 h-7 rounded-full border border-white/10 grid place-items-center">
                <Phone className="w-3.5 h-3.5" />
              </span>
              {business.contact.phone}
            </a>
            <a
              href="#contact"
              className="ml-2 inline-flex items-center gap-2 bg-white text-black text-[11px] tracking-[0.16em] font-semibold px-5 py-[11px] rounded-full hover:bg-[#D4A853] transition-colors"
            >
              BOOK A SERVICE <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden w-10 h-10 rounded-full bg-white/5 border border-white/10 grid place-items-center text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* mobile */}
      <div className={cn("fixed inset-0 z-40 lg:hidden transition", open ? "visible" : "invisible")}>
        <div onClick={() => setOpen(false)} className={cn("absolute inset-0 bg-[#0A0A0B]/80 backdrop-blur-sm transition-opacity", open ? "opacity-100" : "opacity-0")} />
        <div className={cn("absolute inset-y-0 right-0 w-[84%] max-w-[380px] bg-[#0F1012] border-l border-white/10 flex flex-col transition-transform duration-500", open ? "translate-x-0" : "translate-x-full")}>
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <LogoWordmark compact />
            <button onClick={() => setOpen(false)} className="w-9 h-9 rounded-full bg-white/5 grid place-items-center">
              <X className="w-4 h-4" />
            </button>
          </div>
          <nav className="flex-1 p-6 flex flex-col gap-1">
            {business.nav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-3 text-[13px] tracking-[0.18em] text-white/80 hover:text-white border-b border-white/[0.04] flex items-center justify-between"
              >
                {item.label} <ArrowUpRight className="w-3.5 h-3.5 opacity-40" />
              </a>
            ))}
          </nav>
          <div className="p-6 space-y-3 bg-[#0A0A0B] border-t border-white/5">
            <a href={business.contact.phoneHref} className="flex items-center justify-center gap-2 w-full py-3 rounded-full border border-white/10 text-sm tracking-wide">
              <Phone className="w-4 h-4" /> CALL {business.contact.phone}
            </a>
            <a href="#contact" onClick={() => setOpen(false)} className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-white text-black text-sm font-semibold tracking-[0.12em]">
              BOOK A SERVICE <ArrowUpRight className="w-4 h-4" />
            </a>
            <p className="text-[10px] leading-relaxed tracking-wide text-white/35 text-center pt-2">
              {business.address.full} • {business.address.plusCode}
            </p>
          </div>
        </div>
      </div>

      {/* mobile persistent CTA */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 p-3 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none">
        <div className="flex gap-2 pointer-events-auto max-w-[520px] mx-auto">
          <a href={business.contact.phoneHref} className="flex-1 inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur border border-white/10 text-white rounded-full py-3 text-xs tracking-[0.12em] font-medium">
            <Phone className="w-3.5 h-3.5" /> CALL
          </a>
          <a href="#contact" className="flex-[1.6] inline-flex items-center justify-center gap-2 bg-white text-black rounded-full py-3 text-xs tracking-[0.14em] font-bold">
            BOOK A SERVICE <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </>
  );
}
