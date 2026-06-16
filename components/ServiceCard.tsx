import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ServiceIcon } from "./ServiceIcon";
import type { IconKey } from "@/lib/services";

export function ServiceCard({
  href,
  name,
  summary,
  icon,
  index,
}: {
  href: string;
  name: string;
  summary: string;
  icon: IconKey;
  index?: number;
}) {
  return (
    <Link
      href={href}
      className="group relative z-0 flex min-h-[15rem] flex-col justify-between border border-slate-200 bg-white p-7 transition-all duration-300 ease-expo hover:z-10 hover:scale-[1.025] hover:border-navy/25 hover:shadow-[0_0_0_1px_rgba(1,22,137,0.18),0_12px_48px_rgba(1,22,137,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/30 md:p-8"
    >
      <div className="flex items-start justify-between">
        <span className="text-navy">
          <ServiceIcon icon={icon} className="h-7 w-7" />
        </span>
        {typeof index === "number" && (
          <span className="font-sans text-[12px] tracking-wide text-slate-300">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
      </div>

      <div>
        <h3 className="font-display text-[24px] leading-tight text-navy-deep transition-colors group-hover:text-navy">
          {name}
        </h3>
        <p className="mt-3 font-sans text-[14px] leading-relaxed text-slate-500">
          {summary}
        </p>
        <span className="mt-5 inline-flex items-center gap-2 font-sans text-[11px] uppercase tracking-wide2 text-navy/50">
          Learn more
          <ArrowUpRight
            strokeWidth={1.25}
            className="h-3.5 w-3.5 transition-transform duration-500 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </div>
    </Link>
  );
}
