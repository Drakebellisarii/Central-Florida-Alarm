import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { ImplementNext } from "@/components/ImplementNext";

export const metadata: Metadata = buildMetadata({
  title: "Smart Business Security | Central Florida Automation Services",
  description:
    "Smart business security from Central Florida Automation Services — access control, surveillance, and monitoring built for how your business runs.",
  path: "/smart-business",
});

export default function SmartBusinessPage() {
  return <ImplementNext title="Smart Business" />;
}
