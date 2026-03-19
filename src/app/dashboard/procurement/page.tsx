"use client";

import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { 
  Building2,
  Wrench,
  ClipboardList,
  Download,
  AlertTriangle,
  Banknote,
  ShieldCheck,
  ChevronRight,
  BarChart3,
  TrendingUp,
  Search,
  Filter,
  Loader2
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from "recharts";

interface Material {
  id: string;
  name: string;
  category: string;
  unit: string;
}

interface Quote {
  supplier: string;
  latest_price_ngn: number;
  forecast_price_ngn: number;
  reliability_score: number;
}

interface ProcurementIntelligence {
  material: string;
  quotes: Quote[];
  best_supplier: string;
}

export default function ProcurementAssistant() {
  const [selectedMaterial, setSelectedMaterial] = useState<string>("Cement");

  // 1. Fetch all materials
  const { data: materials, isLoading: isLoadingMaterials } = useQuery({
    queryKey: ["materials"],
    queryFn: async () => {
      const res = await api.get<Material[]>("/procurement/materials");
      return res.data;
    }
  });

  // 2. Fetch intelligence for selected material
  const { data: intelligence, isLoading: isLoadingIntel } = useQuery({
    queryKey: ["intelligence", selectedMaterial],
    queryFn: async () => {
      const res = await api.post<ProcurementIntelligence>("/procurement/supplier-intelligence", {
        material: selectedMaterial,
        location: "Lagos",
        horizon_days: 30
      });
      return res.data;
    },
    enabled: !!selectedMaterial
  });

  const displayMaterials = materials || [];
  const currentQuotes = intelligence?.quotes || [];

  const chartData = useMemo(() => {
    if (currentQuotes.length === 0) return [];
    // Transform quotes into a simple chart format
    return currentQuotes.map((q, i) => ({
      name: q.supplier,
      actual: q.latest_price_ngn,
      forecast: q.forecast_price_ngn
    }));
  }, [currentQuotes]);

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      {/* Header & Tabs */}
      <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-foreground tracking-tight">PROCUREMENT ASSISTANT</h1>
          <p className="text-sm text-muted-foreground font-medium italic">Tracking 150+ construction material categories across Nigeria</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-secondary/50 px-4 py-2 rounded-xl text-xs font-bold text-foreground hover:bg-secondary transition-all border border-border">
            <Filter className="w-4 h-4" />
            FILTER CATEGORY
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-primary px-4 py-2 rounded-xl text-xs font-bold text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/20 transition-all">
            <Download className="w-4 h-4" />
            MARKET REPORT
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ARIMA Forecast Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-border shadow-sm p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h3 className="text-sm font-black text-foreground uppercase tracking-widest">Price Comparison & Forecast</h3>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-primary/5 rounded-full border border-primary/10">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] font-black text-primary uppercase">{selectedMaterial}</span>
            </div>
          </div>
          
          <div className="h-[300px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 700, fill: "#94a3b8" }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 700, fill: "#94a3b8" }}
                  tickFormatter={(val) => `₦${val/1000}k`}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)", fontSize: "12px", padding: "12px" }}
                  itemStyle={{ fontWeight: "bold" }}
                />
                <Area 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="#2563eb" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#colorActual)" 
                  name="Current Price"
                />
                <Area 
                  type="monotone" 
                  dataKey="forecast" 
                  stroke="#94a3b8" 
                  strokeWidth={3} 
                  strokeDasharray="5 5" 
                  fill="transparent" 
                  name="30D AI Forecast"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-6 p-4 rounded-xl border border-border border-dashed bg-secondary/30 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-border shadow-sm shrink-0">
               <AlertTriangle className="w-5 h-5 text-amber-500" />
            </div>
            <p className="text-[10px] text-muted-foreground font-medium leading-relaxed">
              <span className="font-bold text-foreground">Procurement Insight:</span> {intelligence ? `Based on ${intelligence.quotes.length} suppliers, the best source for ${selectedMaterial} is ${intelligence.best_supplier}.` : `Select a material to generate AI-driven procurement insights.`}
            </p>
          </div>
        </div>

        {/* Real-time Material Ticker */}
        <div className="bg-white rounded-2xl border border-border shadow-sm flex flex-col">
          <div className="px-6 py-4 border-b border-border flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Banknote className="w-4 h-4 text-primary" />
              <h3 className="text-xs font-black text-foreground uppercase tracking-widest">Market Ticker</h3>
            </div>
            {isLoadingMaterials ? (
              <Loader2 className="w-3 h-3 animate-spin text-muted-foreground" />
            ) : (
              <span className="text-[9px] font-black text-muted-foreground bg-secondary px-2 py-1 rounded">LIVE FEED ({displayMaterials.length})</span>
            )}
          </div>
          <div className="flex-1 p-4 space-y-3 overflow-y-auto max-h-[450px] scrollbar-hide">
            {displayMaterials.map((item) => (
              <div 
                key={item.id} 
                onClick={() => setSelectedMaterial(item.name)}
                className={`p-3 rounded-xl border transition-all cursor-pointer group ${selectedMaterial === item.name ? 'bg-primary/5 border-primary' : 'bg-secondary/20 border-border hover:bg-secondary/40'}`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="text-[9px] font-black text-primary tracking-widest uppercase">{item.category}</span>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">{item.name}</p>
                    <p className="text-[10px] text-muted-foreground font-medium italic">{item.unit}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Supplier Intelligence Grid */}
      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex justify-between items-center">
          <h3 className="text-xs font-black text-foreground uppercase tracking-widest">Supplier Forecasts: {selectedMaterial}</h3>
          {isLoadingIntel && <Loader2 className="w-4 h-4 animate-spin text-primary" />}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
          {currentQuotes.length > 0 ? (
            currentQuotes.map((quote, i) => (
              <div key={i} className="p-6 space-y-4 hover:bg-secondary/10 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center border border-primary/20">
                    <Building2 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-foreground">{quote.supplier}</p>
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-bold text-primary">₦{quote.latest_price_ngn.toLocaleString()}</span>
                      <span className="text-[10px] text-muted-foreground">• Current</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center text-[10px] font-bold">
                  <span className="text-muted-foreground uppercase tracking-widest">30D Forecast</span>
                  <span className="text-amber-600">₦{quote.forecast_price_ngn.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-[10px] font-bold">
                  <span className="text-muted-foreground uppercase tracking-widest">Confidence Score</span>
                  <span className="text-foreground">{Math.round(quote.reliability_score * 100)}%</span>
                </div>
                <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: `${quote.reliability_score * 100}%` }} />
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 p-12 text-center text-muted-foreground italic text-sm">
              Select a material to generate supplier intelligence
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

