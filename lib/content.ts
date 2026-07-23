/* Shared homepage content: testimonials, stats, and the nav map. */

import { SERVICES } from "./services";
import { AREAS } from "./areas";

export type Testimonial = {
  pullQuote: string;
  body: string;
  name: string;
  role: string;
};

// The single, hand-picked client quote featured in AboutSection — split
// into a pull-quote (set large, in the primary color) and the surrounding
// body copy (set smaller, muted), editorial-style.
export const FEATURED_TESTIMONIAL: Testimonial = {
  pullQuote:
    "The timeliness and quality of their workmanship cannot be better described.",
  body:
    "Dealing with Bruce and Kory Gartley can only be described as a pure pleasure. The required installation was very difficult with many owner-requested modifications. Their technicians were very knowledgeable. I strongly recommend Central Florida Automation Services.",
  name: "Bing Kearney",
  role: "Class A General Contractor · Isleworth, FL",
};

// The company's stated promise — leads AboutSection, above the featured
// client testimonial.
export const MISSION_STATEMENT =
  "To be sure every client is so satisfied with our performance that they would definitely do business with us again.";

export const STATS = [
  { value: "50+", label: "Years in business", since: "Established 1968" },
  { value: "50,000+", label: "Installations", since: "Florida and Georgia" },
  { value: "3", label: "Office locations", since: "Greater Orlando" },
  { value: "24/7", label: "Monitoring and support", since: "Always answered" },
];

/* Nav helpers built from the data so links never drift out of sync */
export const SERVICE_NAV = SERVICES.map((s) => ({
  name: s.name,
  href: `/${s.slug}`,
  summary: s.summary,
}));

export const AREA_NAV = AREAS.map((a) => ({
  name: a.name,
  href: "/service-areas",
}));
