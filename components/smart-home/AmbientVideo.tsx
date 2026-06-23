"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Self-deferring ambient video. The <source> isn't attached until the element
 * nears the viewport, so it costs nothing on initial load. It plays only while
 * on screen (and pauses when scrolled away to save battery/CPU), and honors
 * prefers-reduced-motion by staying on its poster frame.
 *
 * The poster paints immediately as a normal image, so there's never an empty
 * box while the clip streams in.
 */
export function AmbientVideo({
  src,
  poster,
  className = "",
  posterAlt = "",
}: {
  src: string;
  poster: string;
  className?: string;
  posterAlt?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return; // leave it on the poster

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true); // attaches <source> on first approach
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { rootMargin: "200px 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-label={posterAlt || undefined}
    >
      {active && <source src={src} type="video/mp4" />}
    </video>
  );
}
