import React, { useState } from 'react';
import {
  CalendarCheck, Users, DollarSign, TrendingUp, TrendingDown,
  Search, Plus, MoreHorizontal, FileDown, Edit3, Trash2,
  CheckCircle, Clock, XCircle, AlertTriangle, Eye, Filter
} from 'lucide-react';
import { useAuth, Booking } from '../../context/AuthContext';

interface TravelieBookingsViewProps {
  onOpenAddBooking: () => void;
  onEditBooking: (booking: Booking) => void;
  onDeleteBooking: (booking: Booking) => void;
}

export const TravelieBookingsView: React.FC<TravelieBookingsViewProps> = ({
  onOpenAddBooking,
  onEditBooking,
  onDeleteBooking
}) => {
  const {
    bookings,
    formatPrice,
    downloadVoucher,
    updateBookingStatus
  } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'Confirmed' | 'Pending' | 'Cancelled'>('ALL');
  const [periodFilter, setPeriodFilter] = useState<'Today' | 'This Week' | 'All Time'>('All Time');
  const [timeRange, setTimeRange] = useState<'Last 12 Months' | 'Weekly' | 'Monthly'>('Last 12 Months');
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(5);

  const totalBookingsCount = bookings.length || 1200;
  const totalParticipants = bookings.reduce((sum, b) => sum + (b.adults || 1) + (b.children || 0), 0) || 2845;
  const totalEarningsUSD = bookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0) || 14795;

  const chartData = [
    { label: 'Aug 27', done: 650, canceled: 200 },
    { label: 'Sep 27', done: 780, canceled: 240 },
    { label: 'Oct 27', done: 1250, canceled: 520 },
    { label: 'Nov 27', done: 1380, canceled: 680 },
    { label: 'Des 27', done: 1200, canceled: 600 },
    { label: 'Jan 28', done: 1780, canceled: 850 },
    { label: 'Feb 28', done: 1450, canceled: 920 },
    { label: 'Mar 28', done: 1380, canceled: 900 },
    { label: 'Apr 28', done: 1560, canceled: 940 },
    { label: 'May 28', done: 1950, canceled: 960 },
    { label: 'Jun 28', done: 1720, canceled: 890 },
    { label: 'Jul 28', done: 1750, canceled: 860 }
  ];

  const filteredBookings = bookings.filter((b) => {
    if (statusFilter !== 'ALL' && b.status !== statusFilter) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      (b.customerName || '').toLowerCase().includes(q) ||
      (b.customerEmail || '').toLowerCase().includes(q) ||
      (b.bookingCode || '').toLowerCase().includes(q) ||
      (b.tourTitle || '').toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Top Split: KPI Cards + Donut Chart matching image 3112802 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: 3 KPI Cards + Chart */}
        <div className="lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* KPI 1 */}
            <div className="bg-white rounded-3xl p-5 shadow-xs border border-slate-200/80 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#5191fa] flex items-center justify-center">
                    <CalendarCheck className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500">Total Booking</span>
                </div>
                <div className="text-2xl font-extrabold text-[#1a2b48] tracking-tight tabular-nums">
                  {totalBookingsCount.toLocaleString()}
                </div>
                <div className="flex items-center gap-1 mt-1 text-[11px] font-semibold text-emerald-600">
                  <TrendingUp className="w-3 h-3" />
                  <span>+2.98%</span>
                </div>
              </div>
              <div className="w-16 h-10">
                <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible">
                  <path d="M 0 35 Q 25 40 50 20 T 100 10" fill="none" stroke="#5191fa" strokeWidth="2.5" />
                </svg>
              </div>
            </div>

            {/* KPI 2 */}
            <div className="bg-white rounded-3xl p-5 shadow-xs border border-slate-200/80 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-7 h-7 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center">
                    <Users className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500">Total Participants</span>
                </div>
                <div className="text-2xl font-extrabold text-[#1a2b48] tracking-tight tabular-nums">
                  {totalParticipants.toLocaleString()}
                </div>
                <div className="flex items-center gap-1 mt-1 text-[11px] font-semibold text-rose-500">
                  <TrendingDown className="w-3 h-3" />
                  <span>-1.45%</span>
                </div>
              </div>
              <div className="w-16 h-10">
                <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible">
                  <path d="M 0 15 Q 25 20 50 40 T 100 45" fill="none" stroke="#f43f5e" strokeWidth="2.5" />
                </svg>
              </div>
            </div>

            {/* KPI 3 */}
            <div className="bg-white rounded-3xl p-5 shadow-xs border border-slate-200/80 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#5191fa] flex items-center justify-center">
                    <DollarSign className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500">Total Earnings</span>
                </div>
                <div className="text-2xl font-extrabold text-[#1a2b48] tracking-tight tabular-nums">
                  {formatPrice(totalEarningsUSD)}
                </div>
                <div className="flex items-center gap-1 mt-1 text-[11px] font-semibold text-emerald-600">
                  <TrendingUp className="w-3 h-3" />
                  <span>+3.75%</span>
                </div>
              </div>
              <div className="w-16 h-10">
                <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible">
                  <path d="M 0 40 Q 30 45 60 25 T 100 12" fill="none" stroke="#5191fa" strokeWidth="2.5" />
                </svg>
              </div>
            </div>
          </div>

          {/* Trips Overview Spline Curve */}
          <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200/80">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div>
                <h3 className="font-heading font-extrabold text-base text-[#1a2b48]">
                  Trips Overview
                </h3>
                <div className="flex items-center gap-4 mt-1 text-xs text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-0.5 bg-[#5191fa] rounded-full inline-block" />
                    <span>Done</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-0.5 border-t border-dashed border-slate-400 inline-block" />
                    <span>Canceled</span>
                  </span>
                </div>
              </div>

              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value as any)}
                className="bg-[#5191fa] text-white text-xs font-bold px-3 py-1.5 rounded-xl cursor-pointer shadow-xs"
              >
                <option value="Last 12 Months">Last 12 Months</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
              </select>
            </div>

            <div className="relative h-56 w-full">
              {hoveredPoint !== null && (
                <div
                  className="absolute pointer-events-none transform -translate-x-1/2 -translate-y-full transition-all duration-150 z-20"
                  style={{
                    left: `${(hoveredPoint / (chartData.length - 1)) * 100}%`,
                    top: '25%'
                  }}
                >
                  <div className="bg-[#1a2b48] text-white text-center rounded-xl px-2.5 py-1 shadow-lg text-[11px] font-bold">
                    <div>1,780</div>
                    <div className="text-[9px] text-slate-300">July 2027</div>
                  </div>
                  <div className="w-[1px] h-32 border-l border-dashed border-[#5191fa] mx-auto mt-1" />
                </div>
              )}

              <svg viewBox="0 0 600 200" className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="curveFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#5191fa" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#5191fa" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {[0, 50, 100, 150].map((y, i) => (
                  <line key={i} x1="0" y1={y} x2="600" y2={y} stroke="#f1f5f9" strokeWidth="1" />
                ))}

                <path
                  d="M 0 150 C 40 150, 60 120, 100 110 C 150 100, 180 130, 230 115 C 270 100, 300 40, 350 75 C 400 105, 450 60, 500 50 C 550 40, 570 70, 600 70"
                  fill="none"
                  stroke="#5191fa"
                  strokeWidth="3"
                />

                <path
                  d="M 0 150 C 40 150, 60 120, 100 110 C 150 100, 180 130, 230 115 C 270 100, 300 40, 350 75 C 400 105, 450 60, 500 50 C 550 40, 570 70, 600 70 L 600 200 L 0 200 Z"
                  fill="url(#curveFill)"
                />

                <path
                  d="M 0 170 C 40 170, 60 185, 100 175 C 150 160, 180 140, 230 150 C 270 160, 300 130, 350 145 C 400 160, 450 130, 500 135 C 550 140, 570 150, 600 150"
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />

                {chartData.map((d, i) => (
                  <circle
                    key={i}
                    cx={(i / (chartData.length - 1)) * 600}
                    cy={i === 5 ? 58 : 95}
                    r={hoveredPoint === i ? 6 : 3}
                    fill={hoveredPoint === i ? '#5191fa' : 'transparent'}
                    stroke="#ffffff"
                    strokeWidth={hoveredPoint === i ? 2 : 0}
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredPoint(i)}
                  />
                ))}
              </svg>

              <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium pt-1">
                {chartData.map((c, idx) => (
                  <span key={idx}>{c.label}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Top Packages Donut */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 shadow-xs border border-slate-200/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-extrabold text-base text-[#1a2b48]">
                Top Packages
              </h3>
              <MoreHorizontal className="w-4 h-4 text-slate-400 cursor-pointer" />
            </div>

            <div className="relative w-44 h-44 mx-auto my-3">
              <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                <circle cx="50" cy="50" r="38" fill="none" stroke="#e0f2fe" strokeWidth="12" />
                <circle cx="50" cy="50" r="38" fill="none" stroke="#5191fa" strokeWidth="12" strokeDasharray="83 238" strokeDashoffset="0" />
                <circle cx="50" cy="50" r="38" fill="none" stroke="#38bdf8" strokeWidth="12" strokeDasharray="66 238" strokeDashoffset="-83" />
                <circle cx="50" cy="50" r="38" fill="none" stroke="#93c5fd" strokeWidth="12" strokeDasharray="52 238" strokeDashoffset="-149" />
                <circle cx="50" cy="50" r="38" fill="none" stroke="#bfdbfe" strokeWidth="12" strokeDasharray="36 238" strokeDashoffset="-201" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] text-slate-400 font-semibold">This Week</span>
                <span className="text-xl font-extrabold text-[#1a2b48] leading-tight">1,856</span>
                <span className="text-[9px] text-slate-400 font-medium">Total Participants</span>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-100">
            {[
              { pct: '35%', name: 'Tokyo Cultural Adventure', count: '650 Participants', color: 'bg-[#5191fa]' },
              { pct: '28%', name: 'Bali Beach Escape', count: '520 Participants', color: 'bg-[#38bdf8]' },
              { pct: '22%', name: 'Safari Adventure', count: '408 Participants', color: 'bg-[#93c5fd]' },
              { pct: '15%', name: 'Greek Island Hopping', count: '278 Participants', color: 'bg-[#bfdbfe]' }
            ].map((p, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded text-white ${p.color}`}>
                    {p.pct}
                  </span>
                  <div>
                    <div className="font-bold text-slate-800 leading-tight">{p.name}</div>
                    <div className="text-[10px] text-slate-400">{p.count}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bookings Table matching image 3112802 */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-xs border border-slate-200/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h3 className="font-heading font-extrabold text-lg text-[#1a2b48]">
            Bookings
          </h3>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Search */}
            <div className="relative w-48 sm:w-60">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search name, package, etc"
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#5191fa]"
              />
            </div>

            {/* Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 cursor-pointer focus:outline-none"
            >
              <option value="ALL">All Status</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            {/* Period */}
            <select
              value={periodFilter}
              onChange={(e) => setPeriodFilter(e.target.value as any)}
              className="bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 cursor-pointer focus:outline-none"
            >
              <option value="All Time">All Time</option>
              <option value="Today">Today</option>
              <option value="This Week">This Week</option>
            </select>

            {/* Add Booking */}
            <button
              type="button"
              onClick={onOpenAddBooking}
              className="px-4 py-2 bg-[#5191fa] hover:bg-[#3875dc] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Add Booking</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="pb-3.5 font-semibold">Name</th>
                <th className="pb-3.5 font-semibold">Booking Code</th>
                <th className="pb-3.5 font-semibold">Package</th>
                <th className="pb-3.5 font-semibold">Duration</th>
                <th className="pb-3.5 font-semibold">Date</th>
                <th className="pb-3.5 font-semibold">Price</th>
                <th className="pb-3.5 font-semibold text-center">Status</th>
                <th className="pb-3.5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBookings.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-4 font-bold text-[#1a2b48]">
                    {b.customerName || 'Explorer'}
                    <div className="text-[10px] text-slate-400 font-normal">{b.customerEmail}</div>
                  </td>
                  <td className="py-4 font-mono font-medium text-slate-500">
                    {b.bookingCode}
                  </td>
                  <td className="py-4 font-semibold text-slate-800">
                    {b.tourTitle}
                  </td>
                  <td className="py-4 text-slate-500">
                    {b.adults} Adults {b.children ? `+ ${b.children} K` : ''} · 8 Days
                  </td>
                  <td className="py-4 text-slate-500">
                    {b.startDate}
                  </td>
                  <td className="py-4 font-extrabold text-[#1a2b48] tabular-nums">
                    {formatPrice(b.totalPrice)}
                  </td>
                  <td className="py-4 text-center">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-[11px] font-bold ${
                        b.status === 'Confirmed' ? 'bg-blue-50 text-[#5191fa]' :
                        b.status === 'Cancelled' ? 'bg-rose-50 text-rose-600' :
                        'bg-amber-50 text-amber-600'
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => downloadVoucher(b)}
                        className="p-1.5 text-slate-400 hover:text-[#5191fa] hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                        title="Download PDF Voucher"
                      >
                        <FileDown className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onEditBooking(b)}
                        className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                        title="Edit Booking"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDeleteBooking(b)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
