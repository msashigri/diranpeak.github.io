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
import { HomePage } from './pages/HomePage';
import { ToursListPage } from './pages/ToursListPage';
import { TourDetailPage } from './pages/TourDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PartnerPage } from './pages/PartnerPage';
import { LegalPage } from './pages/LegalPage';
import { UserDashboardPage } from './pages/UserDashboardPage';
import { TOURS_DATA, Tour } from './data/toursData';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<string>('home');
  const [selectedTour, setSelectedTour] = useState<Tour>(TOURS_DATA[0]);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [searchDuration, setSearchDuration] = useState<string>('all');
  const [legalTab, setLegalTab] = useState<string>('terms');

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentRoute, selectedTour]);

  const handleNavigate = (route: string, param?: string) => {
    if (route === 'tour-detail') {
      const found = TOURS_DATA.find(t => t.slug === param || t.id === param);
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
            <PartnerPage onNavigate={handleNavigate} />
          )}

          {currentRoute === 'legal' && (
            <LegalPage initialTab={legalTab} onNavigate={handleNavigate} />
          )}

          {currentRoute === 'dashboard' && (
            <UserDashboardPage onNavigate={handleNavigate} />
          )}
        </main>

        {/* Footer */}
        <Footer onNavigate={handleNavigate} />

        {/* Laravel Login, Sign Up & Forgot Password Modals */}
        <AuthModals />

        {/* Instant Booking Voucher Modal */}
        <BookingConfirmationModal onNavigate={handleNavigate} />
      </div>
    </AuthProvider>
  );
}
