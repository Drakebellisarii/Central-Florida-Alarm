/* ------------------------------------------------------------------ */
/* Service-area data. Drives the six area routes via                  */
/* generateStaticParams(). Each intro references the actual community, */
/* not generic filler.                                                 */
/* ------------------------------------------------------------------ */

export type Area = {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  /** Short line under the H1 */
  kicker: string;
  /** Real, community-specific prose. Two or three paragraphs. */
  intro: string[];
  /** Slugs of nearby areas */
  nearby: string[];
};

export const AREAS: Area[] = [
  {
    slug: "orlando",
    name: "Orlando",
    metaTitle:
      "Smart Home and Security in Orlando, FL | Central Florida Automation Services",
    metaDescription:
      "Smart home automation and security for Orlando homes and businesses. Control4, Lutron, and Alarm.com integration by a licensed Florida integrator headquartered in Orlando since 1968.",
    kicker: "Our home since 1968",
    intro: [
      "Orlando is where we started, and our office on Adanson Street has been the base for this work for more than fifty years. From College Park and Baldwin Park to the lakefront streets of the older neighborhoods and the new custom homes going up across the metro, we have wired a large share of the fine houses in this city, many of them more than once as families have grown and remodeled.",
      "A city this spread out means we know the difference between a 1920s bungalow near downtown and a new build out toward the east side, and we design the system to fit the house in front of us. Whether you are building from the ground up or bringing an older Orlando home up to date, you are working with a company that has been a part of this community for three generations.",
    ],
    nearby: ["winter-park", "windermere", "dr-phillips"],
  },
  {
    slug: "winter-park",
    name: "Winter Park",
    metaTitle:
      "Smart Home and Security in Winter Park, FL | Central Florida Automation Services",
    metaDescription:
      "Smart home automation and security for Winter Park's historic homes and lakefront estates. Discreet, beautifully integrated systems that respect the architecture. Serving Winter Park since 1968.",
    kicker: "Historic homes, lakefront estates",
    intro: [
      "Winter Park is one of the most demanding places we work, and that is a compliment to the town. The homes along the Chain of Lakes and the brick streets off Park Avenue were built with real craftsmanship, and many of them are protected by their history. Dropping modern technology into a house like that without disturbing it is exactly the kind of careful work we do best.",
      "We have spent decades learning how to bring automation, lighting, and security into Winter Park's older homes without tearing into plaster walls or ruining the millwork. Wireless lighting and shading, concealed speakers, and carefully routed wire let us deliver a thoroughly modern system inside a house that still looks every bit its age. On the newer estates along the lakes, we design from the plans and make the technology disappear entirely.",
    ],
    nearby: ["orlando", "lake-nona", "windermere"],
  },
  {
    slug: "lake-nona",
    name: "Lake Nona",
    metaTitle:
      "Smart Home and Security in Lake Nona, FL | Central Florida Automation Services",
    metaDescription:
      "Smart home automation and security for Lake Nona's new custom homes and golf estates. Whole-house Control4 and Lutron systems planned with your builder from the studs. Serving Lake Nona since 1968.",
    kicker: "New builds and golf estates",
    intro: [
      "Lake Nona is where a great deal of the area's new luxury construction is happening, and new construction is the ideal place to do this work. When we are involved before the drywall, we run exactly the right wire to exactly the right places, and the finished house behaves like one system from the first day you move in. We work alongside the builders shaping Lake Nona to make that happen.",
      "The custom homes and golf-course estates here are being built with high expectations, and the technology should match. We plan automation, lighting, motorized shades, theaters, and full-property networking into the house during construction, so nothing is an afterthought bolted on at the end. The result is a home where the systems were designed at the same time as the architecture, the way it should be.",
    ],
    nearby: ["orlando", "winter-park", "celebration"],
  },
  {
    slug: "windermere",
    name: "Windermere",
    metaTitle:
      "Smart Home and Security in Windermere, FL | Central Florida Automation Services",
    metaDescription:
      "Smart home automation and security for Windermere's lakefront estates and gated communities, including Isleworth. Whole-house systems and full-property networking and surveillance. Since 1968.",
    kicker: "Lakefront estates and Isleworth",
    intro: [
      "Windermere, and Isleworth in particular, is home to some of the largest and most private estates in Central Florida, and properties on that scale bring their own challenges. A house and grounds this size cannot be covered by a single router or a handful of cameras. They need a real network reaching from the main house to the dock and the guest house, and surveillance and lighting designed for acreage rather than a lot.",
      "We have spent years working on the lakefront properties around the Butler Chain, and we understand what these homes require: coverage that extends across the whole property, systems that are genuinely private and secure, and an installation discreet enough that none of it intrudes on the architecture or the view. For the families who own these estates, the point of the technology is that you never have to think about it.",
    ],
    nearby: ["dr-phillips", "orlando", "winter-park"],
  },
  {
    slug: "celebration",
    name: "Celebration",
    metaTitle:
      "Smart Home and Security in Celebration, FL | Central Florida Automation Services",
    metaDescription:
      "Smart home automation and security for Celebration's distinctive homes. Discreet lighting, audio, shading, and security that respect the town's architecture. Serving Celebration since 1968.",
    kicker: "A town built with intention",
    intro: [
      "Celebration was planned down to the detail, and the homes here were built to a coherent architectural vision that residents tend to take seriously. That suits us. The work we do is meant to respect the house it lives in, which means systems that stay out of sight and controls that look like they belong on the wall of a well-designed home rather than in a server room.",
      "From the porches and front rooms that define Celebration's traditional architecture to the comfortable, livable interiors behind them, we bring in lighting control, whole-house audio, motorized shades, and security in a way that fits the character of the town. The technology is current and capable, and from across the room you would never know it was there.",
    ],
    nearby: ["lake-nona", "dr-phillips", "orlando"],
  },
  {
    slug: "dr-phillips",
    name: "Dr. Phillips",
    metaTitle:
      "Smart Home and Security in Dr. Phillips, FL | Central Florida Automation Services",
    metaDescription:
      "Smart home automation and security for Dr. Phillips' guard-gated estates and Bay Hill. Whole-house automation, surveillance, and networking designed for large, private homes. Since 1968.",
    kicker: "Guard-gated estates and Bay Hill",
    intro: [
      "Dr. Phillips is defined by its guard-gated communities and the large estates inside them, from Bay Hill to the neighborhoods along the Sand Lake chain. A gate at the entrance is a good start, but it watches the road, not your house, and the homes here are substantial enough to warrant security and automation designed specifically for them.",
      "We design systems for Dr. Phillips estates that complement a guarded community rather than duplicate it: surveillance and access placed where they matter to your particular property, lighting and shading that make a large house comfortable to live in, and networking strong enough to cover the whole footprint. The households we serve here expect the work to be private, reliable, and invisible, and that is exactly how we build it.",
    ],
    nearby: ["windermere", "orlando", "celebration"],
  },
];

export function getArea(slug: string): Area | undefined {
  return AREAS.find((a) => a.slug === slug);
}

export function areaParams(): { city: string }[] {
  return AREAS.map((a) => ({ city: a.slug }));
}
