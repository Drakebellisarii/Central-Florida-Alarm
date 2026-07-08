import type { Metadata } from "next";
import { buildMetadata, localBusinessLd, breadcrumbLd } from "@/lib/seo";
import { NavSentinel } from "@/components/NavSentinel";
import { JsonLd } from "@/components/JsonLd";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Blog", path: "/blog" },
];

export const metadata: Metadata = buildMetadata({
  title: "Blog | Central Florida Automation Services",
  description:
    "Notes on smart home, security, and automation from Central Florida Automation Services.",
  path: "/blog",
});

export default function BlogPage() {
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
              The Blog
            </h1>
            <p className="mt-6 max-w-xl font-sans text-[1.0625rem] leading-relaxed text-white/70">
              Notes on smart home, security, and the craft behind the systems we
              build.
            </p>
          </div>
        </div>

        {/* Posts placeholder — to be wired to the external blog service */}
        <div className="mx-auto max-w-[93.75rem] px-5 py-24 sm:px-8 md:px-11 md:py-32">
          <p className="font-display text-[1.6rem] font-light leading-snug tracking-tight text-navy-deep">
            New posts are on the way.
          </p>
          <p className="mt-4 max-w-md font-sans text-[0.9375rem] leading-relaxed text-navy-deep/60">
            Check back soon — we&rsquo;re putting the finishing touches on this
            space.
          </p>
        </div>
      </section>
    </>
  );
}
