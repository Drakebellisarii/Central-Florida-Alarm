import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Smart Security | Central Florida Automation Services",
  description:
    "Intelligent security designed around how you live and work. Choose Smart Home, Smart Business, or Smart Luxury to see how CFAS protects your space.",
};

const PATHS = [
  {
    href: "/smart-home",
    n: "01",
    eyebrow: "For your home",
    title: "Smart Home",
    line: "Security, cameras, locks, and life-safety woven into the property you live in.",
    image: "/images/home.webp",
    alt: "A modern Central Florida home with palm trees and lush landscaping",
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
    line: "What's possible in a fully integrated estate, theaters, wine rooms, motorized art, and more, answered plainly.",
    image: "/images/smarthome.webp",
    alt: "A modern waterfront Central Florida estate at dusk",
  },
];

export default function SmartSecurityPage() {
  return (
    <div className="bg-white pt-[4.75rem]">
      {/* Compact heading — the three paths below are the focal point */}
      <section className="mx-auto max-w-[93.75rem] px-5 pb-12 pt-16 text-center sm:px-8 md:px-11 md:pb-16 md:pt-24">
        <h1 className="mx-auto max-w-3xl font-hero text-[clamp(2.6rem,5.5vw,4.6rem)] font-light leading-[1.0] tracking-tight text-navy-deep">
          Built for your space.
        </h1>
        <p className="mx-auto mt-6 max-w-xl font-sans text-[1.0625rem] leading-relaxed text-slate-600">
          Where you live, where you work, or the finer details in between,
          choose where you need us and we will take it from there.
        </p>
      </section>

      {/* Three plates, ruled rather than boxed — same catalog grid
          convention as the homepage showcase and the services section:
          hairlines, not cards floating in shadow. */}
      <section className="mx-auto max-w-[100rem] px-5 pb-20 sm:px-8 md:px-11 md:pb-28">
        <div className="mx-auto grid max-w-[87.5rem] grid-cols-1 border-l border-t border-navy/15 sm:grid-cols-2 lg:grid-cols-3">
          {PATHS.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="group relative flex min-h-[52vh] flex-col justify-between overflow-hidden border-b border-r border-navy/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-navy/60 lg:min-h-[60vh]"
            >
              {/* Image */}
              <Image
                src={p.image}
                alt={p.alt}
                fill
                // 1 column below sm, 2 across at sm, 3 across at lg — tell the
                // optimizer so it ships an appropriately small file.
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                // The cards are the top-of-page focal point; eager-load the
                // first so it isn't gated behind lazy-loading as the LCP image.
                priority={p.n === "01"}
                className="object-cover transition-transform duration-[1.6s] ease-expo group-hover:scale-[1.05]"
              />

              {/* Color grade — kept minimal so the photo reads clearly. Only a
                  faint wash sits over the full image; the real legibility comes
                  from the bottom gradient that anchors the text. */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-navy-deep/15"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/25 to-navy-deep/10"
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
                <h2 className="font-display text-[clamp(2.1rem,3.2vw,3rem)] font-light leading-none tracking-tight text-white">
                  {p.title}
                </h2>
                <p className="mt-5 max-w-md font-sans text-[0.9375rem] leading-relaxed text-white/75">
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
      </section>
    </div>
  );
}
