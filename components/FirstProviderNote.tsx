/**
 * Hero credential note — "CFAS was Central Florida's first Alarm.com
 * provider" — sized between body copy and the h1 so it reads as a standing
 * claim, not a label. A hairline beneath carries a slow travelling glint
 * (the site's "current" motif, see PageLoader); the sweep rests between
 * passes so it catches the eye without nagging it, and disables entirely
 * under prefers-reduced-motion.
 */
export function FirstProviderNote({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <p className="font-display text-[clamp(1.125rem,1.8vw,1.5rem)] font-light italic leading-snug text-white/90">
        <span className="mr-3 font-sans text-[0.6875rem] font-semibold not-italic uppercase tracking-wide2 text-white/50">
          FYI:
        </span>
        CFAS was Central Florida&apos;s first Alarm.com provider
      </p>
      <div className="relative mt-3 h-px w-28 overflow-hidden bg-white/15">
        <span
          aria-hidden
          className="fyi-current absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/80 to-transparent"
        />
      </div>
    </div>
  );
}
