"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, User, Loader2, HardHat, ArrowRight, ShieldCheck, Terminal } from "lucide-react";
import api from "@/lib/api";
import { supabase } from "@/lib/supabase";
import type { Provider } from "@supabase/supabase-js";
import Link from "next/link";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const target = e.target as any;
    const email = target[0].value;
    const password = target[1].value;

    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.access_token);
      router.push("/dashboard/projects");
    } catch (err: any) {
      const detail = err.response?.data?.detail || "Authentication failed. Node unreachable.";
      setError(typeof detail === 'object' ? JSON.stringify(detail) : detail);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'github' | 'yahoo') => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider as Provider,
        options: {
          redirectTo: `${window.location.origin}/dashboard/projects`
        }
      });
      if (error) throw error;
    } catch (err: any) {
      const msg = err.message || "Auth failed";
      setError(typeof msg === 'object' ? JSON.stringify(msg) : msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white font-sans overflow-hidden">
      {/* Left: Login Form */}
      <div className="w-full lg:w-[40%] flex flex-col justify-between p-8 sm:p-16 lg:p-20 bg-white relative z-10 border-r border-border">
        {/* Branding */}
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-xl shadow-lg shadow-primary/20">
              <HardHat className="w-6 h-6 text-white" />
           </div>
            <div className="flex flex-col">
               <span className="text-lg font-black tracking-tighter text-foreground leading-none">ConstructionAI</span>
               <span className="text-[8px] font-black text-primary tracking-[0.2em] uppercase">ConstructionAI WorkSpace</span>
            </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm mx-auto my-auto"
        >
          <div className="mb-10">
            <h1 className="text-4xl font-black text-foreground mb-3 tracking-tighter uppercase">
              Identity <br />Verification.
            </h1>
            <p className="text-sm text-muted-foreground font-medium leading-relaxed">
              Access the high-availability infrastructure node for localized project intelligence.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-[10px] font-black uppercase tracking-widest text-center">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <div className="flex justify-between pl-1">
                 <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Work Email</label>
                 <span className="text-[8px] font-black text-primary uppercase">v4.2.1-Node</span>
              </div>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input 
                  type="email" 
                  required
                  className="w-full bg-slate-50 border border-border rounded-2xl px-12 py-4 text-sm font-bold placeholder:text-muted-foreground/40 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all shadow-sm"
                  placeholder="admin@ Lagos_Hub"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between pl-1">
                 <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Private Key</label>
                 <a href="#" className="text-[10px] font-black text-primary hover:underline transition-all uppercase">RECOVER</a>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input 
                  type="password" 
                  required
                  className="w-full bg-slate-50 border border-border rounded-2xl px-12 py-4 text-sm font-bold placeholder:text-muted-foreground/40 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all shadow-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button 
              disabled={loading}
              className="w-full bg-primary text-white font-black text-[10px] uppercase tracking-[0.2em] py-5 rounded-2xl shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 mt-6"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                   <Loader2 className="w-4 h-4 animate-spin" />
                   <span>Verifying Cluster...</span>
                </div>
              ) : (
                <>
                  Enter Workspace
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px bg-border flex-1" />
              <span className="text-[8px] font-black text-muted-foreground uppercase tracking-widest">or secure link</span>
              <div className="h-px bg-border flex-1" />
            </div>

            <div className="grid grid-cols-3 gap-3">
               <button 
                onClick={() => handleSocialLogin('google')}
                className="flex items-center justify-center gap-2 p-3 border border-border rounded-xl hover:bg-slate-50 transition-all flex-col sm:flex-row"
               >
                  <Terminal className="w-4 h-4 text-primary" />
                  <span className="text-[8px] font-black text-foreground">GMAIL</span>
               </button>
               <button 
                onClick={() => handleSocialLogin('github')}
                className="flex items-center justify-center gap-2 p-3 border border-border rounded-xl hover:bg-slate-50 transition-all flex-col sm:flex-row"
               >
                  <Terminal className="w-4 h-4 text-primary" />
                  <span className="text-[8px] font-black text-foreground">GITHUB</span>
               </button>
               <button 
                onClick={() => handleSocialLogin('yahoo' as any)}
                className="flex items-center justify-center gap-2 p-3 border border-border rounded-xl hover:bg-slate-50 transition-all flex-col sm:flex-row"
               >
                  <Terminal className="w-4 h-4 text-primary" />
                  <span className="text-[8px] font-black text-foreground">YAHOO</span>
               </button>
            </div>
          </div>

          <div className="mt-8 text-center">
             <p className="text-xs text-muted-foreground font-medium">
                New to the platform? <Link href="/register" className="text-primary font-black uppercase hover:underline">User Registration</Link>
             </p>
          </div>

        </motion.div>

        {/* Footer info */}
        <div className="flex justify-between items-center text-[8px] font-black text-slate-400 uppercase tracking-widest mt-12">
           <div className="flex items-center gap-2">
              <Terminal className="w-3 h-3" />
              <span>System: ONLINE</span>
           </div>
           <span>ConstructionAI v4.0</span>
        </div>
      </div>

      {/* Right: Graphic Hero with Nigerian Context */}
      <div className="hidden lg:flex w-[60%] relative flex-col justify-between p-20 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=2071&auto=format&fit=crop')] bg-cover bg-center grayscale opacity-60" />
        {/* Dynamic primary pulse overlay */}
        <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        
        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:40px_40px]" />

        <div className="relative z-10 flex flex-col h-full justify-between">
           <div className="max-w-md">
              <div className="w-16 h-1.5 bg-primary mb-10 rounded-full" />
              <h2 className="text-6xl font-black text-white leading-[0.9] tracking-tighter uppercase mb-8">
                 Precision <br />Engineering. <br />
                 <span className="text-primary">AI Scale.</span>
              </h2>
              <p className="text-slate-400 font-medium text-lg leading-relaxed">
                 From Eko Atlantic coastal infrastructure to Abuja regional hubs, STRUCTURE.AI provides the localized intelligence needed to build at continental scale.
              </p>
           </div>
           
           <div className="grid grid-cols-3 gap-10">
              <div>
                 <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">Network Latency</p>
                 <p className="text-2xl font-black text-white">42ms</p>
              </div>
              <div>
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Active Projects</p>
                 <p className="text-2xl font-black text-white">842</p>
              </div>
              <div>
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">AI Utilization</p>
                 <p className="text-2xl font-black text-white">92%</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
