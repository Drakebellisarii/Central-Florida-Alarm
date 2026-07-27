import type { Metadata } from "next";

import { buildMetadata } from "@/lib/seo";
import { LuxuryFAQAccordion, type LuxuryFAQ } from "@/components/smart-luxury/LuxuryFAQAccordion";

export const metadata: Metadata = buildMetadata({
  title: "Smart Luxury FAQ | Central Florida Automation Services",
  description:
    "Answers for luxury homeowners: home theaters, wine cellars, motorized art, smart glass, and what's really possible in a fully integrated estate.",
  path: "/smart-luxury",
});

// Intentionally empty for now — questions go in once the copy is ready.
const FAQS: LuxuryFAQ[] = [];

export default function SmartLuxuryPage() {
  return (
    <div className="bg-white pt-[4.75rem]">
      <section className="mx-auto max-w-[93.75rem] px-5 pb-12 pt-16 text-center sm:px-8 md:px-11 md:pb-16 md:pt-24">
        <h1 className="mx-auto max-w-3xl font-hero text-[clamp(2.6rem,5.5vw,4.6rem)] font-light leading-[1.0] tracking-tight text-navy-deep">
          Smart Luxury FAQ
        </h1>
      </section>

      <section className="bg-white pb-24 md:pb-32">
        <div className="mx-auto max-w-[56rem] px-5 sm:px-8 md:px-11">
          <LuxuryFAQAccordion faqs={FAQS} />
        </div>
      </section>
    </div>
  );
}
