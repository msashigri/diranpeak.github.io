import React, { useState } from 'react';
import { Tour, DepartureDate } from '../data/toursData';
import { useAuth } from '../context/AuthContext';
import { InteractiveRouteMap } from '../components/InteractiveRouteMap';
import {
  MapPin, Clock, Calendar, Users, Mountain, ShieldCheck, Check, X,
  ChevronDown, ChevronUp, Star, Phone, MessageSquare, AlertCircle, Share2, Heart, Compass
} from 'lucide-react';

interface TourDetailPageProps {
  tour: Tour;
  onNavigate: (route: string, param?: string) => void;
  onOpenBookingModal?: () => void;
}

export const TourDetailPage: React.FC<TourDetailPageProps> = ({ tour, onNavigate }) => {
  const { formatPrice, user, createBooking, openLogin, isAuthenticated, isFavorite, toggleFavorite } = useAuth();

  // Booking widget state
  const [selectedDeparture, setSelectedDeparture] = useState<DepartureDate>(
    tour.departures[0] || {
      id: 'dep-custom',
      startDate: '10 June 2027',
      endDate: '30 June 2027',
      price: tour.price,
      status: 'Guaranteed',
      seatsLeft: 5
    }
  );
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

  // Photo gallery active index
  const [activeImage, setActiveImage] = useState(tour.image);

  // Pricing calculations
  const singleTentCost = singleTent ? 250 : 0;
  const airportCost = airportTransfer ? 80 : 0;
  const totalPrice = (adults * selectedDeparture.price) + (children * (selectedDeparture.price * 0.75)) + singleTentCost + airportCost;

  const toggleDay = (day: number) => {
    setExpandedDays(prev => ({ ...prev, [day]: !prev[day] }));
  };

  const toggleFaq = (index: number) => {
    setExpandedFaqs(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const handleBookNow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) {
      alert('Please enter your full name for the booking.');
      return;
    }
    if (!guestEmail.trim() || !guestEmail.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }

    createBooking({
      tourId: tour.id,
      tourTitle: tour.title,
      tourImage: tour.image,
      startDate: selectedDeparture.startDate,
      endDate: selectedDeparture.endDate,
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
    setEnquirySent(true);
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
                    {tour.discountPercent}% OFF 2027 Fixed Departures
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

            {/* Interactive Leaflet Expedition & Trekking Route Map */}
            <div id="route-map-section">
              <InteractiveRouteMap
                tourId={tour.id}
                tourSlug={tour.slug}
                tourTitle={tour.title}
              />
            </div>

            {/* Fixed Departures and Costs Table */}
            {tour.departures && tour.departures.length > 0 && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                  <div>
                    <h2 className="font-heading text-xl font-bold text-[#1a2b48]">
                      Fixed Departures &amp; Costs 2027
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Guaranteed group departures starting and ending in Islamabad
                    </p>
                  </div>
                  <div className="text-[11px] text-emerald-600 font-bold bg-emerald-50 px-2.5 py-1 rounded-full mt-2 sm:mt-0 w-fit">
                    100% Guaranteed Departures
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
                    <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[10px] tracking-wider">
                      <tr>
                        <th className="py-3 px-4">Start Date</th>
                        <th className="py-3 px-4">End Date</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4">Price / Person</th>
                        <th className="py-3 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-slate-700">
                      {tour.departures.map((dep) => (
                        <tr
                          key={dep.id}
                          className={`hover:bg-blue-50/40 transition-colors ${
                            selectedDeparture.id === dep.id ? 'bg-blue-50/70 font-semibold' : ''
                          }`}
                        >
                          <td className="py-3 px-4 font-bold text-[#1a2b48]">{dep.startDate}</td>
                          <td className="py-3 px-4">{dep.endDate}</td>
                          <td className="py-3 px-4">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${
                              dep.status === 'Guaranteed'
                                ? 'bg-emerald-100 text-emerald-800'
                                : dep.status === 'Filling Fast'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-slate-100 text-slate-700'
                            }`}>
                              {dep.status} ({dep.seatsLeft} left)
                            </span>
                          </td>
                          <td className="py-3 px-4 font-extrabold text-[#1a2b48]">
                            {formatPrice(dep.price)}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => {
                                setSelectedDeparture(dep);
                                // scroll smoothly to booking box
                                window.scrollTo({ top: 350, behavior: 'smooth' });
                              }}
                              className="px-3 py-1.5 bg-[#5191fa] hover:bg-[#3d7be3] text-white text-[11px] font-bold rounded-lg transition-colors cursor-pointer"
                            >
                              Join Now
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

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
                  className="text-xs text-[#5191fa] hover:underline font-semibold"
                >
                  Expand All
                </button>
              </div>

              <div className="space-y-3">
                {tour.itinerary.map((item) => {
                  const isOpen = !!expandedDays[item.day];
                  return (
                    <div
                      key={item.day}
                      className="border border-slate-200 rounded-xl overflow-hidden transition-all"
                    >
                      <button
                        onClick={() => toggleDay(item.day)}
                        className="w-full flex items-center justify-between p-4 bg-slate-50/70 hover:bg-slate-100/70 transition-colors text-left cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-lg bg-[#5191fa] text-white flex items-center justify-center font-bold text-xs shrink-0">
                            {item.day}
                          </span>
                          <span className="font-heading font-bold text-xs sm:text-sm text-[#1a2b48]">
                            {item.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          {item.altitude && (
                            <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">
                              {item.altitude}
                            </span>
                          )}
                          {isOpen ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                        </div>
                      </button>

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
          </div>

          {/* RIGHT COLUMN: Sticky Booking & Enquiry Box */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white rounded-2xl shadow-xl border border-slate-200 p-6">
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
                      {formatPrice(selectedDeparture.price)}
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
                  Book Fixed Date
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
                  {/* Select Departure Date */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Departure Date
                    </label>
                    <select
                      value={selectedDeparture.id}
                      onChange={(e) => {
                        const dep = tour.departures.find(d => d.id === e.target.value);
                        if (dep) setSelectedDeparture(dep);
                      }}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:border-[#5191fa] cursor-pointer"
                    >
                      {tour.departures.map(d => (
                        <option key={d.id} value={d.id}>
                          {d.startDate} - {d.endDate} ({d.status})
                        </option>
                      ))}
                    </select>
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
                          placeholder="Ask about fitness level, custom group rates, or dates..."
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full py-2.5 px-4 bg-[#1a2b48] hover:bg-[#2c436b] text-white font-bold text-xs uppercase rounded-xl transition-all cursor-pointer"
                      >
                        Submit Enquiry
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
