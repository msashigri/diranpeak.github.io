import React from 'react';
import {
  LayoutGrid, Package, CalendarCheck, Calendar, Users,
  Compass, Image as ImageIcon, MessageSquare, Percent,
  ThumbsUp, Globe, Handshake, Send, Bell, Activity,
  LogOut, Sparkles, MapPin, ChevronDown, ShieldCheck,
  ChevronRight, ArrowUpRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { PLATFORM_ROLES, UserRole } from '../../types/roles';

export type TravelieTab =
  | 'dashboard'
  | 'packages'
  | 'bookings'
  | 'calendar'
  | 'travelers'
  | 'guides'
  | 'gallery'
  | 'messages'
  | 'deals'
  | 'feedback'
  | 'site_settings'
  | 'partners'
  | 'subscribers'
  | 'alerts'
  | 'activities';

interface TravelieSidebarProps {
  currentTab: TravelieTab;
  onTabChange: (tab: TravelieTab) => void;
  onLogout: () => void;
}

export const TravelieSidebar: React.FC<TravelieSidebarProps> = ({
  currentTab,
  onTabChange,
  onLogout
}) => {
  const { contactInquiries, userRole, setActiveRoleView, siteSettings } = useAuth();

  const unreadMessagesCount = contactInquiries.filter(i => i.status === 'New').length || 7;

  const primaryNavItems: { id: TravelieTab; label: string; icon: React.FC<{ className?: string }>; badge?: number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'packages', label: 'Packages', icon: Package },
    { id: 'bookings', label: 'Bookings', icon: CalendarCheck },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'travelers', label: 'Travelers', icon: Users },
    { id: 'guides', label: 'Guides', icon: Compass },
    { id: 'gallery', label: 'Gallery', icon: ImageIcon },
    { id: 'messages', label: 'Messages', icon: MessageSquare, badge: unreadMessagesCount },
    { id: 'deals', label: 'Deals', icon: Percent },
    { id: 'feedback', label: 'Feedback', icon: ThumbsUp }
  ];

  const adminCmsNavItems: { id: TravelieTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'site_settings', label: 'Website CMS', icon: Globe },
    { id: 'partners', label: 'B2B Partners', icon: Handshake },
    { id: 'subscribers', label: 'Broadcasts', icon: Send },
    { id: 'alerts', label: 'Alert Settings', icon: Bell },
    { id: 'activities', label: 'Security & Audit', icon: Activity }
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200/80 min-h-screen flex flex-col justify-between shrink-0 select-none py-6 px-4">
      <div className="space-y-6">
        {/* Brand Logo matching Travelie layout in image */}
        <div className="flex items-center gap-3 px-3">
          <div className="w-9 h-9 rounded-xl bg-[#5191fa] text-white flex items-center justify-center shadow-md shadow-blue-500/20">
            <MapPin className="w-5 h-5 fill-white text-white" />
          </div>
          <div>
            <div className="text-xl font-heading font-extrabold text-[#1a2b48] tracking-tight flex items-center gap-1.5">
              <span>{siteSettings?.siteName?.split(' ')[0] || 'Travelie'}</span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-blue-50 text-[#5191fa]">
                Admin
              </span>
            </div>
            <div className="text-[10px] text-slate-400 font-medium -mt-0.5">
              Adventure Operations CRM
            </div>
          </div>
        </div>

        {/* Primary Navigation Items */}
        <nav className="space-y-1">
          {primaryNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-semibold text-xs transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#5191fa] text-white shadow-md shadow-blue-500/25 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-white text-[#5191fa]' : 'bg-[#5191fa] text-white'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* System & CMS Section */}
        <div className="pt-3 border-t border-slate-100">
          <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Platform Controls
          </div>
          <nav className="space-y-1">
            {adminCmsNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl font-medium text-xs transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#1a2b48] text-white shadow-sm font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Bottom Area: Upgrade Banner matching user image + Role Switcher + Logout */}
      <div className="space-y-3 pt-4 border-t border-slate-100 mt-6">
        {/* "Enhance Your Experience" Banner matching attached image */}
        <div className="relative rounded-2xl bg-gradient-to-b from-[#e8f1fd] via-[#d5e7fb] to-[#c2ddfa] p-4 text-center overflow-hidden border border-blue-200/60 shadow-2xs">
          {/* Subtle wavy art overlay */}
          <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_bottom_left,#3b82f6,transparent_70%)] pointer-events-none" />
          <h4 className="font-heading font-extrabold text-[#1a2b48] text-xs leading-snug relative z-10">
            Enhance Your<br />Diran Peak Experience!
          </h4>
          <p className="text-[10px] text-slate-500 mt-1 relative z-10">
            DTS Licensed Expeditions &amp; Basecamp Ops
          </p>
          <button
            type="button"
            onClick={() => onTabChange('site_settings')}
            className="mt-3 inline-block w-full py-1.5 px-3 bg-[#5191fa] hover:bg-[#3875dc] text-white text-[11px] font-bold rounded-xl shadow-sm transition-all cursor-pointer relative z-10"
          >
            Manage Portal
          </button>
        </div>

        {/* Role Simulator Switcher */}
        <div className="bg-slate-50 p-2 rounded-xl border border-slate-200 text-left">
          <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            <span>Role Simulator</span>
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
          </div>
          <select
            value={userRole}
            onChange={(e) => setActiveRoleView(e.target.value as UserRole)}
            className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1 text-[11px] font-bold text-slate-700 cursor-pointer focus:outline-none"
          >
            {PLATFORM_ROLES.map((r) => (
              <option key={r.id} value={r.id}>
                {r.shortTitle} ({r.category})
              </option>
            ))}
          </select>
        </div>

        {/* Logout Button matching image */}
        <button
          type="button"
          onClick={onLogout}
          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};
