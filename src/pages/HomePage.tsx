import React from 'react';
import { Hero } from '../components/Hero';
import { TrustStats } from '../components/TrustStats';
import { FeaturedTours } from '../components/FeaturedTours';
import { HomeFaq } from '../components/HomeFaq';
import { Testimonials } from '../components/Testimonials';
import { LatestArticles } from '../components/LatestArticles';
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
      <HomeFaq onContactClick={() => onNavigate('contact')} />
      <Testimonials />
      <LatestArticles />
    </div>
  );
};
