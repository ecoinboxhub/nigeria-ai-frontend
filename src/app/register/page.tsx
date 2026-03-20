"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, User, Loader2, HardHat, ArrowRight, ShieldCheck, Mail, Github, Chrome } from "lucide-react";
import Link from "next/link";
import api from "@/lib/api";
import { createClient } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await api.post("/auth/register", {
        ...formData,
        role: "analyst"
      });
      // After registration, redirect to login
      router.push("/login?registered=true");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Registration failed. Verification node timeout.");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'github' | 'yahoo') => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/dashboard/projects`
        }
      });
      if (error) throw error;
    } catch (err: any) {
      setError(`Auth failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white font-sans overflow-hidden">
      {/* Left: Register Form */}
      <div className="w-full lg:w-[40%] flex flex-col justify-between p-8 sm:p-16 lg:p-20 bg-white relative z-10 border-r border-border">
        {/* Branding */}
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-xl shadow-lg shadow-primary/20">
              <HardHat className="w-6 h-6 text-white" />
           </div>
           <div className="flex flex-col">
              <span className="text-lg font-black tracking-tighter text-foreground leading-none">STRUCTURE.AI</span>
              <span className="text-[8px] font-black text-primary tracking-[0.2em] uppercase">Identity Service</span>
           </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm mx-auto my-auto"
        >
          <div className="mb-10">
            <h1 className="text-4xl font-black text-foreground mb-3 tracking-tighter uppercase">
              Join the <br />Network.
            </h1>
            <p className="text-sm text-muted-foreground font-medium leading-relaxed">
              Provision your identity on the Nigeria Construction AI Platform to access site-specific intelligence.
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-[10px] font-black uppercase tracking-widest text-center">
                {error}
              </div>
            )}
            
            <div className="space-y-1.5">
               <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest pl-1">Display Name</label>
               <div className="relative group">
                 <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                 <input 
                   type="text" 
                   required
                   value={formData.username}
                   onChange={(e) => setFormData({...formData, username: e.target.value})}
                   className="w-full bg-slate-50 border border-border rounded-2xl px-12 py-3.5 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all shadow-sm"
                   placeholder="Adebayo Ogunleye"
                 />
               </div>
            </div>

            <div className="space-y-1.5">
               <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest pl-1">Work Email</label>
               <div className="relative group">
                 <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                 <input 
                   type="email" 
                   required
                   value={formData.email}
                   onChange={(e) => setFormData({...formData, email: e.target.value})}
                   className="w-full bg-slate-50 border border-border rounded-2xl px-12 py-3.5 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all shadow-sm"
                   placeholder="adebayo@ Lagos_Hub"
                 />
               </div>
            </div>

            <div className="space-y-1.5">
               <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest pl-1">Secure Key</label>
               <div className="relative group">
                 <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                 <input 
                   type="password" 
                   required
                   minLength={8}
                   value={formData.password}
                   onChange={(e) => setFormData({...formData, password: e.target.value})}
                   className="w-full bg-slate-50 border border-border rounded-2xl px-12 py-3.5 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all shadow-sm"
                   placeholder="••••••••"
                 />
               </div>
            </div>

            <button 
              disabled={loading}
              className="w-full bg-primary text-white font-black text-[10px] uppercase tracking-[0.2em] py-5 rounded-2xl shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 mt-8"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                   <Loader2 className="w-4 h-4 animate-spin" />
                   <span>Provisioning Node...</span>
                </div>
              ) : (
                <>
                  Register Identity
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px bg-border flex-1" />
              <span className="text-[8px] font-black text-muted-foreground uppercase tracking-widest">or cluster link</span>
              <div className="h-px bg-border flex-1" />
            </div>

            <div className="grid grid-cols-3 gap-3">
               <button 
                onClick={() => handleSocialLogin('google')}
                className="flex items-center justify-center gap-2 p-3 border border-border rounded-xl hover:bg-slate-50 transition-all"
               >
                  <Chrome className="w-4 h-4" />
                  <span className="text-[8px] font-black text-foreground">GMAIL</span>
               </button>
               <button 
                onClick={() => handleSocialLogin('github')}
                className="flex items-center justify-center gap-2 p-3 border border-border rounded-xl hover:bg-slate-50 transition-all"
               >
                  <Github className="w-4 h-4" />
                  <span className="text-[8px] font-black text-foreground">GITHUB</span>
               </button>
               <button 
                onClick={() => handleSocialLogin('yahoo' as any)}
                className="flex items-center justify-center gap-2 p-3 border border-border rounded-xl hover:bg-slate-50 transition-all"
               >
                  <Mail className="w-4 h-4" />
                  <span className="text-[8px] font-black text-foreground">YAHOO</span>
               </button>
            </div>
          </div>

          <div className="mt-8 text-center">
             <p className="text-xs text-muted-foreground font-medium">
                Distributed ledger account exists? <Link href="/login" className="text-primary font-black uppercase hover:underline">Sign In</Link>
             </p>
          </div>
        </motion.div>

        <div className="flex justify-between items-center text-[8px] font-black text-slate-400 uppercase tracking-widest mt-12">
           <span>STRUCTURE.AI v4.0</span>
           <span>SECURE ENDPOINT: HUB-LAG-01</span>
        </div>
      </div>

      {/* Right: Graphic Hero */}
      <div className="hidden lg:flex w-[60%] relative flex-col justify-between p-20 overflow-hidden bg-slate-900 border-l border-white/5">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=2071&auto=format&fit=crop')] bg-cover bg-center grayscale opacity-60" />
        <div className="absolute inset-0 bg-primary/30 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
        
        <div className="relative z-10">
           <div className="w-16 h-1.5 bg-primary mb-10 rounded-full" />
           <h2 className="text-6xl font-black text-white leading-none tracking-tighter uppercase mb-8">
              Decentralized <br />Engineering <br />
              <span className="text-primary">Intelligence.</span>
           </h2>
        </div>
      </div>
    </div>
  );
}
