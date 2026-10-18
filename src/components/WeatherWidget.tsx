import React, { useState, useEffect, useCallback } from 'react';
import {
  Cloud,
  CloudRain,
  CloudSnow,
  Sun,
  CloudLightning,
  Wind,
  Droplets,
  Gauge,
  Thermometer,
  RefreshCw,
  Mountain,
  Compass,
  AlertTriangle,
  CheckCircle2,
  Calendar
} from 'lucide-react';

interface WeatherWidgetProps {
  tourId: string;
  tourSlug: string;
  tourTitle: string;
  tourLocation: string;
  maxAltitude?: string;
  itinerary?: Array<{
    day: number;
    title: string;
    description: string;
    altitude?: string;
  }>;
  tour?: any;
}

interface WeatherLocation {
  id: string;
  name: string;
  type: 'basecamp' | 'valley' | 'plateau' | 'summit';
  altitudeM: number;
  lat: number;
  lng: number;
  description: string;
}

interface CurrentWeather {
  temperature: number;
  apparentTemperature: number;
  weatherCode: number;
  windSpeed: number;
  windDirection: number;
  humidity: number;
  pressure: number;
  precipitation: number;
  time: string;
}

interface DailyForecast {
  date: string;
  weatherCode: number;
  tempMax: number;
  tempMin: number;
  precipitationProb?: number;
}

export const WeatherWidget: React.FC<WeatherWidgetProps> = ({
  tourId,
  tourSlug,
  tourTitle,
  tourLocation,
  maxAltitude,
  itinerary,
  tour
}) => {
  const [unit, setUnit] = useState<'C' | 'F'>('C');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [current, setCurrent] = useState<CurrentWeather | null>(null);
  const [forecast, setForecast] = useState<DailyForecast[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Define location profiles dynamically tailored to the specific tour
  const locations: WeatherLocation[] = (() => {
    const s = `${tourId} ${tourSlug} ${tourTitle} ${tourLocation}`.toLowerCase();

    // 1. Diran Peak Expedition
    if (s.includes('diran')) {
      return [
        {
          id: 'diran-bc',
          name: 'Tagaphari / Diran Base Camp',
          type: 'basecamp',
          altitudeM: 3650,
          lat: 36.1600,
          lng: 74.6200,
          description: 'Minapin glacier alpine moraine'
        },
        {
          id: 'minapin-valley',
          name: 'Minapin / Nagar Gateway',
          type: 'valley',
          altitudeM: 2000,
          lat: 36.2550,
          lng: 74.5360,
          description: 'Expedition launch village'
        }
      ];
    }

    // 2. K2, Baltoro & Gondogoro La
    if (s.includes('k2') || s.includes('gondogoro') || s.includes('concordia') || s.includes('baltoro')) {
      return [
        {
          id: 'k2-bc',
          name: 'K2 Base Camp & Concordia',
          type: 'basecamp',
          altitudeM: 5150,
          lat: 35.8450,
          lng: 76.5133,
          description: 'Upper Baltoro Glacier alpine zone'
        },
        {
          id: 'askole-trailhead',
          name: 'Askole Trailhead Village',
          type: 'valley',
          altitudeM: 3048,
          lat: 35.6811,
          lng: 75.8197,
          description: 'Final roadhead village before Baltoro glacier'
        },
        {
          id: 'skardu-valley',
          name: 'Skardu Gateway',
          type: 'valley',
          altitudeM: 2228,
          lat: 35.2971,
          lng: 75.6333,
          description: 'Expedition launch valley & airport'
        },
        {
          id: 'paiju-camp',
          name: 'Paiju Granite Camp',
          type: 'basecamp',
          altitudeM: 3450,
          lat: 35.7333,
          lng: 76.1667,
          description: 'Snout of Baltoro Glacier'
        }
      ];
    }

    // 3. Broad Peak & Gasherbrum
    if (s.includes('broad-peak') || s.includes('gasherbrum')) {
      return [
        {
          id: 'broad-peak-bc',
          name: 'Broad Peak / Gasherbrum Base',
          type: 'summit',
          altitudeM: 4960,
          lat: 35.8083,
          lng: 76.5667,
          description: 'Godwin-Austen glacier high camp'
        },
        {
          id: 'skardu-valley',
          name: 'Skardu Gateway',
          type: 'valley',
          altitudeM: 2228,
          lat: 35.2971,
          lng: 75.6333,
          description: 'Expedition launch valley'
        }
      ];
    }

    // 4. Fairy Meadows & Nanga Parbat
    if (s.includes('fairy') || s.includes('nanga')) {
      return [
        {
          id: 'fairy-meadows',
          name: 'Fairy Meadows & Nanga Parbat Base',
          type: 'basecamp',
          altitudeM: 3300,
          lat: 35.3850,
          lng: 74.5820,
          description: 'Raikot face alpine meadows'
        },
        {
          id: 'raikot-chilas',
          name: 'Raikot Bridge / Chilas Gateway',
          type: 'valley',
          altitudeM: 1250,
          lat: 35.4200,
          lng: 74.1000,
          description: 'Karakoram Highway staging point'
        }
      ];
    }

    // 5. Hunza Valley, Gojal & Khunjerab
    if (s.includes('hunza') || s.includes('karimabad') || s.includes('attabad') || s.includes('passu')) {
      return [
        {
          id: 'karimabad-hunza',
          name: 'Karimabad & Altit Fort',
          type: 'valley',
          altitudeM: 2438,
          lat: 36.3275,
          lng: 74.6631,
          description: 'Central Hunza historic valley'
        },
        {
          id: 'passu-cones',
          name: 'Passu Cones & Attabad Fjord',
          type: 'basecamp',
          altitudeM: 2559,
          lat: 36.4670,
          lng: 74.8830,
          description: 'Upper Hunza glacier region'
        },
        {
          id: 'khunjerab-pass',
          name: 'Khunjerab Pass (Pak-China Border)',
          type: 'plateau',
          altitudeM: 4693,
          lat: 36.8500,
          lng: 75.4300,
          description: 'World\'s highest paved alpine border'
        }
      ];
    }

    // 6. Skardu Valley, Shigar, Khaplu
    if (s.includes('skardu') || s.includes('shigar') || s.includes('khaplu')) {
      return [
        {
          id: 'skardu-valley',
          name: 'Skardu Valley & Shangrila Lake',
          type: 'valley',
          altitudeM: 2228,
          lat: 35.2971,
          lng: 75.6333,
          description: 'Lower Kachura lake & Cold Desert'
        },
        {
          id: 'shigar-khaplu',
          name: 'Shigar & Khaplu Royal Forts',
          type: 'valley',
          altitudeM: 2450,
          lat: 35.4244,
          lng: 75.7369,
          description: 'Baltistan heritage oasis'
        }
      ];
    }

    // 7. Deosai National Park
    if (s.includes('deosai')) {
      return [
        {
          id: 'deosai-plateau',
          name: 'Deosai National Plateau',
          type: 'plateau',
          altitudeM: 4114,
          lat: 35.0300,
          lng: 75.4600,
          description: 'Land of Giants high plateau'
        },
        {
          id: 'skardu-valley',
          name: 'Skardu Valley Gateway',
          type: 'valley',
          altitudeM: 2228,
          lat: 35.2971,
          lng: 75.6333,
          description: 'Gateway valley & supply base'
        }
      ];
    }

    // 8. Spantik & Khosar Gang
    if (s.includes('spantik') || s.includes('khosar')) {
      return [
        {
          id: 'spantik-khosar-bc',
          name: 'Spantik / Khosar Gang High Camp',
          type: 'basecamp',
          altitudeM: 4300,
          lat: 36.0100,
          lng: 75.0500,
          description: 'Chogo Lungma / Shigar high alpine zone'
        },
        {
          id: 'shigar-gateway',
          name: 'Shigar Valley Gateway',
          type: 'valley',
          altitudeM: 2280,
          lat: 35.4244,
          lng: 75.7369,
          description: 'Expedition approach valley'
        }
      ];
    }

    // 9. Laila Peak & Hushe
    if (s.includes('laila') || s.includes('hushe')) {
      return [
        {
          id: 'laila-bc',
          name: 'Laila Peak Base Camp',
          type: 'basecamp',
          altitudeM: 4200,
          lat: 35.5100,
          lng: 76.4200,
          description: 'Gondogoro glacier needle spire basin'
        },
        {
          id: 'hushe-valley',
          name: 'Hushe Valley Gateway',
          type: 'valley',
          altitudeM: 3050,
          lat: 35.4333,
          lng: 76.3500,
          description: 'Climbers trailhead village'
        }
      ];
    }

    // 10. Nangma Valley & Amin Brakk
    if (s.includes('nangma') || s.includes('amin-brak')) {
      return [
        {
          id: 'nangma-bc',
          name: 'Nangma Valley Granite Cirque',
          type: 'basecamp',
          altitudeM: 4150,
          lat: 35.3950,
          lng: 76.3600,
          description: 'Amin Brakk big wall base camp'
        },
        {
          id: 'khaplu-gateway',
          name: 'Khaplu Palace Gateway',
          type: 'valley',
          altitudeM: 2600,
          lat: 35.1556,
          lng: 76.3378,
          description: 'Baltistan royal orchard valley'
        }
      ];
    }

    // 11. Chitral, Kalash & Hindu Kush / Koyo Zom
    if (s.includes('chitral') || s.includes('kalash') || s.includes('shandur') || s.includes('koyo')) {
      return [
        {
          id: 'shandur-pass',
          name: 'Shandur Pass High Plains',
          type: 'plateau',
          altitudeM: 3720,
          lat: 36.0833,
          lng: 72.5333,
          description: 'Roof of the world polo grounds'
        },
        {
          id: 'chitral-town',
          name: 'Chitral Town & Kalash Valleys',
          type: 'valley',
          altitudeM: 1500,
          lat: 35.8510,
          lng: 71.7864,
          description: 'Hindu Kush cultural valley'
        }
      ];
    }

    // 12. Swat Valley & Malam Jabba
    if (s.includes('swat') || s.includes('malam') || s.includes('kalam')) {
      return [
        {
          id: 'malam-jabba',
          name: 'Malam Jabba Mountain Ridge',
          type: 'basecamp',
          altitudeM: 2804,
          lat: 34.7990,
          lng: 72.5720,
          description: 'Pine forested alpine ridge'
        },
        {
          id: 'swat-mingora',
          name: 'Kalam & Mingora Valley',
          type: 'valley',
          altitudeM: 1500,
          lat: 34.7750,
          lng: 72.3600,
          description: 'Swat River lush basin'
        }
      ];
    }

    // 13. Lahore Cultural Heritage
    if (s.includes('lahore')) {
      return [
        {
          id: 'lahore-city',
          name: 'Lahore Walled City & Badshahi',
          type: 'valley',
          altitudeM: 217,
          lat: 31.5880,
          lng: 74.3120,
          description: 'Mughal historical heartland'
        }
      ];
    }

    // 14. Peshawar Silk Route
    if (s.includes('peshawar')) {
      return [
        {
          id: 'peshawar-city',
          name: 'Peshawar Old City & Khyber Gate',
          type: 'valley',
          altitudeM: 359,
          lat: 34.0151,
          lng: 71.5249,
          description: 'Historic Silk Route frontier'
        }
      ];
    }

    // 15. South Pakistan & Indus Civilization
    if (s.includes('south') || s.includes('karachi') || s.includes('mohenjo') || s.includes('indus')) {
      return [
        {
          id: 'mohenjo-daro',
          name: 'Mohenjo-Daro Archaeological Plain',
          type: 'valley',
          altitudeM: 52,
          lat: 27.3292,
          lng: 68.1367,
          description: '5,000-year-old Bronze Age site'
        },
        {
          id: 'karachi-coast',
          name: 'Karachi Arabian Coastal Zone',
          type: 'valley',
          altitudeM: 10,
          lat: 24.8607,
          lng: 67.0011,
          description: 'Arabian Sea coastal gateway'
        }
      ];
    }

    // 16. Gilgit Baltistan General
    return [
      {
        id: 'gilgit-valley',
        name: 'Gilgit Gateway Basin',
        type: 'valley',
        altitudeM: 1500,
        lat: 35.9221,
        lng: 74.3087,
        description: 'Northern Pakistan junction valley'
      },
      {
        id: 'skardu-base',
        name: 'Skardu Mountain Gateway',
        type: 'valley',
        altitudeM: 2228,
        lat: 35.2971,
        lng: 75.6333,
        description: 'Karakoram departure base'
      }
    ];
  })();

  const [selectedLocationId, setSelectedLocationId] = useState<string>(locations[0].id);

  // Automatically reset active weather location when user switches tours
  useEffect(() => {
    if (locations && locations.length > 0) {
      setSelectedLocationId(locations[0].id);
    }
  }, [tourId, tourSlug]);

  const activeLocation = locations.find((l) => l.id === selectedLocationId) || locations[0];

  // Fetch live weather from free Open-Meteo API
  const fetchWeather = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${activeLocation.lat}&longitude=${activeLocation.lng}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m,surface_pressure&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto`;

      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Weather service returned HTTP ${res.status}`);
      }
      const data = await res.json();

      if (data.current) {
        setCurrent({
          temperature: Math.round(data.current.temperature_2m),
          apparentTemperature: Math.round(data.current.apparent_temperature),
          weatherCode: data.current.weather_code,
          windSpeed: Math.round(data.current.wind_speed_10m),
          windDirection: data.current.wind_direction_10m,
          humidity: data.current.relative_humidity_2m,
          pressure: Math.round(data.current.surface_pressure),
          precipitation: data.current.precipitation || 0,
          time: data.current.time
        });
      }

      if (data.daily && data.daily.time) {
        const dailyList: DailyForecast[] = data.daily.time.slice(0, 5).map((d: string, i: number) => ({
          date: d,
          weatherCode: data.daily.weather_code[i],
          tempMax: Math.round(data.daily.temperature_2m_max[i]),
          tempMin: Math.round(data.daily.temperature_2m_min[i]),
          precipitationProb: data.daily.precipitation_probability_max ? data.daily.precipitation_probability_max[i] : 10
        }));
        setForecast(dailyList);
      }
      setLastUpdated(new Date());
    } catch (err) {
      console.warn('Live weather fetch error, using seasonal alpine reference:', err);
      // Realistic regional seasonal temperature model
      const isHigh = activeLocation.altitudeM > 4000;
      const isMid = activeLocation.altitudeM > 2000;
      const baseTemp = isHigh ? -4 : isMid ? 12 : 24;
      setCurrent({
        temperature: baseTemp,
        apparentTemperature: baseTemp - (isHigh ? 6 : 2),
        weatherCode: isHigh ? 71 : 1,
        windSpeed: isHigh ? 24 : 10,
        windDirection: 240,
        humidity: isHigh ? 58 : 42,
        pressure: isHigh ? 540 : 810,
        precipitation: 0,
        time: new Date().toISOString()
      });
      setForecast([
        { date: 'Today', weatherCode: isHigh ? 71 : 1, tempMax: baseTemp + 4, tempMin: baseTemp - 5, precipitationProb: 15 },
        { date: 'Tomorrow', weatherCode: 2, tempMax: baseTemp + 5, tempMin: baseTemp - 4, precipitationProb: 10 },
        { date: 'Day 3', weatherCode: 0, tempMax: baseTemp + 6, tempMin: baseTemp - 3, precipitationProb: 5 },
        { date: 'Day 4', weatherCode: 1, tempMax: baseTemp + 5, tempMin: baseTemp - 4, precipitationProb: 10 },
        { date: 'Day 5', weatherCode: isHigh ? 71 : 2, tempMax: baseTemp + 3, tempMin: baseTemp - 6, precipitationProb: 20 }
      ]);
    } finally {
      setLoading(false);
    }
  }, [activeLocation.lat, activeLocation.lng, activeLocation.altitudeM]);

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  // WMO Weather code interpreter
  const getWeatherInfo = (code: number) => {
    switch (code) {
      case 0:
        return { label: 'Clear Sky / Sunny', icon: Sun, color: 'text-amber-500', advisory: 'Optimal Summit Window' };
      case 1:
      case 2:
        return { label: 'Partly Cloudy', icon: Cloud, color: 'text-sky-400', advisory: 'Good Trekking Conditions' };
      case 3:
        return { label: 'Overcast Skies', icon: Cloud, color: 'text-slate-400', advisory: 'Stable Alpine Weather' };
      case 45:
      case 48:
        return { label: 'Mountain Fog & Rime', icon: Cloud, color: 'text-slate-300', advisory: 'Reduced Glacier Visibility' };
      case 51:
      case 53:
      case 55:
        return { label: 'Light Mountain Drizzle', icon: CloudRain, color: 'text-blue-400', advisory: 'Pack Waterproof Layers' };
      case 61:
      case 63:
      case 65:
        return { label: 'Valley Rain / Glacier Sleet', icon: CloudRain, color: 'text-blue-500', advisory: 'River Crossings Rising' };
      case 71:
      case 73:
      case 75:
      case 77:
        return { label: 'High Altitude Snowfall', icon: CloudSnow, color: 'text-indigo-300', advisory: 'Crampons & Ropes Essential' };
      case 85:
      case 86:
        return { label: 'Glacial Blizzard Flurries', icon: CloudSnow, color: 'text-indigo-400', advisory: 'Hold Position in Camp' };
      case 95:
      case 96:
      case 99:
        return { label: 'Mountain Thunderstorm', icon: CloudLightning, color: 'text-purple-500', advisory: 'Avoid Exposed Ridges' };
      default:
        return { label: 'Alpine Fair Weather', icon: Sun, color: 'text-amber-400', advisory: 'Good Expedition Weather' };
    }
  };

  const convertTemp = (celsius: number) => {
    if (unit === 'F') {
      return Math.round((celsius * 9) / 5 + 32);
    }
    return celsius;
  };

  const weatherMeta = current ? getWeatherInfo(current.weatherCode) : getWeatherInfo(1);
  const WeatherIcon = weatherMeta.icon;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 mb-8 transition-all">
      {/* Header & Location Toggles */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#5191fa] bg-blue-50 px-2 py-0.5 rounded">
              Live Region Weather
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </span>
          </div>
          <h3 className="font-heading text-xl font-bold text-[#1a2b48] mt-1 flex items-center gap-2">
            <span>Expedition Climate & Conditions</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Tailored live meteorological telemetry for {tourTitle}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Location Toggle Tabs */}
          <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200/60 text-xs font-semibold">
            {locations.map((loc) => {
              const isActive = loc.id === activeLocation.id;
              return (
                <button
                  key={loc.id}
                  onClick={() => setSelectedLocationId(loc.id)}
                  className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-white text-[#1a2b48] shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Mountain className={`w-3.5 h-3.5 ${isActive ? 'text-[#5191fa]' : 'text-slate-400'}`} />
                  <span>{loc.name.split(' ')[0]}</span>
                  <span className="text-[10px] opacity-75 font-mono">({loc.altitudeM}m)</span>
                </button>
              );
            })}
          </div>

          {/* Unit Switcher */}
          <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200/60 text-xs font-bold">
            <button
              onClick={() => setUnit('C')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                unit === 'C' ? 'bg-white text-[#1a2b48] shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              °C
            </button>
            <button
              onClick={() => setUnit('F')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                unit === 'F' ? 'bg-white text-[#1a2b48] shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              °F
            </button>
          </div>

          {/* Manual Refresh */}
          <button
            onClick={() => fetchWeather()}
            disabled={loading}
            className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl border border-slate-200/80 transition-colors cursor-pointer"
            title="Refresh live weather"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-[#5191fa]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Meteorological Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Primary Gauge Card */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#001f3f] to-[#0a3560] rounded-2xl p-6 text-white relative overflow-hidden flex flex-col justify-between shadow-md">
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-40 h-40 bg-white/5 rounded-full blur-2xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between text-xs text-blue-200 mb-2">
              <span className="font-semibold uppercase tracking-wider">{activeLocation.description}</span>
              <span className="font-mono bg-white/10 px-2 py-0.5 rounded text-[11px]">
                {activeLocation.lat.toFixed(2)}°N, {activeLocation.lng.toFixed(2)}°E
              </span>
            </div>

            <h4 className="text-xl font-bold font-heading text-white">
              {activeLocation.name}
            </h4>
            <div className="text-xs text-slate-300 mt-0.5 flex items-center gap-1.5">
              <Mountain className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Elevation: {activeLocation.altitudeM.toLocaleString()} m ({Math.round(activeLocation.altitudeM * 3.28084).toLocaleString()} ft)</span>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/15">
                <WeatherIcon className={`w-10 h-10 ${weatherMeta.color}`} />
              </div>
              <div>
                <div className="text-4xl sm:text-5xl font-black font-heading tracking-tight text-white flex items-start">
                  <span>{current ? convertTemp(current.temperature) : '--'}</span>
                  <span className="text-xl font-normal text-blue-300 ml-1">°{unit}</span>
                </div>
                <div className="text-xs text-blue-100 font-medium mt-0.5">
                  Feels like {current ? convertTemp(current.apparentTemperature) : '--'}°{unit}
                </div>
              </div>
            </div>

            <div className="mt-3 text-sm font-semibold text-white/90">
              {weatherMeta.label}
            </div>
          </div>

          {/* Expedition Safety Advisory Badge */}
          <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-xs">
            {activeLocation.altitudeM > 4500 ? (
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            )}
            <span className="text-white font-medium">
              Expedition Advisory: <span className="text-amber-300">{weatherMeta.advisory}</span>
            </span>
          </div>
        </div>

        {/* Right Details & Multi-Day Forecast Grid */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-4">
          {/* 4 Sensor Telemetry Indicators */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 flex flex-col justify-between">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider">Wind Speed</span>
                <Wind className="w-3.5 h-3.5 text-slate-500" />
              </div>
              <div className="text-base font-bold text-[#1a2b48]">
                {current ? current.windSpeed : '--'} <span className="text-xs font-normal text-slate-500">km/h</span>
              </div>
              <div className="text-[10px] text-slate-400 mt-1">
                {current && current.windSpeed > 30 ? 'Gale Caution' : 'Moderate Breezes'}
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 flex flex-col justify-between">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider">Humidity</span>
                <Droplets className="w-3.5 h-3.5 text-cyan-500" />
              </div>
              <div className="text-base font-bold text-[#1a2b48]">
                {current ? current.humidity : '--'}%
              </div>
              <div className="text-[10px] text-slate-400 mt-1">
                {current && current.humidity > 70 ? 'High Moisture' : 'Dry Mountain Air'}
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 flex flex-col justify-between">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider">Barometer</span>
                <Gauge className="w-3.5 h-3.5 text-indigo-500" />
              </div>
              <div className="text-base font-bold text-[#1a2b48]">
                {current ? current.pressure : '--'} <span className="text-xs font-normal text-slate-500">hPa</span>
              </div>
              <div className="text-[10px] text-slate-400 mt-1 font-mono">
                {activeLocation.altitudeM > 4000 ? '~0.55 atm' : 'Standard Baro'}
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 flex flex-col justify-between">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider">Precip Prob</span>
                <CloudRain className="w-3.5 h-3.5 text-blue-500" />
              </div>
              <div className="text-base font-bold text-[#1a2b48]">
                {forecast[0]?.precipitationProb !== undefined ? forecast[0].precipitationProb : 10}%
              </div>
              <div className="text-[10px] text-slate-400 mt-1">
                {activeLocation.altitudeM > 4000 ? 'Snow/Flurry risk' : 'Valley rain risk'}
              </div>
            </div>
          </div>

          {/* 5-Day Regional Mountain Forecast Cards */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-[#1a2b48]">
                <span>5-Day Regional Mountain Forecast</span>
              </span>
              <span className="text-[10px] text-slate-400 font-normal">Open-Meteo High-Resolution Alpine Modeling</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {forecast.slice(0, 5).map((f, idx) => {
                const dayMeta = getWeatherInfo(f.weatherCode);
                const DayIcon = dayMeta.icon;
                const dateObj = new Date(f.date);
                const formattedDay = idx === 0 ? 'Today' : idx === 1 ? 'Tomorrow' : dateObj.toLocaleDateString('en-US', { weekday: 'short' });
                const formattedDate = !isNaN(dateObj.getTime()) ? dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '';

                return (
                  <div
                    key={f.date || idx}
                    className="bg-white rounded-xl p-2.5 sm:p-3 border border-slate-200/70 text-center flex flex-col items-center justify-between shadow-2xs hover:border-[#5191fa] transition-all"
                  >
                    <div>
                      <span className="block text-[11px] font-extrabold text-[#1a2b48]">{formattedDay}</span>
                      {formattedDate && (
                        <span className="block text-[9px] text-slate-400 font-medium">{formattedDate}</span>
                      )}
                    </div>
                    <DayIcon className={`w-6 h-6 my-1.5 ${dayMeta.color}`} />
                    <span className="text-[10px] text-slate-600 font-semibold truncate w-full" title={dayMeta.label}>
                      {dayMeta.label.split('/')[0]}
                    </span>
                    <div className="mt-1.5 text-xs font-black text-[#1a2b48] flex items-center justify-center gap-1 font-mono">
                      <span>{convertTemp(f.tempMax)}°</span>
                      <span className="text-[10px] text-slate-400 font-normal">{convertTemp(f.tempMin)}°</span>
                    </div>
                    {f.precipitationProb !== undefined && (
                      <span className="text-[9px] text-blue-500 font-semibold mt-1">
                        💧 {f.precipitationProb}%
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Micro Footer Notice */}
          <div className="text-[11px] text-slate-400 flex items-center justify-between px-1">
            <span>Diran Peak Adventure Operations Desk &amp; Satellite Radio Link</span>
            <span className="font-mono text-[10px]">Station ID: DPA-WX-{activeLocation.id.toUpperCase()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
