/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { Topbar } from './components/Topbar';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AuthModals } from './components/AuthModals';
import { BookingConfirmationModal } from './components/BookingConfirmationModal';
import { PWAInstallButton } from './components/PWAInstallButton';
import { HomePage } from './pages/HomePage';
import { ToursListPage } from './pages/ToursListPage';
import { TourDetailPage } from './pages/TourDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PartnerPage } from './pages/PartnerPage';
import { LegalPage } from './pages/LegalPage';
import { UserDashboardPage } from './pages/UserDashboardPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { TOURS_DATA, Tour, getTourBySlugOrId } from './data/toursData';
import { triggerTranslationUpdate } from './utils/translator';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<string>('home');
  const [selectedTour, setSelectedTour] = useState<Tour>(TOURS_DATA[0]);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [searchDuration, setSearchDuration] = useState<string>('all');
  const [legalTab, setLegalTab] = useState<string>('terms');
  const [partnerCategory, setPartnerCategory] = useState<string>('all');
  const [dashboardTab, setDashboardTab] = useState<string>('bookings');

  // Scroll to top on route change & trigger translation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const timer1 = setTimeout(() => triggerTranslationUpdate(), 50);
    const timer2 = setTimeout(() => triggerTranslationUpdate(), 300);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [currentRoute, selectedTour]);

  const handleNavigate = (route: string, param?: string) => {
    if (route === 'tour-detail') {
      const found = getTourBySlugOrId(param || '');
      if (found) {
        setSelectedTour(found);
      }
      setCurrentRoute('tour-detail');
    } else if (route === 'tours') {
      setFilterCategory(param || 'all');
      setSearchKeyword('');
      setCurrentRoute('tours');
    } else if (route === 'legal') {
      setLegalTab(param || 'terms');
      setCurrentRoute('legal');
    } else if (route === 'partner' || route === 'become-our-partner' || route === 'car' || route === 'hotel') {
      if (route === 'car' || param === 'vehicles' || param === 'car') setPartnerCategory('vehicles');
      else if (route === 'hotel' || param === 'hotels' || param === 'hotel') setPartnerCategory('hotels');
      else setPartnerCategory(param || 'all');
      setCurrentRoute('partner');
    } else if (route === 'dashboard' || route === 'profile') {
      setDashboardTab(param || (route === 'profile' ? 'profile' : 'bookings'));
      setCurrentRoute('dashboard');
    } else {
      setCurrentRoute(route);
    }
  };

  const handleHeroSearch = (params: { destination?: string; category?: string; duration?: string }) => {
    setSearchKeyword(params.destination || '');
    setFilterCategory(params.category || 'all');
    setSearchDuration(params.duration || 'all');
    setCurrentRoute('tours');
  };

  const handleSelectTour = (tour: Tour) => {
    setSelectedTour(tour);
    setCurrentRoute('tour-detail');
  };

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-[#f7f8fa] text-[#1a2b48] selection:bg-[#5191fa] selection:text-white">
        {/* Topbar */}
        <Topbar onNavigate={handleNavigate} />

        {/* Main Header */}
        <Header currentRoute={currentRoute} onNavigate={handleNavigate} />

        {/* Main Page Content */}
        <main className="flex-1">
          {currentRoute === 'home' && (
            <HomePage
              onSelectTour={handleSelectTour}
              onNavigate={handleNavigate}
              onSearch={handleHeroSearch}
            />
          )}

          {currentRoute === 'tours' && (
            <ToursListPage
              initialCategory={filterCategory}
              initialSearch={searchKeyword}
              initialDuration={searchDuration}
              onSelectTour={handleSelectTour}
              onNavigate={handleNavigate}
            />
          )}

          {currentRoute === 'tour-detail' && (
            <TourDetailPage
              tour={selectedTour}
              onNavigate={handleNavigate}
            />
          )}

          {currentRoute === 'about' && (
            <AboutPage onNavigate={handleNavigate} />
          )}

          {currentRoute === 'contact' && (
            <ContactPage onNavigate={handleNavigate} />
          )}

          {currentRoute === 'partner' && (
            <PartnerPage initialCategory={partnerCategory} onNavigate={handleNavigate} />
          )}

          {currentRoute === 'legal' && (
            <LegalPage initialTab={legalTab} onNavigate={handleNavigate} />
          )}

          {currentRoute === 'dashboard' && (
            <UserDashboardPage initialTab={dashboardTab} onNavigate={handleNavigate} />
          )}

          {currentRoute === 'admin' && (
            <AdminDashboardPage onNavigate={handleNavigate} />
          )}
        </main>

        {/* Footer */}
        <Footer onNavigate={handleNavigate} />

        {/* Laravel Login, Sign Up & Forgot Password Modals */}
        <AuthModals onNavigate={handleNavigate} />

        {/* Instant Booking Voucher Modal */}
        <BookingConfirmationModal onNavigate={handleNavigate} />

        {/* Floating PWA Install Banner for Mobile & Laptop */}
        <PWAInstallButton variant="floating" />

        {/* Floating 24/7 WhatsApp Assistance Button */}
        <aside
          aria-label="Direct WhatsApp Contact"
          className="fixed bottom-6 right-6 z-40 flex items-center group"
        >
          <a
            href="https://wa.me/923456412992?text=Hello%20Diran%20Peak%20Adventure%2C%20I%20am%20interested%20in%20planning%20a%20trekking%20or%20climbing%20expedition%20in%20Pakistan."
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-3 rounded-full shadow-2xl hover:shadow-emerald-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            title="Chat directly on WhatsApp with Diran Peak Adventure"
          >
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 25 25"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12.031 0C5.394 0 0 5.395 0 12.031c0 2.119.553 4.186 1.605 6.009L0 24l6.155-1.572c1.764.996 3.771 1.527 5.876 1.527 6.637 0 12.031-5.395 12.031-12.031C24.062 5.395 18.668 0 12.031 0zm0 21.848c-1.859 0-3.666-.5-5.242-1.442l-.375-.224-3.896.995 1.036-3.799-.246-.391C2.316 15.347 1.8 13.722 1.8 12.031c0-5.641 4.59-10.231 10.231-10.231 5.641 0 10.231 4.59 10.231 10.231 0 5.641-4.59 10.217-10.231 10.217zm5.59-7.652c-.307-.154-1.815-.895-2.096-.997-.282-.102-.487-.154-.692.154-.205.307-.795.997-.974 1.202-.179.205-.359.231-.666.077-.307-.154-1.297-.478-2.47-1.524-.913-.815-1.529-1.822-1.708-2.129-.179-.307-.019-.473.135-.626.138-.138.307-.359.461-.538.154-.179.205-.307.307-.512.102-.205.051-.384-.026-.538-.077-.154-.692-1.666-.948-2.28-.25-.598-.504-.517-.692-.527l-.589-.01c-.205 0-.538.077-.82.384-.282.307-1.076 1.051-1.076 2.563 0 1.512 1.102 2.973 1.256 3.178.154.205 2.167 3.309 5.251 4.641.734.317 1.307.506 1.753.648.738.234 1.409.201 1.94.122.592-.089 1.815-.742 2.072-1.46.256-.718.256-1.333.179-1.46-.077-.127-.282-.204-.589-.358z"/>
            </svg>
            {/*<span className="font-semibold text-xs tracking-wide hidden sm:inline">
              WhatsApp (+92 345 6412992) 
            </span> */}
          </a>
        </aside>
      </div>
    </AuthProvider>
  );
}
