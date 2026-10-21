export interface SiteSettings {
  id: string;
  siteName: string;
  tagline: string;
  logoUrl: string;
  faviconUrl: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  ogTitle: string;
  ogDescription: string;
  contactPhone: string;
  contactEmail: string;
  whatsappNumber: string;
  address: string;
  licenseNumber: string;
  heroTitle: string;
  heroSubtitle: string;
  heroBadge: string;
  heroBgImage: string;
  facebookUrl?: string;
  instagramUrl?: string;
  youtubeUrl?: string;
  tripAdvisorUrl?: string;
}

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  id: 'main',
  siteName: 'Diran Peak Adventure',
  tagline: 'Premier Karakoram, K2 & Baltistan Expeditions',
  logoUrl: '',
  faviconUrl: '/favicon.png',
  metaTitle: 'Diran Peak Adventure | Best Tour & Trekking Company in Pakistan',
  metaDescription: 'Diran Peak Adventure featuring K2 Base Camp trekking, 8000m Karakoram climbing expeditions, cultural tours, full booking system, and member login & registration.',
  metaKeywords: 'Pakistan trekking, K2 base camp, Karakoram expeditions, Baltistan tours, Diran Peak, mountain guides',
  ogTitle: 'Diran Peak Adventure | Best Tour & Trekking Company in Pakistan',
  ogDescription: 'Experience authentic Karakoram mountaineering, K2 Base Camp treks, and cultural Silk Road journeys with DTS Licensed #1842.',
  contactPhone: '+92 345 6412992',
  contactEmail: 'info@diranpeakadverture.com',
  whatsappNumber: '+92 345 6412992',
  address: 'Main Airport Road, Skardu, Gilgit-Baltistan 16100, Pakistan',
  licenseNumber: 'DTS License #1842',
  heroTitle: 'Discover The Best Of Pakistan',
  heroSubtitle: 'Trekking | Tour | Expedition',
  heroBadge: 'DTS Licensed Tour Operator #1842',
  heroBgImage: '/images/hero_karakoram_k2_1790420138291.jpg',
  facebookUrl: 'https://facebook.com/diranpeakadventure',
  instagramUrl: 'https://instagram.com/diranpeakadventure',
  youtubeUrl: 'https://youtube.com/@diranpeakadventure',
  tripAdvisorUrl: 'https://tripadvisor.com'
};
