import React, { useState, useEffect } from 'react';
import { useAuth, Booking, ContactInquiry } from '../context/AuthContext';
import { DpaLogo } from '../components/DpaLogo';
import {
  ShieldCheck, CalendarCheck, MessageSquare, Handshake, Mail, Download,
  Search, Phone, Send, Trash2, CheckCircle2, Clock, AlertCircle, Settings,
  ArrowRight, ExternalLink, RefreshCw, UserCheck, Lock, LogOut, Eye, EyeOff,
  KeyRound, Shield, AlertTriangle
} from 'lucide-react';

export const AdminDashboardPage: React.FC<{ onNavigate: (route: string, param?: string) => void }> = ({ onNavigate }) => {
  const {
    bookings,
    contactInquiries,
    partnerRequests,
    newsletterSubscribers,
    adminSettings,
    adminAuth,
    adminCredentials,
    adminLogin,
    adminLogout,
    updateAdminCredentials,
    updateBookingStatus,
    deleteBooking,
    updateContactStatus,
    deleteContactInquiry,
    updateAdminSettings,
    formatPrice,
    exportBookingsToCsv,
    exportContactsToCsv
  } = useAuth();

  // Admin login states
  const [loginIdInput, setLoginIdInput] = useState('admin');
  const [loginPassInput, setLoginPassInput] = useState('');
  const [showLoginPass, setShowLoginPass] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Settings tab states
  const [activeTab, setActiveTab] = useState<'bookings' | 'contacts' | 'partners' | 'subscribers' | 'settings'>('bookings');
  const [bookingSearch, setBookingSearch] = useState('');
  const [bookingStatusFilter, setBookingStatusFilter] = useState('all');
  const [contactSearch, setContactSearch] = useState('');

  // Routing settings form state
  const [notifyEmail, setNotifyEmail] = useState(adminSettings.notificationEmail);
  const [notifyPhone, setNotifyPhone] = useState(adminSettings.notificationPhone);
  const [webhookUrl, setWebhookUrl] = useState(adminSettings.webhookUrl || '');
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Admin credentials management state
  const [credLoginId, setCredLoginId] = useState(adminCredentials.loginId);
  const [credEmail, setCredEmail] = useState(adminCredentials.email);
  const [credPassword, setCredPassword] = useState(adminCredentials.password);
  const [showCredPassword, setShowCredPassword] = useState(false);
  const [credSaved, setCredSaved] = useState(false);
  const [credError, setCredError] = useState('');

  // Sync state if credentials change
  useEffect(() => {
    setCredLoginId(adminCredentials.loginId);
    setCredEmail(adminCredentials.email);
    setCredPassword(adminCredentials.password);
  }, [adminCredentials]);

  // Calculations
  const totalRevenue = bookings.reduce((sum, b) => sum + b.totalPrice, 0);
  const pendingBookings = bookings.filter(b => b.status === 'Pending Verification').length;
  const newInquiries = contactInquiries.filter(c => c.status === 'New').length;

  const handleAdminLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);
    const res = await adminLogin(loginIdInput, loginPassInput);
    setLoginLoading(false);
    if (!res.success) {
      setLoginError(res.error || 'Failed to authenticate administrator.');
    }
  };

  const handleQuickAdminLogin = async () => {
    setLoginIdInput(adminCredentials.loginId);
    setLoginPassInput(adminCredentials.password);
    setLoginError('');
    setLoginLoading(true);
    const res = await adminLogin(adminCredentials.loginId, adminCredentials.password);
    setLoginLoading(false);
    if (!res.success) {
      setLoginError(res.error || 'Failed to authenticate administrator.');
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateAdminSettings({
      notificationEmail: notifyEmail,
      notificationPhone: notifyPhone,
      webhookUrl: webhookUrl.trim()
    });
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  const handleSaveCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    setCredError('');
    const result = updateAdminCredentials({
      loginId: credLoginId,
      email: credEmail,
      password: credPassword
    });

    if (!result.success) {
      setCredError(result.error || 'Could not update credentials.');
      return;
    }

    setCredSaved(true);
    setTimeout(() => setCredSaved(false), 3500);
  };

  const getCleanPhone = (phone: string) => {
    return phone.replace(/[^0-9]/g, '');
  };

  // ================= ADMIN LOGIN SCREEN (When not signed in) =================
  if (!adminAuth || !adminAuth.isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0f1d33] via-[#15233c] to-[#1a2b48] py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
        <div className="w-full max-w-md">
          {/* Logo & Portal Header */}
          <div className="text-center mb-8">
            <div className="inline-block p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 shadow-xl mb-4">
              <DpaLogo variant="dark" />
            </div>
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-sky-300 text-xs font-semibold mb-3">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Restricted Expedition Management Portal</span>
            </div>

            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Admin Portal Sign-In
            </h1>
            <p className="text-xs text-slate-300 mt-2 max-w-sm mx-auto">
              Please enter your authorized <strong>Admin Login ID</strong> or registered email address to manage bookings, inquiries, and itineraries.
            </p>
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-3xl p-7 sm:p-9 shadow-2xl border border-slate-100 relative">
            {loginError && (
              <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span className="font-medium">{loginError}</span>
              </div>
            )}

            <form onSubmit={handleAdminLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center justify-between">
                  <span>Admin Login ID / Email</span>
                  <span className="text-[11px] text-[#5191fa] font-normal">Primary Access ID</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={loginIdInput}
                    onChange={(e) => setLoginIdInput(e.target.value)}
                    placeholder="e.g. admin or admin@diranpeakadventure.com"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#5191fa] focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center justify-between">
                  <span>Admin Password</span>
                  <button
                    type="button"
                    onClick={() => setShowLoginPass(!showLoginPass)}
                    className="text-[11px] text-[#5191fa] hover:underline cursor-pointer flex items-center gap-1"
                  >
                    {showLoginPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>{showLoginPass ? 'Hide' : 'Show'}</span>
                  </button>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showLoginPass ? 'text' : 'password'}
                    required
                    value={loginPassInput}
                    onChange={(e) => setLoginPassInput(e.target.value)}
                    placeholder="Enter admin password"
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#5191fa] focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full mt-2 py-3 px-4 bg-[#5191fa] hover:bg-[#3d7be3] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                {loginLoading ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <ShieldCheck className="w-4 h-4" />
                )}
                <span>{loginLoading ? 'Authenticating...' : 'Sign In to Admin Portal'}</span>
              </button>
            </form>

            {/* Quick Auto-Fill / Active Credentials Box */}
            <div className="mt-6 pt-5 border-t border-slate-100">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <KeyRound className="w-3.5 h-3.5 text-[#5191fa]" />
                    <span>Administrator Credentials:</span>
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold">Active</span>
                </div>
                <div className="space-y-1 font-mono text-[11px] text-slate-600 bg-white p-2.5 rounded-lg border border-slate-200 mb-2.5">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Login ID:</span>
                    <strong className="text-[#1a2b48]">{adminCredentials.loginId}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Password:</span>
                    <strong className="text-[#1a2b48]">{adminCredentials.password}</strong>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleQuickAdminLogin}
                  disabled={loginLoading}
                  className="w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>1-Click Auto-Fill &amp; Sign In</span>
                </button>
              </div>
            </div>

            {/* Return link */}
            <div className="mt-5 text-center">
              <button
                type="button"
                onClick={() => onNavigate('home')}
                className="text-xs text-slate-500 hover:text-[#5191fa] transition-colors cursor-pointer"
              >
                &larr; Return to Public Website
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ================= AUTHENTICATED ADMIN DASHBOARD =================
  const filteredBookings = bookings.filter(b => {
    if (bookingStatusFilter !== 'all' && b.status !== bookingStatusFilter) return false;
    if (bookingSearch.trim()) {
      const q = bookingSearch.toLowerCase();
      return (
        b.customerName.toLowerCase().includes(q) ||
        b.customerEmail.toLowerCase().includes(q) ||
        b.bookingCode.toLowerCase().includes(q) ||
        b.tourTitle.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const filteredContacts = contactInquiries.filter(c => {
    if (contactSearch.trim()) {
      const q = contactSearch.toLowerCase();
      return (
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.subject.toLowerCase().includes(q) ||
        c.message.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="bg-[#f7f8fa] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="text-xs text-slate-500 mb-1 flex items-center gap-1.5 font-medium">
              <button onClick={() => onNavigate('home')} className="hover:text-[#5191fa]">Home</button>
              <span>/</span>
              <span className="text-slate-800 font-semibold">Admin Submissions Portal</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#1a2b48] text-[#5191fa] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h1 className="font-heading text-2xl sm:text-3xl font-black text-[#1a2b48]">
                Owner Dashboard &amp; Lead Management
              </h1>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Live database of all tour bookings, customer inquiries, and partner applications.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-xl shadow-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <div className="text-left text-xs">
                <span className="text-slate-400 block text-[10px] leading-tight font-medium">Logged in Admin</span>
                <span className="font-bold text-slate-800">{adminCredentials.loginId}</span>
              </div>
              <span className="ml-1 px-1.5 py-0.5 rounded bg-blue-100 text-[#5191fa] text-[10px] font-bold uppercase">
                {adminAuth.role}
              </span>
            </div>

            <button
              onClick={() => onNavigate('home')}
              className="px-3.5 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer bg-white"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">View Site</span>
            </button>

            <button
              onClick={() => adminLogout()}
              className="px-3.5 py-2 bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              title="Sign out of Admin Session"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* 4 Overview Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#5191fa] flex items-center justify-center shrink-0">
              <CalendarCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase">Total Bookings</div>
              <div className="text-xl font-black text-[#1a2b48]">{bookings.length}</div>
              <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">
                Value: {formatPrice(totalRevenue)}
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase">Pending Review</div>
              <div className="text-xl font-black text-[#1a2b48]">{pendingBookings}</div>
              <div className="text-[10px] text-slate-500 font-medium mt-0.5">
                Awaiting voucher confirmation
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase">Contact Inquiries</div>
              <div className="text-xl font-black text-[#1a2b48]">{contactInquiries.length}</div>
              <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">
                {newInquiries} unread new leads
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <Handshake className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase">Partner Requests</div>
              <div className="text-xl font-black text-[#1a2b48]">{partnerRequests.length}</div>
              <div className="text-[10px] text-slate-500 font-medium mt-0.5">
                Hotels &amp; 4x4 Fleet fleets
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl p-2 shadow-xs border border-slate-200 mb-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1">
            <button
              onClick={() => setActiveTab('bookings')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'bookings'
                  ? 'bg-[#1a2b48] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <CalendarCheck className="w-4 h-4 text-[#5191fa]" />
              <span>Tour Bookings ({bookings.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('contacts')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'contacts'
                  ? 'bg-[#1a2b48] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <MessageSquare className="w-4 h-4 text-[#5191fa]" />
              <span>Contact Messages ({contactInquiries.length})</span>
              {newInquiries > 0 && (
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('partners')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'partners'
                  ? 'bg-[#1a2b48] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Handshake className="w-4 h-4 text-[#5191fa]" />
              <span>Partners ({partnerRequests.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('subscribers')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'subscribers'
                  ? 'bg-[#1a2b48] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Mail className="w-4 h-4 text-[#5191fa]" />
              <span>Subscribers ({newsletterSubscribers.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'settings'
                  ? 'bg-[#1a2b48] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Settings className="w-4 h-4 text-[#5191fa]" />
              <span>Alert Settings</span>
            </button>
          </div>

          {/* Quick Export Action */}
          <div>
            {activeTab === 'bookings' && (
              <button
                onClick={exportBookingsToCsv}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Bookings CSV</span>
              </button>
            )}
            {activeTab === 'contacts' && (
              <button
                onClick={exportContactsToCsv}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Messages CSV</span>
              </button>
            )}
          </div>
        </div>

        {/* ================= TAB 1: BOOKINGS ================= */}
        {activeTab === 'bookings' && (
          <div className="space-y-4">
            {/* Filter Bar */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  value={bookingSearch}
                  onChange={(e) => setBookingSearch(e.target.value)}
                  placeholder="Search traveler, tour, or code..."
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-xs text-slate-500 font-medium">Status:</span>
                <select
                  value={bookingStatusFilter}
                  onChange={(e) => setBookingStatusFilter(e.target.value)}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold cursor-pointer"
                >
                  <option value="all">All Statuses</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Pending Verification">Pending Verification</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>

            {/* Bookings Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-600 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="py-3.5 px-4">Ref Code</th>
                      <th className="py-3.5 px-4">Lead Traveler</th>
                      <th className="py-3.5 px-4">Tour &amp; Dates</th>
                      <th className="py-3.5 px-4">Party &amp; Addons</th>
                      <th className="py-3.5 px-4">Total</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700">
                    {filteredBookings.length > 0 ? (
                      filteredBookings.map((b) => (
                        <tr key={b.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-4 px-4 font-mono font-bold text-[#5191fa]">
                            {b.bookingCode}
                            <div className="text-[10px] text-slate-400 font-sans mt-0.5">{b.bookingDate}</div>
                          </td>

                          <td className="py-4 px-4">
                            <div className="font-bold text-[#1a2b48]">{b.customerName}</div>
                            <div className="text-slate-500 text-[11px]">{b.customerEmail}</div>
                            <div className="text-slate-500 text-[11px] font-mono">{b.customerPhone}</div>
                          </td>

                          <td className="py-4 px-4">
                            <div className="font-semibold text-slate-900">{b.tourTitle}</div>
                            <div className="text-[11px] text-slate-500">{b.startDate} - {b.endDate}</div>
                            <div className="text-[10px] text-slate-400">{b.duration}</div>
                          </td>

                          <td className="py-4 px-4">
                            <div>{b.adults} Adults {b.children > 0 ? `+ ${b.children} Youths` : ''}</div>
                            <div className="text-[10px] text-slate-400 mt-0.5 space-x-1">
                              {b.singleTent && <span className="bg-slate-100 px-1 py-0.5 rounded">Single Tent</span>}
                              {b.airportTransfer && <span className="bg-slate-100 px-1 py-0.5 rounded">Airport VIP</span>}
                            </div>
                            {b.specialRequests && (
                              <div className="text-[10px] text-amber-700 bg-amber-50 p-1 rounded mt-1 max-w-xs italic">
                                Note: &ldquo;{b.specialRequests}&rdquo;
                              </div>
                            )}
                          </td>

                          <td className="py-4 px-4 font-extrabold text-sm text-[#1a2b48]">
                            {formatPrice(b.totalPrice)}
                          </td>

                          <td className="py-4 px-4">
                            <select
                              value={b.status}
                              onChange={(e) => updateBookingStatus(b.id, e.target.value as any)}
                              className={`text-[11px] font-bold px-2 py-1 rounded border cursor-pointer ${
                                b.status === 'Confirmed'
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                  : b.status === 'Pending Verification'
                                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                                  : 'bg-blue-50 text-blue-800 border-blue-200'
                              }`}
                            >
                              <option value="Confirmed">Confirmed</option>
                              <option value="Pending Verification">Pending Verification</option>
                              <option value="Completed">Completed</option>
                            </select>
                          </td>

                          <td className="py-4 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {/* 1-Click WhatsApp Button */}
                              {b.customerPhone && (
                                <a
                                  href={`https://wa.me/${getCleanPhone(b.customerPhone)}?text=${encodeURIComponent(
                                    `Hello ${b.customerName}, this is Diran Peak Adventure regarding your reservation ${b.bookingCode} for the ${b.tourTitle}. We are delighted to confirm your dates!`
                                  )}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg transition-colors"
                                  title="Message traveler on WhatsApp"
                                >
                                  <Phone className="w-3.5 h-3.5" />
                                </a>
                              )}

                              {/* Email Client */}
                              <a
                                href={`mailto:${b.customerEmail}?subject=Diran Peak Adventure Booking Confirmation - ${b.bookingCode}&body=Dear ${b.customerName},%0D%0A%0D%0AThank you for booking the ${b.tourTitle} with Diran Peak Adventure!%0D%0AYour booking reference is ${b.bookingCode}.%0D%0A%0D%0AWe look forward to guiding you in the Karakoram!`}
                                className="p-1.5 bg-blue-50 hover:bg-blue-100 text-[#5191fa] rounded-lg transition-colors"
                                title="Send Email"
                              >
                                <Mail className="w-3.5 h-3.5" />
                              </a>

                              {/* Delete */}
                              <button
                                onClick={() => {
                                  if (confirm(`Delete booking ${b.bookingCode}?`)) {
                                    deleteBooking(b.id);
                                  }
                                }}
                                className="p-1.5 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-lg transition-colors cursor-pointer"
                                title="Delete Booking"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-slate-400">
                          No bookings found matching current filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: CONTACT INQUIRIES ================= */}
        {activeTab === 'contacts' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center justify-between">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  value={contactSearch}
                  onChange={(e) => setContactSearch(e.target.value)}
                  placeholder="Search inquiries or messages..."
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>
            </div>

            <div className="space-y-3">
              {filteredContacts.length > 0 ? (
                filteredContacts.map((c) => (
                  <div
                    key={c.id}
                    className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-start justify-between gap-4"
                  >
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-sm text-[#1a2b48]">{c.name}</span>
                        <span className="text-xs text-slate-400">· {c.date}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          c.status === 'New' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {c.status}
                        </span>
                        <span className="bg-blue-50 text-[#5191fa] text-[11px] font-semibold px-2 py-0.5 rounded">
                          {c.subject}
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                        {c.message}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                        <span><strong>Email:</strong> {c.email}</span>
                        {c.phone && <span><strong>Phone:</strong> {c.phone}</span>}
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center gap-2 shrink-0">
                      {c.phone && (
                        <a
                          href={`https://wa.me/${getCleanPhone(c.phone)}?text=${encodeURIComponent(
                            `Hello ${c.name}, thank you for contacting Diran Peak Adventure regarding ${c.subject}. How can we assist you with your Pakistan expedition?`
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>WhatsApp Reply</span>
                        </a>
                      )}

                      <a
                        href={`mailto:${c.email}?subject=Diran Peak Adventure - Re: ${c.subject}&body=Dear ${c.name},%0D%0A%0D%0AThank you for reaching out to Diran Peak Adventure!`}
                        className="px-3 py-1.5 bg-[#5191fa] hover:bg-[#3d7be3] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Email Reply</span>
                      </a>

                      <button
                        onClick={() => updateContactStatus(c.id, c.status === 'New' ? 'Contacted' : 'New')}
                        className="text-xs text-slate-500 hover:text-slate-800 underline cursor-pointer mt-1"
                      >
                        Mark as {c.status === 'New' ? 'Contacted' : 'New'}
                      </button>

                      <button
                        onClick={() => deleteContactInquiry(c.id)}
                        className="text-xs text-rose-500 hover:underline cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-2xl p-12 text-center text-slate-400 border border-slate-200">
                  No inquiries found.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= TAB 3: PARTNERS ================= */}
        {activeTab === 'partners' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-600 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-3.5 px-4">Date</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Company Name</th>
                    <th className="py-3.5 px-4">Contact Person</th>
                    <th className="py-3.5 px-4">Email</th>
                    <th className="py-3.5 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  {partnerRequests.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/70">
                      <td className="py-4 px-4 text-slate-500">{p.date}</td>
                      <td className="py-4 px-4 font-bold text-[#1a2b48]">{p.category}</td>
                      <td className="py-4 px-4 font-semibold">{p.companyName}</td>
                      <td className="py-4 px-4">{p.contactName}</td>
                      <td className="py-4 px-4">
                        <a href={`mailto:${p.email}`} className="text-[#5191fa] hover:underline">
                          {p.email}
                        </a>
                      </td>
                      <td className="py-4 px-4">
                        <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px] font-bold">
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= TAB 4: SUBSCRIBERS ================= */}
        {activeTab === 'subscribers' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
            <h3 className="font-heading font-bold text-base text-[#1a2b48] mb-4">
              Newsletter Email Subscribers ({newsletterSubscribers.length})
            </h3>
            <div className="divide-y divide-slate-100">
              {newsletterSubscribers.map((s) => (
                <div key={s.id} className="py-3 flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800">{s.email}</span>
                  <span className="text-slate-400">Subscribed on {s.date}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 5: SETTINGS & ADMIN CREDENTIALS ================= */}
        {activeTab === 'settings' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Panel 1: Admin Login ID & Security Credentials */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#5191fa] flex items-center justify-center">
                  <KeyRound className="w-4 h-4" />
                </div>
                <h3 className="font-heading text-xl font-bold text-[#1a2b48]">
                  Admin Login ID &amp; Credentials
                </h3>
              </div>
              <p className="text-xs text-slate-500 mb-6">
                Update the authorized Login ID, email, and password used to access this Admin Portal.
              </p>

              {/* Active Credentials Summary Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-[#1a2b48] text-white text-xs mb-6 shadow-sm">
                <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
                  <span className="font-bold flex items-center gap-1.5 text-sky-300">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Active Admin Login ID</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold border border-emerald-500/30">
                    Authenticated
                  </span>
                </div>

                <div className="space-y-2 font-mono text-[11px]">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Current Login ID:</span>
                    <strong className="text-white text-xs bg-white/10 px-2 py-0.5 rounded">
                      {adminCredentials.loginId}
                    </strong>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Admin Email:</span>
                    <span className="text-sky-200">{adminCredentials.email}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Admin Password:</span>
                    <span className="text-emerald-300">•••••••• ({adminCredentials.password.length} chars)</span>
                  </div>
                </div>
              </div>

              {credSaved && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Admin Login ID &amp; Password updated successfully!</span>
                </div>
              )}

              {credError && (
                <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{credError}</span>
                </div>
              )}

              <form onSubmit={handleSaveCredentials} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    New Admin Login ID
                  </label>
                  <input
                    type="text"
                    required
                    value={credLoginId}
                    onChange={(e) => setCredLoginId(e.target.value)}
                    placeholder="e.g. admin or dpa-director"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    You can sign in using this Login ID or your admin email.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Admin Contact / Login Email
                  </label>
                  <input
                    type="email"
                    required
                    value={credEmail}
                    onChange={(e) => setCredEmail(e.target.value)}
                    placeholder="admin@diranpeakadventure.com"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
                    <span>Admin Password (Min 6 chars)</span>
                    <button
                      type="button"
                      onClick={() => setShowCredPassword(!showCredPassword)}
                      className="text-[11px] text-[#5191fa] hover:underline cursor-pointer flex items-center gap-1"
                    >
                      {showCredPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      <span>{showCredPassword ? 'Hide' : 'Show'}</span>
                    </button>
                  </label>
                  <input
                    type={showCredPassword ? 'text' : 'password'}
                    required
                    value={credPassword}
                    onChange={(e) => setCredPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 bg-[#1a2b48] hover:bg-[#25395c] text-white text-xs font-bold uppercase rounded-xl transition-all shadow-sm cursor-pointer flex items-center justify-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Save Admin Login Credentials</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Panel 2: Submission Routing & WhatsApp Dispatch */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <h3 className="font-heading text-xl font-bold text-[#1a2b48]">
                  Submission Routing &amp; Alerts
                </h3>
              </div>
              <p className="text-xs text-slate-500 mb-6">
                Configure where lead notifications, customer bookings, and contact inquiries are sent.
              </p>

              {settingsSaved && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Notification settings saved successfully!</span>
                </div>
              )}

              <form onSubmit={handleSaveSettings} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Notification Dispatch Email
                  </label>
                  <input
                    type="email"
                    required
                    value={notifyEmail}
                    onChange={(e) => setNotifyEmail(e.target.value)}
                    placeholder="msa78677@gmail.com"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    All new bookings and inquiries are directed to this address.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    WhatsApp Alert Dispatch Number
                  </label>
                  <input
                    type="text"
                    required
                    value={notifyPhone}
                    onChange={(e) => setNotifyPhone(e.target.value)}
                    placeholder="+923456412992"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 font-mono"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Enables instant 1-click WhatsApp alerts and customer communications.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Webhook URL (Optional: Google Sheets, Zapier, Slack)
                  </label>
                  <input
                    type="url"
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                    placeholder="https://maker.ifttt.com/trigger/... or Google Apps Script URL"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Automatically POSTs JSON payloads to your Google Sheet or CRM for every booking.
                  </p>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2.5 bg-[#5191fa] hover:bg-[#3d7be3] text-white text-xs font-bold uppercase rounded-xl transition-all shadow-sm cursor-pointer"
                  >
                    Save Routing Settings
                  </button>

                  <a
                    href={`https://wa.me/${getCleanPhone(notifyPhone)}?text=${encodeURIComponent(
                      '*TEST ALERT - DIRAN PEAK ADVENTURE ADMIN SYSTEM*%0A%0AEverything is working properly! Your submissions will arrive at this WhatsApp number.'
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto px-4 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Test WhatsApp Alert</span>
                  </a>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
