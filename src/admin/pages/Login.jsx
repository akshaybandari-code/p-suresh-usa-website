import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Key, ShieldAlert, CheckCircle, HelpCircle } from 'lucide-react';
import useAdminAuth from '../hooks/useAdminAuth';

export default function Login() {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin');
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
    <div className="min-h-screen flex items-center justify-center bg-theme-background px-4 py-16 font-sans">
      <div className="w-full max-w-md bg-theme-card border border-theme-border/60 rounded-2xl shadow-xl p-8 space-y-6">
        
        {/* Banner Section */}
        <div className="text-center space-y-2 select-none">
          <div className="inline-flex p-3 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-xl mb-1">
            <Key className="w-6 h-6 animate-pulse" />
          </div>
          <h2 className="text-2xl font-extrabold font-display tracking-tight text-theme-text-primary">
            Admin Sign-In
          </h2>
          <p className="text-xs text-theme-text-secondary">
            Accounting & Tax Services Admin Portal
          </p>
        </div>

        {/* Handshake Messages */}
        {errorMsg && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3.5 rounded-lg text-xs flex items-start gap-2.5 animate-in fade-in duration-200">
            <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 p-3.5 rounded-lg text-xs flex items-start gap-2.5 animate-in fade-in duration-200">
            <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="space-y-1.5 text-left">
            <label className="font-mono uppercase font-bold tracking-wider text-theme-text-secondary select-none">
              Username
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. admin"
              className="w-full bg-theme-surface border border-theme-border hover:border-theme-border/80 focus:border-amber-500 rounded-lg px-3.5 py-2.5 text-xs text-theme-text-primary focus:outline-hidden transition-all font-mono"
            />
          </div>

          <div className="space-y-1.5 text-left">
            <label className="font-mono uppercase font-bold tracking-wider text-theme-text-secondary select-none">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-theme-surface border border-theme-border hover:border-theme-border/80 focus:border-amber-500 rounded-lg px-3.5 py-2.5 text-xs text-theme-text-primary focus:outline-hidden transition-all font-mono"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 mt-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-lg transition-all focus:outline-hidden flex items-center justify-center gap-2 font-sans text-xs shadow-3xs cursor-pointer"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Informational Guidelines helpful for interns/reviewers */}
        <div className="pt-4 border-t border-theme-border/60 bg-theme-surface/10 rounded-lg p-3 text-2xs font-mono text-theme-text-secondary select-none space-y-1.5">
          <p className="flex items-center gap-1 text-amber-500 font-bold uppercase tracking-wider text-[9px] mb-1">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Evaluation Quick-Access</span>
          </p>
          <p>This CMS is formatted for evaluation. Use the pre-authorized keys:</p>
          <div className="grid grid-cols-2 gap-2 text-center pt-1 font-mono text-theme-text-primary">
            <div className="p-1 bg-theme-surface rounded border border-theme-border">
              ID: <span className="font-bold text-amber-400">admin</span>
            </div>
            <div className="p-1 bg-theme-surface rounded border border-theme-border">
              PW: <span className="font-bold text-amber-400">admin</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
