import React from 'react';
import { AlertCircle, Trash2, X } from 'lucide-react';

export default function ConfirmDialog({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Are you absolutely sure?", 
  message = "This action is completely permanent and cannot be undone.",
  id = "admin-confirm-dialog"
}) {
  if (!isOpen) return null;

  return (
    <div id={id} className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity duration-300"
      />

      {/* Warning Card */}
      <div className="bg-theme-card border border-red-500/10 rounded-xl shadow-xl w-full max-w-md relative z-10 p-6 overflow-hidden transform animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-red-500/10 border border-red-400/20 text-red-500 rounded-lg">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div className="space-y-1.5 flex-1 select-none text-left">
            <h3 className="text-sm font-extrabold font-display tracking-tight text-theme-text-primary capitalize">
              {title}
            </h3>
            <p className="text-xs text-theme-text-secondary leading-relaxed">
              {message}
            </p>
          </div>
        </div>

        {/* Mutation buttons */}
        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-theme-surface border border-theme-border rounded-lg text-xs font-semibold text-theme-text-secondary hover:text-theme-text-primary hover:bg-theme-surface/80 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-xs font-bold font-sans flex items-center gap-1.5 transition-colors cursor-pointer shadow-3xs"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Confirm Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}
