"use client";

import Image from "next/image";
import { useReducedMotion } from "framer-motion";

type Brand = { src: string; alt: string; w: number; h: number; cls: string };

// Full-color marks, each height-tuned so the set reads as one consistent
// weight despite wildly different source aspect ratios (a hex badge like
// Alarm.com needs far more height than a flat wordmark like Crestron to
// register as the same size at a glance).
const BRANDS: Brand[] = [
  { src: "/logos/norm-lutron.webp", alt: "Lutron", w: 400, h: 60, cls: "h-7" },
  { src: "/logos/norm-sonos.webp", alt: "Sonos", w: 400, h: 80, cls: "h-7" },
  { src: "/logos/norm-control4.webp", alt: "Control4", w: 400, h: 112, cls: "h-8" },
  { src: "/logos/norm-ubiquiti.webp", alt: "Ubiquiti", w: 400, h: 123, cls: "h-8" },
  { src: "/logos/norm-josh.webp", alt: "Josh.ai", w: 400, h: 136, cls: "h-7" },
  { src: "/logos/norm-alarm.webp", alt: "Alarm.com", w: 370, h: 220, cls: "h-10" },
  { src: "/logos/norm-crestron.webp", alt: "Crestron", w: 400, h: 47, cls: "h-6" },
  { src: "/logos/norm-ovrc.webp", alt: "OvrC", w: 400, h: 129, cls: "h-8" },
  { src: "/logos/norm-silent-knight.webp", alt: "Silent Knight", w: 400, h: 156, cls: "h-9" },
  { src: "/logos/norm-hartmann-forbes.webp", alt: "Hartmann & Forbes", w: 400, h: 116, cls: "h-8" },
  { src: "/logos/norm-magnatrack.webp", alt: "MagnaTrack by Progressive Screens", w: 400, h: 77, cls: "h-7" },
  { src: "/logos/norm-alibi.webp", alt: "Alibi Security", w: 400, h: 99, cls: "h-8" },
  { src: "/logos/norm-napco.webp", alt: "Napco Security Technologies", w: 400, h: 66, cls: "h-8" },
  { src: "/logos/norm-integra.webp", alt: "Integra", w: 400, h: 68, cls: "h-7" },
  { src: "/logos/norm-bo.webp", alt: "Bang & Olufsen", w: 400, h: 68, cls: "h-7" },
  { src: "/logos/norm-dsc.webp", alt: "DSC", w: 400, h: 82, cls: "h-7" },
  { src: "/logos/KEF-logo.webp", alt: "KEF", w: 400, h: 128, cls: "h-7" },
  // 8:1 wordmark — same treatment as Crestron, the other very wide flat mark.
  { src: "/logos/Sonance-Logo.webp", alt: "Sonance", w: 400, h: 50, cls: "h-6" },
  { src: "/logos/ELK-Products-Logo.webp", alt: "ELK Products", w: 400, h: 183, cls: "h-8" },
  { src: "/logos/Stewart-Logo.webp", alt: "Stewart", w: 400, h: 95, cls: "h-8" },
  
];

// Shared hover treatment — full color throughout, hovering just brings each
// mark up to full opacity so the row still feels calm at rest.
const MARK_FILTER =
  "opacity-70 transition-opacity duration-300 ease-expo group-hover:opacity-100";

function BrandMark({ b, decorative = false }: { b: Brand; decorative?: boolean }) {
  return (
    <li
      className="group flex h-24 shrink-0 items-center px-8 md:px-10"
      aria-hidden={decorative || undefined}
    >
      <Image
        src={b.src}
        alt={decorative ? "" : b.alt}
        width={b.w}
        height={b.h}
        draggable={false}
        className={`${b.cls} w-auto select-none ${MARK_FILTER}`}
      />
    </li>
  );
}

/**
 * Full-bleed, continuously drifting row of the manufacturer platforms every
 * capability in the catalog below is actually built on. Sits flush against
 * the bottom of IntegrateCreed (no section padding wraps it — it's a direct,
 * unpadded sibling of that section's content), so the hard cut from dark to
 * this white plate IS the divider between the two homepage sections; no
 * heading, no gap, just the brand proof holding the seam.
 *
 * Reuses the site's established seamless-loop marquee mechanics (see
 * FloatingLogos / .logo-marquee-track in globals.css): doubled list, slides
 * exactly one group width, pauses on hover, and holds still under
 * prefers-reduced-motion (falls back to a static wrapped row). Kept as one
 * compact ribbon — tight vertical padding, no per-mark dividers, whitespace
 * alone separates one mark from the next.
 */
export function PartnerMarquee() {
  const reduce = useReducedMotion();

  // Left/right dissolve so the row fades into the plate rather than
  // hard-clipping at the (full-bleed) edges.
  const edgeMask =
    "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)";

  return (
    <div className="relative bg-white pb-7 pt-5 md:pb-8 md:pt-6">
      <p className="mb-3 text-center font-sans text-[0.6875rem] uppercase tracking-eyebrow text-navy/40 md:mb-4">
        The brands we work with
      </p>

      <div
        className="overflow-hidden"
        style={{ WebkitMaskImage: edgeMask, maskImage: edgeMask }}
      >
        {reduce ? (
          <ul className="flex w-full flex-wrap items-center justify-center gap-x-2 gap-y-3 px-10">
            {BRANDS.map((b) => (
              <li key={b.alt} className="group flex h-20 shrink-0 items-center px-6">
                <Image
                  src={b.src}
                  alt={b.alt}
                  width={b.w}
                  height={b.h}
                  className={`${b.cls} w-auto select-none ${MARK_FILTER}`}
                />
              </li>
            ))}
          </ul>
        ) : (
          <ul className="logo-marquee-track flex w-max items-center will-change-transform">
            {BRANDS.map((b) => (
              <BrandMark key={`a-${b.alt}`} b={b} />
            ))}
            {BRANDS.map((b) => (
              <BrandMark key={`b-${b.alt}`} b={b} decorative />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
