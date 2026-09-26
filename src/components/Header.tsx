import React, { useState } from 'react';
import { Compass, Menu, X, ChevronDown, Mountain, PhoneCall, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  currentRoute: string;
  onNavigate: (route: string, param?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentRoute, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [trekkingDropdown, setTrekkingDropdown] = useState(false);
  const [expeditionsDropdown, setExpeditionsDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Zone 1: Brand Wordmark / Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#1a2b48] to-[#2c436b] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                <Mountain className="w-6 h-6 text-[#5191fa]" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-extrabold text-xl tracking-tight text-[#1a2b48] leading-none">
                  CHOGORI<span className="text-[#5191fa] font-black">.</span>
                </span>
                <span className="text-[10px] tracking-widest uppercase font-semibold text-slate-500 mt-0.5">
                  Adventure Pakistan
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-700">
            <button
              onClick={() => onNavigate('home')}
              className={`hover:text-[#5191fa] transition-colors py-2 cursor-pointer ${
                currentRoute === 'home' ? 'text-[#5191fa] font-semibold' : ''
              }`}
            >
              Home
            </button>

            <button
              onClick={() => onNavigate('tours', 'all')}
              className={`hover:text-[#5191fa] transition-colors py-2 cursor-pointer ${
                currentRoute === 'tours' ? 'text-[#5191fa] font-semibold' : ''
              }`}
            >
              All Destinations
            </button>

            {/* Trekking Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setTrekkingDropdown(true)}
              onMouseLeave={() => setTrekkingDropdown(false)}
            >
              <button
                onClick={() => onNavigate('tours', 'trekking')}
                className="flex items-center gap-1 hover:text-[#5191fa] transition-colors py-2 cursor-pointer"
              >
                <span>Trekking</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {trekkingDropdown && (
                <div className="absolute top-full -left-4 w-72 bg-white rounded-xl shadow-2xl border border-slate-100 py-3 px-2 z-50">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
                    Baltoro & Karakoram Treks
                  </div>
                  <button
                    onClick={() => {
                      setTrekkingDropdown(false);
                      onNavigate('tour-detail', 'k2-base-camp-trek');
                    }}
                    className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-slate-50 hover:text-[#5191fa] font-medium text-slate-800 transition-colors flex items-center justify-between"
                  >
                    <span>K2 Base Camp Trek</span>
                    <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded font-semibold">21 Days</span>
                  </button>
                  <button
                    onClick={() => {
                      setTrekkingDropdown(false);
                      onNavigate('tour-detail', 'k2-gondogoro-la-trek');
                    }}
                    className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-slate-50 hover:text-[#5191fa] font-medium text-slate-800 transition-colors flex items-center justify-between"
                  >
                    <span>K2 Gondogoro La Trek</span>
                    <span className="text-[10px] text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded font-semibold">Extreme</span>
                  </button>
                  <button
                    onClick={() => {
                      setTrekkingDropdown(false);
                      onNavigate('tour-detail', 'nanga-parbat-rakaposhi-base-camp-trek');
                    }}
                    className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-slate-50 hover:text-[#5191fa] font-medium text-slate-800 transition-colors flex items-center justify-between"
                  >
                    <span>Nanga Parbat & Fairy Meadows</span>
                    <span className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">14 Days</span>
                  </button>
                  <div className="border-t border-slate-100 my-1 pt-1">
                    <button
                      onClick={() => {
                        setTrekkingDropdown(false);
                        onNavigate('tours', 'trekking');
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs text-[#5191fa] font-semibold hover:underline"
                    >
                      View All Trekking Packages &rarr;
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Expeditions Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setExpeditionsDropdown(true)}
              onMouseLeave={() => setExpeditionsDropdown(false)}
            >
              <button
                onClick={() => onNavigate('tours', 'expedition')}
                className="flex items-center gap-1 hover:text-[#5191fa] transition-colors py-2 cursor-pointer"
              >
                <span>Climbing Expeditions</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {expeditionsDropdown && (
                <div className="absolute top-full -left-4 w-72 bg-white rounded-xl shadow-2xl border border-slate-100 py-3 px-2 z-50">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
                    8000m & 7000m Peaks
                  </div>
                  <button
                    onClick={() => {
                      setExpeditionsDropdown(false);
                      onNavigate('tour-detail', 'k2-climbing-expedition');
                    }}
                    className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-slate-50 hover:text-[#5191fa] font-medium text-slate-800 transition-colors flex items-center justify-between"
                  >
                    <span>K2 Climbing (8,611m)</span>
                    <span className="text-[10px] text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded font-bold">King</span>
                  </button>
                  <button
                    onClick={() => {
                      setExpeditionsDropdown(false);
                      onNavigate('tour-detail', 'broad-peak-expedition');
                    }}
                    className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-slate-50 hover:text-[#5191fa] font-medium text-slate-800 transition-colors flex items-center justify-between"
                  >
                    <span>Broad Peak (8,047m)</span>
                    <span className="text-[10px] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded font-semibold">8000m</span>
                  </button>
                  <button
                    onClick={() => {
                      setExpeditionsDropdown(false);
                      onNavigate('tour-detail', 'spantik-peak-expedition');
                    }}
                    className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-slate-50 hover:text-[#5191fa] font-medium text-slate-800 transition-colors flex items-center justify-between"
                  >
                    <span>Spantik Peak (7,027m)</span>
                    <span className="text-[10px] text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded font-semibold">Golden</span>
                  </button>
                  <button
                    onClick={() => {
                      setExpeditionsDropdown(false);
                      onNavigate('tour-detail', 'khosar-gang-expedition');
                    }}
                    className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-slate-50 hover:text-[#5191fa] font-medium text-slate-800 transition-colors flex items-center justify-between"
                  >
                    <span>Khosar Gang (6,040m)</span>
                    <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded font-semibold">Beginner</span>
                  </button>
                  <div className="border-t border-slate-100 my-1 pt-1">
                    <button
                      onClick={() => {
                        setExpeditionsDropdown(false);
                        onNavigate('tours', 'expedition');
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs text-[#5191fa] font-semibold hover:underline"
                    >
                      View All Expeditions &rarr;
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => onNavigate('tours', 'cultural')}
              className={`hover:text-[#5191fa] transition-colors py-2 cursor-pointer ${
                currentRoute === 'cultural' ? 'text-[#5191fa] font-semibold' : ''
              }`}
            >
              Cultural Tours
            </button>

            <button
              onClick={() => onNavigate('about')}
              className={`hover:text-[#5191fa] transition-colors py-2 cursor-pointer ${
                currentRoute === 'about' ? 'text-[#5191fa] font-semibold' : ''
              }`}
            >
              About Us
            </button>

            <button
              onClick={() => onNavigate('contact')}
              className={`hover:text-[#5191fa] transition-colors py-2 cursor-pointer ${
                currentRoute === 'contact' ? 'text-[#5191fa] font-semibold' : ''
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Zone 3: Primary Action */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#5191fa] hover:bg-[#3d7be3] rounded-lg shadow-sm transition-all hover:shadow cursor-pointer whitespace-nowrap"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Plan Custom Trek</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 cursor-pointer focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <div className="flex flex-col space-y-2 text-sm font-medium text-slate-800">
            <button
              onClick={() => { setMobileMenuOpen(false); onNavigate('home'); }}
              className="text-left py-2 px-3 rounded-lg hover:bg-slate-50 hover:text-[#5191fa]"
            >
              Home
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onNavigate('tours', 'all'); }}
              className="text-left py-2 px-3 rounded-lg hover:bg-slate-50 hover:text-[#5191fa]"
            >
              All Destinations & Treks
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onNavigate('tours', 'trekking'); }}
              className="text-left py-2 px-3 rounded-lg hover:bg-slate-50 hover:text-[#5191fa]"
            >
              Trekking in Pakistan
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onNavigate('tours', 'expedition'); }}
              className="text-left py-2 px-3 rounded-lg hover:bg-slate-50 hover:text-[#5191fa]"
            >
              Climbing Expeditions (8000m)
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onNavigate('tours', 'cultural'); }}
              className="text-left py-2 px-3 rounded-lg hover:bg-slate-50 hover:text-[#5191fa]"
            >
              Cultural & Heritage Tours
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onNavigate('about'); }}
              className="text-left py-2 px-3 rounded-lg hover:bg-slate-50 hover:text-[#5191fa]"
            >
              About Chogori Adventure
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onNavigate('contact'); }}
              className="text-left py-2 px-3 rounded-lg hover:bg-slate-50 hover:text-[#5191fa]"
            >
              Contact Us & Office
            </button>
          </div>
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => { setMobileMenuOpen(false); onNavigate('contact'); }}
              className="w-full text-center py-2.5 px-4 text-xs font-semibold text-white bg-[#5191fa] rounded-lg shadow-sm"
            >
              Plan Custom Expedition
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
