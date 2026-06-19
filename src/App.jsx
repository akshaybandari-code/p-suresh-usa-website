import { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './hooks/useTheme';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Services from './pages/Services';
import Journal from './pages/Journal';
import GovUpdates from './pages/GovUpdates';
import Resources from './pages/Resources';
import Team from './pages/Team';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Disclaimer from './pages/Disclaimer';
import TermsConditions from './pages/TermsConditions';

import NotFound from './pages/NotFound';
import ScrollToTopFab from './components/ScrollToTopFab';

// Scroll to top helper on navigation transition
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    try {
      window.scrollTo(0, 0);
    } catch (e) {
      console.warn('ScrollToTop error', e);
    }
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <div id="app-root-container" className="flex flex-col min-h-screen w-full overflow-x-hidden bg-theme-background text-theme-text-primary font-sans transition-colors duration-200">
          
          {/* Header */}
          <Navbar />
          
          {/* Main Workspace Frame */}
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/journal" element={<Journal />} />
              <Route path="/updates" element={<GovUpdates />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/disclaimer" element={<Disclaimer />} />
              <Route path="/terms" element={<TermsConditions />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>

          {/* Footer */}
          <Footer />
          
          <ScrollToTopFab />
        </div>
      </Router>
    </ThemeProvider>
  );
}
