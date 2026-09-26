import React from 'react';
import { MapPin, Clock, Star, Flame, ArrowRight, ShieldCheck } from 'lucide-react';
import { Tour } from '../data/toursData';
import { useAuth } from '../context/AuthContext';

interface TourCardProps {
  tour: Tour;
  onSelect: (tour: Tour) => void;
  onBookDirect?: (tour: Tour) => void;
}

export const TourCard: React.FC<TourCardProps> = ({ tour, onSelect, onBookDirect }) => {
  const { formatPrice } = useAuth();

  return (
    <div
      onClick={() => onSelect(tour)}
      className="group bg-white rounded-xl overflow-hidden shadow-[0_4px_18px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.14)] transition-all duration-300 transform hover:-translate-y-1 flex flex-col border border-slate-100 cursor-pointer"
    >
      {/* Thumbnail Area */}
      <div className="relative h-52 overflow-hidden bg-slate-100">
        <img
          src={tour.image}
          alt={tour.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Gradient scrim for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 items-center z-10">
          {tour.discountPercent ? (
            <span className="bg-[#fa5636] text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded shadow-sm">
              {tour.discountPercent}% OFF
            </span>
          ) : null}
          {tour.featured ? (
            <span className="bg-[#1a2b48]/80 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded">
              Featured
            </span>
          ) : null}
        </div>

        {/* Location at bottom of photo */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs z-10">
          <div className="flex items-center gap-1 drop-shadow-md truncate pr-2">
            <MapPin className="w-3.5 h-3.5 text-[#5191fa] shrink-0" />
            <span className="truncate font-medium">{tour.location}</span>
          </div>
        </div>
      </div>

      {/* Body Area */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata row: unboxed clean text */}
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2 font-medium">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{tour.duration}</span>
            </span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="truncate">{tour.maxAltitude}</span>
          </div>

          {/* Title */}
          <h3 className="font-heading font-bold text-base text-[#1a2b48] group-hover:text-[#5191fa] transition-colors line-clamp-2 mb-2 leading-snug">
            {tour.title}
          </h3>

          {/* Quick highlight excerpt */}
          <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed font-normal">
            {tour.overview}
          </p>
        </div>

        {/* Footer info: Rating & Price */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          {/* Reviews */}
          <div className="flex items-center gap-1 text-xs">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="font-bold text-slate-800">{tour.rating}</span>
            <span className="text-slate-400 text-[11px]">({tour.reviewsCount})</span>
          </div>

          {/* Price */}
          <div className="text-right">
            <div className="text-[10px] text-slate-400 uppercase tracking-wide">From</div>
            <div className="flex items-baseline gap-1.5 justify-end">
              {tour.originalPrice && (
                <span className="text-xs text-slate-400 line-through">
                  {formatPrice(tour.originalPrice)}
                </span>
              )}
              <span className="text-base font-extrabold text-[#1a2b48]">
                {formatPrice(tour.price)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
