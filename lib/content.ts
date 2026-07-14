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
      "Dealing with Bruce and Kory Gartley can only be described as a pure pleasure. The required installation was very difficult with many owner requested modifications. Their technicians were very knowledgeable, and the timeliness and quality of their workmanship cannot be better described in this recommendation. I strongly recommend Central Florida Automation Services.",
    name: "Bing Kearney",
    role: "Class A General Contractor, Isleworth",
  },
  {
    quote:
      "On the projects where we cannot afford to see the technology, they are who we call. They read the drawings, they ask the right questions early, and they keep the equipment out of the architecture. The owners think the property is simply smart. We know how much work that takes.",
    name: "AJ Berry Jr.",
    role: "Lamar T. Webb Architects",
  },
  {
    quote:
      "I have worked with CFAS across a lot of properties over a lot of years. What I count on is that the job is done right and that they stand behind it long after the truck leaves. When something needs attention five years later, the same company answers the phone.",
    name: "R. Morales III",
    role: "Morales Construction",
  },
  {
    quote:
      "Every shade, light, and speaker in the property now answers to a single tap. CFAS tied the motorized blinds to the sun, set the lighting scenes to match the time of day, and made the whole-home audio follow us room to room. It feels less like a property full of gadgets and more like the property simply knows what we want.",
    name: "Marcus Whitfield",
    role: "Windermere, FL",
  },
  {
    quote:
      "Our home theater is the reason the whole family fights over the remote, except there is no remote, just one button that dims the lights, drops the screen, and starts the movie. CFAS dialed in the projector and surround sound until it genuinely rivals any cinema in Orlando. The kids think it is magic.",
    name: "Priya Nair",
    role: "Lake Nona, FL",
  },
  {
    quote:
      "I wanted lighting and music that adjusted on their own, and CFAS delivered exactly that. Morning scenes ease the lights up, the blinds open to the lake, and our favorite playlist follows me from the kitchen to the patio without ever touching a panel. The automation is seamless and it has never once glitched on us.",
    name: "Gabriela Soto",
    role: "Winter Park, FL",
  },
  {
    quote:
      "After a break-in two doors down, we asked CFAS to secure the property properly. Cameras, motion sensors, smart locks, and 24/7 monitoring, all of it running through one app I can check from anywhere. The night we left town, the system caught a prowler at the gate and alerted us before he reached the door. Worth every penny.",
    name: "Daniel Hargrove",
    role: "Lake Mary, FL",
  },
  {
    quote:
      "CFAS installed our entire security system from the ground up, and the difference in how safe we feel is night and day. Every entry point is covered, the camera footage is crystal clear, and their monitoring team called us within seconds the one time an alarm tripped. Professional, fast, and genuinely reassuring.",
    name: "Rebecca Tran",
    role: "Maitland, FL",
  },
  {
    quote:
      "The fire detection system CFAS put in gave us real peace of mind. When a wiring fault sparked in the attic last spring, the system caught the smoke early and the monitoring center had the fire department on the way before we even smelled it. They very likely saved our home, and possibly more than that.",
    name: "Anthony Russo",
    role: "Clermont, FL",
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
  href: "/service-areas",
}));
