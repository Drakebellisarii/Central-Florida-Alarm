import type { Metadata } from "next";
import { Phone, Mail, MapPin } from "lucide-react";
import { buildMetadata, localBusinessLd, breadcrumbLd, BUSINESS } from "@/lib/seo";
import { NavSentinel } from "@/components/NavSentinel";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactForm } from "@/components/ContactForm";
import { JsonLd } from "@/components/JsonLd";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
];

export const metadata: Metadata = buildMetadata({
  title: "Contact | Central Florida Automation Services, Orlando, FL",
  description:
    "Talk to Central Florida Automation Services about smart home automation and security for your Orlando home or business. Call 407-839-8485 or request a consultation. Serving Central Florida since 1968.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd data={localBusinessLd()} />
      <JsonLd data={breadcrumbLd(crumbs)} />

      <section className="relative bg-white">
        <NavSentinel />

        {/* Blue header band — matches the service-request page */}
        <div className="bg-navy-deep">
          <div className="mx-auto max-w-[93.75rem] px-5 pb-20 pt-36 sm:px-8 md:px-11 md:pb-24 md:pt-44 short:pb-10 short:pt-24">
            <Breadcrumbs items={crumbs} tone="onDark" />
            <div className="mt-10">
              <h1 className="font-hero text-[clamp(2.6rem,5.5vw,4.4rem)] font-light leading-[1.0] tracking-tight text-white">
                Tell us about the property.
              </h1>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-2xl px-5 pb-24 pt-16 sm:px-8 md:pb-32 md:pt-20">
          <ContactForm />

          {/* Direct lines */}
          <div className="mt-16 border-t border-slate-200 pt-10 text-center">
            <p className="font-sans text-[0.9375rem] leading-relaxed text-slate-600">
              Prefer to talk first? Reach us directly.
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
                href={BUSINESS.emailHref}
                className="flex items-center gap-3.5 text-navy-deep transition-colors hover:text-navy-logo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-logo/40"
              >
                <Mail strokeWidth={1.25} className="h-5 w-5 shrink-0 text-navy-logo" />
                <span className="font-display text-[1.3rem] leading-none tracking-tight">
                  {BUSINESS.email}
                </span>
              </a>
            </div>
            <address className="mt-8 flex items-center justify-center gap-2.5 font-sans text-[0.875rem] not-italic leading-relaxed text-slate-500">
              <MapPin strokeWidth={1.25} className="h-4 w-4 shrink-0 text-navy-logo" />
              {BUSINESS.street}, {BUSINESS.city}, {BUSINESS.state} {BUSINESS.zip}
            </address>
          </div>
        </div>
      </section>
    </>
  );
}
