/* ------------------------------------------------------------------ */
/* Service data. Drives the seven service routes via                  */
/* generateStaticParams(). Every word here is real copy, written in    */
/* the voice of someone who has been doing this work since 1968.       */
/* ------------------------------------------------------------------ */

export type IconKey =
  | "home"
  | "shield"
  | "building"
  | "audio"
  | "lighting"
  | "shades"
  | "wifi";

export type FAQ = { q: string; a: string };

export type GalleryImage = { src: string; alt: string };

export type Service = {
  slug: string;
  /** Short label for nav and cards */
  name: string;
  /** Full service name used in the H1 ("... in Orlando, FL") */
  title: string;
  icon: IconKey;
  /** One-line summary used on cards and as the hero kicker */
  summary: string;
  metaTitle: string;
  metaDescription: string;
  heroImage: string;
  heroAlt: string;
  /** Real prose. Two paragraphs, no bullets. */
  overview: string[];
  /** The CFAS approach, one editorial paragraph. */
  approach: string;
  brands: string[];
  /** Equipment / scope, written as short noun phrases, not marketing bullets */
  scope: { label: string; detail: string }[];
  gallery: GalleryImage[];
  faqs: FAQ[];
  related: string[];
};

/* Guaranteed Unsplash images (all on images.unsplash.com).
   `auto=format` makes Unsplash hand back a pre-encoded WebP, and a smaller
   source width (900px is plenty for a 4/3 grid cell) means Next's optimizer
   pulls far less over the wire before it resizes — the slow part today. */
const U = "auto=format&fit=crop&w=900&q=70";
const IMG = {
  smartHome:
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?" + U,
  security:
    "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?" + U,
  av: "https://images.unsplash.com/photo-1593784991095-a205069470b6?" + U,
  lighting:
    "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?" + U,
  shades:
    "https://images.unsplash.com/photo-1513694203232-719a280e022f?" + U,
  networking:
    "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?" + U,
  commercial:
    "https://images.unsplash.com/photo-1486325212027-8081e485255e?" + U,
} as const;

export const SERVICES: Service[] = [
  {
    slug: "smart-home-automation",
    name: "Smart Home Automation",
    title: "Smart Home Automation",
    icon: "home",
    summary:
      "One system that runs the lights, climate, music, shades, and security of the entire house.",
    metaTitle:
      "Smart Home Automation in Orlando, FL | Central Florida Automation Services",
    metaDescription:
      "Whole-house automation for custom homes and estates across Greater Orlando. Control4 and Lutron integration of lighting, climate, audio, shades, and security from one system. Since 1968.",
    heroImage: IMG.smartHome,
    heroAlt:
      "Evening view of a modern Orlando living room with integrated lighting and automation",
    overview: [
      "Automation is the discipline of getting a house full of separate systems to behave like one. The lighting, the thermostats, the music, the shades, the cameras, the front gate, the pool equipment: each comes from a different manufacturer and speaks a different language. Our work is to make them answer to a single, quiet logic, so that the people who live there stop thinking about any of it.",
      "A well-designed system does not look like technology. It looks like the house simply knows what to do. Lights come up to twenty percent when someone walks downstairs at six in the morning. The theater dims, the shades drop, and the right source turns on from one button. When the last person leaves, the house sets itself back. None of it requires a manual, and none of it is on the wall where a guest would notice it.",
    ],
    approach:
      "We start with how you actually live in the house, not with a parts list. Before we specify a single keypad we walk the plans with you and your builder and decide what should happen in each room, at each time of day, for each person. Then we engineer the system to be reliable for fifteen years, label every wire, and document the whole thing so that the next person who touches it understands what we did. The measure of the work is that you forget it is there.",
    brands: ["Control4", "Lutron", "Savant", "Sonos", "Alarm.com"],
    scope: [
      { label: "Central control", detail: "Control4 or Savant processors sized to the home" },
      { label: "Keypads and touchscreens", detail: "Engraved Lutron and Control4 keypads, in-wall and tabletop" },
      { label: "Scenes and schedules", detail: "Morning, away, evening, and goodnight programmed to the household" },
      { label: "Remote access", detail: "Secure control and monitoring from anywhere" },
      { label: "Voice and app", detail: "Optional voice control and a single app for the whole house" },
    ],
    gallery: [
      { src: IMG.smartHome, alt: "Integrated living space with concealed automation in an Orlando home" },
      { src: IMG.lighting, alt: "Layered architectural lighting controlled by a single keypad" },
      { src: IMG.av, alt: "Media room wired into the whole-house automation system" },
    ],
    faqs: [
      {
        q: "We are building in Windermere. When should the automation company get involved?",
        a: "As early as you can, ideally before the drywall goes up. The wiring is the part that is expensive to change later. We work directly with your architect and builder during the rough-in stage to place the right cable in the right walls. You do not have to decide on every keypad that early, but the infrastructure should be in before the house is closed up.",
      },
      {
        q: "Do I have to replace everything if my house is already finished?",
        a: "No. A great deal can be done in an existing home using wireless lighting, retrofit shades, and equipment that rides on the wiring already in the walls. It is not quite as invisible as a system planned from the studs, but the result is usually indistinguishable to anyone living in the house. We will tell you honestly what is and is not worth opening a wall for.",
      },
      {
        q: "What happens when something stops working and I am out of town?",
        a: "Most issues we see remotely before you call. Our systems report their own health back to us, and many problems are corrected without anyone visiting the house. When a truck is needed, you are dealing with the same company that has been serving Central Florida since 1968, not a call center.",
      },
      {
        q: "Will the system still work if the internet goes down?",
        a: "Yes. Lighting, climate, shades, and locally stored audio run on the processor inside the house and do not depend on the internet. You lose remote access and streaming services until the connection returns, but the house itself keeps behaving normally.",
      },
      {
        q: "Is this going to be obsolete in five years?",
        a: "The platforms we install, Control4, Lutron, and Savant, have been supported for well over a decade and are updated regularly. We design systems to be added to rather than thrown away. We still service homes we wired in the 1990s.",
      },
      {
        q: "How much does whole-house automation cost in the Orlando area?",
        a: "For the homes we serve it generally runs from $30,000 for focused lighting and audio work to $200,000 and beyond for a fully integrated estate. The honest answer depends on the size of the house and how much of it you want the system to touch. We give a fixed proposal after we have seen the plans.",
      },
    ],
    related: ["lighting-control", "audio-video", "motorized-shades"],
  },

  {
    slug: "home-security",
    name: "Home Security",
    title: "Home Security and Surveillance",
    icon: "shield",
    summary:
      "Alarm, cameras, access, and monitoring engineered into the house and watched around the clock.",
    metaTitle:
      "Home Security Systems in Orlando, FL | Central Florida Automation Services",
    metaDescription:
      "Professionally monitored alarm, surveillance, and access control for Orlando estates and gated communities. Alarm.com and commercial-grade cameras, designed and installed by a licensed Florida integrator since 1968.",
    heroImage: IMG.security,
    heroAlt:
      "Discreet surveillance camera mounted on the exterior of an Orlando estate at dusk",
    overview: [
      "Security on a property like yours is not a box from a big-box store with a yard sign. It is alarm, video, access, and monitoring designed together so they cover the house without turning it into a fortress. Done right, you barely see it. The cameras sit where they belong, the keypads are where you actually enter, and the system arms itself when the house goes to bed.",
      "We hold the Florida licenses required to do this work properly, and we have been doing it across Central Florida for more than fifty years. That matters most on the day something goes wrong, when you want a monitored response and a company that knows your property rather than an account number in another state. Every system we install is documented, tested, and handed over with a walkthrough so the household actually knows how to use it.",
    ],
    approach:
      "We design from the outside in. We look at how someone would approach the property, where the natural sight lines are, and where a camera earns its place rather than just filling a corner. Then we build the alarm and access around how your family comes and goes, so arming the house is something you do without thinking. We would rather install fewer, better placed devices than blanket the house with hardware that nobody trusts.",
    brands: ["Alarm.com", "Control4", "Ubiquiti", "LiftMaster", "Luma"],
    scope: [
      { label: "Intrusion alarm", detail: "Door, window, and motion protection with cellular backup" },
      { label: "Surveillance", detail: "High-resolution cameras with local recording and clear night performance" },
      { label: "Access control", detail: "Keypads, smart locks, and gate integration" },
      { label: "Professional monitoring", detail: "24/7 central-station response, optional video verification" },
      { label: "Notifications", detail: "Real alerts that matter, not a phone full of false alarms" },
    ],
    gallery: [
      { src: IMG.security, alt: "Exterior surveillance camera covering the approach to an Orlando home" },
      { src: IMG.networking, alt: "Rack-mounted recorder and network gear for a residential security system" },
      { src: IMG.commercial, alt: "Monitored entry point integrated into a gated property" },
    ],
    faqs: [
      {
        q: "Do you monitor the system yourselves, and what does that cost?",
        a: "Monitoring is handled through a UL-listed central station we have worked with for years, with response coordinated by us. Plans are billed monthly and depend on whether you want intrusion only or video-verified alarms. We will quote it plainly. There are no long predatory contracts of the kind the national brands are known for.",
      },
      {
        q: "I live in a guard-gated community in Dr. Phillips. Do I even need an alarm?",
        a: "A gate slows people down, it does not watch your house. The properties we protect in Dr. Phillips and Isleworth still benefit from alarm and camera coverage, particularly during construction, staff hours, and travel. We design the system to fit a guarded community rather than duplicate it.",
      },
      {
        q: "Can I see the cameras on my phone, and is that secure?",
        a: "Yes. You get live and recorded video on your phone through an encrypted connection, with recording stored locally at the house so your footage is not sitting on someone else's server. We set up access carefully and walk you through exactly who can see what.",
      },
      {
        q: "Will the cameras actually be useful at night?",
        a: "Only if they are specified and aimed correctly, which is most of the job. We use cameras with real low-light performance and place them to work with your exterior lighting rather than against it. A camera pointed into a porch light is worthless, and we see it constantly on systems we are asked to replace.",
      },
      {
        q: "What happens if the power or internet is cut?",
        a: "The alarm has battery backup and a cellular path that does not rely on your internet or phone line, so a cut cable does not blind the system. Local video recording continues on backup power. This is standard on every security system we install.",
      },
      {
        q: "Can the security tie into the rest of the house automation?",
        a: "Yes, and it should. When the alarm is set to away, the lights, shades, and climate can settle the house automatically. When a perimeter camera detects someone after midnight, the right exterior lights can come on. We integrate the security with Control4 or Savant so the whole property works as one.",
      },
    ],
    related: ["commercial-security", "smart-home-automation", "networking"],
  },

  {
    slug: "commercial-security",
    name: "Commercial Security",
    title: "Commercial Security and Access Control",
    icon: "building",
    summary:
      "Access control, surveillance, and alarm for offices, multi-tenant buildings, and private facilities.",
    metaTitle:
      "Commercial Security Systems in Orlando, FL | Central Florida Automation Services",
    metaDescription:
      "Commercial-grade access control, video surveillance, and monitored alarm for Orlando businesses, offices, and facilities. Licensed Florida low-voltage contractor serving Central Florida since 1968.",
    heroImage: IMG.commercial,
    heroAlt:
      "Modern Orlando commercial building entrance with integrated access control",
    overview: [
      "Commercial work is a different problem from residential, and we treat it that way. A business has to manage who gets in, keep a record of it, protect people and inventory, and do all of it without slowing the workday down. That calls for access control that scales, cameras that hold up as evidence, and a system an office manager can actually run.",
      "We have wired offices, medical and dental practices, retail, warehouses, and private facilities throughout the Orlando area. As a licensed Florida low-voltage contractor we handle the permitting, the code, and the coordination with your general contractor, and we stand behind the installation afterward. The same company that designs the system services it, which is not something a national vendor can usually say.",
    ],
    approach:
      "We design commercial systems around your operations and your liability, not around a catalog. We map who needs access to what, set up credentials that are simple to issue and revoke, and place cameras where they will actually answer the questions you will one day need answered. Then we document the system and train your staff, because security that depends on one person who has since left the company is not security.",
    brands: ["Alarm.com", "Ubiquiti", "Avigilon", "LiftMaster", "Control4"],
    scope: [
      { label: "Access control", detail: "Card, fob, and mobile credentials with full audit trail" },
      { label: "Video surveillance", detail: "Documented camera coverage with retained, exportable footage" },
      { label: "Monitored alarm", detail: "Central-station response with cellular backup" },
      { label: "Visitor and entry management", detail: "Intercom, gate, and door release for staffed and unstaffed entries" },
      { label: "Multi-site", detail: "One platform across several buildings or locations" },
    ],
    gallery: [
      { src: IMG.commercial, alt: "Commercial building exterior with surveillance coverage in Orlando" },
      { src: IMG.security, alt: "Access-controlled door at a Central Florida business" },
      { src: IMG.networking, alt: "Network and recording equipment for a commercial security system" },
    ],
    faqs: [
      {
        q: "Can you manage access across more than one location?",
        a: "Yes. We deploy access platforms that put every door at every site on one dashboard, so issuing or revoking a credential takes seconds and applies everywhere. This is routine for the multi-site clients we serve around Central Florida.",
      },
      {
        q: "Are you licensed to do commercial low-voltage work in Florida?",
        a: "We are. We hold Florida licenses EF0001226, EF20002121, and EF20002120 and we pull the permits and meet the code requirements that commercial work demands. You are not gambling on whether the installer is qualified.",
      },
      {
        q: "How long is camera footage kept?",
        a: "That is a design decision driven by your needs and any compliance requirements you carry. We size the storage to the retention period you need, whether that is two weeks or several months, and we make sure the footage can actually be exported and used when it matters.",
      },
      {
        q: "Will a new system work with the cameras or readers we already have?",
        a: "Often, yes. We will assess what you have, tell you honestly what is worth keeping, and integrate it where it makes sense rather than forcing a full replacement to pad the invoice. Sometimes a full upgrade is the right call, and we will explain why if it is.",
      },
      {
        q: "Who services the system after it is installed?",
        a: "We do. The people who designed and installed your system are the people who maintain it. For commercial clients we offer service agreements with defined response times so a failed door or camera is handled on a schedule you can count on.",
      },
    ],
    related: ["home-security", "networking", "audio-video"],
  },

  {
    slug: "audio-video",
    name: "Audio and Video",
    title: "Audio and Video",
    icon: "audio",
    summary:
      "Music in every room, a true theater, and televisions that vanish until you want them.",
    metaTitle:
      "Audio Video and Home Theater in Orlando, FL | Central Florida Automation Services",
    metaDescription:
      "Whole-house audio, dedicated home theaters, and concealed television for Orlando estates. Sonos, control, and reference cinema, engineered and calibrated since 1968.",
    heroImage: IMG.av,
    heroAlt:
      "Dedicated home theater with tiered seating in an Orlando estate",
    overview: [
      "Sound and picture are where a great house earns its keep on a Friday night. We build two things: music that follows you through the house from the kitchen to the pool to the primary suite, and dedicated rooms where a film looks and sounds the way it was meant to. Both should be effortless to use, which is harder to deliver than it sounds.",
      "The hard part of audio and video is not the equipment, it is the engineering and the restraint. Speakers disappear into the ceiling and the architecture. Televisions hide behind art or drop out of sight when the room is being used for something else. The rack lives in a closet, properly cooled and labeled, and the only thing you ever touch is a single remote or a button that does exactly what you expect.",
    ],
    approach:
      "We treat the room as part of the system. A theater is acoustically designed, not just filled with speakers, and a calibrated picture is set to a reference standard so it looks correct rather than merely bright. Throughout the house we lay out audio so coverage is even and the volume is right in every zone. We would rather specify fewer, better components and set them up properly than sell you a long list of gear that never gets dialed in.",
    brands: ["Sonos", "Sony", "Sonance", "Control4", "Lutron"],
    scope: [
      { label: "Whole-house audio", detail: "Even, zoned music in every room and outdoor space" },
      { label: "Dedicated theater", detail: "Acoustically treated rooms with reference projection or direct-view" },
      { label: "Concealed television", detail: "TVs hidden behind art, in cabinetry, or on lifts" },
      { label: "Outdoor entertainment", detail: "Landscape speakers and weatherproof displays for the pool and lanai" },
      { label: "Calibration", detail: "Picture and sound set to reference, not left at factory defaults" },
    ],
    gallery: [
      { src: IMG.av, alt: "Tiered home theater seating facing a large screen in an Orlando home" },
      { src: IMG.smartHome, alt: "Living room with concealed speakers and a hidden television" },
      { src: IMG.lighting, alt: "Theater lighting tied into the audio video system" },
    ],
    faqs: [
      {
        q: "Can the speakers really disappear into the ceiling?",
        a: "Yes. We use in-ceiling and in-wall speakers that can be painted to match and, where you want true invisibility, speakers that mount behind the drywall so there is nothing to see at all. Outdoors we hide sound in the landscape. The goal is that you hear the music and never notice where it comes from.",
      },
      {
        q: "What is the difference between a media room and a real theater?",
        a: "A media room is a living space that also does movies well. A dedicated theater is a room designed around the screen, with controlled light, acoustic treatment, and tiered seating, so the experience is closer to a private cinema. We build both, and we will tell you which one your house and your budget actually call for.",
      },
      {
        q: "Can I run the whole thing from one remote?",
        a: "Yes, and you should. We program a single handheld remote or touch panel so that one button lowers the lights, closes the shades, turns on the projector, and selects the source. Your guests should be able to watch a film without a lesson.",
      },
      {
        q: "Will the system handle the Florida heat for outdoor TVs?",
        a: "Outdoor displays and speakers have to be rated for it, and most consumer gear is not. We specify weatherproof, high-brightness displays and landscape speakers built for the Central Florida climate, so the picture is visible in daylight and the equipment survives the summer.",
      },
      {
        q: "Do you calibrate, or just install?",
        a: "We calibrate. A projector or television out of the box is set to look impressive on a showroom floor, not correct in your room. We set the picture to a reference standard and tune the audio to the space, which is the step most installers skip and the one you would notice most.",
      },
    ],
    related: ["smart-home-automation", "lighting-control", "networking"],
  },

  {
    slug: "lighting-control",
    name: "Lighting Control",
    title: "Lighting Control",
    icon: "lighting",
    summary:
      "Layered, tunable light that flatters the architecture and sets itself through the day.",
    metaTitle:
      "Lighting Control in Orlando, FL | Central Florida Automation Services",
    metaDescription:
      "Lutron lighting control and tunable architectural lighting for Orlando custom homes and estates. Keypads that replace banks of switches, scenes that set the house through the day. Since 1968.",
    heroImage: IMG.lighting,
    heroAlt:
      "Warm layered architectural lighting in an Orlando home at dusk",
    overview: [
      "Lighting is the single change that does the most for how a house feels, and it is the one most often left to chance. A wall of five switches by the door tells you nobody designed the light in that room. Proper lighting control replaces those switches with a single engraved keypad and lets the architecture, not the fixtures, be what you notice.",
      "We design light in layers: the general light, the accent on the art and the millwork, the task light where you actually work, and the low path of light that gets you through the house at night. Each layer is set to the right level for the time of day and recalled with one button. The result is a house that looks considered at seven in the morning and again at nine at night, without anyone hunting for the right dimmer.",
    ],
    approach:
      "We are a Lutron house because over fifty years of installs it has proven to be the system that still works flawlessly a decade later. We engrave the keypads to the room so the buttons say what they do, we set the scenes with you on site rather than guessing, and we tune the color temperature of the light to warm as the evening comes on. Good lighting control is invisible engineering in service of something you feel rather than see.",
    brands: ["Lutron", "Ketra", "Control4", "Savant", "Sonos"],
    scope: [
      { label: "Keypad control", detail: "Engraved Lutron keypads replacing banks of switches" },
      { label: "Layered scenes", detail: "Entertain, dine, relax, and goodnight set per room" },
      { label: "Tunable white", detail: "Light that warms through the evening to match the hour" },
      { label: "Architectural integration", detail: "Coves, accents, and millwork lighting designed with your architect" },
      { label: "Daylight and away", detail: "Schedules and astronomic timing so the house lights itself" },
    ],
    gallery: [
      { src: IMG.lighting, alt: "Layered lighting accenting millwork in an Orlando estate" },
      { src: IMG.smartHome, alt: "Keypad-controlled living space with concealed sources" },
      { src: IMG.shades, alt: "Lighting and shades coordinated on one keypad" },
    ],
    faqs: [
      {
        q: "What is wrong with just using smart bulbs?",
        a: "Smart bulbs work until someone flips the wall switch off, and then they are dead until the switch goes back on. A proper lighting control system keeps power to the fixtures and controls them at the load, so the light is always there when you ask for it. For a whole house, controlled at the panel and the keypad is the only approach that holds up.",
      },
      {
        q: "Can we add lighting control without rewiring the whole house?",
        a: "Often, yes. Lutron makes wireless systems that retrofit into existing homes without opening walls, and they are reliable enough that we install them in finished estates regularly. A new build lets us do more, but an existing home is far from a lost cause.",
      },
      {
        q: "What does tunable lighting actually do?",
        a: "It changes the color of the white light through the day, cooler and brighter in the morning, warmer and softer at night, the way good daylight does. It is subtle, and it is one of those things you do not consciously notice until you are in a house that does not have it.",
      },
      {
        q: "Will the keypads look like a spaceship on my wall?",
        a: "No. We use a small number of engraved buttons per keypad, labeled in plain words, in finishes chosen to match your trim and hardware. The aim is fewer controls than the pile of switches they replace, not more.",
      },
      {
        q: "Can the lighting work with the shades and the rest of the house?",
        a: "Yes. Lighting and shading are designed together so that one scene sets both, and both tie into the larger automation system. Pressing relax in the evening can bring the lights down and the shades to the right level at the same time.",
      },
    ],
    related: ["motorized-shades", "smart-home-automation", "audio-video"],
  },

  {
    slug: "motorized-shades",
    name: "Motorized Shades",
    title: "Motorized Shades and Window Treatments",
    icon: "shades",
    summary:
      "Quiet shades that manage the Florida sun, protect the interior, and move on their own.",
    metaTitle:
      "Motorized Shades in Orlando, FL | Central Florida Automation Services",
    metaDescription:
      "Lutron motorized shades and window treatments for Orlando estates. Quiet, battery or wired, managing heat and glare from the Florida sun and protecting interiors. Designed and installed since 1968.",
    heroImage: IMG.shades,
    heroAlt:
      "Floor-to-ceiling windows with motorized shades in an Orlando home",
    overview: [
      "In Central Florida the sun is not a minor consideration, it is a design problem. It fades the floors, heats the rooms the afternoon sun reaches, and washes out a television at the worst possible moment. Motorized shades solve all of that quietly, and on the big walls of glass that estate homes are built around, they are the only practical way to manage it.",
      "We hang shades that move almost silently and align perfectly across a run of windows, because a row of shades that stop at slightly different heights ruins the look of the wall. They can run on schedules, follow the path of the sun, or drop automatically when a room gets too hot or too bright. On the lanai and around the pool, exterior screens hold back the heat and the insects without closing the house off from the view.",
    ],
    approach:
      "We specify shades as part of the lighting and architecture, not as an afterthought hung once the house is done. The fabric is chosen for how much sun it lets through and how it reads from inside and from the street. We align every shade in a run, hide the rollers in pockets where the millwork allows, and set them to manage the sun automatically so you are not the one chasing glare around the house all afternoon.",
    brands: ["Lutron", "Control4", "Savant", "Somfy", "Sonos"],
    scope: [
      { label: "Interior shades", detail: "Roller, roman, and drapery tracks, aligned across every run" },
      { label: "Sun management", detail: "Automatic positioning that follows the sun through the day" },
      { label: "Exterior screens", detail: "Lanai and pool screens for heat, glare, and insects" },
      { label: "Fabric selection", detail: "Openness and color chosen for view, privacy, and the street" },
      { label: "Quiet operation", detail: "Near-silent motors, wired or battery, hidden in pockets where possible" },
    ],
    gallery: [
      { src: IMG.shades, alt: "Aligned motorized roller shades across a wall of glass" },
      { src: IMG.lighting, alt: "Shades and lighting coordinated for evening in an Orlando home" },
      { src: IMG.smartHome, alt: "Living space with motorized shades managing afternoon sun" },
    ],
    faqs: [
      {
        q: "Are motorized shades loud?",
        a: "The ones we install are not. We use quiet motors and tune them so a room full of shades moving together is a soft sound you stop noticing. The cheap motorized shades sold online are loud, and that is one of the reasons we do not sell them.",
      },
      {
        q: "Do they have to be wired, or can they run on battery?",
        a: "Both work. In a new build we prefer to run power to the shade pockets for shades that never need charging. In a finished home, battery shades have improved to the point that they last a year or more between charges and let us avoid opening walls. We will recommend the right one for your situation.",
      },
      {
        q: "Will the shades actually keep the house cooler?",
        a: "Yes, measurably, on the walls of glass that take the Florida afternoon sun. Dropping the shades on the west side before the heat builds keeps those rooms from becoming uncomfortable and takes load off the air conditioning. Letting them manage the sun automatically is the whole point.",
      },
      {
        q: "Can I still see out, or do they black out the room?",
        a: "That is a fabric choice. Sheer and solar fabrics cut the heat and glare while keeping your view and your daylight. Where you want true darkness, in a bedroom or a theater, we use blackout fabric. Many rooms get two shades on the same window so you can have either.",
      },
      {
        q: "Do the shades work with the lighting and automation?",
        a: "Yes. Shades, lighting, and the rest of the house share one system, so an evening scene can bring the shades down with the lights, and a hot, bright afternoon can lower the west-facing shades on its own. That coordination is most of the value.",
      },
    ],
    related: ["lighting-control", "smart-home-automation", "audio-video"],
  },

  {
    slug: "networking",
    name: "WiFi and Networking",
    title: "WiFi and Networking",
    icon: "wifi",
    summary:
      "The wired and wireless backbone that everything else in the house depends on.",
    metaTitle:
      "WiFi and Home Networking in Orlando, FL | Central Florida Automation Services",
    metaDescription:
      "Enterprise-grade home networking and WiFi for large Orlando estates. Wired backbone, full-property coverage, and the reliable foundation every smart home depends on. Ubiquiti and commercial-grade gear since 1968.",
    heroImage: IMG.networking,
    heroAlt:
      "Organized network rack serving a large Orlando estate",
    overview: [
      "Every other system in a modern house, the cameras, the music, the shades, the thermostats, the streaming, all ride on the network. When the network is weak, everything feels unreliable, and the homeowner blames the automation when the real problem is the wireless router from the cable company sitting in a closet trying to cover ten thousand square feet. It cannot, and it never could.",
      "We build the network the way a small business builds one, with a wired backbone and professional access points placed so coverage is strong in every room, on the lanai, at the dock, and out to the gate. The equipment lives in a proper rack, cooled and labeled. Guests get their own network that never touches yours, the cameras and automation get a lane of their own, and the whole thing is monitored so we often fix a problem before you notice it.",
    ],
    approach:
      "We design the network first and treat it as the foundation, because no amount of good automation survives a bad network. We run wire to everything that can take wire and reserve wireless for the things that move. We segment the network so a guest's laptop cannot reach your cameras, secure it properly, and document every port. When we are done you have a system that holds up to a full house of people streaming at once, which is the real test.",
    brands: ["Ubiquiti", "Araknis", "Control4", "Pakedge", "Alarm.com"],
    scope: [
      { label: "Wired backbone", detail: "Cat6 or fiber to every fixed device, the foundation of the system" },
      { label: "Property-wide WiFi", detail: "Access points placed for full coverage indoors and out" },
      { label: "Network segmentation", detail: "Separate, protected lanes for guests, cameras, and automation" },
      { label: "Equipment rack", detail: "Cooled, labeled, and organized for service" },
      { label: "Remote monitoring", detail: "Health watched continuously so issues are caught early" },
    ],
    gallery: [
      { src: IMG.networking, alt: "Labeled and organized network rack in an Orlando estate" },
      { src: IMG.commercial, alt: "Access point providing coverage in a large residence" },
      { src: IMG.security, alt: "Network gear supporting the home security system" },
    ],
    faqs: [
      {
        q: "My internet is fast, so why is the WiFi still bad in half the house?",
        a: "Because the speed coming into the house and the coverage inside it are two different things. A single router cannot cover a large home, no matter how fast the connection is. The fix is several professional access points wired back to a central switch, placed so every part of the house and yard has a strong signal.",
      },
      {
        q: "Do I really need wired connections, or is WiFi enough now?",
        a: "Anything that does not move should be wired: the televisions, the cameras, the automation, the office. Wire is faster, it does not drop, and it frees up the wireless for phones and tablets. The best wireless network in the world still benefits from a strong wired backbone behind it.",
      },
      {
        q: "Can you give guests WiFi without giving them access to everything else?",
        a: "Yes, and we always do. Guests get a separate network with its own password that cannot see your computers, cameras, or automation. The cameras and smart-home gear get their own protected lane as well. This separation is standard on every network we build.",
      },
      {
        q: "We have spotty coverage out by the pool and the dock. Can that be fixed?",
        a: "Yes. We extend coverage outdoors with weatherproof access points so the lanai, the pool, the dock, and the guest house all have a real signal. On lakefront properties in Windermere and Isleworth this is one of the most common things we are asked to solve.",
      },
      {
        q: "What happens when the network has a problem?",
        a: "We monitor the network remotely, so in many cases we see and correct a problem before you have noticed it. When a site visit is needed, the same company that designed and labeled the system is the one that shows up, which makes the fix fast.",
      },
    ],
    related: ["smart-home-automation", "home-security", "audio-video"],
  },
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function serviceParams(): { service: string }[] {
  return SERVICES.map((s) => ({ service: s.slug }));
}
