import React, { useState, useEffect } from 'react';
import { NoticeBanner } from './components/NoticeBanner';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AskReceptionist } from './components/AskReceptionist';

// Public Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { DoctorProfilePage } from './pages/DoctorProfilePage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { NewPatientsPage } from './pages/NewPatientsPage';
import { InsuranceFinancingPage } from './pages/InsuranceFinancingPage';
import { FaqPage } from './pages/FaqPage';
import { ContactPage } from './pages/ContactPage';
import { BookDemoPage } from './pages/BookDemoPage';
import { GalleryPage } from './pages/GalleryPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';

// Desktop Portal Pages
import { PortalLayout } from './pages/portal/PortalLayout';
import { PortalDashboard } from './pages/portal/PortalDashboard';
import { PortalAppointments } from './pages/portal/PortalAppointments';
import { PortalCalendar } from './pages/portal/PortalCalendar';
import { PortalProviders } from './pages/portal/PortalProviders';
import { PortalServices } from './pages/portal/PortalServices';
import { PortalEnquiries } from './pages/portal/PortalEnquiries';
import { PortalNotifications } from './pages/portal/PortalNotifications';
import { PortalAnalytics } from './pages/portal/PortalAnalytics';
import { PortalAssistant } from './pages/portal/PortalAssistant';
import { PortalSettings } from './pages/portal/PortalSettings';

// Database Services
import { testConnection } from './services/firebase';
import { seedInitialDataIfEmpty } from './services/dbService';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  const [portalTab, setPortalTab] = useState<string>('dashboard');

  // Handle browser back/forward and path synchronization
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Seed initial records idempotently on startup
  useEffect(() => {
    testConnection();
    seedInitialDataIfEmpty();
  }, []);

  // Determine if in Portal
  const isPortal = currentPath.startsWith('/portal');

  if (isPortal) {
    return (
      <PortalLayout
        currentTab={portalTab}
        onTabChange={setPortalTab}
        onNavigateHome={() => navigateTo('/')}
      >
        {portalTab === 'dashboard' && <PortalDashboard onNavigateTab={setPortalTab} />}
        {portalTab === 'appointments' && <PortalAppointments />}
        {portalTab === 'calendar' && <PortalCalendar />}
        {portalTab === 'providers' && <PortalProviders />}
        {portalTab === 'services' && <PortalServices />}
        {portalTab === 'enquiries' && <PortalEnquiries />}
        {portalTab === 'notifications' && <PortalNotifications />}
        {portalTab === 'analytics' && <PortalAnalytics />}
        {portalTab === 'assistant' && <PortalAssistant />}
        {portalTab === 'settings' && <PortalSettings />}
      </PortalLayout>
    );
  }

  // Render Public Page based on route
  const renderPublicPage = () => {
    if (currentPath === '/' || currentPath === '') {
      return <HomePage onNavigate={navigateTo} />;
    }
    if (currentPath === '/about') {
      return <AboutPage onNavigate={navigateTo} />;
    }
    if (currentPath === '/dr-stanislav-golyand') {
      return <DoctorProfilePage onNavigate={navigateTo} />;
    }
    if (currentPath === '/services') {
      return <ServicesPage onNavigate={navigateTo} />;
    }
    if (currentPath.startsWith('/services/')) {
      const slug = currentPath.replace('/services/', '');
      return <ServiceDetailPage slug={slug} onNavigate={navigateTo} />;
    }
    if (currentPath === '/new-patients') {
      return <NewPatientsPage onNavigate={navigateTo} />;
    }
    if (currentPath === '/insurance-financing') {
      return <InsuranceFinancingPage onNavigate={navigateTo} />;
    }
    if (currentPath === '/faq') {
      return <FaqPage onNavigate={navigateTo} />;
    }
    if (currentPath === '/contact') {
      return <ContactPage onNavigate={navigateTo} />;
    }
    if (currentPath === '/gallery') {
      return <GalleryPage onNavigate={navigateTo} />;
    }
    if (currentPath.startsWith('/book-demo')) {
      // Check query param e.g. /book-demo?service=invisalign
      const searchParams = new URLSearchParams(window.location.search);
      const serviceSlug = searchParams.get('service') || undefined;
      return <BookDemoPage initialServiceSlug={serviceSlug} onNavigate={navigateTo} />;
    }
    if (currentPath === '/privacy') {
      return <PrivacyPage onNavigate={navigateTo} />;
    }
    if (currentPath === '/terms') {
      return <TermsPage onNavigate={navigateTo} />;
    }

    // Default 404 fallback
    return (
      <div className="max-w-xl mx-auto px-4 py-32 text-center space-y-4">
        <h2 className="text-3xl font-extrabold text-[#162C54]">Page Not Found</h2>
        <p className="text-xs text-slate-600">The requested page does not exist in this concept demo.</p>
        <button
          onClick={() => navigateTo('/')}
          className="px-5 py-2.5 text-xs font-semibold text-white bg-[#162C54] rounded-xl hover:bg-[#204270]"
        >
          Return to Homepage
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F4] text-[#1B2634]">
      {/* Prominent Independent Concept Banner */}
      <NoticeBanner />

      {/* Main Responsive Navigation */}
      <Navbar currentPath={currentPath} onNavigate={navigateTo} />

      {/* Main Content */}
      <main className="flex-1">
        {renderPublicPage()}
      </main>

      {/* Footer */}
      <Footer onNavigate={navigateTo} />

      {/* Floating Gemini AI Receptionist */}
      <AskReceptionist onNavigate={navigateTo} />
    </div>
  );
}
