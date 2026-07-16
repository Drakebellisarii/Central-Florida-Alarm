import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import {
  ShieldCheck,
  BadgeCheck,
  Flame,
  DoorOpen,
  PackageCheck,
  CalendarRange,
  Home as HomeIcon,
  ScanFace,
  Mic,
  LayoutGrid,
  Lock,
  Thermometer,
  Lightbulb,
  Wrench,
  Check,
} from "lucide-react";

import { buildMetadata } from "@/lib/seo";
import { NavSentinel } from "@/components/NavSentinel";
import { FirstProviderNote } from "@/components/FirstProviderNote";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { AmbientVideo } from "@/components/smart-home/AmbientVideo";

export const metadata: Metadata = buildMetadata({
  title: "Smart Home Security & Automation | Central Florida Automation Services",
  description:
    "One app for your home's security, cameras, locks, climate, and lighting. CFAS designs and installs intelligent Alarm.com systems built around how you live.",
  path: "/smart-home",
});

const DIR = "/Smart-Home";

const ECOSYSTEM = [
  {
    icon: ShieldCheck,
    title: "Always-On Protection",
    body: "Cellular backup keeps your system online even when power or internet drops, coverage that never rests on a single point of failure.",
  },
  {
    icon: BadgeCheck,
    title: "Professionally Monitored",
    body: "A dedicated monitoring station watches over your home 24/7, with trained operators ready to dispatch the moment an event is verified.",
  },
  {
    icon: Flame,
    title: "Fire & Carbon Monoxide",
    body: "Life-safety sensors live on the same platform as your security, one unified system protecting the people inside, not just the doors.",
  },
];

type Daily = {
  kind: "photo" | "app";
  eyebrow: string;
  title: string;
  body: string;
  image: string;
  alt: string;
  icon: typeof DoorOpen;
};

const DAILY: Daily[] = [
  {
    kind: "app",
    eyebrow: "Simplify your routine",
    title: "One tap sets the whole scene.",
    body: "Build moments like Home, Away, and Sleep that quietly adjust lighting, climate, shades, and arming together, your home anticipating you instead of waiting on you.",
    image: `${DIR}/Smart-Home8.webp`,
    alt: "The app home screen showing Home, Away, Sleep, and Wake Up scenes",
    icon: CalendarRange,
  },
  {
    kind: "photo",
    eyebrow: "Stay one step ahead",
    title: "Answer the door from anywhere.",
    body: "See who's there, speak with them, and unlock from your phone, whether you're upstairs or three time zones away. Deliveries handled, guests welcomed.",
    image: `${DIR}/Smart-Home5.jpg`,
    alt: "A delivery driver waving at a smart video doorbell",
    icon: DoorOpen,
  },
  {
    kind: "photo",
    eyebrow: "Always in the loop",
    title: "Know the moment you walk in.",
    body: "Arrivals, open doors, unexpected motion: a glance tells you what's happening at home, and a tap sets it right from wherever you are.",
    image: `${DIR}/Smart-Home6.jpg`,
    alt: "A woman arriving home as an indoor camera watches the entry",
    icon: HomeIcon,
  },
  {
    kind: "photo",
    eyebrow: "Nothing slips by",
    title: "Nothing left on the porch.",
    body: "Smart package detection flags a drop-off the instant it lands, so a delivery is something you greet, not something you discover hours later.",
    image: `${DIR}/Smart-Home3.jpg`,
    alt: "A delivery of packages left at a monitored front door",
    icon: PackageCheck,
  },
];

const VIDEO_CAPS = [
  {
    icon: ScanFace,
    title: "Knows people from pets",
    body: "AI analytics tell people from animals, vehicles, and packages, so an alert always means something worth a look.",
  },
  {
    icon: DoorOpen,
    title: "Open the door, one press",
    body: "See a visitor and let them in from the same live view, no second app, no second device.",
  },
  {
    icon: Mic,
    title: "Two-way conversation",
    body: "Speak and listen through your cameras, from the doorstep to the nursery, wherever you are.",
  },
  {
    icon: LayoutGrid,
    title: "Everything at a glance",
    body: "Clear status across every device and room, the whole home readable in a single, calm view.",
  },
];

export default function SmartHomePage() {
  return (
    <div className="bg-white">
      {/* ============================== HERO ============================== */}
      <section className="relative isolate flex min-h-[92vh] flex-col justify-end overflow-hidden bg-navy-deep">
        <NavSentinel />

        <div aria-hidden className="absolute inset-0 overflow-hidden">
          <video
            className="sh-parallax h-full w-full object-cover opacity-40"
            poster={`${DIR}/hero-poster.jpg`}
            autoPlay
            muted
            playsInline
            preload="auto"
          >
            <source src="/CFAS.mp4" type="video/mp4" />
          </video>
        </div>
        <div aria-hidden className="absolute inset-0 bg-navy-deep/55" />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_0%,transparent_35%,rgba(10,26,82,0.6)_100%)]"
        />
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
                { name: "Smart Home", path: "/smart-home" },
              ]}
            />
          </div>

          <FirstProviderNote className="reveal-load rd-1 mt-10" />

          <h1 className="reveal-load rd-2 mt-6 max-w-4xl font-hero font-light leading-[1.04] tracking-tight">
            <span className="block text-[clamp(2.4rem,6.4vw,5.3rem)] text-white">
              Security, comfort,
            </span>
            <span className="block text-[clamp(2.4rem,6.4vw,5.3rem)] text-white">
              and control,
            </span>
            <span className="block text-[clamp(2.4rem,6.4vw,5.3rem)] text-white">
              in one easy to use app.
            </span>
          </h1>

          <div className="reveal-load rd-3 mt-8 h-px w-24 bg-white/35" />

          <p className="reveal-load rd-3 mt-7 max-w-2xl font-sans text-[1.0625rem] leading-relaxed text-white/75">
            One platform for your home&apos;s security, cameras, locks,
            lighting, and climate. Designed and installed by CFAS
            Craftspeople, Central Florida&apos;s first Alarm.com provider.
          </p>
        </div>
      </section>

      {/* ========================= SECURITY ECOSYSTEM ===================== */}
      <section id="security" className="scroll-mt-24 bg-white py-24 md:py-32">
        <div className="mx-auto max-w-[93.75rem] px-5 sm:px-8 md:px-11">
          <div className="grid grid-cols-1 items-end gap-12 lg:grid-cols-12">
            <div className="sh-rise lg:col-span-7">
              <Eyebrow>Your home security ecosystem</Eyebrow>
              <h2 className="mt-6 max-w-2xl font-display text-[clamp(2rem,4vw,3.4rem)] font-light leading-[1.06] tracking-tight text-navy-deep">
                One platform, instead of a drawer full of apps.
              </h2>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-navy-deep/[0.04]">
                <Image
                  src={`${DIR}/Smart-Home4.jpg`}
                  alt="A family relaxing at home with an indoor camera on the shelf"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="sh-curtain object-cover"
                />
              </div>
            </div>

            <div className="flex flex-col justify-center lg:col-span-6">
              {ECOSYSTEM.map((f, i) => (
                <Reveal key={f.title} index={i}>
                  <div className="flex gap-6 border-t border-slate-200/80 py-7 first:border-t-0 first:pt-0">
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
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================ DAILY LIFE ========================== */}
      <section
        id="daily"
        className="scroll-mt-24 border-t border-slate-200/70 bg-white py-24 md:py-32"
      >
        <div className="mx-auto grid max-w-[93.75rem] grid-cols-1 gap-16 px-5 sm:px-8 md:px-11 lg:grid-cols-12 lg:gap-x-20">
          <div className="lg:col-span-4">
            <div className="sh-rise lg:sticky lg:top-28">
              <h2 className="mt-6 font-display text-[clamp(2rem,3.6vw,3.2rem)] font-light leading-[1.06] tracking-tight text-navy-deep">
                The best technology is the kind you stop noticing.
              </h2>
              <p className="mt-6 max-w-xs font-sans text-[0.9375rem] leading-relaxed text-slate-500">
                Four ways the system quietly earns its place in your day.
                Scroll through.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-24 md:gap-32 lg:col-span-8">
            {DAILY.map((d, i) => {
              const flip = i % 2 === 1;
              return (
                <div
                  key={d.title}
                  className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12"
                >
                  <div className={`relative ${flip ? "md:order-2" : ""}`}>
                    {d.kind === "app" ? (
                      // Device cutout baked onto white — blends seamlessly into
                      // this white section. No CSS shadow: the image is opaque,
                      // so a drop-shadow would outline its full rectangle.
                      <div className="mx-auto w-[72%] max-w-[17rem] sm:w-[78%]">
                        <div className="sh-curtain relative aspect-[620/1268]">
                          <Image
                            src={d.image}
                            alt={d.alt}
                            fill
                            sizes="(min-width: 1920px) 608px, 304px"
                            className="object-contain"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="relative aspect-[5/4] overflow-hidden rounded-sm bg-navy-deep/[0.04]">
                        <Image
                          src={d.image}
                          alt={d.alt}
                          fill
                          sizes="(max-width: 1024px) 100vw, 40vw"
                          className="sh-curtain object-cover"
                        />
                      </div>
                    )}
                  </div>

                  <div className={`sh-rise ${flip ? "md:order-1" : ""}`}>
                    <span className="inline-flex items-center gap-3 font-sans text-[0.6875rem] uppercase tracking-eyebrow text-navy/70">
                      <d.icon strokeWidth={1.4} className="h-4 w-4" />
                      {d.eyebrow}
                    </span>
                    <h3 className="mt-5 max-w-md font-display text-[clamp(1.6rem,2.6vw,2.3rem)] font-light leading-[1.1] tracking-tight text-navy-deep">
                      {d.title}
                    </h3>
                    <p className="mt-5 max-w-md font-sans text-[1rem] leading-relaxed text-slate-600">
                      {d.body}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================= VIDEO MONITORING ======================= */}
      <section id="video" className="scroll-mt-24 bg-navy-deep py-24 md:py-32">
        <div className="mx-auto max-w-[93.75rem] px-5 sm:px-8 md:px-11">
          <div className="sh-rise">
            <h2 className="mt-6 max-w-2xl font-display text-[clamp(2rem,4vw,3.4rem)] font-light leading-[1.06] tracking-tight text-white">
              Not just recording. Understanding what it sees.
            </h2>
          </div>

          {/* Day / night showcase */}
          <Reveal className="mt-16">
            <div className="grid grid-cols-1 overflow-hidden rounded-sm border border-white/10 md:grid-cols-2">
              {[
                {
                  img: `${DIR}/Smart-Home9.jpg`,
                  label: "By day",
                  copy: "Crisp, true-color detail",
                  alt: "A bright kitchen watched over by a discreet smart camera",
                },
                {
                  img: `${DIR}/Smart-Home10.jpg`,
                  label: "After dark",
                  copy: "Clear night vision",
                  alt: "The same kitchen at night, the camera quietly illuminated",
                },
              ].map((s, i) => (
                <div
                  key={s.label}
                  className={`group relative aspect-[16/10] overflow-hidden ${
                    i === 0 ? "md:border-r md:border-white/10" : ""
                  }`}
                >
                  <Image
                    src={s.img}
                    alt={s.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-[1.2s] ease-expo group-hover:scale-[1.04]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 to-transparent"
                  />
                  <div className="absolute bottom-0 left-0 p-7">
                    <span className="font-sans text-[0.6875rem] uppercase tracking-eyebrow text-white/60">
                      {s.label}
                    </span>
                    <p className="mt-1 font-display text-[1.5rem] font-light tracking-tight text-white">
                      {s.copy}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Saved-clips app + capability list */}
          <div className="mt-16 grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              {/* Transparent device cutout — floats on the dark section with a
                  soft cast shadow following the phone's silhouette. */}
              <div className="mx-auto w-[66%] max-w-[18rem] lg:w-[84%]">
                <div className="relative aspect-[677/1380]">
                  <Image
                    src={`${DIR}/Smart-Home7.webp`}
                    alt="The app's saved clips, each tagged by room and what triggered it"
                    fill
                    sizes="(min-width: 1920px) 640px, 320px"
                    className="object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.55)]"
                  />
                </div>
              </div>
            </Reveal>

            <div className="lg:col-span-7">
              <Reveal>
                <h3 className="font-display text-[clamp(1.6rem,2.6vw,2.3rem)] font-light leading-tight tracking-tight text-white">
                  Find the moment in seconds.
                </h3>
                <p className="mt-4 max-w-lg font-sans text-[1rem] leading-relaxed text-white/60">
                  Clips arrive tagged by room and by what set them off: person,
                  pet, vehicle, package. No scrubbing through hours of footage to
                  find the ten seconds that matter.
                </p>
              </Reveal>
              <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-white/10 sm:grid-cols-2">
                {VIDEO_CAPS.map((v, i) => (
                  <Reveal key={v.title} index={i % 2}>
                    <div className="group h-full bg-white/[0.02] p-7 transition-colors duration-500 hover:bg-white/[0.06]">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors duration-500 group-hover:border-white/40 group-hover:text-white">
                        <v.icon strokeWidth={1.3} className="h-5 w-5" />
                      </span>
                      <h4 className="mt-5 font-display text-[1.2rem] font-light leading-snug tracking-tight text-white">
                        {v.title}
                      </h4>
                      <p className="mt-2 font-sans text-[0.875rem] leading-relaxed text-white/55">
                        {v.body}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================= HOME MANAGEMENT ======================== */}
      <section id="management" className="scroll-mt-24 bg-white py-24 md:py-32">
        <div className="mx-auto max-w-[93.75rem] px-5 sm:px-8 md:px-11">
          <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
            <div className="sh-rise lg:col-span-7">
              <h2 className="mt-6 max-w-2xl font-display text-[clamp(2rem,4vw,3.4rem)] font-light leading-[1.06] tracking-tight text-navy-deep">
                It says alarm. It does so much more.
              </h2>
            </div>
            <Reveal index={1} className="lg:col-span-5">
              <p className="font-sans text-[1rem] leading-relaxed text-slate-600">
                The same platform that guards your home runs its lighting,
                shades, climate, and audio, every comfort and safeguard,
                managed from one place.
              </p>
            </Reveal>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {/* Locks — photo */}
            <Reveal>
              <ManagementCard
                icon={Lock}
                title="Doors & Garage Locks"
                body="Lock up from bed, let in a guest from the office, and see exactly who came and went."
              >
                <Image
                  src={`${DIR}/Smart-Home.jpg`}
                  alt="A finger pressing a smart video doorbell beside a keyless lock"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover opacity-75 transition-transform duration-[1.2s] ease-expo group-hover:scale-[1.05]"
                />
              </ManagementCard>
            </Reveal>

            {/* Climate — ambient video */}
            <Reveal index={1}>
              <ManagementCard
                icon={Thermometer}
                title="Temperature Control"
                body="Intelligent, preference-based climate that learns your patterns and trims the energy you'd waste."
              >
                <AmbientVideo
                  src={`${DIR}/amb-kitchen.mp4`}
                  poster={`${DIR}/amb-kitchen-poster.jpg`}
                  posterAlt="A couple enjoying coffee in a connected kitchen"
                  className="absolute inset-0 h-full w-full object-cover opacity-75 transition-transform duration-[1.2s] ease-expo group-hover:scale-[1.05]"
                />
              </ManagementCard>
            </Reveal>

            {/* Lighting — ambient video */}
            <Reveal index={2}>
              <ManagementCard
                icon={Lightbulb}
                title="Lighting & Shading"
                body="Motorized shades and lighting that follow the sun, set the mood, and make an empty house look lived-in."
              >
                <AmbientVideo
                  src={`${DIR}/amb-entry.mp4`}
                  poster={`${DIR}/amb-entry-poster.jpg`}
                  posterAlt="Light filling a modern entryway as someone arrives home"
                  className="absolute inset-0 h-full w-full object-cover opacity-75 transition-transform duration-[1.2s] ease-expo group-hover:scale-[1.05]"
                />
              </ManagementCard>
            </Reveal>

            {/* Professional install — wide photo */}
            <Reveal className="sm:col-span-2 lg:col-span-2">
              <ManagementCard
                icon={Wrench}
                title="Professionally Installed"
                body="Our technicians design, mount, and tune every device so the system disappears into the home, and simply works."
                wide
              >
                <Image
                  src={`${DIR}/Smart-Home11.jpg`}
                  alt="A CFAS technician installing a ceiling camera in a living room"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 66vw"
                  className="object-cover opacity-75 transition-transform duration-[1.2s] ease-expo group-hover:scale-[1.05]"
                />
              </ManagementCard>
            </Reveal>

            {/* Fire & CO — solid blue text card */}
            <Reveal index={1}>
              <article className="flex h-full min-h-[22rem] flex-col justify-between rounded-sm bg-navy-deep p-8">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white">
                  <Flame strokeWidth={1.4} className="h-4 w-4" />
                </span>
                <div>
                  <h3 className="font-display text-[1.6rem] font-light leading-tight tracking-tight text-white">
                    Fire & Carbon Monoxide
                  </h3>
                  <p className="mt-3 font-sans text-[0.9375rem] leading-relaxed text-white/70">
                    The instant a fire or CO alarm triggers, the system can pause
                    your HVAC to stop circulating smoke, life-safety acting on
                    its own, the moment it counts.
                  </p>
                  <ul className="mt-6 space-y-2.5">
                    {[
                      "Integrated smoke & CO detection",
                      "Automatic HVAC shutoff",
                      "Instant monitored dispatch",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-3 font-sans text-[0.875rem] text-white/70"
                      >
                        <Check
                          strokeWidth={2}
                          className="h-4 w-4 shrink-0 text-white"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

    </div>
  );
}

/* Photographic / video bento card with gradient + overlaid content. */
function ManagementCard({
  icon: Icon,
  title,
  body,
  wide = false,
  children,
}: {
  icon: typeof Lock;
  title: string;
  body: string;
  wide?: boolean;
  children: ReactNode;
}) {
  return (
    <article
      className={`group relative flex h-full min-h-[22rem] flex-col justify-end overflow-hidden rounded-sm bg-navy-deep ${
        wide ? "sm:col-span-2 lg:col-span-2" : ""
      }`}
    >
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
