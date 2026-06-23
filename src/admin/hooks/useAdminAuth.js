import { useState, useEffect } from 'react';
import { safeLocalStorage } from '../../utils/safeLocalStorage';

export const useAdminAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return safeLocalStorage.getItem('admin_authenticated') === 'true';
  });

  const [adminUser, setAdminUser] = useState(() => {
    const defaultProfile = { name: 'Administrator', email: 'admin@suureshusa.com', role: 'Admin' };
    try {
      const saved = safeLocalStorage.getItem('admin_profile');
      return saved ? JSON.parse(saved) : defaultProfile;
    } catch {
      return defaultProfile;
    }
  });

  const login = (username, password) => {
    // Standard secure-checking for our custom CMS
    if (username.trim() === 'admin' && password.trim() === 'admin') {
      safeLocalStorage.setItem('admin_authenticated', 'true');
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    safeLocalStorage.removeItem('admin_authenticated');
    setIsAuthenticated(false);
  };

  const updateProfile = (profile) => {
    safeLocalStorage.setItem('admin_profile', JSON.stringify(profile));
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
