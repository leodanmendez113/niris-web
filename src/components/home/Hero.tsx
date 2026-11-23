"use client";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { useRef } from "react";
import { ArrowIcon, CheckIcon, StarIcon } from "@/components/Icons";
import { WhatsAppButton } from "@/components/Cta";
import { asset, site, type Lang } from "@/config/site";
import { href, type Dict } from "@/lib/i18n";

const d = (seconds: number) => ({ animationDelay: `${seconds}s` });

function Words({ text, delay, className }: { text: string; delay: number; className?: string }) {
  return (
    <span className={`block ${className ?? ""}`}>
      {text.split(" ").map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <span className="rise" style={d(delay + i * 0.09)}>{w}&nbsp;</span>
        </span>
      ))}
    </span>
  );
}

/** Cintas del logo en el fondo (animadas con CSS, ver globals.css). */
function Ribbons() {
  return (
    <svg viewBox="0 0 1200 800" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" fill="none" strokeLinecap="round" aria-hidden="true">
      <path className="ribbon" pathLength={1} style={d(0.1)} d="M-60 760 L210 180" stroke={site.colors.teal} strokeOpacity="0.16" strokeWidth="150" />
      <path className="ribbon" pathLength={1} style={d(0.35)} d="M250 60 C330 -20 410 40 460 110 L800 600 C860 690 900 720 940 660" stroke="#1c4458" strokeOpacity="0.55" strokeWidth="150" />
      <path className="ribbon" pathLength={1} style={d(0.7)} d="M930 640 L1180 90" stroke={site.colors.teal} strokeOpacity="0.22" strokeWidth="150" />
    </svg>
  );
}

export function Hero({ lang, t }: { lang: Lang; t: Dict }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 90]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -40]);

  return (
    <section ref={ref} className="on-dark grain relative isolate overflow-hidden bg-navy text-cream">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(90%_70%_at_80%_10%,#1c4458_0%,transparent_60%)]" />
      <div className="absolute inset-0 -z-10"><Ribbons /></div>

      <div className="container-x grid items-center gap-12 pb-20 pt-28 md:pt-36 lg:min-h-[100svh] lg:grid-cols-[1.1fr_0.9fr] lg:pb-24">
        <motion.div style={{ y: textY }}>
          <p className="eyebrow fade-up inline-flex items-center gap-2 rounded-full border border-teal/40 px-3.5 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping-slow rounded-full bg-teal" />
              <span className="relative h-2 w-2 rounded-full bg-teal" />
            </span>
            {t.hero.eyebrow}
          </p>

          <h1 className="mt-6 text-[clamp(2.5rem,8vw,4.6rem)] font-extrabold leading-[1.02] tracking-tight">
            <Words text={t.hero.titleA} delay={0.15} />
            <Words text={t.hero.titleB} delay={0.45} className="text-teal" />
          </h1>

          <p className="fade-up mt-6 max-w-xl text-lg text-cream/80 md:text-xl" style={d(0.7)}>
            {t.hero.subtitle}
          </p>

          <div className="fade-up mt-8 flex flex-col gap-3 sm:flex-row" style={d(0.85)}>
            <WhatsAppButton message={t.whatsapp.defaultMessage} label={t.cta.whatsapp} source="hero" />
            <Link href={href(lang, "/quote")} className="btn btn-ghost-light">
              {t.cta.quote} <ArrowIcon className="h-5 w-5" />
            </Link>
          </div>

          <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-2.5">
            {t.hero.badges.map((b, i) => (
              <li key={b} className="fade-up flex items-center gap-2 text-[0.95rem] text-cream/85" style={d(1 + i * 0.1)}>
                <span className="grid h-5 w-5 place-items-center rounded-full bg-teal text-navy-deep"><CheckIcon className="h-3.5 w-3.5" /></span>
                {b}
              </li>
            ))}
          </ul>
        </motion.div>

        <div className="pop-in relative mx-auto w-full max-w-md lg:max-w-none" style={d(0.3)}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] rounded-tr-[7rem] rounded-bl-[7rem] ring-1 ring-cream/15">
            <motion.img
              style={{ y: imgY, scale: 1.15 }}
              src={asset("/images/hero.webp")}
              alt=""
              width={800} height={1000}
              fetchPriority="high"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
          </div>

          <div className="absolute -right-2 top-10 animate-float rounded-2xl bg-cream px-4 py-3 text-navy shadow-2xl md:-right-5">
            <div className="flex items-center gap-1 text-amber-500">
              {[0, 1, 2, 3, 4].map((i) => <StarIcon key={i} className="h-4 w-4" />)}
            </div>
            <p className="mt-1 font-display text-sm font-semibold">{t.stats.items[3].value} · {t.stats.items[3].label}</p>
          </div>

          <div className="absolute -left-3 bottom-12 animate-float rounded-2xl bg-teal px-4 py-3 text-navy-deep shadow-2xl [animation-delay:-3.5s] md:-left-8">
            <p className="font-display text-2xl font-extrabold leading-none">{t.stats.items[0].value}+</p>
            <p className="mt-1 text-sm font-medium">{t.stats.items[0].label}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
