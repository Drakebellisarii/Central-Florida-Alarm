"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ArrowUpRight, ChevronDown, Loader2, X } from "lucide-react";

// All forms post to this one API route, which emails the submission
// through Outlook/Microsoft 365 — see app/api/send/route.ts.
const SEND_ENDPOINT = "/api/send";

type Errors = Partial<
  Record<"name" | "email" | "phone" | "address" | "city" | "zip", string>
>;

// 16px on touch sizes — anything smaller makes iOS Safari zoom the page
// when a field is focused. Underline-only fields; focus thickens the rule
// via a shadow so the layout never shifts.
const fieldBase =
  "w-full border-b border-slate-300 bg-transparent px-0 py-3 font-sans text-[1rem] text-navy-deep placeholder:text-slate-400 transition-[border-color,box-shadow] focus:border-navy-logo focus:shadow-[0_1px_0_0_#011689] focus-visible:outline-none lg:text-[0.9375rem]";

/**
 * "I am interested in your service agreement" card action: a button that
 * opens a short contact form in a dialog. Kept deliberately quiet — name,
 * email, phone, address, nothing else.
 */
export function ServiceAgreementModal() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Errors>({});
  const firstFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    firstFieldRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function validate(form: HTMLFormElement): Errors {
    const data = new FormData(form);
    const next: Errors = {};
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const address = String(data.get("address") ?? "").trim();
    const city = String(data.get("city") ?? "").trim();
    const zip = String(data.get("zip") ?? "").trim();

    if (name.length < 2) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "Please enter a valid email address.";
    if (!/[0-9]{7,}/.test(phone.replace(/\D/g, "")))
      next.phone = "A phone number helps us reach you quickly.";
    if (address.length < 5) next.address = "Where is the property located?";
    if (city.length < 2) next.city = "Please enter your city.";
    if (!/^\d{5}(-\d{4})?$/.test(zip)) next.zip = "Enter a 5-digit zip.";
    return next;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const firstKey = Object.keys(found)[0];
      form.querySelector<HTMLElement>(`[name="${firstKey}"]`)?.focus();
      return;
    }

    setStatus("submitting");
    try {
      const data = new FormData(form);
      const res = await fetch(SEND_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center bg-navy-logo px-7 py-3 font-sans text-[0.75rem] uppercase tracking-wide2 text-white transition-colors duration-300 hover:bg-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-logo/40"
      >
        Learn More
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="service-agreement-title"
          className="fixed inset-0 z-[110] flex items-center justify-center px-5 py-10"
        >
          <div
            aria-hidden
            className="modal-backdrop-in absolute inset-0 bg-navy-deep/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          <div className="modal-pop-in relative max-h-[calc(100svh-2.5rem)] w-full max-w-md overflow-y-auto rounded-sm bg-white text-left shadow-[0_32px_80px_-24px_rgba(10,26,82,0.45)]">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full text-slate-400 transition-colors duration-300 hover:bg-slate-100 hover:text-navy-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-logo/40"
            >
              <X strokeWidth={1.5} className="h-5 w-5" />
            </button>

            <div className="px-7 pb-9 pt-10 sm:px-9">
              {status === "success" ? (
                <div className="flex min-h-[20rem] flex-col justify-center">
                  <span className="flex h-12 w-12 items-center justify-center border border-navy-logo text-navy-logo">
                    <Check strokeWidth={1.25} className="h-6 w-6" />
                  </span>
                  <h2
                    id="service-agreement-title"
                    className="mt-6 font-display text-2xl text-navy-deep"
                  >
                    Thank you.
                  </h2>
                  <p className="mt-3 font-sans text-[0.9375rem] leading-relaxed text-slate-600">
                    A coordinator will reach out within one business day.
                  </p>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="mt-8 inline-flex w-full items-center justify-center bg-navy-logo px-7 py-3.5 font-sans text-[0.75rem] uppercase tracking-wide2 text-white transition-colors duration-300 hover:bg-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-logo/40 sm:w-auto"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <>
                  <p className="font-sans text-[0.6875rem] uppercase tracking-eyebrow text-navy-logo">
                    Service agreement
                  </p>
                  <h2
                    id="service-agreement-title"
                    className="mt-3 font-display text-[1.55rem] font-light leading-tight tracking-tight text-navy-deep"
                  >
                    Tell us where to reach you.
                  </h2>

                  <form onSubmit={handleSubmit} noValidate className="mt-7 flex flex-col gap-6">
                    <input type="hidden" name="formType" value="Service agreement inquiry" />

                    {status === "error" && (
                      <p
                        role="alert"
                        className="border border-red-200 bg-red-50 px-4 py-3 font-sans text-[0.875rem] text-red-700"
                      >
                        Something went wrong sending your request. Please call us
                        at 407-839-8485 or try again.
                      </p>
                    )}

                    <Field label="Name" htmlFor="sa-name" error={errors.name}>
                      <input
                        ref={firstFieldRef}
                        id="sa-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "sa-name-error" : undefined}
                        className={fieldBase}
                        placeholder="Your name"
                      />
                    </Field>

                    <Field label="Email" htmlFor="sa-email" error={errors.email}>
                      <input
                        id="sa-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "sa-email-error" : undefined}
                        className={fieldBase}
                        placeholder="you@email.com"
                      />
                    </Field>

                    <Field label="Phone" htmlFor="sa-phone" error={errors.phone}>
                      <input
                        id="sa-phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        aria-invalid={!!errors.phone}
                        aria-describedby={errors.phone ? "sa-phone-error" : undefined}
                        className={fieldBase}
                        placeholder="(407) 000-0000"
                      />
                    </Field>

                    <Field label="Address" htmlFor="sa-address" error={errors.address}>
                      <input
                        id="sa-address"
                        name="address"
                        type="text"
                        autoComplete="street-address"
                        aria-invalid={!!errors.address}
                        aria-describedby={errors.address ? "sa-address-error" : undefined}
                        className={fieldBase}
                        placeholder="Street address"
                      />
                    </Field>

                    <div className="grid grid-cols-[4.5rem_1fr_5.5rem] gap-4">
                      <Field label="State" htmlFor="sa-state">
                        <div className="relative">
                          <select
                            id="sa-state"
                            name="state"
                            defaultValue="FL"
                            autoComplete="address-level1"
                            className={`${fieldBase} cursor-pointer appearance-none pr-6`}
                          >
                            <option value="FL">FL</option>
                            <option value="GA">GA</option>
                          </select>
                          <ChevronDown
                            strokeWidth={1.5}
                            aria-hidden="true"
                            className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                          />
                        </div>
                      </Field>

                      <Field label="City" htmlFor="sa-city" error={errors.city}>
                        <input
                          id="sa-city"
                          name="city"
                          type="text"
                          autoComplete="address-level2"
                          aria-invalid={!!errors.city}
                          aria-describedby={errors.city ? "sa-city-error" : undefined}
                          className={fieldBase}
                          placeholder="Orlando"
                        />
                      </Field>

                      <Field label="Zip" htmlFor="sa-zip" error={errors.zip}>
                        <input
                          id="sa-zip"
                          name="zip"
                          type="text"
                          inputMode="numeric"
                          autoComplete="postal-code"
                          aria-invalid={!!errors.zip}
                          aria-describedby={errors.zip ? "sa-zip-error" : undefined}
                          className={fieldBase}
                          placeholder="32804"
                        />
                      </Field>
                    </div>

                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="group mt-2 inline-flex items-center justify-center gap-3 bg-navy-logo px-8 py-4 font-sans text-[0.75rem] uppercase tracking-wide2 text-white transition-colors duration-500 ease-expo hover:bg-navy disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-logo focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                    >
                      {status === "submitting" ? (
                        <>
                          <Loader2 strokeWidth={1.5} className="h-4 w-4 animate-spin" />
                          Sending
                        </>
                      ) : (
                        <>
                          Submit
                          <ArrowUpRight
                            strokeWidth={1.25}
                            className="h-4 w-4 transition-transform duration-500 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          />
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={htmlFor}
        className="font-sans text-[0.6875rem] uppercase tracking-wide2 text-slate-500"
      >
        {label}
      </label>
      {children}
      {error && (
        <p
          id={`${htmlFor}-error`}
          role="alert"
          className="font-sans text-[0.8125rem] text-red-600"
        >
          {error}
        </p>
      )}
    </div>
  );
}
