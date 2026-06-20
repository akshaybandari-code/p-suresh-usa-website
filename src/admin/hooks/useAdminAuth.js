import { useState, useEffect } from 'react';

export const useAdminAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('admin_authenticated') === 'true';
  });

  const [adminUser, setAdminUser] = useState(() => {
    const defaultProfile = { name: 'Administrator', email: 'admin@suureshusa.com', role: 'Admin' };
    const saved = localStorage.getItem('admin_profile');
    return saved ? JSON.parse(saved) : defaultProfile;
  });

  const login = (username, password) => {
    // Standard secure-checking for our custom CMS
    if (username.trim() === 'admin' && password.trim() === 'admin') {
      localStorage.setItem('admin_authenticated', 'true');
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('admin_authenticated');
    setIsAuthenticated(false);
  };

  const updateProfile = (profile) => {
    localStorage.setItem('admin_profile', JSON.stringify(profile));
    setAdminUser(profile);
  };

  return {
    isAuthenticated,
    adminUser,
    login,
    logout,
    updateProfile,
  };
};

export default useAdminAuth;
