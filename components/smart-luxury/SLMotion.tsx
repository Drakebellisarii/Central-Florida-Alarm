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

      // Inside / Outside / Everywhere — pinned, scroll-scrubbed crossfade.
      // Default markup is three plain stacked full-height panels (a fine,
      // fully accessible fallback on its own); this promotes them to an
      // absolutely-stacked deck and pins the section for one viewport-height
      // of scroll per panel, only when motion is allowed.
      const triptych = document.querySelector<HTMLElement>("[data-sl-triptych]");
      const panels = gsap.utils.toArray<HTMLElement>(
        "[data-sl-triptych-panel]",
        triptych ?? undefined
      );
      if (triptych && panels.length > 1) {
        const ticksWrap = triptych.querySelector<HTMLElement>("[data-sl-triptych-ticks]");
        const ticks = gsap.utils.toArray<HTMLElement>("[data-sl-triptych-tick]", triptych);

        gsap.set(triptych, { height: "100dvh" });
        gsap.set(panels, { position: "absolute", inset: 0, opacity: 0 });
        gsap.set(panels[0], { opacity: 1 });
        if (ticksWrap) gsap.set(ticksWrap, { display: "flex" });
        gsap.set(ticks, { backgroundColor: "rgba(255,255,255,0.25)" });
        if (ticks[0]) gsap.set(ticks[0], { backgroundColor: "rgba(255,255,255,0.85)" });

        const imgs: Element[] = [];
        const copies: Element[] = [];
        panels.forEach((panel) => {
          // Each panel renders a mobile + desktop <Image>, one hidden by
          // CSS per breakpoint — both get the same tween, harmless since
          // only one is ever visible at a time.
          panel
            .querySelectorAll("[data-sl-triptych-img]")
            .forEach((img) => imgs.push(img));
          const copy = panel.querySelector("[data-sl-triptych-copy]");
          if (copy) copies.push(copy);
        });
        gsap.set(imgs, { scale: 1.16 });
        gsap.set(copies, { opacity: 0, y: 26 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: triptych,
            start: "top top",
            end: () => `+=${window.innerHeight * panels.length}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        });

        panels.forEach((panel, i) => {
          const panelImgs = panel.querySelectorAll("[data-sl-triptych-img]");
          const copy = panel.querySelector("[data-sl-triptych-copy]");
          const tick = ticks[i];

          // Hold on this panel: Ken Burns pull-back, copy rises in.
          if (panelImgs.length) {
            tl.to(panelImgs, { scale: 1, duration: 1, ease: "none" }, i);
          }
          if (copy) {
            tl.to(copy, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }, i);
          }

          // Crossfade the last third of this panel's segment into the next.
          if (i < panels.length - 1) {
            const next = panels[i + 1];
            const nextCopy = next.querySelector("[data-sl-triptych-copy]");
            tl.to(panel, { opacity: 0, duration: 0.3, ease: "none" }, i + 0.7);
            tl.to(next, { opacity: 1, duration: 0.3, ease: "none" }, i + 0.7);
            if (copy) tl.to(copy, { opacity: 0, duration: 0.3, ease: "none" }, i + 0.7);
            if (tick) {
              tl.to(tick, { backgroundColor: "rgba(255,255,255,0.25)", duration: 0.01 }, i + 0.7);
            }
            if (ticks[i + 1]) {
              tl.to(
                ticks[i + 1],
                { backgroundColor: "rgba(255,255,255,0.85)", duration: 0.01 },
                i + 0.7
              );
            }
            // Reset next panel's own entrance state so it plays again as it
            // becomes active (its copy already fell to opacity 0 above only
            // via the *previous* panel's exit tween on shared elements —
            // this keeps next's copy rise starting from the same place).
            if (nextCopy) tl.set(nextCopy, { opacity: 0, y: 26 }, i + 0.7);
          }
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return null;
}
