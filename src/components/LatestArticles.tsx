import React from 'react';
import { Calendar } from 'lucide-react';

interface LatestArticlesProps {
  onSelectArticle?: (title: string) => void;
}

export const LatestArticles: React.FC<LatestArticlesProps> = () => {
  const articles = [
    {
      title: 'Top Destinations to Explore in Skardu - Must-See Tourist Attractions',
      category: 'Destination Guide',
      date: 'January 2027',
      readTime: '6 min read',
      excerpt: 'Explore Kharpocho Fort, Cold Desert Sarfaranga, Kachura Lakes, and ancient Shigar Valley palace.'
    },
    {
      title: 'Top five trekking peaks in Pakistan',
      category: 'Mountaineering',
      date: 'February 2027',
      readTime: '8 min read',
      excerpt: 'From Khosar Gang (6040m) to Spantik Golden Peak (7027m), discover the ideal introductory peaks.'
    },
    {
      title: 'Gondogoro La Trek Daily Distance and Altitude',
      category: 'Trek Logistics',
      date: 'March 2027',
      readTime: '5 min read',
      excerpt: 'Detailed day-by-day distance, elevation gain, and campsite altitudes from Paiju to Hushe.'
    },
    {
      title: 'K2 Base Camp Trek Map Daily Distance and Elevation',
      category: 'Route Maps',
      date: 'March 2027',
      readTime: '7 min read',
      excerpt: 'Full topographic elevation profile and GPS waypoints across the Baltoro Glacier.'
    }
  ];

  return (
    <section className="py-16 bg-white border-t border-[#eaeef3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="relative inline-block text-3xl font-semibold text-[#1a2b48] pb-3">
            Latest Travel Insights &amp; Guides
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-[3px] bg-[#5191fa] rounded-full" />
          </h2>
          <p className="text-sm text-[#5e6d77] mt-2">
            Essential high-altitude tips, route maps, and cultural advice from our senior Balti guides.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((art, idx) => (
            <div
              key={idx}
              className="bg-white rounded border border-[#dfdfdf] p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="text-[11px] font-semibold text-[#5191fa] uppercase tracking-wider mb-2">
                  {art.category}
                </div>
                <h3 className="font-semibold text-sm text-[#1a2b48] hover:text-[#5191fa] transition-colors mb-2 leading-snug line-clamp-2">
                  {art.title}
                </h3>
                <p className="text-xs text-[#5e6d77] leading-relaxed mb-4 line-clamp-3">
                  {art.excerpt}
                </p>
              </div>

              <div className="pt-3 border-t border-[#f0f0f0] flex items-center justify-between text-[11px] text-[#5e6d77]">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#5191fa]" />
                  <span>{art.date}</span>
                </div>
                <span className="text-[#5191fa] font-medium hover:underline cursor-pointer">
                  Read &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
