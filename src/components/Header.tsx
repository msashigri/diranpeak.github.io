import React, { useState } from 'react';
import { Menu, X, ChevronDown, Globe, Edit3, LogIn } from 'lucide-react';
import { DpaLogo } from './DpaLogo';
import { useAuth } from '../context/AuthContext';
import { SUPPORTED_LANGUAGES } from '../utils/translator';

interface HeaderProps {
  currentRoute: string;
  onNavigate: (route: string, param?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentRoute, onNavigate }) => {
  const { user, isAuthenticated, language, languageCode, setLanguage, openLogin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleOpenDropdown = (menuName: string) => {
    setActiveDropdown(menuName);
  };

  const handleCloseDropdown = () => {
    setActiveDropdown(null);
  };

  return (
    <header className="sticky top-0 z-[1000] bg-white border-b border-[#eaeef3] transition-all">
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
                <div className="absolute top-full left-0 w-72 bg-white rounded-b-md shadow-xl border border-slate-100 py-2 z-[1050] animate-in fade-in duration-100">
                  <button
                    onClick={() => { handleCloseDropdown(); onNavigate('tours', 'trekking'); }}
                    className="w-full text-left px-4 py-2 text-[13px] font-bold text-[#5191fa] hover:bg-slate-50 transition-colors"
                  >
                    All Trekking Tours
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
                    onClick={() => { handleCloseDropdown(); onNavigate('tour-detail', 'nanga-parbat-rakaposhi-base-camp-trek'); }}
                    className="w-full text-left px-4 py-2 text-[13px] hover:bg-slate-50 hover:text-[#5191fa] transition-colors"
                  >
                    Nanga Parbat &amp; Rakaposhi BC Trek
                  </button>
                  <button
                    onClick={() => { handleCloseDropdown(); onNavigate('tour-detail', 'barah-broq-moses-peak-trek'); }}
                    className="w-full text-left px-4 py-2 text-[13px] hover:bg-slate-50 hover:text-[#5191fa] transition-colors"
                  >
                    Barah Broq Moses Peak Trek
                  </button>
                  <button
                    onClick={() => { handleCloseDropdown(); onNavigate('tour-detail', 'snow-lake-biafo-hispar-la-trek'); }}
                    className="w-full text-left px-4 py-2 text-[13px] hover:bg-slate-50 hover:text-[#5191fa] transition-colors"
                  >
                    Snow Lake Biafo Hispar La Trek
                  </button>
                  <button
                    onClick={() => { handleCloseDropdown(); onNavigate('tour-detail', 'arando-haramosh-la-trek'); }}
                    className="w-full text-left px-4 py-2 text-[13px] hover:bg-slate-50 hover:text-[#5191fa] transition-colors"
                  >
                    Arando Haramosh La Trek
                  </button>
                  <button
                    onClick={() => { handleCloseDropdown(); onNavigate('tour-detail', 'machulo-la-k2-viewpoint-trek'); }}
                    className="w-full text-left px-4 py-2 text-[13px] hover:bg-slate-50 hover:text-[#5191fa] transition-colors"
                  >
                    Machulo La K2 Viewpoint Trek
                  </button>
                  <button
                    onClick={() => { handleCloseDropdown(); onNavigate('tour-detail', 'rush-lake-trek'); }}
                    className="w-full text-left px-4 py-2 text-[13px] hover:bg-slate-50 hover:text-[#5191fa] transition-colors"
                  >
                    Rush Lake Trek
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
                <div className="absolute top-full left-0 w-72 bg-white rounded-b-md shadow-xl border border-slate-100 py-2 z-[1050] animate-in fade-in duration-100">
                  <button
                    onClick={() => { handleCloseDropdown(); onNavigate('tours', '6000m'); }}
                    className="w-full text-left px-4 py-2 text-[13px] font-bold text-amber-600 hover:bg-slate-50 transition-colors"
                  >
                    6000m peaks in pakistan
                  </button>
                  <button
                    onClick={() => { handleCloseDropdown(); onNavigate('tours', 'expedition'); }}
                    className="w-full text-left px-4 py-2 text-[13px] font-semibold text-[#5191fa] hover:bg-slate-50 transition-colors"
                  >
                    All Expeditions (8000m &amp; 7000m)
                  </button>
                  <button
                    onClick={() => { handleCloseDropdown(); onNavigate('tour-detail', 'gasherbrum-1-2-expedition'); }}
                    className="w-full text-left px-4 py-2 text-[13px] hover:bg-slate-50 hover:text-[#5191fa] transition-colors"
                  >
                    Gasherbrum 1 / 2 Expedition
                  </button>
                  <button
                    onClick={() => { handleCloseDropdown(); onNavigate('tour-detail', 'broad-peak-expedition'); }}
                    className="w-full text-left px-4 py-2 text-[13px] hover:bg-slate-50 hover:text-[#5191fa] transition-colors"
                  >
                    Broad Peak Expedition (8,047m)
                  </button>
                  <button
                    onClick={() => { handleCloseDropdown(); onNavigate('tour-detail', 'k2-climbing-expedition'); }}
                    className="w-full text-left px-4 py-2 text-[13px] hover:bg-slate-50 hover:text-[#5191fa] transition-colors"
                  >
                    K2 Climbing Expedition (8,611m)
                  </button>
                  <button
                    onClick={() => { handleCloseDropdown(); onNavigate('tour-detail', 'spantik-peak-expedition'); }}
                    className="w-full text-left px-4 py-2 text-[13px] hover:bg-slate-50 hover:text-[#5191fa] transition-colors"
                  >
                    Spantik Peak &quot;Golden Peak&quot; (7,027m)
                  </button>
                  <button
                    onClick={() => { handleCloseDropdown(); onNavigate('tour-detail', 'diran-peak-7273-m-expedition'); }}
                    className="w-full text-left px-4 py-2 text-[13px] hover:bg-slate-50 hover:text-[#5191fa] transition-colors"
                  >
                    Diran Peak (7,273m) Expedition
                  </button>
                  <button
                    onClick={() => { handleCloseDropdown(); onNavigate('tour-detail', 'khosar-gang-peak-expedition'); }}
                    className="w-full text-left px-4 py-2 text-[13px] hover:bg-slate-50 hover:text-[#5191fa] transition-colors"
                  >
                    Khosar Gang Peak (6,040m)
                  </button>
                  <button
                    onClick={() => { handleCloseDropdown(); onNavigate('tour-detail', 'pastore-peak-climbing-expedition'); }}
                    className="w-full text-left px-4 py-2 text-[13px] hover:bg-slate-50 hover:text-[#5191fa] transition-colors"
                  >
                    Pastore Peak Climbing (6,209m)
                  </button>
                  <button
                    onClick={() => { handleCloseDropdown(); onNavigate('tour-detail', 'laila-peak-expedition'); }}
                    className="w-full text-left px-4 py-2 text-[13px] hover:bg-slate-50 hover:text-[#5191fa] transition-colors"
                  >
                    Laila Peak Expedition (6,096m)
                  </button>
                  <button
                    onClick={() => { handleCloseDropdown(); onNavigate('tour-detail', 'trango-tower-expedition'); }}
                    className="w-full text-left px-4 py-2 text-[13px] hover:bg-slate-50 hover:text-[#5191fa] transition-colors"
                  >
                    Trango Tower Expedition
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
                <div className="absolute top-full left-0 w-72 bg-white rounded-b-md shadow-xl border border-slate-100 py-2 z-[1050] animate-in fade-in duration-100">
                  <button
                    onClick={() => { handleCloseDropdown(); onNavigate('tours', 'cultural'); }}
                    className="w-full text-left px-4 py-2 text-[13px] font-bold text-[#5191fa] hover:bg-slate-50 transition-colors"
                  >
                    All Safari &amp; Cultural Tours
                  </button>
                  <button
                    onClick={() => { handleCloseDropdown(); onNavigate('tour-detail', 'skardu-tour-packages'); }}
                    className="w-full text-left px-4 py-2 text-[13px] hover:bg-slate-50 hover:text-[#5191fa] transition-colors"
                  >
                    Skardu Tour Packages
                  </button>
                  <button
                    onClick={() => { handleCloseDropdown(); onNavigate('tour-detail', 'hunza-tour'); }}
                    className="w-full text-left px-4 py-2 text-[13px] hover:bg-slate-50 hover:text-[#5191fa] transition-colors"
                  >
                    Hunza Tour
                  </button>
                  <button
                    onClick={() => { handleCloseDropdown(); onNavigate('tour-detail', 'fairy-meadows-and-hunza-trip'); }}
                    className="w-full text-left px-4 py-2 text-[13px] hover:bg-slate-50 hover:text-[#5191fa] transition-colors"
                  >
                    Fairy Meadows &amp; Hunza Trip
                  </button>
                  <button
                    onClick={() => { handleCloseDropdown(); onNavigate('tour-detail', 'karakoram-highway-tour-pakistan'); }}
                    className="w-full text-left px-4 py-2 text-[13px] hover:bg-slate-50 hover:text-[#5191fa] transition-colors"
                  >
                    Karakoram Highway Tour
                  </button>
                  <button
                    onClick={() => { handleCloseDropdown(); onNavigate('tour-detail', 'cultural-heritage-lahore-multan-peshawar-swat'); }}
                    className="w-full text-left px-4 py-2 text-[13px] hover:bg-slate-50 hover:text-[#5191fa] transition-colors"
                  >
                    Cultural Heritage: Lahore, Multan, Peshawar &amp; Swat
                  </button>
                  <button
                    onClick={() => { handleCloseDropdown(); onNavigate('tour-detail', 'lahore-city-tour'); }}
                    className="w-full text-left px-4 py-2 text-[13px] hover:bg-slate-50 hover:text-[#5191fa] transition-colors"
                  >
                    Lahore City Tour
                  </button>
                  <button
                    onClick={() => { handleCloseDropdown(); onNavigate('tour-detail', 'peshawar-city-tour'); }}
                    className="w-full text-left px-4 py-2 text-[13px] hover:bg-slate-50 hover:text-[#5191fa] transition-colors"
                  >
                    Peshawar City Tour
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
                <div className="absolute top-full right-0 w-60 bg-white rounded-b-md shadow-xl border border-slate-100 py-2 z-[1050] animate-in fade-in duration-100">
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
                    onClick={() => { handleCloseDropdown(); onNavigate('partner', 'all'); }}
                    className="w-full text-left px-4 py-2 text-[13px] hover:bg-slate-50 hover:text-[#5191fa] transition-colors"
                  >
                    Become Our Partner
                  </button>
                  <button
                    onClick={() => { handleCloseDropdown(); onNavigate('partner', 'vehicles'); }}
                    className="w-full text-left px-4 py-2 text-[13px] hover:bg-slate-50 hover:text-[#5191fa] transition-colors"
                  >
                    Partner Vehicles (4x4 Fleet)
                  </button>
                  <button
                    onClick={() => { handleCloseDropdown(); onNavigate('partner', 'hotels'); }}
                    className="w-full text-left px-4 py-2 text-[13px] hover:bg-slate-50 hover:text-[#5191fa] transition-colors"
                  >
                    Partner Hotels &amp; Resorts
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
            Climbing Expedition (8000m &amp; 7000m)
          </button>
          <button
            onClick={() => { setMobileMenuOpen(false); onNavigate('tours', '6000m'); }}
            className="w-full text-left py-2 px-3 text-sm font-semibold text-amber-600 hover:bg-slate-50"
          >
            6000m Peaks in Pakistan
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
            onClick={() => { setMobileMenuOpen(false); onNavigate('partner', 'all'); }}
            className="w-full text-left py-2 px-3 text-sm font-medium hover:bg-slate-50 text-[#1a2b48]"
          >
            Become Our Partner
          </button>
          <button
            onClick={() => { setMobileMenuOpen(false); onNavigate('partner', 'vehicles'); }}
            className="w-full text-left py-2 px-3 text-sm font-medium hover:bg-slate-50 text-[#1a2b48]"
          >
            Partner Vehicles (4x4)
          </button>
          <button
            onClick={() => { setMobileMenuOpen(false); onNavigate('partner', 'hotels'); }}
            className="w-full text-left py-2 px-3 text-sm font-medium hover:bg-slate-50 text-[#1a2b48]"
          >
            Partner Hotels &amp; Resorts
          </button>

          {/* Mobile Profile & Edit Profile Option */}
          <div className="pt-3 border-t border-slate-100 px-3">
            {isAuthenticated && user ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#5191fa] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                      {(user.firstName || user.email)[0].toUpperCase()}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800">
                        {user.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : 'Traveler'}
                      </div>
                      <div className="text-[10px] text-slate-400">{user.email}</div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onNavigate('dashboard', 'profile');
                    }}
                    className="flex-1 py-1.5 px-3 text-xs font-bold text-[#5191fa] bg-blue-50 hover:bg-blue-100 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-blue-200"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit Profile</span>
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onNavigate('dashboard');
                    }}
                    className="py-1.5 px-3 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                  >
                    Dashboard
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openLogin();
                }}
                className="w-full py-2 px-3 text-xs font-bold text-white bg-[#5191fa] hover:bg-[#3875dc] rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-xs"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Log In / Sign Up</span>
              </button>
            )}
          </div>

          {/* Mobile Language Switcher */}
          <div className="pt-3 border-t border-slate-100">
            <div className="text-xs font-bold text-slate-500 mb-2 px-3 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-[#5191fa]" />
              <span>Language / زبان منتخب کریں</span>
            </div>
            <div className="grid grid-cols-2 gap-2 px-2">
              {SUPPORTED_LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => {
                    setLanguage(l.code);
                    setMobileMenuOpen(false);
                  }}
                  className={`py-1.5 px-2.5 rounded-lg text-xs flex items-center gap-1.5 border transition-all text-left ${
                    (languageCode === l.code || language === l.name)
                      ? 'bg-blue-50 border-[#5191fa] text-[#5191fa] font-bold'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-sm">{l.flag}</span>
                  <span className={l.dir === 'rtl' ? 'font-semibold' : ''}>{l.nativeName}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
