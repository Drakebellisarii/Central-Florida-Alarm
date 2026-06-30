import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

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

// The two paths on /smart-security — kept in lockstep with that page so the
// homepage CTA and the destination read the same.
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
];

export function SmartSecurityShowcase() {
  return (
    <section id="smart-security" className="bg-white">
      <div className="mx-auto max-w-[1500px] px-5 py-20 sm:px-8 md:px-11 md:py-28">

        {/* The two paths, side by side */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          {PATHS.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="reveal-scroll group relative flex min-h-[60vh] flex-col justify-between overflow-hidden rounded-2xl shadow-[0_24px_60px_rgba(10,26,82,0.18)] ring-1 ring-navy/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/60 md:min-h-[76vh]"
            >
              {/* Image + grade */}
              <Image
                src={p.image}
                alt={p.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={p.priority}
                className="object-cover transition-transform duration-[1.4s] ease-expo group-hover:scale-[1.05]"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-navy-deep/15" />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/25 to-navy-deep/10"
              />

              {/* Top meta row — index + eyebrow, magazine-style */}
              <div className="relative z-10 flex items-center justify-between p-8 md:p-11">
                <span className="font-sans text-[11px] uppercase tracking-eyebrow text-white/75">
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
              <div className="relative z-10 p-8 md:p-11">
                <h3 className="font-display text-[clamp(2.3rem,4.4vw,3.8rem)] font-light leading-none tracking-tight text-white">
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
      </div>
    </section>
  );
}
