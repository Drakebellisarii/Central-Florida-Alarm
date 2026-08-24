import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { buildMetadata, localBusinessLd, breadcrumbLd } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { JsonLd } from "@/components/JsonLd";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Existing Clients", path: "/existing-clients" },
  { name: "Owner Manuals", path: "/existing-clients/manuals" },
];

export const metadata: Metadata = buildMetadata({
  title: "Alarm System Owner Manuals | Central Florida Automation Services",
  description:
    "Owner manuals for the alarm panels CFAS services, grouped by brand: Honeywell, DSC, Qolsys, Interlogix, and Caddx. Each manual opens as a PDF.",
  path: "/existing-clients/manuals",
});

const DIR = "/Manuals";

type Manual = { name: string; file: string };
type Brand = { brand: string; manuals: Manual[] };

/* Grouped by the badge on the front of the panel, since that is what a
   client is looking at when they come to this page. Ordered by how often
   these show up in the field rather than alphabetically. */
const BRANDS: Brand[] = [
  {
    brand: "Honeywell",
    manuals: [
      { name: "Vista 15P / 20P", file: "honeywell-vista-15p-20p.pdf" },
      { name: "Vista 128BP / 250BP", file: "honeywell-vista-128bp-250bp.pdf" },
      { name: "Vista (At a Glance)", file: "honeywell-vista-at-a-glance.pdf" },
      { name: "Lynx 5200 (At a Glance)", file: "lynx-5200-at-a-glance.pdf" },
    ],
  },
  {
    brand: "DSC",
    manuals: [
      { name: "Neo HS2016", file: "dsc-neo-hs2016.pdf" },
      { name: "PC1616 / PC1832 / PC1864", file: "dsc-pc1616-pc1832-pc1864.pdf" },
      { name: "PC1500 / PC1550", file: "dsc-pc1500-pc1550.pdf" },
      { name: "PC2550", file: "dsc-pc2550.pdf" },
      { name: "PC4020", file: "dsc-pc4020.pdf" },
      { name: "Power 832", file: "dsc-power-832.pdf" },
      { name: "Partner (At a Glance)", file: "dsc-partner-at-a-glance.pdf" },
    ],
  },
  {
    brand: "Qolsys",
    manuals: [
      { name: "IQ Panel 4 (User Guide)", file: "iq-panel-4-user-guide.pdf" },
      { name: "IQ Panel 4 (Quick Guide)", file: "iq-panel-4-quick-guide.pdf" },
      { name: "IQ Panel 2", file: "qolsys-iq-panel-2.pdf" },
    ],
  },
  {
    brand: "Interlogix (ITI)",
    manuals: [
      { name: "Concord Express", file: "iti-concord-express.pdf" },
      { name: "Commander 2000", file: "iti-commander-2000.pdf" },
      { name: "Simon V2", file: "iti-simon-v2.pdf" },
      { name: "SX-V", file: "iti-sx-v.pdf" },
    ],
  },
  {
    brand: "Caddx (NetworX)",
    manuals: [
      { name: "NX-4", file: "caddx-nx4.pdf" },
      { name: "NX-148", file: "caddx-nx148.pdf" },
      { name: "NX-540", file: "caddx-nx540.pdf" },
    ],
  },
];

export default function ManualsPage() {
  return (
    <>
      <JsonLd data={localBusinessLd()} />
      <JsonLd data={breadcrumbLd(crumbs)} />

      <PageHero
        light
        crumbs={crumbs}
        title="Alarm System Owner Manuals"
        lead="Find your panel below and click it to open the manual, each one is a PDF that will open in a new tab."
      />

      <div className="bg-white">
        <div className="mx-auto max-w-[93.75rem] px-5 py-16 sm:px-8 md:px-11 md:py-24">
          {/* Brand blocks laid across, each one internally stacked. The
              columns pair by BRAND, not by manual: panels within a brand stay
              in a single top-to-bottom column so related model numbers read
              down the page.

              Breakpoints follow real devices rather than the default ramp:
              one column on phones, two from md (768px) which covers iPad
              portrait AND landscape at 1024, and three only from xl (1280px)
              where actual desktops and monitors start. items-start keeps
              blocks top-aligned since brands hold different manual counts. */}
          <div className="grid grid-cols-1 items-start gap-x-12 gap-y-14 md:grid-cols-2 md:gap-x-14 md:gap-y-16 xl:grid-cols-3 xl:gap-x-16">
          {BRANDS.map((b) => (
            <section key={b.brand}>
              <h2 className="font-sans text-[0.6875rem] uppercase tracking-eyebrow text-navy/45">
                {b.brand}
              </h2>

              {/* Manuals stay in one stacked column inside the brand block —
                  a two-up grid of manuals made the eye jump left/right between
                  unrelated panel numbers. */}
              <ul className="mt-6 border-t border-navy/10">
                {b.manuals.map((m) => (
                  <li key={m.file} className="border-b border-navy/10">
                    <a
                      href={`${DIR}/${m.file}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-6 py-5 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-logo/40"
                    >
                      <span className="font-display text-[0.9375rem] font-light leading-snug tracking-tight text-navy-deep transition-colors duration-300 group-hover:text-navy-logo md:text-[1.0625rem]">
                        {m.name}
                      </span>
                      <span className="flex shrink-0 items-center gap-2 font-sans text-[0.625rem] uppercase tracking-wide2 text-navy/40 transition-colors duration-300 group-hover:text-navy-logo">
                        PDF
                        <ArrowUpRight
                          strokeWidth={1.5}
                          aria-hidden="true"
                          className="h-3.5 w-3.5 transition-transform duration-300 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
          </div>

          <p className="mt-16 border-t border-navy/10 pt-8 font-sans text-[0.9375rem] leading-relaxed text-slate-500 md:mt-20">
            Do not see your panel? Call us at{" "}
            <a
              href="tel:+14078398485"
              className="text-navy-logo underline underline-offset-4 transition-colors hover:text-navy"
            >
              407-839-8485
            </a>{" "}
            and we will send the right manual over.
          </p>
        </div>
      </div>
    </>
  );
}
