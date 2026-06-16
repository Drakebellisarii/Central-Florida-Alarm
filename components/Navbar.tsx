"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { BUSINESS } from "@/lib/seo";

const NAV_HEIGHT = 76;

/**
 * Two-state header. Fully transparent over a page's dark hero, settling
 * into a solid white bar the moment content rises to meet it:
 *  - #nav-solid-marker (top of the About section on the home page) reaching
 *    the bottom of the bar, or
 *  - #nav-sentinel (top of an inner page's hero) scrolling out of view.
 * Pages with neither marker get the solid bar permanently.
 */
export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const pathname = usePathname();
  const reduce = useReducedMotion();

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    const sentinel = document.getElementById("nav-sentinel");
    const marker = document.getElementById("nav-solid-marker");
    if (!sentinel && !marker) {
      setSolid(true);
      return;
    }

    let ticking = false;
    const update = () => {
      ticking = false;
      let next = false;
      if (sentinel && sentinel.getBoundingClientRect().bottom < 0) next = true;
      if (marker && marker.getBoundingClientRect().top <= NAV_HEIGHT) next = true;
      setSolid(next);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-700 ease-expo ${
          solid
            ? "bg-white shadow-[0_1px_0_rgba(1,22,137,0.08),0_2px_16px_rgba(1,22,137,0.06)]"
            : "bg-transparent"
        }`}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex max-w-[1500px] items-center justify-between px-5 sm:px-8 md:px-11"
          style={{ height: NAV_HEIGHT }}
        >
          {/* Logo — crossfades between light and dark marks */}
          <Link
            href="/"
            aria-label="Central Florida Automation Services, home"
            className={`relative z-10 flex items-center focus-visible:outline-none focus-visible:ring-2 ${
              solid ? "focus-visible:ring-navy-logo/30" : "focus-visible:ring-white/40"
            }`}
          >
            <span className="relative block h-10 w-[120px] sm:h-12 sm:w-[140px]">
              <Image
                src="/images/cfas-logo.png"
                alt="Central Florida Automation Services"
                fill
                priority
                sizes="140px"
                className={`object-contain object-left transition-opacity duration-700 ${
                  solid ? "opacity-100" : "opacity-0"
                }`}
              />
              <Image
                src="/images/cfas-logo-light.png"
                alt=""
                aria-hidden="true"
                fill
                priority
                sizes="140px"
                className={`object-contain object-left transition-opacity duration-700 ${
                  solid ? "opacity-0" : "opacity-100"
                }`}
              />
            </span>
          </Link>

          {/* Center nav */}
          <div className="hidden items-center gap-9 lg:flex">
            <NavLink href="/smart-security" solid={solid}>
              Smart Security
            </NavLink>
            <NavLink href="/service-areas" solid={solid}>
              Service Areas
            </NavLink>
            <NavLink href="/contact" solid={solid}>
              Contact
            </NavLink>
          </div>

          {/* Right cluster */}
          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/existing-clients"
              className={`inline-flex items-center gap-2 border px-4 py-2 font-sans text-[11px] uppercase tracking-wide2 transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 ${
                solid
                  ? "border-navy-logo/25 text-navy-logo/70 hover:border-navy-logo hover:text-navy-logo focus-visible:ring-navy-logo/30"
                  : "border-white/30 text-white/80 hover:border-white hover:text-white focus-visible:ring-white/40"
              }`}
            >
              Existing Clients
            </Link>
            <Link
              href="/fix-my-stuff"
              className={`group inline-flex items-center gap-2.5 px-5 py-2.5 font-sans text-[11px] uppercase tracking-wide2 transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 ${
                solid
                  ? "bg-navy-logo text-white hover:bg-navy focus-visible:ring-navy-logo/50"
                  : "bg-white text-navy-deep hover:bg-bone focus-visible:ring-white/60"
              }`}
            >
              Fix my stuff
              <ArrowRight
                strokeWidth={1.25}
                className="h-3.5 w-3.5 transition-transform duration-500 ease-expo group-hover:translate-x-0.5"
              />
            </Link>
          </div>

          {/* Mobile trigger */}
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
            className={`relative z-10 flex h-10 w-10 items-center justify-center transition-colors duration-500 lg:hidden focus-visible:outline-none focus-visible:ring-2 ${
              solid
                ? "text-navy-logo focus-visible:ring-navy-logo/30"
                : "text-white focus-visible:ring-white/40"
            }`}
          >
            <Menu strokeWidth={1.25} className="h-6 w-6" />
          </button>
        </nav>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={reduce ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex flex-col bg-navy-deep/98 backdrop-blur-xl lg:hidden"
          >
            <div className="flex h-[76px] items-center justify-between border-b border-white/[0.07] px-5 sm:px-8">
              <Image
                src="/images/cfas-logo-light.png"
                alt="Central Florida Automation Services"
                width={200}
                height={99}
                className="h-9 w-auto"
              />
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
                className="flex h-10 w-10 items-center justify-center text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                <X strokeWidth={1.25} className="h-6 w-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 pb-12 pt-6">
              <div className="flex flex-col border-t border-white/10 py-7">
                {[
                  { href: "/smart-security", label: "Smart Security" },
                  { href: "/service-areas", label: "Service Areas" },
                  { href: "/contact", label: "Contact" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group flex items-center justify-between py-3 font-display text-[22px] leading-tight text-white transition-colors hover:text-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                  >
                    {item.label}
                    <ArrowRight strokeWidth={1} className="h-4 w-4 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-40" />
                  </Link>
                ))}
              </div>

              <motion.div
                initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
                className="mt-6 space-y-3 border-t border-white/10 pt-8"
              >
                <Link
                  href="/fix-my-stuff"
                  className="flex w-full items-center justify-center bg-white px-7 py-4 font-sans text-[12px] uppercase tracking-wide2 text-navy-deep"
                >
                  Fix my stuff
                </Link>
                <Link
                  href="/existing-clients"
                  className="flex w-full items-center justify-center border border-white/25 px-7 py-4 font-sans text-[12px] uppercase tracking-wide2 text-white/80"
                >
                  Existing Clients
                </Link>
                <p className="pt-2 font-sans text-[13px] leading-relaxed text-white/40">
                  {BUSINESS.street}<br />
                  {BUSINESS.city}, {BUSINESS.state} {BUSINESS.zip}
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({
  href,
  solid,
  children,
}: {
  href: string;
  solid: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`group relative py-2 font-sans text-[12px] uppercase tracking-wide2 transition-colors duration-500 focus-visible:outline-none focus-visible:ring-2 ${
        solid
          ? "text-navy-logo/60 hover:text-navy-logo focus-visible:ring-navy-logo/30"
          : "text-white/65 hover:text-white focus-visible:ring-white/40"
      }`}
    >
      {children}
      <span
        className={`absolute bottom-0 left-0 h-px w-0 transition-all duration-500 ease-expo group-hover:w-full ${
          solid ? "bg-navy-logo/30" : "bg-white/40"
        }`}
      />
    </Link>
  );
}
