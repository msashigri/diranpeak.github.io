import React, { useState } from 'react';

export const LegalPage: React.FC<{ initialTab?: string; onNavigate: (route: string) => void }> = ({
  initialTab = 'terms',
  onNavigate
}) => {
  const [tab, setTab] = useState<'terms' | 'privacy'>(initialTab === 'privacy' ? 'privacy' : 'terms');

  return (
    <div className="bg-[#f7f8fa] min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="text-xs text-slate-500 mb-4 flex items-center gap-1.5 font-medium">
          <button onClick={() => onNavigate('home')} className="hover:text-[#5191fa]">Home</button>
          <span>/</span>
          <span className="text-slate-800 font-semibold">
            {tab === 'terms' ? 'Terms & Conditions' : 'Privacy Policy'}
          </span>
        </div>

        {/* Tab switcher */}
        <div className="flex gap-2 mb-8 bg-slate-200/80 p-1 rounded-xl w-fit">
          <button
            onClick={() => setTab('terms')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              tab === 'terms' ? 'bg-white text-[#1a2b48] shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Terms &amp; Conditions
          </button>
          <button
            onClick={() => setTab('privacy')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              tab === 'privacy' ? 'bg-white text-[#1a2b48] shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Privacy Policy
          </button>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-200 text-xs sm:text-sm text-slate-600 leading-relaxed space-y-6">
          {tab === 'terms' ? (
            <>
              <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#1a2b48] mb-2">
                Chogori Adventure Terms &amp; Conditions
              </h1>
              <p className="text-slate-400 text-xs">Last updated: March 2026</p>

              <div>
                <h3 className="font-bold text-sm text-[#1a2b48] mb-1">1. Booking Contract &amp; Reservation</h3>
                <p>
                  A booking contract is entered into with Chogori Adventure (registered under Department of Tourist Services License #1842) upon receipt of your formal booking reservation and confirmation voucher. All bookings are subject to availability.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-sm text-[#1a2b48] mb-1">2. Payment Schedule &amp; Deposit</h3>
                <p>
                  To secure your slot on any fixed departure or private expedition, a 20% deposit is payable upon registration. The remaining balance may be cleared 30 days prior to arrival or in cash USD upon arrival in Islamabad.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-sm text-[#1a2b48] mb-1">3. Mandatory High-Altitude Insurance</h3>
                <p>
                  Every participant undertaking a trek over 3,000 meters or crossing glaciers (Baltoro, Biafo, Gondogoro) must hold a comprehensive travel insurance policy covering medical expenses, emergency helicopter evacuation (up to 6,000m), and trip interruption.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-sm text-[#1a2b48] mb-1">4. Cancellation &amp; Refund Policy</h3>
                <p>
                  - Cancellation &gt; 45 days prior to departure: 100% refund of deposit minus banking fees.<br />
                  - Cancellation 30–44 days: 50% deposit retained.<br />
                  - Cancellation &lt; 30 days: Non-refundable, but credit can be transferred to next season.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-sm text-[#1a2b48] mb-1">5. Itinerary Flexibility &amp; Force Majeure</h3>
                <p>
                  Mountain conditions, weather, roadblocks, landslides, or domestic flight delays are beyond human control. Chogori Adventure reserves the right to alter routes in the interest of team safety.
                </p>
              </div>
            </>
          ) : (
            <>
              <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#1a2b48] mb-2">
                Privacy &amp; Data Protection Policy
              </h1>
              <p className="text-slate-400 text-xs">Last updated: March 2026</p>

              <div>
                <h3 className="font-bold text-sm text-[#1a2b48] mb-1">1. Information We Collect</h3>
                <p>
                  When you register, book a tour, or submit an inquiry, we collect your name, email address, phone number, passport details (for government trekking permits and LOI visa issuance), and medical declarations relevant to high-altitude exertion.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-sm text-[#1a2b48] mb-1">2. How Your Data Is Used</h3>
                <p>
                  Your information is used solely to process your trekking permits with the Ministry of Tourism, arrange helicopter evacuation readiness, book domestic airline tickets, and deliver personalized customer service.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-sm text-[#1a2b48] mb-1">3. Data Security</h3>
                <p>
                  We never sell, rent, or lease your private information to third-party commercial marketers. All stored records are protected using modern encryption standards.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
