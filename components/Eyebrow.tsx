import type { ReactNode } from "react";

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
      className={`inline-flex items-center gap-3 font-sans text-[0.6875rem] uppercase tracking-eyebrow ${
        dark ? "text-white/50" : "text-navy/70"
      } ${className}`}
    >
      <span
        aria-hidden="true"
        className={`h-px w-7 ${dark ? "bg-white/25" : "bg-navy/30"}`}
      />
      {children}
    </span>
  );
}
