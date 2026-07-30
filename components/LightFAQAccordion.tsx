"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import type { FAQ } from "@/lib/services";

const pad = (n: number) => String(n).padStart(2, "0");

export function LightFAQAccordion({
  faqs,
  numbered = false,
}: {
  faqs: FAQ[];
  /** Prefix each question with a muted "01" style index — off by default. */
  numbered?: boolean;
}) {
  // Every answer starts concealed — nothing shows until its own question is
  // clicked.
  const [open, setOpen] = useState<Set<number>>(() => new Set());
  const reduce = useReducedMotion();

  const toggle = (i: number) => {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <div className="border-t border-navy/10">
      {faqs.map((faq, i) => {
        const isOpen = open.has(i);
        return (
          <div key={faq.q} className="border-b border-navy/10">
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => toggle(i)}
                className="flex w-full items-start justify-between gap-6 py-7 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-logo/50"
              >
                <span className="flex gap-4">
                  {numbered && (
                    <span className="mt-1 shrink-0 font-sans text-[0.8125rem] tabular-nums text-navy/30 md:text-[0.875rem]">
                      {pad(i + 1)}
                    </span>
                  )}
                  <span className="font-display text-[1.1875rem] font-light leading-snug tracking-tight text-navy-deep md:text-[1.375rem]">
                    {faq.q}
                  </span>
                </span>
                <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-navy/15 text-navy-logo transition-colors duration-300 group-hover:border-navy/30">
                  {isOpen ? (
                    <Minus strokeWidth={1.5} className="h-4 w-4" />
                  ) : (
                    <Plus strokeWidth={1.5} className="h-4 w-4" />
                  )}
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={reduce ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduce ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p
                    className={`max-w-prose2 pb-8 pr-12 font-sans text-[0.9375rem] leading-relaxed text-slate-600 ${
                      numbered ? "pl-[2.75rem] md:pl-12" : ""
                    }`}
                  >
                    {faq.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
