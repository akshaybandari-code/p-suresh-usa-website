import React from 'react';
import { Menu, Sun, Moon, Link as LinkIcon, User, Monitor } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { Link } from 'react-router-dom';

export default function Navbar({ onMenuToggle, adminUser }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header
      id="admin-navbar-header"
      className="h-16 bg-theme-card border-b border-theme-border flex items-center justify-between px-6 sticky top-0 z-30"
    >
      <div className="flex items-center gap-4">
        {/* Mobile Burger Toggle */}
        <button
          id="admin-mobile-burger-toggle"
          onClick={onMenuToggle}
          className="p-2 text-theme-text-secondary hover:text-theme-text-primary hover:bg-theme-surface rounded-lg lg:hidden transition-colors"
          title="Open Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Workspace Breadcrumbs */}
        <div className="hidden sm:flex items-center gap-2 select-none">
          <Link to="/" className="text-xs font-mono font-bold text-amber-500 hover:underline flex items-center gap-1">
            <LinkIcon className="w-3 h-3" />
            <span>Public Site</span>
          </Link>
          <span className="text-theme-text-secondary font-mono text-[11px] select-none">/</span>
          <span className="text-xs font-semibold text-theme-text-primary">Admin Portal</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Live Operational Status */}
        <div className="hidden md:flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full text-[10px] font-mono tracking-tight font-bold text-emerald-500 select-none">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>System Status</span>
        </div>

        {/* Theme Toggle */}
        <button
          id="admin-theme-toggle-btn"
          onClick={toggleTheme}
          className="p-2 text-theme-text-secondary hover:text-theme-text-primary hover:bg-theme-surface rounded-lg transition-colors"
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* User Account Avatar Summary */}
        <div className="flex items-center gap-3 border-l border-theme-border pl-4">
          <Link to="/admin/settings" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-full bg-linear-to-br from-amber-500 to-amber-600 text-slate-950 flex items-center justify-center font-bold font-mono text-xs shadow-3xs select-none">
              {(adminUser?.name || 'A')[0]}
            </div>
            <div className="hidden sm:block text-left select-none">
              <p className="text-xs font-bold text-theme-text-primary">
                {adminUser?.name || 'Administrator'}
              </p>
              <p className="text-[10px] font-mono text-theme-text-secondary">
                {adminUser?.role || 'Admin'}
              </p>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
