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
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://nigeria-ai-backend.onrender.com/api/v1';
      console.log("[AuthContext] Syncing with backend at:", apiUrl);
      
      const { user } = session;
      const res = await api.post("/auth/social-sync", {
        email: user.email,
        username: user.user_metadata?.full_name || user.email.split("@")[0],
        provider: user.app_metadata?.provider || "email",
        supabase_id: user.id
      });

      console.log("[AuthContext] Sync successful:", res.data);
      if (res.data.access_token) {
        localStorage.setItem("token", res.data.access_token);
      }
    } catch (err: any) {
      console.error("[AuthContext] Sync failed!");
      if (err.response) {
        console.error("HTTP status:", err.response.status);
        console.error("Error response data:", err.response.data);
        const detail = err.response.data?.detail || "Unknown backend error";
        console.error("Backend Error Detail:", detail);
      } else if (err.request) {
        console.error("No response received from backend. Check CORS or if backend is UP.");
        console.error("Request Details:", err.request);
      } else {
        console.error("Error setting up request:", err.message);
      }
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
