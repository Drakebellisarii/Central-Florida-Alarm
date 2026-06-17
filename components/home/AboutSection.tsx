"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { BUSINESS } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

const PILLARS = [
  { label: "Automation", body: "Lighting, climate, shades, and AV coordinated by one quiet logic." },
  { label: "Security", body: "Surveillance, access, and alarm systems designed for the property." },
  { label: "Fire & Life Safety", body: "Smoke, CO, and fire detection tied into alarm and monitoring." },
  { label: "Audio & Video", body: "Whole-house music, private cinema, and displays that disappear." },
  { label: "Lighting Control", body: "Tunable light that flatters the architecture and sets itself." },
  { label: "Networking", body: "Enterprise WiFi and wired backbone every smart home depends on." },
];

export function AboutSection() {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  return (
    <section className="relative flex min-h-[100dvh] flex-col bg-white shadow-[0_-20px_80px_rgba(0,0,0,0.25)] lg:flex-row">

      {/* ── Left — text ───────────────────────────────────────────────── */}
      <div className="flex flex-col px-6 py-20 sm:px-8 md:px-12 lg:w-1/2 lg:justify-center lg:px-14 lg:py-16 xl:px-16">

        <motion.div
          initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <h2 className="font-display text-[clamp(1.9rem,3.2vw,3rem)] font-light leading-[1.05] tracking-tight text-navy-deep">
            Central Florida&rsquo;s home integration partner since&nbsp;{BUSINESS.founded}.
          </h2>
        </motion.div>

        <motion.div
          initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
          className="mt-5"
        >
          <p className="max-w-md font-sans text-[14px] leading-relaxed text-slate-500">
            A division of {BUSINESS.parent}, we have spent more than fifty years
            working alongside builders and architects to bring the world&rsquo;s best
            automation and security systems into Central Florida&rsquo;s finest homes.
          </p>
          <Link
            href="/contact"
            className="mt-5 inline-flex items-center gap-2 font-sans text-[11px] uppercase tracking-wide2 text-navy transition-colors hover:text-navy-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/30"
          >
            Start a conversation
            <ArrowRight strokeWidth={1.25} className="h-3 w-3" />
          </Link>
        </motion.div>

        {/* Capabilities */}
        <div className="mt-8 border-t border-slate-100 pt-7">
          <div className="grid grid-cols-2 gap-x-8 gap-y-5">
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.label}
                initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.06 }}
                className="group"
              >
                <div className="flex items-baseline gap-2.5">
                  <span className="font-sans text-[9px] uppercase tracking-eyebrow text-navy/25">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-[15px] leading-snug text-navy-deep transition-colors duration-300 group-hover:text-navy">
                    {p.label}
                  </h3>
                </div>
                <p className="mt-1 pl-[1.6rem] font-sans text-[11px] leading-relaxed text-slate-400">
                  {p.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Association logos */}
        <motion.div
          initial={reduce ? { opacity: 1 } : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
          className="mt-10 border-t border-slate-100 pt-8"
        >
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            <Image
              src="/images/GOBA.png"
              alt="Greater Orlando Builders Association"
              width={120}
              height={60}
              className="h-16 w-auto object-contain opacity-80 transition-all duration-300 hover:opacity-100 sm:h-20 lg:h-24"
            />
            <span className="h-12 w-px bg-slate-200 sm:h-16" />
            <Image
              src="/images/MCBC_Logo.jpg"
              alt="Master Custom Builder Council"
              width={200}
              height={60}
              className="h-16 w-auto object-contain opacity-80 transition-all duration-300 hover:opacity-100 sm:h-20 lg:h-24"
            />
          </div>
        </motion.div>

      </div>

      {/* ── Right — portrait video placeholder (9:16) ─────────────────── */}
      <div className="relative hidden bg-navy-deep lg:flex lg:w-1/2 lg:items-center lg:justify-center lg:overflow-hidden">
        <div className="grain absolute inset-0 opacity-30" />
        {/* Portrait 9:16 container centered within the right panel */}
        <div
          className="relative z-10 h-full overflow-hidden"
          style={{ width: "min(96%, calc(100dvh * 9 / 10))" }}
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/images/blinds-poster.jpg"
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/Blinds.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

    </section>
  );
}
