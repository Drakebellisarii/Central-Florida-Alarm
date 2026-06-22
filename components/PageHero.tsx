import Image from "next/image";
import { NavSentinel } from "./NavSentinel";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";

/**
 * Editorial header used at the top of inner pages. The navbar is transparent
 * over it (NavSentinel), and it carries the page's H1 and crumbs.
 *
 * `light` swaps the legacy warm-ink palette for the brand's blue-and-white
 * band (deep navy with a blue-tinted image), matching the landing and
 * smart-security pages. Default stays warm ink for the service-detail pages.
 */
export function PageHero({
  title,
  lead,
  image,
  imageAlt = "",
  crumbs,
  light = false,
}: {
  title: string;
  lead?: string;
  image?: string;
  imageAlt?: string;
  crumbs: Crumb[];
  light?: boolean;
}) {
  return (
    <section
      className={`relative isolate overflow-hidden ${
        light ? "bg-navy-deep" : "bg-ink"
      }`}
    >
      <NavSentinel />

      {image && (
        <>
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            className={`object-cover object-center ${
              light ? "opacity-35" : "opacity-40"
            }`}
          />
          <div
            aria-hidden="true"
            className={`absolute inset-0 ${
              light ? "bg-navy-deep/70" : "bg-ink/70"
            }`}
          />
          <div
            aria-hidden="true"
            className={`absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t ${
              light ? "from-navy-deep to-transparent" : "from-ink to-transparent"
            }`}
          />
        </>
      )}

      <div className="relative mx-auto max-w-[1500px] px-5 pb-16 pt-36 sm:px-8 md:px-11 md:pb-20 md:pt-44">
        <Breadcrumbs items={crumbs} tone={light ? "onDark" : "warm"} />
        <h1
          className={`mt-10 max-w-4xl font-display text-[clamp(2.1rem,7vw,5rem)] font-light leading-[1.05] tracking-tight ${
            light ? "text-white" : "text-bone"
          }`}
        >
          {title}
        </h1>
        {lead && (
          <p
            className={`mt-7 max-w-2xl font-sans text-[17px] leading-relaxed ${
              light ? "text-white/70" : "text-bone-dim"
            }`}
          >
            {lead}
          </p>
        )}
      </div>
    </section>
  );
}
