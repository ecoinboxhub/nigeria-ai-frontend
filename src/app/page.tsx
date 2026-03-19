"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  ArrowRight, 
  HardHat, 
  BarChart3, 
  ShieldCheck, 
  Zap, 
  Building2,
  Mail,
  MapPin,
  Phone,
  Globe,
  Monitor
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans selection:bg-primary/20">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-xl shadow-lg shadow-primary/20">
                <HardHat className="w-6 h-6 text-white" />
             </div>
             <div className="flex flex-col">
                <span className="text-lg font-black tracking-tighter text-foreground leading-none">STRUCTURE.AI</span>
                <span className="text-[10px] font-black text-primary tracking-[0.2em] uppercase">Nigeria</span>
             </div>
          </div>
          <div className="hidden md:flex items-center gap-8 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
             <a href="#platform" className="hover:text-primary transition-colors">Platform</a>
             <a href="#solutions" className="hover:text-primary transition-colors">Infrastructure</a>
             <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
          </div>
          <div className="flex items-center gap-4">
             <Link href="/login" className="text-[10px] font-black uppercase tracking-widest text-foreground hover:text-primary transition-colors">
               Sign In
             </Link>
             <Link href="/login" className="bg-primary text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-lg shadow-primary/10">
               Get Started
             </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 pt-32 pb-20 px-6 relative overflow-hidden flex flex-col items-center justify-center min-h-screen">
        {/* Abstract Background Shapes */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-400/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-primary">Enterprise Construction Intelligence v4.0</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black text-foreground tracking-tighter leading-[0.95] uppercase">
              Build Nigeria&apos;s <br />
              <span className="text-primary">Next Mega-Project.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
              The industry-standard AI platform for Nigerian infrastructure. Real-time cost forecasting, computer vision site monitoring, and legal compliance.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <Link href="/login" className="w-full sm:w-auto bg-primary text-white px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-2xl shadow-primary/30 flex items-center justify-center gap-3 group">
                Access Workspace
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="#platform" className="w-full sm:w-auto bg-white border border-border text-foreground px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-secondary transition-all flex items-center justify-center">
                Platform Tour
              </a>
            </div>
          </motion.div>
        </div>

        {/* Dashboard Preview */}
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="w-full max-w-6xl mx-auto mt-24 relative z-10"
        >
          <div className="bg-white rounded-[2.5rem] p-4 border border-border shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] overflow-hidden">
             <div className="bg-slate-50 rounded-[2rem] border border-border overflow-hidden aspect-[16/10] relative flex">
                {/* Sidebar Mock */}
                <div className="w-48 bg-white border-r border-border p-6 space-y-4 hidden md:block">
                   <div className="w-full h-8 bg-secondary rounded-lg" />
                   <div className="space-y-2 pt-4">
                      {[1,2,3,4,5].map(i => <div key={i} className={`w-full h-4 ${i===1 ? 'bg-primary/20' : 'bg-secondary'} rounded`} />)}
                   </div>
                </div>
                {/* Main Mock */}
                <div className="flex-1 p-8 space-y-8">
                   <div className="flex justify-between items-center">
                      <div className="w-48 h-10 bg-white border border-border rounded-xl" />
                      <div className="flex gap-2">
                         <div className="w-10 h-10 bg-white border border-border rounded-xl" />
                         <div className="w-10 h-10 bg-primary rounded-xl" />
                      </div>
                   </div>
                   <div className="grid grid-cols-3 gap-6">
                      <div className="h-32 bg-white border border-border rounded-2xl shadow-sm" />
                      <div className="h-32 bg-white border border-border rounded-2xl shadow-sm" />
                      <div className="h-32 bg-slate-900 rounded-2xl shadow-lg" />
                   </div>
                   <div className="flex-1 bg-white border border-border rounded-3xl p-8 relative overflow-hidden h-64">
                      <BarChart3 className="absolute bottom-8 right-8 w-32 h-32 text-slate-100" />
                   </div>
                </div>
             </div>
          </div>
        </motion.div>
      </main>

      {/* Feature Section */}
      <section id="platform" className="py-32 bg-slate-50">
         <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
               <div>
                  <h2 className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-4">Core Infrastructure</h2>
                  <h3 className="text-4xl lg:text-5xl font-black text-foreground tracking-tighter mb-8 uppercase leading-tight">
                    Optimized for Nigerian <br />
                    Market Dynamics.
                  </h3>
                  <div className="space-y-6">
                     {[
                       { t: "Currency-Aware ML", d: "Automatic pricing adjustments based on parallel market rates (₦) and global steel futures." },
                       { t: "COREN Compliance", d: "AI-driven document auditing against Nigerian engineering standards and building codes." },
                       { t: "Regional Telemetry", d: "Localized weather monitoring for Lagos, Abuja, and Port Harcourt coastal work." }
                     ].map((item, i) => (
                       <div key={i} className="flex gap-6 p-6 bg-white rounded-2xl border border-border shadow-sm">
                          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0 border border-blue-100">
                             <ShieldCheck className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                             <h4 className="font-bold text-foreground mb-1">{item.t}</h4>
                             <p className="text-sm text-muted-foreground font-medium leading-relaxed">{item.d}</p>
                          </div>
                       </div>
                     ))}
                  </div>
               </div>
               <div className="grid grid-cols-2 gap-6 pb-20">
                  <div className="bg-primary p-8 rounded-[2.5rem] shadow-2xl shadow-primary/30 flex flex-col justify-between aspect-square mt-20">
                     <Globe className="w-10 h-10 text-white/50" />
                     <h4 className="text-white text-3xl font-black tracking-tighter uppercase leading-none">10<br/><span className="text-lg opacity-60">Modules</span></h4>
                  </div>
                  <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl flex flex-col justify-between aspect-square">
                     <Zap className="w-10 h-10 text-primary" />
                     <h4 className="text-white text-3xl font-black tracking-tighter uppercase leading-none">99.9%<br/><span className="text-lg opacity-40 text-slate-400">Uptime</span></h4>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-white relative overflow-hidden border-t border-border">
         <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
               <h2 className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-4">Partner With Us</h2>
               <h3 className="text-4xl lg:text-6xl font-black text-foreground tracking-tighter mb-8 uppercase leading-tight">Scale Your <br />Operations.</h3>
               <p className="text-lg text-muted-foreground font-medium mb-12 max-w-md">Our engineering team is ready to deploy localized AI infrastructure for your next project.</p>
               
               <div className="space-y-8">
                  <div className="flex items-center gap-6">
                     <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center border border-blue-100 text-primary">
                        <MapPin className="w-6 h-6" />
                     </div>
                     <div>
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">HQ - Lagos</p>
                        <p className="font-black text-foreground">Victoria Island Hub, Lagos</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-6">
                     <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center border border-blue-100 text-primary">
                        <Mail className="w-6 h-6" />
                     </div>
                     <div>
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Support</p>
                        <p className="font-black text-foreground">enterprise@structure.ai</p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="bg-white p-10 rounded-[2.5rem] border border-border shadow-2xl">
               <form className="space-y-6">
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest pl-2">Full Name</label>
                     <input type="text" className="w-full bg-secondary/50 border border-border px-5 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm font-medium" placeholder="Engr. Adebayo..." />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest pl-2">Enterprise Email</label>
                     <input type="email" className="w-full bg-secondary/50 border border-border px-5 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm font-medium" placeholder="name@company.os" />
                  </div>
                  <textarea rows={4} className="w-full bg-secondary/50 border border-border px-5 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm font-medium resize-none" placeholder="Project details or inquiry..." />
                  <button className="w-full bg-primary text-white font-black text-[10px] uppercase tracking-[0.2em] py-5 rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all">
                     Request Access
                  </button>
               </form>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-50 border-t border-border">
         <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
               <Monitor className="w-4 h-4 text-primary" />
               <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">© 2026 STRUCTURE.AI Nigeria Ltd</span>
            </div>
            <div className="flex gap-10">
               <a href="#" className="text-[10px] font-black text-muted-foreground hover:text-primary uppercase tracking-widest transition-colors">Documentation</a>
               <a href="#" className="text-[10px] font-black text-muted-foreground hover:text-primary uppercase tracking-widest transition-colors">Privacy</a>
               <a href="#" className="text-[10px] font-black text-muted-foreground hover:text-primary uppercase tracking-widest transition-colors">Status</a>
            </div>
         </div>
      </footer>
    </div>
  );
}
