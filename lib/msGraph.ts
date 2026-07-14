// Exchanges the long-lived refresh token (obtained once via
// app/api/auth/callback/route.ts) for a short-lived Graph access token.
// Access tokens expire in ~1 hour, and this route runs in a serverless
// environment with no reliable in-memory cache between invocations, so we
// just mint a fresh one on every send rather than trying to cache it.
type TokenResponse = {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
};

type TokenErrorResponse = {
  error: string;
  error_description: string;
};

export async function getGraphAccessToken(): Promise<string> {
  const { ENTRA_TENANT_ID, ENTRA_CLIENT_ID, ENTRA_CLIENT_SECRET, ENTRA_REFRESH_TOKEN } =
    process.env;

  if (!ENTRA_TENANT_ID || !ENTRA_CLIENT_ID || !ENTRA_CLIENT_SECRET || !ENTRA_REFRESH_TOKEN) {
    throw new Error(
      "Missing ENTRA_TENANT_ID / ENTRA_CLIENT_ID / ENTRA_CLIENT_SECRET / ENTRA_REFRESH_TOKEN env vars"
    );
  }

  const res = await fetch(
    `https://login.microsoftonline.com/${ENTRA_TENANT_ID}/oauth2/v2.0/token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: ENTRA_CLIENT_ID,
        client_secret: ENTRA_CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: ENTRA_REFRESH_TOKEN,
        scope: "offline_access Mail.Send",
      }),
    }
  );

  const data: TokenResponse & Partial<TokenErrorResponse> = await res.json();

  if (!res.ok) {
    throw new Error(`Graph token refresh failed: ${data.error_description ?? data.error}`);
  }

  // Microsoft sometimes rotates the refresh token on use. We have no
  // durable place to write a new value back into (env vars are read-only
  // at runtime), so just warn — the old token typically stays valid for a
  // while after rotation, and refresh tokens are good for ~90 days of
  // inactivity regardless.
  if (data.refresh_token && data.refresh_token !== ENTRA_REFRESH_TOKEN) {
    console.warn(
      "Graph issued a new refresh_token. If sends start failing, re-run the auth flow and update ENTRA_REFRESH_TOKEN."
    );
  }

  return data.access_token;
}
