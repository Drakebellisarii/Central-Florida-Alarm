import type { Metadata } from "next";
import Link from "next/link";
import {
  Mail,
  MessageSquareText,
  Phone,
  PhoneCall,
  Share2,
  ArrowRight,
} from "lucide-react";
import { BUSINESS, buildMetadata, localBusinessLd, breadcrumbLd } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Existing Clients", path: "/existing-clients" },
  { name: "Reminders", path: "/existing-clients/reminders" },
];

export const metadata: Metadata = buildMetadata({
  title: "5 Important Reminders for Clients | Central Florida Automation Services",
  description:
    "Five things every Central Florida Automation Services client should know: the monitoring numbers to save, your code word, alarm registration, arming basics, and what to do when your panel won't stop beeping.",
  path: "/existing-clients/reminders",
});

/* ------------------------------------------------------------------ */
/* Shared building blocks                                              */
/* ------------------------------------------------------------------ */

function ReminderSection({
  n,
  id,
  title,
  children,
}: {
  n: string;
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="border-t border-slate-200 scroll-mt-24">
      <div className="mx-auto grid max-w-[93.75rem] grid-cols-1 gap-10 px-5 py-16 sm:px-8 md:grid-cols-12 md:gap-8 md:px-11 md:py-24">
        {/* Numeral rail */}
        <div className="md:col-span-4 lg:col-span-3">
          <Reveal>
            <div className="md:sticky md:top-28">
              <span className="block font-numeral text-[5rem] font-thin leading-none text-navy-logo md:text-[7rem]">
                {n}
              </span>
            </div>
          </Reveal>
        </div>

        {/* Content */}
        <div className="md:col-span-8 lg:col-span-8 lg:col-start-5">
          <Reveal index={1}>
            <h2 className="max-w-2xl font-display text-[clamp(1.7rem,3.2vw,2.6rem)] font-light leading-[1.12] tracking-tight text-navy-deep">
              {title}
            </h2>
          </Reveal>
          {children}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function RemindersPage() {
  return (
    <>
      <JsonLd data={localBusinessLd()} />
      <JsonLd data={breadcrumbLd(crumbs)} />

      <PageHero
        light
        crumbs={crumbs}
        title="Five important reminders for all of our clients."
      />

      <div className="bg-white">
        {/* ---------------------------------------------------------- */}
        {/* 1 — Save the monitoring numbers                             */}
        {/* ---------------------------------------------------------- */}
        <ReminderSection
          n="01"
          id="monitoring-numbers"
          title="Save these numbers before you need them."
        >
          <Reveal index={2}>
            <p className="mt-6 max-w-xl font-sans text-[0.9375rem] leading-relaxed text-slate-600">
              In the spam-call era, most people never answer a call from a 1-800 number
              and many phones screen them silently. But these are the numbers
              our monitoring center calls from to verify an alarm before
              dispatching. A missed call can mean a missed chance to stop a
              false dispatch, or a delay when it&rsquo;s real.
            </p>
          </Reveal>

          <Reveal index={3}>
            <div className="mt-10 border border-slate-200">
              <div className="border-b border-slate-200 bg-paper px-7 py-4">
                <p className="font-sans text-[0.6875rem] uppercase tracking-eyebrow text-navy/70">
                  Save as &ldquo;Alarm Monitoring: Answer This Call&rdquo;
                </p>
              </div>
              <div className="grid grid-cols-1 divide-y divide-slate-200 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
                <a
                  href="tel:+18004321429"
                  className="group flex items-center gap-4 px-7 py-6 transition-colors duration-300 hover:bg-paper"
                >
                  <Phone strokeWidth={1.25} className="h-5 w-5 shrink-0 text-navy-logo" />
                  <span className="font-display text-[1.35rem] font-normal tracking-tight text-navy-deep group-hover:text-navy-logo">
                    1-800-432-1429
                  </span>
                </a>
                <a
                  href="tel:+18006334738"
                  className="group flex items-center gap-4 px-7 py-6 transition-colors duration-300 hover:bg-paper"
                >
                  <Phone strokeWidth={1.25} className="h-5 w-5 shrink-0 text-navy-logo" />
                  <span className="font-display text-[1.35rem] font-normal tracking-tight text-navy-deep group-hover:text-navy-logo">
                    1-800-633-4738
                  </span>
                </a>
              </div>
              <div className="flex items-center gap-4 border-t border-slate-200 px-7 py-5">
                <MessageSquareText strokeWidth={1.25} className="h-5 w-5 shrink-0 text-navy-logo" />
                <p className="font-sans text-[0.875rem] text-slate-600">
                  Texts arrive from SMS short code{" "}
                  <span className="font-medium text-navy-deep">60281</span>
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal index={4}>
            <p className="mt-7 flex max-w-xl items-start gap-3 font-sans text-[0.875rem] leading-relaxed text-slate-500">
              <Share2 strokeWidth={1.25} className="mt-0.5 h-4 w-4 shrink-0 text-navy-logo" />
              Pass these along to your emergency contacts and key holders;
              the monitoring center may call them too.
            </p>
          </Reveal>
        </ReminderSection>

        {/* ---------------------------------------------------------- */}
        {/* 2 — Code word                                               */}
        {/* ---------------------------------------------------------- */}
        <ReminderSection
          n="02"
          id="code-word"
          title="Don't forget your password!"
        >
          <Reveal index={2}>
            <p className="mt-6 max-w-xl font-sans text-[0.9375rem] leading-relaxed text-slate-600">
              Your password is the vocal password you use to identify
              yourself to our operators; it&rsquo;s how they know it&rsquo;s
              really you when they call to verify an alarm, and how they know
              to cancel a dispatch. Keep it somewhere your family and key
              holders can find it, but strangers can&rsquo;t.
            </p>
          </Reveal>
          <Reveal index={3}>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 border-y border-slate-200 py-6">
              <p className="font-sans text-[0.9375rem] text-slate-600">
                Forgotten it? We can help:
              </p>
              <a
                href={BUSINESS.phoneHref}
                className="inline-flex items-center gap-3 font-display text-[1.2rem] tracking-tight text-navy-deep transition-colors duration-300 hover:text-navy-logo"
              >
                <PhoneCall strokeWidth={1.25} className="h-4 w-4 text-navy-logo" />
                {BUSINESS.phone}
              </a>
            </div>
          </Reveal>
        </ReminderSection>

        {/* ---------------------------------------------------------- */}
        {/* 3 — Register your alarm                                     */}
        {/* ---------------------------------------------------------- */}
        <ReminderSection
          n="03"
          id="register"
          title="Register your alarm with your county."
        >
          <Reveal index={2}>
            <p className="mt-6 max-w-xl font-sans text-[0.9375rem] leading-relaxed text-slate-600">
              Many Central Florida counties and municipalities require alarm
              systems to be registered with the sheriff&rsquo;s office or local
              police department. An unregistered alarm can mean fines after a
              false alarm, or a slower response when it counts. Requirements
              vary by county, and some offer registration online while others
              still take it by mail.
            </p>
          </Reveal>
          <Reveal index={3}>
            <p className="mt-5 max-w-xl font-sans text-[0.9375rem] leading-relaxed text-slate-600">
              Not sure what your county requires? Call us at{" "}
              <a
                href={BUSINESS.phoneHref}
                className="font-medium text-navy-deep underline decoration-slate-300 underline-offset-4 transition-colors duration-300 hover:text-navy-logo hover:decoration-navy-logo/40"
              >
                {BUSINESS.phone}
              </a>{" "}
              and we&rsquo;ll point you to the right office.
            </p>
          </Reveal>
        </ReminderSection>

        {/* ---------------------------------------------------------- */}
        {/* 4 — Arming basics                                           */}
        {/* ---------------------------------------------------------- */}
        <ReminderSection
          n="04"
          id="arming-basics"
          title="The basics: arming and disarming your system."
        >
          <Reveal index={2}>
            <p className="mt-6 max-w-xl font-sans text-[0.9375rem] leading-relaxed text-slate-600">
              When arming, you&rsquo;ll choose one of two modes, and the
              difference matters.
            </p>
          </Reveal>

          <Reveal index={3}>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="border border-slate-200 p-8">
                <p className="font-sans text-[0.6875rem] uppercase tracking-eyebrow text-navy/70">
                  You&rsquo;re home
                </p>
                <p className="mt-4 font-display text-[1.7rem] font-light tracking-tight text-navy-deep">
                  Stay
                </p>
                <p className="mt-4 font-sans text-[0.875rem] leading-relaxed text-slate-600">
                  Arms the perimeter (doors and windows) but leaves motion
                  detectors off, so you can move freely around the house.
                </p>
              </div>
              <div className="border border-slate-200 p-8">
                <p className="font-sans text-[0.6875rem] uppercase tracking-eyebrow text-navy/70">
                  You&rsquo;re leaving
                </p>
                <p className="mt-4 font-display text-[1.7rem] font-light tracking-tight text-navy-deep">
                  Away
                </p>
                <p className="mt-4 font-sans text-[0.875rem] leading-relaxed text-slate-600">
                  Arms everything (perimeter sensors and motion detectors)
                  for full coverage while the house is empty.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal index={4}>
            <p className="mt-7 max-w-xl font-sans text-[0.875rem] leading-relaxed text-slate-500">
              To disarm, enter your 4-digit passcode at the keypad. If anyone
              in the house doesn&rsquo;t know it, now is a good time to fix
              that.
            </p>
          </Reveal>
        </ReminderSection>

        {/* ---------------------------------------------------------- */}
        {/* 5 — Power loss / beeping                                    */}
        {/* ---------------------------------------------------------- */}
        <ReminderSection
          n="05"
          id="power-loss"
          title="We lost power and now the system won't stop beeping."
        >
          <Reveal index={2}>
            <p className="mt-6 max-w-xl font-sans text-[0.9375rem] leading-relaxed text-slate-600">
              During an extended outage (hurricane season, especially), your
              system runs on its backup battery. Once that battery runs low,
              the panel starts beeping to tell you, and it can feel like
              it&rsquo;s going crazy. To silence it, follow these three steps.
            </p>
          </Reveal>

          <Reveal index={3}>
            <ol className="mt-10 max-w-2xl">
              {[
                {
                  step: "Open the panel box",
                  detail:
                    "Find your security panel box (usually in a closet, utility room, or the garage) and open it up.",
                },
                {
                  step: "Disconnect the backup battery",
                  detail:
                    "Unhook the prongs from the 12-volt battery inside the panel box. It doesn't matter which prong you remove first.",
                },
                {
                  step: "Unplug the power transformer",
                  detail:
                    "Find the transformer plugged into a wall outlet (it may be in another room or near a garage door opener) and unplug it. You may need a Phillips-head screwdriver if it's secured to the outlet.",
                },
              ].map((item, i) => (
                <li
                  key={item.step}
                  className="grid grid-cols-[3.5rem_1fr] gap-x-5 border-t border-slate-200 py-7 first:border-t-0 first:pt-0"
                >
                  <span className="font-numeral text-[2rem] font-light leading-none text-navy-logo">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-[1.2rem] font-normal leading-snug tracking-tight text-navy-deep">
                      {item.step}
                    </h3>
                    <p className="mt-2 font-sans text-[0.9375rem] leading-relaxed text-slate-600">
                      {item.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal index={4}>
            <p className="mt-4 max-w-xl border-t border-slate-200 pt-7 font-sans text-[0.875rem] leading-relaxed text-slate-500">
              Once power is back, reconnect the battery and plug the
              transformer back in. If the beeping returns, the battery has
              likely reached the end of its life:{" "}
              <Link
                href="/contact"
                className="font-medium text-navy-deep underline decoration-slate-300 underline-offset-4 transition-colors duration-300 hover:text-navy-logo hover:decoration-navy-logo/40"
              >
                request service
              </Link>{" "}
              and we&rsquo;ll replace it.
            </p>
          </Reveal>
        </ReminderSection>

        {/* Contact + back link */}
        <div className="border-t border-slate-200 bg-white">
          <div className="mx-auto flex max-w-[93.75rem] flex-col justify-between gap-12 px-5 py-16 sm:px-8 md:flex-row md:items-end md:py-20 md:px-11">
            <div>
              <h2 className="font-display text-[clamp(1.7rem,2.6vw,2.2rem)] font-light leading-tight tracking-tight text-navy-deep">
                Questions about any of these?
              </h2>
              <p className="mt-3 font-sans text-[0.9375rem] leading-relaxed text-slate-600">
                We&rsquo;re happy to walk through it with you.
              </p>

              <div className="mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-12">
                <a
                  href={BUSINESS.phoneHref}
                  className="flex items-center gap-3.5 text-navy-deep transition-colors hover:text-navy-logo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-logo/40"
                >
                  <Phone strokeWidth={1.25} className="h-5 w-5 shrink-0 text-navy-logo" />
                  <span className="font-display text-[1.5rem] leading-none tracking-tight">
                    {BUSINESS.phone}
                  </span>
                </a>
                <a
                  href={`mailto:${BUSINESS.officeEmail}`}
                  className="flex items-center gap-3.5 text-navy-deep transition-colors hover:text-navy-logo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-logo/40"
                >
                  <Mail strokeWidth={1.25} className="h-5 w-5 shrink-0 text-navy-logo" />
                  <span className="font-display text-[1.3rem] leading-none tracking-tight">
                    {BUSINESS.officeEmail}
                  </span>
                </a>
              </div>
            </div>

            <Link
              href="/existing-clients"
              className="group inline-flex items-center gap-3 font-sans text-[0.75rem] uppercase tracking-wide2 text-navy/70 transition-colors duration-300 hover:text-navy-logo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-logo/40"
            >
              <ArrowRight strokeWidth={1.25} className="h-4 w-4 rotate-180 transition-transform duration-300 group-hover:-translate-x-0.5" />
              All client resources
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
