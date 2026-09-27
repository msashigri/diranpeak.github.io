import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface HeroProps {
  onSearch: (params: { destination?: string; category?: string; duration?: string }) => void;
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [muted, setMuted] = useState(true);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ destination: searchTerm, category: 'all', duration: 'all' });
  };

  return (
    <div>
      {/* Exact Hero Banner matching BookingCore bravo_banner */}
      <div
        className="relative min-h-[500px] lg:min-h-[560px] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: "url('https://chogoriadventure.com/uploads/0000/6/2025/01/17/gondogoro-la-pass.jpeg')",
          backgroundColor: '#1a2b48'
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40 z-0" />

        {/* Real Sound Toggle Button matching exact style from real site */}
        <button
          onClick={() => setMuted(!muted)}
          aria-label="Toggle sound"
          style={{
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            zIndex: 10,
            background: 'rgba(0,0,0,0.6)',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            padding: '10px 12px',
            fontSize: '18px',
            cursor: 'pointer'
          }}
        >
          {muted ? '🔇' : '🔊'}
        </button>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-16 text-center text-white w-full">
          <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-bold text-white mb-2 leading-tight tracking-tight drop-shadow-md">
            Discover The Best Of Pakistan
          </h1>
          <h2 className="text-base sm:text-xl font-normal text-white mb-8 tracking-wide drop-shadow">
            Trekking | Tour | Expedition
          </h2>

          {/* Exact Search Form from chogoriadventure.com */}
          <div className="max-w-2xl mx-auto">
            <form
              onSubmit={handleSearchSubmit}
              style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)' }}
              className="p-3 sm:p-4 rounded-lg border border-white/20 shadow-2xl flex flex-col sm:flex-row items-center gap-3 text-left"
            >
              <div className="flex-1 w-full">
                <label className="block text-[11px] uppercase font-bold text-white mb-0.5 tracking-wider">
                  Search
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search for..."
                    style={{ color: '#fff' }}
                    className="w-full bg-white/10 hover:bg-white/20 focus:bg-white focus:text-[#1a2b48] text-white placeholder-white/70 px-3.5 py-2.5 rounded text-sm focus:outline-none transition-all border border-white/20 focus:border-white font-medium"
                  />
                </div>
              </div>

              <div className="w-full sm:w-auto sm:self-end">
                <button
                  type="submit"
                  className="btn-search w-full sm:w-auto px-8 py-3 bg-[#5191fa] hover:bg-[#3875dc] text-white font-semibold text-sm uppercase rounded shadow-md transition-all cursor-pointer whitespace-nowrap flex items-center justify-center gap-1.5"
                >
                  <Search className="w-4 h-4" />
                  <span>Search</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Exact narrative paragraph right below the banner */}
      <div className="bg-white py-10 border-b border-[#eaeef3]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
            <em>
              Discover the best of Pakistan&apos;s landscapes with <strong>Diran Peak Adventure</strong>, the best tour , trekking and climbing expedition company for unforgettable journeys in the Karakoram, Himalayas, and Hindu Kush mountain ranges.
            </em>
          </p>
        </div>
      </div>
    </div>
  );
};
