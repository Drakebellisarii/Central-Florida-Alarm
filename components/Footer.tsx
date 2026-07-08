import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Youtube, Phone, MapPin, Mail } from "lucide-react";
import { BUSINESS } from "@/lib/seo";
import { SERVICE_NAV } from "@/lib/content";

export function Footer() {
  const year = new Date().getFullYear();
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${BUSINESS.name}, ${BUSINESS.street}, ${BUSINESS.city}, ${BUSINESS.state} ${BUSINESS.zip}`
  )}`;

  return (
    <footer className="relative border-t border-white/10 bg-navy-deep">
      <div className="mx-auto max-w-[93.75rem] px-5 pb-12 pt-12 sm:px-8 md:px-11 md:pb-16 md:pt-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-x-8 md:gap-y-12 lg:gap-10">
          {/* Brand + NAP */}
          <div className="md:col-span-12 md:mb-2 lg:col-span-5 lg:mb-0">
            <Image
              src="/images/cfas-logo-light.png"
              alt="Central Florida Automation Services"
              width={200}
              height={99}
              className="h-20 w-auto"
            />
            <p className="mt-6 font-sans text-[0.6875rem] uppercase tracking-eyebrow text-white/45">
              Since 1968 &nbsp;&middot;&nbsp; One Mission &nbsp;&middot;&nbsp; Quality
            </p>
            <p className="mt-5 max-w-xs font-display text-lg leading-snug text-white/60">
              The systems disappear into the property. The trust is what you keep.
            </p>

            <address className="mt-8 not-italic">
              <a
                href={mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-white/50 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
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
                className="mt-4 flex items-center gap-3 text-white/60 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              >
                <Phone strokeWidth={1.25} className="h-4 w-4 shrink-0" />
                <span className="font-sans text-[0.875rem]">{BUSINESS.phone}</span>
              </a>
              <div className="mt-3 flex items-start gap-3 text-white/60">
                <Mail strokeWidth={1.25} className="mt-0.5 h-4 w-4 shrink-0" />
                <div className="font-sans text-[0.875rem] leading-relaxed">
                  <p>
                    <span className="text-white/35">Office</span>{" "}
                    <a
                      href={`mailto:${BUSINESS.officeEmail}`}
                      className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                    >
                      {BUSINESS.officeEmail}
                    </a>
                  </p>
                  <p className="mt-1">
                    <span className="text-white/35">Sales</span>{" "}
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
              <SocialLink href={BUSINESS.social.youtube} label="YouTube">
                <Youtube strokeWidth={1.25} className="h-4 w-4" />
              </SocialLink>
            </div>
          </div>

          {/* Services — links disabled for now */}
          <div className="md:col-span-6 lg:col-span-4 lg:mt-16">
            <h2 className="font-sans text-[0.6875rem] uppercase tracking-eyebrow text-white/40">
              Services
            </h2>
            <ul className="mt-5 space-y-3">
              {SERVICE_NAV.map((s) => (
                <li key={s.href} className="font-sans text-[0.875rem] text-white/55">
                  {s.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Credentials */}
          <div className="md:col-span-6 lg:col-span-3 lg:mt-16">
            <h2 className="font-sans text-[0.6875rem] uppercase tracking-eyebrow text-white/40">
              Licensed and Insured
            </h2>
            <ul className="mt-5 space-y-1.5 font-sans text-[0.8125rem] text-white/35">
              {BUSINESS.licenses.map((lic) => (
                <li key={lic}>
                  <span className="text-white/50">FL</span> {lic}
                </li>
              ))}
              <li>
                <span className="text-white/50">GA</span> LU405163
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-5">
            <p className="font-sans text-[0.75rem] text-white/30">
              &copy; {year} {BUSINESS.name}. All rights reserved.
            </p>
            <Link
              href="/contact"
              className="font-sans text-[0.75rem] text-white/40 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
            >
              Contact
            </Link>
            <Link
              href="/blog"
              className="font-sans text-[0.75rem] text-white/40 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
            >
              Blog
            </Link>
            <Link
              href="/privacy"
              className="font-sans text-[0.75rem] text-white/40 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
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
