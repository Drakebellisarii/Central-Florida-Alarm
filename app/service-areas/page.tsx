import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
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
    "Smart home automation and security throughout Greater Orlando, including Windermere, Dr. Phillips, Winter Park, Lake Nona, Celebration, and Orlando. Serving Central Florida since 1968.",
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
        <div className="mx-auto max-w-[1500px] px-5 py-24 sm:px-8 md:px-11 md:py-32">
          <Reveal>
            <h2 className="max-w-3xl font-display text-[clamp(2rem,3.6vw,3rem)] font-light leading-[1.08] tracking-tight text-navy-deep">
              From the Butler Chain to Bay Hill to the brick streets of Winter Park.
            </h2>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
            {AREAS.map((area, i) => (
              <Reveal key={area.slug} index={i % 2}>
                <Link
                  href={`/service-areas/${area.slug}`}
                  className="group flex h-full flex-col justify-between border border-slate-200 bg-white p-8 transition-all duration-300 ease-expo hover:-translate-y-0.5 hover:border-navy-logo/40 hover:shadow-[0_18px_48px_-24px_rgba(10,26,82,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-logo/40 md:p-10"
                >
                  <div>
                    <div className="flex items-center gap-3">
                      <MapPin strokeWidth={1.25} className="h-5 w-5 text-navy-logo" />
                      <span className="font-sans text-[11px] uppercase tracking-eyebrow text-navy-logo">
                        {area.kicker}
                      </span>
                    </div>
                    <h3 className="mt-5 font-display text-[30px] leading-tight text-navy-deep transition-colors group-hover:text-navy-logo">
                      {area.name}
                    </h3>
                    <p className="mt-4 font-sans text-[15px] leading-relaxed text-slate-500">
                      {area.intro[0]}
                    </p>
                  </div>
                  <span className="mt-7 inline-flex items-center gap-2 font-sans text-[11px] uppercase tracking-wide2 text-navy/50">
                    Explore {area.name}
                    <ArrowUpRight
                      strokeWidth={1.25}
                      className="h-3.5 w-3.5 transition-transform duration-500 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </Link>
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
