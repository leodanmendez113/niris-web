import type { Metadata } from "next";
import { DEMO, langs, site, type Lang } from "@/config/site";

/** Dirección pública completa de una página: abs("es", "/quote") */
export const abs = (lang: string, path = "/") =>
  `${site.url}${site.basePath}/${lang}${path === "/" ? "/" : `${path}/`}`;

/** Metadatos de una página: título, descripción, dirección canónica, idiomas alternos y vista previa al compartir. */
export function pageMeta(lang: Lang, path: string, title: string, description: string): Metadata {
  const languages = Object.fromEntries(langs.map((l) => [l, abs(l, path)]));
  return {
    title,
    description,
    alternates: { canonical: abs(lang, path), languages: { ...languages, "x-default": abs("en", path) } },
    openGraph: {
      title, description, url: abs(lang, path), siteName: site.name, type: "website",
      locale: lang === "es" ? "es_US" : "en_US",
      images: [{ url: `${site.url}${site.basePath}/og.jpg`, width: 1200, height: 630, alt: site.name }],
    },
    twitter: { card: "summary_large_image", title, description, images: [`${site.url}${site.basePath}/og.jpg`] },
    // En modo demo se le pide a Google que NO liste el sitio.
    robots: DEMO ? { index: false, follow: false } : { index: true, follow: true },
  };
}
