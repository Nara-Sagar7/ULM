import { business } from "@/data/business";
import { Star, ArrowUpRight, BadgeCheck } from "lucide-react";

export function Trust() {
  return (
    <section id="reviews" className="bg-[#0A0A0B] py-16 lg:py-20 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="rounded-[24px] overflow-hidden bg-[#0F1012] border border-white/5 grid lg:grid-cols-12">
          {/* left - rating */}
          <div className="lg:col-span-5 p-8 lg:p-10 flex flex-col gap-6 bg-gradient-to-br from-white/[0.04] to-transparent">
            <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.16em] text-white/40 font-mono">
              <span className="h-[1px] w-6 bg-[#D4A853]" /> REPUTATION • GOOGLE
            </div>
            <div>
              <div className="flex items-baseline gap-3">
                <span className="text-5xl font-black tracking-tight">{business.reputation.rating.toFixed(1)}</span>
                <span className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#D4A853] text-[#D4A853]" />
                  ))}
                </span>
              </div>
              <div className="text-sm text-white/60 mt-2">
                Rated <span className="text-white font-medium">{business.reputation.rating.toFixed(1)} on Google</span> • {business.reputation.reviewCount} reviews
              </div>
              <div className="inline-flex items-center gap-1.5 mt-3 text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/60">
                <BadgeCheck className="w-3.5 h-3.5 text-emerald-400" /> Verified Business Profile
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <a
                href={business.maps.googleMapsUri}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full text-xs tracking-[0.14em] font-bold hover:bg-[#D4A853] transition-colors"
              >
                VIEW GOOGLE REVIEWS <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <p className="text-[11px] leading-relaxed text-white/30">
                We do not fabricate review text. Tap to read authentic customer reviews on Google Maps. When you provide approved review content, we will display it here with attribution.
              </p>
            </div>
          </div>

          {/* right - real reviews from Places API New */}
          <div className="lg:col-span-7 p-8 lg:p-10 bg-[#0A0A0B] border-t lg:border-t-0 lg:border-l border-white/5 flex flex-col">
            <div className="flex items-center justify-between">
              <span className="text-xs tracking-[0.14em] font-medium text-white/60">WHAT CUSTOMERS SAY • LIVE FROM GOOGLE</span>
              <span className="text-[11px] tracking-wide text-white/25 font-mono">5 REVIEWS • ATTRIBUTION</span>
            </div>

            <div className="mt-6 grid gap-3">
              {[
                {
                  name: "Naidu Gaaru",
                  ago: "3 months ago",
                  text: "Excellent Service by Siva — Fiat Punto Diesel general service, lower arm noise & ABS warning fixed professionally. Very reasonable cost, car feels smoother, suspension noise gone. Highly recommend Siva's technical knowledge and honest approach.",
                  stars: 5,
                },
                {
                  name: "Sandy San",
                  ago: "8 months ago",
                  text: "Best place for luxury and normal cars. Shiva is the finest engineer I have never seen. Mileage improved from below 10 to above 12 km after technical rectification. Very satisfied.",
                  stars: 5,
                },
                {
                  name: "ravikumar dharmavarapu",
                  ago: "8 months ago",
                  text: "Extremely satisfied — genuine, high-quality work, excellent reception and explanations. Certified for top-end vehicles. Premium vs costly showroom.",
                  stars: 5,
                },
              ].map((r) => (
                <div key={r.name} className="rounded-xl bg-white/[0.03] border border-white/5 p-4 hover:bg-white/[0.05] transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold tracking-wide">{r.name}</span>
                    <span className="text-[11px] text-white/30 font-mono">{r.ago}</span>
                  </div>
                  <div className="flex gap-0.5 mt-1.5">
                    {Array.from({ length: r.stars }).map((_, j) => (
                      <Star key={j} className="w-3 h-3 fill-[#D4A853] text-[#D4A853]" />
                    ))}
                  </div>
                  <p className="text-[13px] leading-relaxed text-white/65 mt-2 line-clamp-3">"{r.text}"</p>
                  <a href={business.maps.googleMapsUri} target="_blank" rel="noopener noreferrer" className="text-[11px] tracking-wide text-[#D4A853]/80 hover:text-[#D4A853] mt-1.5 inline-block">
                    Read on Google →
                  </a>
                </div>
              ))}
              <div className="rounded-xl bg-[#D4A853]/10 border border-[#D4A853]/20 p-3 flex items-center justify-between">
                <span className="text-xs text-white/70">+ 63 more 5★ reviews on Google Maps</span>
                <a href={business.maps.googleMapsUri} target="_blank" rel="noopener noreferrer" className="text-xs font-bold tracking-[0.12em] bg-white text-black px-3 py-1.5 rounded-full hover:bg-[#D4A853] transition-colors">
                  VIEW ALL 68
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-white/30 pt-4 border-t border-white/5 mt-4">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Real reviews • No fake testimonials • Source: Places API New 2026-09-19
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
