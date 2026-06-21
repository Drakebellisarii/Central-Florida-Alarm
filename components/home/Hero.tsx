"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { NavSentinel } from "@/components/NavSentinel";

const SUBTITLE =
  "Since 1968 we have worked beside architects, contractors, and interior designers, to enhance the convenience, safety and lifestyle of your home";

type DeviceType = "mobile" | "tablet" | "desktop";

const VIDEO_SRC: Record<DeviceType, string> = {
  mobile: "/iphone-hero-hig.mp4",
  tablet: "/ipad-hero.mp4",
  desktop: "/Hero-Scroll.mp4",
};

export function Hero() {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const isScrollScrub = !reduce;

  // Three-tier device detection: phone / tablet / desktop
  const [deviceType, setDeviceType] = useState<DeviceType>("mobile");
  useEffect(() => {
    const getType = (): DeviceType => {
      if (window.matchMedia("(min-width: 1024px)").matches) return "desktop";
      if (window.matchMedia("(min-width: 768px)").matches) return "tablet";
      return "mobile";
    };
    const apply = () => setDeviceType(getType());
    apply();
    const mqLg = window.matchMedia("(min-width: 1024px)");
    const mqMd = window.matchMedia("(min-width: 768px)");
    mqLg.addEventListener("change", apply);
    mqMd.addEventListener("change", apply);
    return () => {
      mqLg.removeEventListener("change", apply);
      mqMd.removeEventListener("change", apply);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const clipProgress = useTransform(scrollYProgress, [0, 0.75], [0, 1], {
    clamp: true,
  });

  const smoothProgress = useSpring(clipProgress, {
    stiffness: 110,
    damping: 28,
    mass: 0.35,
  });

  const EASE = [0.16, 1, 0.3, 1] as const;
  const lineIn = (delay: number) => ({
    initial: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.7, ease: EASE, delay },
  });

  // Reduced-motion fallback: autoplay the video as a loop instead of scrubbing.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || isScrollScrub) return;
    const p = video.play();
    if (p) p.catch(() => {});
  }, [isScrollScrub, deviceType]);

  // Scroll-scrub: drive video.currentTime from the smoothed spring value.
  //
  // The critical mobile fix is here. Mobile browsers ignore preload="auto" to
  // save bandwidth, so the video never buffers and currentTime manipulation
  // silently does nothing — producing the blank (blue) screen. The fix:
  // call play() on the muted+playsInline video. Muted autoplay is permitted
  // without a user gesture on iOS Safari and Android Chrome. The play() call
  // is what kicks off buffering. Once the promise resolves (first frame ready),
  // we immediately pause and hand full control to the RAF loop below.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isScrollScrub) return;

    const prime = video.play();
    if (prime) {
      prime
        .then(() => { video.pause(); })
        .catch(() => {
          // Autoplay blocked (rare for muted video) — explicit load() as fallback
          video.load();
        });
    }

    let raf = 0;
    let duration = video.duration || 0;
    let current = 0;

    const onMeta = () => { duration = video.duration || 8; };
    video.addEventListener("loadedmetadata", onMeta);
    if (video.readyState >= 1) onMeta();

    const tick = () => {
      if (duration && Number.isFinite(duration)) {
        const progress = Math.min(1, Math.max(0, smoothProgress.get()));
        const target = Math.min(progress * duration, duration - 0.05);
        if (!video.seeking && Math.abs(target - current) > 1 / 60) {
          current = target;
          video.currentTime = target;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      video.removeEventListener("loadedmetadata", onMeta);
    };
  }, [isScrollScrub, smoothProgress, deviceType]);

  return (
    <div
      ref={containerRef}
      className={`relative ${reduce ? "h-[100dvh]" : "h-[400dvh]"}`}
    >
      <section className="sticky top-0 z-10 flex h-[100dvh] flex-col justify-end overflow-hidden bg-navy-deep">
        <NavSentinel />

        {/* ── Scroll-scrubbed footage ─────────────────────────────────── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <video
            key={deviceType}
            ref={videoRef}
            muted
            playsInline
            preload="auto"
            poster={deviceType === "desktop" ? "/images/hero-scroll-poster.jpg" : undefined}
            autoPlay={reduce ? true : undefined}
            loop={reduce ? true : undefined}
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src={VIDEO_SRC[deviceType]} type="video/mp4" />
          </video>
        </div>

        {/* ── Color grade ─────────────────────────────────────────────── */}
        <div aria-hidden="true" className="absolute inset-0 bg-black/40" />
        <div aria-hidden="true" className="absolute inset-0 bg-navy-logo/0" />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-transparent"
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
        <motion.div
          initial={reduce ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3, delay: 0.5, ease: "easeOut" }}
          className="pointer-events-none absolute right-8 top-24 z-20 sm:right-12 sm:top-24 md:right-14 md:top-28"
        >
          <Image
            src="/images/cfas-logo-light.png"
            alt="Central Florida Automation Services"
            width={200}
            height={99}
            className="h-20 w-auto sm:h-24 md:h-28"
            priority
          />
        </motion.div>

        {/* ── Copy ────────────────────────────────────────────────────── */}
        <div className="relative z-20 mx-auto w-full max-w-[1500px] px-5 pb-24 sm:px-8 sm:pb-32 md:px-11 md:pb-36 lg:pb-28 xl:pb-32">
          <div className="max-w-[64rem]">

            <h1 className="font-display font-light leading-[0.95] tracking-[-0.025em]">
              <motion.span
                {...lineIn(0.5)}
                className="block text-[clamp(1.7rem,7vw,5.5rem)] text-white"
              >
                Central Florida&apos;s leader
              </motion.span>
              <motion.span
                {...lineIn(1.25)}
                className="block text-[clamp(1.7rem,7vw,5.5rem)] text-white/80"
              >
                in smart home automation
              </motion.span>
              <motion.span
                {...lineIn(2.0)}
                className="block text-[clamp(1.7rem,7vw,5.5rem)] text-white/50"
              >
                since 1968.
              </motion.span>
            </h1>

            <motion.div
              initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.3, ease: EASE, delay: 2.9 }}
              style={{ transformOrigin: "left" }}
              className="mt-7 h-px w-24 bg-white/70 sm:mt-10"
            />

            <motion.p
              initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.7, ease: EASE, delay: 3.5 }}
              className="mt-5 max-w-[42rem] font-display text-[clamp(1rem,2vw,1.65rem)] font-light leading-[1.55] tracking-[-0.005em] text-white/75 sm:mt-8"
            >
              {SUBTITLE}
            </motion.p>

          </div>
        </div>

      </section>
    </div>
  );
}
