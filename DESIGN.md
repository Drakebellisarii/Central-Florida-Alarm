# Design

Captured from the live codebase (Tailwind config, globals.css, existing components). Next.js 14 App Router + Tailwind 3.4 + framer-motion/GSAP.

## Theme

Dual-surface site: white/paper light pages (home, smart-home, smart-business) and ink-dark pages (contact, service detail, service areas, existing clients, fix-my-stuff). Both are brand-legitimate; don't force one onto the other.

## Color

Brand navy carried from the logo (#011689). All neutrals are blue-tinted; never warm cream, never pure gray.

- `ink` #0C1016 / `ink-deep` #080B11 / `ink-raised` #121823 / `ink-line` #1B2330 — dark canvas and hairlines
- `navy` #122C82 / `navy-deep` #0A1A52 / `navy-logo` #011689 / `navy-light` #1E3FA0 — brand, headings, body text on light
- `bone` #FFFFFF / `bone-dim` #AEBAD2 — text on dark
- `paper` #F4F7FC / `paper-dim` #E7ECF6 — light surfaces
- `bronze` #1E3FA0 (soft #2A4CB0, deep #122C82) — the accent role (named bronze historically, now brand blue)
- `stone` #5C6884 — muted text on light

Strategy: Committed. Navy carries large portions of the surface; the accent is the lighter brand blue.

## Typography

- `font-hero` — Gloock (local). Hero and page h1 only.
- `font-display` — DM Serif Text (local, has italic). All other serif headings.
- `font-sans` — Plus Jakarta Sans 300–700. Body and UI.
- Eyebrows: uppercase, `tracking-eyebrow` (0.22em), 11–13px sans.
- `tracking-wide2` (0.16em) for secondary uppercase labels.
- Body max width `max-w-prose2` (68ch).

## Layout

- Site frame: fixed hairline frame inset `--frame-inset` (16px mobile, 22px ≥768px) around the whole viewport, plus a film-grain overlay (`.grain`, opacity .03).
- Hairline dividers (`ink-line` on dark, `navy/10` on light) instead of boxes; sections separated by generous vertical space, not cards.
- Content containers: `max-w-6xl`/`max-w-7xl` centered with responsive horizontal padding.

## Motion

- Ease: `ease-expo` cubic-bezier(0.16,1,0.3,1) and `ease-plate` cubic-bezier(0.32,0.72,0,1).
- CSS-first reveals: `.reveal-load`/`.rd-*` staggers on load, `.reveal-scroll` and `.sh-*` scroll-driven animations (progressive enhancement via `@supports (animation-timeline: view())`). Content never gated behind JS.
- Marquees: partner-logo horizontal loop, service-area vertical columns; both pause on hover and disable under `prefers-reduced-motion`.

## Components

- `PageHero`, `Eyebrow`, `CTAButton`, `ServiceCard`, `FAQAccordion`, `CTABanner`, `Breadcrumbs`, `RelatedServices`, `ContactForm`/`ServiceRequestForm`, `Navbar` (scroll-aware via `NavSentinel`), `Footer`, `SiteFrame`, `MonitoringNumbersModal`.
- Icons: lucide-react. Imagery: Unsplash architectural photography via next/image.
