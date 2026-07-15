"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import Image from "next/image";
import { NavSentinel } from "@/components/NavSentinel";
import { CTAButton } from "@/components/CTAButton";

const SUBTITLE =
  "We work beside architects, contractors, and interior designers, to enhance the convenience, safety and lifestyle of your home.";

type DeviceType = "mobile" | "tablet" | "desktop";

// Per-device clip chains. Each clip fades in over the previous clip's held
// final frame and plays once; the hero settles on the last one.
const CHAIN: Record<DeviceType, string[]> = {
  mobile: ["/iphone-hero-hig.mp4", "/Hero-inside-1.mp4", "/Hero-4.mp4"],
  // Tablets share the portrait phone chain — no separate iPad encodes.
  tablet: ["/iphone-hero-hig.mp4", "/Hero-inside-1.mp4", "/Hero-4.mp4"],
  desktop: ["/Part1.mp4", "/Part2.mp4", "/Part3.mp4"],
};

// Last frame of each chain — used as the static poster for reduced-motion
// visitors, who never see the sequence play out.
const POSTER_SRC: Record<DeviceType, string> = {
  mobile: "/images/hero-last-mobile.jpg",
  tablet: "/images/hero-last-mobile.jpg",
  // -v3 busts the year-long immutable cache after the desktop chain changed
  // (extracted from Part3's final frame).
  desktop: "/images/hero-last-desktop-v3.jpg",
};

export function Hero() {
  const reduce = useReducedMotion();

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

  // The chain plays in order, each clip fading in over the previous clip's
  // held last frame and playing once; the hero settles on the final clip's
  // last frame (hero-settle drift, applied below). A non-looping <video>
  // keeps painting its final frame after it ends, which is what lets each
  // hand-off read as a held shot rather than a cut to black. If any clip
  // can't start (blocked, still buffering, missing), the hero settles right
  // there on the frame it's already holding — never black.
  // Reduced-motion visitors skip the whole sequence and see the static poster.
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [settled, setSettled] = useState(false);
  useEffect(() => {
    if (reduce) return;
    const first = videoRefs.current[0];
    if (!first) return;
    setActiveIndex(0);
    setSettled(false);
    // The key={deviceType} swap remounts the elements, but call play() ourselves
    // too so a source change always restarts the chain from the top. Muted +
    // playsInline autoplay is permitted without a user gesture.
    const p = first.play();
    if (p) p.catch(() => {});
    const handlers: [HTMLVideoElement, () => void][] = [];
    videoRefs.current.forEach((el, i) => {
      if (!el) return;
      const onEnded = () => {
        const next = videoRefs.current[i + 1];
        if (!next) {
          setSettled(true);
          return;
        }
        const q = next.play();
        if (q) q.then(() => setActiveIndex(i + 1)).catch(() => setSettled(true));
        else setActiveIndex(i + 1);
      };
      el.addEventListener("ended", onEnded);
      handlers.push([el, onEnded]);
    });
    return () =>
      handlers.forEach(([el, fn]) => el.removeEventListener("ended", fn));
  }, [reduce, deviceType]);

  return (
    <section className="sticky top-0 z-0 flex h-[100dvh] flex-col justify-end overflow-hidden bg-navy-deep">
      <NavSentinel />

      {/* ── Footage — build plays once, interior fades in and plays once,
             then the hero rests on the interior's final frame ─────────── */}
      <div
        key={deviceType}
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* The first clip is the loader target and carries the reduced-motion
            poster (reduced-motion users see only it, as a still). Later clips
            preload behind the running footage, stay invisible until their
            turn, then crossfade in on top. */}
        {(reduce ? CHAIN[deviceType].slice(0, 1) : CHAIN[deviceType]).map(
          (src, i) => (
            <video
              key={src}
              ref={(el) => {
                videoRefs.current[i] = el;
              }}
              data-loader-target={i === 0 ? "hero-video" : undefined}
              muted
              playsInline
              autoPlay={i === 0 && !reduce}
              preload="auto"
              // Only reduced-motion users (no autoplay) need the still; for
              // everyone else a poster of the finished sequence would flash
              // before the first clip rewinds to its opening shot, so we let
              // the navy backdrop cover the sub-second gap instead.
              poster={i === 0 && reduce ? POSTER_SRC[deviceType] : undefined}
              className={`absolute inset-0 h-full w-full object-cover ${
                i === 0
                  ? ""
                  : `transition-opacity duration-700 ease-expo ${
                      activeIndex >= i ? "opacity-100" : "opacity-0"
                    }`
              } ${settled && activeIndex === i ? "hero-settle" : ""}`}
            >
              <source src={src} type="video/mp4" />
            </video>
          )
        )}
      </div>

      {/* ── Color grade — weighted to the left, where the copy sits ──── */}
      {/* Deepens slightly once the build settles, so the stop reads as a
          held shot gaining depth rather than motion simply cutting out. */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 transition-colors duration-[3s] ease-expo ${
          settled ? "bg-black/[0.12]" : "bg-black/5"
        }`}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/30 via-black/8 to-transparent"
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
      <div className="reveal-fade-in pointer-events-none absolute right-8 top-24 z-20 sm:right-12 sm:top-24 md:right-14 md:top-28 short:right-6 short:top-14">
        <Image
          src="/images/cfas-logo-light.png"
          alt="Central Florida Automation Services"
          width={200}
          height={99}
          className="h-14 w-auto sm:h-16 md:h-20 2xl:h-24 short:h-9"
          priority
        />
      </div>

      {/* ── Copy ────────────────────────────────────────────────────── */}
      <div className="relative z-20 mx-auto w-full max-w-[93.75rem] px-5 pb-24 sm:px-8 sm:pb-32 md:px-11 md:pb-36 lg:pb-28 xl:pb-32 2xl:max-w-[110rem] 2xl:pb-40 short:pb-8">
        <div className="max-w-[64rem] 2xl:max-w-[76rem]">

          <h1 className="font-hero font-light leading-[0.95] tracking-[-0.025em] lg:[text-shadow:0_2px_28px_rgba(0,0,0,0.5)]">
            <span className="reveal-load rd-1 block text-[clamp(1.55rem,min(6vw,13vh),5.25rem)] text-white">
              Central Florida&apos;s leader
            </span>
            <span className="reveal-load rd-2 block text-[clamp(1.55rem,min(6vw,13vh),5.25rem)] text-white/80 lg:text-white">
              in smart home automation
            </span>
            <span className="reveal-load rd-3 block text-[clamp(1.55rem,min(6vw,13vh),5.25rem)] text-white/50 lg:text-white">
              since 1968.
            </span>
          </h1>

          <div className="reveal-load rd-4 mt-7 h-px w-24 bg-white/70 sm:mt-10 2xl:w-32 short:mt-3" />

          <p className="reveal-load rd-5 mt-5 max-w-[42rem] font-display text-[clamp(1rem,2vw,1.9rem)] font-light leading-[1.55] tracking-[-0.005em] text-white/75 sm:mt-8 2xl:max-w-[52rem] short:mt-3 short:text-[0.95rem]">
            {SUBTITLE}
          </p>

          <div className="reveal-load rd-6 mt-8 flex flex-wrap items-center gap-4 sm:mt-10 short:mt-4">
            <CTAButton href="/smart-security" variant="primary" compactOnMobile>
              Explore Smart Security
            </CTAButton>
            <CTAButton href="/contact" variant="ghost" arrow={false} compactOnMobile>
              Request a Consultation
            </CTAButton>
          </div>

        </div>
      </div>

    </section>
  );
}
