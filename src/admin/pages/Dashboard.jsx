import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { safeLocalStorage as localStorage } from '../../utils/safeLocalStorage';
import { 
  Briefcase, 
  FileText, 
  CalendarDays, 
  Download, 
  Users, 
  ExternalLink
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

      {/* Quick Actions card */}
      <div className="max-w-md pt-2">
        <div className="bg-theme-card border border-theme-border rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-theme-border pb-3">
            <Briefcase className="w-4 h-4 text-amber-500" />
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-theme-text-primary">
              Quick Actions
            </h3>
          </div>
          <p className="text-xs text-theme-text-secondary leading-normal">
            Direct shortcuts to add files, services, and articles to the website database.
          </p>

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
