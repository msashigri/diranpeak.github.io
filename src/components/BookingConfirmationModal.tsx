import React from 'react';
import { useAuth } from '../context/AuthContext';
import { CheckCircle2, X, Calendar, Users, DollarSign, Download, ArrowRight, ShieldCheck } from 'lucide-react';

export const BookingConfirmationModal: React.FC<{ onNavigate: (route: string) => void }> = ({ onNavigate }) => {
  const { latestBooking, dismissLatestBooking, formatPrice } = useAuth();

  if (!latestBooking) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 p-6 sm:p-8">
        <button
          onClick={dismissLatestBooking}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3 shadow-inner">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
            Reservation Confirmed
          </span>
          <h3 className="font-heading text-2xl font-bold text-[#1a2b48] mt-2">
            You&apos;re Going to the Karakoram!
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Official expedition voucher generated under DTS Lic. #1842
          </p>
        </div>

        {/* Voucher Ticket Box */}
        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 mb-6 space-y-3 text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400">Booking Reference</div>
              <div className="font-mono text-sm font-black text-[#5191fa]">
                {latestBooking.bookingCode}
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] uppercase font-bold text-slate-400">Status</div>
              <div className="font-bold text-emerald-600">Guaranteed Departure</div>
            </div>
          </div>

          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400">Tour / Expedition</div>
            <div className="font-bold text-slate-900 text-sm">{latestBooking.tourTitle}</div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400">Dates</div>
              <div className="font-medium text-slate-800">{latestBooking.startDate} - {latestBooking.endDate}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400">Travelers</div>
              <div className="font-medium text-slate-800">{latestBooking.adults} Adults {latestBooking.children > 0 ? `+ ${latestBooking.children} Youths` : ''}</div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
            <span className="font-bold text-slate-700">Total Amount Reserved:</span>
            <span className="text-base font-black text-[#1a2b48]">
              {formatPrice(latestBooking.totalPrice)}
            </span>
          </div>
        </div>

        <div className="text-[11px] text-slate-500 mb-6 flex items-start gap-2 bg-blue-50/60 p-3 rounded-xl border border-blue-100">
          <ShieldCheck className="w-4 h-4 text-[#5191fa] shrink-0 mt-0.5" />
          <span>
            We have emailed your confirmation and formal Pakistan Visa LOI (Letter of Invitation) details to <strong>{latestBooking.customerEmail}</strong>.
          </span>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => {
              dismissLatestBooking();
              onNavigate('dashboard');
            }}
            className="flex-1 py-3 px-4 bg-[#5191fa] hover:bg-[#3d7be3] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>View in My Bookings</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={dismissLatestBooking}
            className="py-3 px-5 border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs rounded-xl cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
