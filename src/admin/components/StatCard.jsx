import React from 'react';

export default function StatCard({ title, value, icon: Icon, trendStr, trendType = 'neutral' }) {
  const getTrendColor = () => {
    switch (trendType) {
      case 'success': return 'text-emerald-600 bg-emerald-500/5 dark:text-emerald-400 dark:bg-emerald-500/10 border-emerald-500/15 dark:border-emerald-500/25';
      case 'warning': return 'text-amber-600 bg-amber-500/5 dark:text-amber-400 dark:bg-amber-500/10 border-amber-500/15 dark:border-amber-500/25';
      case 'danger': return 'text-red-600 bg-red-500/5 dark:text-red-400 dark:bg-red-500/10 border-red-500/15 dark:border-red-500/25';
      default: return 'text-theme-text-secondary bg-theme-surface/60 border-theme-border/80';
    }
  };

  return (
    <div
      className="bg-theme-card border-l-3 border-l-amber-500/90 dark:border-l-amber-500 border-y border-r border-theme-border rounded-xl py-3.5 px-4 flex flex-col justify-between select-none hover:shadow-md hover:border-theme-border/90 transition-all duration-200"
    >
      <div className="flex items-start justify-between">
        <div className="space-y-0.5">
          <p className="text-[10px] font-mono tracking-wider font-bold text-theme-text-secondary uppercase">
            {title}
          </p>
          <h3 className="text-xl md:text-2xl font-bold font-display text-theme-text-primary">
            {value}
          </h3>
        </div>
        <div className="p-2.5 bg-amber-500/[0.04] dark:bg-amber-500/10 border border-amber-500/10 dark:border-amber-500/25 text-amber-600 dark:text-amber-400 rounded-xl transition-all duration-300 hover:scale-105 shrink-0">
          <Icon className="w-5.5 h-5.5" />
        </div>
      </div>

      {trendStr && (
        <div className="mt-2.5 flex items-center">
          <span className={`inline-block px-2 py-0.5 rounded-md text-[9px] font-mono font-bold border ${getTrendColor()}`}>
            {trendStr}
          </span>
        </div>
      )}
    </div>
  );
}
