"use client";

import { useEffect, useState } from "react";

// Anti-flash floor: once the splash has appeared, hold it just long enough
// that a fast load doesn't strobe it on and straight back off. The splash is
// cover for real loading, not a brand pause — it exits as soon as it can.
const MIN_VISIBLE_MS = 400;
// Splash cap. Deliberately short: the splash exists to cover the hero's
// first paint, not to wait out the video. Hero.tsx has its own 8s
// deadline for swapping the clip out for a still.
const MAX_WAIT_MS = 2500;
const POLL_MS = 150;
// Matches the CSS transition-duration below.
const EXIT_MS = 700;

// Set after the first successful load. On later visits fonts and the hero
// clip come from HTTP cache, so there's nothing worth hiding behind a splash
// — the inline <script> below reads this flag before first paint and hides
// the overlay entirely.
const SEEN_KEY = "cfas-splash-seen";
const SKIP_SNIPPET =
  `try{if(localStorage.getItem("${SEEN_KEY}"))` +
  `document.documentElement.setAttribute("data-skip-splash","")}catch(e){}`;

/**
 * Full-bleed brand splash shown on the first-ever load. Stays up only until
 * the fonts have swapped in and the hero's poster still has decoded — NOT
 * until the hero video is playable, which is what it used to wait for and
 * what made mobile visitors sit on the splash for seconds while a
 * multi-megabyte clip downloaded behind it. Hero.tsx marks that still with
 * data-loader-target="hero-poster". MAX_WAIT_MS caps the wait regardless,
 * and a hard setTimeout below guarantees it even if rAF is throttled.
 *
 * Repeat visits skip the splash completely: everything it would hide is
 * already in the browser cache, so showing it would be pure decoration.
 */
export function PageLoader() {
  const [phase, setPhase] = useState<"loading" | "exiting" | "done">("loading");

  useEffect(() => {
    // Flagged before paint by the inline script below — nothing to load, so
    // don't lock scroll or run the polling loop at all.
    if (document.documentElement.hasAttribute("data-skip-splash")) {
      setPhase("done");
      return;
    }

    document.body.style.overflow = "hidden";
    const start = Date.now();
    let cancelled = false;
    let raf = 0;
    let timeout: ReturnType<typeof setTimeout>;
    let exitTimer: ReturnType<typeof setTimeout>;

    // Waits on the hero's POSTER, not its video.
    //
    // This used to block until the clip had buffered enough to play forward
    // (readyState >= 3). On mobile that meant holding the splash over a
    // multi-megabyte download — a Lighthouse run measured 6.1s of pure
    // "render delay", i.e. six seconds of a visitor staring at the splash
    // with the page already built behind it. The poster is ~100KB, matches
    // the clip's first frame exactly, and is the hero's real first paint, so
    // releasing on it shows the finished page far sooner and the video
    // simply layers on when it's ready. Hero.tsx keeps its own separate 8s
    // deadline for giving up on the video entirely.
    const posterReady = (selector: string) => {
      const el = document.querySelector<HTMLImageElement>(selector);
      // Not mounted yet is NOT ready; MAX_WAIT_MS is the escape hatch.
      if (!el) return false;
      // naturalWidth guards against `complete` being true for a failed load.
      return el.complete && el.naturalWidth > 0;
    };

    const fontsReady = () =>
      typeof document.fonts === "undefined" || document.fonts.status === "loaded";

    const finish = () => {
      if (cancelled) return;
      cancelled = true;
      clearTimeout(hardStop);
      // The heavy assets are cached now — future visits skip the splash.
      try {
        localStorage.setItem(SEEN_KEY, "1");
      } catch {}
      setPhase("exiting");
      exitTimer = setTimeout(() => {
        document.body.style.overflow = "";
        setPhase("done");
      }, EXIT_MS);
    };

    // Hard guarantee, independent of the poll loop below. That loop drives
    // itself through requestAnimationFrame, which a background/throttled tab
    // can starve indefinitely — and then the MAX_WAIT check inside it never
    // runs and the splash never lifts. This timer answers only to setTimeout,
    // so the page is always released by MAX_WAIT_MS no matter how bad the
    // connection or how throttled the tab. Hero.tsx swaps to its still image
    // on the same deadline, so the visitor lands on a complete page.
    const hardStop = setTimeout(finish, MAX_WAIT_MS);

    const tick = () => {
      if (cancelled) return;
      const elapsed = Date.now() - start;
      const ready = fontsReady() && posterReady('[data-loader-target="hero-poster"]');

      if ((ready && elapsed >= MIN_VISIBLE_MS) || elapsed >= MAX_WAIT_MS) {
        finish();
        return;
      }
      timeout = setTimeout(() => {
        raf = requestAnimationFrame(tick);
      }, POLL_MS);
    };

    tick();

    return () => {
      cancelled = true;
      clearTimeout(timeout);
      clearTimeout(exitTimer);
      clearTimeout(hardStop);
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, []);

  if (phase === "done") return null;

  const exiting = phase === "exiting";

  return (
    <>
      {/* Runs synchronously during HTML parse, before the overlay below is
          painted — a repeat visitor never sees even one frame of splash. */}
      <script dangerouslySetInnerHTML={{ __html: SKIP_SNIPPET }} />
      <div
        role="status"
        aria-live="polite"
        aria-busy={!exiting}
        className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-navy-deep transition-opacity duration-700 ease-expo [html[data-skip-splash]_&]:hidden ${
          exiting ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <div aria-hidden className="grain absolute inset-0 opacity-[0.05]" />

        <div
          className={`relative flex flex-col items-center transition-all duration-700 ease-expo ${
            exiting ? "scale-105 opacity-0" : "scale-100 opacity-100"
          }`}
        >
          {/* Deliberately a plain <img>, not next/image. While the splash is
              up it covers the viewport, so this mark is the page's LCP
              element — and routing a 6KB file through /_next/image added an
              optimizer round-trip on the one request that decides the LCP
              score. Straight at the file, discoverable in the HTML, high
              priority. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/cfas-logo-light.png"
            alt="Central Florida Automation Services"
            width={220}
            height={109}
            fetchPriority="high"
            decoding="async"
            className="loader-breathe h-14 w-auto sm:h-16 md:h-20"
          />

          <div className="relative mt-8 h-px w-40 overflow-hidden bg-white/15 sm:w-48">
            <span
              aria-hidden
              className="loader-current absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/90 to-transparent"
            />
          </div>

          <p className="mt-6 font-sans text-[0.625rem] uppercase tracking-eyebrow text-white/40">
            Preparing your experience
          </p>
        </div>

        <span className="sr-only">Loading Central Florida Automation Services</span>
      </div>
    </>
  );
}
