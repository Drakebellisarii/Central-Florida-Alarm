import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getService, serviceParams } from "@/lib/services";
import { buildMetadata, serviceLd, faqLd, breadcrumbLd } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { BrandStrip } from "@/components/BrandStrip";
import { FAQAccordion } from "@/components/FAQAccordion";
import { RelatedServices } from "@/components/RelatedServices";
import { CTABanner } from "@/components/CTABanner";
import { JsonLd } from "@/components/JsonLd";

export const dynamicParams = false;

export function generateStaticParams() {
  return serviceParams();
}

export function generateMetadata({
  params,
}: {
  params: { service: string };
}): Metadata {
  const service = getService(params.service);
  if (!service) return {};
  return buildMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/${service.slug}`,
    image: service.heroImage,
  });
}

export default function ServicePage({
  params,
}: {
  params: { service: string };
}) {
  const service = getService(params.service);
  if (!service) notFound();

  const crumbs = [
    { name: "Home", path: "/" },
    { name: service.name, path: `/${service.slug}` },
  ];

  return (
    <>
      <JsonLd
        data={serviceLd({
          name: service.title,
          description: service.metaDescription,
          path: `/${service.slug}`,
        })}
      />
      <JsonLd data={faqLd(service.faqs)} />
      <JsonLd data={breadcrumbLd(crumbs)} />

      <PageHero
        title={`${service.title} in Orlando, FL`}
        lead={service.summary}
        image={service.heroImage}
        imageAlt={service.heroAlt}
        crumbs={crumbs}
      />

      {/* Overview */}
      <section className="bg-ink">
        <div className="mx-auto max-w-[1500px] px-5 py-24 sm:px-8 md:px-11 md:py-32">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <p className="font-display text-[clamp(1.6rem,2.4vw,2rem)] font-light leading-snug text-bone">
                {service.summary}
              </p>
            </Reveal>
            <Reveal index={1} className="lg:col-span-7 lg:col-start-6">
              <div className="space-y-6 font-sans text-[17px] leading-relaxed text-bone-dim">
                {service.overview.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* The CFAS approach */}
      <section className="border-y border-bone/10 bg-ink-deep">
        <div className="mx-auto max-w-[1500px] px-5 py-24 sm:px-8 md:px-11 md:py-32">
          <Reveal>
            <p className="max-w-4xl font-display text-[clamp(1.7rem,3vw,2.6rem)] font-light leading-[1.25] tracking-tight text-bone">
              {service.approach}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Image row */}
      <section className="bg-ink">
        <div className="mx-auto max-w-[1500px] px-5 py-20 sm:px-8 md:px-11 md:py-28">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {service.gallery.map((img, i) => (
              <Reveal
                key={img.src + i}
                index={i}
                className={i === 0 ? "sm:col-span-2" : ""}
              >
                <div className="relative aspect-[4/3] overflow-hidden border border-bone/10">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 ease-expo hover:scale-[1.03]"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Brands + scope */}
      <section className="border-t border-bone/10 bg-ink-deep">
        <div className="mx-auto max-w-[1500px] px-5 py-24 sm:px-8 md:px-11 md:py-32">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <h2 className="font-display text-[clamp(1.9rem,3.2vw,2.8rem)] font-light leading-tight tracking-tight text-bone">
                The equipment, and the engineering around it.
              </h2>
              <div className="mt-10">
                <BrandStrip
                  brands={service.brands}
                  label="Brands we install"
                />
              </div>
            </Reveal>

            <Reveal index={1} className="lg:col-span-6 lg:col-start-7">
              <dl className="border-t border-bone/10">
                {service.scope.map((item) => (
                  <div
                    key={item.label}
                    className="grid grid-cols-1 gap-1 border-b border-bone/10 py-5 sm:grid-cols-12 sm:gap-6"
                  >
                    <dt className="font-display text-[18px] text-bone sm:col-span-5">
                      {item.label}
                    </dt>
                    <dd className="font-sans text-[15px] leading-relaxed text-stone sm:col-span-7">
                      {item.detail}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-bone/10 bg-ink">
        <div className="mx-auto max-w-[1500px] px-5 py-24 sm:px-8 md:px-11 md:py-32">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <h2 className="font-display text-[clamp(1.9rem,3.2vw,2.8rem)] font-light leading-tight tracking-tight text-bone">
                What homeowners ask us.
              </h2>
            </Reveal>
            <div className="lg:col-span-8">
              <FAQAccordion faqs={service.faqs} />
            </div>
          </div>
        </div>
      </section>

      <RelatedServices slugs={service.related} />

      <CTABanner
        eyebrow="Start here"
        heading={`Let's talk about ${service.name.toLowerCase()} for your home.`}
        body="Tell us about the project and the timeline. We will give you an honest read on what is worth doing and a fixed proposal once we have seen the plans."
      />
    </>
  );
}
