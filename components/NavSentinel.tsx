/**
 * Invisible 1px marker placed at the very top of a page's hero. The Navbar
 * observes it: while it is in view the navbar is transparent, once it scrolls
 * out of view the navbar turns solid. Every page renders one.
 */
export function NavSentinel() {
  return <div id="nav-sentinel" aria-hidden="true" className="absolute top-0 h-px w-full" />;
}
