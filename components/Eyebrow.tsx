import type { ReactNode } from "react";

/**
 * Section tag — the quiet uppercase letter-spaced label, pure typography.
 * No line, no chip, no decoration: the tracking does the work.
 */
export function Eyebrow({
  children,
  className = "",
  dark = false,
}: {
  children: ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <span
      className={`inline-block font-sans text-[0.6875rem] uppercase tracking-eyebrow ${
        dark ? "text-white/50" : "text-navy/70"
      } ${className}`}
    >
      {children}
    </span>
  );
}
