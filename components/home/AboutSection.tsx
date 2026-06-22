"use client";

import { useEffect, useRef } from "react";
import { BUSINESS } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const PILLARS = [
  { label: "Automation", body: "Lighting, climate, shades, and AV coordinated by one quiet logic." },
  { label: "Security", body: "Surveillance, access, and alarm systems designed for the property." },
  { label: "Fire & Life Safety", body: "Smoke, CO, and fire detection tied into alarm and monitoring." },
  { label: "Audio & Video", body: "Whole-house music, private cinema, and displays that disappear." },
  { label: "Lighting Control", body: "Tunable light that flatters the architecture and sets itself." },
  { label: "Networking", body: "Enterprise WiFi and wired backbone every smart home depends on." },
];

export function AboutSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Set playback rate once metadata is available (setting it before
    // loadedmetadata fires is silently ignored on mobile browsers).
    const applyRate = () => { video.playbackRate = 0.5; };
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

      {/* ── Left — text ───────────────────────────────────────────────── */}
      <div className="flex min-w-0 flex-col px-6 py-20 sm:px-8 md:w-1/2 md:justify-center md:px-10 md:py-12 lg:w-1/2 lg:justify-center lg:px-14 lg:py-16 xl:px-16">

        <div className="reveal-scroll">
          <h2 className="font-display text-[clamp(1.9rem,3.2vw,3rem)] font-light leading-[1.05] tracking-tight text-navy-deep md:text-[2.1rem] lg:text-[clamp(1.9rem,3.2vw,3rem)]">
            Central Florida&rsquo;s home integration partner since&nbsp;{BUSINESS.founded}.
          </h2>
        </div>

        <div className="reveal-scroll mt-5">
          <p className="max-w-md font-sans text-[14px] leading-relaxed text-slate-500">
            A division of {BUSINESS.parent}, we have spent more than fifty years
            working alongside builders and architects to bring the world&rsquo;s best
            automation and security systems into Central Florida&rsquo;s finest homes.
          </p>
          <Link
            href="/contact"
            className="mt-5 inline-flex items-center gap-2 font-sans text-[11px] uppercase tracking-wide2 text-navy transition-colors hover:text-navy-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/30"
          >
            Start a conversation
            <ArrowRight strokeWidth={1.25} className="h-3 w-3" />
          </Link>
        </div>

        {/* Capabilities */}
        <div className="mt-8 border-t border-slate-100 pt-7">
          <div className="grid grid-cols-2 gap-x-8 gap-y-5 md:grid-cols-1 md:gap-y-4 lg:grid-cols-2 lg:gap-y-5">
            {PILLARS.map((p, i) => (
              <div
                key={p.label}
                className="reveal-scroll group"
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <div className="flex items-baseline gap-2.5">
                  <span className="font-sans text-[9px] uppercase tracking-eyebrow text-navy/25">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-[15px] leading-snug text-navy-deep transition-colors duration-300 group-hover:text-navy">
                    {p.label}
                  </h3>
                </div>
                <p className="mt-1 pl-[1.6rem] font-sans text-[11px] leading-relaxed text-slate-400">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Association logos */}
        <div className="reveal-scroll mt-10 border-t border-slate-100 pt-8">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:flex-nowrap sm:gap-10 md:gap-5 lg:gap-6 xl:gap-10">
            <Image
              src="/images/GOBA.png"
              alt="Greater Orlando Builders Association"
              width={120}
              height={60}
              className="h-14 w-auto object-contain grayscale opacity-60 transition-all duration-300 hover:grayscale-0 hover:opacity-100 sm:h-16 md:h-11 lg:h-12 xl:h-16 2xl:h-20"
            />
            <span className="hidden h-12 w-px bg-slate-200 sm:block sm:h-16 md:h-10" />
            <Image
              src="/images/MCBC_Logo.jpg"
              alt="Master Custom Builder Council"
              width={200}
              height={60}
              className="h-14 w-auto object-contain grayscale opacity-60 transition-all duration-300 hover:grayscale-0 hover:opacity-100 sm:h-16 md:h-11 lg:h-12 xl:h-16 2xl:h-20"
            />
          </div>
        </div>

      </div>

      {/* ── Right — portrait video (full-width on mobile, side panel on tablet/desktop) */}
      <div className="relative flex h-[65vh] items-center justify-center overflow-hidden bg-navy-deep sm:h-[75vh] md:h-auto md:w-1/2 lg:h-auto lg:w-1/2">
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
            loop
            playsInline
            preload="auto"
            poster="/images/blinds-poster.jpg"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: "75% center" }}
          >
            <source src="/Blinds.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

    </section>
  );
}
