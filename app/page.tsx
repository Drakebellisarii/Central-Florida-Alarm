import { Hero } from "@/components/home/Hero";
import { AboutSection } from "@/components/home/AboutSection";
import { IntegrateCreed } from "@/components/home/IntegrateCreed";
import { ServicesSection } from "@/components/home/ServicesSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { ServiceAreasSection } from "@/components/home/ServiceAreasSection";
import { FloatingLogos } from "@/components/home/FloatingLogos";
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
      <div
        id="nav-solid-marker"
        className="relative z-20 -mt-[100dvh]"
      >
        <AboutSection />
      </div>

      {/* Rest of the site — normal scroll from here */}
      <IntegrateCreed />
      <ServicesSection />
      <TestimonialsSection />
      <ServiceAreasSection />

      {/* All partner logos, floating in a glass dock at the foot of the
          viewport. It reveals only once the hero has been scrolled through
          and tucks away again before the footer. */}
      <FloatingLogos />
    </>
  );
}
