"use client";

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
  Zap
} from "lucide-react";
import { motion } from "framer-motion";

const siteIncidents = [
  { id: 1, type: "Missing Safety Harness", location: "Lagos Island Site A", risk: "CRITICAL", color: "text-red-600 bg-red-50", time: "4m ago" },
  { id: 2, type: "Unauthorized Zone Entry", location: "Abuja Tech Park B", risk: "HIGH", color: "text-amber-600 bg-amber-50", time: "18m ago" },
  { id: 3, type: "PPE Compliance Warning", location: "Kano Logistics Hub", risk: "MODERATE", color: "text-blue-600 bg-blue-50", time: "1h ago" },
  { id: 4, type: "Fire Marshall Check", location: "Port Harcourt", risk: "STABLE", color: "text-green-600 bg-green-50", time: "3h ago" },
];

export default function SafetyDashboard() {
  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      {/* Header & Status */}
      <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest mb-1">
             <ShieldAlert className="w-3 h-3" />
             <span>HSE Intelligence System v2.1</span>
           </div>
           <h1 className="text-2xl font-black text-foreground tracking-tight">SAFETY & COMPLIANCE</h1>
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

               {/* Bounding Box Simulation */}
               <motion.div 
                 initial={{ opacity: 0, scale: 0.8 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="absolute top-[25%] left-[35%] w-[12%] h-[18%] border-2 border-red-500 bg-red-500/10"
               >
                 <div className="absolute -top-6 left-0 bg-red-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded whitespace-nowrap uppercase">
                   Violation: No Vest
                 </div>
               </motion.div>

               <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-white/80">
                    <Clock className="w-3 h-3" />
                    2s Latency (Edge-Nigerian)
                  </div>
                  <button className="p-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 hover:bg-white/20">
                    <Eye className="w-4 h-4 text-white" />
                  </button>
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

               {/* Bounding Box Simulation */}
               <div className="absolute top-[40%] left-[60%] w-[10%] h-[15%] border-2 border-green-500 bg-green-500/10">
                 <div className="absolute -top-6 left-0 bg-green-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded whitespace-nowrap uppercase">
                   PPE Verified
                 </div>
               </div>

               <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-white/80">
                    <Clock className="w-3 h-3" />
                    Real-time
                  </div>
                  <button className="p-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 hover:bg-white/20">
                    <Eye className="w-4 h-4 text-white" />
                  </button>
               </div>
            </div>
          </div>
        </div>

        {/* Recent Incidents Panel */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-border shadow-sm flex flex-col">
          <div className="px-6 py-4 border-b border-border flex justify-between items-center">
            <h3 className="text-xs font-black text-foreground uppercase tracking-widest">Incident History</h3>
            <button className="text-[10px] font-black text-primary hover:underline uppercase tracking-tighter">Export Logs</button>
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
          <div className="p-4 border-t border-border bg-secondary/10">
             <button className="w-full py-3 bg-white border border-border rounded-xl text-[10px] font-black text-foreground uppercase tracking-widest hover:bg-secondary transition-all shadow-sm">
               VIEW DATA ANALYTICS
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { MapPin } from "lucide-react";

