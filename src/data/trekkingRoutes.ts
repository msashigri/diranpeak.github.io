export interface RouteWaypoint {
  id: string;
  name: string;
  dayNumber?: number;
  altitude: number; // in meters
  lat: number;
  lng: number;
  type: 'city' | 'trailhead' | 'camp' | 'glacier' | 'basecamp' | 'pass' | 'summit';
  description: string;
  terrain?: string;
  highlight?: string;
}

export interface TrekkingRoute {
  tourId: string;
  title: string;
  distanceKm: number;
  maxAltitudeM: number;
  elevationGainM: number;
  daysOnGlacier: number;
  summary: string;
  waypoints: RouteWaypoint[];
  pathCoordinates: [number, number][]; // [lat, lng][]
}

export const TREKKING_ROUTES: Record<string, TrekkingRoute> = {
  'k2-base-camp-trek': {
    tourId: 'k2-base-camp-trek',
    title: 'K2 Base Camp & Concordia Trekking Route',
    distanceKm: 160,
    maxAltitudeM: 5150,
    elevationGainM: 2102,
    daysOnGlacier: 10,
    summary: 'The world-famous Baltoro Glacier trek through the throne room of mountain gods to the base of K2 (8,611m).',
    waypoints: [
      {
        id: 'skardu',
        name: 'Skardu',
        dayNumber: 2,
        altitude: 2228,
        lat: 35.2971,
        lng: 75.6333,
        type: 'city',
        description: 'Capital of Baltistan, expedition briefing and gear check at Diran Peak Adventure base office.',
        terrain: 'Township / Oasis Valley'
      },
      {
        id: 'askole',
        name: 'Askole',
        dayNumber: 4,
        altitude: 3048,
        lat: 35.6738,
        lng: 75.8239,
        type: 'trailhead',
        description: 'The last permanent village in the Shigar valley. End of the jeep road and beginning of foot trek.',
        terrain: 'Terraced fields & riverbank',
        highlight: 'Last settlement before Karakoram wilderness'
      },
      {
        id: 'korofon',
        name: 'Korofon / Jhola',
        dayNumber: 5,
        altitude: 3200,
        lat: 35.7194,
        lng: 76.0125,
        type: 'camp',
        description: 'Campsite at the confluence of the Braldu and Dumordo rivers near wire rope suspension bridge.',
        terrain: 'Stony floodplains & river gorges'
      },
      {
        id: 'paiju',
        name: 'Paiju Camp',
        dayNumber: 6,
        altitude: 3450,
        lat: 35.7333,
        lng: 76.1667,
        type: 'camp',
        description: 'First view of the snout of Baltoro Glacier and towering granite needles of Paiju Peak (6,610m). Last grove of willow and poplar trees.',
        terrain: 'Sandy terrace with spring water',
        highlight: 'Traditional rest & acclimatization day for porters'
      },
      {
        id: 'khoburtse',
        name: 'Khoburtse',
        dayNumber: 8,
        altitude: 3930,
        lat: 35.7278,
        lng: 76.2889,
        type: 'glacier',
        description: 'High lateral moraine camp on the southern bank of Baltoro Glacier, looking across at Trango Towers.',
        terrain: 'Glacial lateral moraine'
      },
      {
        id: 'urdukas',
        name: 'Urdukas Camp',
        dayNumber: 9,
        altitude: 4050,
        lat: 35.7300,
        lng: 76.3500,
        type: 'camp',
        description: 'Magnificent grassy ledges 100 meters above the Baltoro Glacier facing the granite obelisks of Trango Towers, Cathedral, and Great Trango.',
        terrain: 'Alpine grass terrace',
        highlight: 'Best sunset vista in the Karakoram'
      },
      {
        id: 'goro-ii',
        name: 'Goro II',
        dayNumber: 10,
        altitude: 4300,
        lat: 35.7417,
        lng: 76.4833,
        type: 'glacier',
        description: 'Camping directly on the rock-strewn ice of Baltoro Glacier beneath the massive bulk of Masherbrum (7,821m).',
        terrain: 'Glacier ice & moraine'
      },
      {
        id: 'concordia',
        name: 'Concordia (Throne Room)',
        dayNumber: 11,
        altitude: 4600,
        lat: 35.7333,
        lng: 76.5167,
        type: 'glacier',
        description: 'The monumental confluence of Baltoro and Godwin-Austen glaciers. 360° amphitheater surrounded by K2, Broad Peak, Gasherbrum IV, and Mitre Peak.',
        terrain: 'Open glacier junction',
        highlight: 'One of the greatest mountain vistas on Earth'
      },
      {
        id: 'broad-peak-bc',
        name: 'Broad Peak Base Camp',
        dayNumber: 12,
        altitude: 4960,
        lat: 35.8083,
        lng: 76.5667,
        type: 'basecamp',
        description: 'Moraine plateau beneath the west face of Broad Peak (8,047m), midway along the Godwin-Austen Glacier.',
        terrain: 'Debris-covered glacial ice'
      },
      {
        id: 'k2-base-camp',
        name: 'K2 Base Camp & Gilkey Memorial',
        dayNumber: 13,
        altitude: 5150,
        lat: 35.8450,
        lng: 76.5133,
        type: 'basecamp',
        description: 'The apex of the trek at the foot of K2 (8,611m) and the Abruzzi Ridge. Visit the historic Art Gilkey memorial plaque.',
        terrain: 'Upper Godwin-Austen Glacier',
        highlight: 'Standing face-to-face with the King of Mountains'
      }
    ],
    pathCoordinates: [
      [35.2971, 75.6333], // Skardu
      [35.4500, 75.6900], // Shigar Road
      [35.6100, 75.7600], // Braldu Gorge
      [35.6738, 75.8239], // Askole
      [35.7000, 75.9200], // Braldu River
      [35.7194, 76.0125], // Korofon / Jhola
      [35.7250, 76.0900], // Bardumal
      [35.7333, 76.1667], // Paiju
      [35.7310, 76.2200], // Baltoro Glacier Snout
      [35.7278, 76.2889], // Khoburtse
      [35.7300, 76.3500], // Urdukas
      [35.7360, 76.4150], // Biange
      [35.7417, 76.4833], // Goro II
      [35.7333, 76.5167], // Concordia
      [35.7700, 76.5350], // Godwin Austen Glacier mid
      [35.8083, 76.5667], // Broad Peak BC
      [35.8450, 76.5133]  // K2 Base Camp
    ]
  },

  'k2-gondogoro-la-trek': {
    tourId: 'k2-gondogoro-la-trek',
    title: 'K2 & Gondogoro La High Pass Circuit',
    distanceKm: 185,
    maxAltitudeM: 5585,
    elevationGainM: 2537,
    daysOnGlacier: 12,
    summary: 'The ultimate Karakoram loop: trekking past K2 to Concordia, ascending over the glaciated Gondogoro La (5,585m), and exiting down Hushe Valley.',
    waypoints: [
      {
        id: 'skardu',
        name: 'Skardu',
        altitude: 2228,
        lat: 35.2971,
        lng: 75.6333,
        type: 'city',
        description: 'Baltistan starting point.'
      },
      {
        id: 'askole',
        name: 'Askole',
        altitude: 3048,
        lat: 35.6738,
        lng: 75.8239,
        type: 'trailhead',
        description: 'Trailhead village.'
      },
      {
        id: 'paiju',
        name: 'Paiju',
        altitude: 3450,
        lat: 35.7333,
        lng: 76.1667,
        type: 'camp',
        description: 'Snout of Baltoro Glacier.'
      },
      {
        id: 'urdukas',
        name: 'Urdukas',
        altitude: 4050,
        lat: 35.7300,
        lng: 76.3500,
        type: 'camp',
        description: 'Opposite Trango Towers.'
      },
      {
        id: 'concordia',
        name: 'Concordia',
        altitude: 4600,
        lat: 35.7333,
        lng: 76.5167,
        type: 'glacier',
        description: 'Junction of Baltoro and Godwin-Austen glaciers.'
      },
      {
        id: 'k2-bc',
        name: 'K2 Base Camp',
        altitude: 5150,
        lat: 35.8450,
        lng: 76.5133,
        type: 'basecamp',
        description: 'Foot of K2.'
      },
      {
        id: 'ali-camp',
        name: 'Ali Camp',
        altitude: 5010,
        lat: 35.6500,
        lng: 76.5167,
        type: 'glacier',
        description: 'High staging camp beneath Gondogoro Glacier headwall for midnight pass crossing.'
      },
      {
        id: 'gondogoro-la',
        name: 'Gondogoro La Pass',
        altitude: 5585,
        lat: 35.6333,
        lng: 76.4833,
        type: 'pass',
        description: 'Stunning glaciated col at 5,585m with views of all four 8,000m peaks and needle spire of Laila Peak.',
        highlight: 'Highest point of the trek (5,585 m)'
      },
      {
        id: 'xhuspang',
        name: 'Xhuspang Camp',
        altitude: 4680,
        lat: 35.6000,
        lng: 76.4500,
        type: 'camp',
        description: 'Sheltered meadow at the foot of Laila Peak.'
      },
      {
        id: 'shaicho',
        name: 'Shaicho',
        altitude: 3330,
        lat: 35.4833,
        lng: 76.3833,
        type: 'camp',
        description: 'Pleasant birch forest camp at the junction of Gondogoro and Charakusa valleys.'
      },
      {
        id: 'hushe',
        name: 'Hushe Village',
        altitude: 3050,
        lat: 35.4333,
        lng: 76.3500,
        type: 'trailhead',
        description: 'Famous mountaineering village of Baltistan; roadhead return to Skardu.'
      }
    ],
    pathCoordinates: [
      [35.2971, 75.6333], // Skardu
      [35.6738, 75.8239], // Askole
      [35.7194, 76.0125], // Jhola
      [35.7333, 76.1667], // Paiju
      [35.7278, 76.2889], // Khoburtse
      [35.7300, 76.3500], // Urdukas
      [35.7417, 76.4833], // Goro II
      [35.7333, 76.5167], // Concordia
      [35.8450, 76.5133], // K2 BC detour
      [35.7333, 76.5167], // Concordia
      [35.6500, 76.5167], // Ali Camp
      [35.6333, 76.4833], // Gondogoro La Pass
      [35.6000, 76.4500], // Xhuspang
      [35.4833, 76.3833], // Shaicho
      [35.4333, 76.3500], // Hushe
      [35.2971, 75.6333]  // Return Skardu
    ]
  },

  'spantik-peak-expedition': {
    tourId: 'spantik-peak-expedition',
    title: 'Spantik (Golden Peak, 7,027m) Route',
    distanceKm: 75,
    maxAltitudeM: 7027,
    elevationGainM: 2727,
    daysOnGlacier: 18,
    summary: 'The classic Southeast Ridge climbing route on Spantik Peak via Chogo Lungma Glacier.',
    waypoints: [
      {
        id: 'skardu',
        name: 'Skardu',
        altitude: 2228,
        lat: 35.2971,
        lng: 75.6333,
        type: 'city',
        description: 'Base town in Baltistan'
      },
      {
        id: 'arandu',
        name: 'Arandu Village',
        altitude: 2770,
        lat: 35.8667,
        lng: 75.3167,
        type: 'trailhead',
        description: 'Head of Basha valley, last road accessible outpost.'
      },
      {
        id: 'chogo-lungma',
        name: 'Chogo Lungma Moraine',
        altitude: 3600,
        lat: 35.9300,
        lng: 75.1800,
        type: 'glacier',
        description: 'Expedition trek along the ancient Chogo Lungma Glacier.'
      },
      {
        id: 'spantik-bc',
        name: 'Spantik Base Camp',
        altitude: 4300,
        lat: 36.0100,
        lng: 75.0500,
        type: 'basecamp',
        description: 'Grassy campsite beneath the south face with water source.',
        highlight: 'Expedition HQ for acclimatization rotations'
      },
      {
        id: 'spantik-c1',
        name: 'Camp 1 (Snow Plateau)',
        altitude: 5100,
        lat: 36.0300,
        lng: 75.0100,
        type: 'camp',
        description: 'Ascending moderate 35° snow slopes to broad ridge.'
      },
      {
        id: 'spantik-c2',
        name: 'Camp 2',
        altitude: 5500,
        lat: 36.0450,
        lng: 74.9900,
        type: 'camp',
        description: 'Below the main technical snow ridge.'
      },
      {
        id: 'spantik-c3',
        name: 'Camp 3 (High Summit Camp)',
        altitude: 6300,
        lat: 36.0520,
        lng: 74.9750,
        type: 'camp',
        description: 'Final push launch pad on the upper snow ridge.'
      },
      {
        id: 'spantik-summit',
        name: 'Spantik Summit',
        altitude: 7027,
        lat: 36.0583,
        lng: 74.9667,
        type: 'summit',
        description: 'Summit of Golden Peak (7,027m) overlooking Rakaposhi, Diran, and Haramosh.',
        highlight: '7,027m Peak Summit'
      }
    ],
    pathCoordinates: [
      [35.2971, 75.6333],
      [35.8667, 75.3167],
      [35.9300, 75.1800],
      [36.0100, 75.0500],
      [36.0300, 75.0100],
      [36.0450, 74.9900],
      [36.0520, 74.9750],
      [36.0583, 74.9667]
    ]
  },

  'nanga-parbat-rakaposhi-base-camp-trek': {
    tourId: 'nanga-parbat-rakaposhi-base-camp-trek',
    title: 'Nanga Parbat & Rakaposhi Base Camp Route',
    distanceKm: 85,
    maxAltitudeM: 3967,
    elevationGainM: 1967,
    daysOnGlacier: 4,
    summary: 'Trek from the legendary Fairy Meadows to the foot of the Rupal/Raiko face of Nanga Parbat (8,126m), then into Hunza valley for Rakaposhi Base Camp.',
    waypoints: [
      {
        id: 'islamabad',
        name: 'Islamabad',
        altitude: 540,
        lat: 33.6844,
        lng: 73.0479,
        type: 'city',
        description: 'Federal capital briefing.'
      },
      {
        id: 'chilas',
        name: 'Chilas / Indus River',
        altitude: 1265,
        lat: 35.4206,
        lng: 74.0967,
        type: 'city',
        description: 'Karakoram Highway junction on the Indus.'
      },
      {
        id: 'raikot-bridge',
        name: 'Raikot Bridge',
        altitude: 1100,
        lat: 35.4950,
        lng: 74.6000,
        type: 'trailhead',
        description: 'Jeep track entrance across Raikot bridge into Tattu village.'
      },
      {
        id: 'fairy-meadows',
        name: 'Fairy Meadows',
        altitude: 3300,
        lat: 35.3850,
        lng: 74.5800,
        type: 'camp',
        description: 'Idyllic alpine pine forest meadow looking directly at the sheer north face of Nanga Parbat.',
        highlight: 'World-famous Fairy Meadows viewpoint'
      },
      {
        id: 'beyal-camp',
        name: 'Beyal Camp',
        altitude: 3550,
        lat: 35.3300,
        lng: 74.5850,
        type: 'camp',
        description: 'Tranquil pasture camp on the edge of Raikot Glacier.'
      },
      {
        id: 'nanga-parbat-bc',
        name: 'Nanga Parbat Base Camp',
        altitude: 3967,
        lat: 35.2375,
        lng: 74.5892,
        type: 'basecamp',
        description: 'Base of the Killer Mountain (8,126m) on the Raikot Glacier moraine.',
        highlight: 'Direct face of the 9th highest mountain on Earth'
      },
      {
        id: 'karimabad-hunza',
        name: 'Karimabad, Hunza Valley',
        altitude: 2438,
        lat: 36.3167,
        lng: 74.6500,
        type: 'city',
        description: 'Ancient Silk Road capital with Baltit and Altit forts.'
      },
      {
        id: 'rakaposhi-bc',
        name: 'Rakaposhi Base Camp (Tagaphari)',
        altitude: 3500,
        lat: 36.1950,
        lng: 74.4750,
        type: 'basecamp',
        description: 'Verdant grassy camp on the Minapin Glacier facing the sheer 6,000-meter wall of Rakaposhi (7,788m).',
        highlight: 'World-renowned uninterrupted vertical rise'
      }
    ],
    pathCoordinates: [
      [33.6844, 73.0479], // Islamabad
      [35.4206, 74.0967], // Chilas
      [35.4950, 74.6000], // Raikot Bridge
      [35.3850, 74.5800], // Fairy Meadows
      [35.3300, 74.5850], // Beyal
      [35.2375, 74.5892], // Nanga Parbat BC
      [36.3167, 74.6500], // Karimabad Hunza
      [36.1950, 74.4750]  // Rakaposhi BC
    ]
  },

  'broad-peak-expedition': {
    tourId: 'broad-peak-expedition',
    title: 'Broad Peak (8,047m) Expedition Route',
    distanceKm: 170,
    maxAltitudeM: 8047,
    elevationGainM: 5047,
    daysOnGlacier: 35,
    summary: 'Standard West Ridge route on Broad Peak across the Godwin-Austen Glacier.',
    waypoints: [
      {
        id: 'skardu',
        name: 'Skardu',
        altitude: 2228,
        lat: 35.2971,
        lng: 75.6333,
        type: 'city',
        description: 'Expedition assembly point'
      },
      {
        id: 'concordia',
        name: 'Concordia',
        altitude: 4600,
        lat: 35.7333,
        lng: 76.5167,
        type: 'glacier',
        description: 'Glacier junction'
      },
      {
        id: 'broad-peak-bc',
        name: 'Broad Peak Base Camp',
        altitude: 4960,
        lat: 35.8083,
        lng: 76.5667,
        type: 'basecamp',
        description: 'Base camp on Godwin Austen moraine.'
      },
      {
        id: 'broad-peak-c1',
        name: 'Camp 1',
        altitude: 5700,
        lat: 35.8090,
        lng: 76.5670,
        type: 'camp',
        description: 'Snow platform on rocky spur.'
      },
      {
        id: 'broad-peak-c2',
        name: 'Camp 2',
        altitude: 6400,
        lat: 35.8100,
        lng: 76.5680,
        type: 'camp',
        description: 'Narrow snow ledge beneath the yellow tower.'
      },
      {
        id: 'broad-peak-c3',
        name: 'Camp 3',
        altitude: 7100,
        lat: 35.8110,
        lng: 76.5690,
        type: 'camp',
        description: 'Upper snow col staging area for summit push.'
      },
      {
        id: 'broad-peak-summit',
        name: 'Broad Peak Summit',
        altitude: 8047,
        lat: 35.8117,
        lng: 76.5694,
        type: 'summit',
        description: '12th highest peak in the world (8,047m).'
      }
    ],
    pathCoordinates: [
      [35.2971, 75.6333],
      [35.6738, 75.8239],
      [35.7333, 76.1667],
      [35.7300, 76.3500],
      [35.7333, 76.5167],
      [35.8083, 76.5667],
      [35.8090, 76.5670],
      [35.8100, 76.5680],
      [35.8110, 76.5690],
      [35.8117, 76.5694]
    ]
  },

  'k2-climbing-expedition': {
    tourId: 'k2-climbing-expedition',
    title: 'K2 Climbing Expedition (8,611m) - Abruzzi Spur',
    distanceKm: 180,
    maxAltitudeM: 8611,
    elevationGainM: 5563,
    daysOnGlacier: 45,
    summary: 'The Savage Mountain summit route via the historic Abruzzi Ridge, House\'s Chimney, Black Pyramid, and the Bottleneck.',
    waypoints: [
      {
        id: 'skardu',
        name: 'Skardu',
        altitude: 2228,
        lat: 35.2971,
        lng: 75.6333,
        type: 'city',
        description: 'Base of operations in Baltistan'
      },
      {
        id: 'concordia',
        name: 'Concordia',
        altitude: 4600,
        lat: 35.7333,
        lng: 76.5167,
        type: 'glacier',
        description: 'Glacial crossroads of the Karakoram'
      },
      {
        id: 'k2-bc',
        name: 'K2 Base Camp',
        altitude: 5150,
        lat: 35.8450,
        lng: 76.5133,
        type: 'basecamp',
        description: 'Main expedition village beneath the South Face of K2.'
      },
      {
        id: 'k2-abc',
        name: 'Advanced Base Camp (ABC)',
        altitude: 5300,
        lat: 35.8550,
        lng: 76.5133,
        type: 'camp',
        description: 'Base of the Abruzzi Spur.'
      },
      {
        id: 'k2-c1',
        name: 'Camp 1 (Abruzzi Ridge)',
        altitude: 6050,
        lat: 35.8620,
        lng: 76.5133,
        type: 'camp',
        description: 'Sharp snow crest above first rock band.'
      },
      {
        id: 'k2-c2',
        name: 'Camp 2 (House\'s Chimney)',
        altitude: 6700,
        lat: 35.8680,
        lng: 76.5133,
        type: 'camp',
        description: 'Above the famous 30-meter vertical rock chimney.'
      },
      {
        id: 'k2-c3',
        name: 'Camp 3 (Black Pyramid)',
        altitude: 7350,
        lat: 35.8740,
        lng: 76.5133,
        type: 'camp',
        description: 'Positioned above the mixed rock & ice Black Pyramid.'
      },
      {
        id: 'k2-c4',
        name: 'Camp 4 (The Shoulder)',
        altitude: 7950,
        lat: 35.8780,
        lng: 76.5133,
        type: 'camp',
        description: 'Death zone launch site on the snow shoulder.'
      },
      {
        id: 'k2-summit',
        name: 'K2 Summit (Chogori)',
        altitude: 8611,
        lat: 35.8814,
        lng: 76.5133,
        type: 'summit',
        description: 'The second highest and most ferocious mountain on planet Earth (8,611m).',
        highlight: 'King of Mountains Summit'
      }
    ],
    pathCoordinates: [
      [35.2971, 75.6333],
      [35.6738, 75.8239],
      [35.7333, 76.1667],
      [35.7333, 76.5167],
      [35.8450, 76.5133],
      [35.8550, 76.5133],
      [35.8620, 76.5133],
      [35.8680, 76.5133],
      [35.8740, 76.5133],
      [35.8780, 76.5133],
      [35.8814, 76.5133]
    ]
  },

  'khosar-gang-expedition': {
    tourId: 'khosar-gang-expedition',
    title: 'Khosar Gang Peak (6,040m) Alpine Route',
    distanceKm: 42,
    maxAltitudeM: 6040,
    elevationGainM: 3812,
    daysOnGlacier: 6,
    summary: 'The premier introductory 6,000m mountaineering peak in Shigar valley with panoramic views of the entire Karakoram range.',
    waypoints: [
      {
        id: 'skardu',
        name: 'Skardu',
        altitude: 2228,
        lat: 35.2971,
        lng: 75.6333,
        type: 'city',
        description: 'Base valley.'
      },
      {
        id: 'sildi',
        name: 'Sildi Village (Shigar)',
        altitude: 2450,
        lat: 35.4800,
        lng: 75.6500,
        type: 'trailhead',
        description: 'Orchard village trailhead.'
      },
      {
        id: 'khosar-bc',
        name: 'Khosar Gang Base Camp',
        altitude: 3800,
        lat: 35.4650,
        lng: 75.6200,
        type: 'basecamp',
        description: 'Green pasture with clean stream water.'
      },
      {
        id: 'khosar-c1',
        name: 'High Camp',
        altitude: 4850,
        lat: 35.4550,
        lng: 75.6050,
        type: 'camp',
        description: 'Snow col beneath the summit glacier.'
      },
      {
        id: 'khosar-summit',
        name: 'Khosar Gang Summit',
        altitude: 6040,
        lat: 35.4500,
        lng: 75.6000,
        type: 'summit',
        description: 'Spectacular 6,040m peak overlooking K2, Broad Peak, and Spantik.',
        highlight: '6,040m Summit'
      }
    ],
    pathCoordinates: [
      [35.2971, 75.6333],
      [35.4800, 75.6500],
      [35.4650, 75.6200],
      [35.4550, 75.6050],
      [35.4500, 75.6000]
    ]
  }
};

export const getRouteForTour = (tourId: string, slug?: string): TrekkingRoute => {
  if (TREKKING_ROUTES[tourId]) return TREKKING_ROUTES[tourId];
  if (slug && TREKKING_ROUTES[slug]) return TREKKING_ROUTES[slug];

  // Default fallback route to K2 Base Camp if not explicitly mapped
  return TREKKING_ROUTES['k2-base-camp-trek'];
};
