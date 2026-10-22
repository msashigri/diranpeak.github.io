import React, { useState } from 'react';
import {
  Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock,
  MapPin, Users, Plane, Building2, Train, MoreHorizontal, Plus
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const TravelieCalendarView: React.FC = () => {
  const { bookings, tours } = useAuth();
  const [selectedView, setSelectedView] = useState<'Day' | 'Week' | 'Month'>('Month');
  const [selectedEvent, setSelectedEvent] = useState({
    title: 'City Highlights',
    destination: 'New York, USA',
    duration: '6 Days / 5 Nights',
    date: '11 - 16 July 2028',
    totalParticipants: 25,
    airport: 'John F. Kennedy International Airport (JFK)',
    airportTime: '11 July 2028 - 08:00 AM',
    airportFinish: '16 July 2028 - 04:30 PM',
    station: 'Grand Central Terminal',
    stationTime: '11 July 2028 - 09:00 AM',
    stationFinish: '16 July 2028 - 03:30 PM'
  });

  const calendarDays = [
    { day: 25, isOtherMonth: true },
    { day: 26, isOtherMonth: true },
    { day: 27, isOtherMonth: true },
    { day: 28, isOtherMonth: true },
    { day: 29, isOtherMonth: true },
    { day: 30, isOtherMonth: true },
    { day: 1 },
    { day: 2, event: { title: 'Romantic Getaway', span: 2, color: 'bg-blue-50 text-[#5191fa] border-blue-200' } },
    { day: 3 },
    { day: 4 },
    { day: 5, event: { title: 'Cultural Exploration', span: 2, color: 'bg-amber-50 text-amber-700 border-amber-200' } },
    { day: 6 },
    { day: 7 },
    { day: 8, event: { title: 'Adventure Tour', span: 2, color: 'bg-emerald-50 text-emerald-700 border-emerald-200' } },
    { day: 9 },
    { day: 10 },
    { day: 11, event: { title: 'City Highlights', span: 3, color: 'bg-[#5191fa] text-white shadow-xs' } },
    { day: 12 },
    { day: 13 },
    { day: 14 },
    { day: 15, event: { title: 'Venice Dreams', span: 2, color: 'bg-blue-50 text-[#5191fa] border-blue-200' } },
    { day: 16, event: { title: 'Safari Adventure', span: 2, color: 'bg-orange-50 text-orange-700 border-orange-200' } },
    { day: 17 },
    { day: 18, event: { title: 'Alpine Escape', span: 2, color: 'bg-blue-50 text-[#5191fa] border-blue-200' } },
    { day: 19 },
    { day: 20 },
    { day: 21, event: { title: 'Seoul Cultural Exploration', span: 2, color: 'bg-purple-50 text-purple-700 border-purple-200' } },
    { day: 22 },
    { day: 23 },
    { day: 24, event: { title: 'Parisian Romance', span: 2, color: 'bg-pink-50 text-pink-700 border-pink-200' } },
    { day: 25, event: { title: 'Tokyo Cultural Adventure', span: 2, color: 'bg-cyan-50 text-cyan-700 border-cyan-200' } },
    { day: 26 },
    { day: 27 },
    { day: 28, event: { title: 'Romantic Getaway', span: 2, color: 'bg-blue-50 text-[#5191fa] border-blue-200' } },
    { day: 29 },
    { day: 30, event: { title: 'Bali Beach Escape', span: 2, color: 'bg-emerald-50 text-emerald-700 border-emerald-200' } },
    { day: 31 },
    { day: 1, isOtherMonth: true },
    { day: 2, isOtherMonth: true },
    { day: 3, isOtherMonth: true },
    { day: 4, isOtherMonth: true },
    { day: 5, isOtherMonth: true }
  ].slice(0, 35);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Calendar Grid (lg:col-span-8) */}
      <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-7 shadow-xs border border-slate-200/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="font-heading font-extrabold text-lg text-[#1a2b48]">
              July 2028
            </span>
            <div className="flex items-center gap-1">
              <button type="button" className="p-1 hover:bg-slate-100 rounded-lg text-slate-400">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button type="button" className="p-1 hover:bg-slate-100 rounded-lg text-slate-400">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Day / Week / Month Toggle */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl">
            {(['Day', 'Week', 'Month'] as const).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setSelectedView(v)}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  selectedView === v ? 'bg-[#5191fa] text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* Days of week header */}
        <div className="grid grid-cols-7 gap-2 mb-2 text-center text-xs font-bold text-slate-400 uppercase tracking-wider">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
            <div key={d} className="py-1">{d}</div>
          ))}
        </div>

        {/* Month Cells Grid */}
        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((c, i) => (
            <div
              key={i}
              className={`min-h-[76px] p-2 rounded-2xl border flex flex-col justify-between transition-all ${
                c.isOtherMonth ? 'bg-slate-50/50 border-slate-100 text-slate-300' : 'bg-white border-slate-200/70 hover:border-[#5191fa]'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className={`text-xs font-bold ${c.isOtherMonth ? 'text-slate-300' : 'text-slate-700'}`}>
                  {c.day}
                </span>
              </div>

              {c.event && (
                <div
                  onClick={() => setSelectedEvent(prev => ({ ...prev, title: c.event!.title }))}
                  className={`mt-1 p-1 rounded-lg text-[9px] font-bold border truncate cursor-pointer transition-transform hover:scale-102 ${c.event.color}`}
                >
                  {c.event.title}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Schedule Details Right Pane matching image 3112804 */}
      <div className="lg:col-span-4 bg-white rounded-3xl p-6 shadow-xs border border-slate-200/80 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <h3 className="font-heading font-extrabold text-base text-[#1a2b48]">
            Schedule Details
          </h3>
          <MoreHorizontal className="w-4 h-4 text-slate-400 cursor-pointer" />
        </div>

        <div>
          <h4 className="font-heading font-extrabold text-xl text-[#1a2b48]">
            {selectedEvent.title}
          </h4>
          <div className="mt-3 space-y-2 text-xs">
            <div className="flex justify-between py-1.5 border-b border-slate-50">
              <span className="text-slate-400">Destination</span>
              <span className="font-bold text-slate-800">{selectedEvent.destination}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-50">
              <span className="text-slate-400">Duration</span>
              <span className="font-bold text-slate-800">{selectedEvent.duration}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-50">
              <span className="text-slate-400">Date</span>
              <span className="font-bold text-slate-800">{selectedEvent.date}</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-slate-400">Total Participants</span>
              <span className="font-bold text-[#5191fa]">{selectedEvent.totalParticipants}</span>
            </div>
          </div>

          {/* Participant Avatars */}
          <div className="flex items-center gap-1.5 mt-3">
            {[1, 2, 3, 4].map(idx => (
              <div key={idx} className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-400 to-indigo-600 border-2 border-white text-white text-[10px] font-bold flex items-center justify-center">
                U{idx}
              </div>
            ))}
            <span className="text-[11px] font-bold text-slate-400 ml-1.5">&amp; 20 others</span>
          </div>
        </div>

        {/* Meeting Points */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Meeting Points
          </div>

          {/* Airport */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-[#1a2b48]">
              <Plane className="w-3.5 h-3.5 text-[#5191fa]" />
              <span>AIRPORT</span>
            </div>
            <div className="text-xs font-semibold text-slate-700">{selectedEvent.airport}</div>
            <div className="text-[11px] text-slate-400">
              Start: {selectedEvent.airportTime}<br />
              Finish: {selectedEvent.airportFinish}
            </div>
          </div>

          {/* Station */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-[#1a2b48]">
              <Train className="w-3.5 h-3.5 text-amber-500" />
              <span>STATION</span>
            </div>
            <div className="text-xs font-semibold text-slate-700">{selectedEvent.station}</div>
            <div className="text-[11px] text-slate-400">
              Start: {selectedEvent.stationTime}<br />
              Finish: {selectedEvent.stationFinish}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
