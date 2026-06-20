import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Briefcase, 
  FileText, 
  CalendarDays, 
  Download, 
  Users, 
  TrendingUp, 
  ExternalLink,
  ShieldAlert,
  Terminal,
  Activity,
  CheckCircle2
} from 'lucide-react';
import StatCard from '../components/StatCard';
import { cmsService } from '../services/cmsService';

export default function Dashboard() {
  const [counts, setCounts] = useState({
    services: 0,
    articles: 0,
    taxUpdates: 0,
    resources: 0,
    team: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        setLoading(true);
        const [services, articles, taxUpdates, resources, team] = await Promise.all([
          cmsService.getServices(),
          cmsService.getArticles(),
          cmsService.getTaxUpdates(),
          cmsService.getResources(),
          cmsService.getTeam(),
        ]);

        setCounts({
          services: services.length,
          articles: articles.length,
          taxUpdates: taxUpdates.length,
          resources: resources.length,
          team: team.length,
        });
      } catch (err) {
        console.error('Failed to aggregate statistics:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  const hasSanityWrite = !!localStorage.getItem('sanity_write_token');

  return (
    <div className="space-y-6 select-none animate-in fade-in duration-200 text-left">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-theme-border">
        <div>
          <p className="text-[10px] font-mono tracking-widest text-amber-500 font-bold uppercase">
            Overview
          </p>
          <h2 className="text-2xl font-extrabold font-display tracking-tight text-theme-text-primary">
            Welcome back, Administrator
          </h2>
          <p className="text-xs text-theme-text-secondary">
            Manage practice services, tax updates, articles, and downloadable resources.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            id="dash-explore-public-btn"
            to="/"
            target="_blank"
            className="flex items-center gap-2 bg-theme-card border border-theme-border hover:border-theme-text-secondary text-theme-text-primary px-3.5 py-2 rounded-lg text-xs font-semibold transition-all shadow-3xs"
          >
            <span>Preview Website</span>
            <ExternalLink className="w-3.5 h-3.5 shrink-0" />
          </Link>
        </div>
      </div>

      {/* Integration Status Box */}
      <div className={`p-4 border rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
        hasSanityWrite 
          ? 'bg-emerald-500/5 border-emerald-500/15 text-emerald-500' 
          : 'bg-amber-500/5 border-amber-500/15 text-amber-500'
      }`}>
        <div className="flex items-start gap-3">
          <div className={`p-2.5 rounded-lg border ${
            hasSanityWrite ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-amber-500/10 border-amber-500/20'
          }`}>
            {hasSanityWrite ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <ShieldAlert className="w-5 h-5 shrink-0" />}
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase font-mono tracking-wider">
              {hasSanityWrite ? 'Sanity Live Connection' : 'Standard Sandbox Database'}
            </h4>
            <p className="text-2xs text-theme-text-secondary mt-1 leading-normal">
              {hasSanityWrite 
                ? 'Your Admin Panel is connected directly to Sanity CMS. Changes are successfully synchronized.' 
                : 'Utilizing local storage database. Enter your Sanity API keys on the Settings page to synchronize a live production database.'}
            </p>
          </div>
        </div>
        <Link 
          to="/admin/settings" 
          className="text-xs font-mono font-bold tracking-tight px-3.5 py-1.5 bg-theme-card hover:bg-theme-surface border border-theme-border rounded-lg text-theme-text-primary shrink-0 text-center"
        >
          Manage Settings
        </Link>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard 
          title="Practice Services" 
          value={loading ? "..." : counts.services} 
          icon={Briefcase} 
          trendStr="Dual-jurisdiction advisory" 
          trendType="neutral"
        />
        <StatCard 
          title="Insights & Articles" 
          value={loading ? "..." : counts.articles} 
          icon={FileText} 
          trendStr="Editorial journals" 
          trendType="neutral"
        />
        <StatCard 
          title="Tax Updates" 
          value={loading ? "..." : counts.taxUpdates} 
          icon={CalendarDays} 
          trendStr="IRS & India Regulations" 
          trendType="neutral"
        />
        <StatCard 
          title="PDF Resources" 
          value={loading ? "..." : counts.resources} 
          icon={Download} 
          trendStr="Downloadable utility files" 
          trendType="neutral"
        />
        <StatCard 
          title="Managing Partners" 
          value={loading ? "..." : counts.team} 
          icon={Users} 
          trendStr="Registered CPAs & FCAs" 
          trendType="neutral"
        />
      </div>

      {/* System info deck */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
        <div className="lg:col-span-2 bg-theme-card border border-theme-border rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-theme-border pb-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-theme-text-primary flex items-center gap-2">
              <Activity className="w-4 h-4 text-amber-500" />
              <span>System Status & Activity</span>
            </h3>
            <span className="text-[10px] font-mono py-0.5 px-2 bg-theme-surface rounded border border-theme-border text-theme-text-secondary font-bold">
              STATUS: ACTIVE
            </span>
          </div>

          <div className="space-y-3 font-mono text-[11px] text-theme-text-secondary select-text">
            <div className="flex items-center gap-3 py-1 border-b border-theme-border/40">
              <span className="text-[9px] px-1.5 py-0.5 bg-emerald-500/10 text-emerald-500 rounded border border-emerald-500/25">INFO</span>
              <span className="text-slate-500">22:46:12</span>
              <span className="text-theme-text-primary font-sans">Local cache database initialized.</span>
            </div>
            <div className="flex items-center gap-3 py-1 border-b border-theme-border/40">
              <span className="text-[9px] px-1.5 py-0.5 bg-emerald-500/10 text-emerald-500 rounded border border-emerald-500/25">INFO</span>
              <span className="text-slate-500">22:48:44</span>
              <span className="text-theme-text-primary font-sans">CMS data layer connection initialized.</span>
            </div>
            <div className="flex items-center gap-3 py-1 border-b border-theme-border/40">
              <span className="text-[9px] px-1.5 py-0.5 bg-amber-500/10 text-amber-500 rounded border border-amber-500/25">WARN</span>
              <span className="text-slate-500">22:50:01</span>
              <span className="text-theme-text-primary font-sans">No Sanity write token found. Using local sandbox database.</span>
            </div>
            <div className="flex items-center gap-3 py-1">
              <span className="text-[9px] px-1.5 py-0.5 bg-emerald-500/10 text-emerald-500 rounded border border-emerald-500/25">INFO</span>
              <span className="text-slate-500">23:00:30</span>
              <span className="text-theme-text-primary font-sans">Administrator logged in successfully.</span>
            </div>
          </div>
        </div>

        {/* CMS quick actions card */}
        <div className="bg-theme-card border border-theme-border rounded-xl p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-theme-border pb-3">
              <Terminal className="w-4 h-4 text-amber-500" />
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-theme-text-primary">
                Quick Actions
              </h3>
            </div>
            <p className="text-xs text-theme-text-secondary leading-normal">
              Direct shortcuts to add files, services, and articles to the website database.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-center text-2xs font-mono uppercase tracking-tight font-extrabold text-amber-500">
            <Link to="/admin/services" className="p-3 bg-theme-surface border border-theme-border hover:border-amber-500/40 hover:bg-amber-500/5 rounded-lg flex flex-col items-center gap-2 transition-all">
              <Briefcase className="w-4 h-4 shrink-0 text-theme-text-secondary" />
              <span>Add Service</span>
            </Link>
            <Link to="/admin/articles" className="p-3 bg-theme-surface border border-theme-border hover:border-amber-500/40 hover:bg-amber-500/5 rounded-lg flex flex-col items-center gap-2 transition-all">
              <FileText className="w-4 h-4 shrink-0 text-theme-text-secondary" />
              <span>Add Article</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
