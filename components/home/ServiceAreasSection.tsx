"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/motion";

const AREAS = [
  "Orlando",
  "Windermere & Isleworth",
  "Winter Park",
  "Lake Nona",
  "Dr. Phillips & Bay Hill",
  "Celebration",
  "Winter Garden",
  "Clermont",
  "Mount Dora",
  "Lake Mary & Heathrow",
  "Sanford",
  "Oviedo",
  "Maitland & Altamonte",
  "Kissimmee & St. Cloud",
  "DeLand",
  "Ocala",
  "Daytona Beach",
];

export function ServiceAreasSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      // Map uncovers like a sheet being pulled from the flat file.
      gsap.fromTo(
        "[data-map-frame]",
        { clipPath: "inset(0% 0% 100% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.4,
          ease: "power4.inOut",
          scrollTrigger: { trigger: "[data-map-frame]", start: "top 75%" },
        }
      );

      gsap.fromTo(
        "[data-areas-intro]",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-areas-intro]", start: "top 80%" },
        }
      );

      // Communities report in, one by one.
      gsap.fromTo(
        "[data-area-row]",
        { opacity: 0, x: -16 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.09,
          scrollTrigger: { trigger: "[data-area-list]", start: "top 82%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-t border-slate-100 bg-[#FBFAF7]"
    >
      {/* Architectural drafting sheet — fine grid and technical line work in
          navy ink on the warm paper, sitting behind the map and copy. */}
      <ArchitecturalBackdrop />

      <div className="relative mx-auto max-w-[1500px] px-5 py-24 sm:px-8 md:px-11 md:py-36">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-10">

          {/* ── Text column — a sheet mounted on the drawing ─────────── */}
          <div className="flex flex-col justify-center lg:col-span-5">
            <div className="rounded-sm border border-navy/10 bg-[#FBFAF7]/80 p-7 shadow-[0_4px_40px_rgba(10,26,82,0.08)] backdrop-blur-[2px] md:p-9">
            <div data-areas-intro>
              <h2 className="font-display text-[clamp(1.9rem,3vw,2.8rem)] font-light leading-[1.06] tracking-tight text-navy-deep">
                From Daytona to Tampa, and{" "}
                <em className="font-light italic text-navy-logo">
                  every fine home
                </em>{" "}
                between.
              </h2>

              <p className="mt-5 max-w-md font-sans text-[15px] leading-relaxed text-navy-deep/75">
                Based in Orlando, we run in every direction: the lakefront
                estates of Windermere, the historic streets of Winter Park,
                the new builds of Lake Nona, and the gated enclaves of
                Dr.&nbsp;Phillips and Celebration.
              </p>
            </div>

            {/* Mobile: a collapsible dropdown keeps the long list from
                dominating the small screen. Tablet and up get the full grid. */}
            <details className="group/areas mt-6 border-t border-navy/15 pt-4 md:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between py-1 font-sans text-[12px] uppercase tracking-wide2 text-navy [&::-webkit-details-marker]:hidden">
                <span>Communities we serve ({AREAS.length})</span>
                <ChevronDown
                  strokeWidth={1.5}
                  className="h-4 w-4 transition-transform duration-300 group-open/areas:rotate-180"
                />
              </summary>
              <div className="mt-2 grid grid-cols-1 gap-x-8 sm:grid-cols-2">
                {AREAS.map((area) => (
                  <AreaRow key={area} area={area} />
                ))}
              </div>
            </details>

            {/* Tablet / desktop: the full ruled list, revealed on scroll. */}
            <div
              data-area-list
              className="mt-6 hidden grid-cols-1 gap-x-8 border-t border-navy/15 pt-4 sm:grid-cols-2 md:grid"
            >
              {AREAS.map((area) => (
                <AreaRow key={area} area={area} animate />
              ))}
            </div>

            <Link
              href="/service-areas"
              className="group mt-6 inline-flex items-center gap-3 font-sans text-[12px] uppercase tracking-wide2 text-navy transition-colors hover:text-navy-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/30"
            >
              View all service areas
              <ArrowUpRight
                strokeWidth={1.25}
                className="h-4 w-4 transition-transform duration-500 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
            </div>
          </div>

          {/* ── Map column — the figure mounted on the sheet ────────── */}
          <div className="flex flex-col items-center justify-center lg:col-span-7">
            <div className="w-full max-w-2xl lg:max-w-none">
              <div
                data-map-frame
                className="relative w-full overflow-hidden"
              >
                {/* Frame follows the artwork's own 1221×864 proportions —
                    nothing gets cropped. */}
                <div className="relative w-full overflow-hidden">
                  <Image
                    src="/images/Service-Area-CFAS.png"
                    alt="Central Florida service coverage map"
                    width={1221}
                    height={864}
                    sizes="(min-width: 1024px) 56vw, 100vw"
                    className="h-auto w-full brightness-125 saturate-[.85]"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* A single community in the list. `animate` tags it for the scroll-in stagger;
   the mobile dropdown copies stay untagged so they don't animate while hidden. */
function AreaRow({ area, animate = false }: { area: string; animate?: boolean }) {
  return (
    <div
      {...(animate ? { "data-area-row": "" } : {})}
      className="group flex items-center gap-4 border-b border-navy/[0.08] py-2.5"
    >
      <span className="relative flex h-[7px] w-[7px] shrink-0">
        <span className="absolute inset-0 rounded-full bg-navy/15 transition-colors duration-500 group-hover:bg-navy/40" />
        <span className="absolute inset-[2px] rounded-full bg-navy/40 transition-all duration-500 group-hover:bg-navy-logo group-hover:shadow-[0_0_8px_2px_rgba(1,22,137,0.25)]" />
      </span>
      <span className="font-display text-[16px] font-light text-navy-deep/70 transition-colors duration-500 group-hover:text-navy-deep">
        {area}
      </span>
      <span className="ml-auto h-px w-0 bg-navy/30 transition-all duration-700 ease-expo group-hover:w-10" />
    </div>
  );
}

/* A quiet cyanotype-style drafting sheet rendered in navy ink on the warm
   paper: a fine grid plus technical line work — a compass circle, a door
   swing, golden-ratio subdivisions, dimension lines, and a plan network. */
export function ArchitecturalBackdrop({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`absolute inset-0 ${className}`}>
      {/* Drafting grid — fine module lines with a heavier major every 8th */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(10,26,82,0.06) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(10,26,82,0.06) 1px, transparent 1px)," +
            "linear-gradient(rgba(10,26,82,0.12) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(10,26,82,0.12) 1px, transparent 1px)",
          backgroundSize: "34px 34px, 34px 34px, 272px 272px, 272px 272px",
        }}
      />

      {/* Technical line work + equations */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <g stroke="#0A1A52" strokeOpacity="0.18" strokeWidth="1">
          {/* Compass / column circle, top right */}
          <circle cx="1180" cy="180" r="120" />
          <circle cx="1180" cy="180" r="78" strokeOpacity="0.07" />
          <line x1="1020" y1="180" x2="1340" y2="180" strokeOpacity="0.08" />
          <line x1="1180" y1="20" x2="1180" y2="340" strokeOpacity="0.08" />
          <line x1="1180" y1="60" x2="1180" y2="80" />
          <line x1="1180" y1="280" x2="1180" y2="300" />
          <line x1="1060" y1="180" x2="1080" y2="180" />
          <line x1="1280" y1="180" x2="1300" y2="180" />

          {/* Door-swing arc with 90° angle, mid-left */}
          <path d="M120 560 L120 700 A140 140 0 0 0 260 560 Z" strokeOpacity="0.09" />
          <line x1="120" y1="700" x2="120" y2="560" />
          <line x1="120" y1="560" x2="260" y2="560" />

          {/* Golden-ratio rectangle subdivision, center-left */}
          <rect x="250" y="250" width="340" height="210" />
          <rect x="250" y="250" width="210" height="210" strokeOpacity="0.08" />
          <rect x="460" y="250" width="130" height="130" strokeOpacity="0.08" />
          <path d="M460 380 A130 130 0 0 1 590 250" strokeOpacity="0.26" />
          <path d="M250 460 A210 210 0 0 1 460 250" strokeOpacity="0.26" />

          {/* Horizontal dimension line with end ticks, top */}
          <line x1="250" y1="120" x2="650" y2="120" />
          <line x1="250" y1="108" x2="250" y2="132" />
          <line x1="650" y1="108" x2="650" y2="132" />

          {/* Wall-section detail with hatching, bottom */}
          <line x1="500" y1="760" x2="900" y2="760" />
          <line x1="500" y1="792" x2="900" y2="792" />
          {Array.from({ length: 13 }).map((_, i) => (
            <line
              key={i}
              x1={512 + i * 30}
              y1="792"
              x2={500 + i * 30}
              y2="760"
              strokeOpacity="0.06"
            />
          ))}

          {/* Plan node network, bottom right */}
          <path d="M980 640 L1120 600 L1240 680 L1330 600" strokeOpacity="0.08" />
          <circle cx="980" cy="640" r="5" />
          <circle cx="1120" cy="600" r="5" />
          <circle cx="1240" cy="680" r="5" />
          <circle cx="1330" cy="600" r="5" />
        </g>
      </svg>
    </div>
  );
}
