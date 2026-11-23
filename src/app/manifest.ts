import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export const dynamic = "force-static";

// Manifiesto: le dice al celular cómo "instalar" el sitio como app (nombre, ícono, colores).
export default function manifest(): MetadataRoute.Manifest {
  const b = site.basePath;
  return {
    name: site.name,
    short_name: site.shortName,
    description: "Professional cleaning in Miami-Dade & Broward",
    start_url: `${b}/en/`,
    scope: `${b}/`,
    display: "standalone",
    background_color: site.colors.cream,
    theme_color: site.colors.navy,
    lang: "en",
    categories: ["business", "lifestyle"],
    icons: [
      { src: `${b}/icons/icon-192.png`, sizes: "192x192", type: "image/png" },
      { src: `${b}/icons/icon-512.png`, sizes: "512x512", type: "image/png" },
      { src: `${b}/icons/icon-maskable-512.png`, sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
