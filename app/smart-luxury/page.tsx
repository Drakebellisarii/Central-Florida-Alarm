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

import { buildMetadata } from "@/lib/seo";
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
  "No two homes are the same.",
  "So no two systems are either —",
  "we build from the ground up, every time.",
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

type Room = {
  title: string;
  body: string;
  image: string;
  alt: string;
};

const ROOMS: Room[] = [
  {
    title: "The room learns your evening.",
    body: "A Lutron scene shifts every fixture at once, tuned to how this room is actually used after dark.",
    image: `${DIR}/Luxury-1.png`,
    alt: "A great room at blue hour, warm lamplight against a lakefront view lined with palms",
  },
  {
    title: "The light adjusts before you do.",
    body: "Motorized shades and electrochromic glass move together, softening the room before the glare ever arrives.",
    image: `${DIR}/Luxury-2.png`,
    alt: "A glass corner shifting from clear to tinted beside a woven shade, overlooking turquoise water and palms",
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
          <video
            data-sl-hero-media
            className="h-full w-full scale-105 object-cover opacity-90"
            poster={`${DIR}/hero-poster.jpg`}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src="/Luxury-Hero.mp4" type="video/mp4" />
          </video>
        </div>
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-navy-deep/30 via-navy-deep/08 to-navy-deep/18"
        />

        <div
          data-sl-hero-exit
          className="relative mx-auto w-full max-w-[62rem] px-5 text-center sm:px-8"
        >
          <h1 className="reveal-load rd-1 font-hero text-[clamp(2.8rem,7vw,6rem)] font-light leading-[1.02] tracking-tight text-white">
            One-of-one, by design.
          </h1>
          <p className="reveal-load rd-2 mt-6 font-sans text-[0.8125rem] uppercase tracking-wide2 text-white/55">
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
          <div data-sl-rise>
            <h2 className="max-w-xl font-display text-[clamp(1.8rem,3.4vw,2.6rem)] font-light leading-tight tracking-tight text-navy-deep">
              The full system.
            </h2>
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

      {/* ============================ THE ROOMS ============================ */}
      <section className="border-t border-navy/10 bg-white py-28 md:py-36">
        <div className="mx-auto max-w-[75rem] px-5 sm:px-8 md:px-11">
          <div data-sl-rise>
            <h2 className="max-w-xl font-display text-[clamp(1.8rem,3.4vw,2.6rem)] font-light leading-tight tracking-tight text-navy-deep">
              One home, every mood.
            </h2>
          </div>

          <div
            data-sl-diptych
            className="mt-16 grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-2"
          >
            {ROOMS.map((r) => (
              <div key={r.title}>
                <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-navy-deep/[0.04]">
                  <Image
                    src={r.image}
                    alt={r.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-6 font-display text-[1.4rem] font-light leading-snug tracking-tight text-navy-deep">
                  {r.title}
                </h3>
                <p className="mt-2 max-w-sm font-sans text-[0.9375rem] leading-relaxed text-slate-600">
                  {r.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FULL-BLEED BAND ================ */}
      <section className="border-t border-navy/10 bg-white pb-28 pt-20 md:pb-36 md:pt-28">
        <div className="mx-auto max-w-[75rem] px-5 sm:px-8 md:px-11">
          <div
            data-sl-diagonal-reveal
            className="relative aspect-[16/9] overflow-hidden rounded-sm"
          >
            <Image
              src={`${DIR}/Luxury-3.png`}
              alt="A primary suite overlooking the beach at dusk, with the home's automation panel showing the room already secured, cooled, and dimmed"
              fill
              sizes="(max-width: 1200px) 100vw, 75rem"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"
            />
            <div
              data-sl-diagonal-panel
              aria-hidden
              className="absolute inset-0 -z-10 bg-navy-deep"
            />
            <p className="absolute bottom-0 left-0 max-w-sm p-6 font-display text-[clamp(1.2rem,2vw,1.6rem)] font-light leading-tight tracking-tight text-white md:p-8">
              Secure, 72°, and already dimmed — before you&rsquo;ve sat down.
            </p>
          </div>
        </div>
      </section>

      {/* ============================ MANIFESTO ============================ */}
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
          </div>
        </div>
      </section>
    </div>
  );
}
