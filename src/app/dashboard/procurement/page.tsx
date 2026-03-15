"use client";

import { motion } from "framer-motion";
import { 
  Building2,
  Wrench,
  ClipboardList,
  Download,
  AlertTriangle,
  Banknote,
  ShieldCheck,
  ChevronRight,
  BarChart3
} from "lucide-react";

export default function ProcurementAssistant() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Tabs */}
      <div className="flex gap-8 border-b border-border pb-px">
        <button className="text-sm font-bold text-foreground border-b-2 border-primary pb-2">Supplier Intelligence</button>
        <button className="text-sm font-bold text-muted-foreground hover:text-foreground pb-2 transition-colors">Price Trends</button>
        <button className="text-sm font-bold text-muted-foreground hover:text-foreground pb-2 transition-colors">Supplier Directory</button>
      </div>

      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="glass p-6 relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Total Suppliers</h3>
            <Building2 className="w-5 h-5 text-muted-foreground" />
          </div>
          <div className="flex items-baseline gap-3 relative z-10">
            <h2 className="text-4xl font-black text-foreground">1,284</h2>
            <span className="text-sm font-bold text-green-500 bg-green-500/10 px-2 rounded">+5% &uarr;</span>
          </div>
          <div className="absolute bottom-0 left-6 right-6 h-1 flex">
             <div className="h-full w-2/3 bg-primary" />
             <div className="h-full w-1/3 bg-secondary" />
          </div>
        </div>

        {/* Card 2 */}
        <div className="glass p-6 relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Active Contracts</h3>
            <Wrench className="w-5 h-5 text-muted-foreground" />
          </div>
          <div className="flex items-baseline gap-3 relative z-10">
            <h2 className="text-4xl font-black text-foreground">412</h2>
            <span className="text-sm font-bold text-red-500 bg-red-500/10 px-2 rounded">-2% &darr;</span>
          </div>
          <div className="absolute bottom-0 left-6 right-6 h-1 flex">
             <div className="h-full w-1/2 bg-primary" />
             <div className="h-full w-1/2 bg-secondary" />
          </div>
        </div>

        {/* Card 3 */}
        <div className="glass p-6 relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Pending RFPs</h3>
            <ClipboardList className="w-5 h-5 text-muted-foreground" />
          </div>
          <div className="flex items-baseline gap-3 relative z-10">
            <h2 className="text-4xl font-black text-foreground">18</h2>
            <span className="text-sm font-bold text-green-500 bg-green-500/10 px-2 rounded">+12% &uarr;</span>
          </div>
          <div className="absolute bottom-0 left-6 right-6 h-1 flex">
             <div className="h-full w-1/4 bg-primary" />
             <div className="h-full w-3/4 bg-secondary" />
          </div>
        </div>
      </div>

      {/* Middle Section */}
      <div className="glass p-6 space-y-6">
        <div className="flex justify-between items-center bg-card">
          <div>
            <h2 className="text-lg font-bold text-foreground">Supplier Intelligence Overview</h2>
            <p className="text-sm text-muted-foreground">Real-time performance and risk analysis of your supply chain</p>
          </div>
          <button className="flex items-center gap-2 bg-foreground text-background px-4 py-2 rounded-lg text-sm font-bold hover:bg-foreground/90 transition-colors">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chart Placeholder */}
          <div className="lg:col-span-2 bg-secondary rounded-xl p-8 flex flex-col items-center justify-center border border-border min-h-[250px] relative bg-grid-construction">
             <BarChart3 className="w-16 h-16 text-muted-foreground/30 mb-4" />
             <div className="absolute bottom-6 left-6 text-left w-full pl-6">
               <p className="text-sm font-bold text-foreground">Supplier Risk Distribution</p>
               <p className="text-xs text-muted-foreground">Updated 2 hours ago</p>
             </div>
          </div>

          {/* Critical Attention Required */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <span className="w-1 h-4 bg-primary rounded-full"></span>
              Critical Attention Required
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border border-border rounded-lg bg-card hover:border-primary/50 cursor-pointer group transition-colors">
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                     <AlertTriangle className="w-5 h-5 text-red-500" />
                   </div>
                   <div>
                     <p className="text-sm font-bold text-foreground">Global Logistics Inc.</p>
                     <p className="text-xs text-muted-foreground">Contract Renewal Overdue</p>
                   </div>
                 </div>
                 <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
              </div>

              <div className="flex items-center justify-between p-3 border border-border rounded-lg bg-card hover:border-primary/50 cursor-pointer group transition-colors">
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                     <Banknote className="w-5 h-5 text-primary" />
                   </div>
                   <div>
                     <p className="text-sm font-bold text-foreground">TechComponents Ltd</p>
                     <p className="text-xs text-muted-foreground">Price Variance +15.4%</p>
                   </div>
                 </div>
                 <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
              </div>

              <div className="flex items-center justify-between p-3 border border-border rounded-lg bg-card hover:border-primary/50 cursor-pointer group transition-colors">
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                     <ShieldCheck className="w-5 h-5 text-green-500" />
                   </div>
                   <div>
                     <p className="text-sm font-bold text-foreground">Green Energy Sol.</p>
                     <p className="text-xs text-muted-foreground">New Compliance Verified</p>
                   </div>
                 </div>
                 <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Architecture of Savings */}
        <div className="bg-[#1a202c] text-white p-8 rounded-xl relative overflow-hidden flex flex-col justify-between min-h-[220px]">
           <div className="relative z-10 max-w-sm">
             <h2 className="text-2xl font-bold mb-3">Architecture of Savings</h2>
             <p className="text-gray-400 text-sm leading-relaxed mb-6">
               Discover new opportunities for cost optimization using our AI-driven market analysis tools.
             </p>
             <button className="bg-primary text-primary-foreground px-5 py-2.5 rounded font-bold text-sm hover:opacity-90 transition-opacity">
               Explore Analytics
             </button>
           </div>
           {/* Decorative background element mimicking mockup */}
           <Wrench className="absolute right-0 bottom-0 w-32 h-32 text-white/5 -mb-4 -mr-4" />
        </div>

        {/* Recent Price Trends */}
        <div className="glass p-8 rounded-xl flex flex-col justify-center">
           <h2 className="text-lg font-bold text-foreground mb-6">Recent Price Trends</h2>
           <div className="space-y-6">
             <div>
               <div className="flex justify-between items-center mb-2">
                 <span className="text-sm font-medium text-muted-foreground">Raw Steel Index</span>
                 <span className="text-sm font-bold text-green-500">-4.2%</span>
               </div>
               <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                 <div className="h-full bg-slate-400 w-3/4 rounded-full" />
               </div>
             </div>

             <div>
               <div className="flex justify-between items-center mb-2">
                 <span className="text-sm font-medium text-muted-foreground">Semiconductors</span>
                 <span className="text-sm font-bold text-red-500">+12.8%</span>
               </div>
               <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                 <div className="h-full bg-primary w-5/6 rounded-full" />
               </div>
             </div>

             <div>
               <div className="flex justify-between items-center mb-2">
                 <span className="text-sm font-medium text-muted-foreground">Industrial Gas</span>
                 <span className="text-sm font-bold text-muted-foreground">Stable</span>
               </div>
               <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                 <div className="h-full bg-slate-400 w-1/4 rounded-full" />
               </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
