import { NextRequest, NextResponse } from "next/server";
import { getGraphAccessToken } from "@/lib/msGraph";
import { guardSubmission } from "@/lib/formGuard";
import { BUSINESS } from "@/lib/seo";

// Shared endpoint for all site forms (contact, service request, service
// agreement). Each form posts its fields as FormData with a hidden
// `formType` field identifying itself; this route relays whatever fields
// it receives into an email sent through Microsoft Graph's sendMail API
// (the tenant has legacy SMTP AUTH disabled, so this goes through the
// OAuth app registration instead — see app/api/auth/callback/route.ts for
// the one-time setup that produces ENTRA_REFRESH_TOKEN).
const SKIP_FIELDS = new Set(["formType", "_subject"]);

/**
 * Who each form's submissions go to.
 *
 * Repair requests are the service department's alone; service agreement
 * inquiries go to both the office and service. Anything else (the contact
 * form) falls back to FORM_RECIPIENT, which is the office inbox.
 *
 * Read per-request rather than at module scope so a changed env var takes
 * effect on redeploy without a stale captured value.
 */
function recipientsFor(formType: string): string[] {
  const officeInbox = process.env.FORM_RECIPIENT;

  const list =
    formType === "Service request"
      ? [BUSINESS.serviceEmail]
      : formType === "Service agreement inquiry"
        ? [officeInbox, BUSINESS.serviceEmail]
        : [officeInbox];

  // Dedupe so the same address can't be listed twice if FORM_RECIPIENT is
  // ever pointed at the service inbox.
  return [...new Set(list.filter((a): a is string => Boolean(a)))];
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();

    // Origin, rate limit, honeypot, timing, allowlist, validation.
    const guard = guardSubmission(request, data);
    if (!guard.ok) {
      console.warn("Form submission blocked:", guard.reason);
      // Traps answer 200 so a bot can't tell which check caught it.
      if (guard.silent) return NextResponse.json({ success: true });
      return NextResponse.json({ error: guard.error }, { status: guard.status });
    }

    const { fields } = guard;
    const formType = fields.formType?.[0] ?? "Contact form";
    const name = fields.name?.[0];
    const replyTo = fields.email?.[0];

    const lines = Object.entries(fields)
      .filter(([key]) => !SKIP_FIELDS.has(key))
      .map(([key, values]) => `${key}: ${values.join(", ")}`);

    const recipients = recipientsFor(formType);
    if (!recipients.length) {
      console.error(
        `Email send error: no recipient for "${formType}" (missing FORM_RECIPIENT env var)`
      );
      return NextResponse.json({ error: "Email is not configured" }, { status: 500 });
    }

    const accessToken = await getGraphAccessToken();

    const graphRes = await fetch("https://graph.microsoft.com/v1.0/me/sendMail", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: {
          subject: name ? `${formType}: ${name}` : formType,
          body: {
            contentType: "Text",
            content: lines.join("\n"),
          },
          toRecipients: recipients.map((address) => ({ emailAddress: { address } })),
          ...(replyTo ? { replyTo: [{ emailAddress: { address: replyTo } }] } : {}),
        },
        saveToSentItems: true,
      }),
    });

    if (!graphRes.ok) {
      console.error("Graph sendMail failed:", await graphRes.text());
      return NextResponse.json({ error: "Failed to send" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Email send error:", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
