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
    <div className="flex h-screen w-full bg-theme-background text-theme-text-primary overflow-hidden font-sans">
      
      {/* Sidebar navigation */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        onLogout={handleLogout} 
      />

      {/* Main Panel Area */}
      <div className="flex flex-col flex-1 min-w-0 h-full overflow-hidden">
        
        {/* Top bar control deck */}
        <Navbar 
          onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
          adminUser={adminUser}
        />

        {/* Scrollable child workspace content */}
        <main className="flex-grow overflow-y-auto px-4 md:px-8 py-6 space-y-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
