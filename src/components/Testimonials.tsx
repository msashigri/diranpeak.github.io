import React from 'react';
import { Star, Quote, CheckCircle } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: 'Karlota Perurena',
      country: 'Spain',
      trip: 'K2 Base Camp & Concordia Trek',
      rating: 5,
      date: 'August 2025',
      text: 'Trekking to K2 Base Camp with Chogori Adventure was the most incredible alpine experience of my life. The Balti staff were exceptionally attentive, the food at 4,600m in Concordia was unbelievable, and the safety measures gave complete peace of mind. Truly the best native team in Pakistan!'
    },
    {
      name: 'Alexander Schmidt',
      country: 'Germany',
      trip: 'K2 Gondogoro La High Pass Circuit',
      rating: 5,
      date: 'July 2025',
      text: 'Having local Balti guides makes all the difference compared to foreign third-party agencies. They know every crevasse of the Baltoro glacier like the back of their hand. Watching the sunrise from Gondogoro La over 4 eight-thousanders is something I will never forget.'
    },
    {
      name: 'Sarah Jenkins & Team',
      country: 'United Kingdom',
      trip: 'Nanga Parbat & Fairy Meadows Trek',
      rating: 5,
      date: 'September 2025',
      text: 'Flawless logistics from the moment we landed in Islamabad. Our guide and driver were courteous, knowledgeable, and always kept our spirits high. The wooden cabins in Fairy Meadows facing the huge ice wall of Nanga Parbat were simply paradise.'
    }
  ];

  return (
    <section className="py-20 bg-[#f7f8fa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-[#5191fa] mb-1">
            Real Trekker Reviews
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#1a2b48]">
            Trusted by Adventurers Worldwide
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Read authentic feedback from climbers and trekkers who have conquered the Karakoram with Chogori Adventure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col justify-between"
            >
              <div>
                {/* Rating */}
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                  <span className="ml-2 text-xs font-bold text-slate-700">5.0</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic mb-6">
                  &ldquo;{t.text}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-[#1a2b48]">{t.name}</h4>
                  <div className="text-[11px] text-slate-400 font-medium">
                    {t.country} · <span className="text-[#5191fa]">{t.trip}</span>
                  </div>
                </div>
                <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <CheckCircle className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
