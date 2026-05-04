import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = resolve(root, "public");

function loadEnvFile(filename) {
  const envPath = resolve(root, filename);

  if (!existsSync(envPath)) return;

  readFileSync(envPath, "utf8")
    .split(/\r?\n/)
    .forEach((line) => {
      const trimmed = line.trim();

      if (!trimmed || trimmed.startsWith("#")) return;

      const separatorIndex = trimmed.indexOf("=");
      if (separatorIndex === -1) return;

      const key = trimmed.slice(0, separatorIndex).trim();
      const value = trimmed
        .slice(separatorIndex + 1)
        .trim()
        .replace(/^["']|["']$/g, "");

      process.env[key] ??= value;
    });
}

loadEnvFile(".env");
loadEnvFile(".env.local");

const { siteConfig } = await import("../src/siteConfig.js");

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
