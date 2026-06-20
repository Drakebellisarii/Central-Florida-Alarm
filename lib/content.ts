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
  {
    quote:
      "Their team came to us early in the design phase, which is exactly how it should work. They flagged things in the drawings that would have cost twice as much to solve in the field, and delivered a system the owner still raves about two years in.",
    name: "Sara Mitchell",
    role: "Interior Designer",
  },
  {
    quote:
      "I have lived in this house for six years and the system has never once needed a service call I did not initiate myself. When I have called, they pick up. That kind of reliability is what you hope for and rarely get.",
    name: "Private Client",
    role: "Windermere, FL",
  },
  {
    quote:
      "We brought CFAS in on a lakefront estate at the framing stage. They were the best-coordinated sub on the job — drawings on time, no change orders that were their fault, and a commissioning that went exactly as described.",
    name: "James Holton",
    role: "Holton Custom Homes",
  },
  {
    quote:
      "Integration is one of those things that can make a home feel cheap or feel extraordinary. CFAS understands that. They know how to hide everything that should be hidden and surface only what serves the design. Our clients have never had a complaint.",
    name: "Elena Cross",
    role: "Cross Design Studio",
  },
  {
    quote:
      "Managing a property portfolio in Central Florida means you need contractors who communicate, show up, and do not create liability. CFAS checks every box. They have maintained three of our estates for over a decade without incident.",
    name: "T. Garrison",
    role: "Estate Property Manager",
  },
  {
    quote:
      "We referred CFAS to a client building in Lake Nona and they sent a thank-you note specifically because of the experience they had with the team. That says everything.",
    name: "David Park",
    role: "Park + Associates Architecture",
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
