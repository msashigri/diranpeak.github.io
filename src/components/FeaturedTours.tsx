import React, { useState } from 'react';
import { TourCard } from './TourCard';
import { TOURS_DATA, Tour } from '../data/toursData';
import { ArrowRight } from 'lucide-react';

interface FeaturedToursProps {
  onSelectTour: (tour: Tour) => void;
  onViewAll: (category?: string) => void;
}

export const FeaturedTours: React.FC<FeaturedToursProps> = ({ onSelectTour, onViewAll }) => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Experiences' },
    { id: 'trekking', label: 'Trekking Tours' },
    { id: 'expedition', label: 'Climbing Expeditions' },
    { id: '6000m', label: '6,000m Peaks' },
    { id: 'cultural', label: 'Cultural & Heritage' },
  ];

  const filteredTours = activeTab === 'all'
    ? TOURS_DATA
    : TOURS_DATA.filter(t => t.category === activeTab);

  return (
    <section className="py-16 bg-[#f7f8fa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-slate-200">
          <div>
            <div className="text-xs font-bold text-[#5191fa] uppercase tracking-wider mb-1">
              Top Rated Expeditions
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#1a2b48]">
              Featured Tours &amp; Expeditions in Pakistan
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
              From the high-altitude glaciers of the Baltoro to ancient Silk Road shrines, explore our hand-crafted adventures with fixed departures.
            </p>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-2 md:pb-0 mt-4 md:mt-0 p-1 bg-slate-200/70 rounded-xl">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === cat.id
                    ? 'bg-white text-[#1a2b48] shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid of Tours */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredTours.slice(0, 6).map((tour) => (
            <TourCard key={tour.id} tour={tour} onSelect={onSelectTour} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => onViewAll(activeTab !== 'all' ? activeTab : undefined)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-50 text-[#1a2b48] border border-slate-200 text-xs font-bold uppercase tracking-wider rounded-xl shadow-sm hover:shadow transition-all cursor-pointer"
          >
            <span>Explore All {filteredTours.length} Adventures</span>
            <ArrowRight className="w-4 h-4 text-[#5191fa]" />
          </button>
        </div>
      </div>
    </section>
  );
};
