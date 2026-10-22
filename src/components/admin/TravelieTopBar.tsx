import React, { useState } from 'react';
import { Search, Bell, ChevronDown, Shield, LogOut, Check, UserCheck, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { TravelieTab } from './TravelieSidebar';
import { PLATFORM_ROLES, UserRole } from '../../types/roles';

interface TravelieTopBarProps {
  currentTab: TravelieTab;
  onSearch?: (q: string) => void;
  onLogout: () => void;
}

export const TravelieTopBar: React.FC<TravelieTopBarProps> = ({
  currentTab,
  onSearch,
  onLogout
}) => {
  const { user, adminAuth, userRole, setActiveRoleView } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  const titlesMap: Record<TravelieTab, string> = {
    dashboard: 'Dashboard',
    packages: 'Packages',
    bookings: 'Bookings',
    calendar: 'Calendar',
    travelers: 'Travelers',
    guides: 'Guides',
    gallery: 'Gallery',
    messages: 'Messages',
    deals: 'Deals & Promotions',
    feedback: 'Feedback & Reviews',
    site_settings: 'Website Branding & Content CMS',
    partners: 'B2B Commercial Partners',
    subscribers: 'Broadcast Center',
    alerts: 'System Alerts & Notifications',
    activities: 'Security & Activity Audit'
  };

  const displayName =
    user?.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() :
    adminAuth?.adminName || 'Ruben Herwitz';

  return (
    <header className="h-20 bg-white border-b border-slate-200/80 px-6 sm:px-8 flex items-center justify-between gap-4 sticky top-0 z-30">
      {/* Title */}
      <h1 className="text-xl sm:text-2xl font-heading font-extrabold text-[#1a2b48] tracking-tight shrink-0">
        {titlesMap[currentTab] || 'Dashboard'}
      </h1>

      {/* Right Controls: Search bar + Notification + User Card */}
      <div className="flex items-center gap-3 sm:gap-5">
        {/* Search input matching image */}
        <div className="relative w-48 sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchVal}
            onChange={(e) => {
              setSearchVal(e.target.value);
              if (onSearch) onSearch(e.target.value);
            }}
            placeholder="Search anything..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200/80 rounded-2xl text-xs text-slate-800 focus:outline-none focus:border-[#5191fa] transition-all"
          />
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="w-10 h-10 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-slate-600 flex items-center justify-center transition-colors relative cursor-pointer"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 rounded-full bg-rose-500 absolute top-2.5 right-2.5 ring-2 ring-white" />
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-50 animate-in fade-in">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                <span className="text-xs font-bold text-slate-800">Notifications</span>
                <span className="text-[10px] text-blue-600 font-semibold cursor-pointer">Mark all read</span>
              </div>
              <div className="space-y-2 text-xs text-slate-600">
                <div className="p-2 rounded-xl bg-blue-50/60 border border-blue-100">
                  <div className="font-bold text-slate-900 text-[11px]">New Tour Reservation</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">K2 Base Camp Departure booked</div>
                </div>
                <div className="p-2 rounded-xl bg-emerald-50/60 border border-emerald-100">
                  <div className="font-bold text-slate-900 text-[11px]">4x4 Fleet Inquiry</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Toyota Prado charter for Hunza</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Card matching image */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-3 p-1.5 pr-2.5 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-200/60 transition-all cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#1a2b48] to-[#5191fa] text-white flex items-center justify-center font-bold text-sm shadow-xs overflow-hidden">
              {user?.avatar ? (
                <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span>{displayName[0]?.toUpperCase() || 'R'}</span>
              )}
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-xs font-bold text-[#1a2b48] leading-tight">
                {displayName}
              </div>
              <div className="text-[10px] font-semibold text-slate-400 capitalize">
                {userRole === 'admin' ? 'Admin' : userRole}
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {/* User Menu Dropdown */}
          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in">
              <div className="px-4 py-2 border-b border-slate-100 mb-1">
                <div className="text-xs font-bold text-slate-900">{displayName}</div>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5">{user?.email || 'admin@diranpeak.com'}</div>
                <div className="mt-1.5 inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Role: {userRole}</span>
                </div>
              </div>

              {/* Role Switcher in dropdown */}
              <div className="px-3 py-1.5">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Preview Role Dashboard
                </label>
                <select
                  value={userRole}
                  onChange={(e) => {
                    setActiveRoleView(e.target.value as UserRole);
                    setDropdownOpen(false);
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-slate-700 cursor-pointer"
                >
                  {PLATFORM_ROLES.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-2 border-t border-slate-100 mt-1">
                <button
                  type="button"
                  onClick={() => {
                    setDropdownOpen(false);
                    onLogout();
                  }}
                  className="w-full text-left px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout Session</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
