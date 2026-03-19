"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import { 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  Activity, 
  Camera, 
  HardHat, 
  Clock,
  ArrowRight,
  WifiOff,
  Video,
  Eye,
  Zap,
  MapPin,
  ClipboardList
} from "lucide-react";
import { motion } from "framer-motion";

const siteIncidents = [
  { id: 1, type: "Missing Safety Harness", location: "Lagos Island Site A", risk: "CRITICAL", color: "text-red-600 bg-red-50", time: "4m ago" },
  { id: 2, type: "Unauthorized Zone Entry", location: "Abuja Tech Park B", risk: "HIGH", color: "text-amber-600 bg-amber-50", time: "18m ago" },
  { id: 3, type: "PPE Compliance Warning", location: "Kano Logistics Hub", risk: "MODERATE", color: "text-blue-600 bg-blue-50", time: "1h ago" },
  { id: 4, type: "Fire Marshall Check", location: "Port Harcourt", risk: "STABLE", color: "text-green-600 bg-green-50", time: "3h ago" },
];

export default function SafetyDashboard() {
  const [safetyLog, setSafetyLog] = useState("");
  
  const mutation = useMutation({
    mutationFn: async (log: string) => {
      const res = await api.post("/safety/analyze-log", {
        log_text: log,
        site_id: "LAG-ISLAND-B"
      });
      return res.data;
    },
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      {/* Header & Status */}
      <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest mb-1">
             <ShieldAlert className="w-3 h-3" />
             <span>HSE Intelligence System v2.1</span>
           </div>
           <h1 className="text-2xl font-black text-foreground tracking-tight uppercase">Safety & Compliance</h1>
           <p className="text-sm text-muted-foreground font-medium italic">Active AI surveillance across 14 Nigerian regional sites</p>
        </div>
        <div className="flex items-center gap-3">
           <div className="flex flex-col items-end">
              <span className="text-[10px] font-black text-muted-foreground uppercase">Compliance Rate</span>
              <span className="text-lg font-black text-primary">94.2%</span>
           </div>
           <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
              <Zap className="w-6 h-6 text-primary" />
           </div>
        </div>
      </div>

      {/* Critical PPE Alert */}
      <div className="bg-red-600 rounded-2xl p-6 text-white shadow-lg shadow-red-200 relative overflow-hidden flex flex-col md:flex-row items-center justify-between">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <ShieldAlert className="w-48 h-48" />
        </div>
        <div className="flex items-center gap-6 z-10">
           <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-md">
              <AlertTriangle className="w-8 h-8 text-white" />
           </div>
           <div>
              <p className="text-[10px] font-black text-white/80 uppercase tracking-widest mb-1">Critical Site Violation</p>
              <h2 className="text-xl font-bold">Lagos Island Site B: 3 Workers detected without hardhats</h2>
              <p className="text-sm text-white/70 font-medium">Automatic alert sent to site supervisor Adebayo. Drone dispatching for verification.</p>
           </div>
        </div>
        <button className="mt-4 md:mt-0 bg-white text-red-600 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white/90 transition-all z-10 shadow-md">
           INTERCEPT NOW
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* AI Safety Advisor Form */}
        <div className="lg:col-span-12">
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-12 opacity-5">
                <ClipboardList className="w-64 h-64 text-primary" />
             </div>
             <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                   <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-4">
                      <Zap className="w-4 h-4" />
                      <span>Neural Safety Advisor</span>
                   </div>
                   <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-6">
                      AI Log <br />Analysis Node
                   </h2>
                   <p className="text-sm text-slate-400 font-medium leading-relaxed mb-8 max-w-md">
                      Input daily safety logs or incident reports. Our RAG-powered engine will check against Nigerian HSE protocols.
                   </p>
                   <div className="space-y-4">
                      <textarea 
                        value={safetyLog}
                        onChange={(e) => setSafetyLog(e.target.value)}
                        placeholder="Describe safety observation or incident..."
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl p-5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary h-32 transition-all"
                      />
                      <button 
                        onClick={() => mutation.mutate(safetyLog)}
                        disabled={mutation.isPending || !safetyLog}
                        className="w-full py-4 bg-primary text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3"
                      >
                        {mutation.isPending ? (
                          <>
                             <Activity className="w-4 h-4 animate-spin" />
                             Processing Neural Path...
                          </>
                        ) : (
                          <>
                             <ShieldAlert className="w-4 h-4" />
                             Analyze Site Safety
                          </>
                        )}
                      </button>
                   </div>
                </div>

                <div className="bg-slate-800/30 rounded-2xl border border-slate-700/50 p-6 min-h-[300px] flex flex-col">
                   <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">AI Output Stream</h3>
                   {mutation.data ? (
                     <div className="space-y-6">
                        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                           <p className="text-[10px] font-black text-red-500 uppercase mb-2">Primary Risk detected:</p>
                           <p className="text-sm text-white font-bold uppercase tracking-tight">{mutation.data.risk_level}</p>
                        </div>
                        <div className="space-y-4">
                           <p className="text-[10px] font-black text-primary uppercase mb-2">Recommendations:</p>
                           <div className="grid gap-3">
                              {mutation.data.recommendations?.map((rec: string, i: number) => (
                                <div key={i} className="flex gap-3 text-xs text-slate-300 font-medium border-l-2 border-primary pl-3 py-1">
                                   {rec}
                                </div>
                              ))}
                           </div>
                        </div>
                     </div>
                   ) : (
                     <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                        <Activity className="w-12 h-12 text-slate-700 mb-4" />
                        <p className="text-xs text-slate-500 font-medium italic">Awaiting site data input for neural evaluation.</p>
                     </div>
                   )}
                </div>
             </div>
          </div>
        </div>

        {/* AI Vision Feeds */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xs font-black text-foreground uppercase tracking-widest flex items-center gap-2">
               <Video className="w-4 h-4 text-primary" />
               Live AI Vision Feeds
            </h2>
            <div className="flex gap-2">
               <span className="px-2 py-1 bg-secondary rounded text-[9px] font-black">12 ACTIVE</span>
               <span className="px-2 py-1 bg-red-50 text-red-600 rounded text-[9px] font-black">2 ERRORS</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Feed 1 */}
            <div className="group relative aspect-video rounded-2xl overflow-hidden border border-border shadow-sm">
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504307651254-35680f35e5d3?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
               <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">CAM-01 | Main Pier</span>
               </div>
               <motion.div 
                 initial={{ opacity: 0, scale: 0.8 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="absolute top-[25%] left-[35%] w-[12%] h-[18%] border-2 border-red-500 bg-red-500/10"
               >
                 <div className="absolute -top-6 left-0 bg-red-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded uppercase">Violation: No Vest</div>
               </motion.div>
               <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-white/80">
                    <Clock className="w-3 h-3" /> 2s Latency
                  </div>
               </div>
            </div>

            {/* Feed 2 */}
            <div className="group relative aspect-video rounded-2xl overflow-hidden border border-border shadow-sm">
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=2071&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
               <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">CAM-04 | South Crane</span>
               </div>
               <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-white/80">
                    <Clock className="w-3 h-3" /> Real-time
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Incident History Panel */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-border shadow-sm flex flex-col h-full">
          <div className="px-6 py-4 border-b border-border flex justify-between items-center">
            <h3 className="text-xs font-black text-foreground uppercase tracking-widest">Incident History</h3>
          </div>
          <div className="flex-1 overflow-y-auto max-h-[400px]">
            <div className="divide-y divide-border">
              {siteIncidents.map((inc) => (
                <div key={inc.id} className="p-4 hover:bg-secondary/20 transition-colors cursor-pointer group">
                  <div className="flex justify-between items-start mb-2">
                     <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{inc.type}</p>
                     <span className="text-[9px] font-black text-muted-foreground">{inc.time}</span>
                  </div>
                  <div className="flex justify-between items-center">
                     <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-muted-foreground" />
                        <span className="text-[10px] font-medium text-muted-foreground">{inc.location}</span>
                     </div>
                     <span className={`px-2 py-0.5 rounded-[4px] text-[9px] font-black uppercase tracking-widest ${inc.color}`}>
                        {inc.risk}
                     </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
