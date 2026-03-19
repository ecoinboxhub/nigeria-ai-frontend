"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { 
  Target, 
  Calculator, 
  ShieldAlert, 
  Truck, 
  FileSearch, 
  FileText, 
  Eye, 
  Users, 
  Wrench, 
  Network,
  ChevronLeft,
  Menu,
  LayoutDashboard
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const groups = [
  {
    name: "Project Intelligence",
    items: [
      { name: "Project Tracker", href: "/dashboard/projects", icon: Target },
      { name: "Cost Estimator", href: "/dashboard/cost", icon: Calculator },
      { name: "Tender Analyzer", href: "/dashboard/tender", icon: FileSearch },
    ]
  },
  {
    name: "Operations",
    items: [
      { name: "Workforce", href: "/dashboard/workforce", icon: Users },
      { name: "Procurement", href: "/dashboard/procurement", icon: Truck },
      { name: "Integrations", href: "/dashboard/integrations", icon: Network },
    ]
  },
  {
    name: "Compliance & Safety",
    items: [
      { name: "Safety Dashboard", href: "/dashboard/safety", icon: ShieldAlert },
      { name: "Progress Vision", href: "/dashboard/progress", icon: Eye },
      { name: "Document Analysis", href: "/dashboard/documents", icon: FileText },
      { name: "Maintenance", href: "/dashboard/maintenance", icon: Wrench },
    ]
  }
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside 
      className={cn(
        "border-r border-border bg-white h-screen flex flex-col fixed left-0 top-0 transition-all duration-300 z-[100]",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      <div className={cn("p-6 flex items-center justify-between", isCollapsed && "px-4")}>
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-primary flex items-center justify-center font-black text-primary-foreground text-lg shadow-sm">
              S
            </div>
            <h1 className="text-sm font-black text-foreground tracking-tight">
              STRUCTURE.OS
            </h1>
          </div>
        )}
        {isCollapsed && (
          <div className="w-10 h-10 rounded bg-primary flex items-center justify-center font-black text-primary-foreground text-xl shadow-sm mx-auto">
            S
          </div>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn(
            "p-2 hover:bg-secondary rounded-lg transition-colors text-muted-foreground",
            isCollapsed && "mt-4 mx-auto"
          )}
        >
          {isCollapsed ? <Menu className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 scrollbar-hide">
        {groups.map((group) => (
          <div key={group.name} className="mb-6">
            {!isCollapsed && (
              <h2 className="px-6 text-[10px] font-extrabold text-muted-foreground uppercase tracking-widest mb-3">
                {group.name}
              </h2>
            )}
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    title={isCollapsed ? item.name : ""}
                    className={cn(
                      "flex items-center gap-3 px-6 py-3 text-sm font-bold transition-all relative group",
                      isActive
                        ? "text-primary bg-primary/5"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                    )}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-1 bottom-1 w-1 bg-primary rounded-r-full" />
                    )}
                    <item.icon className={cn("w-5 h-5 shrink-0", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                    {!isCollapsed && <span>{item.name}</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
      
      <div className={cn("p-4 mt-auto border-t border-border", isCollapsed && "px-2")}>
        {isCollapsed ? (
          <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center mx-auto">
            <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
          </div>
        ) : (
          <div className="bg-secondary/50 p-4 rounded-xl border border-border">
            <p className="text-[10px] font-bold text-muted-foreground uppercase mb-2">Live Status</p>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
              <span className="text-xs font-bold text-foreground">Operational</span>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

