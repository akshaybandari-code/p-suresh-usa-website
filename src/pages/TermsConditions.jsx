import React from 'react';
import { Scale, FileText, CheckCircle, HelpCircle } from 'lucide-react';
import CTASection from '../components/CTASection';
import SEO from '../components/SEO';

export default function TermsConditions() {
  return (
    <div className="bg-theme-background text-theme-text-primary min-h-screen transition-colors duration-200">
      <SEO title="Terms & Conditions" description="Standard terms governing the use of P. Suuresh & Associates digital platforms, calculators, and information channels." url="https://www.suureshusa.com/terms" />
      {/* Header section */}
      <section className="bg-theme-surface py-16 border-b border-theme-border text-center select-none">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <p className="text-2xs uppercase tracking-widest text-amber-500 font-mono">Firm Conditions</p>
          <h1 className="text-4xl font-extrabold font-display text-theme-text-primary">
            Terms &amp; Conditions
          </h1>
          <p className="text-xs sm:text-sm text-theme-text-secondary max-w-2xl mx-auto font-sans">
            Standard terms governing the use of P. Suuresh &amp; Associates digital platforms, calculators, and information channels.
          </p>
        </div>
      </section>

      {/* Main Body Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-theme-card border border-theme-border rounded-xl p-8 sm:p-12 space-y-8 font-sans text-sm text-theme-text-secondary leading-relaxed">
            
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-theme-text-primary">
                <Scale className="w-5 h-5 text-amber-500" />
                <h2 className="text-lg font-bold font-display">1. Acceptance of Terms</h2>
              </div>
              <p>
                By using and browsing the pages, resources, checklists, and forms on this website, you agree to comply with and be bound by these Terms &amp; Conditions. If you do not accept these conditions, you should refrain from using our digital interfaces.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-theme-text-primary">
                <FileText className="w-5 h-5 text-amber-500" />
                <h2 className="text-lg font-bold font-display">2. Intellectual Property and Asset Downloads</h2>
              </div>
              <p>
                The calculated templates, pre-migration checklist databases, IRS exchange rate compilation worksheets, and original articles on this website are the intellectual property of P. Suuresh &amp; Associates. Users are granted a limited license to download and print individual materials for personal, non-commercial evaluation. Redistribution, resale, or unauthorized republication in secondary corporate channels is strictly forbidden.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-theme-text-primary">
                <CheckCircle className="w-5 h-5 text-amber-500" />
                <h2 className="text-lg font-bold font-display">3. Limitations of Electronic Tools</h2>
              </div>
              <p>
                Spreadsheet templates and FBAR peak calculation aids compiled on our Resources page are standard mathematical formulas. They do not evaluate individual exceptions, composite state tax laws, or dual-status transition anomalies. They must be validated by a practicing credentialed accountant to ensure safe filings.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-theme-text-primary">
                <HelpCircle className="w-5 h-5 text-amber-500" />
                <h2 className="text-lg font-bold font-display">4. Professional Jurisdiction</h2>
              </div>
              <p>
                These Terms are governed by and construed in accordance with the professional oversight of the Institute of Chartered Accountants of India (ICAI) and respective state boards of accountancy in the United States where our associate practitioners work.
              </p>
            </div>

            <div className="space-y-2 border-t border-theme-border pt-6 text-xs text-theme-text-secondary select-none">
              <p><strong>Last Updated:</strong> June 15, 2026</p>
              <p>For official inquiries regarding client engagement agreements, please contact the administrators at <strong>tax@suureshusa.com</strong>.</p>
            </div>

          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
