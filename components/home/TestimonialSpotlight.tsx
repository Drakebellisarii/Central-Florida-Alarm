"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { FEATURED_TESTIMONIAL } from "@/lib/content";

// Three builder-association marks in one row. Each carries its own height
// rather than a shared class so the set reads at equal optical weight: the
// GOBA wordmark's letters fill their box and need the least height, while
// the Master Custom Builder lockup is mostly a circular seal with small
// type beside it and needs the most to register at the same size.
// (The Lutron Platinum Dealer badge lives in AboutSection — it's a
// manufacturer certification, not a builder-association membership.)
const ACCREDITATIONS = [
  { src: "/images/GOBA.png", alt: "Greater Orlando Builders Association", width: 120, height: 60, cls: "h-8 md:h-9 lg:h-7 xl:h-9" },
  { src: "/images/GOBA-Logo.png", alt: "GOBA Custom Home & Remodeling Council", width: 135, height: 56, cls: "h-9 md:h-10 lg:h-8 xl:h-10" },
  { src: "/images/MCBC_Logo.jpg", alt: "Master Custom Builder Council", width: 200, height: 60, cls: "h-10 md:h-11 lg:h-9 xl:h-11" },
];

export function TestimonialSpotlight() {
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

        {/* Accreditations — one left-aligned row, whitespace alone separating
            the marks. No motion at rest: PartnerMarquee scrolls a longer
            brand row a short scroll below, so a second moving strip this
            close would compete with it. */}
        <div className="reveal-scroll mt-10 border-t border-navy/10 pt-[1.625rem] lg:mt-12">
          <span className="shrink-0 whitespace-nowrap font-sans text-[0.65625rem] uppercase tracking-wide2 text-stone">
            Accredited By
          </span>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-6 sm:gap-x-6 md:gap-x-8 lg:gap-x-4 xl:gap-x-5 2xl:gap-x-8">
            {ACCREDITATIONS.map((logo) => (
              <span key={logo.alt} className="group flex items-center">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width}
                  height={logo.height}
                  className={`${logo.cls} w-auto object-contain transition-transform duration-500 ease-expo group-hover:scale-110`}
                />
              </span>
            ))}
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
          {/* No autoPlay and preload="none": the clip stays off the wire on
              first load so it never competes with the hero for bandwidth —
              the IntersectionObserver above starts it (which triggers the
              fetch) as the section scrolls into view; the poster paints
              until then. */}
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="none"
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
