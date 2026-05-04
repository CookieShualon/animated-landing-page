import "./styles.css";

import { siteConfig } from "./siteConfig.js";
import {
  animateCounters,
  cinematicScroll,
  fadeDown,
  fadeIn,
  loopVisualAccents,
  revealOnScroll,
  scaleIn,
  staggerOnScroll
} from "./animations.js";

function isPageEnabled(key) {
  if (key === "template") return siteConfig.templatePage.enabled;
  return siteConfig.pages[key] !== false;
}

function absoluteUrl(path) {
  return new URL(path, siteConfig.seo.siteUrl).href;
}

function initSiteConfig() {
  const root = document.documentElement;

  root.style.setProperty("--accent", siteConfig.theme.accent);
  root.style.setProperty("--accent-strong", siteConfig.theme.accentStrong);
  root.style.setProperty("--green", siteConfig.theme.green);
  root.dataset.templatePageEnabled = String(siteConfig.templatePage.enabled);

  if (siteConfig.seo.titleSuffix && document.title.includes("|")) {
    const [pageTitle] = document.title.split("|").map((part) => part.trim());
    document.title = `${pageTitle} | ${siteConfig.seo.titleSuffix}`;
  }

  document.querySelectorAll("link[rel='canonical']").forEach((link) => {
    link.href = absoluteUrl(window.location.pathname);
  });

  document.querySelectorAll(".brand").forEach((brand) => {
    const mark = brand.querySelector(".brand-mark");
    brand.textContent = "";
    if (mark) brand.append(mark);
    brand.append(` ${siteConfig.brand.name}`);
    brand.href = siteConfig.brand.homeUrl;
    brand.setAttribute("aria-label", `${siteConfig.brand.name} home`);
  });

  document.querySelectorAll(".nav-links").forEach((nav) => {
    nav.innerHTML = siteConfig.navigation
      .filter((item) => isPageEnabled(item.key))
      .map((item) => `<a href="${item.href}" data-page-nav="${item.key}">${item.label}</a>`)
      .join("");
  });

  document.querySelectorAll("[data-download-link]").forEach((link) => {
    link.href = siteConfig.templatePage.downloadPath;
  });

  document.querySelectorAll("[data-contact-email]").forEach((link) => {
    link.href = `mailto:${siteConfig.contact.email}`;
  });

  document.querySelectorAll("input[type='email']").forEach((input) => {
    input.placeholder = siteConfig.contact.emailPlaceholder;
  });

  const logoStrip = document.querySelector("[data-logo-strip]");
  if (logoStrip) {
    logoStrip.innerHTML = siteConfig.logos.map((logo) => `<span>${logo}</span>`).join("");
  }

  const statBand = document.querySelector("[data-stat-band]");
  if (statBand) {
    statBand.innerHTML = siteConfig.stats
      .map(
        (stat) => `
          <div>
            <strong data-counter="${stat.value}">0</strong>
            <span>${stat.label}</span>
          </div>
        `
      )
      .join("");
  }
}

function initTemplatePageToggle() {
  const currentPage = document.body.dataset.page;

  if (currentPage && !isPageEnabled(currentPage)) {
    const main = document.querySelector("main");

    if (!main) return;

    main.innerHTML = `
      <section class="page-hero compact template-disabled">
        <p class="eyebrow">Page disabled</p>
        <h1>This page is currently turned off.</h1>
        <p class="hero-text">
          Enable <code>${currentPage}</code> in <code>src/siteConfig.js</code>
          to publish it again.
        </p>
        <a class="button primary" href="${siteConfig.templatePage.disabledRedirect}">Back Home</a>
      </section>
    `;
  }

  if (siteConfig.templatePage.enabled) return;

  if (document.body.dataset.page !== "template") return;

  const main = document.querySelector("main");
  const canonical = document.querySelector("link[rel='canonical']");
  const robots = document.querySelector("meta[name='robots']");

  if (canonical) canonical.setAttribute("href", siteConfig.templatePage.disabledRedirect);

  if (robots) {
    robots.setAttribute("content", "noindex, nofollow");
  } else {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.append(meta);
  }

  if (!main) return;

  main.innerHTML = `
    <section class="page-hero compact template-disabled">
      <p class="eyebrow">Template page disabled</p>
      <h1>This page is currently turned off.</h1>
      <p class="hero-text">
        Set <code>templatePage.enabled</code> to <code>true</code> in
        <code>src/siteConfig.js</code> to publish it again.
      </p>
      <a class="button primary" href="${siteConfig.templatePage.disabledRedirect}">Back Home</a>
    </section>
  `;
}

function initHeroAnimations() {
  fadeDown("[data-animate='fade-down']");
  fadeIn("[data-animate='fade-up']");
  scaleIn("[data-animate='scale-in']", { delay: 0.2 });
  if (siteConfig.animation.visualAccents) loopVisualAccents();
}

function initScrollAnimations() {
  revealOnScroll("[data-scroll-section]");
  if (siteConfig.animation.cinematicScroll) cinematicScroll();

  document
    .querySelectorAll(
      ".feature-grid, .timeline, .showcase-grid, .quote-grid, .faq-list, .pricing-grid"
        + ", .file-info-grid, .config-grid"
    )
    .forEach((container) => {
      staggerOnScroll(container, container.querySelectorAll("[data-scroll-card]"));
    });

  if (siteConfig.animation.counters) animateCounters("[data-counter]");
}

function initSmoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const target = document.querySelector(anchor.getAttribute("href"));

      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

initSiteConfig();
initTemplatePageToggle();
initHeroAnimations();
initScrollAnimations();
initSmoothAnchors();
