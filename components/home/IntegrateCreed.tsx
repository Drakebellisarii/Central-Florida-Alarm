"use client";

import { Reveal } from "@/components/Reveal";

/**
 * Brand creed, typeset as a dictionary entry — because integration is the
 * whole business. The "Since 1968 · One Mission · Quality" motto sits above
 * the headword, then the word is broken into syllables with a pronunciation,
 * part of speech, and a numbered sense, exactly like a printed lexicon.
 */
export function IntegrateCreed() {
  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-navy-deep">
      <div className="mx-auto max-w-[1500px] px-5 py-16 sm:px-8 md:px-11 md:py-20">

        {/* Motto */}
        <Reveal>
          <p className="font-sans text-[11px] uppercase tracking-eyebrow text-bone/55 sm:text-[12px]">
            Since 1968 &nbsp;&middot;&nbsp; One Mission &nbsp;&middot;&nbsp; Quality
          </p>
        </Reveal>

        {/* Dictionary entry */}
        <Reveal index={1}>
          <div className="mt-8 max-w-3xl">
            <h2 className="font-display text-[clamp(2.4rem,9vw,5.25rem)] font-light leading-[0.92] tracking-tight text-white">
              in&middot;te&middot;grate
            </h2>

            <p className="mt-4 flex flex-wrap items-baseline gap-x-5 gap-y-1 font-sans text-[13px] text-bone/50 sm:text-[14px]">
              <span className="tracking-wide">/ˈin-tə-ˌgrāt/</span>
              <span className="italic text-bone/40">verb</span>
            </p>

            <div className="mt-7 h-px w-16 bg-white/25" />

            <div className="mt-7 flex gap-4 sm:gap-5">
              <span className="mt-[0.35em] shrink-0 font-sans text-[14px] text-bone/40 sm:text-[15px]">
                1
              </span>
              <p className="font-display text-[clamp(1.35rem,3.6vw,2.1rem)] font-light leading-[1.3] tracking-tight text-white/85">
                to bring together or incorporate parts into a whole.
              </p>
            </div>

            <p className="mt-7 max-w-md pl-8 font-sans text-[14px] leading-relaxed text-bone/45 sm:pl-9 sm:text-[15px]">
              Which is exactly what we are. Not a single brand or a box on a
              shelf — the team that makes every system in the home speak as one.
            </p>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
