const HERO_BRANDS = ["Alarm.com", "Control4", "Crestron", "Josh.ai", "Lutron", "Savant", "Sonos", "Ubiquiti"];

export function BrandStrip({
  brands = HERO_BRANDS,
  label = "Authorized integrator",
}: {
  brands?: string[];
  label?: string;
}) {
  return (
    <div className="flex flex-col gap-4">
      <span className="font-sans text-[0.625rem] uppercase tracking-eyebrow text-slate-400">
        {label}
      </span>
      <div className="flex flex-wrap items-center gap-2">
        {brands.map((b) => (
          <span
            key={b}
            className="border border-navy-logo/20 px-3 py-1.5 font-sans text-[0.625rem] uppercase tracking-[0.14em] text-navy-logo/55"
          >
            {b}
          </span>
        ))}
      </div>
    </div>
  );
}
