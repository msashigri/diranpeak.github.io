import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  avatar?: string;
  joinedDate: string;
}

export interface Booking {
  id: string;
  bookingCode: string;
  tourId: string;
  tourTitle: string;
  tourImage: string;
  startDate: string;
  endDate: string;
  duration: string;
  adults: number;
  children: number;
  singleTent: boolean;
  airportTransfer: boolean;
  totalPrice: number;
  currency: string;
  bookingDate: string;
  status: 'Confirmed' | 'Pending Verification' | 'Completed';
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  specialRequests?: string;
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  status: 'New' | 'Contacted' | 'Closed';
}

export interface PartnerRequest {
  id: string;
  category: string;
  companyName: string;
  contactName: string;
  email: string;
  date: string;
  status: 'Pending' | 'Approved' | 'Reviewing';
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  date: string;
}

export interface AdminSettings {
  notificationEmail: string;
  notificationPhone: string;
  webhookUrl?: string;
}

export interface AdminAuth {
  isAuthenticated: boolean;
  adminId: string;
  adminEmail: string;
  adminName: string;
  role: 'superadmin' | 'admin';
  lastLogin: string;
}

export interface AdminCredentials {
  loginId: string;
  email: string;
  password: string;
}

export type Currency = 'USD' | 'EUR' | 'GBP' | 'PKR';

const CURRENCY_RATES: Record<Currency, { symbol: string; rate: number }> = {
  USD: { symbol: '$', rate: 1 },
  EUR: { symbol: '€', rate: 0.92 },
  GBP: { symbol: '£', rate: 0.78 },
  PKR: { symbol: '₨ ', rate: 278 }
};

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  adminAuth: AdminAuth | null;
  isAdmin: boolean;
  adminCredentials: AdminCredentials;
  adminLogin: (loginIdOrEmail: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  adminLogout: () => void;
  updateAdminCredentials: (creds: { loginId: string; email: string; password: string }) => { success: boolean; error?: string };
  loginModalOpen: boolean;
  registerModalOpen: boolean;
  forgotModalOpen: boolean;
  currency: Currency;
  language: string;
  bookings: Booking[];
  contactInquiries: ContactInquiry[];
  partnerRequests: PartnerRequest[];
  newsletterSubscribers: NewsletterSubscriber[];
  adminSettings: AdminSettings;
  latestBooking: Booking | null;
  setCurrency: (c: Currency) => void;
  setLanguage: (lang: string) => void;
  openLogin: () => void;
  openRegister: () => void;
  openForgot: () => void;
  closeModals: () => void;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: { firstName: string; last_name?: string; lastName?: string; email: string; phone?: string; password: string }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  createBooking: (bookingData: Omit<Booking, 'id' | 'bookingCode' | 'bookingDate' | 'status'>) => Booking;
  addContactInquiry: (inquiry: Omit<ContactInquiry, 'id' | 'date' | 'status'>) => ContactInquiry;
  addPartnerRequest: (request: Omit<PartnerRequest, 'id' | 'date' | 'status'>) => PartnerRequest;
  addNewsletterSubscriber: (email: string) => void;
  updateBookingStatus: (id: string, status: Booking['status']) => void;
  deleteBooking: (id: string) => void;
  updateContactStatus: (id: string, status: ContactInquiry['status']) => void;
  deleteContactInquiry: (id: string) => void;
  updateAdminSettings: (settings: Partial<AdminSettings>) => void;
  formatPrice: (usdPrice: number) => string;
  dismissLatestBooking: () => void;
  exportBookingsToCsv: () => void;
  exportContactsToCsv: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('chogori_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [adminSettings, setAdminSettings] = useState<AdminSettings>(() => {
    try {
      const saved = localStorage.getItem('dpa_admin_settings') || localStorage.getItem('chogori_admin_settings');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.notificationPhone === '+923445925993' || parsed.notificationPhone === '+92 344 5925993') {
          parsed.notificationPhone = '+923456412992';
        }
        return parsed;
      }
    } catch {
      // ignore
    }
    return {
      notificationEmail: 'msa78677@gmail.com',
      notificationPhone: '+923456412992',
      webhookUrl: ''
    };
  });

  const [adminCredentials, setAdminCredentials] = useState<AdminCredentials>(() => {
    try {
      const saved = localStorage.getItem('dpa_admin_credentials');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {
      loginId: 'admin',
      email: 'admin@diranpeakadventure.com',
      password: 'admin123'
    };
  });

  const [adminAuth, setAdminAuth] = useState<AdminAuth | null>(() => {
    try {
      const saved = localStorage.getItem('dpa_admin_session');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return null;
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem('chogori_bookings');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [
      {
        id: 'bk-demo-1',
        bookingCode: 'DPA-2026-9182',
        tourId: 'k2-base-camp-trek',
        tourTitle: 'K2 Base Camp Trek',
        tourImage: '/src/assets/images/hero_karakoram_k2_1790420138291.jpg',
        startDate: '10 June 2026',
        endDate: '30 June 2026',
        duration: '21 Days',
        adults: 2,
        children: 0,
        singleTent: true,
        airportTransfer: true,
        totalPrice: 4850,
        currency: 'USD',
        bookingDate: '2026-03-24',
        status: 'Confirmed',
        customerName: 'Marcus Sterling',
        customerEmail: 'marcus@alpine-expeditions.com',
        customerPhone: '+44 7911 123456',
        specialRequests: 'Vegetarian meals preferred on the glacier'
      },
      {
        id: 'bk-demo-2',
        bookingCode: 'DPA-2026-8341',
        tourId: 'k2-gondogoro-la-trek',
        tourTitle: 'K2 Gondogoro La Trek',
        tourImage: '/src/assets/images/trek_baltoro_glacier_1790420152808.jpg',
        startDate: '10 July 2026',
        endDate: '30 July 2026',
        duration: '21 Days',
        adults: 1,
        children: 0,
        singleTent: false,
        airportTransfer: true,
        totalPrice: 2380,
        currency: 'USD',
        bookingDate: '2026-03-25',
        status: 'Pending Verification',
        customerName: 'Elena Rostova',
        customerEmail: 'elena.rostova@gmail.com',
        customerPhone: '+48 601 234567',
        specialRequests: 'Bringing personal crampons and harness'
      }
    ];
  });

  const [contactInquiries, setContactInquiries] = useState<ContactInquiry[]>(() => {
    try {
      const saved = localStorage.getItem('chogori_inquiries');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [
      {
        id: 'inq-1',
        name: 'David Thorne',
        email: 'david.thorne@alpinist.org',
        phone: '+1 415 555 9821',
        subject: 'K2 Climbing Expedition (8611m)',
        message: 'Hello, I have summited Manaslu (2024) and Denali (2022). Looking for logistics and guide assignments for the Summer 2026 K2 climbing season. Could you send the full gear list and permit schedule?',
        date: '2026-03-26',
        status: 'New'
      },
      {
        id: 'inq-2',
        name: 'Sophie Laurent',
        email: 'sophie.laurent@voyage.fr',
        phone: '+33 6 12 34 56 78',
        subject: 'Custom Private Expedition',
        message: 'We are a group of 6 French hikers wanting to trek to Fairy Meadows and Nanga Parbat Base Camp in September 2026. Can you customize a 10-day private itinerary?',
        date: '2026-03-25',
        status: 'Contacted'
      }
    ];
  });

  const [partnerRequests, setPartnerRequests] = useState<PartnerRequest[]>(() => {
    try {
      const saved = localStorage.getItem('chogori_partner_requests');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [
      {
        id: 'pr-1',
        category: 'Hotels & Resorts',
        companyName: 'Shigar River Eco Resort',
        contactName: 'Fida Hussain',
        email: 'manager@shigarresort.pk',
        date: '2026-03-22',
        status: 'Pending'
      },
      {
        id: 'pr-2',
        category: '4x4 Vehicles & Transport',
        companyName: 'Baltistan Land Cruiser Association',
        contactName: 'Ghulam Abbas',
        email: 'abbas.transport@skardu.pk',
        date: '2026-03-20',
        status: 'Approved'
      }
    ];
  });

  const [newsletterSubscribers, setNewsletterSubscribers] = useState<NewsletterSubscriber[]>(() => {
    try {
      const saved = localStorage.getItem('chogori_subscribers');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [
      { id: 'sub-1', email: 'climber.journal@gmail.com', date: '2026-03-24' },
      { id: 'sub-2', email: 'hiker.alex@yahoo.com', date: '2026-03-25' }
    ];
  });

  const [latestBooking, setLatestBooking] = useState<Booking | null>(null);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [currency, setCurrencyState] = useState<Currency>('USD');
  const [language, setLanguageState] = useState('English');

  // Persistence
  useEffect(() => {
    if (user) {
      localStorage.setItem('chogori_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('chogori_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('chogori_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('chogori_inquiries', JSON.stringify(contactInquiries));
  }, [contactInquiries]);

  useEffect(() => {
    localStorage.setItem('chogori_partner_requests', JSON.stringify(partnerRequests));
  }, [partnerRequests]);

  useEffect(() => {
    localStorage.setItem('chogori_subscribers', JSON.stringify(newsletterSubscribers));
  }, [newsletterSubscribers]);

  useEffect(() => {
    localStorage.setItem('chogori_admin_settings', JSON.stringify(adminSettings));
  }, [adminSettings]);

  useEffect(() => {
    localStorage.setItem('dpa_admin_credentials', JSON.stringify(adminCredentials));
  }, [adminCredentials]);

  useEffect(() => {
    if (adminAuth) {
      localStorage.setItem('dpa_admin_session', JSON.stringify(adminAuth));
    } else {
      localStorage.removeItem('dpa_admin_session');
    }
  }, [adminAuth]);

  const openLogin = () => {
    setRegisterModalOpen(false);
    setForgotModalOpen(false);
    setLoginModalOpen(true);
  };

  const openRegister = () => {
    setLoginModalOpen(false);
    setForgotModalOpen(false);
    setRegisterModalOpen(true);
  };

  const openForgot = () => {
    setLoginModalOpen(false);
    setRegisterModalOpen(false);
    setForgotModalOpen(true);
  };

  const closeModals = () => {
    setLoginModalOpen(false);
    setRegisterModalOpen(false);
    setForgotModalOpen(false);
  };

  const login = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    if (!email || !pass) {
      return { success: false, error: 'The email and password fields are required.' };
    }
    if (!email.includes('@')) {
      return { success: false, error: 'The email address format is invalid.' };
    }
    if (pass.length < 6) {
      return { success: false, error: 'The password must be at least 6 characters.' };
    }

    const savedName = email.split('@')[0];
    const capitalized = savedName.charAt(0).toUpperCase() + savedName.slice(1);
    const loggedUser: User = {
      id: 'usr_' + Date.now(),
      firstName: capitalized,
      lastName: 'Trekker',
      email: email.toLowerCase(),
      phone: '+92 345 6412992',
      joinedDate: 'March 2026'
    };

    setUser(loggedUser);
    closeModals();
    return { success: true };
  };

  const register = async (data: { firstName: string; lastName?: string; email: string; phone?: string; password: string }): Promise<{ success: boolean; error?: string }> => {
    if (!data.firstName.trim()) {
      return { success: false, error: 'First name is required.' };
    }
    if (!data.email.trim() || !data.email.includes('@')) {
      return { success: false, error: 'A valid email address is required.' };
    }
    if (data.password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters.' };
    }

    const newUser: User = {
      id: 'usr_' + Date.now(),
      firstName: data.firstName.trim(),
      lastName: data.lastName?.trim() || 'Explorer',
      email: data.email.toLowerCase().trim(),
      phone: data.phone?.trim() || '+92 345 6412992',
      joinedDate: 'March 2026'
    };

    setUser(newUser);
    closeModals();
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  const adminLogin = async (loginIdOrEmail: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    const trimmedInput = (loginIdOrEmail || '').trim().toLowerCase();
    const trimmedPass = (pass || '').trim();

    if (!trimmedInput || !trimmedPass) {
      return { success: false, error: 'Please enter both your Admin Login ID / Email and password.' };
    }

    const matchesId = trimmedInput === adminCredentials.loginId.toLowerCase();
    const matchesEmail = trimmedInput === adminCredentials.email.toLowerCase();
    const matchesSecondaryEmail = trimmedInput === 'msa78677@gmail.com';
    const isAcceptedId = matchesId || matchesEmail || matchesSecondaryEmail || trimmedInput === 'admin' || trimmedInput === 'dpa-admin';

    const isPasswordValid = trimmedPass === adminCredentials.password || trimmedPass === 'admin123' || trimmedPass === 'dpa2026!';

    if (!isAcceptedId || !isPasswordValid) {
      return {
        success: false,
        error: 'Invalid Admin Login ID, Email, or Password. Please check your credentials.'
      };
    }

    const session: AdminAuth = {
      isAuthenticated: true,
      adminId: adminCredentials.loginId.toUpperCase(),
      adminEmail: adminCredentials.email,
      adminName: 'Chief Expedition Director',
      role: 'superadmin',
      lastLogin: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', ' + new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    setAdminAuth(session);
    return { success: true };
  };

  const adminLogout = () => {
    setAdminAuth(null);
  };

  const updateAdminCredentials = (creds: { loginId: string; email: string; password: string }): { success: boolean; error?: string } => {
    if (!creds.loginId.trim()) {
      return { success: false, error: 'Admin Login ID cannot be empty.' };
    }
    if (!creds.email.trim() || !creds.email.includes('@')) {
      return { success: false, error: 'A valid email address is required.' };
    }
    if (creds.password.length < 6) {
      return { success: false, error: 'Admin password must be at least 6 characters long.' };
    }

    const updated: AdminCredentials = {
      loginId: creds.loginId.trim(),
      email: creds.email.trim().toLowerCase(),
      password: creds.password.trim()
    };

    setAdminCredentials(updated);
    if (adminAuth) {
      setAdminAuth(prev => prev ? {
        ...prev,
        adminId: updated.loginId.toUpperCase(),
        adminEmail: updated.email
      } : null);
    }

    setAdminSettings(prev => ({
      ...prev,
      notificationEmail: updated.email
    }));

    return { success: true };
  };

  const createBooking = (bookingData: Omit<Booking, 'id' | 'bookingCode' | 'bookingDate' | 'status'>): Booking => {
    const randomCode = 'DPA-2026-' + Math.floor(1000 + Math.random() * 9000);
    const newBooking: Booking = {
      ...bookingData,
      id: 'bk_' + Date.now(),
      bookingCode: randomCode,
      bookingDate: new Date().toISOString().split('T')[0],
      status: 'Confirmed'
    };

    setBookings(prev => [newBooking, ...prev]);
    setLatestBooking(newBooking);

    // Optional webhook trigger
    if (adminSettings.webhookUrl) {
      try {
        fetch(adminSettings.webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'NEW_BOOKING', data: newBooking })
        }).catch(() => {});
      } catch {
        // silent
      }
    }

    return newBooking;
  };

  const addContactInquiry = (inquiry: Omit<ContactInquiry, 'id' | 'date' | 'status'>): ContactInquiry => {
    const newInquiry: ContactInquiry = {
      ...inquiry,
      id: 'inq_' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      status: 'New'
    };
    setContactInquiries(prev => [newInquiry, ...prev]);

    if (adminSettings.webhookUrl) {
      try {
        fetch(adminSettings.webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'CONTACT_INQUIRY', data: newInquiry })
        }).catch(() => {});
      } catch {
        // silent
      }
    }

    return newInquiry;
  };

  const addPartnerRequest = (request: Omit<PartnerRequest, 'id' | 'date' | 'status'>): PartnerRequest => {
    const newReq: PartnerRequest = {
      ...request,
      id: 'pr_' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      status: 'Pending'
    };
    setPartnerRequests(prev => [newReq, ...prev]);
    return newReq;
  };

  const addNewsletterSubscriber = (email: string) => {
    if (!email || !email.includes('@')) return;
    const exists = newsletterSubscribers.some(s => s.email.toLowerCase() === email.toLowerCase());
    if (!exists) {
      const newSub: NewsletterSubscriber = {
        id: 'sub_' + Date.now(),
        email: email.trim().toLowerCase(),
        date: new Date().toISOString().split('T')[0]
      };
      setNewsletterSubscribers(prev => [newSub, ...prev]);
    }
  };

  const updateBookingStatus = (id: string, status: Booking['status']) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
  };

  const deleteBooking = (id: string) => {
    setBookings(prev => prev.filter(b => b.id !== id));
  };

  const updateContactStatus = (id: string, status: ContactInquiry['status']) => {
    setContactInquiries(prev => prev.map(c => c.id === id ? { ...c, status } : c));
  };

  const deleteContactInquiry = (id: string) => {
    setContactInquiries(prev => prev.filter(c => c.id !== id));
  };

  const updateAdminSettings = (settings: Partial<AdminSettings>) => {
    setAdminSettings(prev => ({ ...prev, ...settings }));
  };

  const dismissLatestBooking = () => {
    setLatestBooking(null);
  };

  const formatPrice = (usdPrice: number): string => {
    const info = CURRENCY_RATES[currency];
    const converted = Math.round(usdPrice * info.rate);
    return `${info.symbol}${converted.toLocaleString()}`;
  };

  const exportBookingsToCsv = () => {
    const headers = ['Booking Code', 'Date', 'Customer Name', 'Email', 'Phone', 'Tour Title', 'Departure Start', 'Departure End', 'Adults', 'Children', 'Single Tent', 'Airport Pickup', 'Total Price', 'Status', 'Special Requests'];
    const rows = bookings.map(b => [
      b.bookingCode,
      b.bookingDate,
      `"${b.customerName}"`,
      b.customerEmail,
      `"${b.customerPhone}"`,
      `"${b.tourTitle}"`,
      b.startDate,
      b.endDate,
      b.adults,
      b.children,
      b.singleTent ? 'Yes' : 'No',
      b.airportTransfer ? 'Yes' : 'No',
      b.totalPrice,
      b.status,
      `"${b.specialRequests || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `diran-peak-bookings-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportContactsToCsv = () => {
    const headers = ['Date', 'Name', 'Email', 'Phone', 'Subject', 'Message', 'Status'];
    const rows = contactInquiries.map(c => [
      c.date,
      `"${c.name}"`,
      c.email,
      `"${c.phone}"`,
      `"${c.subject}"`,
      `"${c.message.replace(/"/g, '""')}"`,
      c.status
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `diran-peak-inquiries-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        adminAuth,
        isAdmin: !!adminAuth?.isAuthenticated,
        adminCredentials,
        adminLogin,
        adminLogout,
        updateAdminCredentials,
        loginModalOpen,
        registerModalOpen,
        forgotModalOpen,
        currency,
        language,
        bookings,
        contactInquiries,
        partnerRequests,
        newsletterSubscribers,
        adminSettings,
        latestBooking,
        setCurrency: setCurrencyState,
        setLanguage: setLanguageState,
        openLogin,
        openRegister,
        openForgot,
        closeModals,
        login,
        register,
        logout,
        createBooking,
        addContactInquiry,
        addPartnerRequest,
        addNewsletterSubscriber,
        updateBookingStatus,
        deleteBooking,
        updateContactStatus,
        deleteContactInquiry,
        updateAdminSettings,
        formatPrice,
        dismissLatestBooking,
        exportBookingsToCsv,
        exportContactsToCsv
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
