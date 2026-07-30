"use client";

import { Reveal } from "@/components/Reveal";
import { PartnerMarquee } from "@/components/home/PartnerMarquee";

/**
 * Brand creed, typeset as a dictionary entry — because integration is the
 * whole business. One left-anchored column: headword, pronunciation,
 * definition, and closing line, stacked with deliberate, escalating
 * spacing — tight within a group, generous between them — rather than
 * spread across the section's full width.
 */
const CREED = ["Since 1968", "One Mission", "Quality"];

export function IntegrateCreed() {
  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-navy-deep">
      <div className="mx-auto max-w-[87.5rem] px-5 py-14 sm:px-8 md:px-11 md:py-20">

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

        {/* Dictionary entry — one column, held to the left with room to
            breathe rather than stretched across the full section width. */}
        <div className="mt-10 max-w-xl lg:mt-12">

          <Reveal index={1}>
            <h2 className="font-display text-[clamp(2.6rem,6.5vw,4.5rem)] font-light leading-[0.9] tracking-tight text-white">
              in&middot;te&middot;grate
            </h2>
            <p className="mt-4 flex flex-wrap items-baseline gap-x-4 font-sans text-[0.8125rem] text-bone-dim sm:text-[0.875rem]">
              <span className="tracking-wide">/ˈin-tə-ˌgrāt/</span>
              <span className="italic text-bone-dim/70">verb</span>
            </p>
          </Reveal>

          {/* The one deliberate divider — short, accent-colored, marking the
              seam between the entry and the definition. */}
          <div className="my-7 h-px w-10 bg-bronze/50" />

          <Reveal index={2}>
            <p className="flex items-baseline gap-3">
              <span className="font-sans text-[0.8125rem] font-medium text-bronze">
                1
              </span>
              <span className="font-display text-[clamp(1.25rem,2.6vw,1.75rem)] font-light leading-[1.3] tracking-tight text-white">
                to bring together or incorporate parts into a whole.
              </span>
            </p>
            <p className="mt-5 font-sans text-[0.875rem] leading-relaxed text-bone-dim">
              Which is exactly what we are. Not a single brand or a box on a
              shelf: the team that makes every system in the home speak as
              one.
            </p>
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
