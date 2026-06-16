"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/* The brands we build around, shown full-color so every logo reads exactly as
   the manufacturer intends. Each mark was normalized to a tightly-cropped,
   transparent PNG (see /public/logos/norm-*.png), so the only thing varying is
   the optical height we give it inside the chip — wide wordmarks sit short, the
   stacked Alarm.com lockup sits taller — which keeps them visually level.
   Intrinsic w/h match each source file so nothing is stretched. */
const BRANDS = [
  { src: "/logos/norm-lutron.png", alt: "Lutron", w: 536, h: 80, cls: "h-5" },
  { src: "/logos/norm-sonos.png", alt: "Sonos", w: 510, h: 102, cls: "h-5" },
  { src: "/logos/norm-control4.png", alt: "Control4", w: 288, h: 81, cls: "h-7" },
  { src: "/logos/norm-ubiquiti.png", alt: "Ubiquiti", w: 751, h: 230, cls: "h-7" },
  { src: "/logos/norm-josh.png", alt: "Josh.ai", w: 2000, h: 680, cls: "h-6" },
  { src: "/logos/norm-crestron.png", alt: "Crestron", w: 447, h: 52, cls: "h-4" },
  { src: "/logos/norm-ovrc.png", alt: "OvrC", w: 501, h: 161, cls: "h-7" },
  { src: "/logos/norm-alarm.png", alt: "Alarm.com", w: 306, h: 182, cls: "h-10" },
];

function Chip({
  b,
  decorative = false,
}: {
  b: (typeof BRANDS)[number];
  decorative?: boolean;
}) {
  return (
    <li className="flex shrink-0 items-center" aria-hidden={decorative || undefined}>
      <div className="flex h-16 items-center rounded-2xl border border-navy/10 bg-white px-6 shadow-[0_8px_24px_-12px_rgba(10,26,82,0.35)]">
        <Image
          src={b.src}
          alt={decorative ? "" : b.alt}
          width={b.w}
          height={b.h}
          className={`${b.cls} w-auto select-none`}
          draggable={false}
        />
      </div>
    </li>
  );
}

export function FloatingLogos() {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(false);

  // Reveal once the hero has been scrolled through (its runway is 300dvh and
  // the clip plays out around 2 viewport heights in, as the About panel takes
  // over), and tuck it back away as the dark footer approaches so the light
  // dock never collides with it.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      const docH = document.documentElement.scrollHeight;
      const pastHero = y > vh * 1.9;
      const nearFooter = docH - (y + vh) < 580;
      setShown(pastHero && !nearFooter);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Soft fade at both edges so chips dissolve into the page rather than getting
  // hard-clipped by the dock's rounded frame.
  const edgeFade =
    "linear-gradient(to right, transparent, #000 7%, #000 93%, transparent)";

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 flex justify-center px-3 pb-4 sm:pb-6">
      <AnimatePresence>
        {shown && (
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="logo-dock-float pointer-events-auto w-full max-w-[1180px]"
          >
            <div className="logo-dock overflow-hidden rounded-[28px] border border-navy/10 bg-white/70 px-3 py-3 shadow-[0_24px_60px_-24px_rgba(10,26,82,0.45)] backdrop-blur-xl">
              <div className="mb-2.5 flex items-center justify-center gap-3 px-1">
                <span className="h-px w-6 bg-navy/15" />
                <p className="text-center font-sans text-[10px] uppercase tracking-eyebrow text-navy-logo/70">
                  The systems we build around
                </p>
                <span className="h-px w-6 bg-navy/15" />
              </div>

              <div
                className="overflow-hidden"
                style={{
                  WebkitMaskImage: edgeFade,
                  maskImage: edgeFade,
                }}
              >
                {reduce ? (
                  // Reduced motion / no animation: a single, horizontally
                  // scrollable row that still shows every logo in full color.
                  <ul className="flex w-full items-center gap-4 overflow-x-auto pb-1">
                    {BRANDS.map((b) => (
                      <Chip key={b.alt} b={b} />
                    ))}
                  </ul>
                ) : (
                  <ul className="logo-marquee-track flex w-max items-center gap-4 will-change-transform">
                    {/* Two identical groups -> seamless -50% loop */}
                    {BRANDS.map((b) => (
                      <Chip key={`a-${b.alt}`} b={b} />
                    ))}
                    {BRANDS.map((b) => (
                      <Chip key={`b-${b.alt}`} b={b} decorative />
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
