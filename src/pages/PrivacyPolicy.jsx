import React from 'react';
import { Shield, Eye, Lock, FileText } from 'lucide-react';
import CTASection from '../components/CTASection';
import SEO from '../components/SEO';

export default function PrivacyPolicy() {
  return (
    <div className="bg-theme-background text-theme-text-primary min-h-screen transition-colors duration-200">
      <SEO title="Privacy Policy" description="How P. Suuresh & Associates safeguards and manages your professional and personal information." url="https://www.suureshusa.com/privacy" />
      {/* Header section */}
      <section className="bg-theme-surface py-16 border-b border-theme-border text-center select-none">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <p className="text-2xs uppercase tracking-widest text-amber-500 font-mono">Firm Policies</p>
          <h1 className="text-4xl font-extrabold font-display text-theme-text-primary">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-theme-text-secondary max-w-2xl mx-auto font-sans">
            How P. Suuresh &amp; Associates safeguards and manages your professional and personal information.
          </p>
        </div>
      </section>

      {/* Main Body Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-theme-card border border-theme-border rounded-xl p-8 sm:p-12 space-y-8 font-sans text-sm text-theme-text-secondary leading-relaxed">
            
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-theme-text-primary">
                <Shield className="w-5 h-5 text-amber-500" />
                <h2 className="text-lg font-bold font-display">1. Our Commitment to Data Protection</h2>
              </div>
              <p>
                At P. Suuresh &amp; Associates, we understand that tax filings and disclosure compilations involve highly sensitive personal financial records. We are committed to maintaining the confidentiality, integrity, and security of all client records in compliance with professional standards, state boards of accountancy regulations, and applicable local rules of both the US and India.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-theme-text-primary">
                <Eye className="w-5 h-5 text-amber-500" />
                <h2 className="text-lg font-bold font-display">2. Information We Collect</h2>
              </div>
              <p>
                We only collect information directly necessary for preparing federal/state tax returns, FBAR disclosures, Lower TDS certificate applications, and other official regulatory filings. This includes:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>Contact information (such as name, phone coordinates, physical addresses, and email addresses).</li>
                <li>Tax identification numbers (Social Security Numbers, Individual Taxpayer Identification Numbers (ITIN), and Permanent Account Numbers (PAN)).</li>
                <li>Financial details (balances, valuations of overseas financial accounts, mutual fund statements, income statements, and land registration metrics).</li>
              </ul>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-theme-text-primary">
                <Lock className="w-5 h-5 text-amber-500" />
                <h2 className="text-lg font-bold font-display">3. Security Measures and Document Intake</h2>
              </div>
              <p>
                All documents transmitted during consultations or engagements are logged and archived in secured electronic environments. We use industry-standard encryption protocols during transmission. Physical file access is strictly restricted to designated personnel authorized to handle tax pre-filing procedures. We do not sell, rent, or trade your personal or financial information with third-party advertising registries.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-theme-text-primary">
                <FileText className="w-5 h-5 text-amber-500" />
                <h2 className="text-lg font-bold font-display">4. Third-Party Disclosures &amp; E-Portals</h2>
              </div>
              <p>
                Information is only disclosed to official regulatory bodies—specifically the US Internal Revenue Service (IRS), the Financial Crimes Enforcement Network (FinCEN), and the Indian Income Tax Department—pursuant to physical or electronic client authorizations (such as Power of Attorney approvals or signed Form 8879 returns).
              </p>
            </div>

            <div className="space-y-2 border-t border-theme-border pt-6 text-xs text-theme-text-secondary select-none">
              <p><strong>Last Updated:</strong> June 15, 2026</p>
              <p>If you have any queries about our privacy procedures, please contact us directly at <strong>tax@suureshusa.com</strong>.</p>
            </div>

          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
