import React, { useState, useEffect } from 'react';
import { useTheme } from '../../hooks/useTheme';
import useAdminAuth from '../hooks/useAdminAuth';
import { 
  Settings as SettingsIcon, 
  User, 
  Database, 
  Sun, 
  Moon, 
  CheckCircle, 
  AlertCircle,
  Save,
  HelpCircle,
  Eye,
  EyeOff
} from 'lucide-react';

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  const { adminUser, updateProfile } = useAdminAuth();

  // Profile forms
  const [profileForm, setProfileForm] = useState({
    name: '',
    email: '',
    role: '',
  });

  // Sanity forms
  const [sanityForm, setSanityForm] = useState({
    projectId: '',
    dataset: 'production',
    writeToken: '',
  });

  const [showToken, setShowToken] = useState(false);

  // Success toast alerts
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: 'success' }), 3000);
  };

  useEffect(() => {
    if (adminUser) {
      setProfileForm({
        name: adminUser.name || 'Administrator',
        email: adminUser.email || 'admin@suureshusa.com',
        role: adminUser.role || 'Admin',
      });
    }

    // Load Sanity credentials
    setSanityForm({
      projectId: localStorage.getItem('sanity_project_id') || '',
      dataset: localStorage.getItem('sanity_dataset') || 'production',
      writeToken: localStorage.getItem('sanity_write_token') || '',
    });
  }, [adminUser]);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (!profileForm.name.trim() || !profileForm.email.trim()) {
      showToast('Profile name and email cannot be blank.', 'danger');
      return;
    }
    updateProfile(profileForm);
    showToast('Administrator profile updated successfully.');
  };

  const handleSaveSanity = (e) => {
    e.preventDefault();
    
    if (sanityForm.projectId.trim()) {
      localStorage.setItem('sanity_project_id', sanityForm.projectId.trim());
    } else {
      localStorage.removeItem('sanity_project_id');
    }

    if (sanityForm.dataset.trim()) {
      localStorage.setItem('sanity_dataset', sanityForm.dataset.trim());
    } else {
      localStorage.removeItem('sanity_dataset');
    }

    if (sanityForm.writeToken.trim()) {
      localStorage.setItem('sanity_write_token', sanityForm.writeToken.trim());
    } else {
      localStorage.removeItem('sanity_write_token');
    }

    showToast('Sanity credentials registered. Re-synchronizing schemas.');
    
    // Dispatch a storage event so services know parameters updated
    window.dispatchEvent(new Event('storage_keys_updated'));
  };

  const handleClearSanity = () => {
    localStorage.removeItem('sanity_project_id');
    localStorage.removeItem('sanity_dataset');
    localStorage.removeItem('sanity_write_token');
    
    setSanityForm({
      projectId: '',
      dataset: 'production',
      writeToken: '',
    });

    showToast('Custom Sanity keys purged. Reverting to sandbox storage.');
    window.dispatchEvent(new Event('storage_keys_updated'));
  };

  return (
    <div className="space-y-6 select-none animate-in fade-in duration-200 text-left relative">
      
      {/* Toast Alert capsule */}
      {toast.message && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-xl shadow-lg border text-xs flex items-center gap-3 animate-in slide-in-from-top-4 duration-350 ${
          toast.type === 'danger' 
            ? 'bg-red-500/10 border-red-500/20 text-red-500' 
            : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'
        }`}>
          {toast.type === 'danger' ? <AlertCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
          <span className="font-sans font-bold">{toast.message}</span>
        </div>
      )}

      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-theme-border">
        <div>
          <p className="text-[10px] font-mono tracking-widest text-amber-500 font-bold uppercase font-sans">Settings</p>
          <h2 className="text-2xl font-extrabold font-display tracking-tight text-theme-text-primary">
            Settings
          </h2>
          <p className="text-xs text-theme-text-secondary">
            Configure application appearance, customize administrative profiles, and manage Sanity parameters.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Profile Card Form */}
        <div className="bg-theme-card border border-theme-border rounded-xl p-6 space-y-4 lg:col-span-2">
          <div className="flex items-center gap-2 border-b border-theme-border pb-3">
            <User className="w-4 h-4 text-amber-500" />
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-theme-text-primary">
              Administrator Profile Info
            </h3>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4 text-xs font-sans">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-mono text-2xs uppercase tracking-wider font-extrabold text-theme-text-secondary">
                  Display / Sign name
                </label>
                <input
                  type="text"
                  required
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  placeholder="e.g. Ramesh Patel, Chief FCA"
                  className="w-full bg-theme-surface border border-theme-border hover:border-theme-border/80 focus:border-amber-500 rounded-lg px-3.5 py-2.5 text-xs text-theme-text-primary focus:outline-hidden transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-2xs uppercase tracking-wider font-extrabold text-theme-text-secondary">
                  Designation / Practice Title
                </label>
                <input
                  type="text"
                  required
                  value={profileForm.role}
                  onChange={(e) => setProfileForm({ ...profileForm, role: e.target.value })}
                  placeholder="e.g. Senior Partner"
                  className="w-full bg-theme-surface border border-theme-border hover:border-theme-border/80 focus:border-amber-500 rounded-lg px-3.5 py-2.5 text-xs text-theme-text-primary focus:outline-hidden transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-mono text-2xs uppercase tracking-wider font-extrabold text-theme-text-secondary">
                Registered Contact Email
              </label>
              <input
                type="email"
                required
                value={profileForm.email}
                onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                placeholder="admin@suureshusa.com"
                className="w-full bg-theme-surface border border-theme-border hover:border-theme-border/80 focus:border-amber-500 rounded-lg px-3.5 py-2.5 text-xs text-theme-text-primary focus:outline-hidden transition-all font-mono"
              />
            </div>

            <div className="flex justify-end pt-3">
              <button
                type="submit"
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-lg text-xs font-sans flex items-center gap-1.5 transition-colors cursor-pointer shadow-3xs"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Profile Info</span>
              </button>
            </div>
          </form>
        </div>

        {/* Theme select summary card */}
        <div className="bg-theme-card border border-theme-border rounded-xl p-6 space-y-4 h-fit flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 border-b border-theme-border pb-3">
              <SettingsIcon className="w-4 h-4 text-amber-500" />
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-theme-text-primary">
                Appearance
              </h3>
            </div>
            <p className="text-xs text-theme-text-secondary leading-normal mt-3">
              Configure system display preferences and toggle high-contrast display modes.
            </p>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <span className="text-2xs font-mono font-bold uppercase tracking-wide text-theme-text-primary">
              Active Mode: {theme.toUpperCase()}
            </span>
            <button
              onClick={toggleTheme}
              className="px-4 py-2.5 bg-theme-surface border border-theme-border hover:border-amber-500/40 rounded-lg text-xs font-bold font-sans flex items-center gap-2 transition-all cursor-pointer"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-4 h-4 text-amber-500" />
                  <span>Light Palette</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-amber-500" />
                  <span>Dark Palette</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Sanity Settings configuration */}
        <div className="bg-theme-card border border-theme-border rounded-xl p-6 space-y-4 lg:col-span-2">
          <div className="flex items-center gap-2 border-b border-theme-border pb-3">
            <Database className="w-4 h-4 text-amber-500" />
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-theme-text-primary">
              Sanity Configuration
            </h3>
          </div>

          <form onSubmit={handleSaveSanity} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-mono text-2xs uppercase tracking-wider font-extrabold text-theme-text-secondary">
                  Sanity Project ID
                </label>
                <input
                  type="text"
                  value={sanityForm.projectId}
                  onChange={(e) => setSanityForm({ ...sanityForm, projectId: e.target.value })}
                  placeholder="e.g. 8x3ja8ks"
                  className="w-full bg-theme-surface border border-theme-border hover:border-theme-border/80 focus:border-amber-500 rounded-lg px-3.5 py-2.5 text-xs text-theme-text-primary focus:outline-hidden transition-all font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-2xs uppercase tracking-wider font-extrabold text-theme-text-secondary">
                  Sanity Dataset Target
                </label>
                <input
                  type="text"
                  value={sanityForm.dataset}
                  onChange={(e) => setSanityForm({ ...sanityForm, dataset: e.target.value })}
                  placeholder="production"
                  className="w-full bg-theme-surface border border-theme-border hover:border-theme-border/80 focus:border-amber-500 rounded-lg px-3.5 py-2.5 text-xs text-theme-text-primary focus:outline-hidden transition-all font-mono"
                />
              </div>
            </div>

            <div className="space-y-1.5 relative">
              <label className="font-mono text-2xs uppercase tracking-wider font-extrabold text-theme-text-secondary">
                Sanity API Write Token
              </label>
              <div className="relative">
                <input
                  type={showToken ? 'text' : 'password'}
                  value={sanityForm.writeToken}
                  onChange={(e) => setSanityForm({ ...sanityForm, writeToken: e.target.value })}
                  placeholder="sk..."
                  className="w-full bg-theme-surface border border-theme-border hover:border-theme-border/80 focus:border-amber-500 rounded-lg pl-3.5 pr-10 py-2.5 text-xs text-theme-text-primary focus:outline-hidden transition-all font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowToken(!showToken)}
                  className="absolute right-3 top-3 text-theme-text-secondary hover:text-theme-text-primary"
                  title={showToken ? 'Hide token' : 'Show token'}
                >
                  {showToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-3">
              <button
                type="button"
                onClick={handleClearSanity}
                className="px-4 py-2 bg-red-500/10 hover:bg-red-500 hover:text-white rounded-lg text-xs font-semibold text-red-500 transition-all cursor-pointer"
              >
                Clear Custom Keys & Revert Sandbox
              </button>

              <button
                type="submit"
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-lg text-xs font-sans flex items-center gap-1.5 transition-colors cursor-pointer shadow-3xs"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save API credentials</span>
              </button>
            </div>
          </form>
        </div>

        {/* Informative tutorial guidelines card */}
        <div className="bg-theme-card border border-theme-border rounded-xl p-6 h-fit space-y-4">
          <div className="flex items-center gap-2 border-b border-theme-border pb-3">
            <HelpCircle className="w-4 h-4 text-amber-500" />
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-theme-text-primary">
              Information
            </h3>
          </div>

          <div className="space-y-3.5 text-2xs font-mono text-theme-text-secondary leading-relaxed">
            <p>
              By default, this Custom Administrative Panel tracks modifications securely across local sandbox structures for evaluation.
            </p>
            <p>
              If your firm has a Sanity Content Lake, paste the Project ID, dataset name (e.g. <span className="font-bold text-amber-500">production</span>), and write-supported API token here.
            </p>
            <p>
              Once saved, the app queries the Sanity endpoints directly using high-fidelity client loaders.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
