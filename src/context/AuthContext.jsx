/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { isKnownUser, login as loginService } from "../services/authService";

const AUTH_KEY = "eb-auth-session";
const SESSION_VERSION = 1;
const AuthContext = createContext(null);

function loadSession() {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    const session = raw ? JSON.parse(raw) : null;
    if (!session || session.version !== SESSION_VERSION || !isKnownUser(session)) {
      localStorage.removeItem(AUTH_KEY);
      return null;
    }
    return session;
  } catch {
    localStorage.removeItem(AUTH_KEY);
    return null;
  }
}

function saveSession(session) {
  if (!session) {
    localStorage.removeItem(AUTH_KEY);
    return;
  }
  localStorage.setItem(AUTH_KEY, JSON.stringify(session));
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => loadSession());
  const [ready] = useState(true);

  const signIn = useCallback(async (userId, password) => {
    const result = await loginService(userId, password);
    if (!result.success) return result;

    const session = {
      version: SESSION_VERSION,
      id: result.user.id,
      name: result.user.name,
      userId: result.user.userId,
      signedInAt: new Date().toISOString(),
    };

    setUser(session);
    saveSession(session);

    return { success: true, user: session };
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
    saveSession(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      ready,
      isAuthenticated: Boolean(user),
      signIn,
      signOut,
    }),
    [ready, signIn, signOut, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
