"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  LayoutGrid,
  FileText,
  AlertTriangle,
  Clock,
  Share,
  CheckCircle,
  FileCheck,
  Search,
  ArrowRight,
  MoreHorizontal,
  Filter,
  ChevronRight,
  ShieldAlert,
  Terminal,
  FileWarning,
  Zap,
  Briefcase
} from "lucide-react";

export default function TenderAnalyzer() {
  const [activeTab, setActiveTab] = useState("ANALYZE");
  const riskCategories = [
    { label: "Legal", score: 20, color: "bg-blue-200" },
    { label: "Financial", score: 45, color: "bg-blue-400" },
    { label: "Operational", score: 80, color: "bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.4)]" },
    { label: "Technical", score: 30, color: "bg-blue-600" },
    { label: "Environmental", score: 15, color: "bg-slate-300" },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex gap-4 items-center">
           <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
              <ShieldAlert className="w-6 h-6 text-primary" />
           </div>
           <div>
              <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest mb-1">
                <Terminal className="w-3 h-3" />
                <span>Risk Audit Engine v4.0 (TX-4092)</span>
              </div>
              <h1 className="text-2xl font-black text-foreground tracking-tight uppercase">Tender Intelligence</h1>
              <p className="text-sm text-muted-foreground font-medium">Lagos Coastal Highway - Bridge Segment B</p>
           </div>
        </div>
        <div className="flex gap-2">
           <button className="flex items-center gap-2 bg-secondary/50 border border-border px-4 py-2 rounded-xl text-[10px] font-black text-foreground hover:bg-secondary transition-all">
             <Share className="w-3.5 h-3.5" /> EXPORT
           </button>
           <button className="flex items-center gap-2 bg-primary px-4 py-2 rounded-xl text-[10px] font-black text-white hover:opacity-90 shadow-lg shadow-primary/20 transition-all">
             <CheckCircle className="w-3.5 h-3.5" /> SUBMIT REVIEW
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Risk Profiler */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-border shadow-sm h-full flex flex-col">
             <div className="flex justify-between items-start mb-10">
                <div>
                   <h3 className="text-xs font-black text-foreground uppercase tracking-widest mb-1">Aggregate Risk Profile</h3>
                   <p className="text-[10px] text-muted-foreground font-medium uppercase">ML Scaled Analysis</p>
                </div>
                <span className="text-[10px] font-black text-red-600 bg-red-50 border border-red-100 px-3 py-1 rounded-full uppercase tracking-widest">High Volatility</span>
             </div>

             <div className="flex-1 flex flex-col justify-center">
                <div className="flex items-baseline gap-3 mb-10">
                   <h2 className="text-7xl font-black text-foreground tracking-tighter">74</h2>
                   <div className="flex flex-col">
                      <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Points</span>
                      <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">+12.4% VS AVG</span>
                   </div>
                </div>

                <div className="flex items-end justify-between h-24 gap-4 border-b border-border pb-4">
                   {riskCategories.map((cat, i) => (
                     <div key={i} className="flex-1 flex flex-col items-center gap-3">
                        <motion.div 
                          initial={{ height: 0 }}
                          animate={{ height: `${cat.score}%` }}
                          transition={{ delay: i * 0.1, duration: 1 }}
                          className={`w-full rounded-t-lg ${cat.color} relative group`}
                        >
                           <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[8px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                              {cat.score}
                           </div>
                        </motion.div>
                        <span className="text-[8px] font-black text-muted-foreground uppercase tracking-tighter whitespace-nowrap">{cat.label}</span>
                     </div>
                   ))}
                </div>
             </div>

             <div className="mt-8 p-5 bg-slate-900 rounded-2xl shadow-xl relative overflow-hidden group">
                <div className="relative z-10">
                   <h4 className="text-[10px] font-black text-primary uppercase tracking-widest mb-2 flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5" /> Critical Anomaly
                   </h4>
                   <p className="text-xs text-slate-200 font-bold leading-relaxed">
                      Liability Clause 4.2 contains "Infinite Indemnity" trap not found in standard COREN forms.
                   </p>
                </div>
                <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-primary/10 rounded-full blur-2xl group-hover:scale-150 transition-transform" />
             </div>
          </div>
        </div>

        {/* Doc Pipeline */}
        <div className="lg:col-span-7 space-y-6">
           <div className="bg-white rounded-3xl border border-border shadow-sm flex flex-col h-full overflow-hidden">
              <div className="px-8 py-6 border-b border-border flex justify-between items-center bg-secondary/10">
                 <h3 className="text-xs font-black text-foreground uppercase tracking-widest">Document Audit Pipeline</h3>
                 <div className="flex items-center gap-4">
                    <button className="text-[10px] font-black text-muted-foreground hover:text-primary uppercase transition-colors">Filter</button>
                    <div className="w-px h-3 bg-border" />
                    <button className="text-[10px] font-black text-muted-foreground hover:text-primary uppercase transition-colors">Batch Actions</button>
                 </div>
              </div>

              <div className="p-4 space-y-4">
                 {[
                   { name: "Technical Specifications V2", meta: "24.5 MB • PDF • Lagos Site Hub", status: "VERIFIED", state: "success" },
                   { name: "Liability Agreement Clause 4", meta: "1.2 MB • DOCX • Legal Template", status: "FLAGGED", state: "error" },
                   { name: "Financial Audit Baseline", meta: "12.8 MB • XLSX • Central Hub", status: "SCANNING", state: "loading" },
                   { name: "Structural Foundation Log", meta: "8.4 MB • PDF • Sector B", status: "PENDING", state: "idle" },
                 ].map((doc, i) => (
                   <div key={i} className="flex items-center justify-between p-5 border border-border rounded-2xl hover:bg-secondary/20 hover:border-primary/30 transition-all cursor-pointer group">
                      <div className="flex items-center gap-5">
                         <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${doc.state === 'error' ? 'bg-red-50 text-red-500 border border-red-100' : 'bg-secondary text-muted-foreground group-hover:text-primary border border-border'}`}>
                            {doc.state === 'error' ? <FileWarning className="w-6 h-6" /> : <FileText className="w-6 h-6" />}
                         </div>
                         <div>
                            <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{doc.name}</h4>
                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mt-0.5">{doc.meta}</p>
                         </div>
                      </div>
                      <div className="text-right">
                         <span className={`text-[9px] font-black px-2 py-1 rounded-full uppercase tracking-widest border ${doc.state === 'success' ? 'bg-green-50 text-green-600 border-green-100' : doc.state === 'error' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-slate-50 text-slate-500 border-slate-100'}`}>
                            {doc.status}
                         </span>
                         {doc.state === 'loading' && (
                           <div className="mt-2 w-16 h-1 bg-secondary rounded-full overflow-hidden ml-auto">
                              <motion.div 
                                className="h-full bg-primary"
                                animate={{ x: [-64, 64] }}
                                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                              />
                           </div>
                         )}
                      </div>
                   </div>
                 ))}
              </div>

              <div className="mt-auto p-6 bg-secondary/10 border-t border-border flex justify-center">
                 <button className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest hover:gap-3 transition-all">
                    LOAD ARCHIVED DOCUMENTS <ChevronRight className="w-3.5 h-3.5" />
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
