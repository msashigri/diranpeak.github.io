import { TOURS_DATA } from './toursData';

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

// Comprehensive Gazetteer of Northern Pakistan & Cultural Route Destinations
export interface GazetteerPoint {
  name: string;
  lat: number;
  lng: number;
  altitude: number;
  type: RouteWaypoint['type'];
  keywords: string[];
  terrain?: string;
}

export const PAKISTAN_GAZETTEER: GazetteerPoint[] = [
  // Federal & Gateway Cities
  { name: 'Islamabad / Rawalpindi', lat: 33.6844, lng: 73.0479, altitude: 540, type: 'city', keywords: ['islamabad', 'rawalpindi', 'airport', 'arrival in islamabad', 'arrive in islamabad', 'briefing', 'departure from islamabad'], terrain: 'Urban Valley' },
  { name: 'Taxila Archaeological Site', lat: 33.7463, lng: 72.8397, altitude: 549, type: 'city', keywords: ['taxila', 'dharmarajika', 'gandhara', 'museum'], terrain: 'Archaeological Basin' },
  { name: 'Besham / Indus Gorge', lat: 34.9255, lng: 72.8767, altitude: 610, type: 'city', keywords: ['besham', 'indus gorge', 'kkh'], terrain: 'River Canyon' },
  { name: 'Chilas / Diamer Gateway', lat: 35.4200, lng: 74.1000, altitude: 1265, type: 'city', keywords: ['chilas', 'diamer', 'indus river', 'shangrila chilas'], terrain: 'Arid Valley' },
  { name: 'Naran / Kaghan Valley', lat: 34.9080, lng: 73.6520, altitude: 2409, type: 'trailhead', keywords: ['naran', 'kaghan', 'saif ul malook'], terrain: 'Alpine Valley' },
  { name: 'Babusar Top / Pass', lat: 35.1500, lng: 74.0500, altitude: 4173, type: 'pass', keywords: ['babusar', 'babusar top', 'babusar pass'], terrain: 'High Alpine Pass' },

  // Gilgit & Nagar Valleys
  { name: 'Gilgit City', lat: 35.9221, lng: 74.3087, altitude: 1500, type: 'city', keywords: ['gilgit', 'karakoram lodge', 'kargah buddha', 'gilgit airport'], terrain: 'Confluence Valley' },
  { name: 'Naltar Valley & Lakes', lat: 36.1420, lng: 74.1950, altitude: 2900, type: 'camp', keywords: ['naltar', 'naltar lakes', 'pine forest'], terrain: 'Pine Forest & Lakes' },
  { name: 'Minapin Village (Nagar)', lat: 36.2550, lng: 74.5360, altitude: 2000, type: 'trailhead', keywords: ['minapin', 'nagar', 'diran trailhead', 'oyon'], terrain: 'Terraced Mountain Oasis' },
  { name: 'Tagaphari / Diran Base Camp', lat: 36.1600, lng: 74.6200, altitude: 3650, type: 'basecamp', keywords: ['tagaphari', 'diran base camp', 'diran bc', 'minapin glacier'], terrain: 'Glacial Lateral Moraine', },
  { name: 'Diran Peak High Camp', lat: 36.1300, lng: 74.6500, altitude: 4800, type: 'camp', keywords: ['diran high camp', 'diran c1', 'diran camp 1', 'advance base camp'], terrain: 'Glaciated Ice Ridge' },
  { name: 'Diran Peak Summit (7,273m)', lat: 36.1190, lng: 74.6560, altitude: 7273, type: 'summit', keywords: ['diran peak', 'diran peak summit', '7273m', 'diran'], terrain: 'High Glaciated Pyramid' },
  { name: 'Rakaposhi Base Camp', lat: 36.1800, lng: 74.4900, altitude: 3500, type: 'basecamp', keywords: ['rakaposhi base camp', 'rakaposhi bc', 'hapu kun', 'rakaposhi'], terrain: 'Alpine Meadow Ridge' },
  { name: 'Hoper Village & Glacier (Nagar)', lat: 36.2167, lng: 74.7833, altitude: 2790, type: 'trailhead', keywords: ['hoper', 'hopar', 'hoper glacier', 'barpu glacier'], terrain: 'Nagar Terraced Oasis' },
  { name: 'Rush Lake High Camp', lat: 36.1550, lng: 74.9100, altitude: 4694, type: 'camp', keywords: ['rush lake', 'rush lake camp', 'barpu moraine'], terrain: 'Alpine Lake Shore' },
  { name: 'Rush Peak Summit (5,098m)', lat: 36.1480, lng: 74.9250, altitude: 5098, type: 'summit', keywords: ['rush peak', 'rush peak summit', '5098m'], terrain: 'Panoramic Alpine Horn' },

  // Hunza Valley & Gojal
  { name: 'Karimabad / Baltit Fort', lat: 36.3275, lng: 74.6631, altitude: 2438, type: 'city', keywords: ['karimabad', 'baltit', 'baltit fort', 'hunza', 'altit', 'altit fort'], terrain: 'Terraced Mountain Citadel' },
  { name: 'Duikar / Eagle\'s Nest', lat: 36.3350, lng: 74.6900, altitude: 2850, type: 'camp', keywords: ['duikar', 'eagle\'s nest', 'sunset viewpoint'], terrain: 'Panoramic Ridge' },
  { name: 'Attabad Lake', lat: 36.3330, lng: 74.8670, altitude: 2559, type: 'camp', keywords: ['attabad', 'attabad lake', 'turquoise lake'], terrain: 'Turquoise Mountain Fjord' },
  { name: 'Gulmit Cultural Village', lat: 36.3750, lng: 74.8670, altitude: 2400, type: 'city', keywords: ['gulmit', 'gojal', 'ondra poygah'], terrain: 'Historic Silk Route Village' },
  { name: 'Passu Village & Cones', lat: 36.4670, lng: 74.8830, altitude: 2450, type: 'trailhead', keywords: ['passu', 'passu cones', 'passu cathedral', 'passu glacier'], terrain: 'Jagged Granite Needles' },
  { name: 'Borith Lake', lat: 36.4330, lng: 74.8600, altitude: 2600, type: 'camp', keywords: ['borith', 'borith lake'], terrain: 'Saline High Lake' },
  { name: 'Batura Glacier & Yashpirt', lat: 36.5333, lng: 74.7500, altitude: 3300, type: 'glacier', keywords: ['batura', 'batura glacier', 'yashpirt', 'kirghiz'], terrain: '60km Living Glacier' },
  { name: 'Shimshal Village & Gorge', lat: 36.4333, lng: 75.3167, altitude: 3100, type: 'trailhead', keywords: ['shimshal', 'shimshal village', 'shimshal gorge'], terrain: 'Remote High Mountain Gorge' },
  { name: 'Shimshal Pass & Shuwert (4,735m)', lat: 36.4833, lng: 75.6667, altitude: 4735, type: 'pass', keywords: ['shimshal pass', 'shuwert', 'minglik sar base'], terrain: 'Expansive Yak Pasture' },
  { name: 'Minglik Sar Summit (6,050m)', lat: 36.5167, lng: 75.6833, altitude: 6050, type: 'summit', keywords: ['minglik sar', 'minglik', '6050m'], terrain: 'Glaciated Trekking Dome' },
  { name: 'Sost Dry Port', lat: 36.6880, lng: 74.8210, altitude: 2800, type: 'city', keywords: ['sost', 'customs', 'dry port'], terrain: 'Frontier Border Town' },
  { name: 'Khunjerab Pass (Pak-China Border)', lat: 36.8500, lng: 75.4300, altitude: 4693, type: 'pass', keywords: ['khunjerab', 'khunjerab pass', 'pak-china border', 'world highest paved border'], terrain: 'High Alpine Tundra' },

  // Fairy Meadows & Nanga Parbat
  { name: 'Raikot Bridge', lat: 35.4988, lng: 74.6200, altitude: 1150, type: 'trailhead', keywords: ['raikot', 'raikot bridge', 'jeep staging'], terrain: 'Indus River Gorge' },
  { name: 'Tato / Tattu Village', lat: 35.4410, lng: 74.5710, altitude: 2300, type: 'trailhead', keywords: ['tato', 'tattu', 'jeep track end'], terrain: 'Pine Gorge Trailhead' },
  { name: 'Fairy Meadows', lat: 35.3850, lng: 74.5820, altitude: 3300, type: 'basecamp', keywords: ['fairy meadows', 'fairy meadow', 'joot'], terrain: 'Lush Alpine Pasture & Pines' },
  { name: 'Beyal Camp', lat: 35.3610, lng: 74.5930, altitude: 3550, type: 'camp', keywords: ['beyal', 'beyal camp', 'view point'], terrain: 'Moraine Birch Forest' },
  { name: 'Nanga Parbat Base Camp', lat: 35.3370, lng: 74.5980, altitude: 3967, type: 'basecamp', keywords: ['nanga parbat base camp', 'nanga parbat bc', 'raikot face', 'nanga parbat'], terrain: 'Glacial Amphitheater' },

  // Skardu & Baltistan Gateway
  { name: 'Skardu City & Lower Kachura', lat: 35.2971, lng: 75.6333, altitude: 2228, type: 'city', keywords: ['skardu', 'kachura', 'shangrila', 'skardu airport', 'kharpocho', 'flight to skardu', 'drive to skardu'], terrain: 'Baltistan Sand & Mountain Basin' },
  { name: 'Upper Kachura Lake', lat: 35.4450, lng: 75.4460, altitude: 2500, type: 'camp', keywords: ['upper kachura', 'kachura lake'], terrain: 'Cobalt Mountain Lake' },
  { name: 'Shigar Valley & Serena Fort', lat: 35.4244, lng: 75.7369, altitude: 2280, type: 'city', keywords: ['shigar', 'shigar fort', 'fong-khar'], terrain: 'Fertile River Oasis' },
  { name: 'Sarfaranga Cold Desert', lat: 35.3300, lng: 75.7100, altitude: 2300, type: 'trailhead', keywords: ['sarfaranga', 'cold desert', 'katpana'], terrain: 'High Altitude Sand Dunes' },
  { name: 'Khaplu Palace & Valley', lat: 35.1556, lng: 76.3378, altitude: 2600, type: 'city', keywords: ['khaplu', 'khaplu palace', 'yabgo'], terrain: 'Orchard Valley & Royal Fort' },
  { name: 'Machulo Village & La Viewpoint', lat: 35.2200, lng: 76.4500, altitude: 3800, type: 'basecamp', keywords: ['machulo', 'machulo la', 'k2 viewpoint', 'machulo pass'], terrain: 'Alpine Pasture & Vista Ridge' },
  { name: 'Barah Valley & Moses Peak', lat: 35.1800, lng: 76.2200, altitude: 4300, type: 'basecamp', keywords: ['barah', 'broq', 'barah broq', 'moses peak'], terrain: 'Granite Ridge Pasture' },

  // Deosai National Park (Land of Giants)
  { name: 'Deosai National Plateau', lat: 35.0300, lng: 75.4600, altitude: 4114, type: 'camp', keywords: ['deosai', 'deosai plains', 'ali malik', 'land of giants', 'bara pani', 'kala pani'], terrain: 'High Alpine Steppe Plateau' },
  { name: 'Sheosar Lake (Deosai)', lat: 35.0020, lng: 75.2450, altitude: 4142, type: 'camp', keywords: ['sheosar', 'sheosar lake'], terrain: 'Heart-Shaped Alpine Lake' },

  // Baltoro Glacier & K2 Expedition Trail
  { name: 'Askole Trailhead Village', lat: 35.6738, lng: 75.8239, altitude: 3048, type: 'trailhead', keywords: ['askole', 'last village', 'trailhead'], terrain: 'Terraced Braldu Riverbank' },
  { name: 'Korofon / Jhola Camp', lat: 35.7194, lng: 76.0125, altitude: 3200, type: 'camp', keywords: ['korofon', 'jhola', 'dumordo', 'bardumal'], terrain: 'Stony Floodplains & Gorge' },
  { name: 'Paiju Camp', lat: 35.7333, lng: 76.1667, altitude: 3450, type: 'camp', keywords: ['paiju', 'paiju camp', 'paiju peak'], terrain: 'Sandy Spring Oasis under Granite Towers' },
  { name: 'Khoburtse Lateral Camp', lat: 35.7278, lng: 76.2889, altitude: 3930, type: 'glacier', keywords: ['khoburtse', 'lateral moraine'], terrain: 'Glacier Lateral Moraine' },
  { name: 'Urdukas Campsite', lat: 35.7300, lng: 76.3500, altitude: 4050, type: 'camp', keywords: ['urdukas', 'trango towers view'], terrain: 'Grassy Ledge facing Trango Towers' },
  { name: 'Goro II Glacier Camp', lat: 35.7417, lng: 76.4833, altitude: 4300, type: 'glacier', keywords: ['goro ii', 'goro 2', 'goro i', 'baltoro ice'], terrain: 'Rock-strewn Glacier Ice' },
  { name: 'Concordia (Throne Room of Gods)', lat: 35.7333, lng: 76.5167, altitude: 4600, type: 'glacier', keywords: ['concordia', 'throne room', 'glacier confluence'], terrain: 'Open 360° Glacier Amphitheater' },
  { name: 'Pastore Peak Base Camp', lat: 35.7450, lng: 76.5100, altitude: 4700, type: 'basecamp', keywords: ['pastore base camp', 'pastore bc', 'pastore'], terrain: 'Glacial Moraine facing K2' },
  { name: 'Pastore Peak Summit (6,209m)', lat: 35.7520, lng: 76.5210, altitude: 6209, type: 'summit', keywords: ['pastore peak', 'pastore summit', '6209m'], terrain: 'Glaciated Trekking Peak Ridge' },
  { name: 'Broad Peak Base Camp', lat: 35.8083, lng: 76.5667, altitude: 4960, type: 'basecamp', keywords: ['broad peak base camp', 'broad peak bc', 'godwin austen', 'broad peak'], terrain: 'Glacial Ice Plateau' },
  { name: 'Broad Peak Summit (8,051m)', lat: 35.8117, lng: 76.5650, altitude: 8051, type: 'summit', keywords: ['broad peak summit', '8051m'], terrain: 'Razor Ice Ridge' },
  { name: 'K2 Base Camp & Gilkey Memorial', lat: 35.8450, lng: 76.5133, altitude: 5150, type: 'basecamp', keywords: ['k2 base camp', 'k2 bc', 'gilkey memorial'], terrain: 'Glacier Foot of K2' },
  { name: 'K2 Camp 1 & Abruzzi Spur', lat: 35.8620, lng: 76.5133, altitude: 6065, type: 'camp', keywords: ['k2 camp 1', 'abruzzi ridge', 'k2 c1'], terrain: 'Narrow Granite Ridge' },
  { name: 'K2 Camp 2 & House Chimney', lat: 35.8680, lng: 76.5133, altitude: 6700, type: 'camp', keywords: ['k2 camp 2', 'house chimney', 'k2 c2'], terrain: 'Vertical Rock Face' },
  { name: 'K2 Camp 3 (Black Pyramid)', lat: 35.8740, lng: 76.5133, altitude: 7350, type: 'camp', keywords: ['k2 camp 3', 'black pyramid', 'k2 c3'], terrain: 'Ice Shelf' },
  { name: 'K2 Camp 4 (The Shoulder)', lat: 35.8780, lng: 76.5133, altitude: 7950, type: 'camp', keywords: ['k2 camp 4', 'the shoulder', 'k2 c4', 'bottleneck launch'], terrain: 'Death Zone Snow Ridge' },
  { name: 'K2 Summit (8,611m)', lat: 35.8814, lng: 76.5133, altitude: 8611, type: 'summit', keywords: ['k2 summit', 'k2', '8611m', 'savage mountain'], terrain: 'World\'s Highest Karakoram Summit' },

  // Gondogoro & Hushe Valley
  { name: 'Ali Camp (Gondogoro Stage)', lat: 35.6500, lng: 76.5167, altitude: 5010, type: 'glacier', keywords: ['ali camp', 'gondogoro glacier'], terrain: 'High Moraine Staging Camp' },
  { name: 'Gondogoro La Pass (5,585m)', lat: 35.6333, lng: 76.4833, altitude: 5585, type: 'pass', keywords: ['gondogoro la', 'gondogoro pass', '5585m'], terrain: 'Glaciated High Knife Pass' },
  { name: 'Gondogoro Peak Summit (5,650m)', lat: 35.6300, lng: 76.4700, altitude: 5650, type: 'summit', keywords: ['gondogoro peak', 'gondogoro peak summit', '5650m'], terrain: 'Granite & Snow Ridge' },
  { name: 'Xhuspang High Camp', lat: 35.6000, lng: 76.4500, altitude: 4680, type: 'camp', keywords: ['xhuspang', 'foot of laila'], terrain: 'Alpine Meadow below Laila Peak' },
  { name: 'Shaicho Forest Camp', lat: 35.4833, lng: 76.3833, altitude: 3330, type: 'camp', keywords: ['shaicho', 'charakusa junction'], terrain: 'Birch Forest by Glacial Torrent' },
  { name: 'Hushe Village', lat: 35.4333, lng: 76.3500, altitude: 3050, type: 'trailhead', keywords: ['hushe', 'hushe valley'], terrain: 'Traditional Climbers Settlement' },
  { name: 'Laila Peak Base Camp', lat: 35.5100, lng: 76.4200, altitude: 4200, type: 'basecamp', keywords: ['laila peak', 'laila base camp', 'laila bc'], terrain: 'Glacier basin below Needle Spire' },
  { name: 'Laila Peak Summit (6,096m)', lat: 35.5340, lng: 76.4350, altitude: 6096, type: 'summit', keywords: ['laila peak summit', '6096m', 'laila peak'], terrain: 'Steep Granite & Ice Spear' },

  // Gasherbrum & Trango
  { name: 'Gasherbrum Base Camp', lat: 35.7200, lng: 76.6200, altitude: 5050, type: 'basecamp', keywords: ['gasherbrum', 'gasherbrum bc', 'gasherbrum base camp', 'hidden peak'], terrain: 'Glacial Moraine' },
  { name: 'Gasherbrum I Summit (8,080m)', lat: 35.7244, lng: 76.6964, altitude: 8080, type: 'summit', keywords: ['gasherbrum i', 'hidden peak', '8080m'], terrain: 'Glaciated Pyramid' },
  { name: 'Gasherbrum II Summit (8,035m)', lat: 35.7583, lng: 76.6533, altitude: 8035, type: 'summit', keywords: ['gasherbrum ii', '8035m'], terrain: 'Snow Dome' },
  { name: 'Trango Tower Base Camp', lat: 35.7500, lng: 76.3600, altitude: 4100, type: 'basecamp', keywords: ['trango', 'trango tower', 'nameless tower', 'cathedral'], terrain: 'Granite Scree' },
  { name: 'Trango Nameless Tower (6,239m)', lat: 35.7600, lng: 76.3550, altitude: 6239, type: 'summit', keywords: ['nameless tower', 'trango summit', '6239m'], terrain: 'Sheer Vertical Granite Monolith' },

  // Spantik & Khosar Gang & Gangchen
  { name: 'Arando Village (Basha)', lat: 35.8667, lng: 75.3167, altitude: 2770, type: 'trailhead', keywords: ['arando', 'basha valley', 'chogo lungma'], terrain: 'Valley Outpost' },
  { name: 'Spantik Base Camp (4,300m)', lat: 36.0100, lng: 75.0500, altitude: 4300, type: 'basecamp', keywords: ['spantik base camp', 'spantik bc', 'golden peak base'], terrain: 'Alpine Pasture with Streams' },
  { name: 'Spantik Peak Summit (7,027m)', lat: 36.0583, lng: 74.9656, altitude: 7027, type: 'summit', keywords: ['spantik', 'golden peak', '7027m'], terrain: 'Golden Granite Ridge' },
  { name: 'Sildi Village (Shigar)', lat: 35.4800, lng: 75.6500, altitude: 2450, type: 'trailhead', keywords: ['sildi', 'khosar trailhead'], terrain: 'Orchard Valley' },
  { name: 'Khosar Gang Base Camp', lat: 35.4650, lng: 75.6200, altitude: 3800, type: 'basecamp', keywords: ['khosar gang base camp', 'khosar bc', 'khosar camp'], terrain: 'Alpine Meadow' },
  { name: 'Khosar Gang Summit (6,040m)', lat: 35.4500, lng: 75.6000, altitude: 6040, type: 'summit', keywords: ['khosar gang', 'khosar summit', '6040m'], terrain: 'Ice Dome Overlooking Baltoro' },
  { name: 'Gangchen Peak Summit (6,872m)', lat: 35.8500, lng: 75.3800, altitude: 6872, type: 'summit', keywords: ['gangchan', 'gangchen', '6872m'], terrain: 'Braldu Valley Glaciated Summit' },

  // Nangma & Basha Peaks
  { name: 'Kanday Village', lat: 35.3800, lng: 76.3000, altitude: 2900, type: 'trailhead', keywords: ['kanday', 'nangma trailhead'], terrain: 'Riverbank Village' },
  { name: 'Nangma Valley Base Camp', lat: 35.3950, lng: 76.3600, altitude: 4150, type: 'basecamp', keywords: ['nangma', 'nangma valley', 'amin brakk bc', 'mingulo'], terrain: 'Granite Spire Amphitheater' },
  { name: 'Amin Brakk Summit (5,850m)', lat: 35.4050, lng: 76.3800, altitude: 5850, type: 'summit', keywords: ['amin brakk', 'amin brak', '5850m', 'great wall'], terrain: 'Overhanging Granite Big Wall' },

  // Snow Lake & Biafo-Hispar
  { name: 'Snow Lake / Lukpe Lawo', lat: 36.0000, lng: 75.6000, altitude: 4877, type: 'glacier', keywords: ['snow lake', 'lukpe lawo', 'biafo glacier', 'hispar'], terrain: 'Giant Glacial Snow Basin' },
  { name: 'Hispar La Pass (5,151m)', lat: 36.0667, lng: 75.2500, altitude: 5151, type: 'pass', keywords: ['hispar la', 'hispar pass', '5151m'], terrain: 'High Glaciated Col' },

  // Hindu Kush, Chitral & Swat
  { name: 'Chitral Town & Fort', lat: 35.8510, lng: 71.7864, altitude: 1500, type: 'city', keywords: ['chitral', 'chitral town', 'shahi mosque'], terrain: 'Hindu Kush Valley' },
  { name: 'Kalash Valleys (Bumburet)', lat: 35.7000, lng: 71.6800, altitude: 2100, type: 'city', keywords: ['kalash', 'bumburet', 'rumbur', 'birir'], terrain: 'Forested Ancient Valley' },
  { name: 'Shandur Pass (Polo Ground)', lat: 36.0833, lng: 72.5333, altitude: 3720, type: 'pass', keywords: ['shandur', 'shandur pass', 'roof of the world polo'], terrain: 'High Mountain Steppe' },
  { name: 'Yasin Valley (Koyo Zom Gateway)', lat: 36.3700, lng: 73.3400, altitude: 2600, type: 'trailhead', keywords: ['yasin', 'hindu raj', 'koyo zom trailhead'], terrain: 'River Oasis' },
  { name: 'Koyo Zom Summit (6,872m)', lat: 36.7200, lng: 73.2300, altitude: 6872, type: 'summit', keywords: ['koyo zom', 'hindu raj summit', '6872m'], terrain: 'Highest Peak of Hindu Raj' },
  { name: 'Swat Valley / Mingora', lat: 34.7750, lng: 72.3600, altitude: 984, type: 'city', keywords: ['swat', 'mingora', 'saidu sharif'], terrain: 'Lush River Valley' },
  { name: 'Malam Jabba Ski Resort', lat: 34.7990, lng: 72.5720, altitude: 2804, type: 'camp', keywords: ['malam jabba', 'ski slope'], terrain: 'Alpine Pine Ridge' },
  { name: 'Kalam & Ushu Forest', lat: 35.4850, lng: 72.5850, altitude: 2000, type: 'camp', keywords: ['kalam', 'ushu forest', 'mahudand'], terrain: 'Cedar & Glacial River Basin' },

  // Heritage Cities (Cultural Tours)
  { name: 'Lahore Walled City & Badshahi', lat: 31.5880, lng: 74.3120, altitude: 217, type: 'city', keywords: ['lahore', 'badshahi', 'lahore fort', 'wagah', 'delhi gate'], terrain: 'Mughal Historic Citadel' },
  { name: 'Multan City of Saints', lat: 30.1575, lng: 71.5249, altitude: 122, type: 'city', keywords: ['multan', 'shah rukn-e-alam', 'sufi shrines'], terrain: 'Indus Plain Oasis' },
  { name: 'Peshawar Old City & Khyber', lat: 34.0151, lng: 71.5249, altitude: 359, type: 'city', keywords: ['peshawar', 'qissa khwani', 'sethi house', 'khyber pass'], terrain: 'Silk Route Gateway' },
  { name: 'Mohenjo-Daro 5000BC', lat: 27.3292, lng: 68.1367, altitude: 52, type: 'city', keywords: ['mohenjo-daro', 'indus civilization', 'great bath'], terrain: 'Bronze Age Metropolis' },
  { name: 'Karachi Arabian Seaport', lat: 24.8607, lng: 67.0011, altitude: 10, type: 'city', keywords: ['karachi', 'arabian sea', 'clifton'], terrain: 'Coastal Metropolis' },
  { name: 'Thatta & Makli Necropolis', lat: 24.7475, lng: 67.9238, altitude: 12, type: 'city', keywords: ['thatta', 'makli', 'shah jahan mosque'], terrain: 'Historic Delta Plateau' }
];

// Helper to resolve coordinates & details from day title or description
export function matchGazetteer(text: string): GazetteerPoint | undefined {
  if (!text) return undefined;
  const s = text.toLowerCase();

  // Try direct keyword matching (prioritizing longer keywords)
  const matches = PAKISTAN_GAZETTEER.filter(g =>
    g.keywords.some(k => s.includes(k)) || s.includes(g.name.toLowerCase().split(' ')[0])
  );

  if (matches.length === 0) return undefined;

  // Return the best match by longest keyword matched
  matches.sort((a, b) => {
    const aBest = Math.max(...a.keywords.filter(k => s.includes(k)).map(k => k.length), 0);
    const bBest = Math.max(...b.keywords.filter(k => s.includes(k)).map(k => k.length), 0);
    return bBest - aBest;
  });

  return matches[0];
}

// Dynamic Day-by-Day Expedition Route Generator
export function generateRouteFromItinerary(tour: {
  id: string;
  slug?: string;
  title: string;
  location?: string;
  maxAltitude?: string;
  itinerary?: Array<{
    day: number;
    title: string;
    description: string;
    altitude?: string;
    duration?: string;
    accommodation?: string;
  }>;
}): TrekkingRoute {
  const itinerary = tour.itinerary || [];
  const waypoints: RouteWaypoint[] = [];
  const pathCoords: [number, number][] = [];

  // Anchor default locations based on general tour location
  const locStr = `${tour.location || ''} ${tour.title || ''}`.toLowerCase();
  let defaultAnchor: GazetteerPoint = PAKISTAN_GAZETTEER[0]; // Islamabad

  if (locStr.includes('skardu') || locStr.includes('baltistan') || locStr.includes('shigar') || locStr.includes('khaplu')) {
    defaultAnchor = PAKISTAN_GAZETTEER.find(g => g.name.includes('Skardu')) || PAKISTAN_GAZETTEER[0];
  } else if (locStr.includes('hunza') || locStr.includes('nagar') || locStr.includes('karimabad')) {
    defaultAnchor = PAKISTAN_GAZETTEER.find(g => g.name.includes('Karimabad')) || PAKISTAN_GAZETTEER[0];
  } else if (locStr.includes('fairy') || locStr.includes('nanga') || locStr.includes('chilas') || locStr.includes('diamer')) {
    defaultAnchor = PAKISTAN_GAZETTEER.find(g => g.name.includes('Fairy Meadows')) || PAKISTAN_GAZETTEER[0];
  } else if (locStr.includes('chitral') || locStr.includes('hindu')) {
    defaultAnchor = PAKISTAN_GAZETTEER.find(g => g.name.includes('Chitral')) || PAKISTAN_GAZETTEER[0];
  } else if (locStr.includes('swat')) {
    defaultAnchor = PAKISTAN_GAZETTEER.find(g => g.name.includes('Swat')) || PAKISTAN_GAZETTEER[0];
  } else if (locStr.includes('lahore')) {
    defaultAnchor = PAKISTAN_GAZETTEER.find(g => g.name.includes('Lahore')) || PAKISTAN_GAZETTEER[0];
  }

  let prevLat = defaultAnchor.lat;
  let prevLng = defaultAnchor.lng;
  let maxAlt = 0;
  let minAlt = 99999;
  let glacierDays = 0;

  itinerary.forEach((item, index) => {
    const combinedText = `${item.title} ${item.description}`;
    const matched = matchGazetteer(combinedText) || defaultAnchor;

    // Parse altitude if provided on item (e.g., "3,650 m", "5150m")
    let parsedAltitude = matched.altitude;
    if (item.altitude) {
      const num = parseInt(item.altitude.replace(/[^0-9]/g, ''), 10);
      if (!isNaN(num) && num > 0) {
        parsedAltitude = num;
      }
    }

    if (parsedAltitude > maxAlt) maxAlt = parsedAltitude;
    if (parsedAltitude < minAlt) minAlt = parsedAltitude;

    const isGlacier = combinedText.toLowerCase().includes('glacier') ||
                      combinedText.toLowerCase().includes('ice') ||
                      combinedText.toLowerCase().includes('concordia') ||
                      matched.type === 'glacier';
    if (isGlacier) glacierDays++;

    let lat = matched.lat;
    let lng = matched.lng;

    // If identical to previous point, create slight progressive step along the route trajectory
    if (index > 0 && Math.abs(lat - prevLat) < 0.0005 && Math.abs(lng - prevLng) < 0.0005) {
      const stepFactor = (index / itinerary.length) * 0.015;
      lat += (index % 2 === 0 ? 0.003 : -0.002) + stepFactor;
      lng += (index % 2 === 0 ? 0.004 : 0.002) + stepFactor;
    }

    prevLat = lat;
    prevLng = lng;

    let cleanName = item.title.replace(/^Day\s*\d+[:\-.]\s*/i, '').trim();
    if (cleanName.length > 32) {
      cleanName = cleanName.substring(0, 30) + '...';
    }

    waypoints.push({
      id: `${tour.id}-day-${item.day}`,
      dayNumber: item.day,
      name: `Day ${item.day}: ${cleanName || matched.name}`,
      altitude: parsedAltitude,
      lat,
      lng,
      type: index === 0 ? 'city' : index === itinerary.length - 1 ? (matched.type === 'summit' ? 'summit' : 'basecamp') : matched.type,
      description: item.description || matched.name,
      terrain: item.accommodation || matched.terrain || 'Expedition Route Stage',
      highlight: item.duration ? `Duration: ${item.duration}` : undefined
    });

    pathCoords.push([lat, lng]);
  });

  // Calculate distance estimate based on coordinates
  let totalDistKm = 0;
  for (let i = 1; i < pathCoords.length; i++) {
    const [lat1, lon1] = pathCoords[i - 1];
    const [lat2, lon2] = pathCoords[i];
    const R = 6371; // km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    totalDistKm += R * c;
  }

  // Ensure minimum realistic distance
  totalDistKm = Math.max(Math.round(totalDistKm * 1.25), Math.round(itinerary.length * 14));
  const gain = Math.max(maxAlt - minAlt, 800);

  return {
    tourId: tour.id,
    title: `${tour.title} GPS Route`,
    distanceKm: totalDistKm,
    maxAltitudeM: maxAlt || 4000,
    elevationGainM: gain,
    daysOnGlacier: glacierDays,
    summary: `Complete day-by-day expedition route for ${tour.title} across ${itinerary.length} acclimatized stages.`,
    waypoints,
    pathCoordinates: pathCoords
  };
}

// Curated high-precision flagship routes
export const TREKKING_ROUTES: Record<string, TrekkingRoute> = {
  // Diran Peak (7,273m) Expedition Route - Named after Diran Peak Adventure
  'diran-peak-7273-m-expedition': {
    tourId: 'diran-peak-7273-m-expedition',
    title: 'Diran Peak (7,273m) & Minapin Glacier Expedition Route',
    distanceKm: 65,
    maxAltitudeM: 7273,
    elevationGainM: 5273,
    daysOnGlacier: 12,
    summary: 'The classic northwest face & Minapin Glacier approach to the stunning pyramid of Diran Peak (7,273m) in Nagar Valley.',
    waypoints: [
      { id: 'islamabad', name: 'Islamabad Gateway', dayNumber: 1, altitude: 540, lat: 33.6844, lng: 73.0479, type: 'city', description: 'Expedition briefing and equipment checks at Diran Peak Adventure office.' },
      { id: 'chilas', name: 'Chilas / KKH', dayNumber: 2, altitude: 1265, lat: 35.4200, lng: 74.1000, type: 'city', description: 'Scenic drive along the Karakoram Highway through the Indus River gorge.' },
      { id: 'minapin', name: 'Minapin Village', dayNumber: 3, altitude: 2000, lat: 36.2550, lng: 74.5360, type: 'trailhead', description: 'Scenic fruit orchard village in Nagar Valley; trailhead for the expedition.', highlight: 'Trailhead village of Nagar' },
      { id: 'tagaphari', name: 'Tagaphari / Base Camp', dayNumber: 4, altitude: 3650, lat: 36.1600, lng: 74.6200, type: 'basecamp', description: 'Main expedition base camp situated on grassy lateral moraine beside Minapin Glacier.', highlight: 'HQ beneath Diran North Face' },
      { id: 'diran-c1', name: 'Advance Base Camp (ABC)', dayNumber: 5, altitude: 4400, lat: 36.1450, lng: 74.6350, type: 'camp', description: 'High camp nestled beneath the Minapin icefall and serrated snow ridge.' },
      { id: 'diran-c2', name: 'High Camp 2', dayNumber: 6, altitude: 5500, lat: 36.1300, lng: 74.6500, type: 'camp', description: 'Established on the upper snow col between Diran and Rakaposhi.' },
      { id: 'diran-summit', name: 'Diran Peak Summit (7,273m)', dayNumber: 7, altitude: 7273, lat: 36.1190, lng: 74.6560, type: 'summit', description: 'The glaciated summit of Diran Peak overlooking the entire Karakoram & Hunza panorama.', highlight: '7,273m Karakoram Summit' }
    ],
    pathCoordinates: [
      [33.6844, 73.0479], // Islamabad
      [35.4200, 74.1000], // Chilas
      [35.9221, 74.3087], // Gilgit
      [36.2550, 74.5360], // Minapin
      [36.2000, 74.5800], // Minapin Valley
      [36.1600, 74.6200], // Tagaphari Base Camp
      [36.1450, 74.6350], // ABC
      [36.1300, 74.6500], // Camp 2
      [36.1190, 74.6560]  // Diran Peak Summit
    ]
  },

  'k2-base-camp-trek': {
    tourId: 'k2-base-camp-trek',
    title: 'K2 Base Camp & Concordia Trekking Route',
    distanceKm: 160,
    maxAltitudeM: 5150,
    elevationGainM: 2102,
    daysOnGlacier: 10,
    summary: 'The world-famous Baltoro Glacier trek through the throne room of mountain gods to the base of K2 (8,611m).',
    waypoints: [
      { id: 'islamabad', name: 'Islamabad', dayNumber: 1, altitude: 540, lat: 33.6844, lng: 73.0479, type: 'city', description: 'Arrival and expedition orientation.' },
      { id: 'skardu', name: 'Skardu', dayNumber: 2, altitude: 2228, lat: 35.2971, lng: 75.6333, type: 'city', description: 'Capital of Baltistan, briefing and gear check.', terrain: 'Township / Oasis Valley' },
      { id: 'askole', name: 'Askole', dayNumber: 4, altitude: 3048, lat: 35.6738, lng: 75.8239, type: 'trailhead', description: 'Last permanent village; end of jeep track.', highlight: 'Last settlement before Baltoro' },
      { id: 'korofon', name: 'Korofon / Jhola', dayNumber: 5, altitude: 3200, lat: 35.7194, lng: 76.0125, type: 'camp', description: 'Campsite at the confluence of Braldu and Dumordo rivers.' },
      { id: 'paiju', name: 'Paiju Camp', dayNumber: 6, altitude: 3450, lat: 35.7333, lng: 76.1667, type: 'camp', description: 'First view of the snout of Baltoro Glacier and Paiju Peak (6,610m).' },
      { id: 'khoburtse', name: 'Khoburtse', dayNumber: 8, altitude: 3930, lat: 35.7278, lng: 76.2889, type: 'glacier', description: 'High lateral moraine camp looking across at Trango Towers.' },
      { id: 'urdukas', name: 'Urdukas Camp', dayNumber: 9, altitude: 4050, lat: 35.7300, lng: 76.3500, type: 'camp', description: 'Grassy ledges facing Trango Towers, Cathedral, and Great Trango.' },
      { id: 'goro-ii', name: 'Goro II', dayNumber: 10, altitude: 4300, lat: 35.7417, lng: 76.4833, type: 'glacier', description: 'Camping directly on the ice of Baltoro Glacier beneath Masherbrum.' },
      { id: 'concordia', name: 'Concordia (Throne Room)', dayNumber: 11, altitude: 4600, lat: 35.7333, lng: 76.5167, type: 'glacier', description: 'Confluence of Baltoro and Godwin-Austen glaciers. 360° mountain amphitheater.', highlight: 'Throne Room of Mountain Gods' },
      { id: 'broad-peak-bc', name: 'Broad Peak BC', dayNumber: 12, altitude: 4960, lat: 35.8083, lng: 76.5667, type: 'basecamp', description: 'Moraine plateau beneath the west face of Broad Peak (8,047m).' },
      { id: 'k2-base-camp', name: 'K2 Base Camp', dayNumber: 13, altitude: 5150, lat: 35.8450, lng: 76.5133, type: 'basecamp', description: 'Foot of K2 (8,611m) and the Art Gilkey memorial plaque.', highlight: 'Foot of King of Mountains' }
    ],
    pathCoordinates: [
      [33.6844, 73.0479],
      [35.2971, 75.6333],
      [35.4500, 75.6900],
      [35.6100, 75.7600],
      [35.6738, 75.8239],
      [35.7000, 75.9200],
      [35.7194, 76.0125],
      [35.7250, 76.0900],
      [35.7333, 76.1667],
      [35.7310, 76.2200],
      [35.7278, 76.2889],
      [35.7300, 76.3500],
      [35.7360, 76.4150],
      [35.7417, 76.4833],
      [35.7333, 76.5167],
      [35.7700, 76.5350],
      [35.8083, 76.5667],
      [35.8450, 76.5133]
    ]
  },

  'k2-gondogoro-la-trek': {
    tourId: 'k2-gondogoro-la-trek',
    title: 'K2 & Gondogoro La High Pass Circuit',
    distanceKm: 185,
    maxAltitudeM: 5585,
    elevationGainM: 2537,
    daysOnGlacier: 12,
    summary: 'The ultimate Karakoram circuit loop: past K2 to Concordia, ascending Gondogoro La (5,585m), and exiting Hushe Valley.',
    waypoints: [
      { id: 'skardu', name: 'Skardu', dayNumber: 2, altitude: 2228, lat: 35.2971, lng: 75.6333, type: 'city', description: 'Baltistan expedition launchpad.' },
      { id: 'askole', name: 'Askole', dayNumber: 4, altitude: 3048, lat: 35.6738, lng: 75.8239, type: 'trailhead', description: 'Trailhead village.' },
      { id: 'paiju', name: 'Paiju', dayNumber: 6, altitude: 3450, lat: 35.7333, lng: 76.1667, type: 'camp', description: 'Baltoro Glacier snout.' },
      { id: 'urdukas', name: 'Urdukas', dayNumber: 8, altitude: 4050, lat: 35.7300, lng: 76.3500, type: 'camp', description: 'Opposite Trango Towers.' },
      { id: 'concordia', name: 'Concordia', dayNumber: 10, altitude: 4600, lat: 35.7333, lng: 76.5167, type: 'glacier', description: 'Karakoram throne room.' },
      { id: 'k2-bc', name: 'K2 Base Camp', dayNumber: 11, altitude: 5150, lat: 35.8450, lng: 76.5133, type: 'basecamp', description: 'Foot of K2.' },
      { id: 'ali-camp', name: 'Ali Camp', dayNumber: 12, altitude: 5010, lat: 35.6500, lng: 76.5167, type: 'glacier', description: 'High staging camp for midnight pass crossing.' },
      { id: 'gondogoro-la', name: 'Gondogoro La Pass', dayNumber: 13, altitude: 5585, lat: 35.6333, lng: 76.4833, type: 'pass', description: 'Panoramic pass with views of four 8,000ers.', highlight: 'Highest point (5,585m)' },
      { id: 'xhuspang', name: 'Xhuspang Camp', dayNumber: 14, altitude: 4680, lat: 35.6000, lng: 76.4500, type: 'camp', description: 'Meadow at the foot of Laila Peak.' },
      { id: 'shaicho', name: 'Shaicho', dayNumber: 15, altitude: 3330, lat: 35.4833, lng: 76.3833, type: 'camp', description: 'Birch forest camp.' },
      { id: 'hushe', name: 'Hushe Village', dayNumber: 16, altitude: 3050, lat: 35.4333, lng: 76.3500, type: 'trailhead', description: 'Roadhead village.' }
    ],
    pathCoordinates: [
      [35.2971, 75.6333],
      [35.6738, 75.8239],
      [35.7194, 76.0125],
      [35.7333, 76.1667],
      [35.7278, 76.2889],
      [35.7300, 76.3500],
      [35.7417, 76.4833],
      [35.7333, 76.5167],
      [35.8450, 76.5133],
      [35.7333, 76.5167],
      [35.6500, 76.5167],
      [35.6333, 76.4833],
      [35.6000, 76.4500],
      [35.4833, 76.3833],
      [35.4333, 76.3500],
      [35.2971, 75.6333]
    ]
  },

  'fairy-meadows-trek': {
    tourId: 'fairy-meadows-trek',
    title: 'Fairy Meadows & Nanga Parbat Base Camp Route',
    distanceKm: 38,
    maxAltitudeM: 3967,
    elevationGainM: 2817,
    daysOnGlacier: 2,
    summary: 'The dramatic jeep track and pine forest trail to the mythical Fairy Meadows and the glacier foot of the Killer Mountain.',
    waypoints: [
      { id: 'islamabad', name: 'Islamabad', dayNumber: 1, altitude: 540, lat: 33.6844, lng: 73.0479, type: 'city', description: 'Expedition departure.' },
      { id: 'chilas', name: 'Chilas / Indus River', dayNumber: 2, altitude: 1265, lat: 35.4200, lng: 74.1000, type: 'city', description: 'Scenic Karakoram Highway journey.' },
      { id: 'raikot', name: 'Raikot Bridge', dayNumber: 3, altitude: 1150, lat: 35.4988, lng: 74.6200, type: 'trailhead', description: 'Transfer to open 4x4 mountain jeeps.' },
      { id: 'tato', name: 'Tato Village', dayNumber: 3, altitude: 2300, lat: 35.4410, lng: 74.5710, type: 'trailhead', description: 'Cliff-carved jeep road end; foot trail begins.' },
      { id: 'fairy-meadows', name: 'Fairy Meadows', dayNumber: 4, altitude: 3300, lat: 35.3850, lng: 74.5820, type: 'basecamp', description: 'Lush alpine pasture overlooking Nanga Parbat Raikot face (8,126m).', highlight: 'World Famous Fairy Meadows' },
      { id: 'beyal', name: 'Beyal Camp', dayNumber: 5, altitude: 3550, lat: 35.3610, lng: 74.5930, type: 'camp', description: 'Birch forest moraine viewpoint.' },
      { id: 'nanga-bc', name: 'Nanga Parbat Base Camp', dayNumber: 6, altitude: 3967, lat: 35.3370, lng: 74.5980, type: 'basecamp', description: 'Foot of the Raikot Glacier and the sheer ice face.', highlight: 'Foot of Killer Mountain (8,126m)' }
    ],
    pathCoordinates: [
      [33.6844, 73.0479],
      [35.4200, 74.1000],
      [35.4988, 74.6200],
      [35.4410, 74.5710],
      [35.3850, 74.5820],
      [35.3610, 74.5930],
      [35.3370, 74.5980]
    ]
  },

  'hunza-tour': {
    tourId: 'hunza-tour',
    title: 'Hunza Valley Cultural & Scenic Route',
    distanceKm: 280,
    maxAltitudeM: 4693,
    elevationGainM: 3193,
    daysOnGlacier: 1,
    summary: 'From Gilgit along the KKH past Rakaposhi to historic Karimabad, Attabad Lake, Passu Cones, and Khunjerab Pass.',
    waypoints: [
      { id: 'gilgit', name: 'Gilgit Gateway', dayNumber: 1, altitude: 1500, lat: 35.9221, lng: 74.3087, type: 'city', description: 'Confluence of Gilgit and Hunza rivers.' },
      { id: 'karimabad', name: 'Karimabad & Baltit Fort', dayNumber: 2, altitude: 2438, lat: 36.3275, lng: 74.6631, type: 'city', description: 'Historic Hunza capital and 800-year-old Baltit Fort.', highlight: 'Baltit & Altit UNESCO heritage' },
      { id: 'duikar', name: 'Duikar Eagle\'s Nest', dayNumber: 3, altitude: 2850, lat: 36.3350, lng: 74.6900, type: 'camp', description: 'Highest viewpoint overlooking Ladyfinger and Ultar Sar.' },
      { id: 'attabad', name: 'Attabad Lake', dayNumber: 4, altitude: 2559, lat: 36.3330, lng: 74.8670, type: 'trailhead', description: 'Turquoise fjord formed by the 2010 mountain landslide.' },
      { id: 'passu', name: 'Passu Cones & Glacier', dayNumber: 5, altitude: 2450, lat: 36.4670, lng: 74.8830, type: 'trailhead', description: 'Spectacular spires of Passu Cathedral.' },
      { id: 'sost', name: 'Sost Silk Route Port', dayNumber: 6, altitude: 2800, lat: 36.6880, lng: 74.8210, type: 'city', description: 'Border customs town on the KKH.' },
      { id: 'khunjerab', name: 'Khunjerab Pass (4,693m)', dayNumber: 7, altitude: 4693, lat: 36.8500, lng: 75.4300, type: 'pass', description: 'World\'s highest paved international border crossing into China.', highlight: 'Pak-China Khunjerab Border' }
    ],
    pathCoordinates: [
      [35.9221, 74.3087],
      [36.2550, 74.5360],
      [36.3275, 74.6631],
      [36.3350, 74.6900],
      [36.3330, 74.8670],
      [36.3750, 74.8670],
      [36.4670, 74.8830],
      [36.6880, 74.8210],
      [36.8500, 75.4300]
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
      { id: 'skardu', name: 'Skardu', dayNumber: 1, altitude: 2228, lat: 35.2971, lng: 75.6333, type: 'city', description: 'Base town in Baltistan.' },
      { id: 'arandu', name: 'Arandu Village', dayNumber: 3, altitude: 2770, lat: 35.8667, lng: 75.3167, type: 'trailhead', description: 'Head of Basha valley, last road outpost.' },
      { id: 'chogo-lungma', name: 'Chogo Lungma Moraine', dayNumber: 4, altitude: 3600, lat: 35.9300, lng: 75.1800, type: 'glacier', description: 'Trek along ancient Chogo Lungma Glacier.' },
      { id: 'spantik-bc', name: 'Spantik Base Camp', dayNumber: 5, altitude: 4300, lat: 36.0100, lng: 75.0500, type: 'basecamp', description: 'Grassy campsite beneath south face with clean water.' },
      { id: 'spantik-c1', name: 'Camp 1 (Ridge)', dayNumber: 6, altitude: 5100, lat: 36.0280, lng: 75.0100, type: 'camp', description: 'Positioned on the crest of the Southeast Ridge.' },
      { id: 'spantik-c2', name: 'Camp 2 (High Plateau)', dayNumber: 7, altitude: 5550, lat: 36.0400, lng: 74.9900, type: 'camp', description: 'High snow plateau.' },
      { id: 'spantik-summit', name: 'Spantik Summit (7,027m)', dayNumber: 8, altitude: 7027, lat: 36.0583, lng: 74.9656, type: 'summit', description: 'Golden summit overlooking Karakoram and Hindu Kush.', highlight: '7,027m Golden Peak' }
    ],
    pathCoordinates: [
      [35.2971, 75.6333],
      [35.8667, 75.3167],
      [35.9300, 75.1800],
      [36.0100, 75.0500],
      [36.0280, 75.0100],
      [36.0400, 74.9900],
      [36.0583, 74.9656]
    ]
  }
};

// Master Function to Get or Generate Route for ANY Tour
export const getRouteForTour = (tourId: string, slug?: string, tour?: any): TrekkingRoute => {
  const targetId = (tourId || '').trim();
  const targetSlug = (slug || '').trim();

  // 1. If tour object was passed with day-by-day itinerary, dynamically build exact route
  if (tour && tour.itinerary && tour.itinerary.length > 0) {
    return generateRouteFromItinerary(tour);
  }

  // 2. Look up the full tour package from TOURS_DATA by ID or Slug
  const matchedTour = TOURS_DATA.find(
    (t) =>
      t.id === targetId ||
      t.slug === targetSlug ||
      t.id.toLowerCase() === targetId.toLowerCase() ||
      t.slug.toLowerCase() === targetSlug.toLowerCase()
  );

  if (matchedTour && matchedTour.itinerary && matchedTour.itinerary.length > 0) {
    return generateRouteFromItinerary(matchedTour);
  }

  // 3. Direct curated route match if available
  if (TREKKING_ROUTES[targetId]) return TREKKING_ROUTES[targetId];
  if (targetSlug && TREKKING_ROUTES[targetSlug]) return TREKKING_ROUTES[targetSlug];

  // 4. Regional fallbacks
  if (targetId.includes('diran') || targetSlug.includes('diran')) {
    return TREKKING_ROUTES['diran-peak-7273-m-expedition'];
  }
  if (targetId.includes('fairy') || targetSlug.includes('fairy')) {
    return TREKKING_ROUTES['fairy-meadows-trek'];
  }
  if (targetId.includes('hunza') || targetSlug.includes('hunza')) {
    return TREKKING_ROUTES['hunza-tour'];
  }
  if (targetId.includes('spantik') || targetSlug.includes('spantik')) {
    return TREKKING_ROUTES['spantik-peak-expedition'];
  }
  if (targetId.includes('gondogoro') || targetSlug.includes('gondogoro')) {
    return TREKKING_ROUTES['k2-gondogoro-la-trek'];
  }

  return TREKKING_ROUTES['k2-base-camp-trek'];
};
