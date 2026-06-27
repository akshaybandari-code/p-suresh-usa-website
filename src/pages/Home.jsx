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
import useServices from '../hooks/useServices';
import useArticles from '../hooks/useArticles';
import useTaxUpdates from '../hooks/useTaxUpdates';
import { mockTestimonials } from '../data/mockData';

const testimonialsData = mockTestimonials;
import CTASection from '../components/CTASection';
import SEO from '../components/SEO';

export default function Home() {
  // Take top 3 services for Home highlights
  const { data: servicesData = [], loading: sLoading } = useServices();
  const mainServices = servicesData.slice(0, 3);
  // Take first 3 testimonials
  const { data: blogPosts = [], loading: bLoading } = useArticles();
  const { data: govUpdatesData = [], loading: gLoading } = useTaxUpdates();
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

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <div className="flex flex-col items-center space-y-6">
            
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-theme-surface text-theme-text-primary text-xs font-mono border border-theme-border">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>India-US Cross-Border Tax Specialists</span>
            </div>

            {/* Master Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl lg:leading-tight font-bold tracking-tight text-theme-text-primary font-display max-w-3xl">
              P. Suresh &amp; Associates – Trusted India-US Tax, Compliance &amp; Advisory Experts
            </h1>

            {/* Comprehensive Subheading */}
            <p className="text-xs sm:text-sm lg:text-base text-theme-text-secondary max-w-2xl leading-relaxed">
              Helping NRIs, expatriates, and US businesses navigate cross-border taxation, compliance, and financial reporting requirements with confidence.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3.5 pt-4 justify-center w-full sm:w-auto">
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
          </div>
        </div>
      </section>

      {/* NEW: ABOUT SECTION */}
      <section className="py-16 sm:py-24 bg-theme-surface">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-2xs uppercase tracking-widest text-amber-500 font-mono">About P. Suresh &amp; Associates</h2>
          <h3 className="text-3xl font-bold tracking-tight text-theme-text-primary font-display">
            Your Trusted Partner in Cross-Border Tax &amp; Advisory
          </h3>
          <p className="text-sm text-theme-text-secondary leading-relaxed">
            P. Suresh &amp; Associates is a Chartered Accountancy firm specializing in India-US cross-border taxation, compliance, and advisory services for NRIs, expatriates, and international businesses. We bridge the gap between regulatory requirements in both jurisdictions, ensuring accuracy, compliance, and peace of mind.
          </p>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16 select-none">
            <h2 className="text-2xs uppercase tracking-widest text-amber-500 font-mono">Why Clients Choose Us</h2>
            <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-theme-text-primary font-display">
              Built on Trust &amp; Expertise
            </h3>
            <p className="text-xs sm:text-sm text-theme-text-secondary leading-relaxed font-sans">
              We offer personalized advisory and compliance-driven solutions tailored for our NRI and cross-border client base.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Box 1: Pre-Migration Planning */}
            <div className="p-6 sm:p-8 bg-theme-card rounded-xl border border-theme-border shadow-sm space-y-4 hover:shadow-md transition-all duration-200 hover:translate-y-[-1px]">
              <div className="p-3 bg-amber-400/10 text-amber-500 rounded-lg w-fit">
                <Globe className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-theme-text-primary font-display">Cross-Border Specialization</h4>
              <p className="text-xs text-theme-text-secondary leading-relaxed font-sans">
                Deep expertise in coordinating dual reporting requirements between the IRS and Indian tax authorities.
              </p>
            </div>

            {/* Box 2: Elite Credentials */}
            <div className="p-6 sm:p-8 bg-theme-card rounded-xl border border-theme-border shadow-sm space-y-4 hover:shadow-md transition-all duration-200 hover:translate-y-[-1px]">
              <div className="p-3 bg-amber-400/10 text-amber-500 rounded-lg w-fit">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-theme-text-primary font-display">Regulatory Expertise</h4>
              <p className="text-xs text-theme-text-secondary leading-relaxed font-sans">
                Active Fellow Chartered Accountant (ICAI) and Certified Public Accountant (US) registrations supporting all filed schedules.
              </p>
            </div>

            {/* Box 3: Penalty Relief Success */}
            <div className="p-6 sm:p-8 bg-theme-card rounded-xl border border-theme-border shadow-sm space-y-4 hover:shadow-md transition-all duration-200 hover:translate-y-[-1px]">
              <div className="p-3 bg-amber-400/10 text-amber-500 rounded-lg w-fit">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-theme-text-primary font-display">Compliance-Driven Solutions</h4>
              <p className="text-xs text-theme-text-secondary leading-relaxed font-sans">
                Experience preparing Streamlined Disclosure submissions and past FBAR filings to regularize reporting histories.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* SERVICE HIGHLIGHTS */}
      <section className="py-16 sm:py-24 border-t border-theme-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-theme-card border border-theme-border rounded-xl p-8 sm:p-10 flex flex-col md:flex-row gap-8 items-start">
            <div className="space-y-4 flex-1">
              <h3 className="text-2xl font-bold tracking-tight text-theme-text-primary font-display">
                Need Guidance on India–US Tax & Compliance?
              </h3>
              <p className="text-sm text-theme-text-secondary leading-relaxed">
                P. Suresh & Associates assists NRIs, expatriates, and international businesses with cross-border taxation, FBAR reporting, FEMA compliance, international tax planning, and regulatory requirements.
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
              to="/tax-updates"
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
                      to="/tax-updates"
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
