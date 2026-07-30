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
  { src: "/logos/norm-ubiquiti.png", alt: "Ubiquiti", w: 718, h: 220, cls: "h-8" },
  { src: "/logos/norm-josh.png", alt: "Josh.ai", w: 647, h: 220, cls: "h-7" },
  { src: "/logos/norm-alarm.png", alt: "Alarm.com", w: 306, h: 182, cls: "h-10" },
  { src: "/logos/norm-crestron.png", alt: "Crestron", w: 447, h: 52, cls: "h-6" },
  { src: "/logos/norm-ovrc.png", alt: "OvrC", w: 501, h: 161, cls: "h-8" },
  { src: "/logos/norm-silent-knight.png", alt: "Silent Knight", w: 563, h: 220, cls: "h-9" },
  { src: "/logos/norm-hartmann-forbes.png", alt: "Hartmann & Forbes", w: 760, h: 220, cls: "h-8" },
  { src: "/logos/norm-magnatrack.png", alt: "MagnaTrack by Progressive Screens", w: 1140, h: 220, cls: "h-7" },
  { src: "/logos/norm-alibi.png", alt: "Alibi Security", w: 288, h: 71, cls: "h-8" },
  { src: "/logos/norm-napco.png", alt: "Napco Security Technologies", w: 200, h: 33, cls: "h-8" },
  { src: "/logos/norm-integra.png", alt: "Integra", w: 451, h: 77, cls: "h-7" },
  { src: "/logos/norm-bo.png", alt: "Bang & Olufsen", w: 900, h: 154, cls: "h-7" },
  { src: "/logos/norm-dsc.png", alt: "DSC", w: 623, h: 128, cls: "h-7" },
  { src: "/logos/KEF-logo.png", alt: "KEF", w: 685, h: 220, cls: "h-7" },
  { src: "/logos/ELK-Products-Logo.png", alt: "ELK Products", w: 480, h: 220, cls: "h-8" },
  { src: "/logos/Stewart-Logo.png", alt: "Stewart", w: 372, h: 88, cls: "h-8" },
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
