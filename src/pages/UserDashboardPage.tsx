import React, { useState, useEffect } from 'react';
import { useAuth, ADMIN_USER_ID, Booking, User as UserType } from '../context/AuthContext';
import {
  User, CalendarCheck, CheckCircle, ShieldCheck, LogOut, ArrowRight,
  Search, RefreshCw, X, Edit3, Trash2, Mail, Phone, Calendar,
  AlertTriangle, FileText, ChevronRight, Eye, Shield
} from 'lucide-react';

interface FirestoreUserRecord {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  role?: string;
  createdAt?: string;
  lastLoginAt?: string;
  bookingCount?: number;
}

export const UserDashboardPage: React.FC<{ onNavigate: (route: string, param?: string) => void }> = ({ onNavigate }) => {
  const {
    user,
    isAuthenticated,
    bookings,
    formatPrice,
    logout,
    openLogin,
    isAdmin,
    updateUserProfile,
    deleteUserAccount,
    deleteUserBooking,
    fetchAllUsersForAdmin,
    fetchAllBookingsForAdmin
  } = useAuth();

  // Admin view state
  const isUserAdmin = isAdmin || user?.id === ADMIN_USER_ID;
  const [adminUsers, setAdminUsers] = useState<FirestoreUserRecord[]>([]);
  const [adminAllBookings, setAdminAllBookings] = useState<Booking[]>([]);
  const [adminSearch, setAdminSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState<FirestoreUserRecord | null>(null);
  const [loadingAdminData, setLoadingAdminData] = useState(false);

  // Normal user profile edit state
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [editFirstName, setEditFirstName] = useState('');
  const [editLastName, setEditLastName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editEmergencyContact, setEditEmergencyContact] = useState('');
  const [editPassportNumber, setEditPassportNumber] = useState('');
  const [editBio, setEditBio] = useState('');
  const [savingProfile, setSavingProfile] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Load admin data when admin user logs in
  const loadAdminData = async () => {
    if (!isUserAdmin) return;
    setLoadingAdminData(true);
    try {
      const [fetchedUsers, fetchedBookings] = await Promise.all([
        fetchAllUsersForAdmin(),
        fetchAllBookingsForAdmin()
      ]);

      const userList = [...fetchedUsers];

      // Ensure current logged in admin user is included
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

      // Add expedition travelers if not yet present in Firestore collection
      const seedTravelers = [
        {
          id: 'usr_marcus_sterling',
          email: 'marcus@alpine-expeditions.com',
          firstName: 'Marcus',
          lastName: 'Sterling',
          phone: '+44 7911 123456',
          role: 'customer',
          createdAt: '2027-02-15T10:30:00.000Z'
        },
        {
          id: 'usr_elena_rostova',
          email: 'elena.rostova@gmail.com',
          firstName: 'Elena',
          lastName: 'Rostova',
          phone: '+48 601 234567',
          role: 'customer',
          createdAt: '2027-02-28T14:15:00.000Z'
        },
        {
          id: 'usr_karim_khan',
          email: 'karim@example.com',
          firstName: 'Karim',
          lastName: 'Khan',
          phone: '+92 300 1234567',
          role: 'customer',
          createdAt: '2027-03-01T09:00:00.000Z'
        }
      ];

      for (const st of seedTravelers) {
        if (!userList.some(u => u.email?.toLowerCase() === st.email.toLowerCase())) {
          userList.push(st);
        }
      }

      const allBookings = fetchedBookings.length > 0 ? fetchedBookings : bookings;

      // Calculate number of bookings for each user
      const usersWithBookings = userList.map((u: any) => {
        const userBookingCount = allBookings.filter(
          (b) => b.userId === u.id || (b.customerEmail && b.customerEmail.toLowerCase() === u.email?.toLowerCase())
        ).length;
        return {
          ...u,
          bookingCount: userBookingCount
        };
      });

      setAdminUsers(usersWithBookings);
      setAdminAllBookings(allBookings);
    } catch (err) {
      console.error('Error loading admin directory data:', err);
    } finally {
      setLoadingAdminData(false);
    }
  };

  useEffect(() => {
    if (isUserAdmin) {
      loadAdminData();
    }
  }, [isUserAdmin]);

  // Open profile edit modal with existing user values
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

  if (!isAuthenticated || !user) {
    return (
      <div className="bg-[#f7f8fa] min-h-[70vh] flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-sm border border-slate-200 text-center">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#5191fa] flex items-center justify-center mx-auto mb-4">
            <User className="w-7 h-7" />
          </div>
          <h2 className="font-heading text-xl font-bold text-[#1a2b48] mb-2">Member Portal Access</h2>
          <p className="text-xs text-slate-500 mb-6">
            Please log in or register with your email to view your confirmed bookings, vouchers, and expedition paperwork.
          </p>
          <button
            onClick={openLogin}
            className="w-full py-2.5 px-4 bg-[#5191fa] text-white font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer"
          >
            Log In to Account
          </button>
        </div>
      </div>
    );
  }

  // =========================================================================
  // ADMIN DASHBOARD VIEW (when admin user ID 83oYhWqa5ONqFdaJUVs26BnhEZl1 logs in)
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

    const selectedUserBookings = selectedUser
      ? adminAllBookings.filter(
          b => b.userId === selectedUser.id || b.customerEmail?.toLowerCase() === selectedUser.email?.toLowerCase()
        )
      : [];

    return (
      <div className="bg-[#f7f8fa] min-h-screen py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="text-xs text-slate-500 mb-4 flex items-center gap-1.5 font-medium">
            <button onClick={() => onNavigate('home')} className="hover:text-[#5191fa]">Home</button>
            <span>/</span>
            <span className="text-slate-800 font-semibold">Admin Dashboard</span>
          </div>

          {/* Admin Header with Prominent Indicator Badge */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#5191fa]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-start sm:items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-400/40 text-amber-400 flex items-center justify-center shrink-0">
                  <Shield className="w-8 h-8" />
                </div>
                <div>
                  <div className="flex items-center gap-2.5 mb-1.5">
                    {/* Official Admin Indicator Badge */}
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-500 text-slate-950 shadow-md">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      ADMINISTRATOR VIEW
                    </span>
                    <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                      UID: {user.id}
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
                    Expedition Command Center
                  </h1>
                  <p className="text-xs text-slate-300 mt-1">
                    Master read access to all Firestore user accounts &amp; expedition booking reservations.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={loadAdminData}
                  disabled={loadingAdminData}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold rounded-xl flex items-center gap-2 transition-all cursor-pointer"
                  title="Refresh Firestore Database"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loadingAdminData ? 'animate-spin' : ''}`} />
                  <span>{loadingAdminData ? 'Syncing...' : 'Sync Data'}</span>
                </button>
                <button
                  onClick={logout}
                  className="px-4 py-2 bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/30 text-xs font-semibold rounded-xl flex items-center gap-2 transition-all cursor-pointer"
                  title="Log out of admin session"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-800">
              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Users</div>
                <div className="text-2xl font-black text-white mt-1">{adminUsers.length}</div>
              </div>
              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Bookings</div>
                <div className="text-2xl font-black text-[#5191fa] mt-1">{adminAllBookings.length}</div>
              </div>
              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Active Expeditions</div>
                <div className="text-2xl font-black text-emerald-400 mt-1">
                  {adminAllBookings.filter(b => b.status === 'Confirmed').length}
                </div>
              </div>
              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Database Engine</div>
                <div className="text-2xl font-black text-amber-400 mt-1">Cloud Firestore</div>
              </div>
            </div>
          </div>

          {/* User Directory Table / List */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-heading font-bold text-[#1a2b48] flex items-center gap-2">
                  <User className="w-5 h-5 text-[#5191fa]" />
                  <span>Registered Users Directory ({adminUsers.length})</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Click on any user row to view their full booking history and contact details
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={adminSearch}
                  onChange={(e) => setAdminSearch(e.target.value)}
                  placeholder="Search by email or name..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#5191fa] focus:bg-white"
                />
              </div>
            </div>

            {loadingAdminData ? (
              <div className="py-16 text-center">
                <div className="w-8 h-8 border-3 border-[#5191fa]/20 border-t-[#5191fa] rounded-full animate-spin mx-auto mb-3" />
                <p className="text-xs text-slate-500">Querying Firestore users collection...</p>
              </div>
            ) : filteredUsers.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-slate-200 rounded-2xl overflow-hidden">
                  <thead className="bg-slate-50 text-slate-600 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="py-3.5 px-4">Traveler / User</th>
                      <th className="py-3.5 px-4">Email Address</th>
                      <th className="py-3.5 px-4">Account Created</th>
                      <th className="py-3.5 px-4 text-center">Trip/Tour Bookings</th>
                      <th className="py-3.5 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredUsers.map((u) => {
                      const isSelected = selectedUser?.id === u.id;
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
                              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#1a2b48] to-[#5191fa] text-white flex items-center justify-center font-bold text-xs shrink-0">
                                {(u.firstName || u.email || 'U')[0].toUpperCase()}
                              </div>
                              <div>
                                <div className="font-semibold text-slate-900">
                                  {u.firstName || 'Traveler'} {u.lastName || ''}
                                </div>
                                <div className="text-[10px] text-slate-400 font-mono">
                                  {u.id === ADMIN_USER_ID ? (
                                    <span className="text-amber-600 font-bold bg-amber-50 px-1.5 py-0.5 rounded">
                                      Admin Account
                                    </span>
                                  ) : (
                                    <span>ID: {u.id.slice(0, 12)}...</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 font-medium text-slate-700">
                            <div className="flex items-center gap-1.5">
                              <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              <span>{u.email}</span>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-slate-500">
                            <div className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              <span>{formattedDate}</span>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <span
                              className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                                (u.bookingCount || 0) > 0
                                  ? 'bg-blue-100 text-[#5191fa]'
                                  : 'bg-slate-100 text-slate-400'
                              }`}
                            >
                              {u.bookingCount || 0} {u.bookingCount === 1 ? 'Trip' : 'Trips'}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedUser(u);
                              }}
                              className="px-3 py-1.5 bg-[#5191fa] hover:bg-[#3d7be3] text-white text-xs font-semibold rounded-lg inline-flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>View Details</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="py-12 text-center text-slate-500 text-xs">
                No users found matching &quot;{adminSearch}&quot;.
              </div>
            )}
          </div>

          {/* Selected User Details & Booking Modal/Drawer */}
          {selectedUser && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
              <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col border border-slate-100">
                {/* Header */}
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

                {/* Body */}
                <div className="p-6 overflow-y-auto space-y-6">
                  {/* User Profile Card Summary */}
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
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
                      <div className="space-y-3">
                        {selectedUserBookings.map((b) => (
                          <div
                            key={b.id}
                            className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs hover:border-[#5191fa] transition-colors"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-mono text-xs font-bold text-[#5191fa] bg-blue-50 px-2 py-0.5 rounded">
                                    {b.bookingCode}
                                  </span>
                                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                                    {b.status}
                                  </span>
                                </div>
                                <div className="font-heading font-bold text-slate-900 text-sm">
                                  {b.tourTitle}
                                </div>
                                <div className="text-xs text-slate-500 mt-1">
                                  <strong>Dates:</strong> {b.startDate} - {b.endDate} · <strong>Party:</strong> {b.adults} Adults
                                </div>
                                {b.specialRequests && (
                                  <div className="text-xs text-slate-600 mt-2 p-2 bg-slate-50 rounded-lg border border-slate-100">
                                    <strong>Special Requests:</strong> {b.specialRequests}
                                  </div>
                                )}
                              </div>

                              <div className="text-right sm:border-l sm:pl-4 border-slate-100 shrink-0">
                                <div className="text-[10px] text-slate-400 uppercase font-bold">Total Paid</div>
                                <div className="text-base font-extrabold text-[#1a2b48]">
                                  {formatPrice(b.totalPrice)}
                                </div>
                                <div className="text-[10px] text-slate-400 mt-0.5">
                                  Booked: {b.bookingDate}
                                </div>
                              </div>
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

                {/* Footer */}
                <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
                  <button
                    onClick={() => setSelectedUser(null)}
                    className="px-5 py-2 bg-slate-800 text-white text-xs font-semibold rounded-xl hover:bg-slate-700 transition-colors cursor-pointer"
                  >
                    Close Details
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // =========================================================================
  // NORMAL TRAVELER DASHBOARD VIEW
  // =========================================================================
  return (
    <div className="bg-[#f7f8fa] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="text-xs text-slate-500 mb-4 flex items-center gap-1.5 font-medium">
          <button onClick={() => onNavigate('home')} className="hover:text-[#5191fa]">Home</button>
          <span>/</span>
          <span className="text-slate-800 font-semibold">User Dashboard</span>
        </div>

        {/* User Profile Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#1a2b48] to-[#5191fa] text-white flex items-center justify-center font-extrabold text-2xl shadow-md">
                {(user.firstName || user.email)[0].toUpperCase()}
              </div>
              <div>
                <h1 className="font-heading text-xl sm:text-2xl font-bold text-[#1a2b48]">
                  {user.firstName} {user.lastName}
                </h1>
                <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                  <span>{user.email}</span>
                  <span>·</span>
                  <span className="text-emerald-600 font-semibold">Verified Member</span>
                </div>
                {user.phone && (
                  <div className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                    <Phone className="w-3 h-3 text-slate-400" />
                    <span>{user.phone}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={handleOpenEditProfile}
                className="px-3.5 py-2 border border-slate-200 hover:border-[#5191fa] text-slate-700 hover:text-[#5191fa] text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit My Details</span>
              </button>
              <button
                onClick={() => onNavigate('tours', 'all')}
                className="px-4 py-2 bg-[#5191fa] text-white text-xs font-bold rounded-xl hover:bg-[#3d7be3] transition-all cursor-pointer"
              >
                Book New Adventure
              </button>
              <button
                onClick={logout}
                className="p-2 border border-slate-200 hover:bg-rose-50 text-slate-500 hover:text-rose-600 rounded-xl transition-all cursor-pointer"
                title="Log Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* User Details Profile Badges */}
          {(user.emergencyContact || user.passportNumber || user.bio) && (
            <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              {user.emergencyContact && (
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Emergency Contact</div>
                  <div className="font-semibold text-slate-800 mt-0.5">{user.emergencyContact}</div>
                </div>
              )}
              {user.passportNumber && (
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Passport / ID Document</div>
                  <div className="font-semibold text-slate-800 mt-0.5">{user.passportNumber}</div>
                </div>
              )}
              {user.bio && (
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 sm:col-span-3">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Travel Bio &amp; Climbing Experience</div>
                  <div className="font-normal text-slate-700 mt-0.5">{user.bio}</div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* My Bookings */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-xl font-bold text-[#1a2b48] flex items-center gap-2">
              <CalendarCheck className="w-5 h-5 text-[#5191fa]" />
              <span>My Expedition Bookings ({bookings.length})</span>
            </h2>
          </div>

          {bookings.length > 0 ? (
            <div className="space-y-4">
              {bookings.map((b) => (
                <div
                  key={b.id}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start sm:items-center gap-4">
                    <img
                      src={b.tourImage}
                      alt={b.tourTitle}
                      className="w-20 h-20 rounded-xl object-cover shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-xs font-bold text-[#5191fa] bg-blue-50 px-2 py-0.5 rounded">
                          {b.bookingCode}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                          <CheckCircle className="w-3 h-3" />
                          <span>{b.status}</span>
                        </span>
                      </div>
                      <h3 className="font-heading font-bold text-base text-[#1a2b48]">
                        {b.tourTitle}
                      </h3>
                      <div className="text-xs text-slate-500 mt-1 space-x-3">
                        <span><strong>Dates:</strong> {b.startDate} - {b.endDate}</span>
                        <span>·</span>
                        <span><strong>Party:</strong> {b.adults} Adults {b.children > 0 ? `+ ${b.children} Youths` : ''}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-end justify-between sm:justify-center border-t sm:border-t-0 pt-4 sm:pt-0 border-slate-100">
                    <div className="text-right">
                      <div className="text-[10px] text-slate-400 uppercase font-semibold">Total Cost</div>
                      <div className="text-lg font-black text-[#1a2b48]">
                        {formatPrice(b.totalPrice)}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => onNavigate('tour-detail', b.tourId)}
                        className="text-xs font-bold text-[#5191fa] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteUserBooking(b.id)}
                        className="text-slate-400 hover:text-rose-600 p-1 transition-colors cursor-pointer"
                        title="Delete booking from dashboard"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
              <p className="text-xs text-slate-500 mb-4">You have no active bookings yet.</p>
              <button
                onClick={() => onNavigate('tours', 'all')}
                className="px-5 py-2 bg-[#5191fa] text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                Explore Karakoram Tours
              </button>
            </div>
          )}

          {/* Account Privacy & Delete Self Details Option */}
          <div className="pt-8 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500">
            <span>Manage your personal data in compliance with Pakistan DTS regulations.</span>
            <button
              onClick={() => setDeleteConfirmOpen(true)}
              className="text-rose-600 hover:text-rose-700 font-semibold hover:underline cursor-pointer"
            >
              Delete My Account &amp; Details
            </button>
          </div>
        </div>
      </div>

      {/* Edit Details Modal */}
      {editProfileOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-heading font-bold text-[#1a2b48]">Update Your Details</h3>
                <p className="text-xs text-slate-500">Saved securely in your private Firestore database record.</p>
              </div>
              <button
                onClick={() => setEditProfileOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {saveSuccess && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Your profile details have been saved to Firestore!</span>
              </div>
            )}

            <form onSubmit={handleSaveProfile} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">First Name</label>
                  <input
                    type="text"
                    value={editFirstName}
                    onChange={(e) => setEditFirstName(e.target.value)}
                    required
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    value={editLastName}
                    onChange={(e) => setEditLastName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  placeholder="+92 345 6412992"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Emergency Contact (Name &amp; Phone)</label>
                <input
                  type="text"
                  value={editEmergencyContact}
                  onChange={(e) => setEditEmergencyContact(e.target.value)}
                  placeholder="e.g. John Doe (+1 555 1234567)"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Passport / National ID Number</label>
                <input
                  type="text"
                  value={editPassportNumber}
                  onChange={(e) => setEditPassportNumber(e.target.value)}
                  placeholder="Required for trekking permits"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Traveler Bio / Prior Expeditions</label>
                <textarea
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  rows={2}
                  placeholder="Tell our guides about your hiking experience, altitude records, or diet..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditProfileOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingProfile}
                  className="px-5 py-2 bg-[#5191fa] text-white font-bold rounded-xl hover:bg-[#3d7be3]"
                >
                  {savingProfile ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 text-center shadow-2xl border border-slate-100">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-3">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h4 className="font-heading font-bold text-lg text-slate-900 mb-1">Delete Account &amp; Details?</h4>
            <p className="text-xs text-slate-500 mb-6">
              This will permanently delete your user profile from our Firestore database. This action cannot be reversed.
            </p>
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => setDeleteConfirmOpen(false)}
                className="px-4 py-2 border border-slate-200 text-slate-600 text-xs font-semibold rounded-xl hover:bg-slate-50"
              >
                Keep Account
              </button>
              <button
                onClick={handleDeleteMyAccount}
                className="px-4 py-2 bg-rose-600 text-white text-xs font-semibold rounded-xl hover:bg-rose-700"
              >
                Yes, Delete My Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
