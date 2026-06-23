"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TESTIMONIALS } from "@/lib/content";

const INTERVAL = 3000;
const EASE = [0.16, 1, 0.3, 1] as const;

export function TestimonialsSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  // The first quote must be readable without waiting for the JS bundle, so we
  // render it at its final (visible) state on the server and only run the
  // fade transition once mounted, on subsequent slide changes.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const apply = () => setIsDesktop(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // Desktop video — /Mansion-drone.mp4
  useEffect(() => {
    if (!isDesktop) return;
    const video = videoRef.current;
    if (!video) return;

    const play = () => { const p = video.play(); if (p) p.catch(() => {}); };
    const onMeta = () => { video.playbackRate = 0.65; };
    video.addEventListener("loadedmetadata", onMeta);
    if (video.readyState >= 1) onMeta();

    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) play(); },
      { threshold: 0.01 }
    );
    io.observe(video);
    const onVisible = () => { if (!document.hidden) play(); };
    document.addEventListener("visibilitychange", onVisible);
    // No eager play() here: with preload="none" the clip stays off the wire
    // until the IntersectionObserver fires as the section scrolls into view,
    // so it never competes with the hero for bandwidth on first load.
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisible);
      video.removeEventListener("loadedmetadata", onMeta);
    };
  }, [isDesktop]);

  // Mobile video — /Phone-Hero.mp4
  useEffect(() => {
    if (isDesktop) return;
    const video = mobileVideoRef.current;
    if (!video) return;

    const play = () => { const p = video.play(); if (p) p.catch(() => {}); };
    const onMeta = () => { video.playbackRate = 0.65; };
    video.addEventListener("loadedmetadata", onMeta);
    if (video.readyState >= 1) onMeta();

    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) play(); },
      { threshold: 0.01 }
    );
    io.observe(video);
    const onVisible = () => { if (!document.hidden) play(); };
    document.addEventListener("visibilitychange", onVisible);
    // No eager play() here: with preload="none" the clip stays off the wire
    // until the IntersectionObserver fires as the section scrolls into view,
    // so it never competes with the hero for bandwidth on first load.
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisible);
      video.removeEventListener("loadedmetadata", onMeta);
    };
  }, [isDesktop]);

  const next = useCallback(() => {
    setActive((i) => (i + 1) % TESTIMONIALS.length);
  }, []);

  const prev = useCallback(() => {
    setActive((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setTimeout(next, INTERVAL);
    return () => clearTimeout(id);
  }, [active, paused, next]);

  return (
    <section
      className="relative isolate overflow-hidden bg-navy-deep"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Video background — mobile: Phone-Hero.mp4 */}
      {!isDesktop && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <video
            ref={mobileVideoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            className="absolute inset-0 h-full w-full object-cover object-center"
          >
            <source src="/Phone-Hero.mp4" type="video/mp4" />
          </video>
        </div>
      )}

      {/* Video background — desktop: Mansion-drone.mp4 */}
      {isDesktop && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/Mansion-drone.mp4" type="video/mp4" />
          </video>
        </div>
      )}

      {/* Overlays — slightly heavier than before for legibility over both videos */}
      <div aria-hidden="true" className="absolute inset-0 bg-navy-deep/60" />
      <div aria-hidden="true" className="absolute inset-0 bg-black/30" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20" />

      {/* Carousel */}
      <div className="relative z-10 flex min-h-[65vh] flex-col items-center justify-center px-8 py-16 text-center sm:px-12 sm:py-24 md:py-40 lg:px-32">

        {/* Side arrows — absolute, only on sm+ where they have room */}
        <button
          onClick={() => { prev(); setPaused(false); }}
          aria-label="Previous testimonial"
          className="absolute left-4 top-1/2 -translate-y-1/2 hidden h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/50 backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-white/10 hover:text-white lg:flex lg:left-8"
        >
          <ChevronLeft strokeWidth={1.5} className="h-5 w-5" />
        </button>
        <button
          onClick={() => { next(); setPaused(false); }}
          aria-label="Next testimonial"
          className="absolute right-4 top-1/2 -translate-y-1/2 hidden h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/50 backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-white/10 hover:text-white lg:flex lg:right-8"
        >
          <ChevronRight strokeWidth={1.5} className="h-5 w-5" />
        </button>

        <AnimatePresence mode="wait">
          <motion.figure
            key={active}
            initial={mounted ? { opacity: 0, y: 10 } : false}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="max-w-3xl"
          >
            <figcaption className="flex flex-col items-center gap-1">
              <p className="font-sans text-[17px] font-semibold tracking-wide text-white sm:text-[20px]">
                {TESTIMONIALS[active].name}
              </p>
              <p className="font-sans text-[11px] uppercase tracking-eyebrow text-white/40 sm:text-[14px]">
                {TESTIMONIALS[active].role}
              </p>
            </figcaption>

            <div className="mx-auto mt-5 h-px w-10 bg-white/20 sm:mt-6" />

            <blockquote className="mt-5 font-display text-[clamp(1.05rem,2.2vw,1.75rem)] font-light leading-[1.65] tracking-tight text-white/85 sm:mt-6 sm:text-[clamp(1.1rem,2.2vw,1.75rem)]">
              &ldquo;{TESTIMONIALS[active].quote}&rdquo;
            </blockquote>
          </motion.figure>
        </AnimatePresence>

        {/* Dots */}
        <div className="mt-8 flex items-center gap-2 sm:mt-14">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => { setActive(i); setPaused(false); }}
              aria-label={`Testimonial ${i + 1}`}
              className={`h-[4px] rounded-full transition-all duration-500 ease-out ${
                i === active
                  ? "w-7 bg-white"
                  : "w-[4px] bg-white/25 hover:bg-white/50"
              }`}
            />
          ))}
        </div>

        {/* Inline prev / next — mobile + tablet, shown below the dots */}
        <div className="mt-6 flex items-center gap-4 lg:hidden">
          <button
            onClick={() => { prev(); setPaused(false); }}
            aria-label="Previous testimonial"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/50 backdrop-blur-sm transition-all duration-200 active:border-white/40 active:bg-white/10 active:text-white"
          >
            <ChevronLeft strokeWidth={1.5} className="h-5 w-5" />
          </button>
          <button
            onClick={() => { next(); setPaused(false); }}
            aria-label="Next testimonial"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/50 backdrop-blur-sm transition-all duration-200 active:border-white/40 active:bg-white/10 active:text-white"
          >
            <ChevronRight strokeWidth={1.5} className="h-5 w-5" />
          </button>
        </div>

      </div>
    </section>
  );
}
