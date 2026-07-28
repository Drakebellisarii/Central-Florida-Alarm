import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
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
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LightFAQAccordion } from "@/components/LightFAQAccordion";
import type { FAQ } from "@/lib/services";

export const metadata: Metadata = buildMetadata({
  title: "Smart Luxury Integration | Central Florida Automation Services",
  description:
    "Lutron lighting, motorized shades, private cinema, smart glass, and whole-property integration — the full smart luxury catalog for Central Florida's finest homes.",
  path: "/smart-luxury",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Smart Security", path: "/smart-security" },
  { name: "Smart Luxury", path: "/smart-luxury" },
];

type Offering = {
  icon: LucideIcon;
  label: string;
  body: string;
};

const OFFERINGS: Offering[] = [
  {
    icon: Lightbulb,
    label: "Lutron Lighting Control",
    body: "Engraved keypads, tunable scenes, and dimming curves that flatter the architecture at every hour of the day.",
  },
  {
    icon: Blinds,
    label: "Motorized Shades & Drapes",
    body: "Silent, perfectly aligned shades that temper the Florida sun on a schedule, at a keypad, or at a single touch.",
  },
  {
    icon: Layers,
    label: "Hartmann & Forbes",
    body: "Natural woven and solar fabrics, specified window by window for the way they hold light as much as keep it out.",
  },
  {
    icon: MonitorPlay,
    label: "Audio / Video",
    body: "Whole-home music, private cinema, and displays that vanish into the millwork until they are summoned.",
  },
  {
    icon: Wifi,
    label: "Fiber Networks & WiFi",
    body: "The wired and wireless backbone every other system in the property quietly depends on, built to enterprise standard.",
  },
  {
    icon: ShieldCheck,
    label: "Life Safety & Surveillance",
    body: "Intrusion, fire, CO, and camera systems engineered into the property and watched around the clock.",
  },
  {
    icon: Workflow,
    label: "Automation Control",
    body: "One processor, one interface, one quiet logic running every system in the home from a single source.",
  },
  {
    icon: Blend,
    label: "Smart Glass / Tint",
    body: "Electrochromic glass that moves from clear to private at a touch, or on a schedule of its own.",
  },
  {
    icon: PanelBottom,
    label: "Magna Track Screens",
    body: "Heavy-duty motorized lanai screens that stand against the weather, then retract completely out of sight.",
  },
  {
    icon: LayoutGrid,
    label: "Full Home Integration",
    body: "Every system, every brand, every room, resolved into one seamless and reliable whole.",
  },
  {
    icon: Wrench,
    label: "Service After the Sale",
    body: "The team that designed and installed your system is the one that answers the phone, years after the truck leaves.",
  },
  {
    icon: BellRing,
    label: "24/7 Alarm Monitoring",
    body: "Help prevent the event with fast local monitoring.",
  },
];

// Intentionally empty for now — questions go in once the copy is ready.
const FAQS: FAQ[] = [];

export default function SmartLuxuryPage() {
  return (
    <div className="bg-white pt-[4.75rem]">

      {/* Hero */}
      <section className="mx-auto max-w-[93.75rem] px-5 pb-12 pt-16 sm:px-8 md:px-11 md:pb-16 md:pt-24">
        <Breadcrumbs items={crumbs} tone="onLight" />
        <span className="mt-8 block font-sans text-[0.6875rem] uppercase tracking-eyebrow text-navy/50">
          For the finer details
        </span>
        <h1 className="mt-4 max-w-2xl font-hero text-[clamp(2.6rem,5.5vw,4.6rem)] font-light leading-[1.0] tracking-tight text-navy-deep">
          Smart Luxury
        </h1>
        <p className="mt-6 max-w-xl font-sans text-[1.0625rem] leading-relaxed text-slate-600">
          What&rsquo;s possible in a fully integrated estate — theaters, wine
          rooms, motorized art, and smart glass, brought together into one
          seamless system instead of a shelf of remotes.
        </p>
      </section>

      {/* Catalog — two spacious columns instead of the dense homepage grid,
          giving each capability room to breathe as its own plate. */}
      <section className="mx-auto max-w-[75rem] px-5 pb-24 sm:px-8 md:px-10 md:pb-32">
        <div className="grid grid-cols-1 border-l border-t border-navy/10 lg:grid-cols-2">
          {OFFERINGS.map((o) => (
            <div
              key={o.label}
              className="group relative flex flex-col border-b border-r border-navy/10 p-10 transition-colors duration-500 hover:bg-navy/[0.025] md:p-14"
            >
              <o.icon
                strokeWidth={1.25}
                className="h-9 w-9 text-navy-logo/40 transition-colors duration-500 group-hover:text-navy-logo"
              />
              <h2 className="mt-8 font-display text-[clamp(1.4rem,2vw,1.75rem)] font-light leading-tight text-navy-deep">
                {o.label}
              </h2>
              <p className="mt-4 max-w-md font-sans text-[0.9375rem] leading-relaxed text-slate-500">
                {o.body}
              </p>
            </div>
          ))}

          {/* The filled invitation — spans the last row so the grid stays clean. */}
          <Link
            href="/contact"
            className="group relative flex flex-col justify-between gap-10 border-b border-r border-navy/10 bg-navy-deep p-10 transition-colors duration-500 hover:bg-navy sm:col-span-2 md:p-14 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/60"
          >
            <span className="font-sans text-[0.625rem] uppercase tracking-eyebrow text-white/55">
              Not sure where to begin
            </span>
            <div>
              <h2 className="font-display text-[clamp(1.4rem,2vw,1.9rem)] font-light leading-tight text-bone">
                Walk the plans with us.
              </h2>
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
      </section>

      {/* FAQ — kept below the catalog; copy to follow */}
      <section className="bg-white pb-24 md:pb-32">
        <div className="mx-auto max-w-[56rem] px-5 sm:px-8 md:px-11">
          <h2 className="font-display text-[clamp(1.8rem,3.4vw,2.6rem)] font-light leading-tight tracking-tight text-navy-deep">
            Smart Luxury FAQ
          </h2>
          <div className="mt-10">
            <LightFAQAccordion faqs={FAQS} />
          </div>
        </div>
      </section>
    </div>
  );
}
