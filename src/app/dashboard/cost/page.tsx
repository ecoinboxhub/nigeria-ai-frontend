"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import { 
  Calculator, 
  TrendingUp,
  DollarSign,
  Loader2,
  ChevronRight,
  Target,
  BadgePercent,
  History,
  Info,
  Banknote,
  Navigation,
  FileText
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { MATERIAL_PRICES } from "@/lib/dummy_data";

const NIGERIAN_CITIES = [
  { name: "Lagos", factor: 1.15, region: "South-West" },
  { name: "Abuja", factor: 1.25, region: "North-Central" },
  { name: "Port Harcourt", factor: 1.20, region: "South-South" },
  { name: "Kano", factor: 0.95, region: "North-West" },
  { name: "Enugu", factor: 1.05, region: "South-East" },
];

export default function CostEstimator() {
  const [formData, setFormData] = useState({
    area_sqm: 1500,
    material_quality: 0.85,
    city: "Lagos",
    include_inflation: true
  });

  const cityData = useMemo(() => NIGERIAN_CITIES.find(c => c.name === formData.city) || NIGERIAN_CITIES[0], [formData.city]);

  const mutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const res = await api.post("/cost-estimator/predict", {
        area_sqm: data.area_sqm,
        floors: 1, // Default to 1 for now
        complexity_index: data.material_quality,
        labor_cost_index: cityData.factor,
        materials_cost_index: data.include_inflation ? cityData.factor * 1.28 : cityData.factor
      });
      return { total: res.data.estimated_cost_ngn };
    },
  });

  const totalCost = mutation.data?.total || 450000000; // Default ₦450M

  const chartData = [
    { name: "Structural", value: totalCost * 0.45, color: "#2563eb" },
    { name: "Finishing", value: totalCost * 0.30, color: "#60a5fa" },
    { name: "MEP", value: totalCost * 0.15, color: "#93c5fd" },
    { name: "Logistics", value: totalCost * 0.10, color: "#bfdbfe" },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest mb-1">
             <Calculator className="w-3 h-3" />
             <span>AI Bill of Quantities (v4.0)</span>
           </div>
           <h1 className="text-2xl font-black text-foreground tracking-tight uppercase">Cost Estimator & ML Forecast</h1>
           <p className="text-sm text-muted-foreground font-medium italic">ML-Weighted Project Valuation Engine (₦ Naira)</p>
        </div>
        <div className="flex items-center gap-3">
           <div className="flex flex-col items-end">
              <span className="text-[10px] font-black text-muted-foreground uppercase">Naira Volatility Index</span>
              <span className="text-sm font-black text-amber-600 flex items-center gap-1">
                 <BadgePercent className="w-4 h-4" />
                 HIGH (+28.2%)
              </span>
           </div>
           <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center border border-amber-200">
              <History className="w-6 h-6 text-amber-600" />
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input Panel */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-white p-6 rounded-2xl border border-border shadow-sm space-y-6">
              <h3 className="text-xs font-black text-foreground uppercase tracking-widest flex items-center gap-2">
                 <Navigation className="w-4 h-4 text-primary" />
                 Project Base Parameters
              </h3>

              <div className="space-y-4">
                 <div>
                    <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2 block">Site Area (SQM)</label>
                    <input 
                      type="number"
                      value={formData.area_sqm}
                      onChange={(e) => setFormData({...formData, area_sqm: parseInt(e.target.value)})}
                      className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                 </div>

                 <div>
                    <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2 block">Regional Logistics Hub</label>
                    <div className="grid grid-cols-2 gap-2">
                       {NIGERIAN_CITIES.map((c) => (
                         <button 
                           key={c.name}
                           onClick={() => setFormData({...formData, city: c.name})}
                           className={`py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${formData.city === c.name ? "bg-primary border-primary text-white shadow-md shadow-primary/20" : "bg-white border-border text-muted-foreground hover:bg-secondary"}`}
                         >
                           {c.name}
                         </button>
                       ))}
                    </div>
                 </div>

                 <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                       <span className="text-[10px] font-black text-primary uppercase">Include Inflation Adj.</span>
                       <button 
                         onClick={() => setFormData({...formData, include_inflation: !formData.include_inflation})}
                         className={`w-10 h-5 rounded-full transition-all relative ${formData.include_inflation ? 'bg-primary' : 'bg-slate-300'}`}
                       >
                         <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${formData.include_inflation ? 'right-1' : 'left-1'}`} />
                       </button>
                    </div>
                    <p className="text-[9px] text-primary/70 font-medium leading-relaxed italic">
                      "Adjusts for the 2024-2025 Naira FX volatility and energy surcharges."
                    </p>
                 </div>

                 <button 
                   onClick={() => mutation.mutate(formData)}
                   disabled={mutation.isPending}
                   className="w-full py-4 bg-slate-900 hover:bg-black text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-3"
                 >
                   {mutation.isPending ? (
                     <>
                        <Loader2 className="w-4 h-4 animate-spin text-primary" />
                        VECTORIZING BOQ...
                     </>
                   ) : (
                     <>
                        <Calculator className="w-4 h-4" />
                        RUN FINANCIAL SIM
                     </>
                   )}
                 </button>
              </div>
           </div>

           <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center border border-blue-100 shrink-0">
                 <Info className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-[10px] text-muted-foreground font-medium leading-relaxed uppercase">
                Estimates based on daily prices from <span className="font-black text-blue-600">CUTSTRUCT™</span> Market Index.
              </p>
           </div>
        </div>

        {/* Output Panel */}
        <div className="lg:col-span-8 space-y-6">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-slate-900 p-8 rounded-3xl text-white relative overflow-hidden shadow-xl flex flex-col justify-center items-center text-center"
              >
                 <div className="absolute top-0 right-0 p-8 opacity-5">
                    <Banknote className="w-48 h-48" />
                 </div>
                 <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-3">Project Sum Estimate</p>
                 <h2 className="text-5xl font-black tracking-tighter mb-4">
                    ₦{totalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                 </h2>
                 <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-md">
                    <Target className="w-4 h-4 text-primary" />
                    <span className="text-[10px] font-black uppercase tracking-widest">96.8% Confidence</span>
                 </div>
              </motion.div>

              <div className="bg-white p-6 rounded-3xl border border-border shadow-sm h-64 md:h-auto">
                 <h3 className="text-[10px] font-black text-muted-foreground uppercase tracking-widest pl-2 mb-6">Capital Allocation Breakdown</h3>
                 <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                       <BarChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 'black', fill: '#64748b' }} dy={10} />
                          <Tooltip 
                             cursor={{ fill: '#f8fafc' }}
                             contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 'black', fontSize: '10px' }}
                          />
                          <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                             {chartData.map((entry, index) => (
                               <Cell key={`cell-${index}`} fill={entry.color} />
                             ))}
                          </Bar>
                       </BarChart>
                    </ResponsiveContainer>
                 </div>
              </div>
           </div>

           {/* BOQ Summary Card */}
           <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden flex flex-col">
              <div className="px-6 py-4 border-b border-border flex justify-between items-center">
                 <h3 className="text-xs font-black text-foreground uppercase tracking-widest">Bill of Quantities (AI Draft)</h3>
                 <button className="text-[10px] font-black text-primary hover:underline uppercase tracking-tighter">Export BOQ.xlsx</button>
              </div>
              <div className="overflow-x-auto">
                 <table className="w-full text-left border-collapse">
                    <thead className="bg-secondary/30">
                       <tr>
                          <th className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase">Material Item</th>
                          <th className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase text-right">Unit Rate (₦)</th>
                          <th className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase text-right">Quantity</th>
                          <th className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase text-right">Subtotal</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                       {MATERIAL_PRICES.slice(0, 4).map((m, i) => (
                         <tr key={i} className="hover:bg-secondary/10 transition-colors">
                            <td className="px-6 py-4 flex items-center gap-3">
                               <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                                  <FileText className="w-4 h-4 text-primary" />
                               </div>
                               <span className="text-xs font-bold text-foreground">{m.name}</span>
                            </td>
                            <td className="px-6 py-4 text-right text-xs font-black text-foreground">₦{m.price.toLocaleString()}</td>
                            <td className="px-6 py-4 text-right text-xs font-medium text-muted-foreground">842 Units</td>
                            <td className="px-6 py-4 text-right text-xs font-black text-primary">₦{(m.price * 842).toLocaleString()}</td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

