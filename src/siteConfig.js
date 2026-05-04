export const siteConfig = {
  brand: {
    name: "Pulse Studio",
    homeUrl: "/"
  },
  seo: {
    siteUrl: "https://example.com",
    titleSuffix: "Pulse Studio",
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
    accent: "#7dd3fc",
    accentStrong: "#f97316",
    green: "#a3e635"
  },
  navigation: [
    { label: "Work", href: "/work.html", key: "work" },
    { label: "About", href: "/about.html", key: "about" },
    { label: "Pricing", href: "/pricing.html", key: "pricing" },
    { label: "Template", href: "/use-template.html", key: "template" },
    { label: "Contact", href: "/contact.html", key: "contact" }
  ],
  pages: {
    pricing: true,
    template: true,
    contact: true
  },
  templatePage: {
    enabled: true,
    disabledRedirect: "/",
    downloadPath: "/downloads/pulse-studio-template.zip"
  },
  contact: {
    email: "hello@example.com",
    emailPlaceholder: "you@example.com"
  },
  logos: ["Northline", "Arc Labs", "Vexa", "SignalHaus", "Monarch"],
  stats: [
    { value: 12, label: "Reusable helpers" },
    { value: 60, label: "FPS-friendly motion" },
    { value: 100, label: "Responsive layout" }
  ],
  animation: {
    cinematicScroll: true,
    counters: true,
    visualAccents: true
  }
};
