import React, { useState } from 'react';
import { MapPin, Star, Heart } from 'lucide-react';
import { Tour } from '../data/toursData';
import { useAuth } from '../context/AuthContext';

interface TourCardProps {
  tour: Tour;
  onSelect: (tour: Tour) => void;
}

export const TourCard: React.FC<TourCardProps> = ({ tour, onSelect }) => {
  const { formatPrice } = useAuth();
  const [liked, setLiked] = useState(false);

  return (
    <div
      onClick={() => onSelect(tour)}
      className="item-tour bg-white rounded-[3px] border border-[#dfdfdf] overflow-hidden pb-4 relative transition-all duration-300 hover:shadow-lg cursor-pointer flex flex-col justify-between"
    >
      {/* Thumbnail Area - height 180px */}
      <div className="relative h-[180px] bg-slate-200 overflow-hidden">
        <img
          src={tour.image}
          alt={tour.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />

        {/* Diagonal Sale Badge - exact BookingCore style */}
        {tour.discountPercent ? (
          <div
            style={{
              backgroundColor: '#c03',
              color: '#fff',
              fontSize: '12px',
              fontWeight: '700',
              height: '42px',
              lineHeight: '56px',
              position: 'absolute',
              right: '-30px',
              textAlign: 'center',
              top: '-13px',
              transform: 'rotate(45deg)',
              width: '80px',
              zIndex: 8
            }}
          >
            {tour.discountPercent}%
          </div>
        ) : null}

        {/* Featured Tag */}
        {tour.featured && (
          <div
            style={{
              background: '#5191fa',
              borderRadius: '0 3px 3px 0',
              color: '#fff',
              fontSize: '12px',
              fontWeight: 500,
              left: 0,
              padding: '4px 8px',
              position: 'absolute',
              top: '15px',
              zIndex: 8
            }}
          >
            Featured
          </div>
        )}

        {/* Wishlist Heart */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setLiked(!liked);
          }}
          aria-label="Wishlist"
          className="absolute bottom-2 right-2 text-white hover:text-[#ff9290] p-1.5 transition-colors z-10 cursor-pointer"
        >
          <Heart className={`w-4 h-4 ${liked ? 'fill-rose-500 text-rose-500' : 'text-white'}`} />
        </button>
      </div>

      {/* Details */}
      <div className="flex-1 flex flex-col justify-between pt-3">
        <div>
          {/* Location */}
          <div className="flex items-center gap-1 text-[13px] text-[#5e6d77] px-4 mb-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#5191fa] shrink-0" />
            <span className="truncate">{tour.location}</span>
          </div>

          {/* Tour Title */}
          <h3 className="text-[15px] font-medium text-[#1a2b48] hover:text-[#5191fa] transition-colors px-4 mb-2 leading-snug line-clamp-2">
            {tour.title}
          </h3>
        </div>

        {/* Bottom Info: Duration, Reviews & Price */}
        <div className="px-4 pt-3 border-t border-[#f0f0f0] mt-2">
          {/* Reviews & Duration */}
          <div className="flex items-center justify-between text-xs text-[#5e6d77] mb-2">
            <div className="flex items-center gap-1 text-[#ffdc00]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-current" />
              ))}
              <span className="text-[#5e6d77] text-[11px] ml-1">
                ({tour.reviewsCount})
              </span>
            </div>

            <span className="font-semibold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded text-[11px]">
              {tour.daysCount}D
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline justify-between pt-1">
            <span className="text-[11px] text-[#5e6d77]">From</span>
            <div className="flex items-baseline gap-1.5">
              {tour.originalPrice && (
                <span className="text-xs text-slate-400 line-through">
                  {formatPrice(tour.originalPrice)}
                </span>
              )}
              <span className="text-base font-bold text-[#1a2b48]">
                {formatPrice(tour.price)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
