"use client";

import { useState } from "react";
import { LogOut } from "lucide-react";
import { useGoogleLogin } from "@react-oauth/google";
import { useAuth, type DropstageUser } from "./AuthProvider";

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      <path fill="#4285F4" d="M21.6 12.23c0-.71-.06-1.4-.18-2.07H12v3.92h5.38a4.6 4.6 0 0 1-2 3.02v2.55h3.23c1.9-1.74 2.99-4.31 2.99-7.42Z" />
      <path fill="#34A853" d="M12 22c2.7 0 4.97-.9 6.62-2.35l-3.23-2.55c-.9.6-2.04.96-3.39.96-2.61 0-4.82-1.76-5.61-4.13H3.05v2.61A10 10 0 0 0 12 22Z" />
      <path fill="#FBBC05" d="M6.39 13.93A6.04 6.04 0 0 1 6.07 12c0-.67.11-1.32.32-1.93V7.46H3.05A10 10 0 0 0 2 12c0 1.62.39 3.15 1.05 4.54l3.34-2.61Z" />
      <path fill="#EA4335" d="M12 5.94c1.47 0 2.78.5 3.82 1.49l2.87-2.87A9.62 9.62 0 0 0 12 2a10 10 0 0 0-8.95 5.46l3.34 2.61C7.18 7.7 9.39 5.94 12 5.94Z" />
    </svg>
  );
}

function ConfiguredGoogleButton({ compact = false }: { compact?: boolean }) {
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const login = useGoogleLogin({
    scope: "openid profile email",
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      try {
        const response = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        if (!response.ok) throw new Error("Could not load Google profile");
        const profile = (await response.json()) as DropstageUser;
        setUser(profile);
      } finally {
        setLoading(false);
      }
    },
    onError: () => setLoading(false),
  });

  return (
    <button
      type="button"
      onClick={() => login()}
      disabled={loading}
      className={`inline-flex items-center justify-center gap-2 rounded-full border border-black/12 bg-white font-medium shadow-[0_1px_0_rgba(0,0,0,.05)] transition hover:-translate-y-0.5 hover:border-black/25 disabled:opacity-60 ${
        compact ? "h-9 px-3 text-xs" : "h-10 px-4 text-sm"
      }`}
    >
      <GoogleMark /> {loading ? "Connecting…" : "Continue with Google"}
    </button>
  );
}

export function GoogleSignInButton({ compact = false }: { compact?: boolean }) {
  const { user, signOut, oauthEnabled } = useAuth();
  const [showHint, setShowHint] = useState(false);

  if (user) {
    return (
      <div className="flex items-center gap-2">
        {user.picture ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={user.picture} alt="" className="h-8 w-8 rounded-full border border-black/10" />
        ) : null}
        <button
          type="button"
          onClick={signOut}
          className="inline-flex h-9 items-center gap-2 rounded-full border border-black/10 bg-white px-3 text-xs font-medium transition hover:border-black/25"
        >
          <span className="hidden sm:inline">{user.name?.split(" ")[0] || "Account"}</span>
          <LogOut size={14} />
        </button>
      </div>
    );
  }

  if (oauthEnabled) return <ConfiguredGoogleButton compact={compact} />;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setShowHint((value) => !value)}
        className={`inline-flex items-center justify-center gap-2 rounded-full border border-black/12 bg-white font-medium transition hover:-translate-y-0.5 hover:border-black/25 ${
          compact ? "h-9 px-3 text-xs" : "h-10 px-4 text-sm"
        }`}
      >
        <GoogleMark /> Sign in
      </button>
      {showHint ? (
        <div className="absolute right-0 top-12 z-50 w-64 rounded-2xl border border-black/10 bg-[#11110f] p-4 text-left text-xs leading-5 text-white shadow-2xl">
          Add <code className="text-[#d9ff56]">NEXT_PUBLIC_GOOGLE_CLIENT_ID</code> to <code>.env.local</code> to enable Google OAuth.
        </div>
      ) : null}
    </div>
  );
}
