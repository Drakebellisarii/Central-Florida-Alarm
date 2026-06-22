import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Smart Security | Central Florida Automation Services",
  description:
    "Intelligent security designed around how you live and work. Choose Smart Home or Smart Business to see how CFAS protects your space.",
};

const PATHS = [
  {
    href: "/smart-home",
    n: "01",
    eyebrow: "For your home",
    title: "Smart Home",
    line: "Security, cameras, locks, and life-safety woven into the property you live in.",
    image: "/images/smarthome.webp",
    alt: "A modern waterfront Central Florida estate at dusk",
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

export default function SmartSecurityPage() {
  return (
    <div className="bg-white pt-[76px]">
      {/* Compact heading — the two paths below are the focal point */}
      <section className="mx-auto max-w-[1500px] px-5 pb-12 pt-16 text-center sm:px-8 md:px-11 md:pb-16 md:pt-24">
        <h1 className="mx-auto max-w-3xl font-display text-[clamp(2.6rem,5.5vw,4.6rem)] font-light leading-[1.0] tracking-tight text-navy-deep">
          Built for your space.
        </h1>
        <p className="mx-auto mt-6 max-w-xl font-sans text-[17px] leading-relaxed text-slate-600">
          Where you live or where you work — choose where you need us and we will
          take it from there.
        </p>
      </section>

      {/* The two paths */}
      <section className="mx-auto max-w-[1600px] px-5 pb-20 sm:px-8 md:px-11 md:pb-28">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {PATHS.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="group relative flex min-h-[58vh] flex-col justify-end overflow-hidden rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-logo/50 focus-visible:ring-offset-4 md:min-h-[68vh]"
            >
              {/* Image */}
              <Image
                src={p.image}
                alt={p.alt}
                fill
                // 1 column below lg, 3 across at lg+ — tell the optimizer so it
                // ships an appropriately small file instead of a full-width one.
                sizes="(max-width: 1024px) 100vw, 33vw"
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
              <div className="relative z-10 p-8 md:p-11">
                <span className="font-sans text-[11px] uppercase tracking-eyebrow text-white/70">
                  {p.eyebrow}
                </span>
                <h2 className="mt-3 font-display text-[clamp(2.4rem,4.5vw,3.8rem)] font-light leading-none tracking-tight text-white">
                  {p.title}
                </h2>
                <p className="mt-5 max-w-md font-sans text-[15px] leading-relaxed text-white/75">
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
    </div>
  );
}
