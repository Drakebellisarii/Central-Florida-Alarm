"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
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
      gsap.fromTo(
        "[data-areas-intro] > *",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: "[data-areas-intro]", start: "top 80%" },
        }
      );

      gsap.fromTo(
        "[data-area-chip]",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.04,
          scrollTrigger: { trigger: "[data-area-list]", start: "top 84%" },
        }
      );

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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="border-t border-slate-100 bg-white">
      <div className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 md:px-11 md:py-32">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">

          {/* ── Left — text ── */}
          <div data-areas-intro className="flex flex-col">
            <h2 className="font-display text-[clamp(2rem,3.5vw,3.2rem)] font-light leading-[1.05] tracking-tight text-navy-deep">
              From Daytona to Tampa,{" "}
              <em className="font-light italic text-navy/40">
                every fine home
              </em>{" "}
              between.
            </h2>
            <p className="mt-4 max-w-md font-sans text-[14px] leading-relaxed text-slate-500">
              Based in Orlando, we serve the lakefront estates of Windermere,
              the historic streets of Winter Park, the new builds of Lake Nona,
              and the gated enclaves of Dr.&nbsp;Phillips and Celebration.
            </p>

            <div className="mt-8 h-px w-full bg-slate-100" />

            <div
              data-area-list
              className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2"
            >
              {AREAS.map((area) => (
                <span
                  key={area}
                  data-area-chip
                  className="font-sans text-[13px] text-slate-500"
                >
                  {area}
                </span>
              ))}
            </div>

            <Link
              href="/service-areas"
              className="group mt-8 inline-flex items-center gap-2 font-sans text-[11px] uppercase tracking-wide2 text-navy transition-colors hover:text-navy-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/30"
            >
              View all service areas
              <ArrowUpRight
                strokeWidth={1.25}
                className="h-3.5 w-3.5 transition-transform duration-500 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>

          {/* ── Right — map ── */}
          <div data-map-frame className="w-full">
            <Image
              src="/images/Service-Area-CFAS.png"
              alt="Central Florida service coverage map"
              width={1221}
              height={864}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="h-auto w-full"
            />
          </div>

        </div>
      </div>
    </section>
  );
}

/* Preserved — not currently rendered */
export function ArchitecturalBackdrop({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`absolute inset-0 ${className}`}>
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
    </div>
  );
}
