import {
  House,
  ShieldCheck,
  Building2,
  AudioLines,
  Lightbulb,
  Blinds,
  Wifi,
  type LucideIcon,
} from "lucide-react";
import type { IconKey } from "@/lib/services";

const MAP: Record<IconKey, LucideIcon> = {
  home: House,
  shield: ShieldCheck,
  building: Building2,
  audio: AudioLines,
  lighting: Lightbulb,
  shades: Blinds,
  wifi: Wifi,
};

export function ServiceIcon({
  icon,
  className = "h-6 w-6",
}: {
  icon: IconKey;
  className?: string;
}) {
  const Cmp = MAP[icon];
  return <Cmp aria-hidden="true" strokeWidth={1.25} className={className} />;
}
