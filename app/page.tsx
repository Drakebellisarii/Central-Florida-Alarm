import { PageLoader } from "@/components/PageLoader";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Hero } from "@/components/home/Hero";
import { AboutSection } from "@/components/home/AboutSection";
import { IntegrateCreed } from "@/components/home/IntegrateCreed";
import { TestimonialSpotlight } from "@/components/home/TestimonialSpotlight";
import { SmartSecurityShowcase } from "@/components/home/SmartSecurityShowcase";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { ServiceAreasSection } from "@/components/home/ServiceAreasSection";
// import { FloatingLogos } from "@/components/home/FloatingLogos";
import { JsonLd } from "@/components/JsonLd";
import { localBusinessLd } from "@/lib/seo";

export default function HomePage() {
  return (
    <>
      <JsonLd data={localBusinessLd()} />
      {/* Smooth-scroll trial, homepage only — remove this line and the
          import above to take it back out. */}
      <SmoothScroll />
      <PageLoader />

      {/*
        Hero plays once and rests on its final frame, then hands off to the
        showcase with a plain, ordinary scroll — no pinning, no panel
        sliding over anything. The hero's own bottom-edge gradient (see
        Hero.tsx) fades the footage into the showcase's warm off-white, so
        the cut reads as a continuation instead of a scroll-jacked reveal.
      */}
      <Hero />
      <SmartSecurityShowcase />

     <TestimonialSpotlight />
      <IntegrateCreed />
       <AboutSection />
      <TestimonialsSection />
      <ServiceAreasSection />

      {/* Sticky partner-logo marquee — taken down for now */}
      {/* <FloatingLogos /> */}
    </>
  );
}
