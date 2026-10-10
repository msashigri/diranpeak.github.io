export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  altitude?: string;
  duration?: string;
  accommodation?: string;
}

export interface DepartureDate {
  id: string;
  startDate: string;
  endDate: string;
  price: number;
  status: 'Guaranteed' | 'Filling Fast' | 'Available';
  seatsLeft: number;
}

export interface TourReview {
  id: string;
  name: string;
  country: string;
  rating: number;
  date: string;
  comment: string;
  avatar?: string;
}

export interface Tour {
  id: string;
  slug: string;
  title: string;
  category: 'trekking' | 'expedition' | '6000m' | 'cultural';
  duration: string;
  daysCount: number;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  rating: number;
  reviewsCount: number;
  location: string;
  maxAltitude: string;
  groupSize: string;
  difficulty: 'Moderate' | 'Demanding' | 'Strenuous' | 'Extreme';
  featured?: boolean;
  bestSeller?: boolean;
  image: string;
  gallery: string[];
  overview: string;
  highlights: string[];
  included: string[];
  excluded: string[];
  itinerary: ItineraryDay[];
  departures: DepartureDate[];
  faqs: { question: string; answer: string }[];
  reviews: TourReview[];
}

import { TREKKING_TOURS } from './trekkingTours';
import { EXPEDITION_TOURS } from './expeditionTours';
import { SAFARI_TOURS } from './safariTours';

export { TREKKING_TOURS, EXPEDITION_TOURS, SAFARI_TOURS };

export const TOURS_DATA: Tour[] = [
  ...TREKKING_TOURS,
  ...EXPEDITION_TOURS,
  ...SAFARI_TOURS
];

export const getTourBySlugOrId = (slugOrId: string): Tour | undefined => {
  if (!slugOrId) return undefined;
  const clean = slugOrId.trim().toLowerCase();

  // Explicit aliases
  if (clean === 'k2-gondogoro-la-trek' || clean === 'k2-base-camp-and-gondogoro-la-pass-trek') {
    return TOURS_DATA.find(t => t.id === 'k2-gondogoro-la-trek');
  }
  if (clean === 'gasherbrum-1-2-climbing-expedition' || clean === 'gasherbrum-1-2-expedition' || clean === 'gasherbrum-expedition') {
    return TOURS_DATA.find(t => t.id === 'gasherbrum-1-2-expedition');
  }
  if (clean === 'broad-peak-expedition' || clean === 'broad-peak-climbing-expedition') {
    return TOURS_DATA.find(t => t.id === 'broad-peak-expedition');
  }
  if (clean === 'diran-peak-7273-m-expedition' || clean === 'diran-peak-expedition') {
    return TOURS_DATA.find(t => t.id === 'diran-peak-7273-m-expedition');
  }
  if (clean === 'k2-climbing-expedition' || clean === 'k2-expedition') {
    return TOURS_DATA.find(t => t.id === 'k2-climbing-expedition');
  }
  if (clean === 'khosar-gang-peak-expedition' || clean === 'khosar-gang-expedition') {
    return TOURS_DATA.find(t => t.id === 'khosar-gang-peak-expedition');
  }

  // Exact ID or Slug match
  const exact = TOURS_DATA.find(t => t.slug === slugOrId || t.id === slugOrId);
  if (exact) return exact;

  // Case-insensitive ID or Slug match
  const caseInsensitive = TOURS_DATA.find(t => t.slug.toLowerCase() === clean || t.id.toLowerCase() === clean);
  if (caseInsensitive) return caseInsensitive;

  // Title match
  return TOURS_DATA.find(t => t.title.toLowerCase().includes(clean));
};
