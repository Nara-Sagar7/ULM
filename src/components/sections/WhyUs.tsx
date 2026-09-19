import { business } from "@/data/business";

export function WhyUs() {
  return (
    <section id="about" className="bg-[#0A0A0B] border-y border-white/5 py-16 lg:py-20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <h2 className="text-[28px] sm:text-[36px] font-black tracking-[-0.02em] leading-none" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            WHY <span className="metallic">ULTIMATE MECHANICS?</span>
          </h2>
          <p className="text-sm text-white/50 max-w-[560px] leading-relaxed">
            No invented certifications. Just the principles that guide every inspection from bay in to road out.
          </p>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
          {business.whyUs.map((item) => (
            <div key={item.k} className="group relative rounded-2xl bg-[#0F1012] border border-white/5 p-6 hover:border-white/10 transition-colors">
              <div className="text-[11px] tracking-[0.18em] font-mono text-[#D4A853]">{item.k}</div>
              <div className="h-[1px] w-8 bg-white/10 mt-3 group-hover:w-12 group-hover:bg-[#D4A853]/50 transition-all" />
              <h3 className="text-xs font-bold tracking-[0.16em] mt-4">{item.title}</h3>
              <p className="text-[13px] leading-relaxed text-white/50 mt-2">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* engineering stats */}
        <div className="mt-8 grid sm:grid-cols-3 gap-4">
          <div className="rounded-2xl bg-white text-black p-6 flex flex-col gap-2">
            <span className="text-[11px] tracking-[0.16em] opacity-60">GOOGLE RATING</span>
            <span className="text-3xl font-black tracking-tight">5.0 ★</span>
            <span className="text-xs opacity-60">{business.reputation.reviewCount} reviews • Verified</span>
          </div>
          <div className="rounded-2xl bg-[#1C1E22] border border-white/5 p-6">
            <span className="text-[11px] tracking-[0.16em] text-white/40">LOCATION</span>
            <span className="block text-sm font-semibold mt-2 leading-tight">Gopal Nagar, Hafeezpet<br />Hyderabad • F9JF+XX</span>
            <span className="block text-xs text-white/40 mt-2">Women-owned • Car Inspection</span>
          </div>
          <div className="rounded-2xl bg-[#D4A853] text-black p-6">
            <span className="text-[11px] tracking-[0.16em] opacity-70">RESPONSE</span>
            <span className="block text-sm font-bold mt-2">Clear communication throughout</span>
            <span className="block text-xs opacity-70 mt-2">From inspection through completion</span>
          </div>
        </div>
      </div>
    </section>
  );
}
