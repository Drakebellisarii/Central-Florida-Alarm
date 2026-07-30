import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Phone, MapPin, Mail } from "lucide-react";
import { BUSINESS } from "@/lib/seo";
import { SERVICE_NAV } from "@/lib/content";

const SOLUTIONS = [
  { name: "Smart Security", href: "/smart-security" },
  { name: "Smart Home", href: "/smart-home" },
  { name: "Smart Business", href: "/smart-business" },
  { name: "Smart Luxury", href: "/smart-luxury" },
];

const COMPANY = [
  { name: "Service Areas", href: "/service-areas" },
  { name: "FAQ", href: "/faq" },
  { name: "Contact", href: "/contact" },
  { name: "Existing Clients", href: "/existing-clients" },
  { name: "Repair Request", href: "/repair-request" },
];

export function Footer() {
  const year = new Date().getFullYear();
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${BUSINESS.name}, ${BUSINESS.street}, ${BUSINESS.city}, ${BUSINESS.state} ${BUSINESS.zip}`
  )}`;

  return (
    <footer className="relative border-t border-white/10 bg-navy-deep">
      <div className="mx-auto max-w-[93.75rem] px-5 pb-12 pt-14 sm:px-8 md:px-11 md:pb-16 md:pt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-12 lg:gap-8">
          {/* Brand + NAP */}
          <div className="sm:col-span-2 md:col-span-4 lg:col-span-4 lg:pr-8">
            <Image
              src="/images/cfas-logo-light.png"
              alt="Central Florida Automation Services"
              width={200}
              height={99}
              className="h-20 w-auto"
            />
            <p className="mt-6 font-sans text-[0.6875rem] uppercase tracking-eyebrow text-white/40">
              An Atlantic Company
            </p>

            <address className="mt-8 flex flex-col gap-4 not-italic">
              <a
                href={mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-white/60 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              >
                <MapPin strokeWidth={1.25} className="mt-0.5 h-4 w-4 shrink-0" />
                <span className="font-sans text-[0.875rem] leading-relaxed">
                  {BUSINESS.name}
                  <br />
                  {BUSINESS.street}
                  <br />
                  {BUSINESS.city}, {BUSINESS.state} {BUSINESS.zip}
                </span>
              </a>
              <a
                href={BUSINESS.phoneHref}
                className="flex items-center gap-3 text-white/60 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              >
                <Phone strokeWidth={1.25} className="h-4 w-4 shrink-0" />
                <span className="font-sans text-[0.875rem]">{BUSINESS.phone}</span>
              </a>
              <div className="flex items-start gap-3 text-white/60">
                <Mail strokeWidth={1.25} className="mt-0.5 h-4 w-4 shrink-0" />
                <div className="font-sans text-[0.875rem] leading-relaxed">
                  <p>
                    <span className="text-white/40">Office</span>{" "}
                    <a
                      href={`mailto:${BUSINESS.officeEmail}`}
                      className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                    >
                      {BUSINESS.officeEmail}
                    </a>
                  </p>
                  <p className="mt-1">
                    <span className="text-white/40">Sales</span>{" "}
                    <a
                      href={`mailto:${BUSINESS.salesEmail}`}
                      className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                    >
                      {BUSINESS.salesEmail}
                    </a>
                  </p>
                </div>
              </div>
            </address>

            <div className="mt-7 flex items-center gap-4">
              <SocialLink href={BUSINESS.social.facebook} label="Facebook">
                <Facebook strokeWidth={1.25} className="h-4 w-4" />
              </SocialLink>
              <SocialLink href={BUSINESS.social.instagram} label="Instagram">
                <Instagram strokeWidth={1.25} className="h-4 w-4" />
              </SocialLink>
            </div>
          </div>

          {/* Solutions — the four pillar pages */}
          <FooterColumn title="Solutions" className="lg:col-span-2">
            {SOLUTIONS.map((s) => (
              <li key={s.href}>
                <FooterLink href={s.href}>{s.name}</FooterLink>
              </li>
            ))}
          </FooterColumn>

          {/* Services — informational only, no detail pages */}
          <FooterColumn title="Services" className="lg:col-span-2">
            {SERVICE_NAV.map((s) => (
              <li
                key={s.href}
                className="font-sans text-[0.8125rem] text-white/55"
              >
                {s.name}
              </li>
            ))}
          </FooterColumn>

          {/* Company */}
          <FooterColumn title="Company" className="lg:col-span-2">
            {COMPANY.map((s) => (
              <li key={s.href}>
                <FooterLink href={s.href}>{s.name}</FooterLink>
              </li>
            ))}
          </FooterColumn>

          {/* Credentials */}
          <FooterColumn title="Licensed and Insured" className="lg:col-span-2">
            {BUSINESS.licenses.map((lic) => (
              <li key={lic} className="font-sans text-[0.8125rem] text-white/55">
                <span className="text-white/40">FL</span> {lic}
              </li>
            ))}
            <li className="font-sans text-[0.8125rem] text-white/55">
              <span className="text-white/40">GA</span> LU405163
            </li>
          </FooterColumn>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-5">
            <p className="font-sans text-[0.75rem] text-white/30">
              &copy; {year} {BUSINESS.name}. All rights reserved.
            </p>
            <Link
              href="/privacy"
              className="whitespace-nowrap font-sans text-[0.75rem] text-white/40 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
            >
              Privacy Policy
            </Link>
          </div>
          <p className="font-sans text-[0.75rem] text-white/30">
            {BUSINESS.region} smart home and security integration.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  className,
  children,
}: {
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <h2 className="font-sans text-[0.6875rem] uppercase tracking-eyebrow text-white/40">
        {title}
      </h2>
      <ul className="mt-5 space-y-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="font-sans text-[0.8125rem] text-white/55 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
    >
      {children}
    </Link>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-10 w-10 items-center justify-center border border-white/15 text-white/40 transition-colors hover:border-white/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
    >
      {children}
    </a>
  );
}
