import type { Metadata } from "next";
import { Phone, Mail } from "lucide-react";
import { buildMetadata, localBusinessLd, breadcrumbLd, BUSINESS } from "@/lib/seo";
import { NavSentinel } from "@/components/NavSentinel";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ServiceRequestForm } from "@/components/ServiceRequestForm";
import { JsonLd } from "@/components/JsonLd";
import { MonitoringNumbersModal } from "@/components/MonitoringNumbersModal";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Repair Request", path: "/repair-request" },
];

export const metadata: Metadata = buildMetadata({
  title: "Repair Request | Central Florida Automation Services",
  description:
    "Something not working right? Submit a repair request and a Central Florida Automation Services coordinator will reach out within one business day. Serving Central Florida since 1968.",
  path: "/repair-request",
});

export default function RepairRequestPage() {
  return (
    <>
      <JsonLd data={localBusinessLd()} />
      <JsonLd data={breadcrumbLd(crumbs)} />
      <MonitoringNumbersModal />

      <section className="relative bg-white">
        <NavSentinel />

        {/* Blue header band — kept to just the service request */}
        <div className="bg-navy-deep">
          <div className="mx-auto max-w-[93.75rem] px-5 pb-14 pt-36 sm:px-8 md:px-11 md:pb-16 md:pt-44 short:pb-10 short:pt-24">
            <Breadcrumbs items={crumbs} tone="onDark" />
            <div className="mt-10">
              <h1 className="font-hero text-[clamp(2.6rem,5.5vw,4.4rem)] font-light leading-[1.0] tracking-tight text-white">
                Let&rsquo;s fix the problem.
              </h1>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-2xl px-5 pb-24 pt-16 sm:px-8 md:pb-32 md:pt-20">
          <ServiceRequestForm />

          {/* Direct lines */}
          <div className="mt-16 border-t border-slate-200 pt-10 text-center">
            <p className="font-sans text-[0.9375rem] leading-relaxed text-slate-600">
              System down and it can&rsquo;t wait? Reach us directly.
            </p>
            <div className="mt-7 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-12">
              <a
                href={BUSINESS.phoneHref}
                className="flex items-center gap-3.5 text-navy-deep transition-colors hover:text-navy-logo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-logo/40"
              >
                <Phone strokeWidth={1.25} className="h-5 w-5 shrink-0 text-navy-logo" />
                <span className="font-display text-[1.5rem] leading-none tracking-tight">
                  {BUSINESS.phone}
                </span>
              </a>
              <a
                href={`mailto:${BUSINESS.officeEmail}`}
                className="flex items-center gap-3.5 text-navy-deep transition-colors hover:text-navy-logo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-logo/40"
              >
                <Mail strokeWidth={1.25} className="h-5 w-5 shrink-0 text-navy-logo" />
                <span className="font-display text-[1.3rem] leading-none tracking-tight">
                  {BUSINESS.officeEmail}
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
