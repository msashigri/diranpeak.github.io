import { Tour } from './toursData';

export const EXPEDITION_TOURS: Tour[] = [
  {
    id: 'broad-peak-expedition',
    slug: 'broad-peak-expedition',
    title: 'Broad Peak (8,051m) Climbing Expedition',
    category: 'expedition',
    duration: '50 Days',
    daysCount: 50,
    price: 5500,
    originalPrice: 6200,
    discountPercent: 11,
    rating: 0,
    reviewsCount: 0,
    location: 'Baltoro Glacier, Karakoram, Pakistan',
    maxAltitude: '8,051 m (Broad Peak Summit)',
    groupSize: '4 - 10 Climbers',
    difficulty: 'Extreme',
    featured: true,
    bestSeller: false,
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: 'Full-service climbing logistics for the 12th highest mountain in the world (8,051m) located just 8km from K2 along the Godwin-Austen Glacier.',
    highlights: ['Climb an authentic 8,000m Karakoram giant via West Ridge', 'Direct view of K2 South Face from high camps', 'Full Base Camp logistics with generator, dining tent, and hot meals'],
    included: ['Government climbing permit & royalty fees', 'Liaison Officer expenses & insurance', 'Base camp full board setup & cook', 'High altitude porters (HAP) bonus coverage', 'Domestic transport & airport transfers'],
    excluded: ['Personal climbing equipment', 'Summit bonus for HAP/Sherpa', 'Personal high-altitude oxygen bottles & mask'],
    itinerary: [
      { day: 1, title: 'Arrival in Islamabad', description: 'Briefing at the Alpine Club of Pakistan.' },
      { day: 2, title: 'Flight to Skardu', description: 'Expedition cargo sorting.' },
      { day: 3, title: 'Skardu Preparations', description: 'Final provisioning and packing.' },
      { day: 4, title: 'Drive to Askole', description: 'Jeep caravan along Braldu.' },
      { day: 5, title: 'Trek to Paiju', description: 'Glacier approach.' },
      { day: 6, title: 'Trek to Urdukas & Goro II', description: 'Acclimatization.' },
      { day: 7, title: 'Arrive Broad Peak Base Camp (4,850m)', description: 'Establish base camp.' },
      { day: 8, title: 'Puja Blessing & Base Camp Setup', description: 'Lama / prayer ceremony.' },
      { day: 9, title: 'Rotations to Camp 1 (5,600m)', description: 'Acclimatization climbs.' },
      { day: 10, title: 'Rotations to Camp 2 (6,200m) & Camp 3 (7,100m)', description: 'High camp load carrying.' },
      { day: 25, title: 'Summit Push Window (Days 25-42)', description: 'Climb through the Col to Broad Peak Main Summit (8,051m).' },
      { day: 43, title: 'Base Camp Packing & Clean Up', description: 'Leave No Trace environmental clean up.' },
      { day: 44, title: 'Return Trek via Gondogoro La or Askole', description: 'Descent.' },
      { day: 48, title: 'Drive to Skardu', description: 'Return to civilization.' },
      { day: 49, title: 'Flight to Islamabad & Debriefing', description: 'Debriefing at Alpine Club.' },
      { day: 50, title: 'Homeward Departure', description: 'International flight.' }
    ],
    departures: [
      { id: 'bpe-1', startDate: '20 June 2027', endDate: '08 August 2027', price: 5500, status: 'Guaranteed', seatsLeft: 4 }
    ],
    faqs: [{ question: 'What is the climbing route on Broad Peak?', answer: 'The standard route follows the West Ridge / Northwest Face via Camp 1, 2, and 3 to the Col and Main Summit.' }],
    reviews: []
  },
  {
    id: 'gasherbrum-1-2-expedition',
    slug: 'gasherbrum-1-2-expedition',
    title: 'Gasherbrum I & II (8,080m & 8,035m) Expedition',
    category: 'expedition',
    duration: '50 Days',
    daysCount: 50,
    price: 5800,
    originalPrice: 6500,
    discountPercent: 11,
    rating: 0,
    reviewsCount: 0,
    location: 'Gasherbrum Glacier, Karakoram',
    maxAltitude: '8,080 m (Hidden Peak) / 8,035 m (G-II)',
    groupSize: '4 - 10 Climbers',
    difficulty: 'Extreme',
    featured: true,
    bestSeller: false,
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: 'Expedition to the Shining Wall of the Karakoram, offering options for Gasherbrum II (the safest 8,000er) or the double combination with Gasherbrum I (Hidden Peak).',
    highlights: ['Climb Gasherbrum II standard Southwest Ridge', 'Option for G-I / G-II double summit', 'Shared base camp with international alpine teams'],
    included: ['Government climbing royalties, LO fees, full base camp services, domestic flights'],
    excluded: ['Personal high oxygen, summit bonus'],
    itinerary: [
      { day: 1, title: 'Islamabad', description: 'Briefing.' },
      { day: 2, title: 'Skardu', description: 'Cargo handling.' },
      { day: 3, title: 'Askole to Concordia', description: 'Trek.' },
      { day: 4, title: 'Gasherbrum Base Camp (5,100m)', description: 'Setup camp.' },
      { day: 5, title: 'Gasherbrum Icefall & Camp 1 (5,900m)', description: 'Route opening.' },
      { day: 6, title: 'Camp 2 (6,500m) & Camp 3 (7,400m)', description: 'Acclimatization.' },
      { day: 7, title: 'Summit Push Window', description: 'G-II and G-I summits.' },
      { day: 8, title: 'Return Descent & Islamabad', description: 'Debriefing.' }
    ],
    departures: [
      { id: 'g12-1', startDate: '18 June 2027', endDate: '06 August 2027', price: 5800, status: 'Guaranteed', seatsLeft: 3 }
    ],
    faqs: [{ question: 'Is G-II considered the easiest 8,000m peak in Pakistan?', answer: 'Yes, Gasherbrum II has the lowest fatality rate among Pakistan five 8,000m summits.' }],
    reviews: []
  },
  {
    id: 'spantik-peak-expedition',
    slug: 'spantik-peak-expedition',
    title: 'Spantik Peak (7,027m) Golden Peak Expedition',
    category: 'expedition',
    duration: '30 Days',
    daysCount: 30,
    price: 3800,
    originalPrice: 4200,
    discountPercent: 10,
    rating: 0,
    reviewsCount: 0,
    location: 'Chogo Lungma / Arando, Karakoram',
    maxAltitude: '7,027 m (Spantik Summit)',
    groupSize: '4 - 10 Climbers',
    difficulty: 'Demanding',
    featured: true,
    bestSeller: true,
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: 'The quintessential transition peak for mountaineers aiming for 8,000m. The Southeast Ridge of Spantik features non-technical moderate snow slopes up to a 7,027m summit.',
    highlights: ['Premier 7,000m training expedition in the Karakoram', 'Straightforward snow climbing without rock fall danger', 'Base camp access from Arando village'],
    included: ['Government climbing royalty & permits', 'High altitude tents and mess tent', 'Full board base camp catering', 'Satellite safety tracking'],
    excluded: ['Personal climbing harness, crampons, clothing'],
    itinerary: [
      { day: 1, title: 'Islamabad Arrival', description: 'Briefing.' },
      { day: 2, title: 'Fly to Skardu & Drive to Arando', description: 'Base journey.' },
      { day: 3, title: 'Trek to Spantik Base Camp (4,300m)', description: 'Chogo Lungma Glacier.' },
      { day: 4, title: 'Acclimatization & Puja', description: 'Camp setup.' },
      { day: 5, title: 'Climbing Period (Camp 1, Camp 2, Camp 3)', description: 'Establish high camps.' },
      { day: 6, title: 'Summit Push to Spantik (7,027m)', description: 'Summit climb.' },
      { day: 7, title: 'Descent & Return to Skardu', description: 'Celebration.' },
      { day: 8, title: 'Fly to Islamabad & Departure', description: 'End of expedition.' }
    ],
    departures: [
      { id: 'spe-1', startDate: '01 July 2027', endDate: '30 July 2027', price: 3800, status: 'Guaranteed', seatsLeft: 4 }
    ],
    faqs: [{ question: 'Is oxygen required for Spantik?', answer: 'Most mountaineers climb Spantik without supplemental oxygen due to its accessible 7,027m altitude.' }],
    reviews: []
  },
  {
    id: 'diran-peak-7273-m-expedition',
    slug: 'diran-peak-7273-m-expedition',
    title: 'Diran Peak (7,273m) Expedition',
    category: 'expedition',
    duration: '32 Days',
    daysCount: 32,
    price: 3950,
    originalPrice: 4400,
    discountPercent: 10,
    rating: 0,
    reviewsCount: 0,
    location: 'Minapin Glacier, Nagar, Karakoram',
    maxAltitude: '7,273 m (Diran Peak Summit)',
    groupSize: '4 - 8 Climbers',
    difficulty: 'Extreme',
    featured: true,
    bestSeller: false,
    image: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: 'Our flagship namesake mountain: Diran Peak (7,273m), also known as Minapin Peak, forming the mighty amphitheater opposite Rakaposhi in the heart of Nagar Valley.',
    highlights: ['Climb the famous North Face / Ridge of Diran Peak', 'Base camp access in only 2 days from Karakoram Highway at Minapin', 'Unmatched panoramas of Rakaposhi and Malubiting'],
    included: ['Government peak permit & royalties, Base camp staff and equipment, logistics from Islamabad'],
    excluded: ['Climbing insurance, personal gear'],
    itinerary: [
      { day: 1, title: 'Islamabad Arrival', description: 'Briefing.' },
      { day: 2, title: 'Drive to Gilgit & Minapin Village', description: 'Heart of Nagar.' },
      { day: 3, title: 'Trek to Tagaphari / Diran Base Camp (3,700m)', description: 'Scenic pine meadows.' },
      { day: 4, title: 'Base Camp Setup & Acclimatization', description: 'Route scouting.' },
      { day: 5, title: 'Climbing Period (Camp 1 at 4,800m, Camp 2 at 5,500m, Camp 3 at 6,300m)', description: 'Camp building.' },
      { day: 6, title: 'Summit Assault (7,273m)', description: 'Summit day.' },
      { day: 7, title: 'Descent to Minapin & Drive to Islamabad', description: 'Return trip.' }
    ],
    departures: [
      { id: 'dpe-1', startDate: '25 June 2027', endDate: '26 July 2027', price: 3950, status: 'Guaranteed', seatsLeft: 3 }
    ],
    faqs: [{ question: 'What makes Diran Peak special?', answer: 'Diran is our namesake expedition peak, celebrated for its aesthetic snow pyramid and rich mountaineering history.' }],
    reviews: []
  },
  {
    id: 'laila-peak-expedition',
    slug: 'laila-peak-expedition',
    title: 'Laila Peak (6,096m) Technical Expedition',
    category: 'expedition',
    duration: '25 Days',
    daysCount: 25,
    price: 3200,
    originalPrice: 3600,
    discountPercent: 11,
    rating: 0,
    reviewsCount: 0,
    location: 'Hushe Valley, Baltistan',
    maxAltitude: '6,096 m (Laila Peak Summit)',
    groupSize: '4 - 8 Climbers',
    difficulty: 'Extreme',
    featured: true,
    bestSeller: false,
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: 'One of the most aesthetically striking needle peaks on Earth. Climb the iconic 45 to 55-degree northwest snow and ice face in Hushe Valley.',
    highlights: ['Climb the most needle-shaped mountain in the world', 'Steep sustained alpine ice climbing', 'Pristine base camp in Charakusa / Gondogoro valley'],
    included: ['Peak royalty, base camp logistics, cook, guide, domestic transport'],
    excluded: ['Ice tools, technical rock gear, visa'],
    itinerary: [
      { day: 1, title: 'Islamabad', description: 'Briefing.' },
      { day: 2, title: 'Skardu to Hushe', description: 'Jeep drive.' },
      { day: 3, title: 'Trek to Laila Base Camp', description: 'Gondogoro valley.' },
      { day: 4, title: 'Camp 1 Setup & Route Fixing', description: 'Steep snow couloir.' },
      { day: 5, title: 'Summit Push to 6,096m', description: 'Iconic summit ridge.' },
      { day: 6, title: 'Return Descent to Skardu & Islamabad', description: 'Debrief.' }
    ],
    departures: [
      { id: 'lpe-1', startDate: '01 July 2027', endDate: '25 July 2027', price: 3200, status: 'Guaranteed', seatsLeft: 4 }
    ],
    faqs: [{ question: 'What technical skills are needed?', answer: 'Climbers need solid experience on 50-degree steep snow and water ice.' }],
    reviews: []
  },
  {
    id: 'trango-tower-expedition',
    slug: 'trango-tower-expedition',
    title: 'Trango Tower (Nameless Tower, 6,239m) Expedition',
    category: 'expedition',
    duration: '35 Days',
    daysCount: 35,
    price: 4600,
    originalPrice: 5100,
    discountPercent: 10,
    rating: 0,
    reviewsCount: 0,
    location: 'Baltoro Glacier, Karakoram',
    maxAltitude: '6,239 m (Nameless Tower Summit)',
    groupSize: '2 - 6 Climbers',
    difficulty: 'Extreme',
    featured: true,
    bestSeller: false,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: 'The holy grail of big wall rock climbing. Tackle 1,000 meters of vertical golden granite over the Baltoro Glacier.',
    highlights: ['Worlds largest vertical cliff face', 'Legendary routes: Eternal Flame, British Route', 'Base camp at Trango glacier'],
    included: ['Royalties, big wall base camp, transport, logistics'],
    excluded: ['Haul bags, portaledge, climbing gear'],
    itinerary: [
      { day: 1, title: 'Islamabad', description: 'Briefing.' },
      { day: 2, title: 'Skardu to Askole', description: 'Approach.' },
      { day: 3, title: 'Trek to Trango Base Camp', description: 'Direct camp beneath the spires.' },
      { day: 4, title: 'Big Wall Climbing Period', description: 'Portaledge climbing on sheer granite.' },
      { day: 5, title: 'Summit and Rappel', description: 'Touch the needle top.' },
      { day: 6, title: 'Descent to Askole & Islamabad', description: 'Departure.' }
    ],
    departures: [
      { id: 'tte-1', startDate: '20 June 2027', endDate: '24 July 2027', price: 4600, status: 'Guaranteed', seatsLeft: 2 }
    ],
    faqs: [{ question: 'What grade is the rock?', answer: 'Routes range from 5.11 to 5.13 with extensive aid and mixed sections.' }],
    reviews: []
  },
  {
    id: 'pastore-peak-climbing-expedition',
    slug: 'pastore-peak-climbing-expedition',
    title: 'Pastore Peak (6,209m) Climbing Expedition',
    category: 'expedition',
    duration: '24 Days',
    daysCount: 24,
    price: 2650,
    originalPrice: 2950,
    discountPercent: 10,
    rating: 0,
    reviewsCount: 0,
    location: 'Concordia, Baltoro Glacier',
    maxAltitude: '6,209 m (Pastore Peak Summit)',
    groupSize: '4 - 10 Climbers',
    difficulty: 'Demanding',
    featured: false,
    bestSeller: true,
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: 'A beginner-friendly 6,000m peak situated near Concordia and K2 Base Camp offering an ideal first climbing expedition in the Karakoram.',
    highlights: ['First Karakoram 6,000m summit', 'Stunning close-up view of K2, Broad Peak, and Gasherbrums from summit', 'Trek Baltoro Glacier combined with climb'],
    included: ['Peak permit, Base Camp and High Camp gear, guide, porters, food'],
    excluded: ['Boots, crampons'],
    itinerary: [
      { day: 1, title: 'Islamabad', description: 'Arrival.' },
      { day: 2, title: 'Skardu to Askole', description: 'Jeep.' },
      { day: 3, title: 'Trek to Concordia', description: 'Baltoro Glacier.' },
      { day: 4, title: 'Pastore Base Camp (5,050m)', description: 'Opposite Broad Peak.' },
      { day: 5, title: 'Pastore High Camp & Summit (6,209m)', description: 'Snow and scree climb.' },
      { day: 6, title: 'Return Descent to Askole & Skardu', description: 'Fly home.' }
    ],
    departures: [
      { id: 'ppc-1', startDate: '28 June 2027', endDate: '21 July 2027', price: 2650, status: 'Guaranteed', seatsLeft: 5 }
    ],
    faqs: [{ question: 'Is Pastore Peak suitable for beginners?', answer: 'Yes! It is widely recognized as the best acclimatization peak in the Concordia area.' }],
    reviews: []
  },
  {
    id: 'trek-k2-bc-and-khosar-gang-expedition',
    slug: 'trek-k2-bc-and-khosar-gang-expedition',
    title: 'Trek K2 BC & Khosar Gang (6,040m) Expedition',
    category: 'expedition',
    duration: '26 Days',
    daysCount: 26,
    price: 3100,
    originalPrice: 3500,
    discountPercent: 11,
    rating: 0,
    reviewsCount: 0,
    location: 'Shigar Valley & Baltoro Glacier',
    maxAltitude: '6,040 m (Khosar Gang Summit)',
    groupSize: '4 - 10 Climbers',
    difficulty: 'Demanding',
    featured: true,
    bestSeller: false,
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: 'The ultimate dual-adventure: trek the entire Baltoro Glacier to K2 Base Camp, then cap your journey with a summit of Khosar Gang (6,040m) in Shigar.',
    highlights: ['Double achievement: K2 Base Camp + 6,000m summit', 'Unbeatable acclimatization curve from Baltoro trek', 'Summit view of Haramosh, Spantik, and K2'],
    included: ['Climbing permit, all transfers, camps, guides, meals'],
    excluded: ['Personal gear, visa'],
    itinerary: [
      { day: 1, title: 'Islamabad', description: 'Briefing.' },
      { day: 2, title: 'Skardu to Askole', description: 'Approach.' },
      { day: 3, title: 'Trek to K2 Base Camp', description: 'Full Baltoro trek.' },
      { day: 4, title: 'Return to Shigar Valley', description: 'Rest day at Shigar.' },
      { day: 5, title: 'Khosar Gang High Camp', description: 'Approach climb.' },
      { day: 6, title: 'Khosar Gang Summit (6,040m)', description: 'Summit day.' },
      { day: 7, title: 'Descent to Skardu & Islamabad', description: 'Departure.' }
    ],
    departures: [
      { id: 'k2kg-1', startDate: '20 June 2027', endDate: '15 July 2027', price: 3100, status: 'Guaranteed', seatsLeft: 4 }
    ],
    faqs: [{ question: 'Can I climb Khosar Gang first?', answer: 'Trekking Baltoro first provides natural, effortless acclimatization for the summit.' }],
    reviews: []
  },
  {
    id: 'gondogoro-peak-climbing-expedition',
    slug: 'gondogoro-peak-climbing-expedition',
    title: 'Gondogoro Peak (5,650m) Climbing Expedition',
    category: 'expedition',
    duration: '20 Days',
    daysCount: 20,
    price: 2400,
    originalPrice: 2700,
    discountPercent: 11,
    rating: 0,
    reviewsCount: 0,
    location: 'Hushe Valley, Karakoram',
    maxAltitude: '5,650 m (Gondogoro Peak)',
    groupSize: '4 - 10 Climbers',
    difficulty: 'Moderate',
    featured: false,
    bestSeller: false,
    image: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: 'An introductory climbing peak accessible from the Hushe Valley offering magnificent panoramas of Laila Peak, Masherbrum, and the Gasherbrums.',
    highlights: ['Accessible 5,650m viewpoint climb', 'Overlook Gondogoro Pass and Hushe Glacier', 'Moderate snow and scrambling ascent'],
    included: ['Permits, guides, gear, full board catering'],
    excluded: ['Flights, visa'],
    itinerary: [
      { day: 1, title: 'Islamabad', description: 'Welcome.' },
      { day: 2, title: 'Skardu to Hushe', description: 'Drive.' },
      { day: 3, title: 'Trek to Saicho and Gondogoro Camp', description: 'Valley trek.' },
      { day: 4, title: 'Summit Gondogoro Peak (5,650m)', description: 'Summit day.' },
      { day: 5, title: 'Return Descent', description: 'Fly home.' }
    ],
    departures: [
      { id: 'gpce-1', startDate: '10 July 2027', endDate: '29 July 2027', price: 2400, status: 'Guaranteed', seatsLeft: 5 }
    ],
    faqs: [{ question: 'Are ropes needed?', answer: 'We fix ropes on the short steep snow sections near the summit for total safety.' }],
    reviews: []
  },
  {
    id: 'gangchan-peak-expedition',
    slug: 'gangchan-peak-expedition',
    title: 'Gangchan Peak (6,388m) Expedition',
    category: 'expedition',
    duration: '28 Days',
    daysCount: 28,
    price: 3350,
    originalPrice: 3750,
    discountPercent: 11,
    rating: 0,
    reviewsCount: 0,
    location: 'Basha Valley, Baltistan',
    maxAltitude: '6,388 m (Gangchan Peak)',
    groupSize: '4 - 8 Climbers',
    difficulty: 'Demanding',
    featured: false,
    bestSeller: false,
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: 'A magnificent Karakoram peak rising above the Basha Valley opposite Spantik, offering pristine alpine climbing in an unspoiled valley.',
    highlights: ['Climb 6,388m summit in the remote Basha range', 'Panoramic vista of K2, Broad Peak, and Spantik', 'Traditional Balti porter teamwork'],
    included: ['Climbing royalty, base camp setup, domestic transfers, full catering'],
    excluded: ['Personal climbing kit, tips'],
    itinerary: [
      { day: 1, title: 'Islamabad', description: 'Briefing.' },
      { day: 2, title: 'Skardu to Arando', description: 'Jeep track.' },
      { day: 3, title: 'Trek to Gangchan Base Camp', description: 'Camp setup.' },
      { day: 4, title: 'Climbing Phase (Camp 1 & Camp 2)', description: 'Route fixing.' },
      { day: 5, title: 'Summit Push (6,388m)', description: 'Summit day.' },
      { day: 6, title: 'Descent and Return to Skardu', description: 'Fly home.' }
    ],
    departures: [
      { id: 'gpe-1', startDate: '05 July 2027', endDate: '01 August 2027', price: 3350, status: 'Guaranteed', seatsLeft: 4 }
    ],
    faqs: [{ question: 'Where is Gangchan located?', answer: 'Gangchan is located near Arando village in the Basha Valley of Baltistan.' }],
    reviews: []
  },
  {
    id: 'amin-brak-expedition',
    slug: 'amin-brak-expedition',
    title: 'Amin Brakk (5,850m) Big Wall Expedition',
    category: 'expedition',
    duration: '32 Days',
    daysCount: 32,
    price: 4300,
    originalPrice: 4800,
    discountPercent: 10,
    rating: 0,
    reviewsCount: 0,
    location: 'Nangma Valley, Baltistan',
    maxAltitude: '5,850 m (Amin Brakk Summit)',
    groupSize: '2 - 6 Climbers',
    difficulty: 'Extreme',
    featured: false,
    bestSeller: false,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: 'One of the most intimidating and prestigious big-wall granite spires on earth, featuring a 1,200m vertical and overhanging rock wall in the Nangma Valley.',
    highlights: ['1,200-meter sheer vertical rock spire', 'Nangma Valley fairytale granite amphitheater', 'World-class aid and free climbing routes'],
    included: ['Government peak permit, full base camp infrastructure, transfers'],
    excluded: ['Portaledge, climbing gear, personal food on wall'],
    itinerary: [
      { day: 1, title: 'Islamabad', description: 'Briefing.' },
      { day: 2, title: 'Skardu to Kanday', description: 'Drive.' },
      { day: 3, title: 'Trek to Nangma Base Camp (3,950m)', description: 'Fairytale meadow.' },
      { day: 4, title: 'Wall Climbing Period', description: 'Big-wall climbing.' },
      { day: 5, title: 'Summit and Rappel', description: 'Descent.' },
      { day: 6, title: 'Return to Islamabad', description: 'End of trip.' }
    ],
    departures: [
      { id: 'abe-1', startDate: '25 June 2027', endDate: '26 July 2027', price: 4300, status: 'Guaranteed', seatsLeft: 2 }
    ],
    faqs: [{ question: 'How high is the vertical wall?', answer: 'The sheer vertical headwall of Amin Brakk rises over 1,200 meters from its base.' }],
    reviews: []
  },
  {
    id: 'koyo-zom-expedition',
    slug: 'koyo-zom-expedition',
    title: 'Koyo Zom (6,872m) Hindu Raj Expedition',
    category: 'expedition',
    duration: '30 Days',
    daysCount: 30,
    price: 3700,
    originalPrice: 4100,
    discountPercent: 10,
    rating: 0,
    reviewsCount: 0,
    location: 'Hindu Raj Range, Chitral / Yasin',
    maxAltitude: '6,872 m (Koyo Zom Summit)',
    groupSize: '4 - 8 Climbers',
    difficulty: 'Demanding',
    featured: false,
    bestSeller: false,
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: 'The highest peak in the majestic Hindu Raj range (6,872m), standing on the boundary between Chitral and Gilgit-Baltistan in northern Pakistan.',
    highlights: ['Highest peak of the Hindu Raj mountain chain', 'Untouched remote mountain valleys of Yasin and Chitral', 'Pristine glaciers and unclimbed ridges'],
    included: ['Government climbing permit, all ground logistics, base camp catering, guides'],
    excluded: ['Personal mountaineering gear, insurance'],
    itinerary: [
      { day: 1, title: 'Islamabad Arrival', description: 'Briefing.' },
      { day: 2, title: 'Drive to Chitral or Gilgit', description: 'Approach journey.' },
      { day: 3, title: 'Trek to Koyo Zom Base Camp', description: 'Pechar Glacier.' },
      { day: 4, title: 'Climbing Phase (Camp 1 & Camp 2)', description: 'Route fixing.' },
      { day: 5, title: 'Summit Push (6,872m)', description: 'Summit climb.' },
      { day: 6, title: 'Descent & Return to Islamabad', description: 'Debrief.' }
    ],
    departures: [
      { id: 'kze-1', startDate: '01 July 2027', endDate: '30 July 2027', price: 3700, status: 'Guaranteed', seatsLeft: 4 }
    ],
    faqs: [{ question: 'Where is the Hindu Raj range?', answer: 'The Hindu Raj lies between the Hindu Kush and Karakoram ranges in northern Pakistan.' }],
    reviews: []
  },
  {
    id: 'k2-climbing-expedition',
    slug: 'k2-climbing-expedition',
    title: 'K2 Climbing Expedition (8611m)',
    category: 'expedition',
    duration: '60 Days',
    daysCount: 60,
    price: 8500,
    originalPrice: 9500,
    discountPercent: 10,
    rating: 0,
    reviewsCount: 0,
    location: 'Godwin-Austen Glacier, Karakoram, Pakistan',
    maxAltitude: '8,611 m (K2 Summit)',
    groupSize: '4 - 10 Climbers',
    difficulty: 'Extreme',
    featured: true,
    bestSeller: true,
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: 'Full expedition logistics to ascend the Savage Mountain (8,611m), the second highest and most coveted mountain in the world. Full base camp support along the Godwin-Austen Glacier with Abruzzi Spur / Cesen Route climbing teams.',
    highlights: [
      'Summit K2 (8,611m) via the Abruzzi Spur or Cesen Route',
      'Comprehensive high-altitude base camp with heated dining tent, satellite Wi-Fi, and solar generators',
      'Certified Balti high-altitude porters (HAP) and summit Sherpa teams',
      'Supplemental oxygen logistics (Poisk cylinders and TopOut masks)'
    ],
    included: [
      'Government K2 climbing permit & environmental fees',
      'Liaison Officer allowances, insurance & equipment',
      'Full-board Base Camp and Advanced Base Camp services',
      'High-altitude tents, cooking gear, and rope fixing support',
      'Domestic flights Islamabad - Skardu roundtrip'
    ],
    excluded: [
      'Personal climbing gear (8,000m boots, down suit, crampons)',
      'Personal oxygen cylinders & mask regulator set',
      'Summit bonus for HAP / climbing guides'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Islamabad', description: 'Expedition welcome and Alpine Club briefing.' },
      { day: 2, title: 'Fly to Skardu', description: 'Scenic Karakoram mountain flight.' },
      { day: 3, title: 'Skardu Final Logistics', description: 'Government formalities, oxygen checks, and packing.' },
      { day: 4, title: 'Jeep Drive to Askole / Jhola', description: 'Rugged Karakoram gorge drive.' },
      { day: 5, title: 'Trek to Paiju', description: 'Trek through the Braldu Valley.' },
      { day: 6, title: 'Trek to Urdukas', description: 'Step onto the legendary Baltoro Glacier.' },
      { day: 7, title: 'Trek to Goro II', description: 'Glacial walk surrounded by Masherbrum and Muztagh Tower.' },
      { day: 8, title: 'Arrive Concordia', description: 'Camp at the Throne Room of the Mountain Gods.' },
      { day: 9, title: 'Arrive K2 Base Camp (5,150m)', description: 'Establish main base camp at the foot of K2.' },
      { day: 10, title: 'Base Camp Setup & Puja Ceremony', description: 'Blessing ceremony and team strategy.' },
      { day: 11, title: 'Acclimatization Rotations (Days 11-35)', description: 'Establish Camp 1 (6,050m), Camp 2 (6,700m - House\'s Chimney), Camp 3 (7,350m - Black Pyramid), and Camp 4 (7,800m - Shoulder).' },
      { day: 36, title: 'Summit Push Window (Days 36-50)', description: 'Final push through the Bottleneck and Traverse to K2 Summit (8,611m).' },
      { day: 51, title: 'Descend to Base Camp & Clean Up', description: 'Safe return and Leave-No-Trace environmental cleanup.' },
      { day: 54, title: 'Return Trek via Gondogoro La / Askole', description: 'Trek down the Baltoro.' },
      { day: 57, title: 'Drive to Skardu', description: 'Celebration dinner.' },
      { day: 59, title: 'Fly to Islamabad & Debrief', description: 'Alpine Club debriefing.' },
      { day: 60, title: 'International Departure', description: 'Flight home.' }
    ],
    departures: [
      { id: 'k2e-1', startDate: '15 June 2027', endDate: '13 August 2027', price: 8500, status: 'Guaranteed', seatsLeft: 4 }
    ],
    faqs: [
      { question: 'What is the standard climbing route on K2?', answer: 'The Abruzzi Spur is the most common route, ascending via House\'s Chimney and the Black Pyramid before the Bottleneck serac.' }
    ],
    reviews: []
  },
  {
    id: 'khosar-gang-peak-expedition',
    slug: 'khosar-gang-peak-expedition',
    title: 'Khosar Gang Peak Expedition (6040 m)',
    category: '6000m',
    duration: '18 Days',
    daysCount: 18,
    price: 1950,
    originalPrice: 2200,
    discountPercent: 11,
    rating: 0,
    reviewsCount: 0,
    location: 'Shigar Valley, Karakoram, Pakistan',
    maxAltitude: '6,040 m (Khosar Gang Summit)',
    groupSize: '2 - 12 Climbers',
    difficulty: 'Demanding',
    featured: true,
    bestSeller: true,
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: 'Khosar Gang (6,040m) is Pakistan\'s premier 6,000m climbing training peak, rising gracefully above the lush Shigar Valley. It serves as the ultimate stepping stone for mountaineers preparing for 7,000m and 8,000m Karakoram giants.',
    highlights: [
      'Summit a classic 6,040m Karakoram peak in Shigar Valley',
      'Breathtaking summit panoramas of K2, Broad Peak, Spantik, and the Baltoro wall',
      'Straightforward glacier approach with base camp accessible from Sildi village',
      'Ideal for alpine club climbers and beginner high-altitude mountaineers'
    ],
    included: [
      'Official climbing permit from Government of Gilgit-Baltistan',
      'Licensed English-speaking mountain guide & cook',
      'Base Camp tents, mess tent, and kitchen setup',
      'Porters for group equipment and food transport',
      'All road transport by 4x4 jeeps between Skardu and Sildi'
    ],
    excluded: [
      'Personal mountaineering equipment (harness, crampons, ice axe, double boots)',
      'Personal travel & mountain rescue insurance'
    ],
    itinerary: [
      { day: 1, title: 'Islamabad Arrival', description: 'Briefing and orientation.' },
      { day: 2, title: 'Fly to Skardu', description: 'Scenic flight over Nanga Parbat.' },
      { day: 3, title: 'Skardu Preparations & Acclimatization', description: 'Final gear inspection.' },
      { day: 4, title: 'Drive to Shigar & Sildi Village (2,600m)', description: 'Jeep drive along the Shigar River.' },
      { day: 5, title: 'Trek to Khosar Gang Base Camp (3,800m)', description: 'Hike up through juniper terraces.' },
      { day: 6, title: 'Acclimatization at Base Camp', description: 'Rest and glacier training.' },
      { day: 7, title: 'Establish Camp 1 (4,800m)', description: 'Load carry and route scouting.' },
      { day: 8, title: 'Establish Camp 2 / High Camp (5,200m)', description: 'High camp setup on snow ridge.' },
      { day: 9, title: 'Summit Push: Khosar Gang (6,040m)', description: 'Early morning alpine start. Ascend moderate snow slopes to the 6,040m summit. Panoramic views of K2!' },
      { day: 10, title: 'Weather Contingency Day', description: 'Reserve day for summit.' },
      { day: 11, title: 'Descend to Base Camp', description: 'Return to base camp.' },
      { day: 12, title: 'Trek to Sildi & Drive to Skardu', description: 'Celebration dinner at Serena Shigar Fort.' },
      { day: 13, title: 'Fly to Islamabad', description: 'Return flight.' },
      { day: 14, title: 'Islamabad Sightseeing', description: 'Faisal Mosque and Raja Bazaar.' },
      { day: 15, title: 'Departure', description: 'Transfer to Islamabad Airport.' }
    ],
    departures: [
      { id: 'kge-1', startDate: '10 June 2027', endDate: '24 June 2027', price: 1950, status: 'Guaranteed', seatsLeft: 6 },
      { id: 'kge-2', startDate: '05 July 2027', endDate: '19 July 2027', price: 1950, status: 'Guaranteed', seatsLeft: 4 }
    ],
    faqs: [
      { question: 'Is Khosar Gang suitable for beginner mountaineers?', answer: 'Yes! Khosar Gang (6,040m) has non-technical moderate snow slopes, making it the top choice for your first 6,000m peak.' }
    ],
    reviews: []
  }
];
