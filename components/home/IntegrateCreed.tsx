"use client";

import { Reveal } from "@/components/Reveal";
import { PartnerMarquee } from "@/components/home/PartnerMarquee";

/**
 * Brand creed, typeset as a dictionary entry — because integration is the
 * whole business. A true two-column spread: headword + pronunciation sit in
 * a narrow left column, the definition and closing line fill a wider right
 * column, the two separated by one deliberate rule (a column divider, like
 * a printed lexicon's index rule) instead of scattered decorative hairlines.
 */
const CREED = ["Since 1968", "One Mission", "Quality"];

export function IntegrateCreed() {
  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-navy-deep">
      <div className="mx-auto max-w-[87.5rem] px-5 py-20 sm:px-8 md:px-11 md:py-28">

        {/* Motto — the brand line, sitting above the entry */}
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

        {/* Dictionary entry — two columns sharing one top edge */}
        <div className="mt-16 grid grid-cols-1 lg:mt-24 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-x-16 xl:gap-x-24">

          {/* Left — headword, pronunciation, and part of speech held tight
              together as one group. */}
          <Reveal index={1}>
            <div className="lg:pr-10 xl:pr-14">
              <h2 className="font-display text-[clamp(3.4rem,11vw,7.75rem)] font-light leading-[0.86] tracking-tight text-white">
                in&middot;te&middot;grate
              </h2>
              <p className="mt-5 flex flex-wrap items-baseline gap-x-4 font-sans text-[0.875rem] text-bone-dim sm:text-[0.9375rem]">
                <span className="tracking-wide">/ˈin-tə-ˌgrāt/</span>
                <span className="italic text-bone-dim/70">verb</span>
              </p>
            </div>
          </Reveal>

          {/* The one deliberate divider allowed — short, and only where the
              layout stacks to a single column; the lg+ column rule (a border
              on the right column, which is always the taller of the two, so
              it naturally spans the full row without any stretch tricks)
              takes over from there. */}
          <div className="my-10 h-px w-12 bg-white/15 lg:hidden" />

          {/* Right — definition first (the payoff), closing line after (the
              resolution), generously separated from the entry on its left. */}
          <Reveal index={2}>
            <div className="lg:border-l lg:border-white/10 lg:pl-10 lg:pt-4 xl:pl-14 xl:pt-5">
              <p className="flex items-baseline gap-4">
                <span className="font-sans text-[0.9375rem] font-medium text-bronze">
                  1
                </span>
                <span className="font-display text-[clamp(1.8rem,4vw,2.75rem)] font-light leading-[1.22] tracking-tight text-white">
                  to bring together or incorporate parts into a whole.
                </span>
              </p>
              <p className="mt-9 max-w-lg font-sans text-[0.9375rem] leading-relaxed text-bone-dim md:text-[1rem]">
                Which is exactly what we are. Not a single brand or a box on a
                shelf: the team that makes every system in the home speak as
                one.
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Flush against the content above — no padding, no gap. The hard cut
          from this dark section to the marquee's white plate is the divider
          into the section below; see PartnerMarquee for the rest of it. */}
      <PartnerMarquee />
    </section>
  );
}
