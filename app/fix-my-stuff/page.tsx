import type { Metadata } from "next";
import { Phone } from "lucide-react";
import { buildMetadata, localBusinessLd, breadcrumbLd, BUSINESS } from "@/lib/seo";
import { NavSentinel } from "@/components/NavSentinel";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ServiceRequestForm } from "@/components/ServiceRequestForm";
import { JsonLd } from "@/components/JsonLd";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Fix my stuff", path: "/fix-my-stuff" },
];

export const metadata: Metadata = buildMetadata({
  title: "Fix My Stuff — Service Request | Central Florida Automation Services",
  description:
    "Something not working right? Submit a service request and a Central Florida Automation Services coordinator will reach out within one business day. Serving Central Florida since 1968.",
  path: "/fix-my-stuff",
});

const STEPS = [
  {
    title: "Tell us what's wrong",
    body: "Fill out the form with your details and a note on the issue.",
  },
  {
    title: "We review it same day",
    body: "A coordinator calls to schedule your visit within one business day.",
  },
  {
    title: "We fix it",
    body: "The team that installed your system is the one that services it.",
  },
];

export default function FixMyStuffPage() {
  return (
    <>
      <JsonLd data={localBusinessLd()} />
      <JsonLd data={breadcrumbLd(crumbs)} />

      <section className="relative bg-white">
        <NavSentinel />

        {/* Blue header band — kept to just the service request */}
        <div className="bg-navy-deep">
          <div className="mx-auto max-w-[1500px] px-5 pb-14 pt-36 sm:px-8 md:px-11 md:pb-16 md:pt-44">
            <Breadcrumbs items={crumbs} tone="onDark" />
            <div className="mt-10">
              <h1 className="font-hero text-[clamp(2.6rem,5.5vw,4.4rem)] font-light leading-[1.0] tracking-tight text-white">
                Let&rsquo;s fix your stuff.
              </h1>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-[1500px] px-5 pb-24 pt-16 sm:px-8 md:px-11 md:pb-32 md:pt-20">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12">
            {/* Left: how it works */}
            <div className="lg:col-span-5">
              <p className="font-sans text-[11px] uppercase tracking-eyebrow text-navy-logo">
                How it works
              </p>

              <ol className="mt-8 space-y-8">
                {STEPS.map((step, i) => (
                  <li key={step.title} className="flex gap-5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-navy-logo/30 font-display text-[15px] text-navy-logo">
                      {i + 1}
                    </span>
                    <div className="pt-1">
                      <h2 className="font-display text-[1.35rem] font-light leading-tight text-navy-deep">
                        {step.title}
                      </h2>
                      <p className="mt-2 font-sans text-[15px] leading-relaxed text-slate-600">
                        {step.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              {/* System down — call CTA */}
              <div className="mt-12 border-t border-slate-200 pt-8">
                <p className="font-sans text-[11px] uppercase tracking-eyebrow text-slate-500">
                  System down and it can&rsquo;t wait?
                </p>
                <a
                  href={BUSINESS.phoneHref}
                  className="mt-3 inline-flex items-center gap-3 font-display text-2xl text-navy-deep transition-colors hover:text-navy-logo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-logo/40"
                >
                  <Phone strokeWidth={1.25} className="h-5 w-5 text-navy-logo" />
                  {BUSINESS.phone}
                </a>
                <p className="mt-2 font-sans text-[14px] leading-relaxed text-slate-500">
                  Call us directly and skip the form. An existing client looking
                  for app logins?{" "}
                  <a
                    href="/existing-clients"
                    className="text-navy-logo underline-offset-4 hover:underline"
                  >
                    Existing Clients
                  </a>
                  .
                </p>
              </div>
            </div>

            {/* Right: service request form */}
            <div className="lg:col-span-6 lg:col-start-7">
              <div className="border border-slate-200 bg-slate-50 p-7 shadow-[0_24px_60px_-32px_rgba(10,26,82,0.35)] sm:p-9 md:p-10">
                <h2 className="font-display text-2xl text-navy-deep">Tell us what is wrong</h2>
                <p className="mt-2 font-sans text-[14px] text-slate-500">
                  We reply within one business day.
                </p>
                <div className="mt-8">
                  <ServiceRequestForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
