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

      {/* Outer wrapper sits at the true end of the hero runway (300/400dvh).
          The marker is pulled 100dvh above it via absolute positioning so it
          fires the navbar at the right time without displacing About in flow. */}
      <div className="relative z-20">
        <div id="nav-solid-marker" aria-hidden className="absolute -top-[100dvh]" />
        <AboutSection />
      </div>

      {/* Rest of the site — normal scroll from here */}
      <IntegrateCreed />
      <ServicesSection />
      <TestimonialsSection />
      <ServiceAreasSection />

      {/* Brand strip commented out — replacing with a different design later */}
      {/* <FloatingLogos /> */}
    </>
  );
}
