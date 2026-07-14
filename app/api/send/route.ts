import { NextRequest, NextResponse } from "next/server";
import { getGraphAccessToken } from "@/lib/msGraph";

// Shared endpoint for all site forms (contact, service request, service
// agreement). Each form posts its fields as FormData with a hidden
// `formType` field identifying itself; this route relays whatever fields
// it receives into an email sent through Microsoft Graph's sendMail API
// (the tenant has legacy SMTP AUTH disabled, so this goes through the
// OAuth app registration instead — see app/api/auth/callback/route.ts for
// the one-time setup that produces ENTRA_REFRESH_TOKEN).
const SKIP_FIELDS = new Set(["formType", "_subject"]);

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();

    const fields: Record<string, string[]> = {};
    for (const [key, value] of data.entries()) {
      if (typeof value !== "string" || !value.trim()) continue;
      (fields[key] ??= []).push(value);
    }

    const formType = fields.formType?.[0] ?? "Contact form";
    const name = fields.name?.[0];
    const replyTo = fields.email?.[0];

    const lines = Object.entries(fields)
      .filter(([key]) => !SKIP_FIELDS.has(key))
      .map(([key, values]) => `${key}: ${values.join(", ")}`);

    if (!process.env.FORM_RECIPIENT) {
      console.error("Email send error: missing FORM_RECIPIENT env var");
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
          toRecipients: [{ emailAddress: { address: process.env.FORM_RECIPIENT } }],
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
