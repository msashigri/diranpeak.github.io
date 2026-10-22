import React from 'react';
import { TourCard } from './TourCard';
import { Tour } from '../data/toursData';
import { useAuth } from '../context/AuthContext';

interface FeaturedToursProps {
  onSelectTour: (tour: Tour) => void;
  onViewAll: (category?: string) => void;
}

export const FeaturedTours: React.FC<FeaturedToursProps> = ({ onSelectTour, onViewAll }) => {
  const { tours } = useAuth();

  // Section 1: Handpicked Best Sellers / Trekkings (Top 3 only)
  const trekkingTours = (tours || [])
    .filter(t => t.category === 'trekking')
    .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    .slice(0, 3);

  // Section 2: Top Rated Expeditions in Pakistan (Top 3 only)
  const expeditionTours = (tours || [])
    .filter(t => t.category === 'expedition' || t.category === '6000m')
    .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    .slice(0, 3);

  // Section 3: Cultural Tours (Top 3 only)
  const culturalTours = (tours || [])
    .filter(t => t.category === 'cultural')
    .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    .slice(0, 3);

  return (
    <div className="space-y-16 py-12 bg-white">
      {/* ================= SECTION 1: BEST HANDPICKED TOURS ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-block px-3 py-1 bg-blue-50 text-[#5191fa] text-xs font-bold uppercase tracking-wider rounded-full mb-2">
            Featured Treks
          </div>
          <h2 className="relative inline-block text-3xl font-semibold text-[#1a2b48] pb-3">
            Best Handpicked Tours
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-[3px] bg-[#5191fa] rounded-full" />
          </h2>
          <p className="text-sm text-[#5e6d77] mt-2 max-w-xl mx-auto">
            Discover our best-selling, handpicked trekking adventures carefully crafted for an unforgettable journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trekkingTours.map((tour) => (
            <TourCard key={tour.id} tour={tour} onSelect={onSelectTour} />
          ))}
        </div>

        {/* Real Diran Peak "All Trekkings" Button matching .trekking-btn */}
        <div className="text-center mt-8">
          <button
            onClick={() => onViewAll('trekking')}
            className="trekking-btn cursor-pointer"
          >
            All Trekkings
          </button>
        </div>
      </section>

      {/* ================= SECTION 2: TOP RATED EXPEDITIONS IN PAKISTAN ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          style={{
            backgroundColor: '#f5f5f5',
            borderRadius: '16px',
            padding: '36px 24px'
          }}
        >
          <div className="text-center mb-10">
            <div className="inline-block px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold uppercase tracking-wider rounded-full mb-2">
              Extreme Mountaineering
            </div>
            <h2 className="relative inline-block text-3xl font-semibold text-[#1a2b48] pb-3">
              Top Rated Expeditions in Pakistan
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-[3px] bg-[#5191fa] rounded-full" />
            </h2>
            <p className="text-sm text-[#5e6d77] mt-2 max-w-xl mx-auto">
              Climb the world&apos;s most dramatic 7000m and 8000m peaks with expert Balti expedition leadership.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {expeditionTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} onSelect={onSelectTour} />
            ))}
          </div>

          {/* Real Diran Peak "All Expeditions" Button */}
          <div className="text-center mt-8">
            <button
              onClick={() => onViewAll('expedition')}
              className="trekking-btn cursor-pointer"
            >
              All Expeditions
            </button>
          </div>
        </div>
      </section>

      {/* ================= SECTION 3: EXPLORE CULTURAL TOURS ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-block px-3 py-1 bg-amber-50 text-amber-600 text-xs font-bold uppercase tracking-wider rounded-full mb-2">
            Heritage &amp; History
          </div>
          <h2 className="relative inline-block text-3xl font-semibold text-[#1a2b48] pb-3">
            Explore Cultural Tours
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-[3px] bg-[#5191fa] rounded-full" />
          </h2>
          <p className="text-sm text-[#5e6d77] mt-2 max-w-xl mx-auto">
            Discover the ancient Silk Road heritage, Mughal monuments, and northern valley cultures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {culturalTours.map((tour) => (
            <TourCard key={tour.id} tour={tour} onSelect={onSelectTour} />
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => onViewAll('cultural')}
            className="trekking-btn cursor-pointer"
          >
            All Cultural Tours
          </button>
        </div>
      </section>
    </div>
  );
};
