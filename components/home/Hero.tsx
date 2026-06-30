"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import Image from "next/image";
import { NavSentinel } from "@/components/NavSentinel";

const SUBTITLE =
  "Since 1968 we have worked beside architects, contractors, and interior designers, to enhance the convenience, safety and lifestyle of your home";

type DeviceType = "mobile" | "tablet" | "desktop";

const VIDEO_SRC: Record<DeviceType, string> = {
  mobile: "/iphone-hero-hig.mp4",
  // Tablets share the portrait phone clip — no separate iPad encode.
  tablet: "/iphone-hero-hig.mp4",
  // -v2 busts the year-long immutable cache after the clip was re-encoded
  // from a 17MB all-intra master down to a 6MB 720p.
  desktop: "/Desktop-v2.mp4",
};

// Last frame of each clip — the finished estate. Used as the static poster for
// reduced-motion visitors, who never see the build play out.
const POSTER_SRC: Record<DeviceType, string> = {
  mobile: "/images/hero-last-mobile.jpg",
  tablet: "/images/hero-last-mobile.jpg",
  // -v2 busts the year-long immutable cache after the desktop clip changed.
  desktop: "/images/hero-last-desktop-v2.jpg",
};

export function Hero() {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  // Three-tier device detection: phone / tablet / desktop. TVs and other
  // large landscape displays match the desktop query and get the landscape
  // clip.
  const [deviceType, setDeviceType] = useState<DeviceType>("mobile");
  useEffect(() => {
    const getType = (): DeviceType => {
      if (window.matchMedia("(min-width: 1024px)").matches) return "desktop";
      if (window.matchMedia("(min-width: 768px)").matches) {
        // A tablet held in landscape gets the landscape desktop clip — the
        // portrait phone clip would crop its sides badly. Portrait tablets
        // keep the portrait clip.
        return window.matchMedia("(orientation: landscape)").matches
          ? "desktop"
          : "tablet";
      }
      return "mobile";
    };
    const apply = () => setDeviceType(getType());
    apply();
    const mqLg = window.matchMedia("(min-width: 1024px)");
    const mqMd = window.matchMedia("(min-width: 768px)");
    const mqOrient = window.matchMedia("(orientation: landscape)");
    mqLg.addEventListener("change", apply);
    mqMd.addEventListener("change", apply);
    mqOrient.addEventListener("change", apply);
    return () => {
      mqLg.removeEventListener("change", apply);
      mqMd.removeEventListener("change", apply);
      mqOrient.removeEventListener("change", apply);
    };
  }, []);

  // Play the build through once on load, then let it hold on its last decoded
  // frame — a non-looping <video> keeps painting the final frame after it ends,
  // which is exactly the finished estate we want to rest on. No scroll input.
  // Reduced-motion visitors skip the autoplay and see the static poster.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduce) return;
    // The key={deviceType} swap remounts the element, but call play() ourselves
    // too so a source change always restarts the clip from the top. Muted +
    // playsInline autoplay is permitted without a user gesture.
    const p = video.play();
    if (p) p.catch(() => {});
  }, [reduce, deviceType]);

  return (
    <section className="sticky top-0 z-0 flex h-[100dvh] flex-col justify-end overflow-hidden bg-navy-deep">
      <NavSentinel />

      {/* ── Footage — autoplays once, then rests on the final frame ─────── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <video
          key={deviceType}
          ref={videoRef}
          muted
          playsInline
          autoPlay={!reduce}
          preload="auto"
          // Only reduced-motion users (no autoplay) need the still; for everyone
          // else a poster of the *finished* house would flash before the clip
          // rewinds to bare concrete, so we let the navy backdrop cover the
          // sub-second gap until the first frame paints.
          poster={reduce ? POSTER_SRC[deviceType] : undefined}
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={VIDEO_SRC[deviceType]} type="video/mp4" />
        </video>
      </div>

      {/* ── Color grade ─────────────────────────────────────────────── */}
      <div aria-hidden="true" className="absolute inset-0 bg-black/15" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/15 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
      />

      {/* ── Bottom bar — logo blue, fades out into the scene ────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10"
        style={{
          height: "clamp(10px, 1.8vh, 20px)",
          background:
            "linear-gradient(to right, rgba(10,26,82,0.95) 0%, rgba(10,26,82,0.75) 25%, rgba(10,26,82,0.75) 75%, rgba(10,26,82,0.95) 100%)",
        }}
      />

      {/* ── Logo — top right ────────────────────────────────────────── */}
      <div className="reveal-fade-in pointer-events-none absolute right-8 top-24 z-20 sm:right-12 sm:top-24 md:right-14 md:top-28">
        <Image
          src="/images/cfas-logo-light.png"
          alt="Central Florida Automation Services"
          width={200}
          height={99}
          className="h-16 w-auto sm:h-20 md:h-24 2xl:h-28"
          priority
        />
      </div>

      {/* ── Copy ────────────────────────────────────────────────────── */}
      <div className="relative z-20 mx-auto w-full max-w-[1500px] px-5 pb-24 sm:px-8 sm:pb-32 md:px-11 md:pb-36 lg:pb-28 xl:pb-32 2xl:max-w-[1760px] 2xl:pb-40">
        <div className="max-w-[64rem] 2xl:max-w-[76rem]">

          <h1 className="font-hero font-light leading-[0.95] tracking-[-0.025em]">
            <span className="reveal-load rd-1 block text-[clamp(1.55rem,6vw,5.25rem)] text-white">
              Central Florida&apos;s leader
            </span>
            <span className="reveal-load rd-2 block text-[clamp(1.55rem,6vw,5.25rem)] text-white/80">
              in smart home automation
            </span>
            <span className="reveal-load rd-3 block text-[clamp(1.55rem,6vw,5.25rem)] text-white/50">
              since 1968.
            </span>
          </h1>

          <div className="reveal-load rd-4 mt-7 h-px w-24 bg-white/70 sm:mt-10 2xl:w-32" />

          <p className="reveal-load rd-5 mt-5 max-w-[42rem] font-display text-[clamp(1rem,2vw,1.9rem)] font-light leading-[1.55] tracking-[-0.005em] text-white/75 sm:mt-8 2xl:max-w-[52rem]">
            {SUBTITLE}
          </p>

        </div>
      </div>

    </section>
  );
}
