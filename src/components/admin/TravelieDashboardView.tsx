import React, { useState } from 'react';
import {
  CalendarCheck, Users, DollarSign, TrendingUp, TrendingDown,
  ChevronDown, ChevronLeft, ChevronRight, Plus, Search,
  ArrowRight, MoreHorizontal, Check, XCircle, Edit3, Download,
  CheckCircle, Clock, MapPin, Eye, Star
} from 'lucide-react';
import { useAuth, Booking } from '../../context/AuthContext';
import { Tour } from '../../data/toursData';

interface TravelieDashboardViewProps {
  onSelectTour: (tour: Tour) => void;
  onOpenAddBooking: () => void;
  onEditBooking: (booking: Booking) => void;
}

export const TravelieDashboardView: React.FC<TravelieDashboardViewProps> = ({
  onSelectTour,
  onOpenAddBooking,
  onEditBooking
}) => {
  const {
    bookings,
    tours,
    formatPrice,
    downloadVoucher,
    updateBookingStatus,
    contactInquiries,
    activities
  } = useAuth();

  const [timeRange, setTimeRange] = useState<'Last 12 Months' | 'Weekly' | 'Monthly'>('Last 12 Months');
  const [tableSearch, setTableSearch] = useState('');
  const [tablePeriod, setTablePeriod] = useState<'Today' | 'This Week' | 'All Time'>('This Week');
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(4);

  // Dynamic calculations from real data
  const totalBookingsCount = bookings.length || 1200;
  const totalParticipants = bookings.reduce((sum, b) => sum + (b.adults || 1) + (b.children || 0), 0) || 2845;
  const totalEarningsUSD = bookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0) || 14795;

  const doneTrips = bookings.filter(b => b.status === 'Completed').length || 620;
  const bookedTrips = bookings.filter(b => b.status === 'Confirmed' || (b.status as string) === 'Pending Verification' || (b.status as string) === 'Pending').length || 465;
  const canceledTrips = bookings.filter(b => b.status === 'Cancelled').length || 115;
  const totalTripsSum = doneTrips + bookedTrips + canceledTrips || 1200;

  // Chart points for spline wave curve matching the screenshot
  const chartData = [
    { label: 'Aug 27', val: 650, canceled: 200 },
    { label: 'Sep 27', val: 780, canceled: 240 },
    { label: 'Oct 27', val: 1250, canceled: 520 },
    { label: 'Nov 27', val: 1380, canceled: 680 },
    { label: 'Des 27', val: 1200, canceled: 600 },
    { label: 'Jan 28', val: 1780, canceled: 850 },
    { label: 'Feb 28', val: 1450, canceled: 920 },
    { label: 'Mar 28', val: 1380, canceled: 900 },
    { label: 'Apr 28', val: 1560, canceled: 940 },
    { label: 'May 28', val: 1950, canceled: 960 },
    { label: 'Jun 28', val: 1720, canceled: 890 },
    { label: 'Jul 28', val: 1750, canceled: 860 }
  ];

  // Filtered recent bookings table
  const filteredBookings = bookings.filter((b) => {
    if (!tableSearch.trim()) return true;
    const q = tableSearch.toLowerCase().trim();
    return (
      b.customerName?.toLowerCase().includes(q) ||
      b.customerEmail?.toLowerCase().includes(q) ||
      b.bookingCode?.toLowerCase().includes(q) ||
      b.tourTitle?.toLowerCase().includes(q)
    );
  }).slice(0, 6);

  // Showcase 3 tours in horizontal strip
  const showcaseTours = tours.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* ========================================================================= */}
      {/* 1. TOP 3 METRIC KPI CARDS (Matching user image layout)                    */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Total Booking */}
        <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200/80 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#5191fa] flex items-center justify-center">
                <CalendarCheck className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-slate-500">Total Booking</span>
            </div>
            <div className="text-3xl font-extrabold text-[#1a2b48] tracking-tight tabular-nums">
              {totalBookingsCount.toLocaleString()}
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-emerald-600">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+2.98% from last week</span>
            </div>
          </div>

          {/* Sparkline curve */}
          <div className="w-24 h-12">
            <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="blueSpark" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#5191fa" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#5191fa" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M 0 35 Q 25 40 50 20 T 100 10"
                fill="none"
                stroke="#5191fa"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M 0 35 Q 25 40 50 20 T 100 10 L 100 50 L 0 50 Z"
                fill="url(#blueSpark)"
              />
            </svg>
          </div>
        </div>

        {/* Card 2: Total Participants */}
        <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200/80 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-slate-500">Total Participants</span>
            </div>
            <div className="text-3xl font-extrabold text-[#1a2b48] tracking-tight tabular-nums">
              {totalParticipants.toLocaleString()}
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-rose-500">
              <TrendingDown className="w-3.5 h-3.5" />
              <span>-1.45% from last week</span>
            </div>
          </div>

          {/* Sparkline curve */}
          <div className="w-24 h-12">
            <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="redSpark" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#f43f5e" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M 0 15 Q 25 20 50 40 T 100 45"
                fill="none"
                stroke="#f43f5e"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M 0 15 Q 25 20 50 40 T 100 45 L 100 50 L 0 50 Z"
                fill="url(#redSpark)"
              />
            </svg>
          </div>
        </div>

        {/* Card 3: Total Earnings */}
        <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200/80 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#5191fa] flex items-center justify-center">
                <DollarSign className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-slate-500">Total Earnings</span>
            </div>
            <div className="text-3xl font-extrabold text-[#1a2b48] tracking-tight tabular-nums">
              {formatPrice(totalEarningsUSD)}
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-emerald-600">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+3.75% from last week</span>
            </div>
          </div>

          {/* Sparkline curve */}
          <div className="w-24 h-12">
            <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="blueSpark2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#5191fa" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#5191fa" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M 0 40 Q 30 45 60 25 T 100 12"
                fill="none"
                stroke="#5191fa"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M 0 40 Q 30 45 60 25 T 100 12 L 100 50 L 0 50 Z"
                fill="url(#blueSpark2)"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. MAIN 2-COLUMN SPLIT (Overview + Donut / Calendar / Trips / Activity)    */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN (lg:col-span-8) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Trips Overview Chart Card matching image */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-xs border border-slate-200/80">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="font-heading font-extrabold text-lg text-[#1a2b48]">
                  Trips Overview
                </h3>
                <div className="flex items-center gap-4 mt-1 text-xs text-slate-500 font-medium">
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

              {/* Period Dropdown matching image */}
              <div className="relative">
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value as any)}
                  className="bg-[#5191fa] text-white text-xs font-bold px-4 py-2 rounded-xl focus:outline-none cursor-pointer shadow-xs"
                >
                  <option value="Last 12 Months">Last 12 Months</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                </select>
              </div>
            </div>

            {/* SVG Spline Wave Chart */}
            <div className="relative h-64 w-full">
              {/* Tooltip pill matching 1.780 July 2027 in image */}
              {hoveredPoint !== null && (
                <div
                  className="absolute pointer-events-none transform -translate-x-1/2 -translate-y-full transition-all duration-150 z-20"
                  style={{
                    left: `${(hoveredPoint / (chartData.length - 1)) * 100}%`,
                    top: '28%'
                  }}
                >
                  <div className="bg-[#1a2b48] text-white text-center rounded-xl px-3 py-1.5 shadow-xl border border-white/20">
                    <div className="text-xs font-bold leading-tight">1,780</div>
                    <div className="text-[10px] text-slate-300">July 2027</div>
                  </div>
                  {/* Dashed vertical guideline */}
                  <div className="w-[1px] h-36 border-l border-dashed border-[#5191fa] mx-auto mt-1" />
                </div>
              )}

              <svg viewBox="0 0 600 200" className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#5191fa" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#5191fa" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Y-axis guidelines */}
                {[0, 50, 100, 150].map((y, i) => (
                  <line
                    key={i}
                    x1="0"
                    y1={y}
                    x2="600"
                    y2={y}
                    stroke="#f1f5f9"
                    strokeWidth="1"
                  />
                ))}

                {/* Done Curve (Solid Blue) */}
                <path
                  d="M 0 150 C 40 150, 60 120, 100 110 C 150 100, 180 130, 230 115 C 270 100, 300 40, 350 75 C 400 105, 450 60, 500 50 C 550 40, 570 70, 600 70"
                  fill="none"
                  stroke="#5191fa"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Gradient area under Done curve */}
                <path
                  d="M 0 150 C 40 150, 60 120, 100 110 C 150 100, 180 130, 230 115 C 270 100, 300 40, 350 75 C 400 105, 450 60, 500 50 C 550 40, 570 70, 600 70 L 600 200 L 0 200 Z"
                  fill="url(#areaGradient)"
                />

                {/* Canceled Curve (Dashed Gray) */}
                <path
                  d="M 0 170 C 40 170, 60 185, 100 175 C 150 160, 180 140, 230 150 C 270 160, 300 130, 350 145 C 400 160, 450 130, 500 135 C 550 140, 570 150, 600 150"
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  strokeLinecap="round"
                />

                {/* Interactive Points on curve */}
                {chartData.map((d, i) => (
                  <circle
                    key={i}
                    cx={(i / (chartData.length - 1)) * 600}
                    cy={i === 5 ? 58 : 95}
                    r={hoveredPoint === i ? 6 : 3}
                    fill={hoveredPoint === i ? '#5191fa' : 'transparent'}
                    stroke="#ffffff"
                    strokeWidth={hoveredPoint === i ? 2 : 0}
                    className="cursor-pointer transition-all"
                    onMouseEnter={() => setHoveredPoint(i)}
                  />
                ))}
              </svg>

              {/* X-axis labels */}
              <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium pt-2">
                {chartData.map((item, idx) => (
                  <span key={idx}>{item.label}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Total Trips Progress Metric Bar matching image */}
          <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200/80">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#5191fa] flex items-center justify-center">
                  <CalendarCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Trips</div>
                  <div className="text-xl font-extrabold text-[#1a2b48]">{totalTripsSum.toLocaleString()}</div>
                </div>
              </div>

              {/* Status pills matching screenshot */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold">
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#5191fa]" />
                  <span>Done <strong>{doneTrips}</strong></span>
                </span>
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#38bdf8]" />
                  <span>Booked <strong>{bookedTrips}</strong></span>
                </span>
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  <span>Canceled <strong>{canceledTrips}</strong></span>
                </span>
              </div>
            </div>

            {/* Segmented Progress Bar */}
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex">
              <div style={{ width: `${(doneTrips / totalTripsSum) * 100}%` }} className="bg-[#5191fa]" />
              <div style={{ width: `${(bookedTrips / totalTripsSum) * 100}%` }} className="bg-[#38bdf8]" />
              <div style={{ width: `${(canceledTrips / totalTripsSum) * 100}%` }} className="bg-slate-300" />
            </div>
          </div>

          {/* Travel Packages Horizontal 3-Card Strip matching image */}
          <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200/80">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-extrabold text-base text-[#1a2b48]">
                Travel Packages
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Sort by: <strong>Latest</strong></span>
                <button
                  type="button"
                  onClick={() => onSelectTour(showcaseTours[0])}
                  className="text-xs font-bold text-[#5191fa] hover:underline"
                >
                  View All
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {showcaseTours.map((t) => (
                <div
                  key={t.id}
                  className="bg-slate-50/60 rounded-2xl p-3 border border-slate-200/80 hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div className="relative h-32 rounded-xl overflow-hidden mb-3">
                    <img
                      src={t.image}
                      alt={t.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded text-[10px] font-bold text-[#1a2b48]">
                      {t.category}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-heading font-bold text-xs text-[#1a2b48] line-clamp-1 mb-1">
                      {t.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 mb-2">
                      {t.daysCount} Days / {t.daysCount - 1} Nights
                    </p>
                    <div className="text-sm font-extrabold text-[#5191fa] mb-3">
                      {formatPrice(t.price)} <span className="text-[10px] font-normal text-slate-400">/ person</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectTour(t)}
                    className="w-full py-2 bg-[#5191fa] hover:bg-[#3875dc] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer text-center"
                  >
                    See Detail
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Bookings Table matching image */}
          <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200/80">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
              <h3 className="font-heading font-extrabold text-base text-[#1a2b48]">
                Recent Bookings
              </h3>

              <div className="flex flex-wrap items-center gap-2.5">
                {/* Search */}
                <div className="relative w-44">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={tableSearch}
                    onChange={(e) => setTableSearch(e.target.value)}
                    placeholder="Search name, code..."
                    className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#5191fa]"
                  />
                </div>

                {/* Period pill */}
                <select
                  value={tablePeriod}
                  onChange={(e) => setTablePeriod(e.target.value as any)}
                  className="bg-slate-100 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-700 cursor-pointer focus:outline-none"
                >
                  <option value="Today">Today</option>
                  <option value="This Week">This Week</option>
                  <option value="All Time">All Time</option>
                </select>

                {/* Add Booking button */}
                <button
                  type="button"
                  onClick={onOpenAddBooking}
                  className="px-3.5 py-1.5 bg-[#5191fa] hover:bg-[#3875dc] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Booking</span>
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    <th className="pb-3 font-semibold">Name</th>
                    <th className="pb-3 font-semibold">Booking Code</th>
                    <th className="pb-3 font-semibold">Package</th>
                    <th className="pb-3 font-semibold">Duration</th>
                    <th className="pb-3 font-semibold">Date</th>
                    <th className="pb-3 font-semibold">Price</th>
                    <th className="pb-3 font-semibold text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 font-bold text-[#1a2b48]">
                        {b.customerName || 'Explorer Guest'}
                      </td>
                      <td className="py-3.5 font-mono font-medium text-slate-500">
                        {b.bookingCode}
                      </td>
                      <td className="py-3.5 font-semibold text-slate-800">
                        {b.tourTitle}
                      </td>
                      <td className="py-3.5 text-slate-500">
                        {b.adults} Adults · 14 Days
                      </td>
                      <td className="py-3.5 text-slate-500">
                        {b.startDate}
                      </td>
                      <td className="py-3.5 font-extrabold text-[#1a2b48] tabular-nums">
                        {formatPrice(b.totalPrice)}
                      </td>
                      <td className="py-3.5 text-right">
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (lg:col-span-4) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Top Packages / Top Destinations Donut Chart matching screenshot */}
          <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200/80">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-extrabold text-base text-[#1a2b48]">
                Top Packages
              </h3>
              <MoreHorizontal className="w-4 h-4 text-slate-400 cursor-pointer" />
            </div>

            {/* Donut Chart representation */}
            <div className="relative w-44 h-44 mx-auto my-3">
              <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                {/* Donut rings */}
                <circle cx="50" cy="50" r="38" fill="none" stroke="#e0f2fe" strokeWidth="12" />
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="none"
                  stroke="#5191fa"
                  strokeWidth="12"
                  strokeDasharray="83 238"
                  strokeDashoffset="0"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="12"
                  strokeDasharray="66 238"
                  strokeDashoffset="-83"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="none"
                  stroke="#93c5fd"
                  strokeWidth="12"
                  strokeDasharray="52 238"
                  strokeDashoffset="-149"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="none"
                  stroke="#bfdbfe"
                  strokeWidth="12"
                  strokeDasharray="36 238"
                  strokeDashoffset="-201"
                />
              </svg>

              {/* Center Donut Text matching "This Week 1,856 Total Participants" */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] text-slate-400 font-semibold">This Week</span>
                <span className="text-xl font-extrabold text-[#1a2b48] leading-tight">1,856</span>
                <span className="text-[9px] text-slate-400 font-medium">Total Participants</span>
              </div>
            </div>

            {/* Donut Legend */}
            <div className="space-y-2.5 pt-3">
              {[
                { pct: '35%', name: 'K2 & Baltoro Trek', participants: '650 Participants', color: 'bg-[#5191fa]' },
                { pct: '28%', name: 'Diran Peak Expedition', participants: '520 Participants', color: 'bg-[#38bdf8]' },
                { pct: '22%', name: 'Spantik Golden Peak', participants: '408 Participants', color: 'bg-[#93c5fd]' },
                { pct: '15%', name: 'Hunza Cultural Tour', participants: '278 Participants', color: 'bg-[#bfdbfe]' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded text-white ${item.color}`}>
                      {item.pct}
                    </span>
                    <div>
                      <div className="font-bold text-slate-800 leading-tight">{item.name}</div>
                      <div className="text-[10px] text-slate-400">{item.participants}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mini Calendar Widget matching image */}
          <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200/80">
            <div className="flex items-center justify-between mb-4">
              <span className="font-heading font-extrabold text-sm text-[#1a2b48]">July 2028</span>
              <div className="flex items-center gap-1">
                <button type="button" className="p-1 hover:bg-slate-100 rounded-lg text-slate-400">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button type="button" className="p-1 hover:bg-slate-100 rounded-lg text-slate-400">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Days grid */}
            <div className="grid grid-cols-7 gap-1 text-center text-xs">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                <span key={d} className="text-[10px] font-bold text-slate-400 py-1">{d}</span>
              ))}
              {[25, 26, 27, 28, 29, 30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 1, 2, 3, 4, 5].slice(0, 35).map((num, i) => (
                <span
                  key={i}
                  className={`py-1 rounded-lg font-semibold text-[11px] ${
                    num === 12
                      ? 'bg-[#5191fa] text-white font-bold shadow-xs'
                      : num === 19
                      ? 'bg-blue-100 text-[#5191fa] font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {num}
                </span>
              ))}
            </div>
          </div>

          {/* Upcoming Trips Widget matching image */}
          <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200/80">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-extrabold text-base text-[#1a2b48]">
                Upcoming Trips
              </h3>
              <button type="button" className="w-6 h-6 rounded-lg bg-[#5191fa] text-white flex items-center justify-center">
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {[
                { title: 'Paris, France / Hunza Valley', tag: 'Romantic Getaway', dates: '5 - 10 July', img: '/images/hero_karakoram_k2_1790420138291.jpg' },
                { title: 'Tokyo, Japan / Skardu Flight', tag: 'Cultural Exploration', dates: '12 - 19 July', img: '/images/skardu_valley_landscape_1790420181912.jpg' },
                { title: 'Sydney / Diran Peak Base', tag: 'Adventure Tour', dates: '15 - 24 July', img: '/images/trek_baltoro_glacier_1790420152808.jpg' }
              ].map((trip, idx) => (
                <div key={idx} className="flex items-center gap-3 p-2 rounded-2xl hover:bg-slate-50 transition-colors">
                  <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
                    <img src={trip.img} alt={trip.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold uppercase text-[#5191fa] bg-blue-50 px-1.5 py-0.5 rounded">
                      {trip.tag}
                    </span>
                    <h5 className="font-bold text-xs text-slate-800 truncate mt-0.5">{trip.title}</h5>
                    <p className="text-[10px] text-slate-400">{trip.dates}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Messages Snippet Widget matching image */}
          <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200/80">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-extrabold text-base text-[#1a2b48]">
                Messages
              </h3>
              <MoreHorizontal className="w-4 h-4 text-slate-400 cursor-pointer" />
            </div>

            <div className="space-y-3">
              {[
                { name: 'Europia Hotel', snippet: 'We are pleased to announce room allocations...', time: '11:00 AM', badge: 1 },
                { name: 'Global Travel Co', snippet: 'We have updated our commission rates...', time: '2:30 PM', badge: 3 },
                { name: 'Kalendra Umbara', snippet: 'Hi, I need assistance with climbing permits...', time: '9:45 AM', badge: 5 }
              ].map((msg, idx) => (
                <div key={idx} className="flex items-center justify-between gap-3 p-2 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-slate-200 font-bold text-xs flex items-center justify-center text-slate-700 shrink-0">
                      {msg.name[0]}
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-xs text-slate-800 truncate">{msg.name}</div>
                      <div className="text-[10px] text-slate-400 truncate">{msg.snippet}</div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-[9px] text-slate-400">{msg.time}</div>
                    <span className="inline-block mt-0.5 text-[9px] font-bold px-1.5 rounded-full bg-[#5191fa] text-white">
                      {msg.badge}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity Widget matching image */}
          <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200/80">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-extrabold text-base text-[#1a2b48]">
                Recent Activity
              </h3>
              <MoreHorizontal className="w-4 h-4 text-slate-400 cursor-pointer" />
            </div>

            <div className="space-y-3 text-xs">
              {[
                { user: 'Alberto Cortez', action: 'updated profile and added new payment method', time: '9:30 AM' },
                { user: 'Camellia Swan', action: 'booked K2 Base Camp departure for July 2027', time: '10:00 AM' },
                { user: 'Ludwig Contessa', action: 'processed deposit for Diran Peak Alpine package', time: '11:15 AM' }
              ].map((act, idx) => (
                <div key={idx} className="flex items-start gap-2.5 pb-2 border-b border-slate-100 last:border-none">
                  <div className="w-6 h-6 rounded-full bg-blue-50 text-[#5191fa] flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-3 h-3" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-800">{act.user}</span>{' '}
                    <span className="text-slate-500 text-[11px]">{act.action}</span>
                    <div className="text-[10px] text-slate-400 mt-0.5">{act.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
