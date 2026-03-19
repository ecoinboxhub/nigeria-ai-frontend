"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import { motion } from "framer-motion";
import { 
  Users, 
  Calendar, 
  Briefcase, 
  Map, 
  Clock, 
  BrainCircuit,
  Maximize2,
  ChevronRight,
  Zap,
  MoreVertical,
  Search,
  Plus,
  Activity
} from "lucide-react";

export default function WorkforceScheduler() {
  const [isOptimized, setIsOptimized] = useState(false);
  
  const mutation = useMutation({
    mutationFn: async () => {
      const res = await api.post("/workforce/optimize", {
        groups: [
          { role: "Civil", required: 300, available: 280 },
          { role: "MEP", required: 150, available: 160 },
          { role: "Welder", required: 400, available: 380 },
          { role: "Finisher", required: 200, available: 220 }
        ]
      });
      return res.data;
    },
    onSuccess: () => {
      setIsOptimized(true);
    }
  });

  const sites = [
    { name: "Eko Atlantic Phase 2", crew: "Alpha Civil", load: isOptimized ? 95 : 85, status: isOptimized ? "Stable" : "Critical", color: isOptimized ? "bg-primary" : "bg-red-500", raw: 340, trend: "+12%" },
    { name: "Abuja Tech Hub", crew: "Beta MEP", load: 45, status: "Active", color: "bg-primary", raw: 180, trend: "-5%" },
    { name: "Port Harcourt Bridge", crew: "Delta Welding", load: isOptimized ? 98 : 92, status: isOptimized ? "Active" : "Critical", color: isOptimized ? "bg-primary" : "bg-slate-900", raw: 420, trend: "+2%" },
    { name: "Lekki Smart City", crew: "Zeta Finishing", load: 70, status: "Active", color: "bg-blue-400", raw: 240, trend: "+8%" },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      {/* Header & Controls */}
      <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest mb-1">
             <BrainCircuit className="w-3 h-3" />
             <span>Neural Resource Planner v2.1</span>
           </div>
           <h1 className="text-2xl font-black text-foreground tracking-tight uppercase">Workforce Intelligence</h1>
           <p className="text-sm text-muted-foreground font-medium">Optimizing 1,240 workers across Nigerian regional hubs</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
           <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-secondary/50 border border-border px-4 py-2.5 rounded-xl text-xs font-black text-foreground hover:bg-secondary transition-all">
             <Search className="w-4 h-4" />
             SEARCH CREW
           </button>
           <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-primary px-4 py-2.5 rounded-xl text-xs font-black text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/20 transition-all">
             <Plus className="w-4 h-4" />
             ADD SHIFT
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Metrics & Recommendations */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-white p-6 rounded-2xl border border-border shadow-sm space-y-6">
              <h3 className="text-xs font-black text-foreground uppercase tracking-widest flex items-center gap-2">
                 <Zap className="w-4 h-4 text-primary" />
                 Shift Performance
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                 {[
                   { label: "Active Nodes", val: "14", icon: Map },
                   { label: "AI Confidence", val: "94%", icon: BrainCircuit },
                 ].map((stat, i) => (
                   <div key={i} className="p-4 bg-secondary/30 rounded-2xl border border-border">
                      <stat.icon className="w-4 h-4 text-primary mb-2" />
                      <p className="text-[10px] font-black text-muted-foreground uppercase">{stat.label}</p>
                      <p className="text-xl font-black text-foreground">{stat.val}</p>
                   </div>
                 ))}
              </div>

              <div className="p-5 bg-primary/5 border border-primary/20 rounded-2xl space-y-3 relative overflow-hidden">
                 <div className="relative z-10">
                    <h4 className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-2 mb-2">
                       <Briefcase className="w-4 h-4" />
                       RL-Optimization Tip
                    </h4>
                    <p className="text-xs text-foreground/80 font-medium leading-relaxed italic">
                      "RL Model suggests re-routing 4 workers from Abuja to Port Harcourt night shift to mitigate 15hr bottleneck."
                    </p>
                 </div>
                 <BrainCircuit className="absolute -right-4 -bottom-4 w-24 h-24 text-primary/5" />
              </div>

               <button 
                 onClick={() => mutation.mutate()}
                 disabled={mutation.isPending}
                 className="w-full py-4 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-black transition-all shadow-md flex items-center justify-center gap-2"
               >
                 {mutation.isPending ? <Activity className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                 {mutation.isPending ? "OPTIMIZING NODES..." : "GENERATE NEXT-WEEK PLAN"}
               </button>
           </div>

           <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
              <div className="flex items-center justify-between mb-4">
                 <h3 className="text-xs font-black text-foreground uppercase tracking-widest">Global Heatmap</h3>
                 <span className="text-[10px] font-black text-primary uppercase">98.2% Load</span>
              </div>
              <div className="h-24 bg-secondary/50 rounded-xl border border-border border-dashed flex items-center justify-center">
                 <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-40">Regional Load Viz Block</p>
              </div>
           </div>
        </div>

        {/* Right Column: Site Gantt Chart */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-border shadow-sm flex flex-col overflow-hidden">
           <div className="px-6 py-5 border-b border-border flex justify-between items-center">
              <h3 className="text-xs font-black text-foreground uppercase tracking-widest flex items-center gap-2">
                 <Calendar className="w-4 h-4 text-primary" />
                 Resource Allocation Map
              </h3>
              <div className="flex gap-2">
                 {['D', 'W', 'M'].map((t, i) => (
                   <button key={t} className={`w-8 h-8 rounded-lg text-[10px] font-black uppercase transition-all ${i === 1 ? 'bg-primary text-white shadow-md' : 'bg-secondary text-muted-foreground hover:bg-muted'}`}>
                     {t}
                   </button>
                 ))}
              </div>
           </div>
           
           <div className="flex-1 p-6 space-y-10">
              {sites.map((site, i) => (
                <div key={i} className="space-y-3 group">
                   <div className="flex justify-between items-end">
                      <div>
                         <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{site.name}</h4>
                         <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                           {site.crew} • <span className={site.status === 'Critical' ? 'text-red-500' : 'text-primary'}>{site.status.toUpperCase()}</span>
                         </p>
                      </div>
                      <div className="text-right">
                         <span className="text-xs font-black text-foreground">{site.raw} Workers</span>
                         <p className="text-[10px] font-bold text-muted-foreground uppercase">{site.trend} vs/Last Week</p>
                      </div>
                   </div>
                   <div className="relative h-12 bg-secondary/50 rounded-xl border border-border overflow-hidden inner-shadow">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${site.load}%` }}
                        transition={{ duration: 1.5, type: "spring", stiffness: 50 }}
                        className={`h-full ${site.color} opacity-80 border-r-4 border-white relative flex items-center px-4`}
                      >
                         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                         <span className="relative z-10 text-[10px] font-black text-white uppercase tracking-tighter">{site.load}% CAPACITY</span>
                      </motion.div>
                      <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 opacity-0 group-hover:opacity-100 transition-all">
                        <Maximize2 className="w-4 h-4 text-white" />
                      </button>
                   </div>
                </div>
              ))}
           </div>

           <div className="px-6 py-4 bg-secondary/20 border-t border-border flex justify-between items-center">
              <div className="flex items-center gap-4">
                 <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">Healthy</span>
                 </div>
                 <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">Constraint Found</span>
                 </div>
              </div>
              <button className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all">
                VIEW FULL ROSTER <ChevronRight className="w-3 h-3" />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}

