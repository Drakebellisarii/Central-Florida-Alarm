"use client";

import Image from "next/image";
import { useReducedMotion } from "framer-motion";

type Brand = { src: string; alt: string; w: number; h: number; cls: string };

// Full-color marks, each height-tuned so the set reads as one consistent
// weight despite wildly different source aspect ratios (a hex badge like
// Alarm.com needs far more height than a flat wordmark like Crestron to
// register as the same size at a glance).
const BRANDS: Brand[] = [
  { src: "/logos/norm-lutron.png", alt: "Lutron", w: 536, h: 80, cls: "h-7" },
  { src: "/logos/norm-sonos.png", alt: "Sonos", w: 510, h: 102, cls: "h-7" },
  { src: "/logos/norm-control4.png", alt: "Control4", w: 288, h: 81, cls: "h-8" },
  { src: "/logos/norm-ubiquiti.png", alt: "Ubiquiti", w: 751, h: 230, cls: "h-8" },
  { src: "/logos/norm-josh.png", alt: "Josh.ai", w: 2000, h: 680, cls: "h-7" },
  { src: "/logos/norm-alarm.png", alt: "Alarm.com", w: 306, h: 182, cls: "h-11" },
  { src: "/logos/norm-crestron.png", alt: "Crestron", w: 447, h: 52, cls: "h-6" },
  { src: "/logos/norm-ovrc.png", alt: "OvrC", w: 501, h: 161, cls: "h-8" },
  { src: "/logos/norm-hartmann-forbes.png", alt: "Hartmann & Forbes", w: 1896, h: 549, cls: "h-8" },
  { src: "/logos/norm-magnatrack.png", alt: "MagnaTrack by Progressive Screens", w: 1498, h: 289, cls: "h-7" },
];

function BrandMark({ b, decorative = false }: { b: Brand; decorative?: boolean }) {
  return (
    <li className="flex shrink-0 items-center" aria-hidden={decorative || undefined}>
      <div className="flex h-32 items-center px-10">
        <Image
          src={b.src}
          alt={decorative ? "" : b.alt}
          width={b.w}
          height={b.h}
          draggable={false}
          className={`${b.cls} w-auto select-none opacity-70 transition-all duration-300 ease-expo hover:-translate-y-0.5 hover:scale-110 hover:opacity-100`}
        />
      </div>
      <span aria-hidden className="h-14 w-px shrink-0 bg-navy/10" />
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
 * prefers-reduced-motion (falls back to a static wrapped row).
 */
export function PartnerMarquee() {
  const reduce = useReducedMotion();

  // Left/right dissolve so the row fades into the plate rather than
  // hard-clipping at the (full-bleed) edges.
  const edgeMask =
    "linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)";

  return (
    <div className="logo-strip relative bg-white pb-8 pt-6 md:pb-10 md:pt-8">
      <p className="mb-5 text-center font-sans text-[0.6875rem] uppercase tracking-eyebrow text-navy/40 md:mb-6">
        The brands we work with
      </p>

      <div
        className="overflow-hidden"
        style={{ WebkitMaskImage: edgeMask, maskImage: edgeMask }}
      >
        {reduce ? (
          <ul className="flex w-full flex-wrap items-center justify-center gap-x-4 gap-y-6 px-10">
            {BRANDS.map((b) => (
              <li key={b.alt} className="flex h-20 shrink-0 items-center px-8">
                <Image
                  src={b.src}
                  alt={b.alt}
                  width={b.w}
                  height={b.h}
                  className={`${b.cls} w-auto select-none opacity-80`}
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
