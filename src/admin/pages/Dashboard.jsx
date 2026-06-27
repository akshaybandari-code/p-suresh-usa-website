import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { safeLocalStorage as localStorage } from '../../utils/safeLocalStorage';
import { 
  Briefcase, 
  FileText, 
  CalendarDays, 
  Download, 
  Users, 
  ExternalLink,
  Bell,
  Clock
} from 'lucide-react';
import StatCard from '../components/StatCard';
import { cmsService } from '../services/cmsService';
import { mockDashboardActivities, mockDashboardNotifications } from '../../data/mockData';

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

      {/* Main Administrative Widgets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
        {/* Activity Logs card */}
        <div className="bg-theme-card border border-theme-border rounded-xl p-6 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 border-b border-theme-border pb-3">
              <Clock className="w-4 h-4 text-amber-500 shrink-0" />
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-theme-text-primary">
                Recent Activity Logs
              </h3>
            </div>
            <div className="space-y-4 max-h-[220px] overflow-y-auto pr-1 mt-3">
              {mockDashboardActivities.map((act) => (
                <div key={act.id} className="flex gap-2.5 text-xs">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0 animate-pulse" />
                  <div className="space-y-0.5">
                    <p className="text-theme-text-primary leading-snug">{act.message}</p>
                    <p className="text-[9px] text-theme-text-secondary font-mono">{act.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Notifications card */}
        <div className="bg-theme-card border border-theme-border rounded-xl p-6 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 border-b border-theme-border pb-3">
              <Bell className="w-4 h-4 text-amber-500 shrink-0" />
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-theme-text-primary">
                System Notifications
              </h3>
            </div>
            <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1 mt-3">
              {mockDashboardNotifications.map((not) => {
                const badgeColor = not.severity === 'high' 
                  ? 'bg-rose-500/10 text-rose-500 border-rose-500/25' 
                  : not.severity === 'medium'
                    ? 'bg-amber-500/10 text-amber-500 border-amber-500/25'
                    : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/25';
                return (
                  <div key={not.id} className="p-3 bg-theme-surface border border-theme-border rounded-lg space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-[8px] font-mono font-extrabold uppercase border px-1.5 py-0.5 rounded ${badgeColor}`}>
                        {not.severity}
                      </span>
                      <span className="text-[9px] text-theme-text-secondary font-mono">{not.date}</span>
                    </div>
                    <p className="text-[11px] text-theme-text-primary leading-relaxed font-sans">
                      {not.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quick Actions card */}
        <div className="bg-theme-card border border-theme-border rounded-xl p-6 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 border-b border-theme-border pb-3">
              <Briefcase className="w-4 h-4 text-amber-500 shrink-0" />
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-theme-text-primary">
                CMS Quick Actions
              </h3>
            </div>
            <p className="text-xs text-theme-text-secondary leading-relaxed mt-3">
              Direct administrative shortcuts to add, remove, and manage your practices and client-facing document repository.
            </p>

            <div className="grid grid-cols-2 gap-2 text-center text-[10px] font-mono uppercase tracking-tight font-extrabold text-amber-500 mt-4">
              <Link to="/admin/services" className="p-2.5 bg-theme-surface border border-theme-border hover:border-amber-500/40 hover:bg-amber-500/5 rounded-lg flex flex-col items-center gap-1.5 transition-all">
                <Briefcase className="w-3.5 h-3.5 shrink-0 text-theme-text-secondary" />
                <span>Services</span>
              </Link>
              <Link to="/admin/articles" className="p-2.5 bg-theme-surface border border-theme-border hover:border-amber-500/40 hover:bg-amber-500/5 rounded-lg flex flex-col items-center gap-1.5 transition-all">
                <FileText className="w-3.5 h-3.5 shrink-0 text-theme-text-secondary" />
                <span>Articles</span>
              </Link>
              <Link to="/admin/tax-updates" className="p-2.5 bg-theme-surface border border-theme-border hover:border-amber-500/40 hover:bg-amber-500/5 rounded-lg flex flex-col items-center gap-1.5 transition-all">
                <CalendarDays className="w-3.5 h-3.5 shrink-0 text-theme-text-secondary" />
                <span>Tax Updates</span>
              </Link>
              <Link to="/admin/resources" className="p-2.5 bg-theme-surface border border-theme-border hover:border-amber-500/40 hover:bg-amber-500/5 rounded-lg flex flex-col items-center gap-1.5 transition-all">
                <Download className="w-3.5 h-3.5 shrink-0 text-theme-text-secondary" />
                <span>PDF Resources</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
