import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Landmark, Mail, Phone, MapPin, Send, CheckCircle, Linkedin, Facebook, Twitter } from 'lucide-react';
import { motion } from 'motion/react';
import { safeLocalStorage as localStorage } from '../utils/safeLocalStorage';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    setError('');
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please provide a valid business email.');
      return;
    }
    setSubscribed(true);
    setEmail('');
    setTimeout(() => {
      setSubscribed(false);
    }, 4000);
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer id="main-site-footer" className="bg-slate-900 text-slate-300 dark:bg-zinc-950 dark:text-zinc-400 border-t border-slate-800 dark:border-zinc-900">
      
      {/* Upper Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Column 1: Brand & Bio */}
          <div className="flex flex-col space-y-4">
            <Link to="/" className="flex items-center gap-2.5 focus:outline-none">
              <div className="p-2 bg-slate-800 text-amber-400 rounded-lg">
                <Landmark className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-white font-display">
                  Suuresh<span className="text-amber-400">USA</span>
                </span>
                <span className="text-[9px] uppercase tracking-widest text-slate-400 font-mono">
                  P. Suuresh & Associates
                </span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 dark:text-zinc-400 leading-relaxed font-sans">
              Specialized international tax firm and Chartered Accountancy office providing premium, compliance-first, dual-nation financial advising.
            </p>
            <div className="flex items-center gap-3 pt-2 flex-wrap" id="footer-social-links-container">
              <a 
                id="footer-social-linkedin"
                href={localStorage.getItem('social_linkedin') || 'https://linkedin.com/company/suureshusa'} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-1.5 rounded-md bg-slate-800 dark:bg-zinc-900 hover:bg-amber-400 dark:hover:bg-amber-400 hover:text-slate-900 dark:hover:text-slate-900 text-slate-400 transition-all duration-150"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                id="footer-social-facebook"
                href={localStorage.getItem('social_facebook') || 'https://facebook.com/suureshusa'} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-1.5 rounded-md bg-slate-800 dark:bg-zinc-900 hover:bg-amber-400 dark:hover:bg-amber-400 hover:text-slate-900 dark:hover:text-slate-900 text-slate-400 transition-all duration-150"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                id="footer-social-twitter"
                href={localStorage.getItem('social_twitter') || 'https://x.com/suureshusa'} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-1.5 rounded-md bg-slate-800 dark:bg-zinc-900 hover:bg-amber-400 dark:hover:bg-amber-400 hover:text-slate-900 dark:hover:text-slate-900 text-slate-400 transition-all duration-150"
                aria-label="X Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                id="footer-social-email"
                href={localStorage.getItem('social_email') || 'mailto:tax@suureshusa.com'} 
                className="p-1.5 rounded-md bg-slate-800 dark:bg-zinc-900 hover:bg-amber-400 dark:hover:bg-amber-400 hover:text-slate-900 dark:hover:text-slate-900 text-slate-400 transition-all duration-150"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a 
                id="footer-social-phone"
                href={`tel:${(localStorage.getItem('social_phone') || '+12124599023').replace(/[^\d+]/g, '')}`}
                className="p-1.5 rounded-md bg-slate-800 dark:bg-zinc-900 hover:bg-amber-400 dark:hover:bg-amber-400 hover:text-slate-900 dark:hover:text-slate-900 text-slate-400 transition-all duration-150"
                aria-label="Phone"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
            <div className="pt-2 text-xs text-slate-500 font-mono">
              Established 1996 • New York, USA & Hyderabad, India
            </div>
          </div>

          {/* Column 2: Quick Navigation Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white font-display mb-5">
              Practice Areas
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/services" className="hover:text-amber-400 transition-colors">
                  CROSS-BORDER TAX PLANNING
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-amber-400 transition-colors">
                  FBAR & FATCA DISCLOSURES
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-amber-400 transition-colors">
                  NRI INVESTMENT & FEMA ADVISORY
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-amber-400 transition-colors">
                  US-INDIA ENTITY SETUP
                </Link>
              </li>
              <li>
                <Link to="/resources" className="hover:text-amber-400 transition-colors">
                  COMPLIANCE CALENDAR & TOOLS
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white font-display mb-5">
              Global Support
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                <span className="text-slate-400">
                  <strong>New York Representative:</strong> <br />
                  60 Church St, Manhattan, NY 10007
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                <span className="text-slate-400">
                  <strong>Corporate HQ:</strong> <br />
                  P. Suuresh Chambers, Somajiguda, Hyderabad, TS, 500082
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={localStorage.getItem('social_email') || 'mailto:tax@suureshusa.com'} className="hover:text-white transition-colors">
                  {localStorage.getItem('social_email')?.replace('mailto:', '') || 'tax@suureshusa.com'}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${(localStorage.getItem('social_phone') || '+12124599023').replace(/[^\d+]/g, '')}`} className="hover:text-white transition-colors">
                  {localStorage.getItem('social_phone') || '+1 (212) 459-9023'}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white font-display mb-2">
              Corporate Newsletter
            </h3>
            <p className="text-xs text-slate-400">
              Get regulatory tax change alerts from both the US IRS & Income Tax Dept of India right in your inbox. No spam.
            </p>
            <form onSubmit={handleSubscribe} className="relative">
              <input
                id="footer-newsletter-input"
                type="email"
                placeholder="office@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-800 text-white dark:bg-zinc-900 border border-slate-700 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-900 hover:border-slate-500 dark:hover:border-zinc-700 transition-all placeholder:text-slate-500 font-sans"
              />
              <button
                id="footer-subscribe-btn"
                type="submit"
                className="absolute right-1 top-1 bottom-1 px-3 bg-amber-400 hover:bg-amber-500 text-slate-900 text-xs font-semibold rounded-md transition-colors flex items-center justify-center cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
            {error && <p className="text-red-400 text-xs mt-1 font-mono">{error}</p>}
            {subscribed && (
              <p className="text-emerald-400 text-xs mt-1 flex items-center gap-1 font-mono">
                <CheckCircle className="w-3 h-3" /> Subscribed successfully!
              </p>
            )}
          </div>

        </div>
      </div>

      {/* Disclaimers & Secondary Grid */}
      <div className="border-t border-slate-800 dark:border-zinc-900 bg-slate-950/80 p-6 md:p-10">
        <div className="max-w-7xl mx-auto text-xs text-slate-500 space-y-4 leading-relaxed">
          <p>
            <strong>Disclaimer:</strong> This website provides general information only and should not be construed as legal, tax, or accounting advice. Please consult our professionals for advice specific to your circumstances.
          </p>
          <p>
            <strong>Disclaimer for Cross-Border Services:</strong> SuureshUSA is a specialized corporate identity of P. Suuresh & Associates. Chartered Accountancy services in India are regulated under the Institutes of Chartered Accountants of India (ICAI) directives. US CPA services are rendered in coordination with associate state-board certified CPAs in their respective jurisdictions. This website is for informational marketing purposes only and does not establish a formal attorney-client, accountant-client, or professional advisory relationship. Specific tax filings should always run in conjunction with verified primary documents.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between pointer-events-auto gap-4 pt-4 border-t border-slate-800/60 font-mono text-[11px]">
            <div>
              © {currentYear} P. Suuresh & Associates. All rights reserved.
            </div>
            <div className="flex flex-wrap gap-4 sm:gap-6 justify-center sm:justify-start">
              <Link to="/privacy" className="hover:text-slate-300">Privacy Policy</Link>
              <Link to="/disclaimer" className="hover:text-slate-300">Disclaimer</Link>
              <Link to="/terms" className="hover:text-slate-300">Terms &amp; Conditions</Link>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
}
