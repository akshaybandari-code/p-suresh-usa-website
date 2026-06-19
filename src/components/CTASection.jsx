import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, MessageSquareCode, ShieldCheck } from 'lucide-react';

export default function CTASection({ title, subtitle }) {
  const finalTitle = title || 'Coordinate Your US-India Tax & Compliance Requirements';
  const finalSubtitle = subtitle || 'Get structured and compliant under FBAR, FATCA disclosures, dual status individual filings, real estate Capital Gains, and FEMA remittances.';

  return (
    <section className="relative overflow-hidden py-16 sm:py-24 bg-gradient-to-br from-slate-900 to-slate-950 dark:from-zinc-950 dark:to-black text-white rounded-2xl md:rounded-3xl border border-slate-800 dark:border-zinc-900 mx-4 sm:mx-6 lg:mx-8 mb-16">
      
      {/* Decorative patterns */}
      <div className="absolute inset-0 opacity-5 pointer-events-none mix-blend-overlay">
        <div className="absolute top-0 left-0 w-80 h-80 bg-amber-400 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        
        {/* Subtle Credibility Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 dark:bg-zinc-900 text-xs text-amber-400 font-mono mb-6 border border-slate-700/50">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
          <span>Chartered Accountants & US Tax Advisers</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight font-display text-white max-w-2xl mx-auto leading-tight mb-6">
          {finalTitle}
        </h2>
        
        <p className="text-base sm:text-lg text-slate-300 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-10 font-sans">
          {finalSubtitle}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            id="cta-block-consultation-link"
            to="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-slate-950 bg-amber-400 hover:bg-amber-500 font-medium rounded-lg text-sm transition-colors cursor-pointer font-display shadow-lg shadow-amber-900/10 hover:shadow-amber-900/20 active:scale-95 group"
          >
            Schedule a Consultation
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            id="cta-block-services-link"
            to="/services"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-slate-100 bg-slate-800 hover:bg-slate-700 font-medium rounded-lg text-sm transition-colors cursor-pointer border border-slate-700/60"
          >
            <MessageSquareCode className="w-4 h-4" />
            Explore Practice Areas
          </Link>
        </div>

        {/* Verification Lines */}
        <div className="mt-8 pt-8 border-t border-slate-800/80 flex flex-wrap justify-center gap-6 text-xs text-slate-400 font-mono">
          <span>✔️ Secure Document Intake</span>
          <span>✔️ ICAI & State Board CPA Members</span>
          <span>✔️ Professional Confidentiality Guarantee</span>
        </div>

      </div>
    </section>
  );
}
