// Genera íconos de la app e imagen para compartir a partir del logo, y optimiza las fotos.
// Uso: node scripts/assets.cjs [carpeta-con-fotos-originales]
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const pub = path.join(__dirname, "..", "public");

const mark = (dark, gap) => `
  <path d="M17 72 L35 32" stroke="#5bb1a7" stroke-width="17"/>
  <path d="M86 56 L103 18" stroke="#5bb1a7" stroke-width="17"/>
  <path d="M38 20 C46 12 52 18 56 23 L80 58 C84 64 86 66 88 62" stroke="${gap}" stroke-width="24"/>
  <path d="M38 20 C46 12 52 18 56 23 L80 58 C84 64 86 66 88 62" stroke="${dark}" stroke-width="17"/>`;

const icon = (pad, radius) => Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="none" stroke-linecap="round">
  <rect width="512" height="512" rx="${radius}" fill="#0f2f3f"/>
  <g transform="translate(${pad} ${pad + (512 - 2 * pad) * 0.125}) scale(${(512 - 2 * pad) / 120})">${mark("#f4f2ec", "#0f2f3f")}</g>
</svg>`);

const og = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" fill="none" stroke-linecap="round">
  <rect width="1200" height="630" fill="#0f2f3f"/>
  <path d="M760 760 L960 240" stroke="#5bb1a7" stroke-opacity=".18" stroke-width="130"/>
  <path d="M980 120 C1040 60 1100 110 1130 160 L1300 420" stroke="#1c4458" stroke-width="130"/>
  <g transform="translate(90 110) scale(1.7)">${mark("#f4f2ec", "#0f2f3f")}</g>
  <text x="90" y="390" font-family="Helvetica, Arial, sans-serif" font-weight="800" font-size="120" fill="#f4f2ec" letter-spacing="4">NIRIS</text>
  <text x="94" y="440" font-family="Helvetica, Arial, sans-serif" font-weight="600" font-size="30" fill="#f4f2ec" fill-opacity=".8" letter-spacing="7">PROFESSIONAL SERVICES LLC</text>
  <text x="94" y="530" font-family="Helvetica, Arial, sans-serif" font-size="34" fill="#5bb1a7">Cleaning · Miami-Dade &amp; Broward · +1 (786) 523-6287</text>
</svg>`);

const photos = {
  // archivo final: [archivo original, ancho, alto]
  "hero.jpg": ["1629140727571-9b5c6f6267b4.jpg", 900, 1125],
  "airbnb-cleaning.jpg": ["1596205178128-cde32892fd11.jpg", 1200, 750],
  "hotel-housekeeping.jpg": ["1573014196346-87ac0314faf5.jpg", 1200, 750],
  "office-cleaning.jpg": ["1497366754035-f200968a6e72.jpg", 1200, 750],
  "home-cleaning.jpg": ["1649083048391-1c9e82472f65.jpg", 1200, 750],
  "deyanires.jpg": ["1586391975091-40b8eb04bfc7.jpg", 720, 900],
  "deyanires-sm.jpg": ["1586391975091-40b8eb04bfc7.jpg", 132, 132],
};

(async () => {
  await sharp(icon(96, 0)).resize(192).png().toFile(path.join(pub, "icons/icon-192.png"));
  await sharp(icon(96, 0)).png().toFile(path.join(pub, "icons/icon-512.png"));
  await sharp(icon(130, 0)).png().toFile(path.join(pub, "icons/icon-maskable-512.png"));
  await sharp(icon(96, 0)).resize(180).png().toFile(path.join(pub, "icons/apple-touch-icon.png"));
  await sharp(og).jpeg({ quality: 88 }).toFile(path.join(pub, "og.jpg"));
  const src = process.argv[2];
  if (src) {
    for (const [out, [file, w, h]] of Object.entries(photos)) {
      await sharp(path.join(src, file))
        .resize(w, h, { fit: "cover", position: out.startsWith("deyanires") ? "top" : "attention" })
        .jpeg({ quality: 74, mozjpeg: true })
        .toFile(path.join(pub, "images", out));
    }
  }
  console.log("listo");
})();
