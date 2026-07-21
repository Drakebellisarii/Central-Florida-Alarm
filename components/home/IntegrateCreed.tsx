"use client";

import { Reveal } from "@/components/Reveal";
import { PartnerMarquee } from "@/components/home/PartnerMarquee";

/**
 * Brand creed, typeset as a dictionary entry — because integration is the
 * whole business. The "Since 1968 · One Mission · Quality" motto sits above
 * the headword, then the word is broken into syllables with a pronunciation,
 * part of speech, and a numbered sense, exactly like a printed lexicon.
 */
const CREED = ["Since 1968", "One Mission", "Quality"];

export function IntegrateCreed() {
  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-navy-deep">
      <div className="mx-auto max-w-[93.75rem] px-5 py-16 sm:px-8 md:px-11 md:py-20">

        {/* Motto — the brand line, sitting above the headword */}
        <Reveal>
          {/* Must never wrap on phones: nowrap + viewport-scaled size, gaps,
              and tracking keep all three words on one line down to ~320px. */}
          <div className="flex flex-nowrap items-center gap-x-3 gap-y-2 whitespace-nowrap font-sans text-[clamp(0.5625rem,2.8vw,0.9375rem)] uppercase tracking-[0.12em] text-bone/60 sm:flex-wrap sm:gap-x-6 sm:whitespace-normal sm:text-[1.0625rem] sm:tracking-eyebrow">
            {CREED.map((word, i) => (
              <span key={word} className="flex items-center gap-x-3 sm:gap-x-6">
                {i > 0 && (
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-white/30" />
                )}
                {word}
              </span>
            ))}
          </div>
        </Reveal>

        {/* Dictionary entry */}
        <Reveal index={1}>
          <div className="mt-8 max-w-3xl">
            <h2 className="font-display text-[clamp(2.4rem,9vw,5.25rem)] font-light leading-[0.92] tracking-tight text-white">
              in&middot;te&middot;grate
            </h2>

            <p className="mt-4 flex flex-wrap items-baseline gap-x-5 gap-y-1 font-sans text-[0.8125rem] text-bone/50 sm:text-[0.875rem]">
              <span className="tracking-wide">/ˈin-tə-ˌgrāt/</span>
              <span className="italic text-bone/40">verb</span>
            </p>

            <div className="mt-7 h-px w-16 bg-white/25" />

            <div className="mt-7 flex gap-4 sm:gap-5">
              <span className="mt-[0.35em] shrink-0 font-sans text-[0.875rem] text-bone/40 sm:text-[0.9375rem]">
                1
              </span>
              <p className="font-display text-[clamp(1.35rem,3.6vw,2.1rem)] font-light leading-[1.3] tracking-tight text-white/85">
                to bring together or incorporate parts into a whole.
              </p>
            </div>

            <p className="mt-10 max-w-lg font-sans text-[0.875rem] leading-relaxed text-bone/45 sm:text-[0.9375rem]">
              Which is exactly what we are. Not a single brand or a box on a
              shelf: the team that makes every system in the home speak as one.
            </p>
          </div>
        </Reveal>

      </div>

      {/* Flush against the content above — no padding, no gap. The hard cut
          from this dark section to the marquee's white plate is the divider
          into ServicesSection below; see PartnerMarquee for the rest of it. */}
      <PartnerMarquee />
    </section>
  );
}
