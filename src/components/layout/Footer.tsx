import { business } from "@/data/business";
import { LogoWordmark } from "@/components/ui/Logo";
import { Phone, MapPin, Navigation } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[#0A0A0B] border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <LogoWordmark />
            <p className="text-sm leading-relaxed text-white/50 mt-4 max-w-md">
              Premium Automotive Service & Inspection in Hafeezpet, Hyderabad. Precision, transparency and technology — engineered for the road ahead.
            </p>
            <div className="mt-6 space-y-2 text-sm">
              <div className="flex items-start gap-2 text-white/60">
                <MapPin className="w-4 h-4 text-[#D4A853] mt-0.5 shrink-0" />
                <span className="leading-tight">
                  {business.address.full}
                  <br />
                  <span className="text-white/40">{business.address.plusCode}</span>
                </span>
              </div>
              <a href={business.contact.phoneHref} className="flex items-center gap-2 text-white hover:text-[#D4A853] transition-colors">
                <Phone className="w-4 h-4 text-[#D4A853]" /> {business.contact.phone}
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="text-[11px] tracking-[0.16em] text-white/40 font-mono">NAVIGATION</div>
            <nav className="mt-4 space-y-2">
              {business.nav.map((n) => (
                <a key={n.label} href={n.href} className="block text-sm text-white/60 hover:text-white transition-colors">
                  {n.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="lg:col-span-2">
            <div className="text-[11px] tracking-[0.16em] text-white/40 font-mono">SERVICES</div>
            <div className="mt-4 space-y-2">
              {business.services.slice(0, 6).map((s) => (
                <a key={s.id} href="#services" className="block text-sm text-white/60 hover:text-white transition-colors">
                  {s.title}
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="rounded-2xl bg-[#0F1012] border border-white/5 p-5">
              <div className="text-xs font-bold tracking-wide">Need immediate help?</div>
              <p className="text-xs leading-relaxed text-white/50 mt-1">Call workshop directly — no bots, no hold music.</p>
              <div className="mt-4 flex flex-col gap-2">
                <a href={business.contact.phoneHref} className="inline-flex items-center justify-center gap-2 bg-white text-black rounded-full py-2.5 text-xs font-bold tracking-[0.12em] hover:bg-[#D4A853] transition-colors">
                  <Phone className="w-3.5 h-3.5" /> CALL {business.contact.phone}
                </a>
                <a
                  href={business.maps.directionsUri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white rounded-full py-2.5 text-xs font-semibold tracking-[0.12em] hover:bg-white/10 transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" /> GET DIRECTIONS
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/30">
          <span>© {year} Ultimate Mechanics. All rights reserved.</span>
          <span className="flex items-center gap-2">
            <span className="hidden sm:inline">Built with precision •</span> {business.reputation.category} • {business.reputation.label}
          </span>
        </div>
      </div>
    </footer>
  );
}
