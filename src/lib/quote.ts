import { pricing, type QuoteService } from "@/config/pricing";

export type QuoteState = {
  service: QuoteService;
  bedrooms: number; // 0 = estudio
  bathrooms: number;
  sqft: number;
  rooms: number; // habitaciones de hotel por día
  cleanType: "standard" | "deep" | "move";
  frequency: string; // id dentro de la lista de frecuencia del servicio
  extras: string[];
};

export type QuoteResult = {
  /** Rango por visita (o por día en hoteles) */
  low: number;
  high: number;
  /** Rango mensual; null cuando es una limpieza única */
  monthlyLow: number | null;
  monthlyHigh: number | null;
  unit: "visit" | "day";
  discount: number;
};

const WEEKS_PER_MONTH = 4.33;
const round5 = (n: number) => Math.round(n / 5) * 5;
const clampIdx = (n: number, len: number) => Math.min(Math.max(n, 0), len - 1);

export const defaultFrequency: Record<QuoteService, string> = {
  airbnb: "5-10",
  home: "biweekly",
  office: "3",
  hotel: "7",
};

export const defaultState: QuoteState = {
  service: "airbnb",
  bedrooms: 2,
  bathrooms: 1,
  sqft: 2000,
  rooms: 20,
  cleanType: "standard",
  frequency: defaultFrequency.airbnb,
  extras: [],
};

function sumExtras(table: Record<string, number>, chosen: string[]) {
  return chosen.reduce((t, id) => t + (table[id] ?? 0), 0);
}

export function calculateQuote(s: QuoteState): QuoteResult {
  let base = 0;
  let discount = 0;
  let perMonth: number | null = null;
  let unit: QuoteResult["unit"] = "visit";

  if (s.service === "airbnb") {
    const p = pricing.airbnb;
    const f = p.volume.find((v) => v.id === s.frequency) ?? p.volume[0];
    base =
      p.byBedrooms[clampIdx(s.bedrooms, p.byBedrooms.length)] +
      Math.max(0, s.bathrooms - 1) * p.extraBathroom +
      sumExtras(p.extras, s.extras);
    discount = f.discount;
    perMonth = f.minPerMonth;
  } else if (s.service === "home") {
    const p = pricing.home;
    const f = p.frequency.find((v) => v.id === s.frequency) ?? p.frequency[0];
    base =
      (p.byBedrooms[clampIdx(s.bedrooms, p.byBedrooms.length)] +
        Math.max(0, s.bathrooms - 1) * p.extraBathroom) *
        p.type[s.cleanType] +
      sumExtras(p.extras, s.extras);
    discount = f.discount;
    perMonth = f.id === "once" ? null : f.perMonth;
  } else if (s.service === "office") {
    const p = pricing.office;
    const f = p.frequency.find((v) => v.id === s.frequency) ?? p.frequency[0];
    base = Math.max(p.minimumVisit, s.sqft * p.perSqft) + sumExtras(p.extras, s.extras);
    discount = f.discount;
    perMonth = f.perWeek * WEEKS_PER_MONTH;
  } else {
    const p = pricing.hotel;
    const f = p.frequency.find((v) => v.id === s.frequency) ?? p.frequency[0];
    base = s.rooms * p.perRoom + sumExtras(p.extras, s.extras);
    discount = f.discount;
    perMonth = f.perWeek * WEEKS_PER_MONTH;
    unit = "day";
  }

  const total = base * (1 - discount);
  const low = round5(total * pricing.range.low);
  const high = round5(total * pricing.range.high);
  return {
    low,
    high,
    monthlyLow: perMonth === null ? null : round5(low * perMonth),
    monthlyHigh: perMonth === null ? null : round5(high * perMonth),
    unit,
    discount,
  };
}

export const money = (n: number, lang: string) =>
  new Intl.NumberFormat(lang === "es" ? "es-US" : "en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
