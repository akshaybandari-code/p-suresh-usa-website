import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import useServices from '../hooks/useServices';
import {
  FileText,
  Globe,
  ShieldAlert,
  Scale,
  BadgePercent,
  Briefcase,
  ArrowRight,
  CheckCircle,
  HelpCircle,
  Loader2
} from 'lucide-react';
import CTASection from '../components/CTASection';
import SEO from '../components/SEO';
import LegalDisclaimer from '../components/LegalDisclaimer';

const iconMap = {
  FileText: FileText,
  Globe: Globe,
  ShieldAlert: ShieldAlert,
  Scale: Scale,
  BadgePercent: BadgePercent,
  Briefcase: Briefcase
};

export default function Services() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { data: services, loading, error } = useServices();

  const servicesList = services || [];

  const filteredServices = servicesList.filter((s) => {
    if (selectedCategory === 'all') return true;
    return s.category === selectedCategory;
  });

  return (
    <div className="bg-theme-background text-theme-text-primary min-h-screen transition-colors duration-200">
      <SEO title="Practice Areas & Services" description="Extensive cross-border tax preparation, FBAR submissions, and FEMA compliance strategies for NRIs and corporations." url="https://www.suureshusa.com/services" />
      {/* Page Header */}
      <section className="bg-theme-surface py-16 sm:py-24 border-b border-theme-border text-center relative overflow-hidden select-none">
        
        {/* Ambient background decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <p className="text-2xs uppercase tracking-widest text-amber-500 font-mono">Practice Areas</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-theme-text-primary font-display">
            Cross-Border Tax &amp; Compliance Services
          </h1>
          <p className="text-xs sm:text-sm text-theme-text-secondary max-w-2xl mx-auto font-sans leading-relaxed">
            Structuring international tax filings, foreign asset disclosures, property transactions, and FEMA compliance under current bilateral rules.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mt-10 max-w-lg mx-auto px-4">
          <button
            id="filter-services-all-btn"
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg font-mono tracking-wider cursor-pointer transition-all ${
              selectedCategory === 'all'
                ? 'bg-theme-primary text-theme-background shadow-xs font-bold'
                : 'bg-theme-card text-theme-text-secondary hover:text-theme-text-primary hover:bg-theme-surface border border-theme-border'
            }`}
          >
            ALL PRACTICE AREAS ({servicesList.length})
          </button>
          <button
            id="filter-services-indi-btn"
            onClick={() => setSelectedCategory('individual')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg font-mono tracking-wider cursor-pointer transition-all ${
              selectedCategory === 'individual'
                ? 'bg-theme-primary text-theme-background shadow-xs font-bold'
                : 'bg-theme-card text-theme-text-secondary hover:text-theme-text-primary hover:bg-theme-surface border border-theme-border'
            }`}
          >
            INDIVIDUAL / EXPAT
          </button>
          <button
            id="filter-services-corp-btn"
            onClick={() => setSelectedCategory('corporate')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg font-mono tracking-wider cursor-pointer transition-all ${
              selectedCategory === 'corporate'
                ? 'bg-theme-primary text-theme-background shadow-xs font-bold'
                : 'bg-theme-card text-theme-text-secondary hover:text-theme-text-primary hover:bg-theme-surface border border-theme-border'
            }`}
          >
            CORPORATE
          </button>
        </div>

      </section>

      {/* Services List Block */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <AnimatePresence mode="popLayout">
            {filteredServices.length === 0 ? (
              <div className="max-w-4xl mx-auto py-20 text-center">
                <p className="text-xl text-theme-text-secondary">No content available.</p>
              </div>
            ) : filteredServices.map((service, index) => {
              const IconComponent = iconMap[service.icon] || FileText;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={service.id}
                  id={`service-block-${service.id}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-12 items-center bg-theme-surface p-5 sm:p-8 rounded-2xl border border-theme-border shadow-xs hover:shadow-md transition-all duration-300`}
                >
                  
                  {/* Visual / Text LHS */}
                  <div className={`lg:col-span-7 space-y-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-theme-background text-amber-500 border border-theme-border rounded-lg shrink-0">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-mono tracking-widest text-theme-text-secondary uppercase">
                        {service.category === 'both' ? 'INDIVIDUAL + CORPORATE' : service.category.toUpperCase() }
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold font-display text-theme-text-primary">
                      {service.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-theme-text-secondary leading-relaxed font-sans">
                      {service.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                      
                      {/* Features checklist */}
                      <div className="space-y-3">
                        <h4 className="text-xs font-mono uppercase tracking-wider text-theme-text-secondary font-bold">Filing Requirements</h4>
                        <ul className="space-y-2">
                          {service.features.map((feat, fIdx) => (
                            <li key={fIdx} className="flex items-start gap-2.5 text-xs text-theme-text-secondary font-sans leading-normal">
                               <CheckCircle className="w-3.5 h-3.5 text-amber-500 mt-0.5 shrink-0" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Benefits checklist */}
                      <div className="space-y-3">
                        <h4 className="text-xs font-mono uppercase tracking-wider text-theme-text-secondary font-bold">Advisory Benefits</h4>
                        <ul className="space-y-2">
                          {service.benefits.map((benefit, bIdx) => (
                            <li key={bIdx} className="flex items-start gap-2.5 text-xs text-theme-text-secondary font-sans leading-normal">
                              <CheckCircle className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                    </div>

                  </div>

                  {/* Submitting CTA Card on RHS */}
                  <div className={`lg:col-span-5 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="bg-theme-card p-6 sm:p-8 rounded-xl border border-theme-border shadow-sm space-y-4">
                      <p className="text-[10px] uppercase font-mono tracking-wider text-theme-text-secondary">Assistance &amp; Consultation</p>
                      <h4 className="text-base font-bold font-display text-theme-text-primary">
                        Need clarification regarding {service.title.split(' (')[0]}?
                      </h4>
                      <p className="text-xs text-theme-text-secondary leading-relaxed">
                        We assist with foreign asset compilations, peak balance reporting, real estate gains indexation, and FEMA outward remittance certificates.
                      </p>
                      <Link
                        id={`book-service-consult-${service.id}`}
                        to={`/contact?service=${encodeURIComponent(service.title)}`}
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-theme-primary text-theme-background border border-transparent text-xs font-semibold rounded-lg transition-colors cursor-pointer hover:opacity-95 font-mono shadow-sm"
                      >
                        Request Preliminary Consultation
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>

        </div>
      </section>

      {/* Advisory FAQ block */}
      <section className="py-16 sm:py-24 bg-theme-surface border-t border-theme-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center space-y-2 mb-12">
            <p className="text-2xs uppercase tracking-widest text-amber-500 font-mono">Filing Resources</p>
            <h3 className="text-3xl font-bold font-display text-theme-text-primary">
              Tax Filing &amp; Disclosure FAQs
            </h3>
          </div>

          <div className="space-y-6">
            
            <div className="p-5 bg-theme-card border border-theme-border rounded-xl shadow-xs transition-all duration-200 hover:shadow-sm">
              <h4 className="text-sm font-bold text-theme-text-primary flex gap-1.5 items-center mb-2 font-display">
                <HelpCircle className="w-4 h-4 text-amber-500 shrink-0" />
                Who qualifies as a "US Person" for FBAR and FATCA reporting?
              </h4>
              <p className="text-xs text-theme-text-secondary leading-relaxed font-sans">
                The IRS defines "US Person" to include US citizens (even those born abroad residing in India), green card holders (Permanent Residents), and foreign nationals who meet the Substantial Presence Test (generally residing in the US for at least 183 days over a 3-year weighted period). Such individuals are required to report worldwide income and foreign financial assets.
              </p>
            </div>

            <div className="p-5 bg-theme-card border border-theme-border rounded-xl shadow-xs transition-all duration-200 hover:shadow-sm">
              <h4 className="text-sm font-bold text-theme-text-primary flex gap-1.5 items-center mb-2 font-display">
                <HelpCircle className="w-4 h-4 text-amber-500 shrink-0" />
                How does the India-US DTAA (Tax Treaty) help avoid duplicate taxation?
              </h4>
              <p className="text-xs text-theme-text-secondary leading-relaxed font-sans">
                The Double Taxation Avoidance Agreement (DTAA) provides mechanism rules to claim Foreign Tax Credits (FTC) under IRC Section 901/902 or Indian standard tax brackets. For instance, any property sold in Hyderabad showing 20% Indian TDS can be credited on Form 1116 in your US 1040 layout, reducing or neutralizing duplication.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Legal Disclaimer Notification Banner */}
      <LegalDisclaimer />

      {/* CTA final Section */}
      <CTASection />

    </div>
  );
}
