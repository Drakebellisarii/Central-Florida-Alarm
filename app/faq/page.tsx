import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata, localBusinessLd, breadcrumbLd, BUSINESS, PRIMARY_BRANDS } from "@/lib/seo";
import { STATS } from "@/lib/content";
import { NavSentinel } from "@/components/NavSentinel";
import { JsonLd } from "@/components/JsonLd";
import { LightFAQAccordion } from "@/components/LightFAQAccordion";
import type { FAQ } from "@/lib/services";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "FAQ", path: "/faq" },
];

export const metadata: Metadata = buildMetadata({
  title: "FAQ | Central Florida Automation Services",
  description:
    "Answers to common questions about smart home and business integration, service areas, brands we install, licensing, and what to expect from CFAS.",
  path: "/faq",
});

const installs = STATS.find((s) => s.label === "Installations")?.value ?? BUSINESS.installations;

const FAQS: FAQ[] = [
  {
    q: "What areas do you serve?",
    a: `We're based in ${BUSINESS.city} and serve ${BUSINESS.region} and Central Florida, plus properties across the state and into Georgia. If you're unsure whether your address falls inside our service area, reach out through our contact page and we'll tell you plainly.`,
  },
  {
    q: "What does “smart home” or “smart business” integration actually mean?",
    a: "It means every system in your property — lighting, shades, security, audio/video, climate, and networking — is designed to work as one, controlled from a single app or keypad instead of a shelf of separate remotes. That's the whole business: not selling individual gadgets, but making everything speak the same language.",
  },
  {
    q: "Do you work with new construction, remodels, and existing homes?",
    a: "All three. We're most efficient when we're brought in during the design or pre-wire phase of new construction or a major remodel, but a large share of our work is retrofitting fully-built homes and businesses with systems that don't require opening walls.",
  },
  {
    q: "What brands and systems do you install?",
    a: `Our core platform is built around ${PRIMARY_BRANDS.join(", ")}, along with Hartmann & Forbes shading fabrics — we're a Lutron Platinum Dealer. We select the brand for each system based on what performs best for that specific application, not a one-size-fits-all catalog.`,
  },
  {
    q: "What happens after installation — is there ongoing support?",
    a: "Support doesn't end at the invoice. The technicians who designed and installed your system are the ones who answer the phone for service afterward, and our monitoring team is on call 24/7. Existing clients can also submit a repair request directly through our site.",
  },
  {
    q: "How does the process start?",
    a: "With a conversation. Reach out through our contact page with a bit about your property and what you're hoping to solve, and we'll walk the plans with you from there — a site visit, a proposal, and a design built around how you actually use the space.",
  },
  {
    q: "Are you licensed and insured?",
    a: `Yes. We hold Florida low-voltage licenses ${BUSINESS.licenses.join(", ")}, plus a Georgia license (LU405163), and we're fully insured for residential and commercial work.`,
  },
  {
    q: "How long has CFAS been in business?",
    a: `Since ${BUSINESS.founded}. We've grown from a single install crew into a team with three offices and more than ${installs} installations behind us, but the standard we hold ourselves to hasn't changed.`,
  },
];

export default function FaqPage() {
  return (
    <>
      <JsonLd data={localBusinessLd()} />
      <JsonLd data={breadcrumbLd(crumbs)} />

      <section className="relative min-h-[100svh] bg-white">
        <NavSentinel />

        {/* Blue hero / heading band */}
        <div className="bg-navy-deep">
          <div className="mx-auto max-w-[93.75rem] px-5 pb-16 pt-36 sm:px-8 md:px-11 md:pb-20 md:pt-44 short:pb-10 short:pt-24">
            <h1 className="max-w-3xl font-hero text-[clamp(2.4rem,5vw,4rem)] font-light leading-[1.0] tracking-tight text-white">
              Frequently Asked Questions
            </h1>
            <p className="mt-6 max-w-xl font-sans text-[1.0625rem] leading-relaxed text-white/70">
              Straight answers about how we work, what we install, and what
              to expect from the first call to years down the road.
            </p>
          </div>
        </div>

        {/* FAQ list */}
        <div className="mx-auto max-w-[56rem] px-5 py-24 sm:px-8 md:px-11 md:py-32">
          <LightFAQAccordion faqs={FAQS} />

          <p className="mt-14 font-sans text-[0.9375rem] leading-relaxed text-slate-500">
            Still have a question?{" "}
            <Link
              href="/contact"
              className="text-navy-logo underline underline-offset-4 transition-colors hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-logo/40"
            >
              Get in touch
            </Link>{" "}
            and we&rsquo;ll answer it directly.
          </p>
        </div>
      </section>
    </>
  );
}
