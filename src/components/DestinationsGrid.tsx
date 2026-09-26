import React from 'react';
import { ArrowRight, Compass } from 'lucide-react';

interface DestinationsGridProps {
  onSelectDestination: (destName: string) => void;
}

export const DestinationsGrid: React.FC<DestinationsGridProps> = ({ onSelectDestination }) => {
  const destinations = [
    {
      id: 'concordia',
      title: 'Concordia & Baltoro',
      subtitle: 'Throne Room of Mountain Gods',
      image: '/src/assets/images/hero_karakoram_k2_1790420138291.jpg',
      treksCount: '8 Expeditions',
      badge: 'Iconic'
    },
    {
      id: 'skardu',
      title: 'Skardu & Shigar Valleys',
      subtitle: 'Gateway to the Karakoram',
      image: '/src/assets/images/skardu_valley_landscape_1790420181912.jpg',
      treksCount: '12 Tours',
      badge: 'Heritage'
    },
    {
      id: 'fairy-meadows',
      title: 'Fairy Meadows & Hunza',
      subtitle: 'Nanga Parbat & Ancient Forts',
      image: '/src/assets/images/skardu_valley_landscape_1790420181912.jpg',
      treksCount: '6 Tours',
      badge: 'Popular'
    },
    {
      id: 'hushe',
      title: 'Hushe & Nangma Valley',
      subtitle: 'Granite Towers & Laila Peak',
      image: '/src/assets/images/trek_baltoro_glacier_1790420152808.jpg',
      treksCount: '5 Treks',
      badge: 'Alpine'
    }
  ];

  return (
    <section className="py-16 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
          <div>
            <div className="text-xs font-bold text-[#5191fa] uppercase tracking-wider mb-1">
              Destinations in Pakistan
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#1a2b48]">
              Explore Majestic Karakoram Valleys
            </h2>
          </div>
          <div className="mt-3 sm:mt-0 text-xs text-slate-500">
            Unexplored wilderness &amp; ancient Balti cultural sanctuaries
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((d) => (
            <div
              key={d.id}
              onClick={() => onSelectDestination(d.title)}
              className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Image */}
              <img
                src={d.image}
                alt={d.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
              />

              {/* Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

              {/* Badge */}
              <div className="absolute top-4 left-4">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md text-white border border-white/20">
                  {d.badge}
                </span>
              </div>

              {/* Content */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="text-[11px] font-medium text-sky-200 mb-1">
                  {d.treksCount}
                </div>
                <h3 className="font-heading font-extrabold text-lg text-white mb-0.5 leading-tight">
                  {d.title}
                </h3>
                <p className="text-xs text-slate-300 truncate mb-3">
                  {d.subtitle}
                </p>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5191fa] group-hover:text-white transition-colors">
                  <span>Explore packages</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
