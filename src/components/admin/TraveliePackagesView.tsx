import React, { useState } from 'react';
import {
  Plus, Search, Edit3, Star, MapPin, Calendar, Clock,
  Check, Users, Shield, ArrowRight, MoreHorizontal, Sparkles,
  Mountain, DollarSign, Compass, Utensils, Award
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Tour } from '../../data/toursData';

interface TraveliePackagesViewProps {
  onOpenAddPackage: () => void;
  onEditPackage: (tour: Tour) => void;
  onSelectTour: (tour: Tour) => void;
}

export const TraveliePackagesView: React.FC<TraveliePackagesViewProps> = ({
  onOpenAddPackage,
  onEditPackage,
  onSelectTour
}) => {
  const { tours, formatPrice } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTourId, setSelectedTourId] = useState<string>(tours[0]?.id || 'diran-peak-expedition');

  const spotlightTour = tours.find(t => t.id === selectedTourId) || tours[0];

  const popularPackages = tours.slice(1, 5);
  const featuredPackages = tours.slice(0, 3);
  const recommendedPackages = tours.slice(3, 7);

  const filteredTours = tours.filter(t => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      t.title.toLowerCase().includes(q) ||
      t.location.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-8">
      {/* Top Section: Spotlight / New Package + Popular Packages */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Spotlight / Selected Package Card matching image 3112803 */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-200/80">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-extrabold font-heading text-[#1a2b48]">
              Spotlight Package
            </h2>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onOpenAddPackage}
                className="px-4 py-2 bg-[#5191fa] hover:bg-[#3875dc] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Add Package</span>
              </button>
            </div>
          </div>

          {spotlightTour && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Photo & thumbnails */}
              <div className="md:col-span-5 space-y-3">
                <div className="h-56 rounded-2xl overflow-hidden relative group">
                  <img
                    src={spotlightTour.image}
                    alt={spotlightTour.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-xs px-2.5 py-0.5 rounded-full text-[10px] font-bold text-[#1a2b48] shadow-xs">
                    {spotlightTour.category}
                  </div>
                </div>

                {/* 3 square thumbnails matching image */}
                <div className="grid grid-cols-3 gap-2">
                  {(spotlightTour.gallery && spotlightTour.gallery.length >= 3
                    ? spotlightTour.gallery.slice(0, 3)
                    : [spotlightTour.image, spotlightTour.image, spotlightTour.image]
                  ).map((thumb, idx) => (
                    <div key={idx} className="h-16 rounded-xl overflow-hidden border border-slate-200">
                      <img src={thumb} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Package Details in center-right */}
              <div className="md:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium mb-1">
                    <MapPin className="w-3.5 h-3.5 text-[#5191fa]" />
                    <span>{spotlightTour.location}</span>
                  </div>

                  <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-[#1a2b48] tracking-tight">
                    {spotlightTour.title}
                  </h3>

                  <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                    {spotlightTour.overview}
                  </p>

                  <div className="grid grid-cols-2 gap-4 my-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                    <div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase">Price</div>
                      <div className="text-lg font-extrabold text-[#5191fa]">
                        {formatPrice(spotlightTour.price)}{' '}
                        <span className="text-[10px] text-slate-400 font-normal">/ person</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase">Duration</div>
                      <div className="text-sm font-bold text-slate-800 mt-0.5">
                        {spotlightTour.daysCount} Days / {spotlightTour.daysCount - 1} Nights
                      </div>
                    </div>
                  </div>

                  {/* Highlights checklist */}
                  <div className="space-y-2 text-xs text-slate-600 mb-4">
                    <div className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="font-medium">All-Inclusive: Basecamp chef, altitude meals & logistics</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="font-medium">Certified Mountain Guide & High Altitude Porter (HAP)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="font-medium">Government Expedition Permit & Satellite SOS tracking</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => onEditPackage(spotlightTour)}
                    className="flex-1 py-2.5 bg-[#5191fa] hover:bg-[#3875dc] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer text-center"
                  >
                    Edit Detail
                  </button>
                  <button
                    type="button"
                    onClick={() => onSelectTour(spotlightTour)}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    View Public Page
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right: Popular Packages List matching image 3112803 */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 shadow-xs border border-slate-200/80">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-extrabold text-base text-[#1a2b48]">
              Popular Packages
            </h3>
            <MoreHorizontal className="w-4 h-4 text-slate-400 cursor-pointer" />
          </div>

          <div className="space-y-3.5">
            {popularPackages.map((pkg) => (
              <div
                key={pkg.id}
                onClick={() => setSelectedTourId(pkg.id)}
                className={`flex items-center gap-3 p-2.5 rounded-2xl border transition-all cursor-pointer ${
                  selectedTourId === pkg.id
                    ? 'border-[#5191fa] bg-blue-50/40 shadow-xs'
                    : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="w-16 h-14 rounded-xl overflow-hidden shrink-0">
                  <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-heading font-bold text-xs text-[#1a2b48] truncate">
                    {pkg.title}
                  </h4>
                  <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-[#5191fa]" />
                    <span className="truncate">{pkg.location}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1 text-[11px] font-bold text-amber-500">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{pkg.rating || 4.8} / 5</span>
                    <span className="text-slate-400 font-normal ml-auto">
                      {formatPrice(pkg.price)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section: Featured Packages (Left) & Recommended Packages (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Featured Packages (Wide cards with details) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-extrabold text-base text-[#1a2b48]">
              Featured Packages
            </h3>
            <MoreHorizontal className="w-4 h-4 text-slate-400 cursor-pointer" />
          </div>

          {featuredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-3xl p-5 shadow-xs border border-slate-200/80 hover:shadow-sm transition-all flex flex-col sm:flex-row gap-5"
            >
              <div className="sm:w-48 h-40 rounded-2xl overflow-hidden relative shrink-0">
                <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
                <div className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>{pkg.rating || 4.8}</span>
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-heading font-bold text-sm text-[#1a2b48]">
                      {pkg.title}
                    </h4>
                    <div className="text-sm font-extrabold text-[#5191fa] shrink-0">
                      {formatPrice(pkg.price)}{' '}
                      <span className="text-[10px] text-slate-400 font-normal">/ person</span>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-3">
                    <span>{pkg.daysCount} Days / {pkg.daysCount - 1} Nights</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#5191fa]" />
                      {pkg.location}
                    </span>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <div>
                      <strong className="text-slate-800 block text-[10px] uppercase">Basecamp:</strong>
                      {pkg.maxAltitude || 'Karakoram Range'}
                    </div>
                    <div>
                      <strong className="text-slate-800 block text-[10px] uppercase">Difficulty:</strong>
                      {pkg.difficulty || 'Challenging'}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 mt-3 flex items-center justify-between gap-3">
                  <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                    <Check className="w-3 h-3" /> Licensed Departures
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onEditPackage(pkg)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => onSelectTour(pkg)}
                      className="px-3 py-1.5 bg-[#5191fa] hover:bg-[#3875dc] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recommended Packages (2x2 Grid matching image 3112803) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-extrabold text-base text-[#1a2b48]">
              Recommended Packages
            </h3>
            <MoreHorizontal className="w-4 h-4 text-slate-400 cursor-pointer" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {recommendedPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white rounded-3xl p-4 shadow-xs border border-slate-200/80 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="h-32 rounded-2xl overflow-hidden mb-3 relative">
                    <img
                      src={pkg.image}
                      alt={pkg.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-xs text-[#1a2b48] text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {pkg.category}
                    </div>
                  </div>

                  <h4 className="font-heading font-bold text-xs text-[#1a2b48] line-clamp-1">
                    {pkg.title}
                  </h4>
                  <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-[#5191fa]" />
                    <span className="truncate">{pkg.location}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 mt-3 flex items-center justify-between">
                  <div className="text-xs font-extrabold text-[#5191fa]">
                    {formatPrice(pkg.price)}
                    <span className="text-[9px] font-normal text-slate-400">/p</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onSelectTour(pkg)}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-[#5191fa] hover:text-white text-slate-700 text-[11px] font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
