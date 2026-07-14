import type { Metadata } from "next";
import Image from "next/image";
import { AREAS } from "@/lib/areas";
import { buildMetadata, localBusinessLd, breadcrumbLd } from "@/lib/seo";
import { NavSentinel } from "@/components/NavSentinel";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTABanner } from "@/components/CTABanner";
import { JsonLd } from "@/components/JsonLd";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Service Areas", path: "/service-areas" },
];

export const metadata: Metadata = buildMetadata({
  title:
    "Service Areas Across Greater Orlando, FL | Central Florida Automation Services",
  description:
    "Smart home automation and security throughout Greater Orlando, including Windermere, Dr. Phillips, Winter Park, Lake Nona, and beyond. Serving Central Florida since 1968.",
  path: "/service-areas",
});

// The 18 communities grouped by plain geography. Names stay in lib/areas.ts;
// this page only owns the grouping.
const REGIONS: { name: string; lead: string; slugs: string[] }[] = [
  {
    name: "West Orlando & Lake County",
    lead: "The lake country west of the city, where much of our estate work lives.",
    slugs: [
      "windermere",
      "dr-phillips",
      "winter-garden",
      "bella-collina",
      "clermont",
      "mount-dora",
    ],
  },
  {
    name: "Orlando & the Metro",
    lead: "Home base, and the neighborhoods that have been on our routes the longest.",
    slugs: [
      "orlando",
      "winter-park",
      "lake-nona",
      "maitland",
      "kissimmee",
      "lake-mary",
      "sanford",
      "oviedo",
    ],
  },
  {
    name: "North & the Coast",
    lead: "Horse country, the St. Johns, and the Atlantic beaches.",
    slugs: ["deland", "ocala", "daytona-beach", "new-smyrna"],
  },
];

const nameOf = (slug: string) =>
  AREAS.find((a) => a.slug === slug)?.name ?? slug;

export default function ServiceAreasPage() {
  return (
    <>
      <JsonLd data={localBusinessLd()} />
      <JsonLd data={breadcrumbLd(crumbs)} />

      <section className="relative bg-white">
        <NavSentinel />

        {/* Blue header band — matches the contact and service-request pages */}
        <div className="bg-navy-deep">
          <div className="mx-auto max-w-[93.75rem] px-5 pb-14 pt-36 sm:px-8 md:px-11 md:pb-16 md:pt-44 short:pb-10 short:pt-24">
            <Breadcrumbs items={crumbs} tone="onDark" />
            <h1 className="mt-10 mb-7 max-w-4xl font-hero text-[clamp(2.6rem,5.5vw,4.4rem)] font-light leading-[1.0] tracking-tight text-white">
              Smart home and security across Greater Orlando.
            </h1>
          </div>
        </div>

        {/* One establishing photo, full width */}
        <div className="relative aspect-[4/3] w-full sm:aspect-[16/7]">
          <Image
            src="/Service-Area/windy.webp"
            alt="Lakefront estate at dusk in Windermere, the pool holding the last of the sky"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-navy-deep/40 via-transparent to-transparent"
          />
          <p className="absolute bottom-6 left-5 font-sans text-[0.6875rem] uppercase tracking-eyebrow text-white/70 sm:left-8 md:left-11">
            Windermere, Florida
          </p>
        </div>

        {/* The directory */}
        <div className="mx-auto max-w-[93.75rem] px-5 pb-16 pt-16 sm:px-8 md:px-11 md:pb-20 md:pt-20">
          <div className="divide-y divide-navy/10 border-t border-navy/10">
            {REGIONS.map((region, r) => (
              <div
                key={region.name}
                className="grid grid-cols-1 gap-8 py-10 md:grid-cols-12 md:gap-10 md:py-14"
              >
                <div className="md:col-span-5 lg:col-span-4">
                  <div className="flex items-baseline gap-5">
                    <span
                      aria-hidden="true"
                      className="font-sans text-[0.6875rem] text-stone/60"
                    >
                      {String(r + 1).padStart(2, "0")}
                    </span>
                    <h2 className="font-sans text-[0.75rem] uppercase tracking-eyebrow text-navy-deep">
                      {region.name}
                    </h2>
                  </div>
                  <p className="mt-4 max-w-xs font-sans text-[0.875rem] leading-relaxed text-stone">
                    {region.lead}
                  </p>
                </div>
                <ul className="grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2 md:col-span-7 lg:col-span-8">
                  {region.slugs.map((slug) => (
                    <li
                      key={slug}
                      className="font-display text-[clamp(1.25rem,1.6vw,1.5rem)] font-light leading-snug tracking-tight text-navy-deep"
                    >
                      {nameOf(slug)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        eyebrow=""
        heading="Don't see your community? We likely serve it."
        body="Our territory covers most of Central Florida. If you are in or near Greater Orlando, there is a good chance we already work in your neighborhood."
        light
      />
    </>
  );
}
