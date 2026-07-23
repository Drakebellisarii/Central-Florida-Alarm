"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { GoogleReviewsData } from "@/lib/googleReviews";
import { GoogleG, Stars } from "@/components/GoogleReviewIcons";

const INTERVAL = 7000;
const EASE = [0.16, 1, 0.3, 1] as const;

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function TestimonialsClient({
  reviews,
  writeHref,
  viewHref,
}: {
  reviews: GoogleReviewsData | null;
  writeHref?: string;
  viewHref?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  // The first review must be readable without waiting for the JS bundle, so
  // it renders at its final (visible) state on the server and only fades
  // on subsequent slide changes once mounted.
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
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisible);
      video.removeEventListener("loadedmetadata", onMeta);
    };
  }, [isDesktop]);

  // The Places API caps out at 5 reviews; feature the strongest, one per
  // author, shortest-first tiebreak so the rotating quote stays a
  // consistent length.
  const featuredReviews = reviews
    ? [...reviews.reviews]
        .sort((a, b) => b.rating - a.rating || a.text.length - b.text.length)
        .filter((r, i, arr) => arr.findIndex((o) => o.authorName === r.authorName) === i)
        .slice(0, 5)
    : [];

  const next = useCallback(() => {
    setActive((i) => (i + 1) % Math.max(featuredReviews.length, 1));
  }, [featuredReviews.length]);

  const prev = useCallback(() => {
    setActive((i) => (i - 1 + featuredReviews.length) % Math.max(featuredReviews.length, 1));
  }, [featuredReviews.length]);

  useEffect(() => {
    if (paused || featuredReviews.length < 2) return;
    const id = setTimeout(next, INTERVAL);
    return () => clearTimeout(id);
  }, [active, paused, next, featuredReviews.length]);

  const activeReview = featuredReviews[active];

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

      <div className="relative z-10 mx-auto flex max-w-[75rem] flex-col items-center px-6 py-16 text-center sm:px-10 sm:py-20 md:py-24 lg:px-16">

        <p className="font-sans text-[0.6875rem] uppercase tracking-eyebrow text-white/45">
          Client Trust
        </p>

        {/* Google Business Profile — the first thing read in this section,
            sized like a masthead figure rather than a footnote badge. */}
        {reviews && (
          <div className="mt-5 flex flex-col items-center gap-3">
            <div className="flex items-center gap-3.5 sm:gap-4">
              <GoogleG className="h-8 w-8 shrink-0 sm:h-9 sm:w-9" />
              <span className="font-numeral text-[2.75rem] font-light leading-none text-white sm:text-[3.25rem]">
                {reviews.rating.toFixed(1)}
              </span>
            </div>
            <Stars rating={reviews.rating} size="h-4 w-4 sm:h-[1.125rem] sm:w-[1.125rem]" />
            <span className="font-sans text-[0.875rem] text-white/55">
              {reviews.totalReviews.toLocaleString()} Google reviews
            </span>

            {(writeHref || viewHref) && (
              <div className="mt-1 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-sans text-[0.6875rem] uppercase tracking-wide2">
                {writeHref && (
                  <a
                    href={writeHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/50 underline decoration-white/25 underline-offset-4 transition-colors duration-300 hover:text-white hover:decoration-white/60"
                  >
                    Leave a review
                  </a>
                )}
                {viewHref && (
                  <a
                    href={viewHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/50 underline decoration-white/25 underline-offset-4 transition-colors duration-300 hover:text-white hover:decoration-white/60"
                  >
                    View all reviews
                  </a>
                )}
              </div>
            )}
          </div>
        )}

        {activeReview && (
          <>
            <div aria-hidden className="mt-10 h-px w-16 bg-gradient-to-r from-transparent via-white/20 to-transparent sm:mt-12" />

            {/* Editorial pull-quote — no card, no chrome, set directly on
                the scene like a magazine spread. */}
            <div className="relative mt-10 max-w-4xl sm:mt-12">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-11 left-1/2 -translate-x-1/2 select-none font-display text-[4.25rem] leading-none text-white/[0.09] sm:-top-12 sm:text-[5.5rem]"
              >
                &ldquo;
              </span>

              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={mounted ? { opacity: 0, y: 10 } : false}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.6, ease: EASE }}
                >
                  <blockquote className="font-display text-[clamp(1.0625rem,2vw,1.5rem)] font-light leading-[1.55] tracking-tight text-white">
                    {activeReview.text}
                  </blockquote>

                  <figcaption className="mt-6 flex flex-col items-center gap-2.5">
                    <span aria-hidden className="h-px w-8 bg-white/25" />
                    <span className="font-sans text-[0.8125rem] tracking-wide text-white">
                      {activeReview.authorName}
                    </span>
                    <span className="font-sans text-[0.625rem] uppercase tracking-eyebrow text-white/40">
                      Google Review &middot; {activeReview.relativeTime}
                    </span>
                  </figcaption>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Pagination — a magazine folio marker, not app-style dots. */}
            {featuredReviews.length > 1 && (
              <div className="mt-8 flex items-center gap-6 sm:mt-9">
                <button
                  onClick={() => { prev(); setPaused(false); }}
                  aria-label="Previous review"
                  className="text-white/35 transition-colors duration-300 hover:text-white"
                >
                  <ChevronLeft strokeWidth={1.25} className="h-4 w-4" />
                </button>
                <span className="font-sans text-[0.75rem] tabular-nums tracking-[0.15em] text-white/40">
                  <span className="text-white">{pad(active + 1)}</span>
                  <span className="mx-2 text-white/25">&mdash;</span>
                  {pad(featuredReviews.length)}
                </span>
                <button
                  onClick={() => { next(); setPaused(false); }}
                  aria-label="Next review"
                  className="text-white/35 transition-colors duration-300 hover:text-white"
                >
                  <ChevronRight strokeWidth={1.25} className="h-4 w-4" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
