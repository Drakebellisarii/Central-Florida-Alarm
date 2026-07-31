"use client";

import { useEffect, useState } from "react";
import { HONEYPOT_FIELD, TIMESTAMP_FIELD } from "@/lib/formFields";

/**
 * Hidden anti-bot inputs shared by every form that posts to /api/send:
 * a honeypot decoy and a mount timestamp. Validated in lib/formGuard.ts.
 *
 * The honeypot is positioned off-screen rather than display:none — some
 * bots skip fields they can tell are hidden. It's kept out of the
 * accessibility tree and the tab order (aria-hidden + tabIndex -1) so a
 * screen-reader or keyboard user is never offered a field that would
 * silently discard their submission.
 */
export function FormGuardFields() {
  // Stamped after mount, not during render: a value computed while
  // server-rendering would be the build/request time, making every
  // submission look hours old.
  const [mountedAt, setMountedAt] = useState("");
  useEffect(() => setMountedAt(String(Date.now())), []);

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden"
      >
        <label htmlFor={HONEYPOT_FIELD}>Website</label>
        <input
          type="text"
          id={HONEYPOT_FIELD}
          name={HONEYPOT_FIELD}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <input type="hidden" name={TIMESTAMP_FIELD} value={mountedAt} readOnly />
    </>
  );
}
