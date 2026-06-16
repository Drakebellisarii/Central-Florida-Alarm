import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Youtube, Phone, MapPin } from "lucide-react";
import { BUSINESS } from "@/lib/seo";
import { SERVICE_NAV, AREA_NAV } from "@/lib/content";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10 bg-navy-deep">
      <div className="mx-auto max-w-[1500px] px-5 pb-12 pt-12 sm:px-8 md:px-11 md:pb-16 md:pt-16">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Brand + NAP */}
          <div className="lg:col-span-4">
            <Image
              src="/images/cfas-logo-light.png"
              alt="Central Florida Automation Services"
              width={200}
              height={99}
              className="h-20 w-auto"
            />
            <p className="mt-6 max-w-xs font-display text-lg leading-snug text-white/60">
              The systems disappear into the house. The trust is what you keep.
            </p>

            <address className="mt-8 not-italic">
              <div className="flex items-start gap-3 text-white/50">
                <MapPin strokeWidth={1.25} className="mt-0.5 h-4 w-4 shrink-0" />
                <p className="font-sans text-[14px] leading-relaxed">
                  {BUSINESS.name}
                  <br />
                  {BUSINESS.street}
                  <br />
                  {BUSINESS.city}, {BUSINESS.state} {BUSINESS.zip}
                </p>
              </div>
              <a
                href={BUSINESS.phoneHref}
                className="mt-4 inline-flex items-center gap-3 font-sans text-[14px] text-white/60 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              >
                <Phone strokeWidth={1.25} className="h-4 w-4" />
                {BUSINESS.phone}
              </a>
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

          {/* Services */}
          <nav aria-label="Services" className="lg:col-span-3">
            <h2 className="font-sans text-[11px] uppercase tracking-eyebrow text-white/40">
              Services
            </h2>
            <ul className="mt-5 space-y-3">
              {SERVICE_NAV.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="font-sans text-[14px] text-white/55 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Areas */}
          <nav aria-label="Service areas" className="lg:col-span-2">
            <h2 className="font-sans text-[11px] uppercase tracking-eyebrow text-white/40">
              Service Areas
            </h2>
            <ul className="mt-5 space-y-3">
              {AREA_NAV.map((a) => (
                <li key={a.href}>
                  <Link
                    href={a.href}
                    className="font-sans text-[14px] text-white/55 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                  >
                    {a.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/contact"
                  className="font-sans text-[14px] text-white/55 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          {/* Credentials */}
          <div className="lg:col-span-3">
            <h2 className="font-sans text-[11px] uppercase tracking-eyebrow text-white/40">
              Licensed and Insured
            </h2>
            <ul className="mt-5 space-y-1.5 font-sans text-[13px] text-white/35">
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
            <p className="font-sans text-[12px] text-white/30">
              &copy; {year} {BUSINESS.name}. All rights reserved.
            </p>
            <Link
              href="/privacy"
              className="font-sans text-[12px] text-white/40 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
            >
              Privacy Policy
            </Link>
          </div>
          <p className="font-sans text-[12px] text-white/30">
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
