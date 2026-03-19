"use client";

import { motion } from "framer-motion";
import { 
  BarChart3, 
  TrendingUp, 
  ShieldCheck, 
  Clock, 
  Zap, 
  AlertTriangle, 
  ArrowUpRight, 
  MapPin, 
  Navigation,
  Activity,
  CreditCard,
  Users
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const performanceData = [
  { name: "Mon", value: 40 },
  { name: "Tue", value: 45 },
  { name: "Wed", value: 38 },
  { name: "Thu", value: 52 },
  { name: "Fri", value: 48 },
  { name: "Sat", value: 60 },
  { name: "Sun", value: 55 },
];

export default function DashboardOverview() {
  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-foreground tracking-tighter uppercase">Project Macro View</h1>
          <p className="text-muted-foreground font-medium flex items-center gap-2 mt-1">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Live Intelligence: <span className="text-foreground font-bold">Lagos Hub Node-1</span>
          </p>
        </div>
        <div className="flex gap-3">
           <div className="bg-white p-3 rounded-2xl border border-border shadow-sm flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center border border-blue-100">
                 <MapPin className="w-4 h-4 text-primary" />
              </div>
              <div>
                 <p className="text-[10px] font-black uppercase text-muted-foreground">Location</p>
                 <p className="text-xs font-black">EKO ATLANTIC, LAGOS</p>
              </div>
           </div>
           <button className="bg-primary text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-lg shadow-primary/20">
              Generate Report
           </button>
        </div>
      </div>

      {/* High Level Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Overall Progress", value: "68.2%", trend: "+4.1%", icon: Activity, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Material Spend", value: "₦142.5M", trend: "-2.5%", icon: CreditCard, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Safety Score", value: "98.4", trend: "Optimal", icon: ShieldCheck, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Active Crew", value: "1,240", trend: "Full Cap", icon: Users, color: "text-slate-600", bg: "bg-slate-50" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-border shadow-sm hover:border-primary/30 transition-all group">
             <div className="flex justify-between items-start mb-6">
                <div className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center border border-current/10 shadow-sm group-hover:scale-110 transition-transform`}>
                   <stat.icon className="w-6 h-6" />
                </div>
                <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-full ${stat.trend.includes('+') ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-slate-50 text-slate-500 border border-slate-100'}`}>
                   {stat.trend}
                </span>
             </div>
             <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">{stat.label}</p>
             <h3 className="text-3xl font-black text-foreground tracking-tighter">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-8 space-y-8">
           <div className="bg-white p-8 rounded-[2.5rem] border border-border shadow-sm">
              <div className="flex justify-between items-center mb-10">
                 <div>
                    <h3 className="text-xs font-black text-foreground uppercase tracking-widest">Project Velocity Trend</h3>
                    <p className="text-xs text-muted-foreground font-medium mt-1">Physical Completion VS Logistical Baseline</p>
                 </div>
                 <div className="flex bg-secondary p-1 rounded-xl">
                    <button className="px-4 py-1.5 bg-white shadow-sm rounded-lg text-[10px] font-black uppercase">Weekly</button>
                    <button className="px-4 py-1.5 text-[10px] font-black uppercase text-muted-foreground">Monthly</button>
                 </div>
              </div>
              <div className="h-80 w-full">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={performanceData}>
                       <defs>
                          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                             <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                          </linearGradient>
                       </defs>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                       <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold', fill: '#64748b' }} dy={10} />
                       <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold', fill: '#64748b' }} />
                       <Tooltip cursor={{ stroke: '#2563eb', strokeWidth: 2 }} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontWeight: 'bold' }} />
                       <Area type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={4} fillOpacity={1} fill="url(#colorValue)" />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden group">
                 <div className="relative z-10 flex flex-col h-full justify-between">
                    <div>
                       <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 mb-6">
                          <Zap className="w-3 h-3 text-primary animate-pulse" />
                          <span className="text-[10px] font-black text-primary uppercase tracking-widest">AI Agent Insight</span>
                       </div>
                       <h4 className="text-xl font-bold text-white leading-tight mb-4">
                          Accelerate <span className="text-primary italic">Sector B</span> foundation by 12% to offset upcoming coastal rain delays.
                       </h4>
                    </div>
                    <button className="flex items-center gap-2 text-[10px] font-black text-white hover:text-primary transition-colors tracking-[0.2em]">
                       DEPLOY TASK SET <ArrowUpRight className="w-4 h-4" />
                    </button>
                 </div>
                 <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl group-hover:scale-150 transition-all duration-700" />
              </div>

              <div className="bg-white p-8 rounded-[2.5rem] border border-border shadow-sm flex flex-col justify-between">
                 <div>
                    <h3 className="text-xs font-black text-foreground uppercase tracking-widest mb-6">Recent Alerts</h3>
                    <div className="space-y-4">
                       {[
                         { m: "Material price spike: ₦ Cement (+12%)", t: "2h ago", icon: AlertTriangle, c: "text-amber-500" },
                         { m: "Structural scan mismatch: Sector C", t: "4h ago", icon: ShieldCheck, c: "text-primary" },
                       ].map((alert, idx) => (
                         <div key={idx} className="flex items-center gap-4 p-3 bg-secondary/30 rounded-2xl border border-border/50">
                            <alert.icon className={`w-4 h-4 ${alert.c}`} />
                            <div className="flex-1">
                               <p className="text-xs font-bold text-foreground">{alert.m}</p>
                               <p className="text-[10px] font-black text-muted-foreground uppercase">{alert.t}</p>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Sidebar Info */}
        <div className="lg:col-span-4 space-y-8">
           <div className="bg-white p-8 rounded-[2.5rem] border border-border shadow-sm">
              <h3 className="text-xs font-black text-foreground uppercase tracking-widest mb-8">Asset Distribution</h3>
              <div className="h-64 w-full">
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={performanceData}>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                       <XAxis dataKey="name" hide />
                       <Bar dataKey="value" fill="#2563eb" radius={[6, 6, 6, 6]} barSize={32} />
                    </BarChart>
                 </ResponsiveContainer>
              </div>
              <div className="mt-8 space-y-4">
                 <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-muted-foreground">Logistics Fleet</span>
                    <span className="font-black">84 Active</span>
                 </div>
                 <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-muted-foreground">Fixed Assets</span>
                    <span className="font-black">12 Cranes</span>
                 </div>
                 <div className="w-full bg-secondary h-1 rounded-full mt-4">
                    <div className="w-[84%] bg-primary h-full rounded-full" />
                 </div>
              </div>
           </div>

           <div className="bg-blue-600 p-8 rounded-[2.5rem] shadow-2xl shadow-blue-200">
              <h3 className="text-white text-xl font-black tracking-tighter uppercase mb-4 leading-none">Global <br />Residency</h3>
              <p className="text-blue-100/70 text-sm font-medium leading-relaxed mb-10">
                 All project state is cryptographically secured and resilient across Lagos & Abuja nodes.
              </p>
              <div className="flex items-center gap-4 text-white">
                 <div className="p-3 bg-white/10 rounded-2xl border border-white/20">
                    <Navigation className="w-5 h-5" />
                 </div>
                 <div>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-50">Local Node</p>
                    <p className="text-sm font-black">LAGOS_AF-SOUTH_1</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
