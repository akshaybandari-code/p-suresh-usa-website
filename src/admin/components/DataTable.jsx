import React from 'react';
import { Loader2, Plus, Edit3, Trash2 } from 'lucide-react';

export default function DataTable({ 
  columns, 
  data = [], 
  loading = false, 
  onEdit, 
  onDelete, 
  actionsLabel = "Actions",
  emptyLabel = "No records found.",
  customId = "admin-data-table"
}) {
  return (
    <div id={customId} className="w-full bg-theme-card border border-theme-border rounded-xl shadow-3xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-theme-border bg-theme-surface/50 text-[10px] font-mono tracking-wider font-extrabold text-theme-text-secondary uppercase select-none">
              {columns.map((col, idx) => (
                <th key={idx} className="px-6 py-4 font-semibold">
                  {col.header}
                </th>
              ))}
              {(onEdit || onDelete) && (
                <th className="px-6 py-4 text-right font-semibold">
                  {actionsLabel}
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-theme-border">
            {loading ? (
              <tr>
                <td colSpan={columns.length + ((onEdit || onDelete) ? 1 : 0)} className="py-24 text-center">
                  <div className="flex flex-col items-center justify-center gap-2 text-theme-text-secondary select-none">
                    <Loader2 className="w-6 h-6 animate-spin text-amber-500" />
                    <span className="text-xs font-mono font-bold tracking-widest uppercase">Retrieving database assets...</span>
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + ((onEdit || onDelete) ? 1 : 0)} className="py-16 text-center text-sm text-theme-text-secondary select-none">
                  {emptyLabel}
                </td>
              </tr>
            ) : (
              data.map((row, rowIdx) => (
                <tr 
                  key={row.id || rowIdx} 
                  className="hover:bg-theme-surface/50 transition-colors duration-200 text-xs text-theme-text-primary"
                >
                  {columns.map((col, colIdx) => {
                    const cellValue = row[col.accessor];
                    return (
                      <td key={colIdx} className="px-6 py-4 max-w-xs break-words">
                        {col.render ? col.render(row, cellValue) : cellValue}
                      </td>
                    );
                  })}
                  {(onEdit || onDelete) && (
                    <td className="px-6 py-4 text-right flex items-center justify-end gap-2.5">
                      {onEdit && (
                        <button
                           onClick={() => onEdit(row)}
                           className="p-1.5 bg-theme-surface border border-theme-border text-theme-text-secondary hover:text-amber-500 hover:bg-amber-500/5 hover:border-amber-500/20 rounded transition-all duration-200 cursor-pointer select-none"
                           title="Edit Document"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                      )}
                      {onDelete && (
                        <button
                           onClick={() => onDelete(row)}
                           className="p-1.5 bg-theme-surface border border-theme-border text-theme-text-secondary hover:text-red-500 hover:bg-red-500/10 hover:border-red-500/20 rounded transition-all duration-200 cursor-pointer select-none"
                           title="Delete Document"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
