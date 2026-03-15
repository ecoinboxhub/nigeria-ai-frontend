"use client";

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { Circle, User } from "lucide-react";

export default function Header() {
  const { data: health } = useQuery({
    queryKey: ["health"],
    queryFn: async () => {
      try {
        const res = await api.get("/health");
        return res.data;
      } catch {
        return { status: "offline" };
      }
    },
    refetchInterval: 10000, 
  });

  const isOnline = health?.status === "ok";

  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-8 sticky top-0 z-50">
      <div className="flex items-center gap-4 flex-1">
        <h2 className="text-lg font-bold text-foreground">
          Nigeria Construction AI
        </h2>
      </div>

      <div className="flex-1 flex justify-center">
        <div className="relative w-full max-w-md hidden md:block">
           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
             <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
             </svg>
           </div>
           <input
             type="text"
             className="block w-full pl-10 pr-3 py-2 border border-border rounded-md leading-5 bg-secondary placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm transition duration-150 ease-in-out"
             placeholder="Search resources..."
           />
        </div>
      </div>

      <div className="flex items-center gap-4 flex-1 justify-end">
        <div className="flex items-center gap-2 bg-secondary px-3 py-1.5 rounded-full border border-border">
          <Circle className={`w-2 h-2 fill-current ${isOnline ? "text-green-500" : "text-amber-500"}`} />
          <span className="text-xs font-medium text-foreground">
            {isOnline ? "API ONLINE" : "OFFLINE"}
          </span>
        </div>
        <div className="w-8 h-8 rounded bg-secondary flex items-center justify-center border border-border cursor-pointer hover:bg-gray-100 transition-colors">
          <svg className="w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </div>
        <div className="w-8 h-8 rounded bg-primary flex items-center justify-center cursor-pointer border border-primary overflow-hidden">
          <User className="w-4 h-4 text-primary-foreground" />
        </div>
      </div>
    </header>
  );
}
