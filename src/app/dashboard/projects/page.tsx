"use client";

import { useState, useMemo } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { BarChart3, TrendingUp, AlertTriangle, Cloud, CloudRain, Sun, Thermometer, MapPin, Search, Plus, Truck, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface Project {
  id: string;
  name: string;
  location: string;
  progress_pct: number;
  status: string;
  budget_ngn: number;
}

interface Weather {
  city: string;
  temperature_c: number;
  condition: string;
  humidity_pct: number;
  rainfall_mm: number;
}

export default function ProjectTracker() {
  const [activeTab, setActiveTab] = useState("RISK ANALYSIS");
  const tabs = ["RISK ANALYSIS", "LIVE FEED", "ANALYTICS"];
  
  const [selectedCity, setSelectedCity] = useState("Lagos");

  // 1. Fetch live projects
  const { data: projects, isLoading: isLoadingProjects } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const res = await api.get<Project[]>("/project-tracker/");
      return res.data;
    }
  });

  // 2. Fetch live weather
  const { data: weather, isLoading: isLoadingWeather } = useQuery({
    queryKey: ["weather", selectedCity],
    queryFn: async () => {
      const res = await api.get<Weather>(`/project-tracker/weather/${selectedCity}`);
      return res.data;
    }
  });

  const [formData, setFormData] = useState({
    rainfall_mm: 5,
    resource_availability: 0.9,
    workforce_attendance: 0.85,
    supply_delay_days: 1,
    riskLevel: "LOW" as "LOW" | "MODERATE" | "CRITICAL"
  });

  const mutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const res = await api.post("/project-tracker/predict-delay", {
        ...data,
        city: selectedCity,
        temperature_c: weather?.temperature_c || 30,
        wind_speed_kmh: 10
      });
      return res.data;
    },
  });

  const riskScore = mutation.data ? Math.round(mutation.data.delay_risk * 100) : 12;
  const displayProjects = projects || [];

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-border shadow-sm">
        <div>
           <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest mb-1">
             <MapPin className="w-3 h-3" />
             <span>Regional Hub: South-West Nigeria</span>
           </div>
           <h1 className="text-2xl font-black text-foreground tracking-tight">PROJECT INTELLIGENCE</h1>
           <p className="text-sm text-muted-foreground font-medium">Monitoring 24 active construction sites across Nigeria</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
           <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-secondary/50 border border-border px-4 py-2 rounded-xl text-xs font-bold text-foreground hover:bg-secondary transition-all">
             <Search className="w-4 h-4" />
             FIND SITE
           </button>
           <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-primary px-4 py-2 rounded-xl text-xs font-bold text-primary-foreground hover:opacity-90 shadow-md shadow-primary/20 transition-all">
             <Plus className="w-4 h-4" />
             NEW LOG
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Risk Dial Card */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-border shadow-sm overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-border flex justify-between items-center">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-primary" />
              <h3 className="text-xs font-black text-foreground uppercase tracking-widest">Aggregate Risk Profile</h3>
            </div>
            <div className="flex gap-4">
               {tabs.map(tab => (
                 <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-[10px] font-black uppercase tracking-widest transition-colors ${activeTab === tab ? "text-primary underline underline-offset-4" : "text-muted-foreground hover:text-foreground"}`}
                 >
                   {tab}
                 </button>
               ))}
            </div>
          </div>
          
          <div className="flex-1 p-8 flex flex-col items-center justify-center bg-gradient-to-b from-white to-secondary/20">
            {/* SVG RISK DIAL */}
            <div className="relative w-64 h-64 mb-6">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="128"
                  cy="128"
                  r="110"
                  stroke="currentColor"
                  strokeWidth="16"
                  fill="transparent"
                  className="text-secondary"
                />
                <motion.circle
                  cx="128"
                  cy="128"
                  r="110"
                  stroke="currentColor"
                  strokeWidth="16"
                  fill="transparent"
                  strokeDasharray={2 * Math.PI * 110}
                  initial={{ strokeDashoffset: 2 * Math.PI * 110 }}
                  animate={{ strokeDashoffset: (2 * Math.PI * 110) * (1 - riskScore / 100) }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  strokeLinecap="round"
                  className={riskScore > 70 ? "text-red-500" : riskScore > 30 ? "text-amber-500" : "text-primary"}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span 
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  key={riskScore}
                  className="text-6xl font-black text-foreground tracking-tighter"
                >
                  {riskScore}%
                </motion.span>
                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Structural Risk</span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 w-full gap-4 mt-4">
               {[
                 { label: "Predictive", val: "Low", icon: TrendingUp },
                 { label: "Environmental", val: "Stable", icon: Cloud },
                 { label: "Logistics", val: "Critical", icon: Truck },
               ].map((item, i) => (
                 <div key={i} className="bg-white p-3 rounded-xl border border-border shadow-sm flex flex-col items-center text-center">
                    <item.icon className="w-4 h-4 text-primary mb-2" />
                    <span className="text-[9px] font-black text-muted-foreground uppercase">{item.label}</span>
                    <span className="text-xs font-bold text-foreground">{item.val}</span>
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* Weather Intelligence Widget */}
        <div className="bg-white rounded-2xl border border-border shadow-sm flex flex-col">
          <div className="px-6 py-4 border-b border-border flex justify-between items-center">
            <div className="flex items-center gap-2">
              <CloudRain className="w-4 h-4 text-primary" />
              <h3 className="text-xs font-black text-foreground uppercase tracking-widest">Weather Intelligence</h3>
            </div>
            <select 
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="text-[10px] font-black bg-secondary px-2 py-1 rounded outline-none border border-border"
            >
              {["Lagos", "Abuja", "Enugu", "Kano", "Port Harcourt", "Ibadan"].map(city => (
                <option key={city} value={city}>{city.toUpperCase()}</option>
              ))}
            </select>
          </div>
          
          <div className="flex-1 p-6 space-y-6">
            {isLoadingWeather ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : weather ? (
              <>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-4xl font-black text-foreground">{weather.temperature_c}°C</p>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{weather.condition}</p>
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                    {weather.condition?.toLowerCase().includes("sun") ? <Sun className="w-10 h-10 text-primary" /> : <CloudRain className="w-10 h-10 text-primary" />}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 rounded-xl bg-secondary/50">
                    <div className="flex items-center gap-2">
                      <Thermometer className="w-4 h-4 text-muted-foreground" />
                      <span className="text-xs font-bold">Rainfall</span>
                    </div>
                    <span className="text-xs font-black">{weather.rainfall_mm}mm</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-xl bg-secondary/50">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-500" />
                      <span className="text-xs font-bold">Humidity</span>
                    </div>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded ${weather.humidity_pct < 60 ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                      {weather.humidity_pct}%
                    </span>
                  </div>
                </div>

                <div className="mt-auto p-4 rounded-xl border border-border border-dashed bg-primary/5 text-center">
                   <p className="text-[10px] font-bold text-primary uppercase mb-1">Live AI Advisory</p>
                   <p className="text-[10px] text-muted-foreground font-medium leading-relaxed italic">
                     {weather.rainfall_mm > 10 ? "Heavy rain predicted. Secure all scaffolding and exposed wiring." : "Optimal conditions for outdoor structural work."}
                   </p>
                </div>
              </>
            ) : (
                <div className="text-center text-xs italic text-muted-foreground">Weather data unavailable</div>
            )}
          </div>
        </div>
      </div>

      {/* Active Projects Data Grid */}
      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex justify-between items-center">
          <h3 className="text-xs font-black text-foreground uppercase tracking-widest">Active Site Monitoring Portfolio</h3>
          {isLoadingProjects && <Loader2 className="w-3 h-3 animate-spin text-primary" />}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-secondary/30">
                <th className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-wider">Site Name</th>
                <th className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-wider">Location</th>
                <th className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-wider">Progress</th>
                <th className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-wider">Budget</th>
                <th className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {displayProjects.map((project) => (
                <tr key={project.id} className="hover:bg-secondary/10 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-xs font-bold text-foreground">{project.name}</p>
                  </td>
                  <td className="px-6 py-4">
                     <p className="text-[10px] text-muted-foreground font-medium">{project.location}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden w-20">
                        <div className="h-full bg-primary" style={{ width: `${project.progress_pct}%` }} />
                      </div>
                      <span className="text-[10px] font-black">{project.progress_pct}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold text-foreground">₦{(project.budget_ngn || 0).toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                       <div className={`w-1.5 h-1.5 rounded-full ${project.status === 'on_hold' ? 'bg-amber-500' : 'bg-green-500'}`} />
                       <span className="text-[10px] font-bold uppercase">{project.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-[10px] font-black text-primary hover:underline uppercase tracking-tighter">Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {displayProjects.length === 0 && !isLoadingProjects && (
            <div className="p-12 text-center text-xs italic text-muted-foreground">No active projects found.</div>
          )}
        </div>
      </div>
    </div>
  );
}

