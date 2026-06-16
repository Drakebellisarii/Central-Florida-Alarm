import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
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

        {/* Blue masthead band — title sits on brand navy, body on white */}
        <div className="bg-navy-deep">
          <div className="mx-auto max-w-[1500px] px-5 pb-20 pt-36 sm:px-8 md:px-11 md:pb-24 md:pt-44">
            <Breadcrumbs items={crumbs} tone="onDark" />
            <div className="mt-10 max-w-2xl">
              <h1 className="font-display text-[clamp(2.6rem,5.5vw,4.4rem)] font-light leading-[1.0] tracking-tight text-white">
                Tell us about the house.
              </h1>
              <p className="mt-7 max-w-md font-sans text-[17px] leading-relaxed text-white/70">
                Whether you are reviewing plans with an architect or living in a home
                that has not kept up, the first step is a conversation. There is no
                charge for it, and no pressure after it.
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-[1500px] px-5 pb-24 pt-16 sm:px-8 md:px-11 md:pb-32 md:pt-20">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12">
            {/* Left: NAP */}
            <div className="lg:col-span-5">
              <dl className="space-y-7">
                <ContactRow icon={<Phone strokeWidth={1.25} className="h-5 w-5" />} label="Call">
                  <a
                    href={BUSINESS.phoneHref}
                    className="font-display text-2xl text-navy-deep transition-colors hover:text-navy-logo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-logo/40"
                  >
                    {BUSINESS.phone}
                  </a>
                </ContactRow>

                <ContactRow icon={<Mail strokeWidth={1.25} className="h-5 w-5" />} label="Email">
                  <a
                    href={BUSINESS.emailHref}
                    className="font-sans text-[16px] text-navy-deep transition-colors hover:text-navy-logo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-logo/40"
                  >
                    {BUSINESS.email}
                  </a>
                </ContactRow>

                <ContactRow icon={<MapPin strokeWidth={1.25} className="h-5 w-5" />} label="Visit">
                  <address className="font-sans text-[16px] not-italic leading-relaxed text-navy-deep">
                    {BUSINESS.street}
                    <br />
                    {BUSINESS.city}, {BUSINESS.state} {BUSINESS.zip}
                  </address>
                </ContactRow>

                <ContactRow icon={<Clock strokeWidth={1.25} className="h-5 w-5" />} label="Hours">
                  <p className="font-sans text-[16px] leading-relaxed text-navy-deep">
                    Monday to Friday, 8:00 to 5:00
                    <br />
                    <span className="text-slate-500">Monitoring and emergency support, 24/7</span>
                  </p>
                </ContactRow>
              </dl>

              <div className="mt-12 border-t border-slate-200 pt-7">
                <p className="font-sans text-[12px] uppercase tracking-eyebrow text-navy-logo">
                  Licensed in Florida
                </p>
                <p className="mt-3 font-sans text-[14px] leading-relaxed text-slate-500">
                  {BUSINESS.licenses.map((l) => `FL ${l}`).join("   ·   ")}
                </p>
              </div>
            </div>

            {/* Right: form */}
            <div className="lg:col-span-6 lg:col-start-7">
              <div className="border border-slate-200 bg-slate-50 p-7 shadow-[0_24px_60px_-32px_rgba(10,26,82,0.35)] sm:p-9 md:p-10">
                <h2 className="font-display text-2xl text-navy-deep">Request a consultation</h2>
                <p className="mt-2 font-sans text-[14px] text-slate-500">
                  We reply within one business day.
                </p>
                <div className="mt-8">
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-5">
      <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center border border-slate-200 text-navy-logo">
        {icon}
      </span>
      <div>
        <dt className="font-sans text-[11px] uppercase tracking-eyebrow text-slate-500">
          {label}
        </dt>
        <dd className="mt-1.5">{children}</dd>
      </div>
    </div>
  );
}
