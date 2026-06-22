import type { Metadata } from "next";

/* ------------------------------------------------------------------ */
/* Business constants (single source of truth for NAP + brand facts)  */
/* ------------------------------------------------------------------ */

export const SITE_URL = "https://www.centralfloridaautomation.com";

export const BUSINESS = {
  name: "Central Florida Automation Services",
  shortName: "CFAS",
  parent: "Atlantic Companies",
  founded: 1968,
  legalName: "Central Florida Automation Services",
  phone: "407-839-8485",
  phoneHref: "tel:+14078398485",
  email: "info@centralfloridaautomation.com",
  emailHref: "mailto:info@centralfloridaautomation.com",
  officeEmail: "info@cfalarm.com",
  salesEmail: "Kory@smarthome.biz",
  street: "5125 Adanson St, Suite 200",
  city: "Orlando",
  state: "FL",
  stateLong: "Florida",
  zip: "32804",
  region: "Greater Orlando",
  geo: { lat: 28.5847, lng: -81.3712 },
  licenses: ["EF0001226", "EF20002121", "EF20002120"],
  installations: "50,000+",
  social: {
    facebook: "https://www.facebook.com/cfalarm/",
    instagram: "https://www.instagram.com/atlantic.security/",
    youtube: "https://www.youtube.com/channel/UCuSfSxKR4Gr9tqd_KJXZmWA",
  },
} as const;

export const PRIMARY_BRANDS = [
  "Control4",
  "Lutron",
  "Sonos",
  "Alarm.com",
  "Ubiquiti",
] as const;

/* ------------------------------------------------------------------ */
/* Metadata helper — every page gets a unique title + description,    */
/* canonical URL, and Open Graph tags.                                */
/* ------------------------------------------------------------------ */

type MetaInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
};

export function buildMetadata({
  title,
  description,
  path,
  image,
}: MetaInput): Metadata {
  const url = `${SITE_URL}${path}`;
  const ogImage =
    image ??
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80";

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: BUSINESS.name,
      locale: "en_US",
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

/* ------------------------------------------------------------------ */
/* JSON-LD builders                                                   */
/* ------------------------------------------------------------------ */

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: BUSINESS.street,
  addressLocality: BUSINESS.city,
  addressRegion: BUSINESS.state,
  postalCode: BUSINESS.zip,
  addressCountry: "US",
};

export function localBusinessLd(areaServed?: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ElectronicsStore",
    "@id": `${SITE_URL}/#organization`,
    name: BUSINESS.name,
    alternateName: BUSINESS.shortName,
    parentOrganization: { "@type": "Organization", name: BUSINESS.parent },
    foundingDate: String(BUSINESS.founded),
    url: SITE_URL,
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    image: `${SITE_URL}/images/cfas-logo.png`,
    logo: `${SITE_URL}/images/cfas-logo.png`,
    priceRange: "$$$$",
    address: postalAddress,
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS.geo.lat,
      longitude: BUSINESS.geo.lng,
    },
    areaServed: (areaServed ?? [
      "Orlando",
      "Winter Park",
      "Windermere",
      "Dr. Phillips",
      "Lake Nona",
      "Celebration",
    ]).map((name) => ({ "@type": "City", name })),
    sameAs: [
      BUSINESS.social.facebook,
      BUSINESS.social.instagram,
      BUSINESS.social.youtube,
    ],
  };
}

export function serviceLd(input: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: input.name,
    name: input.name,
    description: input.description,
    url: `${SITE_URL}${input.path}`,
    areaServed: { "@type": "City", name: "Orlando" },
    provider: {
      "@type": "ElectronicsStore",
      name: BUSINESS.name,
      telephone: BUSINESS.phone,
      address: postalAddress,
    },
  };
}

export function faqLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}
