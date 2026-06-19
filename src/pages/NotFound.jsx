import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';

export default function NotFound() {
  return (
    <div className="bg-theme-background text-theme-text-primary min-h-[70vh] flex items-center justify-center transition-colors duration-200">
      <SEO title="404 - Page Not Found" />
      <div className="max-w-md w-full px-6 py-12 text-center space-y-6">
        <div className="w-20 h-20 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-500/20 shadow-sm">
          <ShieldAlert className="w-10 h-10" />
        </div>
        <h1 className="text-6xl font-black font-display tracking-tight text-theme-text-primary">404</h1>
        <h2 className="text-xl sm:text-2xl font-bold font-sans text-theme-text-secondary">
          Page Not Found
        </h2>
        <p className="text-sm text-theme-text-secondary font-sans leading-relaxed px-4">
          The regulatory page or reference document you are looking for may have been moved, updated, or temporarily archived.
        </p>
        <div className="pt-6 border-t border-theme-border flex justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-theme-primary text-theme-background text-sm font-semibold rounded-lg font-mono hover:opacity-90 transition-all shadow hover:-translate-y-0.5"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
