import type { MetadataRoute } from "next";
import { langs, serviceSlugs } from "@/config/site";
import { abs } from "@/lib/seo";

export const dynamic = "force-static";

// Mapa del sitio: la lista de páginas que se le entrega a Google.
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/areas", "/story", "/quote", "/contact", ...serviceSlugs.map((s) => `/services/${s}`)];
  return paths.flatMap((path) =>
    langs.map((lang) => ({
      url: abs(lang, path),
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : path.startsWith("/services") ? 0.9 : 0.7,
      alternates: { languages: Object.fromEntries(langs.map((l) => [l, abs(l, path)])) },
    }))
  );
}
