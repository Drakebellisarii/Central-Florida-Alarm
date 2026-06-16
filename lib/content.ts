/* Shared homepage content: testimonials, stats, and the nav map. */

import { SERVICES } from "./services";
import { AREAS } from "./areas";

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "We have handed CFAS some of the most complicated homes we have ever built, and they have never been the reason a closing slipped. They show up when they say they will, they coordinate with the rest of the trades, and the system works the day the owner walks in. That is rarer than it should be.",
    name: "Bing Kearney",
    role: "General Contractor",
  },
  {
    quote:
      "On the projects where we cannot afford to see the technology, they are who we call. They read the drawings, they ask the right questions early, and they keep the equipment out of the architecture. The owners think the house is simply smart. We know how much work that takes.",
    name: "AJ Berry Jr.",
    role: "Lamar T. Webb Architects",
  },
  {
    quote:
      "I have worked with CFAS across a lot of houses over a lot of years. What I count on is that the job is done right and that they stand behind it long after the truck leaves. When something needs attention five years later, the same company answers the phone.",
    name: "R. Morales III",
    role: "Morales Construction",
  },
];

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
  href: `/service-areas/${a.slug}`,
}));
