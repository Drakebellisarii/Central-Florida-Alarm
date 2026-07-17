"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { NavSentinel } from "@/components/NavSentinel";
import { CTAButton } from "@/components/CTAButton";

const SUBTITLE =
  "We partner with architects, contractors, and interior designers, to enhance the convenience, safety and lifestyle of your home.";

type DeviceType = "mobile" | "tablet" | "desktop";

// Per-device clip chains. Each clip fades in over the previous clip's held
// final frame and plays once; the hero settles on the last one.
const CHAIN: Record<DeviceType, string[]> = {
  mobile: ["/Mobile.mp4"],
  // Tablets share the portrait phone clip — no separate iPad encode.
  tablet: ["/Mobile.mp4"],
  // One continuous file — the three desktop shots are concatenated offline
  // (ffmpeg xfade) with 0.9s cross-dissolves rendered frame-by-frame, so the
  // hand-offs are baked into the footage instead of composited at runtime.
  // -v3: third shot replaced with Finalized3.mp4.
  desktop: ["/hero-desktop-seq-v3.mp4"],
};

// Last frame of each chain — used as the static poster for reduced-motion
// visitors, who never see the sequence play out.
const POSTER_SRC: Record<DeviceType, string> = {
  // -v3 busts the year-long immutable cache after the portrait clip changed
  // (extracted from Mobile.mp4's final frame).
  mobile: "/images/hero-last-mobile-v3.jpg",
  tablet: "/images/hero-last-mobile-v3.jpg",
  // -v6 busts the year-long immutable cache after the desktop chain changed
  // (extracted from the baked sequence's final frame, Finalized3's last shot).
  desktop: "/images/hero-last-desktop-v6.jpg",
};

// Film-style cross-dissolve: the next clip starts playing this many seconds
// before the current one ends, so the fade blends two moving images instead
// of fading over a frozen frame. Must be comfortably longer than the CSS
// fade below so the outgoing clip is still in motion for the whole dissolve.
const DISSOLVE_EARLY_S = 1.2;

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
    const handlers: [HTMLVideoElement, string, () => void][] = [];
    videoRefs.current.forEach((el, i) => {
      if (!el) return;
      const next = videoRefs.current[i + 1];
      // The dissolve starts shortly before this clip ends, so both clips are
      // in motion while the fade runs. Guarded so it only fires once.
      let dissolved = false;
      const startDissolve = () => {
        if (dissolved || !next) return;
        dissolved = true;
        const q = next.play();
        if (q) {
          q.then(() => setActiveIndex(i + 1)).catch(() => {
            // Not ready yet — let the ended handler retry at the hard cut.
            dissolved = false;
          });
        } else {
          setActiveIndex(i + 1);
        }
      };
      const onTime = () => {
        if (
          el.duration &&
          el.duration - el.currentTime <= DISSOLVE_EARLY_S
        ) {
          startDissolve();
        }
      };
      const onEnded = () => {
        if (!next) {
          setSettled(true);
          return;
        }
        if (dissolved) return;
        // The early dissolve never started (slow buffer, rejected play): one
        // last attempt, else settle on this clip's held frame — never black.
        const q = next.play();
        if (q) q.then(() => setActiveIndex(i + 1)).catch(() => setSettled(true));
        else setActiveIndex(i + 1);
      };
      el.addEventListener("timeupdate", onTime);
      el.addEventListener("ended", onEnded);
      handlers.push([el, "timeupdate", onTime], [el, "ended", onEnded]);
    });
    return () =>
      handlers.forEach(([el, evt, fn]) => el.removeEventListener(evt, fn));
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
              // The loader splash gates on the first two entries: the primary
              // clip buffered deep enough to play through its opening shots,
              // and (on the multi-clip mobile chain) the second clip ready.
              data-loader-target={
                i === 0 ? "hero-video" : i === 1 ? "hero-video-2" : undefined
              }
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
                  : `transition-opacity duration-1000 ease-in-out ${
                      activeIndex >= i ? "opacity-100" : "opacity-0"
                    }`
              } ${settled && activeIndex === i ? "hero-settle" : ""}`}
            >
              <source src={src} type="video/mp4" />
            </video>
          )
        )}
      </div>

      {/* ── Directional scrim ── */}
      {/* Anchored at bottom-left where all three headline lines sit.
          Fades diagonally to near-clear at top-right so the sky and
          photography read as they were shot. Three layers each do one
          job so none of them has to be heavy. */}

      {/* 1. Radial origin at bottom-left — the primary text shield */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 95% 90% at 0% 100%, rgba(0,0,0,0.60) 0%, rgba(0,0,0,0.34) 36%, rgba(0,0,0,0.10) 62%, transparent 80%)",
        }}
      />

      {/* 2. Left-to-right band — darkest on the left, practically clear by ~55% */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0.58) 0%, rgba(0,0,0,0.28) 30%, rgba(0,0,0,0.08) 52%, transparent 68%)",
        }}
      />

      {/* 3. Bottom lift — pulls the lower copy off the floor */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-2/5"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.06) 55%, transparent 100%)",
        }}
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

      {/* ── Copy ────────────────────────────────────────────────────── */}
      <div className="relative z-20 mx-auto w-full max-w-[93.75rem] px-5 pb-24 sm:px-8 sm:pb-32 md:px-11 md:pb-36 lg:pb-28 xl:pb-32 2xl:max-w-[110rem] 2xl:pb-40 short:pb-8">
        <div className="max-w-[64rem] 2xl:max-w-[76rem]">

          <h1 className="font-hero font-light leading-[0.95] tracking-[-0.025em] lg:[text-shadow:0_2px_28px_rgba(0,0,0,0.45)]">
            <span className="reveal-load rd-1 block text-[clamp(1.55rem,min(6vw,13vh),3.5rem)] 2xl:text-[clamp(2.5rem,min(5.5vw,12vh),5.25rem)] text-white">
              Central Florida&apos;s leader
            </span>
            <span className="reveal-load rd-2 block text-[clamp(1.55rem,min(6vw,13vh),3.5rem)] 2xl:text-[clamp(2.5rem,min(5.5vw,12vh),5.25rem)] text-white/80 lg:text-white">
              in smart home automation
            </span>
            <span className="reveal-load rd-3 block text-[clamp(1.55rem,min(6vw,13vh),3.5rem)] 2xl:text-[clamp(2.5rem,min(5.5vw,12vh),5.25rem)] text-white/50 lg:text-white">
              since 1968.
            </span>
          </h1>

          {/* Structural divider — gradient hairline fades into the scene */}
          <div
            className="reveal-load rd-4 mt-5 h-px w-64 sm:mt-6 short:mt-3"
            style={{
              background:
                "linear-gradient(to right, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.18) 65%, transparent 100%)",
            }}
          />

          <p className="reveal-load rd-5 mt-6 max-w-[42rem] font-display text-[clamp(1rem,2vw,1.9rem)] font-light leading-[1.55] tracking-[-0.005em] text-white sm:mt-8 2xl:max-w-[52rem] short:mt-3 short:text-[0.95rem]">
            {SUBTITLE}
          </p>

          <div className="reveal-load rd-6 mt-10 flex flex-wrap items-center gap-6 sm:mt-14 short:mt-5">
            <CTAButton href="/contact" variant="primary" compactOnMobile>
              Request a Consultation
            </CTAButton>
            <CTAButton href="/smart-security" variant="ghost" arrow={false} compactOnMobile>
              Explore Smart Security
            </CTAButton>
          </div>

        </div>
      </div>

    </section>
  );
}
