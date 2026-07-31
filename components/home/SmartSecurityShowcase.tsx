"use client";

import { useEffect, useRef } from "react";
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
    image: "/images/biz.webp",
    alt: "The downtown Orlando skyline reflected in Lake Eola at dusk",
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
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.1,
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
      className="relative min-h-[100dvh] bg-white"
    >
      <div className="mx-auto max-w-[93.75rem] px-5 py-20 sm:px-8 md:px-11 md:py-28">

        {/* Masthead — centered above the row, a hairline underneath to tie
            it into the ruled grid below. */}
        <div data-ssc-intro className="mb-12 text-center md:mb-16">
          <h2 className="mx-auto max-w-2xl font-display text-[clamp(2.1rem,4.2vw,3.6rem)] font-light leading-[1.05] tracking-tight text-navy-deep">
            Explore Your Options
          </h2>
        </div>

        {/* Three plates, ruled rather than boxed — the same catalog grid
            convention as the services section below (hairlines, not cards
            floating in shadow), so the photography and the serif titles
            carry the weight instead of shadow/rounded-corner UI chrome. */}
        <div
          data-ssc-grid
          className="grid grid-cols-1 border-l border-t border-navy/15 sm:grid-cols-2 lg:grid-cols-3"
        >
          {PATHS.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              data-ssc-card
              className="group relative flex min-h-[48vh] flex-col justify-between overflow-hidden border-b border-r border-navy/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-navy/60 lg:min-h-[58vh]"
            >
              {/* Image + grade */}
              <Image
                src={p.image}
                alt={p.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                priority={p.priority}
                className="object-cover transition-transform duration-[1.6s] ease-expo group-hover:scale-[1.05]"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-navy-deep/15" />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-navy-deep/40 via-navy-deep/10 to-transparent"
              />
              {/* Grain — the same texture as the page splash, scoped to
                  this card instead of the fixed full-viewport overlay, so
                  the photo reads as a printed plate rather than a flat
                  vector. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                }}
              />

              {/* Top meta row — eyebrow + a plate number, sized like a
                  folio mark rather than a UI badge. */}
              <div className="relative z-10 flex items-center justify-between p-8 md:p-10">
                <span className="whitespace-nowrap font-sans text-[0.6875rem] uppercase tracking-eyebrow text-white/75">
                  {p.eyebrow}
                </span>
                <span
                  aria-hidden="true"
                  className="font-display text-[2rem] font-light leading-none tracking-tight text-white/40 transition-colors duration-700 group-hover:text-white/75 md:text-[2.4rem]"
                >
                  {p.n}
                </span>
              </div>

              {/* Bottom — title, line, a text-link CTA instead of a button */}
              <div className="relative z-10 p-8 md:p-10">
                <h3 className="font-display text-[clamp(2rem,3vw,2.8rem)] font-light leading-none tracking-tight text-white">
                  {p.title}
                </h3>
                <p className="mt-5 max-w-md font-sans text-[0.9375rem] leading-relaxed text-white/80">
                  {p.line}
                </p>
                <span className="mt-7 inline-flex items-center gap-2.5 font-sans text-[0.75rem] uppercase tracking-wide2 text-white">
                  Explore
                  <ArrowRight
                    strokeWidth={1.5}
                    className="h-3.5 w-3.5 transition-transform duration-500 ease-expo group-hover:translate-x-1.5"
                  />
                </span>
                <span
                  aria-hidden="true"
                  className="mt-2 block h-px w-8 bg-white/50 transition-all duration-500 ease-expo group-hover:w-16 group-hover:bg-white"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
