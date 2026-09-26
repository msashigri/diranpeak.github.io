import React, { useState } from 'react';
import { Search, MapPin, Compass, Calendar, ArrowRight, ShieldCheck, Star } from 'lucide-react';

interface HeroProps {
  onSearch: (params: { destination?: string; category?: string; duration?: string }) => void;
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearch, onExploreClick }) => {
  const [destination, setDestination] = useState('');
  const [category, setCategory] = useState('all');
  const [duration, setDuration] = useState('all');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ destination, category, duration });
  };

  return (
    <div className="relative min-h-[580px] lg:min-h-[640px] flex items-center justify-center overflow-hidden">
      {/* Background Photography with measured contrast scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_karakoram_k2_1790420138291.jpg"
          alt="K2 summit towering above Baltoro Glacier in Karakoram Pakistan"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transform scale-105 duration-1000 ease-out"
        />
        {/* Anti-slop measured dark scrim for 4.5:1 WCAG contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1726]/95 via-[#0d1726]/65 to-[#0d1726]/40" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center text-white">
        {/* Unboxed editorial kicker */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs text-sky-200 mb-6 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-[#5191fa]" />
          <span>Licensed Tour Operator · Government of Pakistan DTS #1842</span>
        </div>

        <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white mb-4 text-balance drop-shadow-sm">
          Best Tour &amp; Trekking Company in Pakistan
        </h1>

        <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-200 mb-10 leading-relaxed font-normal">
          Native high-altitude Balti guides leading world-class expeditions to K2 Base Camp, Concordia, Broad Peak, and the wild Karakoram giants since 2012.
        </p>

        {/* Real interactive BookingCore Search Box */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-3 sm:p-4 text-slate-800">
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-3 items-center">
            {/* Field 1: Destination */}
            <div className="flex items-center gap-3 p-2.5 bg-slate-50 hover:bg-slate-100/70 rounded-xl border border-slate-200/80 transition-colors text-left">
              <MapPin className="w-5 h-5 text-[#5191fa] shrink-0" />
              <div className="flex-1 min-w-0">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Destination
                </label>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Where to? (e.g. K2, Skardu)"
                  className="w-full text-xs font-semibold text-slate-800 bg-transparent focus:outline-none placeholder-slate-400"
                />
              </div>
            </div>

            {/* Field 2: Activity / Category */}
            <div className="flex items-center gap-3 p-2.5 bg-slate-50 hover:bg-slate-100/70 rounded-xl border border-slate-200/80 transition-colors text-left">
              <Compass className="w-5 h-5 text-[#5191fa] shrink-0" />
              <div className="flex-1 min-w-0">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Travel Style
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full text-xs font-semibold text-slate-800 bg-transparent focus:outline-none cursor-pointer"
                >
                  <option value="all">All Adventures</option>
                  <option value="trekking">Trekking Expeditions</option>
                  <option value="expedition">8,000m Peak Climbing</option>
                  <option value="6000m">6,000m Training Peaks</option>
                  <option value="cultural">Cultural Heritage Tours</option>
                </select>
              </div>
            </div>

            {/* Field 3: Duration */}
            <div className="flex items-center gap-3 p-2.5 bg-slate-50 hover:bg-slate-100/70 rounded-xl border border-slate-200/80 transition-colors text-left">
              <Calendar className="w-5 h-5 text-[#5191fa] shrink-0" />
              <div className="flex-1 min-w-0">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Duration
                </label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full text-xs font-semibold text-slate-800 bg-transparent focus:outline-none cursor-pointer"
                >
                  <option value="all">Any Duration</option>
                  <option value="short">7 - 14 Days</option>
                  <option value="medium">15 - 21 Days (K2 Classic)</option>
                  <option value="long">22+ Days (Expeditions)</option>
                </select>
              </div>
            </div>

            {/* Field 4: Search Button */}
            <div>
              <button
                type="submit"
                className="w-full py-3 px-6 bg-[#5191fa] hover:bg-[#3d7be3] active:scale-[0.99] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>Search Tours</span>
              </button>
            </div>
          </form>
        </div>

        {/* Live departure pill and quick highlights */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300 font-medium">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>2026/2027 Fixed Departures Guaranteed</span>
          </div>
          <span className="hidden sm:inline text-slate-600">·</span>
          <div className="flex items-center gap-1 text-amber-300">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="text-white font-semibold">4.9 / 5</span>
            <span className="text-slate-300">(500+ Verified Reviews)</span>
          </div>
          <span className="hidden sm:inline text-slate-600">·</span>
          <button
            onClick={onExploreClick}
            className="hover:text-white underline underline-offset-4 decoration-[#5191fa] transition-colors cursor-pointer"
          >
            Explore 15+ Karakoram Packages &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};
