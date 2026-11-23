"use client";
import { animate, motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { CheckIcon, WhatsAppIcon } from "@/components/Icons";
import { serviceIcons } from "@/components/home/Sections";
import { pricing, type QuoteService } from "@/config/pricing";
import type { Lang, ServiceSlug } from "@/config/site";
import { track } from "@/lib/analytics";
import type { Dict } from "@/lib/i18n";
import { calculateQuote, defaultFrequency, defaultState, money, type QuoteState } from "@/lib/quote";
import { whatsappLink } from "@/lib/whatsapp";

const services: { id: QuoteService; slug: ServiceSlug }[] = [
  { id: "airbnb", slug: "airbnb-cleaning" },
  { id: "home", slug: "home-cleaning" },
  { id: "office", slug: "office-cleaning" },
  { id: "hotel", slug: "hotel-housekeeping" },
];

const frequencyIds: Record<QuoteService, string[]> = {
  airbnb: pricing.airbnb.volume.map((f) => f.id),
  home: pricing.home.frequency.map((f) => f.id),
  office: pricing.office.frequency.map((f) => f.id),
  hotel: pricing.hotel.frequency.map((f) => f.id),
};
const extraIds: Record<QuoteService, string[]> = {
  airbnb: Object.keys(pricing.airbnb.extras),
  home: Object.keys(pricing.home.extras),
  office: Object.keys(pricing.office.extras),
  hotel: Object.keys(pricing.hotel.extras),
};

/** Número que se desliza suavemente hasta su nuevo valor. */
function AnimatedMoney({ value, lang }: { value: number; lang: string }) {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(value);
  const from = useRef(value);
  useEffect(() => {
    if (reduce) { setShown(value); from.current = value; return; }
    const controls = animate(from.current, value, {
      duration: 0.5, ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => { from.current = v; setShown(Math.round(v)); },
    });
    return () => controls.stop();
  }, [value, reduce]);
  return <span className="tabular-nums">{money(shown, lang)}</span>;
}

function Step({ title, children }: { title: string; children: ReactNode }) {
  return (
    <fieldset className="card p-5 md:p-7">
      <legend className="float-left mb-4 w-full font-display text-lg font-bold">{title}</legend>
      <div className="clear-both">{children}</div>
    </fieldset>
  );
}

function Pill({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`min-h-12 rounded-2xl border px-4 py-2.5 font-display text-[0.95rem] font-semibold transition-all ${
        active ? "border-navy bg-navy text-cream shadow-lg" : "border-navy/15 bg-white text-navy hover:border-navy/40"
      }`}
    >
      {children}
    </button>
  );
}

function Stepper({ label, value, min, max, onChange, format }: {
  label: string; value: number; min: number; max: number; onChange: (n: number) => void; format?: (n: number) => string;
}) {
  const btn = "grid h-12 w-12 place-items-center rounded-full border border-navy/15 bg-white text-2xl font-semibold text-navy transition-colors hover:border-navy disabled:opacity-30";
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="font-medium">{label}</span>
      <div className="flex items-center gap-3">
        <button type="button" className={btn} disabled={value <= min} onClick={() => onChange(value - 1)} aria-label={`${label} −`}>−</button>
        <output className="w-16 text-center font-display text-xl font-bold tabular-nums" aria-live="polite">{format ? format(value) : value}</output>
        <button type="button" className={btn} disabled={value >= max} onClick={() => onChange(value + 1)} aria-label={`${label} +`}>+</button>
      </div>
    </div>
  );
}

function Slider({ label, value, min, max, step, onChange, lang }: {
  label: string; value: number; min: number; max: number; step: number; onChange: (n: number) => void; lang: string;
}) {
  const id = `slider-${label.replace(/\s+/g, "-")}`;
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <label htmlFor={id} className="font-medium">{label}</label>
        <output className="font-display text-2xl font-bold tabular-nums">{value.toLocaleString(lang === "es" ? "es-US" : "en-US")}</output>
      </div>
      <input id={id} type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="mt-2" />
    </div>
  );
}

export function QuoteCalculator({ lang, t }: { lang: Lang; t: Dict }) {
  const q = t.quote;
  const [s, setS] = useState<QuoteState>(defaultState);
  const set = (patch: Partial<QuoteState>) => setS((prev) => ({ ...prev, ...patch }));
  const result = useMemo(() => calculateQuote(s), [s]);

  const freqLabels = q.frequency[s.service] as Record<string, string>;
  const extraLabels = q.extras[s.service] as Record<string, string>;
  const isRooms = s.service === "airbnb" || s.service === "home";

  const sizeText = isRooms
    ? `${s.bedrooms === 0 ? q.studio : `${s.bedrooms} ${q.bedrooms.toLowerCase()}`}, ${s.bathrooms} ${q.bathrooms.toLowerCase()}${s.service === "home" ? ` · ${q.cleanTypes[s.cleanType]}` : ""}`
    : s.service === "office" ? `${s.sqft.toLocaleString("en-US")} ${q.sqft.toLowerCase()}` : `${s.rooms} ${q.rooms.toLowerCase()}`;
  const unitText = result.unit === "day" ? q.perDay : q.perVisit;
  const rangeText = `${money(result.low, lang)} – ${money(result.high, lang)} ${unitText}`;
  const extrasText = s.extras.length ? s.extras.map((e) => extraLabels[e]).join(", ") : q.message.none;
  const message = [
    q.message.hello,
    `• ${q.message.service}: ${q.serviceNames[s.service]}`,
    `• ${q.message.size}: ${sizeText}`,
    `• ${q.message.frequency}: ${freqLabels[s.frequency]}`,
    `• ${q.message.extras}: ${extrasText}`,
    `• ${q.message.estimate}: ${rangeText}`,
    q.message.close,
  ].join("\n");

  const toggleExtra = (id: string) =>
    set({ extras: s.extras.includes(id) ? s.extras.filter((e) => e !== id) : [...s.extras, id] });

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[1.25fr_0.75fr]">
      <div className="grid gap-5">
        <Step title={q.stepService}>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {services.map(({ id, slug }) => {
              const Icon = serviceIcons[slug];
              const active = s.service === id;
              return (
                <button
                  key={id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => set({ service: id, frequency: defaultFrequency[id], extras: [] })}
                  className={`relative flex min-h-24 flex-col items-center justify-center gap-2 rounded-2xl border p-3 text-center font-display text-sm font-semibold transition-all ${
                    active ? "border-navy bg-navy text-cream shadow-lg" : "border-navy/15 bg-white hover:border-navy/40"
                  }`}
                >
                  <Icon className={`h-7 w-7 ${active ? "text-teal" : "text-teal-dark"}`} />
                  {q.serviceNames[id]}
                </button>
              );
            })}
          </div>
        </Step>

        <Step title={q.stepSize}>
          <motion.div key={s.service} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="grid gap-5">
            {isRooms && (
              <>
                <Stepper label={q.bedrooms} value={s.bedrooms} min={0} max={5} onChange={(n) => set({ bedrooms: n })} format={(n) => (n === 0 ? q.studio : n === 5 ? "5+" : String(n))} />
                <Stepper label={q.bathrooms} value={s.bathrooms} min={1} max={5} onChange={(n) => set({ bathrooms: n })} />
              </>
            )}
            {s.service === "home" && (
              <div>
                <p className="mb-2.5 font-medium">{q.cleanType}</p>
                <div className="grid grid-cols-3 gap-2">
                  {(["standard", "deep", "move"] as const).map((c) => (
                    <Pill key={c} active={s.cleanType === c} onClick={() => set({ cleanType: c })}>{q.cleanTypes[c]}</Pill>
                  ))}
                </div>
              </div>
            )}
            {s.service === "office" && <Slider label={q.sqft} value={s.sqft} min={500} max={20000} step={250} onChange={(n) => set({ sqft: n })} lang={lang} />}
            {s.service === "hotel" && <Slider label={q.rooms} value={s.rooms} min={5} max={200} step={5} onChange={(n) => set({ rooms: n })} lang={lang} />}
          </motion.div>
        </Step>

        <Step title={q.stepFrequency}>
          <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
            {frequencyIds[s.service].map((f) => (
              <Pill key={f} active={s.frequency === f} onClick={() => set({ frequency: f })}>{freqLabels[f]}</Pill>
            ))}
          </div>
        </Step>

        <Step title={q.stepExtras}>
          <div className="grid gap-2.5 sm:grid-cols-3">
            {extraIds[s.service].map((e) => {
              const active = s.extras.includes(e);
              return (
                <button
                  key={e}
                  type="button"
                  role="checkbox"
                  aria-checked={active}
                  onClick={() => toggleExtra(e)}
                  className={`flex min-h-14 items-center gap-3 rounded-2xl border px-4 py-3 text-left text-[0.95rem] font-medium transition-all ${
                    active ? "border-teal-dark bg-teal-soft" : "border-navy/15 bg-white hover:border-navy/40"
                  }`}
                >
                  <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-md border-2 transition-colors ${active ? "border-teal-dark bg-teal-dark text-white" : "border-navy/25"}`}>
                    {active && <CheckIcon className="h-4 w-4" />}
                  </span>
                  {extraLabels[e]}
                </button>
              );
            })}
          </div>
        </Step>
      </div>

      <aside className="on-dark grain sticky bottom-3 z-20 overflow-hidden rounded-3xl bg-navy p-4 text-cream shadow-2xl lg:top-28 lg:bottom-auto lg:p-8" aria-live="polite">
        <div className="absolute -right-10 -top-16 h-48 w-48 rounded-full bg-teal/25 blur-3xl" aria-hidden="true" />
        <div className="relative flex items-center justify-between gap-3 lg:block">
          <div className="min-w-0">
            <p className="eyebrow">{q.resultTitle}</p>
            <p className="mt-0.5 whitespace-nowrap font-display text-[1.45rem] font-extrabold leading-tight lg:mt-2 lg:text-[2.6rem]">
              <AnimatedMoney value={result.low} lang={lang} /> <span className="text-teal">–</span> <AnimatedMoney value={result.high} lang={lang} />
            </p>
            <p className="text-sm text-cream/70 lg:text-base">{unitText}</p>
          </div>

          {result.monthlyLow !== null && result.monthlyHigh !== null && (
            <p className="mt-4 hidden border-t border-cream/15 pt-4 text-cream/85 lg:block">
              {q.perMonth}: <strong className="font-display text-cream">{money(result.monthlyLow, lang)} – {money(result.monthlyHigh, lang)}</strong>
            </p>
          )}
          {result.discount > 0 && (
            <p className="mt-3 hidden w-fit items-center gap-2 rounded-full bg-teal/20 px-3 py-1 text-sm text-teal lg:inline-flex">
              <CheckIcon className="h-4 w-4" /> {q.discount} (−{Math.round(result.discount * 100)}%)
            </p>
          )}

          <a
            href={whatsappLink(message)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={q.send}
            onClick={() => track("quote_complete", { service: s.service, low: result.low, high: result.high })}
            className="btn btn-whatsapp shrink-0 px-5 lg:mt-5 lg:w-full"
          >
            <WhatsAppIcon className="h-5 w-5" />
            <span className="lg:hidden">{q.sendShort}</span>
            <span className="hidden lg:inline">{q.send}</span>
          </a>
        </div>
        <p className="relative mt-4 hidden text-sm text-cream/60 lg:block">{q.disclaimer}</p>
      </aside>
      <p className="text-sm text-navy/60 lg:hidden">{q.disclaimer}</p>
    </div>
  );
}
