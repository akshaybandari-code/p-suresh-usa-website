import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ 
  currentPage = 1, 
  totalItems = 0, 
  itemsPerPage = 10, 
  onPageChange,
  id = "admin-pagination"
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  const startItemIdx = (currentPage - 1) * itemsPerPage + 1;
  const endItemIdx = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div id={id} className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-1 select-none">
      <div className="text-2xs font-mono text-theme-text-secondary">
        Showing <span className="font-bold text-theme-text-primary">{startItemIdx}</span> to <span className="font-bold text-theme-text-primary">{endItemIdx}</span> of <span className="font-bold text-theme-text-primary">{totalItems}</span> matching entries
      </div>

      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`p-1.5 rounded-lg border border-theme-border flex items-center justify-center transition-colors ${
            currentPage === 1
              ? 'text-theme-text-secondary/35 cursor-not-allowed bg-theme-surface/50'
              : 'text-theme-text-secondary hover:text-theme-text-primary hover:bg-theme-surface'
          }`}
          title="Previous Page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {getPageNumbers().map((num) => (
          <button
            key={num}
            onClick={() => onPageChange(num)}
            className={`w-8 h-8 rounded-lg text-xs font-mono font-bold border transition-all ${
              currentPage === num
                ? 'bg-amber-500 text-slate-950 border-amber-500 font-extrabold shadow-3xs'
                : 'text-theme-text-secondary border-theme-border hover:bg-theme-surface hover:text-theme-text-primary'
            }`}
          >
            {num}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`p-1.5 rounded-lg border border-theme-border flex items-center justify-center transition-colors ${
            currentPage === totalPages
              ? 'text-theme-text-secondary/35 cursor-not-allowed bg-theme-surface/50'
              : 'text-theme-text-secondary hover:text-theme-text-primary hover:bg-theme-surface'
          }`}
          title="Next Page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
