import React from 'react';
import { MapPin, Heart, ArrowRight } from 'lucide-react';
import { Tour } from '../data/toursData';
import { useAuth } from '../context/AuthContext';

interface TourCardProps {
  tour: Tour;
  onSelect: (tour: Tour) => void;
}

export const TourCard: React.FC<TourCardProps> = ({ tour, onSelect }) => {
  const { formatPrice, isAuthenticated, isFavorite, toggleFavorite, openLogin } = useAuth();
  const liked = isFavorite(tour.id);

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      openLogin();
      return;
    }
    await toggleFavorite(tour.id);
  };

  return (
    <div
      onClick={() => onSelect(tour)}
      className="item-tour bg-white rounded-[3px] border border-[#dfdfdf] overflow-hidden pb-4 relative transition-all duration-300 hover:shadow-lg cursor-pointer flex flex-col justify-between group"
    >
      {/* Thumbnail Area - height 180px */}
      <div className="relative h-[180px] bg-slate-200 overflow-hidden">
        <img
          src={tour.image}
          alt={tour.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
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

        {/* Wishlist Heart - Save as Favorite for Logged In User */}
        <button
          type="button"
          onClick={handleFavoriteClick}
          aria-label={liked ? 'Remove from favorites' : 'Save as favorite'}
          title={isAuthenticated ? (liked ? 'Remove from favorites' : 'Save as favorite') : 'Log in to save favorite'}
          className={`absolute bottom-2 right-2 p-2 rounded-full backdrop-blur-xs transition-all z-20 cursor-pointer ${
            liked
              ? 'bg-rose-500 text-white shadow-md scale-105'
              : 'bg-black/40 text-white hover:bg-black/70 hover:scale-110'
          }`}
        >
          <Heart className={`w-4 h-4 ${liked ? 'fill-white text-white' : 'text-white'}`} />
        </button>

        {/* Hover Center "Book Now" Button with Zoom-in Effect */}
        <div className="absolute inset-0 bg-slate-900/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-15 pointer-events-none">
          <div className="transform scale-60 group-hover:scale-100 transition-all duration-300 ease-out">
            <span className="bg-[#5191fa] hover:bg-[#3875dc] text-white text-xs sm:text-sm font-bold uppercase tracking-wider px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-2 border border-white/40 backdrop-blur-xs pointer-events-auto cursor-pointer transition-transform hover:scale-105 active:scale-95">
              <span>Book Now</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>
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
          <h3 className="text-[15px] font-semibold text-[#1a2b48] group-hover:text-[#5191fa] transition-colors px-4 mb-2 leading-snug line-clamp-2">
            {tour.title}
          </h3>

          {/* Brief Tour Description Snippet */}
          {tour.overview && (
            <p className="text-xs text-[#5e6d77] px-4 mb-2 line-clamp-2 leading-relaxed">
              {tour.overview}
            </p>
          )}
        </div>

        {/* Bottom Info: Duration, Expedition Type, Price & CTA */}
        <div className="px-4 pt-3 border-t border-[#f0f0f0] mt-2">
          {/* Duration & Expedition Type */}
          <div className="flex items-center justify-between text-xs text-[#5e6d77] mb-2.5">
            <span className="text-[11px] font-semibold tracking-wider uppercase text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
              {tour.category || 'Expedition'}
            </span>

            <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
              {tour.daysCount} Days
            </span>
          </div>

          {/* Price & Call-to-Action Button */}
          <div className="flex items-center justify-between pt-1">
            <div>
              <span className="text-[11px] text-[#5e6d77] block -mb-0.5">From</span>
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

            {/* Call-to-Action Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelect(tour);
              }}
              className="px-3.5 py-1.5 bg-[#5191fa] hover:bg-[#3875dc] text-white text-xs font-semibold rounded-md flex items-center gap-1.5 shadow-xs transition-all hover:shadow cursor-pointer"
              title={`Explore ${tour.title}`}
            >
              <span>Explore Tour</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
