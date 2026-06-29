import React, { useState, useEffect } from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import useAdminAuth from '../hooks/useAdminAuth';

export default function AdminLayout() {
  const { isAuthenticated, adminUser, logout } = useAdminAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // Redirect to login if user is not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  const handleLogout = () => {
    logout();
    window.location.reload(); // Refresh session router
  };

  return (
    <div className="h-screen w-screen bg-theme-background text-theme-text-primary overflow-hidden font-sans relative">
      
      {/* Sidebar navigation (truly fixed on the left) */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        onLogout={handleLogout} 
      />

      {/* Main Panel Area: Offset on desktop by sidebar width (lg:pl-64) */}
      <div className="flex flex-col h-full w-full lg:pl-64 overflow-hidden relative">
        
        {/* Top bar control deck (reused fixed header) */}
        <Navbar 
          onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
          adminUser={adminUser}
        />

        {/* Scrollable child workspace content: Offset from top by the fixed header's height (mt-16) */}
        <main className="flex-grow overflow-y-auto px-8 py-6 space-y-6 mt-16 text-left">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
