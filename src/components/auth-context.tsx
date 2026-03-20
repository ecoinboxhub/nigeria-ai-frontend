"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import api from "@/lib/api";

interface AuthContextType {
  user: any;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Check initial session
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        await syncWithBackend(session);
      }
      setLoading(false);
    };

    checkSession();

    // 2. Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth event:", event);
      if (session) {
        if (event === "SIGNED_IN" || event === "INITIAL_SESSION") {
          await syncWithBackend(session);
        }
        setUser(session.user);
      } else {
        setUser(null);
        localStorage.removeItem("token");
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const syncWithBackend = async (session: any) => {
    try {
      const { user, access_token } = session;
      const res = await api.post("/auth/social-sync", {
        email: user.email,
        full_name: user.user_metadata?.full_name || user.email.split("@")[0],
        provider: user.app_metadata?.provider || "email",
        supabase_id: user.id
      });

      if (res.data.access_token) {
        localStorage.setItem("token", res.data.access_token);
        console.log("Backend sync successful");
      }
    } catch (error) {
      console.error("Failed to sync with backend:", error);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
