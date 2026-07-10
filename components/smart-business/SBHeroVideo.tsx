"use client";

import { useEffect, useRef, useState } from "react";

type DeviceType = "mobile" | "desktop";

/**
 * Hero background video for Smart Business, swapped by viewport rather than
 * hidden with CSS — two permanently-autoplaying <video> elements would double
 * the bandwidth and, per the Hero.tsx precedent, a display:none video isn't
 * guaranteed to resume autoplay when it's later revealed (e.g. rotating a
 * device or resizing past the breakpoint). Remounting via key={deviceType}
 * guarantees a fresh autoplay attempt every time the tier changes.
 */
export function SBHeroVideo({
  className = "",
  poster,
  desktopSrc,
  mobileSrc,
}: {
  className?: string;
  poster: string;
  desktopSrc: string;
  mobileSrc: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [deviceType, setDeviceType] = useState<DeviceType>("desktop");

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const apply = () => setDeviceType(mq.matches ? "mobile" : "desktop");
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const p = video.play();
    if (p) p.catch(() => {});
  }, [deviceType]);

  return (
    <video
      key={deviceType}
      ref={videoRef}
      data-sb-hero-media
      className={className}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
    >
      <source
        src={deviceType === "mobile" ? mobileSrc : desktopSrc}
        type="video/mp4"
      />
    </video>
  );
}
