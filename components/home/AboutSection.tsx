"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Cpu, ShieldCheck, Tv, Lightbulb, Blinds, Wifi, Plus } from "lucide-react";

const CREED = ["Since 1968", "One Mission", "Quality"];

const PILLARS = [
  { icon: Cpu, label: "Automation", body: "Lighting, climate, and AV coordinated by one quiet logic." },
  { icon: ShieldCheck, label: "Security & Fire Safety", body: "Surveillance, access, and alarm joined with smoke, CO, and fire detection — monitored as one." },
  { icon: Tv, label: "Audio & Video", body: "Whole-house music, private cinema, and displays that disappear." },
  { icon: Lightbulb, label: "Lighting Control", body: "Tunable light that flatters the architecture and sets itself." },
  { icon: Blinds, label: "Motorized Shades", body: "Quiet shading that tracks the sun and tucks away for the view." },
  { icon: Wifi, label: "Networking", body: "Enterprise WiFi and the wired backbone every smart home depends on." },
];

export function AboutSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  // Which capability row is expanded — only one description shows at a time.
  const [openPillar, setOpenPillar] = useState<number | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Set playback rate once metadata is available (setting it before
    // loadedmetadata fires is silently ignored on mobile browsers).
    const applyRate = () => { video.playbackRate = 0.25; };
    video.addEventListener("loadedmetadata", applyRate);
    if (video.readyState >= 1) applyRate();

    // On mobile the video is below the fold and won't autoplay until the
    // user scrolls to it — watch for it entering the viewport and play then.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const p = video.play();
          if (p) p.catch(() => {});
        }
      },
      { threshold: 0.1 }
    );
    io.observe(video);

    return () => {
      io.disconnect();
      video.removeEventListener("loadedmetadata", applyRate);
    };
  }, []);

  return (
    <section className="relative flex min-h-[100dvh] flex-col bg-white shadow-[0_-20px_80px_rgba(0,0,0,0.25)] md:flex-row lg:flex-row">

      {/* ── Left — editorial mission ──────────────────────────────────── */}
      <div className="flex min-w-0 flex-col justify-center px-6 py-20 sm:px-8 md:w-[55%] md:px-10 md:py-16 lg:px-16 lg:py-20 xl:px-20">

        {/* Creed — the brand line, sitting just above the promise */}
        <div className="reveal-scroll flex flex-wrap items-center gap-x-5 gap-y-2 font-sans text-[12px] uppercase tracking-eyebrow text-navy/55">
          {CREED.map((word, i) => (
            <span key={word} className="flex items-center gap-x-5">
              {i > 0 && (
                <span aria-hidden className="h-1 w-1 rounded-full bg-navy/30" />
              )}
              {word}
            </span>
          ))}
        </div>

        {/* The promise — the centerpiece. Sized down and given room to breathe,
            with a quiet two-tone fall so the payoff lands without any bold. */}
        <blockquote className="reveal-scroll mt-6 max-w-xl">
          <p className="font-display text-[clamp(1.35rem,2.3vw,2.05rem)] leading-[1.45] tracking-[-0.005em] text-navy-deep">
            <span className="text-navy-deep/45">
              To be sure every client is so satisfied with our performance{" "}
            </span>
            that they would definitely do business with us again.
          </p>
        </blockquote>

        {/* Capabilities — a numbered serif ledger. Each row shows only its name;
            tapping it reveals the description and inks the row in. Open one at a
            time, accordion-style. */}
        <ul className="mt-10 border-t border-slate-100">
          {PILLARS.map((p, i) => {
            const Icon = p.icon;
            const isOpen = openPillar === i;
            return (
              <li
                key={p.label}
                className="reveal-scroll border-b border-slate-100"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <button
                  type="button"
                  onClick={() => setOpenPillar(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="group relative block w-full overflow-hidden text-left"
                >
                  {/* wash sweep — on hover, and held while open */}
                  <span
                    aria-hidden
                    className={`pointer-events-none absolute inset-0 bg-navy/[0.035] transition-transform duration-500 ease-out group-hover:translate-x-0 ${
                      isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
                  />
                  {/* left accent rule */}
                  <span
                    aria-hidden
                    className={`pointer-events-none absolute left-0 top-0 h-full w-[2px] origin-top bg-navy-deep transition-transform duration-500 ease-out group-hover:scale-y-100 ${
                      isOpen ? "scale-y-100" : "scale-y-0"
                    }`}
                  />

                  <div
                    className={`relative flex items-center gap-5 py-5 pr-3 transition-[padding] duration-500 ease-out group-hover:pl-6 ${
                      isOpen ? "pl-6" : "pl-4"
                    }`}
                  >
                    <span
                      className={`w-8 shrink-0 font-display text-[1.55rem] leading-none transition-colors duration-300 group-hover:text-navy-deep ${
                        isOpen ? "text-navy-deep" : "text-navy/20"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2.5">
                        <Icon
                          strokeWidth={1.5}
                          className={`h-[18px] w-[18px] shrink-0 transition-colors duration-300 group-hover:text-navy-deep ${
                            isOpen ? "text-navy-deep" : "text-navy/40"
                          }`}
                        />
                        <h3 className="font-display text-[16px] leading-snug text-navy-deep">
                          {p.label}
                        </h3>
                      </div>

                      {/* Description — collapsed to zero height until tapped. */}
                      <div
                        className={`grid overflow-hidden transition-all duration-500 ease-out ${
                          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <p className="min-h-0 pt-1.5 font-sans text-[12px] leading-relaxed text-slate-400">
                          {p.body}
                        </p>
                      </div>
                    </div>

                    {/* Toggle indicator — plus rotates into an × when open. */}
                    <Plus
                      aria-hidden
                      strokeWidth={1.5}
                      className={`h-4 w-4 shrink-0 self-start text-navy/35 transition-all duration-300 ease-out group-hover:text-navy-deep ${
                        isOpen ? "rotate-45 text-navy-deep" : ""
                      }`}
                    />
                  </div>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Association logos */}
        <div className="reveal-scroll mt-12 border-t border-slate-100 pt-8">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:flex-nowrap sm:gap-8 md:gap-5 lg:gap-6 xl:gap-8">
            <Image
              src="/images/GOBA.png"
              alt="Greater Orlando Builders Association"
              width={120}
              height={60}
              className="h-14 w-auto object-contain opacity-85 transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-105 hover:opacity-100 hover:drop-shadow-[0_8px_20px_rgba(10,26,82,0.18)] sm:h-16 md:h-12 lg:h-14 xl:h-16 2xl:h-20"
            />
            <span className="hidden h-12 w-px bg-slate-200 sm:block sm:h-16 md:h-10" />
            <Image
              src="/images/MCBC_Logo.jpg"
              alt="Master Custom Builder Council"
              width={200}
              height={60}
              className="h-14 w-auto object-contain opacity-85 transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-105 hover:opacity-100 hover:drop-shadow-[0_8px_20px_rgba(10,26,82,0.18)] sm:h-16 md:h-12 lg:h-14 xl:h-16 2xl:h-20"
            />
            <span className="hidden h-12 w-px bg-slate-200 sm:block sm:h-16 md:h-10" />
            <Image
              src="/images/Lutron-platinum.png"
              alt="Lutron Platinum Dealer 2026"
              width={200}
              height={184}
              className="h-16 w-auto object-contain opacity-90 transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-105 hover:opacity-100 hover:drop-shadow-[0_8px_20px_rgba(10,26,82,0.18)] sm:h-20 md:h-14 lg:h-16 xl:h-20 2xl:h-24"
            />
          </div>
        </div>

      </div>

      {/* ── Right — portrait video (full-width on mobile, side panel on tablet/desktop) */}
      <div className="relative flex h-[65vh] items-center justify-center overflow-hidden bg-navy-deep sm:h-[75vh] md:h-auto md:w-[45%] lg:h-auto lg:w-[45%]">
        <div className="grain absolute inset-0 opacity-30" />
        {/* Portrait 9:16 container centered within the right panel */}
        <div
          className="relative z-10 h-full overflow-hidden"
          style={{ width: "min(96%, calc(100dvh * 9 / 10))" }}
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            preload="auto"
            poster="/images/blinds-poster.jpg"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: "75% center" }}
          >
            <source src="/Blinds-loop.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

    </section>
  );
}
