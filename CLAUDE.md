# Niris Professional Services LLC — Sitio web

Sitio de marketing para una empresa de limpieza en Miami-Dade y Broward (B2B, B2C,
hostelería y Airbnb). Objetivo: que quien busque limpieza en la zona encuentre a
Niris en Google y termine escribiendo por WhatsApp o llamando.

**Estado (2026-11-22):** versión DEMO construida, con datos de muestra, para
enseñársela al cliente. Falta conectar datos reales (ver "Pendiente").

Antes de explorar, leer `docs/MAPA.md` (dónde vive cada cosa).

## Datos fijos

- Teléfono y WhatsApp: +1 (786) 523-6287 (mismo número)
- Dueña: Deyanires (madre latina, fundadora)
- Zona: Miami-Dade y Broward
- Colores: azul marino `#0F2F3F`, verde azulado `#5BB1A7`, crema `#F4F2EC`
- Se puede decir "licensed & insured" (confirmado por Leo)

## Stack

- Next.js 16 con exportación estática (`output: "export"` → carpeta `out/`)
- React 19, TypeScript, Tailwind CSS 4, Motion (animaciones)
- Sin servidor ni base de datos. Contacto solo por WhatsApp y llamada.
- Hosting: GitHub Pages con publicación automática (`.github/workflows/deploy.yml`)

## Qué tiene

- Bilingüe: `/en/...` y `/es/...`, con `hreflang` y botón de idioma
- Páginas: inicio, 4 servicios, zonas, historia, cotizador, contacto
- Cotizador en vivo → envía el resumen por WhatsApp
- Botón flotante de WhatsApp + popup a los 6 s (una vez por visita)
- PWA: manifiesto, íconos, service worker, página sin conexión
- SEO: metadatos por página, sitemap, robots, datos estructurados
  (negocio local, servicio, preguntas frecuentes, migas de pan)
- Google Analytics 4 con eventos (apagado hasta tener ID)

## Modo DEMO (importante)

`DEMO = true` en `src/config/site.ts`. Mientras esté activo:

1. Se ve la cinta "Versión de demostración".
2. Google NO indexa el sitio (`noindex` + `robots.txt` bloqueado).
3. Las reseñas de muestra no van a los datos estructurados.

**No poner `DEMO = false` hasta reemplazar todos los datos de muestra**: cifras
(`stats`), reseñas (`reviews`), historia (`story`), horario (`contact.hours`),
tarifas (`pricing.ts`) y la foto de Deyanires. Publicar reseñas o cifras
inventadas como reales es engañoso para los clientes y Google lo penaliza.

## Convenciones

- Textos solo en `src/content/en.ts` y `es.ts` (`es` debe tener la misma forma que `en`).
- Tarifas solo en `src/config/pricing.ts`.
- Clases propias (`.btn`, `.card`, `.eyebrow`, `.container-x`) van dentro de
  `@layer components` en `globals.css`. Si se dejan fuera, pisan a las utilidades
  de Tailwind (por ejemplo `hidden`) y se rompe el diseño en celular.
- Imágenes de `/public` se referencian con `asset("/images/x.jpg")` (agrega la
  subcarpeta de GitHub Pages).
- Toda animación debe respetar "reducir movimiento".
- Rendimiento (aprendido el 2026-11-22, el inicio pasó de 64 a 100 en Lighthouse
  móvil local): las entradas del hero van en CSS (`.rise`, `.fade-up`, `.pop-in`,
  `.ribbon` en `globals.css`), no con Motion, para que el titular se pinte sin
  esperar al código. No usar `mix-blend-mode` ni texturas con filtro en celular.
  Fotos en WebP. Medir con `npx lighthouse <url>` después de tocar el inicio.
- Archivos de 200–400 líneas, organizados por tema.

## Variables de entorno (las pone el workflow de GitHub)

- `NEXT_PUBLIC_BASE_PATH` — subcarpeta del sitio (`/nombre-del-repo`); vacío con dominio propio
- `NEXT_PUBLIC_SITE_URL` — dirección pública sin barra final
- `NEXT_PUBLIC_GA_ID` — ID de Analytics (variable `GA_ID` del repositorio)

## Reglas de trabajo

- Confirmar con Leo antes de cada publicación.
- No inventar datos nuevos fuera del modo DEMO.

## Pendiente (datos reales que debe entregar Leo o el cliente)

1. Años de experiencia y cifras reales
2. Reseñas reales
3. Tarifas reales del cotizador
4. Historia real de Deyanires y su foto (`docs/IMAGENES.md`)
5. Horario real
6. ID de Google Analytics 4
7. Dominio propio (al tenerlo: quitar `basePath`, cambiar `SITE_URL`, registrar en Google Search Console)

## Ideas para después

- Direcciones en español para las páginas de servicio (`/es/servicios/...`)
- Blog, reservas o pagos en línea
- Perfil de Negocio de Google enlazado al sitio
