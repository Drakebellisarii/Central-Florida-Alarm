import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata, localBusinessLd, breadcrumbLd } from "@/lib/seo";
import { NavSentinel } from "@/components/NavSentinel";
import { JsonLd } from "@/components/JsonLd";
import { FaqCategory } from "@/components/FaqCategory";
import type { FAQ } from "@/lib/services";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "FAQ", path: "/faq" },
];

export const metadata: Metadata = buildMetadata({
  title: "FAQ | Central Florida Automation Services",
  description:
    "Answers about smart home security, luxury home automation, and business security systems from Central Florida Automation Services and Atlantic Companies.",
  path: "/faq",
});

type Category = {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  faqs: FAQ[];
};

const CATEGORIES: Category[] = [
  {
    id: "smart-home",
    index: "01 / 03",
    eyebrow: "FAQ",
    title: "Smart Home & Security",
    faqs: [
      {
        q: "What is Alarm.com, and how does it make my home smarter and safer?",
        a: "It's an award-winning platform that brings security, video, smart locks, lighting, thermostats, garage doors, and mobile control into one simple app.",
      },
      {
        q: "How much does it cost in Central Florida?",
        a: "Pricing depends on gear and features, but we offer competitive system pricing with affordable monthly monitoring plans with NO LONG-TERM  MONITORING CONTRACTS.",
      },
      {
        q: "Can I control it from my phone?",
        a: "Yes, arm or disarm, lock doors, view cameras, get instant notifications, and manage your smart home from almost anywhere.",
      },
      {
        q: "Will it work if my internet goes down?",
        a: "Yes. Alarm signals use a secure cellular connection to reach the monitoring center.",
      },
      {
        q: "What can I integrate?",
        a: "Smart locks, lighting, thermostats, garage doors, video doorbells, indoor or outdoor cameras, water sensors, and more.",
      },
      {
        q: "Why professional monitoring over self-monitoring?",
        a: "You get LOCAL 24/7 response from trained professionals who can dispatch help even if you can't respond.",
      },
      {
        q: "Can I get alerts when my kids get home?",
        a: "Yes, get a notification when a specific user disarms the system or unlocks a door.",
      },
      {
        q: "Do cameras record all the time?",
        a: "You can choose continuous recording where supported, or use smart analytics to capture people, vehicles, or important events, so you find key moments faster.",
      },
      {
        q: "Can I automate lights, locks, and thermostats?",
        a: "Absolutely. Create scenes that lock doors, adjust lighting, close the garage, and set the temperature on a schedule or when you arm or disarm.",
      },
      {
        q: "Is it good for second homes?",
        a: "Yes, it's ideal for vacation properties. Check in, get alerts, view video, and control the home from anywhere.",
      },
      {
        q: "What happens in a power outage?",
        a: "The system has a backup battery and cellular communication to keep you protected.",
      },
      {
        q: "Can I visit the local monitoring center?",
        a: "Absolutely. We can arrange a facility tour. Just let our consultant know when you would like to do that.",
      },
      {
        q: "Do you offer free consultations?",
        a: "Yes, we provide a professional in-home consultation to recommend the right solution.",
      },
      {
        q: "Why go local versus national?",
        a: "We are a local family-run business. You get personalized service, faster response, and support from a team that knows Central Florida.",
      },
      {
        q: "Why CFAS?",
        a: "We were the first Alarm.com provider in Florida. We fully understand the product, coupled with expert design, competitive monitoring, and dependable local service.",
      },
    ],
  },
  {
    id: "luxury",
    index: "02 / 03",
    eyebrow: "FAQ",
    title: "Smart Luxury",
    faqs: [
      {
        q: "What is a luxury smart home system and how is it different from basic smart devices?",
        a: "A luxury smart home system integrates lighting, shades, climate, security, audio, video, and networking into one seamless platform. Unlike standalone gadgets, it's custom designed for reliability and simplicity.",
      },
      {
        q: "What sets Crestron apart from other control systems?",
        a: "The number one reason would have to be reliablity, then flexibility. Large luxury homes, when incorprating control systems, need the kind of scale and customization Crestron is known for. One main point would be that the Crestron processor or 'brain' runs locally. That local piece is important to create low latency, or fast speed between integrated components, and less reliance on cloud services.",
      },
      {
        q: "How does Crestron or Lutron lighting control improve comfort, energy savings, and design?",
        a: "Crestron orLutron lighting creates personalized scenes, saves energy, extends bulb life, and enhances design with elegant keypads. As a platinum Dealer, Central Florida Automation Services has the experience to design, install and service all custom projects.",
      },
      {
        q: "What are the benefits of Crestron or Lutron motorized shades for privacy and energy efficiency?",
        a: "Crestron or Lutron motorized shades add privacy, reduce glare, protect furnishings from UV, and improve efficiency by adjusting automatically. Add an additonal design touch by incorporating Hartmann & Forbes fabric to the quality Lutron rollers.",
      },
      {
        q: "Can I control my lighting, shades, security, and entertainment from one app?",
        a: "Yes, we unify all systems into a single intuitive app or interface, including voice control if desired.",
      },
      {
        q: "Why is a robust, professionally designed network so important in a smart home?",
        a: "A strong enterprise-grade network is the foundation, ensuring every device performs reliably.",
      },
      {
        q: "What makes a professionally installed home automation system better than DIY products?",
        a: "Professionally installed systems offer superior reliability, security, and long-term support.",
      },
      {
        q: "Can outdoor living spaces be automated too?",
        a: "Absolutely, from outdoor audio and TVs to lighting, Wi-Fi, and MagnaTrack screens, we can fully automate outdoor living.",
      },
      {
        q: "What is MagnaTrack and why is it popular?",
        a: "MagnaTrack motorized screens provide shade, insect protection, privacy, and weather resistance while maintaining your view. Our screens provide patented magnetic technology assuring minimal maintenance.",
      },
      {
        q: "Can you design a dedicated home theater or media room?",
        a: "Yes, we design custom theaters and media rooms with immersive sound, acoustic treatments, luxury seating, and simple control.",
      },
      {
        q: "What security features can be integrated into a smart home?",
        a: "Alarms, cameras, smart locks, video doorbells, environmental sensors, and instant mobile alerts.",
      },
      {
        q: "Can my smart home be controlled remotely when I travel?",
        a: "Yes, secure remote access lets you monitor and control your home from anywhere.",
      },
      {
        q: "Will a smart home increase my property value?",
        a: "Professionally integrated technology is a sought-after feature in luxury real estate and may enhance market appeal.",
      },
      {
        q: "Can you work with my architect, builder, or interior designer?",
        a: "Absolutely, we collaborate from planning through final walk through.",
      },
      {
        q: "Do you provide ongoing support after installation?",
        a: "Yes, we provide ongoing local support, updates, and preventive maintenance.",
      },
      {
        q: "Why choose Central Florida Automation Services for luxury smart home integration in Central Florida?",
        a: "Since 1968, Central Florida Automation Services has delivered bespoke technology solutions with expert design, installation, and white glove service across Central Florida.",
      },
    ],
  },
  {
    id: "business",
    index: "03 / 03",
    eyebrow: "FAQ",
    title: "Business Security",
    faqs: [
      {
        q: "What types of business security systems do you install?",
        a: "We design and install tailored solutions for offices, retail, warehouses, and multi-site operations.",
      },
      {
        q: "Can alarms, cameras, and access control be integrated?",
        a: "Yes, into a single easy-to-manage alarm platform.",
      },
      {
        q: "Do you offer 24/7 monitoring?",
        a: "Yes. Our communication center, along with two redundant backup centers, is at the forefront with state of the art monitoring technology. Our 24/7 monitoring centers have some of the most stringent guidelines in the industry pertaining to operator certification.",
      },
      {
        q: "What happens during power or internet outages?",
        a: "Battery and cellular backups help keep critical protection online.",
      },
      {
        q: "Can I manage multiple locations?",
        a: "Yes, you can view and control all sites from the Alarm.com dashboard.",
      },
      {
        q: "How do I manage employee access?",
        a: "Quickly add, change, or remove credentials; set permissions by role or schedule.",
      },
      {
        q: "Do you offer video analytics?",
        a: "Yes, including person and vehicle detection, line-crossing alerts, and License Plate Reader options.",
      },
      {
        q: "What about ongoing service?",
        a: "We provide preventative maintenance as well as fast local support. Service to our customers is paramount.",
      },
      {
        q: "How long does installation take?",
        a: "Most projects are completed with minimal disruption; timing depends on scope.",
      },
      {
        q: "Are your technicians licensed and insured?",
        a: "Yes. They're trained, background checked, and focused on quality and service.",
      },
      {
        q: "Can the system scale with growth?",
        a: "Yes, add doors, cameras, and sites over time.",
      },
      {
        q: "Do you monitor system health?",
        a: "Remote diagnostics and proactive service alerts are available.",
      },
      {
        q: "How do you address cybersecurity?",
        a: "We follow best practices for secure credentials, encryption, and updates.",
      },
      {
        q: "Do you offer on-site assessments?",
        a: "Yes, we provide site surveys to identify risks and design solutions. Give us a call or fill out the contact form and we will be in touch soon.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <>
      <JsonLd data={localBusinessLd()} />
      <JsonLd data={breadcrumbLd(crumbs)} />

      <section className="relative bg-white">
        <NavSentinel />

        {/* Blue hero / heading band — the title, nothing else */}
        <div className="bg-navy-deep">
          <div className="mx-auto max-w-[93.75rem] px-5 pb-16 pt-36 sm:px-8 md:px-11 md:pb-20 md:pt-44 short:pb-10 short:pt-24">
            <h1 className="whitespace-nowrap font-hero text-[clamp(1.5rem,4.8vw,3.25rem)] font-light leading-[1.0] tracking-tight text-white">
              Frequently Asked Questions
            </h1>
          </div>
        </div>

        {/* Chapters — each its own collapsible section, closed by default,
            so all three are visible together the moment the page loads. */}
        <div className="mx-auto max-w-[56rem] px-5 pt-20 sm:px-8 md:px-11 md:pt-28">
          {CATEGORIES.map((cat, i) => (
            <div key={cat.id} className={i > 0 ? "border-t border-navy/10" : ""}>
              <FaqCategory {...cat} />
            </div>
          ))}

          <p className="border-t border-navy/10 py-16 font-sans text-[0.9375rem] leading-relaxed text-slate-500 md:py-20">
            Still have a question?{" "}
            <Link
              href="/contact"
              className="text-navy-logo underline underline-offset-4 transition-colors hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-logo/40"
            >
              Get in touch
            </Link>{" "}
            and we&rsquo;ll answer it directly.
          </p>
        </div>
      </section>
    </>
  );
}
