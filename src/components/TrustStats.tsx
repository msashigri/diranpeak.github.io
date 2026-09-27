import React from 'react';

export const TrustStats: React.FC = () => {
  const items = [
    {
      icon: '/src/assets/best-cost.png',
      title: 'Best Cost',
      desc: 'Your Ultimate Travel Experience at the Best Price!'
    },
    {
      icon: '/src/assets/tour-guide.png',
      title: 'Senior Guides',
      desc: 'Expert-Led Journeys Crafted with Wisdom and Personal Touch!'
    },
    {
      icon: '/src/assets/native-company.png',
      title: 'Native Company',
      desc: 'No. 1 Native Travel And Tour Company Authentic Journeys, Local Expertise!'
    },
    {
      icon: '/src/assets/rating-star.png',
      title: '4.9/5',
      desc: 'Achieving a flawless 4.9/5 review score reflects our unwavering commitment to excellence and customer satisfaction.'
    },
    {
      icon: '/src/assets/customer.png',
      title: '10000+ Customers Worlwide',
      desc: 'Trusted by 10,000+ customers worldwide, a testament to our global reach and exceptional service.'
    },
    {
      icon: '/src/assets/trips-completed.png',
      title: '1000+ Trips Completed',
      desc: 'Successfully completed 1,000+ trips, delivering seamless and memorable journeys every time.'
    }
  ];

  return (
    <div className="bravo-featured-item py-14 bg-white border-b border-[#eaeef3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="featured-item flex items-start gap-4 p-2 transition-colors"
            >
              <div className="image shrink-0 w-14 h-14 flex items-center justify-center">
                <img
                  src={item.icon}
                  alt={item.title}
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <div className="content">
                <h3 className="title text-base font-semibold text-[#1a2b48] mb-1">
                  {item.title}
                </h3>
                <div className="desc text-xs text-[#5e6d77] leading-relaxed">
                  {item.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
