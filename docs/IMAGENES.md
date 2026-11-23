# Imágenes

Todas las fotos vienen de Unsplash (licencia Unsplash: uso gratuito, comercial, sin atribución obligatoria).
Página de cada foto: `https://unsplash.com/photos/<id>` · archivo original: `https://images.unsplash.com/photo-<id>`.

| Archivo | Uso | ID en images.unsplash.com |
|---|---|---|
| `hero.webp` | Inicio | `photo-1629140727571-9b5c6f6267b4` |
| `airbnb-cleaning.webp` | Servicio Airbnb | `photo-1596205178128-cde32892fd11` |
| `hotel-housekeeping.webp` | Servicio hoteles | `photo-1573014196346-87ac0314faf5` |
| `office-cleaning.webp` | Servicio oficinas | `photo-1497366754035-f200968a6e72` |
| `home-cleaning.webp` | Servicio casas | `photo-1649083048391-1c9e82472f65` |
| `deyanires.webp`, `deyanires-sm.webp` | Retrato de Deyanires con traje (entregado por Leo el 2026-11-22) | original en `scripts/originales/deyanires.webp` |

## Cambiar la foto de Deyanires

1. Reemplazar `scripts/originales/deyanires.webp` por la foto nueva (cuadrada, rostro centrado).
2. `node scripts/assets.cjs` (solo recorta a 720×900 y 132×132; no retoca).
3. Si el rostro queda descentrado, ajustar los números de `extract` en `scripts/assets.cjs`.
4. `npm run build`.

No publicar una foto de Deyanires sin que Leo la apruebe primero (el 2026-11-22 hubo que retirar una del sitio y del historial).
