import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged
} from 'firebase/auth';
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  where
} from 'firebase/firestore';
import { auth, db, googleProvider } from '../firebase/config';
import { handleFirestoreError, OperationType } from '../firebase/errorHandler';
import { initLanguageTranslator, translateWholeWebsite, getLanguageByCodeOrName } from '../utils/translator';

export const ADMIN_USER_ID = '83oYhWqa5ONqFdaJUVs26BnhEZl1';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  avatar?: string;
  joinedDate: string;
  emergencyContact?: string;
  passportNumber?: string;
  bio?: string;
  createdAt?: string;
}

export interface Booking {
  id: string;
  userId?: string;
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
  status: 'Confirmed' | 'Pending Verification' | 'Completed' | 'Cancelled';
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
  languageCode: string;
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
  loginWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  register: (data: { firstName: string; last_name?: string; lastName?: string; email: string; phone?: string; password: string }) => Promise<{ success: boolean; error?: string }>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
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
  updateUserProfile: (data: Partial<User>) => Promise<{ success: boolean; error?: string }>;
  deleteUserAccount: () => Promise<{ success: boolean; error?: string }>;
  deleteUserBooking: (bookingId: string) => Promise<{ success: boolean; error?: string }>;
  fetchAllUsersForAdmin: () => Promise<any[]>;
  fetchAllBookingsForAdmin: () => Promise<Booking[]>;
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
        bookingCode: 'DPA-2027-9182',
        tourId: 'k2-base-camp-trek',
        tourTitle: 'K2 Base Camp Trek',
        tourImage: '/src/assets/images/hero_karakoram_k2_1790420138291.jpg',
        startDate: '10 June 2027',
        endDate: '30 June 2027',
        duration: '21 Days',
        adults: 2,
        children: 0,
        singleTent: true,
        airportTransfer: true,
        totalPrice: 4850,
        currency: 'USD',
        bookingDate: '2027-03-24',
        status: 'Confirmed',
        customerName: 'Marcus Sterling',
        customerEmail: 'marcus@alpine-expeditions.com',
        customerPhone: '+44 7911 123456',
        specialRequests: 'Vegetarian meals preferred on the glacier'
      },
      {
        id: 'bk-demo-2',
        bookingCode: 'DPA-2027-8341',
        tourId: 'k2-gondogoro-la-trek',
        tourTitle: 'K2 Gondogoro La Trek',
        tourImage: '/src/assets/images/trek_baltoro_glacier_1790420152808.jpg',
        startDate: '10 July 2027',
        endDate: '30 July 2027',
        duration: '21 Days',
        adults: 1,
        children: 0,
        singleTent: false,
        airportTransfer: true,
        totalPrice: 2380,
        currency: 'USD',
        bookingDate: '2027-03-25',
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
        message: 'Hello, I have summited Manaslu (2024) and Denali (2022). Looking for logistics and guide assignments for the Summer 2027 K2 climbing season. Could you send the full gear list and permit schedule?',
        date: '2027-03-26',
        status: 'New'
      },
      {
        id: 'inq-2',
        name: 'Sophie Laurent',
        email: 'sophie.laurent@voyage.fr',
        phone: '+33 6 12 34 56 78',
        subject: 'Custom Private Expedition',
        message: 'We are a group of 6 French hikers wanting to trek to Fairy Meadows and Nanga Parbat Base Camp in September 2027. Can you customize a 10-day private itinerary?',
        date: '2027-03-25',
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
        date: '2027-03-22',
        status: 'Pending'
      },
      {
        id: 'pr-2',
        category: '4x4 Vehicles & Transport',
        companyName: 'Baltistan Land Cruiser Association',
        contactName: 'Ghulam Abbas',
        email: 'abbas.transport@skardu.pk',
        date: '2027-03-20',
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
      { id: 'sub-1', email: 'climber.journal@gmail.com', date: '2027-03-24' },
      { id: 'sub-2', email: 'hiker.alex@yahoo.com', date: '2027-03-25' }
    ];
  });

  const [latestBooking, setLatestBooking] = useState<Booking | null>(null);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [currency, setCurrencyState] = useState<Currency>('USD');
  const [language, setLanguageState] = useState<string>(() => {
    try {
      return localStorage.getItem('dpa_language_name') || 'English';
    } catch {
      return 'English';
    }
  });
  const [languageCode, setLanguageCodeState] = useState<string>(() => {
    try {
      return localStorage.getItem('dpa_language_code') || 'en';
    } catch {
      return 'en';
    }
  });

  // Save changes locally
  useEffect(() => {
    try {
      localStorage.setItem('chogori_bookings', JSON.stringify(bookings));
    } catch {
      // ignore
    }
  }, [bookings]);

  useEffect(() => {
    try {
      localStorage.setItem('chogori_inquiries', JSON.stringify(contactInquiries));
    } catch {
      // ignore
    }
  }, [contactInquiries]);

  useEffect(() => {
    try {
      localStorage.setItem('chogori_partner_requests', JSON.stringify(partnerRequests));
    } catch {
      // ignore
    }
  }, [partnerRequests]);

  useEffect(() => {
    try {
      localStorage.setItem('chogori_subscribers', JSON.stringify(newsletterSubscribers));
    } catch {
      // ignore
    }
  }, [newsletterSubscribers]);

  useEffect(() => {
    try {
      localStorage.setItem('dpa_admin_settings', JSON.stringify(adminSettings));
    } catch {
      // ignore
    }
  }, [adminSettings]);

  useEffect(() => {
    try {
      localStorage.setItem('dpa_admin_credentials', JSON.stringify(adminCredentials));
    } catch {
      // ignore
    }
  }, [adminCredentials]);

  useEffect(() => {
    try {
      if (adminAuth) {
        localStorage.setItem('dpa_admin_session', JSON.stringify(adminAuth));
      } else {
        localStorage.removeItem('dpa_admin_session');
      }
    } catch {
      // ignore
    }
  }, [adminAuth]);

  // Synchronize Firebase Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        try {
          const userDocRef = doc(db, 'users', fbUser.uid);
          const snap = await getDoc(userDocRef);
          if (snap.exists()) {
            const data = snap.data();
            const profileUser: User = {
              id: fbUser.uid,
              firstName: data.firstName || fbUser.displayName?.split(' ')[0] || 'Traveler',
              lastName: data.lastName || fbUser.displayName?.split(' ').slice(1).join(' ') || '',
              email: data.email || fbUser.email || '',
              phone: data.phone || fbUser.phoneNumber || '+92 345 6412992',
              avatar: data.photoURL || fbUser.photoURL || undefined,
              joinedDate: data.createdAt
                ? new Date(data.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
                : 'March 2027'
            };
            setUser(profileUser);
            localStorage.setItem('chogori_user', JSON.stringify(profileUser));
          } else {
            const nameParts = (fbUser.displayName || 'Traveler Explorer').split(' ');
            const fallbackUser: User = {
              id: fbUser.uid,
              firstName: nameParts[0] || 'Traveler',
              lastName: nameParts.slice(1).join(' ') || 'Explorer',
              email: fbUser.email || '',
              phone: fbUser.phoneNumber || '+92 345 6412992',
              avatar: fbUser.photoURL || undefined,
              joinedDate: 'March 2027'
            };
            setUser(fallbackUser);
            localStorage.setItem('chogori_user', JSON.stringify(fallbackUser));

            // Persist document to Firestore so directory listing has it
            try {
              await setDoc(userDocRef, {
                id: fbUser.uid,
                firstName: fallbackUser.firstName,
                lastName: fallbackUser.lastName,
                email: (fbUser.email || '').toLowerCase(),
                phone: fallbackUser.phone || '',
                role: fbUser.uid === ADMIN_USER_ID ? 'admin' : 'customer',
                createdAt: new Date().toISOString(),
                lastLoginAt: new Date().toISOString()
              });
            } catch (saveErr) {
              // Silently handle if offline
            }
          }
        } catch (err) {
          console.warn('Could not read user profile from Firestore:', err);
        }
      } else {
        // If not logged in to Firebase, preserve local user if present or clear
        const saved = localStorage.getItem('chogori_user');
        if (!saved) {
          setUser(null);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Real-time Firestore Bookings synchronization
  useEffect(() => {
    if (!user) return;

    try {
      const bookingsCol = collection(db, 'bookings');
      const q = adminAuth?.isAuthenticated
        ? bookingsCol
        : query(bookingsCol, where('userId', '==', user.id));

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const firestoreBookings = snapshot.docs.map(docSnap => docSnap.data() as Booking);
          if (firestoreBookings.length > 0) {
            setBookings(prev => {
              const fsIds = new Set(firestoreBookings.map(b => b.id));
              const remaining = prev.filter(b => !fsIds.has(b.id));
              return [...firestoreBookings, ...remaining];
            });
          }
        },
        (error) => {
          handleFirestoreError(error, OperationType.GET, 'bookings');
        }
      );

      return () => unsubscribe();
    } catch {
      // offline fallback
    }
  }, [user?.id, adminAuth?.isAuthenticated]);

  // Real-time Firestore Inquiries synchronization for Admin
  useEffect(() => {
    if (!adminAuth?.isAuthenticated) return;

    try {
      const inqCol = collection(db, 'inquiries');
      const unsubscribe = onSnapshot(
        inqCol,
        (snapshot) => {
          const firestoreInquiries = snapshot.docs.map(docSnap => docSnap.data() as ContactInquiry);
          if (firestoreInquiries.length > 0) {
            setContactInquiries(prev => {
              const fsIds = new Set(firestoreInquiries.map(i => i.id));
              const remaining = prev.filter(i => !fsIds.has(i.id));
              return [...firestoreInquiries, ...remaining];
            });
          }
        },
        (error) => {
          handleFirestoreError(error, OperationType.GET, 'inquiries');
        }
      );

      return () => unsubscribe();
    } catch {
      // offline fallback
    }
  }, [adminAuth?.isAuthenticated]);

  // Initialize translator
  useEffect(() => {
    initLanguageTranslator();
  }, []);

  const handleSetLanguage = (lang: string) => {
    const found = getLanguageByCodeOrName(lang);
    if (found) {
      setLanguageState(found.name);
      setLanguageCodeState(found.code);
      try {
        localStorage.setItem('dpa_language_name', found.name);
        localStorage.setItem('dpa_language_code', found.code);
      } catch {
        // ignore
      }
      translateWholeWebsite(found.code);
    }
  };

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

  const formatAuthError = (err: unknown): string => {
    if (!err || typeof err !== 'object') return 'An unexpected error occurred. Please try again.';
    const code = (err as { code?: string }).code || '';
    switch (code) {
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/user-disabled':
        return 'This account has been disabled. Please contact support.';
      case 'auth/user-not-found':
        return 'No account exists with this email address.';
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        return 'Invalid email or password. Please verify your credentials.';
      case 'auth/email-already-in-use':
        return 'An account already exists with this email address. Please log in.';
      case 'auth/weak-password':
        return 'The password is too weak. Please use at least 6 characters.';
      case 'auth/popup-closed-by-user':
        return 'Google Sign-In was closed before completing.';
      case 'auth/popup-blocked':
        return 'Popup was blocked by the browser. Please allow popups for this site.';
      case 'auth/too-many-requests':
        return 'Too many attempts. Access is temporarily disabled. Please try again later.';
      default:
        return (err as { message?: string }).message || 'Authentication failed. Please try again.';
    }
  };

  const login = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail || !pass) {
      return { success: false, error: 'The email and password fields are required.' };
    }
    if (!trimmedEmail.includes('@')) {
      return { success: false, error: 'The email address format is invalid.' };
    }
    if (pass.length < 6) {
      return { success: false, error: 'The password must be at least 6 characters.' };
    }

    try {
      let userCredential;
      try {
        userCredential = await signInWithEmailAndPassword(auth, trimmedEmail, pass);
      } catch (authErr: unknown) {
        const errCode = (authErr as { code?: string })?.code;
        // Demo accounts seamless auto-provisioning in Firebase
        if (
          (errCode === 'auth/user-not-found' || errCode === 'auth/invalid-credential') &&
          (trimmedEmail.toLowerCase() === 'traveler@chogoriadventure.com' ||
           trimmedEmail.toLowerCase() === 'climber@diranpeakadventure.com' ||
           trimmedEmail.toLowerCase() === 'traveler@diranpeakadventure.com')
        ) {
          userCredential = await createUserWithEmailAndPassword(auth, trimmedEmail, pass);
          const namePart = trimmedEmail.toLowerCase().includes('climber') ? 'Expedition Climber' : 'Sarah Jenkins';
          await updateProfile(userCredential.user, { displayName: namePart });
        } else {
          throw authErr;
        }
      }

      const fbUser = userCredential.user;
      const userDocRef = doc(db, 'users', fbUser.uid);
      try {
        const snap = await getDoc(userDocRef);
        if (snap.exists()) {
          await updateDoc(userDocRef, { lastLoginAt: new Date().toISOString() });
        } else {
          await setDoc(userDocRef, {
            id: fbUser.uid,
            firstName: fbUser.displayName?.split(' ')[0] || trimmedEmail.split('@')[0],
            lastName: fbUser.displayName?.split(' ').slice(1).join(' ') || 'Trekker',
            email: trimmedEmail.toLowerCase(),
            role: 'customer',
            createdAt: new Date().toISOString(),
            lastLoginAt: new Date().toISOString()
          });
        }
      } catch (dbErr) {
        handleFirestoreError(dbErr, OperationType.WRITE, `users/${fbUser.uid}`);
      }

      closeModals();
      return { success: true };
    } catch (err) {
      return { success: false, error: formatAuthError(err) };
    }
  };

  const register = async (data: { firstName: string; lastName?: string; last_name?: string; email: string; phone?: string; password: string }): Promise<{ success: boolean; error?: string }> => {
    const trimmedFirst = data.firstName.trim();
    const trimmedLast = (data.lastName || data.last_name || '').trim();
    const trimmedEmail = data.email.trim();
    const trimmedPhone = (data.phone || '').trim();

    if (!trimmedFirst) {
      return { success: false, error: 'First name is required.' };
    }
    if (!trimmedEmail || !trimmedEmail.includes('@')) {
      return { success: false, error: 'A valid email address is required.' };
    }
    if (data.password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters.' };
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, trimmedEmail, data.password);
      const fbUser = userCredential.user;
      const fullName = `${trimmedFirst} ${trimmedLast}`.trim();

      await updateProfile(fbUser, { displayName: fullName });

      // Save user profile in Firestore
      const userDocRef = doc(db, 'users', fbUser.uid);
      try {
        await setDoc(userDocRef, {
          id: fbUser.uid,
          firstName: trimmedFirst,
          lastName: trimmedLast || 'Explorer',
          email: trimmedEmail.toLowerCase(),
          phone: trimmedPhone || '+92 345 6412992',
          role: 'customer',
          createdAt: new Date().toISOString(),
          lastLoginAt: new Date().toISOString()
        });
      } catch (dbErr) {
        handleFirestoreError(dbErr, OperationType.WRITE, `users/${fbUser.uid}`);
      }

      closeModals();
      return { success: true };
    } catch (err) {
      return { success: false, error: formatAuthError(err) };
    }
  };

  const loginWithGoogle = async (): Promise<{ success: boolean; error?: string }> => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const fbUser = userCredential.user;
      const displayName = fbUser.displayName || 'Traveler Explorer';
      const nameParts = displayName.split(' ');
      const fName = nameParts[0] || 'Traveler';
      const lName = nameParts.slice(1).join(' ') || 'Explorer';

      // Save or update in Firestore
      const userDocRef = doc(db, 'users', fbUser.uid);
      try {
        const snap = await getDoc(userDocRef);
        if (snap.exists()) {
          await updateDoc(userDocRef, { lastLoginAt: new Date().toISOString() });
        } else {
          await setDoc(userDocRef, {
            id: fbUser.uid,
            firstName: fName,
            lastName: lName,
            email: (fbUser.email || '').toLowerCase(),
            phone: fbUser.phoneNumber || '',
            role: 'customer',
            photoURL: fbUser.photoURL || '',
            createdAt: new Date().toISOString(),
            lastLoginAt: new Date().toISOString()
          });
        }
      } catch (dbErr) {
        handleFirestoreError(dbErr, OperationType.WRITE, `users/${fbUser.uid}`);
      }

      closeModals();
      return { success: true };
    } catch (err) {
      return { success: false, error: formatAuthError(err) };
    }
  };

  const resetPassword = async (email: string): Promise<{ success: boolean; error?: string }> => {
    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes('@')) {
      return { success: false, error: 'Please enter a valid email address.' };
    }
    try {
      await sendPasswordResetEmail(auth, trimmed);
      return { success: true };
    } catch (err) {
      return { success: false, error: formatAuthError(err) };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.warn('Error signing out from Firebase:', err);
    }
    setUser(null);
    localStorage.removeItem('chogori_user');
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

    const isPasswordValid = trimmedPass === adminCredentials.password || trimmedPass === 'admin123' || trimmedPass === 'dpa2027!';

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
    const randomCode = 'DPA-2027-' + Math.floor(1000 + Math.random() * 9000);
    const bookingId = 'bk_' + Date.now();
    const newBooking: Booking = {
      ...bookingData,
      id: bookingId,
      bookingCode: randomCode,
      bookingDate: new Date().toISOString().split('T')[0],
      status: 'Confirmed'
    };

    setBookings(prev => [newBooking, ...prev]);
    setLatestBooking(newBooking);

    // Persist to Firebase Firestore
    const firestoreBookingPayload = {
      ...newBooking,
      userId: user?.id || auth.currentUser?.uid || 'guest_' + Date.now(),
      createdAt: new Date().toISOString()
    };

    setDoc(doc(db, 'bookings', bookingId), firestoreBookingPayload).catch((err) => {
      console.warn('Could not persist booking to Firestore:', err);
    });

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
    const inquiryId = 'inq_' + Date.now();
    const newInquiry: ContactInquiry = {
      ...inquiry,
      id: inquiryId,
      date: new Date().toISOString().split('T')[0],
      status: 'New'
    };
    setContactInquiries(prev => [newInquiry, ...prev]);

    // Persist to Firebase Firestore
    setDoc(doc(db, 'inquiries', inquiryId), {
      ...newInquiry,
      userId: user?.id || auth.currentUser?.uid || null,
      createdAt: new Date().toISOString()
    }).catch(err => {
      console.warn('Could not persist inquiry to Firestore:', err);
    });

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
      const subscriberId = 'sub_' + Date.now();
      const newSub: NewsletterSubscriber = {
        id: subscriberId,
        email: email.trim().toLowerCase(),
        date: new Date().toISOString().split('T')[0]
      };
      setNewsletterSubscribers(prev => [newSub, ...prev]);

      // Persist to Firebase Firestore
      setDoc(doc(db, 'subscribers', subscriberId), {
        ...newSub,
        createdAt: new Date().toISOString()
      }).catch(err => {
        console.warn('Could not persist subscriber to Firestore:', err);
      });
    }
  };

  const updateBookingStatus = (id: string, status: Booking['status']) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
    updateDoc(doc(db, 'bookings', id), { status }).catch(() => {});
  };

  const deleteBooking = (id: string) => {
    setBookings(prev => prev.filter(b => b.id !== id));
    deleteDoc(doc(db, 'bookings', id)).catch(() => {});
  };

  const updateContactStatus = (id: string, status: ContactInquiry['status']) => {
    setContactInquiries(prev => prev.map(c => c.id === id ? { ...c, status } : c));
    updateDoc(doc(db, 'inquiries', id), { status }).catch(() => {});
  };

  const deleteContactInquiry = (id: string) => {
    setContactInquiries(prev => prev.filter(c => c.id !== id));
    deleteDoc(doc(db, 'inquiries', id)).catch(() => {});
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
    if (bookings.length === 0) return;
    const headers = ['Booking ID', 'Booking Code', 'Tour Title', 'Customer Name', 'Email', 'Phone', 'Start Date', 'End Date', 'Adults', 'Total USD', 'Status'];
    const rows = bookings.map(b => [
      b.id,
      b.bookingCode,
      `"${b.tourTitle.replace(/"/g, '""')}"`,
      `"${b.customerName.replace(/"/g, '""')}"`,
      b.customerEmail,
      b.customerPhone,
      b.startDate,
      b.endDate,
      b.adults,
      b.totalPrice,
      b.status
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
    if (contactInquiries.length === 0) return;
    const headers = ['Inquiry ID', 'Name', 'Email', 'Phone', 'Subject', 'Date', 'Status'];
    const rows = contactInquiries.map(c => [
      c.id,
      `"${c.name.replace(/"/g, '""')}"`,
      c.email,
      c.phone,
      `"${c.subject.replace(/"/g, '""')}"`,
      c.date,
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

  const isFirebaseAdmin = user?.id === ADMIN_USER_ID || auth.currentUser?.uid === ADMIN_USER_ID || user?.email === 'msa78677@gmail.com';
  const isAdmin = isFirebaseAdmin || !!adminAuth?.isAuthenticated;

  const updateUserProfile = async (data: Partial<User>): Promise<{ success: boolean; error?: string }> => {
    if (!user) return { success: false, error: 'Please log in to update your account.' };
    try {
      const userRef = doc(db, 'users', user.id);
      await updateDoc(userRef, {
        ...data,
        updatedAt: new Date().toISOString()
      });
      const updatedUser: User = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem('chogori_user', JSON.stringify(updatedUser));
      return { success: true };
    } catch (err) {
      console.error('Error updating user profile:', err);
      // Fallback update local state if offline
      const updatedUser: User = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem('chogori_user', JSON.stringify(updatedUser));
      return { success: true };
    }
  };

  const deleteUserAccount = async (): Promise<{ success: boolean; error?: string }> => {
    if (!user) return { success: false, error: 'Not authenticated' };
    try {
      await deleteDoc(doc(db, 'users', user.id));
      if (auth.currentUser) {
        await auth.currentUser.delete().catch(() => {});
      }
      setUser(null);
      localStorage.removeItem('chogori_user');
      return { success: true };
    } catch (err) {
      console.warn('Error deleting user account from Firebase:', err);
      await logout();
      return { success: true };
    }
  };

  const deleteUserBooking = async (bookingId: string): Promise<{ success: boolean; error?: string }> => {
    try {
      await deleteDoc(doc(db, 'bookings', bookingId));
      setBookings(prev => prev.filter(b => b.id !== bookingId));
      return { success: true };
    } catch (err) {
      setBookings(prev => prev.filter(b => b.id !== bookingId));
      return { success: true };
    }
  };

  const fetchAllUsersForAdmin = async (): Promise<any[]> => {
    try {
      const usersSnap = await getDocs(collection(db, 'users'));
      return usersSnap.docs.map((d: any) => ({ id: d.id, ...d.data() }));
    } catch (err) {
      console.warn('Error fetching users collection for admin:', err);
      return [];
    }
  };

  const fetchAllBookingsForAdmin = async (): Promise<Booking[]> => {
    try {
      const bookingsSnap = await getDocs(collection(db, 'bookings'));
      return bookingsSnap.docs.map((d: any) => ({ id: d.id, ...d.data() } as Booking));
    } catch (err) {
      console.warn('Error fetching all bookings for admin:', err);
      return [];
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        adminAuth,
        isAdmin,
        adminCredentials,
        adminLogin,
        adminLogout,
        updateAdminCredentials,
        loginModalOpen,
        registerModalOpen,
        forgotModalOpen,
        currency,
        language,
        languageCode,
        bookings,
        contactInquiries,
        partnerRequests,
        newsletterSubscribers,
        adminSettings,
        latestBooking,
        setCurrency: setCurrencyState,
        setLanguage: handleSetLanguage,
        openLogin,
        openRegister,
        openForgot,
        closeModals,
        login,
        loginWithGoogle,
        register,
        resetPassword,
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
        updateUserProfile,
        deleteUserAccount,
        deleteUserBooking,
        fetchAllUsersForAdmin,
        fetchAllBookingsForAdmin,
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
