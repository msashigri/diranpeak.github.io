import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Car,
  Building2,
  Handshake,
  CheckCircle,
  ShieldCheck,
  Users,
  ExternalLink,
  X,
  MapPin,
  Star,
  ChevronDown,
  Sparkles,
  Coffee,
  Wifi,
  Award
} from 'lucide-react';

interface VehicleItem {
  id: string;
  name: string;
  category: '4x4' | 'van' | 'bus' | 'pickup';
  image: string;
  tag: string;
  rating: number;
  reviewCount: number;
  location: string;
  description: string;
  seats: string;
  luggage: string;
  transmission: string;
  fuel: string;
  features: string[];
  dailyRate: string;
}

interface HotelItem {
  id: string;
  name: string;
  region: 'hunza' | 'skardu' | 'islamabad' | 'fairy-meadows';
  image: string;
  tag: string;
  rating: number;
  reviewCount: number;
  location: string;
  description: string;
  amenities: string[];
  roomTypes: string;
  nightlyRate: string;
  pkrRate: string;
}

const VEHICLE_FLEET: VehicleItem[] = [
  {
    id: 'prado-tx',
    name: 'Toyota Land Cruiser Prado TX 4x4',
    category: '4x4',
    image: '/images/prado_4x4_mountain.jpg',
    tag: 'High Altitude Ready',
    rating: 4.9,
    reviewCount: 48,
    location: 'Skardu · Gilgit · Hunza Valley',
    description: 'Comfortable, rugged mid-size 4WD SUV with rooftop gear rack, dual AC/heater, and low-range 4x4 transfer case. Perfect for Gilgit-Baltistan mountain roads and Khunjerab Pass.',
    seats: '5-7 Passengers',
    luggage: '5 Large Bags',
    transmission: 'Automatic 4WD',
    fuel: 'Diesel / Turbo',
    features: ['Dual AC/Heating', 'Snorkel Equipped', 'Roof Cargo Carrier', 'Driver Included'],
    dailyRate: '$125 / day'
  },
  {
    id: 'hilux-revo',
    name: 'Toyota Hilux Revo 4WD Expedition Spec',
    category: 'pickup',
    image: '/images/hilux_revo_trail.jpg',
    tag: 'Askole Trail King',
    rating: 5.0,
    reviewCount: 64,
    location: 'Skardu to Askole Trailhead (K2 Route)',
    description: 'Heavy-duty double-cab 4x4 with elevated suspension, heavy-duty skid plates, waterproof snorkel, and reinforced steel bed. The gold standard for rocky Askole and Hushe trails.',
    seats: '4-5 Passengers',
    luggage: 'Open Bed (800kg)',
    transmission: '6-Speed Manual 4x4',
    fuel: '2.8L D-4D Diesel',
    features: ['High Clearance', 'Water Fording Snorkel', 'Steel Bull Bar', 'Extreme Trail Driver'],
    dailyRate: '$135 / day'
  },
  {
    id: 'hiace-grand-cabin',
    name: 'Toyota HiAce Grand Cabin (13-Seater)',
    category: 'van',
    image: '/images/hiace_mountain_van.jpg',
    tag: 'KKH Group Express',
    rating: 4.8,
    reviewCount: 39,
    location: 'Islamabad · Chilas · Gilgit · Hunza',
    description: 'High-roof executive passenger van with individual reclining seats, panoramic windows, and smooth highway cruise control. Built for group transfers along the Karakoram Highway.',
    seats: '13 Passengers',
    luggage: '12 Standard Bags',
    transmission: 'Automatic',
    fuel: 'Diesel',
    features: ['High Roof Standing Room', 'Dual Climate Control', 'PA Microphone System', 'USB Charging Outlets'],
    dailyRate: '$140 / day'
  },
  {
    id: 'coaster-saloon',
    name: 'Toyota Coaster Saloon Executive Bus',
    category: 'bus',
    image: '/images/hero_karakoram_k2_1790420138291.jpg',
    tag: 'Major Expeditions',
    rating: 4.9,
    reviewCount: 52,
    location: 'Islamabad to Skardu / Gilgit Corridor',
    description: 'Heavy-duty air-conditioned coach with 22 high-back cloth seats, under-floor cargo bins, and air suspension. The preferred transport for mountaineering teams with climbing barrels.',
    seats: '22-29 Passengers',
    luggage: '30+ Expedition Barrels',
    transmission: 'Heavy Manual',
    fuel: '4.2L Diesel',
    features: ['Chilled Air Condition', 'Underbelly Luggage Bay', 'High-Power Braking', 'Senior KKH Captain'],
    dailyRate: '$195 / day'
  },
  {
    id: 'land-cruiser-v8',
    name: 'Toyota Land Cruiser V8 200 Series (VIP)',
    category: '4x4',
    image: '/images/skardu_valley_landscape_1790420181912.jpg',
    tag: 'VIP Mountain Escort',
    rating: 5.0,
    reviewCount: 27,
    location: 'Islamabad · Serena Hotels · Skardu VIP',
    description: 'Top-tier luxury off-road flagship with buttery smooth ride, heated/ventilated leather seats, multi-terrain select, and whisper-quiet cabin insulation for dignitaries.',
    seats: '5-7 Passengers',
    luggage: '6 Large Bags',
    transmission: 'Automatic Full-Time 4WD',
    fuel: '4.5L Twin Turbo V8',
    features: ['Full Leather Interior', 'Quad-Zone Climate', 'Active Height Control', 'Executive Chauffeur'],
    dailyRate: '$240 / day'
  },
  {
    id: 'classic-mountain-jeep',
    name: 'Classic Mountain Trail 4x4 Jeep',
    category: '4x4',
    image: '/images/trek_baltoro_glacier_1790420152808.jpg',
    tag: 'Narrow Trail Specialist',
    rating: 4.9,
    reviewCount: 81,
    location: 'Fairy Meadows Trail · Deosai · Astore',
    description: 'Rugged narrow-track short-wheelbase 4WD jeep capable of scaling extreme hairpins between Raikot Bridge and Tattu village, or crossing deep alpine creeks on Deosai plateau.',
    seats: '4 Passengers',
    luggage: 'Rooftop Cargo Net',
    transmission: 'Manual 4-Low Gear',
    fuel: 'Diesel',
    features: ['Ultra High Clearance', 'Open Air Canvas Top', 'Locking Differentials', 'Native Mountain Driver'],
    dailyRate: '$85 / day'
  }
];

const HOTEL_LIST: HotelItem[] = [
  {
    id: 'eagles-nest-hunza',
    name: "Eagle's Nest Hotel Hunza",
    region: 'hunza',
    image: '/images/eagles_nest_hotel_hunza.jpg',
    tag: 'Panoramic Mountain View',
    rating: 4.9,
    reviewCount: 128,
    location: 'Duikar Village, Karimabad, Hunza Valley',
    description: 'Perched on the dramatic high ridge of Duikar overlooking the entire Hunza & Nagar Valleys. Renowned worldwide for 360-degree sunrise views of Ladyfinger Peak, Ultar Sar, and Golden Peak (Spantik).',
    amenities: ['Panoramic Terrace', 'Campfire Evenings', 'High-Speed WiFi', 'Traditional Hunza Food', 'Hot Water 24/7'],
    roomTypes: 'Deluxe Mountain View, Duikar Executive Suite, Alpine Balcony Room',
    nightlyRate: '$85',
    pkrRate: '24,000 PKR'
  },
  {
    id: 'shangrila-skardu',
    name: 'Shangrila Resort Skardu (Heaven on Earth)',
    region: 'skardu',
    image: '/images/shangrila_skardu_resort.jpg',
    tag: 'Iconic Lakefront Haven',
    rating: 5.0,
    reviewCount: 186,
    location: 'Lower Kachura Lake, Skardu, Gilgit-Baltistan',
    description: "Pakistan's iconic lakeside sanctuary constructed around the heart-shaped Lower Kachura Lake. Featuring Chinese pagoda chalets, apple and apricot orchards, trout hatchery, and majestic Karakoram cliffs.",
    amenities: ['Private Lake Boating', 'Fresh Trout Dining', 'Airport VIP Shuttle', '24/7 Power Generator', 'Flower Gardens'],
    roomTypes: 'Lakeside Swiss Cottage, Pagoda Presidential Suite, Garden VIP Villa',
    nightlyRate: '$140',
    pkrRate: '39,000 PKR'
  },
  {
    id: 'grand-islamabad',
    name: 'Grand Islamabad Hotel',
    region: 'islamabad',
    image: '/images/hero_karakoram_k2_1790420138291.jpg',
    tag: 'Expedition Transit Hub',
    rating: 4.8,
    reviewCount: 94,
    location: 'Sector G-9 / Blue Area Corridor, Islamabad',
    description: 'Comfortable modern hotel serving as our expedition assembly and briefing headquarters. Convenient airport transfers, mountaineering duffel storage, briefing hall, and international buffet dining.',
    amenities: ['Airport Pick & Drop', 'Gear Storage Lockers', 'Free Fast WiFi', 'Hot Buffet Breakfast', 'Briefing Room'],
    roomTypes: 'Executive King, Twin Expedition Room, Deluxe Family Suite',
    nightlyRate: '$65',
    pkrRate: '18,000 PKR'
  },
  {
    id: 'serena-shigar-fort',
    name: 'Serena Shigar Fort (Palace of Rock)',
    region: 'skardu',
    image: '/images/skardu_valley_landscape_1790420181912.jpg',
    tag: '400-Year Historic Fort',
    rating: 4.9,
    reviewCount: 112,
    location: 'Shigar Oasis (Askole Gateway), Skardu',
    description: 'A lovingly restored 17th-century Raja palace constructed of stone and carved cedar wood. Set in a lush apricot valley on the direct route to Askole and the K2 Baltoro Glacier trailhead.',
    amenities: ['Living Museum Grounds', 'Ancient Walnut Orchard', 'Royal Courtyard Dining', 'Wood Fireplaces', 'Heritage Suites'],
    roomTypes: 'Royal Raja Suite, Heritage Palace Deluxe, Garden Pavilion Room',
    nightlyRate: '$165',
    pkrRate: '46,000 PKR'
  },
  {
    id: 'luxus-hunza',
    name: 'Luxus Hunza Attabad Lake Resort',
    region: 'hunza',
    image: '/images/prado_4x4_mountain.jpg',
    tag: 'Attabad Lakefront',
    rating: 4.9,
    reviewCount: 76,
    location: 'Attabad Lake, Upper Hunza, Gilgit-Baltistan',
    description: 'Ultra-luxurious waterfront suites situated directly above the turquoise waters of Attabad Lake. Panoramic glass balconies, heated mattress pads, private speedboat docking, and Karakoram alpine vistas.',
    amenities: ['Jet-Boat Charters', 'Full-Glass Balconies', 'Lakeside Bistro Deck', 'Stargazing Sky Roofs', 'Luxury Heating'],
    roomTypes: 'Glacial Turquoise Suite, Waterfront Luxury Chalet, Family Penthouse',
    nightlyRate: '$175',
    pkrRate: '49,000 PKR'
  },
  {
    id: 'raikot-serai',
    name: 'Raikot Serai & Fairy Meadows Cottages',
    region: 'fairy-meadows',
    image: '/images/trek_baltoro_glacier_1790420152808.jpg',
    tag: 'Nanga Parbat Base',
    rating: 4.8,
    reviewCount: 145,
    location: 'Fairy Meadows (3,300m), Raikot Valley',
    description: 'Charming pine and cedar log cabins set amidst alpine wilderness directly facing the monumental Raikot Face of Nanga Parbat (8,126m). Cozy wood bukhari stoves, wholesome mountain meals, and warm bedding.',
    amenities: ['Pine Log Architecture', 'Wood-Burning Stoves', 'Base Camp Trek Desk', 'Nightly Campfire', 'Mountain Tea Service'],
    roomTypes: 'Cedar Log Cottage, Alpine Glamping Tent, Mountain Team Dorm',
    nightlyRate: '$55',
    pkrRate: '15,000 PKR'
  }
];

export const PartnerPage: React.FC<{ onNavigate: (route: string) => void; initialCategory?: string }> = ({
  onNavigate,
  initialCategory
}) => {
  const { addPartnerRequest } = useAuth();
  const [activeTab, setActiveTab] = useState<'all' | 'vehicles' | 'hotels' | 'agencies'>(
    initialCategory === 'car' || initialCategory === 'vehicles' ? 'vehicles' :
    initialCategory === 'hotel' || initialCategory === 'hotels' ? 'hotels' : 'all'
  );
  const [partnerType, setPartnerType] = useState(
    initialCategory === 'car' || initialCategory === 'vehicles' ? '4x4 Vehicles & Transport' :
    initialCategory === 'hotel' || initialCategory === 'hotels' ? 'Hotels & Resorts' : 'Hotels & Resorts'
  );

  // Vehicle filter states
  const [vehicleFilter, setVehicleFilter] = useState<'all' | '4x4' | 'van' | 'bus' | 'pickup'>('all');
  const [vehicleSearchQuery, setVehicleSearchQuery] = useState('');
  const [selectedVehicleForInquiry, setSelectedVehicleForInquiry] = useState<VehicleItem | null>(null);
  const [vehInquiryName, setVehInquiryName] = useState('');
  const [vehInquiryEmail, setVehInquiryEmail] = useState('');
  const [vehInquiryRoute, setVehInquiryRoute] = useState('');
  const [vehInquiryNotes, setVehInquiryNotes] = useState('');
  const [vehInquirySubmitted, setVehInquirySubmitted] = useState(false);

  // Hotel filter states
  const [hotelRegionFilter, setHotelRegionFilter] = useState<'all' | 'hunza' | 'skardu' | 'islamabad' | 'fairy-meadows'>('all');
  const [hotelSearchQuery, setHotelSearchQuery] = useState('');
  const [selectedHotelForInquiry, setSelectedHotelForInquiry] = useState<HotelItem | null>(null);
  const [hotelInquiryName, setHotelInquiryName] = useState('');
  const [hotelInquiryEmail, setHotelInquiryEmail] = useState('');
  const [hotelInquiryPhone, setHotelInquiryPhone] = useState('');
  const [hotelInquiryCheckIn, setHotelInquiryCheckIn] = useState('');
  const [hotelInquiryCheckOut, setHotelInquiryCheckOut] = useState('');
  const [hotelInquiryGuests, setHotelInquiryGuests] = useState('2');
  const [hotelInquiryRoomType, setHotelInquiryRoomType] = useState('Deluxe Mountain View');
  const [hotelInquiryNotes, setHotelInquiryNotes] = useState('');
  const [hotelInquirySubmitted, setHotelInquirySubmitted] = useState(false);

  // FAQs open state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    if (initialCategory === 'car' || initialCategory === 'vehicles') {
      setActiveTab('vehicles');
      setPartnerType('4x4 Vehicles & Transport');
    } else if (initialCategory === 'hotel' || initialCategory === 'hotels') {
      setActiveTab('hotels');
      setPartnerType('Hotels & Resorts');
    } else if (initialCategory === 'agencies') {
      setActiveTab('agencies');
      setPartnerType('International Tour Agency / Outfitter');
    } else {
      setActiveTab('all');
      setPartnerType('Hotels & Resorts');
    }
  }, [initialCategory]);

  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [details, setDetails] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await addPartnerRequest({
      category: partnerType,
      companyName,
      contactName,
      email,
      phone,
      location,
      details
    });
    setSubmitting(false);
    setSubmitted(true);
  };

  const handleVehicleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const stored = JSON.parse(localStorage.getItem('dpa_vehicle_inquiries') || '[]');
      stored.push({
        vehicle: selectedVehicleForInquiry?.name,
        name: vehInquiryName,
        email: vehInquiryEmail,
        route: vehInquiryRoute,
        notes: vehInquiryNotes,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('dpa_vehicle_inquiries', JSON.stringify(stored));
    } catch (err) {
      console.error(err);
    }
    setVehInquirySubmitted(true);
    setTimeout(() => {
      setSelectedVehicleForInquiry(null);
      setVehInquirySubmitted(false);
      setVehInquiryName('');
      setVehInquiryEmail('');
      setVehInquiryRoute('');
      setVehInquiryNotes('');
    }, 2000);
  };

  const handleHotelInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const stored = JSON.parse(localStorage.getItem('dpa_hotel_inquiries') || '[]');
      stored.push({
        hotel: selectedHotelForInquiry?.name,
        name: hotelInquiryName,
        email: hotelInquiryEmail,
        phone: hotelInquiryPhone,
        checkIn: hotelInquiryCheckIn,
        checkOut: hotelInquiryCheckOut,
        guests: hotelInquiryGuests,
        roomType: hotelInquiryRoomType,
        notes: hotelInquiryNotes,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('dpa_hotel_inquiries', JSON.stringify(stored));
    } catch (err) {
      console.error(err);
    }
    setHotelInquirySubmitted(true);
    setTimeout(() => {
      setSelectedHotelForInquiry(null);
      setHotelInquirySubmitted(false);
      setHotelInquiryName('');
      setHotelInquiryEmail('');
      setHotelInquiryPhone('');
      setHotelInquiryCheckIn('');
      setHotelInquiryCheckOut('');
      setHotelInquiryNotes('');
    }, 2000);
  };

  const filteredVehicles = VEHICLE_FLEET.filter((v) => {
    const matchesCategory = vehicleFilter === 'all' || v.category === vehicleFilter;
    const q = vehicleSearchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      v.name.toLowerCase().includes(q) ||
      v.location.toLowerCase().includes(q) ||
      v.description.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  const filteredHotels = HOTEL_LIST.filter((h) => {
    const matchesRegion = hotelRegionFilter === 'all' || h.region === hotelRegionFilter;
    const q = hotelSearchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      h.name.toLowerCase().includes(q) ||
      h.location.toLowerCase().includes(q) ||
      h.description.toLowerCase().includes(q);
    return matchesRegion && matchesSearch;
  });

  return (
    <div className="bg-[#f7f8fa] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Bar */}
        <div className="text-xs text-slate-500 mb-6 flex items-center justify-between flex-wrap gap-2 font-medium">
          <div className="flex items-center gap-1.5">
            <button onClick={() => onNavigate('home')} className="hover:text-[#5191fa] cursor-pointer">
              Home
            </button>
            <span>/</span>
            <button
              onClick={() => {
                setActiveTab('all');
                setPartnerType('Hotels & Resorts');
              }}
              className="hover:text-[#5191fa] cursor-pointer"
            >
              Partners Network
            </button>
            <span>/</span>
            <span className="text-slate-800 font-semibold">
              {activeTab === 'vehicles'
                ? 'Partners Vehicles (4x4 Fleet)'
                : activeTab === 'hotels'
                ? 'Partners Hotels & Alpine Lodges'
                : 'Become Our Official Partner'}
            </span>
          </div>

          {/* Standalone HTML Clone Link */}
          {activeTab === 'vehicles' && (
            <a
              href="/page/car/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#5191fa] hover:text-[#3875dc] bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-xs"
            >
              <span>View Standalone HTML Clone (/page/car/)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
          {activeTab === 'hotels' && (
            <a
              href="/page/hotel/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-xs"
            >
              <span>View Standalone HTML Clone (/page/hotel/)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
          {activeTab === 'all' && (
            <a
              href="/page/become-our-partner/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#5191fa] hover:text-[#3875dc] bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-xs"
            >
              <span>View Standalone HTML Clone (/page/become-our-partner/)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#5191fa] mb-1.5 block">
            {activeTab === 'vehicles'
              ? 'Karakoram Transport & Expedition Logistics'
              : activeTab === 'hotels'
              ? 'Alpine Hospitality & Heritage Lodging'
              : 'Unlock Your Greatest Asset'}
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#1a2b48] tracking-tight">
            {activeTab === 'vehicles'
              ? 'Partners Vehicles & 4x4 Mountain Fleet'
              : activeTab === 'hotels'
              ? 'Partners Hotels & Heritage Lodges in Pakistan'
              : 'Join Pakistan’s Premier Adventure Tourism Community'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed">
            {activeTab === 'vehicles'
              ? 'Verified 4x4 Toyota Land Cruisers, Hilux Revos, Grand Cabins, and Coaster buses chartered for K2 Base Camp, Askole trailheads, and Karakoram Highway expeditions.'
              : activeTab === 'hotels'
              ? 'Handpicked luxury viewpoints, 400-year-old fort palaces, lakeside chalets, and base camp eco-cottages across Islamabad, Skardu, Hunza Valley, and Nanga Parbat.'
              : 'Welcome paying international climbers, trekkers, and cultural travelers. Partner your transport fleet, hotel, guide service, or agency with Diran Peak Adventure.'}
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <button
            onClick={() => {
              setActiveTab('all');
              setPartnerType('Hotels & Resorts');
            }}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'all'
                ? 'bg-[#1a2b48] text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Handshake className="w-4 h-4" />
            <span>Become Partner (Overview)</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('hotels');
              setPartnerType('Hotels & Resorts');
            }}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'hotels'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Partners Hotels &amp; Resorts</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('vehicles');
              setPartnerType('4x4 Vehicles & Transport');
            }}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'vehicles'
                ? 'bg-[#5191fa] text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Car className="w-4 h-4" />
            <span>Partners Vehicles (4x4 Fleet)</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('agencies');
              setPartnerType('International Tour Agency / Outfitter');
            }}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'agencies'
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>B2B Agencies &amp; Outfitters</span>
          </button>
        </div>

        {/* ========================================================= */}
        {/* VIEW 1: PARTNER HOTELS SPECIFIC VIEW (Matching /page/hotel/) */}
        {/* ========================================================= */}
        {activeTab === 'hotels' && (
          <div className="space-y-12">
            {/* Hero Banner with Stats Strip */}
            <div
              className="relative rounded-3xl overflow-hidden shadow-xl text-white p-8 sm:p-12"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(26, 43, 72, 0.78), rgba(17, 29, 49, 0.9)), url('/images/shangrila_skardu_resort.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md border border-white/30 text-white mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  Official Alpine Hospitality Network
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 leading-tight">
                  Handpicked Alpine Lodges &amp; Heritage Forts
                </h2>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-6 font-light">
                  From Duikar panoramic ridge in Hunza to the serene lakeside of Lower Kachura and the 400-year-old stone fort in Shigar — all vetted with guaranteed hot water, 24/7 power, and warm Karakoram hospitality.
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-white/20">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center">
                  <div className="text-2xl font-black text-white">45+</div>
                  <div className="text-[11px] text-slate-300 uppercase tracking-wider mt-0.5">Partner Properties</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center">
                  <div className="text-2xl font-black text-white">100%</div>
                  <div className="text-[11px] text-slate-300 uppercase tracking-wider mt-0.5">Inspected &amp; Certified</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center">
                  <div className="text-2xl font-black text-white">24/7</div>
                  <div className="text-[11px] text-slate-300 uppercase tracking-wider mt-0.5">Power &amp; Hot Water</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center">
                  <div className="text-2xl font-black text-white">Direct</div>
                  <div className="text-[11px] text-slate-300 uppercase tracking-wider mt-0.5">Expedition Tariffs</div>
                </div>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setHotelRegionFilter('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    hotelRegionFilter === 'all'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  All Regions ({HOTEL_LIST.length})
                </button>
                <button
                  onClick={() => setHotelRegionFilter('hunza')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    hotelRegionFilter === 'hunza'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Hunza Valley
                </button>
                <button
                  onClick={() => setHotelRegionFilter('skardu')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    hotelRegionFilter === 'skardu'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Skardu &amp; Shigar
                </button>
                <button
                  onClick={() => setHotelRegionFilter('islamabad')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    hotelRegionFilter === 'islamabad'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Islamabad
                </button>
                <button
                  onClick={() => setHotelRegionFilter('fairy-meadows')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    hotelRegionFilter === 'fairy-meadows'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Fairy Meadows
                </button>
              </div>

              <div className="w-full sm:w-72">
                <input
                  type="text"
                  value={hotelSearchQuery}
                  onChange={(e) => setHotelSearchQuery(e.target.value)}
                  placeholder="Search hotel name or city..."
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Hotel Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHotels.map((hotel) => (
                <div
                  key={hotel.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col group"
                >
                  <div className="relative h-52 overflow-hidden bg-slate-100">
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#1a2b48]/85 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                      {hotel.tag}
                    </div>
                    <div className="absolute top-3 right-3 bg-white text-slate-900 text-xs font-bold px-2 py-1 rounded-md shadow-xs flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{hotel.rating}</span>
                      <span className="text-slate-400 font-normal">({hotel.reviewCount})</span>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-bold mb-1">
                      <MapPin className="w-3 h-3" />
                      <span>{hotel.location}</span>
                    </div>

                    <h3 className="font-heading font-bold text-base text-[#1a2b48] mb-2 leading-snug">
                      {hotel.name}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                      {hotel.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {hotel.amenities.map((amenity, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-medium"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>

                    <div className="bg-[#f8fafc] border border-dashed border-slate-200 rounded-lg p-2.5 mb-4 text-[11px] text-slate-600">
                      <strong className="text-slate-800">Rooms: </strong>
                      {hotel.roomTypes}
                    </div>

                    <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] uppercase font-bold text-slate-400">Nightly Rate</div>
                        <div className="text-base font-extrabold text-emerald-600">
                          {hotel.nightlyRate}{' '}
                          <span className="text-[11px] font-normal text-slate-400">/ {hotel.pkrRate}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedHotelForInquiry(hotel)}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                      >
                        Reserve Room
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Why Hotels Partner Benefits Grid */}
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm">
              <div className="text-center max-w-2xl mx-auto mb-10">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 block mb-1">
                  Hotels &amp; Resort Operators
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#1a2b48]">
                  Why Partner Your Hotel with Diran Peak Adventure?
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-2">
                  We bring hundreds of high-value international mountaineering teams, cultural delegations, and trekking expeditions to Pakistan each year.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 rounded-2xl bg-[#f7f8fa] border border-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg mb-3">
                    📈
                  </div>
                  <h4 className="font-bold text-sm text-[#1a2b48] mb-1.5">High Peak-Season Occupancy</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Block bookings for multi-night expedition staging in Islamabad, Skardu, and Hunza from May through October, eliminating low-season vacancy.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#f7f8fa] border border-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#5191fa] flex items-center justify-center font-bold text-lg mb-3">
                    💳
                  </div>
                  <h4 className="font-bold text-sm text-[#1a2b48] mb-1.5">Direct &amp; Prompt Settlements</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Guaranteed advance deposits prior to group arrival and swift final settlement within 48 hours via direct bank wire transfer.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#f7f8fa] border border-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-lg mb-3">
                    🌍
                  </div>
                  <h4 className="font-bold text-sm text-[#1a2b48] mb-1.5">Respectful International Clients</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Our climbers and trekkers hail from Europe, North America, Japan, and Australia. They treat local staff and heritage facilities with high regard.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#f7f8fa] border border-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-lg mb-3">
                    🤝
                  </div>
                  <h4 className="font-bold text-sm text-[#1a2b48] mb-1.5">Joint Seasonal Marketing</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Your property receives prominent placement on our global website, digital tour dossiers, and at international adventure travel expos.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#f7f8fa] border border-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-lg mb-3">
                    🛡️
                  </div>
                  <h4 className="font-bold text-sm text-[#1a2b48] mb-1.5">Vetted Group Logistics</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    We handle baggage delivery, mountain transfers, meal pre-orders, and check-in rosters so your front desk operations run effortlessly.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#f7f8fa] border border-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-lg mb-3">
                    ⭐
                  </div>
                  <h4 className="font-bold text-sm text-[#1a2b48] mb-1.5">Quality Assurance Partnership</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    We work with hotel management to provide guest feedback, staff hospitality tips, and eco-sustainable tourism best practices.
                  </p>
                </div>
              </div>
            </div>

            {/* Hotel FAQs Accordion */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm">
              <div className="text-center max-w-xl mx-auto mb-8">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 block mb-1">
                  Questions &amp; Information
                </span>
                <h3 className="font-heading text-2xl font-bold text-[#1a2b48]">
                  Hotel Partner FAQs
                </h3>
              </div>

              <div className="max-w-3xl mx-auto divide-y divide-slate-100">
                {[
                  {
                    q: 'What are the minimum requirements to become a partner hotel?',
                    a: 'Partner accommodations must have clean, hygienic en-suite bathrooms, continuous hot water supply, reliable power backup (generator or solar), fresh linens, clean drinking water, and courteous staff. For remote mountain locations like Fairy Meadows, traditional log huts with clean bedding and wood stoves are fully welcomed.'
                  },
                  {
                    q: 'How does Diran Peak Adventure handle payments and deposits?',
                    a: 'We provide a 50% room deposit upon confirmation of group itinerary dates, and the remaining 50% balance is settled directly into your commercial bank account upon check-out or within 48 hours.'
                  },
                  {
                    q: 'Can boutique guest houses and heritage forts join?',
                    a: 'Yes! In fact, our international guests love boutique heritage properties, restored forts, and rustic stone cottages that reflect authentic Balti, Hunzakut, or Shina architecture and culture.'
                  },
                  {
                    q: 'How are room allocations and cancellation policies managed?',
                    a: 'Due to the unpredictable nature of mountain flights between Islamabad and Skardu/Gilgit, we maintain mutually agreed flexible weather clauses in our partnership agreements to protect both hoteliers and arriving climbers.'
                  }
                ].map((faq, index) => {
                  const isOpen = openFaqIndex === index;
                  return (
                    <div key={index} className="py-4">
                      <button
                        type="button"
                        onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                        className="w-full flex items-center justify-between text-left font-bold text-sm text-[#1a2b48] hover:text-emerald-600 transition-colors cursor-pointer"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-400 transition-transform ${
                            isOpen ? 'transform rotate-180 text-emerald-600' : ''
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <p className="mt-2 text-xs text-slate-600 leading-relaxed pl-2 border-l-2 border-emerald-600">
                          {faq.a}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 2: PARTNER VEHICLES SPECIFIC VIEW (Matching /page/car/) */}
        {/* ========================================================= */}
        {activeTab === 'vehicles' && (
          <div className="space-y-12">
            {/* Hero Banner with Stats Strip */}
            <div
              className="relative rounded-3xl overflow-hidden shadow-xl text-white p-8 sm:p-12"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(26, 43, 72, 0.78), rgba(17, 29, 49, 0.9)), url('/images/prado_4x4_mountain.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md border border-white/30 text-white mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  Official Mountain Ground Fleet
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 leading-tight">
                  Karakoram Expedition Transport Fleet
                </h2>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-6 font-light">
                  Direct charter and partner vehicle network connecting Islamabad airport with Skardu, Gilgit, Hunza, and tough alpine trailheads like Askole (K2) and Tattu (Fairy Meadows).
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-white/20">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center">
                  <div className="text-2xl font-black text-white">140+</div>
                  <div className="text-[11px] text-slate-300 uppercase tracking-wider mt-0.5">Active 4x4 Fleet</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center">
                  <div className="text-2xl font-black text-white">100%</div>
                  <div className="text-[11px] text-slate-300 uppercase tracking-wider mt-0.5">Mountain Certified</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center">
                  <div className="text-2xl font-black text-white">8,000m+</div>
                  <div className="text-[11px] text-slate-300 uppercase tracking-wider mt-0.5">Expedition Support</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center">
                  <div className="text-2xl font-black text-white">24/7</div>
                  <div className="text-[11px] text-slate-300 uppercase tracking-wider mt-0.5">Road Dispatch Desk</div>
                </div>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setVehicleFilter('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    vehicleFilter === 'all'
                      ? 'bg-[#5191fa] text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  All Vehicles ({VEHICLE_FLEET.length})
                </button>
                <button
                  onClick={() => setVehicleFilter('4x4')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    vehicleFilter === '4x4'
                      ? 'bg-[#5191fa] text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  4x4 Mountain Jeeps &amp; SUVs
                </button>
                <button
                  onClick={() => setVehicleFilter('van')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    vehicleFilter === 'van'
                      ? 'bg-[#5191fa] text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Grand Cabins &amp; Vans
                </button>
                <button
                  onClick={() => setVehicleFilter('bus')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    vehicleFilter === 'bus'
                      ? 'bg-[#5191fa] text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Coaster Buses
                </button>
                <button
                  onClick={() => setVehicleFilter('pickup')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    vehicleFilter === 'pickup'
                      ? 'bg-[#5191fa] text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Expedition Pickups (Hilux)
                </button>
              </div>

              <div className="w-full sm:w-72">
                <input
                  type="text"
                  value={vehicleSearchQuery}
                  onChange={(e) => setVehicleSearchQuery(e.target.value)}
                  placeholder="Search vehicle model or location..."
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#5191fa]"
                />
              </div>
            </div>

            {/* Vehicle Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col group"
                >
                  <div className="relative h-52 overflow-hidden bg-slate-100">
                    <img
                      src={vehicle.image}
                      alt={vehicle.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#1a2b48]/85 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                      {vehicle.tag}
                    </div>
                    <div className="absolute top-3 right-3 bg-white text-slate-900 text-xs font-bold px-2 py-1 rounded-md shadow-xs flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{vehicle.rating}</span>
                      <span className="text-slate-400 font-normal">({vehicle.reviewCount})</span>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-center gap-1 text-[11px] text-[#5191fa] font-bold mb-1">
                      <MapPin className="w-3 h-3" />
                      <span>{vehicle.location}</span>
                    </div>

                    <h3 className="font-heading font-bold text-base text-[#1a2b48] mb-2 leading-snug">
                      {vehicle.name}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                      {vehicle.description}
                    </p>

                    {/* Specs Grid */}
                    <div className="grid grid-cols-2 gap-2 py-3 border-y border-slate-100 mb-4 text-[11px] text-slate-500">
                      <div>
                        👥 Seats: <strong className="text-slate-800">{vehicle.seats}</strong>
                      </div>
                      <div>
                        🧳 Luggage: <strong className="text-slate-800">{vehicle.luggage}</strong>
                      </div>
                      <div>
                        ⚙️ Gear: <strong className="text-slate-800">{vehicle.transmission}</strong>
                      </div>
                      <div>
                        ⛽ Fuel: <strong className="text-slate-800">{vehicle.fuel}</strong>
                      </div>
                    </div>

                    {/* Features Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {vehicle.features.map((feat, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-medium"
                        >
                          {feat}
                        </span>
                      ))}
                    </div>

                    {/* Footer / CTA */}
                    <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] uppercase font-bold text-slate-400">Charter Rate</div>
                        <div className="text-base font-extrabold text-[#5191fa]">{vehicle.dailyRate}</div>
                      </div>
                      <button
                        onClick={() => setSelectedVehicleForInquiry(vehicle)}
                        className="px-4 py-2 bg-[#5191fa] hover:bg-[#3875dc] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                      >
                        Inquire Fleet
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Why Partner Benefits Grid */}
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm">
              <div className="text-center max-w-2xl mx-auto mb-10">
                <span className="text-xs font-bold uppercase tracking-wider text-[#5191fa] block mb-1">
                  Fleet Owners &amp; Individual Drivers
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#1a2b48]">
                  Why Partner Your Vehicle with Diran Peak Adventure?
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-2">
                  We contract hundreds of mountain vehicles each season. Enjoy high vehicle utilization, fair rates, and respectful treatment for drivers.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 rounded-2xl bg-[#f7f8fa] border border-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#5191fa] flex items-center justify-center font-bold text-lg mb-3">
                    📈
                  </div>
                  <h4 className="font-bold text-sm text-[#1a2b48] mb-1.5">Guaranteed Peak Season Contracts</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    With dozens of alpine climbing teams and trekking groups arriving between May and October, your 4x4 or van stays booked with minimal idle time.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#f7f8fa] border border-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg mb-3">
                    💳
                  </div>
                  <h4 className="font-bold text-sm text-[#1a2b48] mb-1.5">Prompt &amp; Transparent Settlements</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Direct bank settlement, 50% fuel advances before trip departures from Skardu, and zero unexpected cuts or delays upon tour conclusion.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#f7f8fa] border border-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-lg mb-3">
                    📡
                  </div>
                  <h4 className="font-bold text-sm text-[#1a2b48] mb-1.5">24/7 Road &amp; Safety Dispatch</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Our operations base in Skardu tracks weather, mudflow, and landslide clearances across Jaglot, Babusar Pass, and Askole in real time.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#f7f8fa] border border-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-lg mb-3">
                    🦺
                  </div>
                  <h4 className="font-bold text-sm text-[#1a2b48] mb-1.5">Driver Dignity &amp; Fair Allowances</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Every tour includes driver meal stipends, dedicated sleeping quarters at partner alpine hotels, and medical emergency assistance.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#f7f8fa] border border-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-lg mb-3">
                    🛡️
                  </div>
                  <h4 className="font-bold text-sm text-[#1a2b48] mb-1.5">Vetted International Travelers</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    We host respectful alpine delegations and mountaineers from Europe, the Americas, and Asia who treat transport vehicles with great care.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#f7f8fa] border border-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-lg mb-3">
                    🤝
                  </div>
                  <h4 className="font-bold text-sm text-[#1a2b48] mb-1.5">Long-Term Partnership Tier</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Consistent top-rated fleet partners earn priority bookings, winter expedition charter contracts, and annual fleet bonuses.
                  </p>
                </div>
              </div>
            </div>

            {/* Vehicle FAQs Accordion */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm">
              <div className="text-center max-w-xl mx-auto mb-8">
                <span className="text-xs font-bold uppercase tracking-wider text-[#5191fa] block mb-1">
                  Questions &amp; Information
                </span>
                <h3 className="font-heading text-2xl font-bold text-[#1a2b48]">
                  Fleet Partner FAQs
                </h3>
              </div>

              <div className="max-w-3xl mx-auto divide-y divide-slate-100">
                {[
                  {
                    q: 'What requirements must vehicles meet to drive to Askole or K2 Base Camp trailhead?',
                    a: 'Vehicles traveling to Askole must have operational 4-wheel drive with low-range transfer gears, high ground clearance, heavy-duty suspension, all-terrain tires with adequate tread, and a functional spare tire and emergency tool kit.'
                  },
                  {
                    q: 'Are drivers required with vehicle rental?',
                    a: 'Yes. Due to the complex terrain and river crossings in Gilgit-Baltistan, all Diran Peak Adventure partner vehicles are chartered with verified, licensed local drivers who possess years of experience navigating the Karakoram Highway and mountain switchbacks.'
                  },
                  {
                    q: 'How and when do vehicle owners get paid?',
                    a: 'We provide a 50% fuel and operational advance prior to trip departure from Skardu or Islamabad, and the remaining balance is settled within 2 business days of trip conclusion via direct bank transfer, JazzCash, or cash disbursement at our Skardu office.'
                  },
                  {
                    q: 'Can an individual owner with only 1 vehicle apply?',
                    a: 'Absolutely. We contract both individual owner-operators with a single Prado or Hilux as well as large transport fleet companies managing dozens of coasters and vans.'
                  }
                ].map((faq, index) => {
                  const isOpen = openFaqIndex === index;
                  return (
                    <div key={index} className="py-4">
                      <button
                        type="button"
                        onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                        className="w-full flex items-center justify-between text-left font-bold text-sm text-[#1a2b48] hover:text-[#5191fa] transition-colors cursor-pointer"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-400 transition-transform ${
                            isOpen ? 'transform rotate-180 text-[#5191fa]' : ''
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <p className="mt-2 text-xs text-slate-600 leading-relaxed pl-2 border-l-2 border-[#5191fa]">
                          {faq.a}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 3: BECOME PARTNER OVERVIEW (Matching /page/become-our-partner/) */}
        {/* ========================================================= */}
        {(activeTab === 'all' || activeTab === 'agencies') && (
          <div className="space-y-14">
            {/* 3-Step Process (How It Works) */}
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm">
              <div className="text-center max-w-2xl mx-auto mb-10">
                <span className="text-xs font-bold uppercase tracking-wider text-[#5191fa] block mb-1">
                  How It Works
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#1a2b48]">
                  Three Simple Steps to Partnership
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-2">
                  Joining our licensed tourism community is straightforward, respectful, and designed to generate steady seasonal revenue for your enterprise.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-[#f7f8fa] border border-slate-200 text-center">
                  <div className="w-12 h-12 rounded-full bg-[#5191fa] text-white flex items-center justify-center font-extrabold text-lg mx-auto mb-4 shadow-sm">
                    1
                  </div>
                  <h4 className="font-bold text-base text-[#1a2b48] mb-2">Online Registration</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Submit your vehicle specifications, lodge details, guiding credentials, or B2B agency profile via our simple digital application form below.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#f7f8fa] border border-slate-200 text-center">
                  <div className="w-12 h-12 rounded-full bg-[#5191fa] text-white flex items-center justify-center font-extrabold text-lg mx-auto mb-4 shadow-sm">
                    2
                  </div>
                  <h4 className="font-bold text-base text-[#1a2b48] mb-2">Service Verification &amp; Tariffs</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Our Skardu operations base reviews your facilities or vehicle fleet, and we mutually establish fair seasonal tariffs with guaranteed advance deposits.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#f7f8fa] border border-slate-200 text-center">
                  <div className="w-12 h-12 rounded-full bg-[#5191fa] text-white flex items-center justify-center font-extrabold text-lg mx-auto mb-4 shadow-sm">
                    3
                  </div>
                  <h4 className="font-bold text-base text-[#1a2b48] mb-2">Receive Bookings &amp; Get Paid</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Host international mountaineers and trekkers. Receive 50% fuel and operational advances upfront, with swift final settlement within 48 hours.
                  </p>
                </div>
              </div>
            </div>

            {/* Partner Sectors 4 Cards Grid */}
            <div>
              <div className="text-center max-w-2xl mx-auto mb-8">
                <span className="text-xs font-bold uppercase tracking-wider text-[#5191fa] block mb-1">
                  Sectors We Collaborate With
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#1a2b48]">
                  Explore Our Partner Categories
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div
                  onClick={() => {
                    setActiveTab('vehicles');
                    setPartnerType('4x4 Vehicles & Transport');
                  }}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:border-[#5191fa] hover:shadow-md transition-all cursor-pointer group flex flex-col"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#5191fa] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Car className="w-6 h-6" />
                  </div>
                  <h4 className="font-heading font-bold text-base text-[#1a2b48] mb-1.5">4x4 Vehicles &amp; Fleet</h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4 flex-1">
                    Inspected Toyota Land Cruisers, Hilux Revos, and luxury Coaster buses for Karakoram Highway and Askole trails.
                  </p>
                  <span className="text-xs font-bold text-[#5191fa] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Explore Fleet &rarr;
                  </span>
                </div>

                <div
                  onClick={() => {
                    setActiveTab('hotels');
                    setPartnerType('Hotels & Resorts');
                  }}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer group flex flex-col"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-heading font-bold text-base text-[#1a2b48] mb-1.5">Hotels &amp; Lodges</h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4 flex-1">
                    Boutique alpine lodges, heritage forts, and base camp eco-cottages across Skardu, Hunza, and Fairy Meadows.
                  </p>
                  <span className="text-xs font-bold text-emerald-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    View Hotels &rarr;
                  </span>
                </div>

                <div
                  onClick={() => {
                    setActiveTab('all');
                    setPartnerType('Mountain Guides & Porters');
                  }}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:border-amber-500 hover:shadow-md transition-all cursor-pointer group flex flex-col"
                >
                  <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Award className="w-6 h-6" />
                  </div>
                  <h4 className="font-heading font-bold text-base text-[#1a2b48] mb-1.5">Guides &amp; Porters</h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4 flex-1">
                    Licensed alpine guides, High Altitude Porters, and base camp cooks with top safety gear and medical insurance.
                  </p>
                  <span className="text-xs font-bold text-amber-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Apply Below &rarr;
                  </span>
                </div>

                <div
                  onClick={() => {
                    setActiveTab('agencies');
                    setPartnerType('International Tour Agency / Outfitter');
                  }}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:border-purple-500 hover:shadow-md transition-all cursor-pointer group flex flex-col"
                >
                  <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Handshake className="w-6 h-6" />
                  </div>
                  <h4 className="font-heading font-bold text-base text-[#1a2b48] mb-1.5">B2B Agencies &amp; Clubs</h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4 flex-1">
                    Overseas tour operators and clubs seeking a licensed Pakistan ground-handling partner with Visa LOI authorization.
                  </p>
                  <span className="text-xs font-bold text-purple-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    B2B Inquiries &rarr;
                  </span>
                </div>
              </div>
            </div>

            {/* Testimonials */}
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm">
              <div className="text-center max-w-2xl mx-auto mb-10">
                <span className="text-xs font-bold uppercase tracking-wider text-[#5191fa] block mb-1">
                  Partner Testimonials
                </span>
                <h3 className="font-heading text-2xl font-bold text-[#1a2b48]">
                  Trusted by Operators Across Gilgit-Baltistan
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 rounded-2xl bg-[#f7f8fa] border border-slate-200">
                  <p className="text-xs text-slate-600 italic leading-relaxed mb-4">
                    "We have partnered our 6 Toyota Hilux 4x4 jeeps with Diran Peak Adventure for three consecutive K2 seasons. They provide advance fuel money, clear instructions, and pay every rupee on time."
                  </p>
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#5191fa] text-white font-bold text-xs flex items-center justify-center">
                      AR
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#1a2b48]">Ali Raza Balti</div>
                      <div className="text-[10px] text-slate-400">Fleet Owner, Skardu</div>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#f7f8fa] border border-slate-200">
                  <p className="text-xs text-slate-600 italic leading-relaxed mb-4">
                    "Their European and American climbing groups are wonderful guests. They respect our lodge traditions, and the Diran Peak Adventure operations desk coordinates room rosters with utmost professionalism."
                  </p>
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
                      KK
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#1a2b48]">Karim Khan</div>
                      <div className="text-[10px] text-slate-400">Eagle's Nest Hotel Hunza</div>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#f7f8fa] border border-slate-200">
                  <p className="text-xs text-slate-600 italic leading-relaxed mb-4">
                    "As an alpine guide from Shimshal, I value their focus on mountain safety, insurance for our high-altitude porters, and emergency rescue preparedness on the Baltoro Glacier."
                  </p>
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-amber-600 text-white font-bold text-xs flex items-center justify-center">
                      MG
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#1a2b48]">Master Ghulam</div>
                      <div className="text-[10px] text-slate-400">Lead Climbing Sirdar</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Application Form */}
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-200 mt-14" id="partner-apply-form">
          <div className="text-center mb-6">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#5191fa] block mb-1">
              {activeTab === 'vehicles'
                ? 'Vehicle & Transport Registration'
                : activeTab === 'hotels'
                ? 'Hotel & Lodge Registration'
                : 'Partnership Onboarding'}
            </span>
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#1a2b48] mb-1">
              {activeTab === 'vehicles'
                ? 'Register Your Vehicle Fleet'
                : activeTab === 'hotels'
                ? 'List Your Property with Diran Peak Adventure'
                : 'Submit Partnership Request'}
            </h3>
            <p className="text-xs text-slate-500">
              Fill in your details below and our operations department in Skardu will review and contact you.
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-6">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">Application Received</h4>
              <p className="text-xs text-slate-600 mb-4">
                Thank you for applying. We will review your partnership request and connect with you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Partnership Category</label>
                <select
                  value={partnerType}
                  onChange={(e) => setPartnerType(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                >
                  <option value="4x4 Vehicles & Transport">4x4 Vehicles &amp; Transport</option>
                  <option value="Hotels & Resorts">Hotels &amp; Resorts</option>
                  <option value="Mountain Guides & Porters">Mountain Guides &amp; Porters</option>
                  <option value="International Tour Agency / Outfitter">International Tour Agency / Outfitter</option>
                  <option value="Mountaineering Gear & Equipment">Mountaineering Gear &amp; Equipment</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {partnerType === 'Hotels & Resorts' ? 'Hotel / Lodge Name' : 'Company / Fleet / Owner Name'}
                </label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder={
                    partnerType === 'Hotels & Resorts'
                      ? 'e.g. Karakoram View Hotel & Resort'
                      : 'e.g. Karakoram 4x4 Fleet / Ali Raza Transport'
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Contact Person</label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="business@example.com"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+92 344 1234567"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Operating City / Region</label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Skardu, Gilgit, Hunza, Islamabad"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {partnerType === '4x4 Vehicles & Transport'
                    ? 'Vehicle Specifications & Expected Daily Rate'
                    : partnerType === 'Hotels & Resorts'
                    ? 'Total Rooms, Star Category & Amenities'
                    : 'Service Capacity & Proposed Tariffs'}
                </label>
                <textarea
                  rows={3}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder={
                    partnerType === '4x4 Vehicles & Transport'
                      ? 'e.g. 2x Toyota Hilux Revo (2020), 4x4 with snorkel. Routes: Skardu to Askole, Deosai. Expected rate: 35,000 PKR / day.'
                      : partnerType === 'Hotels & Resorts'
                      ? 'e.g. 24 rooms, en-suite hot bath, generator backup, restaurant with mountain view. Expected group rate: 20,000 PKR / night.'
                      : 'Tell us about your services, certifications, or capacity.'
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-2.5 px-4 bg-[#5191fa] hover:bg-[#3d7be3] text-white font-bold text-xs uppercase rounded-xl transition-all cursor-pointer shadow-md disabled:opacity-50"
              >
                {submitting ? 'Submitting Application...' : 'Submit Partnership Application'}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Vehicle Inquiry Modal */}
      {selectedVehicleForInquiry && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedVehicleForInquiry(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {vehInquirySubmitted ? (
              <div className="text-center py-6">
                <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                <h4 className="font-bold text-base text-slate-900 mb-1">Charter Request Received!</h4>
                <p className="text-xs text-slate-600">
                  Our dispatch coordinator in Skardu will check vehicle availability and contact you shortly.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <span className="text-[10px] font-bold uppercase text-[#5191fa] tracking-wider">
                    Vehicle Charter Inquiry
                  </span>
                  <h3 className="font-heading font-bold text-lg text-[#1a2b48] mt-0.5">
                    {selectedVehicleForInquiry.name}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Estimated Rate: <strong className="text-[#5191fa]">{selectedVehicleForInquiry.dailyRate}</strong>{' '}
                    (includes mountain driver &amp; fuel)
                  </p>
                </div>

                <form onSubmit={handleVehicleInquirySubmit} className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={vehInquiryName}
                      onChange={(e) => setVehInquiryName(e.target.value)}
                      placeholder="Full Name"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={vehInquiryEmail}
                      onChange={(e) => setVehInquiryEmail(e.target.value)}
                      placeholder="you@domain.com"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                      Route &amp; Dates *
                    </label>
                    <input
                      type="text"
                      required
                      value={vehInquiryRoute}
                      onChange={(e) => setVehInquiryRoute(e.target.value)}
                      placeholder="e.g. July 12 - 24 (Islamabad to Skardu & Askole)"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                      Passengers &amp; Luggage Notes
                    </label>
                    <textarea
                      rows={2}
                      value={vehInquiryNotes}
                      onChange={(e) => setVehInquiryNotes(e.target.value)}
                      placeholder="Number of travelers, gear bags, or guide requirements..."
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 bg-[#5191fa] hover:bg-[#3875dc] text-white font-bold text-xs uppercase rounded-xl transition-all cursor-pointer shadow-md mt-2"
                  >
                    Dispatch Charter Inquiry
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* Hotel Reservation Modal */}
      {selectedHotelForInquiry && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedHotelForInquiry(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {hotelInquirySubmitted ? (
              <div className="text-center py-6">
                <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                <h4 className="font-bold text-base text-slate-900 mb-1">Reservation Request Received!</h4>
                <p className="text-xs text-slate-600">
                  Our hospitality desk in Skardu will check room availability and contact you shortly.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <span className="text-[10px] font-bold uppercase text-emerald-600 tracking-wider">
                    Hotel Reservation Inquiry
                  </span>
                  <h3 className="font-heading font-bold text-lg text-[#1a2b48] mt-0.5">
                    {selectedHotelForInquiry.name}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Nightly Rate: <strong className="text-emerald-600">{selectedHotelForInquiry.nightlyRate}</strong>{' '}
                    ({selectedHotelForInquiry.pkrRate})
                  </p>
                </div>

                <form onSubmit={handleHotelInquirySubmit} className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={hotelInquiryName}
                      onChange={(e) => setHotelInquiryName(e.target.value)}
                      placeholder="Full Name"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Email *</label>
                      <input
                        type="email"
                        required
                        value={hotelInquiryEmail}
                        onChange={(e) => setHotelInquiryEmail(e.target.value)}
                        placeholder="you@domain.com"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">WhatsApp *</label>
                      <input
                        type="tel"
                        required
                        value={hotelInquiryPhone}
                        onChange={(e) => setHotelInquiryPhone(e.target.value)}
                        placeholder="+92 344 1234567"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Check-In *</label>
                      <input
                        type="date"
                        required
                        value={hotelInquiryCheckIn}
                        onChange={(e) => setHotelInquiryCheckIn(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Check-Out *</label>
                      <input
                        type="date"
                        required
                        value={hotelInquiryCheckOut}
                        onChange={(e) => setHotelInquiryCheckOut(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Guests *</label>
                      <input
                        type="number"
                        min="1"
                        required
                        value={hotelInquiryGuests}
                        onChange={(e) => setHotelInquiryGuests(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Room Type</label>
                      <select
                        value={hotelInquiryRoomType}
                        onChange={(e) => setHotelInquiryRoomType(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                      >
                        <option value="Deluxe Mountain View">Deluxe Mountain View</option>
                        <option value="Executive Suite">Executive Suite</option>
                        <option value="Standard Double">Standard Double</option>
                        <option value="Twin Expedition Room">Twin Expedition Room</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                      Notes &amp; Flight Arrival
                    </label>
                    <textarea
                      rows={2}
                      value={hotelInquiryNotes}
                      onChange={(e) => setHotelInquiryNotes(e.target.value)}
                      placeholder="Airport pick-up requests, late check-in, or meal preferences..."
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase rounded-xl transition-all cursor-pointer shadow-md mt-2"
                  >
                    Dispatch Reservation Inquiry
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
