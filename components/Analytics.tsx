"use client";

import Script from "next/script";
import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

/**
 * Fire a custom GA4 event (e.g. a form submission). No-ops when analytics
 * isn't configured, so it's safe to call from anywhere.
 */
export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}

// GA4's automatic page_view fires on load and on history changes, but in the
// App Router it reads document.title before React has swapped it, so pages get
// logged under the previous page's title. We turn the automatic one off in the
// config below and send our own after each navigation settles instead.
function PageViews() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!GA_ID || typeof window.gtag !== "function") return;
    const query = searchParams.toString();
    window.gtag("event", "page_view", {
      page_path: query ? `${pathname}?${query}` : pathname,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname, searchParams]);

  return null;
}

export function Analytics() {
  // Unset in local dev, so nothing loads and dev traffic never hits the report.
  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { send_page_view: false });
        `}
      </Script>
      {/* useSearchParams needs a Suspense boundary or every page opts out of
          static rendering. */}
      <Suspense fallback={null}>
        <PageViews />
      </Suspense>
    </>
  );
}
