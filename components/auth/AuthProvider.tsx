"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";

export type DropstageUser = {
  name: string;
  email: string;
  picture?: string;
};

type AuthContextValue = {
  user: DropstageUser | null;
  oauthEnabled: boolean;
  setUser: (user: DropstageUser | null) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);
const STORAGE_KEY = "dropstage_user";

function LocalSessionProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<DropstageUser | null>(null);
  const oauthEnabled = Boolean(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) setUserState(JSON.parse(saved) as DropstageUser);
    } catch {
      // localStorage can be unavailable in privacy modes; the app still works.
    }
  }, []);

  const setUser = useCallback((nextUser: DropstageUser | null) => {
    setUserState(nextUser);
    try {
      if (nextUser) {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
      } else {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // Keep the session in memory when persistence is unavailable.
    }
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      oauthEnabled,
      setUser,
      signOut: () => setUser(null),
    }),
    [oauthEnabled, setUser, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  if (!clientId) {
    return <LocalSessionProvider>{children}</LocalSessionProvider>;
  }

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <LocalSessionProvider>{children}</LocalSessionProvider>
    </GoogleOAuthProvider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
