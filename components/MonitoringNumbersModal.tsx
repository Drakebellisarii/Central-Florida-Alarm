"use client";

import { useEffect, useState } from "react";
import { TriangleAlert, X } from "lucide-react";

/**
 * Reminder to save the monitoring center's caller-ID numbers. 800-numbers
 * get silently screened as spam, which breaks false-alarm verification
 * calls — so this needs to be seen every time a client lands on this page,
 * not just once.
 */
export function MonitoringNumbersModal() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function dismiss() {
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="monitoring-numbers-title"
      className="fixed inset-0 z-[100] flex items-center justify-center px-5 py-10"
    >
      <div
        aria-hidden
        className="modal-backdrop-in absolute inset-0 bg-navy-deep/70 backdrop-blur-sm"
        onClick={dismiss}
      />

      <div className="modal-pop-in relative max-h-[calc(100svh-2.5rem)] w-full max-w-lg overflow-y-auto rounded-sm bg-white shadow-[0_32px_80px_-24px_rgba(10,26,82,0.45)]">
        <button
          type="button"
          onClick={dismiss}
          aria-label="Close"
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full text-slate-400 transition-colors duration-300 hover:bg-slate-100 hover:text-navy-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-logo/40"
        >
          <X strokeWidth={1.5} className="h-5 w-5" />
        </button>

        <div className="px-7 pb-9 pt-10 sm:px-10 sm:pb-10">
          <div className="warning-stamp flex items-center gap-5">
            <span className="warning-pulse inline-flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-red-600/10 text-red-600">
              <TriangleAlert strokeWidth={2.25} className="h-14 w-14" />
            </span>
            <p className="font-hero text-[clamp(1.875rem,7vw,2.75rem)] uppercase leading-none tracking-[0.08em] text-red-600">
              Important
            </p>
          </div>
          <h2
            id="monitoring-numbers-title"
            className="mt-6 font-display text-[1.7rem] font-light leading-tight tracking-tight text-navy-deep"
          >
            Save these numbers in your contacts.
          </h2>

          <p className="mt-5 font-sans text-[0.9375rem] leading-relaxed text-slate-600">
            Many phones silently screen calls from 1-800 numbers as spam.
            That&rsquo;s a problem when our monitoring center calls to verify
            an alarm; a missed call can mean a missed chance to stop a false
            dispatch. Save these as{" "}
            <span className="font-medium text-navy-deep">
              Alarm Monitoring Center
            </span>{" "}
            so they come through.
          </p>

          <div className="mt-6 space-y-2 border-y border-slate-200 py-6">
            <p className="font-display text-[1.15rem] font-normal tracking-tight text-navy-deep">
              1-800-432-1429 <span className="text-slate-400">and</span> 1-800-633-4738
            </p>
            <p className="font-sans text-[0.875rem] text-slate-500">
              SMS Short Code <span className="font-medium text-navy-deep">60281</span>
            </p>
          </div>

          <p className="mt-6 font-sans text-[0.8125rem] font-medium leading-relaxed text-slate-500">
            Please pass this along to your key holders too.
          </p>

          <button
            type="button"
            onClick={dismiss}
            className="mt-8 inline-flex w-full items-center justify-center bg-navy-logo px-7 py-3.5 font-sans text-[0.75rem] uppercase tracking-wide2 text-white transition-colors duration-300 hover:bg-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-logo/40 sm:w-auto"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
