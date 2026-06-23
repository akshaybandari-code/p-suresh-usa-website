import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Outlet } from 'react-router-dom';
import { ThemeProvider } from './hooks/useTheme';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Consumer Public Pages
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

// Custom Administrative Portal Pages
import AdminLayout from './admin/layouts/AdminLayout';
import Login from './admin/pages/Login';
import Dashboard from './admin/pages/Dashboard';
import AdminServices from './admin/pages/Services';
import AdminArticles from './admin/pages/Articles';
import AdminTaxUpdates from './admin/pages/TaxUpdates';
import AdminResources from './admin/pages/Resources';
import AdminTeam from './admin/pages/Team';
import AdminSettings from './admin/pages/Settings';

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

// Wrapper for public-facing components representing the consumer brand website
function PublicLayout() {
  return (
    <div id="app-root-container" className="flex flex-col min-h-screen w-full overflow-x-hidden bg-theme-background text-theme-text-primary font-sans transition-colors duration-200">
      
      {/* Consumer Header Navbar */}
      <Navbar />
      
      <div className="flex-grow pt-20">
        <Outlet />
      </div>

      {/* Consumer Footer */}
      <Footer />
      
      <ScrollToTopFab />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          
          {/* Public Consumer Site Flow */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/updates" element={<GovUpdates />} />
            <Route path="/tax-updates" element={<GovUpdates />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/team" element={<Team />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/terms" element={<TermsConditions />} />
          </Route>

          {/* Secure Administrative Flow */}
          <Route path="/admin/login" element={<Login />} />
          
          {/* Protected Sub-paths wrapped by AdminLayout */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="articles" element={<AdminArticles />} />
            <Route path="tax-updates" element={<AdminTaxUpdates />} />
            <Route path="resources" element={<AdminResources />} />
            <Route path="team" element={<AdminTeam />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* Fallback Unmatched Views */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </Router>
    </ThemeProvider>
  );
}
