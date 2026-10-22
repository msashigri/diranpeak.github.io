import React, { useState } from 'react';
import {
  ThumbsUp, Star, Search, Filter, Calendar, MoreHorizontal,
  CheckCircle, ArrowUpRight, TrendingUp
} from 'lucide-react';

export const TravelieFeedbackView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [packageFilter, setPackageFilter] = useState('ALL');

  const ratingsBreakdown = [
    { label: 'Accommodation', rating: '4.6' },
    { label: 'Tour Guides', rating: '4.8' },
    { label: 'Itinerary', rating: '4.4' },
    { label: 'Customer Service', rating: '4.7' },
    { label: 'Value for Money', rating: '4.3' },
    { label: 'Safety', rating: '4.5' },
    { label: 'Transportation', rating: '4.5' },
    { label: 'Food & Dining', rating: '4.2' }
  ];

  const feedbacks = [
    {
      id: 'fb-1',
      name: 'Camellia Swan',
      package: 'Venice Dreams',
      rating: 4.5,
      comment: 'The Venice Dreams package was fantastic! The gondola ride was magical, and the guided tours were very informative. Highly recommend this tour for anyone looking to experience the charm of Venice.'
    },
    {
      id: 'fb-2',
      name: 'Raphael Goodman',
      package: 'Safari Adventure',
      rating: 5,
      comment: 'A well-organized Safari Adventure with knowledgeable guides, unforgettable close encounters with the Big Five, and luxurious tented camps offering stunning Serengeti views.'
    },
    {
      id: 'fb-3',
      name: 'Ludwig Contessa',
      package: 'Alpine Escape',
      rating: 4,
      comment: 'The Alpine Escape tour offered stunning Swiss Alps views, top-notch accommodations, and a perfect activity-relaxation mix. A must-do for nature lovers and adventure seekers.'
    },
    {
      id: 'fb-4',
      name: 'Armina Raul Meyes',
      package: 'Caribbean Cruise',
      rating: 3.5,
      comment: 'The Caribbean Cruise featured beautiful destinations, excellent food, friendly staff, and luxurious amenities, despite some schedule delays. Overall, it was an enjoyable and good experience.'
    },
    {
      id: 'fb-5',
      name: 'James Dunn',
      package: 'Parisian Romance',
      rating: 5,
      comment: 'The Parisian Romance package exceeded all our expectations. The private dinner cruise on the Seine and the boutique hotel near the Eiffel Tower made our anniversary unforgettable.'
    },
    {
      id: 'fb-6',
      name: 'Sophia Wilson',
      package: 'Tokyo Cultural Adventure',
      rating: 4.5,
      comment: 'Tokyo Cultural Adventure offered deep insights into Japan\'s rich history and modern vibrancy. The tea ceremony and visit to Akihabara were major highlights!'
    }
  ];

  const filteredFeedbacks = feedbacks.filter(f => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return f.name.toLowerCase().includes(q) || f.package.toLowerCase().includes(q) || f.comment.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6">
      {/* Top Split: Review Statistics + Ratings Breakdown matching image 3112805 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Review Statistics Bar Chart */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-7 shadow-xs border border-slate-200/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="font-heading font-extrabold text-base text-[#1a2b48]">
                Review Statistics
              </h3>
              <div className="flex items-center gap-4 mt-1 text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#5191fa]" />
                  <span>Positive</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  <span>Negative</span>
                </span>
              </div>
            </div>

            <select className="bg-[#5191fa] text-white text-xs font-bold px-3 py-1.5 rounded-xl cursor-pointer shadow-xs">
              <option>Last 12 Months</option>
              <option>Last 6 Months</option>
            </select>
          </div>

          {/* Bar Chart */}
          <div className="h-60 w-full flex items-end justify-between gap-3 pt-6 px-2">
            {[
              { m: 'Aug 27', pos: 75, neg: 10 },
              { m: 'Sep 27', pos: 82, neg: 12 },
              { m: 'Oct 27', pos: 90, neg: 8 },
              { m: 'Nov 27', pos: 68, neg: 15 },
              { m: 'Des 27', pos: 70, neg: 14 },
              { m: 'Jan 28', pos: 74, neg: 9 },
              { m: 'Feb 28', pos: 80, neg: 11 },
              { m: 'Mar 28', pos: 85, neg: 7 },
              { m: 'Apr 28', pos: 92, neg: 6 },
              { m: 'May 28', pos: 96, neg: 8 },
              { m: 'Jun 28', pos: 88, neg: 10 },
              { m: 'Jul 28', pos: 95, neg: 5 }
            ].map((col, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                <div className="w-full flex items-end justify-center gap-1 h-44">
                  {/* Positive bar */}
                  <div
                    style={{ height: `${col.pos}%` }}
                    className="w-3 sm:w-4 bg-[#5191fa] rounded-t-lg transition-all"
                  />
                  {/* Negative bar */}
                  <div
                    style={{ height: `${col.neg}%` }}
                    className="w-1.5 sm:w-2 bg-slate-200 rounded-t-sm"
                  />
                </div>
                <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap">{col.m}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Ratings Breakdown Card matching image 3112805 */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 shadow-xs border border-slate-200/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-heading font-extrabold text-base text-[#1a2b48]">Ratings</h3>
              <MoreHorizontal className="w-4 h-4 text-slate-400 cursor-pointer" />
            </div>

            {/* Score header */}
            <div className="flex items-baseline gap-2 mb-4 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-1 text-2xl font-black text-[#1a2b48]">
                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                <span>4.5</span>
                <span className="text-xs text-slate-400 font-normal">/5</span>
              </div>
              <div className="text-xs text-slate-500 font-semibold">
                Excelent <span className="text-[10px] text-slate-400 font-normal">(from 1,250 Reviews)</span>
              </div>
            </div>

            {/* Breakdown bars */}
            <div className="space-y-2 text-xs">
              {ratingsBreakdown.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-slate-600 font-medium">{item.label}</span>
                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center text-amber-400 text-[10px]">
                      {[1, 2, 3, 4, 5].map(s => (
                        <Star key={s} className="w-3 h-3 fill-amber-400" />
                      ))}
                    </div>
                    <span className="font-bold text-slate-800 text-[11px] w-6 text-right">{item.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom: Traveler Feedback Cards Grid matching image 3112805 */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-xs border border-slate-200/80 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="font-heading font-extrabold text-lg text-[#1a2b48]">
            Traveler Feedback
          </h3>

          <div className="flex flex-wrap items-center gap-2.5">
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

            <select
              value={packageFilter}
              onChange={(e) => setPackageFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 cursor-pointer focus:outline-none"
            >
              <option value="ALL">All Packages</option>
              <option value="Venice">Venice Dreams</option>
              <option value="Safari">Safari Adventure</option>
              <option value="Alpine">Alpine Escape</option>
            </select>

            <div className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>1 June 28 - 15 July 28</span>
            </div>
          </div>
        </div>

        {/* Feedback Cards 4-column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredFeedbacks.map((f) => (
            <div
              key={f.id}
              className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 flex flex-col justify-between hover:shadow-xs transition-all"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#1a2b48] to-[#5191fa] text-white flex items-center justify-center font-bold text-xs shrink-0">
                    {f.name[0]}
                  </div>
                  <div className="min-w-0">
                    <h5 className="font-heading font-bold text-xs text-[#1a2b48] truncate">{f.name}</h5>
                    <div className="text-[10px] text-slate-400 truncate">{f.package}</div>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-amber-500 mb-2">
                  {[1, 2, 3, 4, 5].map(s => (
                    <Star
                      key={s}
                      className={`w-3.5 h-3.5 ${
                        s <= Math.floor(f.rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'fill-slate-200 text-slate-200'
                      }`}
                    />
                  ))}
                  <span className="text-[11px] font-bold text-slate-700 ml-1">{f.rating}</span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-4">
                  {f.comment}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
