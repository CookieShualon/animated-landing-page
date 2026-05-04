import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { siteConfig } from "../src/siteConfig.js";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = resolve(root, "public");

function isPageEnabled(key) {
  if (!key) return true;
  if (key === "template") return siteConfig.templatePage.enabled;
  return siteConfig.pages[key] !== false;
}

function absoluteUrl(path) {
  return new URL(path, siteConfig.seo.siteUrl).href;
}

const sitemapPath = siteConfig.seo.sitemapPath || "/sitemap.xml";
const pages = siteConfig.seo.pages.filter((page) => isPageEnabled(page.key));

const robots = `User-agent: *
Allow: /

Sitemap: ${absoluteUrl(sitemapPath)}
`;

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `  <url>
    <loc>${absoluteUrl(page.path)}</loc>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

mkdirSync(publicDir, { recursive: true });
writeFileSync(resolve(publicDir, "robots.txt"), robots);
writeFileSync(resolve(publicDir, "sitemap.xml"), sitemap);
