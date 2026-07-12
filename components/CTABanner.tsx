import Link from "next/link";
import { Reveal } from "./Reveal";
import { BUSINESS } from "@/lib/seo";
import { ArrowRight } from "lucide-react";

export function CTABanner({
  eyebrow = "Begin the conversation",
  heading = "The best systems are planned before the walls close.",
  body = "If you are building or renovating, the earlier we are involved, the more we can make disappear. If your home is finished, there is almost always more we can do than you would expect.",
  light = false,
}: {
  eyebrow?: string;
  heading?: string;
  body?: string;
  light?: boolean;
}) {
  return (
    <section className={light ? "bg-paper" : "bg-[#0d0f14]"}>
      <div className="mx-auto max-w-[93.75rem] px-5 py-14 sm:px-8 md:px-11 md:py-20">
        {/* Top rule + eyebrow */}
        <Reveal>
          <div className="flex items-center gap-6">
            <span
              className={`font-sans text-[0.625rem] uppercase tracking-eyebrow ${
                light ? "text-stone" : "text-white/35"
              }`}
            >
              {eyebrow}
            </span>
            <span
              className={`h-px flex-1 ${light ? "bg-navy/10" : "bg-white/[0.06]"}`}
            />
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-12 md:items-center">
          <Reveal className="md:col-span-7">
            <h2
              className={`font-display text-[clamp(1.7rem,2.6vw,2.5rem)] font-light leading-[1.15] tracking-tight ${
                light ? "text-navy-deep" : "text-white"
              }`}
            >
              {heading}
            </h2>
            <p
              className={`mt-4 max-w-md font-sans text-[0.875rem] leading-relaxed ${
                light ? "text-stone" : "text-white/45"
              }`}
            >
              {body}
            </p>
          </Reveal>

          <Reveal index={1} className="md:col-span-5">
            <div className="flex flex-col items-start gap-6 md:items-end">
              <Link
                href="/contact"
                className={`group inline-flex items-center gap-3 border px-8 py-4 font-sans text-[0.75rem] uppercase tracking-wide2 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 ${
                  light
                    ? "border-navy/25 text-navy-deep hover:border-navy-deep hover:bg-navy-deep hover:text-white focus-visible:ring-navy-logo/40"
                    : "border-white/20 text-white hover:border-white hover:bg-white hover:text-ink focus-visible:ring-white/60"
                }`}
              >
                Request a Consultation
                <ArrowRight
                  strokeWidth={1.25}
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </Link>
              <a
                href={BUSINESS.phoneHref}
                className={`group flex items-baseline gap-3 focus-visible:outline-none focus-visible:ring-2 ${
                  light ? "focus-visible:ring-navy-logo/40" : "focus-visible:ring-white/60"
                }`}
              >
                <span
                  className={`font-sans text-[0.625rem] uppercase tracking-eyebrow ${
                    light ? "text-stone/80" : "text-white/35"
                  }`}
                >
                  or call
                </span>
                <span
                  className={`font-display text-[1.25rem] leading-none tracking-tight transition-colors duration-300 ${
                    light
                      ? "text-navy-deep group-hover:text-navy-logo"
                      : "text-white/75 group-hover:text-white"
                  }`}
                >
                  {BUSINESS.phone}
                </span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
