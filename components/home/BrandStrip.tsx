"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/* The product lines we design around, shown as a calm in-page band. Logos
   arrive in every brand color and weight, so they are flattened to a single
   neutral tone (brightness-0 + opacity) to sit together cleanly, and lift to
   near-full strength on hover. Intrinsic w/h match each source file so nothing
   is stretched; the Alarm mark is taller because it stacks an icon over its
   wordmark, so it carries a larger height to stay optically level. */
const BRANDS = [
  { src: "/logos/logo-lutron.png", alt: "Lutron", w: 545, h: 270, cls: "h-6 sm:h-7" },
  { src: "/logos/Sonos-logo.png", alt: "Sonos", w: 712, h: 301, cls: "h-5 sm:h-6" },
  { src: "/logos/josh-logo.png", alt: "Josh.ai", w: 2000, h: 680, cls: "h-7 sm:h-8" },
  { src: "/logos/Alarm_logo.png", alt: "Alarm.com", w: 316, h: 192, cls: "h-11 sm:h-12" },
];

export function BrandStrip() {
  const reduce = useReducedMotion();

  return (
    <section className="border-y border-navy/10 bg-white">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 md:px-10 md:py-24">
        <motion.div
          initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <p className="text-center font-sans text-[11px] uppercase tracking-eyebrow text-navy-logo">
            The systems we build around
          </p>

          <ul className="mt-12 flex flex-wrap items-center justify-center gap-x-14 gap-y-10 sm:gap-x-20 md:mt-14">
            {BRANDS.map((b) => (
              <li key={b.alt} className="flex items-center">
                <Image
                  src={b.src}
                  alt={b.alt}
                  width={b.w}
                  height={b.h}
                  className={`${b.cls} w-auto brightness-0 opacity-40 transition-opacity duration-500 hover:opacity-80`}
                />
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
