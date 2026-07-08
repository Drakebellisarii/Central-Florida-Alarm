"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const BRANDS = [
  {
    src: "/logos/logo-lutron.png",
    alt: "Lutron",
    category: "Lighting Control",
    w: 545,
    h: 270,
    cls: "h-7 sm:h-8",
  },
  {
    src: "/logos/Sonos-logo.png",
    alt: "Sonos",
    category: "Audio",
    w: 712,
    h: 301,
    cls: "h-5 sm:h-6",
  },
  {
    src: "/logos/josh-logo.png",
    alt: "Josh.ai",
    category: "Automation",
    w: 2000,
    h: 680,
    cls: "h-6 sm:h-7",
  },
  {
    src: "/logos/Alarm_logo.png",
    alt: "Alarm.com",
    category: "Security",
    w: 316,
    h: 192,
    cls: "h-10 sm:h-11",
  },
];

const pad = (n: number) => String(n).padStart(2, "0");

export function BrandStrip() {
  const reduce = useReducedMotion();

  return (
    <section className="border-y border-navy/10 bg-white">
      <div className="mx-auto max-w-[87.5rem] px-5 py-16 sm:px-8 md:px-10 md:py-20">

        <motion.p
          initial={reduce ? { opacity: 1 } : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="font-sans text-[0.6875rem] uppercase tracking-eyebrow text-navy/35"
        >
          The systems we build around
        </motion.p>

        <motion.div
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
          className="mt-10 grid grid-cols-2 border-l border-t border-navy/10 md:grid-cols-4"
        >
          {BRANDS.map((b, i) => (
            <div
              key={b.alt}
              className="group flex flex-col justify-between gap-10 border-b border-r border-navy/10 px-8 py-10 transition-colors duration-500 hover:bg-navy/[0.025] md:px-10 md:py-12"
            >
              <span className="font-display text-[1.6rem] font-light leading-none text-navy-logo/20 transition-colors duration-500 group-hover:text-navy-logo/35">
                {pad(i + 1)}
              </span>

              <div className="flex flex-col gap-4">
                <Image
                  src={b.src}
                  alt={b.alt}
                  width={b.w}
                  height={b.h}
                  className={`${b.cls} w-auto brightness-0 opacity-40 transition-opacity duration-500 group-hover:opacity-75`}
                />
                <p className="font-sans text-[0.625rem] uppercase tracking-eyebrow text-navy/30">
                  {b.category}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
