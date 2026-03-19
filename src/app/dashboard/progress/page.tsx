"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BarChart3, 
  Calendar, 
  DollarSign, 
  UploadCloud, 
  CheckCircle2, 
  Clock, 
  ChevronRight,
  Target,
  FileText,
  Scan,
  Zap,
  Drone,
  AlertTriangle,
  MapPin
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const performanceData = [
  { name: 'Week 1', expected: 10, actual: 8 },
  { name: 'Week 2', expected: 25, actual: 20 },
  { name: 'Week 3', expected: 45, actual: 48 },
  { name: 'Week 4', expected: 60, actual: 65 },
  { name: 'Week 5', expected: 80, actual: 82 },
  { name: 'Week 6', expected: 100, actual: 94 },
];

export default function ProgressVisualizer() {
  const [activeTab, setActiveTab] = useState("ANALYZE");
  const tabs = ["ANALYZE", "SCHEDULE", "MILESTONES"];

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex gap-4 items-center">
           <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
              <Scan className="w-6 h-6 text-primary" />
           </div>
           <div>
              <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest mb-1">
                <Drone className="w-3 h-3" />
                <span>CV Drone Pipeline v3.2</span>
              </div>
              <h1 className="text-2xl font-black text-foreground tracking-tight uppercase">Progress Visualizer</h1>
              <p className="text-sm text-muted-foreground font-medium flex items-center gap-1">
                 <MapPin className="w-3 h-3" /> Eko Atlantic Sector B (Lagos)
              </p>
           </div>
        </div>
        <div className="flex gap-2 bg-secondary/50 p-1.5 rounded-2xl border border-border">
           {tabs.map((tab) => (
             <button
               key={tab}
               onClick={() => setActiveTab(tab)}
               className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-primary text-white shadow-md' : 'text-muted-foreground hover:bg-white/50'}`}
             >
               {tab}
             </button>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Analytics */}
        <div className="lg:col-span-8 space-y-6">
           <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
              <div className="flex justify-between items-center mb-8">
                 <h3 className="text-xs font-black text-foreground uppercase tracking-widest">Project Evolution (Nigeria North Hub)</h3>
                 <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                       <div className="w-2 h-2 rounded-full bg-primary" />
                       <span className="text-[10px] font-bold text-muted-foreground uppercase">Expected</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                       <div className="w-2 h-2 rounded-full bg-slate-900" />
                       <span className="text-[10px] font-bold text-muted-foreground uppercase">Actual</span>
                    </div>
                 </div>
              </div>
              <div className="h-80 w-full">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={performanceData}>
                       <defs>
                          <linearGradient id="colorExpected" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                             <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#0f172a" stopOpacity={0.1}/>
                             <stop offset="95%" stopColor="#0f172a" stopOpacity={0}/>
                          </linearGradient>
                       </defs>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                       <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 'black', fill: '#64748b' }} dy={10} />
                       <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 'black', fill: '#64748b' }} />
                       <Tooltip 
                          contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 'black', fontSize: '10px' }}
                       />
                       <Area type="monotone" dataKey="expected" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorExpected)" />
                       <Area type="monotone" dataKey="actual" stroke="#0f172a" strokeWidth={3} fillOpacity={1} fill="url(#colorActual)" />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex items-start gap-4">
                 <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center border border-amber-100 shrink-0">
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                 </div>
                 <div>
                    <h4 className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-1">Schedule Delay</h4>
                    <p className="text-xl font-black text-foreground">3 Days Latency</p>
                    <p className="text-[10px] text-muted-foreground font-medium mt-1 leading-relaxed">
                       Sector B roofing delayed due to heavy rainfall in Lagos coastal corridor.
                    </p>
                 </div>
              </div>
              <div className="bg-slate-900 p-6 rounded-2xl shadow-xl flex items-start gap-4 group">
                 <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20 shrink-0 group-hover:bg-primary transition-all">
                    <Target className="w-5 h-5 text-white" />
                 </div>
                 <div>
                    <h4 className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">AI Recommendation</h4>
                    <p className="text-sm font-bold text-white leading-relaxed">
                       Deploy extra night shift for the North Wing to recover the latent schedule.
                    </p>
                 </div>
              </div>
           </div>
        </div>

        {/* CV Visualization / Photo Panel */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex flex-col h-full space-y-6">
              <h3 className="text-xs font-black text-foreground uppercase tracking-widest">Drone Intelligence View</h3>
              
              <div className="relative aspect-video rounded-xl bg-slate-900 overflow-hidden group cursor-crosshair">
                 <img src="https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80" className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700" alt="site" />
                 
                 {/* Simulated CV Overlays */}
                 <div className="absolute inset-0 p-4">
                    <div className="absolute top-1/4 left-1/4 w-32 h-24 border-2 border-primary/60 rounded-sm">
                       <span className="absolute -top-6 left-0 text-[8px] font-black bg-primary text-white px-1 py-0.5 rounded uppercase">Foundation (98%)</span>
                    </div>
                    <div className="absolute top-1/2 right-1/4 w-48 h-32 border-2 border-red-500/60 rounded-sm animate-pulse">
                       <span className="absolute -top-6 left-0 text-[8px] font-black bg-red-500 text-white px-1 py-0.5 rounded uppercase tracking-tighter">Delay: Structural Load (32%)</span>
                    </div>
                 </div>

                 <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20">
                    <p className="text-[8px] font-black text-white uppercase tracking-widest flex items-center gap-2">
                       <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                       CV PIPELINE ACTIVE
                    </p>
                 </div>
              </div>

              <div className="space-y-4">
                 <button className="w-full py-4 bg-secondary/50 rounded-xl border border-border border-dashed flex flex-col items-center justify-center p-6 hover:bg-secondary hover:border-primary/50 transition-all group">
                    <UploadCloud className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors mb-2" />
                    <span className="text-[10px] font-black text-foreground uppercase tracking-widest">Upload Sector Imagery</span>
                    <span className="text-[9px] text-muted-foreground font-medium mt-1">Supports drone logs (DNG/ZIP)</span>
                 </button>

                 <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                       <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Recent Processing</span>
                       <span className="text-[9px] font-black text-blue-400 uppercase">2m ago</span>
                    </div>
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-lg bg-white overflow-hidden border border-blue-100 shadow-sm shrink-0">
                          <img src="https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=100&h=100&auto=format&fit=crop" className="w-full h-full object-cover" alt="thumb" />
                       </div>
                       <div className="flex-1 min-w-0">
                          <p className="text-[10px] font-black text-foreground truncate uppercase">Sector_B_Drone_Flight_N.zip</p>
                          <p className="text-[9px] text-blue-600/70 font-black uppercase tracking-tighter">AI Analysis: SUCCESS</p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
