import type { Metadata } from "next";
import { MapPin } from "lucide-react";
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

export default function ServiceAreasPage() {
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
      />

      <section className="bg-white">
        <div className="mx-auto max-w-[93.75rem] px-5 py-24 sm:px-8 md:px-11 md:py-32">
          <Reveal>
            <h2 className="max-w-3xl font-display text-[clamp(2rem,3.6vw,3rem)] font-light leading-[1.08] tracking-tight text-navy-deep">
              From the Butler Chain to Bay Hill to the brick streets of Winter Park.
            </h2>
          </Reveal>

          <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {AREAS.map((area, i) => (
              <Reveal key={area.slug} index={i % 4}>
                <div className="flex items-start gap-2.5">
                  <MapPin
                    strokeWidth={1.25}
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-navy-logo/50"
                  />
                  <span className="font-sans text-[0.875rem] leading-snug text-slate-600">
                    {area.name}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
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
