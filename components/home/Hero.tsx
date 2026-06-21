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

export function Hero() {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const isScrollScrub = !reduce;

  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const apply = () => setIsDesktop(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // Scroll progress across the whole pinned region (0 at the top, 1 once the
  // container's bottom edge reaches the bottom of the viewport).
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // The clip scrubs across the runway and finishes exactly as the About panel
  // begins sliding up (it starts at 200/300 ≈ 0.66 — its -mt-[100dvh] over a
  // 300dvh runway). Finishing the scrub right at that point removes the dead
  // stretch where the hero sat pinned with nothing left to play.
  const clipProgress = useTransform(scrollYProgress, [0, 0.75], [0, 1], {
    clamp: true,
  });

  // Spring-smooth the raw scroll input so wheel steps and flicks glide into
  // each other instead of snapping frame-to-frame — this is what sells the
  // "I'm driving the footage" feel rather than "the video is just playing".
  const smoothProgress = useSpring(clipProgress, {
    stiffness: 110,
    damping: 28,
    mass: 0.35,
  });

  // The copy assembles itself on a timer once the hero mounts — scroll only
  // drives the footage behind it (decoupling the text from scroll is what
  // keeps it from glitching on fast or reversed scrolls). The header rises in
  // line by line, then the rule draws, then the subheader settles. A long
  // expo-out ease over staggered delays gives it the cinematic, deliberate
  // entrance rather than a snap.
  const EASE = [0.16, 1, 0.3, 1] as const;
  const lineIn = (delay: number) => ({
    initial: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.7, ease: EASE, delay },
  });

  // On mobile / reduced-motion the video autoplays. Call .play() explicitly so
  // it restarts correctly whether this is first load or a resize back from
  // desktop (where the scrub effect would have called .pause() and left it
  // stopped — the autoPlay HTML attribute alone won't restart a paused video).
  useEffect(() => {
    const video = videoRef.current;
    if (!video || isScrollScrub) return;
    const p = video.play();
    if (p) p.catch(() => {});
  }, [isScrollScrub, isDesktop]);

  // Drive the video's currentTime from the smoothed scroll value every frame.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isScrollScrub) return;

    video.pause();

    let raf = 0;
    let duration = video.duration || 0;
    let current = 0;

    const onMeta = () => {
      duration = video.duration || 8;
    };
    video.addEventListener("loadedmetadata", onMeta);
    if (video.readyState >= 1) onMeta();

    const tick = () => {
      // Bail until we have a real, finite duration (initial state / streaming
      // can report 0, NaN, or Infinity).
      if (duration && Number.isFinite(duration)) {
        // The spring oscillates and overshoots, so its value routinely lands
        // just below 0 or above 1 on a flick or a quick scroll reversal.
        // Clamp the progress before mapping it to a time, otherwise we'd seek
        // to a negative time or past the end — the source of the flicker and
        // black frames when scrolling up and down quickly. Hold a hair short
        // of the very end, which paints blank in some browsers.
        const progress = Math.min(1, Math.max(0, smoothProgress.get()));
        const target = Math.min(progress * duration, duration - 0.05);
        // Skip while a seek is still in flight — reassigning currentTime mid
        // seek makes the decoder drop frames and stutter.
        if (!video.seeking && Math.abs(target - current) > 1 / 60) {
          current = target;
          // requestVideoFrameCallback isn't needed: with an all-keyframe clip
          // a direct seek paints the exact frame with no decode lag.
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
  }, [isScrollScrub, smoothProgress, isDesktop]);

  return (
    // The tall container is the scroll runway. The sticky child stays locked
    // to the viewport while the page scrolls through it, turning vertical
    // scroll distance into video playhead position.
    <div
      ref={containerRef}
      className={`relative ${reduce ? "h-[100dvh]" : "h-[300dvh] lg:h-[400dvh]"}`}
    >
      <section className="sticky top-0 z-10 flex h-[100dvh] flex-col justify-end overflow-hidden bg-navy-deep">
        <NavSentinel />

        {/* ── Scroll-scrubbed footage ─────────────────────────────────── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <video
            key={isDesktop ? "desktop" : "mobile"}
            ref={videoRef}
            muted
            playsInline
            preload="auto"
            poster={isDesktop ? "/images/hero-scroll-poster.jpg" : undefined}
            autoPlay={reduce ? true : undefined}
            loop={reduce ? true : undefined}
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source
              src={isDesktop ? "/Hero-Scroll.mp4" : "/mobile-mansion-construction.mp4"}
              type="video/mp4"
            />
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

        {/* ── Copy — assembled on a timer, header first then subheader ──── */}
        <div className="relative z-20 mx-auto w-full max-w-[1500px] px-5 pb-24 sm:px-8 sm:pb-32 md:px-11 md:pb-36 lg:pb-28 xl:pb-32">
          <div className="max-w-[64rem]">

            {/* H1 — three lines rise in one after another */}
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

            {/* Separator — logo blue */}
            <motion.div
              initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.3, ease: EASE, delay: 2.9 }}
              style={{ transformOrigin: "left" }}
              className="mt-7 h-px w-24 bg-white/70 sm:mt-10"
            />

            {/* Subheader — follows the header in */}
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
