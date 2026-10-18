import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { TOURS_DATA } from '../data/toursData';
import {
  Mail, Phone, MapPin, Send, CheckCircle2, ShieldCheck, Clock,
  MessageSquare, AlertCircle, Compass, Radio, ArrowRight
} from 'lucide-react';

interface ContactPageProps {
  onNavigate: (route: string, param?: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const { addContactInquiry, user } = useAuth();

  const [name, setName] = useState(user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() : '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [subject, setSubject] = useState('Expedition Inquiry');
  const [selectedTourId, setSelectedTourId] = useState('');
  const [message, setMessage] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Please provide your full name.');
      return;
    }
    if (!email.trim()) {
      setError('Please provide your email address.');
      return;
    }
    if (!message.trim()) {
      setError('Please type your inquiry or message.');
      return;
    }

    setSubmitting(true);
    try {
      const selectedTour = TOURS_DATA.find(t => t.id === selectedTourId);

      addContactInquiry({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        subject,
        message: message.trim(),
        tourId: selectedTourId || undefined,
        tourTitle: selectedTour ? selectedTour.title : undefined,
        isGuest: !user
      });

      setSubmitted(true);
      setMessage('');
    } catch (err: any) {
      setError(err.message || 'Failed to send your message. Please try again or message via WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#f7f8fa] min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="text-xs text-slate-500 mb-4 flex items-center gap-1.5 font-medium">
          <button onClick={() => onNavigate('home')} className="hover:text-[#5191fa] cursor-pointer">Home</button>
          <span>/</span>
          <span className="text-slate-800 font-semibold">Contact Our Basecamp Team</span>
        </div>

        {/* Hero Header */}
        <div className="bg-gradient-to-br from-[#1a2b48] via-[#203657] to-[#1a2b48] text-white rounded-3xl p-8 sm:p-12 shadow-xl mb-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#5191fa]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>DTS Licensed Tour Operator #1842</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white leading-tight">
              Get in Touch with Our Expedition Specialists
            </h1>
            <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
              Have questions regarding K2 Base Camp departures, climbing permits, Pakistan visa Letters of Invitation (LOI), or custom Karakoram itineraries? Our Baltistan basecamp team is available 24/7.
            </p>
          </div>
        </div>

        {/* Main Grid: Form + Office Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
            <div className="mb-6">
              <h2 className="text-xl font-heading font-bold text-[#1a2b48] flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#5191fa]" />
                <span>Send Us an Expedition Inquiry</span>
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Your message is recorded directly in our real-time Firestore database and dispatched to our expedition director.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 text-center bg-emerald-50 border border-emerald-200 rounded-2xl animate-in fade-in">
                <div className="w-14 h-14 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-heading font-bold text-emerald-950 mb-1">
                  Inquiry Dispatched Successfully!
                </h3>
                <p className="text-xs text-emerald-800 max-w-md mx-auto leading-relaxed mb-5">
                  Thank you, <strong>{name}</strong>. A dedicated Balti expedition manager will review your request and get back to you within 4-8 hours with full route notes and permit guidance.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    Send Another Inquiry
                  </button>
                  <a
                    href="https://wa.me/923456412992"
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold rounded-xl transition-colors inline-flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#5191fa]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="climber@domain.com"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#5191fa]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp / Phone Number</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+92 345 6412992"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#5191fa]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Inquiry Topic</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#5191fa]"
                    >
                      <option value="Expedition Inquiry">Expedition &amp; Trek Inquiry</option>
                      <option value="Visa Support & LOI">Pakistan Visa LOI &amp; Documents</option>
                      <option value="Custom Group Itinerary">Custom Private Expedition</option>
                      <option value="Climbing Permit Assistance">8000m Peak Climbing Permit</option>
                      <option value="Partner & B2B">B2B Tour Operator Partnership</option>
                      <option value="General Question">General Assistance</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Related Tour Package (Optional)</label>
                  <select
                    value={selectedTourId}
                    onChange={(e) => setSelectedTourId(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#5191fa]"
                  >
                    <option value="">-- General Karakoram &amp; Himalayan Inquiry --</option>
                    {TOURS_DATA.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.title} ({t.duration} · {t.location})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Detailed Message / Requirements *</label>
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your mountaineering experience, preferred travel dates, group size, or any specific logistics needed..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#5191fa] resize-y"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 bg-[#5191fa] hover:bg-[#3d7be3] text-white text-xs font-bold rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Dispatch Inquiry to Expedition HQ</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Basecamp & Liaison Offices */}
          <div className="lg:col-span-5 space-y-6">
            {/* Headquarters Card */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
              <div className="flex items-center gap-2.5 mb-4 text-[#1a2b48]">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#5191fa] flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-base text-slate-900">Skardu Expedition Basecamp</h3>
                  <p className="text-[11px] text-slate-500">Gateway to Baltoro &amp; K2</p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-600">
                <p>
                  <strong>Address:</strong> Aliabad / College Road, Skardu, Gilgit-Baltistan, Pakistan
                </p>
                <p>
                  <strong>Phone / WhatsApp:</strong>{' '}
                  <a href="tel:+923456412992" className="text-[#5191fa] font-bold hover:underline">
                    +92 345 6412992
                  </a>
                </p>
                <p>
                  <strong>Email:</strong>{' '}
                  <a href="mailto:info@diranpeakadventure.com" className="text-[#5191fa] font-bold hover:underline">
                    info@diranpeakadventure.com
                  </a>
                </p>
                <p>
                  <strong>Hours:</strong> Mon - Sun: 7:00 AM - 10:00 PM PKT (During Trekking Season)
                </p>
              </div>
            </div>

            {/* Islamabad Liaison Office */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
              <div className="flex items-center gap-2.5 mb-4 text-[#1a2b48]">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-base text-slate-900">Islamabad Liaison Office</h3>
                  <p className="text-[11px] text-slate-500">Ministry of Tourism Clearance &amp; Briefings</p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-600">
                <p>
                  <strong>Location:</strong> Blue Area, Sector F-6/G-6, Islamabad, Pakistan
                </p>
                <p>
                  <strong>Services:</strong> Alpine Club of Pakistan Permit Processing, Visa Letters of Invitation (LOI), Helicopter Rescue Bond Clearance
                </p>
              </div>
            </div>

            {/* Satellite & Emergency Logistics */}
            <div className="bg-gradient-to-br from-slate-900 to-[#1a2b48] text-white rounded-3xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
                <h4 className="font-heading font-bold text-sm text-white">24/7 Satellite Mountain Dispatch</h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                All high-altitude DPA expeditions carry Garmin inReach Explorer+ 2-way satellite messengers and Thuraya satellite phones with Askari Aviation military helicopter rescue coverage.
              </p>
              <a
                href="https://wa.me/923456412992?text=Salam%20DPA%20Team%20Emergency%20Helpline"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Instant WhatsApp Hotline</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
