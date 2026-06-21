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

      {/* Zero-height marker — the navbar watches this to go solid.
          Stays 100dvh before the hero's end so the nav times correctly. */}
      <div id="nav-solid-marker" aria-hidden className="-mt-[100dvh]" />

      {/* About starts at the natural end of the hero's scroll runway.
          It only enters the viewport once the hero is completely done. */}
      <div className="relative z-20">
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
