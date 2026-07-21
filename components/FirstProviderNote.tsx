/**
 * Hero credential note — "CFAS was Florida's first Alarm.com provider" —
 * sized between body copy and the h1 so it reads as a standing claim, not
 * a label.
 */
export function FirstProviderNote({ className = "" }: { className?: string }) {
  return (
    <p className={`font-display leading-snug ${className}`}>
      <span className="mr-3 font-display text-[1.0625rem] font-semibold not-italic uppercase tracking-wide2 text-white/90">
        Interesting Fact:
      </span>
      <span className="text-[0.9375rem] font-light italic text-white/60">
        CFAS was Florida&apos;s first Alarm.com provider
      </span>
    </p>
  );
}
