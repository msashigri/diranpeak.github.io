import React from 'react';
import { ExternalLink, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: 'Elena Rostova',
      country: 'Switzerland',
      text: 'Climbing through the rugged passes of Hunza and Passu Cones with Diran Peak Adventure was seamless. Their summit leaders, route planning, and genuine hospitality made a world-class impression.'
    },
    {
      name: 'Marcus Vance',
      country: 'Canada',
      text: 'From the moment we touched down in Islamabad to standing in awe at Rakaposhi Base Camp, the entire itinerary was flawless. Outstanding safety protocols and delicious warm camp meals.'
    },
    {
      name: 'Amina Kazi',
      country: 'Norway',
      text: 'An extraordinary journey through northern Pakistan’s most pristine valleys. The staff treats you like family and their environmental mountain stewardship is truly commendable.'
    }
  ];

  return (
    <section className="py-16 bg-[#f7f8fa] border-t border-[#eaeef3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="relative inline-block text-3xl font-semibold text-[#1a2b48] pb-3 font-heading">
            Our Happy Clients
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-[3px] bg-[#5191fa] rounded-full" />
          </h2>
          <p className="text-sm text-[#5e6d77] mt-2">
            Authentic feedback from international mountaineers and trekkers who explored Pakistan with Diran Peak Adventure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {reviews.map((r, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#1a2b48] to-[#5191fa] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                      {r.name.trim().charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-base text-[#1a2b48]">
                        {r.name}
                      </h4>
                      <p className="text-xs text-slate-400">
                        {r.country}
                      </p>
                    </div>
                  </div>
                  <Quote className="w-6 h-6 text-[#5191fa]/20 shrink-0" />
                </div>

                <p className="text-xs text-[#5e6d77] leading-relaxed font-normal">
                  &ldquo;{r.text}&rdquo;
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Read More Google Reviews Banner */}
        <div className="bg-[#1a2b48] text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold font-heading text-white mb-1">
              Read Verified Expedition Dispatches
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Field reports and summit memoirs from global alpinists and travelers in the Karakoram &amp; Himalayas.
            </p>
          </div>

          <a
            href="https://www.google.com/maps/place/Diran+Peak+Adventure+Pakistan/@33.6569451,73.1584339,15z"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 bg-[#5191fa] hover:bg-[#3875dc] text-white font-semibold text-xs uppercase tracking-wider rounded-xl transition-colors whitespace-nowrap flex items-center gap-2 cursor-pointer shadow-md"
          >
            <span>Read Dispatches</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
