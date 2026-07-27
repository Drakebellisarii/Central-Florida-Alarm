"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/motion";
import { MISSION_STATEMENT } from "@/lib/content";

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

// All three paths, on the same plane — kept in lockstep with /smart-security
// so the homepage cards and the destination read the same.
const PATHS: Path[] = [
  {
    href: "/smart-home",
    n: "01",
    eyebrow: "For your home",
    title: "Smart Home",
    line: "Security, cameras, locks, and life-safety woven into the property you live in.",
    image: "/images/home.webp",
    alt: "A modern Central Florida home with palm trees and lush landscaping",
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
    href: "/smart-luxury",
    n: "03",
    eyebrow: "For the finer details",
    title: "Smart Luxury",
    line: "What's possible in a fully integrated estate — theaters, wine rooms, motorized art, and more, answered plainly.",
    image: "/images/smarthome.webp",
    alt: "A modern waterfront Central Florida estate at dusk",
  },
];

export function SmartSecurityShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-ssc-intro] > *",
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: "[data-ssc-intro]", start: "top 85%" },
        }
      );

      gsap.fromTo(
        "[data-ssc-card]",
        { opacity: 0, y: 56, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.1,
          ease: "power3.out",
          stagger: 0.14,
          scrollTrigger: { trigger: "[data-ssc-grid]", start: "top 82%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="smart-security"
      className="relative min-h-[100dvh] bg-white shadow-[0_-20px_80px_rgba(0,0,0,0.25)]"
    >
      <div className="mx-auto max-w-[93.75rem] px-5 py-20 sm:px-8 md:px-11 md:py-28">

        {/* Masthead — orients the visitor the moment the hero releases them.
            Mission statement lives here now, paired with the heading,
            instead of opening the About section below. */}
        <div
          data-ssc-intro
          className="mb-12 flex flex-col gap-8 md:mb-16 md:flex-row md:items-end md:justify-between md:gap-10"
        >
          <h2 className="max-w-xl font-display text-[clamp(2.1rem,4.2vw,3.6rem)] font-light leading-[1.05] tracking-tight text-navy-deep">
            How can we help?
          </h2>
          <div className="max-w-sm md:text-right">
            <p className="font-sans text-[0.6875rem] uppercase tracking-eyebrow text-navy/40">
              Our Mission Statement
            </p>
            <p className="mt-3 font-sans text-[0.9375rem] leading-relaxed text-slate-500">
              {MISSION_STATEMENT}
            </p>
          </div>
        </div>

        {/* All three paths, one shared card treatment. Equal weight at rest;
            below lg they stack as full cards. At lg+ they become a
            lookbook-style triptych — hovering (or focusing) a panel expands
            it and dims its neighbors, a spotlight effect rather than a flat
            grid. flexGrow only does anything once the container is `flex`
            (lg+), so it's harmless in the stacked grid below that. */}
        <div
          data-ssc-grid
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6 lg:flex lg:h-[64vh] lg:gap-3"
        >
          {PATHS.map((p, i) => {
            const dimmed = active !== null && active !== i;
            return (
              <Link
                key={p.href}
                href={p.href}
                data-ssc-card
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                style={{ flexGrow: active === null ? 1 : active === i ? 1.8 : 0.75 }}
                className="group relative flex min-h-[48vh] flex-col justify-between overflow-hidden rounded-2xl shadow-[0_24px_60px_rgba(10,26,82,0.18)] ring-1 ring-navy/10 transition-[flex-grow] duration-700 ease-expo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/60 lg:h-full lg:min-h-0 lg:basis-0"
              >
                {/* Image + grade */}
                <Image
                  src={p.image}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 45vw"
                  priority={p.priority}
                  className="object-cover transition-transform duration-[1.4s] ease-expo group-hover:scale-[1.08]"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-navy-deep/15" />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/25 to-navy-deep/10"
                />
                {/* Spotlight wash — the two panels not being hovered dim down
                    so the active one visually pops. */}
                <div
                  aria-hidden="true"
                  className={`absolute inset-0 bg-navy-deep transition-opacity duration-700 ${
                    dimmed ? "opacity-45" : "opacity-0"
                  }`}
                />

                {/* Top meta row — index + eyebrow, magazine-style */}
                <div className="relative z-10 flex items-center justify-between p-8 md:p-10">
                  <span className="whitespace-nowrap font-sans text-[0.6875rem] uppercase tracking-eyebrow text-white/75">
                    {p.eyebrow}
                  </span>
                  <span
                    aria-hidden="true"
                    className="font-display text-[1.6rem] font-light leading-none text-white/45 transition-colors duration-700 group-hover:text-white/80 md:text-[2rem]"
                  >
                    {p.n}
                  </span>
                </div>

                {/* Bottom — title, line, explore */}
                <div className="relative z-10 p-8 md:p-10">
                  <h3
                    className={`font-display font-light leading-none tracking-tight text-white transition-[font-size] duration-700 ease-expo ${
                      dimmed
                        ? "text-[1.6rem] lg:text-[1.5rem]"
                        : "text-[clamp(2rem,3vw,2.8rem)]"
                    }`}
                  >
                    {p.title}
                  </h3>
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-expo ${
                      dimmed ? "mt-0 max-h-0 opacity-0" : "mt-5 max-h-40 opacity-100"
                    }`}
                  >
                    <p className="max-w-md font-sans text-[0.9375rem] leading-relaxed text-white/80">
                      {p.line}
                    </p>
                    <span className="mt-7 inline-flex items-center gap-3 font-sans text-[0.75rem] uppercase tracking-wide2 text-white">
                      Explore
                      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/40 transition-all duration-500 ease-expo group-hover:border-white group-hover:bg-white">
                        <ArrowRight
                          strokeWidth={1.5}
                          className="h-4 w-4 text-white transition-colors duration-500 group-hover:text-navy-deep"
                        />
                      </span>
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
