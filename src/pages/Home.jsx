import { Link } from 'react-router-dom';
import {
  FileText,
  Globe,
  ShieldCheck,
  TrendingUp,
  Award,
  CalendarDays,
  FileCheck2,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  Info
} from 'lucide-react';
import { servicesData, testimonialsData, blogPosts, govUpdatesData } from '../data/mockData';
import CTASection from '../components/CTASection';
import SEO from '../components/SEO';

export default function Home() {
  // Take top 3 services for Home highlights
  const mainServices = servicesData.slice(0, 3);
  // Take first 3 testimonials
  const chosenTestimonials = testimonialsData.slice(0, 3);

  return (
    <div className="bg-theme-background text-theme-text-primary min-h-screen transition-colors duration-205">
      <SEO title="Home" description="P. Suuresh & Associates provides expert US & India cross-border tax advisory, individual filings (FBAR, FATCA, Form 8938), and compliance support." url="https://www.suureshusa.com/" />
      {/* 1. HERO SECTION */}
      <section className="relative pt-10 pb-20 sm:pt-16 sm:pb-28 lg:pt-20 lg:pb-36 overflow-hidden select-none">
        
        {/* Subtle corporate background visual elements */}
        <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20">
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-br from-amber-200/20 to-blue-200/20 dark:from-amber-900/10 dark:to-blue-900/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-0 w-80 h-80 bg-gradient-to-tr from-slate-200/35 to-amber-200/20 dark:from-zinc-900/20 dark:to-amber-900/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-7 flex flex-col space-y-6">
              
              {/* Trust Badge */}
              <div className="inline-flex self-start items-center gap-1.5 px-3 py-1 rounded-full bg-theme-surface text-theme-text-primary text-xs font-mono border border-theme-border">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>US &amp; India Cross-Border Tax Specialists</span>
              </div>

              {/* Master Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-theme-text-primary font-display leading-tight">
                Helping NRIs and US Businesses Navigate India-US Tax &amp; Compliance Requirements
              </h1>

              {/* Comprehensive Subheading */}
              <p className="text-xs sm:text-sm lg:text-base text-theme-text-secondary max-w-xl leading-relaxed">
                P. Suuresh &amp; Associates provides tax filing, FBAR compliance, international tax advisory, and cross-border support for individuals and businesses.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3.5 pt-4">
                <Link
                  id="hero-book-consult-btn"
                  to="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-theme-background bg-theme-primary hover:opacity-90 text-[15px] font-semibold rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-amber-405 shadow-sm cursor-pointer font-display"
                >
                  Book Consultation
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  id="hero-explore-services-btn"
                  to="/services"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-theme-text-primary bg-theme-surface border border-theme-border hover:bg-theme-border text-[15px] font-semibold rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-amber-404 cursor-pointer font-display"
                >
                  Explore Services
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="pt-8 border-t border-theme-border">
                <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-theme-text-primary text-xs sm:text-sm font-semibold">
                  <span className="flex items-center gap-1.5 text-theme-text-primary">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    US Tax Filing
                  </span>
                  <span className="flex items-center gap-1.5 text-theme-text-primary">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    FBAR Compliance
                  </span>
                  <span className="flex items-center gap-1.5 text-theme-text-primary">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    NRI Tax Advisory
                  </span>
                  <span className="flex items-center gap-1.5 text-theme-text-primary">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    International Tax Planning
                  </span>
                </div>
              </div>

            </div>

            {/* Hero Right Visual Column - Concept Card */}
            <div className="lg:col-span-5 flex flex-col gap-4 mt-6 lg:mt-0">
              
              {/* Geometric pattern and glowing background cards */}
              <div className="border border-theme-border bg-theme-card p-6 sm:p-8 rounded-2xl shadow-xl space-y-6">
                
                {/* Visual Header */}
                <div className="flex items-center justify-between border-b border-theme-border pb-4">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <span className="text-2xs font-mono px-2 py-0.5 rounded bg-amber-400/10 text-amber-500 border border-amber-500/15 font-semibold">
                    IRS &amp; FINCEN COMPLIANT
                  </span>
                </div>

                {/* Main Card Item: US-INDIA Services Display */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-theme-text-primary font-display">India-US Tax Services</h3>
                    <Globe className="w-5 h-5 text-amber-500 shrink-0 animate-spin-slow" />
                  </div>
                  
                  {/* Services List Display */}
                  <div className="space-y-3 pt-2">
                    
                    <div className="p-3 bg-theme-surface border border-theme-border rounded-lg flex items-center justify-between">
                      <span className="text-xs font-semibold text-theme-text-primary">US Tax Filing</span>
                      <ChevronRight className="w-3.5 h-3.5 text-theme-text-secondary" />
                    </div>

                    <div className="p-3 bg-theme-surface border border-theme-border rounded-lg flex items-center justify-between">
                      <span className="text-xs font-semibold text-theme-text-primary">FBAR Compliance</span>
                      <ChevronRight className="w-3.5 h-3.5 text-theme-text-secondary" />
                    </div>

                    <div className="p-3 bg-theme-surface border border-theme-border rounded-lg flex items-center justify-between">
                      <span className="text-xs font-semibold text-theme-text-primary">NRI Tax Advisory</span>
                      <ChevronRight className="w-3.5 h-3.5 text-theme-text-secondary" />
                    </div>

                    <div className="p-3 bg-theme-surface border border-theme-border rounded-lg flex items-center justify-between">
                      <span className="text-xs font-semibold text-theme-text-primary">International Tax Planning</span>
                      <ChevronRight className="w-3.5 h-3.5 text-theme-text-secondary" />
                    </div>

                  </div>
                </div>

                {/* Bottom text */}
                <div className="flex justify-center items-center text-xs text-theme-text-secondary pt-4 border-t border-theme-border">
                  <span className="text-center font-mono text-2xs sm:text-xs">Serving Clients Across the United States and India</span>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 2. COMPLIANCE STATISTICS */}
      <section className="py-12 bg-theme-surface border-y border-theme-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
            
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-extrabold text-theme-text-primary font-display">25+</p>
              <p className="text-xs sm:text-sm font-bold tracking-wider text-amber-500 uppercase font-mono">Years in Practice</p>
              <p className="text-2xs text-theme-text-secondary">Serving cross-border clients since 1996.</p>
            </div>

            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-extrabold text-theme-text-primary font-display">3</p>
              <p className="text-xs sm:text-sm font-bold tracking-wider text-amber-500 uppercase font-mono">Core Licenses</p>
              <p className="text-2xs text-theme-text-secondary">Represented by active FCA, DISA, and US CPA credentials.</p>
            </div>

            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-extrabold text-theme-text-primary font-display">100%</p>
              <p className="text-xs sm:text-sm font-bold tracking-wider text-amber-500 uppercase font-mono">E-Filing Setup</p>
              <p className="text-2xs text-theme-text-secondary">Secure regulatory filing via FinCEN, IRS, and India portals.</p>
            </div>

            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-extrabold text-theme-text-primary font-display">Form 13</p>
              <p className="text-xs sm:text-sm font-bold tracking-wider text-amber-500 uppercase font-mono">Practice Focus</p>
              <p className="text-2xs text-theme-text-secondary">Lower taxation applications prepared for real estate transactions.</p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. WHY CHOOSE US */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16 select-none">
            <h2 className="text-2xs uppercase tracking-widest text-amber-500 font-mono">Professional Standards</h2>
            <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-theme-text-primary font-display">
              Why Clients Retain P. Suuresh &amp; Associates
            </h3>
            <p className="text-xs sm:text-sm text-theme-text-secondary leading-relaxed font-sans">
              We focus on the coordination of US and Indian tax networks, helping individuals and businesses manage dual reporting requirements systematically.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Box 1: Pre-Migration Planning */}
            <div className="p-6 sm:p-8 bg-theme-card rounded-xl border border-theme-border shadow-sm space-y-4 hover:shadow-md transition-all duration-200 hover:translate-y-[-1px]">
              <div className="p-3 bg-amber-400/10 text-amber-500 rounded-lg w-fit">
                <Globe className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-theme-text-primary font-display">Pre-Migration Tax Planning</h4>
              <p className="text-xs text-theme-text-secondary leading-relaxed font-sans">
                Reviewing the cost-basis of Indian assets, gift treatments, and transition reporting rules prior to changing tax residency status.
              </p>
            </div>

            {/* Box 2: Elite Credentials */}
            <div className="p-6 sm:p-8 bg-theme-card rounded-xl border border-theme-border shadow-sm space-y-4 hover:shadow-md transition-all duration-200 hover:translate-y-[-1px]">
              <div className="p-3 bg-amber-400/10 text-amber-500 rounded-lg w-fit">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-theme-text-primary font-display">Professional Credentials</h4>
              <p className="text-xs text-theme-text-secondary leading-relaxed font-sans">
                Our professionals maintain active Fellow Chartered Accountant (ICAI) and Certified Public Accountant (US) registrations, supporting all filed schedules.
              </p>
            </div>

            {/* Box 3: Penalty Relief Success */}
            <div className="p-6 sm:p-8 bg-theme-card rounded-xl border border-theme-border shadow-sm space-y-4 hover:shadow-md transition-all duration-200 hover:translate-y-[-1px]">
              <div className="p-3 bg-amber-400/10 text-amber-500 rounded-lg w-fit">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-theme-text-primary font-display">IRS &amp; Indian Tax Reporting</h4>
              <p className="text-xs text-theme-text-secondary leading-relaxed font-sans">
                Experience preparing Streamlined Disclosure submissions and past FBAR filings to regularize reporting histories systematically.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 4. KEY SERVICES INSIGHT */}
      <section className="py-16 sm:py-24 bg-theme-surface border-t border-theme-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
            <div className="space-y-2 max-w-xl">
              <h2 className="text-2xs uppercase tracking-widest text-amber-500 font-mono">Practice Areas</h2>
              <h3 className="text-3xl font-bold tracking-tight text-theme-text-primary font-display">
                Core Practice Areas
              </h3>
              <p className="text-xs sm:text-sm text-theme-text-secondary leading-relaxed">
                We help individuals and corporate clients manage cross-border compliance mandates systematically.
              </p>
            </div>
            <Link
              id="view-all-services-link"
              to="/services"
              className="inline-flex items-center gap-1 text-xs font-semibold text-amber-500 hover:text-amber-600 transition-colors shrink-0"
            >
              See All Detailed Services
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mainServices.map((service) => {
              return (
                <div
                  key={service.id}
                  className="bg-theme-card border border-theme-border p-6 rounded-xl shadow-sm hover:shadow-md hover:border-amber-400 transition-all duration-200 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <h4 className="text-lg font-bold text-theme-text-primary font-display">
                      {service.title}
                    </h4>
                    <p className="text-xs text-theme-text-secondary leading-relaxed">
                      {service.description}
                    </p>
                    
                    {/* Key features of the service */}
                    <ul className="space-y-2 pt-2">
                      {service.features.slice(0, 2).map((feat, index) => (
                        <li key={index} className="flex items-start gap-2 text-xs font-medium text-theme-text-secondary leading-normal">
                           <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 border-t border-theme-border mt-6">
                    <Link
                      id={`explore-service-btn-${service.id}`}
                      to={`/services`}
                      className="inline-flex items-center gap-1.5 text-xs text-amber-500 font-bold hover:text-amber-600 transition-colors"
                    >
                      Learn More
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 5. CLIENT TESTIMONIALS */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-lg mx-auto space-y-4 mb-14 select-none">
            <h2 className="text-2xs uppercase tracking-widest text-amber-500 font-mono">Client Experiences</h2>
            <h3 className="text-3xl font-bold tracking-tight text-theme-text-primary font-display">
              Client Testimonials
            </h3>
            <p className="text-xs sm:text-sm text-theme-text-secondary">
              Feedback from individuals and businesses utilizing our services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {chosenTestimonials.map((review) => {
              return (
                <div
                  key={review.id}
                  className="p-6 bg-theme-surface border border-theme-border rounded-xl space-y-4 flex flex-col justify-between"
                >
                  <p className="text-xs sm:text-sm italic text-theme-text-secondary leading-relaxed font-sans">
                     "{review.quote}"
                  </p>
                  
                  <div className="flex items-center gap-3 pt-4 border-t border-theme-border">
                    <div className="w-9 h-9 bg-theme-card border border-theme-border text-amber-500 font-bold flex items-center justify-center rounded-full text-xs shrink-0 select-none">
                      {review.name.split(' ').map(n=>n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-theme-text-primary">{review.name}</p>
                      <p className="text-[10px] text-theme-text-secondary font-mono">
                        {review.role} • {review.location}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 6. LATEST TAX UPDATES */}
      <section className="py-16 sm:py-24 bg-theme-surface border-t border-theme-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex justify-between items-end mb-12">
            <div className="space-y-2">
              <p className="text-2xs uppercase tracking-widest text-amber-500 font-mono">Government Guidance</p>
              <h3 className="text-3xl font-bold tracking-tight text-theme-text-primary font-display">
                Latest Regulatory Tax Developments
              </h3>
            </div>
            <Link
              id="view-all-updates-link"
              to="/updates"
              className="text-xs font-bold text-amber-500 hover:text-amber-600 flex items-center gap-1 transition-colors pt-2 shrink-0"
            >
              View All Updates
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {govUpdatesData.slice(0, 2).map((item) => {
              return (
                <div
                  key={item.id}
                  className="bg-theme-card border border-theme-border p-6 rounded-xl flex flex-col justify-between shadow-xs"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-[11px] font-mono text-theme-text-secondary">
                      <span>{item.date}</span>
                      <span className="px-2 py-0.5 rounded bg-amber-400/10 text-amber-500 border border-amber-400/15 font-semibold">
                        {item.category}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-theme-text-primary font-display leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-xs text-theme-text-secondary">
                      {item.summary}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-theme-border flex items-center justify-between">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-theme-text-secondary">Source: {item.source}</span>
                    <Link
                      id={`read-update-link-${item.id}`}
                      to="/updates"
                      className="text-xs font-bold text-amber-500 hover:text-amber-600 inline-flex items-center gap-1 transition-colors"
                    >
                      Read full update
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 7. CTA SECTION */}
      <CTASection />

    </div>
  );
}
