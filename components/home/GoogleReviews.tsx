"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { GoogleReviewsData } from "@/lib/googleReviews";
import { GoogleG, Stars } from "@/components/GoogleReviewIcons";

const INTERVAL = 7000;
const EASE = [0.16, 1, 0.3, 1] as const;

// Most Google reviews are a sentence or two — show those in full. A long
// outlier is cut at the last complete sentence that fits, so every quote
// ends on a period and reads as a finished statement rather than trailing
// off in an ellipsis. Word-boundary + ellipsis only as a last resort for a
// review written as one giant run-on sentence.
const MAX_QUOTE_CHARS = 300;
const MIN_SENTENCE_CUT = 90;
function truncateQuote(text: string, max = MAX_QUOTE_CHARS) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const sentenceEnd = Math.max(
    cut.lastIndexOf(". "),
    cut.lastIndexOf("! "),
    cut.lastIndexOf("? ")
  );
  if (sentenceEnd >= MIN_SENTENCE_CUT) return cut.slice(0, sentenceEnd + 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : max)}…`;
}

/**
 * Google reviews as a centered carousel over full-bleed footage. One calm
 * column on the scene: the Google record (the 4.6 set in the numeral face)
 * up top, one review at a time in the middle with a soft crossfade, and an
 * editorial counter ("02 / 05") with thin arrows instead of dot pagination.
 * A navy grade keeps the type readable while the footage stays alive.
 *
 * The clip stays off the wire until the section nears the viewport
 * (preload="none", played by the IntersectionObserver) so it never competes
 * with the homepage hero for bandwidth. Auto-advances every 7s, pauses
 * while hovered, and the first review is server-rendered visible so the
 * quote never waits on the JS bundle.
 */
export function GoogleReviews({
  reviews,
  writeHref,
  viewHref,
}: {
  reviews: GoogleReviewsData | null;
  writeHref?: string;
  viewHref?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const apply = () => setIsDesktop(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // One ref serves whichever clip is mounted (the key= swap remounts it on
  // breakpoint change). Slowed to 0.65x: the drift should read as ambience,
  // not action. No eager play(): with preload="none" the clip stays off the
  // wire until the IntersectionObserver fires as the section scrolls in.
  useEffect(() => {
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
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisible);
      video.removeEventListener("loadedmetadata", onMeta);
    };
  }, [isDesktop]);

  // Every review the Places API hands over (it caps at 5), one per author,
  // strongest first with a shortest-first tiebreak so the rotation opens on
  // quotes that read in full.
  const featured = reviews
    ? [...reviews.reviews]
        .sort((a, b) => b.rating - a.rating || a.text.length - b.text.length)
        .filter((r, i, arr) => arr.findIndex((o) => o.authorName === r.authorName) === i)
    : [];

  const count = featured.length;
  const next = useCallback(() => {
    setActive((i) => (i + 1) % Math.max(count, 1));
  }, [count]);
  const prev = useCallback(() => {
    setActive((i) => (i - 1 + count) % Math.max(count, 1));
  }, [count]);

  useEffect(() => {
    if (paused || count < 2) return;
    const id = setTimeout(next, INTERVAL);
    return () => clearTimeout(id);
  }, [active, paused, next, count]);

  if (!reviews || count === 0) return null;
  const activeReview = featured[active];

  return (
    <section
      className="relative isolate flex min-h-[44rem] flex-col items-center justify-center overflow-hidden bg-navy-deep py-24 md:min-h-[50rem] lg:min-h-[100svh]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Footage — full-bleed, the section's only surface ───────────── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <video
          key={isDesktop ? "desktop" : "mobile"}
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 h-full w-full object-cover object-center"
        >
          <source
            src={isDesktop ? "/Mansion-drone.mp4" : "/Phone-Hero.mp4"}
            type="video/mp4"
          />
        </video>
      </div>

      {/* ── Grade — an even brand wash, a soft pool of depth behind the
          centered column, and a cinematic edge vignette. The gradients do
          all the legibility work: no panel, no card. ────────────────────── */}
      <div aria-hidden className="absolute inset-0 bg-navy-deep/45" />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 62% 58% at 50% 52%, rgba(6,14,45,0.5) 0%, rgba(6,14,45,0.22) 55%, transparent 78%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-navy-deep/60 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-navy-deep/60 to-transparent"
      />

      {/* ── One centered column on the scene ───────────────────────────── */}
      <div className="relative z-10 mx-auto w-full max-w-[93.75rem] px-5 text-center sm:px-8 md:px-11">
        <p className="font-sans text-[0.75rem] uppercase tracking-eyebrow text-white/60">
          Client Trust
        </p>

        {/* The Google record — set like a monument, not a metadata row:
            the mark and the number carry the section's authority. */}
        <div className="mt-8 flex items-center justify-center gap-5 md:gap-6">
          <GoogleG className="h-11 w-11 shrink-0 md:h-14 md:w-14" />
          <span className="font-numeral text-[4.75rem] font-thin leading-none text-white md:text-[6.25rem]">
            {reviews.rating.toFixed(1)}
          </span>
        </div>
        <Stars
          rating={reviews.rating}
          size="h-4 w-4 md:h-5 md:w-5"
          className="mt-5 justify-center gap-1.5 md:gap-2"
        />
        <p className="mt-4 font-sans text-[0.875rem] text-white/65 md:text-[0.9375rem]">
          {reviews.totalReviews.toLocaleString()} Google reviews
          {viewHref && (
            <>
              {" "}&middot;{" "}
              <a
                href={viewHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white hover:decoration-white/70"
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
                className="text-white/80 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white hover:decoration-white/70"
              >
                Leave a review
              </a>
            </>
          )}
        </p>

        <div aria-hidden className="mx-auto mt-10 h-px w-14 bg-white/30" />

        {/* ── The rotating quote — fixed reserve so the column never
            jumps between long and short reviews ─────────────────────── */}
        <div className="relative mx-auto mt-10 flex min-h-[16rem] max-w-[46rem] flex-col justify-center md:min-h-[14rem]">
          <span
            aria-hidden
            className="pointer-events-none absolute left-1/2 -top-9 -translate-x-1/2 select-none font-display text-[4.5rem] leading-none text-white/[0.16]"
          >
            &ldquo;
          </span>

          <AnimatePresence mode="wait">
            <motion.figure
              key={active}
              initial={mounted ? { opacity: 0, y: 10 } : false}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <blockquote className="font-display text-[clamp(1.2rem,2.1vw,1.7rem)] font-light leading-[1.5] tracking-tight text-white [text-shadow:0_2px_28px_rgba(0,0,0,0.45)]">
                {truncateQuote(activeReview.text)}
              </blockquote>
              <figcaption className="mt-7 flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1">
                <Stars rating={activeReview.rating} size="h-2.5 w-2.5" className="translate-y-[-1px]" />
                <span className="font-sans text-[0.875rem] tracking-wide text-white">
                  {activeReview.authorName}
                </span>
                <span className="font-sans text-[0.625rem] uppercase tracking-eyebrow text-white/45">
                  {activeReview.relativeTime}
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        {/* ── Controls — thin arrows around an editorial counter ───────── */}
        {count > 1 && (
          <div className="mt-10 flex items-center justify-center gap-8">
            <button
              onClick={prev}
              aria-label="Previous review"
              className="p-2 text-white/40 transition-colors duration-300 hover:text-white"
            >
              <ChevronLeft strokeWidth={1.25} className="h-5 w-5" />
            </button>
            <p className="font-numeral text-[0.9375rem] font-light tracking-[0.2em] text-white/70">
              <span className="text-white">{String(active + 1).padStart(2, "0")}</span>
              <span aria-hidden className="mx-2.5 text-white/35">/</span>
              <span className="sr-only">of </span>
              {String(count).padStart(2, "0")}
            </p>
            <button
              onClick={next}
              aria-label="Next review"
              className="p-2 text-white/40 transition-colors duration-300 hover:text-white"
            >
              <ChevronRight strokeWidth={1.25} className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
