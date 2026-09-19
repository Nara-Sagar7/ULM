import { business } from "@/data/business";
import { MapPin, Phone, Navigation, Clock, ExternalLink } from "lucide-react";

export function Location() {
  return (
    <section id="contact" className="bg-[#0A0A0B] py-16 lg:py-24 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-[1px] w-8 bg-[#D4A853]" />
              <span className="text-[11px] tracking-[0.2em] text-white/50 font-mono">FIND US • HAFEEZPET</span>
            </div>
            <h2 className="text-[32px] sm:text-[42px] font-black leading-none tracking-[-0.02em] mt-3" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              FIND <span className="metallic">ULTIMATE MECHANICS</span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <a href={business.maps.directionsUri} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-full text-xs font-bold tracking-[0.12em] hover:bg-[#D4A853] transition-colors">
              <Navigation className="w-3.5 h-3.5" /> GET DIRECTIONS
            </a>
            <a href={business.contact.phoneHref} className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white px-5 py-2.5 rounded-full text-xs font-semibold tracking-[0.12em] hover:bg-white/10 transition-colors">
              <Phone className="w-3.5 h-3.5" /> CALL WORKSHOP
            </a>
            <a href="#booking" className="inline-flex items-center gap-2 bg-[#D4A853] text-black px-5 py-2.5 rounded-full text-xs font-bold tracking-[0.12em] hover:bg-[#e4c58c] transition-colors">
              BOOK A SERVICE <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="rounded-2xl bg-[#0F1012] border border-white/5 p-6">
              <div className="flex items-center gap-2 text-[11px] tracking-[0.14em] text-white/40 font-mono">
                <MapPin className="w-3.5 h-3.5 text-[#D4A853]" /> ADDRESS
              </div>
              <div className="mt-3 text-sm leading-relaxed text-white/80">
                {business.address.line1}
                <br />
                {business.address.line2}
                <br />
                {business.address.area} {business.address.city}
                <br />
                {business.address.state}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-[11px] tracking-wide px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/60">{business.address.plusCode}</span>
                <span className="text-[11px] tracking-wide px-2.5 py-1 rounded-full bg-[#D4A853]/10 border border-[#D4A853]/20 text-[#D4A853]">Women-owned</span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                <a href={business.contact.phoneHref} className="flex items-center gap-2 rounded-xl bg-white text-black px-3 py-2.5 font-semibold justify-center">
                  <Phone className="w-3.5 h-3.5" /> {business.contact.phone}
                </a>
                <a href={business.contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-xl bg-[#25D366] text-black px-3 py-2.5 font-semibold justify-center">
                  WhatsApp
                </a>
              </div>
            </div>

            <div className="rounded-2xl bg-[#0F1012] border border-white/5 p-6">
              <div className="flex items-center gap-2 text-[11px] tracking-[0.14em] text-white/40 font-mono">
                <Clock className="w-3.5 h-3.5 text-[#D4A853]" /> HOURS
              </div>
              <div className="mt-3 space-y-1.5">
                {business.hours.schedule.map((h) => (
                  <div key={h.day} className="flex items-center justify-between text-sm">
                    <span className="text-white/60 text-xs tracking-wide">{h.day}</span>
                    <span className="text-xs font-mono text-white/80">
                      {h.open} — {h.close}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-[11px] leading-relaxed text-white/30 mt-3 border-t border-white/5 pt-3">
                {business.hours.note} • Update in <code className="text-white/50">data/business.ts</code> when confirmed from Google Business Profile.
              </p>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-[#D4A853] to-[#e4c58c] text-black p-6">
              <div className="text-xs font-bold tracking-[0.14em]">QUICK ACTION</div>
              <div className="text-sm font-medium mt-1 leading-tight">Need directions or a call?</div>
              <div className="mt-3 flex gap-2">
                <a href={business.maps.googleMapsUri} target="_blank" rel="noopener noreferrer" className="flex-1 text-center bg-black text-white rounded-full py-2.5 text-xs font-bold tracking-wide">
                  OPEN IN MAPS
                </a>
                <a href={business.contact.phoneHref} className="flex-1 text-center bg-white/90 backdrop-blur rounded-full py-2.5 text-xs font-bold tracking-wide">
                  CALL NOW
                </a>
              </div>
            </div>
          </div>

          {/* map */}
          <div className="lg:col-span-8">
            <div className="rounded-2xl overflow-hidden bg-[#0c0d10] border border-white/10 h-[460px] lg:h-[620px] relative">
              {/* technical header */}
              <div className="absolute top-0 inset-x-0 h-9 bg-white/[0.04] border-b border-white/5 flex items-center justify-between px-4 z-10">
                <span className="text-[10px] tracking-[0.14em] text-white/40 font-mono">MAP • 17.48243°N 78.37499°E • F9JF+XX</span>
                <span className="hidden sm:flex items-center gap-2 text-[10px] tracking-wide text-white/30 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> LIVE MAP
                </span>
              </div>
              <iframe
                title="Ultimate Mechanics Location"
                src={business.maps.embedUrl}
                className="absolute inset-0 top-9 w-full h-[calc(100%-36px)] border-0 grayscale-[0.15] contrast-[1.05]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              {/* map pin overlay - subtle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <div className="w-10 h-10 rounded-full bg-[#D4A853] shadow-[0_8px_24px_rgba(0,0,0,0.6)] grid place-items-center border-2 border-white">
                  <MapPin className="w-5 h-5 text-black" />
                </div>
                <div className="w-10 h-10 rounded-full bg-[#D4A853]/20 animate-ping absolute inset-0 -z-10" />
              </div>
            </div>
            <p className="text-[11px] text-white/25 text-center mt-3">
              Map coordinate from <code className="text-white/40">google maps.txt</code> • Plus Code {business.address.plusCode} • Directions open in Google Maps.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
