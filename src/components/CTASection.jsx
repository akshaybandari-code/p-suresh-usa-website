import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, MessageSquareCode, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function CTASection({ title, subtitle }) {
  return (
    <section className="py-16 sm:py-24 border-t border-theme-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-theme-card border border-theme-border rounded-xl p-8 sm:p-10 flex flex-col md:flex-row gap-8 items-start">
          <div className="space-y-4 flex-1">
            <h3 className="text-2xl font-bold tracking-tight text-theme-text-primary font-display">
              Need Guidance on India–US Tax & Compliance?
            </h3>
            <p className="text-sm text-theme-text-secondary leading-relaxed">
              P. Suuresh & Associates assists NRIs, expatriates, and international businesses with cross-border taxation, FBAR reporting, FEMA compliance, international tax planning, and regulatory requirements.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-theme-background bg-theme-primary hover:opacity-90 rounded-lg transition-all"
            >
              Book a Consultation
            </Link>
          </div>
          
          <div className="w-full md:w-auto md:min-w-[300px]">
            <h4 className="text-sm font-bold text-theme-text-primary mb-4 font-display">Service Highlights</h4>
            <ul className="space-y-3">
              {[
                "US Tax Filing",
                "FBAR Compliance",
                "NRI Tax Advisory",
                "International Tax Planning",
                "India-US Cross-Border Compliance"
              ].map((service) => (
                <li key={service} className="flex items-center gap-3 text-xs text-theme-text-secondary">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                  {service}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
