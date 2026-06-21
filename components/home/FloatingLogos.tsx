"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const BRANDS = [
  { src: "/logos/norm-lutron.png",   alt: "Lutron",    w: 536,  h: 80,  cls: "h-5" },
  { src: "/logos/norm-sonos.png",    alt: "Sonos",     w: 510,  h: 102, cls: "h-5" },
  { src: "/logos/norm-control4.png", alt: "Control4",  w: 288,  h: 81,  cls: "h-7" },
  { src: "/logos/norm-ubiquiti.png", alt: "Ubiquiti",  w: 751,  h: 230, cls: "h-7" },
  { src: "/logos/norm-josh.png",     alt: "Josh.ai",   w: 2000, h: 680, cls: "h-6" },
  { src: "/logos/norm-crestron.png", alt: "Crestron",  w: 447,  h: 52,  cls: "h-4" },
  { src: "/logos/norm-ovrc.png",     alt: "OvrC",      w: 501,  h: 161, cls: "h-7" },
  { src: "/logos/norm-alarm.png",    alt: "Alarm.com", w: 306,  h: 182, cls: "h-10" },
];

function LogoItem({
  b,
  decorative = false,
}: {
  b: (typeof BRANDS)[number];
  decorative?: boolean;
}) {
  return (
    <li
      className="flex shrink-0 items-center"
      aria-hidden={decorative || undefined}
    >
      <div className="px-7 sm:px-10">
        <Image
          src={b.src}
          alt={decorative ? "" : b.alt}
          width={b.w}
          height={b.h}
          className={`${b.cls} w-auto select-none brightness-0 invert opacity-45`}
          draggable={false}
        />
      </div>
      <span className="h-3 w-px shrink-0 bg-white/15" />
    </li>
  );
}

export function FloatingLogos() {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(false);

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

  // Left/right soft dissolve so logos fade into nothing rather than hard-clipping
  const edgeMask =
    "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)";

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30">
      <AnimatePresence>
        {shown && (
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="logo-strip pointer-events-auto relative overflow-hidden"
          >
            {/* Ink wash — transparent at top, deep at bottom. Sits behind
                the logos so whatever is on-screen bleeds through above. */}
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, transparent 0%, rgba(4,7,20,0.70) 38%, rgba(4,7,20,0.95) 100%)",
              }}
            />

            <div className="relative pb-5 pt-9 sm:pb-7 sm:pt-12">
              {/* Eyebrow label */}
              <div className="mb-3.5 flex items-center justify-center gap-3">
                <span className="h-px w-5 bg-white/15" />
                <p className="font-sans text-[9px] uppercase tracking-eyebrow text-white/30">
                  The systems we build around
                </p>
                <span className="h-px w-5 bg-white/15" />
              </div>

              {/* Logo track */}
              <div
                className="overflow-hidden"
                style={{ WebkitMaskImage: edgeMask, maskImage: edgeMask }}
              >
                {reduce ? (
                  // Reduced motion: static scrollable row
                  <ul className="flex w-full items-center justify-center gap-10 overflow-x-auto px-10 pb-1">
                    {BRANDS.map((b) => (
                      <li key={b.alt} className="flex shrink-0 items-center">
                        <Image
                          src={b.src}
                          alt={b.alt}
                          width={b.w}
                          height={b.h}
                          className={`${b.cls} w-auto select-none brightness-0 invert opacity-50`}
                          draggable={false}
                        />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul className="logo-marquee-track flex w-max items-center will-change-transform">
                    {BRANDS.map((b) => (
                      <LogoItem key={`a-${b.alt}`} b={b} />
                    ))}
                    {BRANDS.map((b) => (
                      <LogoItem key={`b-${b.alt}`} b={b} decorative />
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
