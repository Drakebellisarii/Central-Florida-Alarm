import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Stagger index for grouped reveals */
  index?: number;
  className?: string;
};

/**
 * Restrained scroll reveal: a short fade with a rise as the element enters
 * the viewport. Driven purely by CSS (see `.reveal-scroll` in globals.css),
 * so the content is readable the instant HTML + CSS load and never waits on
 * the JavaScript bundle. Honors prefers-reduced-motion, and degrades to
 * fully-visible (no animation) in browsers without scroll-driven animations.
 */
export function Reveal({ children, index = 0, className }: RevealProps) {
  return (
    <div
      className={`reveal-scroll${className ? ` ${className}` : ""}`}
      style={index ? { animationDelay: `${index * 0.06}s` } : undefined}
    >
      {children}
    </div>
  );
}
