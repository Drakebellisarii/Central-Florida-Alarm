import { getService } from "@/lib/services";
import { ServiceCard } from "./ServiceCard";
import { Reveal } from "./Reveal";

export function RelatedServices({ slugs }: { slugs: string[] }) {
  const services = slugs
    .map((slug) => getService(slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  if (services.length === 0) return null;

  return (
    <section className="border-t border-bone/10 bg-ink">
      <div className="mx-auto max-w-[1500px] px-5 py-24 sm:px-8 md:px-11 md:py-28">
        <Reveal>
          <h2 className="font-display text-[clamp(1.9rem,3.5vw,2.8rem)] font-light leading-tight tracking-tight text-bone">
            Often part of the same system
          </h2>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.slug} index={i}>
              <ServiceCard
                href={`/${s.slug}`}
                name={s.name}
                summary={s.summary}
                icon={s.icon}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
