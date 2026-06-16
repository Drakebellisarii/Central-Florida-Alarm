import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buildMetadata, localBusinessLd, breadcrumbLd, BUSINESS } from "@/lib/seo";
import { NavSentinel } from "@/components/NavSentinel";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Smart Security", path: "/smart-security" },
  { name: "Smart Home", path: "/smart-home" },
];

export const metadata: Metadata = buildMetadata({
  title: "Smart Home Security | Central Florida Automation Services",
  description:
    "Smart home security from Central Florida Automation Services — security, cameras, locks, and life-safety designed around how you live.",
  path: "/smart-home",
});

export default function SmartHomePage() {
  return (
    <>
      <JsonLd data={localBusinessLd()} />
      <JsonLd data={breadcrumbLd(crumbs)} />

      <section className="relative min-h-screen bg-white">
        <NavSentinel />

        {/* Blue header band */}
        <div className="bg-navy-deep">
          <div className="mx-auto max-w-[1500px] px-5 pb-16 pt-36 sm:px-8 md:px-11 md:pb-20 md:pt-44">
            <Breadcrumbs items={crumbs} tone="onDark" />
            <div className="mt-10">
              <h1 className="font-display text-[clamp(2.6rem,5.5vw,4.6rem)] font-light leading-[1.0] tracking-tight text-white">
                Smart Home
              </h1>
            </div>
          </div>
        </div>

        {/* Placeholder body — content to come */}
        <div className="mx-auto max-w-[1500px] px-5 py-20 sm:px-8 md:px-11 md:py-28">
          <p className="max-w-xl font-sans text-[17px] leading-relaxed text-slate-600">
            We&rsquo;re putting this page together. In the meantime, tell us about
            your home and we&rsquo;ll walk you through what makes sense.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 bg-navy-logo px-8 py-4 font-sans text-[12px] uppercase tracking-wide2 text-white transition-colors duration-300 hover:bg-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-logo/50"
            >
              Start a conversation
              <ArrowRight
                strokeWidth={1.25}
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </Link>
            <a
              href={BUSINESS.phoneHref}
              className="inline-flex items-center gap-2 border border-navy-logo/25 px-8 py-4 font-sans text-[12px] uppercase tracking-wide2 text-navy-logo/70 transition-all duration-300 hover:border-navy-logo hover:text-navy-logo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-logo/30"
            >
              {BUSINESS.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
