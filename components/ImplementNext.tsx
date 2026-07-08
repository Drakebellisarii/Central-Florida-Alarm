/**
 * Intentional placeholder for pages whose content is still being built.
 * Themed to match the site (brand navy, Fraunces display) so an unfinished
 * page still reads as deliberate rather than broken.
 */
export function ImplementNext({ title }: { title: string }) {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-navy-deep px-6 py-32 text-center short:py-16">
      <p className="font-sans text-[0.6875rem] uppercase tracking-eyebrow text-bone/50 sm:text-[0.75rem]">
        {title}
      </p>
      <h1 className="mt-6 font-hero text-[clamp(2.4rem,9vw,5rem)] font-light leading-[0.95] tracking-tight text-white">
        Implement Next
      </h1>
      <div className="mt-8 h-px w-16 bg-white/25" />
      <p className="mt-8 max-w-sm font-sans text-[0.875rem] leading-relaxed text-bone/45 sm:text-[0.9375rem]">
        This page is still coming together. Check back soon.
      </p>
    </section>
  );
}
