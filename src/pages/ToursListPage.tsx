import React, { useState, useMemo } from 'react';
import { TOURS_DATA, Tour } from '../data/toursData';
import { TourCard } from '../components/TourCard';
import { Search, Filter, SlidersHorizontal, Mountain, Compass, Calendar, ArrowUpDown } from 'lucide-react';

interface ToursListPageProps {
  initialCategory?: string;
  initialSearch?: string;
  initialDuration?: string;
  onSelectTour: (tour: Tour) => void;
  onNavigate: (route: string) => void;
}

export const ToursListPage: React.FC<ToursListPageProps> = ({
  initialCategory = 'all',
  initialSearch = '',
  initialDuration = 'all',
  onSelectTour,
  onNavigate
}) => {
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);
  const [duration, setDuration] = useState(initialDuration);
  const [difficulty, setDifficulty] = useState('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'duration'>('featured');
  const [maxPrice, setMaxPrice] = useState(10000);

  const filteredTours = useMemo(() => {
    return TOURS_DATA.filter((tour) => {
      // Category filter
      if (category !== 'all' && tour.category !== category) {
        // also check if category matches location keyword
        if (!tour.location.toLowerCase().includes(category.toLowerCase())) {
          return false;
        }
      }

      // Search keyword
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchTitle = tour.title.toLowerCase().includes(q);
        const matchLoc = tour.location.toLowerCase().includes(q);
        const matchOver = tour.overview.toLowerCase().includes(q);
        if (!matchTitle && !matchLoc && !matchOver) return false;
      }

      // Duration filter
      if (duration === 'short' && tour.daysCount > 14) return false;
      if (duration === 'medium' && (tour.daysCount < 15 || tour.daysCount > 21)) return false;
      if (duration === 'long' && tour.daysCount < 22) return false;

      // Difficulty filter
      if (difficulty !== 'all' && tour.difficulty !== difficulty) return false;

      // Price filter
      if (tour.price > maxPrice) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'duration') return a.daysCount - b.daysCount;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [category, searchTerm, duration, difficulty, maxPrice, sortBy]);

  const resetFilters = () => {
    setSearchTerm('');
    setCategory('all');
    setDuration('all');
    setDifficulty('all');
    setMaxPrice(10000);
    setSortBy('featured');
  };

  return (
    <div className="bg-[#f7f8fa] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumbs & Title */}
        <div className="mb-8">
          <div className="text-xs text-slate-500 mb-2 flex items-center gap-1.5 font-medium">
            <button onClick={() => onNavigate('home')} className="hover:text-[#5191fa]">Home</button>
            <span>/</span>
            <span className="text-slate-800 font-semibold">All Tours &amp; Expeditions</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-4xl font-extrabold text-[#1a2b48]">
            Karakoram Treks &amp; Expeditions in Pakistan
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Browse our licensed expeditions with confirmed departure dates and local Balti guidance.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200/80 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="relative">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Keywords
              </label>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="e.g. K2, Concordia, Fairy Meadows"
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-[#5191fa] focus:bg-white"
                />
              </div>
            </div>

            {/* Travel Category */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Adventure Style
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-[#5191fa] cursor-pointer"
              >
                <option value="all">All Styles</option>
                <option value="trekking">Trekking Expeditions</option>
                <option value="expedition">8,000m Peak Climbing</option>
                <option value="6000m">6,000m Training Peaks</option>
                <option value="cultural">Cultural Heritage Tours</option>
              </select>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Duration
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-[#5191fa] cursor-pointer"
              >
                <option value="all">Any Duration</option>
                <option value="short">7 - 14 Days</option>
                <option value="medium">15 - 21 Days (K2 Standard)</option>
                <option value="long">22+ Days (Full Expeditions)</option>
              </select>
            </div>

            {/* Difficulty */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Difficulty
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-[#5191fa] cursor-pointer"
              >
                <option value="all">All Difficulty Levels</option>
                <option value="Moderate">Moderate</option>
                <option value="Demanding">Demanding</option>
                <option value="Strenuous">Strenuous</option>
                <option value="Extreme">Extreme (8000m)</option>
              </select>
            </div>
          </div>

          {/* Bottom Bar: Results Count, Sort & Reset */}
          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-slate-500 font-medium">
              Showing <span className="font-bold text-slate-900">{filteredTours.length}</span> adventures in Pakistan
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-xs">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-slate-500 font-medium">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-slate-50 border border-slate-200 rounded-md px-2 py-1 text-xs text-slate-800 font-medium focus:outline-none cursor-pointer"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="duration">Duration: Short to Long</option>
                </select>
              </div>

              {(searchTerm || category !== 'all' || duration !== 'all' || difficulty !== 'all') && (
                <button
                  onClick={resetFilters}
                  className="text-xs text-[#5191fa] hover:underline font-semibold cursor-pointer"
                >
                  Reset Filters
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Tours Grid */}
        {filteredTours.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} onSelect={onSelectTour} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">No matching tours found</h3>
            <p className="text-xs text-slate-500 mb-6">
              Try adjusting your search terms or clearing the selected filters.
            </p>
            <button
              onClick={resetFilters}
              className="px-5 py-2.5 bg-[#5191fa] text-white text-xs font-semibold rounded-xl cursor-pointer"
            >
              Show All Tours
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
