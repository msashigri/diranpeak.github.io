import React, { useState } from 'react';
import { Tour } from '../data/toursData';
import { useAuth } from '../context/AuthContext';
import { InteractiveRouteMap } from '../components/InteractiveRouteMap';
import { WeatherWidget } from '../components/WeatherWidget';
import {
  MapPin, Clock, Calendar, Users, Mountain, ShieldCheck, Check, X,
  ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Star, Phone, MessageSquare, AlertCircle, Share2, Heart, Compass
} from 'lucide-react';

interface TourDetailPageProps {
  tour: Tour;
  onNavigate: (route: string, param?: string) => void;
  onOpenBookingModal?: () => void;
}

export const TourDetailPage: React.FC<TourDetailPageProps> = ({ tour, onNavigate }) => {
  const { formatPrice, user, createBooking, addContactInquiry, openLogin, isAuthenticated, isFavorite, toggleFavorite, addReview, deleteReview, getReviewsForTour, isAdmin } = useAuth();

  // Reviews state from Firestore
  const tourReviews = getReviewsForTour(tour.id);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewCountry, setReviewCountry] = useState(user?.emergencyContact || 'International Climber');
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewNotice, setReviewNotice] = useState<string | null>(null);

  const handlePostReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewComment.trim()) return;
    setSubmittingReview(true);
    setReviewNotice(null);

    const res = await addReview({
      tourId: tour.id,
      tourTitle: tour.title,
      rating: reviewRating,
      comment: reviewComment,
      userCountry: reviewCountry
    });

    setSubmittingReview(false);
    if (res.success) {
      setReviewComment('');
      setReviewNotice('Thank you! Your verified review has been posted directly to Firebase.');
      setTimeout(() => setReviewNotice(null), 5000);
    } else {
      setReviewNotice(res.error || 'Failed to submit review.');
    }
  };

  // Interactive Departure Calendar State (Supports Current Date & Coming Dates)
  const todayMidnight = (() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  })();

  const defaultDepartureDate = (() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  })();

  const [selectedDepartureDate, setSelectedDepartureDate] = useState<Date>(defaultDepartureDate);
  const [calendarViewDate, setCalendarViewDate] = useState<Date>(
    new Date(defaultDepartureDate.getFullYear(), defaultDepartureDate.getMonth(), 1)
  );
  const [bookingError, setBookingError] = useState<string | null>(null);

  const tripDays = tour.daysCount && tour.daysCount > 0 ? tour.daysCount : 14;
  const calculatedReturnDate = new Date(selectedDepartureDate);
  calculatedReturnDate.setDate(selectedDepartureDate.getDate() + tripDays);

  const formattedStartDate = selectedDepartureDate.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const formattedEndDate = calculatedReturnDate.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const canGoPrevMonth = (() => {
    const prevMonthEnd = new Date(calendarViewDate.getFullYear(), calendarViewDate.getMonth(), 0);
    return prevMonthEnd >= todayMidnight;
  })();

  const handlePrevMonth = () => {
    if (!canGoPrevMonth) return;
    setCalendarViewDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCalendarViewDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const calendarYear = calendarViewDate.getFullYear();
  const calendarMonth = calendarViewDate.getMonth();
  const firstDayOfWeek = new Date(calendarYear, calendarMonth, 1).getDay();
  const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();
  const calendarMonthName = calendarViewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [singleTent, setSingleTent] = useState(false);
  const [airportTransfer, setAirportTransfer] = useState(true);
  const [enquiryType, setEnquiryType] = useState<'book' | 'enquiry'>('book');

  // Customer info if not logged in
  const [guestName, setGuestName] = useState(user ? `${user.firstName} ${user.lastName}` : '');
  const [guestEmail, setGuestEmail] = useState(user ? user.email : '');
  const [guestPhone, setGuestPhone] = useState(user ? (user.phone || '') : '');
  const [specialRequests, setSpecialRequests] = useState('');

  // Enquiry state
  const [enquirySent, setEnquirySent] = useState(false);
  const [enquiryQuestion, setEnquiryQuestion] = useState('');
  const [enquirySubmitting, setEnquirySubmitting] = useState(false);
  const [enquiryError, setEnquiryError] = useState<string | null>(null);

  // Accordion state
  const [expandedDays, setExpandedDays] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    10: true,
    11: true
  });
  const [expandedFaqs, setExpandedFaqs] = useState<Record<number, boolean>>({
    0: true
  });

  // Active map day synchronized with InteractiveRouteMap
  const [activeMapDay, setActiveMapDay] = useState<number | undefined>(undefined);

  const handleSelectMapDay = React.useCallback((dayNum: number) => {
    setActiveMapDay(dayNum);
    setExpandedDays(prev => ({ ...prev, [dayNum]: true }));
  }, []);

  // Photo gallery active index
  const [activeImage, setActiveImage] = useState(tour.image);

  // Pricing calculations
  const singleTentCost = singleTent ? 250 : 0;
  const airportCost = airportTransfer ? 80 : 0;
  const totalPrice = (adults * tour.price) + (children * (tour.price * 0.75)) + singleTentCost + airportCost;

  const toggleDay = (day: number) => {
    setExpandedDays(prev => ({ ...prev, [day]: !prev[day] }));
  };

  const toggleFaq = (index: number) => {
    setExpandedFaqs(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const handleBookNow = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingError(null);
    if (!guestName.trim()) {
      setBookingError('Please enter your full name for the booking reservation.');
      return;
    }
    if (!guestEmail.trim() || !guestEmail.includes('@')) {
      setBookingError('Please enter a valid email address.');
      return;
    }

    createBooking({
      tourId: tour.id,
      tourTitle: tour.title,
      tourImage: tour.image,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      duration: tour.duration,
      adults,
      children,
      singleTent,
      airportTransfer,
      totalPrice,
      currency: 'USD',
      customerName: guestName,
      customerEmail: guestEmail,
      customerPhone: guestPhone || '+92 345 6412992',
      specialRequests
    });
  };

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnquiryError(null);
    if (!guestName.trim()) {
      setEnquiryError('Please enter your name.');
      return;
    }
    if (!guestEmail.trim() || !guestEmail.includes('@')) {
      setEnquiryError('Please enter a valid email address.');
      return;
    }

    setEnquirySubmitting(true);
    try {
      addContactInquiry({
        name: guestName.trim(),
        email: guestEmail.trim(),
        phone: guestPhone.trim() || '+92 345 6412992',
        subject: `Expedition Inquiry: ${tour.title}`,
        message: enquiryQuestion.trim() || `Inquiry regarding ${tour.title} dates, group logistics, and pricing.`,
        tourId: tour.id,
        tourTitle: tour.title
      });
      setEnquirySent(true);
      setEnquiryQuestion('');
    } catch {
      setEnquiryError('Failed to dispatch enquiry. Please WhatsApp us directly.');
    } finally {
      setEnquirySubmitting(false);
    }
  };

  return (
    <div className="bg-[#f7f8fa] min-h-screen pb-20">
      {/* Breadcrumbs & Header Bar */}
      <div className="bg-white border-b border-slate-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="text-xs text-slate-500 mb-1 flex items-center gap-1.5 font-medium">
                <button onClick={() => onNavigate('home')} className="hover:text-[#5191fa]">Home</button>
                <span>/</span>
                <button onClick={() => onNavigate('tours', tour.category)} className="hover:text-[#5191fa] capitalize">
                  {tour.category === 'trekking' ? 'Trekking Tours' : tour.category}
                </button>
                <span>/</span>
                <span className="text-slate-800 font-semibold truncate max-w-xs">{tour.title}</span>
              </div>
              <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#1a2b48]">
                {tour.title}
              </h1>
              <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                <MapPin className="w-3.5 h-3.5 text-[#5191fa]" />
                <span>{tour.location}</span>
                <span>·</span>
                <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">{tour.category || 'Expedition'}</span>
                <span>·</span>
                <span>{tour.daysCount} Days</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  if (!isAuthenticated) {
                    openLogin();
                    return;
                  }
                  toggleFavorite(tour.id);
                }}
                className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors border ${
                  isFavorite(tour.id)
                    ? 'bg-rose-50 border-rose-300 text-rose-600 shadow-xs'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
                title={isAuthenticated ? (isFavorite(tour.id) ? 'Remove from favorites' : 'Save as favorite') : 'Log in to save favorite'}
              >
                <Heart className={`w-4 h-4 ${isFavorite(tour.id) ? 'fill-rose-500 text-rose-500' : 'text-slate-500'}`} />
                <span>{isFavorite(tour.id) ? 'Favorited' : 'Save as Favorite'}</span>
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('route-map-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-3 py-2 bg-blue-50 border border-blue-200 text-[#5191fa] hover:bg-blue-100 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                title="Jump down to interactive GPS route map"
              >
                <Compass className="w-4 h-4 text-[#5191fa]" />
                <span className="hidden sm:inline">Route Map</span>
              </button>

              <button
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  alert('Tour link copied to clipboard!');
                }}
                className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-50 text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Share2 className="w-4 h-4 text-slate-500" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT 2 COLUMNS: Detail Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Gallery Section */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200/80 p-3">
              <div className="relative h-[360px] sm:h-[420px] rounded-xl overflow-hidden bg-slate-900">
                <img
                  src={activeImage}
                  alt={tour.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-all duration-300"
                />
                {tour.discountPercent && (
                  <div className="absolute top-4 left-4 bg-[#fa5636] text-white text-xs font-black uppercase px-2.5 py-1 rounded shadow-md">
                    {tour.discountPercent}% OFF Special Booking
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {tour.gallery && tour.gallery.length > 1 && (
                <div className="grid grid-cols-4 gap-2 mt-3">
                  {tour.gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`h-20 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                        activeImage === img ? 'border-[#5191fa] ring-2 ring-blue-200' : 'border-transparent opacity-75 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Key Quick Facts Grid */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <Clock className="w-5 h-5 text-[#5191fa] mx-auto mb-1.5" />
                  <div className="text-[10px] uppercase font-bold text-slate-400">Duration</div>
                  <div className="text-xs font-extrabold text-[#1a2b48] mt-0.5">{tour.duration}</div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <Mountain className="w-5 h-5 text-[#5191fa] mx-auto mb-1.5" />
                  <div className="text-[10px] uppercase font-bold text-slate-400">Max Altitude</div>
                  <div className="text-xs font-extrabold text-[#1a2b48] mt-0.5">{tour.maxAltitude}</div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <Users className="w-5 h-5 text-[#5191fa] mx-auto mb-1.5" />
                  <div className="text-[10px] uppercase font-bold text-slate-400">Group Size</div>
                  <div className="text-xs font-extrabold text-[#1a2b48] mt-0.5">{tour.groupSize}</div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <ShieldCheck className="w-5 h-5 text-[#5191fa] mx-auto mb-1.5" />
                  <div className="text-[10px] uppercase font-bold text-slate-400">Difficulty</div>
                  <div className="text-xs font-extrabold text-[#1a2b48] mt-0.5">{tour.difficulty}</div>
                </div>
              </div>
            </div>

            {/* Overview */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80">
              <h2 className="font-heading text-xl font-bold text-[#1a2b48] mb-4">
                Expedition Overview
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-6">
                {tour.overview}
              </p>

              <h3 className="font-heading text-base font-bold text-[#1a2b48] mb-3">
                Key Trip Highlights
              </h3>
              <ul className="space-y-2.5">
                {tour.highlights.map((h, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Live Alpine Expedition Weather Widget */}
            <WeatherWidget
              tourId={tour.id}
              tourSlug={tour.slug}
              tourTitle={tour.title}
              tourLocation={tour.location}
              maxAltitude={tour.maxAltitude}
              itinerary={tour.itinerary}
              tour={tour}
            />

            {/* Interactive Leaflet Expedition & Trekking Route Map */}
            <div id="route-map-section" className="relative z-10 isolate scroll-mt-24">
              <InteractiveRouteMap
                tourId={tour.id}
                tourSlug={tour.slug}
                tourTitle={tour.title}
                tourLocation={tour.location}
                maxAltitude={tour.maxAltitude}
                itinerary={tour.itinerary}
                tour={tour}
                activeDayNumber={activeMapDay}
                onSelectDay={handleSelectMapDay}
              />
            </div>

            {/* Day by Day Itinerary */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-heading text-xl font-bold text-[#1a2b48]">
                    Day-by-Day Expedition Itinerary
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Carefully acclimated stages designed for maximum safety &amp; summit success
                  </p>
                </div>
                <button
                  onClick={() => {
                    const allTrue: Record<number, boolean> = {};
                    tour.itinerary.forEach(i => { allTrue[i.day] = true; });
                    setExpandedDays(allTrue);
                  }}
                  className="text-xs text-[#5191fa] hover:underline font-semibold cursor-pointer"
                >
                  Expand All
                </button>
              </div>

              <div className="space-y-3">
                {tour.itinerary.map((item) => {
                  const isOpen = !!expandedDays[item.day];
                  const isMapActive = activeMapDay === item.day;
                  return (
                    <div
                      key={item.day}
                      id={`itinerary-day-${item.day}`}
                      className={`border rounded-xl overflow-hidden transition-all ${
                        isMapActive
                          ? 'border-[#5191fa] ring-2 ring-blue-100 bg-blue-50/20 shadow-xs'
                          : 'border-slate-200'
                      }`}
                    >
                      <div
                        className={`w-full flex items-center justify-between p-4 transition-colors text-left ${
                          isMapActive ? 'bg-blue-50/50 hover:bg-blue-50/80' : 'bg-slate-50/70 hover:bg-slate-100/70'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => toggleDay(item.day)}
                          className="flex-1 flex items-center gap-3 text-left cursor-pointer"
                        >
                          <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                            isMapActive ? 'bg-[#1a2b48] text-white shadow-xs' : 'bg-[#5191fa] text-white'
                          }`}>
                            {item.day}
                          </span>
                          <span className="font-heading font-bold text-xs sm:text-sm text-[#1a2b48]">
                            {item.title}
                          </span>
                        </button>
                        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveMapDay(item.day);
                              setExpandedDays(prev => ({ ...prev, [item.day]: true }));
                              const mapEl = document.getElementById('route-map-section');
                              if (mapEl) {
                                mapEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                              }
                            }}
                            className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 sm:px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                              isMapActive
                                ? 'bg-[#5191fa] text-white border-[#5191fa] shadow-xs'
                                : 'bg-white text-[#5191fa] hover:bg-blue-50 border-blue-200/80'
                            }`}
                            title={`Focus Day ${item.day} on GPS Route Map`}
                          >
                            <Compass className="w-3.5 h-3.5 shrink-0" />
                            <span className="hidden sm:inline">View on Map</span>
                          </button>
                          {item.altitude && (
                            <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">
                              {item.altitude}
                            </span>
                          )}
                          <button
                            type="button"
                            onClick={() => toggleDay(item.day)}
                            className="p-1 text-slate-500 hover:text-slate-800 cursor-pointer"
                            aria-label={isOpen ? 'Collapse day details' : 'Expand day details'}
                          >
                            {isOpen ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                          </button>
                        </div>
                      </div>

                      {isOpen && (
                        <div className="p-4 bg-white text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                          <p className="mb-2">{item.description}</p>
                          <div className="flex flex-wrap gap-4 text-[11px] text-slate-500 pt-2 border-t border-slate-100 font-medium">
                            {item.duration && <div><strong>Trek Time:</strong> {item.duration}</div>}
                            {item.accommodation && <div><strong>Accommodation:</strong> {item.accommodation}</div>}
                            {item.altitude && <div><strong>Max Altitude:</strong> {item.altitude}</div>}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Inclusions & Exclusions */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80">
              <h2 className="font-heading text-xl font-bold text-[#1a2b48] mb-6">
                What&apos;s Included &amp; Excluded
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Included */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5 mb-3">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Included in Price</span>
                  </h3>
                  <ul className="space-y-2 text-xs text-slate-600">
                    {tour.included.map((inc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Excluded */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-rose-700 flex items-center gap-1.5 mb-3">
                    <X className="w-4 h-4 text-rose-600" />
                    <span>Excluded</span>
                  </h3>
                  <ul className="space-y-2 text-xs text-slate-600">
                    {tour.excluded.map((exc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <X className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                        <span>{exc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Diran Peak Adventure Authentic Tiered Group Pricing Table */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
                <div>
                  <h2 className="font-heading text-xl font-bold text-[#1a2b48] flex items-center gap-2">
                    <span className="w-2.5 h-6 rounded-full bg-[#5191fa]" />
                    <span>Tiered Group Pricing &amp; Expedition Costs</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Transparent rates per person based on group size with all mountain permits, domestic flights, and base camp services included.
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 self-start sm:self-auto">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>No Hidden Fees · Guaranteed Departures</span>
                </div>
              </div>

              {/* Responsive Pricing Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-600">
                      <th className="py-3 px-4 rounded-l-xl">Group Size</th>
                      <th className="py-3 px-4">Rate Per Person</th>
                      <th className="py-3 px-4">Savings Tier</th>
                      <th className="py-3 px-4">Service Level Included</th>
                      <th className="py-3 px-4 text-right rounded-r-xl">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-normal">
                    <tr className="hover:bg-blue-50/40 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-slate-900">
                        1 - 2 Persons
                        <span className="block text-[10px] text-slate-400 font-normal">Private VIP Expedition</span>
                      </td>
                      <td className="py-3.5 px-4 font-extrabold text-[#1a2b48] text-sm">
                        {formatPrice(tour.price + 350)}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                          Standard
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 text-[11px]">
                        Dedicated Balti Guide, Private Jeep, Full Board
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => {
                            setAdults(2);
                            const el = document.getElementById('booking-card-widget');
                            el?.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="px-3 py-1.5 bg-[#5191fa] hover:bg-[#3d7be3] text-white text-[11px] font-bold rounded-lg cursor-pointer transition-colors shadow-xs"
                        >
                          Select 2p
                        </button>
                      </td>
                    </tr>

                    <tr className="bg-blue-50/30 hover:bg-blue-50/60 transition-colors border-y-2 border-blue-100">
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        3 - 5 Persons
                        <span className="inline-block ml-1.5 px-1.5 py-0.5 text-[9px] font-black uppercase bg-[#fa5636] text-white rounded">
                          Most Popular
                        </span>
                        <span className="block text-[10px] text-slate-400 font-normal">Small Group Team</span>
                      </td>
                      <td className="py-3.5 px-4 font-extrabold text-[#5191fa] text-base">
                        {formatPrice(tour.price)}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-blue-100 text-[#5191fa]">
                          Base Rate
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-700 text-[11px]">
                        Lead Mountain Guide, Cook, inReach SOS Tracker
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => {
                            setAdults(4);
                            const el = document.getElementById('booking-card-widget');
                            el?.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="px-3 py-1.5 bg-[#5191fa] hover:bg-[#3d7be3] text-white text-[11px] font-bold rounded-lg cursor-pointer transition-colors shadow-xs"
                        >
                          Select 4p
                        </button>
                      </td>
                    </tr>

                    <tr className="hover:bg-blue-50/40 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-slate-900">
                        6 - 9 Persons
                        <span className="block text-[10px] text-slate-400 font-normal">Alpine Club Group</span>
                      </td>
                      <td className="py-3.5 px-4 font-extrabold text-emerald-700 text-sm">
                        {formatPrice(Math.max(600, tour.price - 200))}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-100 text-emerald-800">
                          Save $200 / person
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 text-[11px]">
                        Two High-Altitude Guides, Kitchen Crew, Dining Tent
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => {
                            setAdults(6);
                            const el = document.getElementById('booking-card-widget');
                            el?.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold rounded-lg cursor-pointer transition-colors shadow-xs"
                        >
                          Select 6p
                        </button>
                      </td>
                    </tr>

                    <tr className="hover:bg-blue-50/40 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-slate-900">
                        10+ Persons
                        <span className="block text-[10px] text-slate-400 font-normal">Full Expedition Charter</span>
                      </td>
                      <td className="py-3.5 px-4 font-extrabold text-emerald-700 text-sm">
                        {formatPrice(Math.max(500, tour.price - 350))}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-100 text-emerald-800">
                          Save $350 / person
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 text-[11px]">
                        Full Camp Setup, Doctor Kit, Satellite Phone
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => {
                            setAdults(10);
                            const el = document.getElementById('booking-card-widget');
                            el?.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold rounded-lg cursor-pointer transition-colors shadow-xs"
                        >
                          Select 10p
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Pricing Notes & Supplements */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-5 border-t border-slate-100 text-xs text-slate-600">
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-800">Single Supplement:</strong> $250 for private tent throughout trek and single hotel room in Islamabad &amp; Skardu.
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-800">Payment Terms:</strong> 15% deposit to confirm your expedition permit; remaining balance payable on arrival in Islamabad.
                  </div>
                </div>
              </div>

              {/* Call-to-Action (CTA) Banner matching Diran Peak Adventure */}
              <div className="mt-8 p-6 bg-gradient-to-r from-[#1a2b48] to-[#253d66] rounded-2xl text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
                <div>
                  <span className="px-2.5 py-1 rounded text-[10px] font-extrabold uppercase tracking-wider bg-amber-400 text-slate-950 inline-block mb-2">
                    Summit Ready · Season 2027
                  </span>
                  <h3 className="font-heading font-extrabold text-xl text-white">
                    Ready to Embark on {tour.title}?
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 max-w-xl leading-relaxed">
                    Reserve your confirmed departure date online or speak with our Balti expedition coordinators for customized logistics and corporate bookings.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      const el = document.getElementById('booking-card-widget');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-6 py-3 bg-[#5191fa] hover:bg-[#3d7be3] text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer hover:shadow-lg"
                  >
                    Book This Departure Now
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate('contact')}
                    className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold rounded-xl transition-all cursor-pointer"
                  >
                    Custom Group Inquiry
                  </button>
                </div>
              </div>
            </div>

            {/* FAQs */}
            {tour.faqs && tour.faqs.length > 0 && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80">
                <h2 className="font-heading text-xl font-bold text-[#1a2b48] mb-4">
                  Frequently Asked Questions
                </h2>

                <div className="space-y-3">
                  {tour.faqs.map((faq, idx) => {
                    const isOpen = !!expandedFaqs[idx];
                    return (
                      <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden">
                        <button
                          onClick={() => toggleFaq(idx)}
                          className="w-full flex items-center justify-between p-4 bg-slate-50 text-left font-bold text-xs sm:text-sm text-[#1a2b48] hover:bg-slate-100 transition-colors cursor-pointer"
                        >
                          <span>{faq.question}</span>
                          {isOpen ? <ChevronUp className="w-4 h-4 text-slate-500 shrink-0 ml-2" /> : <ChevronDown className="w-4 h-4 text-slate-500 shrink-0 ml-2" />}
                        </button>
                        {isOpen && (
                          <div className="p-4 bg-white text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Expedition Safety & Peak Guarantee Assurance */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#5191fa] flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-heading text-lg font-bold text-[#1a2b48]">
                    Expedition Safety &amp; High-Altitude Assurance
                  </h2>
                  <p className="text-xs text-slate-500">
                    Direct mountain oversight by certified Karakoram summit leaders
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="font-semibold text-xs text-slate-900 mb-1">Satellite Tracking</div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Garmin inReach 2-way satellite tracking and emergency SOS protocol on all routes.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="font-semibold text-xs text-slate-900 mb-1">Certified Wilderness First Aid</div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Oxygen cylinder, hyperbaric PAC chamber access, and high-altitude medical kits.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="font-semibold text-xs text-slate-900 mb-1">Fair Porter &amp; Guide Welfare</div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Proper high-altitude gear, insurance coverage, and fair wages for all local mountain crews.
                  </p>
                </div>
              </div>
            </div>

            {/* Traveler Reviews & Feedback Section */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
                <div>
                  <h2 className="font-heading text-lg sm:text-xl font-bold text-[#1a2b48] flex items-center gap-2">
                    <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                    <span>Traveler Reviews &amp; Feedback</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {tourReviews.length === 0 ? '0 Reviews recorded' : `${tourReviews.length} Verified Review${tourReviews.length === 1 ? '' : 's'}`}
                  </p>
                </div>

                {!isAuthenticated && (
                  <button
                    onClick={openLogin}
                    className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-[#5191fa] text-xs font-bold rounded-xl transition-all cursor-pointer self-start sm:self-auto"
                  >
                    Log In to Give Review
                  </button>
                )}
              </div>

              {/* Review Notification Banner */}
              {reviewNotice && (
                <div className="mb-6 p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs font-medium flex items-center justify-between">
                  <span>{reviewNotice}</span>
                  <button onClick={() => setReviewNotice(null)} className="text-blue-700 hover:text-blue-900 cursor-pointer ml-2">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Reviews List */}
              {tourReviews.length > 0 ? (
                <div className="space-y-4 mb-8">
                  {tourReviews.map((rev) => (
                    <div key={rev.id} className="p-4 bg-slate-50/70 rounded-xl border border-slate-100">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#1a2b48] to-[#5191fa] text-white flex items-center justify-center font-bold text-xs">
                            {rev.userName[0]?.toUpperCase() || 'T'}
                          </div>
                          <div>
                            <div className="font-bold text-xs text-slate-900 flex items-center gap-2">
                              <span>{rev.userName}</span>
                              {rev.userCountry && (
                                <span className="text-[10px] text-slate-400 font-normal">({rev.userCountry})</span>
                              )}
                            </div>
                            <div className="text-[10px] text-slate-400">
                              {new Date(rev.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          <div className="flex items-center gap-0.5">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star
                                key={s}
                                className={`w-3.5 h-3.5 ${s <= rev.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`}
                              />
                            ))}
                          </div>
                          {isAdmin && (
                            <button
                              onClick={() => deleteReview(rev.id)}
                              className="text-[10px] text-rose-500 hover:text-rose-700 ml-2 cursor-pointer font-semibold"
                              title="Delete Review (Admin)"
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed pl-10 font-medium">
                        &ldquo;{rev.comment}&rdquo;
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 bg-slate-50 rounded-xl text-center mb-8 border border-slate-100">
                  <Star className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p className="text-xs text-slate-600 font-medium">0 reviews recorded for this expedition.</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Be the first mountaineer or traveler to share authentic feedback!</p>
                </div>
              )}

              {/* Review Submission Form for Logged-In User or Admin */}
              {isAuthenticated ? (
                <div className="pt-4 border-t border-slate-100">
                  <h3 className="font-heading font-bold text-sm text-[#1a2b48] mb-3">
                    Leave Your Review as {user?.firstName || 'Traveler'} {isAdmin && <span className="text-[10px] text-amber-600 font-normal">(Admin Review)</span>}
                  </h3>

                  <form onSubmit={handlePostReview} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Your Expedition Rating
                      </label>
                      <div className="flex items-center gap-1.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button"
                            key={star}
                            onClick={() => setReviewRating(star)}
                            className="p-1 cursor-pointer transition-transform hover:scale-110"
                          >
                            <Star
                              className={`w-5 h-5 ${star <= reviewRating ? 'text-amber-400 fill-amber-400' : 'text-slate-300'}`}
                            />
                          </button>
                        ))}
                        <span className="text-xs font-bold text-slate-700 ml-2">
                          {reviewRating} of 5 Stars
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Your Country / Alpine Club (Optional)
                      </label>
                      <input
                        type="text"
                        value={reviewCountry}
                        onChange={(e) => setReviewCountry(e.target.value)}
                        placeholder="e.g. Switzerland, UK, Alpine Club of Canada"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#5191fa]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Detailed Review &amp; Expedition Experience
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        placeholder="Share your experience regarding the Balti guide crew, camps, mountain safety, and itinerary highlights..."
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#5191fa]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submittingReview}
                      className="px-6 py-2.5 bg-[#5191fa] hover:bg-[#3875dc] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md disabled:opacity-50"
                    >
                      {submittingReview ? 'Posting Review to Firebase...' : 'Submit Verified Review'}
                    </button>
                  </form>
                </div>
              ) : (
                <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <span className="text-slate-700">
                    Logged-in travelers and administrators can leave ratings and reviews for this tour.
                  </span>
                  <button
                    onClick={openLogin}
                    className="px-4 py-2 bg-[#5191fa] text-white font-bold rounded-lg cursor-pointer hover:bg-[#3875dc] shrink-0"
                  >
                    Log In to Review
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Sticky Booking & Enquiry Box */}
          <div className="lg:col-span-1">
            <div id="booking-card-widget" className="sticky top-28 bg-white rounded-2xl shadow-xl border border-slate-200 p-6">
              {/* Header Price Banner */}
              <div className="pb-4 mb-4 border-b border-slate-100 flex items-baseline justify-between">
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">From</div>
                  <div className="flex items-baseline gap-2">
                    {tour.originalPrice && (
                      <span className="text-xs text-slate-400 line-through">
                        {formatPrice(tour.originalPrice)}
                      </span>
                    )}
                    <span className="text-2xl font-black text-[#1a2b48]">
                      {formatPrice(tour.price)}
                    </span>
                    <span className="text-xs text-slate-500">/ person</span>
                  </div>
                </div>
                {tour.discountPercent && (
                  <span className="bg-[#fa5636] text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded">
                    {tour.discountPercent}% OFF
                  </span>
                )}
              </div>

              {/* Tabs: Book vs Enquiry */}
              <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 rounded-xl mb-5">
                <button
                  type="button"
                  onClick={() => setEnquiryType('book')}
                  className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    enquiryType === 'book'
                      ? 'bg-white text-[#1a2b48] shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Book Departure
                </button>
                <button
                  type="button"
                  onClick={() => setEnquiryType('enquiry')}
                  className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    enquiryType === 'enquiry'
                      ? 'bg-white text-[#1a2b48] shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Ask Enquiry
                </button>
              </div>

              {/* ============ BOOKING TAB ============ */}
              {enquiryType === 'book' && (
                <form onSubmit={handleBookNow} className="space-y-4">
                  {bookingError && (
                    <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center justify-between shadow-xs">
                      <div className="flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                        <span>{bookingError}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setBookingError(null)}
                        className="text-rose-600 hover:text-rose-900 cursor-pointer ml-2"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  {/* Interactive Departure Calendar */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-xs font-bold text-slate-800 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#5191fa]" />
                        <span>Choose Departure Date</span>
                      </label>
                      <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
                        Live Availability
                      </span>
                    </div>

                    {/* Calendar Box */}
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3">
                      {/* Month Navigation Header */}
                      <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-200">
                        <button
                          type="button"
                          disabled={!canGoPrevMonth}
                          onClick={handlePrevMonth}
                          className={`p-1.5 rounded-lg transition-colors ${
                            canGoPrevMonth
                              ? 'text-slate-600 hover:text-[#5191fa] hover:bg-slate-200/70 cursor-pointer'
                              : 'text-slate-300 cursor-not-allowed opacity-40'
                          }`}
                          title="Previous Month"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <div className="text-xs font-extrabold text-[#1a2b48]">
                          {calendarMonthName}
                        </div>
                        <button
                          type="button"
                          onClick={handleNextMonth}
                          className="p-1.5 text-slate-600 hover:text-[#5191fa] hover:bg-slate-200/70 rounded-lg transition-colors cursor-pointer"
                          title="Next Month"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Day of Week Row */}
                      <div className="grid grid-cols-7 gap-1 text-center mb-1.5">
                        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
                          <div key={d} className="text-[10px] font-bold text-slate-400">
                            {d}
                          </div>
                        ))}
                      </div>

                      {/* Days Grid (Today & Coming Dates) */}
                      <div className="grid grid-cols-7 gap-1 text-center">
                        {Array.from({ length: firstDayOfWeek }).map((_, idx) => (
                          <div key={`empty-${idx}`} className="h-7 w-7" />
                        ))}
                        {Array.from({ length: daysInMonth }).map((_, i) => {
                          const day = i + 1;
                          const cellDate = new Date(calendarYear, calendarMonth, day);
                          const isSelected =
                            selectedDepartureDate.getFullYear() === calendarYear &&
                            selectedDepartureDate.getMonth() === calendarMonth &&
                            selectedDepartureDate.getDate() === day;
                          const isPast = cellDate < todayMidnight;
                          const isToday = cellDate.getTime() === todayMidnight.getTime();

                          return (
                            <button
                              key={day}
                              type="button"
                              disabled={isPast}
                              onClick={() => setSelectedDepartureDate(cellDate)}
                              title={isToday ? 'Today (Current Date)' : undefined}
                              className={`h-7 w-7 mx-auto rounded-lg text-xs font-semibold flex items-center justify-center transition-all cursor-pointer relative ${
                                isSelected
                                  ? 'bg-[#5191fa] text-white font-extrabold ring-2 ring-blue-300 shadow-md scale-105'
                                  : isPast
                                  ? 'text-slate-300 cursor-not-allowed line-through text-[10px]'
                                  : isToday
                                  ? 'border-2 border-[#5191fa] text-[#5191fa] font-bold bg-blue-50/50 hover:bg-blue-100'
                                  : 'text-slate-700 hover:bg-blue-100/70 hover:text-[#5191fa]'
                              }`}
                            >
                              {day}
                              {isToday && !isSelected && (
                                <span className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-[#5191fa]" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Quick Date Jump (Current & Coming Dates) */}
                      <div className="mt-2.5 pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-1.5 text-[10px] text-slate-500">
                        <span className="font-semibold text-slate-600">Quick Select:</span>
                        <div className="flex flex-wrap gap-1">
                          <button
                            type="button"
                            onClick={() => {
                              const now = new Date();
                              now.setHours(0, 0, 0, 0);
                              setCalendarViewDate(new Date(now.getFullYear(), now.getMonth(), 1));
                              setSelectedDepartureDate(now);
                            }}
                            className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 cursor-pointer transition-colors"
                          >
                            Today (Current)
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const tomorrow = new Date();
                              tomorrow.setDate(tomorrow.getDate() + 1);
                              tomorrow.setHours(0, 0, 0, 0);
                              setCalendarViewDate(new Date(tomorrow.getFullYear(), tomorrow.getMonth(), 1));
                              setSelectedDepartureDate(tomorrow);
                            }}
                            className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 cursor-pointer transition-colors"
                          >
                            Tomorrow
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const d = new Date();
                              d.setDate(d.getDate() + 7);
                              d.setHours(0, 0, 0, 0);
                              setCalendarViewDate(new Date(d.getFullYear(), d.getMonth(), 1));
                              setSelectedDepartureDate(d);
                            }}
                            className="px-2 py-0.5 rounded text-[10px] font-bold bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 cursor-pointer transition-colors"
                          >
                            Next Week
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const d = new Date();
                              const nextM = new Date(d.getFullYear(), d.getMonth() + 1, 1);
                              setCalendarViewDate(nextM);
                              setSelectedDepartureDate(new Date(nextM.getFullYear(), nextM.getMonth(), 1));
                            }}
                            className="px-2 py-0.5 rounded text-[10px] font-bold bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 cursor-pointer transition-colors"
                          >
                            Next Month
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setCalendarViewDate(new Date(2027, 5, 1));
                              setSelectedDepartureDate(new Date(2027, 5, 15));
                            }}
                            className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-[#5191fa] border border-blue-200 hover:bg-blue-100 cursor-pointer transition-colors"
                          >
                            Summer 2027
                          </button>
                        </div>
                      </div>

                      {/* Direct Date Input for Custom Coming Date */}
                      <div className="mt-2 pt-2 border-t border-slate-200 flex items-center justify-between text-[11px]">
                        <span className="text-slate-500 font-medium">Pick Any Date:</span>
                        <input
                          type="date"
                          min={(() => {
                            const y = todayMidnight.getFullYear();
                            const m = String(todayMidnight.getMonth() + 1).padStart(2, '0');
                            const d = String(todayMidnight.getDate()).padStart(2, '0');
                            return `${y}-${m}-${d}`;
                          })()}
                          value={(() => {
                            const y = selectedDepartureDate.getFullYear();
                            const m = String(selectedDepartureDate.getMonth() + 1).padStart(2, '0');
                            const d = String(selectedDepartureDate.getDate()).padStart(2, '0');
                            return `${y}-${m}-${d}`;
                          })()}
                          onChange={(e) => {
                            if (!e.target.value) return;
                            const [y, m, d] = e.target.value.split('-').map(Number);
                            const newD = new Date(y, m - 1, d);
                            newD.setHours(0, 0, 0, 0);
                            if (newD >= todayMidnight) {
                              setSelectedDepartureDate(newD);
                              setCalendarViewDate(new Date(y, m - 1, 1));
                            }
                          }}
                          className="px-2 py-1 bg-white border border-slate-200 rounded-lg text-slate-800 text-xs font-semibold focus:outline-none focus:border-[#5191fa] cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* Selected Itinerary Dates Card */}
                    <div className="mt-2.5 p-3 bg-blue-50/70 border border-blue-100 rounded-xl space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500 text-[11px] font-medium">Departure Date:</span>
                        <span className="font-bold text-[#1a2b48]">{formattedStartDate}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500 text-[11px] font-medium">Estimated Return:</span>
                        <span className="font-semibold text-slate-700">{formattedEndDate}</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-[#5191fa] font-bold pt-1 border-t border-blue-100">
                        <span>Total Trip Duration:</span>
                        <span>{tour.duration || `${tripDays} Days`}</span>
                      </div>
                    </div>
                  </div>

                  {/* Guests: Adults & Children */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Adults</label>
                      <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                        <button
                          type="button"
                          onClick={() => setAdults(Math.max(1, adults - 1))}
                          className="px-3 py-1.5 text-slate-600 hover:bg-slate-200 rounded-l-lg font-bold"
                        >
                          -
                        </button>
                        <span className="flex-1 text-center font-bold text-xs text-slate-800">{adults}</span>
                        <button
                          type="button"
                          onClick={() => setAdults(adults + 1)}
                          className="px-3 py-1.5 text-slate-600 hover:bg-slate-200 rounded-r-lg font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Youths (12-17)</label>
                      <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                        <button
                          type="button"
                          onClick={() => setChildren(Math.max(0, children - 1))}
                          className="px-3 py-1.5 text-slate-600 hover:bg-slate-200 rounded-l-lg font-bold"
                        >
                          -
                        </button>
                        <span className="flex-1 text-center font-bold text-xs text-slate-800">{children}</span>
                        <button
                          type="button"
                          onClick={() => setChildren(children + 1)}
                          className="px-3 py-1.5 text-slate-600 hover:bg-slate-200 rounded-r-lg font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Extra Addons */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Optional Add-ons
                    </div>
                    <label className="flex items-center justify-between text-xs text-slate-700 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={singleTent}
                          onChange={(e) => setSingleTent(e.target.checked)}
                          className="w-3.5 h-3.5 text-[#5191fa] rounded border-slate-300"
                        />
                        <span>Single Tent Supplement</span>
                      </div>
                      <span className="font-semibold text-slate-900">+$250</span>
                    </label>

                    <label className="flex items-center justify-between text-xs text-slate-700 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={airportTransfer}
                          onChange={(e) => setAirportTransfer(e.target.checked)}
                          className="w-3.5 h-3.5 text-[#5191fa] rounded border-slate-300"
                        />
                        <span>VIP Airport Pick &amp; Drop</span>
                      </div>
                      <span className="font-semibold text-slate-900">+$80</span>
                    </label>
                  </div>

                  {/* Traveler Details */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Lead Traveler Information
                    </div>
                    <div>
                      <input
                        type="text"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        placeholder="Your Full Name"
                        required
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        placeholder="Email Address"
                        required
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        placeholder="WhatsApp / Phone Number"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <textarea
                        value={specialRequests}
                        onChange={(e) => setSpecialRequests(e.target.value)}
                        placeholder="Dietary requirements or climbing experience (optional)"
                        rows={2}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                  </div>

                  {/* Total Calculation */}
                  <div className="pt-3 border-t border-slate-200">
                    <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
                      <span>Total Calculation:</span>
                      <span>{adults} Adult(s) {children > 0 ? `+ ${children} Youth` : ''}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-slate-900">Total Price:</span>
                      <span className="text-xl font-black text-[#5191fa]">
                        {formatPrice(totalPrice)}
                      </span>
                    </div>
                  </div>

                  {/* Book Button */}
                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-[#5191fa] hover:bg-[#3d7be3] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Instant Reserve &amp; Guarantee</span>
                  </button>

                  <div className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>No advance payment needed today · Free cancellation</span>
                  </div>
                </form>
              )}

              {/* ============ ENQUIRY TAB ============ */}
              {enquiryType === 'enquiry' && (
                <div>
                  {enquirySent ? (
                    <div className="text-center py-6">
                      <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                        <Check className="w-6 h-6" />
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm mb-1">Enquiry Received!</h4>
                      <p className="text-xs text-slate-600 leading-relaxed mb-4">
                        Our head guide at Diran Peak Adventure will review your request and message you via WhatsApp / email within 6 hours.
                      </p>
                      <button
                        type="button"
                        onClick={() => setEnquirySent(false)}
                        className="text-xs text-[#5191fa] font-bold underline"
                      >
                        Send another enquiry
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleEnquirySubmit} className="space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                        <input
                          type="text"
                          required
                          value={guestName}
                          onChange={(e) => setGuestName(e.target.value)}
                          placeholder="Your Name"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
                        <input
                          type="email"
                          required
                          value={guestEmail}
                          onChange={(e) => setGuestEmail(e.target.value)}
                          placeholder="name@domain.com"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">WhatsApp Phone</label>
                        <input
                          type="tel"
                          value={guestPhone}
                          onChange={(e) => setGuestPhone(e.target.value)}
                          placeholder="+92 345 6412992"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Your Question or Custom Dates</label>
                        <textarea
                          required
                          rows={3}
                          value={enquiryQuestion}
                          onChange={(e) => setEnquiryQuestion(e.target.value)}
                          placeholder="Ask about fitness level, custom group rates, or dates..."
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                        />
                      </div>
                      {enquiryError && (
                        <div className="text-[11px] text-rose-600 bg-rose-50 p-2 rounded-lg border border-rose-200">
                          {enquiryError}
                        </div>
                      )}
                      <button
                        type="submit"
                        disabled={enquirySubmitting}
                        className="w-full py-2.5 px-4 bg-[#1a2b48] hover:bg-[#2c436b] text-white font-bold text-xs uppercase rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        {enquirySubmitting ? (
                          <span>Sending to Operations Desk...</span>
                        ) : (
                          <span>Submit Official Tour Enquiry</span>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              )}

              {/* Assistance Box */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="text-slate-500">Need immediate help?</div>
                <a
                  href="tel:+923456412992"
                  className="font-bold text-[#5191fa] hover:underline flex items-center gap-1"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>+92 345 6412992</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
