import React, { useState, useEffect } from 'react';
import { 
  AlertCircle, 
  Calendar, 
  ArrowUpRight, 
  Bell, 
  Search,
  FileText, 
  ShieldCheck, 
  Scale, 
  Building2, 
  Calculator, 
  Clock, 
  Globe,
  Milestone,
  CheckCircle2,
  CalendarDays,
  Info
} from 'lucide-react';
import useTaxUpdates from '../hooks/useTaxUpdates';
import CTASection from '../components/CTASection';
import Skeleton from '../components/Skeleton';
import SEO from '../components/SEO';
import LegalDisclaimer from '../components/LegalDisclaimer';

// Structured Compliance Calendar data mock
const cmsComplianceCalendarSchema = [
  {
    month: 'January',
    events: [
      {
        title: 'Q4 Individual Estimated Payments (Form 1040-ES)',
        deadline: 'January 15',
        description: 'Final payment deadline for individual taxpayers with income not subject to standard US salary withholding (e.g., foreign dividends, capital gains, consulting retainers).'
      },
      {
        title: 'Filing of Form 1099-NEC & 1099-MISC',
        deadline: 'January 31',
        description: 'Businesses must file forms to report non-employee compensations and payments to local and state contractors.'
      }
    ],
    reminders: [
      'Consolidate Indian bank interest certificates for the active financial year.',
      'Cross-examine exchange conversions against IRS approved rates.'
    ]
  },
  {
    month: 'April',
    events: [
      {
        title: 'US Federal Individual Tax Return (Form 1040 / 1040-NR)',
        deadline: 'April 15',
        description: 'Statutory deadline to submit returns or secure formal six-month extension via Form 4868.'
      },
      {
        title: 'Q1 Estimated Tax Payment Deadline',
        deadline: 'April 15',
        description: 'Initial estimated installment due for the current tax year.'
      },
      {
        title: 'Statutory FBAR Deadline (Automatic Extension)',
        deadline: 'April 15',
        description: 'Official filing limit for FinCEN Form 114 (Automatically extends to Oct 15 without filing form).'
      }
    ],
    reminders: [
      'Coordinate US returns with Indian tax planning to claim Foreign Tax Credit (Form 1116).',
      'Expat dual-status rules assessment for transition year relocations.'
    ]
  },
  {
    month: 'June',
    events: [
      {
        title: 'US Expatriate Filing Deadline (Automatic Extension)',
        deadline: 'June 15',
        description: 'Automatic two-month filing extension given to US citizens and permanent residents residing and working overseas.'
      },
      {
        title: 'Q2 Estimated Tax Payment Deadline',
        deadline: 'June 15',
        description: 'Second estimated installment installment due for the current tax year.'
      }
    ],
    reminders: [
      'Verify Indian financial data for taxpayers filing local Indian returns by July.',
      'Confirm lower TDS applications (Form 13) are logged with the Income Tax Department.'
    ]
  },
  {
    month: 'September',
    events: [
      {
        title: 'Q3 Estimated Tax Payment Deadline',
        deadline: 'September 15',
        description: 'Third estimated installment installment due for the current tax year.'
      },
      {
        title: 'US Corporate Return Extension Deadline',
        deadline: 'September 15',
        description: 'Final deadline for corporate entities (Form 1120/1120-S) who logged extensions.'
      }
    ],
    reminders: [
      'Reconcile double tax filings to avoid discrepancies on passive assets and corporate stock filings.'
    ]
  },
  {
    month: 'December',
    events: [
      {
        title: 'Year-End Cross-Border Structure Review',
        deadline: 'December 31',
        description: 'Last date to assess tax residency status guidelines, physical presence days formulas, and plan year-end asset transfers.'
      }
    ],
    reminders: [
      'Collect and compile valuation summaries of all Indian accounts to prepare for FBAR compilation.',
      'Maximize foreign tax deductions ahead of the tax year reset.'
    ]
  }
];

export default function GovUpdates() {
  const [activeIrsTopic, setActiveIrsTopic] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [simulatorLoading, setSimulatorLoading] = useState(false);

  const { data: taxUpdates, loading: cmsLoading } = useTaxUpdates();
  const updatesList = taxUpdates || [];

  const irsTopics = ['All', 'IRS News', 'FBAR', 'FATCA', 'Form 5471', 'Form 8938', 'Tax Deadlines', 'Expat Compliance'];

  // Toggle loading state simulator on category filter change to show skeletons
  useEffect(() => {
    setSimulatorLoading(true);
    const timer = setTimeout(() => {
      setSimulatorLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, [activeIrsTopic, searchTerm]);

  const isLoading = cmsLoading || simulatorLoading;

  // Combined filter: Category + Search, then sort by latest date implicitly (data is already sorted but we can do a date sort if required. Currently they are ordered descending by mock data, let's keep it that way)
  const filteredCmsUpdates = updatesList.filter(update => {
    const topic = update.topic || update.category || 'All';
    const matchesTopic = activeIrsTopic === 'All' || topic.toLowerCase() === activeIrsTopic.toLowerCase();
    
    const titleMatch = update.title?.toLowerCase() || '';
    const summaryMatch = update.summary?.toLowerCase() || '';

    const matchesSearch = titleMatch.includes(searchTerm.toLowerCase()) || 
                          summaryMatch.includes(searchTerm.toLowerCase());
    return matchesTopic && matchesSearch;
  });

  return (
    <div className="bg-theme-background text-theme-text-primary min-h-screen transition-colors duration-200 pb-16">
      <SEO title="Government Regulatory Updates" description="Official filings, tax developments, and government guidance related to US and India cross-border compliance." url="https://www.suureshusa.com/tax-updates" />
      {/* Page Header */}
      <section className="bg-theme-surface py-16 border-b border-theme-border select-none">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="p-2.5 bg-amber-400/10 text-amber-500 rounded-lg w-fit mx-auto animate-pulse">
            <Bell className="w-5 h-5 animate-bounce" />
          </div>
          <p className="text-2xs uppercase tracking-widest text-amber-500 font-mono">Government Guidance</p>
          <h1 className="text-4xl font-extrabold font-display text-theme-text-primary">
            Official Tax &amp; Compliance Updates
          </h1>
          <p className="text-xs sm:text-sm text-theme-text-secondary max-w-2xl mx-auto font-sans leading-relaxed">
            Technical regulatory briefings, filing guidelines, and structural reference logs from the Internal Revenue Service (IRS), FinCEN Treasury, and cross-border tax authorities.
          </p>
        </div>
      </section>

      {/* Structured Section 1: IRS Updates Reference Board */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        
        <section id="irs-regulatory-board" className="space-y-8">
          <div className="text-center md:text-left space-y-2">
            <h2 className="text-2xl font-extrabold font-display text-theme-text-primary flex items-center justify-center md:justify-start gap-2">
              <Milestone className="w-6 h-6 text-amber-500" />
              Latest Updates &amp; Regulatory Board
            </h2>
            <p className="text-xs sm:text-sm text-theme-text-secondary font-sans">
              Filter official classifications to understand FBAR reporting heights, corporate declarations, and expatriate guidelines.
            </p>
          </div>

          <div className="space-y-6">
            {/* Search Input */}
            <div className="relative max-w-md w-full mx-auto md:mx-0">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-theme-text-secondary" />
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search updates..."
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-theme-input-bg border border-theme-input-border text-theme-text-primary rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all font-sans"
              />
            </div>

            {/* Interactive filter row targeting all 7 critical areas */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pb-4 border-b border-theme-border">
              {irsTopics.map(topic => {
              const isActive = activeIrsTopic === topic;
              return (
                <button
                  id={`irs-topic-filter-${topic.toLowerCase().replace(/[^a-z0-9]/g, '')}`}
                  key={topic}
                  onClick={() => setActiveIrsTopic(topic)}
                  className={`px-3.5 py-1.5 text-2xs font-semibold rounded-lg font-mono transition-all cursor-pointer ${
                    isActive
                      ? 'bg-theme-primary text-theme-background shadow-xs'
                      : 'bg-theme-card text-theme-text-secondary border border-theme-border hover:bg-theme-surface hover:text-theme-text-primary'
                  }`}
                >
                  {topic.toUpperCase()}
                </button>
              );
            })}
          </div>

          {/* Skeletons or CMS Cards Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </div>
          ) : filteredCmsUpdates.length === 0 ? (
            <div className="text-center py-12 bg-theme-surface rounded-xl border border-dashed border-theme-border max-w-md mx-auto space-y-4">
              <AlertCircle className="w-8 h-8 text-amber-500 mx-auto" />
              <div className="space-y-1">
                <p className="text-sm font-bold text-theme-text-primary">No content available.</p>
                <p className="text-xs text-theme-text-secondary">
                  We couldn't find matches for your search. Adjust your filters and try again.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCmsUpdates.map((item) => {
                const getTopicIcon = (topic) => {
                  switch (topic) {
                    case 'IRS News': return <FileText className="w-5 h-5 text-emerald-500" />;
                    case 'FBAR': return <ShieldCheck className="w-5 h-5 text-teal-500" />;
                    case 'FATCA': return <Scale className="w-5 h-5 text-amber-500" />;
                    case 'Form 5471': return <Building2 className="w-5 h-5 text-indigo-500" />;
                    case 'Form 8938': return <Calculator className="w-5 h-5 text-amber-600" />;
                    case 'Tax Deadlines': return <Clock className="w-5 h-5 text-rose-500" />;
                    case 'Expat Compliance': return <Globe className="w-5 h-5 text-blue-500" />;
                    default: return <FileText className="w-5 h-5 text-amber-500" />;
                  }
                };

                const isHighImportance = item.importance === 'high';

                const topicName = item.topic || item.category || 'All';
                return (
                  <div
                    key={item.id}
                    id={`irs-cms-card-${item.id}`}
                    name={topicName}
                    className="bg-theme-card border border-theme-border hover:border-amber-500/40 rounded-xl p-6 shadow-3xs hover:shadow-xs transition-all duration-300 flex flex-col justify-between hover:translate-y-[-3px] select-none"
                  >
                    <div className="space-y-4">
                      {/* Top metadata row */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 bg-theme-surface rounded border border-theme-border flex-shrink-0">
                            {getTopicIcon(topicName)}
                          </div>
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-500">
                            {topicName}
                          </span>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[9px] font-mono tracking-tight font-bold ${
                          isHighImportance
                            ? 'bg-red-500/10 text-red-500 border border-red-500/20'
                            : 'bg-theme-surface text-theme-text-secondary border border-theme-border'
                        }`}>
                          {(item.importance || 'medium').toUpperCase()} PRIORITY
                        </span>
                      </div>

                      {/* Main Title and Source */}
                      <div className="space-y-1">
                        <h3 className="text-sm font-bold font-display text-theme-text-primary leading-snug">
                          {item.title}
                        </h3>
                        <p className="text-[9px] font-mono text-theme-text-secondary uppercase select-none">
                          Source: {item.source || 'IRS'}
                        </p>
                      </div>

                      {/* Summary */}
                      <p className="text-xs text-theme-text-secondary leading-relaxed font-sans">
                        {item.summary}
                      </p>

                      {/* Diagnostic Bullet list */}
                      {(item.guidelines && item.guidelines.length > 0) && (
                        <div className="pt-2.5 border-t border-theme-border/60 space-y-2">
                          <p className="text-[10px] uppercase font-mono tracking-wider font-extrabold text-theme-text-primary">Filing Guidelines:</p>
                          <ul className="space-y-1.5">
                            {item.guidelines.map((line, index) => (
                              <li key={index} className="flex items-start gap-1.5 text-xs text-theme-text-secondary font-sans leading-relaxed">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                                <span>{line}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>


                    {/* Date and actions */}
                    <div className="pt-4 mt-6 border-t border-theme-border flex items-center justify-between text-[10px] font-mono text-theme-text-secondary">
                      <span>Ref Date: {item.date}</span>
                      <a
                        href={
                          item.source_url || 
                          item.officialUrl || 
                          ({
                            'IRS News': 'https://www.irs.gov/newsroom',
                            'FBAR': 'https://www.fincen.gov/report-foreign-bank-and-financial-accounts',
                            'FATCA': 'https://www.irs.gov/businesses/corporations/foreign-account-tax-compliance-act-fatca',
                            'Form 5471': 'https://www.irs.gov/forms-pubs/about-form-5471',
                            'Form 8938': 'https://www.irs.gov/forms-pubs/about-form-8938',
                            'Tax Deadlines': 'https://www.irs.gov/filing/individuals/when-to-file',
                            'Expat Compliance': 'https://www.irs.gov/individuals/international-taxpayers/streamlined-filing-compliance-procedures'
                          }[item.topic] || 'https://www.irs.gov')
                        }
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 dark:bg-amber-500/10 dark:hover:bg-amber-500 text-slate-950 dark:text-amber-400 dark:hover:text-slate-950 font-bold rounded-lg text-xs font-sans flex items-center gap-1.5 transition-all cursor-pointer shadow-3xs"
                        id={`view-official-source-btn-${item.id}`}
                      >
                        <span>View Official Source</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          </div>
        </section>

        {/* Structured Section 2: US Compliance Calendar Month Bento Grid */}
        <section id="us-compliance-calendar" className="space-y-8 pt-4">
          <div className="text-center md:text-left space-y-2">
            <h2 className="text-2xl font-extrabold font-display text-theme-text-primary flex items-center justify-center md:justify-start gap-2">
              <CalendarDays className="w-6 h-6 text-amber-500" />
              US Compliance Calendar Reference
            </h2>
            <p className="text-xs sm:text-sm text-theme-text-secondary font-sans">
              Annual cross-border tax pipelines compiled for critical filing milestones. Highly readable monthly cards substitute cluttered date meshes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {cmsComplianceCalendarSchema.map((m) => (
              <div
                key={m.month}
                id={`calendar-month-${m.month.toLowerCase()}`}
                className="bg-theme-card border border-theme-border rounded-xl p-5 shadow-3xs flex flex-col justify-between hover:border-amber-500/35 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
              >
                {/* Visual accent left side bar */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500" />

                <div className="space-y-4">
                  {/* Month header badge */}
                  <div className="flex items-center justify-between border-b border-theme-border pb-3">
                    <h3 className="text-base font-extrabold font-display text-theme-text-primary tracking-wide">
                      {m.month.toUpperCase()}
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 bg-amber-400/10 text-amber-500 rounded font-semibold border border-amber-500/10">
                      MILESTONES
                    </span>
                  </div>

                  {/* Month's events list */}
                  <div className="space-y-4">
                    {m.events.map((ev, idx) => (
                      <div key={idx} className="space-y-1 text-left font-sans">
                        <div className="flex justify-between items-baseline gap-1">
                          <p className="text-[11px] font-bold text-amber-500 font-mono select-all">
                            {ev.deadline}
                          </p>
                        </div>
                        <p className="text-xs font-bold text-theme-text-primary leading-tight">
                          {ev.title}
                        </p>
                        <p className="text-[11px] text-theme-text-secondary leading-normal">
                          {ev.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Practical client reminders checklist footer */}
                <div className="mt-5 pt-3.5 border-t border-theme-border/60 space-y-2 text-left">
                  <span className="text-[10px] font-mono tracking-wider font-extrabold text-theme-text-primary flex items-center gap-1 uppercase">
                    <Info className="w-3 h-3 text-amber-500" /> Reminders
                  </span>
                  <ul className="space-y-1">
                    {m.reminders.map((rem, remIdx) => (
                      <li key={remIdx} className="text-[10px] text-theme-text-secondary leading-relaxed list-disc list-inside">
                        {rem}
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            ))}
          </div>
        </section>

        {/* Informational Bulletin Section */}
        <div className="bg-theme-surface border border-theme-border rounded-xl p-6 max-w-3xl mx-auto space-y-3.5 shadow-3xs">
          <div className="flex items-center gap-2.5 text-theme-text-primary">
            <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
            <h4 className="text-sm font-bold font-display uppercase tracking-wide">Bilateral Treaty Legacy Notice</h4>
          </div>
          <p className="text-xs text-theme-text-secondary leading-normal font-sans">
            We preserve updates originating as early as the initial Double Income Tax Treaty protocols of 1990. Corporate and high-net-worth clients can contact their primary partner account representative to retrieve detailed IRS circular transcripts, private letter rulings, or legacy treaties.
          </p>
        </div>

      </main>

      {/* Advisory Legal Disclaimer */}
      <LegalDisclaimer />

      {/* Reusable call to action block */}
      <CTASection />

    </div>
  );
}

