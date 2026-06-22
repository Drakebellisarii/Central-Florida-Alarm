import { Hero } from "@/components/home/Hero";
import { AboutSection } from "@/components/home/AboutSection";
import { IntegrateCreed } from "@/components/home/IntegrateCreed";
import { ServicesSection } from "@/components/home/ServicesSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { ServiceAreasSection } from "@/components/home/ServiceAreasSection";
// import { FloatingLogos } from "@/components/home/FloatingLogos";
import { JsonLd } from "@/components/JsonLd";
import { localBusinessLd } from "@/lib/seo";

export default function HomePage() {
  return (
    <>
      <JsonLd data={localBusinessLd()} />

      {/*
        Hero owns its own tall scroll runway and pins itself — scrolling
        through it scrubs the Hero-Scroll footage frame by frame. Once the
        clip has played out, the About panel slides up over the pinned hero.
        The -mt pulls About into the bottom third of the hero's runway so it
        overlaps the held final frame; the navbar watches #nav-solid-marker
        and turns solid white the moment that edge reaches the bar.
      */}
      <Hero />

      {/* -mt-[100dvh] pulls About up into the final 100dvh of the hero runway —
          the stretch where the build is finished and the frame holds — so the
          panel slides up over the held final frame instead of starting after a
          blank gap. The nav marker sits at this wrapper's own top edge so the
          navbar turns solid as About reaches the top of the viewport. */}
      <div className="relative z-20 motion-safe:-mt-[100dvh]">
        <div id="nav-solid-marker" aria-hidden className="absolute inset-x-0 top-0" />
        <AboutSection />
      </div>

      {/* Rest of the site — normal scroll from here */}
      <IntegrateCreed />
      <ServicesSection />
      <TestimonialsSection />
      <ServiceAreasSection />

      {/* Sticky partner-logo marquee — taken down for now */}
      {/* <FloatingLogos /> */}
    </>
  );
}
