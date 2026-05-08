import React from "react";
import { cn } from "@/lib/utils";

export const TechBadge = ({ name, colorClass }: { name: string; colorClass?: string }) => (
  <span className={cn(
    "group inline-flex items-center justify-center px-3 py-1.5 rounded-lg border border-(--border-color) bg-(--bg-secondary) font-medium relative overflow-hidden text-(--text-primary) transition-all duration-300 ease-out whitespace-nowrap text-[13px] shadow-sm hover:shadow-md cursor-default",
    colorClass
  )}>
    <span className="pointer-events-none absolute inset-0 z-20 rounded-lg shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05),inset_0_2px_12px_rgba(255,255,255,0.08)] group-hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.15),inset_0_4px_16px_rgba(255,255,255,0.12)] transition-shadow duration-300" />
    <span className="relative z-30">{name}</span>
  </span>
);
