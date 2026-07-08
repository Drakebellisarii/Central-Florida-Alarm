"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import type { FAQ } from "@/lib/services";

export function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <div className="border-t border-bone/10">
      {faqs.map((faq, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="border-b border-bone/10">
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-7 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze"
              >
                <span className="font-display text-[1.1875rem] leading-snug text-bone md:text-[1.375rem]">
                  {faq.q}
                </span>
                <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center border border-bone/20 text-bronze transition-colors">
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
                  <p className="max-w-prose2 pb-8 pr-12 font-sans text-[0.9375rem] leading-relaxed text-bone-dim">
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
