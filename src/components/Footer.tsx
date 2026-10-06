import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { CheckCircle2, Lock, Globe } from 'lucide-react';
import { DpaLogo } from './DpaLogo';
import { SUPPORTED_LANGUAGES } from '../utils/translator';

interface FooterProps {
  onNavigate: (route: string, param?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { addNewsletterSubscriber, language, languageCode, setLanguage } = useAuth();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      addNewsletterSubscriber(email);
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bravo_footer bg-white border-t border-[#eaeef3]">
      {/* Exact Mailchimp Bar from diranpeakadventure.com */}
      <div className="mailchimp bg-[#f5f5f5] py-14 border-b border-[#eaeef3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h4 className="text-2xl font-semibold text-[#1a2b48] mb-1">
                Get Updates &amp; More
              </h4>
              <p className="text-sm text-[#5e6d77]">
                Thoughtful thoughts to your inbox
              </p>
            </div>

            <div className="w-full md:w-auto">
              {subscribed ? (
                <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-300 text-emerald-800 px-4 py-3 rounded text-sm font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Thank you for subscribing to Diran Peak Adventure!</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-2 w-full md:w-[420px]">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your Email"
                    className="w-full px-4 py-3 bg-white border border-[#dfdfdf] rounded text-sm text-[#1a2b48] focus:outline-none focus:border-[#5191fa]"
                  />
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3 bg-[#5191fa] hover:bg-[#3875dc] text-white text-sm font-semibold rounded transition-colors whitespace-nowrap cursor-pointer uppercase tracking-wider"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer 4 Columns from diranpeakadventure.com */}
      <div className="main-footer py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Brand Logo Row */}
          <div className="mb-10 pb-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <DpaLogo variant="light" />
            <p className="text-xs text-slate-500 max-w-md">
              Licensed Karakoram &amp; Himalayan mountaineering operator (SECP Registered). Specializing in K2, Gondogoro La, Diran Peak, and Spantik climbing expeditions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Col 1: Call Us */}
            <div className="nav-footer">
              <div className="contact">
                <div className="c-title text-base font-semibold text-[#1a2b48] uppercase tracking-wider mb-4 pb-2 border-b border-[#eaeef3] w-28">
                  Call Us
                </div>
                <div className="sub">
                  <a
                    className="text-sm text-[#5e6d77] hover:text-[#5191fa] transition-colors"
                    href="tel:+923456412992"
                    target="_blank"
                    rel="noreferrer"
                  >
                    +923456412992
                  </a>
                  <div className="text-xs text-slate-400 mt-1">24/7 Operations Desk</div>
                </div>
              </div>
            </div>

            {/* Col 2: Email for Us */}
            <div className="nav-footer">
              <div className="contact">
                <div className="c-title text-base font-semibold text-[#1a2b48] uppercase tracking-wider mb-4 pb-2 border-b border-[#eaeef3] w-36">
                  Email for Us
                </div>
                <div className="sub">
                  <a
                    className="text-sm text-[#5e6d77] hover:text-[#5191fa] transition-colors"
                    href="mailto:info@diranpeakadventure.com"
                  >
                    info@diranpeakadventure.com
                  </a>
                  <div className="text-xs text-slate-400 mt-1">Expedition Dispatch</div>
                </div>
              </div>
            </div>

            {/* Col 3: Information */}
            <div className="nav-footer">
              <div className="contact">
                <div className="c-title text-base font-semibold text-[#1a2b48] uppercase tracking-wider mb-4 pb-2 border-b border-[#eaeef3] w-32">
                  Information
                </div>
                <div className="sub flex flex-col space-y-2 text-sm text-[#5e6d77]">
                  <button
                    onClick={() => onNavigate('legal', 'privacy')}
                    className="text-left hover:text-[#5191fa] transition-colors cursor-pointer"
                  >
                    Privacy Policy
                  </button>
                  <button
                    onClick={() => onNavigate('legal', 'terms')}
                    className="text-left hover:text-[#5191fa] transition-colors cursor-pointer"
                  >
                    Terms and conditions
                  </button>
                  <button
                    onClick={() => onNavigate('about')}
                    className="text-left hover:text-[#5191fa] transition-colors cursor-pointer"
                  >
                    About Us
                  </button>
                  <button
                    onClick={() => onNavigate('contact')}
                    className="text-left hover:text-[#5191fa] transition-colors cursor-pointer"
                  >
                    Contact Us
                  </button>
                  <button
                    onClick={() => onNavigate('admin')}
                    className="text-left hover:text-[#5191fa] transition-colors cursor-pointer"
                  >  
                    <span><Lock className="w-3.5 h-3.5" /> Portal </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Col 4: Our Partners */}
            <div className="nav-footer">
              <div className="contact">
                <div className="c-title text-base font-semibold text-[#1a2b48] uppercase tracking-wider mb-4 pb-2 border-b border-[#eaeef3] w-36">
                  Our Partners
                </div>
                <div className="sub flex flex-col space-y-2 text-sm text-[#5e6d77]">
                  <button
                    onClick={() => onNavigate('partner')}
                    className="text-left hover:text-[#5191fa] transition-colors cursor-pointer"
                  >
                    Partners Vehicles
                  </button>
                  <button
                    onClick={() => onNavigate('partner')}
                    className="text-left hover:text-[#5191fa] transition-colors cursor-pointer"
                  >
                    Partners Hotels
                  </button>
                  <button
                    onClick={() => onNavigate('partner')}
                    className="text-left hover:text-[#5191fa] transition-colors cursor-pointer"
                  >
                    Become Partner
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Language Translator Bar */}
      <div className="bg-[#f7f9fc] border-t border-[#eaeef3] py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-600 font-semibold">
            <Globe className="w-4 h-4 text-[#5191fa]" />
            <span>Select Language / زبان کا انتخاب کریں:</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            {SUPPORTED_LANGUAGES.map((l) => (
              <button
                key={l.code}
                onClick={() => setLanguage(l.code)}
                className={`px-2.5 py-1 rounded-lg text-xs flex items-center gap-1 border transition-all cursor-pointer ${
                  (languageCode === l.code || language === l.name)
                    ? 'bg-[#5191fa] text-white border-[#5191fa] font-bold shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                <span>{l.flag}</span>
                <span className={l.dir === 'rtl' ? 'font-semibold' : ''}>{l.nativeName}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Exact Copyright Bar from diranpeakadventure.com */}
      <div className="copy-right border-t border-[#eaeef3] py-6 text-xs text-[#5e6d77]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p>Copyright © 2027 by Diran Peak Adventure</p>
          <div className="f-visa">
            <p>
              Your reports and suggestions are important to us{' '}
              <a
                title="webmaster@diranpeakadventure.com"
                href="mailto:webmaster@diranpeakadventure.com"
                className="text-[#5191fa] hover:underline"
              >
                webmaster@diranpeakadventure.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
