import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Calendar, FolderOpen, Clock, User, ArrowRight, X, AlertCircle } from 'lucide-react';
import useArticles from '../hooks/useArticles';
import Skeleton from '../components/Skeleton';
import SEO from '../components/SEO';
import LegalDisclaimer from '../components/LegalDisclaimer';

const categories = ['All', 'US Tax', 'FBAR', 'India-US Treaties', 'NRI Compliance', 'FATCA'];

const articleImages = {
  'us-india-dtaa-capital-gains': 'https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?auto=format&fit=crop&w=1200&q=80',
  'fbar-fincen-114-guide': 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
  'pfic-tax-trap-mutual-funds': 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1200&q=80',
  'fatca-form-8938-vs-fbar': 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
  'nri-repatriation-guide-fema': 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1200&q=80'
};

const articleTags = {
  'us-india-dtaa-capital-gains': ['Real Estate', 'DTAA Article 13', 'Form 13', 'Lower TDS', 'Foreign Tax Credit'],
  'fbar-fincen-114-guide': ['FinCEN 114', 'Indian Assets', 'PPF Disclosures', 'Demat Accounts', 'Bank Balance'],
  'pfic-tax-trap-mutual-funds': ['Passive Income', 'Form 8621', 'Mutual Funds', 'IRS Section 1291', 'Mark-To-Market'],
  'fatca-form-8938-vs-fbar': ['FATCA', 'Form 8938', 'FBAR', 'IRS Thresholds', 'Offshore Assets'],
  'nri-repatriation-guide-fema': ['FEMA Regulations', 'Form 15CA', 'Form 15CB', 'NRO Repatriation', 'Outward Remittance']
};

function getRegulatoryContext(id) {
  switch (id) {
    case 'us-india-dtaa-capital-gains':
      return 'The double taxation avoidance treaty safeguards foreign investment returns. For NRIs selling real estate in India, an indexation benefit applies under Indian Revenue rules, and Foreign Tax Credit (FTC) under US IRC Section 901/1116 applies to avoid paying dual taxes on the same capital gain.';
    case 'fbar-fincen-114-guide':
      return 'The threshold for FinCEN Form 114 is strict: an aggregate value exceeding $10,000 USD at any point during the calendar year across all foreign financial assets. This includes checking/savings, brokerage accounts, mutual funds, provident funds, and pension structures.';
    case 'pfic-tax-trap-mutual-funds':
      return 'Passive Foreign Investment Companies (PFICs) are treated heavily by the IRS to prevent offshore tax shelters. Foreign mutual funds rarely provide QEF (Qualified Electing Fund) statements, meaning taxpayers must fall back on Mark-to-Market or Section 1291 excess distribution rules.';
    case 'fatca-form-8938-vs-fbar':
      return 'Form 8938 was introduced under the Foreign Account Tax Compliance Act (FATCA) and is attached directly to the Form 1040 package. Filing thresholds range from $50,000 to $400,000 depending on your filing status (single or married) and whether you reside inside or outside the United States.';
    case 'nri-repatriation-guide-fema':
      return 'Under liberalized remittance rules and FEMA directives, returning capital proceeds is subject to a strict verification audit. Form 15CA and signed 15CB from a licensed auditor ensure the sovereign treasury receives accurate withholding receipts before wires are authorized.';
    default:
      return 'Maintaining clear compliance protects multi-generational investments. Always cross-examine your filings with active treaty definitions to reduce systematic errors.';
  }
}

function getTreatyContext(id) {
  switch (id) {
    case 'us-india-dtaa-capital-gains':
      return 'Article 13 of the US-India DTAA guides taxing rights over capital gains of real property. Usually, the source country (India) receives the first right to tax, and the residence country (US) allows a credit against its own tax for duties paid in India.';
    case 'fbar-fincen-114-guide':
      return 'FBAR reports are strictly information disclosures and do not direct taxes. However, failure to disclose can yield non-willful penalties of $10,000 or willful penalties reaching 50% of the account balances per annual violation.';
    case 'pfic-tax-trap-mutual-funds':
      return 'Securing compliant structures is key. To optimize, NRIs migrating to the US often liquidate Indian mutual holdings prior to achieving US tax residency, or pivot to tax-efficient bilateral options aligned with sovereign treaties.';
    case 'fatca-form-8938-vs-fbar':
      return 'Both reports exist to match global banking records against domestic tax returns. With the implementation of the Inter-Governmental Agreement (IGA) between India and the US, banks in India share financial details directly with the IRS.';
    case 'nri-repatriation-guide-fema':
      return 'Double taxation avoidance certificates reduce the withholding duties or expedite tax returns after outward remittance. Properly aligning FEMA rules with your US resident returns ensures a smooth transfer of capital.';
    default:
      return 'Proper planning coordinates both jurisdictions. Our systems map files directly against active tax treaty sections, reducing human oversight and filing inconsistencies.';
  }
}

const getArticleSections = (article) => {
  if (!article) return [];
  
  return [
    {
      id: 'exec-summary',
      title: '1. Executive Brief',
      content: article.content
    },
    {
      id: 'regulatory-context',
      title: '2. Regulatory Framework',
      content: getRegulatoryContext(article.id)
    },
    {
      id: 'treaty-coordination',
      title: '3. Bilateral Double-Tax Treaty Alignment',
      content: getTreatyContext(article.id)
    },
    {
      id: 'compliance-safeguards',
      title: '4. Recordkeeping and Audit Defense',
      content: 'Under statutory guidelines of both foreign and domestic authorities, non-compliance can trigger structural review and administrative audits. Consistently reconciling bank ledger declarations, reporting foreign trusts on IRS Form 3520/3520-A if applicable, and keeping a comprehensive audit trail reduces systemic friction and prevents penalties.'
    },
    {
      id: 'action-checklist',
      title: '5. Technical Recommendations',
      content: 'Work closely with certified accountants possessing dual-residency credentials. Document all acquisition deeds, indexation calculations, and withholding ledger receipts in organized digital folders to secure legal records for future disclosures.'
    }
  ];
};

export default function Journal() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [simulatorLoading, setSimulatorLoading] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const { data: cmsArticles, loading: articlesLoading, error: articlesError } = useArticles();
  const postsList = cmsArticles || [];

  // Trigger brief simulator when filtering or searching to show loading skeletons
  useEffect(() => {
    setSimulatorLoading(true);
    const timer = setTimeout(() => {
      setSimulatorLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, [searchTerm, selectedCategory]);

  const isLoading = articlesLoading || simulatorLoading;

  const filteredPosts = postsList.filter((post) => {
    const titleMatch = post.title?.toLowerCase() || '';
    const excerptMatch = post.excerpt?.toLowerCase() || '';
    const contentMatch = post.content?.toLowerCase() || '';

    const matchesSearch =
      titleMatch.includes(searchTerm.toLowerCase()) ||
      excerptMatch.includes(searchTerm.toLowerCase()) ||
      contentMatch.includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Identify featured post
  const featuredPost = postsList.find((p) => p.featured) || postsList[0];

  return (
    <div className="bg-theme-background text-theme-text-primary min-h-screen transition-colors duration-200 pb-16">
      <SEO title="Journal & Insights" description="Technical publications and compliance guidelines regarding US-India tax requirements compiled by our expert Chartered Accountants." url="https://www.suureshusa.com/journal" />
      {/* Upper header */}
      <section className="bg-theme-surface py-16 border-b border-theme-border select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <p className="text-2xs uppercase tracking-widest text-amber-500 font-mono">Publications</p>
            <h1 className="text-4xl font-extrabold font-display text-theme-text-primary">
              Tax Journal &amp; Compliance Insights
            </h1>
            <p className="text-xs sm:text-sm text-theme-text-secondary font-sans">
              Technical publications and compliance guidelines compiled by our practicing Chartered Accountants and tax consultants regarding US-India tax requirements.
            </p>
          </div>

          {/* Search bar & Category filters */}
          <div className="mt-12 max-w-2xl mx-auto space-y-6">
            
            {/* Search input visual */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-theme-text-secondary" />
              <input
                id="blog-search-input"
                type="text"
                placeholder="Search articles (e.g. FBAR, lower TDS, mutual funds...)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-11 py-3 bg-theme-input-bg text-theme-text-primary border border-theme-input-border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 hover:border-slate-400 dark:hover:border-zinc-750 transition-all font-sans"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-theme-text-secondary hover:text-theme-text-primary transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Categories horizontal row scrollbar */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    id={`filter-cat-${cat.toLowerCase().replace(/[^a-z]/g, '')}`}
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg font-mono transition-all cursor-pointer ${
                      isActive
                        ? 'bg-theme-primary text-theme-background shadow-sm'
                        : 'bg-theme-card text-theme-text-secondary hover:text-theme-text-primary hover:bg-theme-surface border border-theme-border'
                    }`}
                  >
                    {cat.toUpperCase()}
                  </button>
                );
              })}
            </div>

          </div>

        </div>
      </section>

      {/* Main insights container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-12">
          
          {/* A. Featured Post Area */}
          {!searchTerm && selectedCategory === 'All' && !isLoading && featuredPost && (
            <section id="featured-article-block" className="space-y-6">
              <h2 className="text-xs uppercase font-mono tracking-widest text-amber-500 font-bold">Featured Article</h2>
              
              <div className="bg-theme-card border border-theme-border rounded-2xl overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-0">
                
                {/* Visual side (Left) */}
                <div className="lg:col-span-5 p-5 sm:p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-amber-900 text-white flex flex-col justify-between min-h-[300px]">
                  <div className="space-y-4">
                    <span className="px-3 py-1 bg-amber-400 text-slate-950 rounded-md text-[10px] font-mono font-bold tracking-wider uppercase">
                      {featuredPost.category}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold font-display leading-snug text-white">
                      {featuredPost.title}
                    </h3>
                  </div>

                  <div className="space-y-2 mt-8">
                    <div className="flex items-center gap-2 text-xs text-slate-300 font-mono">
                      <User className="w-4 h-4 text-amber-400" />
                      <span>{featuredPost.author}</span>
                    </div>
                    <div className="flex gap-4 text-[11px] text-slate-400 font-mono">
                      <span>{featuredPost.date}</span>
                      <span>{featuredPost.readTime}</span>
                    </div>
                  </div>
                </div>

                {/* Info side (Right) */}
                <div className="lg:col-span-7 p-5 sm:p-8 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <h4 className="text-xs uppercase tracking-widest font-mono text-theme-text-secondary">EXECUTIVE SUMMARY</h4>
                    <p className="text-sm font-medium text-theme-text-primary leading-relaxed font-sans">
                      {featuredPost.excerpt}
                    </p>
                    <p className="text-xs text-theme-text-secondary line-clamp-3 leading-relaxed">
                      {featuredPost.content}
                    </p>
                  </div>

                  <button
                    id="read-featured-article-btn"
                    onClick={() => setSelectedArticle(featuredPost)}
                    className="self-start inline-flex items-center gap-1.5 text-xs text-amber-500 font-bold hover:text-amber-600 transition-colors cursor-pointer"
                  >
                    Read full article
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </section>
          )}

          {/* B. All Articles Grid / Skeletons */}
          <section className="space-y-8 pt-6">
            <h2 className="text-xs uppercase font-mono tracking-widest text-amber-500 font-bold">
              {searchTerm || selectedCategory !== 'All' ? 'Search Results' : 'Articles & Guides'}
            </h2>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Skeleton />
                <Skeleton />
                <Skeleton />
              </div>
            ) : filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                {filteredPosts.map((post) => {
                  return (
                    <article
                      key={post.id}
                      onClick={() => setSelectedArticle(post)}
                      className="bg-theme-card border border-theme-border hover:border-amber-500/40 dark:hover:border-amber-400/30 rounded-xl p-6 shadow-2xs hover:shadow-lg transition-all duration-300 relative hover:-translate-y-1.5 flex flex-col justify-between cursor-pointer group select-none"
                    >
                      <div className="space-y-3">
                        
                        <div className="flex items-center justify-between text-[10px] font-mono text-theme-text-secondary">
                          <span className="flex items-center gap-1">
                            <FolderOpen className="w-3 h-3 text-amber-500" />
                            {post.category}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-amber-500" />
                            {post.readTime}
                          </span>
                        </div>

                        <h3 className="text-base font-bold font-display text-theme-text-primary line-clamp-2 leading-snug group-hover:text-amber-500 transition-colors duration-200">
                          {post.title}
                        </h3>

                        <p className="text-xs text-theme-text-secondary line-clamp-3 leading-relaxed">
                          {post.excerpt}
                        </p>

                      </div>

                      <div className="pt-6 mt-6 border-t border-theme-border flex items-center justify-between">
                        <span className="text-[10px] font-mono tracking-tight text-theme-text-secondary">By {post.author.split(',')[0]}</span>
                        <button
                          id={`read-article-link-${post.id}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedArticle(post);
                          }}
                          className="text-xs text-amber-500 font-bold group-hover:text-amber-600 inline-flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          Read Article
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-200" />
                        </button>
                      </div>

                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12 bg-theme-surface rounded-xl border border-dashed border-theme-border max-w-md mx-auto space-y-4">
                <AlertCircle className="w-8 h-8 text-amber-500 mx-auto" />
                <div className="space-y-1">
                  <p className="text-sm font-bold text-theme-text-primary">No articles found</p>
                  <p className="text-xs text-theme-text-secondary">
                    We couldn't find matches for "{searchTerm}". Adjust your categories or search spelling and try again.
                  </p>
                </div>
              </div>
            )}
          </section>

        </div>
      </main>

      {/* Advisory Legal Disclaimer */}
      <LegalDisclaimer />

      {/* ARTICLE READER POPUP MODAL (Simulating a premium reading vault) */}
      <AnimatePresence>
        {selectedArticle && (
          <div 
            onClick={() => setSelectedArticle(null)}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
          >
            {/* Inline custom styles for the thin scrollbar */}
            <style>{`
              .thin-scrollbar::-webkit-scrollbar {
                width: 6px;
                height: 6px;
              }
              .thin-scrollbar::-webkit-scrollbar-track {
                background: transparent;
              }
              .thin-scrollbar::-webkit-scrollbar-thumb {
                background: rgba(156, 163, 175, 0.3);
                border-radius: 999px;
              }
              .thin-scrollbar::-webkit-scrollbar-thumb:hover {
                background: rgba(156, 163, 175, 0.5);
              }
              .dark .thin-scrollbar::-webkit-scrollbar-thumb {
                background: rgba(63, 63, 70, 0.45);
              }
              .dark .thin-scrollbar::-webkit-scrollbar-thumb:hover {
                background: rgba(63, 63, 70, 0.65);
              }
            `}</style>

            <motion.div
              id="article-modal-container"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="bg-theme-modal-bg rounded-2xl w-full max-w-[1240px] md:w-[85%] lg:w-[80%] h-[90vh] max-h-[850px] border border-theme-border shadow-2xl flex flex-col overflow-hidden"
            >
              
              {/* Modal Header (Fixed) */}
              <div className="p-5 border-b border-theme-border bg-theme-modal-bg flex-shrink-0 flex items-center justify-between z-10 shadow-3xs">
                <div className="flex items-center gap-2.5">
                  <span className="text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/45 text-amber-800 dark:text-amber-400 border border-amber-200/50 dark:border-amber-900/40">
                    {selectedArticle.category.toUpperCase()}
                  </span>
                  <span className="text-xs font-mono text-theme-text-secondary select-none">{selectedArticle.readTime}</span>
                </div>
                <button
                  id="close-article-modal-btn"
                  onClick={() => setSelectedArticle(null)}
                  className="px-3.5 py-1.5 bg-theme-surface hover:bg-theme-border hover:text-amber-500 text-theme-text-primary rounded-lg text-xs font-bold font-mono transition-all duration-150 cursor-pointer border border-theme-border"
                >
                  ✕ CLOSE
                </button>
              </div>

              {/* Modal Core Body (Scrollable with thin scrollbar) */}
              <div className="flex-grow overflow-y-auto thin-scrollbar p-5 md:p-8 space-y-8">
                
                {/* Premium Featured Header Image / Banner */}
                <div className="w-full h-[180px] md:h-[280px] rounded-xl overflow-hidden shadow-sm bg-gradient-to-br from-slate-950 to-amber-950 relative select-none">
                  <img 
                    referrerPolicy="no-referrer"
                    src={selectedArticle.featuredImage || articleImages[selectedArticle.id] || "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80"}
                    alt={selectedArticle.title}
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/30 flex items-end p-5 md:p-6">
                    <div>
                      <p className="text-amber-400 font-mono text-[10px] uppercase tracking-widest font-bold">EXPERT INTERPRETATION</p>
                      <p className="text-white font-serif text-sm md:text-base mt-1 font-semibold">P. Suuresh &amp; Associates Publications Vault</p>
                    </div>
                  </div>
                </div>

                {/* Grid layout containing Table of Contents and Article Flow */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-2">
                  
                  {/* Left Column: Table of Contents (Sticky and hidden on small screens) */}
                  <aside className="lg:col-span-3 hidden lg:block h-fit sticky top-0 pr-4 border-r border-theme-border/75 select-none">
                    <p className="text-[10px] font-mono font-bold tracking-widest text-amber-500 uppercase mb-4">Table of Contents</p>
                    <nav className="space-y-3.5">
                      {getArticleSections(selectedArticle).map((section) => (
                        <a 
                          key={section.id}
                          href={`#${section.id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                          }}
                          className="block text-xs font-sans text-theme-text-secondary hover:text-amber-500 hover:font-semibold transition-all duration-200 leading-relaxed truncate"
                        >
                          {section.title}
                        </a>
                      ))}
                    </nav>
                  </aside>

                  {/* Right Column: Detailed High Readability Scrollable Text */}
                  <div className="lg:col-span-9 space-y-8 select-text">
                    
                    <div className="space-y-4">
                      {/* Document Main Heading Title */}
                      <h2 className="text-2xl md:text-3.5xl font-extrabold font-display text-theme-text-primary leading-tight">
                        {selectedArticle.title}
                      </h2>

                      {/* Display Keywords / Tag Pills below Title */}
                      <div className="flex flex-wrap gap-1.5 py-1 select-none">
                        {(articleTags[selectedArticle.id] || [selectedArticle.category, 'Tax Advisory']).map((tag) => (
                          <span 
                            key={tag}
                            className="px-2.5 py-1 bg-theme-surface hover:bg-theme-border text-[10px] font-mono rounded border border-theme-border text-theme-text-secondary hover:text-theme-text-primary transition-all duration-150"
                          >
                            #{tag.toUpperCase()}
                          </span>
                        ))}
                      </div>

                      {/* Professional Author & Signature Profile Metadata bar */}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 py-3 border-y border-theme-border text-xs text-theme-text-secondary font-mono">
                        <div className="flex items-center gap-1.5">
                          <User className="w-4 h-4 text-amber-500" />
                          <span className="font-semibold text-theme-text-primary">{selectedArticle.author}</span>
                        </div>
                        <span className="hidden sm:inline text-theme-border">•</span>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 text-amber-500" />
                          <span>{selectedArticle.date}</span>
                        </div>
                      </div>
                    </div>

                    {/* Executive Overview Highlight */}
                    <div className="p-5 bg-theme-surface rounded-xl border border-theme-border italic text-sm text-theme-text-secondary leading-relaxed font-sans shadow-3xs">
                      "{selectedArticle.excerpt}"
                    </div>

                    {/* Core Structured Content Sections iterating structured paragraphs */}
                    <div className="space-y-8 text-sm sm:text-[15px] leading-relaxed text-theme-text-secondary font-sans">
                      {getArticleSections(selectedArticle).map((section) => (
                        <section id={section.id} key={section.id} className="space-y-3.5 pt-1">
                          <h3 className="text-base sm:text-lg font-bold font-display text-theme-text-primary border-b border-theme-border pb-1.5">
                            {section.title}
                          </h3>
                          <p className="text-theme-text-secondary leading-relaxed sm:leading-loose whitespace-pre-line text-justify">
                            {section.content}
                          </p>
                        </section>
                      ))}
                    </div>

                    {/* IRS Statutory Footnote Disclosure Panel */}
                    <div className="p-5 bg-emerald-500/5 dark:bg-emerald-400/5 border border-emerald-500/10 rounded-xl text-2xs text-slate-700 dark:text-zinc-300 space-y-1.5 shadow-3xs font-sans">
                      <p className="font-bold text-emerald-800 dark:text-emerald-400 font-display text-xs">IRS Circular 230 Notice:</p>
                      <p className="leading-relaxed">In accordance with federal regulatory requirements, any tax advice contained in this technical publication is not intended or written to be used, and cannot be used, for the purpose of avoiding tax-related penalties under the Internal Revenue Code. Please consult P. Suuresh &amp; Associates regarding your personal filings for specific, individualized counsel.</p>
                    </div>

                  </div>
                </div>

              </div>

              {/* Modal Engagement Action Footer (Fixed) */}
              <div className="p-5 border-t border-theme-border bg-theme-modal-bg flex-shrink-0 flex justify-end gap-3 z-10 shadow-3xs">
                <button
                  id="modal-engagement-query-btn"
                  onClick={() => {
                    setSelectedArticle(null);
                    navigate('/contact');
                  }}
                  className="px-5 py-2.5 bg-theme-primary hover:opacity-90 text-theme-background font-bold rounded-lg text-xs font-display cursor-pointer transition-all duration-150 inline-flex items-center gap-1.5 shadow-sm hover:scale-[1.02] active:scale-[0.98]"
                >
                  Book Consultation
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
