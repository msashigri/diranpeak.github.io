import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Car, Building2, Handshake, CheckCircle, ArrowRight } from 'lucide-react';

export const PartnerPage: React.FC<{ onNavigate: (route: string) => void; initialCategory?: string }> = ({ onNavigate, initialCategory }) => {
  const { addPartnerRequest } = useAuth();
  const [activeTab, setActiveTab] = useState<'all' | 'vehicles' | 'hotels' | 'agencies'>(
    initialCategory === 'car' || initialCategory === 'vehicles' ? 'vehicles' :
    initialCategory === 'hotel' || initialCategory === 'hotels' ? 'hotels' : 'all'
  );
  const [partnerType, setPartnerType] = useState(
    initialCategory === 'car' || initialCategory === 'vehicles' ? '4x4 Vehicles & Transport' :
    initialCategory === 'hotel' || initialCategory === 'hotels' ? 'Hotels & Resorts' : 'Hotels & Resorts'
  );

  useEffect(() => {
    if (initialCategory === 'car' || initialCategory === 'vehicles') {
      setActiveTab('vehicles');
      setPartnerType('4x4 Vehicles & Transport');
    } else if (initialCategory === 'hotel' || initialCategory === 'hotels') {
      setActiveTab('hotels');
      setPartnerType('Hotels & Resorts');
    } else if (initialCategory === 'agencies') {
      setActiveTab('agencies');
      setPartnerType('International Tour Agency / Outfitter');
    } else {
      setActiveTab('all');
      setPartnerType('Hotels & Resorts');
    }
  }, [initialCategory]);
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [details, setDetails] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await addPartnerRequest({
      category: partnerType,
      companyName,
      contactName,
      email,
      phone,
      location,
      details
    });
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="bg-[#f7f8fa] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="text-xs text-slate-500 mb-4 flex items-center gap-1.5 font-medium">
          <button onClick={() => onNavigate('home')} className="hover:text-[#5191fa]">Home</button>
          <span>/</span>
          <span className="text-slate-800 font-semibold">Partners Network</span>
        </div>

        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#5191fa] mb-1 block">
            B2B &amp; Local Collaboration
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#1a2b48]">
            Become Our Official Partner
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Join Pakistan&apos;s most reputable adventure logistics network: Hotels, 4x4 Mountain Transport, and International Outbound Travel Agencies.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <button
            onClick={() => { setActiveTab('all'); setPartnerType('Hotels & Resorts'); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-[#1a2b48] text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Overview &amp; All Partners
          </button>
          <button
            onClick={() => { setActiveTab('vehicles'); setPartnerType('4x4 Vehicles & Transport'); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'vehicles'
                ? 'bg-[#5191fa] text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Car className="w-4 h-4" />
            <span>Partner Vehicles (4x4 Fleet)</span>
          </button>
          <button
            onClick={() => { setActiveTab('hotels'); setPartnerType('Hotels & Resorts'); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'hotels'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Partner Hotels &amp; Resorts</span>
          </button>
          <button
            onClick={() => { setActiveTab('agencies'); setPartnerType('International Tour Agency / Outfitter'); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'agencies'
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Handshake className="w-4 h-4" />
            <span>B2B Agencies &amp; Outfitters</span>
          </button>
        </div>

        {/* 3 Categories Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#5191fa] flex items-center justify-center mb-4">
              <Car className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-base text-[#1a2b48] mb-2">Partners Vehicles</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              We contract inspected 4x4 Toyota Land Cruisers, Hilux jeeps, and luxury AC coaster vans operated by veteran Karakoram Highway and Askole trail drivers.
            </p>
            <ul className="text-xs text-slate-500 space-y-1">
              <li>✓ Experienced off-road mountain drivers</li>
              <li>✓ Full mechanical safety certifications</li>
              <li>✓ Guaranteed seasonal contracts</li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-base text-[#1a2b48] mb-2">Partners Hotels</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              We partner with trusted luxury and boutique hotels, heritage fort palaces, and alpine eco-resorts across Islamabad, Skardu, Gilgit, Hunza, and Fairy Meadows.
            </p>
            <ul className="text-xs text-slate-500 space-y-1">
              <li>✓ Consistent group reservations</li>
              <li>✓ Direct prompt settlement</li>
              <li>✓ Quality hygiene and hospitality standards</li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
              <Handshake className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-base text-[#1a2b48] mb-2">B2B Travel Agencies</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              International alpine clubs, tour operators, and adventure agencies partner with us as their ground-handling company in Pakistan.
            </p>
            <ul className="text-xs text-slate-500 space-y-1">
              <li>✓ Complete ground operator licensing</li>
              <li>✓ Official Visa LOI authorization</li>
              <li>✓ Competitive wholesale B2B pricing</li>
            </ul>
          </div>
        </div>

        {/* Application Form */}
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-200">
          <h3 className="font-heading text-xl font-bold text-[#1a2b48] mb-2">
            Submit Partnership Request
          </h3>
          <p className="text-xs text-slate-500 mb-6">
            Fill in your details below and our operations department in Skardu will contact you.
          </p>

          {submitted ? (
            <div className="text-center py-6">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">Application Received</h4>
              <p className="text-xs text-slate-600 mb-4">
                Thank you for applying. We will review your partnership request and connect with you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Partnership Category</label>
                <select
                  value={partnerType}
                  onChange={(e) => setPartnerType(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                >
                  <option value="hotel">Hotels &amp; Resorts</option>
                  <option value="vehicle">4x4 Vehicles &amp; Transport</option>
                  <option value="agency">International Tour Agency / Outfitter</option>
                  <option value="gear">Mountaineering Gear &amp; Equipment</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Company / Fleet / Hotel Name</label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Karakoram 4x4 Fleet"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Contact Person</label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="business@example.com"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+92 345 1234567"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Operating City / Region</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Skardu, Hunza, Gilgit, Islamabad"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Fleet, Room or Service Details</label>
                <textarea
                  rows={3}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Tell us about your fleet (e.g. 5x Land Cruisers, 2x HiAce) or hotel capacity (e.g. 24 rooms in Karimabad)."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-2.5 px-4 bg-[#5191fa] hover:bg-[#3d7be3] text-white font-bold text-xs uppercase rounded-xl transition-all cursor-pointer shadow-md disabled:opacity-50"
              >
                {submitting ? 'Submitting to Firebase...' : 'Submit Partnership Application'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
