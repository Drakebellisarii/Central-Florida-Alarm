import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Lightbulb,
  Blinds,
  Layers,
  MonitorPlay,
  Wifi,
  ShieldCheck,
  Workflow,
  Blend,
  PanelBottom,
  LayoutGrid,
  Wrench,
  BellRing,
  type LucideIcon,
} from "lucide-react";

import { buildMetadata, BUSINESS } from "@/lib/seo";
import { NavSentinel } from "@/components/NavSentinel";
import { SLMotion } from "@/components/smart-luxury/SLMotion";

export const metadata: Metadata = buildMetadata({
  title: "Smart Luxury Integration | Central Florida Automation Services",
  description:
    "Fully custom smart home integration for Central Florida's finest estates — lighting, shading, theater, and security, designed once for one house, never templated.",
  path: "/smart-luxury",
});

const DIR = "/Smart-Luxury";

const MANIFESTO = [
  "At this level, no two homes are the same.",
  "No two systems should be either.",
];

type Feature = {
  icon: LucideIcon;
  title: string;
  body: string;
};

const FEATURES: Feature[] = [
  {
    icon: Lightbulb,
    title: "Lutron Lighting Control",
    body: "Engraved keypads, tunable scenes, and dimming curves that flatter the architecture at every hour of the day.",
  },
  {
    icon: Blinds,
    title: "Motorized Shades & Drapes",
    body: "Silent, perfectly aligned shades that temper the Florida sun on a schedule, at a keypad, or at a single touch.",
  },
  {
    icon: Layers,
    title: "Hartmann & Forbes",
    body: "Natural woven and solar fabrics, specified window by window for the way they hold light as much as keep it out.",
  },
  {
    icon: MonitorPlay,
    title: "Audio / Video",
    body: "Whole-home music, private cinema, and displays that vanish into the millwork until they are summoned.",
  },
  {
    icon: Wifi,
    title: "Fiber Networks & WiFi",
    body: "The wired and wireless backbone every other system in the property quietly depends on, built to enterprise standard.",
  },
  {
    icon: ShieldCheck,
    title: "Life Safety & Surveillance",
    body: "Intrusion, fire, CO, and camera systems engineered into the property and watched around the clock.",
  },
  {
    icon: Workflow,
    title: "Automation Control",
    body: "One processor, one interface, one quiet logic running every system in the home from a single source.",
  },
  {
    icon: Blend,
    title: "Smart Glass / Tint",
    body: "Electrochromic glass that moves from clear to private at a touch, or on a schedule of its own.",
  },
  {
    icon: PanelBottom,
    title: "Magna Track Screens",
    body: "Heavy-duty motorized lanai screens that stand against the weather, then retract completely out of sight.",
  },
  {
    icon: LayoutGrid,
    title: "Full Home Integration",
    body: "Every system, every brand, every room, resolved into one seamless and reliable whole.",
  },
  {
    icon: Wrench,
    title: "Service After the Sale",
    body: "The team that designed and installed your system is the one that answers the phone, years after the truck leaves.",
  },
  {
    icon: BellRing,
    title: "24/7 Alarm Monitoring",
    body: "Help prevent the event with fast local monitoring.",
  },
];

type TriptychPanel = {
  word: string;
  image: string;
  mobileImage: string;
  alt: string;
  caption: string;
};

const TRIPTYCH: TriptychPanel[] = [
  {
    word: "Inside",
    image: `${DIR}/Inside.webp`,
    mobileImage: `${DIR}/Inside-Mobile.webp`,
    alt: "A curved home theater with a motorized screen and cove lighting",
    caption:
      "One touch drops the screen, dims the room to reference black, and brings the sound up to match.",
  },
  {
    word: "Outside",
    image: `${DIR}/Outside.webp`,
    mobileImage: `${DIR}/Outside-Mobile.webp`,
    alt: "A motorized lanai screen retracting over an infinity pool as a storm moves in over the water",
    caption:
      "Motorized screens read the weather before you do, retracting for the view and closing before the first drop falls.",
  },
  {
    word: "Everywhere",
    image: `${DIR}/Everewhere-Lux.webp`,
    mobileImage: `${DIR}/Everywhere-Mobile.webp`,
    alt: "A two-story great room with a floating staircase, open to the kitchen and the pool beyond",
    caption:
      "Every room runs the same logic, from the front stair to the water beyond the glass.",
  },
];

export default function SmartLuxuryPage() {
  return (
    <div className="bg-white">
      <SLMotion />

      {/* ============================== HERO ============================== */}
      <section
        data-sl-hero
        className="relative isolate flex min-h-[92vh] flex-col items-center justify-center overflow-hidden bg-navy-deep"
      >
        <NavSentinel />

        <div aria-hidden className="absolute inset-0 overflow-hidden">
          <Image
            data-sl-hero-media
            src={`${DIR}/Luxury-Mobile-Hero.webp`}
            alt=""
            fill
            priority
            sizes="100vw"
            className="scale-105 object-cover opacity-90 sm:hidden"
          />
          <Image
            data-sl-hero-media
            src={`${DIR}/LUX-HERO-IMG.webp`}
            alt=""
            fill
            priority
            sizes="100vw"
            className="hidden scale-105 object-cover opacity-90 sm:block"
          />
        </div>
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-navy-deep/30 to-transparent"
        />

        <div
          data-sl-hero-exit
          className="relative mx-auto w-full max-w-[62rem] px-5 text-center sm:px-8"
        >
          <h1 className="reveal-load rd-1 font-hero text-[clamp(2.8rem,7vw,6rem)] font-light leading-[1.02] tracking-tight text-white">
            One-of-one, by design.
          </h1>
          <p className="reveal-load rd-2 mt-6 font-sans text-[1.0625rem] font-medium uppercase tracking-wide2 text-white [text-shadow:0_2px_16px_rgba(0,0,0,0.55)]">
            No package. No template. Built once, for one house.
          </p>
          <Link
            href="/contact"
            className="reveal-load rd-3 group mt-10 inline-flex items-center gap-2 border-b border-white/40 pb-1 font-sans text-[0.8125rem] uppercase tracking-wide2 text-white transition-colors hover:border-white"
          >
            Begin Your Build
            <ArrowUpRight
              strokeWidth={1.25}
              className="h-3.5 w-3.5 transition-transform duration-300 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </section>

      {/* ============================= FEATURES ============================= */}
      <section className="bg-white py-28 md:py-36">
        <div className="mx-auto max-w-[75rem] px-5 sm:px-8 md:px-11">
          <div
            data-sl-rise
            className="flex flex-wrap items-end justify-between gap-x-10 gap-y-8"
          >
            <h2 className="max-w-xl font-display text-[clamp(1.8rem,3.4vw,2.6rem)] font-light leading-tight tracking-tight text-navy-deep">
              The full system.
            </h2>
            {/* Lutron's top dealer tier, set opposite the heading that opens
                onto Lutron Lighting Control and Motorized Shades below. The
                right half of this row is otherwise empty, so the badge gets
                room to be read rather than competing with dense copy. */}
            <Image
              src="/images/Lutron-platinum.png"
              alt="Lutron Platinum Dealer 2026"
              width={200}
              height={184}
              className="h-20 w-auto object-contain md:h-24"
            />
          </div>

          <div
            data-sl-flip-grid
            className="mt-16 grid grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3"
            style={{ perspective: "1400px" }}
          >
            {FEATURES.map((f) => (
              <div key={f.title} data-sl-flip className="border-t border-navy/10 pt-6">
                <f.icon strokeWidth={1.3} className="h-6 w-6 text-navy-logo/70" />
                <h3 className="mt-5 font-display text-[1.15rem] font-light leading-snug tracking-tight text-navy-deep">
                  {f.title}
                </h3>
                <p className="mt-2 font-sans text-[0.875rem] leading-relaxed text-slate-600">
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================== INSIDE / OUTSIDE / EVERYWHERE ================== */}
      <section data-sl-triptych className="relative bg-navy-deep">
        {TRIPTYCH.map((t, i) => (
          <div
            key={t.word}
            data-sl-triptych-panel
            className="relative flex h-[100dvh] items-end overflow-hidden"
          >
            <Image
              data-sl-triptych-img
              src={t.mobileImage}
              alt={t.alt}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover sm:hidden"
            />
            <Image
              data-sl-triptych-img
              src={t.image}
              alt={t.alt}
              fill
              priority={i === 0}
              sizes="100vw"
              className="hidden object-cover sm:block"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/20 to-transparent"
            />
            <div
              data-sl-triptych-copy
              className="relative z-10 w-full px-5 pb-16 sm:px-8 md:px-11 md:pb-24"
            >
              <div className="mx-auto max-w-[75rem]">
                <span className="font-sans text-[0.75rem] uppercase tracking-wide2 text-white/45">
                  0{i + 1} / 03
                </span>
                <h2 className="mt-3 font-hero text-[clamp(3.2rem,10vw,8rem)] font-light leading-[0.9] tracking-tight text-white">
                  {t.word}
                </h2>
                <p className="mt-5 max-w-md font-sans text-[1rem] leading-relaxed text-white/70">
                  {t.caption}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Progress ticks — shown and driven by SLMotion only when the
            pinned crossfade actually runs; stays hidden otherwise so the
            reduced-motion fallback (three plain stacked panels) never
            shows an indicator with nothing to indicate. */}
        <div
          data-sl-triptych-ticks
          aria-hidden="true"
          className="pointer-events-none absolute right-5 top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-3 sm:right-8 md:right-11"
        >
          {TRIPTYCH.map((t) => (
            <span key={t.word} data-sl-triptych-tick className="h-8 w-px bg-white/25" />
          ))}
        </div>
      </section>

      {/* ======================== MANIFESTO / CONTACT ======================== */}
      <section className="border-t border-navy/10 bg-white py-28 md:py-40">
        <div className="mx-auto max-w-[75rem] px-5 sm:px-8 md:px-11">
          <div className="space-y-1 md:space-y-2">
            {MANIFESTO.map((line) => (
              <div key={line} className="overflow-hidden">
                <div
                  data-sl-mask-line
                  className="font-display text-[clamp(1.9rem,4.4vw,3.6rem)] font-light leading-[1.16] tracking-tight text-navy-deep"
                >
                  {line}
                </div>
              </div>
            ))}

            {/* The call to act reads as the statement's own next line —
                same mask-reveal, just larger and alive under the cursor. */}
            <div className="overflow-hidden pt-2 md:pt-3">
              <div data-sl-mask-line>
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-4 font-hero text-[clamp(2.2rem,5.4vw,4.4rem)] font-light leading-[1.04] tracking-tight text-bronze transition-colors duration-500 hover:text-navy-deep"
                >
                  Let&rsquo;s work together
                  <ArrowUpRight
                    strokeWidth={1}
                    className="h-[0.6em] w-[0.6em] shrink-0 transition-transform duration-500 ease-expo group-hover:translate-x-2 group-hover:-translate-y-2"
                  />
                </Link>
              </div>
            </div>
          </div>

          {/* Contact masthead — quiet, editorial, the way a magazine signs off */}
          <div
            data-sl-rise
            className="mt-16 flex flex-col gap-6 border-t border-navy/10 pt-8 sm:flex-row sm:items-center sm:justify-between md:mt-24"
          >
            <p className="max-w-sm font-sans text-[0.9375rem] leading-relaxed text-slate-600">
              One conversation, before the first drawing is final.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-10">
              <a
                href={BUSINESS.phoneHref}
                className="group flex items-baseline gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-logo/30"
              >
                <span className="font-sans text-[0.6875rem] uppercase tracking-wide2 text-navy/40">
                  Call
                </span>
                <span className="font-display text-[1.15rem] tracking-tight text-navy-deep transition-colors duration-300 group-hover:text-bronze">
                  {BUSINESS.phone}
                </span>
              </a>
              <span className="hidden h-4 w-px bg-navy/15 sm:block" />
              <a
                href={BUSINESS.emailHref}
                className="group flex items-baseline gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-logo/30"
              >
                <span className="font-sans text-[0.6875rem] uppercase tracking-wide2 text-navy/40">
                  Email
                </span>
                <span className="font-display text-[1.15rem] tracking-tight text-navy-deep transition-colors duration-300 group-hover:text-bronze">
                  {BUSINESS.email}
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
