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
    image: "/images/commercial-smart.webp",
    alt: "A modern Central Florida commercial building",
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

      {/* All three paths, one shared card treatment */}
      <section className="mx-auto max-w-[100rem] px-5 pb-20 sm:px-8 md:px-11 md:pb-28">
        <div className="mx-auto grid max-w-[87.5rem] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
          {PATHS.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="group relative flex min-h-[52vh] flex-col justify-end overflow-hidden rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-logo/50 focus-visible:ring-offset-4 lg:min-h-[60vh]"
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
                className="object-cover transition-transform duration-[1.2s] ease-expo group-hover:scale-[1.06]"
              />

              {/* Color grade — kept minimal so the photo reads clearly. Only a
                  faint wash sits over the full image; the real legibility comes
                  from the bottom gradient that anchors the text. */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-navy-deep/10 transition-colors duration-700 group-hover:bg-navy-deep/0"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/10 to-transparent"
              />

              {/* Big index watermark */}
              <span
                aria-hidden="true"
                className="absolute right-7 top-6 font-display text-[2rem] font-light text-white/40 transition-colors duration-700 group-hover:text-white/70 md:text-[2.5rem]"
              >
                {p.n}
              </span>

              {/* Content */}
              <div className="relative z-10 p-8 md:p-10">
                <span className="font-sans text-[0.6875rem] uppercase tracking-eyebrow text-white/70">
                  {p.eyebrow}
                </span>
                <h2 className="mt-3 font-display text-[clamp(2.1rem,3.2vw,3rem)] font-light leading-none tracking-tight text-white">
                  {p.title}
                </h2>
                <p className="mt-5 max-w-md font-sans text-[0.9375rem] leading-relaxed text-white/75">
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
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
