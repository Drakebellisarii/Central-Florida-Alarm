"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { LightFAQAccordion } from "@/components/LightFAQAccordion";
import type { FAQ } from "@/lib/services";

/**
 * One collapsible chapter of the FAQ page. Closed by default so all three
 * category headers are visible together the moment the page loads — open
 * one (or several) to read its questions, which then all expand at once.
 */
export function FaqCategory({
  id,
  index,
  eyebrow,
  title,
  faqs,
  defaultOpen = false,
}: {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  faqs: FAQ[];
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const reduce = useReducedMotion();

  // Arriving from another page's "View FAQs" link (e.g. /faq#smart-home)
  // should land with that one category already open, not just scrolled to
  // its collapsed header.
  useEffect(() => {
    if (window.location.hash === `#${id}`) setOpen(true);
  }, [id]);

  return (
    <div id={id} className="scroll-mt-24">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-start justify-between gap-6 py-10 text-left md:py-12"
      >
        <div>
          <span className="font-sans text-[0.6875rem] uppercase tracking-eyebrow text-navy/40">
            {eyebrow} &middot; {index}
          </span>
          <h2 className="mt-3 font-display text-[clamp(1.9rem,3.4vw,2.6rem)] font-light leading-tight tracking-tight text-navy-deep">
            {title}
          </h2>
        </div>
        <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-navy/15 text-navy-logo transition-colors duration-300">
          {open ? (
            <Minus strokeWidth={1.5} className="h-4 w-4" />
          ) : (
            <Plus strokeWidth={1.5} className="h-4 w-4" />
          )}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={reduce ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-10 md:pb-12">
              <LightFAQAccordion faqs={faqs} numbered />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
