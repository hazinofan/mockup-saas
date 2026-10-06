"use client";

import Script from "next/script";
import { useCallback, useRef, useState } from "react";

type GoogleCredentialResponse = { credential?: string };

type GoogleUser = {
  email?: string;
  name?: string;
  picture?: string;
};

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: GoogleCredentialResponse) => void;
          }) => void;
          renderButton: (
            element: HTMLElement,
            options: Record<string, string | number | boolean>,
          ) => void;
        };
      };
    };
  }
}

function decodeCredential(token: string): GoogleUser {
  try {
    const payload = token.split(".")[1];
    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
    const bytes = Uint8Array.from(atob(padded), (char) => char.charCodeAt(0));
    return JSON.parse(new TextDecoder().decode(bytes));
  } catch {
    return {};
  }
}

export function GoogleSignIn({ compact = false }: { compact?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState("");
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  const initialize = useCallback(() => {
    if (!clientId || !window.google || !containerRef.current) return;

    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: ({ credential }) => {
        if (!credential) return;
        const user = decodeCredential(credential);
        localStorage.setItem("nativeframe_google_user", JSON.stringify(user));
        setMessage(user.email ? `Signed in as ${user.email}` : "Signed in");
        window.location.assign("/studio");
      },
    });

    containerRef.current.innerHTML = "";
    window.google.accounts.id.renderButton(containerRef.current, {
      type: "standard",
      theme: "outline",
      size: compact ? "medium" : "large",
      shape: "pill",
      text: "continue_with",
      width: compact ? 190 : 230,
    });
  }, [clientId, compact]);

  if (!clientId) {
    return (
      <div className="flex flex-col items-start gap-2">
        <button
          type="button"
          onClick={() => setMessage("Add NEXT_PUBLIC_GOOGLE_CLIENT_ID in .env.local to enable Google OAuth.")}
          className="inline-flex h-11 items-center justify-center gap-3 rounded-full border border-black/15 bg-white px-5 text-sm font-semibold shadow-[0_1px_0_rgba(0,0,0,.05)] transition hover:-translate-y-0.5 hover:border-black/30"
        >
          <span className="grid size-5 place-items-center rounded-full border border-black/10 text-[11px] font-bold">G</span>
          Continue with Google
        </button>
        {message ? <p className="max-w-64 text-xs text-black/55">{message}</p> : null}
      </div>
    );
  }

  return (
    <>
      <Script src="https://accounts.google.com/gsi/client" strategy="afterInteractive" onLoad={initialize} />
      <div ref={containerRef} />
      {message ? <p className="mt-2 text-xs text-black/55">{message}</p> : null}
    </>
  );
}
