import React, { useState } from 'react';
import { Phone, Mail, Globe, ChevronDown, CalendarCheck, LogOut, ShieldCheck, Check } from 'lucide-react';
import { useAuth, Currency } from '../context/AuthContext';
import { SUPPORTED_LANGUAGES, getLanguageByCodeOrName } from '../utils/translator';
import { PWAInstallButton } from './PWAInstallButton';

interface TopbarProps {
  onNavigate: (route: string) => void;
}

export const Topbar: React.FC<TopbarProps> = ({ onNavigate }) => {
  const { user, isAuthenticated, adminAuth, currency, language, languageCode, setCurrency, setLanguage, openLogin, openRegister, logout, bookings, contactInquiries } = useAuth();
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const pendingCount = bookings.filter(b => b.status === 'Pending Verification').length + contactInquiries.filter(c => c.status === 'New').length;

  const currencies: Currency[] = ['USD', 'EUR', 'GBP', 'PKR'];
  const currentLang = getLanguageByCodeOrName(language || languageCode || 'English');

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

        {/* Right: PWA Install, Languages, Currency & Member Auth */}
        <div className="flex items-center space-x-3 text-[#d1d4da] text-xs">
          {/* PWA App Install Button */}
          <PWAInstallButton variant="header" />

          {/* Full Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowLangDropdown(!showLangDropdown)}
              className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer py-0.5 bg-white/5 hover:bg-white/10 px-2 rounded border border-white/10"
              title="Select language to translate whole website"
            >
              <Globe className="w-3.5 h-3.5 text-[#5191fa]" />
              <span className="font-medium flex items-center gap-1">
                <span>{currentLang.flag}</span>
                <span>{currentLang.nativeName}</span>
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>
            {showLangDropdown && (
              <div className="absolute right-0 mt-1 w-48 max-h-72 overflow-y-auto bg-white text-slate-800 rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 divide-y divide-slate-100">
                <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Select Language / زبان منتخب کریں
                </div>
                <div className="py-1">
                  {SUPPORTED_LANGUAGES.map((l) => {
                    const isSelected = currentLang.code === l.code;
                    return (
                      <button
                        key={l.code}
                        onClick={() => {
                          setLanguage(l.code);
                          setShowLangDropdown(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 text-xs hover:bg-blue-50/80 flex items-center justify-between transition-colors cursor-pointer ${
                          isSelected ? 'font-bold text-[#5191fa] bg-blue-50' : 'text-slate-700'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-sm">{l.flag}</span>
                          <span className={l.dir === 'rtl' ? 'font-semibold' : ''}>{l.nativeName}</span>
                          {l.nativeName !== l.name && (
                            <span className="text-[10px] text-slate-400 font-normal">({l.name})</span>
                          )}
                        </span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#5191fa]" />}
                      </button>
                    );
                  })}
                </div>
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

          {/* Admin Portal quick link 
          {adminAuth?.isAuthenticated ? (
            <button
              onClick={() => onNavigate('admin')}
              className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-emerald-500/20 hover:bg-emerald-600 text-emerald-200 hover:text-white border border-emerald-400/40 transition-all cursor-pointer font-medium text-[11px]"
              title="Admin Session Active - Click to open Dashboard"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              <span>Admin ({adminAuth.adminId})</span>
            </button>
          ) : (
            <button
              onClick={() => onNavigate('admin')}
              className="flex items-center gap-1 px-2 py-0.5 rounded bg-blue-500/20 hover:bg-[#5191fa] text-sky-200 hover:text-white border border-blue-400/30 transition-all cursor-pointer font-medium text-[11px]"
              title="Open Admin Portal Login"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#5191fa]" />
              <span>Admin Login</span>
              {pendingCount > 0 && (
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              )}
            </button>
          )} */}
        </div>
      </div>
    </div>
  );
};
