import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Modal({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  id = "admin-modal" 
}) {
  // Prevent body scrolling when modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div id={id} className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity duration-300"
      />

      {/* Container Card */}
      <div className="bg-theme-card border border-theme-border rounded-xl shadow-xl w-full max-w-2xl max-h-[85vh] flex flex-col relative z-10 overflow-hidden transform animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-theme-border flex items-center justify-between bg-theme-surface/30 select-none">
          <h3 className="text-sm font-extrabold font-display tracking-tight text-theme-text-primary capitalize">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="p-1 text-theme-text-secondary hover:text-theme-text-primary hover:bg-theme-surface rounded-md transition-colors"
            title="Dismiss Form"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-grow text-xs text-theme-text-primary">
          {children}
        </div>
      </div>
    </div>
  );
}
