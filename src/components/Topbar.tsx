import React, { useState } from 'react';
import { Phone, Mail, Globe, DollarSign, User as UserIcon, LogOut, CalendarCheck, ChevronDown } from 'lucide-react';
import { useAuth, Currency } from '../context/AuthContext';

interface TopbarProps {
  onNavigate: (route: string) => void;
}

export const Topbar: React.FC<TopbarProps> = ({ onNavigate }) => {
  const { user, isAuthenticated, currency, language, setCurrency, setLanguage, openLogin, openRegister, logout } = useAuth();
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const currencies: Currency[] = ['USD', 'EUR', 'GBP', 'PKR'];
  const languages = ['English', 'Deutsch', 'Français', 'Italiano', 'Español'];

  return (
    <div className="bg-[#1a2b48] text-[#eaeeef] text-xs py-2 border-b border-[#2c3f5f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-y-2">
        {/* Left: Contact Info */}
        <div className="flex items-center space-x-6 text-slate-300">
          <a
            href="tel:+923445925993"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#5191fa]" />
            <span className="font-medium tracking-wide">+923445925993</span>
          </a>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <a
            href="mailto:info@chogoriadventure.com"
            className="hidden sm:flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-[#5191fa]" />
            <span>info@chogoriadventure.com</span>
          </a>
        </div>

        {/* Right: Currency, Language & Auth */}
        <div className="flex items-center space-x-4">
          {/* Currency dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
              className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer py-0.5 px-1.5 rounded"
            >
              <DollarSign className="w-3 h-3 text-[#5191fa]" />
              <span className="font-semibold">{currency}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>
            {showCurrencyDropdown && (
              <div className="absolute right-0 mt-1 w-24 bg-white text-slate-800 rounded-md shadow-lg border border-slate-200 py-1 z-50">
                {currencies.map(c => (
                  <button
                    key={c}
                    onClick={() => {
                      setCurrency(c);
                      setShowCurrencyDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs hover:bg-slate-50 transition-colors ${
                      currency === c ? 'font-bold text-[#5191fa] bg-blue-50/50' : ''
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Language dropdown */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setShowLangDropdown(!showLangDropdown)}
              className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer py-0.5 px-1.5 rounded"
            >
              <Globe className="w-3 h-3 text-[#5191fa]" />
              <span>{language}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>
            {showLangDropdown && (
              <div className="absolute right-0 mt-1 w-28 bg-white text-slate-800 rounded-md shadow-lg border border-slate-200 py-1 z-50">
                {languages.map(l => (
                  <button
                    key={l}
                    onClick={() => {
                      setLanguage(l);
                      setShowLangDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs hover:bg-slate-50 transition-colors ${
                      language === l ? 'font-bold text-[#5191fa] bg-blue-50/50' : ''
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            )}
          </div>

          <span className="text-slate-600">|</span>

          {/* User Account / Login & Register */}
          {isAuthenticated && user ? (
            <div className="relative">
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="flex items-center gap-1.5 font-medium text-white hover:text-[#5191fa] transition-colors cursor-pointer py-0.5"
              >
                <div className="w-5 h-5 rounded-full bg-[#5191fa] text-white flex items-center justify-center font-bold text-[10px]">
                  {user.firstName[0]}
                </div>
                <span>Hi, {user.firstName}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>
              {showUserDropdown && (
                <div className="absolute right-0 mt-1.5 w-44 bg-white text-slate-800 rounded-lg shadow-xl border border-slate-100 py-1.5 z-50">
                  <div className="px-3 py-2 border-b border-slate-100">
                    <p className="font-semibold text-slate-900 text-xs truncate">{user.firstName} {user.lastName}</p>
                    <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      setShowUserDropdown(false);
                      onNavigate('dashboard');
                    }}
                    className="w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-slate-50 text-slate-700 transition-colors"
                  >
                    <CalendarCheck className="w-3.5 h-3.5 text-[#5191fa]" />
                    My Bookings
                  </button>
                  <button
                    onClick={() => {
                      setShowUserDropdown(false);
                      logout();
                    }}
                    className="w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-rose-50 text-rose-600 transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5 text-rose-500" />
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <button
                onClick={openLogin}
                className="flex items-center gap-1 text-slate-200 hover:text-white transition-colors cursor-pointer"
              >
                <UserIcon className="w-3.5 h-3.5 text-[#5191fa]" />
                <span className="font-medium">Log In</span>
              </button>
              <span className="text-slate-600">/</span>
              <button
                onClick={openRegister}
                className="text-slate-200 hover:text-[#5191fa] transition-colors cursor-pointer font-medium"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
