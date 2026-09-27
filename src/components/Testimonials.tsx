import React from 'react';
import { Star, ExternalLink } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: 'Roberto Bortoli',
      text: 'We turned to Diran Peak Adventure for the discovery of Northern Pakistan. We did the trek to Nanga Parbat Base Camp and Rakaposhi Base Camp. Then we explored Hunza Valley and Nagar Valley. Everything was perfectly organized including return from Islamabad. Highly recommended to all those who want to discover Pakistan in complete safety and tranquility.'
    },
    {
      name: 'Arnaud Guerit',
      text: 'I had the chance to make the K2 circuit with Imtiaz and I have to say that it has been the most incredible experience in my entire life.You cannot imagine how astonishing this place is. People were incredible and facing K2 was just a wonderful moment'
    },
    {
      name: 'Luis Miguel',
      text: 'Great experience with great professionals...no doubt to repeat as soon as I can....safe....funny...calm and respectful....no doubt...very good agency'
    }
  ];

  return (
    <section className="py-16 bg-[#f7f8fa] border-t border-[#eaeef3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="relative inline-block text-3xl font-semibold text-[#1a2b48] pb-3">
            Our happy clients
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-[3px] bg-[#5191fa] rounded-full" />
          </h2>
          <p className="text-sm text-[#5e6d77] mt-2">
            Real feedback from mountaineers and travelers who explored Pakistan with Diran Peak Adventure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {reviews.map((r, idx) => (
            <div
              key={idx}
              className="bg-white rounded p-6 shadow-sm border border-[#dfdfdf] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-full bg-[#1a2b48] text-white flex items-center justify-center font-bold text-sm">
                    {r.name.trim().charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-base text-[#1a2b48]">
                      {r.name}
                    </h4>
                    <div className="flex text-[#ffdc00] mt-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-sm text-[#5e6d77] leading-relaxed font-normal">
                  {r.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Exact "Read More Reviews" Banner matching BookingCore call-to-action */}
        <div className="bg-[#1a2b48] text-white rounded-lg p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
              Read More Reviews
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Verified Google Reviews &amp; expedition logs from international climbers
            </p>
          </div>

          <a
            href="https://www.google.com/maps/place/Chogori+Adventure+Pakistan/@33.6569451,73.1584339,15z"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 bg-[#5191fa] hover:bg-[#3875dc] text-white font-semibold text-sm uppercase rounded transition-colors whitespace-nowrap flex items-center gap-2"
          >
            <span>More Reviews</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
