import type { NextRequest } from "next/server";
import { HONEYPOT_FIELD, TIMESTAMP_FIELD } from "@/lib/formFields";
import { BUSINESS } from "@/lib/seo";

/**
 * Server-side gate for /api/send. Everything the React forms validate is
 * re-checked here, because a direct POST never runs that code — before this
 * existed the route relayed whatever it was handed straight into Graph.
 *
 * Layers, cheapest first: same-origin, rate limit, honeypot, timing, then
 * field allowlist + validation.
 */

/* ------------------------------------------------------------------ */
/* Tunables                                                            */
/* ------------------------------------------------------------------ */

/** Nobody fills out a real form this fast. */
const MIN_FILL_MS = 3_000;

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

/**
 * Shown verbatim to anyone who trips the rate limit. Almost everyone who
 * sees this is a real person who resubmitted a few times, so it apologizes,
 * blames the actual culprit, and points them at the phone — which is the
 * better outcome for a lead anyway.
 */
export const RATE_LIMIT_MESSAGE =
  `It's an unfortunate sign of the times that we have to limit how often this ` +
  `form can be sent — the spam bots insisted. You're almost certainly not one ` +
  `of them, and we're sorry for the inconvenience. We'd far rather have a real ` +
  `conversation anyway: give us a call at ${BUSINESS.phone} and we'll skip the ` +
  `form entirely.`;

/* ------------------------------------------------------------------ */
/* Field rules — mirrors the client validate() in each form            */
/* ------------------------------------------------------------------ */

type FieldRule = {
  maxLength: number;
  /** Repeatable field (the contact form's service checkboxes). */
  multi?: boolean;
  maxEntries?: number;
};

// Anything not listed is dropped. The old loop copied *any* posted key into
// the email body, which let a bot label its own content however it liked.
const FIELD_RULES: Record<string, FieldRule> = {
  formType: { maxLength: 60 },
  name: { maxLength: 100 },
  email: { maxLength: 200 },
  phone: { maxLength: 40 },
  projectType: { maxLength: 60 },
  address: { maxLength: 200 },
  city: { maxLength: 100 },
  state: { maxLength: 40 },
  zip: { maxLength: 12 },
  message: { maxLength: 5_000 },
  services: { maxLength: 60, multi: true, maxEntries: 12 },
};

// Required fields per form, matching each component's validate().
const REQUIRED_BY_FORM: Record<string, string[]> = {
  "Contact form": ["name", "email", "projectType", "message"],
  "Service request": ["name", "email", "phone", "address", "message"],
  "Service agreement inquiry": ["name", "email", "phone", "address", "city", "zip"],
};

const DEFAULT_REQUIRED = ["name", "email"];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* ------------------------------------------------------------------ */
/* Rate limiting                                                       */
/* ------------------------------------------------------------------ */

// In-process sliding window. Each serverless instance keeps its own map, so
// this throttles a flood rather than capping it exactly — enough to keep a
// bot from emptying itself into the inbox. A hard global limit would need
// shared storage (Vercel KV / Upstash) or a WAF rule.
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const cutoff = now - RATE_LIMIT_WINDOW_MS;

  // Prune while we're here so the map can't grow without bound.
  for (const [key, times] of hits) {
    const live = times.filter((t) => t > cutoff);
    if (live.length) hits.set(key, live);
    else hits.delete(key);
  }

  const recent = hits.get(ip) ?? [];
  if (recent.length >= RATE_LIMIT_MAX) return true;

  hits.set(ip, [...recent, now]);
  return false;
}

function clientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

/* ------------------------------------------------------------------ */
/* Origin                                                              */
/* ------------------------------------------------------------------ */

/**
 * Same-origin check. Compares the Origin header against the request's own
 * Host rather than a hardcoded domain, so this keeps working on localhost
 * and Vercel preview URLs while still rejecting a form posted from someone
 * else's page. Browsers always send Origin on a cross-origin POST.
 */
function sameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;

  const host = request.headers.get("host");
  if (!host) return false;

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

/* ------------------------------------------------------------------ */
/* Guard                                                               */
/* ------------------------------------------------------------------ */

export type GuardResult =
  | { ok: true; fields: Record<string, string[]> }
  /**
   * Looks automated. The caller answers 200 as though it sent, so a bot gets
   * no signal about which trap it hit and nothing to tune against.
   */
  | { ok: false; silent: true; reason: string }
  | { ok: false; silent?: false; status: number; error: string; reason: string };

export function guardSubmission(
  request: NextRequest,
  data: FormData
): GuardResult {
  if (!sameOrigin(request)) {
    return {
      ok: false,
      status: 403,
      error: "Request rejected",
      reason: "cross-origin post",
    };
  }

  const ip = clientIp(request);
  if (rateLimited(ip)) {
    return {
      ok: false,
      status: 429,
      error: RATE_LIMIT_MESSAGE,
      reason: `rate limit (${ip})`,
    };
  }

  // Honeypot: any value at all means it wasn't a human.
  const honeypot = data.get(HONEYPOT_FIELD);
  if (typeof honeypot === "string" && honeypot.trim()) {
    return { ok: false, silent: true, reason: "honeypot filled" };
  }

  const timing = checkTiming(data.get(TIMESTAMP_FIELD));
  if (timing) return { ok: false, silent: true, reason: timing };

  const fields: Record<string, string[]> = {};
  for (const [key, value] of data.entries()) {
    const rule = FIELD_RULES[key];
    if (!rule) continue; // unknown field — drop silently
    if (typeof value !== "string") continue;

    const trimmed = value.trim();
    if (!trimmed) continue;
    if (trimmed.length > rule.maxLength) {
      return {
        ok: false,
        status: 400,
        error: "One of the fields is too long.",
        reason: `${key} exceeds ${rule.maxLength} chars`,
      };
    }

    const existing = (fields[key] ??= []);
    if (!rule.multi && existing.length) {
      return {
        ok: false,
        status: 400,
        error: "Request rejected",
        reason: `${key} sent more than once`,
      };
    }
    if (rule.multi && existing.length >= (rule.maxEntries ?? 12)) {
      return {
        ok: false,
        status: 400,
        error: "Too many selections.",
        reason: `${key} over ${rule.maxEntries} entries`,
      };
    }
    existing.push(trimmed);
  }

  const formType = fields.formType?.[0] ?? "Contact form";
  const required = REQUIRED_BY_FORM[formType] ?? DEFAULT_REQUIRED;
  const missing = required.filter((key) => !fields[key]?.[0]);
  if (missing.length) {
    return {
      ok: false,
      status: 400,
      error: "Please fill in all required fields.",
      reason: `missing: ${missing.join(", ")}`,
    };
  }

  if (!EMAIL_RE.test(fields.email[0])) {
    return {
      ok: false,
      status: 400,
      error: "Please enter a valid email address.",
      reason: "invalid email",
    };
  }

  return { ok: true, fields };
}

/**
 * Returns a reason string when the submission arrived implausibly fast.
 *
 * The stamp is written by the browser, so a skewed device clock yields a
 * negative or enormous elapsed time. Those are only ever benign, so we let
 * them through and reject solely the 0–3s window, which no human hits.
 */
function checkTiming(raw: FormDataEntryValue | null): string | null {
  if (typeof raw !== "string" || !raw) return "missing timestamp";

  const started = Number(raw);
  if (!Number.isFinite(started)) return "unparseable timestamp";

  const elapsed = Date.now() - started;
  if (elapsed >= 0 && elapsed < MIN_FILL_MS) return `submitted in ${elapsed}ms`;

  return null;
}
