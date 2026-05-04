# Animated Landing Page

A modern multi-page landing page template built with Vite and GSAP. It includes smooth entrance animations, scroll-triggered sections, a cinematic pinned scroll sequence, SEO file generation, and a simple environment-based configuration system for deployment platforms like Vercel.

## Features

- GSAP-powered fade, scale, stagger, counter, and cinematic scroll animations
- Multi-page HTML setup: Home, About, Work, Pricing, Contact, and Template
- Central template configuration in `src/siteConfig.js`
- Vercel-friendly `.env` configuration via `VITE_*` variables
- Generated `robots.txt` and `sitemap.xml`
- Responsive visual sections, pricing cards, FAQ, testimonials, and contact form

## Getting Started

```bash
git clone https://github.com/CookieShualon/animated-landing-page.git
cd animated-landing-page
npm install
npm run dev
```

Open the local URL Vite prints in your terminal.

## Configuration

Copy the example environment file:

```bash
cp .env.example .env
```

Important options:

```bash
VITE_SITE_URL=https://your-domain.com
VITE_BRAND_NAME=Pulse Studio
VITE_TEMPLATE_GITHUB_URL=https://github.com/CookieShualon/animated-landing-page
VITE_TEMPLATE_CLONE_URL=https://github.com/CookieShualon/animated-landing-page.git
VITE_ENABLE_TEMPLATE_PAGE=true
VITE_ENABLE_CINEMATIC_SCROLL=true
```

On Vercel, add the same variables in Project Settings, then redeploy.

## SEO Files

`npm run build` automatically runs:

```bash
npm run generate:seo
```

That generates:

- `public/robots.txt`
- `public/sitemap.xml`

Both use `VITE_SITE_URL` from your environment.

## Scripts

```bash
npm run dev
npm run generate:seo
npm run build
npm run preview
```

## File Structure

```text
.
├── index.html
├── about.html
├── work.html
├── pricing.html
├── contact.html
├── use-template.html
├── scripts/generate-seo.js
├── src/
│   ├── animations.js
│   ├── main.js
│   ├── siteConfig.js
│   └── styles.css
├── public/
│   ├── robots.txt
│   └── sitemap.xml
└── vite.config.js
```

## License

MIT
