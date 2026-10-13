import React from 'react';
import { TourCard } from './TourCard';
import { TOURS_DATA, Tour } from '../data/toursData';

interface FeaturedToursProps {
  onSelectTour: (tour: Tour) => void;
  onViewAll: (category?: string) => void;
}

export const FeaturedTours: React.FC<FeaturedToursProps> = ({ onSelectTour, onViewAll }) => {
  // Section 1: Handpicked Best Sellers
  const handpickedTours = TOURS_DATA.filter(t =>
    ['k2-base-camp-trek', 'nanga-parbat-rakaposhi-base-camp-trek', 'k2-gondogoro-la-trek', 'cultural-heritage-lahore-multan-peshawar-swat', 'spantik-peak-expedition', 'broad-peak-expedition'].includes(t.id)
  );

  // Section 2: Top Rated Expeditions
  const expeditionTours = TOURS_DATA.filter(t => t.category === 'expedition' || t.category === '6000m');

  // Section 3: Cultural Tours
  const culturalTours = TOURS_DATA.filter(t => t.category === 'cultural');

  return (
    <div className="space-y-16 py-12 bg-white">
      {/* ================= SECTION 1: BEST HANDPICKED TOURS ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="relative inline-block text-3xl font-semibold text-[#1a2b48] pb-3">
            Best Handpicked Tours
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-[3px] bg-[#5191fa] rounded-full" />
          </h2>
          <p className="text-sm text-[#5e6d77] mt-2 max-w-xl mx-auto">
            Discover our best-selling, handpicked tours, trekking and expeditions carefully crafted for an unforgettable journey.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {handpickedTours.slice(0, 6).map((tour) => (
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
            borderRadius: '12px',
            padding: '30px'
          }}
        >
          <div className="text-center mb-10">
            <h2 className="relative inline-block text-3xl font-semibold text-[#1a2b48] pb-3">
              Top Rated Expeditions in Pakistan
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-[3px] bg-[#5191fa] rounded-full" />
            </h2>
            <p className="text-sm text-[#5e6d77] mt-2 max-w-xl mx-auto">
              Climb the world&apos;s most dramatic 7000m and 8000m peaks with expert Balti expedition leadership.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {expeditionTours.slice(0, 6).map((tour) => (
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
          <h2 className="relative inline-block text-3xl font-semibold text-[#1a2b48] pb-3">
            Explore Cultural Tours
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-[3px] bg-[#5191fa] rounded-full" />
          </h2>
          <p className="text-sm text-[#5e6d77] mt-2 max-w-xl mx-auto">
            Discover the ancient Silk Road heritage, Mughal monuments, and northern valley cultures.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {culturalTours.map((tour) => (
            <TourCard key={tour.id} tour={tour} onSelect={onSelectTour} />
          ))}
        </div>
      </section>
    </div>
  );
};
