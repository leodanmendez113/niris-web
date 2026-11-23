import { site } from "@/config/site";

/** La "N" de dos cintas del logo, redibujada en SVG (vectorial: se ve nítida a cualquier tamaño). */
export function LogoMark({ className = "", light = false }: { className?: string; light?: boolean }) {
  const dark = light ? site.colors.cream : site.colors.navy;
  const gap = light ? site.colors.navy : site.colors.cream;
  return (
    <svg viewBox="0 0 120 90" className={className} aria-hidden="true" fill="none" strokeLinecap="round">
      <path d="M17 72 L35 32" stroke={site.colors.teal} strokeWidth="17" />
      <path d="M86 56 L103 18" stroke={site.colors.teal} strokeWidth="17" />
      <path d="M38 20 C46 12 52 18 56 23 L80 58 C84 64 86 66 88 62" stroke={gap} strokeWidth="24" />
      <path d="M38 20 C46 12 52 18 56 23 L80 58 C84 64 86 66 88 62" stroke={dark} strokeWidth="17" />
    </svg>
  );
}

export function Logo({ light = false, className = "" }: { light?: boolean; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark light={light} className="h-9 w-auto shrink-0" />
      <span className="flex flex-col leading-none">
        <span className={`font-display text-[1.35rem] font-extrabold tracking-wide ${light ? "text-cream" : "text-navy"}`}>
          NIRIS
        </span>
        <span className={`mt-0.5 font-display text-[0.5rem] font-semibold tracking-[0.2em] ${light ? "text-cream/70" : "text-navy/70"}`}>
          PROFESSIONAL SERVICES LLC
        </span>
      </span>
    </span>
  );
}
