import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

type Variant = "primary" | "ghost" | "ink";

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  /** show the trailing arrow */
  arrow?: boolean;
  className?: string;
  /** for tel:/mailto:/external links render a plain anchor */
  plain?: boolean;
  /** smaller padding/type on phones; standard size from sm: up */
  compactOnMobile?: boolean;
  ariaLabel?: string;
};

const base =
  "group inline-flex items-center justify-center font-sans uppercase tracking-wide2 transition-colors duration-500 ease-expo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze focus-visible:ring-offset-2 focus-visible:ring-offset-ink active:translate-y-px";

const sizeDefault = "gap-3 px-7 py-4 text-[0.75rem]";
// py-3.5 keeps the tap target at ~44px even at the smaller type size.
const sizeCompactOnMobile =
  "gap-2.5 px-5 py-3.5 text-[0.6875rem] sm:gap-3 sm:px-7 sm:py-4 sm:text-[0.75rem]";

const variants: Record<Variant, string> = {
  // bone fill, ink text — for use on dark surfaces
  primary:
    "bg-bone text-ink hover:bg-bronze hover:text-white",
  // hairline ghost — for use on dark surfaces
  ghost:
    "border border-bone/25 text-bone hover:border-bronze hover:text-white",
  // ink fill, bone text — for use on light surfaces
  ink: "bg-ink text-bone hover:bg-navy-deep focus-visible:ring-offset-paper",
};

export function CTAButton({
  href,
  children,
  variant = "primary",
  arrow = true,
  className = "",
  plain = false,
  compactOnMobile = false,
  ariaLabel,
}: Props) {
  const classes = `${base} ${
    compactOnMobile ? sizeCompactOnMobile : sizeDefault
  } ${variants[variant]} ${className}`;
  const inner = (
    <>
      <span>{children}</span>
      {arrow && (
        <ArrowUpRight
          aria-hidden="true"
          strokeWidth={1.25}
          className="h-4 w-4 transition-transform duration-500 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </>
  );

  if (plain) {
    return (
      <a href={href} aria-label={ariaLabel} className={classes}>
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} aria-label={ariaLabel} className={classes}>
      {inner}
    </Link>
  );
}
