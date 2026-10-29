/*
 * Ilustraciones de botellas en SVG, una forma por presentación.
 * Todas comparten el mismo lienzo (120 × 260) para que el tamaño se compare a simple vista.
 * Sirven mientras no haya fotos reales de los productos.
 */

const FORMAS_BOTELLA = {
  "750 ML": {
    cuerpo: "M52 8h16v6h-1v66c0 18 23 22 23 46v118a8 8 0 0 1-8 8H38a8 8 0 0 1-8-8V126c0-24 23-28 23-46V14h-1z",
    tapa: { x: 51, y: 4, w: 18, h: 22 },
    etiqueta: { x: 36, y: 160, w: 48, h: 54 },
    brillo: { x: 35, y: 128, h: 110 },
  },
  "1 L": {
    cuerpo: "M50 6h20v8h-2v40c0 14 24 20 24 40v150a10 10 0 0 1-10 10H38a10 10 0 0 1-10-10V94c0-20 24-26 24-40V14h-2z",
    tapa: { x: 49, y: 2, w: 22, h: 20 },
    etiqueta: { x: 34, y: 150, w: 52, h: 62 },
    brillo: { x: 33, y: 100, h: 138 },
  },
  "2 L": {
    cuerpo: "M48 14h24v8h-2v20c0 12 34 16 34 40v156a12 12 0 0 1-12 12H28a12 12 0 0 1-12-12V82c0-24 34-28 34-40V22h-2z",
    tapa: { x: 47, y: 8, w: 26, h: 18 },
    etiqueta: { x: 26, y: 140, w: 68, h: 70 },
    brillo: { x: 22, y: 90, h: 140 },
  },
  "4 L": {
    cuerpo: "M50 20h20v10h-2v14c0 8 40 10 40 34v164a12 12 0 0 1-12 12H24a12 12 0 0 1-12-12V78c0-24 40-26 40-34V30h-2z",
    tapa: { x: 49, y: 14, w: 22, h: 18 },
    etiqueta: { x: 22, y: 140, w: 76, h: 74 },
    brillo: { x: 18, y: 88, h: 150 },
    asa: "M74 50c22 4 34 14 34 34v30",
  },
  "CHATA": {
    cuerpo: "M52 60h16v8h-1v10h17a10 10 0 0 1 10 10v140a12 12 0 0 1-12 12H38a12 12 0 0 1-12-12V88a10 10 0 0 1 10-10h17V68h-1z",
    tapa: { x: 51, y: 54, w: 18, h: 16 },
    etiqueta: { x: 34, y: 132, w: 52, h: 62 },
    brillo: { x: 31, y: 92, h: 132 },
  },
};

let contadorBotellas = 0;

/** Aclara (+) u oscurece (−) un color hex en una proporción de -1 a 1. */
function ajustarColor(hex, proporcion) {
  const valor = parseInt(hex.slice(1), 16);
  const canales = [valor >> 16, (valor >> 8) & 255, valor & 255].map((c) =>
    Math.round(proporcion < 0 ? c * (1 + proporcion) : c + (255 - c) * proporcion));
  return "#" + canales.map((c) => c.toString(16).padStart(2, "0")).join("");
}

/** Silueta de línea de una presentación (sección "Un tamaño para cada ocasión"). */
function crearSilueta(forma, { relleno = "#f2e9da", trazo = "#8a6a2a" } = {}) {
  const f = FORMAS_BOTELLA[forma] || FORMAS_BOTELLA["750 ML"];
  const e = f.etiqueta;
  return `
<svg viewBox="-4 0 128 262" aria-hidden="true">
  ${f.asa ? `<path class="silueta__asa" d="${f.asa}" fill="none" stroke="${trazo}" stroke-width="3" stroke-linecap="round"/>` : ""}
  <path class="silueta__cuerpo" d="${f.cuerpo}" fill="${relleno}" stroke="${trazo}" stroke-width="2.4" stroke-linejoin="round"/>
  <rect class="silueta__tapa" x="${f.tapa.x}" y="${f.tapa.y}" width="${f.tapa.w}" height="${f.tapa.h * 0.55}" rx="2" fill="${trazo}"/>
  <rect class="silueta__etiqueta" x="${e.x + 4}" y="${e.y}" width="${e.w - 8}" height="${e.h * 0.7}" rx="2" fill="none" stroke="${trazo}" stroke-width="1.4" opacity=".55"/>
</svg>`;
}

function crearBotella({ forma, liquido, etiqueta }) {
  const f = FORMAS_BOTELLA[forma] || FORMAS_BOTELLA["750 ML"];
  const id = "botella-" + ++contadorBotellas;
  const e = f.etiqueta;
  const tamanoTexto = Math.min(15, e.w / 4.2);

  return `
<svg viewBox="0 0 120 260" role="img" aria-label="Botella de ${etiqueta}, ${forma}">
  <defs>
    <linearGradient id="${id}-vidrio" x1="0" x2="1">
      <stop offset="0" stop-color="${ajustarColor(liquido, -0.45)}"/>
      <stop offset="0.3" stop-color="${liquido}"/>
      <stop offset="0.62" stop-color="${ajustarColor(liquido, 0.12)}"/>
      <stop offset="1" stop-color="${ajustarColor(liquido, -0.5)}"/>
    </linearGradient>
    <linearGradient id="${id}-tapa" x1="0" x2="1">
      <stop offset="0" stop-color="#7a5a22"/>
      <stop offset="0.45" stop-color="#d7b46a"/>
      <stop offset="1" stop-color="#6e4f1c"/>
    </linearGradient>
  </defs>
  <ellipse cx="60" cy="256" rx="44" ry="3.5" fill="#000" opacity=".18"/>
  ${f.asa ? `<path d="${f.asa}" fill="none" stroke="${ajustarColor(liquido, -0.35)}" stroke-width="7" stroke-linecap="round"/>` : ""}
  <path d="${f.cuerpo}" fill="url(#${id}-vidrio)"/>
  <rect x="${f.tapa.x}" y="${f.tapa.y}" width="${f.tapa.w}" height="${f.tapa.h}" rx="2.5" fill="url(#${id}-tapa)"/>
  <rect x="${f.brillo.x}" y="${f.brillo.y}" width="5" height="${f.brillo.h}" rx="2.5" fill="#fff" opacity=".22"/>
  <rect x="${e.x}" y="${e.y}" width="${e.w}" height="${e.h}" rx="3" fill="#f7efe2"/>
  <rect x="${e.x + 3}" y="${e.y + 3}" width="${e.w - 6}" height="${e.h - 6}" rx="2" fill="none" stroke="#b8893b" stroke-width=".8"/>
  <text x="60" y="${e.y + e.h * 0.34}" text-anchor="middle" font-family="Manrope, sans-serif" font-size="5.2" font-weight="700" letter-spacing="1.4" fill="#6d1f3a">D'TULIA</text>
  <text x="60" y="${e.y + e.h * 0.66}" text-anchor="middle" font-family="Fraunces, serif" font-style="italic" font-size="${tamanoTexto}" fill="#3d0f23">${etiqueta}</text>
  <text x="60" y="${e.y + e.h * 0.86}" text-anchor="middle" font-family="Manrope, sans-serif" font-size="4.6" letter-spacing=".8" fill="#6c6266">${forma}</text>
</svg>`;
}
