function CornerTick({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const pos: Record<string, string> = {
    tl: "left-[var(--frame-inset)] top-[var(--frame-inset)]",
    tr: "right-[var(--frame-inset)] top-[var(--frame-inset)]",
    bl: "left-[var(--frame-inset)] bottom-[var(--frame-inset)]",
    br: "right-[var(--frame-inset)] bottom-[var(--frame-inset)]",
  };
  return (
    <span
      aria-hidden="true"
      className={`absolute ${pos[position]} h-[11px] w-[11px] -translate-x-1/2 -translate-y-1/2 ${
        position.includes("r") ? "translate-x-1/2" : ""
      } ${position.includes("b") ? "translate-y-1/2" : ""}`}
    >
      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-navy/10" />
      <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-navy/10" />
    </span>
  );
}

export function SiteFrame() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-40 hidden md:block"
      >
        <div className="absolute inset-[var(--frame-inset)] border border-navy/[0.04]" />
        <CornerTick position="tl" />
        <CornerTick position="tr" />
        <CornerTick position="bl" />
        <CornerTick position="br" />
      </div>
      <div aria-hidden="true" className="grain" />
    </>
  );
}
