import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Compass, ArrowRight, X } from 'lucide-react';
import { Tour } from '../data/toursData';
import { useAuth } from '../context/AuthContext';

interface HeroProps {
  onSearch: (params: { destination?: string; category?: string; duration?: string }) => void;
  onExploreClick: () => void;
  onSelectTour?: (tour: Tour) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearch, onSelectTour }) => {
  const { siteSettings, tours } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [muted, setMuted] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Filter tours matching search query
  const query = searchTerm.trim().toLowerCase();
  const suggestions: Tour[] = query.length >= 1
    ? (tours || []).filter((tour) => {
        return (
          tour.title.toLowerCase().includes(query) ||
          tour.location.toLowerCase().includes(query) ||
          tour.category.toLowerCase().includes(query) ||
          (tour.maxAltitude && tour.maxAltitude.toLowerCase().includes(query)) ||
          tour.highlights.some(h => h.toLowerCase().includes(query))
        );
      }).slice(0, 6)
    : [];

  useEffect(() => {
    setSelectedIndex(-1);
  }, [searchTerm]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectSuggestion = (tour: Tour) => {
    setSearchTerm(tour.title);
    setIsOpen(false);
    if (onSelectTour) {
      onSelectTour(tour);
    } else {
      onSearch({ destination: tour.title, category: 'all', duration: 'all' });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || suggestions.length === 0) {
      if (e.key === 'ArrowDown' && suggestions.length > 0) {
        setIsOpen(true);
        setSelectedIndex(0);
        e.preventDefault();
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === 'Enter') {
      if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
        e.preventDefault();
        handleSelectSuggestion(suggestions[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOpen(false);
    onSearch({ destination: searchTerm, category: 'all', duration: 'all' });
  };

  return (
    <div>
      {/* Exact Hero Banner matching BookingCore bravo_banner */}
      <div
        className="relative min-h-[500px] lg:min-h-[560px] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/hero_karakoram_k2_1790420138291.jpg')",
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
          {siteSettings?.heroBadge && (
            <div className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase mb-3 border border-white/30 text-white shadow-sm">
              {siteSettings.heroBadge}
            </div>
          )}
          <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-bold text-white mb-2 leading-tight tracking-tight drop-shadow-md">
            {siteSettings?.heroHeading || 'Discover The Best Of Pakistan'}
          </h1>
          <h2 className="text-base sm:text-xl font-normal text-white/95 mb-8 tracking-wide drop-shadow max-w-2xl mx-auto">
            {siteSettings?.heroSubheading || 'Trekking | Tour | Expedition'}
          </h2>

          {/* Search Form with Autocomplete Dropdown */}
          <div className="max-w-2xl mx-auto relative" ref={searchContainerRef}>
            <form
              onSubmit={handleSearchSubmit}
              style={{ background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(10px)' }}
              className="p-3 sm:p-4 rounded-xl border border-white/25 shadow-2xl flex flex-col sm:flex-row items-center gap-3 text-left relative z-30"
            >
              <div className="flex-1 w-full relative">
                <label className="block text-[11px] uppercase font-bold text-white mb-0.5 tracking-wider">
                  Search Destination or Tour
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setIsOpen(true);
                    }}
                    onFocus={() => {
                      if (searchTerm.trim().length >= 1) setIsOpen(true);
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder="e.g. K2 Base Camp, Broad Peak, Hunza..."
                    style={{ color: '#1a2b48' }}
                    className="w-full bg-white text-[#1a2b48] placeholder-slate-400 px-3.5 py-2.5 rounded-lg text-sm focus:outline-none transition-all border border-transparent focus:border-[#5191fa] font-semibold shadow-inner"
                    autoComplete="off"
                    aria-autocomplete="list"
                    aria-expanded={isOpen}
                  />
                  {searchTerm && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchTerm('');
                        setIsOpen(false);
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-0.5 cursor-pointer"
                      title="Clear search"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              <div className="w-full sm:w-auto sm:self-end">
                <button
                  type="submit"
                  className="btn-search w-full sm:w-auto px-8 py-3 bg-[#5191fa] hover:bg-[#3875dc] text-white font-bold text-sm uppercase rounded-lg shadow-md transition-all cursor-pointer whitespace-nowrap flex items-center justify-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  <span>Search</span>
                </button>
              </div>
            </form>

            {/* Autocomplete Suggestions Dropdown */}
            {isOpen && suggestions.length > 0 && (
              <div
                className="absolute left-0 right-0 top-full mt-2 bg-white text-slate-800 rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50 text-left animate-in fade-in slide-in-from-top-2 duration-150"
              >
                <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-[#5191fa]" />
                    Suggested Tours &amp; Expeditions
                  </span>
                  <span className="text-[10px] text-slate-400 lowercase font-normal">
                    use ↑↓ to navigate · enter to select
                  </span>
                </div>

                <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
                  {suggestions.map((tour, idx) => {
                    const isSelected = idx === selectedIndex;
                    return (
                      <div
                        key={tour.id}
                        onClick={() => handleSelectSuggestion(tour)}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`p-3 sm:p-3.5 flex items-center gap-3 cursor-pointer transition-colors ${
                          isSelected ? 'bg-blue-50/80 text-[#1a2b48]' : 'hover:bg-slate-50 text-slate-800'
                        }`}
                      >
                        <img
                          src={tour.image}
                          alt={tour.title}
                          className="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-200/80 shadow-xs"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-xs font-bold text-slate-900 truncate">
                              {tour.title}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-[11px] text-slate-500">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-[#5191fa]" />
                              <span>{tour.location}</span>
                            </span>
                            <span>·</span>
                            <span className="px-1.5 py-0.2 bg-slate-100 text-slate-600 rounded text-[10px] font-semibold uppercase">
                              {tour.category}
                            </span>
                            <span>·</span>
                            <span>{tour.duration}</span>
                            {tour.maxAltitude && (
                              <>
                                <span>·</span>
                                <span className="font-medium text-[#5191fa]">{tour.maxAltitude}</span>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <div className="text-[10px] text-slate-400 uppercase font-medium">from</div>
                          <div className="text-sm font-extrabold text-[#5191fa]">
                            ${tour.price.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-center">
                  <button
                    type="button"
                    onClick={handleSearchSubmit}
                    className="text-xs font-bold text-[#5191fa] hover:text-[#3875dc] flex items-center justify-center gap-1 mx-auto cursor-pointer"
                  >
                    <span>View all matching results for &ldquo;{searchTerm}&rdquo;</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
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
