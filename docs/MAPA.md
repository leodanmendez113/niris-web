# Mapa del proyecto

Qué hace cada carpeta y dónde vive cada cosa. Actualizar cuando cambie la estructura.

| Ruta | Qué hay |
|---|---|
| `src/config/site.ts` | Teléfono, WhatsApp, interruptor `DEMO`, ID de Analytics, lista de idiomas y servicios |
| `src/config/pricing.ts` | **Tarifas del cotizador** (provisionales). Solo números |
| `src/content/en.ts`, `es.ts` | **Todos los textos** del sitio (incluye cifras, reseñas e historia de muestra) |
| `src/lib/quote.ts` | Cálculo del estimado (usa `pricing.ts`) |
| `src/lib/whatsapp.ts` | Arma los enlaces de WhatsApp y de llamada |
| `src/lib/seo.ts` | Metadatos por página (título, descripción, idiomas alternos, noindex en demo) |
| `src/lib/analytics.ts` | Eventos de Google Analytics (`whatsapp_click`, `call_click`, `quote_complete`, `popup_shown`) |
| `src/lib/i18n.ts` | Elegir diccionario por idioma y armar rutas `/en/...`, `/es/...` |
| `src/app/[lang]/` | Páginas: inicio, `services/[slug]`, `areas`, `story`, `quote`, `contact` |
| `src/app/(root)/` | Página raíz: redirige a `/es` o `/en` según el navegador |
| `src/app/sitemap.ts`, `robots.ts`, `manifest.ts` | Mapa del sitio, reglas para buscadores, manifiesto de la app instalable |
| `src/app/globals.css` | Colores de marca, tipografías, botones, animaciones CSS |
| `src/components/home/` | Hero animado y secciones del inicio (`Sections.tsx`) |
| `src/components/motion/` | Animaciones reutilizables: `Reveal`, `Counter`, `Marquee` |
| `src/components/layout/` | Encabezado, pie, logo en SVG, encabezado de páginas interiores, cinta de demo |
| `src/components/whatsapp/` | Botón flotante y popup de WhatsApp |
| `src/components/quote/` | Cotizador en vivo |
| `src/components/seo/` | Datos estructurados para Google, Analytics, registro del service worker |
| `public/images/` | Fotos optimizadas (ver `docs/IMAGENES.md`) |
| `public/icons/`, `public/og.jpg` | Íconos de la app e imagen para compartir (generados) |
| `public/sw.js`, `public/offline.html` | Service worker y página sin conexión |
| `scripts/assets.cjs` | Regenera íconos, imagen para compartir y fotos optimizadas |
| `.github/workflows/deploy.yml` | Publicación automática en GitHub Pages |

## Comandos

- `npm run dev` — ver el sitio mientras se edita (http://localhost:3000)
- `npm run build` — generar el sitio final en la carpeta `out/`
- `npm run preview` — servir `out/` en http://localhost:4173
