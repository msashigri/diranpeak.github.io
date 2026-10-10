import { Tour } from './toursData';

export const SAFARI_TOURS: Tour[] = [
  {
    id: 'by-air-skardu-tour-packages-from-karachi',
    slug: 'by-air-skardu-tour-packages-from-karachi',
    title: 'By Air Skardu Tour Packages from Karachi',
    category: 'cultural',
    duration: '7 Days',
    daysCount: 7,
    price: 1150,
    originalPrice: 1350,
    discountPercent: 15,
    rating: 0,
    reviewsCount: 0,
    location: 'Skardu, Shigar & Khaplu, Baltistan',
    maxAltitude: '2,500 m (Skardu Valley)',
    groupSize: '2 - 14 Persons',
    difficulty: 'Moderate',
    featured: true,
    bestSeller: true,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: 'Direct scenic flight from Karachi to Skardu. Explore Shangrila Resort, Upper Kachura Lake, Cold Desert of Katpana, Shigar Fort, and Manthoka Waterfall.',
    highlights: ['Fly directly over the Karakoram from Karachi to Skardu', 'Shangrila Resort Lower Kachura and Upper Kachura boating', 'Katpana Cold Desert sunset and bonfire', 'Historical Serena Shigar Fort and Khaplu Palace'],
    included: ['Direct return domestic flights', 'Deluxe hotel accommodations', 'Private 4x4 Prado or Grand Cabin transport', 'Breakfast, dinner & guide services'],
    excluded: ['Personal laundry, lunches, extra snacks'],
    itinerary: [
      { day: 1, title: 'Flight Karachi to Skardu', description: 'Scenic flight landing at Skardu airport. Check-in to hotel and visit Shangrila Resort.' },
      { day: 2, title: 'Upper Kachura Lake & Soq Valley', description: 'Boating, trout fish lunch, and explore green orchards.' },
      { day: 3, title: 'Sarfaranga Cold Desert & Shigar Fort', description: 'Ride quad bikes in sand dunes and visit 400-year-old Shigar Fort.' },
      { day: 4, title: 'Khaplu Palace & Manthoka Waterfall', description: 'Cascading natural waterfall and royal palace.' },
      { day: 5, title: 'Deosai Plains (The Land of Giants)', description: 'Visit Sheosar Lake and Kala Pani.' },
      { day: 6, title: 'Basho Valley & Katpana Desert', description: 'Alpine bridge and sand dunes.' },
      { day: 7, title: 'Flight Skardu to Karachi', description: 'Return flight to Karachi with unforgettable memories.' }
    ],
    departures: [
      { id: 'bask-1', startDate: '15 May 2027', endDate: '21 May 2027', price: 1150, status: 'Guaranteed', seatsLeft: 6 },
      { id: 'bask-2', startDate: '12 June 2027', endDate: '18 June 2027', price: 1150, status: 'Filling Fast', seatsLeft: 4 }
    ],
    faqs: [{ question: 'Are Karachi direct flights available year-round?', answer: 'Yes, direct flights operate multiple times weekly between Karachi and Skardu.' }],
    reviews: []
  },
  {
    id: 'by-air-skardu-tour-packages-from-lahore',
    slug: 'by-air-skardu-tour-packages-from-lahore',
    title: 'By Air Skardu Tour Packages from Lahore',
    category: 'cultural',
    duration: '7 Days',
    daysCount: 7,
    price: 1120,
    originalPrice: 1300,
    discountPercent: 14,
    rating: 0,
    reviewsCount: 0,
    location: 'Skardu & Baltistan Valleys',
    maxAltitude: '2,500 m',
    groupSize: '2 - 14 Persons',
    difficulty: 'Moderate',
    featured: true,
    bestSeller: true,
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: 'Direct flight from Lahore Allama Iqbal International Airport to Skardu. Experience crystal lakes, majestic forts, and high-altitude deserts.',
    highlights: ['Direct Lahore to Skardu air connection', 'Shangrila, Shigar, and Khaplu Palace heritage', 'Deosai National Park safari'],
    included: ['Air tickets, deluxe hotels, private AC transport, guide, breakfast & dinner'],
    excluded: ['Personal shopping'],
    itinerary: [
      { day: 1, title: 'Flight Lahore to Skardu', description: 'Arrival and transfer to hotel.' },
      { day: 2, title: 'Kachura Lakes & Katpana Desert', description: 'Boat ride and sand dunes.' },
      { day: 3, title: 'Shigar Valley Day Tour', description: 'Shigar Fort and Blind Lake.' },
      { day: 4, title: 'Khaplu Palace & Chaqchan Mosque', description: 'Visit historic monuments.' },
      { day: 5, title: 'Deosai Plains & Sheosar Lake', description: 'World second highest plateau.' },
      { day: 6, title: 'Sadpara Lake & Local Bazaar', description: 'Dry fruits and souvenirs.' },
      { day: 7, title: 'Return Flight to Lahore', description: 'Departure.' }
    ],
    departures: [
      { id: 'basl-1', startDate: '20 May 2027', endDate: '26 May 2027', price: 1120, status: 'Guaranteed', seatsLeft: 8 }
    ],
    faqs: [{ question: 'What is the baggage allowance on flights?', answer: 'The standard allowance is 20kg checked baggage and 7kg hand luggage.' }],
    reviews: []
  },
  {
    id: 'by-air-skardu-tour-packages-from-islamabad',
    slug: 'by-air-skardu-tour-packages-from-islamabad',
    title: 'By Air Skardu Tour Packages from Islamabad',
    category: 'cultural',
    duration: '6 Days',
    daysCount: 6,
    price: 980,
    originalPrice: 1150,
    discountPercent: 15,
    rating: 0,
    reviewsCount: 0,
    location: 'Skardu, Baltistan',
    maxAltitude: '2,500 m',
    groupSize: '2 - 12 Persons',
    difficulty: 'Moderate',
    featured: false,
    bestSeller: true,
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: 'Short, sweet, and breathtaking 6-day mountain break flying direct from Islamabad right past Nanga Parbat to Skardu.',
    highlights: ['Breathtaking flight over snowbound Himalayan peaks', 'Relaxation at Shangrila Resort and Shigar Fort', 'Deosai National Park full day excursion'],
    included: ['Return flights Islamabad-Skardu, 4-star hotels, private transport, guide'],
    excluded: ['Personal expenses'],
    itinerary: [
      { day: 1, title: 'Fly Islamabad to Skardu', description: 'Check-in and Shangrila visit.' },
      { day: 2, title: 'Upper Kachura Lake & Soq Valley', description: 'Boating and lunch.' },
      { day: 3, title: 'Shigar Valley & Sarfaranga Desert', description: 'Fort and dunes.' },
      { day: 4, title: 'Deosai Plains Safari', description: 'Sheosar Lake and wildlife.' },
      { day: 5, title: 'Manthoka Waterfall & Khaplu', description: 'Waterfalls and palace.' },
      { day: 6, title: 'Fly back to Islamabad', description: 'Departure.' }
    ],
    departures: [
      { id: 'basi-1', startDate: '10 June 2027', endDate: '15 June 2027', price: 980, status: 'Guaranteed', seatsLeft: 6 }
    ],
    faqs: [{ question: 'How long is the flight?', answer: 'The flight from Islamabad to Skardu takes approximately 45 to 55 minutes.' }],
    reviews: []
  },
  {
    id: 'gilgit-baltistan-tour',
    slug: 'gilgit-baltistan-tour',
    title: 'Gilgit Baltistan Grand Tour',
    category: 'cultural',
    duration: '10 Days',
    daysCount: 10,
    price: 1390,
    originalPrice: 1590,
    discountPercent: 12,
    rating: 0,
    reviewsCount: 0,
    location: 'Gilgit, Hunza, Skardu & Deosai',
    maxAltitude: '4,000 m (Deosai)',
    groupSize: '4 - 14 Persons',
    difficulty: 'Moderate',
    featured: true,
    bestSeller: true,
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: 'The comprehensive journey connecting all premier regions of Gilgit-Baltistan: Gilgit, Karimabad Hunza, Passu Cones, Attabad Lake, Skardu, and Deosai Plains.',
    highlights: ['Cross three great mountain ranges: Himalayas, Karakoram, Hindu Kush', 'Attabad Lake boating and Hussaini suspension bridge', 'Baltit Fort, Altit Fort, and Shigar Fort'],
    included: ['All hotels, private transport, guide, entries, breakfast & dinner'],
    excluded: ['Flights, personal tips'],
    itinerary: [
      { day: 1, title: 'Islamabad to Gilgit', description: 'Fly or drive to Gilgit.' },
      { day: 2, title: 'Gilgit to Hunza Valley', description: 'Rakaposhi viewpoint and Karimabad.' },
      { day: 3, title: 'Hunza to Attabad Lake & Passu', description: 'Boat ride and Passu Cones.' },
      { day: 4, title: 'Khunjerab Pass (Pak-China Border)', description: 'World highest paved international border at 4,693m.' },
      { day: 5, title: 'Hunza to Skardu', description: 'Scenic drive along the Indus gorge.' },
      { day: 6, title: 'Skardu Lakes & Cold Desert', description: 'Shangrila and Katpana.' },
      { day: 7, title: 'Shigar Valley & Fort', description: 'Palace on the rocks.' },
      { day: 8, title: 'Deosai National Park', description: 'Alpine plateau safari.' },
      { day: 9, title: 'Return Flight to Islamabad', description: 'Fly home.' },
      { day: 10, title: 'Islamabad Sightseeing & Departure', description: 'End of tour.' }
    ],
    departures: [
      { id: 'gbt-1', startDate: '01 June 2027', endDate: '10 June 2027', price: 1390, status: 'Guaranteed', seatsLeft: 8 }
    ],
    faqs: [{ question: 'Is Khunjerab Pass open on this tour?', answer: 'Yes! Khunjerab Pass border is open from May through November.' }],
    reviews: []
  },
  {
    id: 'hunza-tour',
    slug: 'hunza-tour',
    title: 'Hunza Valley Cultural & Scenic Tour',
    category: 'cultural',
    duration: '7 Days',
    daysCount: 7,
    price: 990,
    originalPrice: 1150,
    discountPercent: 14,
    rating: 0,
    reviewsCount: 0,
    location: 'Karimabad, Attabad, Passu, Hunza',
    maxAltitude: '4,693 m (Khunjerab Pass)',
    groupSize: '4 - 14 Persons',
    difficulty: 'Moderate',
    featured: true,
    bestSeller: true,
    image: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: 'Discover the paradise on earth: Hunza Valley. Experience apricot blossoms, 900-year-old Baltit and Altit Forts, turquoise Attabad Lake, and majestic Passu Cones.',
    highlights: ['Sunrise over Rakaposhi and Ladyfinger Peak', 'Attabad Lake jet ski and boat ride', 'UNESCO heritage forts of Hunza'],
    included: ['Hotels, private transport, guide, entries, meals'],
    excluded: ['Flights, shopping'],
    itinerary: [
      { day: 1, title: 'Islamabad to Gilgit / Chilas', description: 'Journey north.' },
      { day: 2, title: 'Drive to Hunza Valley', description: 'Rakaposhi viewpoint and Karimabad.' },
      { day: 3, title: 'Baltit & Altit Forts', description: 'Ancient royal heritage.' },
      { day: 4, title: 'Attabad Lake, Gulmit & Passu', description: 'Bridges and glaciers.' },
      { day: 5, title: 'Khunjerab Pass (Pak-China Border)', description: 'High altitude highway.' },
      { day: 6, title: 'Return Drive to Gilgit', description: 'Local bazaar.' },
      { day: 7, title: 'Return to Islamabad', description: 'Flight home.' }
    ],
    departures: [
      { id: 'ht-1', startDate: '15 May 2027', endDate: '21 May 2027', price: 990, status: 'Guaranteed', seatsLeft: 7 }
    ],
    faqs: [{ question: 'What is the food like in Hunza?', answer: 'Delicious local organic specialties include Chapshuro (meat pie), Giyaling, and fresh apricot cake.' }],
    reviews: []
  },
  {
    id: 'skardu-tour-packages',
    slug: 'skardu-tour-packages',
    title: 'Skardu Valley Highlights Tour Package',
    category: 'cultural',
    duration: '6 Days',
    daysCount: 6,
    price: 920,
    originalPrice: 1050,
    discountPercent: 12,
    rating: 0,
    reviewsCount: 0,
    location: 'Skardu, Shigar, Khaplu',
    maxAltitude: '2,500 m',
    groupSize: '2 - 12 Persons',
    difficulty: 'Moderate',
    featured: false,
    bestSeller: true,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: 'The essential Skardu itinerary covering Kachura Lakes, Cold Desert, Shigar Fort, Manthoka Waterfall, and Khaplu Palace.',
    highlights: ['Shangrila and Upper Kachura Lake', 'Katpana and Sarfaranga sand dunes', 'Shigar and Khaplu ancient royal forts'],
    included: ['Hotels, 4x4 transport, guide, breakfast & dinner'],
    excluded: ['Flights, shopping'],
    itinerary: [
      { day: 1, title: 'Arrival in Skardu', description: 'Hotel check-in and Shangrila.' },
      { day: 2, title: 'Upper Kachura Lake & Soq Valley', description: 'Boat cruise.' },
      { day: 3, title: 'Shigar Valley & Desert', description: 'Fort and dunes.' },
      { day: 4, title: 'Khaplu Palace & Waterfall', description: 'Manthoka waterfall.' },
      { day: 5, title: 'Basho Valley Day Trip', description: 'Alpine pine forest.' },
      { day: 6, title: 'Departure', description: 'Flight back to Islamabad.' }
    ],
    departures: [
      { id: 'stp-1', startDate: '25 May 2027', endDate: '30 May 2027', price: 920, status: 'Guaranteed', seatsLeft: 6 }
    ],
    faqs: [{ question: 'Are hotels equipped with heating and hot water?', answer: 'Yes, all our partnered hotels provide 24/7 hot running water and power backup.' }],
    reviews: []
  },
  {
    id: 'skardu-hunza-tour',
    slug: 'skardu-hunza-tour',
    title: 'Skardu & Hunza Combined Grand Tour',
    category: 'cultural',
    duration: '11 Days',
    daysCount: 11,
    price: 1480,
    originalPrice: 1700,
    discountPercent: 13,
    rating: 0,
    reviewsCount: 0,
    location: 'Skardu & Hunza, Northern Pakistan',
    maxAltitude: '4,693 m (Khunjerab)',
    groupSize: '4 - 14 Persons',
    difficulty: 'Moderate',
    featured: true,
    bestSeller: true,
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: 'Combine the twin crown jewels of northern Pakistan into one grand luxury holiday: Baltistans alpine lakes & forts paired with Hunzas legendary valley & peaks.',
    highlights: ['Experience both Balti and Hunzukutz cultures', 'Attabad Lake & Shangrila Lake in one trip', 'Passu Cones and Shigar Fort'],
    included: ['All hotels, private transport, guide, entries, meals'],
    excluded: ['Flights, visa'],
    itinerary: [
      { day: 1, title: 'Islamabad to Skardu', description: 'Fly to Skardu.' },
      { day: 2, title: 'Kachura Lakes & Cold Desert', description: 'Skardu highlights.' },
      { day: 3, title: 'Shigar & Khaplu Palaces', description: 'Historical forts.' },
      { day: 4, title: 'Drive Skardu to Hunza', description: 'Scenic Karakoram highway journey.' },
      { day: 5, title: 'Baltit & Altit Forts', description: 'Hunza heritage.' },
      { day: 6, title: 'Attabad Lake & Passu Cones', description: 'Upper Hunza.' },
      { day: 7, title: 'Khunjerab Pass', description: 'China border.' },
      { day: 8, title: 'Return Drive to Gilgit', description: 'Gilgit bazaar.' },
      { day: 9, title: 'Drive to Islamabad', description: 'Return journey.' },
      { day: 10, title: 'Islamabad & Departure', description: 'Departure.' }
    ],
    departures: [
      { id: 'sht-1', startDate: '10 June 2027', endDate: '20 June 2027', price: 1480, status: 'Guaranteed', seatsLeft: 8 }
    ],
    faqs: [{ question: 'What is the travel time between Skardu and Hunza?', answer: 'The scenic road between Skardu and Hunza takes approximately 5 to 6 hours along smooth paved highway.' }],
    reviews: []
  },
  {
    id: 'fairy-meadows-trek',
    slug: 'fairy-meadows-trek',
    title: 'Fairy Meadows & Nanga Parbat Safari',
    category: 'cultural',
    duration: '6 Days',
    daysCount: 6,
    price: 890,
    originalPrice: 1050,
    discountPercent: 15,
    rating: 0,
    reviewsCount: 0,
    location: 'Raikot, Diamer, Himalayas',
    maxAltitude: '4,200 m (Beyal Camp)',
    groupSize: '4 - 12 Persons',
    difficulty: 'Moderate',
    featured: false,
    bestSeller: true,
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: 'The classic Fairy Meadows jeep safari and gentle alpine trek directly facing the colossal 8,126m North Face of Nanga Parbat.',
    highlights: ['World famous 4x4 mountain jeep track', 'Stay in wooden pine cottages under Nanga Parbat', 'Hike to Beyal Camp reflection pools'],
    included: ['Jeeps, log cabins, meals, mountain guide'],
    excluded: ['Tips, personal gear'],
    itinerary: [
      { day: 1, title: 'Islamabad to Chilas', description: 'KKH drive.' },
      { day: 2, title: 'Jeep to Tato & Hike to Fairy Meadows', description: 'Cottages check-in.' },
      { day: 3, title: 'Trek to Beyal Camp & Base Camp', description: 'Colossal mountain views.' },
      { day: 4, title: 'Relax at Fairy Meadows', description: 'Bonfire and photography.' },
      { day: 5, title: 'Descend to Raikot & Drive to Besham', description: 'Return trip.' },
      { day: 6, title: 'Besham to Islamabad', description: 'Departure.' }
    ],
    departures: [
      { id: 'fmt-1', startDate: '01 June 2027', endDate: '06 June 2027', price: 890, status: 'Guaranteed', seatsLeft: 6 }
    ],
    faqs: [{ question: 'Are horses available for the trek to Fairy Meadows?', answer: 'Yes, riding horses can be hired at Tato for guests who prefer not to walk the 3-hour trail.' }],
    reviews: []
  },
  {
    id: 'fairy-meadows-and-hunza-trip',
    slug: 'fairy-meadows-and-hunza-trip',
    title: 'Fairy Meadows & Hunza Valley Combined Trip',
    category: 'cultural',
    duration: '9 Days',
    daysCount: 9,
    price: 1280,
    originalPrice: 1450,
    discountPercent: 12,
    rating: 0,
    reviewsCount: 0,
    location: 'Diamer & Hunza, Pakistan',
    maxAltitude: '4,693 m (Khunjerab)',
    groupSize: '4 - 12 Persons',
    difficulty: 'Moderate',
    featured: true,
    bestSeller: false,
    image: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: 'The ultimate northern Pakistan circuit uniting the raw wilderness of Fairy Meadows with the refined alpine culture and dramatic gorges of Hunza Valley.',
    highlights: ['Nanga Parbat base camp & Fairy Meadows', 'Attabad Lake, Passu Cones, and Khunjerab Pass', 'Baltit and Altit historic fortresses'],
    included: ['Hotels, cabins, jeeps, private transport, guide, meals'],
    excluded: ['Flights, shopping'],
    itinerary: [
      { day: 1, title: 'Islamabad to Raikot & Fairy Meadows', description: 'Ascend to Fairy Meadows.' },
      { day: 2, title: 'Fairy Meadows to Beyal Camp', description: 'Nanga Parbat close-up.' },
      { day: 3, title: 'Fairy Meadows to Hunza Valley', description: 'Drive to Karimabad.' },
      { day: 4, title: 'Hunza Heritage & Forts', description: 'Baltit & Altit.' },
      { day: 5, title: 'Attabad Lake & Passu Cones', description: 'Upper Hunza.' },
      { day: 6, title: 'Khunjerab Pass Border', description: 'Highest border.' },
      { day: 7, title: 'Drive to Gilgit', description: 'Gilgit town.' },
      { day: 8, title: 'Return to Islamabad', description: 'Drive south.' },
      { day: 9, title: 'Departure', description: 'Fly home.' }
    ],
    departures: [
      { id: 'fmh-1', startDate: '15 June 2027', endDate: '23 June 2027', price: 1280, status: 'Guaranteed', seatsLeft: 6 }
    ],
    faqs: [{ question: 'Is this tour family-friendly?', answer: 'Yes! It is well-suited for families and couples.' }],
    reviews: []
  },
  {
    id: 'fairy-meadows-skardu-tour-8-days',
    slug: 'fairy-meadows-skardu-tour-8-days',
    title: 'Fairy Meadows & Skardu 8 Days Tour',
    category: 'cultural',
    duration: '8 Days',
    daysCount: 8,
    price: 1190,
    originalPrice: 1350,
    discountPercent: 12,
    rating: 0,
    reviewsCount: 0,
    location: 'Raikot, Astore, Deosai & Skardu',
    maxAltitude: '4,200 m',
    groupSize: '4 - 12 Persons',
    difficulty: 'Moderate',
    featured: false,
    bestSeller: false,
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: 'Experience Nanga Parbats base at Fairy Meadows followed by a traverse of Deosai National Park directly into Skardu valley.',
    highlights: ['Fairy Meadows log cabins facing Nanga Parbat', 'Cross Deosai Plains to Skardu', 'Shangrila and Cold Desert in Skardu'],
    included: ['4x4 jeeps, hotels, cabins, meals, guide'],
    excluded: ['Flights, visa'],
    itinerary: [
      { day: 1, title: 'Islamabad to Fairy Meadows', description: 'Jeep and hike.' },
      { day: 2, title: 'Beyal Camp & Nanga Parbat View', description: 'Mountain walk.' },
      { day: 3, title: 'Fairy Meadows to Astore Valley', description: 'Rama meadows.' },
      { day: 4, title: 'Cross Deosai Plains to Skardu', description: 'Sheosar Lake.' },
      { day: 5, title: 'Skardu Lakes & Desert', description: 'Shangrila and Katpana.' },
      { day: 6, title: 'Shigar Valley & Fort', description: 'Royal palace.' },
      { day: 7, title: 'Fly Skardu to Islamabad', description: 'Return flight.' },
      { day: 8, title: 'Departure', description: 'End of tour.' }
    ],
    departures: [
      { id: 'fms-1', startDate: '20 June 2027', endDate: '27 June 2027', price: 1190, status: 'Guaranteed', seatsLeft: 5 }
    ],
    faqs: [{ question: 'Is the road open across Deosai?', answer: 'Deosai road is typically open from mid-June through October.' }],
    reviews: []
  },
  {
    id: 'karakoram-highway-tour-pakistan',
    slug: 'karakoram-highway-tour-pakistan',
    title: 'Karakoram Highway (KKH) Grand Road Trip',
    category: 'cultural',
    duration: '12 Days',
    daysCount: 12,
    price: 1550,
    originalPrice: 1750,
    discountPercent: 11,
    rating: 0,
    reviewsCount: 0,
    location: 'Islamabad to Khunjerab Pass (KKH)',
    maxAltitude: '4,693 m (Khunjerab Pass)',
    groupSize: '4 - 14 Persons',
    difficulty: 'Moderate',
    featured: true,
    bestSeller: true,
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: 'Drive the 8th Wonder of the World from the foothills of the Himalayas to the highest paved international border on earth at Khunjerab Pass.',
    highlights: ['Travel the entire length of the historic Silk Route Karakoram Highway', 'Junction point of 3 world mountain ranges (Himalayas, Karakoram, Hindu Kush)', 'Attabad Lake tunnels, Passu Cones, and Khunjerab Pass'],
    included: ['All hotel accommodation, private AC coaster or van, guide, tolls, meals'],
    excluded: ['Flights, personal shopping'],
    itinerary: [
      { day: 1, title: 'Islamabad', description: 'Briefing.' },
      { day: 2, title: 'Islamabad to Besham / Naran', description: 'Begin KKH journey.' },
      { day: 3, title: 'Chilas & Rock Carvings', description: 'Ancient Silk Road petroglyphs.' },
      { day: 4, title: 'Gilgit Town', description: 'Kargah Buddha.' },
      { day: 5, title: 'Hunza Valley', description: 'Karimabad.' },
      { day: 6, title: 'Passu & Attabad', description: 'Upper Hunza.' },
      { day: 7, title: 'Khunjerab Pass (4,693m)', description: 'China border monument.' },
      { day: 8, title: 'Hopar Valley & Glacier', description: 'Nagar valley.' },
      { day: 9, title: 'Return to Chilas', description: 'Scenic drive.' },
      { day: 10, title: 'Return to Islamabad', description: 'Faisal Mosque.' },
      { day: 11, title: 'Departure', description: 'Fly home.' }
    ],
    departures: [
      { id: 'kkh-1', startDate: '05 July 2027', endDate: '16 July 2027', price: 1550, status: 'Guaranteed', seatsLeft: 8 }
    ],
    faqs: [{ question: 'How are road conditions on the KKH?', answer: 'The highway is fully paved, wide, and smooth following modern reconstruction.' }],
    reviews: []
  },
  {
    id: 'buddhist-pilgrimage-tour-pakistan',
    slug: 'buddhist-pilgrimage-tour-pakistan',
    title: 'Buddhist Pilgrimage & Archaeological Heritage Tour',
    category: 'cultural',
    duration: '10 Days',
    daysCount: 10,
    price: 1350,
    originalPrice: 1550,
    discountPercent: 13,
    rating: 0,
    reviewsCount: 0,
    location: 'Taxila, Swat Valley & Takht-i-Bahi',
    maxAltitude: '1,500 m',
    groupSize: '4 - 16 Persons',
    difficulty: 'Moderate',
    featured: false,
    bestSeller: false,
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: 'Walk the footsteps of Gandhara Buddhist civilization. Visit UNESCO sites of Taxila, Takht-i-Bahi monastic complex, Swat Valley stupas, and Peshawar Museum.',
    highlights: ['UNESCO World Heritage Takht-i-Bahi Monastery', 'Dharmarajika Stupa and Jaulian University in Taxila', 'World finest collection of Gandharan Buddhist art'],
    included: ['Heritage hotels, AC coach transport, expert archaeologist guide, entry permits'],
    excluded: ['Visa, shopping'],
    itinerary: [
      { day: 1, title: 'Islamabad', description: 'Arrival.' },
      { day: 2, title: 'Taxila UNESCO Sites', description: 'Museum, Jaulian, Sirkap.' },
      { day: 3, title: 'Peshawar Museum & Old City', description: 'Buddha relics.' },
      { day: 4, title: 'Takht-i-Bahi Buddhist Monastery', description: 'Ancient mountain complex.' },
      { day: 5, title: 'Swat Valley (Uddiyana)', description: 'Butkara Stupa.' },
      { day: 6, title: 'Jahanabad Seated Buddha', description: 'Giant rock relief.' },
      { day: 7, title: 'Lahore Museum Gandhara Gallery', description: 'Fasting Siddhartha.' },
      { day: 8, title: 'Departure', description: 'Fly home.' }
    ],
    departures: [
      { id: 'bpt-1', startDate: '10 October 2027', endDate: '19 October 2027', price: 1350, status: 'Guaranteed', seatsLeft: 10 }
    ],
    faqs: [{ question: 'Where is the Fasting Siddhartha located?', answer: 'The original 2nd-century Fasting Siddhartha masterpiece is displayed in the Lahore Museum.' }],
    reviews: []
  },
  {
    id: 'pakistan-trophy-hunting-tours',
    slug: 'pakistan-trophy-hunting-tours',
    title: 'Pakistan Wildlife & Trophy Conservation Safari',
    category: 'cultural',
    duration: '14 Days',
    daysCount: 14,
    price: 3800,
    originalPrice: 4200,
    discountPercent: 10,
    rating: 0,
    reviewsCount: 0,
    location: 'Community Conservation Reserves, Gilgit-Baltistan',
    maxAltitude: '4,500 m',
    groupSize: '2 - 6 Persons',
    difficulty: 'Demanding',
    featured: false,
    bestSeller: false,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: 'Sustainable community-managed wildlife conservation safari tracking Himalayan Ibex, Astor Markhor, and blue sheep in community reserves where 80% of revenue directly supports local village welfare.',
    highlights: ['Official Government community conservation permits', 'Track world-record Himalayan Ibex and Markhor in pristine habitats', 'Direct empowerment of local Balti and Shina conservation communities'],
    included: ['Wildlife permits, scouting guides, 4x4 transport, full board logistics'],
    excluded: ['Government trophy tag fees, rifle import license'],
    itinerary: [
      { day: 1, title: 'Islamabad', description: 'Briefing.' },
      { day: 2, title: 'Fly to Skardu / Gilgit', description: 'Transfer to conservation reserve.' },
      { day: 3, title: 'Scouting & Acclimatization', description: 'Field spotters.' },
      { day: 4, title: 'Tracking Phase', description: 'High altitude spot and stalk.' },
      { day: 5, title: 'Return and Debriefing', description: 'Department of Wildlife sign-off.' }
    ],
    departures: [
      { id: 'pth-1', startDate: '01 December 2027', endDate: '14 December 2027', price: 3800, status: 'Guaranteed', seatsLeft: 2 }
    ],
    faqs: [{ question: 'How does this support conservation?', answer: '80% of permit fees go straight to local village funds for schools, hospitals, and anti-poaching wardens.' }],
    reviews: []
  },
  {
    id: 'pakistan-hindu-kush-pamir-karakorum-tour',
    slug: 'pakistan-hindu-kush-pamir-karakorum-tour',
    title: 'Pakistan Hindu Kush, Pamir & Karakoram 3-Ranges Tour',
    category: 'cultural',
    duration: '16 Days',
    daysCount: 16,
    price: 1980,
    originalPrice: 2250,
    discountPercent: 12,
    rating: 0,
    reviewsCount: 0,
    location: 'Chitral, Shandur, Gilgit, Hunza',
    maxAltitude: '4,693 m (Khunjerab)',
    groupSize: '4 - 12 Persons',
    difficulty: 'Moderate',
    featured: true,
    bestSeller: false,
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: 'An epic trans-mountain odyssey crossing three of the worlds greatest ranges: the animist Kalash Valleys in the Hindu Kush, Shandur Pass (Roof of the World), and Hunza in the Karakoram.',
    highlights: ['Unique Kalash animist tribe culture and dances', 'Shandur Pass polo ground at 3,700m', 'Hunza Valley and Khunjerab Pass Pamir gateway'],
    included: ['Hotels, 4x4 Prado transport, local guides, permits, meals'],
    excluded: ['Flights, shopping'],
    itinerary: [
      { day: 1, title: 'Islamabad Arrival', description: 'Welcome.' },
      { day: 2, title: 'Drive to Chitral via Lowari Tunnel', description: 'Enter Hindu Kush.' },
      { day: 3, title: 'Kalash Valleys (Bumburet & Rumbur)', description: 'Experience ancient traditions.' },
      { day: 4, title: 'Chitral Town & Shahi Mosque', description: 'Tirich Mir view.' },
      { day: 5, title: 'Cross Shandur Pass (3,700m) to Phander', description: 'Trout fishing lake.' },
      { day: 6, title: 'Phander to Gilgit', description: 'Ghizer valley.' },
      { day: 7, title: 'Gilgit to Hunza Valley', description: 'Karimabad.' },
      { day: 8, title: 'Upper Hunza & Khunjerab Pass', description: 'Pamir edge.' },
      { day: 9, title: 'Return to Islamabad', description: 'Fly or drive.' }
    ],
    departures: [
      { id: 'hkpk-1', startDate: '01 July 2027', endDate: '16 July 2027', price: 1980, status: 'Guaranteed', seatsLeft: 6 }
    ],
    faqs: [{ question: 'Who are the Kalash people?', answer: 'The Kalash are a unique indigenous community who practice an ancient polytheistic faith dating back thousands of years.' }],
    reviews: []
  },
  {
    id: 'peshawar-city-tour',
    slug: 'peshawar-city-tour',
    title: 'Peshawar Historic Silk Route City Tour',
    category: 'cultural',
    duration: '3 Days',
    daysCount: 3,
    price: 450,
    originalPrice: 520,
    discountPercent: 13,
    rating: 0,
    reviewsCount: 0,
    location: 'Peshawar, Khyber Pakhtunkhwa',
    maxAltitude: '360 m',
    groupSize: '2 - 12 Persons',
    difficulty: 'Moderate',
    featured: false,
    bestSeller: false,
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: 'Immerse yourself in Asia oldest continuously inhabited living city: the bazaars of Qissa Khwani, Sethi House havelis, and the Khyber Pass gateway.',
    highlights: ['Qissa Khwani (Bazaar of the Storytellers)', 'Grand 17th-century Mahabat Khan Mosque', 'Sethi House wood-carved merchant mansions', 'Authentic Shinwari lamb karahi and green tea (Qahwa)'],
    included: ['Heritage hotel, private transport, guide, museum tickets, meals'],
    excluded: ['Personal purchases'],
    itinerary: [
      { day: 1, title: 'Islamabad to Peshawar', description: 'Drive via Motorway, visit Peshawar Museum.' },
      { day: 2, title: 'Old City Walking Tour', description: 'Qissa Khwani, Mahabat Khan Mosque, Sethi House, and Gor Khatri.' },
      { day: 3, title: 'Khyber Gate & Return', description: 'Bab-e-Khyber monument and return to Islamabad.' }
    ],
    departures: [
      { id: 'pct-1', startDate: '15 October 2027', endDate: '17 October 2027', price: 450, status: 'Guaranteed', seatsLeft: 8 }
    ],
    faqs: [{ question: 'Is Peshawar safe for international visitors?', answer: 'Yes! Peshawar is warmly welcoming, safe, and famous for legendary Pashtun hospitality.' }],
    reviews: []
  },
  {
    id: 'lahore-city-tour',
    slug: 'lahore-city-tour',
    title: 'Lahore Mughal Cultural Heritage Tour',
    category: 'cultural',
    duration: '4 Days',
    daysCount: 4,
    price: 520,
    originalPrice: 600,
    discountPercent: 13,
    rating: 0,
    reviewsCount: 0,
    location: 'Lahore, Punjab, Pakistan',
    maxAltitude: '217 m',
    groupSize: '2 - 14 Persons',
    difficulty: 'Moderate',
    featured: false,
    bestSeller: false,
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: 'The cultural heart of Pakistan. Explore the grand Mughal monuments: Badshahi Mosque, UNESCO Lahore Fort (Sheesh Mahal), and the electric Wagah Border ceremony.',
    highlights: ['Badshahi Mosque & Lahore Fort UNESCO site', 'Wazir Khan Mosque frescoed jewel', 'Wagah Border flag lowering ceremony', 'Gawalmandi & Fort Road Food Street dining'],
    included: ['Luxury hotel, AC vehicle, licensed cultural guide, all monument fees'],
    excluded: ['Airfare, tips'],
    itinerary: [
      { day: 1, title: 'Arrival in Lahore', description: 'Welcome and check-in.' },
      { day: 2, title: 'Walled City of Lahore', description: 'Delhi Gate, Shahi Hammam, Wazir Khan Mosque, Lahore Fort & Badshahi Mosque.' },
      { day: 3, title: 'Shalimar Gardens & Wagah Border', description: 'UNESCO Mughal gardens and patriotic border ceremony.' },
      { day: 4, title: 'Lahore Museum & Departure', description: 'Fast Siddhartha and departure.' }
    ],
    departures: [
      { id: 'lct-1', startDate: '20 October 2027', endDate: '23 October 2027', price: 520, status: 'Guaranteed', seatsLeft: 10 }
    ],
    faqs: [{ question: 'What is the Wagah border ceremony?', answer: 'A daily military flag-lowering parade held jointly by Pakistani Rangers and Indian BSF with roaring crowd enthusiasm.' }],
    reviews: []
  },
  {
    id: 'south-pakistan-cultural-group-tour',
    slug: 'south-pakistan-cultural-group-tour',
    title: 'South Pakistan Sufi & Cultural Heritage Tour',
    category: 'cultural',
    duration: '10 Days',
    daysCount: 10,
    price: 1350,
    originalPrice: 1550,
    discountPercent: 13,
    rating: 0,
    reviewsCount: 0,
    location: 'Karachi, Thatta, Mohenjo-Daro, Multan',
    maxAltitude: '150 m',
    groupSize: '4 - 14 Persons',
    difficulty: 'Moderate',
    featured: false,
    bestSeller: false,
    image: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: 'Journey through the cradle of civilization along the lower Indus River: 5,000-year-old Mohenjo-Daro, Thatta UNESCO necropolis, and the mystical Sufi shrines of Multan.',
    highlights: ['Mohenjo-Daro Bronze Age UNESCO metropolis', 'Makli Necropolis: half a million carved stone tombs', 'Multan City of Saints and blue pottery ateliers'],
    included: ['Hotels, AC transport, guide, entries, meals'],
    excluded: ['International flights'],
    itinerary: [
      { day: 1, title: 'Karachi Arrival', description: 'Clifton Beach and Mazar-e-Quaid.' },
      { day: 2, title: 'Thatta & Makli Necropolis', description: 'Shah Jahan Mosque and sandstone tombs.' },
      { day: 3, title: 'Sehwan Sharif', description: 'Shrine of Lal Shahbaz Qalandar and Dhamal.' },
      { day: 4, title: 'Mohenjo-Daro UNESCO Site', description: 'The Great Bath and Stupa.' },
      { day: 5, title: 'Sukkur to Bahawalpur', description: 'Kot Diji Fort.' },
      { day: 6, title: 'Derawar Fort & Cholistan Desert', description: 'Giant desert ramparts.' },
      { day: 7, title: 'Multan City of Saints', description: 'Shah Rukn-e-Alam shrine.' },
      { day: 8, title: 'Departure', description: 'Fly to Islamabad or Karachi.' }
    ],
    departures: [
      { id: 'spcg-1', startDate: '10 November 2027', endDate: '19 November 2027', price: 1350, status: 'Guaranteed', seatsLeft: 8 }
    ],
    faqs: [{ question: 'What is the best time to visit South Pakistan?', answer: 'November through February offers cool, pleasant desert weather.' }],
    reviews: []
  },
  {
    id: 'gilgit-baltistan-trekking-adventure',
    slug: 'gilgit-baltistan-trekking-adventure',
    title: 'Gilgit Baltistan Adventure Safari',
    category: 'cultural',
    duration: '12 Days',
    daysCount: 12,
    price: 1490,
    originalPrice: 1700,
    discountPercent: 12,
    rating: 0,
    reviewsCount: 0,
    location: 'Gilgit, Naltar, Hunza & Skardu',
    maxAltitude: '3,800 m',
    groupSize: '4 - 12 Persons',
    difficulty: 'Moderate',
    featured: false,
    bestSeller: false,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: 'An action-packed adventure across Naltar Valley colored lakes, Hunza canyon trails, and Skardu cold desert dunes.',
    highlights: ['Emerald lakes of Naltar Valley', 'Husky and mountain jeep trails', 'Rafting and suspension bridges'],
    included: ['Hotels, camps, transport, guide, meals'],
    excluded: ['Personal kit'],
    itinerary: [
      { day: 1, title: 'Islamabad', description: 'Arrival.' },
      { day: 2, title: 'Gilgit & Naltar Lakes', description: '4x4 safari.' },
      { day: 3, title: 'Hunza Valley', description: 'Karimabad.' },
      { day: 4, title: 'Skardu', description: 'Indus drive.' },
      { day: 5, title: 'Deosai', description: 'Plateau.' },
      { day: 6, title: 'Departure', description: 'Return.' }
    ],
    departures: [
      { id: 'gbta-1', startDate: '01 July 2027', endDate: '12 July 2027', price: 1490, status: 'Guaranteed', seatsLeft: 6 }
    ],
    faqs: [{ question: 'Are Naltar lakes accessible by jeep?', answer: 'Yes, 4x4 jeeps navigate directly to the colored alpine lakes of Naltar.' }],
    reviews: []
  },
  {
    id: '7-days-central-north-pakistan-cultural-trip',
    slug: '7-days-central-north-pakistan-cultural-trip',
    title: '7 Days Central & North Pakistan Cultural Trip',
    category: 'cultural',
    duration: '7 Days',
    daysCount: 7,
    price: 980,
    originalPrice: 1150,
    discountPercent: 15,
    rating: 0,
    reviewsCount: 0,
    location: 'Islamabad, Chilas, Gilgit, Hunza',
    maxAltitude: '2,800 m',
    groupSize: '4 - 14 Persons',
    difficulty: 'Moderate',
    featured: false,
    bestSeller: false,
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: 'A week-long cultural exploration covering federal Islamabad, Gandhara heritage in Taxila, and the alpine heart of Hunza Valley.',
    highlights: ['Taxila UNESCO ruins', 'Karakoram Highway mountain scenery', 'Hunza royal palaces and apricot orchards'],
    included: ['Hotels, AC vehicle, guide, breakfast & dinner'],
    excluded: ['Flights, shopping'],
    itinerary: [
      { day: 1, title: 'Islamabad & Taxila', description: 'Gandhara ruins.' },
      { day: 2, title: 'Drive to Naran or Chilas', description: 'Scenic drive.' },
      { day: 3, title: 'Enter Hunza Valley', description: 'Karimabad.' },
      { day: 4, title: 'Attabad Lake & Passu', description: 'Upper Hunza.' },
      { day: 5, title: 'Return to Gilgit', description: 'Gilgit town.' },
      { day: 6, title: 'Return to Islamabad', description: 'Drive south.' },
      { day: 7, title: 'Departure', description: 'Fly home.' }
    ],
    departures: [
      { id: '7dcn-1', startDate: '20 June 2027', endDate: '26 June 2027', price: 980, status: 'Guaranteed', seatsLeft: 8 }
    ],
    faqs: [{ question: 'Is this trip suitable for senior travelers?', answer: 'Yes, pacing is comfortable with quality hotels throughout.' }],
    reviews: []
  },
  {
    id: 'nangma-valley-trek-karakoram',
    slug: 'nangma-valley-trek-karakoram',
    title: 'Nangma Valley Granite Spire Trek',
    category: 'cultural',
    duration: '12 Days',
    daysCount: 12,
    price: 1450,
    originalPrice: 1650,
    discountPercent: 12,
    rating: 0,
    reviewsCount: 0,
    location: 'Nangma Valley, Baltistan',
    maxAltitude: '4,100 m',
    groupSize: '4 - 10 Persons',
    difficulty: 'Moderate',
    featured: false,
    bestSeller: false,
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: 'Known as the Yosemite of the Karakoram, Nangma Valley features vertical granite spires rising directly above lush green meadows and clear alpine brooks.',
    highlights: ['Camp beneath Amin Brakk (5,850m) and Shipton Spire', 'Easy access from Kanday village with short walking stages', 'Pristine mountain streams and boulder gardens'],
    included: ['Transport, camping, meals, guide'],
    excluded: ['Flights, visa'],
    itinerary: [
      { day: 1, title: 'Islamabad', description: 'Arrival.' },
      { day: 2, title: 'Fly to Skardu', description: 'Flight.' },
      { day: 3, title: 'Drive to Kanday Village', description: 'Balti village.' },
      { day: 4, title: 'Trek to Mingulo Broq', description: 'Green meadows.' },
      { day: 5, title: 'Trek to Nangma Base Camp (3,950m)', description: 'Fairytale camp.' },
      { day: 6, title: 'Day Hike towards Amin Brakk Headwall', description: 'Vertical rock spires.' },
      { day: 7, title: 'Descend to Kanday & Drive to Skardu', description: 'Return.' },
      { day: 8, title: 'Fly to Islamabad', description: 'Departure.' }
    ],
    departures: [
      { id: 'nvk-1', startDate: '10 July 2027', endDate: '21 July 2027', price: 1450, status: 'Guaranteed', seatsLeft: 6 }
    ],
    faqs: [{ question: 'How long is the hike into Nangma Valley?', answer: 'The hike from Kanday village to the base camp is a pleasant 4 to 5 hours.' }],
    reviews: []
  },
  {
    id: 'pakistan-indus-valley-civilization-cultural-tour',
    slug: 'pakistan-indus-valley-civilization-cultural-tour',
    title: 'Indus Valley Civilization 5,000-Year Heritage Tour',
    category: 'cultural',
    duration: '11 Days',
    daysCount: 11,
    price: 1420,
    originalPrice: 1620,
    discountPercent: 12,
    rating: 0,
    reviewsCount: 0,
    location: 'Karachi, Mohenjo-Daro, Harappa, Lahore',
    maxAltitude: '220 m',
    groupSize: '4 - 14 Persons',
    difficulty: 'Moderate',
    featured: false,
    bestSeller: false,
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: 'Explore the foundations of human urbanization across Pakistan: Mohenjo-Daro, Kot Diji, Harappa, and Taxila Gandhara sites.',
    highlights: ['Mohenjo-Daro: The Mound of the Dead (2600 BCE)', 'Harappa archaeological excavations in Punjab', 'Taxila Buddhist university and Sirkap Greek city'],
    included: ['Heritage hotels, AC vehicle, expert historian guide, all entrance passes'],
    excluded: ['Visa, international flights'],
    itinerary: [
      { day: 1, title: 'Karachi', description: 'Arrival.' },
      { day: 2, title: 'Thatta & Bhanbhore', description: 'Port city of Debal.' },
      { day: 3, title: 'Mohenjo-Daro Excavations', description: 'Bronze age town planning.' },
      { day: 4, title: 'Kot Diji Pre-Harappan Fort', description: 'Early civilization.' },
      { day: 5, title: 'Multan & Harappa', description: 'Harappa museum.' },
      { day: 6, title: 'Lahore & Taxila', description: 'Gandhara heritage.' },
      { day: 7, title: 'Departure', description: 'Fly home.' }
    ],
    departures: [
      { id: 'pivc-1', startDate: '05 November 2027', endDate: '15 November 2027', price: 1420, status: 'Guaranteed', seatsLeft: 8 }
    ],
    faqs: [{ question: 'Are meals included?', answer: 'Breakfast and authentic regional dinners are fully included.' }],
    reviews: []
  },
  {
    id: 'pakistan-guided-group-cultural-tour',
    slug: 'pakistan-guided-group-cultural-tour',
    title: 'Pakistan Guided Group Cultural Discovery',
    category: 'cultural',
    duration: '14 Days',
    daysCount: 14,
    price: 1690,
    originalPrice: 1950,
    discountPercent: 13,
    rating: 0,
    reviewsCount: 0,
    location: 'Lahore, Islamabad, Swat, Hunza',
    maxAltitude: '4,693 m',
    groupSize: '6 - 16 Persons',
    difficulty: 'Moderate',
    featured: true,
    bestSeller: false,
    image: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: 'Our premier all-encompassing guided tour showcasing the very best of Pakistan: historical Lahore, federal Islamabad, lush Swat Valley, and Hunza.',
    highlights: ['Badshahi Mosque & Lahore Fort', 'Swat Valley alpine lakes and Buddhist stupas', 'Karakoram Highway to Khunjerab Pass at China border'],
    included: ['All 4-star hotels, luxury bus, professional guide, meals, fees'],
    excluded: ['Flights, shopping'],
    itinerary: [
      { day: 1, title: 'Lahore Arrival', description: 'Wagah Border.' },
      { day: 2, title: 'Old Lahore & Fort', description: 'Mughal monuments.' },
      { day: 3, title: 'Islamabad & Taxila', description: 'Faisal Mosque.' },
      { day: 4, title: 'Swat Valley', description: 'Switzerland of Pakistan.' },
      { day: 5, title: 'Chilas to Hunza', description: 'KKH journey.' },
      { day: 6, title: 'Attabad Lake & Passu', description: 'Upper Hunza.' },
      { day: 7, title: 'Khunjerab Pass', description: 'Highest border.' },
      { day: 8, title: 'Return to Islamabad', description: 'Departure.' }
    ],
    departures: [
      { id: 'pgg-1', startDate: '15 September 2027', endDate: '28 September 2027', price: 1690, status: 'Guaranteed', seatsLeft: 10 }
    ],
    faqs: [{ question: 'Is single supplement available?', answer: 'Yes, private single room accommodation can be selected during booking.' }],
    reviews: []
  },
  {
    id: 'north-pakistan-guided-group-trip',
    slug: 'north-pakistan-guided-group-trip',
    title: 'North Pakistan Guided Scenic Expedition',
    category: 'cultural',
    duration: '10 Days',
    daysCount: 10,
    price: 1290,
    originalPrice: 1480,
    discountPercent: 13,
    rating: 0,
    reviewsCount: 0,
    location: 'Naran, Babusar, Hunza & Skardu',
    maxAltitude: '4,173 m (Babusar Pass)',
    groupSize: '6 - 16 Persons',
    difficulty: 'Moderate',
    featured: false,
    bestSeller: false,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: 'Cross Babusar Pass into Gilgit-Baltistan with stops at Lake Saif-ul-Malook, Rakaposhi viewpoint, Hunza Valley, and Skardu Cold Desert.',
    highlights: ['Legendary Saif-ul-Malook Lake fairy tale lore', 'Babusar Top panoramic viewpoint at 4,173m', 'Attabad Lake boating and Shangrila Resort'],
    included: ['Hotels, coaster/Prado transport, guide, breakfast & dinner'],
    excluded: ['Flights, shopping'],
    itinerary: [
      { day: 1, title: 'Islamabad to Naran', description: 'Kaghan valley.' },
      { day: 2, title: 'Saif-ul-Malook & Babusar Top', description: 'Cross into Gilgit.' },
      { day: 3, title: 'Hunza Valley', description: 'Karimabad.' },
      { day: 4, title: 'Attabad Lake & Passu', description: 'Boat ride.' },
      { day: 5, title: 'Drive to Skardu', description: 'Indus highway.' },
      { day: 6, title: 'Skardu Lakes & Dunes', description: 'Katpana cold desert.' },
      { day: 7, title: 'Return Journey', description: 'Fly to Islamabad.' }
    ],
    departures: [
      { id: 'npg-1', startDate: '01 July 2027', endDate: '10 July 2027', price: 1290, status: 'Guaranteed', seatsLeft: 8 }
    ],
    faqs: [{ question: 'When is Babusar Pass open?', answer: 'Babusar Pass is typically open from late June through late October.' }],
    reviews: []
  },
  {
    id: 'trekking-hunza-valley-and-fairy-meadow-pakistan',
    slug: 'trekking-hunza-valley-and-fairy-meadow-pakistan',
    title: 'Trekking Hunza Valley & Fairy Meadows',
    category: 'cultural',
    duration: '11 Days',
    daysCount: 11,
    price: 1380,
    originalPrice: 1580,
    discountPercent: 13,
    rating: 0,
    reviewsCount: 0,
    location: 'Hunza & Fairy Meadows',
    maxAltitude: '4,200 m',
    groupSize: '4 - 12 Persons',
    difficulty: 'Moderate',
    featured: true,
    bestSeller: false,
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: 'The definitive hybrid trek combining alpine day walks to Ultar Meadow and Rakaposhi Base Camp with the magic of Fairy Meadows facing Nanga Parbat.',
    highlights: ['Ultar Meadow hike beneath Ladyfinger Peak', 'Tagaphari Rakaposhi Base Camp view', 'Fairy Meadows & Beyal Camp'],
    included: ['Hotels, mountain cottages, jeeps, guide, meals'],
    excluded: ['Flights, tips'],
    itinerary: [
      { day: 1, title: 'Islamabad to Gilgit', description: 'Approach.' },
      { day: 2, title: 'Karimabad Hunza', description: 'Ultar gorge.' },
      { day: 3, title: 'Passu Glacier & Hussaini Bridge', description: 'Upper Hunza.' },
      { day: 4, title: 'Minapin to Rakaposhi Base Camp', description: 'Tagaphari.' },
      { day: 5, title: 'Raikot Bridge to Fairy Meadows', description: 'Cottages.' },
      { day: 6, title: 'Beyal Camp & Nanga Parbat Base', description: 'Face of the mountain.' },
      { day: 7, title: 'Return Descent & Islamabad', description: 'Fly home.' }
    ],
    departures: [
      { id: 'thv-1', startDate: '18 June 2027', endDate: '28 June 2027', price: 1380, status: 'Guaranteed', seatsLeft: 6 }
    ],
    faqs: [{ question: 'What hiking gear is recommended?', answer: 'Sturdy waterproof hiking shoes, trekking poles, layered thermal fleece, and rain gear.' }],
    reviews: []
  },
  {
    id: 'cultural-heritage-lahore-multan-peshawar-swat',
    slug: 'cultural-heritage-lahore-multan-peshawar-swat',
    title: 'Cultural Heritage: Lahore, Multan, Peshawar & Swat',
    category: 'cultural',
    duration: '14 Days',
    daysCount: 14,
    price: 1680,
    originalPrice: 1950,
    discountPercent: 14,
    rating: 0,
    reviewsCount: 0,
    location: 'Lahore, Multan, Peshawar, Taxila & Swat Valley',
    maxAltitude: '2,200 m (Malam Jabba, Swat)',
    groupSize: '2 - 14 Persons',
    difficulty: 'Moderate',
    featured: true,
    bestSeller: true,
    image: 'https://images.unsplash.com/photo-1596768401116-2cf2c3d8c631?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1596768401116-2cf2c3d8c631?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: 'A definitive 14-day grand cultural immersion across Pakistan\'s greatest historical civilizations: the Mughal palaces and Walled City of Lahore, the ancient Sufi shrines and blue pottery of Multan, the Silk Route bazaars and Khyber gateway of Peshawar, and the Gandhara Buddhist monasteries of Taxila and Swat Valley.',
    highlights: [
      'Badshahi Mosque, Lahore Fort (Sheesh Mahal), Shalimar Gardens & Wagah Border ceremony',
      'Multan City of Saints: Shah Rukn-e-Alam & Bahauddin Zakariya mausoleums',
      'Peshawar Silk Route: Qissa Khwani Bazaar, Sethi Havelis, and Mahabat Khan Mosque',
      'UNESCO World Heritage Taxila Ruins & Takht-i-Bahi Buddhist Monastery in Swat',
      'Emerald Valley of Swat: White Palace Marghazar and Mingora Museum'
    ],
    included: [
      '13 nights premium heritage and boutique hotel accommodation',
      'Private air-conditioned luxury transport throughout',
      'Licensed English-speaking historian cultural guide',
      'All monument entry tickets and Wagah Border VIP seating',
      'Daily breakfast and traditional celebratory dinners'
    ],
    excluded: [
      'International flights and Pakistan visa fees',
      'Personal expenses, shopping, and tips'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Lahore', description: 'Airport welcome and transfer to heritage hotel. Evening dinner at Fort Road Food Street overlooking Badshahi Mosque.' },
      { day: 2, title: 'Mughal Heartland of Lahore', description: 'Full day exploring Lahore Fort, Sheesh Mahal, Badshahi Mosque, and the historic Walled City bazaars.' },
      { day: 3, title: 'Shalimar Gardens & Wagah Border', description: 'Morning visit to Emperor Shah Jahan\'s Shalimar Gardens. Afternoon flag-lowering ceremony at Wagah Border.' },
      { day: 4, title: 'Lahore to Multan - City of Saints', description: 'Scenic drive to Multan via Harappa Indus Valley Civilization ruins.' },
      { day: 5, title: 'Multan Sufi Shrines & Craft Traditions', description: 'Visit the glazed blue tile shrines of Shah Rukn-e-Alam and Bahauddin Zakariya. Explore Kashigari blue pottery workshops.' },
      { day: 6, title: 'Multan to Islamabad via Katas Raj', description: 'Drive north across the Salt Range visiting the ancient Hindu temple complex of Katas Raj and Khewra Salt Mines.' },
      { day: 7, title: 'Islamabad & Rawalpindi City Tour', description: 'Visit Faisal Mosque, Pakistan Monument, Lok Virsa Heritage Museum, and the vibrant Raja Bazaar in Rawalpindi.' },
      { day: 8, title: 'Drive to Peshawar via Attock Fort', description: 'Cross the mighty Indus River at Attock Gorge. Arrive in the ancient frontier trading city of Peshawar.' },
      { day: 9, title: 'Peshawar Silk Road Bazaars & Havelis', description: 'Walk through Qissa Khwani (Storytellers) Bazaar, visit Mahabat Khan Mosque, Sethi House havelis, and Gor Khatri.' },
      { day: 10, title: 'Peshawar to Swat Valley via Takht-i-Bahi', description: 'Ascend the Malakand Pass, exploring the 1st-century CE UNESCO Gandhara monastery of Takht-i-Bahi.' },
      { day: 11, title: 'Swat Valley: Switzerland of the East', description: 'Visit the Swat Archaeological Museum, Butkara Stupa, and the historic White Palace at Marghazar.' },
      { day: 12, title: 'Upper Swat & Malam Jabba', description: 'Scenic excursion to Malam Jabba high meadow with panoramic views of the Hindu Kush peaks.' },
      { day: 13, title: 'Swat to Islamabad via Taxila', description: 'Visit Sirkap, Dharmarajika Stupa, and Taxila Museum displaying priceless Gandhara stone carvings.' },
      { day: 14, title: 'Islamabad Departure', description: 'Souvenir shopping and transfer to Islamabad International Airport for onward flight.' }
    ],
    departures: [
      { id: 'ch-1', startDate: '10 October 2027', endDate: '23 October 2027', price: 1680, status: 'Guaranteed', seatsLeft: 6 },
      { id: 'ch-2', startDate: '05 November 2027', endDate: '18 November 2027', price: 1680, status: 'Guaranteed', seatsLeft: 8 }
    ],
    faqs: [
      { question: 'Is this cultural tour suitable for families and senior travelers?', answer: 'Yes! This tour is conducted via private air-conditioned transport with relaxed hotel stays and gentle city walking tours.' }
    ],
    reviews: []
  }
];
