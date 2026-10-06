import React, { useState, useMemo } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Compass,
  ShieldCheck,
  Luggage,
  Plane,
  HelpCircle,
  MessageCircle,
  CheckCircle2
} from 'lucide-react';

interface FaqItem {
  id: string;
  category: 'trekking' | 'gear' | 'logistics';
  question: string;
  answer: string;
  highlights?: string[];
}

export const HOME_FAQS: FaqItem[] = [
  // Trekking & Fitness
  {
    id: 'fitness-k2',
    category: 'trekking',
    question: 'How fit do I need to be for trekking to K2 Base Camp or Gondogoro La?',
    answer: 'Trekking along the Baltoro Glacier to K2 Base Camp (5,000m) and crossing the Gondogoro La pass (5,585m) is strenuous and demands solid cardiovascular endurance and leg stamina. You should be comfortable walking 6 to 8 hours daily over uneven rocky moraine, glacial ice, and scree slopes with a light daypack (5-7 kg). We recommend 3 to 4 months of prior preparation with aerobic workouts (running, cycling, stair climbing) and hilly day-hikes wearing weighted backpacks.',
    highlights: [
      '6-8 hours walking per day on glacial terrain',
      'Recommended training: cardiovascular workouts & uphill hiking 3-4 months prior',
      'No technical mountaineering experience required for base camp trek (ropes/crampons provided for pass crossing)'
    ]
  },
  {
    id: 'best-season',
    category: 'trekking',
    question: 'What is the best season for trekking and climbing in the Karakoram?',
    answer: 'The primary trekking and mountaineering season runs from mid-June through late September. July and August offer the most dependable weather, warmest valley temperatures, and optimal snow conditions on high passes like Gondogoro La. September provides crisp crystal-clear skies and magnificent autumn photography in Hunza and Skardu with cooler evening temperatures.',
    highlights: [
      'Mid-June to August: Peak trekking season with long daylight hours',
      'September: Clearest mountain views and dry trail conditions',
      'Winter treks and low-altitude valley tours run during other months on request'
    ]
  },
  {
    id: 'altitude-sickness',
    category: 'trekking',
    question: 'How do you handle altitude sickness (AMS) and acclimatization?',
    answer: 'Our itineraries are carefully designed with built-in acclimatization rest days at Paiju (3,400m) and Urdukas (4,000m) before ascending to Concordia (4,600m). Our senior Balti guides monitor pulse oximeter readings and hydration daily. Every expedition carries emergency bottled medical oxygen, a portable hyperbaric gamow bag, and satellite communications (Garmin inReach) for immediate high-altitude guidance or emergency helicopter evacuation.',
    highlights: [
      'Gradual elevation gain following international mountain medicine protocols',
      'Daily pulse oximeter saturation checks by expedition leaders',
      'Emergency medical oxygen & hyperbaric bags carried on all treks'
    ]
  },

  // Gear & Equipment
  {
    id: 'gear-list',
    category: 'gear',
    question: 'What essential gear and clothing should I pack for high-altitude treks?',
    answer: 'You should dress in a high-performance 4-layer clothing system: moisture-wicking synthetic or merino base layers, insulating fleece mid-layer, windproof/waterproof Gore-Tex shell, and a heavy down jacket (rated to -15°C / -20°C for glacier camps). Sturdy, well-broken-in waterproof trekking boots with ankle support are mandatory. Bring a 4-season sleeping bag (comfort rating -15°C), UV Category 4 glacier sunglasses, trekking poles, headlamp with spare batteries, and personal water purification tablets.',
    highlights: [
      '4-layer clothing system & -15°C expedition down jacket',
      'Rigid trekking boots with ankle support (must be broken in before arrival)',
      'Category 4 glacier sunglasses & 4-season warm sleeping bag'
    ]
  },
  {
    id: 'gear-provided',
    category: 'gear',
    question: 'What equipment is provided by Diran Peak Adventure vs. what I must bring?',
    answer: 'We provide all communal expedition infrastructure: high-grade weatherproof sleeping tents (The North Face or Mountain Hardwear 2-person tents used on single or twin-share basis), spacious mess tents with tables and chairs, private toilet tents, insulated sleeping mats, gas heaters in dining tents at higher camps, kitchen gear, and comprehensive medical kits. You only need to bring your personal clothing, sleeping bag, daypack, and personal toiletries.',
    highlights: [
      'Provided: Heavy-duty mountain tents, mess tent, dining furniture & toilet tents',
      'Provided: All cooking gear, warm meals, safe boiled drinking water & camp lighting',
      'You bring: Personal clothing, trekking boots, sleeping bag, daypack & personal medications'
    ]
  },
  {
    id: 'luggage-weight',
    category: 'gear',
    question: 'What are the luggage weight limits for porters and domestic flights?',
    answer: 'On the trek, each guest is allocated up to 15 kg (33 lbs) of main gear transported by our local Balti porters inside a waterproof duffle bag (which we provide upon arrival in Islamabad or Skardu). You only carry a small daypack (5-7 kg) with daily water, warm layers, camera, and sunscreen. Domestic flights between Islamabad and Skardu allow 20 kg checked baggage plus 7 kg hand luggage; any excess can be safely stored at our secure hotel in Islamabad or Skardu free of charge.',
    highlights: [
      '15 kg main duffle bag carried by dedicated porters',
      'Free durable waterproof expedition duffle bag provided for every guest',
      'Free secure excess luggage storage available at our base hotels'
    ]
  },

  // Travel Logistics & Visas
  {
    id: 'visa-process',
    category: 'logistics',
    question: 'How do I obtain a Pakistan Trekking/Mountaineering Visa and Letter of Invitation (LOI)?',
    answer: 'As an officially licensed and registered tour operator by the Government of Pakistan (DTS License), Diran Peak Adventure issues all official visa support documentation. Upon confirming your booking with a 30% deposit, we issue your official Letter of Invitation (LOI), Department of Tourist Services (DTS) license copy, tour itinerary, and security clearance documents required to apply online via the official Pakistan Nadra e-Visa portal (visa.nadra.gov.pk). Processing takes typically 7 to 14 business days.',
    highlights: [
      'Official LOI & Government DTS tour operator license provided immediately',
      '100% online application via Pakistan e-Visa portal',
      'Dedicated visa team assists you step-by-step through the application'
    ]
  },
  {
    id: 'skardu-flights',
    category: 'logistics',
    question: 'What happens if domestic flights between Islamabad and Skardu are delayed by weather?',
    answer: 'Flights between Islamabad and Skardu or Gilgit operate visually and can occasionally be grounded by monsoon clouds or low mountain visibility. Our itineraries include contingency buffer days. If a flight is canceled, we immediately mobilize our air-conditioned private 4WD Toyota Coasters and jeeps to travel along the scenic Karakoram Highway (KKH) via Babusar Pass or Besham, ensuring your expedition schedule remains on track without missing any trekking days.',
    highlights: [
      'Contingency buffer days built into all expedition itineraries',
      'Immediate overland backup via comfortable private 4WD transport along the Karakoram Highway',
      'No extra charges for overland transit when domestic flights are canceled'
    ]
  },
  {
    id: 'solo-travelers',
    category: 'logistics',
    question: 'Can I join as a solo traveler, and what are the accommodation arrangements?',
    answer: 'Yes! Over 45% of our guests join as solo travelers. You will join a guaranteed departure group of like-minded international adventurers. In hotels in Islamabad and Skardu, standard packages are twin-share with a traveler of the same gender, or you may upgrade to a guaranteed private single room. During the mountain trek, single tent supplements are available at very affordable rates.',
    highlights: [
      'Solo travelers welcomed with guaranteed fixed departure groups',
      'Option for same-gender twin sharing or private single room / tent upgrade',
      'Friendly, multinational team environment with welcoming Balti hospitality'
    ]
  },
  {
    id: 'safety-evacuation',
    category: 'logistics',
    question: 'What emergency medical and helicopter evacuation protocols do you have in place?',
    answer: 'Diran Peak Adventure maintains standing commercial and military emergency helicopter evacuation agreements with Askari Aviation (the authorized high-altitude helicopter rescue operator in Pakistan). In the rare event of a severe medical emergency or injury, our guides contact base camp via satellite phone to dispatch an army rescue helicopter directly to the nearest landing pad on the Baltoro Glacier or Askole, evacuating the patient to a hospital in Skardu or Islamabad.',
    highlights: [
      'Direct coordination with Askari Aviation military rescue helicopters',
      'Mandatory comprehensive medical & helicopter rescue travel insurance required for all guests',
      '24/7 operations monitoring room in Islamabad & Skardu during all active treks'
    ]
  }
];

export const HomeFaq: React.FC<{ onContactClick: () => void }> = ({ onContactClick }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'trekking' | 'gear' | 'logistics'>('all');
  const [expandedId, setExpandedId] = useState<string | null>('fitness-k2');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = useMemo(() => {
    return HOME_FAQS.filter((faq) => {
      const matchCategory = activeCategory === 'all' || faq.category === activeCategory;
      if (!matchCategory) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        faq.question.toLowerCase().includes(q) ||
        faq.answer.toLowerCase().includes(q) ||
        faq.highlights?.some((h) => h.toLowerCase().includes(q))
      );
    });
  }, [activeCategory, searchQuery]);

  const toggleAccordion = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="py-20 bg-[#f7f8fa] border-t border-[#eaeef3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200/60 rounded-full text-[11px] font-bold text-[#5191fa] uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-[#1a2b48] mb-4">
            Everything You Need to Know for Trekking in Pakistan
          </h2>
          <p className="text-xs sm:text-sm text-[#5e6d77] leading-relaxed">
            Planning a Karakoram expedition or valley tour? Here are expert answers to the most common questions regarding physical fitness, high-altitude gear, and travel logistics in Pakistan.
          </p>
        </div>

        {/* Filter Categories & Search Bar */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs">
            {/* Category Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeCategory === 'all'
                    ? 'bg-[#5191fa] text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                All Questions
              </button>
              <button
                onClick={() => setActiveCategory('trekking')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeCategory === 'trekking'
                    ? 'bg-[#5191fa] text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Trekking &amp; Fitness</span>
              </button>
              <button
                onClick={() => setActiveCategory('gear')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeCategory === 'gear'
                    ? 'bg-[#5191fa] text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Luggage className="w-3.5 h-3.5" />
                <span>Gear &amp; Equipment</span>
              </button>
              <button
                onClick={() => setActiveCategory('logistics')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeCategory === 'logistics'
                    ? 'bg-[#5191fa] text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Plane className="w-3.5 h-3.5" />
                <span>Logistics &amp; Visas</span>
              </button>
            </div>

            {/* Quick Keyword Filter */}
            <div className="w-full sm:w-64">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search question keywords..."
                className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#5191fa] focus:bg-white text-slate-800 placeholder-slate-400"
              />
            </div>
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="max-w-4xl mx-auto space-y-3.5">
          {filteredFaqs.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 text-slate-500 text-xs">
              No questions found matching your search. Please contact our team directly for instant answers.
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = expandedId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden transition-all duration-200 hover:border-slate-300"
                >
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between text-left cursor-pointer transition-colors hover:bg-slate-50/60"
                  >
                    <span className="font-heading font-bold text-sm sm:text-base text-[#1a2b48] pr-4 flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-[#5191fa] shrink-0" />
                      <span>{faq.question}</span>
                    </span>
                    <span className="shrink-0 p-1.5 rounded-lg bg-slate-100 text-slate-600">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 border-t border-slate-100 text-slate-600 text-xs sm:text-sm leading-relaxed">
                      <p className="mb-4 text-[#5e6d77]">{faq.answer}</p>

                      {faq.highlights && faq.highlights.length > 0 && (
                        <div className="bg-blue-50/50 rounded-xl p-3.5 border border-blue-100/70">
                          <div className="text-[11px] font-bold text-[#1a2b48] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                            <ShieldCheck className="w-4 h-4 text-[#5191fa]" />
                            <span>Quick Key Highlights</span>
                          </div>
                          <ul className="space-y-1.5">
                            {faq.highlights.map((h, i) => (
                              <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                                <span>{h}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Still Have Questions? Banner */}
        <div className="max-w-4xl mx-auto mt-12 bg-[#1a2b48] rounded-2xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#5191fa] mb-1">
              Still Have Questions About Your Trip?
            </div>
            <h3 className="font-heading text-lg sm:text-xl font-bold text-white mb-2">
              Speak Directly with Our Senior Mountain Expedition Guides
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
              Our native Balti mountaineers are available 24/7 on WhatsApp or email to answer any specific question regarding permits, customized itineraries, dietary needs, or gear suitability.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <a
              href="https://wa.me/923456412992?text=Hello%20Diran%20Peak%20Adventure%2C%20I%20have%20a%20few%20questions%20about%20trekking%20in%20Pakistan."
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-5 py-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
            <button
              onClick={onContactClick}
              className="w-full sm:w-auto px-5 py-2.5 bg-[#5191fa] hover:bg-[#3875dc] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer text-center"
            >
              Send Message
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
