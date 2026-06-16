import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import { getArea, areaParams, AREAS } from "@/lib/areas";
import { SERVICES } from "@/lib/services";
import { buildMetadata, localBusinessLd, breadcrumbLd, BUSINESS } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { ServiceCard } from "@/components/ServiceCard";
import { CTABanner } from "@/components/CTABanner";
import { JsonLd } from "@/components/JsonLd";

export const dynamicParams = false;

export function generateStaticParams() {
  return areaParams();
}

const AREA_IMAGE: Record<string, string> = {
  orlando: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80",
  "winter-park": "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=1200&q=80",
  "lake-nona": "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=1200&q=80",
  windermere: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&q=80",
  celebration: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
  "dr-phillips": "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=1200&q=80",
};

export function generateMetadata({
  params,
}: {
  params: { city: string };
}): Metadata {
  const area = getArea(params.city);
  if (!area) return {};
  return buildMetadata({
    title: area.metaTitle,
    description: area.metaDescription,
    path: `/service-areas/${area.slug}`,
    image: AREA_IMAGE[area.slug],
  });
}

export default function AreaPage({ params }: { params: { city: string } }) {
  const area = getArea(params.city);
  if (!area) notFound();

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Service Areas", path: "/service-areas" },
    { name: area.name, path: `/service-areas/${area.slug}` },
  ];

  const nearby = area.nearby
    .map((slug) => AREAS.find((a) => a.slug === slug))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  return (
    <>
      <JsonLd data={localBusinessLd([area.name])} />
      <JsonLd data={breadcrumbLd(crumbs)} />

      <PageHero
        title={`Smart Home and Security in ${area.name}, FL`}
        lead={`Whole-house automation, security, lighting, and networking for ${area.name}, designed for the way these homes are actually built and lived in.`}
        image={AREA_IMAGE[area.slug]}
        imageAlt={`A fine home in ${area.name}, Florida, served by Central Florida Automation Services`}
        crumbs={crumbs}
        light
      />

      {/* Intro prose */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1500px] px-5 py-24 sm:px-8 md:px-11 md:py-32">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <p className="font-display text-[clamp(1.7rem,2.6vw,2.2rem)] font-light leading-snug text-navy-deep">
                A company that has been part of {area.name} for three generations.
              </p>
            </Reveal>
            <Reveal index={1} className="lg:col-span-7 lg:col-start-6">
              <div className="space-y-6 font-sans text-[17px] leading-relaxed text-slate-600">
                {area.intro.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Services available here */}
      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-[1500px] px-5 py-24 sm:px-8 md:px-11 md:py-32">
          <Reveal>
            <h2 className="max-w-2xl font-display text-[clamp(1.9rem,3.4vw,2.9rem)] font-light leading-tight tracking-tight text-navy-deep">
              The full system, brought to {area.name}.
            </h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <Reveal key={s.slug} index={i % 3}>
                <ServiceCard
                  href={`/${s.slug}`}
                  name={s.name}
                  summary={s.summary}
                  icon={s.icon}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby areas */}
      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-[1500px] px-5 py-20 sm:px-8 md:px-11 md:py-24">
          <Reveal>
            <h2 className="font-display text-[clamp(1.6rem,2.6vw,2.2rem)] font-light tracking-tight text-navy-deep">
              We also work in
            </h2>
          </Reveal>
          <div className="mt-9 flex flex-wrap gap-4">
            {nearby.map((a) => (
              <Link
                key={a.slug}
                href={`/service-areas/${a.slug}`}
                className="group inline-flex items-center gap-3 border border-slate-300 px-6 py-4 font-display text-[20px] text-navy-deep transition-colors duration-300 ease-expo hover:border-navy-logo/50 hover:text-navy-logo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-logo/40"
              >
                {a.name}
                <ArrowUpRight
                  strokeWidth={1.25}
                  className="h-4 w-4 text-slate-400 transition-all duration-300 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-navy-logo"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        eyebrow={`Serving ${area.name} since ${BUSINESS.founded}`}
        heading={`Let's talk about your home in ${area.name}.`}
        body="Tell us where you are and what you are building or improving. We will tell you plainly how we would approach it."
        light
      />
    </>
  );
}
