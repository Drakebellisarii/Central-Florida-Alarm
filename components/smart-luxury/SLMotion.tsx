"use client";

import { useEffect } from "react";
import { gsap, prefersReducedMotion } from "@/lib/motion";

export function SLMotion() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Hero media: settle on load, then scrub parallax.
      gsap.fromTo(
        "[data-sl-hero-media]",
        { scale: 1.14 },
        { scale: 1, duration: 2.8, ease: "power2.out" }
      );
      gsap.to("[data-sl-hero-media]", {
        yPercent: 14,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-sl-hero]",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Hero content exits faster than the media as the section scrolls away.
      gsap.to("[data-sl-hero-exit]", {
        yPercent: -30,
        scale: 1.05,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-sl-hero]",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Manifesto lines rise out from behind a hard mask, one by one.
      gsap.utils.toArray<HTMLElement>("[data-sl-mask-line]").forEach((el, i) => {
        gsap.fromTo(
          el,
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.3,
            delay: i * 0.15,
            ease: "power4.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
          }
        );
      });

      // Generic staggered rise, used for simple text groupings.
      gsap.utils.toArray<HTMLElement>("[data-sl-rise]").forEach((el) => {
        gsap.fromTo(
          el.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: { trigger: el, start: "top 82%" },
          }
        );
      });

      // Feature cards flip up into place, row by row, as the grid scrolls
      // into view — a tactile alternative to a plain fade-up.
      gsap.utils.toArray<HTMLElement>("[data-sl-flip-grid]").forEach((grid) => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-sl-flip]", grid);
        gsap.set(cards, { transformOrigin: "50% 100%" });
        gsap.fromTo(
          cards,
          { opacity: 0, rotateX: -75, y: 24 },
          {
            opacity: 1,
            rotateX: 0,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            stagger: { each: 0.08, grid: "auto", from: "start" },
            scrollTrigger: { trigger: grid, start: "top 85%" },
          }
        );
      });

      // Diagonal wipe for the full-bleed band.
      gsap.utils.toArray<HTMLElement>("[data-sl-diagonal-reveal]").forEach((el) => {
        const panel = el.querySelector<HTMLElement>("[data-sl-diagonal-panel]");
        if (!panel) return;
        gsap.set(panel, { zIndex: 20, skewX: -12 });
        gsap.fromTo(
          panel,
          { xPercent: 0 },
          {
            xPercent: 130,
            duration: 1.6,
            ease: "power4.inOut",
            scrollTrigger: { trigger: el, start: "top 72%" },
          }
        );
      });

      // Diptych: the two photos settle in with a slight offset stagger.
      gsap.utils.toArray<HTMLElement>("[data-sl-diptych]").forEach((el) => {
        gsap.fromTo(
          el.children,
          { opacity: 0, y: 44, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.15,
            ease: "power3.out",
            stagger: 0.2,
            scrollTrigger: { trigger: el, start: "top 80%" },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return null;
}
