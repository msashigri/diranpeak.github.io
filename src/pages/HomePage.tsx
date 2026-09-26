import React from 'react';
import { Hero } from '../components/Hero';
import { TrustStats } from '../components/TrustStats';
import { FeaturedTours } from '../components/FeaturedTours';
import { DestinationsGrid } from '../components/DestinationsGrid';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { Testimonials } from '../components/Testimonials';
import { Tour } from '../data/toursData';

interface HomePageProps {
  onSelectTour: (tour: Tour) => void;
  onNavigate: (route: string, param?: string) => void;
  onSearch: (params: { destination?: string; category?: string; duration?: string }) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onSelectTour, onNavigate, onSearch }) => {
  return (
    <div>
      <Hero
        onSearch={onSearch}
        onExploreClick={() => onNavigate('tours', 'all')}
      />
      <TrustStats />
      <FeaturedTours
        onSelectTour={onSelectTour}
        onViewAll={(category) => onNavigate('tours', category || 'all')}
      />
      <DestinationsGrid
        onSelectDestination={(dest) => onNavigate('tours', dest)}
      />
      <WhyChooseUs
        onContactClick={() => onNavigate('contact')}
      />
      <Testimonials />
    </div>
  );
};
