"use client";

import { useState } from "react";
import { Check, ArrowUpRight, ChevronDown, Loader2 } from "lucide-react";
import { SERVICES } from "@/lib/services";

/* ------------------------------------------------------------------ */
/* Formspree endpoint. Replace REPLACE_WITH_YOUR_ID with the real form */
/* ID from your Formspree dashboard (https://formspree.io).            */
/* ------------------------------------------------------------------ */
const FORMSPREE_ENDPOINT = "https://formspree.io/f/REPLACE_WITH_YOUR_ID";

const PROJECT_TYPES = [
  "New Construction",
  "Existing Home",
  "Commercial",
  "Service & Repair",
] as const;

type Errors = Partial<Record<"name" | "email" | "phone" | "projectType" | "message", string>>;

// 16px on touch sizes — anything smaller makes iOS Safari zoom the page
// when a field is focused. Underline-only fields; focus thickens the rule
// via a shadow so the layout never shifts.
const fieldBase =
  "w-full border-b border-slate-300 bg-transparent px-0 py-3 font-sans text-[1rem] text-navy-deep placeholder:text-slate-400 transition-[border-color,box-shadow] focus:border-navy-logo focus:shadow-[0_1px_0_0_#011689] focus-visible:outline-none lg:text-[0.9375rem]";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [services, setServices] = useState<string[]>([]);

  function toggleService(name: string) {
    setServices((prev) =>
      prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name]
    );
  }

  function validate(form: HTMLFormElement): Errors {
    const data = new FormData(form);
    const next: Errors = {};
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const projectType = String(data.get("projectType") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (name.length < 2) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "Please enter a valid email address.";
    if (phone && !/[0-9]{7,}/.test(phone.replace(/\D/g, "")))
      next.phone = "Please enter a valid phone number.";
    if (!projectType) next.projectType = "Please choose a project type.";
    if (message.length < 10) next.message = "A sentence or two about the project helps.";
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
      services.forEach((s) => data.append("services", s));
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex min-h-[26.25rem] flex-col justify-center">
        <span className="flex h-12 w-12 items-center justify-center border border-navy-logo text-navy-logo">
          <Check strokeWidth={1.25} className="h-6 w-6" />
        </span>
        <h2 className="mt-7 font-display text-3xl text-navy-deep">Thank you. We have it.</h2>
        <p className="mt-4 max-w-md font-sans text-[0.9375rem] leading-relaxed text-slate-600">
          A member of our team will be in touch within one business day. If it is
          time sensitive, please call us directly at{" "}
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
      {status === "error" && (
        <p
          role="alert"
          className="border border-red-200 bg-red-50 px-4 py-3 font-sans text-[0.875rem] text-red-700"
        >
          Something went wrong sending your message. Please call us at 407-839-8485
          or try again.
        </p>
      )}

      <div className="grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2">
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

        <Field label="Phone" htmlFor="phone" error={errors.phone}>
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

        <Field label="Project type" htmlFor="projectType" error={errors.projectType} required>
          <div className="relative">
            <select
              id="projectType"
              name="projectType"
              defaultValue=""
              aria-invalid={!!errors.projectType}
              aria-describedby={errors.projectType ? "projectType-error" : undefined}
              className={`${fieldBase} cursor-pointer appearance-none pr-6`}
            >
              <option value="" disabled>
                Select one
              </option>
              {PROJECT_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <ChevronDown
              strokeWidth={1.5}
              aria-hidden="true"
              className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            />
          </div>
        </Field>
      </div>

      <fieldset className="flex flex-col gap-3">
        <legend className="mb-1 font-sans text-[0.6875rem] uppercase tracking-wide2 text-slate-500">
          Services of interest
        </legend>
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {SERVICES.map((s) => {
            const checked = services.includes(s.name);
            return (
              <label
                key={s.slug}
                className="group flex cursor-pointer items-center gap-3 font-sans text-[0.875rem] text-slate-600"
              >
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center border transition-colors ${
                    checked ? "border-navy-logo bg-navy-logo text-white" : "border-slate-300 text-transparent"
                  }`}
                >
                  <Check strokeWidth={2} className="h-3.5 w-3.5" />
                </span>
                <input
                  type="checkbox"
                  name="services_checkbox"
                  value={s.name}
                  checked={checked}
                  onChange={() => toggleService(s.name)}
                  className="sr-only"
                />
                <span className="group-hover:text-navy-deep">{s.name}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <Field label="Message" htmlFor="message" error={errors.message} required>
        <textarea
          id="message"
          name="message"
          rows={5}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`${fieldBase} resize-none`}
          placeholder="Tell us about the home, the timeline, and what you are hoping to accomplish."
        />
      </Field>

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
            Send message
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
      <label
        htmlFor={htmlFor}
        className="font-sans text-[0.6875rem] uppercase tracking-wide2 text-slate-500"
      >
        {label}
        {required && <span className="ml-1 text-navy-logo">*</span>}
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
