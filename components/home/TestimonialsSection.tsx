"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { TESTIMONIALS } from "@/lib/content";

export function TestimonialsSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  // The brand film is a desktop-only treatment. On phones we render a bespoke
  // brand-navy field with glass quote plates instead, so we skip rendering
  // (and downloading) the video below the md breakpoint entirely.
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const apply = () => setIsDesktop(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // Browsers de-prioritize muted background video — they delay starting it,
  // pause it offscreen, and stall it when the tab loses focus. Explicitly
  // drive playback so it keeps running whenever the section is on screen.
  useEffect(() => {
    if (!isDesktop) return;
    const video = videoRef.current;
    if (!video) return;

    const play = () => {
      const p = video.play();
      if (p) p.catch(() => {});
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) play();
      },
      { threshold: 0.01 }
    );
    io.observe(video);

    const onVisible = () => {
      if (!document.hidden) play();
    };
    document.addEventListener("visibilitychange", onVisible);

    play();

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [isDesktop]);

  return (
    <section className="relative isolate overflow-hidden border-t border-navy-logo/20 md:border-white/10 md:bg-navy-deep">
      {/* ───────────── Mobile: clean brand-navy gradient ───────────── */}
      <div aria-hidden="true" className="absolute inset-0 md:hidden">
        <div className="absolute inset-0 bg-[linear-gradient(165deg,#16348F_0%,#122C82_45%,#0A1A52_100%)]" />
      </div>

      {/* ── Desktop: brand film background (skipped entirely on mobile) ─────── */}
      {isDesktop && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/images/cfas-poster.jpg"
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/CFAS.mp4" type="video/mp4" />
          </video>
        </div>
      )}

      {/* ── Color grade — desktop only, keeps the copy and cards legible ───── */}
      <div aria-hidden="true" className="absolute inset-0 hidden bg-navy-deep/75 md:block" />
      <div aria-hidden="true" className="absolute inset-0 hidden bg-black/35 md:block" />
      <div aria-hidden="true" className="absolute inset-0 hidden bg-navy-logo/15 md:block" />

      {/* ════════════════ Mobile content — clean glass quote plates ══════════ */}
      <div className="relative z-10 px-5 py-20 sm:px-8 md:hidden">
        <Reveal>
          <h2 className="font-display text-[clamp(2rem,8vw,2.7rem)] font-light leading-[1.1] tracking-tight text-white">
            The builders and architects who hand us their most demanding homes.
          </h2>
        </Reveal>

        <div className="mt-12 space-y-5">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} index={i}>
              <figure className="rounded-2xl border border-white/[0.12] bg-white/[0.05] p-7 backdrop-blur-md">
                <span
                  aria-hidden="true"
                  className="block font-display text-[2.75rem] leading-none text-white/25"
                >
                  &ldquo;
                </span>
                <blockquote className="mt-2 font-display text-[18px] font-light leading-[1.55] text-white/85">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 border-t border-white/10 pt-5">
                  <p className="font-sans text-[14px] font-semibold tracking-wide text-white">
                    {t.name}
                  </p>
                  <p className="mt-1 font-sans text-[11px] uppercase tracking-wide2 text-white/45">
                    {t.role}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ════════════════ Desktop content — unchanged film treatment ═════════ */}
      <div className="relative z-10 mx-auto hidden max-w-[1500px] px-5 py-24 sm:px-8 md:block md:px-11 md:py-36">
        <Reveal>
          <h2 className="max-w-3xl font-display text-[clamp(2rem,3.6vw,3rem)] font-light leading-[1.08] tracking-tight text-white">
            The builders and architects who hand us their most demanding homes.
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-white/10 bg-white/10 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal
              key={t.name}
              index={i}
              className="flex flex-col justify-between bg-navy-deep/40 p-8 backdrop-blur-md md:p-10"
            >
              <div>
                <span
                  aria-hidden="true"
                  className="block font-display text-5xl leading-none text-white/25"
                >
                  &ldquo;
                </span>
                <blockquote className="mt-5 font-display text-[18px] font-light leading-[1.55] text-white/80 md:text-[19px]">
                  {t.quote}
                </blockquote>
              </div>
              <figcaption className="mt-9 border-t border-white/15 pt-6">
                <p className="font-sans text-[14px] font-semibold tracking-wide text-white">
                  {t.name}
                </p>
                <p className="mt-1 font-sans text-[12px] uppercase tracking-wide2 text-white/50">
                  {t.role}
                </p>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
