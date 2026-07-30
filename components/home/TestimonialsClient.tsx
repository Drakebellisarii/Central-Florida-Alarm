"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { GoogleReviewsData } from "@/lib/googleReviews";
import { GoogleG, Stars } from "@/components/GoogleReviewIcons";

const INTERVAL = 7000;
const EASE = [0.16, 1, 0.3, 1] as const;

// Most Google reviews are a sentence or two — show those in full, no click
// required. Only the rare outlier past this length gets cut, at a word
// boundary with a plain ellipsis, so it never demands an interaction just
// to read a normal-length quote.
const MAX_QUOTE_CHARS = 320;
function truncateQuote(text: string, max = MAX_QUOTE_CHARS) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : max)}…`;
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

  const goTo = useCallback((i: number) => {
    setActive(i);
    setPaused(false);
  }, []);

  useEffect(() => {
    if (paused || featuredReviews.length < 2) return;
    const id = setTimeout(next, INTERVAL);
    return () => clearTimeout(id);
  }, [active, paused, next, featuredReviews.length]);

  const activeReview = featuredReviews[active];

  return (
    <section
      className="relative isolate flex min-h-[40rem] flex-col items-center justify-center overflow-hidden bg-navy-deep md:min-h-[46rem]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Footage — full-bleed, real photography, exactly as it was ──── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {!isDesktop && (
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
        )}
        {isDesktop && (
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
        )}
      </div>

      {/* ── A single, even tint plus a soft edge vignette — subtle color
          grading rather than a directional UI scrim, since the copy is
          now centered instead of anchored to one corner. ──────────────── */}
      <div aria-hidden="true" className="absolute inset-0 bg-navy-deep/40" />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 75% 65% at 50% 50%, transparent 0%, rgba(5,12,40,0.18) 60%, rgba(5,12,40,0.48) 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/30 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/35 to-transparent"
      />

      {/* ── Copy — centered, on the scene ────────────────────────── */}
      <div className="relative z-10 mx-auto w-full max-w-[93.75rem] px-5 py-16 text-center sm:px-8 md:px-11">
        <div className="mx-auto max-w-2xl">
          <p className="font-sans text-[0.6875rem] uppercase tracking-eyebrow text-white/50">
            Client Trust
          </p>

          {/* Google Business Profile — the credibility signal, centered up top. */}
          {reviews && (
            <div className="mt-5 flex items-center justify-center gap-3.5">
              <GoogleG className="h-8 w-8 shrink-0" />
              <div className="flex items-baseline gap-2.5">
                <span className="font-numeral text-[2.25rem] font-light leading-none text-white">
                  {reviews.rating.toFixed(1)}
                </span>
                <Stars rating={reviews.rating} size="h-3.5 w-3.5" emptyClassName="fill-white/15" />
              </div>
            </div>
          )}
          {reviews && (
            <p className="mt-2 font-sans text-[0.8125rem] text-white/55">
              {reviews.totalReviews.toLocaleString()} Google reviews
              {viewHref && (
                <>
                  {" "}&middot;{" "}
                  <a
                    href={viewHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 underline decoration-white/25 underline-offset-4 transition-colors hover:text-white hover:decoration-white/60"
                  >
                    View all
                  </a>
                </>
              )}
              {writeHref && (
                <>
                  {" "}&middot;{" "}
                  <a
                    href={writeHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 underline decoration-white/25 underline-offset-4 transition-colors hover:text-white hover:decoration-white/60"
                  >
                    Leave a review
                  </a>
                </>
              )}
            </p>
          )}

          {activeReview && (
            <>
              <div aria-hidden className="mx-auto mt-8 h-px w-12 bg-white/25" />

              {/* Editorial pull-quote, set directly on the scene — a real
                  serif quotation mark for texture, not card chrome. */}
              <div className="relative mt-8 min-h-[9rem]">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 -top-8 -translate-x-1/2 select-none font-display text-[4.5rem] leading-none text-white/[0.14]"
                >
                  &ldquo;
                </span>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={mounted ? { opacity: 0, y: 8 } : false}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.45, ease: EASE }}
                  >
                    <blockquote className="relative mx-auto max-w-xl font-display text-[clamp(1.3rem,2.6vw,1.75rem)] font-light leading-[1.45] tracking-tight text-white">
                      {truncateQuote(activeReview.text)}
                    </blockquote>

                    <figcaption className="relative mt-5 flex items-baseline justify-center gap-2.5">
                      <span className="font-sans text-[0.875rem] tracking-wide text-white">
                        {activeReview.authorName}
                      </span>
                      <span className="font-sans text-[0.625rem] uppercase tracking-eyebrow text-white/40">
                        {activeReview.relativeTime}
                      </span>
                    </figcaption>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Pagination — thin dots, not app-style buttons; arrows are
                  quiet affordances either side. */}
              {featuredReviews.length > 1 && (
                <div className="mt-8 flex items-center justify-center gap-5">
                  <button
                    onClick={prev}
                    aria-label="Previous review"
                    className="text-white/35 transition-colors duration-300 hover:text-white"
                  >
                    <ChevronLeft strokeWidth={1.5} className="h-4 w-4" />
                  </button>
                  <div className="flex items-center gap-2">
                    {featuredReviews.map((r, i) => (
                      <button
                        key={r.authorName}
                        onClick={() => goTo(i)}
                        aria-label={`Show review ${i + 1} of ${featuredReviews.length}`}
                        aria-current={i === active}
                        className="p-1"
                      >
                        <span
                          className={`block h-1.5 rounded-full transition-all duration-300 ${
                            i === active ? "w-5 bg-white" : "w-1.5 bg-white/30"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={next}
                    aria-label="Next review"
                    className="text-white/35 transition-colors duration-300 hover:text-white"
                  >
                    <ChevronRight strokeWidth={1.5} className="h-4 w-4" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
