"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/motion";

/**
 * Lenis smooth scroll — currently mounted on the homepage only, as a trial.
 *
 * TO REMOVE ENTIRELY: delete this file, drop the <SmoothScroll /> line from
 * app/page.tsx, delete the ".lenis" block in globals.css, and
 * `npm uninstall lenis`. Nothing else in the site depends on it.
 *
 * Three things this has to respect on this codebase:
 *
 * 1. GSAP ScrollTrigger drives SmartSecurityShowcase and ServiceAreasSection.
 *    Lenis interpolates scroll position between native scroll events, so
 *    ScrollTrigger has to be told to update on Lenis's tick or those reveals
 *    fire at the wrong moment. Rather than running a second rAF loop, Lenis
 *    is driven off gsap.ticker so both share one frame loop.
 *
 * 2. The CSS scroll-driven animations (.reveal-scroll, .sh-*, which use
 *    animation-timeline: view()/scroll()) read the real scroll position.
 *    Lenis scrolls the actual window rather than transforming a wrapper, so
 *    those keep working untouched.
 *
 * 3. prefers-reduced-motion: bail completely. The site honors it everywhere
 *    else, and a hijacked scroll is exactly what that setting is asking us
 *    not to do.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      // Slightly longer than default with an expo-out curve, matching the
      // site's ease-expo — it should feel weighted, not floaty.
      duration: 1.1,
      easing: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      // Trackpads and phones already have momentum; smoothing those too
      // makes the page feel detached from the finger.
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1.6,
    });

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    // GSAP throttles after a slow frame, which makes Lenis stutter on the
    // frame after a jank spike.
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(raf);
      gsap.ticker.lagSmoothing(500, 33); // GSAP's default
      lenis.destroy();
    };
  }, []);

  return null;
}
