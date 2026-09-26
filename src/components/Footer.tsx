import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, Mountain, CheckCircle2, Shield, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (route: string, param?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#121e33] text-slate-300">
      {/* Newsletter Bar */}
      <div className="bg-[#1a2b48] border-b border-slate-700/60 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-center md:text-left">
              <div className="w-12 h-12 rounded-xl bg-[#5191fa]/20 text-[#5191fa] flex items-center justify-center shrink-0 hidden sm:flex">
                <Send className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold font-heading text-white">Get Updates &amp; Special Departure Offers</h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Direct mountaineering bulletins, weather updates &amp; early bird discounts to your inbox.
                </p>
              </div>
            </div>

            <div className="w-full md:w-auto">
              {subscribed ? (
                <div className="flex items-center gap-2 bg-emerald-900/40 border border-emerald-500/50 text-emerald-300 px-4 py-2.5 rounded-xl text-xs font-semibold">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>Thank you for subscribing to Chogori Adventure!</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-2 w-full md:w-96">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="w-full px-4 py-2.5 bg-[#0f1b2e] border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#5191fa]"
                  />
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-5 py-2.5 bg-[#5191fa] hover:bg-[#3d7be3] text-white text-xs font-bold rounded-xl shadow-md transition-all whitespace-nowrap cursor-pointer"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Brand & Call Us */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#5191fa] text-white flex items-center justify-center">
                <Mountain className="w-5 h-5" />
              </div>
              <span className="font-heading font-extrabold text-lg text-white tracking-tight">
                CHOGORI<span className="text-[#5191fa]">.</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Pakistan&apos;s leading indigenous tour and high-altitude trekking expedition company based in Skardu, Gilgit-Baltistan.
            </p>
            <div className="text-xs space-y-2">
              <div className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Call Us</div>
              <a
                href="tel:+923445925993"
                className="text-base font-bold text-white hover:text-[#5191fa] transition-colors block"
              >
                +92 344 5925993
              </a>
              <div className="text-[11px] text-slate-400">Available on WhatsApp 24/7</div>
            </div>
          </div>

          {/* Col 2: Email & Offices */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Email &amp; Headquarters</h4>
            <div className="text-xs space-y-3">
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-500 mb-0.5">Official Inquiries</div>
                <a
                  href="mailto:info@chogoriadventure.com"
                  className="text-slate-200 hover:text-white transition-colors"
                >
                  info@chogoriadventure.com
                </a>
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-500 mb-0.5">Skardu Basecamp Office</div>
                <p className="text-slate-400 text-xs">
                  Chogori House, Airport Road, Skardu, Gilgit-Baltistan, Pakistan
                </p>
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-500 mb-0.5">Islamabad Liaison Office</div>
                <p className="text-slate-400 text-xs">
                  Sector F-7/2, Blue Area, Islamabad, Pakistan
                </p>
              </div>
            </div>
          </div>

          {/* Col 3: Information & Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Information</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('legal', 'terms')}
                  className="hover:text-white transition-colors text-slate-400 cursor-pointer"
                >
                  Terms &amp; Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('legal', 'privacy')}
                  className="hover:text-white transition-colors text-slate-400 cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors text-slate-400 cursor-pointer"
                >
                  About Chogori Adventure
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors text-slate-400 cursor-pointer"
                >
                  Contact &amp; Emergency Evac
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('tours', 'all')}
                  className="hover:text-white transition-colors text-slate-400 cursor-pointer"
                >
                  Fixed Departures 2026/2027
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Our Partners */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Our Partners</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('partner')}
                  className="hover:text-white transition-colors text-slate-400 cursor-pointer"
                >
                  Partners Vehicles &amp; 4x4 Fleet
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('partner')}
                  className="hover:text-white transition-colors text-slate-400 cursor-pointer"
                >
                  Partners Hotels &amp; Resorts
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('partner')}
                  className="hover:text-white transition-colors text-slate-400 cursor-pointer"
                >
                  Become Our Partner (B2B)
                </button>
              </li>
            </ul>

            <div className="mt-5 p-3 rounded-xl bg-[#0f1b2e] border border-slate-700/80 text-[11px] text-slate-400">
              <span className="font-semibold text-white">Government License:</span> DTS Lic. #1842 Department of Tourist Services, Pakistan.
            </div>
          </div>
        </div>
      </div>

      {/* Copyright row */}
      <div className="bg-[#0b1422] border-t border-slate-800/80 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <div>
            Copyright &copy; 2026 by <span className="text-white font-medium">Chogori Adventure</span>. All rights reserved.
          </div>
          <div>
            Your reports and suggestions are important to us:{' '}
            <a
              href="mailto:webmaster@chogoriadventure.com"
              className="text-[#5191fa] hover:underline"
            >
              webmaster@chogoriadventure.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
