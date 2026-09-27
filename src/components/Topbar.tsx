import React, { useState } from 'react';
import { Phone, Mail, Globe, ChevronDown, CalendarCheck, LogOut, ShieldCheck } from 'lucide-react';
import { useAuth, Currency } from '../context/AuthContext';

interface TopbarProps {
  onNavigate: (route: string) => void;
}

export const Topbar: React.FC<TopbarProps> = ({ onNavigate }) => {
  const { user, isAuthenticated, currency, language, setCurrency, setLanguage, openLogin, openRegister, logout, bookings, contactInquiries } = useAuth();
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const pendingCount = bookings.filter(b => b.status === 'Pending Verification').length + contactInquiries.filter(c => c.status === 'New').length;

  const currencies: Currency[] = ['USD', 'EUR', 'GBP', 'PKR'];
  const languages = [
    'English', 'French', 'German', 'Italian', 'Spanish',
    'Catalan', 'Chinese', 'Czech', 'Dutch', 'Japanese',
    'Korean', 'Malay', 'Norwegian', 'Polish', 'Russian', 'Swedish', 'Thai'
  ];

  return (
    <div className="bg-[#1a2b48] text-white text-[13px] py-2.5 border-b border-[#25395c] font-normal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-y-2">
        {/* Left: Exact Socials & Phone / Email matching chogoriadventure.com */}
        <div className="flex items-center space-x-4 text-[#d1d4da]">
          <div className="flex items-center space-x-3">
            <a
              href="https://www.facebook.com/diranpeakadventure/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
              title="Facebook"
            >
              <span className="font-bold text-xs">fb</span>
            </a>
            <a
              href="https://www.instagram.com/diranpeakadventure/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
              title="Instagram"
            >
              <span className="font-bold text-xs">ig</span>
            </a>
            <a
              href="tel:+923456412992"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 hover:text-white transition-colors text-xs font-semibold"
            >
              <span>+923456412992</span>
            </a>
          </div>

          <span className="text-[#3b4b66]">|</span>

          <a
            href="mailto:info@diranpeakadventure.com"
            className="hidden sm:inline hover:text-white transition-colors text-xs text-[#d1d4da]"
          >
            info@diranpeakadventure.com
          </a>
        </div>

        {/* Right: Languages, Currency & Member Auth */}
        <div className="flex items-center space-x-4 text-[#d1d4da] text-xs">
          {/* Language selector */}
          <div className="relative">
            <button
              onClick={() => setShowLangDropdown(!showLangDropdown)}
              className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer py-0.5"
            >
              <Globe className="w-3.5 h-3.5 text-[#5191fa]" />
              <span>{language}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>
            {showLangDropdown && (
              <div className="absolute right-0 mt-1 w-36 max-h-60 overflow-y-auto bg-white text-slate-800 rounded shadow-lg border border-slate-200 py-1 z-50">
                {languages.map((l) => (
                  <button
                    key={l}
                    onClick={() => {
                      setLanguage(l);
                      setShowLangDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-1 text-xs hover:bg-slate-100 ${
                      language === l ? 'font-bold text-[#5191fa] bg-blue-50' : ''
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Currency dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
              className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer py-0.5 font-bold"
            >
              <span>{currency}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>
            {showCurrencyDropdown && (
              <div className="absolute right-0 mt-1 w-24 bg-white text-slate-800 rounded shadow-lg border border-slate-200 py-1 z-50">
                {currencies.map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      setCurrency(c);
                      setShowCurrencyDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs hover:bg-slate-100 ${
                      currency === c ? 'font-bold text-[#5191fa] bg-blue-50' : ''
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}
          </div>

          <span className="text-[#3b4b66]">|</span>

          {/* User Account / Login & Register */}
          {isAuthenticated && user ? (
            <div className="relative">
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="flex items-center gap-1.5 font-medium hover:text-white transition-colors cursor-pointer"
              >
                <div className="w-5 h-5 rounded-full bg-[#5191fa] text-white flex items-center justify-center font-bold text-[10px]">
                  {user.firstName[0]}
                </div>
                <span>Hi, {user.firstName}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>
              {showUserDropdown && (
                <div className="absolute right-0 mt-1 w-44 bg-white text-slate-800 rounded-lg shadow-xl border border-slate-100 py-1.5 z-50">
                  <button
                    onClick={() => {
                      setShowUserDropdown(false);
                      onNavigate('dashboard');
                    }}
                    className="w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-slate-50 text-slate-700"
                  >
                    <CalendarCheck className="w-3.5 h-3.5 text-[#5191fa]" />
                    My Bookings
                  </button>
                  <button
                    onClick={() => {
                      setShowUserDropdown(false);
                      logout();
                    }}
                    className="w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-rose-50 text-rose-600"
                  >
                    <LogOut className="w-3.5 h-3.5 text-rose-500" />
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <button
                onClick={openLogin}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Login
              </button>
              <span className="text-[#3b4b66]">/</span>
              <button
                onClick={openRegister}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Sign Up
              </button>
            </div>
          )}

          <span className="text-[#3b4b66]">|</span>

          {/* Admin Portal quick link */}
          <button
            onClick={() => onNavigate('admin')}
            className="flex items-center gap-1 px-2 py-0.5 rounded bg-blue-500/20 hover:bg-[#5191fa] text-sky-200 hover:text-white border border-blue-400/30 transition-all cursor-pointer font-medium text-[11px]"
            title="Open Admin Portal to see bookings and contact leads"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#5191fa]" />
            <span>Admin</span>
            {pendingCount > 0 && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
