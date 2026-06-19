import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from '../hooks/useTheme';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      id="site-theme-toggle-btn"
      onClick={toggleTheme}
      className="p-2.5 bg-theme-surface rounded-lg text-theme-text-primary hover:text-amber-500 border border-theme-border cursor-pointer relative shadow-2xs hover:shadow-xs transition-colors flex items-center justify-center outline-none"
      title={theme === 'dark' ? 'Switch to Light Corporate Mode' : 'Switch to Dark Fintech Mode'}
      aria-label="Toggle theme preference"
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {theme === 'light' ? (
          <motion.div
            key="sun-icon"
            initial={{ scale: 0.5, rotate: -45, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0.5, rotate: 45, opacity: 0 }}
            className="absolute shrink-0 text-amber-500"
          >
            <Sun className="w-5 h-5 fill-amber-500/20" />
          </motion.div>
        ) : (
          <motion.div
            key="moon-icon"
            initial={{ scale: 0.5, rotate: 45, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0.5, rotate: -45, opacity: 0 }}
            className="absolute shrink-0 text-amber-400"
          >
            <Moon className="w-5 h-5 fill-amber-400/20" />
          </motion.div>
        )}
      </div>
    </button>
  );
}
