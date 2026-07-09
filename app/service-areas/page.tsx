import type { Metadata } from "next";
import Image from "next/image";
import { AREAS } from "@/lib/areas";
import { buildMetadata, localBusinessLd, breadcrumbLd } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
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
  image:
    "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80",
});

// The 18 communities grouped the way locals think of them. Names stay in
// lib/areas.ts; this page only owns the grouping.
const REGIONS: {
  name: string;
  lead: string;
  slugs: string[];
  image: string;
  imageAlt: string;
}[] = [
  {
    name: "The Lake Country",
    lead: "West of the city the land rises into lakes and golf courses. Much of our estate work lives here.",
    slugs: [
      "windermere",
      "dr-phillips",
      "winter-garden",
      "bella-collina",
      "clermont",
      "mount-dora",
    ],
    image: "/Service-Area/windy.webp",
    imageAlt:
      "Lakefront estate at dusk, pool and dock reflecting the evening sky",
  },
  {
    name: "The City & North Corridor",
    lead: "Orlando is home base, and the neighborhoods north of it have been on our routes the longest.",
    slugs: [
      "orlando",
      "winter-park",
      "lake-nona",
      "maitland",
      "lake-mary",
      "sanford",
      "oviedo",
    ],
    image: "/Service-Area/Winterpark.webp",
    imageAlt:
      "Historic brick street in Winter Park under a canopy of live oaks",
  },
  {
    name: "The Coast & Beyond",
    lead: "Coverage does not stop at the metro. South to the ranch land, north into horse country, east to the Atlantic.",
    slugs: ["kissimmee", "deland", "ocala", "daytona-beach", "new-smyrna"],
    image: "/Service-Area/coast.webp",
    imageAlt: "Atlantic shoreline at sunrise with dune grass and a coastal home",
  },
];

const nameOf = (slug: string) =>
  AREAS.find((a) => a.slug === slug)?.name ?? slug;

export default function ServiceAreasPage() {
  // Continuous registry numbering across all three regions
  let counter = 0;
  const startIndex = REGIONS.map((r) => {
    const s = counter;
    counter += r.slugs.length;
    return s;
  });

  return (
    <>
      <JsonLd data={localBusinessLd()} />
      <JsonLd data={breadcrumbLd(crumbs)} />

      <PageHero
        title="Smart home and security across Greater Orlando."
        lead="We are based in Orlando and work throughout the region's finest neighborhoods. Every community has its own character, and we design for the property and the place it sits in."
        image="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80"
        imageAlt="Aerial view of a Central Florida lakefront community at dusk"
        crumbs={crumbs}
        light
        tint="soft"
      />

      <section className="bg-white">
        <div className="mx-auto max-w-[93.75rem] px-5 pb-24 pt-14 sm:px-8 md:px-11 md:pb-32 md:pt-20">

          {/* ── Region chapters ── */}
          {REGIONS.map((region, r) => {
            const flip = r % 2 === 1;
            return (
              <div
                key={region.name}
                className={
                  r === 0
                    ? ""
                    : "mt-20 border-t border-navy/10 pt-14 md:mt-28 md:pt-16"
                }
              >
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
                  {/* Photo */}
                  <Reveal
                    className={`lg:col-span-5 ${
                      flip ? "lg:order-2 lg:col-start-8" : ""
                    }`}
                  >
                    <div className="lg:sticky lg:top-28">
                      <div className="relative aspect-[4/5] w-full overflow-hidden border border-navy/15 shadow-[0_24px_60px_-30px_rgba(10,26,82,0.45)] sm:aspect-[3/2] lg:aspect-[4/5]">
                        <Image
                          src={region.image}
                          alt={region.imageAlt}
                          fill
                          sizes="(min-width: 1024px) 40vw, 100vw"
                          className="object-cover"
                        />
                      </div>
                      <p className="mt-4 font-sans text-[0.6875rem] uppercase tracking-wide2 text-navy/40">
                        {String(r + 1).padStart(2, "0")} &middot; {region.name}
                      </p>
                    </div>
                  </Reveal>

                  {/* Ledger */}
                  <div
                    className={`lg:col-span-7 ${flip ? "lg:order-1" : ""}`}
                  >
                    <Reveal>
                      <h3 className="font-display text-[clamp(1.6rem,2.4vw,2.2rem)] font-light leading-[1.1] tracking-tight text-navy-deep">
                        {region.name}
                      </h3>
                      <p className="mt-4 max-w-prose2 font-sans text-[0.9375rem] leading-relaxed text-stone">
                        {region.lead}
                      </p>
                    </Reveal>

                    <ul className="mt-10">
                      {region.slugs.map((slug, i) => (
                        <Reveal key={slug} index={i % 4}>
                          <li className="flex items-baseline gap-5 border-b border-navy/10 py-5 first:border-t">
                            <span className="w-8 shrink-0 font-sans text-[0.6875rem] tabular-nums tracking-wide2 text-navy/35">
                              {String(startIndex[r] + i + 1).padStart(2, "0")}
                            </span>
                            <span className="flex-1 font-display text-[1.25rem] font-light leading-snug text-navy-deep sm:text-[1.375rem]">
                              {nameOf(slug)}
                            </span>
                          </li>
                        </Reveal>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <CTABanner
        eyebrow="Don't see your community"
        heading="We likely serve it. Ask."
        body="Our territory covers most of Central Florida. If you are in or near Greater Orlando, there is a good chance we already work in your neighborhood."
        light
      />
    </>
  );
}
