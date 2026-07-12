import type { Metadata } from "next";
import { buildMetadata, localBusinessLd, breadcrumbLd } from "@/lib/seo";
import { NavSentinel } from "@/components/NavSentinel";
import { JsonLd } from "@/components/JsonLd";
import { MonitoringNumbersModal } from "@/components/MonitoringNumbersModal";
import { ServiceAgreementModal } from "@/components/ServiceAgreementModal";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Existing Clients", path: "/existing-clients" },
];

export const metadata: Metadata = buildMetadata({
  title: "Existing Clients — Portals & Services | Central Florida Automation Services",
  description:
    "Existing Central Florida Automation Services clients: visit your client portal, manage your service agreement, submit a service request, register your alarm, and more.",
  path: "/existing-clients",
});

/* ------------------------------------------------------------------ */
/* Existing-client action cards.                                       */
/*                                                                     */
/* TODO: replace each `href: "#"` with the real destination.           */
/* ------------------------------------------------------------------ */
type CardButton = { label: string; href: string };
type ActionCard = { n: number; title: string; buttons: CardButton[] };

const CARDS: ActionCard[] = [
  {
    n: 1,
    title: "Visit our client portal",
    buttons: [{ label: "Log In", href: "https://atlanticcompanies.simprosuite.com/customer/" }],
  },
  {
    n: 2,
    title: "I am interested in your service agreement",
    // Opens the ServiceAgreementModal form instead of navigating.
    buttons: [],
  },
  {
    n: 3,
    title: "How will you contact me in an emergency?",
    buttons: [{ label: "Learn More", href: "/existing-clients/reminders" }],
  },
  {
    n: 4,
    title: "Need service? Submit a service request",
    buttons: [{ label: "Learn More", href: "/fix-my-stuff" }],
  },
  {
    n: 5,
    title: "Alarm won't stop beeping?",
    buttons: [{ label: "Get Help", href: "/existing-clients/reminders#power-loss" }],
  },
  {
    n: 6,
    title: "Register your alarm",
    // Official registration pages per jurisdiction. Mount Dora has no
    // online registration, so it links to the alarm coordinator's email.
    buttons: [
      {
        label: "City of Orlando",
        href: "https://www.orlando.gov/Our-Government/Records-and-Documents/Registrations-and-Applications/Register-Your-Security-Alarm",
      },
      { label: "Orange County", href: "https://www.ocso.com/securityalarms/" },
      { label: "Altamonte Springs", href: "https://www.altamonte.org/422/Alarm-Services" },
      {
        label: "Casselberry",
        href: "https://www.casselberry.org/FormCenter/Online-Forms-4/Security-Alarm-Registration-59",
      },
      { label: "Kissimmee", href: "https://www.crywolfservices.com/kissimmeefl/RegForm/NewRegFormV2.aspx" },
      {
        label: "Volusia County",
        href: "https://www.volusiasheriff.gov/file/61/VSO-Alarm-Registration.pdf",
      },
      {
        label: "Daytona Beach",
        href: "https://product.cityalarmpermit.com/FAMSCitizen/DaytonaBeach/terms-condition.htm",
      },
      { label: "Mount Dora", href: "mailto:AndreanoJ@mountdora.gov" },
    ],
  },
  {
    n: 7,
    title: "Alarm monitoring customer portal",
    buttons: [{ label: "Learn More", href: "https://myalarms.com/Account/Login?ReturnUrl=%2F" }],
  },
];

export default function ExistingClientsPage() {
  return (
    <>
      <JsonLd data={localBusinessLd()} />
      <JsonLd data={breadcrumbLd(crumbs)} />
      <MonitoringNumbersModal />

      <section className="relative min-h-[100svh] bg-white">
        <NavSentinel />

        {/* Blue hero / heading band */}
        <div className="bg-navy-deep">
          <div className="mx-auto max-w-[93.75rem] px-5 pb-16 pt-36 sm:px-8 md:px-11 md:pb-20 md:pt-44 short:pb-10 short:pt-24">
            <h1 className="max-w-3xl font-hero text-[clamp(2.4rem,5vw,4rem)] font-light leading-[1.0] tracking-tight text-white">
              Welcome back.
            </h1>
          </div>
        </div>

        {/* Card grid — centered, so the final row sits in the middle */}
        <div className="mx-auto max-w-[93.75rem] px-5 py-16 sm:px-8 md:px-11 md:py-24">
          <ul className="flex flex-wrap justify-center gap-4">
            {CARDS.map((card) => (
              <li
                key={card.n}
                className="flex w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.67rem)]"
              >
                <div className="flex min-h-[15rem] w-full flex-col items-center border border-slate-200 bg-white p-8 text-center transition-shadow duration-300 hover:shadow-[0_18px_48px_-24px_rgba(10,26,82,0.35)]">
                  <span className="font-display text-[2.5rem] font-light leading-none text-navy-logo">
                    {card.n}
                  </span>
                  <h2 className="mt-4 font-display text-[1.4rem] font-light leading-snug tracking-tight text-navy-deep">
                    {card.title}
                  </h2>

                  <div className="mt-auto flex w-full flex-wrap justify-center gap-2 pt-7">
                    {card.n === 2 ? (
                      <ServiceAgreementModal />
                    ) : card.n === 6 ? (
                      // Many jurisdictions — compact outline pills instead
                      // of the full-size button.
                      card.buttons.map((b) => (
                        <a
                          key={b.label}
                          href={b.href}
                          {...(b.href.startsWith("http")
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                          className="inline-flex items-center justify-center border border-navy-logo/30 px-4 py-2 font-sans text-[0.6875rem] uppercase tracking-wide2 text-navy-deep transition-colors duration-300 hover:border-navy-logo hover:bg-navy-logo hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-logo/40"
                        >
                          {b.label}
                        </a>
                      ))
                    ) : (
                      card.buttons.map((b) => (
                        <a
                          key={b.label}
                          href={b.href}
                          className="inline-flex items-center justify-center bg-navy-logo px-7 py-3 font-sans text-[0.75rem] uppercase tracking-wide2 text-white transition-colors duration-300 hover:bg-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-logo/40"
                        >
                          {b.label}
                        </a>
                      ))
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
