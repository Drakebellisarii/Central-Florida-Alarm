import Link from "next/link";
import { ArrowRight, Phone, Mail } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { BUSINESS } from "@/lib/seo";

/* Compact closing invitation — sits between the coverage map and footer. */
export function ContactSection() {
  return (
    <section className="border-t border-slate-100 bg-white">
      <div className="mx-auto max-w-[1500px] px-5 py-16 sm:px-8 md:px-11 md:py-20">
        <Reveal>
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">

            <div>
              <h2 className="font-display text-[clamp(1.7rem,2.8vw,2.5rem)] font-light leading-[1.1] tracking-tight text-navy-deep">
                Tell us about the house.
              </h2>
              <p className="mt-4 max-w-md font-sans text-[14px] leading-relaxed text-slate-500">
                A conversation costs nothing, and the earlier it happens, the
                more we can make disappear.
              </p>
            </div>

            <div className="flex flex-col items-start gap-5 lg:items-end">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 bg-navy-logo px-8 py-4 font-sans text-[12px] uppercase tracking-wide2 text-white transition-colors duration-300 hover:bg-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-logo/50"
              >
                Begin a Project
                <ArrowRight
                  strokeWidth={1.25}
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </Link>
              <div className="flex flex-wrap items-center gap-6">
                <a
                  href={BUSINESS.phoneHref}
                  className="inline-flex items-center gap-2.5 font-sans text-[13px] text-slate-500 transition-colors hover:text-navy-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/30"
                >
                  <Phone strokeWidth={1.25} className="h-4 w-4" />
                  {BUSINESS.phone}
                </a>
                <a
                  href={BUSINESS.emailHref}
                  className="inline-flex items-center gap-2.5 font-sans text-[13px] text-slate-500 transition-colors hover:text-navy-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/30"
                >
                  <Mail strokeWidth={1.25} className="h-4 w-4" />
                  {BUSINESS.email}
                </a>
              </div>
            </div>

          </div>
        </Reveal>
      </div>
    </section>
  );
}
