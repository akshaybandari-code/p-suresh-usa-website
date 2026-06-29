import React from 'react';
import { Menu, Sun, Moon, Link as LinkIcon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar({ onMenuToggle, adminUser }) {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const getPageTitle = (path) => {
    const cleanPath = path.toLowerCase();
    if (cleanPath === '/admin' || cleanPath === '/admin/' || cleanPath === '/admin/dashboard') return 'Dashboard';
    if (cleanPath.startsWith('/admin/services')) return 'Services';
    if (cleanPath.startsWith('/admin/articles')) return 'Articles';
    if (cleanPath.startsWith('/admin/tax-updates')) return 'Tax Updates';
    if (cleanPath.startsWith('/admin/resources')) return 'Resources';
    if (cleanPath.startsWith('/admin/team')) return 'Team Members';
    if (cleanPath.startsWith('/admin/settings')) return 'Settings';
    return 'Admin Portal';
  };

  const pageTitle = getPageTitle(location.pathname);

  return (
    <header
      id="admin-navbar-header"
      className="h-16 bg-theme-surface border-b border-theme-border flex items-center justify-between px-6 md:px-8 fixed top-0 left-0 lg:left-64 right-0 z-30 transition-all duration-200 !rounded-none !shadow-none"
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
        <div className="hidden sm:flex items-center gap-2 select-none text-xs">
          <Link to="/" className="font-mono font-bold text-amber-500 hover:underline flex items-center gap-1">
            <LinkIcon className="w-3.5 h-3.5" />
            <span>Public Site</span>
          </Link>
          <span className="text-theme-text-secondary font-mono text-[11px]">/</span>
          <Link to="/admin/dashboard" className="font-semibold text-theme-text-secondary hover:text-theme-text-primary transition-colors">
            Admin Portal
          </Link>
          <span className="text-theme-text-secondary font-mono text-[11px]">/</span>
          <span className="font-bold text-amber-500 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md font-sans">
            {pageTitle}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Administrator Role Badge */}
        <div className="hidden md:flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full text-[10px] font-mono tracking-tight font-bold text-amber-500 select-none">
          <span>Authorized Administrator</span>
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
