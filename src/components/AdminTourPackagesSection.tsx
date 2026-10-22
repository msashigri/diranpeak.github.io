import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Tour } from '../data/toursData';
import {
  Mountain, Star, Search, Plus, Edit3, Trash2, Check, X,
  ExternalLink, Sparkles, AlertCircle, RefreshCw, Eye, ArrowUpDown, Tag, DollarSign, Image as ImageIcon
} from 'lucide-react';

const PRESET_IMAGES = [
  { label: 'K2 & Baltoro', url: '/images/hero_karakoram_k2_1790420138291.jpg' },
  { label: 'K2 Climbing Team', url: '/images/expedition_climbing_k2_1790420166845.jpg' },
  { label: 'Baltoro Glacier Trek', url: '/images/trek_baltoro_glacier_1790420152808.jpg' },
  { label: 'Skardu Valley', url: '/images/skardu_valley_landscape_1790420181912.jpg' },
  { label: 'Hunza Eagle Nest', url: '/images/eagles_nest_hotel_hunza.jpg' },
  { label: 'Shangrila Resort', url: '/images/shangrila_skardu_resort.jpg' },
  { label: 'Prado 4x4 Trail', url: '/images/prado_4x4_mountain.jpg' },
  { label: 'Hilux Revo 4WD', url: '/images/hilux_revo_trail.jpg' },
  { label: 'HiAce Mountain Van', url: '/images/hiace_mountain_van.jpg' }
];

export const AdminTourPackagesSection: React.FC<{ onNavigateToDetail?: (tour: Tour) => void }> = ({ onNavigateToDetail }) => {
  const {
    tours,
    updateTourPackage,
    toggleTourFeatured,
    addTourPackage,
    deleteTourPackage,
    resetToursToDefaults,
    formatPrice
  } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'featured' | 'trekking' | 'expedition' | '6000m' | 'cultural'>('all');
  const [editingTour, setEditingTour] = useState<Tour | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // New tour initial form template
  const [newTourForm, setNewTourForm] = useState<Partial<Tour>>({
    id: '',
    slug: '',
    title: '',
    category: 'trekking',
    duration: '14 Days',
    daysCount: 14,
    price: 1850,
    originalPrice: 2200,
    discountPercent: 15,
    rating: 4.9,
    reviewsCount: 12,
    location: 'Karakoram · Gilgit-Baltistan',
    maxAltitude: '5,150 m',
    groupSize: '4 - 12 Persons',
    difficulty: 'Demanding',
    featured: true,
    image: '/images/hero_karakoram_k2_1790420138291.jpg',
    gallery: ['/images/hero_karakoram_k2_1790420138291.jpg'],
    overview: 'An unforgettable trekking journey through the heart of northern Pakistan.',
    highlights: ['Breathtaking panoramic mountain views', 'Native Balti mountain crew', 'Complete camping logistics'],
    included: ['Licensed guide', 'Domestic logistics', 'Three meals daily on trek'],
    excluded: ['International airfare', 'Personal insurance', 'Gratuities'],
    itinerary: [{ day: 1, title: 'Arrival Islamabad', description: 'Briefing and orientation at team hotel.' }],
    departures: [],
    faqs: [],
    reviews: []
  });

  const featuredCount = tours.filter(t => t.featured).length;

  const filteredTours = tours.filter((tour) => {
    const matchesSearch =
      tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tour.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (tour.overview && tour.overview.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (categoryFilter === 'featured') return Boolean(tour.featured);
    if (categoryFilter !== 'all') return tour.category === categoryFilter;

    return true;
  });

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTour) return;

    await updateTourPackage(editingTour.id, editingTour);
    setSaveSuccessMsg(`Tour package "${editingTour.title}" updated successfully!`);
    setEditingTour(null);
    setTimeout(() => setSaveSuccessMsg(''), 4000);
  };

  const handleCreateNew = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTourForm.title || !newTourForm.price) return;

    const slug = newTourForm.slug || newTourForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const id = newTourForm.id || slug || `tour-${Date.now()}`;

    const completeTour: Tour = {
      id,
      slug,
      title: newTourForm.title,
      category: newTourForm.category as any || 'trekking',
      duration: newTourForm.duration || `${newTourForm.daysCount || 10} Days`,
      daysCount: Number(newTourForm.daysCount) || 10,
      price: Number(newTourForm.price) || 1500,
      originalPrice: newTourForm.originalPrice ? Number(newTourForm.originalPrice) : undefined,
      discountPercent: newTourForm.discountPercent ? Number(newTourForm.discountPercent) : undefined,
      rating: 5.0,
      reviewsCount: 1,
      location: newTourForm.location || 'Gilgit-Baltistan, Pakistan',
      maxAltitude: newTourForm.maxAltitude || '4,500 m',
      groupSize: newTourForm.groupSize || '4 - 12 Persons',
      difficulty: (newTourForm.difficulty as any) || 'Moderate',
      featured: Boolean(newTourForm.featured),
      image: newTourForm.image || '/images/hero_karakoram_k2_1790420138291.jpg',
      gallery: [newTourForm.image || '/images/hero_karakoram_k2_1790420138291.jpg'],
      overview: newTourForm.overview || 'Scenic mountain adventure in Pakistan.',
      highlights: newTourForm.highlights || ['Karakoram views', 'Authentic hospitality'],
      included: newTourForm.included || ['Professional guide', 'Camp logistics'],
      excluded: newTourForm.excluded || ['Personal gear', 'Flights'],
      itinerary: newTourForm.itinerary || [{ day: 1, title: 'Arrival', description: 'Expedition briefing.' }],
      departures: [],
      faqs: [],
      reviews: []
    };

    await addTourPackage(completeTour);
    setSaveSuccessMsg(`New tour package "${completeTour.title}" created successfully!`);
    setIsCreatingNew(false);
    setTimeout(() => setSaveSuccessMsg(''), 4000);
  };

  const handleDelete = async (id: string) => {
    await deleteTourPackage(id);
    setConfirmDeleteId(null);
    setSaveSuccessMsg('Tour package deleted.');
    setTimeout(() => setSaveSuccessMsg(''), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Stats */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#5191fa] text-xs font-bold uppercase tracking-wider mb-2">
              <Mountain className="w-3.5 h-3.5" />
              <span>Tour Packages &amp; Homepage Feature Control</span>
            </div>
            <h2 className="text-2xl font-heading font-extrabold text-[#1a2b48]">
              Manage Tour Packages &amp; Featured Groups
            </h2>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl">
              Control which tours show up in the 2-3 featured group tags on the homepage, update pricing, change cover photos, rewrite overviews, or add new expeditions with instant Cloud Firestore synchronization.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setIsCreatingNew(true)}
              className="px-4 py-2.5 bg-[#5191fa] hover:bg-[#3875dc] text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Package</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (window.confirm('Reset all packages to the default seed catalog?')) {
                  resetToursToDefaults();
                }
              }}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
              title="Reset package catalog to defaults"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
              <span>Reset Catalog</span>
            </button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Tours</div>
            <div className="text-2xl font-black text-[#1a2b48] mt-1">{tours.length}</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Active across website</div>
          </div>

          <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200/80">
            <div className="text-[11px] font-bold text-amber-600 uppercase tracking-wider flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>Featured Tours</span>
            </div>
            <div className="text-2xl font-black text-amber-700 mt-1">{featuredCount}</div>
            <div className="text-[10px] text-amber-600 mt-0.5">Top in homepage group tags</div>
          </div>

          <div className="bg-blue-50/70 p-4 rounded-2xl border border-blue-200/80">
            <div className="text-[11px] font-bold text-[#5191fa] uppercase tracking-wider">Trekking &amp; Hikes</div>
            <div className="text-2xl font-black text-blue-700 mt-1">
              {tours.filter(t => t.category === 'trekking').length}
            </div>
            <div className="text-[10px] text-blue-600 mt-0.5">K2 Baltoro, Gondogoro La...</div>
          </div>

          <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200/80">
            <div className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">Expeditions</div>
            <div className="text-2xl font-black text-emerald-700 mt-1">
              {tours.filter(t => t.category === 'expedition' || t.category === '6000m').length}
            </div>
            <div className="text-[10px] text-emerald-600 mt-0.5">Diran, Spantik, Broad Peak...</div>
          </div>
        </div>
      </div>

      {/* Success Banner */}
      {saveSuccessMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-fade-in shadow-xs">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{saveSuccessMsg}</span>
        </div>
      )}

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {[
            { id: 'all', label: `All (${tours.length})` },
            { id: 'featured', label: `⭐ Featured (${featuredCount})` },
            { id: 'trekking', label: 'Trekking' },
            { id: 'expedition', label: 'Expedition' },
            { id: '6000m', label: '6000m Peaks' },
            { id: 'cultural', label: 'Cultural' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                categoryFilter === cat.id
                  ? 'bg-[#1a2b48] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search title, region, altitude..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#5191fa] focus:bg-white"
          />
        </div>
      </div>

      {/* Tours Grid / Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredTours.map((tour) => (
          <div
            key={tour.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col"
          >
            {/* Card Thumbnail Area */}
            <div className="relative h-48 bg-slate-100 overflow-hidden group">
              <img
                src={tour.image}
                alt={tour.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/hero_karakoram_k2_1790420138291.jpg';
                }}
              />

              {/* Category Badge */}
              <div className="absolute top-3 left-3 bg-[#1a2b48]/90 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                {tour.category}
              </div>

              {/* Price Tag */}
              <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs px-3 py-1 rounded-lg shadow-sm border border-slate-200/50">
                <span className="text-[10px] text-slate-400 block -mb-1">From</span>
                <span className="text-sm font-extrabold text-[#1a2b48]">{formatPrice(tour.price)}</span>
                {tour.originalPrice && (
                  <span className="text-[10px] text-slate-400 line-through ml-1.5 font-normal">
                    {formatPrice(tour.originalPrice)}
                  </span>
                )}
              </div>

              {/* Featured Button Badge */}
              <button
                type="button"
                onClick={() => toggleTourFeatured(tour.id)}
                title={tour.featured ? 'Featured on Homepage groups. Click to unfeature.' : 'Click to feature in Homepage groups'}
                className={`absolute top-3 right-3 px-2.5 py-1 rounded-md text-[11px] font-bold flex items-center gap-1 shadow-sm transition-all cursor-pointer ${
                  tour.featured
                    ? 'bg-amber-400 text-slate-900 ring-2 ring-amber-300 hover:bg-amber-300'
                    : 'bg-black/50 text-white hover:bg-black/75'
                }`}
              >
                <Star className={`w-3.5 h-3.5 ${tour.featured ? 'fill-slate-900 text-slate-900' : 'text-white'}`} />
                <span>{tour.featured ? 'Featured' : 'Not Featured'}</span>
              </button>
            </div>

            {/* Card Body */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5">
                  <span className="font-semibold text-[#5191fa]">{tour.location}</span>
                  <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-bold">{tour.daysCount} Days</span>
                </div>

                <h3 className="font-heading font-bold text-base text-[#1a2b48] mb-2 leading-snug line-clamp-2">
                  {tour.title}
                </h3>

                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                  {tour.overview || 'No description added yet.'}
                </p>

                {/* Specs Pill row */}
                <div className="flex flex-wrap items-center gap-1.5 mb-4 text-[10px] font-semibold text-slate-600">
                  <span className="bg-slate-100 px-2 py-0.5 rounded">Alt: {tour.maxAltitude}</span>
                  <span className="bg-slate-100 px-2 py-0.5 rounded">Level: {tour.difficulty}</span>
                  <span className="bg-slate-100 px-2 py-0.5 rounded">{tour.groupSize}</span>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setEditingTour({ ...tour })}
                  className="flex-1 py-2 px-3 bg-blue-50 hover:bg-blue-100 text-[#5191fa] font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Package</span>
                </button>

                <button
                  type="button"
                  onClick={() => setConfirmDeleteId(tour.id)}
                  className="p-2 bg-slate-50 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-xl transition-colors cursor-pointer"
                  title="Delete Tour Package"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTours.length === 0 && (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
          <Mountain className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-700">No tour packages match your filters</h3>
          <p className="text-xs text-slate-400 mt-1">Try resetting the search query or category filter above.</p>
        </div>
      )}

      {/* ================= EDIT TOUR MODAL ================= */}
      {editingTour && (
        <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-[#5191fa] text-[10px] font-bold uppercase tracking-wider mb-1">
                  <Edit3 className="w-3 h-3" />
                  <span>Package Editor</span>
                </div>
                <h3 className="text-lg font-heading font-extrabold text-[#1a2b48]">
                  Edit Tour: {editingTour.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingTour(null)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-5">
              {/* Basic Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Tour Title *</label>
                  <input
                    type="text"
                    required
                    value={editingTour.title}
                    onChange={(e) => setEditingTour({ ...editingTour, title: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#5191fa] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Category *</label>
                  <select
                    value={editingTour.category}
                    onChange={(e) => setEditingTour({ ...editingTour, category: e.target.value as any })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#5191fa] focus:bg-white"
                  >
                    <option value="trekking">Trekking (Base Camps &amp; High Passes)</option>
                    <option value="expedition">Expedition (7000m - 8000m Peaks)</option>
                    <option value="6000m">6000m Mountain Climbs</option>
                    <option value="cultural">Cultural Heritage &amp; Valleys</option>
                  </select>
                </div>
              </div>

              {/* Pricing & Duration */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Price (USD) *</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={editingTour.price}
                    onChange={(e) => setEditingTour({ ...editingTour, price: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#5191fa] focus:bg-white font-bold text-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Original Price (USD)</label>
                  <input
                    type="number"
                    min={0}
                    value={editingTour.originalPrice || ''}
                    onChange={(e) => setEditingTour({ ...editingTour, originalPrice: e.target.value ? Number(e.target.value) : undefined })}
                    placeholder="e.g. 2500"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#5191fa] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Days Count *</label>
                  <input
                    type="number"
                    min={1}
                    value={editingTour.daysCount}
                    onChange={(e) => setEditingTour({ ...editingTour, daysCount: Number(e.target.value), duration: `${e.target.value} Days` })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#5191fa] focus:bg-white"
                  />
                </div>
              </div>

              {/* Photo / Image URL & Preset Selection */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1 flex items-center justify-between">
                  <span>Cover Photo / Image URL *</span>
                  <span className="text-[10px] text-slate-400 font-normal">Choose from presets or enter custom URL</span>
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <div className="w-16 h-12 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-200 shadow-xs">
                    <img
                      src={editingTour.image}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/hero_karakoram_k2_1790420138291.jpg';
                      }}
                    />
                  </div>
                  <input
                    type="text"
                    required
                    value={editingTour.image}
                    onChange={(e) => setEditingTour({ ...editingTour, image: e.target.value })}
                    placeholder="https://... or /images/..."
                    className="flex-1 w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#5191fa] focus:bg-white font-mono"
                  />
                </div>

                {/* Quick Preset Buttons */}
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <span className="text-[10px] font-bold text-slate-400 self-center mr-1">Presets:</span>
                  {PRESET_IMAGES.map((p, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setEditingTour({ ...editingTour, image: p.url })}
                      className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description / Overview */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Overview / Description</label>
                <textarea
                  rows={4}
                  value={editingTour.overview || ''}
                  onChange={(e) => setEditingTour({ ...editingTour, overview: e.target.value })}
                  placeholder="Comprehensive description of the mountain trek or climbing logistics..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#5191fa] focus:bg-white leading-relaxed"
                />
              </div>

              {/* Location, Altitude, Difficulty */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Location</label>
                  <input
                    type="text"
                    value={editingTour.location}
                    onChange={(e) => setEditingTour({ ...editingTour, location: e.target.value })}
                    placeholder="e.g. Baltoro Glacier, Skardu"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#5191fa] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Max Altitude</label>
                  <input
                    type="text"
                    value={editingTour.maxAltitude}
                    onChange={(e) => setEditingTour({ ...editingTour, maxAltitude: e.target.value })}
                    placeholder="e.g. 5,150 m / 8,611 m"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#5191fa] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Difficulty</label>
                  <select
                    value={editingTour.difficulty}
                    onChange={(e) => setEditingTour({ ...editingTour, difficulty: e.target.value as any })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#5191fa] focus:bg-white"
                  >
                    <option value="Moderate">Moderate</option>
                    <option value="Demanding">Demanding</option>
                    <option value="Strenuous">Strenuous</option>
                    <option value="Extreme">Extreme</option>
                  </select>
                </div>
              </div>

              {/* Featured in Homepage Groups Checkbox */}
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-xs text-amber-900 flex items-center gap-1.5">
                    <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                    <span>Feature in Homepage Tag Groups</span>
                  </div>
                  <p className="text-[11px] text-amber-700 mt-0.5">
                    When checked, this package is prioritized to appear in the 2,3 tours of its group tag on the homepage.
                  </p>
                </div>
                <input
                  type="checkbox"
                  id="featuredToggle"
                  checked={Boolean(editingTour.featured)}
                  onChange={(e) => setEditingTour({ ...editingTour, featured: e.target.checked })}
                  className="w-5 h-5 text-amber-600 rounded border-amber-300 focus:ring-amber-500 cursor-pointer"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingTour(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#5191fa] hover:bg-[#3875dc] text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Package Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= CREATE NEW TOUR MODAL ================= */}
      {isCreatingNew && (
        <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-wider mb-1">
                  <Plus className="w-3 h-3" />
                  <span>Create Package</span>
                </div>
                <h3 className="text-lg font-heading font-extrabold text-[#1a2b48]">
                  Add New Tour Package
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsCreatingNew(false)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateNew} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Package Title *</label>
                  <input
                    type="text"
                    required
                    value={newTourForm.title || ''}
                    onChange={(e) => setNewTourForm({ ...newTourForm, title: e.target.value })}
                    placeholder="e.g. Masherbrum Base Camp Trek"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#5191fa] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Category *</label>
                  <select
                    value={newTourForm.category}
                    onChange={(e) => setNewTourForm({ ...newTourForm, category: e.target.value as any })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#5191fa] focus:bg-white"
                  >
                    <option value="trekking">Trekking</option>
                    <option value="expedition">Expedition</option>
                    <option value="6000m">6000m Peaks</option>
                    <option value="cultural">Cultural</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Price in USD *</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={newTourForm.price || ''}
                    onChange={(e) => setNewTourForm({ ...newTourForm, price: Number(e.target.value) })}
                    placeholder="1850"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#5191fa] focus:bg-white font-bold text-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Days Count *</label>
                  <input
                    type="number"
                    min={1}
                    value={newTourForm.daysCount || 14}
                    onChange={(e) => setNewTourForm({ ...newTourForm, daysCount: Number(e.target.value), duration: `${e.target.value} Days` })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#5191fa] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Location *</label>
                  <input
                    type="text"
                    value={newTourForm.location || ''}
                    onChange={(e) => setNewTourForm({ ...newTourForm, location: e.target.value })}
                    placeholder="e.g. Hushe Valley, Baltistan"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#5191fa] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Cover Photo / Image URL</label>
                <input
                  type="text"
                  value={newTourForm.image || ''}
                  onChange={(e) => setNewTourForm({ ...newTourForm, image: e.target.value })}
                  placeholder="/images/hero_karakoram_k2_1790420138291.jpg"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#5191fa] focus:bg-white font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Overview / Description</label>
                <textarea
                  rows={3}
                  value={newTourForm.overview || ''}
                  onChange={(e) => setNewTourForm({ ...newTourForm, overview: e.target.value })}
                  placeholder="Describe the route, views, and experience..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#5191fa] focus:bg-white leading-relaxed"
                />
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-xs text-amber-900">Feature on Homepage Tag Groups</div>
                  <p className="text-[11px] text-amber-700 mt-0.5">Show this in the 2,3 featured tours on the home page.</p>
                </div>
                <input
                  type="checkbox"
                  checked={Boolean(newTourForm.featured)}
                  onChange={(e) => setNewTourForm({ ...newTourForm, featured: e.target.checked })}
                  className="w-5 h-5 text-amber-600 rounded cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCreatingNew(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Publish Tour Package</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 text-center">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-3">
              <Trash2 className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-[#1a2b48] mb-1">Delete Tour Package?</h4>
            <p className="text-xs text-slate-500 mb-6">
              Are you sure you want to delete this tour package from the database? This action cannot be undone.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setConfirmDeleteId(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDelete(confirmDeleteId)}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl cursor-pointer shadow-xs"
              >
                Delete Package
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
