"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/motion";

type Path = {
  href: string;
  n: string;
  eyebrow: string;
  title: string;
  line: string;
  image: string;
  alt: string;
  priority?: boolean;
};

// Mirrors the three paths on /smart-security so the homepage CTA and that page
// stay in lockstep — these are the cards we want visitors to fall into.
const PATHS: Path[] = [
  {
    href: "/smart-home",
    n: "01",
    eyebrow: "For your home",
    title: "Smart Home",
    line: "Security, cameras, locks, and life-safety woven into the property you live in.",
    image: "/images/smarthome.webp",
    alt: "A modern waterfront Central Florida estate at dusk",
    priority: true,
  },
  {
    href: "/smart-business",
    n: "02",
    eyebrow: "For your business",
    title: "Smart Business",
    line: "Access control, surveillance, and monitoring built for how your business runs.",
    image: "/images/commercial-smart.webp",
    alt: "A modern Central Florida commercial building",
  },
  {
    href: "/smart-marine",
    n: "03",
    eyebrow: "For the water",
    title: "Smart Marine",
    line: "Automation, security, and connectivity engineered for life aboard.",
    image: "/images/boat.avif",
    alt: "A yacht moored at a Central Florida waterfront",
  },
];

export function SmartSecurityShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  // Pre-hydration / reduced motion → plain stacked cards (no sticky overlap),
  // so the section is always legible and never grabs the scroll.
  const [reduce, setReduce] = useState(true);

  useEffect(() => {
    setReduce(prefersReducedMotion());
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-card]");

      cards.forEach((card, i) => {
        // The last card is never covered, so it doesn't recede.
        if (i === cards.length - 1) return;
        const inner = card.querySelector<HTMLElement>("[data-card-inner]");
        const dim = card.querySelector<HTMLElement>("[data-card-dim]");

        // As the next card rises over this one, ease it back and shade it a
        // touch — just enough to read as a real stacked deck. Scrubbed to the
        // scroll, but gentle (0.96 / 0.35) so it never feels heavy.
        gsap
          .timeline({
            scrollTrigger: {
              trigger: card,
              start: "top top+=80",
              end: "+=70%",
              scrub: true,
            },
          })
          .to(inner, { scale: 0.96, ease: "none" }, 0)
          .to(dim, { opacity: 0.35, ease: "none" }, 0);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="smart-security" className="bg-white">
      <div className="mx-auto max-w-[1180px] px-5 py-20 sm:px-8 md:py-28">
        {PATHS.map((p, i) => (
          <Link
            key={p.href}
            href={p.href}
            data-card
            style={
              reduce
                ? undefined
                : { top: `calc(11vh + ${i * 1.25}rem)` }
            }
            className={
              (reduce ? "relative h-[60vh] " : "sticky h-[68vh] ") +
              "group mb-7 flex w-full flex-col justify-end overflow-hidden rounded-3xl shadow-[0_24px_60px_rgba(10,26,82,0.18)] ring-1 ring-navy/10 last:mb-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/60"
            }
          >
            {/* Inner wrapper recedes (scales back) as the next card covers it. */}
            <div data-card-inner className="absolute inset-0 origin-center">
              <Image
                src={p.image}
                alt={p.alt}
                fill
                sizes="(max-width: 1180px) 100vw, 1180px"
                priority={p.priority}
                className="object-cover transition-transform duration-[1.4s] ease-expo group-hover:scale-[1.05]"
              />
              {/* Color grade */}
              <div aria-hidden="true" className="absolute inset-0 bg-navy-deep/15" />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-navy-deep/85 via-navy-deep/20 to-transparent"
              />
            </div>

            {/* Recede-dim — fades in as this card slips beneath the next. */}
            <div
              data-card-dim
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-navy-deep opacity-0"
            />

            {/* Index watermark */}
            <span
              aria-hidden="true"
              className="absolute right-7 top-6 z-10 font-display text-[2rem] font-light text-white/40 transition-colors duration-700 group-hover:text-white/75 md:text-[2.6rem]"
            >
              {p.n}
            </span>

            {/* Content */}
            <div className="relative z-10 p-8 md:p-12">
              <span className="font-sans text-[11px] uppercase tracking-eyebrow text-white/70">
                {p.eyebrow}
              </span>
              <h3 className="mt-3 font-display text-[clamp(2.2rem,4.4vw,3.6rem)] font-light leading-none tracking-tight text-white">
                {p.title}
              </h3>
              <p className="mt-5 max-w-md font-sans text-[15px] leading-relaxed text-white/80">
                {p.line}
              </p>
              <span className="mt-7 inline-flex items-center gap-3 font-sans text-[12px] uppercase tracking-wide2 text-white">
                Explore
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/40 transition-all duration-500 ease-expo group-hover:border-white group-hover:bg-white">
                  <ArrowRight
                    strokeWidth={1.5}
                    className="h-4 w-4 text-white transition-colors duration-500 group-hover:text-navy-deep"
                  />
                </span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
