"use client";

import Script from "next/script";
import { useCallback, useRef, useState } from "react";

type GoogleCredentialResponse = { credential?: string };

type GoogleUser = {
  email?: string;
  name?: string;
  picture?: string;
};

function GoogleLogo() {
  return (
    <svg viewBox="-3 0 262 262" aria-hidden="true" className="size-5" preserveAspectRatio="xMidYMid">
      <path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4" />
      <path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853" />
      <path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05" />
      <path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335" />
    </svg>
  );
}

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
          className="inline-flex cursor-pointer h-11 items-center justify-center gap-3 rounded-full border border-black/15 bg-white px-5 text-sm font-semibold shadow-[0_1px_0_rgba(0,0,0,.05)] transition hover:-translate-y-0.5 hover:border-black/30"
        >
          <GoogleLogo />
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
