import { NavSentinel } from "@/components/NavSentinel";
import { CTAButton } from "@/components/CTAButton";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center bg-ink">
      <NavSentinel />
      <div className="mx-auto w-full max-w-[93.75rem] px-5 py-32 sm:px-8 md:px-11">
        <h1 className="max-w-3xl font-hero text-[clamp(2.6rem,6vw,5rem)] font-light leading-[1.0] tracking-tight text-bone">
          This page is not part of the property.
        </h1>
        <p className="mt-7 max-w-xl font-sans text-[1.0625rem] leading-relaxed text-bone-dim">
          The page you were looking for has moved or never existed. Let us point you
          back to something solid.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <CTAButton href="/" variant="primary">
            Back to home
          </CTAButton>
          <CTAButton href="/contact" variant="ghost" arrow={false}>
            Contact us
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
