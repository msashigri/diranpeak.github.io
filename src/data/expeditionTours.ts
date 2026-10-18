import { Tour } from './toursData';

export const EXPEDITION_TOURS: Tour[] = [
  {
    id: 'k2-climbing-expedition',
    slug: 'k2-climbing-expedition',
    title: 'K2 (8,611 m) Climbing Expedition',
    category: 'expedition',
    duration: '50 Days',
    daysCount: 50,
    price: 9500,
    originalPrice: 10500,
    discountPercent: 10,
    rating: 5.0,
    reviewsCount: 14,
    location: 'Godwin-Austen Glacier, Karakoram, Pakistan',
    maxAltitude: '8,611 m (Savage Mountain Summit)',
    groupSize: '4 - 10 Climbers',
    difficulty: 'Extreme',
    featured: true,
    bestSeller: true,
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: 'The ultimate mountaineering challenge: ascend the King of Mountains via the Abruzzi Spur or Cesen Route under the logistical supervision of veteran Balti high-altitude mountain guides.',
    highlights: [
      'Abruzzi Spur technical climbing and House\'s Chimney pitch',
      'Bottleneck and Serac traverse under the summit block',
      'Dedicated high-altitude Balti mountain guide with supplementary O2 logistics',
      'Government of Pakistan Ministry of Tourism royalty & liaison officer management'
    ],
    included: [
      'Pakistan royalty fees, environmental bond & climbing permits',
      'Military liaison officer accommodation and daily allowances',
      'Basecamp individual tent with foam mattress and solar charging station',
      'Heated dining tent, gourmet basecamp chef, and satellite communication',
      'Askari Aviation helicopter rescue coordination bond'
    ],
    excluded: [
      'Personal 8,000m high-altitude climbing equipment and suit',
      'Personal medical & high-altitude evacuation insurance',
      'Summit bonus for high-altitude climbing guide ($1,500 standard)'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Islamabad', description: 'Meeting with expedition leader and hotel check-in.' },
      { day: 2, title: 'Ministry of Tourism Briefing', description: 'Official briefing at Alpine Club of Pakistan and LO introduction.' },
      { day: 3, title: 'Flight to Skardu', description: 'Scenic flight over Nanga Parbat or drive via Karakoram Highway.' },
      { day: 4, title: 'Skardu Preparations', description: 'Food packing, cargo inspection, and satellite phone clearance.' },
      { day: 5, title: 'Drive to Askole / Jhola', description: '4x4 mountain jeeps along the Braldu Gorge to trailhead.' },
      { day: 6, title: 'Trek to Paiju Camp', description: 'Hike facing the Trango Towers and Cathedral spires.' },
      { day: 7, title: 'Rest & Acclimatization at Paiju', description: 'Porters rest and prepare rations.' },
      { day: 8, title: 'Trek to Urdukas Camp', description: 'Entering the mighty Baltoro Glacier.' },
      { day: 9, title: 'Trek to Goro II', description: 'Camping on the moraine under Masherbrum.' },
      { day: 10, title: 'Trek to Concordia', description: 'Arrive at the Throne Room of the Mountain Gods.' },
      { day: 11, title: 'Trek to K2 Basecamp (5,150 m)', description: 'Establish basecamp beneath the Godwin-Austen glacier.' },
      { day: 12, title: 'Puja Blessing Ceremony & Basecamp Setup', description: 'Balti traditional mountain prayer for safe passage.' },
      { day: 13, title: 'Climbing Period (Camp 1 to Camp 4 Rotations)', description: 'Acclimatization rotations and fixed rope placement on the Abruzzi Spur.' },
      { day: 42, title: 'Summit Window & Descent', description: 'Weather window push to the 8,611m summit and return to Basecamp.' },
      { day: 45, title: 'Basecamp Cleandown & Environmental Clearance', description: 'Clean basecamp protocol and pack cargo for porters.' },
      { day: 46, title: 'Trek back to Askole', description: 'Rapid descent down the Baltoro glacier.' },
      { day: 48, title: 'Drive to Skardu', description: 'Return to civilization, hot showers, and celebratory dinner.' },
      { day: 49, title: 'Flight to Islamabad & Debriefing', description: 'Debriefing at Alpine Club of Pakistan.' },
      { day: 50, title: 'Homeward Flights', description: 'Airport transfer for international return flights.' }
    ],
    departures: [
      { id: 'k2-exp-2027-1', startDate: '15 June 2027', endDate: '03 August 2027', price: 9500, status: 'Available', seatsLeft: 6 },
      { id: 'k2-exp-2027-2', startDate: '20 June 2027', endDate: '08 August 2027', price: 9500, status: 'Available', seatsLeft: 4 }
    ],
    faqs: [
      { question: 'What mountaineering experience is required for K2?', answer: 'Climbers must have verified ascents of at least one other 8,000m peak or multiple challenging 7,000m peaks such as Spantik or Muztagh Ata.' }
    ],
    reviews: []
  },
  {
    id: 'broad-peak-expedition',
    slug: 'broad-peak-expedition',
    title: 'Broad Peak (8,051 m) Climbing Expedition',
    category: 'expedition',
    duration: '45 Days',
    daysCount: 45,
    price: 6800,
    originalPrice: 7500,
    discountPercent: 9,
    rating: 4.9,
    reviewsCount: 11,
    location: 'Godwin-Austen Glacier, Karakoram, Pakistan',
    maxAltitude: '8,051 m',
    groupSize: '4 - 10 Climbers',
    difficulty: 'Extreme',
    featured: true,
    bestSeller: false,
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: 'The 12th highest mountain in the world, Broad Peak stands majestically opposite K2 at Concordia, featuring exceptional classic snow and ridge climbing.',
    highlights: [
      'West Ridge climbing route overlooking the entire Baltoro glacier',
      'Acclimatization hub frequently paired with K2 basecamp visits',
      'Full Balti guiding crew with veteran summits history'
    ],
    included: [
      'All royalty climbing permits and official liaison officer costs',
      'Basecamp private heated mess tent, food, and generator power',
      'Fixed ropes, snow bars, and route fixing team contributions'
    ],
    excluded: [
      'Personal high-altitude down suit & summit bonus'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Islamabad', description: 'Briefing and expedition logistics.' },
      { day: 2, title: 'Ministry Clearance', description: 'Permits and military liaison handover.' },
      { day: 3, title: 'Fly to Skardu', description: 'Arrive in Baltistan heartland.' },
      { day: 5, title: 'Trek to Broad Peak Basecamp', description: 'Approach through Baltoro moraine.' },
      { day: 12, title: 'Climbing Period', description: 'Establish Camp 1, 2, and 3 on the West Ridge.' },
      { day: 38, title: 'Summit Push (8,051 m)', description: 'Traverse the foresummit to main summit.' },
      { day: 42, title: 'Return Trek & Skardu Drive', description: 'Descent and return to Skardu.' },
      { day: 45, title: 'Islamabad Debriefing', description: 'Return flight home.' }
    ],
    departures: [
      { id: 'bp-2027-1', startDate: '18 June 2027', endDate: '01 August 2027', price: 6800, status: 'Available', seatsLeft: 5 }
    ],
    faqs: [
      { question: 'Is supplementary oxygen needed for Broad Peak?', answer: 'Many climbers attempt Broad Peak without supplementary oxygen, but oxygen sets and emergency regulators are stationed at basecamp.' }
    ],
    reviews: []
  },
  {
    id: 'gasherbrum-1-2-expedition',
    slug: 'gasherbrum-1-2-expedition',
    title: 'Gasherbrum I (8,080 m) & II (8,035 m) Expedition',
    category: 'expedition',
    duration: '48 Days',
    daysCount: 48,
    price: 7400,
    originalPrice: 8200,
    discountPercent: 10,
    rating: 4.8,
    reviewsCount: 9,
    location: 'Gasherbrum Glacier, Karakoram, Pakistan',
    maxAltitude: '8,080 m (Hidden Peak)',
    groupSize: '4 - 10 Climbers',
    difficulty: 'Extreme',
    featured: false,
    bestSeller: false,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: 'Climb the Shining Wall of the Karakoram. Gasherbrum II offers the most straightforward 8,000m ascent in Pakistan, often combined with Gasherbrum I.',
    highlights: [
      'Banana Ridge on G2 with classic alpine terrain',
      'Gasherbrum La panoramic views into the Shaksgam Valley',
      'Option to attempt dual 8,000m summits from a single basecamp'
    ],
    included: [
      'Permits for G1 & G2, Liaison officer, basecamp provisions, fixed ropes'
    ],
    excluded: [
      'Personal gear & summit bonus'
    ],
    itinerary: [
      { day: 1, title: 'Islamabad Briefing', description: 'Government briefing and hotel stay.' },
      { day: 4, title: 'Trek to Gasherbrum Basecamp', description: 'Ascend past Concordia into the upper glacier.' },
      { day: 13, title: 'Climbing Phase', description: 'Acclimatization on Banana Ridge and higher camps.' },
      { day: 40, title: 'Summit Window', description: 'Gasherbrum II (8,035m) and G1 (8,080m) pushes.' },
      { day: 48, title: 'Return to Islamabad', description: 'Debriefing and international departure.' }
    ],
    departures: [
      { id: 'g1g2-2027-1', startDate: '22 June 2027', endDate: '08 August 2027', price: 7400, status: 'Available', seatsLeft: 4 }
    ],
    faqs: [
      { question: 'Which peak is climbed first?', answer: 'Gasherbrum II is typically climbed first as an ideal acclimatization summit before Gasherbrum I.' }
    ],
    reviews: []
  },
  {
    id: 'diran-peak-7273-m-expedition',
    slug: 'diran-peak-7273-m-expedition',
    title: 'Diran Peak (7,266 m) North Face Expedition',
    category: 'expedition',
    duration: '32 Days',
    daysCount: 32,
    price: 4200,
    originalPrice: 4800,
    discountPercent: 12,
    rating: 5.0,
    reviewsCount: 16,
    location: 'Minapin Glacier, Nagar Valley, Karakoram',
    maxAltitude: '7,266 m (Diran Summit)',
    groupSize: '4 - 8 Climbers',
    difficulty: 'Extreme',
    featured: true,
    bestSeller: true,
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: 'Our namesake peak: the spectacular snow-pyramid of Diran standing majestically above the Minapin Glacier and Taghafari meadows in Nagar Valley.',
    highlights: [
      'Our ancestral home mountain with unmatched local Balti & Hunza expertise',
      'Taghafari Basecamp set amidst lush alpine meadows beneath giant icefalls',
      'Direct technical climbing on the Northwest Ridge'
    ],
    included: [
      'All Gilgit-Baltistan climbing royalties and government permits',
      'Private Taghafari basecamp with hot meals and mountain guides',
      '4x4 transport along the scenic Karakoram Highway'
    ],
    excluded: [
      'Personal climbing rack and sleeping gear'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Islamabad', description: 'Briefing and overnight stay.' },
      { day: 2, title: 'Fly to Gilgit', description: 'Flight along Nanga Parbat to Gilgit.' },
      { day: 3, title: 'Drive to Minapin, Nagar Valley', description: 'Scenic drive along Hunza River to Minapin village.' },
      { day: 4, title: 'Trek to Taghafari Basecamp (3,261 m)', description: 'Ascend pine forests to emerald meadows facing Diran.' },
      { day: 5, title: 'Climbing Period (Camps 1, 2, 3)', description: 'Ascend the Minapin Glacier and North Ridge.' },
      { day: 26, title: 'Summit Push (7,266 m)', description: 'Reach the iconic snow pyramid summit.' },
      { day: 29, title: 'Descent to Minapin', description: 'Return to village and celebration.' },
      { day: 32, title: 'Return to Islamabad', description: 'Debriefing and international departure.' }
    ],
    departures: [
      { id: 'diran-2027-1', startDate: '05 July 2027', endDate: '05 August 2027', price: 4200, status: 'Guaranteed', seatsLeft: 4 }
    ],
    faqs: [
      { question: 'Where is Diran Peak located?', answer: 'Diran Peak is located in the Nagar Valley of Gilgit-Baltistan, adjacent to Rakaposhi.' }
    ],
    reviews: []
  },
  {
    id: 'khosar-gang-peak-expedition',
    slug: 'khosar-gang-peak-expedition',
    title: 'Khosar Gang Peak (6,040 m) Winter & Summer Climb',
    category: '6000m',
    duration: '14 Days',
    daysCount: 14,
    price: 1850,
    originalPrice: 2100,
    discountPercent: 12,
    rating: 4.9,
    reviewsCount: 18,
    location: 'Shigar Valley, Karakoram, Pakistan',
    maxAltitude: '6,040 m',
    groupSize: '2 - 10 Climbers',
    difficulty: 'Demanding',
    featured: true,
    bestSeller: true,
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: 'The premier 6,000-meter introductory peak in the Karakoram. Ideal for aspiring mountaineers transitioning from trekking to high-altitude mountaineering.',
    highlights: [
      'Non-technical snow climbing with crampons and ice axe',
      'Panoramic summit views of K2, Broad Peak, and Spantik',
      'Short approach from Shigar Valley near Skardu'
    ],
    included: [
      'All climbing permits, guides, tents, meals, and Skardu transfers'
    ],
    excluded: [
      'Personal boots & crampons'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Islamabad', description: 'Briefing and Skardu flight.' },
      { day: 3, title: 'Drive to Shigar & Sildi', description: 'Approach through fertile apricot orchards.' },
      { day: 4, title: 'Trek to Khosar Gang Basecamp', description: 'Establish basecamp at 3,800m.' },
      { day: 5, title: 'Camp 1 & Summit Acclimatization', description: 'High camp practice.' },
      { day: 9, title: 'Summit Push (6,040 m)', description: 'Alpine start to the pristine snow summit.' },
      { day: 11, title: 'Descent to Skardu', description: 'Relax at historic Shigar Fort.' },
      { day: 14, title: 'Islamabad & Homeward Departure', description: 'End of expedition.' }
    ],
    departures: [
      { id: 'kg-2027-1', startDate: '10 July 2027', endDate: '23 July 2027', price: 1850, status: 'Guaranteed', seatsLeft: 6 },
      { id: 'kg-2027-2', startDate: '01 August 2027', endDate: '14 August 2027', price: 1850, status: 'Available', seatsLeft: 5 }
    ],
    faqs: [
      { question: 'Is prior climbing experience required?', answer: 'Basic knowledge of crampon usage is helpful, but our Balti guides provide complete snow training at basecamp.' }
    ],
    reviews: []
  },
  {
    id: 'spantik-peak-expedition',
    slug: 'spantik-peak-expedition',
    title: 'Spantik Peak "Golden Peak" (7,027 m) Expedition',
    category: 'expedition',
    duration: '30 Days',
    daysCount: 30,
    price: 4200,
    originalPrice: 4800,
    discountPercent: 12,
    rating: 4.9,
    reviewsCount: 16,
    location: 'Basha Valley, Karakoram, Pakistan',
    maxAltitude: '7,027 m (Golden Peak Summit)',
    groupSize: '4 - 10 Climbers',
    difficulty: 'Demanding',
    featured: true,
    bestSeller: true,
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: 'Ascend the legendary Golden Peak (7,027 m) via the relatively accessible Southeast Ridge from the Basha Valley. The perfect 7,000m stepping-stone peak before tackling an eight-thousander.',
    highlights: [
      'The famed Southeast Ridge with low objective danger',
      'Spectacular views across Chogo Lungma glacier to K2, Broad Peak, and Haramosh',
      'Pristine cultural approach through traditional Balti stone villages in Basha',
      'High guide-to-climber ratio with experienced Balti summit leaders'
    ],
    included: [
      'Government of Pakistan climbing permit & royalty fees',
      'Military liaison officer management and allowances',
      'Basecamp and advanced basecamp logistics with heated mess tent',
      'All high altitude group gear (fixed ropes, snow pickets, ice screws)',
      'Satellite phone and inReach SOS tracking'
    ],
    excluded: [
      'Personal 7,000m high-altitude gear and down suit',
      'Personal climbing and emergency medical evacuation insurance'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Islamabad', description: 'Expedition welcome and hotel check-in.', altitude: '540 m' },
      { day: 2, title: 'Ministry of Tourism Briefing', description: 'Briefing at Alpine Club of Pakistan with Liaison Officer.', altitude: '540 m' },
      { day: 3, title: 'Scenic Flight or Drive to Skardu', description: 'Flight along Nanga Parbat or drive the Indus gorge.', altitude: '2,228 m' },
      { day: 4, title: 'Skardu Gear Check & Final Packing', description: 'Inspection of high-altitude rations and climbing logistics.', altitude: '2,228 m' },
      { day: 5, title: 'Jeep Drive to Arando Village', description: '4x4 drive along the rugged Basha River to terminal village.', altitude: '2,700 m' },
      { day: 6, title: 'Trek to Chogo Brangsa Camp', description: 'Follow lateral moraine of Chogo Lungma Glacier.', altitude: '3,400 m' },
      { day: 7, title: 'Trek to Bolocho Camp', description: 'Hike across lateral moraine beneath Spantik walls.', altitude: '3,800 m' },
      { day: 8, title: 'Trek to Spantik Base Camp (4,300 m)', description: 'Establish base camp on green alpine terrace.', altitude: '4,300 m' },
      { day: 9, title: 'Base Camp Puja Blessing & Acclimatization', description: 'Balti mountain blessing ceremony and gear sorting.', altitude: '4,300 m' },
      { day: 10, title: 'Establish Camp 1 (5,100 m)', description: 'Ascend snowy ridge and cache high-altitude rations.', altitude: '5,100 m' },
      { day: 14, title: 'Establish Camp 2 (5,600 m)', description: 'Technical snow climbing on the Southeast Ridge.', altitude: '5,600 m' },
      { day: 18, title: 'Establish Camp 3 (6,250 m)', description: 'High camp setup on the broad snow plateau.', altitude: '6,250 m' },
      { day: 22, title: 'Summit Push (7,027 m)', description: 'Alpine midnight start to the summit of Spantik.', altitude: '7,027 m' },
      { day: 25, title: 'Descent to Base Camp', description: 'Safely descend all high camps and pack basecamp.', altitude: '4,300 m' },
      { day: 27, title: 'Trek Back to Arando', description: 'Return hike across the Chogo Lungma moraine.', altitude: '2,700 m' },
      { day: 28, title: 'Jeep Drive to Skardu', description: 'Relax at hotel and hot shower celebration.', altitude: '2,228 m' },
      { day: 29, title: 'Flight to Islamabad & Debriefing', description: 'Debriefing at Alpine Club of Pakistan.', altitude: '540 m' },
      { day: 30, title: 'Homeward Bound Departure', description: 'Transfer to Islamabad International Airport.', altitude: '540 m' }
    ],
    departures: [
      { id: 'spk-2027-1', startDate: '01 July 2027', endDate: '30 July 2027', price: 4200, status: 'Guaranteed', seatsLeft: 5 },
      { id: 'spk-2027-2', startDate: '01 August 2027', endDate: '30 August 2027', price: 4200, status: 'Available', seatsLeft: 6 }
    ],
    faqs: [
      { question: 'What grade is the Spantik Southeast Ridge?', answer: 'The route is graded PD+ to AD (Alpine Grade) with moderate snow slopes of 35-45 degrees, making it the ideal 7,000m progression peak.' }
    ],
    reviews: []
  },
  {
    id: 'pastore-peak-climbing-expedition',
    slug: 'pastore-peak-climbing-expedition',
    title: 'Pastore Peak (6,209 m) Climbing Expedition',
    category: '6000m',
    duration: '18 Days',
    daysCount: 18,
    price: 2350,
    originalPrice: 2650,
    discountPercent: 11,
    rating: 4.9,
    reviewsCount: 14,
    location: 'Concordia & Baltoro Glacier, Karakoram, Pakistan',
    maxAltitude: '6,209 m',
    groupSize: '2 - 10 Climbers',
    difficulty: 'Demanding',
    featured: true,
    bestSeller: true,
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: 'Perched immediately opposite K2 and Broad Peak above Concordia, Pastore Peak offers one of the most stunning 6,000m non-technical climbs in the Karakoram range.',
    highlights: [
      'Climb directly across the throne room of Concordia facing K2 South Face',
      'Non-technical snow climbing with rope team and crampon progression',
      'Combine the iconic Baltoro Glacier trek with a true Himalayan 6,000m summit',
      'Full Balti mountaineering support crew with certified lead guide'
    ],
    included: [
      'Climbing permit, environmental fee, guide, and porter logistics',
      'Full board meals throughout trek and mountain camps',
      'Skardu hotel accommodation and 4x4 mountain jeeps'
    ],
    excluded: [
      'Personal mountaineering boots, harness, crampons, and ice axe'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Islamabad', description: 'Expedition welcome and hotel check-in.', altitude: '540 m' },
      { day: 2, title: 'Fly to Skardu (2,228 m)', description: 'Spectacular mountain flight past Nanga Parbat.', altitude: '2,228 m' },
      { day: 3, title: 'Jeep Drive to Askole', description: '4x4 transit along Braldu Gorge to the trailhead.', altitude: '3,048 m' },
      { day: 4, title: 'Trek to Jhola Camp', description: 'Follow Braldu and Dumordo river confluence.', altitude: '3,100 m' },
      { day: 5, title: 'Trek to Paiju Camp', description: 'Resting beside willow groves under Paiju Peak.', altitude: '3,450 m' },
      { day: 6, title: 'Trek to Urdukas Camp', description: 'Enter Baltoro Glacier moraine opposite Trango.', altitude: '4,050 m' },
      { day: 7, title: 'Trek to Goro II', description: 'Hike the ice highway with Masherbrum towering above.', altitude: '4,300 m' },
      { day: 8, title: 'Trek to Concordia', description: 'Arrive at the Throne Room of the Mountain Gods.', altitude: '4,691 m' },
      { day: 9, title: 'Trek to Pastore Peak Base Camp', description: 'Establish base camp beneath Pastore Peak ridge.', altitude: '4,900 m' },
      { day: 10, title: 'High Camp Staging & Route Inspection', description: 'Ascend to high camp on the snow col.', altitude: '5,400 m' },
      { day: 11, title: 'Summit Push: Pastore Peak (6,209 m)', description: 'Alpine climb to summit with 360° views of K2, Broad Peak & G1.', altitude: '6,209 m' },
      { day: 12, title: 'Reserve Weather Day / Descent', description: 'Descent to Concordia Base Camp.', altitude: '4,691 m' },
      { day: 13, title: 'Trek Back to Goro I', description: 'Begin return hike across Baltoro.', altitude: '4,100 m' },
      { day: 14, title: 'Trek to Paiju', description: 'Descend to comfortable willow oasis.', altitude: '3,450 m' },
      { day: 15, title: 'Trek to Askole', description: 'Final walking stage and celebration with Balti porters.', altitude: '3,048 m' },
      { day: 16, title: 'Jeep to Skardu', description: 'Hot shower and farewell dinner.', altitude: '2,228 m' },
      { day: 17, title: 'Fly to Islamabad', description: 'Debriefing and capital sightseeing.', altitude: '540 m' },
      { day: 18, title: 'Departure Flight', description: 'Transfer to airport for homeward journey.', altitude: '540 m' }
    ],
    departures: [
      { id: 'pst-2027-1', startDate: '15 June 2027', endDate: '02 July 2027', price: 2350, status: 'Guaranteed', seatsLeft: 6 },
      { id: 'pst-2027-2', startDate: '10 July 2027', endDate: '27 July 2027', price: 2350, status: 'Filling Fast', seatsLeft: 4 }
    ],
    faqs: [
      { question: 'How technical is Pastore Peak?', answer: 'Pastore Peak is a PD- grade climb requiring crampons, ice axe, and roped glacier travel, but no vertical rock or ice climbing.' }
    ],
    reviews: []
  },
  {
    id: 'laila-peak-expedition',
    slug: 'laila-peak-expedition',
    title: 'Laila Peak (6,096 m) Technical Climbing Expedition',
    category: '6000m',
    duration: '24 Days',
    daysCount: 24,
    price: 3450,
    originalPrice: 3800,
    discountPercent: 9,
    rating: 5.0,
    reviewsCount: 11,
    location: 'Hushe Valley, Karakoram, Pakistan',
    maxAltitude: '6,096 m',
    groupSize: '2 - 8 Climbers',
    difficulty: 'Extreme',
    featured: true,
    bestSeller: false,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: 'The needle-sharp spear of Laila Peak (6,096 m) is regarded by climbers as the most beautiful mountain on Earth. A steep, technical alpine objective in Hushe Valley.',
    highlights: [
      'Ascend the iconic 45-55° Northwest face with mixed ice and snow pitches',
      'Spectacular views across Gondogoro Glacier, K2, Broad Peak, and Chogolisa',
      'Trek through the welcoming Balti stone villages of Machulo and Hushe',
      'Fixed rope systems managed by high-altitude Balti mountain leaders'
    ],
    included: [
      'Climbing royalty permits, environmental bonds, and liaison management',
      'High camp tents, fixed ropes, snow anchors, and mess facilities',
      'Full porter support from Hushe to Base Camp and return'
    ],
    excluded: [
      'Personal climbing gear (ice tools, high-altitude boots, harness)'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Islamabad', description: 'Briefing and expedition logistics.', altitude: '540 m' },
      { day: 2, title: 'Fly to Skardu', description: 'Mountain flight over Indus river basin.', altitude: '2,228 m' },
      { day: 3, title: 'Drive to Hushe Village', description: 'Scenic drive through Khaplu and Shyok Valley.', altitude: '3,050 m' },
      { day: 4, title: 'Trek to Saicho Camp', description: 'Gentle hike along the Hushe and Charakusa rivers.', altitude: '3,350 m' },
      { day: 5, title: 'Trek to Khuspang Camp', description: 'Hike to the foot of the Gondogoro glacier.', altitude: '4,680 m' },
      { day: 6, title: 'Establish Laila Peak Base Camp', description: 'Set up camp directly below the spear face.', altitude: '4,750 m' },
      { day: 7, title: 'Route Reconnaissance & Puja', description: 'Blessing ceremony and gear inspection.', altitude: '4,750 m' },
      { day: 9, title: 'Establish Camp 1 (5,300 m)', description: 'Ascend snow gully and fix lower ropes.', altitude: '5,300 m' },
      { day: 13, title: 'Establish Camp 2 (5,700 m)', description: 'Technical climbing on steep 50-degree snow and ice.', altitude: '5,700 m' },
      { day: 17, title: 'Summit Push: Laila Peak (6,096 m)', description: 'Alpine ascent to the needle summit.', altitude: '6,096 m' },
      { day: 20, title: 'Pack Base Camp & Descend to Saicho', description: 'Rappel down and descend moraine.', altitude: '3,350 m' },
      { day: 21, title: 'Trek to Hushe & Drive to Skardu', description: 'Return to civilization and celebration.', altitude: '2,228 m' },
      { day: 23, title: 'Fly to Islamabad', description: 'Alpine Club debriefing.', altitude: '540 m' },
      { day: 24, title: 'International Departure', description: 'Homeward flight.', altitude: '540 m' }
    ],
    departures: [
      { id: 'lai-2027-1', startDate: '20 June 2027', endDate: '13 July 2027', price: 3450, status: 'Guaranteed', seatsLeft: 4 }
    ],
    faqs: [
      { question: 'What technical climbing skills are needed?', answer: 'Climbers should be proficient in steep snow/ice climbing up to 55 degrees, front-pointing with crampons, and jumaring on fixed ropes.' }
    ],
    reviews: []
  },
  {
    id: 'trango-tower-expedition',
    slug: 'trango-tower-expedition',
    title: 'Trango Tower "Nameless Tower" (6,239 m) Expedition',
    category: 'expedition',
    duration: '30 Days',
    daysCount: 30,
    price: 4600,
    originalPrice: 5200,
    discountPercent: 12,
    rating: 5.0,
    reviewsCount: 8,
    location: 'Baltoro Glacier, Karakoram, Pakistan',
    maxAltitude: '6,239 m',
    groupSize: '2 - 6 Climbers',
    difficulty: 'Extreme',
    featured: true,
    bestSeller: false,
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: 'The holy grail of big wall rock climbing. Tackle the iconic 1,000-meter vertical granite headwall of Nameless Tower (6,239 m) above the Baltoro Glacier.',
    highlights: [
      'Climb the largest vertical sheer granite monolith on the planet',
      'World-famous routes including Eternal Flame and British Route',
      'Base camp right across the roaring ice of Baltoro opposite Paiju Peak',
      'Full portaledge support, haul bags, and big wall logistics'
    ],
    included: [
      'Government climbing royalty fees and permits',
      'Liaison officer allowances and Base Camp infrastructure',
      'Full porter support from Askole to Trango Base Camp and back'
    ],
    excluded: [
      'Personal big wall climbing gear, portaledges, and climbing racks'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Islamabad', description: 'Meet expedition director and transfer to hotel.', altitude: '540 m' },
      { day: 2, title: 'Ministry of Tourism Briefing', description: 'Briefing with ACP and expedition permit issuance.', altitude: '540 m' },
      { day: 3, title: 'Fly to Skardu', description: 'Scenic Karakoram mountain flight.', altitude: '2,228 m' },
      { day: 5, title: 'Jeep to Askole', description: 'Travel to the gateway of the Baltoro.', altitude: '3,048 m' },
      { day: 6, title: 'Trek to Jhola Camp', description: 'Hike through Braldu Canyon.', altitude: '3,100 m' },
      { day: 7, title: 'Trek to Paiju Camp', description: 'View the Cathedral Towers and Trango group.', altitude: '3,450 m' },
      { day: 8, title: 'Establish Trango Base Camp (4,100 m)', description: 'Ascend Trango Glacier gully to the base of the towers.', altitude: '4,100 m' },
      { day: 10, title: 'Advance Base Camp & Route Fixing', description: 'Haul gear to the base of the granite pillar.', altitude: '5,100 m' },
      { day: 15, title: 'Big Wall Climbing Period', description: 'Ascend pitches, set portaledge camp, and fix upper pitches.', altitude: '5,800 m' },
      { day: 22, title: 'Summit Push: Nameless Tower (6,239 m)', description: 'Reach the needle summit of the world’s greatest rock monolith.', altitude: '6,239 m' },
      { day: 24, title: 'Rappel & Wall Clean Up', description: 'Clean ropes, gear, and return to Trango Base Camp.', altitude: '4,100 m' },
      { day: 26, title: 'Trek Back to Askole', description: 'Return via Paiju and Jhola.', altitude: '3,048 m' },
      { day: 28, title: 'Drive to Skardu', description: 'Hot shower and celebratory feast.', altitude: '2,228 m' },
      { day: 29, title: 'Flight to Islamabad', description: 'Debriefing and capital relaxation.', altitude: '540 m' },
      { day: 30, title: 'Fly Home', description: 'International departure.', altitude: '540 m' }
    ],
    departures: [
      { id: 'trg-2027-1', startDate: '01 July 2027', endDate: '30 July 2027', price: 4600, status: 'Guaranteed', seatsLeft: 4 }
    ],
    faqs: [
      { question: 'What climbing grade is Trango Tower?', answer: 'Standard routes range from 5.11 to 5.12c (7a to 7c) with aid climbing up to A2 on high altitude granite.' }
    ],
    reviews: []
  },
  {
    id: 'gondogoro-peak-climb',
    slug: 'gondogoro-peak-climb',
    title: 'Gondogoro Peak (5,650 m) Acclimatization Climb',
    category: '6000m',
    duration: '16 Days',
    daysCount: 16,
    price: 1950,
    originalPrice: 2200,
    discountPercent: 11,
    rating: 4.8,
    reviewsCount: 12,
    location: 'Hushe & Gondogoro Valley, Karakoram, Pakistan',
    maxAltitude: '5,650 m',
    groupSize: '2 - 10 Climbers',
    difficulty: 'Demanding',
    featured: false,
    bestSeller: true,
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: 'An accessible, non-technical Karakoram summit offering front-row vistas of K2, Gasherbrum, Broad Peak, and the needle of Laila Peak from the summit ridge.',
    highlights: [
      'Summit a classic 5,650-meter alpine peak without bureaucratic royalty fees',
      'Trek through Hushe valley with panoramic Balti cultural immersion',
      'Panoramic view over Gondogoro La and Charakusa Valley granite amphitheater'
    ],
    included: [
      'Trek permit, mountain guide, cooks, porters, camping gear, and meals'
    ],
    excluded: [
      'Personal trekking boots and personal insurance'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Islamabad', description: 'Briefing and hotel check-in.', altitude: '540 m' },
      { day: 2, title: 'Fly to Skardu', description: 'Scenic Indus flight past Nanga Parbat.', altitude: '2,228 m' },
      { day: 3, title: 'Drive to Hushe Village', description: '4x4 mountain jeeps along the Shyok river.', altitude: '3,050 m' },
      { day: 4, title: 'Trek to Saicho Camp', description: 'Hike between willow trees beside glacial streams.', altitude: '3,350 m' },
      { day: 5, title: 'Trek to Gondogoro Base Camp', description: 'Establish base camp facing Laila Peak.', altitude: '4,400 m' },
      { day: 6, title: 'Acclimatization & Snow Practice', description: 'Rope handling and crampon review.', altitude: '4,400 m' },
      { day: 8, title: 'Ascent to High Camp', description: 'Climb moraine and establish high camp.', altitude: '5,050 m' },
      { day: 9, title: 'Summit Push: Gondogoro Peak (5,650 m)', description: 'Early morning climb to summit with 360° Karakoram panorama.', altitude: '5,650 m' },
      { day: 11, title: 'Descent to Saicho', description: 'Relaxed walk down the valley.', altitude: '3,350 m' },
      { day: 13, title: 'Trek to Hushe & Drive to Skardu', description: 'Celebratory dinner with Balti crew.', altitude: '2,228 m' },
      { day: 15, title: 'Fly to Islamabad', description: 'Capital sightseeing.', altitude: '540 m' },
      { day: 16, title: 'Departure Flight', description: 'Transfer to airport.', altitude: '540 m' }
    ],
    departures: [
      { id: 'gnd-2027-1', startDate: '05 July 2027', endDate: '20 July 2027', price: 1950, status: 'Guaranteed', seatsLeft: 6 }
    ],
    faqs: [
      { question: 'Is Gondogoro Peak suitable for first-time mountaineers?', answer: 'Yes! It requires moderate fitness and basic crampon use, making it one of the friendliest alpine summits in the Karakoram.' }
    ],
    reviews: []
  },
  {
    id: 'amin-brakk-expedition',
    slug: 'amin-brakk-expedition',
    title: 'Amin Brakk (5,850 m) Great Wall Rock Climbing Expedition',
    category: '6000m',
    duration: '28 Days',
    daysCount: 28,
    price: 3800,
    originalPrice: 4300,
    discountPercent: 12,
    rating: 5.0,
    reviewsCount: 7,
    location: 'Nangma Valley, Karakoram, Pakistan',
    maxAltitude: '5,850 m',
    groupSize: '2 - 6 Climbers',
    difficulty: 'Extreme',
    featured: false,
    bestSeller: false,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: 'Located in the dramatic Nangma Valley (Pakistan\'s Yosemite), Amin Brakk features a 1,200-meter overhanging granite wall that tests the world\'s finest aid and free climbers.',
    highlights: [
      'Climb the sheer granite headwall of Amin Brakk in the magical Nangma Valley',
      'Portaledge camping suspended hundreds of meters above the Nangma glacier',
      'Short 2-day approach from the village of Kanday'
    ],
    included: [
      'Climbing permits, basecamp infrastructure, mess tent, porters, and all food'
    ],
    excluded: [
      'Personal climbing racks, portaledges, and hauling gear'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Islamabad', description: 'Expedition reception and hotel check-in.', altitude: '540 m' },
      { day: 2, title: 'Fly to Skardu', description: 'Scenic Karakoram flight.', altitude: '2,228 m' },
      { day: 3, title: 'Drive to Kanday Village', description: 'Transit through Khaplu and Shyok river valley.', altitude: '2,900 m' },
      { day: 4, title: 'Trek to Mingulo Broq', description: 'Hike through pastures into Nangma Valley.', altitude: '3,400 m' },
      { day: 5, title: 'Trek to Nangma Base Camp', description: 'Surrounded by granite spires and vertical walls.', altitude: '3,950 m' },
      { day: 6, title: 'Advance Base Camp Setup', description: 'Haul gear to the foot of Amin Brakk wall.', altitude: '4,500 m' },
      { day: 10, title: 'Big Wall Climbing on Amin Brakk', description: 'Vertical aid and free climbing, hauling bags to portaledge bivouacs.', altitude: '5,200 m' },
      { day: 20, title: 'Summit Push: Amin Brakk (5,850 m)', description: 'Top out on the spectacular granite summit.', altitude: '5,850 m' },
      { day: 23, title: 'Rappel Wall & Base Camp Packing', description: 'Safe retreat and cleaning the wall.', altitude: '3,950 m' },
      { day: 25, title: 'Trek to Kanday & Drive to Skardu', description: 'Celebration dinner.', altitude: '2,228 m' },
      { day: 27, title: 'Fly to Islamabad', description: 'Debriefing.', altitude: '540 m' },
      { day: 28, title: 'Homeward Departure', description: 'Airport transfer.', altitude: '540 m' }
    ],
    departures: [
      { id: 'amb-2027-1', startDate: '10 July 2027', endDate: '06 August 2027', price: 3800, status: 'Guaranteed', seatsLeft: 4 }
    ],
    faqs: [
      { question: 'What style of climbing is Amin Brakk?', answer: 'Amin Brakk involves big wall aid and hard free climbing on vertical to overhanging granite, typically graded A3 to A4, 5.11+.' }
    ],
    reviews: []
  },
  {
    id: 'koyo-zom-expedition',
    slug: 'koyo-zom-expedition',
    title: 'Koyo Zom (6,872 m) Hindu Raj Expedition',
    category: 'expedition',
    duration: '25 Days',
    daysCount: 25,
    price: 3900,
    originalPrice: 4400,
    discountPercent: 11,
    rating: 4.9,
    reviewsCount: 9,
    location: 'Yarkhun Valley & Chitral, Hindu Raj, Pakistan',
    maxAltitude: '6,872 m',
    groupSize: '4 - 10 Climbers',
    difficulty: 'Strenuous',
    featured: false,
    bestSeller: false,
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: 'The highest summit in the rugged Hindu Raj range, standing majestically on the boundary between Chitral and Gilgit-Baltistan with breathtaking vistas of Tirich Mir and the Pamirs.',
    highlights: [
      'Climb the monarch of the Hindu Raj mountain range',
      'Approach through remote Wakhi and Khowar valleys of Upper Chitral',
      'Untouched alpine climbing route with minimal traffic and pristine solitude'
    ],
    included: [
      'Permits, liaison officer, local guides, porters, food, and high camp gear'
    ],
    excluded: [
      'Personal 7,000m clothing and high-altitude boots'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Islamabad', description: 'Briefing and expedition logistics.', altitude: '540 m' },
      { day: 2, title: 'Drive to Chitral via Lowari Tunnel', description: 'Scenic drive into the Hindu Kush foothills.', altitude: '1,500 m' },
      { day: 4, title: 'Drive to Mastuj & Gazin', description: 'Transit through Yarkhun Valley.', altitude: '2,800 m' },
      { day: 5, title: 'Trek to Koyo Zom Base Camp', description: 'Ascend Pechus glacier moraine.', altitude: '4,200 m' },
      { day: 7, title: 'Establish Camp 1 (5,100 m)', description: 'Acclimatization and snow ridge fixing.', altitude: '5,100 m' },
      { day: 12, title: 'Establish Camp 2 (5,900 m)', description: 'Ascent to the upper glaciated basin.', altitude: '5,900 m' },
      { day: 17, title: 'Summit Push: Koyo Zom (6,872 m)', description: 'Climb the summit crest with views of Tirich Mir and Afghanistan.', altitude: '6,872 m' },
      { day: 20, title: 'Descent to Base Camp', description: 'Clear high camps and pack equipment.', altitude: '4,200 m' },
      { day: 22, title: 'Return Trek to Gazin & Drive to Chitral', description: 'Farewell feast.', altitude: '1,500 m' },
      { day: 24, title: 'Drive to Islamabad', description: 'Debriefing.', altitude: '540 m' },
      { day: 25, title: 'Departure Flight', description: 'End of expedition.', altitude: '540 m' }
    ],
    departures: [
      { id: 'kyz-2027-1', startDate: '01 August 2027', endDate: '25 August 2027', price: 3900, status: 'Guaranteed', seatsLeft: 5 }
    ],
    faqs: [
      { question: 'Where is the Hindu Raj located?', answer: 'The Hindu Raj is the mountain range situated between the Hindu Kush to the west and the Karakoram to the east.' }
    ],
    reviews: []
  },
  {
    id: 'nanga-parbat-climbing-expedition',
    slug: 'nanga-parbat-climbing-expedition',
    title: 'Nanga Parbat (8,126 m) Diamir Face Expedition',
    category: 'expedition',
    duration: '45 Days',
    daysCount: 45,
    price: 8200,
    originalPrice: 9100,
    discountPercent: 10,
    rating: 5.0,
    reviewsCount: 13,
    location: 'Diamir Valley, Himalayas, Pakistan',
    maxAltitude: '8,126 m (Killer Mountain Summit)',
    groupSize: '4 - 10 Climbers',
    difficulty: 'Extreme',
    featured: true,
    bestSeller: true,
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: 'Conquer the western anchor of the great Himalayas. Ascend Nanga Parbat (8,126 m), the legendary "Killer Mountain", via the standard Kinshofer Route on the colossal Diamir Face.',
    highlights: [
      'Climb the 9th highest peak in the world on its classic Kinshofer Route',
      'The famed Kinshofer Wall (vertical rock and ice headwall below Camp 2)',
      'Experienced high-altitude mountain guides with extensive 8,000m pedigree',
      'Official royalty and military liaison officer clearance handled completely'
    ],
    included: [
      'Government climbing royalty fees, environmental bond, and permit',
      'Liaison officer allowances, basecamp infrastructure, and heated dining tent',
      'Fixed ropes, snow stakes, satellite communication, and chef services'
    ],
    excluded: [
      'Personal 8,000m down suit, oxygen cylinder systems, and personal insurance'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Islamabad', description: 'Team briefing and gear clearance.', altitude: '540 m' },
      { day: 2, title: 'Alpine Club of Pakistan Briefing', description: 'Official briefing and meeting with LO.', altitude: '540 m' },
      { day: 3, title: 'Drive to Chilas via KKH', description: 'Scenic drive along the Indus gorge.', altitude: '1,265 m' },
      { day: 4, title: 'Drive to Bunar Das & Halala', description: '4x4 transit to Diamir Valley trailhead.', altitude: '2,400 m' },
      { day: 5, title: 'Trek to Diamir Base Camp (4,200 m)', description: 'Ascend past birch glades to the lateral moraine.', altitude: '4,200 m' },
      { day: 6, title: 'Puja Ceremony & Base Camp Settling', description: 'Blessing and acclimatization.', altitude: '4,200 m' },
      { day: 8, title: 'Establish Camp 1 (4,800 m)', description: 'Navigate lower glacier and set Camp 1.', altitude: '4,800 m' },
      { day: 14, title: 'Kinshofer Wall & Camp 2 (6,100 m)', description: 'Technical climbing on fixed ropes across the rock wall.', altitude: '6,100 m' },
      { day: 22, title: 'Establish Camp 3 (6,800 m)', description: 'Ascend upper snow fields to the broad shoulder.', altitude: '6,800 m' },
      { day: 30, title: 'Establish Camp 4 (7,400 m)', description: 'High camp setup below the summit trapezoid.', altitude: '7,400 m' },
      { day: 34, title: 'Summit Push: Nanga Parbat (8,126 m)', description: 'Summit the Killer Mountain via the Diamir gap.', altitude: '8,126 m' },
      { day: 38, title: 'Descent to Base Camp', description: 'Safely descend all camps and clean the mountain.', altitude: '4,200 m' },
      { day: 41, title: 'Trek to Halala & Drive to Chilas', description: 'Celebration dinner with local crew.', altitude: '1,265 m' },
      { day: 43, title: 'Drive to Islamabad', description: 'Return to the capital.', altitude: '540 m' },
      { day: 45, title: 'International Departure', description: 'Homeward flight.', altitude: '540 m' }
    ],
    departures: [
      { id: 'npb-2027-1', startDate: '10 June 2027', endDate: '24 July 2027', price: 8200, status: 'Guaranteed', seatsLeft: 4 }
    ],
    faqs: [
      { question: 'What is the most technical part of the Kinshofer route?', answer: 'The Kinshofer Wall, located between Camp 1 and Camp 2 at approximately 5,800m-6,000m, is an 80-meter vertical mixed rock and ice pitch equipped with fixed ropes.' }
    ],
    reviews: []
  },
  {
    id: 'gasherbrum-2-climbing-expedition',
    slug: 'gasherbrum-2-climbing-expedition',
    title: 'Gasherbrum II (8,035 m) Normal Route Expedition',
    category: 'expedition',
    duration: '45 Days',
    daysCount: 45,
    price: 7900,
    originalPrice: 8800,
    discountPercent: 10,
    rating: 5.0,
    reviewsCount: 10,
    location: 'Baltoro & Gasherbrum Glacier, Karakoram, Pakistan',
    maxAltitude: '8,035 m',
    groupSize: '4 - 10 Climbers',
    difficulty: 'Extreme',
    featured: true,
    bestSeller: false,
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: 'The 13th highest mountain in the world and widely regarded as the safest, most accessible entry-level 8,000-meter peak in the Karakoram range.',
    highlights: [
      'Climb the classic Southwest Ridge (Normal Route) of Gasherbrum II',
      'Cross the famous Gasherbrum Icefall with high-altitude Balti guides',
      'Ascend through the Banana Ridge to the summit plateau',
      'Unrivaled views of K2, Broad Peak, and Gasherbrum I Shining Face'
    ],
    included: [
      'Government climbing royalties, permits, liaison officer, and waste management',
      'Basecamp individual sleeping tent, heated mess tent, and chef services',
      'Askari Aviation helicopter rescue guarantee bond coordination'
    ],
    excluded: [
      'Personal 8,000m equipment and personal climbing insurance'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Islamabad', description: 'Briefing and hotel check-in.', altitude: '540 m' },
      { day: 2, title: 'Ministry of Tourism Briefing', description: 'ACP clearance and LO introduction.', altitude: '540 m' },
      { day: 3, title: 'Fly to Skardu', description: 'Scenic flight over northern mountain ranges.', altitude: '2,228 m' },
      { day: 5, title: 'Jeep to Askole', description: 'Transit along the Braldu Gorge.', altitude: '3,048 m' },
      { day: 6, title: 'Trek to Jhola Camp', description: 'First day on the trail.', altitude: '3,100 m' },
      { day: 7, title: 'Trek to Paiju Camp', description: 'Rest under the Cathedral Towers.', altitude: '3,450 m' },
      { day: 9, title: 'Trek to Urdukas Camp', description: 'Enter Baltoro Glacier.', altitude: '4,050 m' },
      { day: 10, title: 'Trek to Goro II', description: 'Camping on the moraine.', altitude: '4,300 m' },
      { day: 11, title: 'Trek to Concordia', description: 'Panoramic views of K2 and Broad Peak.', altitude: '4,691 m' },
      { day: 12, title: 'Trek to Gasherbrum Base Camp (5,150 m)', description: 'Establish base camp beneath the Gasherbrum peaks.', altitude: '5,150 m' },
      { day: 14, title: 'Icefall Route & Camp 1 (5,900 m)', description: 'Navigate the Gasherbrum icefall.', altitude: '5,900 m' },
      { day: 20, title: 'Banana Ridge & Camp 2 (6,500 m)', description: 'Ascend steep snow ridge on fixed ropes.', altitude: '6,500 m' },
      { day: 26, title: 'Establish Camp 3 (7,100 m)', description: 'High camp setup on the shoulder.', altitude: '7,100 m' },
      { day: 32, title: 'Summit Push: Gasherbrum II (8,035 m)', description: 'Midnight push across the summit pyramid.', altitude: '8,035 m' },
      { day: 36, title: 'Descent to Base Camp', description: 'Safely descend and clean high camps.', altitude: '5,150 m' },
      { day: 39, title: 'Trek Back to Askole via Concordia', description: 'Return hike across the Baltoro.', altitude: '3,048 m' },
      { day: 42, title: 'Drive to Skardu', description: 'Celebration dinner.', altitude: '2,228 m' },
      { day: 44, title: 'Fly to Islamabad', description: 'Debriefing.', altitude: '540 m' },
      { day: 45, title: 'International Departure', description: 'Fly home.', altitude: '540 m' }
    ],
    departures: [
      { id: 'g2-2027-1', startDate: '25 June 2027', endDate: '08 August 2027', price: 7900, status: 'Guaranteed', seatsLeft: 5 }
    ],
    faqs: [
      { question: 'Why is Gasherbrum II considered the best first 8,000m peak?', answer: 'Gasherbrum II has lower objective rockfall and avalanche hazard compared to K2 or Annapurna, with standard non-technical snow routes above Camp 2.' }
    ],
    reviews: []
  }
];
