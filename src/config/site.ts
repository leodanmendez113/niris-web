// Datos generales del sitio. Cambiar aquí, no dentro de los componentes.

/** true = versión de demostración: cinta visible, Google no indexa, reseñas fuera de datos estructurados. */
export const DEMO = true;

export const site = {
  name: "Niris Professional Services LLC",
  shortName: "Niris",
  /** Dirección pública final del sitio (sin barra al final). Cambiar al tener dominio. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  phoneDisplay: "+1 (786) 523-6287",
  phoneE164: "+17865236287",
  whatsapp: "17865236287",
  /** ID de Google Analytics 4 (formato G-XXXXXXX). Vacío = Analytics apagado. */
  gaId: process.env.NEXT_PUBLIC_GA_ID ?? "",
  areas: ["Miami-Dade County", "Broward County"],
  colors: { navy: "#0F2F3F", teal: "#5BB1A7", cream: "#F4F2EC" },
} as const;

export const langs = ["en", "es"] as const;
export type Lang = (typeof langs)[number];

export const serviceSlugs = [
  "airbnb-cleaning",
  "hotel-housekeeping",
  "office-cleaning",
  "home-cleaning",
] as const;
export type ServiceSlug = (typeof serviceSlugs)[number];

/** Antepone el basePath a archivos de /public (imágenes, íconos). */
export const asset = (path: string) => `${site.basePath}${path}`;
