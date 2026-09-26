export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  altitude?: string;
  duration?: string;
  accommodation?: string;
}

export interface DepartureDate {
  id: string;
  startDate: string;
  endDate: string;
  price: number;
  status: 'Guaranteed' | 'Filling Fast' | 'Available';
  seatsLeft: number;
}

export interface TourReview {
  id: string;
  name: string;
  country: string;
  rating: number;
  date: string;
  comment: string;
  avatar?: string;
}

export interface Tour {
  id: string;
  slug: string;
  title: string;
  category: 'trekking' | 'expedition' | '6000m' | 'cultural';
  duration: string;
  daysCount: number;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  rating: number;
  reviewsCount: number;
  location: string;
  maxAltitude: string;
  groupSize: string;
  difficulty: 'Moderate' | 'Demanding' | 'Strenuous' | 'Extreme';
  featured?: boolean;
  bestSeller?: boolean;
  image: string;
  gallery: string[];
  overview: string;
  highlights: string[];
  included: string[];
  excluded: string[];
  itinerary: ItineraryDay[];
  departures: DepartureDate[];
  faqs: { question: string; answer: string }[];
  reviews: TourReview[];
}

export const TOURS_DATA: Tour[] = [
  {
    id: 'k2-base-camp-trek',
    slug: 'k2-base-camp-trek',
    title: 'K2 Base Camp Trek',
    category: 'trekking',
    duration: '21 Days',
    daysCount: 21,
    price: 2300,
    originalPrice: 2500,
    discountPercent: 8,
    rating: 4.95,
    reviewsCount: 142,
    location: 'Karakoram Range, Skardu, Pakistan',
    maxAltitude: '5,150 m (Concordia) / 5,000 m (K2 Base Camp)',
    groupSize: '4 - 12 Persons',
    difficulty: 'Strenuous',
    featured: true,
    bestSeller: true,
    image: '/src/assets/images/hero_karakoram_k2_1790420138291.jpg',
    gallery: [
      '/src/assets/images/hero_karakoram_k2_1790420138291.jpg',
      '/src/assets/images/trek_baltoro_glacier_1790420152808.jpg',
      '/src/assets/images/skardu_valley_landscape_1790420181912.jpg',
      '/src/assets/images/expedition_climbing_k2_1790420166845.jpg',
    ],
    overview: 'The K2 Base Camp Trek is considered by alpine experts as one of the ultimate wilderness journeys on Earth. Traversing the legendary 63-kilometer Baltoro Glacier, you step into Concordia—the famed "Throne Room of the Mountain Gods"—surrounded by four of the world\'s fourteen 8,000-meter peaks (K2, Broad Peak, Gasherbrum I, and Gasherbrum II). Our indigenous Balti guides ensure unmatched safety, authentic local hospitality, and pristine mountain navigation.',
    highlights: [
      'Camp at Concordia with 360-degree panoramic views of K2, Broad Peak, and Gasherbrums',
      'Pay homage at the historic Art Gilkey Memorial beneath K2’s South Face',
      'Traverse the monumental Baltoro Glacier and see Cathedral Spires and Trango Towers',
      'Explore ancient Balti culture and mountain architecture in Skardu and Shigar Valley',
      'Native certified Balti high-altitude guide team with satellite phone & medical oxygen support'
    ],
    included: [
      'All airport transfers and domestic flights (Islamabad - Skardu return)',
      'Deluxe 3-star hotel accommodation in Islamabad and Skardu (twin sharing)',
      'Full camping logistics: high-altitude all-weather tents, mess tent, toilet tent, chairs & tables',
      'All meals on the trek prepared by professional expedition chef (breakfast, hot lunch, dinner, tea/snacks)',
      'Professional Balti English-speaking licensed guide, cook, kitchen helpers, and porters',
      'Porterage of 15 kg personal luggage per trekker',
      'Government trekking permits, national park conservation fees, and toll taxes',
      'First aid kit, hyperbaric PAC chamber access, pulse oximeter, and medical oxygen cylinders'
    ],
    excluded: [
      'International flights to/from Islamabad',
      'Pakistan tourist visa fee (we provide formal Visa Invitation Letter & LOI)',
      'Personal travel, high-altitude trekking, and medical evacuation insurance (mandatory)',
      'Personal trekking gear, sleeping bag (-20°C rated), and crampons/microspikes',
      'Tips for guide, cook, kitchen crew, and porters',
      'Beverages, bottled mineral water, alcoholic drinks, and personal phone calls'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Islamabad',
        description: 'Welcome to Pakistan! Arrive at Islamabad International Airport. Our representative greets you and transfers you to the hotel. Afternoon briefing with the expedition leader and Department of Tourist Services.',
        altitude: '540 m',
        accommodation: 'Hotel in Islamabad'
      },
      {
        day: 2,
        title: 'Flight to Skardu or Karakoram Highway',
        description: 'Take the breathtaking mountain flight to Skardu, soaring past Nanga Parbat (8,126m). If flight is delayed by weather, drive via the scenic Karakoram Highway to Chilas.',
        altitude: '2,230 m',
        accommodation: 'Hotel in Skardu'
      },
      {
        day: 3,
        title: 'Acclimatization & Preparation in Skardu',
        description: 'Rest and acclimatization day in Skardu. Visit the ancient Skardu Fort (Kharpocho), Sadpara Lake, and the colorful mountain bazaar. Final gear check and porter assignments.',
        altitude: '2,230 m',
        accommodation: 'Hotel in Skardu'
      },
      {
        day: 4,
        title: '4x4 Jeep Drive from Skardu to Askole / Johla',
        description: 'Thrilling 4x4 Jeep expedition through the fertile Shigar Valley, crossing suspension bridges into the gateway of the Karakoram at Askole. Meet your porters and camping staff.',
        altitude: '3,050 m',
        duration: '6-7 hrs drive',
        accommodation: 'Campsite'
      },
      {
        day: 5,
        title: 'Trek from Askole / Johla to Paiju',
        description: 'Trek alongside the roaring Braldu River. As you turn the bend, catch your first glimpse of the Cathedral peaks and the snout of the Baltoro Glacier.',
        altitude: '3,450 m',
        duration: '6-7 hrs trek',
        accommodation: 'Paiju Campsite'
      },
      {
        day: 6,
        title: 'Rest & Acclimatization at Paiju',
        description: 'Essential rest day at Paiju under the shade of willows. The porters bake traditional Balti bread and sing folk songs. Medical checks conducted by the expedition guide.',
        altitude: '3,450 m',
        accommodation: 'Paiju Campsite'
      },
      {
        day: 7,
        title: 'Trek from Paiju to Khoburtse',
        description: 'Step onto the monumental Baltoro Glacier. Traverse lateral moraine with majestic views of Trango Towers and Great Trango rising sheer into the Karakoram sky.',
        altitude: '3,930 m',
        duration: '6 hrs trek',
        accommodation: 'Khoburtse Campsite'
      },
      {
        day: 8,
        title: 'Trek from Khoburtse to Urdukas',
        description: 'Ascend past granite spires to Urdukas, the last green campsite on the Baltoro slope. Spectacular vantage point looking straight down the glacier toward Trango and Cathedral.',
        altitude: '4,050 m',
        duration: '4-5 hrs trek',
        accommodation: 'Urdukas Campsite'
      },
      {
        day: 9,
        title: 'Trek from Urdukas to Goro II',
        description: 'Trek into the heart of the glacier along the central spine. Pass Masherbrum (7,821m) rising on your right and camp on the ice at Goro II surrounded by icy giants.',
        altitude: '4,300 m',
        duration: '6-7 hrs trek',
        accommodation: 'Goro II Campsite (On Glacier)'
      },
      {
        day: 10,
        title: 'Trek from Goro II to Concordia',
        description: 'The crowning arrival at Concordia (4,691m), the junction of the Baltoro and Godwin-Austen glaciers. 360-degree amphitheater with K2 standing majestic in front of you.',
        altitude: '4,691 m',
        duration: '5 hrs trek',
        accommodation: 'Concordia Campsite'
      },
      {
        day: 11,
        title: 'Excursion to K2 Base Camp & Gilkey Memorial',
        description: 'Early morning start towards K2 Base Camp (5,000m) and the Gilkey Memorial. Touch the base of the Savage Mountain, visit international climbing teams, and return to Concordia.',
        altitude: '5,150 m',
        duration: '8-10 hrs round trip',
        accommodation: 'Concordia Campsite'
      },
      {
        day: 12,
        title: 'Broad Peak Base Camp & Rest at Concordia',
        description: 'Explore Broad Peak Base Camp or enjoy a relaxed rest day taking photographs of the ever-changing light on K2, Chogolisa, and Mitre Peak.',
        altitude: '4,691 m',
        accommodation: 'Concordia Campsite'
      },
      {
        day: 13,
        title: 'Begin Return Trek: Concordia to Goro I',
        description: 'Begin the descent back along the Baltoro glacier. The perspective looking west offers entirely new vistas of the Karakoram aiguilles and ice formations.',
        altitude: '4,100 m',
        duration: '6 hrs trek',
        accommodation: 'Goro I Campsite'
      },
      {
        day: 14,
        title: 'Trek from Goro I to Urdukas / Khoburtse',
        description: 'Retrace footsteps with lighter backpacks and well-acclimatized legs, taking in the magnificent south faces of the Trango Towers.',
        altitude: '3,930 m',
        duration: '5 hrs trek',
        accommodation: 'Khoburtse Campsite'
      },
      {
        day: 15,
        title: 'Trek from Khoburtse to Paiju',
        description: 'Exit the ice moraine and return to the welcoming oasis of Paiju camp for a celebratory campfire dinner.',
        altitude: '3,450 m',
        duration: '5 hrs trek',
        accommodation: 'Paiju Campsite'
      },
      {
        day: 16,
        title: 'Trek from Paiju to Johla',
        description: 'Steady walk along the riverbanks back to the campsite at Johla.',
        altitude: '3,100 m',
        duration: '5-6 hrs trek',
        accommodation: 'Johla Campsite'
      },
      {
        day: 17,
        title: 'Trek to Askole & 4x4 Jeep to Skardu',
        description: 'Final short morning trek to Askole roadhead. Board rugged 4x4 jeeps for the drive back to hot showers, internet, and comfort at our hotel in Skardu.',
        altitude: '2,230 m',
        duration: '2 hrs trek + 6 hrs drive',
        accommodation: 'Hotel in Skardu'
      },
      {
        day: 18,
        title: 'Buffer Day / Cultural Tour of Skardu',
        description: 'Crucial contingency day for weather. Visit the historic Shigar Fort palace and Shangrila Lake resort.',
        altitude: '2,230 m',
        accommodation: 'Hotel in Skardu'
      },
      {
        day: 19,
        title: 'Flight from Skardu to Islamabad',
        description: 'Board scenic domestic flight back to Islamabad. Transfer to luxury hotel with evening farewell dinner.',
        altitude: '540 m',
        accommodation: 'Hotel in Islamabad'
      },
      {
        day: 20,
        title: 'Islamabad Sightseeing & Debriefing',
        description: 'Visit Faisal Mosque, Lok Virsa cultural museum, and Daman-e-Koh overlook. Official debriefing with team.',
        altitude: '540 m',
        accommodation: 'Hotel in Islamabad'
      },
      {
        day: 21,
        title: 'Homeward Departure',
        description: 'Airport transfer for your international flight home with memories of a lifetime from the throne room of the gods.',
        altitude: '540 m',
        accommodation: 'Departure'
      }
    ],
    departures: [
      { id: 'dep-1', startDate: '10 June 2026', endDate: '30 June 2026', price: 2300, status: 'Guaranteed', seatsLeft: 4 },
      { id: 'dep-2', startDate: '20 June 2026', endDate: '10 July 2026', price: 2300, status: 'Guaranteed', seatsLeft: 2 },
      { id: 'dep-3', startDate: '01 July 2026', endDate: '21 July 2026', price: 2300, status: 'Filling Fast', seatsLeft: 3 },
      { id: 'dep-4', startDate: '15 July 2026', endDate: '04 August 2026', price: 2300, status: 'Guaranteed', seatsLeft: 5 },
      { id: 'dep-5', startDate: '01 August 2026', endDate: '21 August 2026', price: 2300, status: 'Available', seatsLeft: 8 },
      { id: 'dep-6', startDate: '15 August 2026', endDate: '04 September 2026', price: 2300, status: 'Available', seatsLeft: 7 },
    ],
    faqs: [
      {
        question: 'How physically demanding is the K2 Base Camp Trek?',
        answer: 'The K2 Base Camp Trek is graded as Strenuous (Grade 5). You walk 6 to 8 hours daily over uneven moraine, glacial ice, and boulders. Excellent cardiovascular fitness, leg strength, and mental endurance are essential. Pre-trek training (hiking, stairs, running) is strongly advised.'
      },
      {
        question: 'What is the visa process for Pakistan?',
        answer: 'Citizens of 190+ countries can apply for the Pakistan Online Tourism E-Visa. Upon booking, Chogori Adventure provides you with an official Visa Invitation Letter (LOI), DTS travel registration, and detailed hotel itinerary to guarantee quick approval.'
      },
      {
        question: 'What kind of food and drinking water is provided?',
        answer: 'Our professional camp chef prepares fresh, balanced, hot meals three times daily—including soups, curries, pasta, roasted chicken, fresh bread, oatmeal, eggs, and fruit. Drinking water is boiled and filtered at every campsite; you do not need to drink untreated river water.'
      },
      {
        question: 'What happens in case of acute mountain sickness (AMS) or injury?',
        answer: 'All our guides carry pulse oximeters, medical oxygen cylinders, and comprehensive medical kits. We maintain active satellite communicators. If urgent evacuation is required, we coordinate military helicopter evacuation with Askari Aviation to the nearest hospital in Skardu.'
      }
    ],
    reviews: [
      {
        id: 'rev-1',
        name: 'Karlota Perurena',
        country: 'Spain',
        rating: 5,
        date: 'August 2025',
        comment: 'Trekking to K2 Base Camp with Chogori Adventure was the most incredible experience of my mountaineering life. The Balti staff were exceptionally attentive, the food at 4,600m in Concordia was delicious, and the safety measures gave complete peace of mind. Truly the best local team in Pakistan!'
      },
      {
        id: 'rev-2',
        name: 'Alexander Schmidt',
        country: 'Germany',
        rating: 5,
        date: 'July 2025',
        comment: '100% recommended! Having local Balti guides makes all the difference compared to foreign agencies. They know every crevasse of the Baltoro glacier like the back of their hand. Seeing K2 up close from Concordia is something you never forget.'
      },
      {
        id: 'rev-3',
        name: 'Sarah Jenkins',
        country: 'United Kingdom',
        rating: 5,
        date: 'July 2025',
        comment: 'Flawless logistics from airport pickup in Islamabad to the final celebration in Skardu. The guides are courteous, respectful, and so knowledgeable. Worth every single penny.'
      }
    ]
  },
  {
    id: 'k2-gondogoro-la-trek',
    slug: 'k2-gondogoro-la-trek',
    title: 'K2 Gondogoro La Trek',
    category: 'trekking',
    duration: '21 Days',
    daysCount: 21,
    price: 2300,
    originalPrice: 2550,
    discountPercent: 10,
    rating: 4.98,
    reviewsCount: 98,
    location: 'Baltoro Glacier to Hushe Valley, Pakistan',
    maxAltitude: '5,585 m (Gondogoro La Pass)',
    groupSize: '4 - 10 Persons',
    difficulty: 'Extreme',
    featured: true,
    bestSeller: false,
    image: '/src/assets/images/trek_baltoro_glacier_1790420152808.jpg',
    gallery: [
      '/src/assets/images/trek_baltoro_glacier_1790420152808.jpg',
      '/src/assets/images/hero_karakoram_k2_1790420138291.jpg',
      '/src/assets/images/expedition_climbing_k2_1790420166845.jpg',
    ],
    overview: 'The definitive high-altitude circuit in the Karakoram. After trekking up the Baltoro to K2 Base Camp and Concordia, this route takes on the formidable Gondogoro La Pass (5,585m) before descending into the lush Hushe Valley. Standing on the knife-edge crest of the pass offers a panorama unmatched anywhere on the planet.',
    highlights: [
      'Cross the challenging Gondogoro La pass at 5,585 meters using fixed safety lines',
      'Unsurpassed sunrise panoramic view of K2, Broad Peak, Gasherbrum I, II, and Laila Peak',
      'Circular trek entering via Askole/Braldu and exiting via the pastoral paradise of Hushe',
      'Visit both K2 Base Camp and Concordia Throne Room',
      'Experienced high-altitude rescue team and fixed-rope coordinators'
    ],
    included: [
      'Islamabad to Skardu round-trip domestic flights',
      'All road transportation in private 4x4 rugged Toyota Land Cruisers',
      'Technical safety ropes and anchors setup on Gondogoro Pass',
      'Full camping services and three hot gourmet expedition meals daily',
      '15kg luggage per trekker carried by mountain porters',
      'Rescue deposit, environmental levies, and national park permits'
    ],
    excluded: [
      'International flights and Pakistan visa fee',
      'Personal climbing harness, carabiner, and crampons (available for rent in Skardu)',
      'High-altitude emergency medical insurance'
    ],
    itinerary: [
      { day: 1, title: 'Islamabad Arrival', description: 'Meet in Islamabad, transfer to hotel, expedition briefing.' },
      { day: 2, title: 'Fly to Skardu', description: 'Scenic flight past Nanga Parbat into Skardu.' },
      { day: 3, title: 'Skardu Acclimatization', description: 'Explore local forts and prepare gear.' },
      { day: 4, title: 'Drive to Askole', description: 'Rugged 4WD jeep drive to the Askole trail head.' },
      { day: 5, title: 'Trek to Jhola', description: 'Crossing the Braldu and Dumordo river confluence.' },
      { day: 6, title: 'Trek to Paiju', description: 'Hike to the shaded camp beneath Paiju Peak.' },
      { day: 7, title: 'Rest Day at Paiju', description: 'Acclimatization day while porters bake provisions.' },
      { day: 8, title: 'Trek to Khoburtse', description: 'Traversing the snout of the Baltoro Glacier.' },
      { day: 9, title: 'Trek to Urdukas', description: 'Camp above the ice overlooking Great Trango.' },
      { day: 10, title: 'Trek to Goro II', description: 'Trekking down the central moraine past Masherbrum.' },
      { day: 11, title: 'Trek to Concordia', description: 'Arriving at the Throne Room of the Mountain Gods.' },
      { day: 12, title: 'K2 Base Camp Excursion', description: 'Hike to Gilkey Memorial and base of K2.' },
      { day: 13, title: 'Concordia to Ali Camp', description: 'Trek across Vigne Glacier to base of Gondogoro pass (4,800m).' },
      { day: 14, title: 'Cross Gondogoro La Pass (5,585m) to Khuspang', description: 'Midnight push with headlamps up fixed ropes to summit pass at sunrise. Breathtaking views of 4 eight-thousanders and Laila Peak. Descend to Khuspang.' },
      { day: 15, title: 'Trek Khuspang to Saicho', description: 'Descend along the Gondogoro glacier into green pastureland.' },
      { day: 16, title: 'Trek to Hushe & Drive to Skardu', description: 'Final hike into Hushe village, drive back to comfortable hotel in Skardu.' },
      { day: 17, title: 'Buffer Day in Skardu', description: 'Celebratory banquet with local folk music.' },
      { day: 18, title: 'Fly Skardu to Islamabad', description: 'Domestic flight to capital.' },
      { day: 19, title: 'Explore Islamabad', description: 'Markets, cultural bazaars, and farewell dinner.' },
      { day: 20, title: 'Contingency / Sightseeing', description: 'Relaxed day in Islamabad.' },
      { day: 21, title: 'Depart for Home', description: 'Transfer to international airport.' }
    ],
    departures: [
      { id: 'g-1', startDate: '25 June 2026', endDate: '15 July 2026', price: 2300, status: 'Guaranteed', seatsLeft: 3 },
      { id: 'g-2', startDate: '10 July 2026', endDate: '30 July 2026', price: 2300, status: 'Filling Fast', seatsLeft: 2 },
      { id: 'g-3', startDate: '25 July 2026', endDate: '14 August 2026', price: 2300, status: 'Guaranteed', seatsLeft: 4 },
      { id: 'g-4', startDate: '10 August 2026', endDate: '30 August 2026', price: 2300, status: 'Available', seatsLeft: 6 },
    ],
    faqs: [
      { question: 'Do I need technical mountaineering skills for Gondogoro La?', answer: 'You do not need to be an expert climber, but you should be confident walking with crampons on steep snow slopes (up to 45 degrees) and using a safety carabiner on fixed lines. Our team fixes the ropes and guides you every step.' }
    ],
    reviews: [
      { id: 'r-g1', name: 'Marco Bellini', country: 'Italy', rating: 5, date: 'July 2025', comment: 'Standing on Gondogoro Pass at 5:30 AM watching the sunrise hit K2, Broad Peak, and Laila Peak simultaneously is an image etched in my mind forever. The guides were world-class professionals.' }
    ]
  },
  {
    id: 'k2-climbing-expedition',
    slug: 'k2-climbing-expedition',
    title: 'K2 Climbing Expedition (8,611m)',
    category: 'expedition',
    duration: '50 Days',
    daysCount: 50,
    price: 9500,
    originalPrice: 11000,
    discountPercent: 14,
    rating: 5.0,
    reviewsCount: 31,
    location: 'Godwin-Austen Glacier, Gilgit-Baltistan',
    maxAltitude: '8,611 m (K2 Summit)',
    groupSize: '2 - 8 Climbers',
    difficulty: 'Extreme',
    featured: true,
    bestSeller: false,
    image: '/src/assets/images/expedition_climbing_k2_1790420166845.jpg',
    gallery: [
      '/src/assets/images/expedition_climbing_k2_1790420166845.jpg',
      '/src/assets/images/hero_karakoram_k2_1790420138291.jpg',
      '/src/assets/images/trek_baltoro_glacier_1790420152808.jpg'
    ],
    overview: 'The King of Mountains. K2 is widely revered as the purest, steepest, and most challenging 8,000-meter peak on Earth. Chogori Adventure provides premier base camp logistics, high-altitude Balti and Sherpa summit guides, extensive fixed rope infrastructure on the Abruzzi Spur and Cesen routes, high-flow supplemental oxygen systems, and unlimited weather window flexibility.',
    highlights: [
      'Full expedition base camp with heated dining dome, Wi-Fi satellite, and power generation',
      'Experienced 8,000m Balti summit guides with multiple successful K2 summits',
      'Advanced Summit Oxygen masks and cylinders (4L/min flow capabilities)',
      'Comprehensive high camp stocking: Camp 1, Camp 2 (House\'s Chimney), Camp 3 (Black Pyramid), Camp 4 (Shoulder)',
      'Government liaison officer coordination and complete royalty logistics'
    ],
    included: [
      'K2 peak royalty and climbing permit fees',
      'Full base camp infrastructure: personal tent, mess tent, solar/generator power, satellite internet',
      'High-altitude food and high-camp MSR stoves/fuel',
      'High-altitude porter support up to Camp 4',
      'Medical oxygen, emergency hyperbaric equipment, and base camp doctor assistance',
      'Government Liaison Officer fees and insurance'
    ],
    excluded: [
      'Personal high-altitude climbing kit (down suit, triple boots, ice axes)',
      'Climber summit bonus for high-altitude guides',
      'Personal helicopter rescue insurance bond'
    ],
    itinerary: [
      { day: 1, title: 'Islamabad Gathering', description: 'Team welcome, government briefing at DTS office.' },
      { day: 2, title: 'Fly to Skardu', description: 'Arrival in Skardu, mountain flight.' },
      { day: 3, title: 'Final Logistics in Skardu', description: 'Gear weighing, food packaging, and cargo truck loading.' },
      { day: 4, title: 'Jeep to Askole', description: 'Drive to the start of the Baltoro trail.' },
      { day: 5, title: 'Baltoro Approach', description: 'Trek to Paiju, Urdukas, and Concordia.' },
      { day: 10, title: 'Establish K2 Base Camp (5,000m)', description: 'Set up our state-of-the-art base camp facilities.' },
      { day: 11, title: 'Puja Ceremony & Acclimatization', description: 'Traditional blessing ceremony and route reconnaissance.' },
      { day: 12, title: 'Climbing Period (Day 12 - 42)', description: 'Rotations to Camp 1 (6,050m), Camp 2 (6,700m via House Chimney), Camp 3 (7,350m above Black Pyramid). Rest periods at Base Camp waiting for optimal summit window. Summit push via the Bottleneck (8,200m) to the summit of K2 (8,611m).' },
      { day: 43, title: 'Base Camp Cleanup & Pack Down', description: 'Leave No Trace environmental cleanup of all camps.' },
      { day: 44, title: 'Trek Return to Askole', description: 'Rapid return trek via Baltoro.' },
      { day: 48, title: 'Drive to Skardu & Fly to Islamabad', description: 'Celebratory return to the capital.' },
      { day: 50, title: 'Final Official Debrief & Departure', description: 'Presentation of official summit certificates and international departures.' }
    ],
    departures: [
      { id: 'k2-exp-26', startDate: '15 June 2026', endDate: '05 August 2026', price: 9500, status: 'Filling Fast', seatsLeft: 2 }
    ],
    faqs: [
      { question: 'What prerequisites are required to join?', answer: 'Climbers must have summited at least one other 8,000-meter peak or extensive technical peaks over 7,000m (such as Spantik, Broad Peak, or Manaslu) with verified mountaineering resume.' }
    ],
    reviews: [
      { id: 'k2-rev1', name: 'David Thorne', country: 'United States', rating: 5, date: 'August 2025', comment: 'Chogori Adventure delivered flawless base camp service on K2. Having hot meals, heated communal domes, and dependable high altitude guides made our expedition both safe and successful.' }
    ]
  },
  {
    id: 'broad-peak-expedition',
    slug: 'broad-peak-expedition',
    title: 'Broad Peak Expedition (8,047m)',
    category: 'expedition',
    duration: '45 Days',
    daysCount: 45,
    price: 5500,
    originalPrice: 6200,
    discountPercent: 11,
    rating: 4.9,
    reviewsCount: 24,
    location: 'Godwin-Austen Glacier, Pakistan',
    maxAltitude: '8,047 m',
    groupSize: '4 - 10 Climbers',
    difficulty: 'Extreme',
    featured: false,
    bestSeller: true,
    image: '/src/assets/images/hero_karakoram_k2_1790420138291.jpg',
    gallery: [
      '/src/assets/images/hero_karakoram_k2_1790420138291.jpg',
      '/src/assets/images/expedition_climbing_k2_1790420166845.jpg'
    ],
    overview: 'Standing directly opposite K2, Broad Peak (8,047m) is the 12th highest mountain in the world. Its massive, 2-kilometer wide summit crest gives the peak its famous name. Known for relatively lower objective danger compared to K2, Broad Peak is an outstanding introduction to the Karakoram eight-thousanders.',
    highlights: [
      'Climb the 12th highest mountain in the world via the West Ridge route',
      'Panoramic view of K2 right across the Godwin-Austen Glacier',
      'Base Camp situated just 3 hours walk from K2 Base Camp',
      'Full high camp logistics with fixed ropes and oxygen backup'
    ],
    included: [
      'Government climbing permit and royalty fees',
      'Base camp dome tents, kitchen facilities, generator power',
      'All meals throughout the expedition',
      'Internal domestic flights and road transport'
    ],
    excluded: ['International airfare', 'Personal climbing gear', 'Summit bonus for guide'],
    itinerary: [
      { day: 1, title: 'Islamabad', description: 'Briefing and preparation.' },
      { day: 2, title: 'Skardu', description: 'Flight to Skardu and final logistics.' },
      { day: 5, title: 'Trek Baltoro', description: 'Trek to Concordia and Broad Peak Base Camp.' },
      { day: 12, title: 'Establish Base Camp (4,850m)', description: 'Base camp setup and puja ceremony.' },
      { day: 13, title: 'Acclimatization and Rotations (Day 13-36)', description: 'Camp 1 (5,600m), Camp 2 (6,400m), Camp 3 (7,100m). Summit push along the summit ridge to Main Summit (8,047m).' },
      { day: 37, title: 'Return to Askole', description: 'Trek back along the Baltoro.' },
      { day: 45, title: 'Departure', description: 'Fly to Islamabad and international departure.' }
    ],
    departures: [
      { id: 'bp-1', startDate: '20 June 2026', endDate: '03 August 2026', price: 5500, status: 'Guaranteed', seatsLeft: 4 }
    ],
    faqs: [
      { question: 'Is oxygen mandatory for Broad Peak?', answer: 'Many experienced alpinists climb Broad Peak without supplemental oxygen, though we provide oxygen systems on request as a safety reserve.' }
    ],
    reviews: [
      { id: 'bp-rev', name: 'Jonas Lindqvist', country: 'Sweden', rating: 5, date: 'July 2025', comment: 'Reaching the summit of Broad Peak with Chogori Adventure was the peak of my life. Great porters, incredible food, solid leadership.' }
    ]
  },
  {
    id: 'khosar-gang-expedition',
    slug: 'khosar-gang-expedition',
    title: 'Khosar Gang Peak Expedition (6,040m)',
    category: '6000m',
    duration: '18 Days',
    daysCount: 18,
    price: 2600,
    originalPrice: 2850,
    discountPercent: 8,
    rating: 4.88,
    reviewsCount: 46,
    location: 'Shigar Valley, Baltistan',
    maxAltitude: '6,040 m',
    groupSize: '4 - 10 Persons',
    difficulty: 'Demanding',
    featured: false,
    bestSeller: true,
    image: '/src/assets/images/expedition_climbing_k2_1790420166845.jpg',
    gallery: [
      '/src/assets/images/expedition_climbing_k2_1790420166845.jpg',
      '/src/assets/images/skardu_valley_landscape_1790420181912.jpg'
    ],
    overview: 'Khosar Gang is the ultimate introductory 6,000-meter peak in Pakistan. Situated near Shigar Valley, it features a straightforward approach, low objective danger, and panoramic views of Spantik, K2, and the Karakoram giants. Ideal for trekkers wanting to step into mountaineering.',
    highlights: [
      'Summit a classic 6,000m Karakoram peak with certified climbing instructors',
      'Short approach from Shigar Valley minimizing fatigue',
      'Practical training on glacier travel, rope work, and ice axe self-arrest',
      'Stunning views of the Indus and Shigar river basins'
    ],
    included: ['Trekking & peak permits', 'All camp facilities and meals', 'Certified mountain guide & high porter', 'Skardu transfers'],
    excluded: ['Personal mountaineering gear (boots, crampons, harness)', 'Insurance'],
    itinerary: [
      { day: 1, title: 'Islamabad', description: 'Arrival and briefing.' },
      { day: 2, title: 'Skardu', description: 'Flight to Skardu.' },
      { day: 4, title: 'Shigar to Base Camp', description: 'Drive to Sildi village and trek to Base Camp (3,800m).' },
      { day: 7, title: 'Training & Camp 1', description: 'Snow and ice school, move to High Camp (5,200m).' },
      { day: 10, title: 'Summit Push (6,040m)', description: 'Early morning climb up snow slopes to the summit.' },
      { day: 14, title: 'Return to Skardu', description: 'Descent to Shigar and drive to Skardu.' },
      { day: 18, title: 'Departure', description: 'Return flight to Islamabad.' }
    ],
    departures: [
      { id: 'kg-1', startDate: '05 July 2026', endDate: '22 July 2026', price: 2600, status: 'Guaranteed', seatsLeft: 5 },
      { id: 'kg-2', startDate: '01 August 2026', endDate: '18 August 2026', price: 2600, status: 'Available', seatsLeft: 6 }
    ],
    faqs: [
      { question: 'Do I need prior summit experience?', answer: 'Prior trekking experience is necessary, but this peak is technically accessible to motivated beginners under our expert guide coaching.' }
    ],
    reviews: [
      { id: 'kg-rev', name: 'Camille Laurent', country: 'France', rating: 5, date: 'August 2025', comment: 'My first 6,000m peak! The guides taught me everything about crampons and roped glacier travel. Unforgettable summit sunrise!' }
    ]
  },
  {
    id: 'nanga-parbat-rakaposhi-base-camp-trek',
    slug: 'nanga-parbat-rakaposhi-base-camp-trek',
    title: 'Nanga Parbat & Rakaposhi Base Camp Trek',
    category: 'trekking',
    duration: '14 Days',
    daysCount: 14,
    price: 1650,
    originalPrice: 1850,
    discountPercent: 11,
    rating: 4.92,
    reviewsCount: 84,
    location: 'Fairy Meadows & Nagar Valley, Pakistan',
    maxAltitude: '4,100 m',
    groupSize: '4 - 14 Persons',
    difficulty: 'Moderate',
    featured: true,
    bestSeller: true,
    image: '/src/assets/images/skardu_valley_landscape_1790420181912.jpg',
    gallery: [
      '/src/assets/images/skardu_valley_landscape_1790420181912.jpg',
      '/src/assets/images/hero_karakoram_k2_1790420138291.jpg'
    ],
    overview: 'Combine two of northern Pakistan\'s most legendary viewpoints in one scenic itinerary: Fairy Meadows facing the immense 4,500m Raikot Face of Nanga Parbat (8,126m), and Taghafari facing the sheer snow pyramid of Rakaposhi (7,788m) in Nagar Valley.',
    highlights: [
      'Camp in the pine forests of Fairy Meadows with front-row views of Nanga Parbat',
      'Trek to Beyal Camp and Nanga Parbat Base Camp',
      'Explore the ancient Baltit and Altit Forts in magical Hunza Valley',
      'Trek across Minapin Glacier to Rakaposhi Base Camp'
    ],
    included: ['All hotels & luxury chalets in Fairy Meadows', '4x4 mountain jeeps on Raikot cliff road', 'All meals & local guide', 'Park entrance fees'],
    excluded: ['International flights', 'Tips & personal drinks'],
    itinerary: [
      { day: 1, title: 'Islamabad', description: 'Meet and greet.' },
      { day: 2, title: 'Fly to Gilgit or drive Chilas', description: 'Travel into northern valleys.' },
      { day: 3, title: 'Jeep to Tattu & Hike to Fairy Meadows', description: 'Enter the fairytale pine meadow.' },
      { day: 4, title: 'Nanga Parbat Base Camp', description: 'Hike to Beyal camp and the Raikot Glacier base.' },
      { day: 6, title: 'Hunza Valley', description: 'Explore Karimabad, Baltit Fort, and Attabad Lake.' },
      { day: 8, title: 'Minapin to Rakaposhi Base Camp', description: 'Hike through birch forests to Taghafari.' },
      { day: 12, title: 'Gilgit & Return', description: 'Travel back via Karakoram Highway or flight.' },
      { day: 14, title: 'Departure from Islamabad', description: 'Airport transfer.' }
    ],
    departures: [
      { id: 'np-1', startDate: '15 May 2026', endDate: '28 May 2026', price: 1650, status: 'Guaranteed', seatsLeft: 4 },
      { id: 'np-2', startDate: '10 June 2026', endDate: '23 June 2026', price: 1650, status: 'Available', seatsLeft: 7 },
      { id: 'np-3', startDate: '15 September 2026', endDate: '28 September 2026', price: 1650, status: 'Guaranteed', seatsLeft: 5 }
    ],
    faqs: [
      { question: 'Is this trek suitable for intermediate hikers?', answer: 'Yes! The trails are well established, altitudes are under 4,200m, and accommodations in Fairy Meadows include comfortable wooden log cabins with heaters.' }
    ],
    reviews: [
      { id: 'np-rev', name: 'Elena Rostova', country: 'Poland', rating: 5, date: 'September 2025', comment: 'Fairy Meadows is truly magical. Watching the sunset turn Nanga Parbat blood red from the balcony of our cabin was an experience of pure wonder.' }
    ]
  },
  {
    id: 'lahore-multan-peshawar-swat-cultural-tour',
    slug: 'lahore-multan-peshawar-swat-cultural-tour',
    title: 'Cultural Heritage: Lahore, Multan, Peshawar & Swat',
    category: 'cultural',
    duration: '12 Days',
    daysCount: 12,
    price: 1400,
    originalPrice: 1600,
    discountPercent: 12,
    rating: 4.94,
    reviewsCount: 52,
    location: 'Punjab & Khyber Pakhtunkhwa, Pakistan',
    maxAltitude: '1,500 m',
    groupSize: '4 - 15 Persons',
    difficulty: 'Moderate',
    featured: false,
    bestSeller: true,
    image: '/src/assets/images/skardu_valley_landscape_1790420181912.jpg',
    gallery: ['/src/assets/images/skardu_valley_landscape_1790420181912.jpg'],
    overview: 'Delve into 5,000 years of civilization across the historic Silk Road cities of Pakistan. Marvel at the grand Mughal architecture of Lahore (Badshahi Mosque, Lahore Fort, Shalimar Gardens), the mystical blue tile shrines of Multan, the bustling storytellers\' bazaar of Peshawar, and the ancient Buddhist stupas of the Gandhara civilization in Swat Valley.',
    highlights: [
      'UNESCO World Heritage Lahore Fort and Badshahi Mosque',
      'Wagah Border flag lowering ceremony with VIP access',
      'The mystic Sufi shrines of Multan adorned in turquoise ceramic kashi tiles',
      'Historic Qissa Khwani (Storytellers\') Bazaar in ancient Peshawar',
      'Buddhist monasteries and archaeological treasures of Gandhara in Swat'
    ],
    included: ['4-star heritage hotel accommodations', 'Air-conditioned luxury coaster bus', 'Professional English historian guides', 'All entry tickets and cultural meals'],
    excluded: ['International airfare', 'Personal souvenirs'],
    itinerary: [
      { day: 1, title: 'Arrival in Lahore', description: 'Welcome dinner in Old Anarkali.' },
      { day: 2, title: 'Mughal Splendors of Lahore', description: 'Badshahi Mosque, Wazir Khan Mosque, Lahore Fort.' },
      { day: 3, title: 'Wagah Border & Shalimar Gardens', description: 'Witness the iconic military parade.' },
      { day: 4, title: 'Multan: City of Saints', description: 'Drive to Multan, visit Shah Rukn-e-Alam shrine.' },
      { day: 6, title: 'Islamabad & Taxila', description: 'Visit UNESCO Taxila ruins, Dharmarajika stupa.' },
      { day: 7, title: 'Peshawar', description: 'Qissa Khwani bazaar, Sethi Heritage houses, Bala Hissar.' },
      { day: 9, title: 'Swat Valley: The Switzerland of the East', description: 'Explore Buddhist stupas at Butkara and Mingora.' },
      { day: 12, title: 'Islamabad Farewell', description: 'Return to Islamabad for return flight.' }
    ],
    departures: [
      { id: 'cul-1', startDate: '10 October 2026', endDate: '21 October 2026', price: 1400, status: 'Guaranteed', seatsLeft: 6 },
      { id: 'cul-2', startDate: '05 November 2026', endDate: '16 November 2026', price: 1400, status: 'Available', seatsLeft: 8 }
    ],
    faqs: [
      { question: 'What is the dress code for cultural tours?', answer: 'Pakistan is warm and welcoming, but modesty is respected. Long trousers, shirts covering shoulders, and a light scarf for women visiting sacred mosques and shrines are recommended.' }
    ],
    reviews: [
      { id: 'c-rev', name: 'Robert Tanaka', country: 'Japan', rating: 5, date: 'October 2025', comment: 'The hospitality of the Pakistani people in Peshawar and Lahore exceeded every expectation. An absolute must for history and architecture lovers.' }
    ]
  },
  {
    id: 'spantik-peak-expedition',
    slug: 'spantik-peak-expedition',
    title: 'Spantik Peak Expedition "Golden Peak" (7,027m)',
    category: 'expedition',
    duration: '30 Days',
    daysCount: 30,
    price: 3800,
    originalPrice: 4200,
    discountPercent: 9,
    rating: 4.96,
    reviewsCount: 38,
    location: 'Nagar / Arando, Karakoram',
    maxAltitude: '7,027 m',
    groupSize: '4 - 10 Climbers',
    difficulty: 'Strenuous',
    featured: true,
    bestSeller: false,
    image: '/src/assets/images/expedition_climbing_k2_1790420166845.jpg',
    gallery: ['/src/assets/images/expedition_climbing_k2_1790420166845.jpg'],
    overview: 'Spantik, also known as the Golden Peak, is one of the most accessible and aesthetic 7,000-meter peaks in the world. The South East Ridge provides a clean, safe snow and ice line without extreme objective avalanche dangers, making it the benchmark training mountain before tackling K2 or Everest.',
    highlights: [
      'Summit a majestic 7,000m Karakoram giant via the non-technical South East Ridge',
      'Ideal preparation for prospective 8,000m climbers',
      'Base Camp located in scenic alpine pastures along Chogo Lungma Glacier',
      'Certified high-altitude Balti guides with summit rope-fixing crew'
    ],
    included: ['7,000m peak royalty and government permits', 'Base camp services and 3 high camps', 'High-altitude tents & food', 'Porter carriage and guide services'],
    excluded: ['Personal climbing kit', 'Summit bonus for high-altitude guides'],
    itinerary: [
      { day: 1, title: 'Islamabad', description: 'Briefing.' },
      { day: 2, title: 'Skardu', description: 'Flight to Skardu.' },
      { day: 4, title: 'Arando Village', description: 'Jeep drive to Arando, the last settlement.' },
      { day: 7, title: 'Spantik Base Camp (4,300m)', description: 'Establish BC on Chogo Lungma glacier.' },
      { day: 8, title: 'Climbing Period (Day 8-22)', description: 'Establish Camp 1 (5,100m), Camp 2 (5,500m), and Camp 3 (6,300m). Summit push to Spantik Summit (7,027m).' },
      { day: 25, title: 'Return Trek to Arando', description: 'Descent.' },
      { day: 30, title: 'Islamabad Departure', description: 'Return flight.' }
    ],
    departures: [
      { id: 'sp-1', startDate: '01 July 2026', endDate: '30 July 2026', price: 3800, status: 'Guaranteed', seatsLeft: 4 }
    ],
    faqs: [
      { question: 'What is the success rate on Spantik?', answer: 'Under our guided expedition leadership, Spantik enjoys an over 75% summit success rate in fair weather.' }
    ],
    reviews: [
      { id: 'sp-r1', name: 'Henrik Vang', country: 'Denmark', rating: 5, date: 'July 2025', comment: 'Spantik was my dream 7,000m climb. The Chogori Adventure crew made it happen with flawless high-camp stocking and warm encouragement.' }
    ]
  }
];
