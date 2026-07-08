"use client";

import { useEffect } from "react";
import { gsap, prefersReducedMotion } from "@/lib/motion";

/**
 * GSAP conductor for the Smart Business page. Renders nothing — it decorates
 * server-rendered content marked with `data-sb-*` attributes:
 *
 *  - data-sb-hero / data-sb-hero-media : slow settle on load + scrub parallax
 *  - data-sb-rise                      : children stagger-rise on entry
 *  - data-sb-curtain                   : clip-path curtain reveal for media
 *  - data-sb-float                     : product-shot lift (device mockups)
 *  - data-sb-grid                      : cells fade up in a gentle stagger
 *  - data-sb-count (+ data-count)      : numerals count up when seen
 *
 * Content is fully visible without JavaScript; these effects only add motion.
 * Everything holds still under prefers-reduced-motion.
 */
export function SBMotion() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Hero media: a long, quiet settle on load, then a slow drift as the
      // visitor scrolls away — the "expensive lens" move.
      gsap.fromTo(
        "[data-sb-hero-media]",
        { scale: 1.14 },
        { scale: 1, duration: 2.8, ease: "power2.out" }
      );
      gsap.to("[data-sb-hero-media]", {
        yPercent: 14,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-sb-hero]",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Section mastheads rise in line by line.
      gsap.utils.toArray<HTMLElement>("[data-sb-rise]").forEach((el) => {
        gsap.fromTo(
          el.children,
          { opacity: 0, y: 34 },
          {
            opacity: 1,
            y: 0,
            duration: 1.05,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: { trigger: el, start: "top 82%" },
          }
        );
      });

      // Photography unveils top-to-bottom while easing out of a slight zoom.
      gsap.utils.toArray<HTMLElement>("[data-sb-curtain]").forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: "inset(0 0 100% 0)", scale: 1.08 },
          {
            clipPath: "inset(0 0 0% 0)",
            scale: 1,
            duration: 1.5,
            ease: "power4.out",
            scrollTrigger: { trigger: el, start: "top 80%" },
          }
        );
      });

      // Device mockups arrive like a product reveal.
      gsap.utils.toArray<HTMLElement>("[data-sb-float]").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 90, scale: 0.94 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.4,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          }
        );
      });

      // Capability grids stagger up cell by cell.
      gsap.utils.toArray<HTMLElement>("[data-sb-grid]").forEach((el) => {
        gsap.fromTo(
          el.children,
          { opacity: 0, y: 26 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: { trigger: el, start: "top 82%" },
          }
        );
      });

      // Stat numerals count up once, the first time they're seen.
      gsap.utils.toArray<HTMLElement>("[data-sb-count]").forEach((el) => {
        const target = Number(el.dataset.count ?? "0");
        const state = { v: 0 };
        gsap.to(state, {
          v: target,
          duration: 1.8,
          ease: "power1.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          onUpdate() {
            el.textContent = Math.round(state.v).toLocaleString("en-US");
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return null;
}
