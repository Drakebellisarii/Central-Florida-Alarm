import Link from "next/link";
import { Home } from "lucide-react";

export type Crumb = { name: string; path: string };

/**
 * Breadcrumb trail. `tone` adapts it to the surface it sits on:
 *  - "warm"    — the legacy ink/bronze palette (dark service-detail pages)
 *  - "onDark"  — cool white-on-navy, for the blue PageHero band
 *  - "onLight" — slate-on-white, for the light body pages
 */
const TONES = {
  warm: {
    list: "text-stone",
    current: "text-bone-dim",
    link: "transition-colors hover:text-bronze focus-visible:ring-bronze",
    sep: "text-bone/20",
  },
  onDark: {
    list: "text-white/45",
    current: "text-white/85",
    link: "transition-colors hover:text-white focus-visible:ring-white/40",
    sep: "text-white/25",
  },
  onLight: {
    list: "text-slate-500",
    current: "text-navy-deep",
    link: "transition-colors hover:text-navy-logo focus-visible:ring-navy-logo/40",
    sep: "text-slate-300",
  },
} as const;

export function Breadcrumbs({
  items,
  tone = "warm",
}: {
  items: Crumb[];
  tone?: keyof typeof TONES;
}) {
  const t = TONES[tone];
  return (
    <nav aria-label="Breadcrumb">
      <ol
        className={`flex flex-wrap items-center gap-x-2 gap-y-1 font-sans text-[0.75rem] tracking-wide ${t.list}`}
      >
        {items.map((c, i) => {
          const last = i === items.length - 1;
          // The trail always opens on Home — swap the label for a home glyph
          // so the crumb reads as a landmark instead of competing with the
          // page names that follow it.
          const isHome = i === 0 && c.path === "/";
          const label = isHome ? (
            <Home strokeWidth={1.5} className="h-3.5 w-3.5" aria-hidden="true" />
          ) : (
            c.name
          );
          return (
            <li key={c.path} className="flex items-center gap-2">
              {last ? (
                <span className={t.current} aria-current="page">
                  {isHome && <span className="sr-only">{c.name}</span>}
                  {label}
                </span>
              ) : (
                <Link
                  href={c.path}
                  aria-label={isHome ? c.name : undefined}
                  className={`${t.link} focus-visible:outline-none focus-visible:ring-1`}
                >
                  {label}
                </Link>
              )}
              {!last && <span className={t.sep}>/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
