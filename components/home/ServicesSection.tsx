"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/motion";

type Offering = {
  label: string;
  body: string;
};

const OFFERINGS: Offering[] = [
  {
    label: "Lutron Lighting Control",
    body: "Engraved keypads, tunable scenes, and dimming curves that flatter the architecture at every hour of the day.",
  },
  {
    label: "Motorized Shades & Drapes",
    body: "Silent, perfectly aligned shades that temper the Florida sun on a schedule, at a keypad, or at a single touch.",
  },
  {
    label: "Hartmann & Forbes",
    body: "Natural woven and solar fabrics, specified window by window for the way they hold light as much as keep it out.",
  },
  {
    label: "Audio / Video",
    body: "Whole-home music, private cinema, and displays that vanish into the millwork until they are summoned.",
  },
  {
    label: "Fiber Networks & WiFi",
    body: "The wired and wireless backbone every other system in the property quietly depends on, built to enterprise standard.",
  },
  {
    label: "Life Safety & Surveillance",
    body: "Intrusion, fire, CO, and camera systems engineered into the property and watched around the clock.",
  },
  {
    label: "Automation Control",
    body: "One processor, one interface, one quiet logic running every system in the home from a single source.",
  },
  {
    label: "Smart Glass / Tint",
    body: "Electrochromic glass that moves from clear to private at a touch, or on a schedule of its own.",
  },
  {
    label: "Magna Track Screens",
    body: "Heavy-duty motorized lanai screens that stand against the weather, then retract completely out of sight.",
  },
  {
    label: "Full Home Integration",
    body: "Every system, every brand, every room, resolved into one seamless and reliable whole.",
  },
  {
    label: "Service After the Sale",
    body: "The team that designed and installed your system is the one that answers the phone, years after the truck leaves.",
  },
  {
    label: "24/7 Alarm Monitoring",
    body: "Help prevent the event with fast local monitoring.",
  },
];

const pad = (n: number) => String(n).padStart(2, "0");

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  /* Quiet, once-through reveals. Heading rises, then the catalog cells fade
     up in a gentle stagger. Everything holds still under reduced motion. */
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-services-intro] > *",
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: "[data-services-intro]", start: "top 82%" },
        }
      );

      gsap.fromTo(
        "[data-card]",
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.06,
          scrollTrigger: { trigger: "[data-grid]", start: "top 78%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative scroll-mt-24 overflow-hidden border-b border-navy/10 bg-white"
    >
      <div className="relative mx-auto max-w-[87.5rem] px-5 pb-24 pt-12 sm:px-8 md:px-10 md:pb-32 md:pt-16">

        {/* Masthead */}
        <div data-services-intro className="flex flex-col gap-6">
          <div className="max-w-2xl">
            <h2 className="font-display text-[clamp(2.3rem,4.6vw,3.9rem)] font-light leading-[1.02] tracking-tight text-navy-deep">
              What we{" "}
              <em className="font-light italic text-navy/40">do.</em>
            </h2>
          </div>
        </div>

        {/* Catalog grid. Twelve capabilities in a clean 3 × 4 (or 2 × 6) ruled
            grid, anchored by the full-width invitation row beneath. */}
        <div
          data-grid
          className="mt-14 grid grid-cols-1 border-l border-t border-navy/10 sm:grid-cols-2 md:mt-20 lg:grid-cols-3"
        >
          {OFFERINGS.map((o, i) => (
            <div
              key={o.label}
              data-card
              className="group relative flex flex-col border-b border-r border-navy/10 p-8 transition-colors duration-500 hover:bg-navy/[0.025] md:p-10"
            >
              <span className="font-display text-[2rem] font-light leading-none text-navy-logo/35 transition-colors duration-500 group-hover:text-navy-logo md:text-[2.4rem]">
                {pad(i + 1)}
              </span>

              <h3 className="mt-7 font-display text-[clamp(1.2rem,1.6vw,1.5rem)] font-light leading-tight text-navy-deep">
                {o.label}
              </h3>
              <p className="mt-3 font-sans text-[0.8438rem] leading-relaxed text-slate-500">
                {o.body}
              </p>
            </div>
          ))}

          {/* The filled invitation — spans the last row so the grid stays clean. */}
          <Link
            href="/contact"
            data-card
            className="group relative flex flex-col justify-between gap-8 border-b border-r border-navy/10 bg-navy-deep p-8 transition-colors duration-500 hover:bg-navy sm:col-span-2 md:p-10 lg:col-span-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/60"
          >
            <span className="font-sans text-[0.625rem] uppercase tracking-eyebrow text-white/55">
              Not sure where to begin
            </span>
            <div>
              <h3 className="font-display text-[clamp(1.4rem,2vw,1.9rem)] font-light leading-tight text-bone">
                Walk the plans with us.
              </h3>
              <span className="mt-5 inline-flex items-center gap-2 font-sans text-[0.6875rem] uppercase tracking-wide2 text-bone/70 transition-colors duration-500 group-hover:text-bone">
                Contact us
                <ArrowUpRight
                  strokeWidth={1.25}
                  className="h-4 w-4 transition-transform duration-500 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
