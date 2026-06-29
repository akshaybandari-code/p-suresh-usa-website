import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Key, ShieldAlert, CheckCircle, Info } from 'lucide-react';
import useAdminAuth from '../hooks/useAdminAuth';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = location.state?.from?.pathname || '/admin/dashboard';

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setIsLoading(true);

    // Simulate standard cryptographic delay for high-fidelity CMS feel
    setTimeout(() => {
      const isSuccess = login(username, password);
      setIsLoading(false);

      if (isSuccess) {
        setSuccessMsg('Login successful. Access granted.');
        setTimeout(() => {
          navigate(redirectPath, { replace: true });
          window.location.reload(); // Refresh session router
        }, 600);
      } else {
        setErrorMsg('Invalid login credentials. Access denied.');
      }
    }, 400);
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-theme-background px-4 font-sans relative overflow-hidden select-none">
      {/* Decorative Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-theme-card border border-theme-border/80 rounded-2xl shadow-2xl p-7 space-y-6 relative z-10 transition-all">
        
        {/* Banner Section */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-2.5 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-xl mb-1 transition-all duration-300 hover:scale-105">
            <Key className="w-5.5 h-5.5 animate-pulse" />
          </div>
          <h2 className="text-xl font-extrabold font-display tracking-tight text-theme-text-primary">
            Administrator Login
          </h2>
          <p className="text-xs text-theme-text-secondary select-none">
            Content Management System for SuureshUSA
          </p>
        </div>

        {/* Handshake Messages */}
        {errorMsg && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-lg text-xs flex items-start gap-2 animate-in fade-in duration-200">
            <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 p-3 rounded-lg text-xs flex items-start gap-2 animate-in fade-in duration-200">
            <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="space-y-1.5 text-left">
            <label className="font-mono uppercase font-bold tracking-wider text-theme-text-secondary/80 text-[10px]">
              Username
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="w-full bg-theme-surface border border-theme-border hover:border-theme-border/80 focus:border-amber-500 rounded-lg px-3.5 py-2 text-xs text-theme-text-primary focus:outline-hidden transition-all font-mono"
            />
          </div>

          <div className="space-y-1.5 text-left">
            <label className="font-mono uppercase font-bold tracking-wider text-theme-text-secondary/80 text-[10px]">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full bg-theme-surface border border-theme-border hover:border-theme-border/80 focus:border-amber-500 rounded-lg px-3.5 py-2 text-xs text-theme-text-primary focus:outline-hidden transition-all font-mono"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-500/50 text-slate-950 font-bold rounded-lg transition-all focus:outline-hidden flex items-center justify-center gap-2 font-sans text-xs shadow-3xs cursor-pointer"
            >
              {isLoading ? 'Signing in...' : 'Sign In to Dashboard'}
            </button>
            
            <p className="text-[10px] text-theme-text-secondary text-center mt-2 select-none opacity-80 leading-normal">
              Secure administrator access for managing website content.
            </p>
          </div>
        </form>

      </div>
    </div>
  );
}
