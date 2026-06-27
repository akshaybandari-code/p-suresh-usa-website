import React, { useState, useEffect } from 'react';
import { safeLocalStorage as localStorage } from '../../utils/safeLocalStorage';
import { useTheme } from '../../hooks/useTheme';
import useAdminAuth from '../hooks/useAdminAuth';
import { 
  Settings as SettingsIcon, 
  User, 
  Building,
  Globe,
  Sun, 
  Moon, 
  CheckCircle, 
  AlertCircle,
  Save,
  Phone,
  Mail
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

  // Social media forms
  const [socialForm, setSocialForm] = useState({
    linkedin: '',
    facebook: '',
    twitter: '',
    email: '',
    phone: '',
  });

  // Organization Information form
  const [orgForm, setOrgForm] = useState({
    name: '',
    address: '',
    practiceArea: '',
    regNumber: '',
  });

  // Success toast alerts
  const [toast, setToast] = useState({ message: '', type: 'success' });

  // Sanity connection form
  const [sanityForm, setSanityForm] = useState({
    projectId: '',
    dataset: 'production',
    writeToken: '',
  });

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

    // Load Social credentials
    setSocialForm({
      linkedin: localStorage.getItem('social_linkedin') || 'https://linkedin.com/company/suureshusa',
      facebook: localStorage.getItem('social_facebook') || 'https://facebook.com/suureshusa',
      twitter: localStorage.getItem('social_twitter') || 'https://x.com/suureshusa',
      email: localStorage.getItem('social_email') || 'mailto:tax@suureshusa.com',
      phone: localStorage.getItem('social_phone') || '+1 (212) 459-9023',
    });

    // Load Org credentials
    setOrgForm({
      name: localStorage.getItem('org_name') || 'P. Suresh & Associates',
      address: localStorage.getItem('org_address') || 'New Delhi, India & New York, USA',
      practiceArea: localStorage.getItem('org_practice_area') || 'India-US Cross-Border Tax & Compliance',
      regNumber: localStorage.getItem('org_reg_number') || 'ICAI Reg No. 102345/W',
    });

    // Load Sanity credentials
    setSanityForm({
      projectId: localStorage.getItem('sanity_project_id') || '',
      dataset: localStorage.getItem('sanity_dataset') || 'production',
      writeToken: localStorage.getItem('sanity_write_token') || '',
    });
  }, [adminUser]);

  const handleSaveSanity = (e) => {
    e.preventDefault();
    if (sanityForm.projectId.trim()) {
      localStorage.setItem('sanity_project_id', sanityForm.projectId.trim());
      localStorage.setItem('sanity_dataset', sanityForm.dataset.trim());
      localStorage.setItem('sanity_write_token', sanityForm.writeToken.trim());
      showToast('Sanity CMS API integration updated successfully.', 'success');
    } else {
      localStorage.removeItem('sanity_project_id');
      localStorage.removeItem('sanity_dataset');
      localStorage.removeItem('sanity_write_token');
      showToast('Sanity credentials cleared. Falling back to local offline mock data.', 'success');
    }
  };

  const handleSaveSocial = (e) => {
    e.preventDefault();
    localStorage.setItem('social_linkedin', socialForm.linkedin.trim());
    localStorage.setItem('social_facebook', socialForm.facebook.trim());
    localStorage.setItem('social_twitter', socialForm.twitter.trim());
    localStorage.setItem('social_email', socialForm.email.trim());
    localStorage.setItem('social_phone', socialForm.phone.trim());
    showToast('Social media links and contact details updated.');
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (!profileForm.name.trim() || !profileForm.email.trim()) {
      showToast('Profile name and email cannot be blank.', 'danger');
      return;
    }
    updateProfile(profileForm);
    showToast('Administrator profile updated successfully.');
  };

  const handleSaveOrg = (e) => {
    e.preventDefault();
    localStorage.setItem('org_name', orgForm.name.trim());
    localStorage.setItem('org_address', orgForm.address.trim());
    localStorage.setItem('org_practice_area', orgForm.practiceArea.trim());
    localStorage.setItem('org_reg_number', orgForm.regNumber.trim());
    showToast('Organization information saved successfully.');
  };

  return (
    <div className="space-y-6 select-none animate-in fade-in duration-200 text-left">
      
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-theme-border">
        <div>
          <p className="text-[10px] font-mono tracking-widest text-amber-500 font-bold uppercase">
            Settings
          </p>
          <h2 className="text-2xl font-extrabold font-display tracking-tight text-theme-text-primary">
            Settings
          </h2>
          <p className="text-xs text-theme-text-secondary">
            Configure website preferences, customize administrator profiles, and update organization details.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Spacing placeholder matching Dashboard header alignment */}
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

        {/* Website Preferences Card */}
        <div className="bg-theme-card border border-theme-border rounded-xl p-6 space-y-4 h-fit flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 border-b border-theme-border pb-3">
              <SettingsIcon className="w-4 h-4 text-amber-500" />
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-theme-text-primary">
                Website Preferences
              </h3>
            </div>
            <p className="text-xs text-theme-text-secondary leading-normal mt-3">
              Configure system display preferences and toggle light/dark theme options for the CMS and client endpoints.
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

        {/* Organization Information Form */}
        <div className="bg-theme-card border border-theme-border rounded-xl p-6 space-y-4 lg:col-span-2">
          <div className="flex items-center gap-2 border-b border-theme-border pb-3">
            <Building className="w-4 h-4 text-amber-500" />
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-theme-text-primary">
              Organization Information
            </h3>
          </div>

          <form onSubmit={handleSaveOrg} className="space-y-4 text-xs font-sans">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-mono text-2xs uppercase tracking-wider font-extrabold text-theme-text-secondary">
                  Firm Name
                </label>
                <input
                  type="text"
                  required
                  value={orgForm.name}
                  onChange={(e) => setOrgForm({ ...orgForm, name: e.target.value })}
                  placeholder="e.g. P. Suresh & Associates"
                  className="w-full bg-theme-surface border border-theme-border hover:border-theme-border/80 focus:border-amber-500 rounded-lg px-3.5 py-2.5 text-xs text-theme-text-primary focus:outline-hidden transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-2xs uppercase tracking-wider font-extrabold text-theme-text-secondary">
                  Registration / Authority Identifier
                </label>
                <input
                  type="text"
                  required
                  value={orgForm.regNumber}
                  onChange={(e) => setOrgForm({ ...orgForm, regNumber: e.target.value })}
                  placeholder="e.g. ICAI Reg No. 102345/W"
                  className="w-full bg-theme-surface border border-theme-border hover:border-theme-border/80 focus:border-amber-500 rounded-lg px-3.5 py-2.5 text-xs text-theme-text-primary focus:outline-hidden transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-mono text-2xs uppercase tracking-wider font-extrabold text-theme-text-secondary">
                Primary Specialty / Advisory Focus
              </label>
              <input
                type="text"
                required
                value={orgForm.practiceArea}
                onChange={(e) => setOrgForm({ ...orgForm, practiceArea: e.target.value })}
                placeholder="e.g. India-US Cross-Border Tax & Compliance"
                className="w-full bg-theme-surface border border-theme-border hover:border-theme-border/80 focus:border-amber-500 rounded-lg px-3.5 py-2.5 text-xs text-theme-text-primary focus:outline-hidden transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-mono text-2xs uppercase tracking-wider font-extrabold text-theme-text-secondary">
                Registered Office Address
              </label>
              <textarea
                required
                rows={2}
                value={orgForm.address}
                onChange={(e) => setOrgForm({ ...orgForm, address: e.target.value })}
                placeholder="e.g. New Delhi, India & New York, USA"
                className="w-full bg-theme-surface border border-theme-border hover:border-theme-border/80 focus:border-amber-500 rounded-lg px-3.5 py-2.5 text-xs text-theme-text-primary focus:outline-hidden transition-all resize-none"
              />
            </div>

            <div className="flex justify-end pt-3">
              <button
                type="submit"
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-lg text-xs font-sans flex items-center gap-1.5 transition-colors cursor-pointer shadow-3xs"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Organization Info</span>
              </button>
            </div>
          </form>
        </div>

        {/* Sanity CMS Connection Status Form */}
        <div className="bg-theme-card border border-theme-border rounded-xl p-6 h-fit space-y-4">
          <div className="flex items-center justify-between border-b border-theme-border pb-3">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-amber-500" />
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-theme-text-primary">
                Sanity API Integration
              </h3>
            </div>
            {sanityForm.projectId ? (
              <span className="px-2 py-0.5 rounded-full font-mono text-[9px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 animate-pulse">
                CONNECTED
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-full font-mono text-[9px] font-bold bg-red-500/10 text-red-400 border border-red-500/20">
                NOT CONNECTED
              </span>
            )}
          </div>

          <form onSubmit={handleSaveSanity} className="space-y-3.5 text-xs font-sans">
            <div className="space-y-1.5 text-left">
              <label className="font-mono text-2xs uppercase tracking-wider font-extrabold text-theme-text-secondary flex items-center justify-between">
                <span>Sanity Project ID</span>
                <span className="text-[9px] lowercase font-normal opacity-60">sanity_project_id</span>
              </label>
              <input
                type="text"
                value={sanityForm.projectId}
                onChange={(e) => setSanityForm({ ...sanityForm, projectId: e.target.value })}
                placeholder="e.g. 8g6h1k2v (leave blank to disconnect)"
                className="w-full bg-theme-surface border border-theme-border hover:border-theme-border/80 focus:border-amber-500 rounded-lg px-3 py-2 text-xs text-theme-text-primary focus:outline-hidden transition-all font-mono"
              />
            </div>

            <div className="space-y-1.5 text-left">
              <label className="font-mono text-2xs uppercase tracking-wider font-extrabold text-theme-text-secondary flex items-center justify-between">
                <span>Sanity Dataset</span>
                <span className="text-[9px] lowercase font-normal opacity-60">sanity_dataset</span>
              </label>
              <input
                type="text"
                value={sanityForm.dataset}
                onChange={(e) => setSanityForm({ ...sanityForm, dataset: e.target.value })}
                placeholder="production"
                className="w-full bg-theme-surface border border-theme-border hover:border-theme-border/80 focus:border-amber-500 rounded-lg px-3 py-2 text-xs text-theme-text-primary focus:outline-hidden transition-all font-mono"
              />
            </div>

            <div className="space-y-1.5 text-left">
              <label className="font-mono text-2xs uppercase tracking-wider font-extrabold text-theme-text-secondary flex items-center justify-between">
                <span>Write API Token (Secure)</span>
                <span className="text-[9px] lowercase font-normal opacity-60">sanity_write_token</span>
              </label>
              <input
                type="password"
                value={sanityForm.writeToken}
                onChange={(e) => setSanityForm({ ...sanityForm, writeToken: e.target.value })}
                placeholder="••••••••••••••••••••••••"
                className="w-full bg-theme-surface border border-theme-border hover:border-theme-border/80 focus:border-amber-500 rounded-lg px-3 py-2 text-xs text-theme-text-primary focus:outline-hidden transition-all font-mono"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-lg text-xs font-sans flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-3xs"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Update Connection</span>
            </button>
          </form>
        </div>

        {/* Contact Details & Social Media Links config card */}
        <div className="bg-theme-card border border-theme-border rounded-xl p-6 space-y-4 lg:col-span-3" id="admin-settings-social-card">
          <div className="flex items-center gap-2 border-b border-theme-border pb-3">
            <SettingsIcon className="w-4 h-4 text-amber-500" />
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-theme-text-primary">
              Contact Details &amp; Social Links
            </h3>
          </div>

          <form onSubmit={handleSaveSocial} className="space-y-4 text-xs font-sans select-none">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              <div className="space-y-1.5">
                <label className="font-mono text-2xs uppercase tracking-wider font-extrabold text-theme-text-secondary">
                  LinkedIn Profile
                </label>
                <input
                  type="url"
                  required
                  value={socialForm.linkedin}
                  onChange={(e) => setSocialForm({ ...socialForm, linkedin: e.target.value })}
                  placeholder="https://linkedin.com/company/your-firm"
                  className="w-full bg-theme-surface border border-theme-border hover:border-theme-border/80 focus:border-amber-500 rounded-lg px-3.5 py-2.5 text-xs text-theme-text-primary focus:outline-hidden transition-all font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-2xs uppercase tracking-wider font-extrabold text-theme-text-secondary">
                  Facebook Profile
                </label>
                <input
                  type="url"
                  required
                  value={socialForm.facebook}
                  onChange={(e) => setSocialForm({ ...socialForm, facebook: e.target.value })}
                  placeholder="https://facebook.com/your-firm"
                  className="w-full bg-theme-surface border border-theme-border hover:border-theme-border/80 focus:border-amber-500 rounded-lg px-3.5 py-2.5 text-xs text-theme-text-primary focus:outline-hidden transition-all font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              <div className="space-y-1.5">
                <label className="font-mono text-2xs uppercase tracking-wider font-extrabold text-theme-text-secondary">
                  X / Twitter Profile
                </label>
                <input
                  type="url"
                  required
                  value={socialForm.twitter}
                  onChange={(e) => setSocialForm({ ...socialForm, twitter: e.target.value })}
                  placeholder="https://x.com/your-firm"
                  className="w-full bg-theme-surface border border-theme-border hover:border-theme-border/80 focus:border-amber-500 rounded-lg px-3.5 py-2.5 text-xs text-theme-text-primary focus:outline-hidden transition-all font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-2xs uppercase tracking-wider font-extrabold text-theme-text-secondary">
                  Contact Email Address
                </label>
                <input
                  type="text"
                  required
                  value={socialForm.email}
                  onChange={(e) => setSocialForm({ ...socialForm, email: e.target.value })}
                  placeholder="mailto:tax@your-firm.com"
                  className="w-full bg-theme-surface border border-theme-border hover:border-theme-border/80 focus:border-amber-500 rounded-lg px-3.5 py-2.5 text-xs text-theme-text-primary focus:outline-hidden transition-all font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              <div className="space-y-1.5">
                <label className="font-mono text-2xs uppercase tracking-wider font-extrabold text-theme-text-secondary">
                  Business Phone Number
                </label>
                <input
                  type="text"
                  required
                  value={socialForm.phone}
                  onChange={(e) => setSocialForm({ ...socialForm, phone: e.target.value })}
                  placeholder="+1 (212) 459-9023"
                  className="w-full bg-theme-surface border border-theme-border hover:border-theme-border/80 focus:border-amber-500 rounded-lg px-3.5 py-2.5 text-xs text-theme-text-primary focus:outline-hidden transition-all font-mono"
                />
              </div>
            </div>

            <div className="flex justify-end pt-3">
              <button
                type="submit"
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-lg text-xs font-sans flex items-center gap-1.5 transition-colors cursor-pointer shadow-3xs"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Contact Details</span>
              </button>
            </div>
          </form>
        </div>

      </div>

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
    </div>
  );
}
