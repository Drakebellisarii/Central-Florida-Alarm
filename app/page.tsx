import { PageLoader } from "@/components/PageLoader";
import { Hero } from "@/components/home/Hero";
import { AboutSection } from "@/components/home/AboutSection";
import { IntegrateCreed } from "@/components/home/IntegrateCreed";
import { ServicesSection } from "@/components/home/ServicesSection";
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
      <PageLoader />

      {/*
        Hero + Showcase share a positioning context. The hero footage
        autoplays once and rests on the finished estate while the hero pins
        itself (sticky top-0); as you scroll, the opaque Showcase panel rises
        up and slides over the held final frame — this is the main
        objective of the site, so it earns the same real estate About used
        to occupy. The sticky scope ends with this wrapper, so the hero
        releases once the Showcase has scrolled past.
      */}
      <div className="relative">
        <Hero />

        {/* z-20 + opaque bg lets the Showcase cover the pinned hero; its top
            shadow reads as a panel sliding up over the scene. The nav marker
            sits at the top of this wrapper so the navbar turns solid the
            moment it reaches the top of the viewport. */}
        <div className="relative z-20">
          <div id="nav-solid-marker" aria-hidden className="absolute inset-x-0 top-0" />
          <SmartSecurityShowcase />
        </div>
      </div>

      {/* Rest of the site — normal scroll from here */}
      <AboutSection />
      <IntegrateCreed />
      <ServicesSection />
      <TestimonialsSection />
      <ServiceAreasSection />

      {/* Sticky partner-logo marquee — taken down for now */}
      {/* <FloatingLogos /> */}
    </>
  );
}
