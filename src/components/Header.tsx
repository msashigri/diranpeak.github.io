import React, { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { DpaLogo } from './DpaLogo';

interface HeaderProps {
  currentRoute: string;
  onNavigate: (route: string, param?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentRoute, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleOpenDropdown = (menuName: string) => {
    setActiveDropdown(menuName);
  };

  const handleCloseDropdown = () => {
    setActiveDropdown(null);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#eaeef3] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[90px]">
          {/* Modern Diran Peak Adventure (DPA) Logo */}
          <div className="flex items-center shrink-0">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center cursor-pointer focus:outline-none"
              title="Diran Peak Adventure - Home"
            >
              <DpaLogo variant="light" />
            </button>
          </div>

          {/* Main Navigation Menu matching exact BookingCore items */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 text-[14px] font-medium text-[#1a2b48]">
            <button
              onClick={() => onNavigate('home')}
              className={`px-3 py-2 hover:text-[#5191fa] transition-colors cursor-pointer ${
                currentRoute === 'home' ? 'text-[#5191fa]' : ''
              }`}
            >
              Home
            </button>

            <button
              onClick={() => onNavigate('tours', 'all')}
              className={`px-3 py-2 hover:text-[#5191fa] transition-colors cursor-pointer ${
                currentRoute === 'tours' ? 'text-[#5191fa]' : ''
              }`}
            >
              All Destinations
            </button>

            {/* Trekking Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleOpenDropdown('trekking')}
              onMouseLeave={handleCloseDropdown}
            >
              <button
                onClick={() => onNavigate('tours', 'trekking')}
                className="flex items-center gap-1 px-3 py-2 hover:text-[#5191fa] transition-colors cursor-pointer"
              >
                <span>Trekking</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {activeDropdown === 'trekking' && (
                <div className="absolute top-full left-0 w-64 bg-white rounded-b-md shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in duration-100">
                  <button
                    onClick={() => { handleCloseDropdown(); onNavigate('tours', 'trekking'); }}
                    className="w-full text-left px-4 py-2 text-[13px] hover:bg-slate-50 hover:text-[#5191fa] transition-colors"
                  >
                    All Trekking
                  </button>
                  <button
                    onClick={() => { handleCloseDropdown(); onNavigate('tour-detail', 'k2-base-camp-trek'); }}
                    className="w-full text-left px-4 py-2 text-[13px] hover:bg-slate-50 hover:text-[#5191fa] transition-colors"
                  >
                    K2 Base Camp Trek
                  </button>
                  <button
                    onClick={() => { handleCloseDropdown(); onNavigate('tour-detail', 'k2-gondogoro-la-trek'); }}
                    className="w-full text-left px-4 py-2 text-[13px] hover:bg-slate-50 hover:text-[#5191fa] transition-colors"
                  >
                    K2 Gondogoro La Trek
                  </button>
                  <button
                    onClick={() => { handleCloseDropdown(); onNavigate('tour-detail', 'k2-base-camp-trek'); }}
                    className="w-full text-left px-4 py-2 text-[13px] hover:bg-slate-50 hover:text-[#5191fa] transition-colors"
                  >
                    Barah Broq Moses Peak Trek
                  </button>
                  <button
                    onClick={() => { handleCloseDropdown(); onNavigate('tour-detail', 'k2-base-camp-trek'); }}
                    className="w-full text-left px-4 py-2 text-[13px] hover:bg-slate-50 hover:text-[#5191fa] transition-colors"
                  >
                    Snow Lake Biafo Hispar La Trek
                  </button>
                </div>
              )}
            </div>

            {/* Climbing Expedition Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleOpenDropdown('climbing')}
              onMouseLeave={handleCloseDropdown}
            >
              <button
                onClick={() => onNavigate('tours', 'expedition')}
                className="flex items-center gap-1 px-3 py-2 hover:text-[#5191fa] transition-colors cursor-pointer"
              >
                <span>Climbing Expedition</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {activeDropdown === 'climbing' && (
                <div className="absolute top-full left-0 w-72 bg-white rounded-b-md shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in duration-100">
                  <button
                    onClick={() => { handleCloseDropdown(); onNavigate('tours', '6000m'); }}
                    className="w-full text-left px-4 py-2 text-[13px] hover:bg-slate-50 hover:text-[#5191fa] transition-colors"
                  >
                    6000m peaks in pakistan
                  </button>
                  <button
                    onClick={() => { handleCloseDropdown(); onNavigate('tours', 'expedition'); }}
                    className="w-full text-left px-4 py-2 text-[13px] hover:bg-slate-50 hover:text-[#5191fa] transition-colors"
                  >
                    All Expeditions
                  </button>
                  <button
                    onClick={() => { handleCloseDropdown(); onNavigate('tour-detail', 'gasherbrum-1-2-climbing-expedition'); }}
                    className="w-full text-left px-4 py-2 text-[13px] hover:bg-slate-50 hover:text-[#5191fa] transition-colors"
                  >
                    Gasherbrum 1 / 2 Expedition
                  </button>
                  <button
                    onClick={() => { handleCloseDropdown(); onNavigate('tour-detail', 'broad-peak-expedition'); }}
                    className="w-full text-left px-4 py-2 text-[13px] hover:bg-slate-50 hover:text-[#5191fa] transition-colors"
                  >
                    Broad Peak Expedition
                  </button>
                  <button
                    onClick={() => { handleCloseDropdown(); onNavigate('tour-detail', 'k2-climbing-expedition'); }}
                    className="w-full text-left px-4 py-2 text-[13px] hover:bg-slate-50 hover:text-[#5191fa] transition-colors"
                  >
                    K2 Climbing Expedition
                  </button>
                  <button
                    onClick={() => { handleCloseDropdown(); onNavigate('tour-detail', 'pastore-peak-climbing-expedition'); }}
                    className="w-full text-left px-4 py-2 text-[13px] hover:bg-slate-50 hover:text-[#5191fa] transition-colors"
                  >
                    Pastore Peak Climbing Expedition
                  </button>
                  <button
                    onClick={() => { handleCloseDropdown(); onNavigate('tour-detail', 'laila-peak-expedition'); }}
                    className="w-full text-left px-4 py-2 text-[13px] hover:bg-slate-50 hover:text-[#5191fa] transition-colors"
                  >
                    Laila Peak Expedition
                  </button>
                </div>
              )}
            </div>

            {/* Safari Tours Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleOpenDropdown('safari')}
              onMouseLeave={handleCloseDropdown}
            >
              <button
                onClick={() => onNavigate('tours', 'cultural')}
                className="flex items-center gap-1 px-3 py-2 hover:text-[#5191fa] transition-colors cursor-pointer"
              >
                <span>Safari Tours</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {activeDropdown === 'safari' && (
                <div className="absolute top-full left-0 w-56 bg-white rounded-b-md shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in duration-100">
                  <button
                    onClick={() => { handleCloseDropdown(); onNavigate('tours', 'cultural'); }}
                    className="w-full text-left px-4 py-2 text-[13px] hover:bg-slate-50 hover:text-[#5191fa] transition-colors"
                  >
                    All Safari Tours
                  </button>
                </div>
              )}
            </div>

            {/* Informations Dropdown matching exact site */}
            <div
              className="relative"
              onMouseEnter={() => handleOpenDropdown('info')}
              onMouseLeave={handleCloseDropdown}
            >
              <button
                className="flex items-center gap-1 px-3 py-2 hover:text-[#5191fa] transition-colors cursor-pointer"
              >
                <span>Informations</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {activeDropdown === 'info' && (
                <div className="absolute top-full right-0 w-56 bg-white rounded-b-md shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in duration-100">
                  <button
                    onClick={() => { handleCloseDropdown(); onNavigate('contact'); }}
                    className="w-full text-left px-4 py-2 text-[13px] hover:bg-slate-50 hover:text-[#5191fa] transition-colors"
                  >
                    Contact Us
                  </button>
                  <button
                    onClick={() => { handleCloseDropdown(); onNavigate('about'); }}
                    className="w-full text-left px-4 py-2 text-[13px] hover:bg-slate-50 hover:text-[#5191fa] transition-colors"
                  >
                    About Us
                  </button>
                  <button
                    onClick={() => { handleCloseDropdown(); onNavigate('partner'); }}
                    className="w-full text-left px-4 py-2 text-[13px] hover:bg-slate-50 hover:text-[#5191fa] transition-colors"
                  >
                    Become Our Partner
                  </button>
                  <button
                    onClick={() => { handleCloseDropdown(); onNavigate('partner'); }}
                    className="w-full text-left px-4 py-2 text-[13px] hover:bg-slate-50 hover:text-[#5191fa] transition-colors"
                  >
                    Partners Vehicles
                  </button>
                  <button
                    onClick={() => { handleCloseDropdown(); onNavigate('partner'); }}
                    className="w-full text-left px-4 py-2 text-[13px] hover:bg-slate-50 hover:text-[#5191fa] transition-colors"
                  >
                    Partners Hotels
                  </button>
                </div>
              )}
            </div>
          </nav>

          {/* Mobile menu hamburger button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 px-4 pt-3 pb-6 space-y-2 shadow-xl">
          <button
            onClick={() => { setMobileMenuOpen(false); onNavigate('home'); }}
            className="w-full text-left py-2 px-3 text-sm font-medium hover:bg-slate-50 text-[#1a2b48]"
          >
            Home
          </button>
          <button
            onClick={() => { setMobileMenuOpen(false); onNavigate('tours', 'all'); }}
            className="w-full text-left py-2 px-3 text-sm font-medium hover:bg-slate-50 text-[#1a2b48]"
          >
            All Destinations
          </button>
          <button
            onClick={() => { setMobileMenuOpen(false); onNavigate('tours', 'trekking'); }}
            className="w-full text-left py-2 px-3 text-sm font-medium hover:bg-slate-50 text-[#1a2b48]"
          >
            Trekking
          </button>
          <button
            onClick={() => { setMobileMenuOpen(false); onNavigate('tours', 'expedition'); }}
            className="w-full text-left py-2 px-3 text-sm font-medium hover:bg-slate-50 text-[#1a2b48]"
          >
            Climbing Expedition
          </button>
          <button
            onClick={() => { setMobileMenuOpen(false); onNavigate('tours', 'cultural'); }}
            className="w-full text-left py-2 px-3 text-sm font-medium hover:bg-slate-50 text-[#1a2b48]"
          >
            Safari Tours
          </button>
          <button
            onClick={() => { setMobileMenuOpen(false); onNavigate('contact'); }}
            className="w-full text-left py-2 px-3 text-sm font-medium hover:bg-slate-50 text-[#1a2b48]"
          >
            Contact Us
          </button>
          <button
            onClick={() => { setMobileMenuOpen(false); onNavigate('about'); }}
            className="w-full text-left py-2 px-3 text-sm font-medium hover:bg-slate-50 text-[#1a2b48]"
          >
            About Us
          </button>
          <button
            onClick={() => { setMobileMenuOpen(false); onNavigate('partner'); }}
            className="w-full text-left py-2 px-3 text-sm font-medium hover:bg-slate-50 text-[#1a2b48]"
          >
            Become Our Partner
          </button>
        </div>
      )}
    </header>
  );
};
