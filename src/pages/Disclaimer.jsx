import React from 'react';
import { AlertTriangle, BookOpen, ShieldCheck, Scale } from 'lucide-react';
import CTASection from '../components/CTASection';
import SEO from '../components/SEO';

export default function Disclaimer() {
  return (
    <div className="bg-theme-background text-theme-text-primary min-h-screen transition-colors duration-200">
      <SEO title="Disclaimer" description="Important regulatory declarations regarding our financial publications, informational tools, and tax consultancy coordinates." url="https://www.suureshusa.com/disclaimer" />
      {/* Header section */}
      <section className="bg-theme-surface py-16 border-b border-theme-border text-center select-none">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <p className="text-2xs uppercase tracking-widest text-amber-500 font-mono">Legal Disclaimers</p>
          <h1 className="text-4xl font-extrabold font-display text-theme-text-primary">
            Regulatory Disclaimer
          </h1>
          <p className="text-xs sm:text-sm text-theme-text-secondary max-w-2xl mx-auto font-sans">
            Important regulatory declarations regarding our financial publications, informational tools, and tax consultancy coordinates.
          </p>
        </div>
      </section>

      {/* Main Body Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-theme-card border border-theme-border rounded-xl p-8 sm:p-12 space-y-8 font-sans text-sm text-theme-text-secondary leading-relaxed">
            
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-theme-text-primary">
                <BookOpen className="w-5 h-5 text-amber-500" />
                <h2 className="text-lg font-bold font-display">1. Information is Not Professional Tax Advice</h2>
              </div>
              <p>
                The materials, guides, calendars, spreadsheets, regulatory update summaries, and general calculations provided on this website are compiled solely for educational and general informational purposes. They do not constitute formal, legal, or definitive tax advice. Because regulations change rapidly (such as IRS provisions, Indian Finance Ministry notifications, and DTAA interpretations), readers should not act upon this information without consulting qualified tax advisers on their exact individual situations.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-theme-text-primary">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                <h2 className="text-lg font-bold font-display">2. No Professional-Client Relationship</h2>
              </div>
              <p>
                Sending an email, filling out a contact submission form, using interactive pre-migration checklists, or downloading spreadsheet templates from this website does not secure or establish a formal professional, accountant-client, or advisory relationship with P. Suuresh &amp; Associates. A formal relationship is only established upon mutually signing an Engagement Letter outlining key services, terms, and scope.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-theme-text-primary">
                <ShieldCheck className="w-5 h-5 text-amber-500" />
                <h2 className="text-lg font-bold font-display">3. Accuracy and External Portals</h2>
              </div>
              <p>
                While we make reasonable efforts to verify that our regulatory logs and filing calendars align with governmental deadlines, we make no warranties of any kind regarding accuracy, completeness, or suitability. Any links or references to IRS websites, FinCEN portals, or Income Tax Department of India files are provided purely as a convenient service; we hold no responsibility over third-party materials.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-theme-text-primary">
                <Scale className="w-5 h-5 text-amber-500" />
                <h2 className="text-lg font-bold font-display">4. Professional Standards Compliance</h2>
              </div>
              <p>
                P. Suuresh &amp; Associates operates under the statutory oversight of the Institute of Chartered Accountants of India (ICAI). US-specific tax filing filings and consultations are prepared in accordance with the Internal Revenue Code, IRS Circular 230 guidelines, and respective US state accountant regulations.
              </p>
            </div>

            <div className="space-y-2 border-t border-theme-border pt-6 text-xs text-theme-text-secondary select-none">
              <p><strong>Last Updated:</strong> June 15, 2026</p>
              <p>If you require specific, professional assistance regarding your individual tax residency or corporate filings, please schedule a formal review at <strong>tax@suureshusa.com</strong>.</p>
            </div>

          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
