import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  FileText, 
  CalendarDays, 
  Download, 
  Users, 
  Settings, 
  LogOut,
  X,
  FileSpreadsheet
} from 'lucide-react';

export default function Sidebar({ isOpen, onClose, onLogout }) {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { id: 'side-nav-dash', name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { id: 'side-nav-services', name: 'Services', path: '/admin/services', icon: Briefcase },
    { id: 'side-nav-articles', name: 'Articles', path: '/admin/articles', icon: FileText },
    { id: 'side-nav-tax-updates', name: 'Tax Updates', path: '/admin/tax-updates', icon: CalendarDays },
    { id: 'side-nav-resources', name: 'Resources', path: '/admin/resources', icon: Download },
    { id: 'side-nav-team', name: 'Team Members', path: '/admin/team', icon: Users },
    { id: 'side-nav-settings', name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  const checkActive = (path) => {
    if (path === '/admin/dashboard') {
      return currentPath === '/admin/dashboard' || currentPath === '/admin';
    }
    return currentPath.startsWith(path);
  };

  return (
    <>
      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div 
          id="admin-sidebar-overlay"
          onClick={onClose}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-xs transition-opacity duration-300"
        />
      )}

      <aside
        id="admin-sidebar"
        className={`fixed inset-y-0 left-0 w-64 bg-theme-surface border-r border-theme-border z-40 flex flex-col justify-between transform transition-transform duration-300 lg:translate-x-0 !rounded-none !shadow-none ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col flex-1">
          {/* Header */}
          <div className="h-16 flex items-center justify-between px-6 border-b border-theme-border select-none">
            <Link to="/admin/dashboard" className="flex items-center gap-2">
              <span className="p-1.5 bg-amber-500 rounded text-slate-950 font-bold font-mono text-xs tracking-wider select-none">
                SUSA
              </span>
              <span className="text-sm font-extrabold font-display tracking-tight text-theme-text-primary">
                Admin Portal
              </span>
            </Link>
            <button
              id="sidebar-close-mobile-btn"
              onClick={onClose}
              className="p-1 text-theme-text-secondary hover:text-theme-text-primary hover:bg-theme-surface rounded lg:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
            <p className="px-3 text-2xs font-mono font-bold tracking-widest text-theme-text-secondary uppercase select-none opacity-60">
              Navigation
            </p>
            <div className="pt-2 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = checkActive(item.path);
                return (
                  <Link
                    key={item.id}
                    id={item.id}
                    to={item.path}
                    onClick={onClose}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 select-none ${
                      isActive
                        ? 'bg-amber-500/10 text-amber-500 border-l-2 border-amber-500 font-semibold'
                        : 'text-theme-text-secondary hover:text-theme-text-primary hover:bg-theme-surface'
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-amber-500' : 'text-theme-text-secondary'}`} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>

        {/* Footer info & Logout */}
        <div className="p-4 border-t border-theme-border bg-theme-surface/30">
          <button
            id="sidebar-logout-btn"
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-500 hover:bg-red-500/10 hover:text-red-400 transition-all font-semibold select-none"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>Logout Account</span>
          </button>
          <div className="mt-4 px-3 text-[10px] font-mono text-theme-text-secondary opacity-60 select-none">
            <p>CMS v1.2.0 (Stable)</p>
            <p>Suuresh cross-border</p>
          </div>
        </div>
      </aside>
    </>
  );
}
