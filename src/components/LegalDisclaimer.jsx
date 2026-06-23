import React from 'react';
import { Scale } from 'lucide-react';

export default function LegalDisclaimer() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300" id="legal-disclaimer-banner">
      <div className="bg-amber-500/5 dark:bg-amber-500/2 border border-amber-500/20 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-start gap-4 shadow-3xs">
        <div className="p-2 bg-amber-500/10 text-amber-500 dark:text-amber-400 rounded-lg shrink-0">
          <Scale className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <p className="font-mono text-2xs md:text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            Professional Regulatory Notice &amp; Legal Disclaimer
          </p>
          <p className="text-xs sm:text-sm text-theme-text-secondary leading-relaxed font-sans">
            The information provided on this website is for informational purposes only and should not be considered legal, tax, financial, or legal advice. Please consult a qualified professional before making decisions.
          </p>
        </div>
      </div>
    </div>
  );
}
