const env =
  typeof import.meta !== "undefined" && import.meta.env
    ? import.meta.env
    : globalThis.process?.env || {};

function envValue(key, fallback) {
  return env[key] || fallback;
}

function envBoolean(key, fallback) {
  const value = env[key];

  if (value === undefined) return fallback;
  return value === "true";
}

export const siteConfig = {
  brand: {
    name: envValue("VITE_BRAND_NAME", "Pulse Studio"),
    homeUrl: envValue("VITE_BRAND_HOME_URL", "/")
  },
  seo: {
    siteUrl: envValue("VITE_SITE_URL", "https://example.com"),
    titleSuffix: envValue("VITE_TITLE_SUFFIX", "Pulse Studio"),
    sitemapPath: "/sitemap.xml",
    pages: [
      { path: "/", priority: "1.0" },
      { path: "/about.html", priority: "0.8" },
      { path: "/work.html", priority: "0.8" },
      { path: "/pricing.html", priority: "0.7", key: "pricing" },
      { path: "/use-template.html", priority: "0.8", key: "template" },
      { path: "/contact.html", priority: "0.7", key: "contact" }
    ]
  },
  theme: {
    accent: envValue("VITE_THEME_ACCENT", "#7dd3fc"),
    accentStrong: envValue("VITE_THEME_ACCENT_STRONG", "#f97316"),
    green: envValue("VITE_THEME_GREEN", "#a3e635")
  },
  navigation: [
    { label: "Work", href: "/work.html", key: "work" },
    { label: "About", href: "/about.html", key: "about" },
    { label: "Pricing", href: "/pricing.html", key: "pricing" },
    { label: "Template", href: "/use-template.html", key: "template" },
    { label: "Contact", href: "/contact.html", key: "contact" }
  ],
  pages: {
    pricing: envBoolean("VITE_ENABLE_PRICING_PAGE", true),
    template: envBoolean("VITE_ENABLE_TEMPLATE_PAGE", true),
    contact: envBoolean("VITE_ENABLE_CONTACT_PAGE", true)
  },
  templatePage: {
    enabled: envBoolean("VITE_ENABLE_TEMPLATE_PAGE", true),
    disabledRedirect: envValue("VITE_TEMPLATE_DISABLED_REDIRECT", "/"),
    githubUrl: envValue(
      "VITE_TEMPLATE_GITHUB_URL",
      "https://github.com/CookieShualon/animated-landing-page"
    ),
    cloneUrl: envValue(
      "VITE_TEMPLATE_CLONE_URL",
      "https://github.com/CookieShualon/animated-landing-page.git"
    )
  },
  contact: {
    email: envValue("VITE_CONTACT_EMAIL", "hello@example.com"),
    emailPlaceholder: envValue("VITE_CONTACT_EMAIL_PLACEHOLDER", "you@example.com")
  },
  logos: ["Northline", "Arc Labs", "Vexa", "SignalHaus", "Monarch"],
  stats: [
    { value: 12, label: "Reusable helpers" },
    { value: 60, label: "FPS-friendly motion" },
    { value: 100, label: "Responsive layout" }
  ],
  animation: {
    cinematicScroll: envBoolean("VITE_ENABLE_CINEMATIC_SCROLL", true),
    counters: envBoolean("VITE_ENABLE_COUNTERS", true),
    visualAccents: envBoolean("VITE_ENABLE_VISUAL_ACCENTS", true)
  }
};
