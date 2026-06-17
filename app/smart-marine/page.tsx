import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { ImplementNext } from "@/components/ImplementNext";

export const metadata: Metadata = buildMetadata({
  title: "Smart Marine | Central Florida Automation Services",
  description:
    "Smart marine systems from Central Florida Automation Services — automation, security, and connectivity engineered for life on the water.",
  path: "/smart-marine",
});

export default function SmartMarinePage() {
  return <ImplementNext title="Smart Marine" />;
}
