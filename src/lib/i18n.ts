import { langs, type Lang } from "@/config/site";
import { en } from "@/content/en";
import { es } from "@/content/es";

export type Dict = typeof en;
const dicts: Record<Lang, Dict> = { en, es };

export const isLang = (v: string): v is Lang => (langs as readonly string[]).includes(v);
export const getDict = (lang: string): Dict => dicts[isLang(lang) ? lang : "en"];
export const otherLang = (lang: Lang): Lang => (lang === "en" ? "es" : "en");

/** Ruta interna con idioma: href("es", "/quote") → "/es/quote/" */
export const href = (lang: string, path = "/") =>
  `/${lang}${path === "/" ? "/" : `${path.replace(/\/$/, "")}/`}`;
