"use client";

import { useEffect, useRef } from "react";
import { Reveal } from "@/components/Reveal";
import { TESTIMONIALS } from "@/lib/content";

export function TestimonialsSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Browsers de-prioritize muted background video — they delay starting it,
  // pause it offscreen, and stall it when the tab loses focus. Explicitly
  // drive playback so it keeps running whenever the section is on screen.
  useEffect(() => {
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
  }, []);

  return (
    <section className="relative isolate overflow-hidden border-t border-white/10 bg-navy-deep">
      {/* ── Brand film background ───────────────────────────────────── */}
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

      {/* ── Color grade — keeps the copy and cards legible ──────────── */}
      <div aria-hidden="true" className="absolute inset-0 bg-navy-deep/75" />
      <div aria-hidden="true" className="absolute inset-0 bg-black/35" />
      <div aria-hidden="true" className="absolute inset-0 bg-navy-logo/15" />

      <div className="relative z-10 mx-auto max-w-[1500px] px-5 py-24 sm:px-8 md:px-11 md:py-36">
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
