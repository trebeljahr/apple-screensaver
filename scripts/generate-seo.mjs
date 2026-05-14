import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const seo = {
  siteUrl: "https://trebeljahr.github.io/apple-screensaver",
  outputDir: path.resolve(__dirname, ".."),
  routes: [{ path: "/", changefreq: "monthly", priority: "1.0" }],
  lastmod: (process.env.SITEMAP_LASTMOD || new Date().toISOString()).slice(0, 10),
  title: "Procedural Screensaver",
  subtitle: "Generative p5.js Animation",
  description:
    "Run a full-screen generative p5.js screensaver with drifting gradient strokes, noise motion, and relaxing abstract color trails.",
  imageAlt: "Procedural p5.js screensaver preview",
};

const escapeXml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const joinUrl = (base, urlPath) => {
  const cleanBase = base.replace(/\/$/, "");
  const cleanPath = urlPath === "/" ? "/" : `/${urlPath.replace(/^\/+/, "")}`;
  return `${cleanBase}${cleanPath}`;
};

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${seo.routes
  .map(
    (route) => `  <url>
    <loc>${escapeXml(joinUrl(seo.siteUrl, route.path))}</loc>
    <lastmod>${seo.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${joinUrl(seo.siteUrl, "/sitemap.xml")}
`;

const ogImage = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-labelledby="title desc">
  <title id="title">${escapeXml(seo.title)} - ${escapeXml(seo.subtitle)}</title>
  <desc id="desc">${escapeXml(seo.imageAlt)}</desc>
  <defs>
    <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#020617" />
      <stop offset="0.5" stop-color="#1e1b4b" />
      <stop offset="1" stop-color="#0f172a" />
    </linearGradient>
    <linearGradient id="stroke1" x1="0" x2="1">
      <stop offset="0" stop-color="#38bdf8" />
      <stop offset="0.5" stop-color="#a78bfa" />
      <stop offset="1" stop-color="#f472b6" />
    </linearGradient>
    <linearGradient id="stroke2" x1="0" x2="1">
      <stop offset="0" stop-color="#facc15" />
      <stop offset="0.5" stop-color="#22c55e" />
      <stop offset="1" stop-color="#06b6d4" />
    </linearGradient>
    <filter id="soft" x="-20%" y="-50%" width="140%" height="200%">
      <feGaussianBlur stdDeviation="5" />
    </filter>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)" />
  <g opacity="0.26" filter="url(#soft)">
    <path d="M-80 150 C90 36 210 260 374 142 S660 62 790 214 1015 400 1280 210" stroke="url(#stroke1)" stroke-width="24" fill="none" />
    <path d="M-80 395 C120 260 246 500 430 374 S740 256 918 438 1090 534 1280 424" stroke="url(#stroke2)" stroke-width="30" fill="none" />
  </g>
  <g fill="none" stroke-linecap="round">
    <path d="M-40 178 C142 58 228 268 390 152 S660 84 792 226 1010 386 1240 218" stroke="url(#stroke1)" stroke-width="10" />
    <path d="M-30 260 C132 150 288 320 444 230 S690 150 850 300 1010 430 1230 310" stroke="url(#stroke2)" stroke-width="8" opacity="0.88" />
    <path d="M-40 420 C126 284 266 500 440 390 S710 286 896 458 1050 540 1240 430" stroke="url(#stroke1)" stroke-width="12" opacity="0.92" />
    <path d="M40 520 C190 420 310 570 470 490 S760 410 930 532 1070 574 1160 520" stroke="url(#stroke2)" stroke-width="7" opacity="0.72" />
  </g>
  <rect x="72" y="92" width="620" height="446" rx="36" fill="#020617" opacity="0.58" />
  <text x="112" y="238" fill="#f8fafc" font-family="Inter, Arial, sans-serif" font-size="76" font-weight="900">Procedural</text>
  <text x="112" y="326" fill="#f8fafc" font-family="Inter, Arial, sans-serif" font-size="76" font-weight="900">Screensaver</text>
  <text x="116" y="394" fill="#c4b5fd" font-family="Inter, Arial, sans-serif" font-size="36" font-weight="800">Generative p5.js Animation</text>
  <text x="116" y="464" fill="#e0f2fe" font-family="Inter, Arial, sans-serif" font-size="27">Noise motion, gradient strokes,</text>
  <text x="116" y="502" fill="#e0f2fe" font-family="Inter, Arial, sans-serif" font-size="27">and full-screen color trails.</text>
</svg>
`;

await mkdir(seo.outputDir, { recursive: true });
await Promise.all([
  writeFile(path.join(seo.outputDir, "sitemap.xml"), sitemap),
  writeFile(path.join(seo.outputDir, "robots.txt"), robots),
  writeFile(path.join(seo.outputDir, "og-image.svg"), ogImage),
]);
