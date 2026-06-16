"use client";

import { useState } from "react";
import { Check, ArrowUpRight, Loader2 } from "lucide-react";

/* ------------------------------------------------------------------ */
/* Formspree endpoint. Replace REPLACE_WITH_YOUR_ID with the real form */
/* ID from your Formspree dashboard (https://formspree.io). Shares the  */
/* same pattern as the main contact form.                              */
/* ------------------------------------------------------------------ */
const FORMSPREE_ENDPOINT = "https://formspree.io/f/REPLACE_WITH_YOUR_ID";

type Errors = Partial<
  Record<"name" | "email" | "phone" | "address" | "message", string>
>;

const fieldBase =
  "w-full border border-slate-300 bg-white px-4 py-3.5 font-sans text-[15px] text-navy-deep placeholder:text-slate-400 transition-colors focus:border-navy-logo focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-navy-logo";

export function ServiceRequestForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Errors>({});

  function validate(form: HTMLFormElement): Errors {
    const data = new FormData(form);
    const next: Errors = {};
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const address = String(data.get("address") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (name.length < 2) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "Please enter a valid email address.";
    if (!/[0-9]{7,}/.test(phone.replace(/\D/g, "")))
      next.phone = "A phone number helps us reach you quickly.";
    if (address.length < 5) next.address = "Where is the system located?";
    if (message.length < 10) next.message = "A sentence or two about the issue helps.";
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
      data.append("_subject", "New service request — Fix my stuff");
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex min-h-[420px] flex-col justify-center border border-navy-logo/30 bg-white p-10">
        <span className="flex h-12 w-12 items-center justify-center border border-navy-logo text-navy-logo">
          <Check strokeWidth={1.25} className="h-6 w-6" />
        </span>
        <h2 className="mt-7 font-display text-3xl text-navy-deep">Got it — help is on the way.</h2>
        <p className="mt-4 max-w-md font-sans text-[15px] leading-relaxed text-slate-600">
          A service coordinator will reach out within one business day to schedule
          your visit. If a system is down and it cannot wait, please call us now at{" "}
          <a href="tel:+14078398485" className="text-navy-logo hover:text-navy">
            407-839-8485
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <input type="hidden" name="formType" value="Service request" />

      {status === "error" && (
        <p
          role="alert"
          className="border border-red-200 bg-red-50 px-4 py-3 font-sans text-[14px] text-red-700"
        >
          Something went wrong sending your request. Please call us at 407-839-8485
          or try again.
        </p>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field label="Name" htmlFor="name" error={errors.name} required>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={fieldBase}
            placeholder="Your name"
          />
        </Field>

        <Field label="Email" htmlFor="email" error={errors.email} required>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={fieldBase}
            placeholder="you@email.com"
          />
        </Field>

        <Field label="Phone" htmlFor="phone" error={errors.phone} required>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className={fieldBase}
            placeholder="(407) 000-0000"
          />
        </Field>

        <Field label="Service address" htmlFor="address" error={errors.address} required>
          <input
            id="address"
            name="address"
            type="text"
            autoComplete="street-address"
            aria-invalid={!!errors.address}
            aria-describedby={errors.address ? "address-error" : undefined}
            className={fieldBase}
            placeholder="Street, city"
          />
        </Field>
      </div>

      <Field label="Describe the issue" htmlFor="message" error={errors.message} required>
        <textarea
          id="message"
          name="message"
          rows={5}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`${fieldBase} resize-none`}
          placeholder="What is happening, when it started, and which rooms or devices are affected."
        />
      </Field>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="group mt-2 inline-flex items-center justify-center gap-3 bg-navy-logo px-8 py-4 font-sans text-[12px] uppercase tracking-wide2 text-white transition-colors duration-500 ease-expo hover:bg-navy disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-logo focus-visible:ring-offset-2 focus-visible:ring-offset-white"
      >
        {status === "submitting" ? (
          <>
            <Loader2 strokeWidth={1.5} className="h-4 w-4 animate-spin" />
            Sending
          </>
        ) : (
          <>
            Submit request
            <ArrowUpRight
              strokeWidth={1.25}
              className="h-4 w-4 transition-transform duration-500 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </>
        )}
      </button>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="font-sans text-[13px] text-slate-600">
        {label}
        {required && <span className="ml-1 text-navy-logo">*</span>}
      </label>
      {children}
      {error && (
        <p
          id={`${htmlFor}-error`}
          role="alert"
          className="font-sans text-[13px] text-red-600"
        >
          {error}
        </p>
      )}
    </div>
  );
}
