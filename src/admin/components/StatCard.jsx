import React from 'react';

export default function StatCard({ title, value, icon: Icon, trendStr, trendType = 'neutral' }) {
  const getTrendColor = () => {
    switch (trendType) {
      case 'success': return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/25';
      case 'warning': return 'text-amber-500 bg-amber-500/10 border-amber-500/25';
      case 'danger': return 'text-red-500 bg-red-500/10 border-red-500/25';
      default: return 'text-theme-text-secondary bg-theme-surface border-theme-border';
    }
  };

  return (
    <div
      className="bg-theme-card border border-theme-border rounded-xl py-3.5 px-4 shadow-3xs flex flex-col justify-between select-none hover:shadow-xs hover:border-theme-border/80 transition-all duration-200"
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
        <div className="p-2 bg-theme-surface border border-theme-border rounded-lg text-amber-500">
          <Icon className="w-6 h-6" />
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
