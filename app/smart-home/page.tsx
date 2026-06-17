import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { ImplementNext } from "@/components/ImplementNext";

export const metadata: Metadata = buildMetadata({
  title: "Smart Home Security | Central Florida Automation Services",
  description:
    "Smart home security from Central Florida Automation Services — security, cameras, locks, and life-safety designed around how you live.",
  path: "/smart-home",
});

export default function SmartHomePage() {
  return <ImplementNext title="Smart Home" />;
}
