export default function Skeleton() {
  return (
    <div className="border border-theme-border bg-theme-card rounded-xl p-6 shadow-sm space-y-4 animate-pulse w-full">
      <div className="flex justify-between items-center">
        <div className="h-4 bg-theme-surface rounded w-1/4"></div>
        <div className="h-4 bg-theme-surface rounded w-1/6"></div>
      </div>
      <div className="h-6 bg-theme-surface rounded w-3/4"></div>
      <div className="space-y-2">
        <div className="h-4 bg-theme-surface rounded w-full"></div>
        <div className="h-4 bg-theme-surface rounded w-5/6"></div>
      </div>
      <div className="flex gap-2 items-center pt-2">
        <div className="w-6 h-6 rounded-full bg-theme-surface"></div>
        <div className="h-4 bg-theme-surface rounded w-1/5"></div>
      </div>
    </div>
  );
}
