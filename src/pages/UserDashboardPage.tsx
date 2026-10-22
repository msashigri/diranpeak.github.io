import React, { useState, useEffect } from 'react';
import { useAuth, ADMIN_USER_ID, Booking, TravelerActivity, ContactInquiry, PartnerRequest, NewsletterSubscriber, Broadcast, AlertSettings } from '../context/AuthContext';
import { TOURS_DATA } from '../data/toursData';
import { PLATFORM_ROLES, UserRole, getRoleConfig } from '../types/roles';
import { AdminAddUserModal } from '../components/AdminAddUserModal';
import { AdminRoleMatrixModal } from '../components/AdminRoleMatrixModal';
import { AdminInquirySection } from '../components/AdminInquirySection';
import { AdminTourPackagesSection } from '../components/AdminTourPackagesSection';
import { AdminWebsiteSettingsSection } from '../components/AdminWebsiteSettingsSection';
import {
  User, CalendarCheck, CheckCircle, ShieldCheck, LogOut, ArrowRight,
  Search, RefreshCw, X, Edit3, Trash2, Mail, Phone, Calendar,
  AlertTriangle, Eye, Shield, KeyRound, Check, XCircle, Clock,
  Heart, Activity, Filter, Copy, FileText, Sparkles, MessageSquare,
  Handshake, Bell, Send, CheckCircle2, ChevronRight, ExternalLink, Globe,
  Users, FileDown, Car, Building2, Award, Mountain, Plus, ShieldAlert,
  BadgeCheck, UserCheck, UserX
} from 'lucide-react';

import { TravelieSidebar, TravelieTab } from '../components/admin/TravelieSidebar';
import { TravelieTopBar } from '../components/admin/TravelieTopBar';
import { TravelieDashboardView } from '../components/admin/TravelieDashboardView';
import { TraveliePackagesView } from '../components/admin/TraveliePackagesView';
import { TravelieBookingsView } from '../components/admin/TravelieBookingsView';
import { TravelieCalendarView } from '../components/admin/TravelieCalendarView';
import { TravelieTravelersView } from '../components/admin/TravelieTravelersView';
import { TravelieGuidesView } from '../components/admin/TravelieGuidesView';
import { TravelieGalleryView } from '../components/admin/TravelieGalleryView';
import { TravelieMessagesView } from '../components/admin/TravelieMessagesView';
import { TravelieDealsView } from '../components/admin/TravelieDealsView';
import { TravelieFeedbackView } from '../components/admin/TravelieFeedbackView';
import { RoleSpecificDashboard } from '../components/dashboards/RoleSpecificDashboard';

interface FirestoreUserRecord {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  role?: string;
  verified?: boolean;
  isVerified?: boolean;
  country?: string;
  createdAt?: string;
  lastLoginAt?: string;
  bookingCount?: number;
  tempPassword?: string;
  emergencyContact?: string;
  passportNumber?: string;
  bio?: string;
  permissions?: string[];
}

type AdminTab = 'bookings' | 'packages' | 'site_settings' | 'messages' | 'vehicle_inquiries' | 'hotel_inquiries' | 'guide_applications' | 'partners' | 'subscribers' | 'alerts' | 'users' | 'activities';

export const UserDashboardPage: React.FC<{ initialTab?: string; onNavigate: (route: string, param?: string) => void }> = ({ initialTab, onNavigate }) => {
  const {
    user,
    isAuthenticated,
    userRole,
    canAccessAdminPanel,
    activeRoleView,
    setActiveRoleView,
    bookings,
    formatPrice,
    downloadVoucher,
    logout,
    openLogin,
    adminAuth,
    isAdmin,
    updateUserProfile,
    deleteUserAccount,
    deleteUserBooking,
    updateBookingStatus,
    updateBookingDetails,
    deleteBooking,
    adminResetUserPassword,
    adminUpdateUserProfile,
    fetchAllUsersForAdmin,
    fetchAllBookingsForAdmin,
    fetchAllInquiriesForAdmin,
    fetchAllPartnersForAdmin,
    fetchAllSubscribersForAdmin,
    favorites,
    toggleFavorite,
    isFavorite,
    activities,
    fetchAllActivitiesForAdmin,
    contactInquiries,
    partnerRequests,
    newsletterSubscribers,
    alertSettings,
    broadcasts,
    updateAlertSettings,
    sendSubscriberBroadcast,
    notifySubscribersOfPackageChange,
    updatePartnerStatus,
    deletePartnerRequest,
    updateContactStatus,
    deleteContactInquiry,
    deleteSubscriber,
    adminCreateUser,
    adminUpdateUserRole,
    adminVerifyUser,
    adminLogout,
    tours
  } = useAuth();

  // Strict RBAC: Only admin, manager, moderator, or verified admin credentials can access admin panel
  const isUserAdmin = Boolean(
    canAccessAdminPanel ||
    userRole === 'admin' ||
    userRole === 'manager' ||
    userRole === 'moderator' ||
    (isAdmin && (user?.role === 'admin' || adminAuth?.isAuthenticated))
  );

  // Travelie layout active tab
  const [travelieTab, setTravelieTab] = useState<TravelieTab>(
    initialTab === 'site_settings' ? 'site_settings' :
    initialTab === 'packages' ? 'packages' :
    initialTab === 'bookings' ? 'bookings' :
    'dashboard'
  );

  // Admin tabs & state - strictly direct to Firebase Firestore (no local sync)
  const [adminTab, setAdminTab] = useState<AdminTab>('bookings');
  const [adminUsers, setAdminUsers] = useState<FirestoreUserRecord[]>([]);
  const [adminAllBookings, setAdminAllBookings] = useState<Booking[]>([]);
  const [adminActivities, setAdminActivities] = useState<TravelerActivity[]>([]);
  const [adminSearch, setAdminSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState<FirestoreUserRecord | null>(null);
  const [loadingAdminData, setLoadingAdminData] = useState(false);
  const [passwordResetNotice, setPasswordResetNotice] = useState<string | null>(null);

  // Role Management & Add User Modals State
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isRoleMatrixOpen, setIsRoleMatrixOpen] = useState(false);

  // Contact Inquiries Tab State
  const [inquiryFilter, setInquiryFilter] = useState<'ALL' | 'New' | 'Contacted' | 'Closed'>('ALL');
  const [inquirySearch, setInquirySearch] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState<ContactInquiry | null>(null);

  // Partners Tab State
  const [partnerFilter, setPartnerFilter] = useState<string>('ALL');
  const [partnerSearch, setPartnerSearch] = useState('');

  // Subscribers & Broadcast Center Tab State
  const [subscriberSearch, setSubscriberSearch] = useState('');
  const [broadcastSubject, setBroadcastSubject] = useState('New Expeditions & Tours Announcement - Diran Peak Adventure');
  const [broadcastMessage, setBroadcastMessage] = useState('Dear Mountaineer & Explorer,\n\nWe are pleased to announce updated dates and high-altitude logistics for our Karakoram and Himalayan expeditions. Certified Balti mountain guides, satellite inReach communications, and full camp provisions are secured.\n\nExplore our complete itineraries and reserve your spot:\nhttps://diranpeakadventure.com\n\nWarm regards,\nDiran Peak Adventure\nEmail: noreply@diranpeakadverture.com');
  const [broadcastSelectedTour, setBroadcastSelectedTour] = useState('');
  const [sendingBroadcast, setSendingBroadcast] = useState(false);
  const [broadcastFeedback, setBroadcastFeedback] = useState<string | null>(null);

  // Alert Settings Tab State (stored directly in Firestore doc: alertSettings/general)
  const [alertEmailInput, setAlertEmailInput] = useState(alertSettings?.adminAlertEmail || 'info@diranpeakadventure.com');
  const [alertsEmailEnabled, setAlertsEmailEnabled] = useState(alertSettings?.emailAlertsEnabled ?? true);
  const [alertsBooking, setAlertsBooking] = useState(alertSettings?.newBookingAlert ?? true);
  const [alertsContact, setAlertsContact] = useState(alertSettings?.newContactMessageAlert ?? true);
  const [alertsPartner, setAlertsPartner] = useState(alertSettings?.newPartnerRequestAlert ?? true);
  const [alertsReview, setAlertsReview] = useState(alertSettings?.newReviewAlert ?? true);
  const [alertsSubscriber, setAlertsSubscriber] = useState(alertSettings?.newSubscriberAlert ?? true);
  const [alertsAutoNewPackage, setAlertsAutoNewPackage] = useState(alertSettings?.autoNotifySubscribersOnNewPackage ?? true);
  const [alertsAutoPackageUpdate, setAlertsAutoPackageUpdate] = useState(alertSettings?.autoNotifySubscribersOnPackageUpdate ?? true);
  const [savingAlerts, setSavingAlerts] = useState(false);
  const [alertSaveFeedback, setAlertSaveFeedback] = useState<string | null>(null);

  // Synchronize local alert fields if alertSettings changes from Firestore
  useEffect(() => {
    if (alertSettings) {
      setAlertEmailInput(alertSettings.adminAlertEmail || 'info@diranpeakadventure.com');
      setAlertsEmailEnabled(alertSettings.emailAlertsEnabled ?? true);
      setAlertsBooking(alertSettings.newBookingAlert ?? true);
      setAlertsContact(alertSettings.newContactMessageAlert ?? true);
      setAlertsPartner(alertSettings.newPartnerRequestAlert ?? true);
      setAlertsReview(alertSettings.newReviewAlert ?? true);
      setAlertsSubscriber(alertSettings.newSubscriberAlert ?? true);
      setAlertsAutoNewPackage(alertSettings.autoNotifySubscribersOnNewPackage ?? true);
      setAlertsAutoPackageUpdate(alertSettings.autoNotifySubscribersOnPackageUpdate ?? true);
    }
  }, [alertSettings]);

  // Admin Password Management Modal
  const [passwordModalUser, setPasswordModalUser] = useState<FirestoreUserRecord | null>(null);
  const [customPasswordInput, setCustomPasswordInput] = useState('');
  const [resettingPassword, setResettingPassword] = useState(false);
  const [passwordSuccessResult, setPasswordSuccessResult] = useState<{ message: string; tempPass?: string } | null>(null);
  const [passwordErrorResult, setPasswordErrorResult] = useState<string | null>(null);
  const [copiedPassword, setCopiedPassword] = useState(false);

  // Admin Edit Traveler Details Modal
  const [editingTraveler, setEditingTraveler] = useState<FirestoreUserRecord | null>(null);
  const [editTravelerFirst, setEditTravelerFirst] = useState('');
  const [editTravelerLast, setEditTravelerLast] = useState('');
  const [editTravelerPhone, setEditTravelerPhone] = useState('');
  const [editTravelerEmergency, setEditTravelerEmergency] = useState('');
  const [editTravelerPassport, setEditTravelerPassport] = useState('');
  const [editTravelerBio, setEditTravelerBio] = useState('');
  const [savingTraveler, setSavingTraveler] = useState(false);

  // Admin booking edit modal state
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [editTourTitle, setEditTourTitle] = useState('');
  const [editStartDate, setEditStartDate] = useState('');
  const [editEndDate, setEditEndDate] = useState('');
  const [editAdults, setEditAdults] = useState<number>(1);
  const [editChildren, setEditChildren] = useState<number>(0);
  const [editTotalPrice, setEditTotalPrice] = useState<number>(0);
  const [editStatus, setEditStatus] = useState<Booking['status']>('Confirmed');
  const [editSpecialRequests, setEditSpecialRequests] = useState('');
  const [savingBooking, setSavingBooking] = useState(false);
  const [bookingSaveNotice, setBookingSaveNotice] = useState<string | null>(null);

  // Activity filter state
  const [activityFilter, setActivityFilter] = useState<string>('ALL');
  const [activitySearch, setActivitySearch] = useState('');

  // Normal user view state
  const [userTab, setUserTab] = useState<'bookings' | 'favorites' | 'profile'>('bookings');
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [guestLookupCode, setGuestLookupCode] = useState('');
  const [guestLookupSearched, setGuestLookupSearched] = useState(false);

  useEffect(() => {
    if (initialTab === 'profile' || initialTab === 'edit-profile') {
      setUserTab('profile');
      handleOpenEditProfile();
    } else if (initialTab === 'favorites') {
      setUserTab('favorites');
    } else if (initialTab === 'bookings') {
      setUserTab('bookings');
    }
  }, [initialTab, user]);
  const [editFirstName, setEditFirstName] = useState('');
  const [editLastName, setEditLastName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editEmergencyContact, setEditEmergencyContact] = useState('');
  const [editPassportNumber, setEditPassportNumber] = useState('');
  const [editBio, setEditBio] = useState('');
  const [savingProfile, setSavingProfile] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Load admin data directly from Firebase Firestore (NO local mock data)
  const loadAdminData = async () => {
    if (!isUserAdmin) return;
    setLoadingAdminData(true);
    try {
      const [fetchedUsers, fetchedBookings, fetchedActivities] = await Promise.all([
        fetchAllUsersForAdmin(),
        fetchAllBookingsForAdmin(),
        fetchAllActivitiesForAdmin()
      ]);

      const userList: FirestoreUserRecord[] = [...fetchedUsers];

      // Ensure current logged-in admin is present in the list
      if (user && !userList.some(u => u.id === user.id || (u.email && u.email.toLowerCase() === user.email.toLowerCase()))) {
        userList.unshift({
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          role: 'admin',
          createdAt: user.createdAt || new Date().toISOString()
        });
      }

      // Calculate number of bookings for each user strictly from Firestore
      const usersWithBookings = userList.map((u) => {
        const userBookingCount = fetchedBookings.filter(
          (b) => b.userId === u.id || (b.customerEmail && b.customerEmail.toLowerCase() === u.email?.toLowerCase())
        ).length;
        return {
          ...u,
          role: u.role || 'traveler',
          verified: u.verified ?? u.isVerified ?? true,
          bookingCount: userBookingCount
        };
      });

      setAdminUsers(usersWithBookings);
      setAdminAllBookings(fetchedBookings);
      setAdminActivities(fetchedActivities.length > 0 ? fetchedActivities : activities);
    } catch (err) {
      console.error('Error loading admin directory data from Firestore:', err);
    } finally {
      setLoadingAdminData(false);
    }
  };

  useEffect(() => {
    if (isUserAdmin) {
      loadAdminData();
    }
  }, [isUserAdmin]);

  // Real-time synchronization of adminAllBookings with bookings from AuthContext
  useEffect(() => {
    if (isUserAdmin && bookings.length > 0) {
      setAdminAllBookings(prev => {
        const map = new Map<string, Booking>();
        bookings.forEach(b => map.set(b.id, b));
        prev.forEach(b => {
          if (!map.has(b.id)) map.set(b.id, b);
        });
        return Array.from(map.values());
      });
    }
  }, [bookings, isUserAdmin]);

  // Admin: Update booking status directly in Firestore
  const handleAdminUpdateStatus = async (bookingId: string, newStatus: Booking['status']) => {
    await updateBookingStatus(bookingId, newStatus);
    setAdminAllBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: newStatus } : b));
    setPasswordResetNotice(`Booking status updated to "${newStatus}" and saved in Firestore.`);
    setTimeout(() => setPasswordResetNotice(null), 4000);
  };

  // Admin: Delete booking directly in Firestore
  const handleAdminDeleteBooking = async (bookingId: string) => {
    if (!window.confirm('Are you sure you want to delete this booking from Firestore?')) return;
    deleteBooking(bookingId);
    setAdminAllBookings(prev => prev.filter(b => b.id !== bookingId));
    setPasswordResetNotice('Booking deleted from Firestore.');
    setTimeout(() => setPasswordResetNotice(null), 4000);
  };

  // Admin: Role assignment & Verification handlers
  const handleUpdateRole = async (userId: string, newRole: string) => {
    try {
      const res = await adminUpdateUserRole(userId, newRole);
      if (res.success) {
        setAdminUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
        if (selectedUser && selectedUser.id === userId) {
          setSelectedUser(prev => prev ? { ...prev, role: newRole } : null);
        }
        setPasswordResetNotice(`Role updated to "${getRoleConfig(newRole).label}" in Firestore.`);
        setTimeout(() => setPasswordResetNotice(null), 4000);
      } else {
        alert(res.error || 'Failed to update user role');
      }
    } catch (err: any) {
      alert(err?.message || 'Error updating user role');
    }
  };

  const handleToggleVerification = async (userId: string, currentVerified: boolean) => {
    try {
      const newStatus = !currentVerified;
      const res = await adminVerifyUser(userId, newStatus);
      if (res.success) {
        setAdminUsers(prev => prev.map(u => u.id === userId ? { ...u, verified: newStatus, isVerified: newStatus } : u));
        if (selectedUser && selectedUser.id === userId) {
          setSelectedUser(prev => prev ? { ...prev, verified: newStatus, isVerified: newStatus } : null);
        }
        setPasswordResetNotice(newStatus ? 'User credentials marked as Verified in Firestore.' : 'User verification status revoked.');
        setTimeout(() => setPasswordResetNotice(null), 4000);
      } else {
        alert(res.error || 'Failed to update verification status');
      }
    } catch (err: any) {
      alert(err?.message || 'Error updating verification status');
    }
  };

  // Admin: Contact Inquiry handlers
  const handleUpdateInquiryStatus = async (id: string, status: ContactInquiry['status']) => {
    updateContactStatus(id, status);
    setPasswordResetNotice(`Contact message marked as "${status}" in Firestore.`);
    setTimeout(() => setPasswordResetNotice(null), 4000);
  };

  const handleDeleteInquiry = async (id: string) => {
    if (!window.confirm('Delete this message from Firestore?')) return;
    deleteContactInquiry(id);
    setPasswordResetNotice('Message deleted from Firestore.');
    setTimeout(() => setPasswordResetNotice(null), 4000);
  };

  // Admin: Partner Request handlers
  const handleUpdatePartnerStatus = async (id: string, status: PartnerRequest['status']) => {
    await updatePartnerStatus(id, status);
    setPasswordResetNotice(`Partner application marked as "${status}" in Firestore.`);
    setTimeout(() => setPasswordResetNotice(null), 4000);
  };

  const handleDeletePartner = async (id: string) => {
    if (!window.confirm('Delete this partner application from Firestore?')) return;
    await deletePartnerRequest(id);
    setPasswordResetNotice('Partner application deleted from Firestore.');
    setTimeout(() => setPasswordResetNotice(null), 4000);
  };

  // Admin: Subscriber & Broadcast handlers
  const handleDeleteSubscriber = async (id: string) => {
    if (!window.confirm('Remove this subscriber from Firestore?')) return;
    await deleteSubscriber(id);
    setPasswordResetNotice('Subscriber removed from Firestore.');
    setTimeout(() => setPasswordResetNotice(null), 4000);
  };

  const handleSelectTourForBroadcast = (tourId: string) => {
    setBroadcastSelectedTour(tourId);
    const tour = TOURS_DATA.find(t => t.id === tourId || t.slug === tourId);
    if (tour) {
      setBroadcastSubject(`New Expedition & 2027 Departures: ${tour.title} - Diran Peak Adventure`);
      setBroadcastMessage(`Dear Mountaineer & Explorer,\n\nWe are pleased to present complete details and confirmed 2027 departure schedules for:\n"${tour.title}".\n\n• Max Altitude: ${tour.maxAltitude}\n• Duration: ${tour.duration}\n• Starting Price: $${tour.price} USD\n• Difficulty: ${tour.difficulty}\n\nTop Highlights:\n${tour.highlights.map(h => `• ${h}`).join('\n')}\n\nFull GPS itinerary and booking reservations are live at:\nhttps://diranpeakadventure.com/tour/${tour.slug}\n\nWarm regards,\nExpedition Logistics Desk\nDiran Peak Adventure\nEmail: noreply@diranpeakadverture.com`);
    }
  };

  const handleSendBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastSubject.trim() || !broadcastMessage.trim()) return;
    setSendingBroadcast(true);
    setBroadcastFeedback(null);

    const tour = TOURS_DATA.find(t => t.id === broadcastSelectedTour || t.slug === broadcastSelectedTour);
    const res = await sendSubscriberBroadcast(broadcastSubject, broadcastMessage, tour?.title);
    setSendingBroadcast(false);

    if (res.success) {
      setBroadcastFeedback(`Email update successfully dispatched to ${res.count} subscribers from noreply@diranpeakadverture.com!`);
      setTimeout(() => setBroadcastFeedback(null), 6000);
    } else {
      setBroadcastFeedback(res.error || 'Failed to dispatch broadcast.');
    }
  };

  const handleQuickNotifyPackageChange = async (action: 'added' | 'updated', tourTitle: string, tourId: string) => {
    setSendingBroadcast(true);
    await notifySubscribersOfPackageChange(action, tourTitle, tourId);
    setSendingBroadcast(false);
    setBroadcastFeedback(`Dispatched automated update for "${tourTitle}" to subscribers from noreply@diranpeakadverture.com.`);
    setTimeout(() => setBroadcastFeedback(null), 6000);
  };

  // Admin: Save Alert Settings directly to Firestore
  const handleSaveAlertSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingAlerts(true);
    setAlertSaveFeedback(null);

    await updateAlertSettings({
      adminAlertEmail: alertEmailInput.trim(),
      emailAlertsEnabled: alertsEmailEnabled,
      newBookingAlert: alertsBooking,
      newContactMessageAlert: alertsContact,
      newPartnerRequestAlert: alertsPartner,
      newReviewAlert: alertsReview,
      newSubscriberAlert: alertsSubscriber,
      autoNotifySubscribersOnNewPackage: alertsAutoNewPackage,
      autoNotifySubscribersOnPackageUpdate: alertsAutoPackageUpdate
    });

    setSavingAlerts(false);
    setAlertSaveFeedback('Alert settings successfully updated directly in Firebase Firestore.');
    setTimeout(() => setAlertSaveFeedback(null), 5000);
  };

  // Admin: Open booking edit modal
  const handleOpenEditBooking = (b: Booking) => {
    setEditingBooking(b);
    setEditTourTitle(b.tourTitle || '');
    setEditStartDate(b.startDate || '');
    setEditEndDate(b.endDate || '');
    setEditAdults(b.adults || 1);
    setEditChildren(b.children || 0);
    setEditTotalPrice(b.totalPrice || 0);
    setEditStatus(b.status || 'Confirmed');
    setEditSpecialRequests(b.specialRequests || '');
    setBookingSaveNotice(null);
  };

  // Admin: Save updated booking details to Firestore
  const handleSaveBookingEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBooking) return;
    setSavingBooking(true);
    setBookingSaveNotice(null);

    const updates: Partial<Booking> = {
      tourTitle: editTourTitle,
      startDate: editStartDate,
      endDate: editEndDate,
      adults: Number(editAdults),
      children: Number(editChildren),
      totalPrice: Number(editTotalPrice),
      status: editStatus,
      specialRequests: editSpecialRequests
    };

    const res = await updateBookingDetails(editingBooking.id, updates);
    setSavingBooking(false);
    if (res.success) {
      setAdminAllBookings(prev => prev.map(b => b.id === editingBooking.id ? { ...b, ...updates } : b));
      setPasswordResetNotice(`Booking ${editingBooking.bookingCode} was successfully updated and saved in Firestore.`);
      setEditingBooking(null);
      setTimeout(() => setPasswordResetNotice(null), 5000);
    } else {
      setBookingSaveNotice(res.error || 'Failed to update booking. Please try again.');
    }
  };

  // Admin: Open Password Modal
  const handleOpenPasswordModal = (u: FirestoreUserRecord) => {
    setPasswordModalUser(u);
    setCustomPasswordInput('Pass@' + Math.floor(100000 + Math.random() * 900000));
    setPasswordSuccessResult(null);
    setPasswordErrorResult(null);
    setCopiedPassword(false);
  };

  // Admin: Execute Password Reset or Direct Change
  const handleExecutePasswordReset = async (directPassword?: string) => {
    if (!passwordModalUser) return;
    setResettingPassword(true);
    setPasswordSuccessResult(null);
    setPasswordErrorResult(null);

    const res = await adminResetUserPassword(passwordModalUser.email, directPassword, passwordModalUser.id);
    setResettingPassword(false);

    if (res.success) {
      setPasswordSuccessResult({
        message: res.message || 'Password successfully updated in Firestore and account registry.',
        tempPass: res.tempPassword
      });
      // Update local state if user document had temp password
      setAdminUsers(prev => prev.map(u => u.id === passwordModalUser.id ? { ...u, tempPassword: res.tempPassword } : u));
      if (selectedUser && selectedUser.id === passwordModalUser.id) {
        setSelectedUser(prev => prev ? { ...prev, tempPassword: res.tempPassword } : null);
      }
    } else {
      setPasswordErrorResult(res.error || 'Failed to reset password.');
    }
  };

  // Admin: Open Traveler Profile Edit Modal
  const handleOpenEditTraveler = (u: FirestoreUserRecord) => {
    setEditingTraveler(u);
    setEditTravelerFirst(u.firstName || '');
    setEditTravelerLast(u.lastName || '');
    setEditTravelerPhone(u.phone || '');
    setEditTravelerEmergency(u.emergencyContact || '');
    setEditTravelerPassport(u.passportNumber || '');
    setEditTravelerBio(u.bio || '');
  };

  // Admin: Save Traveler Profile edits to Firestore
  const handleSaveTravelerEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTraveler) return;
    setSavingTraveler(true);

    const updates: Partial<FirestoreUserRecord> = {
      firstName: editTravelerFirst,
      lastName: editTravelerLast,
      phone: editTravelerPhone,
      emergencyContact: editTravelerEmergency,
      passportNumber: editTravelerPassport,
      bio: editTravelerBio
    };

    const res = await adminUpdateUserProfile(editingTraveler.id, updates as any);
    setSavingTraveler(false);

    if (res.success) {
      setAdminUsers(prev => prev.map(u => u.id === editingTraveler.id ? { ...u, ...updates } : u));
      if (selectedUser && selectedUser.id === editingTraveler.id) {
        setSelectedUser(prev => prev ? { ...prev, ...updates } : null);
      }
      setPasswordResetNotice(`Traveler profile for ${editingTraveler.email} was successfully saved in Firestore.`);
      setEditingTraveler(null);
      setTimeout(() => setPasswordResetNotice(null), 5000);
    }
  };

  // Normal User: Open profile edit modal
  const handleOpenEditProfile = () => {
    if (!user) return;
    setEditFirstName(user.firstName || '');
    setEditLastName(user.lastName || '');
    setEditPhone(user.phone || '');
    setEditEmergencyContact(user.emergencyContact || '');
    setEditPassportNumber(user.passportNumber || '');
    setEditBio(user.bio || '');
    setSaveSuccess(false);
    setEditProfileOpen(true);
  };

  // Normal User: Save profile edits to Firestore
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);
    const res = await updateUserProfile({
      firstName: editFirstName,
      lastName: editLastName,
      phone: editPhone,
      emergencyContact: editEmergencyContact,
      passportNumber: editPassportNumber,
      bio: editBio
    });
    setSavingProfile(false);
    if (res.success) {
      setSaveSuccess(true);
      setTimeout(() => {
        setEditProfileOpen(false);
        setSaveSuccess(false);
      }, 900);
    }
  };

  const handleDeleteMyAccount = async () => {
    await deleteUserAccount();
    setDeleteConfirmOpen(false);
  };

  const renderEditProfileModal = () => {
    if (!editProfileOpen) return null;
    return (
      <div className="fixed inset-0 z-[1200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
        <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <h3 className="font-heading font-bold text-lg text-slate-900">Edit My Travel Profile</h3>
            <button onClick={() => setEditProfileOpen(false)} className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer">
              <X className="w-5 h-5" />
            </button>
          </div>

          {saveSuccess && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Profile updated and synchronized with Firebase!</span>
            </div>
          )}

          <form onSubmit={handleSaveProfile} className="space-y-3.5">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">First Name</label>
                <input
                  type="text"
                  value={editFirstName}
                  onChange={(e) => setEditFirstName(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#5191fa]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Last Name</label>
                <input
                  type="text"
                  value={editLastName}
                  onChange={(e) => setEditLastName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#5191fa]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
              <input
                type="text"
                value={editPhone}
                onChange={(e) => setEditPhone(e.target.value)}
                placeholder="+92 345 6412992"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#5191fa]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Emergency Contact (Name &amp; Phone)</label>
              <input
                type="text"
                value={editEmergencyContact}
                onChange={(e) => setEditEmergencyContact(e.target.value)}
                placeholder="e.g. John Doe (+1 555 123 4567)"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#5191fa]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Passport / National ID</label>
              <input
                type="text"
                value={editPassportNumber}
                onChange={(e) => setEditPassportNumber(e.target.value)}
                placeholder="e.g. PA1234567"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#5191fa]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Bio / Climbing Experience</label>
              <textarea
                rows={3}
                value={editBio}
                onChange={(e) => setEditBio(e.target.value)}
                placeholder="Tell us about previous treks, summits or dietary preferences..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#5191fa]"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setEditProfileOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={savingProfile}
                className="px-5 py-2 bg-[#5191fa] hover:bg-[#3d7be3] text-white text-xs font-semibold rounded-xl cursor-pointer"
              >
                {savingProfile ? 'Saving...' : 'Save Profile'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // =========================================================================
  // ADMIN DASHBOARD VIEW (Shown when user has admin role or adminAuth session)
  // =========================================================================
  if (isUserAdmin) {
    const filteredUsers = adminUsers.filter(u => {
      const q = adminSearch.toLowerCase().trim();
      if (!q) return true;
      const fullName = `${u.firstName || ''} ${u.lastName || ''}`.toLowerCase();
      const email = (u.email || '').toLowerCase();
      const uid = (u.id || '').toLowerCase();
      return fullName.includes(q) || email.includes(q) || uid.includes(q);
    });

    const contactFormInquiries = contactInquiries.filter(i => !i.type || i.type === 'contact');
    const vehicleFleetInquiries = contactInquiries.filter(i => i.type === 'vehicle');
    const hotelReservationInquiries = contactInquiries.filter(i => i.type === 'hotel');
    const guidePorterApplications = contactInquiries.filter(i => i.type === 'guide_porter' || (i as any).category === 'Mountain Guides & Porters');
    const b2bPartnerRequests = partnerRequests.filter(p => p.category !== 'Mountain Guides & Porters');

    const selectedUserBookings = selectedUser
      ? adminAllBookings.filter(
          b => b.userId === selectedUser.id || (b.customerEmail && b.customerEmail.toLowerCase() === selectedUser.email?.toLowerCase())
        )
      : [];

    const liveActivitiesList = adminActivities.length > 0 ? adminActivities : activities;

    const filteredActivities = liveActivitiesList.filter(a => {
      if (activityFilter !== 'ALL') {
        if (activityFilter === 'BOOKINGS' && !a.action.includes('BOOKING')) return false;
        if (activityFilter === 'FAVORITES' && !a.action.includes('FAVORITE')) return false;
        if (activityFilter === 'LOGINS' && !a.action.includes('LOGIN') && !a.action.includes('LOGOUT')) return false;
        if (activityFilter === 'PASSWORDS' && !a.action.includes('PASSWORD')) return false;
        if (activityFilter === 'PROFILES' && !a.action.includes('PROFILE')) return false;
      }
      if (activitySearch.trim()) {
        const q = activitySearch.toLowerCase().trim();
        const str = `${a.userName} ${a.userEmail} ${a.details} ${a.action}`.toLowerCase();
        return str.includes(q);
      }
      return true;
    });

    const handleAdminLogout = async () => {
      await logout();
      adminLogout();
      onNavigate('home');
    };

    return (
      <div className="flex bg-[#f7f8fa] min-h-screen text-slate-800 font-sans">
        {/* Travelie Sidebar matching attached image 3112800 */}
        <TravelieSidebar
          currentTab={travelieTab}
          onTabChange={(t) => setTravelieTab(t)}
          onLogout={handleAdminLogout}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
          {/* Travelie Top Bar matching attached image */}
          <TravelieTopBar
            currentTab={travelieTab}
            onSearch={(q) => setAdminSearch(q)}
            onLogout={handleAdminLogout}
          />

          {/* Scrollable View Container */}
          <main className="p-6 sm:p-8 flex-1 overflow-y-auto space-y-6">
            {passwordResetNotice && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center justify-between shadow-xs animate-in fade-in">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{passwordResetNotice}</span>
                </div>
                <button onClick={() => setPasswordResetNotice(null)} className="text-emerald-700 hover:text-emerald-900 cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* TAB: DASHBOARD (Matching image 3112800) */}
            {travelieTab === 'dashboard' && (
              <TravelieDashboardView
                onSelectTour={(t) => onNavigate('detail', t.id)}
                onOpenAddBooking={() => {
                  setEditingBooking({
                    id: 'new-bkg',
                    bookingCode: `DPA-${Date.now().toString().slice(-5)}`,
                    userId: user?.id || 'admin',
                    customerName: '',
                    customerEmail: '',
                    customerPhone: '',
                    tourId: tours[0]?.id || '',
                    tourTitle: tours[0]?.title || '',
                    startDate: '10 July 2028',
                    endDate: '24 July 2028',
                    adults: 2,
                    children: 0,
                    totalPrice: 4200,
                    status: 'Confirmed',
                    bookingDate: new Date().toLocaleDateString()
                  } as any);
                }}
                onEditBooking={handleOpenEditBooking}
              />
            )}

            {/* TAB: PACKAGES (Matching image 3112803) */}
            {travelieTab === 'packages' && (
              <div className="space-y-8">
                <TraveliePackagesView
                  onOpenAddPackage={() => {
                    const el = document.getElementById('admin-tour-packages-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  onEditPackage={(t) => {
                    const el = document.getElementById('admin-tour-packages-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  onSelectTour={(t) => onNavigate('detail', t.id)}
                />
                <div id="admin-tour-packages-section" className="pt-6 border-t border-slate-200">
                  <AdminTourPackagesSection />
                </div>
              </div>
            )}

            {/* TAB: BOOKINGS (Matching image 3112802) */}
            {travelieTab === 'bookings' && (
              <div className="space-y-6">
                <TravelieBookingsView
                  onOpenAddBooking={() => {
                    setEditingBooking({
                      id: 'new-bkg',
                      bookingCode: `DPA-${Date.now().toString().slice(-5)}`,
                      userId: user?.id || 'admin',
                      customerName: '',
                      customerEmail: '',
                      customerPhone: '',
                      tourId: tours[0]?.id || '',
                      tourTitle: tours[0]?.title || '',
                      startDate: '10 July 2028',
                      endDate: '24 July 2028',
                      adults: 2,
                      children: 0,
                      totalPrice: 4200,
                      status: 'Confirmed',
                      bookingDate: new Date().toLocaleDateString()
                    } as any);
                  }}
                  onEditBooking={handleOpenEditBooking}
                  onDeleteBooking={async (b) => {
                    if (window.confirm(`Are you sure you want to delete booking ${b.bookingCode}?`)) {
                      await deleteBooking(b.id);
                      setAdminAllBookings(prev => prev.filter(x => x.id !== b.id));
                    }
                  }}
                />
              </div>
            )}

            {/* TAB: CALENDAR (Matching image 3112804) */}
            {travelieTab === 'calendar' && (
              <TravelieCalendarView />
            )}

            {/* TAB: TRAVELERS (Matching image 3112804) */}
            {travelieTab === 'travelers' && (
              <div className="space-y-8">
                <TravelieTravelersView
                  onOpenAddUser={() => setIsAddUserModalOpen(true)}
                  onOpenRoleMatrix={() => setIsRoleMatrixOpen(true)}
                  onResetPassword={handleOpenPasswordModal}
                  onEditUser={handleOpenEditTraveler}
                />
              </div>
            )}

            {/* TAB: GUIDES (Matching image 3112804) */}
            {travelieTab === 'guides' && (
              <TravelieGuidesView />
            )}

            {/* TAB: GALLERY (Matching image 3112804) */}
            {travelieTab === 'gallery' && (
              <TravelieGalleryView />
            )}

            {/* TAB: MESSAGES (Matching image 3112805) */}
            {travelieTab === 'messages' && (
              <div className="space-y-8">
                <TravelieMessagesView />
                <div className="pt-6 border-t border-slate-200">
                  <AdminInquirySection
                    type="contact"
                    title="All Inbound Contact Form Messages"
                    subtitle="Direct inquiries submitted through the contact page"
                    inquiries={contactFormInquiries}
                  />
                </div>
              </div>
            )}

            {/* TAB: DEALS (Matching image 3112805) */}
            {travelieTab === 'deals' && (
              <TravelieDealsView />
            )}

            {/* TAB: FEEDBACK (Matching image 3112805) */}
            {travelieTab === 'feedback' && (
              <TravelieFeedbackView />
            )}

            {/* TAB: WEBSITE CMS */}
            {travelieTab === 'site_settings' && (
              <AdminWebsiteSettingsSection />
            )}

          {/* TAB 1: USERS DIRECTORY */}
          {adminTab === 'users' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-heading font-bold text-[#1a2b48] flex items-center gap-2">
                    <User className="w-5 h-5 text-[#5191fa]" />
                    <span>Firestore Users &amp; Role Management ({adminUsers.length})</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Manage platform roles (Admin, Manager, Moderator, Traveler, Climber, Fleet/Hotel Partner, Guide), verify accounts, and add users manually.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsRoleMatrixOpen(true)}
                    className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-200"
                    title="View permissions breakdown for all 8 platform roles"
                  >
                    <Shield className="w-3.5 h-3.5 text-amber-600" />
                    <span>Role &amp; Permissions Matrix</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsAddUserModalOpen(true)}
                    className="px-3.5 py-2 bg-[#5191fa] hover:bg-[#3875dc] text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                    title="Manually create a new platform user with defined role"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add User Manually</span>
                  </button>

                  {/* Search Bar */}
                  <div className="relative w-full sm:w-64">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={adminSearch}
                      onChange={(e) => setAdminSearch(e.target.value)}
                      placeholder="Search email, name or UID..."
                      className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#5191fa] focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              {loadingAdminData ? (
                <div className="py-16 text-center">
                  <div className="w-8 h-8 border-3 border-[#5191fa]/20 border-t-[#5191fa] rounded-full animate-spin mx-auto mb-3" />
                  <p className="text-xs text-slate-500">Loading users from Cloud Firestore...</p>
                </div>
              ) : filteredUsers.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border border-slate-200 rounded-2xl overflow-hidden">
                    <thead className="bg-slate-50 text-slate-600 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                      <tr>
                        <th className="py-3.5 px-4">User Account</th>
                        <th className="py-3.5 px-4">System Role</th>
                        <th className="py-3.5 px-4">Verification</th>
                        <th className="py-3.5 px-4">Firebase Email</th>
                        <th className="py-3.5 px-4">Account Created</th>
                        <th className="py-3.5 px-4 text-center">Trip Bookings</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredUsers.map((u) => {
                        const isSelected = selectedUser?.id === u.id;
                        const roleCfg = getRoleConfig(u.role);
                        const isVerified = u.verified !== false && u.isVerified !== false;
                        const formattedDate = u.createdAt
                          ? new Date(u.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })
                          : 'March 2027';

                        return (
                          <tr
                            key={u.id}
                            onClick={() => setSelectedUser(u)}
                            className={`transition-colors cursor-pointer ${
                              isSelected ? 'bg-blue-50/80' : 'hover:bg-slate-50/80'
                            }`}
                          >
                            <td className="py-3.5 px-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#1a2b48] to-[#5191fa] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                                  {(u.firstName || u.email)[0].toUpperCase()}
                                </div>
                                <div>
                                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                                    <span>
                                      {u.firstName || 'Traveler'} {u.lastName || ''}
                                    </span>
                                  </div>
                                  <div className="text-[11px] text-slate-400 font-mono">
                                    UID: {u.id.substring(0, 14)}...
                                  </div>
                                </div>
                              </div>
                            </td>

                            {/* System Role column with badge & dropdown */}
                            <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                              <div className="flex flex-col gap-1.5">
                                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border w-fit ${roleCfg.badgeBg} ${roleCfg.badgeText} ${roleCfg.borderColor}`}>
                                  <Shield className="w-3 h-3 shrink-0" />
                                  <span>{roleCfg.label}</span>
                                </span>
                                <select
                                  value={u.role || 'traveler'}
                                  onChange={(e) => handleUpdateRole(u.id, e.target.value)}
                                  className="text-[11px] font-semibold bg-white border border-slate-200 rounded-lg px-2 py-0.5 text-slate-700 focus:outline-none focus:border-[#5191fa] cursor-pointer"
                                  title="Change role for this user"
                                >
                                  {PLATFORM_ROLES.map((r) => (
                                    <option key={r.id} value={r.id}>
                                      {r.shortTitle} - {r.category}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </td>

                            {/* Verification column */}
                            <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                              <div className="flex items-center gap-2">
                                {isVerified ? (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                                    <BadgeCheck className="w-3 h-3 text-emerald-600" />
                                    <span>Verified</span>
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                                    <ShieldAlert className="w-3 h-3 text-amber-600" />
                                    <span>Unverified</span>
                                  </span>
                                )}
                                <button
                                  type="button"
                                  onClick={() => handleToggleVerification(u.id, isVerified)}
                                  className={`px-2 py-0.5 text-[10px] font-bold rounded-lg transition-colors cursor-pointer border ${
                                    isVerified
                                      ? 'bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-700 border-slate-200'
                                      : 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600 shadow-2xs'
                                  }`}
                                  title={isVerified ? 'Click to revoke verification' : 'Click to verify user credentials'}
                                >
                                  {isVerified ? 'Revoke' : 'Verify'}
                                </button>
                              </div>
                            </td>

                            <td className="py-3.5 px-4">
                              <div className="flex items-center gap-1 text-slate-700">
                                <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                <span className="font-medium">{u.email}</span>
                              </div>
                            </td>

                            <td className="py-3.5 px-4 text-slate-500">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                <span>{formattedDate}</span>
                              </div>
                            </td>

                            <td className="py-3.5 px-4 text-center">
                              <span
                                className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                                  (u.bookingCount || 0) > 0
                                    ? 'bg-blue-100 text-[#5191fa]'
                                    : 'bg-slate-100 text-slate-500'
                                }`}
                              >
                                {u.bookingCount || 0} trip{(u.bookingCount || 0) === 1 ? '' : 's'}
                              </span>
                            </td>

                            <td className="py-3.5 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
                                <button
                                  type="button"
                                  onClick={() => handleOpenPasswordModal(u)}
                                  className="px-2.5 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-semibold rounded-lg flex items-center gap-1 transition-colors cursor-pointer border border-amber-200"
                                  title={`Reset / change password for ${u.email}`}
                                >
                                  <KeyRound className="w-3.5 h-3.5 text-amber-700" />
                                  <span>Reset Password</span>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => setSelectedUser(u)}
                                  className="px-2.5 py-1.5 bg-[#5191fa] hover:bg-[#3875dc] text-white text-xs font-semibold rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                                  title="View User Bookings & Details"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                  <span>Details</span>
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="py-12 text-center text-slate-500 text-xs">
                  No users found in Firestore matching &quot;{adminSearch}&quot;.
                </div>
              )}
            </div>
          )}

          {/* TAB 2: ALL BOOKINGS DIRECTORY */}
          {adminTab === 'bookings' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-heading font-bold text-[#1a2b48] flex items-center gap-2">
                    <CalendarCheck className="w-5 h-5 text-[#5191fa]" />
                    <span>All Expedition Bookings ({adminAllBookings.length})</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Directly Accept, Decline, Confirm, Complete, or Edit every trip booking in Firestore.
                  </p>
                </div>
              </div>

              {adminAllBookings.length > 0 ? (
                <div className="space-y-4">
                  {adminAllBookings.map((b) => (
                    <div
                      key={b.id}
                      className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:border-[#5191fa] transition-colors"
                    >
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-3">
                        <div>
                          <div className="flex flex-wrap items-center gap-2 mb-1.5">
                            <span className="font-mono text-xs font-bold text-[#5191fa] bg-blue-50 px-2 py-0.5 rounded">
                              {b.bookingCode}
                            </span>
                            <span
                              className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                                b.status === 'Confirmed' || (b.status as any) === 'Accepted'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : b.status === 'Cancelled' || (b.status as any) === 'Declined'
                                  ? 'bg-rose-100 text-rose-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              {b.status}
                            </span>
                            {(b.isGuest || !b.userId || b.userId.startsWith('guest')) && (
                              <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                                Guest Reservation
                              </span>
                            )}
                            <span className="text-xs text-slate-400">· {b.bookingDate}</span>
                          </div>

                          <h4 className="font-heading font-bold text-slate-900 text-base">
                            {b.tourTitle}
                          </h4>

                          <div className="text-xs text-slate-600 mt-1 flex flex-wrap items-center gap-3">
                            <span><strong>Traveler:</strong> {b.customerName} ({b.customerEmail})</span>
                            {b.customerPhone && (
                              <>
                                <span>·</span>
                                <a
                                  href={`https://wa.me/${b.customerPhone.replace(/[^0-9]/g, '')}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center gap-1 text-emerald-600 hover:underline font-semibold"
                                  title="Chat with traveler on WhatsApp"
                                >
                                  <Phone className="w-3 h-3" />
                                  <span>{b.customerPhone}</span>
                                </a>
                              </>
                            )}
                            <span>·</span>
                            <span><strong>Dates:</strong> {b.startDate} to {b.endDate}</span>
                            <span>·</span>
                            <span><strong>Party:</strong> {b.adults} Adults {b.children ? `· ${b.children} Children` : ''}</span>
                          </div>

                          {b.specialRequests && (
                            <div className="text-xs text-slate-600 mt-2 p-2 bg-slate-50 rounded-lg border border-slate-100">
                              <strong>Special Requests:</strong> {b.specialRequests}
                            </div>
                          )}
                        </div>

                        <div className="text-left md:text-right shrink-0">
                          <div className="text-[10px] text-slate-400 uppercase font-bold">Total Price</div>
                          <div className="text-lg font-black text-[#1a2b48]">
                            {formatPrice(b.totalPrice)}
                          </div>
                        </div>
                      </div>

                      {/* Admin Booking Action Buttons */}
                      <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleAdminUpdateStatus(b.id, 'Confirmed')}
                            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Accept / Confirm</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleAdminUpdateStatus(b.id, 'Cancelled')}
                            className="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Decline</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleAdminUpdateStatus(b.id, 'Completed')}
                            className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>Complete</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleAdminUpdateStatus(b.id, 'Pending Verification')}
                            className="px-2.5 py-1 bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            <Clock className="w-3.5 h-3.5" />
                            <span>Pending</span>
                          </button>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => downloadVoucher(b)}
                            className="px-3 py-1 bg-[#1a2b48] hover:bg-[#283d63] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                            title="Download official PDF expedition voucher"
                          >
                            <FileDown className="w-3.5 h-3.5 text-[#5191fa]" />
                            <span>PDF Voucher</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleOpenEditBooking(b)}
                            className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5 text-slate-600" />
                            <span>Edit Details</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleAdminDeleteBooking(b.id)}
                            className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold rounded-lg flex items-center gap-1 transition-colors cursor-pointer border border-rose-200"
                            title="Delete booking from Firestore"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center text-slate-500 text-xs">
                  No bookings found in Cloud Firestore.
                </div>
              )}
            </div>
          )}

          {/* TAB: TOUR PACKAGES & FEATURED GROUPS */}
          {adminTab === 'packages' && (
            <AdminTourPackagesSection
              onNavigateToDetail={(tour) => onNavigate('tour-detail', tour.slug || tour.id)}
            />
          )}

          {/* TAB: WEBSITE CONTENT & SEO CMS */}
          {adminTab === 'site_settings' && (
            <AdminWebsiteSettingsSection />
          )}

          {/* TAB: CONTACT MESSAGES */}
          {adminTab === 'messages' && (
            <AdminInquirySection
              type="contact"
              title="Contact Messages &amp; Traveler Queries"
              subtitle="Direct messages, route inquiries, and questions submitted through the Contact Basecamp form."
              inquiries={contactFormInquiries}
            />
          )}

          {/* TAB: VEHICLE FLEET INQUIRIES */}
          {adminTab === 'vehicle_inquiries' && (
            <AdminInquirySection
              type="vehicle"
              title="4x4 Jeep &amp; Transport Fleet Charter Inquiries"
              subtitle="Charter inquiries for 4x4 Land Cruisers, Toyota Prado, Hilux Revo, Hiace Grand Cabin, and Coaster Saloon."
              inquiries={vehicleFleetInquiries}
            />
          )}

          {/* TAB: HOTEL ROOM RESERVATIONS */}
          {adminTab === 'hotel_inquiries' && (
            <AdminInquirySection
              type="hotel"
              title="Hotel &amp; Resort Room Reservations"
              subtitle="Hospitality bookings and room allocations submitted for hotels and boutique resorts in Gilgit-Baltistan."
              inquiries={hotelReservationInquiries}
            />
          )}

          {/* TAB: GUIDE & PORTER APPLICATIONS */}
          {adminTab === 'guide_applications' && (
            <AdminInquirySection
              type="guide_porter"
              title="Mountain Guide &amp; Alpine Porter Applications"
              subtitle="Field staff applications submitted by licensed alpine mountain guides, High-Altitude Porters (HAP), and expedition cooks."
              inquiries={guidePorterApplications}
            />
          )}

          {/* TAB: PARTNERS */}
          {adminTab === 'partners' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-heading font-bold text-[#1a2b48] flex items-center gap-2">
                    <Handshake className="w-5 h-5 text-amber-500" />
                    <span>B2B Inquiries &amp; Commercial Partner Network ({partnerRequests.length})</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Official partnership submissions from B2B travel agencies, overseas tour outfitters, vehicle fleet operators, and hotel vendors.
                  </p>
                </div>

                {/* Search Bar */}
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={partnerSearch}
                    onChange={(e) => setPartnerSearch(e.target.value)}
                    placeholder="Search company, contact, city..."
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#5191fa] focus:bg-white"
                  />
                </div>
              </div>

              {/* Category Filter Tabs */}
              <div className="flex flex-wrap items-center gap-2 mb-6 pb-4 border-b border-slate-100">
                <span className="text-[11px] font-bold text-slate-400 uppercase mr-1">Category:</span>
                {[
                  { id: 'ALL', label: 'All Partners' },
                  { id: 'agency', label: 'B2B Travel Agencies' },
                  { id: 'hotel', label: 'Hotels & Resorts' },
                  { id: 'vehicle', label: '4x4 Vehicles & Transport' },
                  { id: 'gear', label: 'Gear & Equipment' }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setPartnerFilter(cat.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                      partnerFilter === cat.id
                        ? 'bg-[#1a2b48] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Partners Grid */}
              {(() => {
                const filteredPartners = partnerRequests.filter(p => {
                  if (partnerFilter !== 'ALL') {
                    const c = (p.category || '').toLowerCase();
                    if (partnerFilter === 'hotel' && !c.includes('hotel')) return false;
                    if (partnerFilter === 'vehicle' && !c.includes('vehicle') && !c.includes('transport') && !c.includes('car')) return false;
                    if (partnerFilter === 'agency' && !c.includes('agency') && !c.includes('outfitter') && !c.includes('b2b')) return false;
                    if (partnerFilter === 'gear' && !c.includes('gear')) return false;
                  }
                  if (partnerSearch.trim()) {
                    const q = partnerSearch.toLowerCase().trim();
                    const str = `${p.companyName} ${p.contactName} ${p.email} ${p.location || ''} ${p.category}`.toLowerCase();
                    return str.includes(q);
                  }
                  return true;
                });

                if (filteredPartners.length === 0) {
                  return (
                    <div className="py-12 text-center text-slate-500 text-xs">
                      No partner requests found matching this filter.
                    </div>
                  );
                }

                return (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredPartners.map((partner) => (
                      <div
                        key={partner.id}
                        className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-[#5191fa] transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <div>
                              <span className="text-[10px] font-bold uppercase tracking-wider text-[#5191fa] bg-blue-50 px-2 py-0.5 rounded">
                                {partner.category}
                              </span>
                              <h4 className="font-heading font-bold text-base text-[#1a2b48] mt-1.5">
                                {partner.companyName}
                              </h4>
                            </div>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                                partner.status === 'Approved'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : partner.status === 'Declined'
                                  ? 'bg-rose-100 text-rose-800'
                                  : partner.status === 'Replied'
                                  ? 'bg-purple-100 text-purple-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              {partner.status}
                            </span>
                          </div>

                          <div className="space-y-1.5 text-xs text-slate-600 mb-3">
                            <div><strong>Contact:</strong> {partner.contactName}</div>
                            <div>
                              <strong>Email:</strong>{' '}
                              <a href={`mailto:${partner.email}`} className="text-[#5191fa] hover:underline">
                                {partner.email}
                              </a>
                            </div>
                            {partner.phone && <div><strong>Phone:</strong> {partner.phone}</div>}
                            {partner.location && <div><strong>Region:</strong> {partner.location}</div>}
                          </div>

                          {partner.details && (
                            <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600 leading-relaxed mb-4 border border-slate-100">
                              <div className="font-semibold text-slate-800 mb-0.5">Fleet / Facility / Proposal:</div>
                              {partner.details}
                            </div>
                          )}
                        </div>

                        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                          <div className="flex items-center gap-1.5">
                            <a
                              href={`mailto:${partner.email}?subject=Diran Peak Adventure - B2B Partnership Discussion (${encodeURIComponent(partner.companyName)})&body=Dear ${encodeURIComponent(partner.contactName)},%0D%0A%0D%0AThank you for submitting your partnership application to Diran Peak Adventure for ${encodeURIComponent(partner.category)}.%0D%0A%0D%0AAs a DTS licensed tour operator (#1842) based in Skardu, Gilgit-Baltistan, we would like to discuss collaboration and ground operations.%0D%0A%0D%0A`}
                              onClick={() => handleUpdatePartnerStatus(partner.id, 'Replied')}
                              className="px-2.5 py-1 bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200 rounded-lg font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                            >
                              <Mail className="w-3.5 h-3.5" />
                              <span>Reply via Email</span>
                            </a>

                            <button
                              onClick={() => handleUpdatePartnerStatus(partner.id, 'Approved')}
                              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold cursor-pointer"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleUpdatePartnerStatus(partner.id, 'Declined')}
                              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold cursor-pointer"
                            >
                              Decline
                            </button>
                          </div>

                          <button
                            onClick={() => handleDeletePartner(partner.id)}
                            className="text-rose-500 hover:text-rose-700 flex items-center gap-1 font-semibold cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>
          )}

          {/* TAB: SUBSCRIBERS & BROADCAST CENTER */}
          {adminTab === 'subscribers' && (
            <div className="space-y-8 mb-8">
              {/* Broadcast Center Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-100 text-purple-800">
                        <Send className="w-3 h-3 text-purple-600" />
                        Automated Dispatch Desk
                      </span>
                      <span className="font-mono text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                        Sender: noreply@diranpeakadverture.com
                      </span>
                    </div>
                    <h2 className="text-xl font-heading font-bold text-[#1a2b48]">
                      Dispatch Updates to All Subscribers ({newsletterSubscribers.length})
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Send official expedition launch announcements, 2027 departure updates, and route alerts from <strong>noreply@diranpeakadverture.com</strong>.
                    </p>
                  </div>

                  <div className="bg-purple-50 border border-purple-200 rounded-2xl px-4 py-2.5 text-center shrink-0">
                    <div className="text-[10px] font-bold uppercase text-purple-700 tracking-wider">Active Recipients</div>
                    <div className="text-2xl font-black text-purple-900">{newsletterSubscribers.length}</div>
                  </div>
                </div>

                {/* Broadcast Feedback Banner */}
                {broadcastFeedback && (
                  <div className="mb-6 p-4 rounded-2xl bg-purple-50 border border-purple-200 text-purple-900 text-xs font-semibold flex items-center justify-between shadow-xs">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                      <span>{broadcastFeedback}</span>
                    </div>
                    <button onClick={() => setBroadcastFeedback(null)} className="text-purple-700 hover:text-purple-900 cursor-pointer">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Broadcast Composer Form */}
                <form onSubmit={handleSendBroadcast} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Select Package to Announce (Quick Template Auto-Fill)
                    </label>
                    <select
                      value={broadcastSelectedTour}
                      onChange={(e) => handleSelectTourForBroadcast(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#5191fa]"
                    >
                      <option value="">-- Choose an expedition / tour package or write custom message --</option>
                      {TOURS_DATA.map((t) => (
                        <option key={t.id} value={t.id}>
                          [{t.category.toUpperCase()}] {t.title} ({t.duration} · ${t.price} USD)
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Email Subject
                    </label>
                    <input
                      type="text"
                      required
                      value={broadcastSubject}
                      onChange={(e) => setBroadcastSubject(e.target.value)}
                      placeholder="e.g. New Expedition Launched: Diran Peak (7,273m) Expedition - Diran Peak Adventure"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#5191fa]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Email Message Body
                    </label>
                    <textarea
                      rows={6}
                      required
                      value={broadcastMessage}
                      onChange={(e) => setBroadcastMessage(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#5191fa] font-mono leading-relaxed"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                    <div className="text-[11px] text-slate-500">
                      Dispatched from: <strong>noreply@diranpeakadverture.com</strong> · Records saved directly in Firestore.
                    </div>

                    <button
                      type="submit"
                      disabled={sendingBroadcast || newsletterSubscribers.length === 0}
                      className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{sendingBroadcast ? 'Dispatching to Subscribers...' : `Send Update to ${newsletterSubscribers.length} Subscribers`}</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Quick 1-Click Package Announcer Grid */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
                <h3 className="font-heading font-bold text-base text-[#1a2b48] mb-1">
                  1-Click Announce Package Updates to Subscribers
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  Instantly notify all subscribers from <strong>noreply@diranpeakadverture.com</strong> whenever any package is updated or launched.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-80 overflow-y-auto pr-1">
                  {TOURS_DATA.slice(0, 15).map((t) => (
                    <div key={t.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between gap-2">
                      <div className="truncate">
                        <div className="font-bold text-xs text-slate-900 truncate">{t.title}</div>
                        <div className="text-[10px] text-slate-400 capitalize">{t.category} · {t.duration}</div>
                      </div>
                      <button
                        onClick={() => handleQuickNotifyPackageChange('updated', t.title, t.slug)}
                        disabled={sendingBroadcast}
                        className="px-2.5 py-1 bg-[#5191fa] hover:bg-[#3875dc] text-white text-[10px] font-bold rounded-lg shrink-0 cursor-pointer"
                        title="Dispatch itinerary update to subscribers"
                      >
                        Notify
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Subscribers List & Broadcast History */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Subscribers Directory */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-heading font-bold text-base text-[#1a2b48]">
                      Active Subscribers List ({newsletterSubscribers.length})
                    </h3>
                  </div>

                  <div className="relative mb-4">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={subscriberSearch}
                      onChange={(e) => setSubscriberSearch(e.target.value)}
                      placeholder="Filter subscriber emails..."
                      className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#5191fa]"
                    />
                  </div>

                  {(() => {
                    const filteredSubs = newsletterSubscribers.filter(s =>
                      subscriberSearch ? s.email.toLowerCase().includes(subscriberSearch.toLowerCase()) : true
                    );

                    if (filteredSubs.length === 0) {
                      return (
                        <div className="py-8 text-center text-slate-500 text-xs">
                          No subscribers recorded in Cloud Firestore.
                        </div>
                      );
                    }

                    return (
                      <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                        {filteredSubs.map((sub) => (
                          <div
                            key={sub.id}
                            className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs"
                          >
                            <div className="flex items-center gap-2 truncate">
                              <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              <span className="font-medium text-slate-800 truncate">{sub.email}</span>
                            </div>
                            <button
                              onClick={() => handleDeleteSubscriber(sub.id)}
                              className="text-rose-500 hover:text-rose-700 text-[11px] font-semibold cursor-pointer shrink-0 ml-2"
                              title="Remove subscriber from Firestore"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                </div>

                {/* Sent Broadcasts History */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
                  <h3 className="font-heading font-bold text-base text-[#1a2b48] mb-4">
                    Dispatched Broadcast History ({broadcasts.length})
                  </h3>

                  {broadcasts.length > 0 ? (
                    <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                      {broadcasts.map((bc) => (
                        <div key={bc.id} className="p-3 bg-purple-50/50 rounded-xl border border-purple-100 text-xs">
                          <div className="font-bold text-slate-900 mb-1">{bc.subject}</div>
                          <div className="flex items-center justify-between text-[11px] text-slate-500">
                            <span>To {bc.recipientCount} recipients</span>
                            <span>{new Date(bc.sentAt).toLocaleDateString()}</span>
                          </div>
                          <div className="text-[10px] text-purple-700 font-mono mt-1">
                            Sender: {bc.sender}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-8 text-center text-slate-500 text-xs">
                      No broadcast updates have been dispatched yet.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB: ALERT SETTINGS */}
          {adminTab === 'alerts' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 mb-8 max-w-3xl">
              <div className="mb-6 pb-4 border-b border-slate-100">
                <h2 className="text-xl font-heading font-bold text-[#1a2b48] flex items-center gap-2">
                  <Bell className="w-5 h-5 text-rose-500" />
                  <span>Notification &amp; Alert Settings</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Stored directly in Firebase Firestore under document <code>alertSettings/general</code>. No local storage used.
                </p>
              </div>

              {alertSaveFeedback && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center justify-between shadow-xs">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{alertSaveFeedback}</span>
                  </div>
                  <button onClick={() => setAlertSaveFeedback(null)} className="text-emerald-700 hover:text-emerald-900 cursor-pointer">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              <form onSubmit={handleSaveAlertSettings} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Primary Administrator Notification Email
                  </label>
                  <input
                    type="email"
                    required
                    value={alertEmailInput}
                    onChange={(e) => setAlertEmailInput(e.target.value)}
                    placeholder="info@diranpeakadventure.com"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#5191fa]"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    System alert emails will be routed to this administrator address.
                  </p>
                </div>

                <div className="space-y-3 pt-2 border-t border-slate-100">
                  <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                    Admin Event Trigger Alerts
                  </div>

                  <label className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
                    <div>
                      <div className="text-xs font-bold text-slate-900">Master Email Alerts Active</div>
                      <div className="text-[11px] text-slate-500">Enable or disable all real-time outgoing admin notifications</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={alertsEmailEnabled}
                      onChange={(e) => setAlertsEmailEnabled(e.target.checked)}
                      className="w-4 h-4 text-[#5191fa] rounded cursor-pointer"
                    />
                  </label>

                  <label className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
                    <div>
                      <div className="text-xs font-bold text-slate-900">New Tour Booking Alert</div>
                      <div className="text-[11px] text-slate-500">Trigger alert upon every new expedition or safari booking in Firestore</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={alertsBooking}
                      onChange={(e) => setAlertsBooking(e.target.checked)}
                      className="w-4 h-4 text-[#5191fa] rounded cursor-pointer"
                    />
                  </label>

                  <label className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
                    <div>
                      <div className="text-xs font-bold text-slate-900">New Contact Form Message Alert</div>
                      <div className="text-[11px] text-slate-500">Notify admin when traveler submits contact inquiry</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={alertsContact}
                      onChange={(e) => setAlertsContact(e.target.checked)}
                      className="w-4 h-4 text-[#5191fa] rounded cursor-pointer"
                    />
                  </label>

                  <label className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
                    <div>
                      <div className="text-xs font-bold text-slate-900">New Partner Request Alert</div>
                      <div className="text-[11px] text-slate-500">Notify admin when hotel or 4x4 fleet applies for partnership</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={alertsPartner}
                      onChange={(e) => setAlertsPartner(e.target.checked)}
                      className="w-4 h-4 text-[#5191fa] rounded cursor-pointer"
                    />
                  </label>

                  <label className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
                    <div>
                      <div className="text-xs font-bold text-slate-900">New Traveler Review Alert</div>
                      <div className="text-[11px] text-slate-500">Notify admin when traveler posts tour review</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={alertsReview}
                      onChange={(e) => setAlertsReview(e.target.checked)}
                      className="w-4 h-4 text-[#5191fa] rounded cursor-pointer"
                    />
                  </label>

                  <label className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
                    <div>
                      <div className="text-xs font-bold text-slate-900">New Newsletter Subscriber Alert</div>
                      <div className="text-[11px] text-slate-500">Notify admin when user subscribes to newsletter</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={alertsSubscriber}
                      onChange={(e) => setAlertsSubscriber(e.target.checked)}
                      className="w-4 h-4 text-[#5191fa] rounded cursor-pointer"
                    />
                  </label>
                </div>

                <div className="space-y-3 pt-2 border-t border-slate-100">
                  <div className="text-xs font-bold text-purple-900 uppercase tracking-wider mb-2">
                    Automated Subscriber Dispatch (noreply@diranpeakadverture.com)
                  </div>

                  <label className="flex items-center justify-between p-3 bg-purple-50/50 rounded-xl border border-purple-200 cursor-pointer">
                    <div>
                      <div className="text-xs font-bold text-purple-950">
                        Auto-Notify Subscribers when Any Package is Added
                      </div>
                      <div className="text-[11px] text-purple-700">
                        Automatically email all subscribers from noreply@diranpeakadverture.com with package overview and booking link
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={alertsAutoNewPackage}
                      onChange={(e) => setAlertsAutoNewPackage(e.target.checked)}
                      className="w-4 h-4 text-purple-600 rounded cursor-pointer"
                    />
                  </label>

                  <label className="flex items-center justify-between p-3 bg-purple-50/50 rounded-xl border border-purple-200 cursor-pointer">
                    <div>
                      <div className="text-xs font-bold text-purple-950">
                        Auto-Notify Subscribers when Any Package is Updated
                      </div>
                      <div className="text-[11px] text-purple-700">
                        Automatically email all subscribers from noreply@diranpeakadverture.com when departures, pricing or itineraries are updated
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={alertsAutoPackageUpdate}
                      onChange={(e) => setAlertsAutoPackageUpdate(e.target.checked)}
                      className="w-4 h-4 text-purple-600 rounded cursor-pointer"
                    />
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={savingAlerts}
                  className="w-full py-3 px-4 bg-[#1a2b48] hover:bg-[#253d66] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md disabled:opacity-50"
                >
                  {savingAlerts ? 'Saving Directly to Firebase...' : 'Save Alert Settings to Firebase'}
                </button>
              </form>
            </div>
          )}

          {/* TAB 3: TRAVELER ACTIVITY FEED ("admin panel show show every activity of all user/travelers") */}
          {adminTab === 'activities' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 mb-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-heading font-bold text-[#1a2b48] flex items-center gap-2">
                    <Activity className="w-5 h-5 text-[#5191fa]" />
                    <span>Real-Time Traveler Activity Feed ({filteredActivities.length})</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Live stream of every action by all users/travelers: accounts, sign-ins, favorites saved, bookings placed, and updates.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  {/* Activity Search */}
                  <div className="relative w-full sm:w-60">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={activitySearch}
                      onChange={(e) => setActivitySearch(e.target.value)}
                      placeholder="Filter traveler activity..."
                      className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#5191fa]"
                    />
                  </div>
                </div>
              </div>

              {/* Filter Pills */}
              <div className="flex flex-wrap items-center gap-2 mb-6 pb-4 border-b border-slate-100">
                <span className="text-[11px] font-bold text-slate-400 uppercase mr-1 flex items-center gap-1">
                  <Filter className="w-3 h-3" /> Filter:
                </span>
                {[
                  { id: 'ALL', label: 'All Activities' },
                  { id: 'BOOKINGS', label: 'Bookings' },
                  { id: 'FAVORITES', label: 'Favorites' },
                  { id: 'LOGINS', label: 'Logins / Sessions' },
                  { id: 'PASSWORDS', label: 'Password Resets' },
                  { id: 'PROFILES', label: 'Profile Updates' }
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setActivityFilter(f.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                      activityFilter === f.id
                        ? 'bg-[#1a2b48] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              {/* Activity Timeline List */}
              {filteredActivities.length > 0 ? (
                <div className="space-y-3">
                  {filteredActivities.map((act) => {
                    const isBooking = act.action.includes('BOOKING');
                    const isFavoriteAction = act.action.includes('FAVORITE');
                    const isPassword = act.action.includes('PASSWORD');
                    const isLogin = act.action.includes('LOGIN') || act.action.includes('LOGOUT') || act.action.includes('REGISTER');

                    const badgeColor = isBooking
                      ? 'bg-blue-100 text-blue-800 border-blue-200'
                      : isFavoriteAction
                      ? 'bg-rose-100 text-rose-800 border-rose-200'
                      : isPassword
                      ? 'bg-amber-100 text-amber-800 border-amber-200'
                      : isLogin
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                      : 'bg-slate-100 text-slate-800 border-slate-200';

                    const icon = isBooking ? (
                      <CalendarCheck className="w-4 h-4 text-[#5191fa]" />
                    ) : isFavoriteAction ? (
                      <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                    ) : isPassword ? (
                      <KeyRound className="w-4 h-4 text-amber-600" />
                    ) : (
                      <User className="w-4 h-4 text-emerald-600" />
                    );

                    return (
                      <div
                        key={act.id}
                        className="p-4 bg-slate-50/70 hover:bg-white rounded-2xl border border-slate-200/80 transition-all shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                            {icon}
                          </div>
                          <div>
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <span className="font-bold text-xs text-slate-900">
                                {act.userName || 'Traveler'}
                              </span>
                              <span className="text-[11px] text-slate-500">
                                ({act.userEmail})
                              </span>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badgeColor}`}>
                                {act.action.replace('_', ' ')}
                              </span>
                            </div>
                            <p className="text-xs text-slate-700 leading-relaxed font-medium">
                              {act.details}
                            </p>
                          </div>
                        </div>

                        <div className="text-[11px] text-slate-400 font-mono shrink-0 sm:text-right pl-12 sm:pl-0">
                          {new Date(act.timestamp).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}{' '}
                          · {new Date(act.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="py-12 text-center text-slate-500 text-xs">
                  No traveler activities recorded matching this filter.
                </div>
              )}
            </div>
          )}

          {/* Selected User Details Drawer / Modal */}
          {selectedUser && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
              <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col border border-slate-100">
                {/* Drawer Header */}
                <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#5191fa] to-blue-400 text-white flex items-center justify-center font-black text-lg">
                      {(selectedUser.firstName || selectedUser.email)[0].toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-lg text-white">
                        {selectedUser.firstName || 'Traveler'} {selectedUser.lastName || ''}
                      </h3>
                      <div className="text-xs text-slate-400 flex items-center gap-2">
                        <span>{selectedUser.email}</span>
                        <span>·</span>
                        <span className="font-mono text-[10px]">UID: {selectedUser.id}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedUser(null)}
                    className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Drawer Body */}
                <div className="p-6 overflow-y-auto space-y-6">
                  {/* User Profile Card Summary & Admin Actions */}
                  <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Traveler Account Details
                      </div>
                      <button
                        type="button"
                        onClick={() => handleOpenEditTraveler(selectedUser)}
                        className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 flex items-center gap-1 cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-[#5191fa]" />
                        <span>Edit Traveler Details</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs mb-4">
                      <div>
                        <div className="text-slate-400 text-[10px] uppercase font-bold">Email</div>
                        <div className="font-semibold text-slate-900 mt-0.5">{selectedUser.email}</div>
                      </div>
                      <div>
                        <div className="text-slate-400 text-[10px] uppercase font-bold">Phone</div>
                        <div className="font-semibold text-slate-900 mt-0.5">{selectedUser.phone || 'Not provided'}</div>
                      </div>
                      <div>
                        <div className="text-slate-400 text-[10px] uppercase font-bold">Account Created</div>
                        <div className="font-semibold text-slate-900 mt-0.5">
                          {selectedUser.createdAt
                            ? new Date(selectedUser.createdAt).toLocaleDateString()
                            : 'March 2027'}
                        </div>
                      </div>
                      {selectedUser.emergencyContact && (
                        <div>
                          <div className="text-slate-400 text-[10px] uppercase font-bold">Emergency Contact</div>
                          <div className="font-semibold text-slate-900 mt-0.5">{selectedUser.emergencyContact}</div>
                        </div>
                      )}
                      {selectedUser.passportNumber && (
                        <div>
                          <div className="text-slate-400 text-[10px] uppercase font-bold">Passport / ID</div>
                          <div className="font-semibold text-slate-900 mt-0.5">{selectedUser.passportNumber}</div>
                        </div>
                      )}
                      {selectedUser.tempPassword && (
                        <div>
                          <div className="text-slate-400 text-[10px] uppercase font-bold">Active Temp Password</div>
                          <div className="font-mono font-bold text-amber-700 mt-0.5 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 inline-block">
                            {selectedUser.tempPassword}
                          </div>
                        </div>
                      )}
                    </div>

                    {selectedUser.bio && (
                      <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-600 mb-4">
                        <strong className="block text-slate-900 mb-1">Climbing Bio:</strong>
                        {selectedUser.bio}
                      </div>
                    )}

                    <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                      <div className="text-xs text-slate-600">
                        Admin Security Controls:
                      </div>
                      <button
                        type="button"
                        onClick={() => handleOpenPasswordModal(selectedUser)}
                        className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                      >
                        <KeyRound className="w-3.5 h-3.5" />
                        <span>Change / Reset User Password</span>
                      </button>
                    </div>
                  </div>

                  {/* Platform Role & Permissions Management Card */}
                  <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
                          <Shield className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-heading font-bold text-sm text-[#1a2b48]">
                            Platform Role &amp; Access Permissions
                          </h4>
                          <p className="text-[11px] text-slate-500">
                            Configure user capabilities across admin panel, tour bookings, logistics, and partner tools.
                          </p>
                        </div>
                      </div>

                      {(() => {
                        const rCfg = getRoleConfig(selectedUser.role);
                        return (
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${rCfg.badgeBg} ${rCfg.badgeText} ${rCfg.borderColor}`}>
                            {rCfg.label}
                          </span>
                        );
                      })()}
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-slate-700">
                        Assign New Role to This User:
                      </label>
                      <div className="flex items-center gap-2">
                        <select
                          value={selectedUser.role || 'traveler'}
                          onChange={(e) => handleUpdateRole(selectedUser.id, e.target.value)}
                          className="flex-1 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-[#5191fa]"
                        >
                          {PLATFORM_ROLES.map((r) => (
                            <option key={r.id} value={r.id}>
                              {r.label} ({r.category}) {r.canAccessAdminPanel ? '· Admin Panel Access' : ''}
                            </option>
                          ))}
                        </select>
                        <button
                          type="button"
                          onClick={() => setIsRoleMatrixOpen(true)}
                          className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 cursor-pointer"
                        >
                          Full Matrix
                        </button>
                      </div>
                    </div>

                    {/* Permissions Preview for current role */}
                    {(() => {
                      const rCfg = getRoleConfig(selectedUser.role);
                      return (
                        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                          <div className="font-bold text-slate-800 mb-1 flex items-center justify-between">
                            <span>Active Permissions ({rCfg.permissions.length}):</span>
                            {rCfg.canAccessAdminPanel ? (
                              <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                Can Access Admin Panel
                              </span>
                            ) : (
                              <span className="text-[10px] text-slate-500 font-medium bg-slate-200 px-2 py-0.5 rounded">
                                Standard Portal User
                              </span>
                            )}
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mt-2">
                            {rCfg.permissions.map((p, idx) => (
                              <div key={idx} className="flex items-center gap-1.5 text-slate-700 text-[11px]">
                                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                <span>{p}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })()}

                    {/* Verification Toggle */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-700">Verification Status:</span>
                        {selectedUser.verified !== false && selectedUser.isVerified !== false ? (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                            Verified User &amp; Credentials
                          </span>
                        ) : (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                            Unverified User Profile
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => handleToggleVerification(selectedUser.id, selectedUser.verified !== false && selectedUser.isVerified !== false)}
                        className={`px-3 py-1.5 text-xs font-bold rounded-xl cursor-pointer transition-colors shadow-2xs ${
                          selectedUser.verified !== false && selectedUser.isVerified !== false
                            ? 'bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-700 border border-slate-200'
                            : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        }`}
                      >
                        {selectedUser.verified !== false && selectedUser.isVerified !== false
                          ? 'Revoke Verification'
                          : 'Verify User Account'}
                      </button>
                    </div>
                  </div>

                  {/* User's Bookings */}
                  <div>
                    <h4 className="font-heading font-bold text-base text-[#1a2b48] mb-3 flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <CalendarCheck className="w-4 h-4 text-[#5191fa]" />
                        <span>Expedition Bookings ({selectedUserBookings.length})</span>
                      </span>
                    </h4>

                    {selectedUserBookings.length > 0 ? (
                      <div className="space-y-4">
                        {selectedUserBookings.map((b) => (
                          <div
                            key={b.id}
                            className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:border-[#5191fa] transition-colors"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                              <div>
                                <div className="flex items-center gap-2 mb-1.5">
                                  <span className="font-mono text-xs font-bold text-[#5191fa] bg-blue-50 px-2 py-0.5 rounded">
                                    {b.bookingCode}
                                  </span>
                                  <span
                                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                                      b.status === 'Confirmed' || (b.status as any) === 'Accepted'
                                        ? 'bg-emerald-100 text-emerald-800'
                                        : b.status === 'Cancelled' || (b.status as any) === 'Declined'
                                        ? 'bg-rose-100 text-rose-800'
                                        : 'bg-amber-100 text-amber-800'
                                    }`}
                                  >
                                    {b.status}
                                  </span>
                                </div>
                                <h5 className="font-heading font-bold text-slate-900 text-sm">{b.tourTitle}</h5>
                                <div className="text-xs text-slate-500 mt-1">
                                  <strong>Dates:</strong> {b.startDate} to {b.endDate} · <strong>Party:</strong> {b.adults} Adults
                                </div>
                                {b.specialRequests && (
                                  <div className="text-xs text-slate-600 mt-2 p-2 bg-slate-50 rounded-lg border border-slate-100">
                                    <strong>Notes:</strong> {b.specialRequests}
                                  </div>
                                )}
                              </div>
                              <div className="text-left sm:text-right">
                                <div className="text-[10px] text-slate-400 uppercase font-bold">Total Price</div>
                                <div className="text-base font-extrabold text-[#1a2b48]">
                                  {formatPrice(b.totalPrice)}
                                </div>
                              </div>
                            </div>

                            {/* Booking Action Buttons for Admin */}
                            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                              <div className="flex flex-wrap items-center gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => handleAdminUpdateStatus(b.id, 'Confirmed')}
                                  className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                                >
                                  <Check className="w-3.5 h-3.5" />
                                  <span>Accept</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleAdminUpdateStatus(b.id, 'Cancelled')}
                                  className="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                                >
                                  <XCircle className="w-3.5 h-3.5" />
                                  <span>Decline</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleAdminUpdateStatus(b.id, 'Completed')}
                                  className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                                >
                                  <CheckCircle className="w-3.5 h-3.5" />
                                  <span>Complete</span>
                                </button>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleOpenEditBooking(b)}
                                className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer"
                              >
                                <Edit3 className="w-3.5 h-3.5 text-slate-600" />
                                <span>Edit Details</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-slate-500 text-xs">
                        This user does not currently have any active trip bookings in Firestore.
                      </div>
                    )}
                  </div>
                </div>

                {/* Drawer Footer */}
                <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
                  <button
                    onClick={() => setSelectedUser(null)}
                    className="px-5 py-2 bg-slate-800 text-white text-xs font-semibold rounded-xl hover:bg-slate-700 transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Admin Password Reset & Change Modal */}
          {passwordModalUser && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
              <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                  <div className="flex items-center gap-2">
                    <KeyRound className="w-5 h-5 text-amber-600" />
                    <h3 className="font-heading font-bold text-base text-slate-900">
                      {passwordModalUser.role === 'admin' || passwordModalUser.id === ADMIN_USER_ID
                        ? 'Reset Master Admin Password'
                        : 'Reset Traveler Password'}
                    </h3>
                  </div>
                  <button
                    onClick={() => setPasswordModalUser(null)}
                    className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="mb-4 p-3 bg-slate-50 rounded-xl text-xs text-slate-600 space-y-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <strong>Account:</strong> {passwordModalUser.firstName} {passwordModalUser.lastName}
                    </div>
                    {(passwordModalUser.role === 'admin' || passwordModalUser.id === ADMIN_USER_ID) && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-amber-100 text-amber-800">
                        Admin Account
                      </span>
                    )}
                  </div>
                  <div><strong>Email:</strong> <span className="font-semibold text-slate-800">{passwordModalUser.email}</span></div>
                </div>

                {passwordSuccessResult && (
                  <div className="mb-4 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
                    <div className="flex items-center gap-2 font-bold mb-1">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{passwordSuccessResult.message}</span>
                    </div>
                    {passwordSuccessResult.tempPass && (
                      <div className="mt-3 p-2 bg-white rounded-lg border border-emerald-300 flex items-center justify-between">
                        <span className="font-mono font-bold text-slate-900">{passwordSuccessResult.tempPass}</span>
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard?.writeText(passwordSuccessResult.tempPass || '');
                            setCopiedPassword(true);
                            setTimeout(() => setCopiedPassword(false), 2000);
                          }}
                          className="px-2 py-1 bg-emerald-600 text-white rounded text-[11px] font-semibold cursor-pointer hover:bg-emerald-700 flex items-center gap-1"
                        >
                          <Copy className="w-3 h-3" />
                          <span>{copiedPassword ? 'Copied!' : 'Copy'}</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {passwordErrorResult && (
                  <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{passwordErrorResult}</span>
                  </div>
                )}

                <div className="space-y-4">
                  {/* Option A: Direct Password Assignment */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      Assign New Password Directly:
                    </label>
                    <p className="text-[11px] text-slate-500 mb-2">
                      Saves to user account in Firestore so the traveler can log in immediately.
                    </p>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={customPasswordInput}
                        onChange={(e) => setCustomPasswordInput(e.target.value)}
                        placeholder="e.g. Explorer@2027"
                        className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-mono text-slate-900 focus:outline-none focus:border-[#5191fa]"
                      />
                      <button
                        type="button"
                        onClick={() => setCustomPasswordInput('Pass@' + Math.floor(100000 + Math.random() * 900000))}
                        className="px-2.5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold rounded-xl cursor-pointer"
                        title="Generate random secure password"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      type="button"
                      disabled={resettingPassword}
                      onClick={() => handleExecutePasswordReset(customPasswordInput)}
                      className="w-full mt-3 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                    >
                      {resettingPassword ? 'Saving in Firestore...' : 'Apply & Save New Password'}
                    </button>
                  </div>

                  {/* Option B: Dispatch Email Link */}
                  <div className="pt-2 text-center">
                    <button
                      type="button"
                      disabled={resettingPassword}
                      onClick={() => handleExecutePasswordReset(undefined)}
                      className="text-xs text-[#5191fa] hover:text-[#3875dc] font-semibold hover:underline cursor-pointer"
                    >
                      Or send password reset email via Firebase Auth
                    </button>
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-100 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setPasswordModalUser(null)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl cursor-pointer"
                  >
                    Done / Close
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Admin Edit Traveler Details Modal */}
          {editingTraveler && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
              <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                  <h3 className="font-heading font-bold text-base text-slate-900">
                    Edit Traveler Account Details
                  </h3>
                  <button
                    onClick={() => setEditingTraveler(null)}
                    className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <form onSubmit={handleSaveTravelerEdit} className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">First Name</label>
                      <input
                        type="text"
                        value={editTravelerFirst}
                        onChange={(e) => setEditTravelerFirst(e.target.value)}
                        required
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#5191fa]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Last Name</label>
                      <input
                        type="text"
                        value={editTravelerLast}
                        onChange={(e) => setEditTravelerLast(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#5191fa]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={editTravelerPhone}
                      onChange={(e) => setEditTravelerPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#5191fa]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Emergency Contact</label>
                    <input
                      type="text"
                      value={editTravelerEmergency}
                      onChange={(e) => setEditTravelerEmergency(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#5191fa]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Passport / ID Document</label>
                    <input
                      type="text"
                      value={editTravelerPassport}
                      onChange={(e) => setEditTravelerPassport(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#5191fa]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Travel Bio &amp; Notes</label>
                    <textarea
                      rows={3}
                      value={editTravelerBio}
                      onChange={(e) => setEditTravelerBio(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#5191fa]"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setEditingTraveler(null)}
                      className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={savingTraveler}
                      className="px-5 py-2 bg-[#5191fa] hover:bg-[#3875dc] text-white text-xs font-bold rounded-xl cursor-pointer shadow-xs"
                    >
                      {savingTraveler ? 'Saving...' : 'Save Traveler Profile'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Admin Edit Booking Modal */}
          {editingBooking && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
              <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                  <div>
                    <h3 className="font-heading font-bold text-lg text-slate-900">
                      Edit Booking Details
                    </h3>
                    <p className="text-xs text-slate-500">
                      Booking Code: <strong className="font-mono text-[#5191fa]">{editingBooking.bookingCode}</strong>
                    </p>
                  </div>
                  <button
                    onClick={() => setEditingBooking(null)}
                    className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {bookingSaveNotice && (
                  <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{bookingSaveNotice}</span>
                  </div>
                )}

                <form onSubmit={handleSaveBookingEdit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Tour / Expedition Title
                    </label>
                    <input
                      type="text"
                      value={editTourTitle}
                      onChange={(e) => setEditTourTitle(e.target.value)}
                      required
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#5191fa]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Start Date
                      </label>
                      <input
                        type="text"
                        value={editStartDate}
                        onChange={(e) => setEditStartDate(e.target.value)}
                        placeholder="e.g. 10 June 2027"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#5191fa]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        End Date
                      </label>
                      <input
                        type="text"
                        value={editEndDate}
                        onChange={(e) => setEditEndDate(e.target.value)}
                        placeholder="e.g. 28 June 2027"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#5191fa]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Adults
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={editAdults}
                        onChange={(e) => setEditAdults(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#5191fa]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Children
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={editChildren}
                        onChange={(e) => setEditChildren(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#5191fa]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Total Price ($)
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={editTotalPrice}
                        onChange={(e) => setEditTotalPrice(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#5191fa]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Booking Status
                    </label>
                    <select
                      value={editStatus}
                      onChange={(e) => setEditStatus(e.target.value as Booking['status'])}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#5191fa]"
                    >
                      <option value="Confirmed">Confirmed</option>
                      <option value="Pending Verification">Pending Verification</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Special Requests / Notes
                    </label>
                    <textarea
                      rows={2}
                      value={editSpecialRequests}
                      onChange={(e) => setEditSpecialRequests(e.target.value)}
                      placeholder="Custom notes or requests..."
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#5191fa]"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setEditingBooking(null)}
                      className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={savingBooking}
                      className="px-5 py-2 bg-[#5191fa] hover:bg-[#3d7be3] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                    >
                      {savingBooking ? (
                        <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <Check className="w-3.5 h-3.5" />
                      )}
                      <span>{savingBooking ? 'Saving...' : 'Update Booking in Firestore'}</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Admin Add User Modal */}
          <AdminAddUserModal
            isOpen={isAddUserModalOpen}
            onClose={() => setIsAddUserModalOpen(false)}
            onUserCreated={(newUser) => {
              setAdminUsers(prev => [newUser, ...prev]);
              setPasswordResetNotice(`User ${newUser.email} created successfully with role "${newUser.role}" in Firestore!`);
              setTimeout(() => setPasswordResetNotice(null), 5000);
            }}
          />

          {/* Admin Role Matrix Modal */}
          <AdminRoleMatrixModal
            isOpen={isRoleMatrixOpen}
            onClose={() => setIsRoleMatrixOpen(false)}
          />

          {/* Edit Profile Modal for Admin */}
          {renderEditProfileModal()}
          </main>
        </div>
      </div>
    );
  }

  // =========================================================================
  // GUEST TRAVELER & VOUCHER DOWNLOAD VIEW (When user is not signed in)
  // =========================================================================
  if (!user) {
    const storedGuestBookings: Booking[] = (() => {
      try {
        const stored = localStorage.getItem('dpa_guest_bookings');
        if (stored) return JSON.parse(stored);
      } catch {
        // ignore
      }
      return [];
    })();

    // Merge in-memory guest bookings and local storage guest bookings
    const combinedGuestBookings = Array.from(
      new Map([
        ...storedGuestBookings.map(b => [b.id, b] as [string, Booking]),
        ...bookings.filter(b => b.isGuest || !b.userId || b.userId.startsWith('guest')).map(b => [b.id, b] as [string, Booking])
      ]).values()
    );

    const filteredGuestBookings = combinedGuestBookings.filter(b => {
      if (!guestLookupCode.trim()) return true;
      const q = guestLookupCode.toLowerCase().trim();
      return (
        b.bookingCode.toLowerCase().includes(q) ||
        (b.customerEmail && b.customerEmail.toLowerCase().includes(q)) ||
        (b.customerName && b.customerName.toLowerCase().includes(q)) ||
        (b.tourTitle && b.tourTitle.toLowerCase().includes(q))
      );
    });

    return (
      <div className="bg-[#f7f8fa] min-h-screen py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="text-xs text-slate-500 mb-4 flex items-center gap-1.5 font-medium">
            <button onClick={() => onNavigate('home')} className="hover:text-[#5191fa] cursor-pointer">Home</button>
            <span>/</span>
            <span className="text-slate-800 font-semibold">Traveler Portal &amp; Booking Voucher</span>
          </div>

          {/* Guest Voucher Banner */}
          <div className="bg-gradient-to-br from-[#1a2b48] via-[#233a60] to-[#1a2b48] text-white rounded-3xl p-6 sm:p-8 shadow-xl mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#5191fa]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 mb-3">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>DTS License #1842 Verified</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
                  Expedition Voucher &amp; Reservation Portal
                </h1>
                <p className="text-xs text-slate-300 mt-1.5 max-w-xl leading-relaxed">
                  Download your official Government of Pakistan licensed expedition voucher, check reservation status, or log in to link your bookings to your climber profile.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={openLogin}
                  className="px-4 py-2.5 bg-[#5191fa] hover:bg-[#3d7be3] text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Sign In / Create Account</span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('tours', 'all')}
                  className="px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs rounded-xl transition-all cursor-pointer"
                >
                  Explore Expeditions
                </button>
              </div>
            </div>
          </div>

          {/* Voucher Lookup Search Box */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200 mb-8">
            <h2 className="text-base font-heading font-bold text-[#1a2b48] mb-2 flex items-center gap-2">
              <Search className="w-4 h-4 text-[#5191fa]" />
              <span>Find Your Reservation &amp; Download Voucher</span>
            </h2>
            <p className="text-xs text-slate-500 mb-4">
              Enter the Booking Reference Code (e.g. <span className="font-mono text-slate-700 font-semibold">DPA-GUEST-1234</span>) or email address used during booking.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={guestLookupCode}
                  onChange={(e) => {
                    setGuestLookupCode(e.target.value);
                    setGuestLookupSearched(true);
                  }}
                  placeholder="e.g. DPA-GUEST-1042 or traveler@example.com"
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#5191fa]"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
              </div>
              {guestLookupCode && (
                <button
                  type="button"
                  onClick={() => setGuestLookupCode('')}
                  className="px-3 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 border border-slate-200 rounded-xl cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Reservations List */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 mb-8">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-heading font-bold text-[#1a2b48] flex items-center gap-2">
                  <CalendarCheck className="w-5 h-5 text-[#5191fa]" />
                  <span>Available Booking Vouchers ({filteredGuestBookings.length})</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Click download to generate an official expedition voucher with QR security code and Pakistan DTS license seal.
                </p>
              </div>
            </div>

            {filteredGuestBookings.length > 0 ? (
              <div className="space-y-4">
                {filteredGuestBookings.map((b) => (
                  <div
                    key={b.id}
                    className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-[#5191fa] transition-all shadow-xs"
                  >
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <span className="font-mono text-xs font-bold text-[#5191fa] bg-blue-50 px-2 py-0.5 rounded">
                            {b.bookingCode}
                          </span>
                          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
                            Guest Reservation
                          </span>
                          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                            {b.status || 'Confirmed'}
                          </span>
                          <span className="text-xs text-slate-400">· {b.bookingDate}</span>
                        </div>
                        <h4 className="font-heading font-bold text-slate-900 text-base">
                          {b.tourTitle}
                        </h4>
                        <div className="text-xs text-slate-600 mt-1 flex flex-wrap items-center gap-3">
                          <span><strong>Lead Climber:</strong> {b.customerName}</span>
                          <span>·</span>
                          <span><strong>Email:</strong> {b.customerEmail}</span>
                          {b.customerPhone && (
                            <>
                              <span>·</span>
                              <span><strong>WhatsApp:</strong> {b.customerPhone}</span>
                            </>
                          )}
                          <span>·</span>
                          <span><strong>Dates:</strong> {b.startDate} to {b.endDate}</span>
                          <span>·</span>
                          <span><strong>Party:</strong> {b.adults} Adults {b.children ? `+ ${b.children} Youths` : ''}</span>
                        </div>
                        {b.specialRequests && (
                          <div className="text-xs text-slate-600 mt-2 p-2 bg-slate-50 rounded-lg border border-slate-100">
                            <strong>Note:</strong> {b.specialRequests}
                          </div>
                        )}
                      </div>

                      <div className="text-left md:text-right shrink-0">
                        <div className="text-[10px] text-slate-400 uppercase font-bold">Total Amount</div>
                        <div className="text-lg font-black text-[#1a2b48]">
                          {formatPrice(b.totalPrice)}
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => downloadVoucher(b)}
                        className="px-4 py-2 bg-[#1a2b48] hover:bg-[#283d63] text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-all shadow-xs cursor-pointer"
                      >
                        <FileDown className="w-4 h-4 text-[#5191fa]" />
                        <span>Download Official PDF Voucher</span>
                      </button>

                      {b.customerPhone && (
                        <a
                          href={`https://wa.me/923456412992?text=${encodeURIComponent(`Salam DPA Team, I am checking my booking ${b.bookingCode} for ${b.tourTitle}.`)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs text-emerald-600 font-semibold hover:underline flex items-center gap-1.5"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>WhatsApp Expedition Logistics (+92 345 6412992)</span>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center text-slate-500 text-xs">
                <CalendarCheck className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="font-semibold text-slate-700 text-sm">No reservations found matching your query.</p>
                <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                  If you booked recently as a guest, please make sure you typed the exact reference code from your confirmation screen (e.g., DPA-GUEST-XXXX) or the email you entered.
                </p>
                <div className="mt-4 flex justify-center gap-2">
                  <button
                    type="button"
                    onClick={openLogin}
                    className="px-4 py-2 bg-[#5191fa] text-white font-bold rounded-xl text-xs hover:bg-[#3d7be3] cursor-pointer"
                  >
                    Sign In to Account
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate('tours', 'all')}
                    className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-xl text-xs hover:bg-slate-200 cursor-pointer"
                  >
                    Browse All Expeditions
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // ROLE-SPECIFIC USER DASHBOARD VIEW (Every role sees their own dedicated dashboard)
  // =========================================================================
  return <RoleSpecificDashboard onNavigate={onNavigate} />;
};
