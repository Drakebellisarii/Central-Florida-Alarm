"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Stagger index for grouped reveals */
  index?: number;
  className?: string;
};

/**
 * Restrained scroll reveal: a short fade with a 16px rise and a touch of blur,
 * eased out, fired once. Honors prefers-reduced-motion by rendering statically.
 */
export function Reveal({ children, index = 0, className }: RevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.08,
      }}
    >
      {children}
    </motion.div>
  );
}
