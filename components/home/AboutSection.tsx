import Image from "next/image";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { MISSION_STATEMENT, CULTURE } from "@/lib/content";
import { BUSINESS } from "@/lib/seo";

const ABOUT_TEXT =
  "We are a local, family-run team serving Central Florida's residential and commercial market. We specialize in all facets of security, Lutron lighting and shades, audio and video, rock solid networks, and smart automation systems. We listen first, keep things simple, show up when we say we will, and answer the phone long after the sale. Our goal is straightforward, make your technology dependable and easy to use, and do it with a neighbor's mindset. We'd love to work with you.";

// Shared eyebrow type ramp — Our Mission and the photo caption read at
// identical size/tracking/weight so the section's small-label moments feel
// like one system, not separate guesses.
const EYEBROW_TYPE = "font-sans text-[0.6875rem] uppercase tracking-eyebrow";

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative overflow-hidden border-b border-navy/10 bg-white pb-24 md:pb-32"
    >
      {/* Body — asymmetric, full-bleed left. Deliberately NOT wrapped in the
          page's centered max-w container: the photo runs to the true left
          edge of the viewport, the copy (headline included) holds its own
          right-hand column. */}
      <div className="pt-16 grid grid-cols-1 lg:pt-20 lg:grid-cols-[42%_1fr]">

        {/* Left — the heritage photo. Flat rectangle: no border, no radius,
            no shadow, no frame. */}
        {/* Inset top and bottom at lg, the same treatment TestimonialSpotlight
            gives its video: the photo still bleeds off the true left edge of
            the viewport, but stops short vertically so it reads as a placed
            plate rather than a background fill. */}
        <Reveal index={1} className="lg:py-20">
          <div className="relative aspect-[4/5] w-full lg:aspect-auto lg:h-full lg:min-h-[30rem] xl:min-h-[34rem]">
            <Image
              src="/images/retro-about-v2.webp"
              alt="The original Central Florida Automation Services work truck, loaded with cable spools and ladders"
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        {/* Right — headline, mission, and story. One deliberate stack, with
            noticeably more air between blocks than within them. */}
        {/* Bottom-anchored at lg (justify-end), matching the testimonial
            spotlight's column: the stack settles onto the baseline of the
            section instead of floating in the middle of it, which is what
            gives that section its editorial footing. */}
        <div className="flex flex-col justify-center px-5 py-16 sm:px-8 md:px-10 lg:justify-end lg:px-16 lg:py-20 xl:px-20 xl:py-24 2xl:px-24 2xl:py-28">
          {/* The measure grows with the column rather than stopping dead at
              34rem. At 1920 that cap left ~410px of empty white to the right
              of every line while the copy itself stayed cramped. Type scales
              alongside it, so the characters-per-line stays in a readable
              band instead of just stretching. */}
          <div className="max-w-[34rem] xl:max-w-[38rem] 2xl:max-w-[42rem]">

            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
                <h2 className="font-display text-[clamp(2.3rem,4.6vw,3.9rem)] font-light leading-[1.02] tracking-tight text-navy-deep">
                  Who we <em className="font-light italic text-navy-light">are.</em>
                </h2>
                <span className={`${EYEBROW_TYPE} pb-1 text-navy/50`}>
                  Est. {BUSINESS.founded}
                </span>
              </div>
            </Reveal>

            <Reveal index={1}>
              <div className="mt-12 md:mt-14 xl:mt-16">
                <Eyebrow size="0.8125rem">Our Mission</Eyebrow>
                <p className="mt-5 font-display text-[1.5rem] font-light leading-[1.42] tracking-tight text-navy-deep md:text-[1.8rem] xl:text-[2rem] 2xl:text-[2.2rem]">
                  {MISSION_STATEMENT}
                </p>
              </div>

              <div className="mt-8 flex items-baseline gap-x-4 gap-y-1 border-t border-navy/10 pt-6 flex-wrap md:mt-10 xl:mt-12 xl:pt-8">
                <span className="shrink-0 font-sans text-[0.75rem] uppercase tracking-wide2 text-navy/45">
                  Our culture
                </span>
                <p className="font-display text-[1.05rem] italic leading-snug text-navy-light md:text-[1.15rem] xl:text-[1.25rem]">
                  {CULTURE}
                </p>
              </div>
            </Reveal>

            <Reveal index={2}>
              <p className="mt-12 font-sans text-[0.9375rem] leading-[1.7] text-slate-600 md:text-[1rem] xl:mt-16 xl:text-[1.0625rem] xl:leading-[1.75] 2xl:text-[1.125rem]">
                {ABOUT_TEXT}
              </p>
            </Reveal>

            {/* Closing credential — built on the same ruled label/content row
                as "Our culture" above, with the mark held right so it bookends
                the "Est. 1968" that opens the column. Alt is empty because the
                label beside it already names the badge. */}
            <Reveal index={3}>
              <div className="mt-10 flex flex-wrap items-center justify-between gap-x-6 gap-y-5 border-t border-navy/10 pt-7 md:mt-12 xl:mt-14 xl:pt-9">
                <span className="shrink-0 font-sans text-[0.75rem] uppercase tracking-wide2 text-navy/45">
                  Lutron Platinum Dealer
                </span>
                <Image
                  src="/images/Lutron-platinum.png"
                  alt=""
                  width={200}
                  height={184}
                  className="h-16 w-auto shrink-0 object-contain md:h-[4.5rem]"
                />
              </div>
            </Reveal>

          </div>
        </div>

      </div>
    </section>
  );
}
