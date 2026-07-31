/**
 * Field names shared by the client forms and the server guard. Kept in their
 * own module (free of any server-only imports) so <FormGuardFields> can pull
 * them in without dragging the guard's runtime into the client bundle.
 */

/** Hidden decoy input. Humans never see it; bots fill every field they find. */
export const HONEYPOT_FIELD = "website";

/** Epoch ms stamped when the form mounted — see checkTiming in formGuard. */
export const TIMESTAMP_FIELD = "_ts";

/**
 * Pulls a displayable message off a failed /api/send response.
 *
 * Only the rate-limit reply (429) carries copy written for a human to read;
 * every other failure is either something the client already validated or an
 * internal fault, so those fall back to each form's own error wording rather
 * than surfacing server text.
 */
export async function readServerMessage(res: Response): Promise<string | null> {
  if (res.status !== 429) return null;
  try {
    const body = await res.json();
    return typeof body?.error === "string" ? body.error : null;
  } catch {
    return null;
  }
}
