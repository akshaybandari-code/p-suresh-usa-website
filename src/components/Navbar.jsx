import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Landmark, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/services', label: 'Services' },
  { path: '/journal', label: 'Insights' },
  { path: '/tax-updates', label: 'Tax Updates' },
  { path: '/resources', label: 'Resources' },
  { path: '/team', label: 'Our Team' },
  { path: '/contact', label: 'Contact Us' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on path changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 p-4 md:p-5 lg:px-8 w-full flex justify-center pointer-events-none">
      <header
        id="main-navigation-header"
        className="pointer-events-auto w-full max-w-6xl bg-theme-background/70 backdrop-blur-xl border border-amber-500/20 rounded-[20px] shadow-lg transition-all duration-300 overflow-hidden"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Brand */}
          <Link
            id="brand-logo-link"
            to="/"
            className="flex items-center gap-2.5 group focus:outline-none"
          >
            <div className="p-2.5 bg-slate-900 dark:bg-zinc-800 text-amber-400 dark:text-amber-300 rounded-lg group-hover:scale-105 transition-transform">
              <Landmark className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-theme-text-primary font-display">
                Suuresh<span className="text-amber-500 dark:text-amber-400">USA</span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-theme-text-secondary -mt-1 font-mono">
                P. Suuresh & Associates
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav id="desktop-navbar-nav" className="hidden lg:flex items-center lg:gap-4 xl:gap-6">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  id={`nav-link-${link.label.toLowerCase().replace(/[^a-z]/g, '')}`}
                   key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-all duration-200 relative py-1.5 cursor-pointer hover:text-theme-text-primary ${
                    isActive
                      ? 'text-theme-text-primary'
                      : 'text-theme-text-secondary'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 dark:bg-amber-400 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Practical Toolbar Options */}
          <div className="hidden lg:flex items-center gap-4">
            <ThemeToggle />
            <Link
              id="cta-book-header-btn"
              to="/contact"
              className="inline-flex items-center gap-1.5 text-xs text-white bg-slate-900 dark:bg-zinc-100 hover:bg-slate-800 dark:hover:bg-white text-[13px] font-medium px-4 py-2.5 rounded-lg transition-colors cursor-pointer dark:text-zinc-950 font-display shadow-sm active:scale-95 group"
            >
              Contact Us
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile Right Bar */}
          <div className="flex items-center gap-3 lg:hidden">
            <ThemeToggle />
            <button
              id="mobile-menu-hamburger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-theme-text-primary hover:bg-theme-surface rounded-lg focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Slide-out */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden border-t border-theme-border bg-theme-background px-4 pt-2 pb-6 space-y-1 w-full overflow-hidden shadow-inner"
          >
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  id={`mobile-nav-link-${link.label.toLowerCase().replace(/[^a-z]/g, '')}`}
                  key={link.path}
                  to={link.path}
                  className={`block px-3 py-3 rounded-md text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-amber-500/10 text-theme-text-primary border-l-4 border-amber-500 pl-2'
                      : 'text-theme-text-secondary hover:bg-theme-surface hover:text-theme-text-primary'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-4 px-3">
              <Link
                id="mobile-cta-consultation-btn"
                to="/contact"
                className="w-full text-center inline-flex justify-center items-center gap-2 text-sm text-white bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-gray-50 text-[14px] font-medium px-4 py-3 rounded-lg transition-colors cursor-pointer dark:text-zinc-950 font-display shadow-sm"
              >
                Contact Us
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
    </div>
  );
}
