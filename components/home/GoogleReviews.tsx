"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { GoogleReviewsData } from "@/lib/googleReviews";
import { GoogleG, Stars } from "@/components/GoogleReviewIcons";

const INTERVAL = 6000;

// Most Google reviews are a sentence or two — show those in full. A long
// outlier is cut at the last complete sentence that fits, so every quote
// ends on a period and reads as a finished statement rather than trailing
// off in an ellipsis. Word-boundary + ellipsis only as a last resort for a
// review written as one giant run-on sentence.
const MAX_QUOTE_CHARS = 260;
const MIN_SENTENCE_CUT = 80;
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
 * Google reviews as a card carousel over full-bleed footage.
 *
 * The layout deliberately works the full width instead of stacking one
 * centered column: the Google record holds the left of the masthead, the
 * carousel controls hold the right, and the cards run edge to edge beneath
 * them. Section height is content-driven (no 100svh), so the footage reads
 * as a band behind the cards rather than a screen of empty video.
 *
 * Sliding is a plain CSS transform on the track — no animation library — so
 * this ships no framer-motion. Cards per view step 1 → 2 → 3 with the
 * breakpoints; the track stops at the last full page rather than scrolling
 * into empty space.
 *
 * The clip stays off the wire until the section nears the viewport
 * (preload="none", played by the IntersectionObserver) so it never competes
 * with the homepage hero for bandwidth.
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
  const [perView, setPerView] = useState(1);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    // 3-up waits for xl: at lg the column is narrow enough that three cards
    // squeeze the quotes to ~6 words a line.
    const xl = window.matchMedia("(min-width: 1280px)");
    const md = window.matchMedia("(min-width: 768px)");
    const apply = () => {
      setIsDesktop(md.matches);
      setPerView(xl.matches ? 3 : md.matches ? 2 : 1);
    };
    apply();
    xl.addEventListener("change", apply);
    md.addEventListener("change", apply);
    return () => {
      xl.removeEventListener("change", apply);
      md.removeEventListener("change", apply);
    };
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
  // strongest first with a shortest-first tiebreak.
  const featured = reviews
    ? [...reviews.reviews]
        .sort((a, b) => b.rating - a.rating || a.text.length - b.text.length)
        .filter((r, i, arr) => arr.findIndex((o) => o.authorName === r.authorName) === i)
    : [];

  const count = featured.length;
  // Last position that still fills every visible slot — the track never
  // slides past the final card into blank space.
  const maxIndex = Math.max(0, count - perView);

  // A breakpoint change can leave the track parked past its new end.
  useEffect(() => {
    setActive((a) => Math.min(a, Math.max(0, count - perView)));
  }, [perView, count]);

  const next = useCallback(() => {
    setActive((i) => (i >= maxIndex ? 0 : i + 1));
  }, [maxIndex]);
  const prev = useCallback(() => {
    setActive((i) => (i <= 0 ? maxIndex : i - 1));
  }, [maxIndex]);

  useEffect(() => {
    if (paused || maxIndex < 1) return;
    const id = setTimeout(next, INTERVAL);
    return () => clearTimeout(id);
  }, [active, paused, next, maxIndex]);

  if (!reviews || count === 0) return null;

  return (
    <section
      className="relative isolate overflow-hidden bg-navy-deep py-20 md:py-24 lg:py-28"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Footage — full-bleed behind the whole band ─────────────────── */}
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

      {/* Grade — an even navy wash plus top/bottom lift, enough to seat the
          white cards on the scene without flattening the footage. */}
      <div aria-hidden className="absolute inset-0 bg-navy-deep/55" />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-navy-deep/70 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy-deep/70 to-transparent"
      />

      <div className="relative z-10 mx-auto w-full max-w-[93.75rem] px-5 sm:px-8 md:px-11">

        {/* ── Masthead — the record on the left, controls on the right, so
            the row uses the full width instead of stacking centered. ──── */}
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-7">
          <div>
            <p className="font-sans text-[0.6875rem] uppercase tracking-eyebrow text-white/55">
              Client Trust
            </p>
            <div className="mt-5 flex items-center gap-4">
              <GoogleG className="h-9 w-9 shrink-0 md:h-10 md:w-10" />
              <span className="font-numeral text-[3.25rem] font-thin leading-none text-white md:text-[4rem]">
                {reviews.rating.toFixed(1)}
              </span>
              <Stars rating={reviews.rating} size="h-4 w-4" className="gap-1.5" />
            </div>
            <p className="mt-3 font-sans text-[0.8125rem] text-white/60 md:text-[0.875rem]">
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
          </div>

          {maxIndex > 0 && (
            <div className="flex items-center gap-6">
              <button
                onClick={prev}
                aria-label="Previous reviews"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white/70 transition-colors duration-300 hover:border-white/60 hover:text-white"
              >
                <ChevronLeft strokeWidth={1.25} className="h-4 w-4" />
              </button>
              <p className="font-numeral text-[0.9375rem] font-light tracking-[0.2em] text-white/70">
                <span className="text-white">
                  {String(active + 1).padStart(2, "0")}
                </span>
                <span aria-hidden className="mx-2 text-white/35">/</span>
                <span className="sr-only">of </span>
                {String(maxIndex + 1).padStart(2, "0")}
              </p>
              <button
                onClick={next}
                aria-label="Next reviews"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white/70 transition-colors duration-300 hover:border-white/60 hover:text-white"
              >
                <ChevronRight strokeWidth={1.25} className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {/* ── Cards — the track slides by whole cards on a CSS transform ── */}
        <div className="mt-10 overflow-hidden md:mt-12">
          <div
            className="flex transition-transform duration-700 ease-expo"
            style={{ transform: `translateX(-${active * (100 / perView)}%)` }}
          >
            {featured.map((r) => (
              <div
                key={r.authorName}
                className="shrink-0 px-2.5 md:px-3"
                style={{ width: `${100 / perView}%` }}
              >
                <article className="flex h-full flex-col rounded-sm bg-white p-7 shadow-[0_18px_50px_-24px_rgba(5,12,40,0.6)] md:p-8">
                  <Stars rating={r.rating} size="h-3.5 w-3.5" emptyClassName="fill-navy/15" />
                  <blockquote className="mt-6 flex-1 font-display text-[1rem] font-light leading-[1.65] text-navy-deep md:text-[1.0625rem]">
                    {truncateQuote(r.text)}
                  </blockquote>
                  <figcaption className="mt-7 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-navy/10 pt-5">
                    <span className="font-sans text-[0.875rem] tracking-wide text-navy-deep">
                      {r.authorName}
                    </span>
                    <span className="font-sans text-[0.625rem] uppercase tracking-eyebrow text-navy/45">
                      {r.relativeTime}
                    </span>
                  </figcaption>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
