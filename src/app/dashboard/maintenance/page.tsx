"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import { motion } from "framer-motion";
import { 
  Wrench, 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  Timer, 
  Droplet,
  Thermometer,
  Zap,
  ChevronRight,
  ShieldCheck,
  Search,
  Plus,
  Settings
} from "lucide-react";

export default function MaintenancePredictor() {
  const [selectedAsset, setSelectedAsset] = useState<string>("Tower Crane Abuja-Alpha");
  
  const mutation = useMutation({
    mutationFn: async (assetName: string) => {
      const res = await api.post("/maintenance-predictor/predict", {
        equipment_id: assetName,
        hours_operated: 1200,
        temp_reading: 92.5,
        vibration_level: 8.4
      });
      return res.data;
    },
  });

  const assets = [
    { name: "Excavator #Lagos-102", health: 92, status: "Optimal", nextChange: "450h", lastServiced: "Oct 12", site: "Lagos Island A" },
    { name: "Tower Crane Abuja-Alpha", health: mutation.data?.health_score || 34, status: mutation.data?.status || "Critical", nextChange: "12h", lastServiced: "Nov-01", site: "Central Area" },
    { name: "Concrete Mixer PH-M4", health: 76, status: "Monitor", nextChange: "112h", lastServiced: "Sep-28", site: "Trans Amadi" },
    { name: "GenSet 500kVA Kano", health: 88, status: "Optimal", nextChange: "220h", lastServiced: "Oct-30", site: "Industrial Zone" },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      {/* Header & Overall Health */}
      <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest mb-1">
             <ShieldCheck className="w-3 h-3" />
             <span>Fleet Analytics Hub v1.8</span>
           </div>
           <h1 className="text-2xl font-black text-foreground tracking-tight uppercase">Maintenance Predictor</h1>
           <p className="text-sm text-muted-foreground font-medium">Monitoring 84 active heavy assets across West Africa</p>
        </div>
        <div className="flex items-center gap-3">
           <div className="flex flex-col items-end">
              <span className="text-[10px] font-black text-muted-foreground uppercase">Aggregated Fleet Health</span>
              <span className="text-lg font-black text-primary">84.5%</span>
           </div>
           <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
              <Activity className="w-6 h-6 text-primary" />
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Asset Cards */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex justify-between items-center mb-2 px-1">
            <h2 className="text-xs font-black text-foreground uppercase tracking-widest flex items-center gap-2">
               <Wrench className="w-4 h-4 text-primary" />
               Critical Asset Portfolio
            </h2>
            <div className="flex gap-2">
               <button className="p-2 bg-secondary/50 rounded-lg text-muted-foreground hover:text-foreground">
                 <Search className="w-4 h-4" />
               </button>
               <button className="p-2 bg-secondary/50 rounded-lg text-muted-foreground hover:text-foreground">
                 <Settings className="w-4 h-4" />
               </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
             {assets.map((asset, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={() => setSelectedAsset(asset.name)}
                  className={`bg-white p-6 rounded-2xl border ${selectedAsset === asset.name ? 'border-primary shadow-md' : 'border-border shadow-sm'} flex flex-col md:flex-row items-center justify-between gap-6 hover:border-primary/50 transition-all cursor-pointer group`}
                >
                  <div className="flex items-center gap-6 w-full">
                     <div className="relative w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center shrink-0">
                        <Wrench className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                        <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${asset.health < 40 ? 'bg-red-500' : asset.health < 80 ? 'bg-amber-500' : 'bg-green-500'}`} />
                     </div>
                     <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                           <h3 className="text-lg font-black text-foreground group-hover:text-primary transition-colors">{asset.name}</h3>
                           <span className="text-[10px] font-black bg-secondary border border-border px-2 py-0.5 rounded uppercase tracking-widest">{asset.site}</span>
                        </div>
                        <div className="flex flex-wrap gap-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                           <span className="flex items-center gap-1"><Timer className="w-3 h-3 text-primary" /> Next Svc: {asset.nextChange}</span>
                           <span className="flex items-center gap-1"><Droplet className="w-3 h-3 text-primary" /> Lst Serv: {asset.lastServiced}</span>
                        </div>
                     </div>
                  </div>

                  <div className="flex items-center gap-8 w-full md:w-auto border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 md:pl-8">
                     <div className="text-right whitespace-nowrap">
                        <p className={`text-4xl font-black tracking-tighter ${asset.health < 40 ? 'text-red-500' : asset.health < 80 ? 'text-amber-500' : 'text-primary'}`}>{asset.health}%</p>
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{asset.status}</p>
                     </div>
                     <button className="p-3 bg-secondary/50 rounded-xl group-hover:bg-primary/10 transition-all">
                        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                     </button>
                  </div>
               </motion.div>
             ))}
          </div>
        </div>

        {/* Telemetry Panel */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                 <Zap className="w-48 h-48" />
              </div>
              
              <div className="relative z-10 space-y-8">
                  <div>
                     <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-4">Core Telemetry: {selectedAsset}</h3>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                           <div className="flex items-center justify-between mb-2">
                              <span className="text-[9px] font-black text-slate-500 uppercase">Temp</span>
                              <Thermometer className="w-4 h-4 text-red-500" />
                           </div>
                           <p className="text-2xl font-black text-red-500">{selectedAsset.includes("Crane") ? "92°C" : "42°C"}</p>
                        </div>
                        <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                           <div className="flex items-center justify-between mb-2">
                              <span className="text-[9px] font-black text-slate-500 uppercase">Vibe</span>
                              <Zap className="w-4 h-4 text-amber-500" />
                           </div>
                           <p className="text-2xl font-black text-amber-500">{selectedAsset.includes("Crane") ? "8.4 G" : "1.2 G"}</p>
                        </div>
                     </div>
                  </div>

                  <div className="p-5 bg-red-500/10 border border-red-500/20 rounded-2xl space-y-3">
                     <div className="flex items-center gap-2 text-red-500">
                        <AlertTriangle className="w-5 h-5 animate-pulse" />
                        <span className="text-xs font-black uppercase tracking-widest">AI Status: {mutation.data?.prediction || "Scanning..."}</span>
                     </div>
                     <p className="text-[10px] text-slate-300 font-medium leading-relaxed italic">
                       {mutation.data?.recommendation || "Awaiting neural telemetry batch for precise failure window estimation."}
                     </p>
                  </div>

                  <button 
                    onClick={() => mutation.mutate(selectedAsset)}
                    disabled={mutation.isPending}
                    className="w-full py-4 bg-primary hover:bg-primary/90 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-3"
                  >
                     {mutation.isPending ? <Activity className="w-4 h-4 animate-spin" /> : <Wrench className="w-4 h-4" />}
                     {mutation.isPending ? "FORECASTING..." : "DISPATCH TECHNICIAN"}
                  </button>
              </div>
           </div>

           <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex flex-col justify-center min-h-[140px] relative overflow-hidden">
              <div className="relative z-10">
                 <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Operational Efficiency</p>
                 <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-3xl font-black text-foreground">94.2%</span>
                    <span className="text-green-500 text-[10px] font-black uppercase">+2.1%</span>
                 </div>
                 <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: '94%' }} />
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

