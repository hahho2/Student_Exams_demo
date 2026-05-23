'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  iconBgColor?: string;
  iconColor?: string;
}

export default function DashboardCard({
  title,
  value,
  icon: Icon,
  trend,
  iconBgColor = 'bg-primary/10',
  iconColor = 'text-primary'
}: DashboardCardProps) {
  return (
    <div className="bg-card-bg border border-surface-border p-6 rounded-xl shadow-soft flex items-center justify-between group transition-all-200 hover:border-primary/30">
      <div className="space-y-2">
        <div className="flex items-center gap-1.5">
          <p className="text-xs uppercase text-secondary font-bold tracking-wider">{title}</p>
          {trend && (
            <span className="text-[10px] text-emerald-500 font-bold bg-emerald-500/10 px-1 rounded">{trend}</span>
          )}
        </div>
        <h2 className="text-3xl font-extrabold text-foreground group-hover:text-primary transition-all-200">
          {value}
        </h2>
      </div>
      <div className={`w-12 h-12 rounded-lg ${iconBgColor} ${iconColor} flex items-center justify-center`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
  );
}
