import { NextRequest, NextResponse } from "next/server";

// One-time setup route: Microsoft redirects here after you approve the
// consent screen, with a `code` in the query string. This exchanges it for
// a refresh token immediately, server-side — no manual copy-paste race
// against the code's ~2 minute expiry.
//
// Must match the redirect_uri registered on the Entra app registration
// (Authentication → Web → Redirect URIs) exactly.
const REDIRECT_URI = "http://localhost:3000/api/auth/callback";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const errorDescription = request.nextUrl.searchParams.get("error_description");

  if (errorDescription) {
    return NextResponse.json({ error: errorDescription }, { status: 400 });
  }
  if (!code) {
    return NextResponse.json({ error: "No code in query string" }, { status: 400 });
  }

  const { ENTRA_TENANT_ID, ENTRA_CLIENT_ID, ENTRA_CLIENT_SECRET } = process.env;
  if (!ENTRA_TENANT_ID || !ENTRA_CLIENT_ID || !ENTRA_CLIENT_SECRET) {
    return NextResponse.json(
      { error: "Missing ENTRA_TENANT_ID / ENTRA_CLIENT_ID / ENTRA_CLIENT_SECRET in .env.local" },
      { status: 500 }
    );
  }

  const tokenRes = await fetch(
    `https://login.microsoftonline.com/${ENTRA_TENANT_ID}/oauth2/v2.0/token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: ENTRA_CLIENT_ID,
        client_secret: ENTRA_CLIENT_SECRET,
        grant_type: "authorization_code",
        code,
        redirect_uri: REDIRECT_URI,
        scope: "offline_access Mail.Send",
      }),
    }
  );

  const tokenData = await tokenRes.json();

  if (!tokenRes.ok) {
    console.error("Token exchange failed:", tokenData);
    return NextResponse.json({ error: tokenData }, { status: 400 });
  }

  // Returned directly in the response body (never written to server logs)
  // so it doesn't sit around anywhere persistent. Copy it into .env.local
  // as ENTRA_REFRESH_TOKEN, restart the dev server, and you're done — this
  // route doesn't need to be hit again unless the refresh token expires
  // from ~90 days of inactivity.
  return NextResponse.json({
    success: true,
    next_step: "Copy refresh_token into .env.local as ENTRA_REFRESH_TOKEN, then restart `npm run dev`.",
    refresh_token: tokenData.refresh_token,
  });
}
