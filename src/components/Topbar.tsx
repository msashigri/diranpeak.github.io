import React, { useState } from 'react';
import { Phone, Mail, Globe, ChevronDown, CalendarCheck, LogOut, ShieldCheck, Check, Heart, Facebook, Instagram, Edit3 } from 'lucide-react';
import { useAuth, Currency } from '../context/AuthContext';
import { SUPPORTED_LANGUAGES, getLanguageByCodeOrName } from '../utils/translator';
import { PWAInstallButton } from './PWAInstallButton';

interface TopbarProps {
  onNavigate: (route: string, param?: string) => void;
}

export const Topbar: React.FC<TopbarProps> = ({ onNavigate }) => {
  const { user, isAuthenticated, isAdmin, adminAuth, adminLogout, currency, language, languageCode, setCurrency, setLanguage, openLogin, openRegister, logout, bookings, contactInquiries, favorites } = useAuth();
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const pendingCount = bookings.filter(b => b.status === 'Pending Verification').length + contactInquiries.filter(c => c.status === 'New').length;

  const currencies: Currency[] = ['USD', 'EUR', 'GBP', 'PKR'];
  const currentLang = getLanguageByCodeOrName(language || languageCode || 'English');

  return (
    <div className="bg-[#1a2b48] text-white text-[13px] py-2.5 border-b border-[#25395c] font-normal relative z-[1010]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-y-2">
        {/* Left: Social Media Icons (Facebook, Instagram, X) & Contact Info */}
        <div className="flex items-center space-x-3 sm:space-x-4 text-[#d1d4da]">
          <div className="flex items-center space-x-2">
            {/* Facebook */}
            <a
              href="https://www.facebook.com/diranpeakadventure/"
              target="_blank"
              rel="noreferrer"
              className="w-6 h-6 rounded-full bg-white/10 hover:bg-[#1877f2] hover:text-white flex items-center justify-center transition-all text-[#d1d4da]"
              title="Facebook"
              aria-label="Facebook"
            >
              <Facebook className="w-3.5 h-3.5" />
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/diranpeakadventure/"
              target="_blank"
              rel="noreferrer"
              className="w-6 h-6 rounded-full bg-white/10 hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:text-white flex items-center justify-center transition-all text-[#d1d4da]"
              title="Instagram"
              aria-label="Instagram"
            >
              <Instagram className="w-3.5 h-3.5" />
            </a>

            {/* X (formerly Twitter) */}
            <a
              href="https://x.com/diranpeakadv"
              target="_blank"
              rel="noreferrer"
              className="w-6 h-6 rounded-full bg-white/10 hover:bg-black hover:text-white flex items-center justify-center transition-all text-[#d1d4da]"
              title="X (formerly Twitter)"
              aria-label="X"
            >
              <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            <span className="text-[#3b4b66] mx-1">|</span>

            {/* Phone */}
            <a
              href="tel:+923456412992"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 hover:text-white transition-colors text-xs font-semibold"
            >
              <Phone className="w-3 h-3 text-[#5191fa]" />
              <span>+923456412992</span>
            </a>
          </div>

          <span className="text-[#3b4b66]">|</span>

          {/* Email */}
          <a
            href="mailto:info@diranpeakadventure.com"
            className="hidden sm:inline-flex items-center gap-1 hover:text-white transition-colors text-xs text-[#d1d4da]"
          >
            <Mail className="w-3 h-3 text-[#5191fa]" />
            <span>info@diranpeakadventure.com</span>
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
          {(isAuthenticated && user) || adminAuth?.isAuthenticated ? (
            <div className="relative flex items-center gap-2">
              {isAdmin && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500 text-slate-950 flex items-center gap-1 shadow-xs">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Admin</span>
                </span>
              )}
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="flex items-center gap-1.5 font-medium hover:text-white transition-colors cursor-pointer"
              >
                <div className="w-5 h-5 rounded-full bg-[#5191fa] text-white flex items-center justify-center font-bold text-[10px]">
                  {((user?.firstName || user?.email || adminAuth?.adminName || 'A'))[0].toUpperCase()}
                </div>
                <span>Hi, {user?.firstName || adminAuth?.adminName || 'Admin'}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>
              {showUserDropdown && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-white text-slate-800 rounded-lg shadow-xl border border-slate-100 py-1.5 z-[1100]">
                  {user && (
                    <button
                      onClick={() => {
                        setShowUserDropdown(false);
                        onNavigate('dashboard', 'profile');
                      }}
                      className="w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-slate-50 text-[#5191fa] font-semibold cursor-pointer border-b border-slate-100"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-[#5191fa]" />
                      <span>Edit Profile</span>
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setShowUserDropdown(false);
                      onNavigate('dashboard');
                    }}
                    className="w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-slate-50 text-slate-700 cursor-pointer"
                  >
                    <CalendarCheck className="w-3.5 h-3.5 text-[#5191fa]" />
                    <span>{isAdmin ? 'Admin Dashboard' : 'My Bookings'}</span>
                  </button>
                  {!isAdmin && (
                    <button
                      onClick={() => {
                        setShowUserDropdown(false);
                        onNavigate('dashboard');
                      }}
                      className="w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-slate-50 text-slate-700 cursor-pointer"
                    >
                      <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                      <span>Saved Favorites ({favorites.length})</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={async () => {
                      setShowUserDropdown(false);
                      await logout();
                      adminLogout();
                      onNavigate('home');
                    }}
                    className="w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-rose-50 text-rose-600 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5 text-rose-500" />
                    <span>Log Out</span>
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
        </div>
      </div>
    </div>
  );
};
