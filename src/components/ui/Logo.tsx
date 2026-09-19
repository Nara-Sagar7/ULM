import { cn } from "@/lib/utils";

export function LogoIcon({ className, size = 36 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      aria-hidden
    >
      {/* outer precision ring */}
      <circle cx="20" cy="20" r="17.5" stroke="currentColor" strokeWidth="1" opacity="0.9" />
      <circle cx="20" cy="20" r="14.5" stroke="currentColor" strokeWidth="0.75" opacity="0.35" />
      {/* gear geometry subtle - 8 teeth */}
      <g opacity="0.95" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
        <path d="M20 6.5 V9.2 M20 30.8 V33.5 M6.5 20 H9.2 M30.8 20 H33.5 M10.3 10.3 L12.2 12.2 M27.8 27.8 L29.7 29.7 M29.7 10.3 L27.8 12.2 M12.2 27.8 L10.3 29.7" />
      </g>
      {/* mechanical U - precision cut */}
      <path
        d="M14 12.5 L14 22.2 C14 26.1 16.4 28.5 20 28.5 C23.6 28.5 26 26.1 26 22.2 L26 12.5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* cross bar precision */}
      <path d="M14 16.2 H26" stroke="currentColor" strokeWidth="0.9" opacity="0.35" strokeLinecap="round" />
      {/* center precision dot + horizontal tech line */}
      <circle cx="20" cy="20" r="1.35" fill="currentColor" />
      <path d="M17.2 20 H12 M28 20 H22.8" stroke="currentColor" strokeWidth="0.9" opacity="0.6" strokeLinecap="round" />
      {/* bottom accent tick */}
      <path d="M18.6 33.2 L20 34.6 L21.4 33.2" stroke="#D4A853" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function LogoWordmark({ className, compact = false, light = true }: { className?: string; compact?: boolean; light?: boolean }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <LogoIcon size={compact ? 28 : 36} className={light ? "text-white" : "text-[#0A0A0A]"} />
      <div className="flex flex-col leading-none">
        <span
          className={cn(
            "font-black tracking-[0.14em] leading-none",
            compact ? "text-[13px]" : "text-[15px] sm:text-[16px]",
            light ? "text-white" : "text-zinc-900"
          )}
          style={{ fontFamily: "var(--font-space-grotesk), var(--font-geist-sans), sans-serif" }}
        >
          ULTIMATE
        </span>
        <span
          className={cn(
            "font-light tracking-[0.32em]",
            compact ? "text-[9px]" : "text-[10.5px]",
            light ? "text-white/80" : "text-zinc-600"
          )}
        >
          MECHANICS
        </span>
        {!compact && (
          <span className="hidden sm:block text-[7.5px] tracking-[0.22em] text-white/40 mt-[3px] font-mono">
            PRECISION • TECHNOLOGY • CARE
          </span>
        )}
      </div>
    </div>
  );
}

export function LogoMono({ className }: { className?: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 40 40" fill="none" className={cn(className)}>
      <circle cx="20" cy="20" r="17.5" stroke="white" strokeWidth="1.1" />
      <path
        d="M14 12.5 L14 22.2 C14 26.1 16.4 28.5 20 28.5 C23.6 28.5 26 26.1 26 22.2 L26 12.5"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle cx="20" cy="20" r="1.35" fill="white" />
    </svg>
  );
}
