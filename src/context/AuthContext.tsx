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
  loginModalOpen: boolean;
  registerModalOpen: boolean;
  forgotModalOpen: boolean;
  currency: Currency;
  language: string;
  bookings: Booking[];
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
  formatPrice: (usdPrice: number) => string;
  dismissLatestBooking: () => void;
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
        bookingCode: 'CHO-2026-9182',
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
        bookingDate: '2026-03-15',
        status: 'Confirmed',
        customerName: 'Marcus Sterling',
        customerEmail: 'marcus@alpine-expeditions.com',
        customerPhone: '+44 7911 123456',
        specialRequests: 'Vegetarian meals preferred on the glacier'
      }
    ];
  });

  const [latestBooking, setLatestBooking] = useState<Booking | null>(null);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [currency, setCurrencyState] = useState<Currency>('USD');
  const [language, setLanguageState] = useState('English');

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
    // Simulated real authentication
    if (!email || !pass) {
      return { success: false, error: 'The email and password fields are required.' };
    }
    if (!email.includes('@')) {
      return { success: false, error: 'The email address format is invalid.' };
    }
    if (pass.length < 6) {
      return { success: false, error: 'The password must be at least 6 characters.' };
    }

    // derive or fetch user
    const savedName = email.split('@')[0];
    const capitalized = savedName.charAt(0).toUpperCase() + savedName.slice(1);
    const loggedUser: User = {
      id: 'usr_' + Date.now(),
      firstName: capitalized,
      lastName: 'Trekker',
      email: email.toLowerCase(),
      phone: '+92 344 5925993',
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
      phone: data.phone?.trim() || '+92 344 5925993',
      joinedDate: 'March 2026'
    };

    setUser(newUser);
    closeModals();
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  const createBooking = (bookingData: Omit<Booking, 'id' | 'bookingCode' | 'bookingDate' | 'status'>): Booking => {
    const randomCode = 'CHO-2026-' + Math.floor(1000 + Math.random() * 9000);
    const newBooking: Booking = {
      ...bookingData,
      id: 'bk_' + Date.now(),
      bookingCode: randomCode,
      bookingDate: new Date().toISOString().split('T')[0],
      status: 'Confirmed'
    };

    setBookings(prev => [newBooking, ...prev]);
    setLatestBooking(newBooking);
    return newBooking;
  };

  const dismissLatestBooking = () => {
    setLatestBooking(null);
  };

  const formatPrice = (usdPrice: number): string => {
    const info = CURRENCY_RATES[currency];
    const converted = Math.round(usdPrice * info.rate);
    return `${info.symbol}${converted.toLocaleString()}`;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loginModalOpen,
        registerModalOpen,
        forgotModalOpen,
        currency,
        language,
        bookings,
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
        formatPrice,
        dismissLatestBooking
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
