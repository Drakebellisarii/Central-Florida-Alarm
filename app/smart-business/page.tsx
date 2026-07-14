import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import {
  ShieldCheck,
  BellRing,
  BadgeCheck,
  KeyRound,
  CalendarClock,
  Users,
  DoorOpen,
  ScanFace,
  Workflow,
  MonitorPlay,
  CloudUpload,
  Thermometer,
  FileText,
  Smartphone,
  BarChart3,
  Check,
  Store,
  Truck,
  Lock,
} from "lucide-react";

import { buildMetadata } from "@/lib/seo";
import { NavSentinel } from "@/components/NavSentinel";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AmbientVideo } from "@/components/smart-home/AmbientVideo";
import { SBMotion } from "@/components/smart-business/SBMotion";
import { SBHeroVideo } from "@/components/smart-business/SBHeroVideo";

export const metadata: Metadata = buildMetadata({
  title: "Smart Business Security | Central Florida Automation Services",
  description:
    "Alarm.com for Business, designed and installed by CFAS: intrusion, access control, video surveillance, and energy automation on one platform, across every location.",
  path: "/smart-business",
});

const DIR = "/CFAS-Buisness";

const PILLARS = [
  {
    icon: ShieldCheck,
    title: "Intrusion, armed from anywhere",
    body: "Arm and disarm remotely, keep a panic button within reach, and stay online through cellular backup: protection that doesn't depend on your power or your internet.",
  },
  {
    icon: BellRing,
    title: "Alerts with judgment",
    body: "Opening and closing reports, unexpected-activity notifications, and real-time alarms: the platform tells you what happened, not just that something did.",
  },
  {
    icon: BadgeCheck,
    title: "Monitored around the clock",
    body: "A professional monitoring station stands behind every signal, with trained operators ready to dispatch the moment an event is verified.",
  },
];

const ACCESS = [
  {
    icon: KeyRound,
    title: "Keyless entry",
    body: "Employees badge in with a card, fob, or their phone. A lost credential is revoked in seconds, not re-keyed over a weekend.",
  },
  {
    icon: CalendarClock,
    title: "Schedules per person",
    body: "The opening manager gets 6 AM access; weekend staff don't. Permissions follow the schedule you set once.",
  },
  {
    icon: Users,
    title: "Every entry, attributed",
    body: "The access log reads like a story (who opened which door, and when), searchable by name.",
  },
  {
    icon: DoorOpen,
    title: "Unlock from anywhere",
    body: "Buzz in a delivery or a locked-out employee from your phone, whether you're in the office or out of state.",
  },
];

const VIDEO_CAPS = [
  {
    icon: ScanFace,
    title: "Analytics that discriminate",
    body: "Person, vehicle, or animal: every alert carries the distinction, so a raccoon in the lot never wakes you at 3 AM.",
  },
  {
    icon: Workflow,
    title: "Clips tied to events",
    body: "Footage links itself to the alarm and access events around it: search by who badged in, not by timestamp.",
  },
  {
    icon: MonitorPlay,
    title: "Live from anywhere",
    body: "Every camera across every site, streaming to your phone, tablet, or the web command center.",
  },
  {
    icon: CloudUpload,
    title: "Recorded to the cloud",
    body: "Critical clips are saved off-site the instant they happen, beyond the reach of a stolen recorder.",
  },
];

const LOCATIONS_POINTS = [
  "One login and a single Enterprise Dashboard for every property",
  "Roll out user codes, credentials, and schedules to all sites at once",
  "Compare activity, video, and energy use across locations side by side",
];

type Operation = {
  kind: "photo" | "video" | "app";
  eyebrow: string;
  title: string;
  body: string;
  icon: typeof Store;
  image?: string;
  video?: string;
  poster?: string;
  alt: string;
};

const OPERATIONS: Operation[] = [
  {
    kind: "video",
    eyebrow: "Open & close",
    title: "Opening and closing the store is one tap.",
    body: "Disarm and unlock at open, arm and lock at close; lights and HVAC follow along with each scene, run from the sidewalk or scheduled to the minute.",
    icon: Store,
    video: `${DIR}/amb-open.mp4`,
    poster: `${DIR}/amb-open-poster.jpg`,
    alt: "A shop owner unlocking her café as the system disarms itself",
  },
  {
    kind: "app",
    eyebrow: "Accountability",
    title: "Opened on time, and you'll know if it isn't.",
    body: "Opening and closing reports land automatically. If the store isn't disarmed by 7:05, you hear about it at 7:06.",
    icon: BellRing,
    image: `${DIR}/Buisness-9.webp`,
    alt: "The app confirming the business opened on time, with doors and thermostat in view",
  },
  {
    kind: "photo",
    eyebrow: "Beyond the front door",
    title: "Access that reaches the gate.",
    body: "Garages, gates, and drive-up readers run on the same credentials as the lobby, parking and fleet entrances included.",
    icon: Truck,
    image: `${DIR}/Buisness-7.jpg`,
    alt: "A driver reaching from their car to badge into a parking garage reader",
  },
  {
    kind: "video",
    eyebrow: "Back of house",
    title: "Storerooms stay on a need-to-enter basis.",
    body: "Inventory, server rooms, and cash offices restricted by role and by hour, with a log entry for every visit.",
    icon: Lock,
    video: `${DIR}/amb-door.mp4`,
    poster: `${DIR}/amb-door-poster.jpg`,
    alt: "An employee unlocking a restricted warehouse door with their phone",
  },
];

export default function SmartBusinessPage() {
  return (
    <div className="bg-white">
      <SBMotion />

      {/* ============================== HERO ============================== */}
      <section
        data-sb-hero
        className="relative isolate flex min-h-[92vh] flex-col justify-end overflow-hidden bg-navy-deep"
      >
        <NavSentinel />

        <div aria-hidden className="absolute inset-0 overflow-hidden">
          <SBHeroVideo
            className="h-full w-full scale-105 object-cover opacity-45"
            poster={`${DIR}/amb-access-poster.jpg`}
            desktopSrc={`${DIR}/amb-access.mp4`}
            mobileSrc="/Smart-biz.mp4"
          />
        </div>
        <div aria-hidden className="absolute inset-0 bg-navy-deep/55" />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-navy-deep via-navy-deep/40 to-transparent"
        />

        <div className="relative mx-auto w-full max-w-[93.75rem] px-5 pb-16 pt-40 sm:px-8 md:px-11 md:pb-20 short:pb-10 short:pt-24">
          <div className="reveal-load">
            <Breadcrumbs
              tone="onDark"
              items={[
                { name: "Home", path: "/" },
                { name: "Smart Security", path: "/smart-security" },
                { name: "Smart Business", path: "/smart-business" },
              ]}
            />
          </div>

          <h1 className="reveal-load rd-2 mt-10 max-w-4xl font-hero text-[clamp(2.4rem,6.4vw,5.3rem)] font-light leading-[1.03] tracking-tight text-white">
            Run every location like you&apos;re standing in it.
          </h1>

          <div className="reveal-load rd-3 mt-8 h-px w-24 bg-white/35" />

          <p className="reveal-load rd-3 mt-7 max-w-2xl font-sans text-[1.0625rem] leading-relaxed text-white/75">
            Alarm.com for Business unites intrusion, access control, video
            surveillance, and energy on a single platform, designed,
            installed, and serviced by CFAS, Central Florida&apos;s first
            Alarm.com provider. Arm a site, unlock a door, or pull up a
            camera from wherever the day has taken you.
          </p>
        </div>
      </section>

      {/* ========================== THE PLATFORM ========================== */}
      <section id="platform" className="scroll-mt-24 bg-white py-24 md:py-32">
        <div className="mx-auto max-w-[93.75rem] px-5 sm:px-8 md:px-11">
          <div className="grid grid-cols-1 items-end gap-12 lg:grid-cols-12">
            <div data-sb-rise className="lg:col-span-7">
              <h2 className="max-w-2xl font-display text-[clamp(2rem,4vw,3.4rem)] font-light leading-[1.06] tracking-tight text-navy-deep">
                Security, wired into the way you operate.
              </h2>
            </div>
            <div data-sb-rise className="lg:col-span-5">
              <p className="font-sans text-[1rem] leading-relaxed text-slate-600">
                Most businesses run on a patchwork: an alarm from one company,
                cameras from another, and a spreadsheet of who still has keys.
                We replace the patchwork with one professionally installed
                platform that answers to a single app.
              </p>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <div
                data-sb-curtain
                className="relative aspect-[4/3] overflow-hidden rounded-sm bg-navy-deep/[0.04]"
              >
                <Image
                  src={`${DIR}/Buisness-3.jpg`}
                  alt="An Alarm.com dome camera overlooking a restaurant mezzanine during evening service"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div data-sb-grid className="flex flex-col justify-center lg:col-span-6">
              {PILLARS.map((f) => (
                <div
                  key={f.title}
                  className="flex gap-6 border-t border-slate-200/80 py-7 first:border-t-0 first:pt-0"
                >
                  <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy-deep/5 text-navy-logo">
                    <f.icon strokeWidth={1.4} className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-[1.4rem] font-light leading-snug tracking-tight text-navy-deep">
                      {f.title}
                    </h3>
                    <p className="mt-2 font-sans text-[0.9375rem] leading-relaxed text-slate-600">
                      {f.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================= ACCESS CONTROL ========================= */}
      <section
        id="access"
        className="scroll-mt-24 border-t border-slate-200/70 bg-paper py-24 md:py-32"
      >
        <div className="mx-auto max-w-[93.75rem] px-5 sm:px-8 md:px-11">
          <div data-sb-rise>
            <h2 className="max-w-2xl font-display text-[clamp(2rem,4vw,3.4rem)] font-light leading-[1.06] tracking-tight text-navy-deep">
              The last key you&apos;ll ever cut.
            </h2>
          </div>

          <div className="mt-16 grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <div
                data-sb-curtain
                className="relative aspect-[2/3] max-h-[40rem] overflow-hidden rounded-sm bg-navy-deep/[0.04]"
              >
                <Image
                  src={`${DIR}/Buisness-4.jpg`}
                  alt="An employee badging into a glass storefront door with a keycard"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div data-sb-grid className="grid grid-cols-1 gap-x-10 gap-y-9 sm:grid-cols-2 lg:col-span-7">
              {ACCESS.map((a) => (
                <div key={a.title}>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-navy-logo shadow-[0_1px_2px_rgba(10,26,82,0.08)]">
                    <a.icon strokeWidth={1.4} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 font-display text-[1.3rem] font-light leading-snug tracking-tight text-navy-deep">
                    {a.title}
                  </h3>
                  <p className="mt-2 font-sans text-[0.9375rem] leading-relaxed text-slate-600">
                    {a.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ======================= VIDEO SURVEILLANCE ======================= */}
      <section id="video" className="scroll-mt-24 bg-black py-24 md:py-32">
        <div className="mx-auto max-w-[93.75rem] px-5 sm:px-8 md:px-11">
          <div data-sb-rise>
            <h2 className="max-w-2xl font-display text-[clamp(2rem,4vw,3.4rem)] font-light leading-[1.06] tracking-tight text-white">
              Cameras that understand what they&apos;re seeing.
            </h2>
          </div>

          {/* Command-center laptop — the mockup's black ground merges with the section */}
          <div data-sb-float className="mx-auto mt-16 max-w-4xl">
            <div className="relative aspect-[640/379]">
              <Image
                src={`${DIR}/Buisness-5.jpg`}
                alt="The Alarm.com web dashboard on a laptop, showing nine live camera feeds across a café and warehouse"
                fill
                sizes="(max-width: 1024px) 100vw, 896px"
                className="object-contain"
              />
            </div>
            <p className="mt-6 text-center font-sans text-[0.75rem] uppercase tracking-eyebrow text-white/40">
              The web command center: every camera, every site, live
            </p>
          </div>

          <div
            data-sb-grid
            className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-white/10 sm:grid-cols-2 lg:grid-cols-4"
          >
            {VIDEO_CAPS.map((v) => (
              <div
                key={v.title}
                className="group h-full bg-white/[0.03] p-7 transition-colors duration-500 hover:bg-white/[0.07]"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors duration-500 group-hover:border-white/40 group-hover:text-white">
                  <v.icon strokeWidth={1.3} className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-[1.2rem] font-light leading-snug tracking-tight text-white">
                  {v.title}
                </h3>
                <p className="mt-2 font-sans text-[0.875rem] leading-relaxed text-white/55">
                  {v.body}
                </p>
              </div>
            ))}
          </div>

          {/* After-hours mood piece */}
          <div className="mt-16">
            <div
              data-sb-curtain
              className="relative aspect-[16/9] overflow-hidden rounded-sm md:aspect-[21/9]"
            >
              <Image
                src={`${DIR}/Buisness-8.jpg`}
                alt="A warehouse loading dock at night, quietly lit and under watch"
                fill
                sizes="(max-width: 1024px) 100vw, 1420px"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
              />
              <div className="absolute bottom-0 left-0 p-7 md:p-10">
                <span className="font-sans text-[0.6875rem] uppercase tracking-eyebrow text-white/55">
                  After hours
                </span>
                <p className="mt-2 max-w-md font-display text-[clamp(1.5rem,2.6vw,2.2rem)] font-light leading-tight tracking-tight text-white">
                  The night shift that never clocks out.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================= MULTI-LOCATION ========================= */}
      <section
        id="locations"
        className="scroll-mt-24 border-t border-white/10 bg-black py-24 md:py-32"
      >
        <div className="mx-auto grid max-w-[93.75rem] grid-cols-1 items-center gap-14 px-5 sm:px-8 md:px-11 lg:grid-cols-12 lg:gap-16">
          <div data-sb-float className="lg:col-span-5">
            {/* Phone mockup shot on black — it dissolves into the section */}
            <div className="relative mx-auto aspect-[309/640] w-[70%] max-w-[20rem]">
              <Image
                src={`${DIR}/Buisness-6.webp`}
                alt="The app's saved video clips filtered across Boston, Seattle, and Richmond locations"
                fill
                sizes="(min-width: 1920px) 640px, 320px"
                className="object-contain"
              />
            </div>
          </div>

          <div className="lg:col-span-7">
            <div data-sb-rise>
              <h2 className="max-w-xl font-display text-[clamp(2rem,4vw,3.4rem)] font-light leading-[1.06] tracking-tight text-white">
                Ten sites should feel like one.
              </h2>
              <p className="mt-6 max-w-lg font-sans text-[1rem] leading-relaxed text-white/60">
                The Enterprise Dashboard puts every property behind a single
                pane of glass. New hire across three stores? One change. A
                clip from the Boston lot and the Richmond floor? Same screen,
                same search.
              </p>
            </div>
            <ul data-sb-grid className="mt-10 space-y-4">
              {LOCATIONS_POINTS.map((p) => (
                <li
                  key={p}
                  className="flex items-start gap-4 border-t border-white/10 pt-4 font-sans text-[0.9375rem] leading-relaxed text-white/75"
                >
                  <Check strokeWidth={2} className="mt-0.5 h-4 w-4 shrink-0 text-white" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ======================== DAILY OPERATIONS ======================== */}
      <section id="operations" className="scroll-mt-24 bg-white py-24 md:py-32">
        <div className="mx-auto grid max-w-[93.75rem] grid-cols-1 gap-16 px-5 sm:px-8 md:px-11 lg:grid-cols-12 lg:gap-x-20">
          <div className="lg:col-span-4">
            <div data-sb-rise className="lg:sticky lg:top-28">
              <h2 className="font-display text-[clamp(2rem,3.6vw,3.2rem)] font-light leading-[1.06] tracking-tight text-navy-deep">
                A business day, handled end to end.
              </h2>
              <p className="mt-6 max-w-xs font-sans text-[0.9375rem] leading-relaxed text-slate-500">
                Four moments the platform quietly absorbs. Scroll through.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-24 md:gap-32 lg:col-span-8">
            {OPERATIONS.map((o, i) => {
              const flip = i % 2 === 1;
              return (
                <div
                  key={o.title}
                  className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12"
                >
                  <div className={flip ? "md:order-2" : ""}>
                    {o.kind === "app" ? (
                      /* Phone mockup, sized to its own aspect so it isn't lost in a box */
                      <div
                        data-sb-curtain
                        className="relative mx-auto aspect-[9/16] max-w-[17.5rem] overflow-hidden rounded-sm bg-navy-deep/[0.04]"
                      >
                        <Image
                          src={o.image!}
                          alt={o.alt}
                          fill
                          sizes="(min-width: 1920px) 560px, 280px"
                          className="object-contain p-3"
                        />
                      </div>
                    ) : (
                      <div
                        data-sb-curtain
                        className="relative aspect-[16/9] overflow-hidden rounded-sm bg-navy-deep/[0.04]"
                      >
                        {o.kind === "video" ? (
                          <AmbientVideo
                            src={o.video!}
                            poster={o.poster!}
                            posterAlt={o.alt}
                            className="absolute inset-0 h-full w-full object-cover"
                          />
                        ) : (
                          <Image
                            src={o.image!}
                            alt={o.alt}
                            fill
                            sizes="(max-width: 1024px) 100vw, 40vw"
                            className="object-cover"
                          />
                        )}
                      </div>
                    )}
                  </div>

                  <div data-sb-rise className={flip ? "md:order-1" : ""}>
                    <div className="flex items-center gap-4">
                      <span className="font-display text-[0.9375rem] font-light tracking-tight text-navy-logo/60">
                        0{i + 1}
                      </span>
                      <span aria-hidden className="h-px w-8 bg-navy-deep/15" />
                      <span className="inline-flex items-center gap-3 font-sans text-[0.6875rem] uppercase tracking-eyebrow text-navy/70">
                        <o.icon strokeWidth={1.4} className="h-4 w-4" />
                        {o.eyebrow}
                      </span>
                    </div>
                    <h3 className="mt-5 max-w-md font-display text-[clamp(1.6rem,2.6vw,2.3rem)] font-light leading-[1.1] tracking-tight text-navy-deep">
                      {o.title}
                    </h3>
                    <p className="mt-5 max-w-md font-sans text-[1rem] leading-relaxed text-slate-600">
                      {o.body}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================== AUTOMATION & INSIGHTS ===================== */}
      <section
        id="automation"
        className="scroll-mt-24 border-t border-slate-200/70 bg-white py-24 md:py-32"
      >
        <div className="mx-auto max-w-[93.75rem] px-5 sm:px-8 md:px-11">
          <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
            <div data-sb-rise className="lg:col-span-7">
              <h2 className="max-w-2xl font-display text-[clamp(2rem,4vw,3.4rem)] font-light leading-[1.06] tracking-tight text-navy-deep">
                The building runs itself. You read the report.
              </h2>
            </div>
            <div data-sb-rise className="lg:col-span-5">
              <p className="font-sans text-[1rem] leading-relaxed text-slate-600">
                Arming the system at close can set back the thermostats, drop
                the lights, and lock whatever was forgotten. Meanwhile, every
                day&apos;s activity is tallied into trends you can staff and
                market against.
              </p>
            </div>
          </div>

          <div data-sb-grid className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {/* Energy — solid navy text card */}
            <article className="flex h-full min-h-[22rem] flex-col justify-between rounded-sm bg-navy-deep p-8">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white">
                <Thermometer strokeWidth={1.4} className="h-4 w-4" />
              </span>
              <div>
                <h3 className="font-display text-[1.6rem] font-light leading-tight tracking-tight text-white">
                  Energy on your hours
                </h3>
                <p className="mt-3 font-sans text-[0.9375rem] leading-relaxed text-white/70">
                  The system knows when the building is empty, so the
                  building acts like it.
                </p>
                <ul className="mt-6 space-y-2.5">
                  {[
                    "Thermostats set back when you arm-away",
                    "Lighting follows opening and closing",
                    "Temperature alerts guard coolers & stock",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 font-sans text-[0.875rem] text-white/70"
                    >
                      <Check strokeWidth={2} className="h-4 w-4 shrink-0 text-white" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>

            {/* Documents & reminders — photo card */}
            <BentoCard
              icon={FileText}
              title="The building's paperwork, filed"
              body="Warranties, service invoices, and inspection dates live with the system they cover, with reminders before anything lapses."
            >
              <Image
                src={`${DIR}/Buisness-10.jpg`}
                alt="A manager reviewing stored service invoices, warranties, and reminders on her phone"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover opacity-75 transition-transform duration-[1.2s] ease-expo group-hover:scale-[1.05]"
              />
            </BentoCard>

            {/* Lock-screen widgets — photo card */}
            <BentoCard
              icon={Smartphone}
              title="Control from the lock screen"
              body="Widgets and one-tap scenes put arm, unlock, and lights a thumb away, no digging through an app between customers."
            >
              <Image
                src={`${DIR}/Buisness-11.jpg`}
                alt="iOS home-screen widgets controlling doors, locks, and scenes"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover opacity-75 transition-transform duration-[1.2s] ease-expo group-hover:scale-[1.05]"
              />
            </BentoCard>

            {/* Business insights — wide navy card */}
            <article className="rounded-sm bg-navy-deep p-8 sm:col-span-2 lg:col-span-3 md:p-10">
              <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
                <div className="lg:col-span-7">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white">
                    <BarChart3 strokeWidth={1.4} className="h-4 w-4" />
                  </span>
                  <h3 className="mt-5 font-display text-[1.6rem] font-light leading-tight tracking-tight text-white">
                    Activity becomes a ledger.
                  </h3>
                  <p className="mt-3 max-w-xl font-sans text-[0.9375rem] leading-relaxed text-white/70">
                    Trend reports turn each day into something you can act on:
                    staff the rush, time the promotion, and spot the
                    anomaly before it becomes a loss.
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-white/10 sm:grid-cols-3 lg:col-span-5">
                  {["Traffic by hour", "Punctuality by site", "Energy by season"].map(
                    (t) => (
                      <div key={t} className="bg-white/[0.04] px-4 py-6 text-center">
                        <p className="font-sans text-[0.6875rem] uppercase leading-relaxed tracking-wide2 text-white/60">
                          {t}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ========================== PARTNER STRIP ========================= */}
      <section className="border-t border-slate-200/70 bg-white">
        <div className="mx-auto flex max-w-[93.75rem] flex-col items-center gap-6 px-5 py-14 text-center sm:px-8 md:flex-row md:justify-between md:px-11 md:text-left">
          <Image
            src={`${DIR}/Buisness-1.jpg`}
            alt="Alarm.com for Business"
            width={280}
            height={53}
            className="h-9 w-auto md:h-10"
          />
          <p className="max-w-xl font-sans text-[0.875rem] leading-relaxed text-slate-500">
            CFAS is an authorized Alarm.com for Business dealer, the platform
            behind millions of protected properties, designed and serviced
            locally since 1968.
          </p>
        </div>
      </section>

    </div>
  );
}

/* Photographic bento card with gradient + overlaid content. */
function BentoCard({
  icon: Icon,
  title,
  body,
  children,
}: {
  icon: typeof Thermometer;
  title: string;
  body: string;
  children: ReactNode;
}) {
  return (
    <article className="group relative flex h-full min-h-[22rem] flex-col justify-end overflow-hidden rounded-sm bg-navy-deep">
      {children}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/40 to-transparent"
      />
      <div className="relative z-10 p-8">
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white">
          <Icon strokeWidth={1.4} className="h-4 w-4" />
        </span>
        <h3 className="mt-5 font-display text-[1.6rem] font-light leading-tight tracking-tight text-white">
          {title}
        </h3>
        <p className="mt-3 max-w-sm font-sans text-[0.9375rem] leading-relaxed text-white/70">
          {body}
        </p>
      </div>
    </article>
  );
}
