import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";

/** Encabezado azul de las páginas interiores. */
export function PageHero({ eyebrow, title, lead, children }: { eyebrow: ReactNode; title: string; lead?: string; children?: ReactNode }) {
  return (
    <section className="on-dark grain relative isolate overflow-hidden bg-navy pb-16 pt-32 text-cream md:pb-20 md:pt-44">
      <div className="absolute -right-24 -top-24 -z-10 h-96 w-96 rounded-full bg-teal/20 blur-3xl" aria-hidden="true" />
      <svg viewBox="0 0 1200 500" className="absolute inset-0 -z-10 h-full w-full" preserveAspectRatio="xMidYMid slice" fill="none" strokeLinecap="round" aria-hidden="true">
        <path d="M780 560 L960 120" stroke="#5bb1a7" strokeOpacity="0.14" strokeWidth="120" />
        <path d="M980 60 C1040 0 1100 50 1130 100 L1300 360" stroke="#1c4458" strokeOpacity="0.6" strokeWidth="120" />
      </svg>
      <div className="container-x">
        <Reveal>
          <div className="eyebrow">{eyebrow}</div>
          <h1 className="mt-4 max-w-4xl text-[clamp(2.2rem,7vw,4.2rem)] font-extrabold leading-[1.04] tracking-tight">{title}</h1>
          {lead && <p className="mt-5 max-w-2xl text-lg text-cream/80 md:text-xl">{lead}</p>}
          {children && <div className="mt-8">{children}</div>}
        </Reveal>
      </div>
    </section>
  );
}
