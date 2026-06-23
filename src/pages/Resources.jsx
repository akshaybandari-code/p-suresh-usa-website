import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import useResources from '../hooks/useResources';
import useTaxDeadlines from '../hooks/useTaxDeadlines';
import LegalDisclaimer from '../components/LegalDisclaimer';

import {
  CalendarDays,
  Clock,
  Download,
  AlertTriangle,
  FileSpreadsheet
} from 'lucide-react';
import CTASection from '../components/CTASection';
import SEO from '../components/SEO';

const complianceChecklists = [
  {
    id: 'checklist-nri',
    title: 'Pre-migration Tax Review (India to US)',
    audience: 'Individuals relocating from India to the US for professional opportunities or business setups',
    items: [
      'Redesignate Indian bank accounts to NRO Accounts in compliance with FEMA guidelines.',
      'Convert domestic Demat and brokerage accounts to Non-Resident status.',
      'Compile historical transaction records and asset values to establish tax basis for future reporting.',
      'Evaluate Indian mutual fund holdings to understand IRS passive investment (PFIC) treatment.',
      'Review foreign life insurance and savings policies for potential FATCA Form 8938 disclosures.'
    ]
  },
  {
    id: 'checklist-us-citizen-india',
    title: 'US Citizens & Green Card Holders Residing in India',
    audience: 'US citizens or lawful permanent residents living in India seeking to maintain IRS compliance',
    items: [
      'Prepare annual Form 1040 returns reportable to the IRS, declaring worldwide income sources.',
      'Check if the combined maximum valuation of Indian accounts exceeded $10,000 to determine FBAR requirements.',
      'Identify applicable FATCA thresholds to determine if Form 8938 is required.',
      'Utilize eligible Foreign Tax Credits (Form 1116) or exclusions to alleviate dual tax incidences.',
      'Identify any ownership in Indian corporate entities subject to Form 5471 or Form 8865 declarations.'
    ]
  }
];

import Skeleton from '../components/Skeleton';

export default function Resources() {
  const [activeTab, setActiveTab ] = useState('calendar');
  const [downloadSuccessItem, setDownloadSuccessItem] = useState(null);
  const [simulatorLoading, setSimulatorLoading] = useState(false);

  const { data: cmsResources, loading: resourcesLoading } = useResources();
  const resourcesList = cmsResources || [];

  const { data: cmsDeadlines, loading: deadlinesLoading } = useTaxDeadlines();
  const deadlinesList = cmsDeadlines || [];
  
  // Interactive checklist state trackers to let users click things
  const [checkedItems, setCheckedItems] = useState({});

  useEffect(() => {
    setSimulatorLoading(true);
    const timer = setTimeout(() => {
      setSimulatorLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const isLoading = resourcesLoading || deadlinesLoading || simulatorLoading;

  const handleToggleCheck = (itemId, index) => {
    const key = `${itemId}-${index}`;
    setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleDownload = (itemTitle) => {
    setDownloadSuccessItem(itemTitle);
    setTimeout(() => {
      setDownloadSuccessItem(null);
    }, 4000);
  };

  return (
    <div className="bg-theme-background text-theme-text-primary min-h-screen transition-colors duration-200 pb-16">
      <SEO title="Resource Center" description="Tax filing timelines, cross-border reporting calendars, and pre-migration checklist frameworks." url="https://www.suureshusa.com/resources" />
      
      {/* Page Header */}
      <section className="bg-theme-surface py-16 border-b border-theme-border text-center select-none">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <p className="text-2xs uppercase tracking-widest text-amber-500 font-mono">Resource Center</p>
          <h1 className="text-4xl font-extrabold font-display text-theme-text-primary">
            Tax Guidelines &amp; Reference Materials
          </h1>
          <p className="text-xs sm:text-sm text-theme-text-secondary max-w-2xl mx-auto font-sans">
            Reference filing timelines, view cross-border reporting calendars, and refer to pre-migration checklist frameworks.
          </p>
        </div>

        {/* Dynamic tabs navigation */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto whitespace-nowrap gap-1.5 mt-10 max-w-2xl mx-auto px-4 border-b border-theme-border pb-0 bg-transparent scrollbar-none">
          <button
            id="tab-btn-calendar"
            onClick={() => setActiveTab('calendar')}
            className={`px-4 py-3 text-xs font-semibold font-mono tracking-wider transition-all relative cursor-pointer shrink-0 ${
              activeTab === 'calendar'
                ? 'text-theme-text-primary border-b-2 border-amber-500 font-bold'
                : 'text-theme-text-secondary hover:text-theme-text-primary'
            }`}
          >
            FILING TIMELINE CALENDAR
          </button>
          <button
            id="tab-btn-checklist"
            onClick={() => setActiveTab('checklist')}
            className={`px-4 py-3 text-xs font-semibold font-mono tracking-wider transition-all relative cursor-pointer shrink-0 ${
              activeTab === 'checklist'
                ? 'text-theme-text-primary border-b-2 border-amber-500 font-bold'
                : 'text-theme-text-secondary hover:text-theme-text-primary'
            }`}
          >
            COMPLIANCE CHECKLISTS
          </button>
          <button
            id="tab-btn-downloads"
            onClick={() => setActiveTab('downloads')}
            className={`px-4 py-3 text-xs font-semibold font-mono tracking-wider transition-all relative cursor-pointer shrink-0 ${
              activeTab === 'downloads'
                ? 'text-theme-text-primary border-b-2 border-amber-500 font-bold'
                : 'text-theme-text-secondary hover:text-theme-text-primary'
            }`}
          >
            DOWNLOADABLE TEMPLATES
          </button>
        </div>
      </section>

      {/* Main Tab Render Space */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <AnimatePresence mode="wait">
          
          {/* TAB 1: FILING TIMELINE CALENDAR */}
          {activeTab === 'calendar' && (
            <motion.div
              key="calendar-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-8 max-w-4xl mx-auto"
            >
              
              <div className="flex items-center gap-3 p-4 bg-amber-500/5 border border-amber-500/10 rounded-xl">
                <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
                <p className="text-xs text-amber-850 dark:text-amber-400 leading-normal font-sans">
                  <strong>Filing Coordination Note:</strong> US filing extension timelines often overlap with Indian tax submission timelines. It is recommended to schedule documentation collation early to ensure alignment across both jurisdictions.
                </p>
              </div>

              {isLoading ? (
                <div className="grid grid-cols-1 gap-6">
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6">
                  {deadlinesList.length === 0 ? <div className="text-center py-20 text-theme-text-secondary">No content available.</div> : deadlinesList.map((dl) => {
                  return (
                    <div
                      key={dl.id}
                      className="bg-theme-card border border-theme-border p-6 rounded-xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md transition-all duration-200 hover:translate-y-[-1px]"
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-theme-surface text-amber-500 border border-theme-border rounded-lg shrink-0">
                          <CalendarDays className="w-6 h-6" />
                        </div>
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded bg-theme-surface text-theme-text-secondary text-[10px] font-mono font-bold uppercase tracking-wider border border-theme-border">
                              Category: {dl.category}
                            </span>
                            <span className="text-xs font-mono text-amber-500 font-bold">{dl.date}</span>
                          </div>
                          <h3 className="text-base font-bold font-display text-theme-text-primary">
                            {dl.event}
                          </h3>
                          <p className="text-xs text-theme-text-secondary max-w-xl font-sans">
                            {dl.description}
                          </p>
                        </div>
                      </div>

                      <div className="shrink-0 flex items-center gap-2 text-2xs font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 dark:bg-emerald-400/5 border border-emerald-500/10 px-3.5 py-1.5 rounded-lg font-bold w-fit">
                        <Clock className="w-3.5 h-3.5" />
                        <span>ACTIVE SCHEDULING</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              )}

              {/* Dedicated FBAR Overview Section */}
              <div id="fbar-overview-section" className="bg-gradient-to-br from-amber-500/5 to-amber-600/10 border border-amber-500/20 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm mt-12">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="px-2.5 py-1 rounded bg-amber-500 text-slate-950 text-[10px] font-mono font-black uppercase tracking-wider">
                      RESOURCES OVERVIEW
                    </span>
                    <h2 className="text-xl sm:text-2xl font-extrabold font-display text-theme-text-primary">
                      FinCEN Form 114: Foreign Bank &amp; Account Reporting (FBAR)
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-theme-text-secondary leading-relaxed font-sans">
                    A critical regulatory requirement mandated by the US Department of the Treasury to monitor and combat cross-border tax evasion and reporting discrepancies.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                  <div className="bg-theme-card border border-theme-border/60 rounded-xl p-5 space-y-2 hover:border-amber-500/35 transition-colors">
                    <h4 className="text-xs font-mono font-bold tracking-wider text-amber-500 uppercase">
                      1. Who Must File?
                    </h4>
                    <p className="text-xs text-theme-text-secondary leading-relaxed font-sans">
                      Any Specified US person (Citizens, Green Card holders, and Residents for Tax Purposes) holding financial interests in or signature authority over foreign accounts that exceed the reporting threshold.
                    </p>
                  </div>

                  <div className="bg-theme-card border border-theme-border/60 rounded-xl p-5 space-y-2 hover:border-amber-500/35 transition-colors">
                    <h4 className="text-xs font-mono font-bold tracking-wider text-amber-500 uppercase">
                      2. Monetary Threshold
                    </h4>
                    <p className="text-xs text-theme-text-secondary leading-relaxed font-sans">
                      If the aggregate maximum balance of all foreign financial accounts (including bank deposits, Indian Demat/Brokerage accounts, mutual funds, PFPs, and PPF balances) exceeds <strong>USD $10,000</strong> at any point during the calendar year.
                    </p>
                  </div>

                  <div className="bg-theme-card border border-theme-border/60 rounded-xl p-5 space-y-2 hover:border-amber-500/35 transition-colors">
                    <h4 className="text-xs font-mono font-bold tracking-wider text-amber-500 uppercase">
                      3. Filing Deadlines
                    </h4>
                    <p className="text-xs text-theme-text-secondary leading-relaxed font-sans">
                      Technically due parallel to individual 1040 returns on <strong>April 15</strong>. However, FinCEN provides a penalty-free, automatic extension to <strong>October 15</strong> without sending a request form.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-theme-surface border border-theme-border rounded-xl space-y-2">
                  <h4 className="text-xs font-bold font-mono tracking-wide text-theme-text-primary flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    Special Applicability to NRIs &amp; US-India Expats
                  </h4>
                  <ul className="list-disc pl-5 text-[11px] sm:text-xs text-theme-text-secondary space-y-1.5 leading-relaxed font-sans">
                    <li>
                      <strong>Indian Provident Funds:</strong> Public Provident Funds (PPF) and Employee Provident Funds (EPF) are recognized as foreign financial accounts and must be included in aggregate FBAR calculations.
                    </li>
                    <li>
                      <strong>NRE &amp; NRO Accounts:</strong> Both Non-Resident External (NRE) and Non-Resident Ordinary (NRO) savings and term deposit certificates count towards the $10,000 aggregate threshold.
                    </li>
                    <li>
                      <strong>Demat Stocks &amp; Mutual Funds:</strong> Investment folios registered under Indian brokerages must be reported with their peak valuation converted using Treasury's spot currency rates.
                    </li>
                  </ul>
                </div>
              </div>

            </motion.div>
          )}

          {/* TAB 2: COMPLIANCE CHECKLISTS */}
          {activeTab === 'checklist' && (
            <motion.div
              key="checklist-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-8 max-w-4xl mx-auto"
            >
              <div className="text-center max-w-lg mx-auto space-y-2 mb-6">
                <h2 className="text-xs font-mono text-amber-500 uppercase tracking-widest font-bold">Interactive Pre-Checklists</h2>
                <p className="text-xs text-theme-text-secondary font-sans">
                  Click the checkboxes below to monitor your transition progress and coordinate essential document collections prior to your consultation.
                </p>
              </div>

              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Skeleton />
                  <Skeleton />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {complianceChecklists.map((checklist) => {
                  return (
                    <div
                      key={checklist.id}
                      className="bg-theme-card border border-theme-border p-6 rounded-xl flex flex-col justify-between shadow-sm relative overflow-hidden"
                    >
                      <div className="space-y-4">
                        
                        <div className="space-y-1">
                          <h3 className="text-sm font-semibold tracking-wider text-amber-500 font-mono uppercase">
                            {checklist.id === 'checklist-nri' ? 'PRE-MIGRATION ACTIONS' : 'EXPAT RETENTION CHECK'}
                          </h3>
                          <h4 className="text-base font-bold text-theme-text-primary font-display">
                            {checklist.title}
                          </h4>
                          <p className="text-3xs sm:text-[11px] leading-snug italic text-theme-text-secondary">
                            <strong>Ideal for:</strong> {checklist.audience}
                          </p>
                        </div>

                        <div className="space-y-3.5 pt-4 border-t border-theme-border">
                          {checklist.items.map((item, index) => {
                            const isChecked = !!checkedItems[`${checklist.id}-${index}`];
                            return (
                              <div
                                key={index}
                                onClick={() => handleToggleCheck(checklist.id, index)}
                                className="flex items-start gap-2.5 group cursor-pointer"
                              >
                                <div className={`w-4 h-4 rounded border mt-0.5 shrink-0 flex items-center justify-center transition-all ${
                                  isChecked
                                    ? 'bg-amber-400 border-amber-400 text-slate-950'
                                    : 'border-theme-border group-hover:border-amber-400 bg-theme-surface'
                                }`}>
                                  {isChecked && <span className="text-[10px] font-bold">✓</span>}
                                </div>
                                <span className={`text-[12px] leading-relaxed transition-all font-sans select-none ${
                                  isChecked ? 'line-through text-theme-text-secondary opacity-50' : 'text-theme-text-primary'
                                }`}>
                                  {item}
                                </span>
                              </div>
                            );
                          })}
                        </div>

                      </div>

                      {/* Cumulative check tracker */}
                      <div className="pt-6 mt-6 border-t border-theme-border text-2xs font-mono text-theme-text-secondary flex justify-between">
                        <span>EST. COMPILATION: 2-3 WEEKS</span>
                        <span className="text-amber-500 font-bold">INTERACTIVE FORM</span>
                      </div>

                    </div>
                  );
                })}
              </div>
              )}

            </motion.div>
          )}

          {/* TAB 3: DOWNLOADABLE RESOURCES */}
          {activeTab === 'downloads' && (
            <motion.div
              key="downloads-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-8 max-w-4xl mx-auto"
            >
              
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {resourcesList.length === 0 ? <div className="text-center py-20 text-theme-text-secondary w-full col-span-3">No content available.</div> : resourcesList.map((res) => {
                  return (
                    <div
                      key={res.id}
                      className="bg-theme-card border border-theme-border p-6 rounded-xl flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-250 relative hover:translate-y-[-2px]"
                    >
                      <div className="space-y-3.5 bg-transparent">
                        <div className="flex items-center justify-between">
                          <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-500 text-[10px] font-mono font-semibold">
                            {res.type}
                          </span>
                          <span className="text-[10px] font-mono text-theme-text-secondary">{res.fileSize}</span>
                        </div>
                        <h3 className="text-base font-bold font-display text-theme-text-primary leading-snug">
                          {res.title}
                        </h3>
                        <p className="text-xs text-theme-text-secondary leading-normal">
                          {res.description}
                        </p>
                      </div>

                      <div className="pt-6 mt-6 border-t border-theme-border">
                        <button
                          id={`download-btn-${res.id}`}
                          onClick={() => handleDownload(res.title)}
                          className="w-full inline-flex items-center justify-center gap-2 px-3.5 py-2 bg-theme-surface text-theme-text-primary border border-theme-border hover:border-amber-400 text-xs font-semibold rounded-lg cursor-pointer transition-all focus:ring-2 focus:ring-amber-400 font-sans"
                        >
                          <Download className="w-3.5 h-3.5 text-amber-500" />
                          Download Template
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
              )}

              {/* Informational success mock popup */}
              <AnimatePresence>
                {downloadSuccessItem && (
                  <motion.div
                    id="download-success-toast"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    className="p-4 bg-emerald-500 text-white rounded-xl shadow-lg flex items-center justify-between max-w-md mx-auto mt-8 border border-emerald-400"
                  >
                    <div className="flex items-center gap-2.5">
                      <FileSpreadsheet className="w-5 h-5 shrink-0" />
                      <div className="text-xs">
                        <p className="font-bold">Template Download Initiated</p>
                        <p className="opacity-90">Downloading checklist reference for: "{downloadSuccessItem.slice(0, 35)}..."</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setDownloadSuccessItem(null)}
                      className="text-white hover:opacity-75 font-semibold text-xs ml-3 focus:outline-none cursor-pointer"
                    >
                      Dismiss
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          )}

        </AnimatePresence>

      </main>

      {/* Advisory Legal Disclaimer */}
      <LegalDisclaimer />

      {/* CTA section final */}
      <CTASection />

    </div>
  );
}
