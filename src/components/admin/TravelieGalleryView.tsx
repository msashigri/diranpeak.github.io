import React, { useState } from 'react';
import {
  Image as ImageIcon, Search, Plus, Filter, Calendar,
  MapPin, Eye, Trash2, Download, MoreHorizontal
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const TravelieGalleryView: React.FC = () => {
  const { tours } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPackage, setSelectedPackage] = useState('ALL');

  const galleryItems = [
    { id: 'img-1', title: 'Alpine Escape', location: 'Swiss Alps, Switzerland', img: '/images/hero_karakoram_k2_1790420138291.jpg' },
    { id: 'img-2', title: 'Bali Beach Escape', location: 'Bali, Indonesia', img: '/images/skardu_valley_landscape_1790420181912.jpg' },
    { id: 'img-3', title: 'Caribbean Cruise', location: 'Caribbean Islands', img: '/images/trek_baltoro_glacier_1790420152808.jpg' },
    { id: 'img-4', title: 'Greek Island Hopping', location: 'Santorini, Greece', img: '/images/hero_karakoram_k2_1790420138291.jpg' },
    { id: 'img-5', title: 'New York City Highlights', location: 'New York, USA', img: '/images/skardu_valley_landscape_1790420181912.jpg' },
    { id: 'img-6', title: 'Parisian Romance', location: 'Paris, France', img: '/images/trek_baltoro_glacier_1790420152808.jpg' },
    { id: 'img-7', title: 'Safari Adventure', location: 'Serengeti, Tanzania', img: '/images/hero_karakoram_k2_1790420138291.jpg' },
    { id: 'img-8', title: 'Seoul Cultural Exploration', location: 'Seoul, South Korea', img: '/images/skardu_valley_landscape_1790420181912.jpg' }
  ];

  const filteredItems = galleryItems.filter(item => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return item.title.toLowerCase().includes(q) || item.location.toLowerCase().includes(q);
  });

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-xs border border-slate-200/80 space-y-6">
      {/* Header with Filters matching image 3112804 */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-heading font-extrabold text-[#1a2b48]">
            Expedition &amp; Media Gallery
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            High-resolution visual assets for Karakoram climbs, treks, and cultural departures.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Date Picker */}
          <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>1 - 30 June 2028</span>
          </div>

          {/* Package Dropdown */}
          <select
            value={selectedPackage}
            onChange={(e) => setSelectedPackage(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 cursor-pointer focus:outline-none"
          >
            <option value="ALL">All Packages</option>
            {tours.map(t => (
              <option key={t.id} value={t.id}>{t.title}</option>
            ))}
          </select>

          {/* Search */}
          <div className="relative w-48 sm:w-60">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search package, location..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#5191fa]"
            />
          </div>

          {/* Add Image */}
          <button
            type="button"
            onClick={() => alert('Media upload dialog opened. Select high-res photos.')}
            className="px-4 py-2 bg-[#5191fa] hover:bg-[#3875dc] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Add Image</span>
          </button>
        </div>
      </div>

      {/* Grid of Images matching image 3112804 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="group bg-slate-50 rounded-2xl overflow-hidden border border-slate-200/80 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="relative h-44 overflow-hidden">
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => window.open(item.img, '_blank')}
                  className="p-2 bg-white/90 text-slate-800 rounded-xl hover:bg-white transition-colors cursor-pointer"
                  title="View"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-3.5">
              <h4 className="font-heading font-bold text-xs text-[#1a2b48] truncate">{item.title}</h4>
              <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-[#5191fa]" />
                <span className="truncate">{item.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
