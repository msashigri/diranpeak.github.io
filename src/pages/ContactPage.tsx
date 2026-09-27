import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Phone, Mail, MapPin, Send, CheckCircle2, ShieldAlert, ArrowRight } from 'lucide-react';

export const ContactPage: React.FC<{ onNavigate: (route: string) => void }> = ({ onNavigate }) => {
  const { addContactInquiry, adminSettings } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('K2 Base Camp Trek Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const cleanAdminPhone = adminSettings.notificationPhone.replace(/[^0-9]/g, '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Save to context/local storage and trigger notification
    addContactInquiry({
      name,
      email,
      phone,
      subject,
      message
    });

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 500);
  };

  const whatsappMessage = encodeURIComponent(
    `*NEW INQUIRY VIA WEBSITE - DIRAN PEAK ADVENTURE (DPA)*\n\n` +
    `*From:* ${name}\n` +
    `*Email:* ${email}\n` +
    `*Phone:* ${phone}\n` +
    `*Interest:* ${subject}\n\n` +
    `*Message:* ${message}`
  );

  return (
    <div className="bg-[#f7f8fa] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="text-xs text-slate-500 mb-4 flex items-center gap-1.5 font-medium">
          <button onClick={() => onNavigate('home')} className="hover:text-[#5191fa]">Home</button>
          <span>/</span>
          <span className="text-slate-800 font-semibold">Contact Us</span>
        </div>

        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#5191fa] mb-1 block">
            We Are Here To Help
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#1a2b48]">
            Get In Touch With Diran Peak Adventure
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Have questions about permits, fitness preparation, visa LOI, or custom private dates? Reach our expedition coordinators directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Form Column */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200">
            {submitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold font-heading text-slate-900">Message Received!</h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-slate-900">{name}</strong>. Your inquiry has been stored in the <strong>Admin Portal</strong> and emailed to <strong className="text-slate-900">{adminSettings.notificationEmail}</strong>.
                </p>

                {/* Instant WhatsApp Dispatch */}
                <div className="pt-2 max-w-md mx-auto space-y-3">
                  <a
                    href={`https://wa.me/${cleanAdminPhone}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Send Directly to WhatsApp (+92 345 6412992)</span>
                  </a>

                  <button
                    onClick={() => onNavigate('admin')}
                    className="w-full py-2.5 px-4 bg-[#1a2b48] hover:bg-[#2c436b] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>View this submission in Admin Portal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setMessage('');
                    }}
                    className="text-xs text-[#5191fa] hover:underline font-semibold cursor-pointer"
                  >
                    Submit another inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#5191fa] focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. john@example.com"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#5191fa] focus:bg-white"
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
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#5191fa] focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Trip of Interest</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#5191fa] focus:bg-white cursor-pointer"
                    >
                      <option value="K2 Base Camp Trek Inquiry">K2 Base Camp Trek</option>
                      <option value="K2 Gondogoro La Trek Inquiry">K2 Gondogoro La Trek</option>
                      <option value="K2 Climbing Expedition (8611m)">K2 Climbing Expedition (8,611m)</option>
                      <option value="Broad Peak Expedition">Broad Peak Expedition (8,047m)</option>
                      <option value="Spantik Peak Expedition">Spantik Peak (7,027m)</option>
                      <option value="Khosar Gang Peak">Khosar Gang (6,040m)</option>
                      <option value="Nanga Parbat & Fairy Meadows">Nanga Parbat &amp; Fairy Meadows</option>
                      <option value="Custom Private Expedition">Custom Private Group / B2B</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Message &amp; Requirements</label>
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your mountaineering background, preferred dates, group size, and any specific requirements..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#5191fa] focus:bg-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="py-3 px-6 bg-[#5191fa] hover:bg-[#3d7be3] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {submitting ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  <span>{submitting ? 'Routing Message...' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Contact Details Card */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
              <h3 className="font-heading text-lg font-bold text-[#1a2b48] mb-4">Direct Contact</h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#5191fa] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Phone &amp; WhatsApp</div>
                    <a href="tel:+923456412992" className="text-slate-600 hover:text-[#5191fa] font-medium block">
                      +92 345 6412992
                    </a>
                    <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">● 24/7 Dispatch Live</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#5191fa] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Official Inquiries</div>
                    <a href="mailto:info@diranpeakadventure.com" className="text-slate-600 hover:text-[#5191fa] block">
                      info@diranpeakadventure.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#5191fa] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Skardu Basecamp Office</div>
                    <p className="text-slate-500 leading-relaxed">
                      Diran Peak House, Airport Road, Skardu, Gilgit-Baltistan, Pakistan
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#5191fa] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Islamabad Liaison Office</div>
                    <p className="text-slate-500 leading-relaxed">
                      Sector F-7/2, Blue Area, Islamabad, Pakistan
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Hotline card */}
            <div className="bg-[#1a2b48] text-white rounded-3xl p-6 shadow-md border border-slate-700">
              <div className="flex items-center gap-2 mb-2 text-rose-400">
                <ShieldAlert className="w-5 h-5" />
                <h4 className="font-bold text-sm text-white">Emergency Heli Evacuation</h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Askari Aviation helicopter coordination line for all registered expedition groups in the Karakoram:
              </p>
              <div className="mt-3 font-mono font-bold text-sm text-[#5191fa]">
                +92 345 6412992
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
