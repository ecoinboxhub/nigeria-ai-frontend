"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  Network 
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

  return (
    <aside className="w-64 border-r border-border bg-card h-screen flex flex-col fixed left-0 top-0">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded shrink-0 bg-primary flex items-center justify-center font-bold text-primary-foreground">
          P
        </div>
        <div>
          <h1 className="text-sm font-bold text-foreground leading-tight">
            Procurement<br/>Assistant
          </h1>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
        {groups.map((group) => (
          <div key={group.name}>
            <h2 className="px-4 text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">
              {group.name}
            </h2>
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg transition-all",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
      
      <div className="p-4 mt-auto">
        <div className="bg-secondary p-4 rounded-xl border border-border">
          <p className="text-[10px] font-bold text-muted-foreground uppercase mb-2">System Status</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-xs font-medium text-foreground">All systems operational</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
