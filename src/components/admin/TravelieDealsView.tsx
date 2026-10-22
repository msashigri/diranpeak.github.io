import React, { useState } from 'react';
import {
  Percent, Search, Plus, Calendar, Tag, ArrowRight,
  MoreHorizontal, Sparkles, Check, CheckCircle2
} from 'lucide-react';

export const TravelieDealsView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortFilter, setSortFilter] = useState('Popular');

  const deals = [
    {
      id: 'deal-1',
      title: 'Summer Getaway Sale',
      desc: 'Save 20% on all beach, lake and Karakoram summer trekking departures!',
      bannerText: 'Summer\nsale',
      discount: '20% OFF',
      period: 'July 1, 2028 - July 31, 2028',
      img: '/images/hero_karakoram_k2_1790420138291.jpg'
    },
    {
      id: 'deal-2',
      title: 'Winter Holiday Early Bird',
      desc: 'Book your winter mountaineering expedition early and receive an instant 15% rate waiver!',
      bannerText: 'Winter\nholiday',
      discount: 'EARLY BIRD 15% OFF',
      period: 'July 1, 2028 - August 15, 2028',
      img: '/images/trek_baltoro_glacier_1790420152808.jpg'
    },
    {
      id: 'deal-3',
      title: 'Couples & Family Retreat',
      desc: 'Enjoy a customized alpine escape with 10% off for double bookings and families!',
      bannerText: 'Couples\nRetreat',
      discount: '20% OFF',
      period: 'July 5, 2028 - August 5, 2028',
      img: '/images/skardu_valley_landscape_1790420181912.jpg'
    },
    {
      id: 'deal-4',
      title: 'Karakoram Traverse Flash Sale',
      desc: 'Flash Sale: 30% off on select high mountain departures for the next 48 hours only!',
      bannerText: 'Mountain\ntours',
      discount: '30% OFF FLASH SALE',
      period: 'July 12, 2028 - July 14, 2028',
      img: '/images/hero_karakoram_k2_1790420138291.jpg'
    },
    {
      id: 'deal-5',
      title: 'Exclusive Member Discount',
      desc: 'Exclusive Member Discount: 20% off for verified Gold and Silver member category accounts.',
      bannerText: 'Exclusive\nMember\nDiscount',
      discount: '20% OFF',
      period: 'July 20, 2028 - August 20, 2028',
      img: '/images/skardu_valley_landscape_1790420181912.jpg'
    },
    {
      id: 'deal-6',
      title: 'Climber Referral Program',
      desc: 'Refer an expedition climber: Get $100 off your next summit package when they book.',
      bannerText: 'GET\n$100 OFF',
      discount: 'REFER A FRIEND',
      period: 'July 1, 2028 - December 31, 2028',
      img: '/images/trek_baltoro_glacier_1790420152808.jpg'
    }
  ];

  const filteredDeals = deals.filter(d => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return d.title.toLowerCase().includes(q) || d.desc.toLowerCase().includes(q);
  });

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-xs border border-slate-200/80 space-y-6">
      {/* Header matching image 3112805 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-xl font-heading font-extrabold text-[#1a2b48]">
          Deals &amp; Active Promotions
        </h2>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative w-48 sm:w-60">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search promo, destination, etc"
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#5191fa]"
            />
          </div>

          <select
            value={sortFilter}
            onChange={(e) => setSortFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 cursor-pointer focus:outline-none"
          >
            <option value="Popular">Popular</option>
            <option value="Date">Date</option>
            <option value="Discount">Highest Discount</option>
          </select>

          <button
            type="button"
            onClick={() => alert('New promo creation dialog opened.')}
            className="px-4 py-2 bg-[#5191fa] hover:bg-[#3875dc] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Add Promo</span>
          </button>
        </div>
      </div>

      {/* Grid of 6 Deals matching image 3112805 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDeals.map((deal) => (
          <div
            key={deal.id}
            className="bg-slate-50/70 rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              {/* Graphic Banner */}
              <div className="relative h-44 overflow-hidden flex items-center justify-center p-6 text-white text-center">
                <img src={deal.img} alt="" className="absolute inset-0 w-full h-full object-cover filter brightness-75" />
                <div className="absolute inset-0 bg-blue-900/30 backdrop-blur-2xs" />
                <div className="relative z-10">
                  <div className="font-heading font-black text-2xl tracking-tight leading-tight whitespace-pre-line drop-shadow-md">
                    {deal.bannerText}
                  </div>
                  <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-xs text-[10px] font-bold uppercase tracking-wider border border-white/30">
                    {deal.discount}
                  </span>
                </div>
              </div>

              {/* Promo Info */}
              <div className="p-5">
                <h4 className="font-heading font-bold text-sm text-[#1a2b48]">
                  {deal.title}
                </h4>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {deal.desc}
                </p>

                <div className="mt-3 pt-3 border-t border-slate-200/60 text-[11px] text-slate-400">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Promo Period</div>
                  <div className="font-semibold text-slate-700 mt-0.5">{deal.period}</div>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0">
              <button
                type="button"
                onClick={() => alert(`Active promo code copied: ${deal.discount.replace(/\s+/g, '')}`)}
                className="w-full py-2.5 bg-[#5191fa] hover:bg-[#3875dc] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer text-center"
              >
                See Promo
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
