import React from 'react';
import { Search, Plus, X } from 'lucide-react';

export default function SearchBar({ 
  value, 
  onChange, 
  placeholder = "Search documents...",
  onCreate, 
  createLabel = "Create",
  categories = [],
  selectedCategory = "",
  onCategoryChange,
  id = "admin-search-bar"
}) {
  return (
    <div id={id} className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 bg-theme-card border border-theme-border rounded-xl">
      <div className="flex-1 flex flex-wrap items-center gap-3">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-theme-text-secondary select-none" />
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full bg-theme-surface border border-theme-border hover:border-theme-border/80 focus:border-amber-500 rounded-lg pl-9 pr-8 py-2 text-xs text-theme-text-primary focus:outline-hidden transition-all placeholder:text-theme-text-secondary/60"
          />
          {value && (
            <button
              onClick={() => onChange('')}
              className="absolute right-3 top-2.5 text-theme-text-secondary hover:text-theme-text-primary"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Filter */}
        {onCategoryChange && categories.length > 0 && (
          <div className="min-w-[150px]">
            <select
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="w-full bg-theme-surface border border-theme-border focus:border-amber-500 rounded-lg px-3 py-2 text-xs text-theme-text-primary focus:outline-hidden transition-all font-sans cursor-pointer"
            >
              {categories.map((cat, idx) => (
                <option key={idx} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {onCreate && (
        <button
          id={`${id}-create-btn`}
          onClick={onCreate}
          className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-sans font-bold text-xs px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer shadow-3xs"
        >
          <Plus className="w-4 h-4 shrink-0" />
          <span>{createLabel}</span>
        </button>
      )}
    </div>
  );
}
