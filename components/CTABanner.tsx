import Link from "next/link";
import { Reveal } from "./Reveal";
import { BUSINESS } from "@/lib/seo";
import { Phone, ArrowRight } from "lucide-react";

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
    <section className={light ? "bg-navy-deep" : "bg-[#0d0f14]"}>
      <div className="mx-auto max-w-[93.75rem] px-5 py-24 sm:px-8 md:px-11 md:py-32">

        {/* Top rule + eyebrow */}
        <Reveal>
          <div
            className={`flex items-center gap-6 border-t pt-10 ${
              light ? "border-white/15" : "border-white/10"
            }`}
          >
            <span
              className={`font-sans text-[0.625rem] uppercase tracking-eyebrow ${
                light ? "text-white/55" : "text-white/35"
              }`}
            >
              {eyebrow}
            </span>
            <span
              className={`h-px flex-1 ${light ? "bg-white/15" : "bg-white/[0.06]"}`}
            />
          </div>
        </Reveal>

        {/* Main content */}
        <div className="mt-14 grid grid-cols-1 items-end gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <h2 className="font-display text-[clamp(2.4rem,4.8vw,4.4rem)] font-light leading-[1.03] tracking-tight text-white">
              {heading}
            </h2>
            <p
              className={`mt-7 max-w-lg font-sans text-[0.9375rem] leading-relaxed ${
                light ? "text-white/65" : "text-white/45"
              }`}
            >
              {body}
            </p>
          </Reveal>

          <Reveal index={1} className="lg:col-span-5 lg:pb-1">
            <div className="flex flex-col items-start gap-6 lg:items-end">
              <Link
                href="/contact"
                className={
                  light
                    ? "group inline-flex items-center gap-3 bg-white px-8 py-4 font-sans text-[0.75rem] uppercase tracking-wide2 text-navy-deep transition-colors duration-300 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                    : "group inline-flex items-center gap-3 bg-navy-logo px-8 py-4 font-sans text-[0.75rem] uppercase tracking-wide2 text-white transition-colors duration-300 hover:bg-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-logo/50"
                }
              >
                Request a Consultation
                <ArrowRight
                  strokeWidth={1.25}
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </Link>
              <a
                href={BUSINESS.phoneHref}
                className={`inline-flex items-center gap-3 font-sans text-[0.875rem] transition-colors ${
                  light
                    ? "text-white/55 hover:text-white"
                    : "text-white/40 hover:text-white/80"
                }`}
              >
                <Phone strokeWidth={1.25} className="h-4 w-4" />
                <span className="tracking-wide">{BUSINESS.phone}</span>
              </a>
            </div>
          </Reveal>
        </div>

      </div>
    </section>
  );
}
