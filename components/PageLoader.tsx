"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// Anti-flash floor: once the splash has appeared, hold it just long enough
// that a fast load doesn't strobe it on and straight back off. The splash is
// cover for real loading, not a brand pause — it exits as soon as it can.
const MIN_VISIBLE_MS = 400;
// Safety valve: if a video stalls (slow connection, data-saver mode, a
// blocked request), release the page anyway rather than trap the visitor
// behind the splash forever.
const MAX_WAIT_MS = 6000;
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
 * Full-bleed brand splash shown on the first-ever load. Stays up until fonts
 * have swapped in, the hero footage is buffered deep enough to play its first
 * two shots without stalling, the second mobile hero clip (if present) can
 * start, and the about-section video has its first frame — so the reveal
 * never lands on a stalled hero or a stale poster. Hero.tsx / AboutSection.tsx
 * mark their <video> elements with data-loader-target for this component to
 * find; MAX_WAIT still caps the whole wait on slow connections.
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

    // How deep the primary hero footage must be buffered before the reveal —
    // through the end of the desktop sequence's second shot. Shorter clips
    // (the mobile chain's opener) just need to be buffered to their end.
    const HERO_BUFFER_GOAL_S = 15.3;

    const bufferedThrough = (el: HTMLVideoElement, goal: number) => {
      const target = Math.min(goal, (el.duration || goal) - 0.1);
      for (let i = 0; i < el.buffered.length; i++) {
        if (el.buffered.start(i) <= 0.1 && el.buffered.end(i) >= target) {
          return true;
        }
      }
      return false;
    };

    const targetReady = (selector: string, bufferGoal?: number) => {
      const el = document.querySelector<HTMLVideoElement>(selector);
      // If the element isn't mounted (desktop has no second clip; reduced
      // motion renders none of them) or errored out, don't block on it.
      if (!el || el.error !== null) return true;
      if (el.readyState < 2) return false;
      return bufferGoal === undefined || bufferedThrough(el, bufferGoal);
    };

    const fontsReady = () =>
      typeof document.fonts === "undefined" || document.fonts.status === "loaded";

    const finish = () => {
      if (cancelled) return;
      // The heavy assets are cached now — future visits skip the splash.
      try {
        localStorage.setItem(SEEN_KEY, "1");
      } catch {}
      setPhase("exiting");
      timeout = setTimeout(() => {
        if (cancelled) return;
        document.body.style.overflow = "";
        setPhase("done");
      }, EXIT_MS);
    };

    const tick = () => {
      if (cancelled) return;
      const elapsed = Date.now() - start;
      const ready =
        fontsReady() &&
        targetReady('[data-loader-target="hero-video"]', HERO_BUFFER_GOAL_S) &&
        targetReady('[data-loader-target="hero-video-2"]') &&
        targetReady('[data-loader-target="about-video"]');

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
          <Image
            src="/images/cfas-logo-light.png"
            alt="Central Florida Automation Services"
            width={220}
            height={109}
            priority
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
