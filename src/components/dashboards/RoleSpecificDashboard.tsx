import React, { useState } from 'react';
import { useAuth, Booking } from '../../context/AuthContext';
import { UserRole, getRoleConfig, PLATFORM_ROLES } from '../../types/roles';
import {
  Compass, Mountain, Car, Building2, User, Shield, ShieldCheck,
  CalendarCheck, Heart, FileText, CheckCircle2, Clock, MapPin,
  Phone, Mail, AlertTriangle, ArrowRight, Download, Award,
  Check, ChevronRight, Sparkles, Navigation, ShieldAlert,
  Send, Users, Radio, Wrench, FileDown, Layers, FileCheck, Star
} from 'lucide-react';

interface RoleSpecificDashboardProps {
  onNavigate: (route: string, param?: string) => void;
}

export const RoleSpecificDashboard: React.FC<RoleSpecificDashboardProps> = ({ onNavigate }) => {
  const {
    user,
    userRole,
    activeRoleView,
    setActiveRoleView,
    bookings,
    favorites,
    isFavorite,
    toggleFavorite,
    formatPrice,
    downloadVoucher,
    logout,
    contactInquiries,
    partnerRequests,
    tours
  } = useAuth();

  const roleConfig = getRoleConfig(userRole);
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [acclimatizationLogged, setAcclimatizationLogged] = useState(false);
  const [gearChecked, setGearChecked] = useState<Record<string, boolean>>({
    crampons: true,
    iceAxe: true,
    downSuit: true,
    harness: true,
    boots8000m: true,
    satelliteTracker: true,
    goggles: false
  });

  const [vehicleAvailability, setVehicleAvailability] = useState<Record<string, boolean>>({
    'prado-tx': true,
    'hilux-revo': true,
    'hiace-grand-cabin': true,
    'coaster-saloon': false
  });

  const [hotelRoomInventory, setHotelRoomInventory] = useState<Record<string, number>>({
    'Deluxe Valley View': 4,
    'Executive Mountain Suite': 2,
    'Climber Basecamp Room': 6
  });

  const myBookings = bookings.filter(
    b => b.userId === user?.id || (b.customerEmail && b.customerEmail.toLowerCase() === user?.email?.toLowerCase())
  );

  return (
    <div className="bg-[#f7f8fa] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Top Header Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div className="flex items-start sm:items-center gap-4">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center font-extrabold text-2xl shadow-sm border ${roleConfig.borderColor} ${roleConfig.badgeBg} ${roleConfig.badgeText}`}>
                {userRole === 'climber' ? <Mountain className="w-8 h-8" /> :
                 userRole === 'guide' ? <Compass className="w-8 h-8" /> :
                 userRole === 'partner_vehicle' ? <Car className="w-8 h-8" /> :
                 userRole === 'partner_hotel' ? <Building2 className="w-8 h-8" /> :
                 userRole === 'manager' ? <Layers className="w-8 h-8" /> :
                 userRole === 'moderator' ? <ShieldCheck className="w-8 h-8" /> :
                 <User className="w-8 h-8" />}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className={`text-xs font-black uppercase tracking-wider px-3 py-0.5 rounded-full border ${roleConfig.borderColor} ${roleConfig.badgeBg} ${roleConfig.badgeText}`}>
                    {roleConfig.label}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    Category: <strong>{roleConfig.category}</strong>
                  </span>
                  {user?.isVerified && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3" /> Verified Account
                    </span>
                  )}
                </div>
                <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#1a2b48]">
                  {user?.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : 'Explorer Account'}
                </h1>
                <p className="text-xs text-slate-500 mt-1 max-w-xl">
                  {roleConfig.description}
                </p>
              </div>
            </div>

            {/* Role Switcher for preview / testing + Logout */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="bg-slate-50 border border-slate-200 p-1.5 rounded-2xl flex items-center gap-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2">
                  Role View:
                </span>
                <select
                  value={userRole}
                  onChange={(e) => setActiveRoleView(e.target.value as UserRole)}
                  className="bg-white border border-slate-200 rounded-xl px-2.5 py-1 text-xs font-bold text-slate-800 focus:outline-none cursor-pointer"
                >
                  {PLATFORM_ROLES.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.shortTitle} ({r.category})
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                onClick={async () => {
                  await logout();
                  onNavigate('home');
                }}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                Log Out
              </button>
            </div>
          </div>

          {/* Role Permissions Pill Row */}
          <div className="pt-4 flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">
              Active Permissions:
            </span>
            {roleConfig.permissions.map((perm, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 bg-slate-100/90 hover:bg-slate-200 text-slate-700 text-[11px] font-medium rounded-lg flex items-center gap-1 transition-colors"
              >
                <Check className="w-3 h-3 text-[#5191fa]" />
                <span>{perm}</span>
              </span>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ROLE 1: HIGH-ALTITUDE CLIMBER PORTAL                                      */}
        {/* ========================================================================= */}
        {userRole === 'climber' && (
          <div className="space-y-6">
            {/* Mountaineering Status KPIs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Peak Permitted</div>
                <div className="text-xl font-black text-[#1a2b48] mt-1">Diran Peak (7,266 m)</div>
                <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">Government LOI Issued</div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Summit Window</div>
                <div className="text-xl font-black text-[#5191fa] mt-1">July 15 - Aug 05</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Base Camp Trek: 6 Days</div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Climber License</div>
                <div className="text-xl font-black text-amber-600 mt-1">ACP-9482-PK</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Alpine Club Pakistan Verified</div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Medical Fitness</div>
                <div className="text-xl font-black text-emerald-600 mt-1">Cleared Class-A</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Altitude ECG &amp; Spirometry</div>
              </div>
            </div>

            {/* Expedition Waypoints & Acclimatization Schedule */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <div>
                  <h3 className="text-lg font-heading font-bold text-[#1a2b48] flex items-center gap-2">
                    <Navigation className="w-5 h-5 text-[#5191fa]" />
                    <span>Altitude Acclimatization &amp; High Camps Profile</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Official GPS staging coordinates and acclimatization rotations for Diran Peak North Ridge.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setAcclimatizationLogged(!acclimatizationLogged)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    acclimatizationLogged
                      ? 'bg-emerald-600 text-white'
                      : 'bg-blue-50 text-[#5191fa] hover:bg-blue-100'
                  }`}
                >
                  {acclimatizationLogged ? '✓ Acclimatization Logged' : '+ Log Pulse / O2'}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                {[
                  { camp: 'Minapin Basecamp', alt: '3,700 m', status: 'Completed', pulse: '68 bpm', spo2: '96%' },
                  { camp: 'Camp 1 (Glacier)', alt: '4,850 m', status: 'Completed', pulse: '74 bpm', spo2: '92%' },
                  { camp: 'Camp 2 (Icefall)', alt: '5,500 m', status: 'In Rotation', pulse: '82 bpm', spo2: '86%' },
                  { camp: 'Camp 3 (Col)', alt: '6,300 m', status: 'Staged', pulse: '—', spo2: '—' },
                  { camp: 'Summit Ridge', alt: '7,266 m', status: 'Target', pulse: '—', spo2: '—' }
                ].map((stage, idx) => (
                  <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-[#5191fa]">Stage 0{idx + 1}</span>
                      <h4 className="font-bold text-slate-800 text-sm mt-0.5">{stage.camp}</h4>
                      <div className="text-base font-extrabold text-slate-900 mt-1">{stage.alt}</div>
                    </div>
                    <div className="pt-3 border-t border-slate-200/60 mt-3 text-[11px] text-slate-500">
                      <div>Status: <strong className="text-slate-800">{stage.status}</strong></div>
                      <div>SpO2: <strong className="text-emerald-600">{stage.spo2}</strong></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* High-Altitude Gear Checklist */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
              <h3 className="text-lg font-heading font-bold text-[#1a2b48] mb-1 flex items-center gap-2">
                <Wrench className="w-5 h-5 text-amber-500" />
                <span>Mandatory Technical Mountain Gear Checklist</span>
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Verified equipment required before departure from Skardu Basecamp operations desk.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { key: 'crampons', label: 'Rigid Steel Crampons (12-Point)', note: 'Grivel / Petzl certified' },
                  { key: 'iceAxe', label: 'Technical Alpine Ice Axe', note: 'With leash & adze' },
                  { key: 'downSuit', label: '8000m Down Expedition Suit', note: '-40°C rated 850+ fill' },
                  { key: 'harness', label: 'Alpine Climbing Harness', note: 'Screwgate carabiners' },
                  { key: 'boots8000m', label: 'Double Triple Mountaineering Boots', note: 'La Sportiva / Scarpa' },
                  { key: 'satelliteTracker', label: 'Garmin inReach Satellite SOS', note: 'Active Iridium subscription' },
                  { key: 'goggles', label: 'Category 4 Glacier Glasses', note: 'With removable side shields' }
                ].map((item) => (
                  <label
                    key={item.key}
                    className={`p-3.5 rounded-2xl border flex items-start gap-3 cursor-pointer transition-colors ${
                      gearChecked[item.key]
                        ? 'bg-emerald-50/60 border-emerald-300'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={Boolean(gearChecked[item.key])}
                      onChange={(e) => setGearChecked(prev => ({ ...prev, [item.key]: e.target.checked }))}
                      className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-800">{item.label}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{item.note}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* ROLE 2: VEHICLE FLEET PARTNER PORTAL                                      */}
        {/* ========================================================================= */}
        {userRole === 'partner_vehicle' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Fleet Vehicles</div>
                <div className="text-2xl font-black text-[#1a2b48] mt-1">12 4x4 Jeeps</div>
                <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">8 Available · 4 Dispatched</div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Active Charters</div>
                <div className="text-2xl font-black text-[#5191fa] mt-1">5 Missions</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Skardu, Askole, Hunza transit</div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Transport Permit</div>
                <div className="text-2xl font-black text-amber-600 mt-1">GB-RTA #481</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Commercial Mountain Route Clearance</div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">KKH Road Alert</div>
                <div className="text-2xl font-black text-emerald-600 mt-1">Open Clear</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Kohistan &amp; Babusar Pass normal</div>
              </div>
            </div>

            {/* Fleet Availability Manager */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
              <h3 className="text-lg font-heading font-bold text-[#1a2b48] mb-1 flex items-center gap-2">
                <Car className="w-5 h-5 text-[#5191fa]" />
                <span>Mountain 4x4 Fleet Availability &amp; Dispatch Console</span>
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Toggle live vehicle availability for the Diran Peak Adventure central reservation engine.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { id: 'prado-tx', name: 'Toyota Prado TX 4WD', capacity: '5 Passengers', terrain: 'Deosai & Babusar', rate: '$125 / day' },
                  { id: 'hilux-revo', name: 'Toyota Hilux Revo 4x4', capacity: '4 Climbers + Expedition Gear', terrain: 'Askole & Hushe Track', rate: '$135 / day' },
                  { id: 'hiace-grand-cabin', name: 'Toyota HiAce Grand Cabin', capacity: '12 Passengers', terrain: 'Main KKH Highway', rate: '$140 / day' },
                  { id: 'coaster-saloon', name: 'Toyota Coaster Executive', capacity: '22 Passengers', terrain: 'Islamabad - Gilgit', rate: '$195 / day' }
                ].map((veh) => (
                  <div key={veh.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold uppercase text-[#5191fa]">{veh.terrain}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          vehicleAvailability[veh.id] ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {vehicleAvailability[veh.id] ? 'Available' : 'Booked'}
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm">{veh.name}</h4>
                      <p className="text-xs text-slate-500 mt-1">{veh.capacity}</p>
                      <div className="text-sm font-extrabold text-[#1a2b48] mt-2">{veh.rate}</div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setVehicleAvailability(prev => ({ ...prev, [veh.id]: !prev[veh.id] }))}
                      className="mt-4 w-full py-1.5 px-3 bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                    >
                      {vehicleAvailability[veh.id] ? 'Mark as Dispatched' : 'Mark as Ready'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* ROLE 3: HOTEL & RESORT PARTNER PORTAL                                     */}
        {/* ========================================================================= */}
        {userRole === 'partner_hotel' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Rooms Allocated</div>
                <div className="text-2xl font-black text-[#1a2b48] mt-1">28 Rooms</div>
                <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">85% Seasonal Occupancy</div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Climber Rest Stays</div>
                <div className="text-2xl font-black text-emerald-600 mt-1">16 Booked</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Post-Summit Rest &amp; Recuperation</div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">DTS License</div>
                <div className="text-2xl font-black text-amber-600 mt-1">DTS-HTL #192</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Department of Tourist Services Verified</div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Guest Rating</div>
                <div className="text-2xl font-black text-amber-500 mt-1">4.9 / 5.0</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Based on 140+ verified stays</div>
              </div>
            </div>

            {/* Room Inventory Management */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
              <h3 className="text-lg font-heading font-bold text-[#1a2b48] mb-1 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-emerald-600" />
                <span>Seasonal Room Inventory &amp; Climber Allocation</span>
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Manage available rooms for alpine trekking parties and expedition leaders.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {Object.entries(hotelRoomInventory).map(([type, count]) => (
                  <div key={type} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-emerald-600">Active Inventory</span>
                      <h4 className="font-bold text-slate-800 text-sm mt-0.5">{type}</h4>
                      <div className="text-2xl font-black text-[#1a2b48] mt-2">{count} Available</div>
                    </div>

                    <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-200">
                      <button
                        type="button"
                        onClick={() => setHotelRoomInventory(prev => ({ ...prev, [type]: Math.max(0, count - 1) }))}
                        className="flex-1 py-1 px-2 bg-white hover:bg-slate-200 border border-slate-200 text-slate-700 font-bold text-xs rounded-lg"
                      >
                        -1 Room
                      </button>
                      <button
                        type="button"
                        onClick={() => setHotelRoomInventory(prev => ({ ...prev, [type]: count + 1 }))}
                        className="flex-1 py-1 px-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg"
                      >
                        +1 Room
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* ROLE 4: MOUNTAIN GUIDE & HIGH ALTITUDE PORTER PORTAL                      */}
        {/* ========================================================================= */}
        {userRole === 'guide' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Assigned Trips</div>
                <div className="text-2xl font-black text-[#1a2b48] mt-1">3 Expeditions</div>
                <div className="text-[11px] text-indigo-600 font-semibold mt-0.5">K2 Baltoro &amp; Gondogoro La</div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Lead Climbers</div>
                <div className="text-2xl font-black text-[#5191fa] mt-1">14 Clients</div>
                <div className="text-[11px] text-slate-500 mt-0.5">International Mountaineers</div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Guide Certification</div>
                <div className="text-2xl font-black text-amber-600 mt-1">UIAGM / ACP</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Wilderness First Responder (WFR)</div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">High Summits Logged</div>
                <div className="text-2xl font-black text-emerald-600 mt-1">19 Summits</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Diran, Spantik, Broad Peak</div>
              </div>
            </div>

            {/* Guide Schedule & Field Log */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
              <h3 className="text-lg font-heading font-bold text-[#1a2b48] mb-1 flex items-center gap-2">
                <Compass className="w-5 h-5 text-indigo-600" />
                <span>Field Roster &amp; Client Safety Manifest</span>
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Active expeditions assigned by Diran Peak Adventure operations desk.
              </p>

              <div className="space-y-3">
                {[
                  {
                    title: 'K2 & Concordia Base Camp Trek',
                    dates: 'July 10 - July 24',
                    party: '8 Trekkers (UK, Germany, USA)',
                    leadPorter: 'Ali Balti (Senior HAP)',
                    status: 'Manifest Confirmed'
                  },
                  {
                    title: 'Spantik Golden Peak Expedition (7,027 m)',
                    dates: 'August 01 - August 22',
                    party: '4 Alpine Climbers (France, Italy)',
                    leadPorter: 'Hassan Hushey (Summit HAP)',
                    status: 'Permits Verified'
                  }
                ].map((exp, idx) => (
                  <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="inline-block px-2 py-0.5 bg-indigo-50 text-indigo-700 text-[10px] font-bold uppercase rounded mb-1">
                        {exp.status}
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm">{exp.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Dates: {exp.dates} · Party: {exp.party} · HAP: {exp.leadPorter}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => alert(`Client safety manifest for ${exp.title} loaded.`)}
                        className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold rounded-xl cursor-pointer"
                      >
                        View Manifest
                      </button>
                      <button
                        type="button"
                        onClick={() => alert(`Emergency medical contact roster sent to inReach device.`)}
                        className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl cursor-pointer"
                      >
                        Medical SOS Sync
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* ROLE 5: GENERAL TRAVELER & TOURIST PORTAL                                 */}
        {/* ========================================================================= */}
        {(userRole === 'traveler' || userRole === 'customer') && (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">My Bookings</div>
                <div className="text-2xl font-black text-[#5191fa] mt-1">{myBookings.length}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Reserved Departures</div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Wishlist &amp; Saved</div>
                <div className="text-2xl font-black text-rose-500 mt-1">{favorites.length}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Favorite Expeditions</div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Voucher Status</div>
                <div className="text-2xl font-black text-emerald-600 mt-1">DTS Ready</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Official PDF Licensed</div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Loyalty Status</div>
                <div className="text-2xl font-black text-amber-500 mt-1">Bronze Explorer</div>
                <div className="text-[11px] text-slate-500 mt-0.5">10% Off Next Booking</div>
              </div>
            </div>

            {/* Bookings List */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <div>
                  <h3 className="text-lg font-heading font-bold text-[#1a2b48] flex items-center gap-2">
                    <CalendarCheck className="w-5 h-5 text-[#5191fa]" />
                    <span>My Tour &amp; Expedition Reservations ({myBookings.length})</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Download verified Government of Pakistan licensed expedition vouchers anytime.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate('tours', 'all')}
                  className="px-4 py-2 bg-[#5191fa] hover:bg-[#3875dc] text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-xs"
                >
                  Book Another Adventure
                </button>
              </div>

              {myBookings.length === 0 ? (
                <div className="p-12 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  <Mountain className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                  <h4 className="text-sm font-bold text-slate-700">No active bookings found</h4>
                  <p className="text-xs text-slate-400 mt-1 mb-4">
                    Explore our K2 Base Camp, Diran Peak, and Hunza cultural tours to reserve your journey.
                  </p>
                  <button
                    onClick={() => onNavigate('tours', 'all')}
                    className="px-4 py-2 bg-[#5191fa] text-white text-xs font-bold rounded-xl cursor-pointer"
                  >
                    Browse Tour Catalog
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {myBookings.map((b) => (
                    <div
                      key={b.id}
                      className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="font-mono text-xs font-bold text-[#5191fa] bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                            {b.bookingCode}
                          </span>
                          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                            b.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' :
                            b.status === 'Cancelled' ? 'bg-rose-100 text-rose-800' :
                            'bg-amber-100 text-amber-800'
                          }`}>
                            {b.status}
                          </span>
                        </div>
                        <h4 className="font-bold text-slate-900 text-base">{b.tourTitle}</h4>
                        <div className="text-xs text-slate-500 mt-1">
                          Dates: {b.startDate} to {b.endDate} · {b.adults} Adults {b.children ? `· ${b.children} Children` : ''}
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        <div className="text-left md:text-right mr-2">
                          <div className="text-[10px] font-bold text-slate-400 uppercase">Total Tariff</div>
                          <div className="text-base font-extrabold text-[#1a2b48]">{formatPrice(b.totalPrice)}</div>
                        </div>

                        <button
                          type="button"
                          onClick={() => downloadVoucher(b)}
                          className="px-4 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 font-bold text-xs rounded-xl flex items-center gap-2 shadow-2xs transition-colors cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5 text-[#5191fa]" />
                          <span>PDF Voucher</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
