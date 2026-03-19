"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import { motion } from "framer-motion";
import { 
  Network, 
  Zap, 
  ShieldCheck, 
  Database, 
  Globe, 
  RefreshCcw,
  Activity,
  ArrowRight,
  Shield,
  Search,
  Plus,
  Server,
  Terminal,
  ChevronRight
} from "lucide-react";

import { useQuery } from "@tanstack/react-query";

export default function IntegrationSuite() {
  const { data: moduleStatus, refetch } = useQuery({
    queryKey: ["module-status"],
    queryFn: async () => {
      const res = await api.get("/integrations/module-status");
      return res.data;
    },
  });

  const pipelines = [
    { name: "NiMet Weather API", type: "Meteorological Hooks", latency: "42ms", status: moduleStatus?.health === "HEALTHY" ? "Connected" : "Connected", icon: Globe, region: "Abuja Hub" },
    { name: "Cutstruct Market", type: "Price Oracle", latency: "112ms", status: "Healthy", icon: Activity, region: "Lagos Hub" },
    { name: "Jiji.ng Scraper", type: "Classifieds Feed", latency: "3.2s", status: "Delayed", icon: Search, region: "Cloud Node" },
    { name: "Aiven PostgreSQL", type: "Enterprise DB", latency: "12ms", status: "Connected", icon: Database, region: "Frankfurt" },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest mb-1">
             <Network className="w-3 h-3" />
             <span>Data Continuity Bridge v4.0</span>
           </div>
           <h1 className="text-2xl font-black text-foreground tracking-tight uppercase">Infrastructure & API Suite</h1>
           <p className="text-sm text-muted-foreground font-medium flex items-center gap-1">
              Live Data Residency: <span className="font-black text-primary">AWS Cape Town (af-south-1)</span>
           </p>
        </div>
        <div className="flex gap-2">
           <button className="flex items-center gap-2 bg-secondary/50 border border-border px-4 py-2.5 rounded-xl text-xs font-black text-foreground hover:bg-secondary transition-all">
             <Server className="w-4 h-4" /> DOCKER: {moduleStatus?.uptime ? "RUNNING" : "UP"}
           </button>
           <button 
             onClick={() => refetch()}
             className="flex items-center gap-2 bg-primary px-4 py-2.5 rounded-xl text-xs font-black text-white hover:opacity-90 shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
           >
             <Zap className={`w-4 h-4 ${!moduleStatus ? 'animate-pulse' : ''}`} /> FORCE RE-SYNC
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Pipeline Grid */}
        <div className="lg:col-span-8 space-y-6">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pipelines.map((conn, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -4 }}
                  className="bg-white p-6 rounded-2xl border border-border shadow-sm group cursor-pointer hover:border-primary/50 transition-all flex flex-col justify-between"
                >
                   <div className="flex justify-between items-start mb-6">
                      <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center border border-border group-hover:bg-primary/10 transition-colors">
                         <conn.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <span className={`text-[9px] font-black px-2 py-1 rounded-full uppercase tracking-widest border ${conn.status === 'Connected' || conn.status === 'Healthy' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-red-50 text-red-600 border-red-100 animate-pulse'}`}>
                         {conn.status}
                      </span>
                   </div>
                   <div>
                      <h3 className="text-lg font-black text-foreground group-hover:text-primary transition-colors">{conn.name}</h3>
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-4">{conn.type} • {conn.region}</p>
                      <div className="flex justify-between items-center bg-secondary/30 p-2 rounded-lg border border-border">
                         <span className="text-[10px] font-bold text-muted-foreground uppercase">Latency</span>
                         <span className={`text-[10px] font-black ${conn.latency.includes('s') ? 'text-red-500' : 'text-primary'}`}>{conn.latency}</span>
                      </div>
                   </div>
                </motion.div>
              ))}
           </div>

           {/* Topology Chart Placeholder */}
           <div className="bg-slate-900 p-8 rounded-3xl shadow-xl relative overflow-hidden group">
              <div className="flex justify-between items-center mb-10 relative z-10">
                 <h3 className="text-xs font-black text-primary uppercase tracking-widest">Global Data Topology</h3>
                 <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                    <span className="text-[10px] font-black text-slate-400 uppercase">Live Stream</span>
                 </div>
              </div>

              <div className="relative h-48 flex items-center justify-around z-10">
                 <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md">
                       <Globe className="w-8 h-8 text-slate-400" />
                    </div>
                    <span className="text-[10px] font-black text-slate-500 uppercase">Data Ingest</span>
                 </div>
                 <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent relative">
                    <div className="absolute top-1/2 left-0 w-2 h-2 bg-primary rounded-full -translate-y-1/2 animate-flow-right" style={{ animation: 'flow-right 2s infinite linear' }} />
                 </div>
                 <div className="flex flex-col items-center gap-3">
                    <div className="w-24 h-24 rounded-full bg-primary/20 border-4 border-primary/40 flex items-center justify-center shadow-[0_0_30px_rgba(37,99,235,0.3)]">
                       <Zap className="w-10 h-10 text-primary" />
                    </div>
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">AI CORE</span>
                 </div>
                 <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent relative">
                    <div className="absolute top-1/2 left-0 w-2 h-2 bg-primary rounded-full -translate-y-1/2 animate-flow-right" style={{ animation: 'flow-right 2s infinite linear', animationDelay: '1s' }} />
                 </div>
                 <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md">
                       <Database className="w-8 h-8 text-slate-400" />
                    </div>
                    <span className="text-[10px] font-black text-slate-500 uppercase">Residency</span>
                 </div>
              </div>
           </div>
        </div>

        {/* Sync Console */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-white rounded-2xl border border-border shadow-sm flex flex-col h-full overflow-hidden">
              <div className="px-6 py-4 border-b border-border flex justify-between items-center">
                 <h3 className="text-xs font-black text-foreground uppercase tracking-widest flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-primary" />
                    Bridge Console
                 </h3>
                 <RefreshCcw className="w-4 h-4 text-muted-foreground animate-spin-slow" />
              </div>
              <div className="bg-slate-900 p-6 flex-1 font-mono text-[10px] space-y-3 overflow-y-auto">
                 {[
                   { msg: "INGEST: NiMet Abuja [CurrentTemp: 34C]", time: "09:42", type: "info" },
                   { msg: "SYNC: Cutstruct Material Prices [Naira]", time: "09:43", type: "info" },
                   { msg: "WARN: Jiji Scraper Latency > 3s [RETRYING]", time: "09:44", type: "warn" },
                   { msg: "COMMIT: Aiven PostgreSQL Transaction OK", time: "09:45", type: "success" },
                   { msg: "AI: Context Window Refreshed [#TX-4092]", time: "09:46", type: "info" },
                 ].map((log, i) => (
                   <div key={i} className="flex gap-3">
                      <span className="text-slate-600">[{log.time}]</span>
                      <span className={log.type === 'warn' ? 'text-amber-500' : log.type === 'success' ? 'text-primary' : 'text-slate-300'}>
                         {log.msg}
                      </span>
                   </div>
                 ))}
                 <div className="pt-2 animate-pulse text-primary font-black uppercase tracking-[0.2em]">_ Listening...</div>
              </div>
              <div className="p-5 border-t border-border bg-secondary/10">
                 <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2">Bridge Credentials</h4>
                 <div className="space-y-2">
                    <div className="flex justify-between items-center text-[10px] font-bold">
                       <span className="text-muted-foreground">API Keys Active</span>
                       <span className="text-foreground">12 / 12</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-bold">
                       <span className="text-muted-foreground">Data Residency</span>
                       <span className="text-foreground flex items-center gap-1">
                          <Shield className="w-3 h-3 text-primary" /> ENCRYPTED
                       </span>
                    </div>
                 </div>
                 <button className="w-full mt-4 py-2 border border-border rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all">
                    MANAGE SECRETS
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
