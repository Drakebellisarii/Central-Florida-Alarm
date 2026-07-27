"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { FEATURED_TESTIMONIAL } from "@/lib/content";

// Four accreditation marks, all constrained to one optical height and
// desaturated so the mix of teal, navy, and black logos reads as one family.
const ACCREDITATIONS = [
  { src: "/images/GOBA.png", alt: "Greater Orlando Builders Association", width: 120, height: 60 },
  { src: "/images/GOBA-Logo.png", alt: "GOBA Custom Home & Remodeling Council", width: 135, height: 56 },
  { src: "/images/MCBC_Logo.jpg", alt: "Master Custom Builder Council", width: 200, height: 60 },
  { src: "/images/Lutron-platinum.png", alt: "Lutron Platinum Dealer 2026", width: 200, height: 184 },
];

export function AboutSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // On mobile the video is below the fold and won't autoplay until the
    // user scrolls to it — watch for it entering the viewport and play then.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const p = video.play();
          if (p) p.catch(() => {});
        }
      },
      { threshold: 0.1 }
    );
    io.observe(video);

    return () => {
      io.disconnect();
    };
  }, []);

  return (
    <section className="relative flex min-h-[100dvh] flex-col bg-white lg:flex-row">

      {/* ── Left — the testimonial is the sole content of this column ──── */}
      <div className="order-2 flex min-w-0 flex-col justify-center px-6 py-16 sm:px-8 md:px-10 md:py-16 lg:order-1 lg:w-[42%] lg:justify-end lg:px-16 lg:py-20 xl:px-20">

        {/* Mission statement moved to the three-card section above — this
            column now opens directly on the testimonial, with more room to
            breathe. */}
        <p className="reveal-scroll font-sans text-[0.6875rem] uppercase tracking-[0.18em] text-navy/50">
          In Their Words
        </p>

        {/* Pull-quote + body — one client testimonial, split by weight
            rather than by card/avatar chrome. The decorative opening mark
            reads as texture behind the pull-quote, not as punctuation. */}
        <blockquote className="reveal-scroll relative mt-6">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -left-3.5 -top-[1.875rem] select-none font-display text-[5rem] leading-none text-navy-deep/[0.07] lg:text-[6.875rem]"
          >
            &ldquo;
          </span>

          <p className="relative max-w-[19em] font-display text-[1.375rem] leading-[1.42] tracking-tight text-navy-deep lg:text-[1.6875rem]">
            {FEATURED_TESTIMONIAL.pullQuote}
          </p>

          <p className="relative mt-5 max-w-[34em] font-display text-[0.9375rem] leading-[1.75] text-stone">
            {FEATURED_TESTIMONIAL.body}
          </p>
        </blockquote>

        <div className="reveal-scroll mt-8">
          <cite className="block not-italic">
            <span className="block font-display text-[1.1875rem] text-navy-deep">
              {FEATURED_TESTIMONIAL.name}
            </span>
            <span className="mt-1 block font-sans text-[0.8125rem] font-medium text-navy/70">
              {FEATURED_TESTIMONIAL.role}
            </span>
          </cite>
        </div>

        {/* Accreditations. A real grid, not a wrapping flex row — that
            guarantees the four marks always land 2x2 or 1x4, never an
            orphaned 3-then-1. Sized for legibility first: the MCBC and
            Lutron marks carry small-print text that disappears below this
            height. Full color per client request, no dividers. */}
        <div className="reveal-scroll mt-10 border-t border-navy/10 pt-[1.625rem] lg:mt-12">
          <div className="flex flex-col items-start gap-4">
            <span className="shrink-0 whitespace-nowrap font-sans text-[0.65625rem] uppercase tracking-wide2 text-stone">
              Accredited By
            </span>
            <div className="grid grid-cols-2 items-center gap-x-6 gap-y-5 sm:grid-cols-4 lg:grid-cols-2">
              {ACCREDITATIONS.map((logo) => (
                <div
                  key={logo.alt}
                  className="flex h-12 min-w-0 items-center transition-transform duration-500 ease-expo hover:scale-125 xl:h-16"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={logo.width}
                    height={logo.height}
                    className="h-full w-auto max-w-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* ── Right — portrait video. Inset top/bottom at lg+ so it reads as
          placed rather than as background, while still bleeding off the
          right edge of the viewport; a contained 4:3 plate above the text
          on narrower screens. */}
      <div className="relative order-1 flex aspect-[4/3] w-full items-center justify-center overflow-hidden bg-navy-deep lg:order-2 lg:aspect-auto lg:my-20 lg:h-auto lg:w-[58%]">
        <div className="grain absolute inset-0 opacity-30" />
        {/* Container fills the right panel — video is cropped to match once
            it's re-exported at the panel's portrait aspect ratio. */}
        <div className="relative z-10 h-full w-full overflow-hidden">
          <video
            ref={videoRef}
            data-loader-target="about-video"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/images/blinds-poster.jpg"
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/CFAS-Blind2.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

    </section>
  );
}
