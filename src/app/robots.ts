import type { MetadataRoute } from "next";
import { DEMO, site } from "@/config/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  // En modo demo se bloquea a los buscadores.
  if (DEMO) return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${site.url}${site.basePath}/sitemap.xml` };
}
