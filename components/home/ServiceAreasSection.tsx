"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import {
  APIProvider,
  Map,
  Marker,
  useMap,
  useApiIsLoaded,
} from "@vis.gl/react-google-maps";
import { useReducedMotion } from "framer-motion";
import { gsap, prefersReducedMotion } from "@/lib/motion";
import { AREAS } from "@/lib/areas";

const COORDS: Record<string, { lat: number; lng: number }> = {
  orlando:         { lat: 28.5383, lng: -81.3792 },
  "winter-park":   { lat: 28.6,    lng: -81.3392 },
  "dr-phillips":   { lat: 28.4581, lng: -81.4739 },
  windermere:      { lat: 28.4933, lng: -81.5326 },
  "lake-nona":     { lat: 28.3772, lng: -81.2378 },
  "winter-garden": { lat: 28.5654, lng: -81.5862 },
  clermont:        { lat: 28.5494, lng: -81.7729 },
  "lake-mary":     { lat: 28.7589, lng: -81.3178 },
  oviedo:          { lat: 28.67,   lng: -81.2081 },
  kissimmee:       { lat: 28.292,  lng: -81.4076 },
  ocala:           { lat: 29.1872, lng: -82.1401 },
  "new-smyrna":    { lat: 29.0258, lng: -80.927  },
  "mount-dora":    { lat: 28.8028, lng: -81.6445 },
  sanford:         { lat: 28.8028, lng: -81.2731 },
  maitland:        { lat: 28.6611, lng: -81.3656 },
  deland:          { lat: 29.0283, lng: -81.3031 },
  "daytona-beach": { lat: 29.2108, lng: -81.0228 },
  "ormond-beach":  { lat: 29.2867, lng: -81.0556 },
  "bella-collina": { lat: 28.5747, lng: -81.6801 },
};

// Branded blue-and-white map: white land, soft navy-blue water, city labels in
// navy, and roads pared back to the major arteries/highways (local streets and
// business POIs are hidden so it reads clean).
const NAVY = "#0A1A52";
const MAP_STYLES: google.maps.MapTypeStyle[] = [
  // Base — white land, navy label text with a white halo for legibility
  { elementType: "geometry", stylers: [{ color: "#ffffff" }] },
  { elementType: "labels.text.fill", stylers: [{ color: NAVY }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#ffffff" }, { weight: 3 }] },

  // Clutter off — business POIs, transit, parcels, neighborhoods
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
  { featureType: "administrative.land_parcel", stylers: [{ visibility: "off" }] },
  { featureType: "administrative.neighborhood", stylers: [{ visibility: "off" }] },

  // Administrative borders — faint blue
  { featureType: "administrative", elementType: "geometry", stylers: [{ color: "#c3d0e8" }] },

  // City labels — kept, in navy
  { featureType: "administrative.locality", elementType: "labels", stylers: [{ visibility: "on" }] },
  { featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{ color: NAVY }] },

  // Roads — hide local streets, keep arterials faint and highways prominent
  { featureType: "road", elementType: "labels", stylers: [{ visibility: "off" }] },
  { featureType: "road.local", stylers: [{ visibility: "off" }] },
  { featureType: "road.arterial", elementType: "geometry", stylers: [{ color: "#e2e8f5" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#a9bce0" }] },
  { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#8ba3d4" }] },
  { featureType: "road.highway", elementType: "labels", stylers: [{ visibility: "on" }] },
  { featureType: "road.highway", elementType: "labels.text.fill", stylers: [{ color: "#3d4d80" }] },

  // Water — soft brand blue
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#c6d5ef" }] },
  { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#6b80ac" }] },

  // Land tint — a whisper of blue-grey so white pins/labels sit on it cleanly
  { featureType: "landscape.natural", elementType: "geometry", stylers: [{ color: "#f6f8fc" }] },
];

// Branded teardrop pin as an inline SVG — navy by default, larger and bronze
// when selected, each with a white outline and white center dot. Called only
// after the API has loaded (google.maps.Size/Point exist).
function pinIcon(selected: boolean): google.maps.Icon {
  const fill = selected ? "#B08C53" : NAVY;
  const w = selected ? 40 : 30;
  const h = selected ? 54 : 41;
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}' viewBox='0 0 28 38'>` +
    `<path d='M14 1C6.82 1 1 6.82 1 14c0 9.2 13 23 13 23s13-13.8 13-23C27 6.82 21.18 1 14 1z' ` +
    `fill='${fill}' stroke='#ffffff' stroke-width='2.2'/>` +
    `<circle cx='14' cy='14' r='4.8' fill='#ffffff'/></svg>`;
  return {
    url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg),
    scaledSize: new google.maps.Size(w, h),
    anchor: new google.maps.Point(w / 2, h),
  };
}

// Legacy markers need google.maps.Symbol/Icon, which only exists once the JS
// API has loaded — gate on that before touching the global.
function AreaMarkers({
  areas,
  selectedSlug,
  onSelect,
}: {
  areas: { slug: string; coords: { lat: number; lng: number } }[];
  selectedSlug: string;
  onSelect: (slug: string) => void;
}) {
  const loaded = useApiIsLoaded();
  if (!loaded) return null;
  return (
    <>
      {areas.map((area) => {
        const selected = area.slug === selectedSlug;
        return (
          <Marker
            key={area.slug}
            position={area.coords}
            onClick={() => onSelect(area.slug)}
            zIndex={selected ? 10 : 1}
            icon={pinIcon(selected)}
          />
        );
      })}
    </>
  );
}

const half = Math.ceil(AREAS.length / 2);
const COL1 = AREAS.slice(0, half);   // scrolls upward
const COL2 = AREAS.slice(half);      // scrolls downward

function MapController({ target }: { target: { lat: number; lng: number } | null }) {
  const map = useMap();
  useEffect(() => {
    if (!map || !target) return;
    map.panTo(target);
    map.setZoom(11);
  }, [map, target]);
  return null;
}

function AreaRow({
  area,
  selected,
  onClick,
}: {
  area: (typeof AREAS)[number];
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-2.5 border-b border-slate-100 px-5 py-[0.8125rem] text-left transition-colors duration-200 ${
        selected ? "text-navy-deep" : "text-slate-400 hover:text-navy"
      }`}
    >
      {selected ? (
        <MapPin strokeWidth={1.5} className="h-3 w-3 shrink-0 text-bronze" />
      ) : (
        <span className="h-3 w-3 shrink-0" />
      )}
      <span className={`font-sans text-[0.8125rem] leading-snug ${selected ? "font-medium text-navy-deep" : ""}`}>
        {area.name}
      </span>
    </button>
  );
}

export function ServiceAreasSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // The Google Maps JS API (plus its tiles) is far too heavy to load with the
  // homepage — hold it back until the visitor has scrolled within a viewport
  // of the section, then mount the map for real.
  const [mapReady, setMapReady] = useState(false);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setMapReady(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setMapReady(true);
          io.disconnect();
        }
      },
      { rootMargin: "100% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const areasWithCoords = AREAS.map((a) => ({
    ...a,
    coords: COORDS[a.slug] ?? null,
  })).filter((a): a is typeof a & { coords: { lat: number; lng: number } } => a.coords !== null);

  const [selectedSlug, setSelectedSlug] = useState(areasWithCoords[0]?.slug ?? "");
  const selected = areasWithCoords.find((a) => a.slug === selectedSlug) ?? areasWithCoords[0];

  // Duplicate items for seamless loop (skipped when reduced motion)
  const col1Items = reduce ? COL1 : [...COL1, ...COL1];
  const col2Items = reduce ? COL2 : [...COL2, ...COL2];

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-areas-header] > *",
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.1,
          scrollTrigger: { trigger: "[data-areas-header]", start: "top 80%" },
        }
      );
      gsap.fromTo(
        "[data-map-panel]",
        { opacity: 0, x: 24 },
        {
          opacity: 1, x: 0, duration: 1.1, ease: "power3.out",
          scrollTrigger: { trigger: "[data-map-panel]", start: "top 80%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    // overflow-x-clip: the map panel's intro starts at translateX(24px),
    // which would otherwise widen the page and cause horizontal scroll.
    <section ref={sectionRef} className="overflow-x-clip border-t border-slate-100 bg-white">
      <div className="mx-auto max-w-[87.5rem] px-5 py-24 sm:px-8 md:px-11 md:py-32">

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">

          {/* ── Left: heading + dual vertical marquees ── */}
          <div className="flex flex-col">

            <div data-areas-header className="mb-8">
              <span className="font-sans text-[0.6875rem] uppercase tracking-eyebrow text-navy/30">
                Service Areas
              </span>
              <h2 className="mt-3 font-display text-[clamp(1.9rem,3vw,2.8rem)] font-light leading-[1.05] tracking-tight text-navy-deep">
                From the Lakes to the Ocean,{" "}
                <em className="italic text-navy/40">and every fine home in between.</em>
              </h2>
            </div>

            {/* Dual vertical marquees */}
            <div className="flex h-[18.75rem] overflow-hidden border-t border-slate-100">

              {/* Column 1 — scrolls up */}
              <div className="area-col-wrap w-1/2 overflow-hidden border-r border-slate-100">
                <div className={reduce ? undefined : "area-col-up"}>
                  {col1Items.map((area, i) => (
                    <AreaRow
                      key={`c1-${i}-${area.slug}`}
                      area={area}
                      selected={area.slug === selectedSlug}
                      onClick={() => setSelectedSlug(area.slug)}
                    />
                  ))}
                </div>
              </div>

              {/* Column 2 — scrolls down */}
              <div className="area-col-wrap w-1/2 overflow-hidden">
                <div className={reduce ? undefined : "area-col-down"}>
                  {col2Items.map((area, i) => (
                    <AreaRow
                      key={`c2-${i}-${area.slug}`}
                      area={area}
                      selected={area.slug === selectedSlug}
                      onClick={() => setSelectedSlug(area.slug)}
                    />
                  ))}
                </div>
              </div>

            </div>

            <Link
              href="/service-areas"
              className="group mt-8 inline-flex w-fit items-center gap-2 font-sans text-[0.6875rem] uppercase tracking-wide2 text-navy transition-colors hover:text-navy-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/30"
            >
              View all service areas
              <ArrowUpRight
                strokeWidth={1.25}
                className="h-3.5 w-3.5 transition-transform duration-300 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>

          {/* ── Right: map rectangle ── */}
          <div
            data-map-panel
            className="h-[23.75rem] w-full overflow-hidden border border-navy/15 shadow-[0_24px_60px_-30px_rgba(10,26,82,0.45)] lg:h-[28.75rem]"
          >
            {mapReady ? (
              <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
                <Map
                  defaultCenter={{ lat: 28.62, lng: -81.45 }}
                  defaultZoom={9}
                  gestureHandling="cooperative"
                  disableDefaultUI
                  zoomControl
                  styles={MAP_STYLES}
                  className="h-full w-full"
                >
                  <MapController target={selected?.coords ?? null} />
                  <AreaMarkers
                    areas={areasWithCoords}
                    selectedSlug={selectedSlug}
                    onSelect={setSelectedSlug}
                  />
                </Map>
              </APIProvider>
            ) : (
              // Placeholder in the map panel's water blue until the API mounts.
              <div aria-hidden className="h-full w-full bg-[#c6d5ef]" />
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
