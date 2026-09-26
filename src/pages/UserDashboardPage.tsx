import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, CalendarCheck, MapPin, CheckCircle, Clock, ShieldCheck, LogOut, ArrowRight } from 'lucide-react';

export const UserDashboardPage: React.FC<{ onNavigate: (route: string, param?: string) => void }> = ({ onNavigate }) => {
  const { user, isAuthenticated, bookings, formatPrice, logout, openLogin } = useAuth();

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
                {user.firstName[0]}
              </div>
              <div>
                <h1 className="font-heading text-xl sm:text-2xl font-bold text-[#1a2b48]">
                  {user.firstName} {user.lastName}
                </h1>
                <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                  <span>{user.email}</span>
                  <span>·</span>
                  <span className="text-emerald-600 font-semibold">Verified Trekker</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
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
                    <button
                      onClick={() => onNavigate('tour-detail', b.tourId)}
                      className="mt-2 text-xs font-bold text-[#5191fa] hover:underline flex items-center gap-1"
                    >
                      <span>View Itinerary</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
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
        </div>
      </div>
    </div>
  );
};
